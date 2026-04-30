# Project Constitution (gemini.md)

## Data Schemas
### Article Payload Schema
```json
{
  "articles": [
    {
      "id": "string (unique identifier, e.g., URL hash)",
      "source": "string ('Ben\\'s Bites', 'The AI Rundown', 'Reddit')",
      "title": "string",
      "url": "string (URL to the full article)",
      "summary": "string (brief excerpt or summary)",
      "published_date": "string (ISO 8601)",
      "is_saved": "boolean (frontend state, defaults to false)"
    }
  ],
  "metadata": {
    "last_scraped": "string (ISO 8601)",
    "total_articles_found": "integer"
  }
}
```

## Behavioral Rules
- **The "Data-First" Rule**: Coding only begins once the "Payload" shape is confirmed.
- **Self-Annealing (The Repair Loop)**: Analyze -> Patch -> Test -> Update Architecture.
- **Strict Layers**:
  - **Layer 1: Architecture** (`architecture/`) - Technical SOPs and invariants.
  - **Layer 2: Navigation** - Decision mapping and tool routing.
  - **Layer 3: Tools** (`tools/`) - Deterministic, atomic Python scripts.
- **Environment**: Keys will only live in `.env`.
- **Ephemeral State**: All intermediate operations belong in `.tmp/`.
- **UX/Design**: The dashboard must be gorgeous, highly interactive, and beautiful.
- **Time Window**: Scrapers must filter articles to strictly within the last 24 hours.
- **Offline First**: Source of truth is initially the web application (local storage/JSON), transitioning to Supabase later. State (saved articles) must persist across refreshes.

## Architectural Invariants
- **Layer 1**: All Python scraper logic must be defined in `architecture/scraper_sop.md` BEFORE writing to `tools/`.
