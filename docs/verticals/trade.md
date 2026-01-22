---
title: Trade Vertical
description: Trade imports, exports, and border control systems
---

The Trade vertical handles imports, exports, and border control systems for Defra.

## Key Systems

### IPAFFS (Import of Products, Animals, Food and Feed System)

Handles import notifications for animals, plants, and food products.

- **Integrations**: BTMS, DMP

### BTMS (Border Trade Matching Service)

Matches import notifications with customs declarations to ensure trade compliance.

- **Integrations**: HMRC CDS, IPAFFS, DMP

### DMP (Data Matching Platform)

Matches and reconciles data across multiple trade systems.

- **Integrations**: HMRC GVMS, BTMS, IPAFFS

## External Integrations

| System | Direction | Purpose |
|--------|-----------|---------|
| HMRC CDS | Inbound | Customs declarations |
| HMRC GVMS | Bidirectional | GMR matching |
| TRACES NT | Bidirectional | EU certificate exchange |
| Trade Platform | Bidirectional | Cross-government trade data |

## Documentation

For detailed Trade vertical documentation, see:

- [Trade Imports Documentation](https://github.com/DEFRA/trade-imports-documentation)
- [Interactive Diagrams](https://defra.github.io/trade-imports-documentation)

