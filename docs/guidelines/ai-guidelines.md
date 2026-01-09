---
title: AI-Assisted Documentation
description: How to structure documentation repositories for effective AI assistance
---

# AI-Assisted Documentation

## Overview

This guide covers how to structure documentation-as-code repositories so AI assistants can effectively help with writing, reviewing, and maintaining documentation and architecture diagrams.

For general AI tool usage, compliance requirements, and approved tools, see the [Defra AI Tools Guidance](https://defra.github.io/ai-sdlc-tool-guidance/).

## Structuring Repositories for AI

AI assistants work best when they can understand your project's structure and context. A well-organised repository helps AI generate accurate, consistent documentation.

### Recommended Structure

```
repository/
├── .cursor/                    # AI assistant rules
│   └── rules/
│       ├── docs_rules          # Documentation conventions
│       └── architecture_rules  # C4/diagram conventions
│
├── architecture/               # Machine-readable diagrams
│   ├── specification.c4       # Shared element definitions
│   └── current/               # Current state diagrams
│
├── docs/                       # Written documentation
│   ├── index.mdx              # Entry point
│   ├── guidelines/            # Process guidelines
│   └── systems/               # System documentation
│
├── generated/                  # Auto-generated outputs (gitignored)
│   ├── diagrams/              # Exported PNGs
│   ├── pdf/                   # Generated PDFs
│   └── pptx/                  # Generated presentations
│
└── README.md                   # Project overview
```

### Key Files AI Reads First

When you open a project, AI assistants typically read these files to understand context:

| File | Purpose |
|------|---------|
| `README.md` | Project overview, purpose, quick start |
| `.cursor/rules/*` | Project-specific instructions for AI |
| `docs/index.mdx` | Documentation entry point |
| `architecture/specification.c4` | Shared vocabulary and element definitions |

## AI Rules for Documentation

Create `.cursor/rules/` or appropriate files to give AI consistent guidance for your project.

### Documentation Rules

**`.cursor/rules/docs_rules`**
```
# Documentation Rules

## Repository Purpose
This repository contains documentation for [project name].
[Brief description of the system/domain]

## Structure
- docs/ contains markdown documentation
- architecture/ contains C4/LikeC4 diagrams
- generated/ contains auto-generated outputs (do not edit directly)

## Writing Conventions
- Use British English spelling
- Use markdown for all documentation
- Use ## for main sections (H1 is reserved for page title)
- Include frontmatter with title and description
- Keep paragraphs concise

## Publishing
Documentation is published to:
- GitHub Pages: [URL]
- Confluence: [space key]
```

### Architecture Rules

**`.cursor/rules/architecture_rules`**
```
# Architecture Diagram Rules

## LikeC4 Conventions
- Define reusable elements in specification.c4
- Use camelCase for element IDs (e.g., tradeSystem, hmrcCds)
- Include descriptions for all elements
- Group related elements using systemGroup

## View Types
- index: High-level landscape view
- *Context: System context showing external interactions
- *Container: Internal components of a system
- *Flow: Dynamic views showing runtime behaviour

## Relationships
- Use active voice for relationship labels (e.g., "sends to" not "is sent to")
- Include technology in relationship descriptions where relevant
```

## Writing AI-Friendly Documentation

### Clear Structure

Use consistent, predictable structure so AI can navigate and update documentation:

```markdown
---
title: Component Name
description: One-sentence summary
---

# Component Name

## Overview
What this component does and why it exists.

## Key Concepts
- **Term 1**: Definition
- **Term 2**: Definition

## How It Works
Description of behaviour.

## Dependencies
| System | Purpose |
|--------|---------|
| Service A | Provides X |
| Service B | Provides Y |

## Related Documentation
- [Link to related page](./related.md)
```

### Machine-Readable Diagrams

Use LikeC4 or Mermaid rather than images - AI can read and update text-based diagrams:

```c4
// AI can understand, modify, and extend this
model {
  customer = actor 'Customer' {
    description 'External user of the system'
  }
  
  webapp = system 'Web Application' {
    description 'Customer-facing portal for managing imports'
  }
  
  customer -> webapp 'Submits declarations'
}
```

## Multi-Repository Workspaces

### Public vs Private Repository Separation

A key principle for AI-assisted documentation is separating repositories by data classification:

| Folder | Contents | AI Access |
|--------|----------|-----------|
| `public/` | Open source code and documentation safe for AI | ✅ Include in AI workspace |
| `private/` | Sensitive code, credentials, internal systems | ❌ Never include in AI workspace |

**Only include public repositories in your AI-enabled workspace.** Private repositories should be worked on in a separate IDE instance without AI features enabled.

### Folder Structure

Organise your local repositories to clearly separate public from private, e.g:

```
~/Code/defra/
├── public/                           # ✅ Safe for AI - include in workspace
│   ├── trade-imports-documentation/  # 📚 Trade documentation
│   ├── delivery-information-architecture/  # 🏛️ Architecture template
│   ├── btms-backend/                 # 🔧 BTMS backend (open source)
│   ├── ipaffs-frontend/              # 🔧 IPAFFS frontend (open source)
│   ├── dmp-exports/                  # 🔧 DMP exports service (open source)
│   └── nrf-docs/                     # 🦎 Natural England docs
│
└── private/                          # ❌ Not for AI - separate workspace
    ├── internal-configs/             # Configuration with secrets
    ├── security-tooling/             # Security-sensitive code
    └── ...                           # Other restricted repos
```

### AI-Enabled Workspace Configuration

Create a multi-root workspace containing **only public repositories**:

**`trade-imports-public.code-workspace`**
```json
{
  "folders": [
    { "path": "public/trade-imports-documentation", "name": "📚 Trade Docs" },
    { "path": "public/delivery-information-architecture", "name": "🏛️ Architecture" },
    { "path": "public/btms-backend", "name": "🔧 BTMS Backend" },
    { "path": "public/ipaffs-frontend", "name": "🔧 IPAFFS Frontend" },
    { "path": "public/dmp-exports", "name": "🔧 DMP Exports" }
  ],
  "settings": {
    "likec4.workspace.root": "${workspaceFolder:🏛️ Architecture}/architecture"
  }
}
```

### Benefits of Including Public Source Code

When source code is made public and included in the workspace, AI can:

| Benefit | Example |
|---------|---------|
| **Verify documentation accuracy** | AI checks descriptions against actual code |
| **Discover undocumented behaviour** | AI identifies features not yet documented |
| **Understand integrations** | AI sees how services actually communicate |
| **Use correct terminology** | AI uses consistent naming from the codebase |
| **Generate diagrams from code** | AI creates C4 models based on actual dependencies |

### Example: Documenting BTMS

With public BTMS source code in the workspace, you can prompt:

```
Based on the btms-backend code, document how the matching algorithm works.
Look at the actual service implementations, not just the existing docs.
Update the C4 diagram if you find integrations not currently shown.
```

The AI can then:
1. Read the actual matching service code
2. Identify dependencies and external calls
3. Generate accurate documentation
4. Suggest updates to architecture diagrams

### Practical Tips

1. **Only include public repos** - Never add private repositories to an AI-enabled workspace
2. **Keep repos updated** - Run `git pull` regularly so AI sees current implementations
3. **Use consistent folder structure** - Clear `public/` vs `private/` separation
4. **Add rules per project** - Each repo can have its own `.cursor/rules/` for context
5. **Work on private code separately** - Use a different IDE instance without AI or disable it for sensitive work

## Effective Prompts for Documentation

### Creating New Documentation

```
Create documentation for [component/system] that includes:
- Overview explaining what it does
- Key concepts with definitions
- How it integrates with [related systems]

Follow the structure in our docs/ directory.
Reference the C4 model in architecture/ for system relationships.
```

### Creating Architecture Diagrams

```
Create a LikeC4 view showing [scope - e.g., "how BTMS processes matches"].
Use elements from architecture/specification.c4.
Follow our naming conventions (camelCase IDs).
Include descriptions for new elements.
```

### Updating Existing Content

```
Update [file path] to reflect that [change description].
Maintain the existing structure and style.
Update any related C4 diagrams if system relationships changed.
```

### Reviewing Documentation

```
Review this documentation for:
- Accuracy against the C4 model
- Consistency with related pages
- Missing information
- Outdated content
```

## Data Considerations

When using AI with documentation repositories:

| Content Type | AI Usage |
|-------------|----------|
| Public architecture | ✅ Fine to use |
| System descriptions | ✅ Fine to use |
| Process documentation | ✅ Fine to use |
| API credentials/tokens | ❌ Never include |
| Personal data examples | ❌ Never include |
| Security configurations | ❌ Never include |

See the [Defra AI Tools Guidance](https://defra.github.io/ai-sdlc-tool-guidance/) for full data classification requirements.

## Further Reading

- [Defra AI Tools Guidance](https://defra.github.io/ai-sdlc-tool-guidance/) - Approved tools and compliance
- [Documentation as Code](./documentation-as-code.md) - Our docs-as-code approach
- [AI in the SDLC Playbook](https://defra.github.io/ai-sdlc-playbook/) - Broader AI adoption guidance
