# Frontend Bundle Analyzer

A CLI tool to analyze the size of your frontend build assets (JS/CSS), including raw, gzip, and brotli sizes. Generates human-readable, JSON, and interactive HTML reports.

## Features

- Scans a build output directory for `.js` and `.css` files
- Reports total and per-file sizes (raw, gzip, brotli)
- Breaks down size by file type
- Outputs results as human-readable CLI, JSON, or HTML treemap
- Highlights compression efficiency

## Installation

Clone this repo and install dependencies:

```sh
git clone https://github.com/balajikamalesh/frontend-bundle-analyzer.git
cd frontend-bundle-analyzer
npm install
```

You can run directly via `npx`:

```sh
npx github:balajikamalesh/frontend-bundle-analyzer <build-dir>
```

Or link globally:

```sh
npm link
bundle-analyzer <build-dir>
```

## Usage

```sh
bundle-analyzer <build-dir> [options]
```

**Options:**

- `--json`   Output JSON only
- `--gzip`   Calculate gzip size
- `--brotli`  Calculate brotli size
- `--html`   Generate interactive HTML treemap report

**Example:**

```sh
bundle-analyzer dist --gzip --brotli --html
```

## Output

- **CLI:** Shows total size, breakdown by type, and per-file table.
- **JSON:** Outputs full analysis as JSON.
- **HTML:** Generates `bundle-report.html` with an interactive treemap.

## Example CLI Output

```
📦 Frontend Bundle Analyzer

Total: 1.23 MB
Gzip: 350.12 KB
Brotli: 290.45 KB

Breakdown by Type:
	js: 1.00 MB | gzip: 300.00 KB | brotli: 250.00 KB
	css: 230.00 KB | gzip: 50.12 KB | brotli: 40.45 KB

Files:
┌───────────────┬─────────┬─────────┬──────────┐
│ File          │ Raw     │ Gzip    │ Brotli   │
├───────────────┼─────────┼─────────┼──────────┤
│ main.js       │ 800 KB  │ 240 KB  │ 200 KB   │
│ vendor.js     │ 200 KB  │ 60 KB   │ 50 KB    │
│ styles.css    │ 230 KB  │ 50.12KB │ 40.45KB  │
└───────────────┴─────────┴─────────┴──────────┘
```

## HTML Treemap

If `--html` is used, an interactive `bundle-report.html` is generated in your working directory.

### When compression is used
<img width="1512" height="774" alt="Screenshot 2025-12-25 at 2 58 28 PM" src="https://github.com/user-attachments/assets/682ff9df-c505-4daf-87ea-d36801b51335" />

### When compression is not used
<img width="1512" height="767" alt="Screenshot 2025-12-25 at 3 02 00 PM" src="https://github.com/user-attachments/assets/4d22cee5-26d2-4c43-8889-9dfc30b94c50" />

Made with ❤️ by [balajikamalesh](https://github.com/balajikamalesh)
