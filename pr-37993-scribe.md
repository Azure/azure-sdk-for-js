# PR #37993 — [Projects] v2.1.0RC1 (@azure/ai-projects)

**Date:** 2026-04-10  
**Outcome:** issues_found (2 medium, 1 low)

## Findings
1. **README not updated (medium)**: New routes `beta.agents`, `beta.skills`, `beta.toolboxes` added but README intro section and preview operation groups list (line 130) not updated.
2. **CHANGELOG missing Bugs Fixed (medium)**: PR description mentions a `createFilePartDescriptor` bug fix but no `### Bugs Fixed` section in 2.1.0 CHANGELOG entry.
3. **snippets.spec.ts not updated (low)**: No snippet entries for new beta route groups; `toolboxesCrud.ts` sample exists but not wired into docs chain.

## Notes
- Pattern: existing beta features (memoryStores) have README sections + snippets entries
- `sdk/ai/ai-projects/test/snippets.spec.ts` and `README.md` had same SHA in PR and main
