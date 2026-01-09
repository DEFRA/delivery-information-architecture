# Defra Delivery Information Architecture

## Documentation as Code
This repository follows a documentation-as-code approach. See the [Documentation as Code guide](https://defra.github.io/delivery-information-architecture/documentation-as-code) for an overview of the philosophy, benefits, and approach.

## Contents
This repository provides:

1. **Defra-wide Architecture View** - A high-level overview of Defra's digital verticals
2. **Starter Template** - A ready-to-use template for creating vertical documentation-as-code repositories


## View Online

[**View Interactive Diagrams →**](https://defra.github.io/delivery-information-architecture)

## Defra Verticals

| Vertical | Description | Documentation |
|----------|-------------|---------------|
| **Trade** | Imports, exports, border control | [View →](https://github.com/DEFRA/trade-imports-documentation) |
| **Farming** | Policy and payments | Coming soon |

##  Using as a Template

This repository doubles as a **starter template** for creating vertical documentation repos.

### Quick Start

```bash
# Clone this repo
git clone https://github.com/DEFRA/delivery-information-architecture.git my-vertical-docs
cd my-vertical-docs

# Remove git history
rm -rf .git
git init

# Install dependencies
npm install
cd astro && npm install && cd ..

# Start development
npm run dev
```

### What You Get

- Pre-configured LikeC4 + Astro setup
- Reusable C4 specification file with common element types
- GitHub Pages deployment
- Confluence/PPT/PDF generation tooling
- Example C4 models and documentation
- GitHub Actions workflows

### Creating Your Vertical Documentation Repository

#### Step 1: Clone This Repository

```bash
git clone https://github.com/DEFRA/delivery-information-architecture.git my-vertical-docs
cd my-vertical-docs
rm -rf .git
git init
```

#### Step 2: Keep These Files (Reusable)

- `architecture/specification.c4` - Common C4 element types and styles
- `astro/` - Pre-configured LikeC4 + Astro setup
- `.github/workflows/` - GitHub Actions workflows
- `package.json` structure
- `scripts/README.md` - Tooling references

#### Step 3: Replace These Files (Your Content)

- `architecture/defra-wide/` → `architecture/[your-vertical]/`
- `docs/` - Replace with your documentation (this is the source of truth, visible in GitHub)
- Update `README.md` with your vertical's information
- Update `package.json` name and description
- Update `astro/astro.config.mjs`:
  - Change `site` URL to your repo
  - Update `BASE_PATH` 
  - Change sidebar structure
- Change `.cursor/rules/**` if not using cursor to whatever is appropriate for your LLM of choice
- Note: `astro/src/content/docs` is a symlink to `../docs` - don't edit files there directly

#### Step 4: Install Tooling

```bash
npm install @defra/delivery-info-arch-tooling --save
```

#### Step 5: Configure Confluence Publishing (Optional)

```bash
# Copy example config
cp node_modules/@defra/delivery-info-arch-tooling/examples/config-examples/confluence-config.json.example scripts/confluence-config.json

# Edit with your space details
nano scripts/confluence-config.json
```

#### Step 6: Deploy to GitHub Pages

1. Enable GitHub Pages in repository settings
2. Set source to "GitHub Actions"
3. Push to main branch
4. Workflow will automatically deploy

### What to Customize

1. **C4 Models**: Replace Defra systems with your own
2. **Documentation**: Replace example docs with your system docs
3. **Configuration**: Update space mappings for Confluence
4. **Workflows**: Customize as needed for your workflow
5. **README**: Update with your vertical's information

### What to Keep

1. **specification.c4**: Common element types (extend as needed)
2. **Astro Setup**: Pre-configured LikeC4 integration
3. **Workflows**: Diagram export and Pages deployment
4. **Tooling References**: Scripts point to shared library

### Directory Structure After Customization

```
my-vertical-docs/
├── architecture/                   # Architecture diagrams (C4, MMD, PUML)
│   ├── specification.c4           # Keep - common types
│   └── my-vertical/               # Your vertical name
│       ├── c4/
│       │   ├── my-system.c4       # Your C4 models
│       │   └── views/
│       │       └── my-views.c4    # Your views
│       └── mmd/                   # Mermaid diagrams (optional)
│           └── my-flow.mmd
├── docs/                          # Written documentation (source of truth)
│   ├── index.mdx                  # Homepage
│   └── systems/
│       └── my-system/
│           └── overview.md
├── astro/
│   ├── astro.config.mjs           # Update repo name
│   ├── likec4.config.json         # Update name
│   └── src/
│       └── content/
│           └── docs -> ../../../docs  # Symlink to /docs
├── generated/                      # Generated files (gitignored)
│   ├── diagrams/                  # Exported LikeC4 diagrams (PNG)
│   ├── pdf/                       # Generated PDF files
│   └── pptx/                      # Generated PowerPoint files
├── scripts/
│   └── confluence-config.json     # Your Confluence config
├── package.json                   # Update name/description
└── README.md                      # Your README
```

**Important**: Documentation files should be edited in `/docs` (visible in GitHub). The `astro/src/content/docs` is a symlink for Astro's content collection system.

### Example: Creating Trade Documentation

```bash
# Clone template
git clone https://github.com/DEFRA/delivery-information-architecture.git trade-imports-docs
cd trade-imports-docs

# Remove template content
rm -rf .git
rm -rf architecture/defra-wide
rm -rf docs/verticals
rm -rf docs/defra-landscape

# Initialize fresh git repo
git init

# Recreate symlink (if needed)
rm -rf astro/src/content/docs
ln -s ../../../docs astro/src/content/docs

# Create your structure
mkdir -p architecture/trade/c4
mkdir -p docs/systems/btms

# Update package.json
sed -i '' 's/delivery-information-architecture/trade-imports-documentation/g' package.json
sed -i '' 's/delivery-information-architecture/trade-imports-documentation/g' astro/package.json

# Install dependencies
npm install
cd astro && npm install && cd ..

# Start developing
npm run dev
```

## Development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
# Install root dependencies
npm install

# Install Astro dependencies
cd astro && npm install && cd ..
```

### Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run build:diagrams` | Export LikeC4 diagrams as PNG |
| `npm run validate:c4` | Validate C4 models |
| `npm run publish:confluence` | Publish to Confluence |
| `npm run generate:pptx` | Generate PowerPoint |
| `npm run export:pdf` | Export to PDF |

### Project Structure

```
delivery-information-architecture/
├── architecture/              # Architecture diagrams (C4, MMD, PUML)
│   ├── specification.c4       # Reusable C4 element types
│   └── defra-wide/            # Defra landscape models
│       └── defra-landscape.c4
├── docs/                      # Written documentation (source of truth)
│   ├── index.mdx              # Homepage
│   ├── defra-landscape/       # Landscape documentation
│   └── verticals/             # Vertical descriptions
├── astro/
│   ├── astro.config.mjs       # Astro configuration
│   ├── likec4.config.json     # LikeC4 configuration
│   └── src/
│       └── content/
│           └── docs -> ../../../docs  # Symlink to /docs
├── generated/                  # Generated files (gitignored)
│   ├── diagrams/              # Exported LikeC4 diagrams (PNG)
│   ├── pdf/                   # Generated PDF files
│   └── pptx/                  # Generated PowerPoint files
├── scripts/                   # Tooling configuration
├── package.json
└── README.md
```

**Note**: Documentation files are in `/docs` (visible in GitHub). The `astro/src/content/docs` is a symlink for Astro's content collection system.

## 📚 Related Resources

- [Documentation as Code Guide](https://defra.github.io/delivery-information-architecture/documentation-as-code) - Philosophy and approach to documentation-as-code at Defra
- [Tooling Library](https://github.com/DEFRA/delivery-info-arch-tooling) - Shared documentation generation tools
- [Trade Documentation](https://github.com/DEFRA/trade-imports-documentation) - Example vertical documentation
- [LikeC4](https://likec4.dev) - Architecture diagramming tool
- [Astro Starlight](https://starlight.astro.build) - Documentation framework

## 🤝 Contributing

Contributions are welcome! To add or update vertical information:

1. Fork this repository
2. Make your changes
3. Submit a pull request

For creating a new vertical documentation repository, use this repo as a template following the instructions in the [Using as a Template](#-using-as-a-template) section above.
