# Scripts Directory

This directory contains configuration for documentation generation tools provided by `@defra/delivery-info-arch-tooling`.

## Configuration Files

- `confluence-config.json` - Confluence publishing configuration (create from example)

## Creating Configuration

```bash
# Copy example from tooling library
cp node_modules/@defra/delivery-info-arch-tooling/examples/config-examples/confluence-config.json.example scripts/confluence-config.json

# Edit with your settings
nano scripts/confluence-config.json
```

## NPM Scripts

Available commands (from root `package.json`):

| Command | Description |
|---------|-------------|
| `npm run build:diagrams` | Export LikeC4 diagrams as PNG |
| `npm run publish:confluence` | Publish to Confluence |
| `npm run generate:pptx` | Generate PowerPoint |
| `npm run export:pdf` | Export to PDF |
| `npm run validate:c4` | Validate C4 models |

## Documentation

See the [tooling library documentation](https://github.com/DEFRA/delivery-info-arch-tooling) for full details.

