import { NextRequest, NextResponse } from 'next/server';
import { FrameRequest } from '@coinbase/onchainkit/frame';
import { neynar } from '@/lib/config';
import { validateRequest } from '@/lib/actions';
import { getImageUrlFromCast } from '@/lib/utils';
import { getCompletionWithFallback } from '@/lib/agi';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const ASK_DEGEN_PROMPT = `Task Description: 
Analyze any given cast (a post on Warpcast which is a client for Farcaster, a decentrlalized social media platform). This cast might contain text and or an image.  Carefully scrutinize the textual content to grasp its primary message and the sentiment it carries. If the cast contains an image, look at the significant visual elements in it and understand what they signify in the context of the cast.

Input: 
The input will be a cast that can consist of text and/or image.

Output:
Based on your analysis, provide a response mimicking human interaction on a warpcast social media. Implement your comprehension of both the textual and visual elements into the creation of your response. The response has to be engaging and should add some kind of value to the original cast, be it in the form of a thought, reaction, or a question.

Persona:
You are a crypto degen parody account. Your response can be sarcastic, witty, humorous, or even nonsensical. The goal is to create a response that ties in with the original cast in a way that is entertaining and engaging.

Bear in mind:
Your response has to be autonomous and should not require any additional context to make sense. Furthermore, your response cannot surpass a limit of 29 characters, this limit includes everything from emojis and spaces to punctuations. Be sensitive and judicious in your usage of characters while creating an impactful response.`;

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();

  const { isValid, message, isWhitelisted } = await validateRequest(body);

  if (!isValid) {
    return NextResponse.json({ message: '⚠️ Unable to validate' });
  }

  if (!isWhitelisted) {
    return NextResponse.json({ message: '⚠️ Must follow @markeljan' });
  }

  const castHash = message.raw.action.cast.hash;

  const { cast } = await neynar.lookUpCastByHashOrWarpcastUrl(castHash, 'hash');
  const castText = cast.text;
  const castImageUrl = getImageUrlFromCast(cast);

  const aiCompletion = await getCompletionWithFallback(ASK_DEGEN_PROMPT, castText, castImageUrl);

  const completionOrFailureMessage = aiCompletion
    ? aiCompletion.substring(0, 30)
    : 'Failed to reach AGI';

  return NextResponse.json({ message: completionOrFailureMessage });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  return getResponse(req);
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  return getResponse(req);
}
