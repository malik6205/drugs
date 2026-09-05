# Drug Mechanism Visualizer V3

A pharmacy-focused educational web application that converts structured drug records into interactive drug → target → mechanism → effect pathways.

## Current prototype
- Search 10 example generic medicines
- Drug information cards
- Interactive horizontal mechanism pathway
- Drug comparison
- Responsive UI
- Local JSON-like data embedded in JavaScript for the first prototype

## Run
Open `index.html` in a browser.

For GitHub Pages:
1. Create a GitHub repository.
2. Upload all files/folders.
3. Settings → Pages → Deploy from branch.
4. Select `main` and `/root`.
5. Save.

## Important
The current records are an educational prototype. Before academic submission, verify every mechanism, indication, adverse-effect statement, and reference against authoritative/current sources. Do not present this as a complete clinical database or clinical decision-support tool.

## V3 next architecture
Move the drug records from `js/app.js` into:
- `data/drugs/*.json`
- `data/targets/*.json`
- `data/pathways/*.json`
- `data/relationships/*.json`

Then add:
- PubChem enrichment
- ChEMBL target/bioactivity enrichment
- PostgreSQL backend
- Admin verification workflow
- source/reference management
- graph visualization with Cytoscape.js
- 500+ and eventually thousands of generic drug records
