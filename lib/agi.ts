import { agi } from '@/lib/config';

export const getCompletionWithFallback = async (
  systemMessage: string,
  userMessage: string,
  imageUrl?: string,
) => {
  if (imageUrl) {
    const imageCompletionPromise = createCompletetionWithImageUrl(
      systemMessage,
      userMessage,
      imageUrl,
    ).catch(() => createCompletetion(systemMessage, userMessage, 'gpt-3.5-turbo'));
    const delayedFallbackPromise = Promise.all([
      // promise to delay returning the fallback result
      new Promise((resolve) => setTimeout(resolve, 4500)),
      // promise to delay fetching the fallback result
      new Promise((resolve) => setTimeout(resolve, 3500)).then(() =>
        createCompletetion(systemMessage, userMessage, 'gpt-3.5-turbo'),
      ),
    ]).then(([, fallbackResult]) => fallbackResult);
    return Promise.race([imageCompletionPromise, delayedFallbackPromise]);
  } else {
    return createCompletetion(systemMessage, userMessage);
  }
};

export const createCompletetion = async (
  systemMessage: string,
  userMessage: string,
  model: string = 'gpt-4-turbo-preview',
) => {
  const completion = await agi.chat.completions.create({
    messages: [
      { role: 'system', content: systemMessage },
      { role: 'user', content: userMessage },
    ],

    model: model,
    temperature: 0.8,
  });
  return completion.choices[0].message.content?.replace(/['"]+/g, '');
};

export const createCompletetionWithImageUrl = async (
  systemMessage: string,
  userMessage: string,
  imageUrl: string,
) => {
  const completion = await agi.chat.completions.create({
    messages: [
      { role: 'system', content: systemMessage },
      {
        role: 'user',
        content: [
          { type: 'text', text: userMessage },
          {
            type: 'image_url',
            image_url: {
              url: imageUrl,
              detail: 'low',
            },
          },
        ],
      },
    ],
    model: 'gpt-4-vision-preview',
    temperature: 0.8,
  });

  return completion.choices[0].message.content?.replace(/['"]+/g, '');
};
