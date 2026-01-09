---
title: Conditional Content
description: Guide for including format-specific content in documentation
---

# Conditional Content

Include content that only appears in specific output formats (PowerPoint, Confluence, or GitHub Pages).

## Overview

Sometimes you need format-specific content:
- **Version control tables** for presentations
- **Detailed technical notes** for Confluence
- **Interactive demos** for GitHub Pages

Use conditional markers to handle this while maintaining a single source file.

## Syntax

Use HTML comments to mark format-specific content:

```markdown
<!-- PPT_ONLY -->
## Version Control

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 2025-01-15 | Initial version |
<!-- /PPT_ONLY -->

## Overview

This content appears in all formats.
```

## Available Markers

### PPT Only

```markdown
<!-- PPT_ONLY -->
Content for PowerPoint only
<!-- /PPT_ONLY -->
```

### Confluence Only

```markdown
<!-- CONFLUENCE_ONLY -->
Content for Confluence only
<!-- /CONFLUENCE_ONLY -->
```

### GitHub Pages Only

```markdown
<!-- GITHUB_ONLY -->
Content for GitHub Pages only
<!-- /GITHUB_ONLY -->
```

## How It Works

| Format | PPT_ONLY | CONFLUENCE_ONLY | GITHUB_ONLY |
|--------|----------|-----------------|-------------|
| PowerPoint | ✅ Included | ❌ Excluded | ❌ Excluded |
| Confluence | ❌ Excluded | ✅ Included | ❌ Excluded |
| GitHub Pages | ❌ Excluded | ❌ Excluded | ✅ Included |

## Common Use Cases

### PPT-Specific Content

- Version control tables
- Presentation metadata (author, date)
- Slide-specific formatting
- Title page content

```markdown
<!-- PPT_ONLY -->
## Version Control

| Version | Date | Description | Owner |
|---------|------|-------------|-------|
| 0.1 | 06/01/2025 | Draft | John Doe |
| 0.2 | 02/03/2025 | Review feedback | John Doe |
<!-- /PPT_ONLY -->
```

### Confluence-Specific Content

- Detailed technical documentation
- Extended examples
- Developer notes
- Troubleshooting guides

```markdown
<!-- CONFLUENCE_ONLY -->
### Implementation Details

This section provides additional technical details useful for developers.

- Database schema details
- API endpoint specifications
- Error handling patterns
<!-- /CONFLUENCE_ONLY -->
```

### GitHub Pages-Specific Content

- Interactive demos
- Embedded iframes
- Client-side JavaScript
- Advanced markdown features

```markdown
<!-- GITHUB_ONLY -->
### Interactive Exploration

Click on components in the diagram above to explore the architecture.
<!-- /GITHUB_ONLY -->
```

## Complete Example

```markdown
---
title: System Context View
description: High-level system context
---

# System Context View

<!-- PPT_ONLY -->
## Version Control

| Version | Date | Description | Owner |
|---------|------|-------------|-------|
| 1.0 | 2025-01-15 | Initial version | Architecture Team |
<!-- /PPT_ONLY -->

## Overview

The system provides...

## System Diagram

<LikeC4View viewId="systemContext" />

## Key Components

Component descriptions...

<!-- CONFLUENCE_ONLY -->
## Detailed Technical Notes

Additional technical details for developers...
<!-- /CONFLUENCE_ONLY -->

<!-- GITHUB_ONLY -->
## Interactive Demo

Try clicking on components to explore...
<!-- /GITHUB_ONLY -->
```

## Best Practices

1. **Use sparingly** - Most content should work for all formats
2. **Document why** - Add a comment explaining format-specific content
3. **Keep it minimal** - Only use for truly format-specific needs
4. **Test all formats** - Verify content appears/disappears correctly

## Troubleshooting

### Content Not Appearing

- Check marker syntax: `<!-- PPT_ONLY -->` and `<!-- /PPT_ONLY -->`
- Ensure no typos in marker names (case-sensitive)
- Verify closing tags match opening tags

### Markers Visible in Output

If HTML comments appear in output, the filtering may not be running:
- Check the generation script is processing markers
- Verify no syntax errors in markers

### Nested Markers

Nested markers are **not supported**:

```markdown
<!-- PPT_ONLY -->
<!-- CONFLUENCE_ONLY -->  ❌ Don't do this
...
<!-- /CONFLUENCE_ONLY -->
<!-- /PPT_ONLY -->
```

## See Also

- [PowerPoint Generation](./ppt-generation.md) - PPT generation guide
- [Documentation as Code](./documentation-as-code.md) - Overall approach
