# FC AI Insights 

Get AI snippets from Farcaster casts!  Works with text, images, or frames!  Using new GPT-4 Turbo with Vision.

[<img width="400" src="https://github.com/Markeljan/farcaster-ai/assets/12901349/6de6bd95-71c9-4ac4-9ba8-ca2ab4067351">](https://warpcast.com/markeljan/0xfeb98799)

# Install

Install on Warpcaster using the frame: [Warpcaster](https://warpcast.com/markeljan/0xfeb98799)

# Features

- Analysis of Social Media Posts: Automatically analyzes the content of social media posts, which can include text and images.
- Generate Responses: Creates responses that mimic human interaction, limited to 29 characters including spaces and punctuation.
- Edge Runtime: Deployed at the edge for low-latency responses.
- GPT-4 Vision for prompting via text, images, and even frames.

# How It Works

Upon receiving a request, the system:
- Validates the request to ensure it complies with predefined criteria.
- Retrieves the social media post using a unique cast hash.
- Analyzes the post to understand its message and sentiment.
- Generates a text & vision response simultaneously, falling back to text only if the request is over 4 seconds.


