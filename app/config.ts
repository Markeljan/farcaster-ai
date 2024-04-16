import OpenAI from 'openai';
import { NeynarAPIClient } from '@neynar/nodejs-sdk';
import { xior } from 'xior';

export const IS_PROD = process.env.NODE_ENV === 'production';
export const APP_URL = IS_PROD ? process.env.NEXT_PUBLIC_URL! : 'http://localhost:3001';

export const MARKELJAN_FID = 281260;
export const agi = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const xiorInstance = xior.create();

export const neynar = new NeynarAPIClient(process.env.NEYNAR_API_KEY!, {
  axiosInstance: xiorInstance as any,
});
