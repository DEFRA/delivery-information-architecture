# Scripts Directory

This directory contains configuration and utilities for documentation generation tools provided by `@defra/delivery-info-arch-tooling`.

## Structure

```
scripts/
├── README.md
├── check-diagrams.js           # Pre-dev script to ensure diagrams exist
└── confluence/
    ├── confluence-config.example.json  # Example config
    └── confluence-config.json          # Your config (create from example)
```

## Configuration

### Confluence Publishing

```bash
# Copy example config
cp scripts/confluence/confluence-config.example.json scripts/confluence/confluence-config.json

# Edit with your settings
nano scripts/confluence/confluence-config.json
```

## NPM Scripts

Available commands (from root `package.json`):

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Astro dev server (auto-generates diagrams if missing) |
| `npm run build` | Build Astro site for production |
| `npm run build:diagrams` | Export LikeC4 diagrams as PNG to `generated/diagrams/` |
| `npm run build:mmd` | Convert Mermaid files to SVG |
| `npm run build:mermaid-from-likec4` | Generate Mermaid from LikeC4 dynamic views |
| `npm run pptx:build "file.md" -- --title "Title"` | Generate PowerPoint from markdown (use `--` to pass options) |
| `npm run export:pdf file.md` | Export markdown to PDF |
| `npm run publish:confluence` | Publish all docs to Confluence |
| `npm run publish:confluence:space KEY` | Publish to specific Confluence space (e.g., `BTMS`) |
| `npm run validate:c4` | Validate C4 models |

## Documentation

See the [tooling library documentation](https://github.com/DEFRA/delivery-info-arch-tooling) for full details.
