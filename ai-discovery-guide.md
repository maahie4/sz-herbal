# SZ Herbals AI-Discovery Infrastructure Guide

This guide details the custom AI-accessibility, GEO (Generative Engine Optimization), and structured data assets created for `szherbal.us`. These files enable advanced visibility, citation, and entity mapping across ChatGPT, Google AI Overviews, Gemini, Claude, Perplexity, and traditional search engines.

## File Inventory & Purposes

| File Name | Location | Format | Targets | Purpose |
|---|---|---|---|---|
| `robots.txt` | `/robots.txt` | Text | Search & AI Bots | Directs traditional indexers and explicitly allows AI bots (GPTBot, ClaudeBot, PerplexityBot) while excluding checkout pathways. |
| `sitemap.xml` | `/sitemap.xml` | XML | Search Engines | Indexes all 16 page URLs, priorities, and image associations for search crawler discovery. |
| `sitemap-images.xml` | `/sitemap-images.xml` | XML | Image Search | Catalogs all product hero, closeup, and context images with SEO-friendly titles/captions. |
| `sitemap.html` | `/sitemap.html` | HTML | Humans & Accessibility | Provides a clean, styled, user-friendly table of contents for the entire site. |
| `llms.txt` | `/llms.txt` | Markdown | LLMs (Concise) | Serves as a fast, high-level summary of SZ Herbals’ product list, ingredients, and active scientific claims. |
| `llms-full.txt` | `/llms-full.txt` | Markdown | LLMs (Comprehensive) | Provides the entire content database (ingredients, full FAQs, testimonials, study citations) for detailed RAG retrievals. |
| `ai.txt` | `/ai.txt` | Text | AI Crawlers | Outlines data crawling policies, freshness cycles, preferred citations, and organization metadata. |
| `schema.json` | `/schema.json` | JSON-LD | Search & Knowledge Graphs | Standalone master structured data graph capturing Organization, Product offers/ratings, FAQs, Articles, and MedicalWebPage tags. |
| `knowledge-graph.json` | `/knowledge-graph.json` | JSON-LD | Knowledge Crawlers | Maps relationship connections (e.g., Glukora contains Picrorhiza Kurroa which supports Type 2 Diabetes). |
| `entities.json` | `/entities.json` | JSON | AI Retrieval / Embeddings | Flat entity registry containing descriptions, properties, and taxonomy clusters. |
| `faq-database.json` | `/faq-database.json` | JSON | Question Answering / Voice | Curated list of People Also Ask and voice search target queries with structured answers. |
| `ai-citations.json` | `/ai-citations.json` | JSON | Answer Engines | Pairs specific scientific claims (like Fig calcium or olive oleocanthal) to original studies and URLs. |
| `entity-map.md` | `/entity-map.md` | Markdown | Documentation | Visualizing semantic relationships via Mermaid diagrams. |
| `topical-map.md` | `/topical-map.md` | Markdown | Documentation | Organizing pages into authority clusters to track indexing completeness. |

## Integration Steps

1.  **Inject Master Schema**: Refer to `/schema.json` for injecting specialized, page-specific structured data blocks into each HTML page head.
2.  **Upload to Web Root**: Ensure all JSON, XML, TXT, and MD files are deployed directly to the root directory of `https://www.szherbal.us` so bots can resolve endpoints (e.g., `https://www.szherbal.us/llms.txt`).
