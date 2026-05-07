import modal
import os

# Define the Modal app
app = modal.App("news-scraper")

# Path to the scraper script (relative to this file)
SCRAPER_PATH = os.path.join(os.path.dirname(__file__), "tools", "scraper.py")

# Import the scrape function dynamically
def _load_scrape_function():
    import importlib.util, sys
    spec = importlib.util.spec_from_file_location("scraper", SCRAPER_PATH)
    scraper = importlib.util.module_from_spec(spec)
    sys.modules["scraper"] = scraper
    spec.loader.exec_module(scraper)
    return scraper.scrape

scrape_func = _load_scrape_function()

# Schedule the function to run daily at midnight UTC
@app.function(schedule=modal.Cron("0 0 * * *"))
def run_scraper():
    """Entry point executed by Modal every 24 hours."""
    # Call the local scrape function
    scrape_func()

if __name__ == "__main__":
    # For local testing you can invoke directly
    run_scraper()
