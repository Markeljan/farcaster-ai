import { Metadata } from 'next';
import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import { buildAddActionUrl } from '@/app/utils';
import { APP_URL } from '@/app/config';

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
      target: buildAddActionUrl('Ask 🤖', 'dependabot', `${APP_URL}/api/actions/copilot`),
    },
    {
      action: 'link',
      label: 'Add Ask 😈',
      target: buildAddActionUrl('Ask 😈', 'dependabot', `${APP_URL}/api/actions/copilot-degen`),
    },
  ],
  image: {
    src: `${APP_URL}/copilot.png`,
  },
});

export const metadata: Metadata = {
  title: 'AI Farcaster Actions',
  description: 'Farcaster actions for AI sentiment analysis, ELI5, and more',
  openGraph: {
    title: 'AI Farcaster Actions',
    description: 'Farcaster actions for AI sentiment analysis, ELI5, and more',
    images: [`${APP_URL}/copilot.png`],
  },
  other: {
    ...frameMetadata,
  },
  metadataBase: new URL(APP_URL),
};

export default function Page() {
  return (
    <>
      <img src={`${APP_URL}/copilot.png`} alt="AI Farcaster Actions" width={200} height={200} />
      <a
        href={buildAddActionUrl('ELI5', 'dependabot', `${APP_URL}/api/actions/summary`)}
        target="_blank"
        rel="noopener noreferrer"
      >
        Add ELI5
      </a>
      <a
        href={buildAddActionUrl('Ask 🤖', 'dependabot', `${APP_URL}/api/actions/copilot`)}
        target="_blank"
        rel="noopener noreferrer"
      >
        Add Ask 🤖
      </a>
      <a
        href={buildAddActionUrl('Ask 😈', 'dependabot', `${APP_URL}/api/actions/copilot-degen`)}
        target="_blank"
        rel="noopener noreferrer"
      >
        Add Ask 😈
      </a>
      <img
        src={`${APP_URL}/copilot-degen.png`}
        alt="AI Farcaster Actions"
        width={200}
        height={200}
      />
    </>
  );
}
