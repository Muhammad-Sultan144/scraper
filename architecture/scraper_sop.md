# Scraper Standard Operating Procedure (SOP)

## Objective
Extract and normalize AI-related articles from designated RSS feeds to populate the dashboard.

## Layer 1: Data Invariants
- **Source of Truth**: RSS Feed XML.
- **Time Constraint**: Strictly articles published within the last **24 hours**.
- **Normalization**: All output must match the `Article Payload Schema` in `gemini.md`.

## Sources
1. **Ben's Bites**: `https://bensbites.com/feed`
2. **The Rundown AI**: `https://rss.beehiiv.com/feeds/2R3C6B.xml`
3. **Reddit**: `https://www.reddit.com/r/MachineLearning/top/.rss?t=day`

## Logic Flow (Deterministic)
1. **Fetch**: Request the RSS XML content using `feedparser`.
2. **Filter**: Iterate through entries. Calculate `now - published_date`. If > 24 hours, discard.
3. **Normalize**: 
    - `id`: Generate a SHA-256 hash of the `link`.
    - `source`: Map based on original URL domain.
    - `published_date`: ISO 8601 string.
4. **Export**: Write the array of articles to `c:\Users\ANC\.antigravity\scrapper\.tmp\data.json`.

## Error Handling
- If a feed fails to load, log the error but continue processing other feeds.
- If no articles are found within 24h, return an empty list `[]` to the metadata.
