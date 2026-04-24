# Phase 1: Scaffold SKILL.md 📝

> 📍 **Phase 1 — Scaffold SKILL.md** | Generate the main skill file with key sections.

> 📖 Read `references/skill-template.md` for the full template.

Using the package profile from Phase 0, generate a `SKILL.md` at:
```
sdk/<service>/<package-name>/.github/skills/<package-short-name>/SKILL.md
```

The skill directory name MUST match the `name` field in frontmatter. Use the short package name without the `@azure/` or `@azure-rest/` scope (e.g., `search-documents`, `cosmos`, `purview-catalog`). This is enforced by vally lint.

## Content Principles

- **Keep it static.** Document architecture, design patterns, and convenience layer patterns — things that rarely change. Do NOT include version numbers, current API versions, or anything that changes every release. The skill should be valid for years, not months.
- **Point to source code, not hardcoded lists.** When referencing things that change (method names, type names, enum values), point the agent to the authoritative source file instead of enumerating values in the skill.
- **Prefer TypeSpec customizations over source-level customizations.** When documenting customization patterns, always note: "Use source-level customizations (editing `src/` files) when TypeSpec cannot express the desired behavior. For TypeSpec-level customizations (preferred when possible), see [TypeSpec Client Customizations Reference](https://github.com/Azure/azure-sdk-tools/blob/main/eng/common/knowledge/customizing-client-tsp.md)."
- **Don't re-document MCP tools or shared skills.** The `sdk-workflow` shared skill and MCP tools (`azsdk_package_generate_code`, `azsdk_package_build_code`, etc.) already handle generation, build, and testing workflows. The package skill adds only what those tools don't know.
- **Focus on the convenience layer — when it exists.** The highest-value content is: how is the package designed, what convenience patterns exist, what does the agent need to know to write/maintain the convenience layer correctly. For mostly-generated or thin-wrapper packages, focus instead on entrypoints, exports, generation workflow, and any thin wrappers.

## Required Sections

### 1. Frontmatter

```yaml
---
name: <package-short-name>
description: '<Brief description>. WHEN: regenerate <package>; modify <package>; fix <package> bug; add <package> feature; <package> tsp-client update.'
---
```

Use semicolons for trigger phrases (YAML-safe). Include package name in every trigger.

### 2. Common Pitfalls (MUST be first section after heading)

List the most dangerous mistakes. Include items **conditionally based on the package shape** detected in Phase 0:

- **Never hand-edit files in `generated/`** — these are overwritten on every `tsp-client update`. All modifications go through editing `src/` files directly (the 3-way merge preserves your changes).
- **(If customization layout exists)** **"Check for merge conflicts in `src/` FIRST after regeneration"** — `dev-tool customization apply` performs a 3-way merge that can produce conflict markers.
- **(If `--skip index.ts` detected in generation script)** **`src/index.ts` is skipped during customization apply** — new exports must be manually added to the barrel export file.
- **(If customization layout exists)** **"Hand-authored files in `src/` with counterparts in `generated/` are merged. Files without counterparts are preserved as-is."**
- **(If mostly generated / thin wrapper)** Focus pitfalls on generation workflow, entrypoints, and exports — not convenience layer patterns.
- Any package-specific gotchas found during scanning

### 3. Architecture

- Source layout with `generated/` vs `src/` distinction
- Customization mechanism (`dev-tool customization apply`)
- Key modules and their purpose

### 4. Regeneration

**Do NOT re-document the generation/build/test workflow.** The `sdk-workflow` shared skill and MCP tools handle that. The package skill adds only:

- **Package-specific generation command** — document the actual script content from `package.json` (detected in Phase 0). Note any special flags. Do NOT assume the command shape — different packages use different scripts (`generate:client`, `customize`, `customization apply-v2`, or generation may be disabled).
- **Error categorization table** — which file to fix based on error type:
  - **(If customization layout)** Generated file in `generated/`, merged file in `src/`, hand-authored file in `src/`
  - **(If no customization layout)** Generated file in `src/`, hand-authored file in `src/`
- **Package-specific customization patterns** — what hand-authored files do and when they need updating
- **Breaking change detection** — what to look for after spec changes
- **(If service version management detected)** How the package handles API versions

### 5. Where to Make Changes

Add a table mapping goals to edit locations:

| Goal | Where to edit |
|---|---|
| Add/modify type conversions | `src/<relevant-utils>.ts` |
| Add/modify public model types | `src/<relevant-models>.ts` |
| Change how operations work | `src/<relevant-client>.ts` |
| Export a new public symbol | `src/index.ts` |

**Prefer extension points over editing generated-mirrored code.** Many files in `src/` are copies from `generated/` and will be updated on regeneration (via 3-way merge). Instead, add conversion helpers or custom models in hand-authored files.

### 6. Testing Notes

How to run tests, recorded test setup, environment requirements.

### 7. References table

Link to `references/architecture.md` and `references/customization.md`.

## Step 1 — Present

Generate the full SKILL.md content and print it. Use the package profile to fill in package-specific details. Mark sections where domain expertise is needed with `<!-- TODO: Domain expert to fill in -->`.

## Step 2 — CONFIRM

Question: "Create this SKILL.md now (recommended), edit first, or skip?"

If confirmed, create the skill directory and SKILL.md file.

📍 **Phase 1 complete** | Created: SKILL.md | Next: Phase 2

---
## → Next: Phase 2 — Generate References
Read [02-generate-references.md](02-generate-references.md) and begin immediately.
