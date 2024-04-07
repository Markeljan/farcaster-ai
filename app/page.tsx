import { Metadata } from 'next';
import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import { buildAddActionUrl } from '@/lib/utils';
import { APP_URL } from '@/lib/config';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      action: 'link',
      label: 'Add ELI5',
      target: buildAddActionUrl('ELI5', 'dependabot', `${APP_URL}/api/actions/summary`),
    },
    {
      action: 'link',
      label: 'Add Ask 🤖',
      target: buildAddActionUrl('Ask 🤖', 'dependabot', `${APP_URL}/api/actions/ask-ai`),
    },
    {
      action: 'link',
      label: 'Add Ask 😈',
      target: buildAddActionUrl('Ask 😈', 'dependabot', `${APP_URL}/api/actions/ask-degen`),
    },
  ],
  image: {
    src: `${APP_URL}/ask-ai.png`,
  },
});

export const metadata: Metadata = {
  title: 'Farcaster AI',
  description: 'Farcaster actions for AI sentiment analysis, ELI5, and more',
  openGraph: {
    title: 'Farcaster AI',
    description: 'Farcaster actions for AI sentiment analysis, ELI5, and more',
    images: [`${APP_URL}/ask-ai.png`],
  },
  other: {
    ...frameMetadata,
  },
  metadataBase: new URL(APP_URL),
};

export default function Page() {
  return (
    <>
      <img src={`${APP_URL}/ask-ai.png`} alt="Ask AI" width={200} height={200} />
      <a
        href={buildAddActionUrl('ELI5', 'dependabot', `${APP_URL}/api/actions/summary`)}
        target="_blank"
        rel="noopener noreferrer"
      >
        Add ELI5
      </a>
      <a
        href={buildAddActionUrl('Ask 🤖', 'dependabot', `${APP_URL}/api/actions/ask-ai`)}
        target="_blank"
        rel="noopener noreferrer"
      >
        Add Ask 🤖
      </a>
      <a
        href={buildAddActionUrl('Ask 😈', 'dependabot', `${APP_URL}/api/actions/ask-degen`)}
        target="_blank"
        rel="noopener noreferrer"
      >
        Add Ask 😈
      </a>
      <img src={`${APP_URL}/ask-degen.png`} alt="Ask Degen" width={200} height={200} />
    </>
  );
}
