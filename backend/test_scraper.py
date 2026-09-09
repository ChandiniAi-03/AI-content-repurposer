from scraper import scrape_article


url = input("Enter a blog URL: ")

article = scrape_article(url)


if article:
    print("\n========== ARTICLE EXTRACTED ==========\n")
    print(article)
else:
    print("\n❌ Could not extract article content.")