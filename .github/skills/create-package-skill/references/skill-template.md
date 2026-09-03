# SKILL.md Template for Azure SDK Package Skills

Use this template when creating a new package skill. Replace placeholders with package-specific content.

```yaml
---
name: <package-short-name>
description: '<Brief description>. WHEN: regenerate <package>; modify <package>; fix <package> bug; add <package> feature; <package> tsp-client update.'
---
```

The `name` field and directory name MUST match the short package name without the `@azure/` or `@azure-rest/` scope (e.g., `search-documents`, `cosmos`, `purview-catalog`).

## Content Principles

- **Keep it static** — no version numbers, no current API versions. Document design and patterns, not release state.
- **Prefer TypeSpec customizations over source-level edits** — always note when a customization could be a TypeSpec decorator instead.
- **Don't re-document MCP tools or shared skills** — the `sdk-workflow` skill and MCP tools handle generation workflows.
- **Focus on the convenience layer** — what does the agent need to know to write/maintain convenience patterns correctly.

## Required Sections (in order)

### Common Pitfalls
List 3-5 most dangerous mistakes. This section MUST come first — agents read it before analyzing errors.

### Architecture
Source layout, `generated/` vs `src/` distinction, customization mechanism. No version numbers.

### Regeneration
Package-specific generation command and flags, error categorization table, breaking change detection. Do NOT re-document the generation/build/test steps — those are in the shared skill. Document the actual script content from `package.json` — do not assume the command shape.

### Where to Make Changes
Table mapping goals to edit locations. Emphasize preferring hand-authored extension points over editing generated-mirrored files (if applicable).

### Testing Notes
Commands, recorded test setup, environment requirements.

### References
Table linking to references/*.md files (e.g., `architecture.md`, `customization.md`).

## Structural Rules

| Rule | Enforced By |
|---|---|
| `name` matches directory name (= short package name) | `vally lint` |
| All markdown links resolve | `vally lint` |
| No orphaned reference files | `vally lint` |
| Code references still exist in codebase | Manual review |
| SKILL.md under 5000 tokens | `vally lint` |
| No version numbers or release-specific info | Manual review |
| Trigger phrases include package name | Manual review |
| No cross-language content | Manual review |
