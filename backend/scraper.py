import requests
import trafilatura


def scrape_article(url):
    try:
        # Fetch the webpage
        response = requests.get(
            url,
            timeout=15,
            headers={
                "User-Agent": "Mozilla/5.0"
            }
        )

        # Stop if the website returned an error
        response.raise_for_status()

        # Extract the main article content
        article_text = trafilatura.extract(response.text)

        if not article_text:
            return None

        return article_text

    except requests.RequestException as error:
        print(f"Website request failed: {error}")
        return None

    except Exception as error:
        print(f"Scraping failed: {error}")
        return None