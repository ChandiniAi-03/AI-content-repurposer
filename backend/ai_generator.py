import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY is missing from .env file.")

client = genai.Client(api_key=api_key)


def generate_social_content(article_text):

    prompt = f"""
You are an expert social media content creator.

Read the article below and repurpose it into three formats:

1. Twitter/X Thread
- Create 5 short posts.
- Start with a strong hook.
- Keep each post concise and engaging.
- Number them 1/5, 2/5, etc.

2. LinkedIn Post
- Write a professional but engaging post.
- Include the important insights from the article.
- End with a simple call to action.

3. Instagram Caption
- Make it engaging and easy to read.
- Include a call to action.
- Add 5 relevant hashtags.

IMPORTANT:
- Use only information found in the article.
- Do not invent facts.
- Clearly separate the three sections.

ARTICLE:
{article_text}
"""

    interaction = client.interactions.create(
        model="gemini-3.1-flash-lite",
        input=prompt
    )

    return interaction.output_text