# PowerPoint Templates and Styling

This directory contains Defra branding assets for PowerPoint generation via Marp.

## Files

### Theme and Styling

- **`defra-marp-theme.css`** - Marp theme CSS with Defra colors, fonts, and styling
- **`defra-template.pptx`** - Reference Defra PowerPoint template (used for extracting styles)

### Background Images

- **`defra-title-background-full-16-9.png`** - Title slide background (16:9) with all agency logos
- **`defra-title-background-16-9.png`** - Section slide background (16:9) with Defra logo only

## Customizing Styling

The Marp theme file (`defra-marp-theme.css`) controls all styling for generated PowerPoints:

### Colors
```css
/* Defra green for headers and accents */
h1, h2, h3 { color: rgb(0, 176, 80); }

/* Green background for title slides */
section:first-of-type { background-color: #00af40; }
```

### Fonts
```css
section {
  font-family: "Arial", sans-serif;
  font-size: 14px;
}
```

### Tables
```css
th {
  background-color: rgb(0, 175, 65);
  color: white;
}
```

## Using the Theme

The Marp script automatically loads `defra-marp-theme.css`:

```bash
node scripts/ppt/md-to-pptx-marp.js \
  "docs/system-context.md" \
  --title "System Context View"
```

No additional configuration needed - the theme is applied automatically.

## Extracting Styles from PowerPoint

If you have an updated Defra template, you can extract its styling:

```bash
node scripts/ppt/extract-pptx-styling.js templates/defra-template.pptx
```

This generates CSS that can be merged into `defra-marp-theme.css`.


