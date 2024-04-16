import { FrameRequest, MockFrameRequest, getFrameMessage } from '@coinbase/onchainkit';
import { MARKELJAN_FID, neynar } from '@/app/config';

export const validateRequest = async (body: FrameRequest | MockFrameRequest) => {
  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: process.env.NEYNAR_API_KEY,
  });

  if (!isValid) {
    return { isValid: false, message: undefined, isWhitelisted: undefined };
  }

  const interactorFid = message.interactor.fid;
  if (interactorFid === MARKELJAN_FID) {
    return { isValid: true, message, isWhitelisted: true };
  }

  const isFollowingMarkeljan =
    (
      await neynar.fetchBulkUsers([MARKELJAN_FID], {
        viewerFid: interactorFid,
      })
    ).users?.[0]?.viewer_context?.following || false;

  return { isValid: true, message, isWhitelisted: isFollowingMarkeljan };
};
