# Modular SDK Customization Guide

> **Work in progress:** This guide is a placeholder. Complete it before this feature merges.

The modular customization workflow keeps emitter-owned source in `src/generated/`.
Package authors own the outer public barrels and handwritten implementations outside that directory.
Regeneration updates the generated source and preserves author-owned files.

## Planned content

- Preconditions for freshly generated packages with current emitter metadata.
- Initialization with `dev-tool customization init`.
- Custom client, model, and operation examples.
- Public exports through root and subpath barrels.
- Regeneration and validation.
- Limitations and unsupported layouts.
