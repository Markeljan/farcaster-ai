import { CastWithInteractions, EmbedUrl } from '@neynar/nodejs-sdk/build/neynar-api/v2';

export const getImageUrlFromCast = (cast: CastWithInteractions): string | undefined => {
  return cast?.frames?.[0]?.image || (cast.embeds?.[0] as EmbedUrl)?.url;
};

export const buildAddActionUrl = (name: string, icon: string, postUrl: string) => {
  return `https://warpcast.com/~/add-cast-action?actionType=post&name=${name}&icon=${icon}&postUrl=${postUrl}`;
};
