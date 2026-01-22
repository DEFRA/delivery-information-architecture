---
title: Documentation Structure
description: Standard structure for system documentation published to Confluence
---

# Documentation Structure

Standard folder structure for system documentation that maps to Confluence page hierarchy.

## Overview

This structure ensures:
- **Consistent navigation** across all verticals
- **Automatic publishing** to Confluence with correct hierarchy
- **Clear organisation** of views and features

## Recommended Structure

```
docs/
├── index.mdx                           # Homepage
├── guidelines/                         # Process documentation
│   ├── documentation-as-code.md
│   ├── ai-guidelines.md
│   └── ...
├── {vertical}/                         # Vertical-level views
│   └── Technology View/
│       └── Current State Views/
│           └── System Landscape View.md
└── systems/
    └── {system-name}/                  # System documentation
        └── Technology View/
            └── Current State Views/
                ├── System Context View.md
                ├── Container View.md (optional)
                └── Features/
                    ├── Feature Name.md
                    └── ...
```

## Confluence Mapping

The folder structure maps directly to Confluence page hierarchy:

```
{System} Confluence Space
└── Technology View
    └── Current State Views
        ├── System Context View
        ├── Container View
        └── Features
            ├── Feature Name
            └── ...
```

## Document Types

### System-Level Views

| View | Description |
|------|-------------|
| **System Context View** | High-level view showing system and external relationships |
| **Container View** | Internal containers/services within the system |

### Feature Documentation

Each feature document should describe:

- **Purpose**: What the feature does
- **How It Works**: Technical implementation
- **Integration Points**: Connections with other systems
- **Data Flows**: How data moves through the feature

**Note**: Document technical details (security, networking) within relevant features, not as separate sections.

### Vertical-Level Views

| View | Description |
|------|-------------|
| **System Landscape View** | All systems in the vertical, roles, responsibilities |

## Confluence Publishing

### Automatic Publishing

The publish script automatically:
1. Maps folder structure to Confluence hierarchy
2. Creates folder pages for each directory level
3. Publishes markdown as Confluence pages
4. Preserves structure: `Technology View` → `Current State Views` → `Features`

### Page Protection

**By default, only pages labelled "generated" are updated** to prevent overwriting manual content.

| Scenario | Behaviour |
|----------|-----------|
| New page | Created with `generated` label |
| Page with `generated` label | Updated |
| Page without `generated` label | **Skipped** (safe) |
| Page with `manual` or `protected` label | **Never updated** |

To convert a manual page to auto-updated, add the `generated` label in Confluence.

### Configuration

Configure publishing in `scripts/confluence/confluence-config.json`:

```json
{
  "spaceMapping": {
    "system-name": "SPACENAME"
  },
  "publishPaths": [
    {
      "path": "systems/system-name/Technology View/Current State Views/System Context View.md",
      "type": "markdown"
    }
  ]
}
```

## Creating New Documentation

### New System

1. Create the folder structure:
   ```
   docs/systems/{system-name}/Technology View/Current State Views/
   ```

2. Add System Context View:
   ```markdown
   # System Context View
   
   ## Overview
   High-level description...
   
   ## System Diagram
   <LikeC4View viewId="systemContext" />
   
   ## Key Relationships
   ...
   ```

3. Add to space mapping in `confluence-config.json`

### New Feature

1. Create the file:
   ```
   docs/systems/{system-name}/Technology View/Current State Views/Features/{Feature Name}.md
   ```

2. Add content:
   ```markdown
   # Feature Name
   
   ## Overview
   What this feature does...
   
   ## How It Works
   Technical details...
   
   ## Integration Points
   How it connects with other systems...
   ```

3. Publish - the script creates the page under `Features/`

## Cross-System Features

For features spanning multiple systems, create at the vertical level:

```
docs/{vertical}/
└── Technology View/
    └── Current State Views/
        └── Features/
            └── Cross-System Feature.md
```

## Diagram References

### Generated Diagrams (LikeC4, Mermaid, PlantUML)

Reference shared diagrams using LikeC4View or MermaidDiagram components:

```markdown
## Architecture Diagram

<LikeC4View viewId="systemContext" />
<MermaidDiagram diagramId="flowDiagram" />
```

Diagrams are automatically exported and embedded during publishing.

**Location**: Source files in `architecture/current/{system}/c4/`, `mmd/`, `plantuml/`

### Manual Diagrams

For diagrams created manually (e.g., in draw.io, Figma), place them in a `diagrams/` subdirectory alongside the markdown file:

```
docs/systems/{system}/Technology View/Current State Views/Features/
  ├── Feature Name.md
  └── Feature Name/
      └── diagrams/
          ├── deployment-pipeline.png
          └── architecture-diagram.png
```

Reference them using relative paths:

```markdown
![Deployment Pipeline](./Feature Name/diagrams/deployment-pipeline.png)
```

**Supported formats**: PNG (recommended), SVG, JPG, JPEG, GIF, WebP

**Output handling**:
- **Astro/GitHub Pages**: Automatically synced to `public/docs/` maintaining directory structure
- **Confluence**: Automatically uploaded as attachments when publishing
- **PDF/PPT**: Included in generated documents

**Best practices**:
- Use descriptive, kebab-case filenames (e.g., `deployment-pipeline.png` not `diagram1.png`)
- Keep file sizes under 2MB
- Place diagrams close to the content that uses them
- For system-level diagrams used across features, use `docs/systems/{system}/diagrams/`

## Best Practices

1. **Consistent naming** - Use clear, descriptive names
2. **Self-contained** - Each document understandable on its own
3. **Reference shared diagrams** - Use LikeC4View components
4. **Protect manual pages** - Add `manual` label for important content
5. **Feature focus** - Document technical details within relevant features

## See Also

- [Documentation as Code](./documentation-as-code.md) - Philosophy and approach
- [PowerPoint Generation](./ppt-generation.md) - Generating presentations
- [Conditional Content](./conditional-content.md) - Format-specific content
