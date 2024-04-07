import { NextRequest, NextResponse } from 'next/server';
import { FrameRequest } from '@coinbase/onchainkit/frame';
import { getCompletionWithFallback } from '@/lib/agi';
import { neynar } from '@/lib/config';
import { getImageUrlFromCast } from '@/lib/utils';
import { validateRequest } from '@/lib/actions';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const ASK_AI_PROMPT = `
Task Description:
You are tasked with simplifying complex concepts, trending topics, or memes presented in a social media post. These posts might include both text and images. Your goal is to distill the essential information or the crux of the matter in an easy-to-understand manner, as if explaining it to a 5-year-old.

Input:
The input will be a social media post that may contain text and/or image, presenting a concept, topic, or meme that requires explanation.

Output:
Your response should break down the given concept, topic, or meme into its simplest form, using straightforward language and relatable examples. The explanation should be concise yet comprehensive, ensuring clarity and accessibility for all ages. Aim to enlighten and inform, making the subject matter approachable for a broad audience.

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

  const aiCompletion = await getCompletionWithFallback(ASK_AI_PROMPT, castText, castImageUrl);

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
