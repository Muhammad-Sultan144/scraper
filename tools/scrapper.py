import feedparser
import json
import hashlib
import os
from datetime import datetime, timedelta, timezone

# Configuration
FEEDS = {
    "Ben's Bites": "https://bensbites.com/feed",
    "The AI Rundown": "https://rss.beehiiv.com/feeds/2R3C6B.xml",
    "Reddit": "https://www.reddit.com/r/MachineLearning/top/.rss?t=day"
}

TMP_DIR = "c:/Users/ANC/.antigravity/scrapper/.tmp"
OUTPUT_FILE = os.path.join(TMP_DIR, "data.json")

def generate_id(url):
    return hashlib.sha256(url.encode()).hexdigest()

def parse_date(date_struct):
    try:
        return datetime(*date_struct[:6], tzinfo=timezone.utc)
    except:
        return datetime.now(timezone.utc)

def scrappe():
    if not os.path.exists(TMP_DIR):
        os.makedirs(TMP_DIR)

    all_articles = []
    now = datetime.now(timezone.utc)
    one_day_ago = now - timedelta(days=7)

    for source_name, url in FEEDS.items():
        print(f"Fetching {source_name}...")
        try:
            feed = feedparser.parse(url)
            for entry in feed.entries:
                published_date = parse_date(entry.published_parsed)
                
                # Filter for last 24 hours
                if published_date > one_day_ago:
                    article = {
                        "id": generate_id(entry.link),
                        "source": source_name,
                        "title": entry.title,
                        "url": entry.link,
                        "summary": entry.summary[:250] + "..." if len(entry.summary) > 250 else entry.summary,
                        "published_date": published_date.isoformat(),
                        "is_saved": False
                    }
                    all_articles.append(article)
        except Exception as e:
            print(f"Error scraping {source_name}: {e}")

    payload = {
        "articles": all_articles,
        "metadata": {
            "last_scraped": now.isoformat(),
            "total_articles_found": len(all_articles)
        }
    }

    with open(OUTPUT_FILE, 'w') as f:
        json.dump(payload, f, indent=2)
        
    frontend_path = "c:/Users/ANC/.antigravity/scrapper/frontend/public/articles.json"
    if os.path.exists(os.path.dirname(frontend_path)):
        with open(frontend_path, 'w') as f:
            json.dump(payload, f, indent=2)
    
    print(f"Scrape complete. Found {len(all_articles)} articles. Data saved to {OUTPUT_FILE}")

if __name__ == "__main__":
    scrappe()
