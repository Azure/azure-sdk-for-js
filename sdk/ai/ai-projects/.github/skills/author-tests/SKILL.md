---
name: author-tests
description: 'Author skipped Vitest spec files for newly added non-beta ai-projects features under test/. Use when new GA (non-beta) classes, methods, or namespaces appear in review/ai-projects-node.api.md and need test coverage. Generates .skip-ped specs with TODO markers so a human can add recordings, then verifies the file compiles via npm run test:node.'
---

# Author tests for new ai-projects GA features

## When to Use

- After `apply-post-emitter-edits` has merged in new public API surface AND that surface is **not** under `project.beta.*`.
- A new GA class, method, or namespace was added that has no test coverage yet under `test/`.

## Inputs

- The api-surface diff JSON from the `author-samples` skill (or recompute via [../author-samples/prompts/diff-api-surface.prompt.md](../author-samples/prompts/diff-api-surface.prompt.md)).
- Existing test patterns in [test/snippets.spec.ts](../../../test/snippets.spec.ts).

## Procedure

Run from `sdk/ai/ai-projects/`.

### Step 1: Filter to GA surface only

From the api-surface diff, drop every entry where `isBeta === true` or where the namespace path matches `*.beta.*` / `Beta*`. **Beta surface is intentionally not test-covered by this skill.**

### Step 2: Scaffold spec file(s)

For each remaining feature, generate a Vitest spec at `test/<feature>.spec.ts` (or extend an existing related spec) using [templates/test-skeleton.spec.ts](./templates/test-skeleton.spec.ts).

Conventions taken from `test/snippets.spec.ts`:

- Imports: `it`, `describe` from `vitest`; `AIProjectClient` from `../src/index.js`; `DefaultAzureCredential` from `@azure/identity`; types via `import type`.
- Endpoint from `process.env["FOUNDRY_PROJECT_ENDPOINT"]`, model from `process.env["FOUNDRY_MODEL_NAME"]`.
- Prefer `it.skip(...)` with a `TODO(<feature>): unskip after recording added` comment for every new test, so the suite stays green until a human captures recordings.

### Step 3: Verify it compiles

```powershell
npm run test:node
```

`.skip`-ped tests will not run, but the file must compile and lint clean. Fix any TS or ESLint errors.

### Step 4: Hand off

Done. Next: the `update-changelog` skill.

## Out of scope

- This skill **does not** create recordings (`assets.json`, `_recordings/`). Surface to the human if a recording is needed.
- This skill **does not** test beta surface. Beta features live or die by samples + manual verification.

## Notes

- **Watch for cascade renames from `apply-post-emitter-edits`.** If a method on the public surface was renamed (e.g. `listSessionFiles` → `getSessionFiles`), `npm run test:node` will fail to compile *existing* specs that referenced the old name. Patch those call sites as part of this skill. Cross-reference the rename table in [../apply-post-emitter-edits/references/post-emitter-workarounds.md](../apply-post-emitter-edits/references/post-emitter-workarounds.md).
- `npm run test:node` will report runtime failures (missing env vars like `FOUNDRY_PROJECT_ENDPOINT`, missing recordings) for the *non-skipped* tests. Those are expected in this skill — only treat TypeScript / ESLint errors as blockers.
