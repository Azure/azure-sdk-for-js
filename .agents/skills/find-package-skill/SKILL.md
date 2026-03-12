---
name: find-package-skill
description: '**UTILITY SKILL** — Locates package-specific domain knowledge skills for SDK packages in this monorepo. Load this first before modifying, regenerating, or debugging any SDK package. WHEN: "regenerate SDK from typespec", "modify SDK package", "fix bug in SDK", "change SDK library", "update SDK code".'
---

# Find Package Skill

Before modifying any SDK package in this monorepo, check this registry to see
if a package-specific skill exists. Package skills contain tribal knowledge
(architecture, data flows, type mappings, pitfalls) that prevents common mistakes.

Always check this registry before modifying any SDK package — even if you think
you already know the package well.

## How to Use

1. Find the package you're modifying in the table below.
2. Read the SKILL.md at the listed path using the Read tool to load the package's domain knowledge.
3. If the package isn't listed, no package-specific skill exists yet — proceed normally.

## Package Skills

| Package                   | Path                                                                   |
| ------------------------- | ---------------------------------------------------------------------- |
| `@azure/search-documents` | `sdk/search/search-documents/.agents/skills/search-documents/SKILL.md` |
