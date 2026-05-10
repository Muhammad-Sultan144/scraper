import modal
import os

# Define the Modal app
app = modal.App("news-scraper")

# Set up the Modal image with required dependencies
image = modal.Image.debian_slim().pip_install("feedparser")

# Add the tools directory to sys.path so we can import scrapper
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), "tools"))

# Import the scrape function
from scrapper import scrappe
scrape_func = scrappe

# Schedule the function to run daily at midnight UTC
@app.function(image=image, schedule=modal.Cron("0 0 * * *"))
def run_scraper():
    """Entry point executed by Modal every 24 hours."""
    # Call the local scrape function
    scrape_func()

if __name__ == "__main__":
    # For local testing you can invoke directly
    run_scraper.local()
