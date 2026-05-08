---
applyTo: "sdk/**/{README.md,CHANGELOG.md},sdk/**/samples-dev/**/*.{ts,mts,cts},sdk/**/samples/**,sdk/**/test/snippets.spec.{ts,mts,cts},sdk/**/src/**/*.{ts,mts,cts},sdk/**/review/*.api.md,sdk/**/package.json"
description: "Azure SDK documentation review rules covering README, CHANGELOG, samples, TSDoc, and snippet synchronization."
---
# Documentation Review — Azure SDK Conventions

**Scope:** README, CHANGELOG, samples, snippets, TSDoc. Skip `src/generated/` comments, source logic, style.

## Snippet System (Source of Truth)
**Critical:** `test/snippets.spec.ts` is the source of truth for documentation code examples.
- Snippets are named test cases in `snippets.spec.ts`
- README/TSDoc reference them: `` ```ts snippet:ReadmeSampleCreateClient ``
- `pnpm run update-snippets` (or `npx dev-tool run update-snippets`) syncs test code into markdown fences (TypeScript and JavaScript)
- **New API added** → add snippet in `snippets.spec.ts` + reference in README
- **Signature changed** → update snippet first (old code won't compile), then run update-snippets
- **Naming convention:** `ReadmeSample<FeatureName>` (e.g., `ReadmeSampleCreateClient`, `ReadmeSampleListBlobs`)
- **Ignore markers:** `<!-- dev-tool snippets ignore -->` (markdown) or `// dev-tool snippets ignore` (TypeScript) opt out

**Flag if:**
- `snippets.spec.ts` changed but README fences show old code (need to run update-snippets)
- New public API without corresponding snippet
- Code fence missing `snippet:<name>` syntax

## README Structure
Required sections in order:
1. Title & description (matches package name)
2. Key links (source, npm, API reference, samples)
3. Getting started (environments, prereqs, `npm install @azure/<pkg>`)
4. Authentication (credential setup with code examples)
5. Key concepts (domain terminology)
6. Examples (using snippet references)
7. Troubleshooting
8. Next steps
9. Contributing

## CHANGELOG Format
```markdown
## <version> (YYYY-MM-DD) or (Unreleased)
### Features Added
- Description [#PR](link)
### Breaking Changes
### Bugs Fixed
### Other Changes
```
**Rules:**
- User-visible change requires changelog entry
- Correct section placement (breaking changes not under Features Added)
- PR/issue link required on each entry
- Top entry is unreleased version with `(Unreleased)` not date
- Released entries use `YYYY-MM-DD` format

## TSDoc Comments
All public exports need TSDoc:
- Classes: purpose, typical usage
- Methods: `@param` for each param, `@returns` for non-void
- Interfaces/types: when/why to use
- `@example` blocks should use snippet references
- `@param` names must match actual params — flag stale entries
- No `@internal` on exports from `src/index.ts` (contradiction)
- Use `@hidden` for exports kept for implementation but excluded from public docs
- Flag broken TSDoc: unclosed `{@link}`, malformed `@param`

## Samples
- **Source:** `samples-dev/*.ts` with `@summary` JSDoc comment describing what it demonstrates
- **Generated:** `samples/v<major>/typescript/` and `javascript/` (from samples-dev)
- New major feature → at least one sample demonstrating usage
- Samples must compile with current API — flag obvious errors
- `package.json` needs `//sampleConfiguration` with `productName`, `productSlugs`, `apiRefLink` for README generation via `npx dev-tool samples publish`

## API Report Alignment
When `review/*.api.md` changes:
- New exports need TSDoc + README examples
- Removed exports → CHANGELOG Breaking Changes entry
- `ae-forgotten-export` warnings indicate unexported types — must resolve

## Version Consistency
Must match across:
- `package.json` version (source of truth)
- CHANGELOG top heading (e.g., `## 1.2.0-beta.1 (Unreleased)`)
- `src/**/constants.ts` — `SDK_VERSION` or `packageVersion` used in user-agent headers and tracing

Release-prep PRs updating all together are normal workflow — don't flag coordinated version/date updates.
