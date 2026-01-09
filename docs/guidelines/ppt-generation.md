---
title: PowerPoint Generation
description: Guide for generating PowerPoint presentations from markdown using Marp
---

# PowerPoint Generation

Generate PowerPoint presentations from the same markdown files used for GitHub Pages and Confluence, maintaining a **single source of truth**.

## Quick Start

```bash
npm run pptx:build docs/overview.md -- --title "System Overview"
```

## How It Works

The generator converts markdown to PPTX using Marp:

1. **Transforms** markdown to Marp-compatible format
2. **Converts** to PowerPoint using Marp CLI
3. **Applies** Defra branding (colours, fonts, logos)

## Markdown Format

Write format-agnostic markdown:

```markdown
---
title: System Context View
description: High-level system context
---

# System Context View

## Overview

Content here...

## System Diagram

<LikeC4View viewId="systemContext" />

## Key Components

More content...
```

### Key Points

- **H1 headings (`#`)** - Document title (appears on title slide)
- **H2 headings (`##`)** - Create slide breaks
- **LikeC4View components** - Automatically converted to images
- **Frontmatter** - Used for presentation metadata

## Defra Branding

Generated presentations automatically use Defra branding from `templates/`:

- **Colours**: Defra green (#00af40) for headers and accents
- **Fonts**: Arial font family
- **Tables**: Green headers with alternating row colours
- **Backgrounds**: 
  - Title slide: All agency logos
  - Section slides: Defra logo only

### Customising

Edit `templates/defra-marp-theme.css` to adjust styling, or copy the templates to your project and modify locally.

## Command Options

```bash
npm run pptx:build <input.md> -- [options]

Options:
  --output, -o FILE      Output PPTX file path
  --title                Presentation title
  --author               Author name
  --date                 Presentation date
  --version              Version number
  --heading-level        Heading level for slide breaks (default: 1)
  --keep-marp            Keep intermediate .marp.md file
```

## Presentation Metadata

Provide metadata via frontmatter or command-line:

### Frontmatter

```yaml
---
title: System Context View
author: Architecture Team
date: 2025-01-15
version: 1.0
---
```

### Command-Line

```bash
npm run pptx:build docs/overview.md -- \
  --title "System Context" \
  --author "Architecture Team" \
  --version "1.0"
```

## Section and End Slides

Mark slides for Defra logo background:

### Section Slide

```markdown
## Key Components

<!-- section-slide -->

Content for this section...
```

### End Slide

```markdown
## Next Steps

<!-- end-slide -->

Summary and next steps...
```

## Diagram Handling

### LikeC4 Diagrams

LikeC4View components are automatically converted to images:

```markdown
<LikeC4View viewId="systemContext" />
```

**Important**: Run `npm run build:diagrams` before generating PPT to export diagrams.

### Manual Images

Standard markdown images work in all formats:

```markdown
![Diagram](./images/diagram.png)
```

## Content Fitting

The generator automatically:
- Reduces font sizes for better fit
- Adds `<!-- fit -->` directive to dense slides
- Scales images to fit within slides

### Manual Control

```markdown
## Key Components

<!-- fit -->
- Component 1: Description...
- Component 2: Description...
```

## Output Location

Default: `generated/pptx/<filename>.pptx`

## Best Practices

1. **Use H2 for slides** - `## Heading` creates new slides
2. **Keep content concise** - Slides should be readable at a glance
3. **Export diagrams first** - Run `npm run build:diagrams` before PPT generation
4. **Test locally** - Generate and review before committing
5. **Version control source** - Keep markdown source, not generated PPTX

## Troubleshooting

### Diagrams Not Appearing

1. Run `npm run build:diagrams` to export diagrams
2. Check that `generated/diagrams/` contains the expected images
3. Verify viewId matches the exported diagram filename

### Content Overflows Slide

- Use `<!-- fit -->` directive
- Reduce content or split across slides
- Check custom CSS in `templates/defra-marp-theme.css`

## See Also

- [Conditional Content](./conditional-content.md) - Format-specific content markers
- [Documentation as Code](./documentation-as-code.md) - Overall approach
