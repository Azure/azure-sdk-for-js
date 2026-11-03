---
name: author-tests
description: "Reconcile existing ai-projects tests with regenerated API shapes and author skipped Vitest specs for new GA (non-beta) features. Existing test maintenance includes beta consumers; only new scaffolding is GA-only. Verify test compilation and targeted lint without running live tests."
---

# Maintain ai-projects tests and author new GA coverage

## When to Use

- After `apply-post-emitter-edits` has changed an API used by existing tests, including `project.beta.*` APIs.
- After it has merged in new public API surface that is **not** under `project.beta.*`.
- A new GA class, method, or namespace was added that has no test coverage yet under `test/`.

## Inputs

- The api-surface diff JSON from the `author-samples` skill (or recompute via [../author-samples/prompts/diff-api-surface.prompt.md](../author-samples/prompts/diff-api-surface.prompt.md)).
- The complete source/API diff against the clean pre-regeneration ref, including changed existing model properties and method signatures, not only additions.
- Existing test patterns in [test/snippets.spec.ts](../../../test/snippets.spec.ts).

## Procedure

Run from `sdk/ai/ai-projects/`.

### Step 0: Reconcile existing tests with the regenerated API

This step is mandatory even when there are no new GA features. The beta filter in
Step 1 applies only to **new test scaffolding**, not maintenance of existing tests.
Inspect affected call sites under `test/` against the finalized `src/` declarations,
serializers, and API report. Preserve each test's intent and assertions while
updating renamed methods, request/response shapes, and metadata construction or
access. On resumption, compare against the recorded clean pre-regeneration ref,
not a partially integrated `HEAD`.

For a compiler error caused by a verified API-shape change, make one focused
consumer-reconciliation pass and rerun Step 3 before declaring the workflow
blocked. Do not revert the intentional SDK change, cast away the error, add
`@ts-ignore`, skip an existing test, or weaken its assertions to get a green check.
Unexplained or still-failing errors remain STOP conditions.

**Known metadata shape:** when the regenerated property is typed as the SDK's
`Metadata` model, arbitrary keys belong in `additionalProperties`, not directly
on the object. For example, a response fixture in
`test/public/voiceIntegration.spec.ts` must use:

```ts
import type { VoiceAgentResponseCreateParams } from "../../src/index.js";

const response: VoiceAgentResponseCreateParams = {
  metadata: {
    additionalProperties: { purpose: "test" },
  },
};
```

`metadata: { purpose: "test" }` causes TS2353 for this model. The SDK serializer
flattens `additionalProperties`, so the expected **wire** metadata stays
`{ purpose: "test" }`; do not wrap mock HTTP responses or wire assertions.
Read SDK-side keys through `response.metadata?.additionalProperties?.["purpose"]`.
Apply this only to properties actually typed as the SDK `Metadata`: plain
`Record<string, string>` and OpenAI-client metadata maps still use direct keys.
Never globally replace every `metadata` literal.

Treat `test/snippets.spec.ts` as documentation source: update affected API usage
only when necessary and synchronize its linked snippets with
`npx dev-tool run update-snippets`. Do not refactor or remove snippets as test
cleanup.

### Step 1: Filter to GA surface only

For new test scaffolding, drop every entry where `isBeta === true` or where the namespace path matches `*.beta.*` / `Beta*`. Do not use this filter to skip Step 0 or compilation of existing beta tests.

### Step 2: Scaffold spec file(s)

For each remaining feature, generate a Vitest spec at `test/<feature>.spec.ts` (or extend an existing related spec) using [templates/test-skeleton.spec.ts](./templates/test-skeleton.spec.ts).

Conventions taken from `test/snippets.spec.ts`:

- Imports: `it`, `describe` from `vitest`; `AIProjectClient` from `../src/index.js`; `DefaultAzureCredential` from `@azure/identity`; types via `import type`.
- Endpoint from `process.env["FOUNDRY_PROJECT_ENDPOINT"]`, model from `process.env["FOUNDRY_MODEL_NAME"]`.
- Prefer `it.skip(...)` with a `TODO(<feature>): unskip after recording added` comment for every new test, so the suite stays green until a human captures recordings.

### Step 3: Verify compilation and linting

```powershell
npx tsc -p tsconfig.test.node.json --noEmit
npx eslint test/<new-or-edited-spec>.ts
```

Pass every new or edited spec path to the same ESLint invocation, including
existing specs changed in Step 0. If no test files changed, skip targeted ESLint.
The TypeScript command must still pass even when no new GA specs were needed.
If validation reveals a verified consumer mismatch, apply the focused remediation
from Step 0 and rerun both commands; stop if validation remains unsuccessful.

This skill is a documented no-op only when no new specs were needed, no existing
test or snippet files changed, and TypeScript validation passed. A maintenance-only
test change still requires the test commit group; do not pass `-TestsNoOp` to
`open-regeneration-pr` in that case.

Do not use `npm run test:node` as a compilation check. It runs the package's existing live and recorded suites and can stall or fail for service/environment reasons unrelated to the scaffolded tests.

### Step 4: Hand off

Done. Next: the `update-changelog` skill.

## Out of scope

- This skill **does not** create recordings (`assets.json`, `_recordings/`). Surface to the human if a recording is needed.
- This skill **does not** scaffold new beta tests. Existing beta tests must still be reconciled and compile.

## Notes

- **Watch for cascade renames from `apply-post-emitter-edits`.** If a method on the public surface was renamed (e.g. `listSessionFiles` → `getSessionFiles`), the TypeScript check can fail on existing specs that referenced the old name. Patch those call sites as part of this skill. Cross-reference the rename table in [../apply-post-emitter-edits/references/post-emitter-workarounds.md](../apply-post-emitter-edits/references/post-emitter-workarounds.md).
