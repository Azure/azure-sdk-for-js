# Regenerate `@azure/ai-projects` from TypeSpec

You are running as a GitHub Copilot coding-agent task on the
`Azure/azure-sdk-for-js` repository (or a fork). Your job is to regenerate
the `@azure/ai-projects` package from the latest TypeSpec spec, fix up the
emitter output, author samples and tests for any new public surface, update
the changelog, and open a **draft** pull request.

Inputs (substituted by `start-cloud-regen.ps1` before dispatch):

- TypeSpec commit SHA: `{{TSP_COMMIT}}`
- Target branch name: `{{BRANCH_NAME}}`

## Setup

1. From the repo root, install dependencies and build the package:
   ```bash
   pnpm install --filter @azure/ai-projects...
   pnpm --filter @azure/ai-projects... build
   ```
   If either command fails because of network sandboxing, **STOP** and
   surface the error — do not invent workarounds. The launcher has a
   documented caveat about this.
2. `cd sdk/ai/ai-projects/`. All subsequent commands run from this
   directory unless a SKILL.md says otherwise.
3. Confirm the working tree is clean under `sdk/ai/ai-projects/`:
   ```bash
   git status -- .
   ```
   If it is dirty, **STOP** and surface the diff.

## Skill execution order

Read each `SKILL.md` in full **before** executing it. Skills live under
`sdk/ai/ai-projects/.github/skills/` and are not auto-loaded by the agent
runtime — you must read them explicitly. Pass the inputs listed below.

### 1. regenerate-from-typespec

Read: `sdk/ai/ai-projects/.github/skills/regenerate-from-typespec/SKILL.md`

Pass the resolved commit SHA explicitly:

```powershell
./.github/skills/regenerate-from-typespec/scripts/update-tsp-commit.ps1 -Commit {{TSP_COMMIT}}
npm run generate:client
./.github/skills/regenerate-from-typespec/scripts/update-tsp-commit.ps1 -RestoreOnly
```

The third call must run whether `npm run generate:client` succeeded or
failed — wrap in `try/finally` if executing programmatically.

### 2. apply-post-emitter-edits

Read: `sdk/ai/ai-projects/.github/skills/apply-post-emitter-edits/SKILL.md`

Walk every step in order. Pay particular attention to:

- Step 0 (resolve diff3 conflict markers) — always take the custom side.
- Step 1 (protected files) — revert any emitter edits to the listed paths.
- Step 2 (propagate new public surface from `generated/` to `src/`) — this
  is the most error-prone step; classify each missing export as either a
  rename or a genuine addition before propagating.
- Step 4 (`foundryFeatures` and `BetaEvaluatorsOperations.list` rules).
- Step 5b — apply the rename pairs from
  [references/parameter-renames.yml](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/ai/ai-projects/.github/skills/apply-post-emitter-edits/references/parameter-renames.yml)
  using word-boundary regex only; never a global string replace.
- Step 6 — `npx dev-tool run build-package` must succeed for all four
  targets, then `npx dev-tool run extract-api`, then
  `npm run check-format`.

If you cannot resolve a build error after one focused attempt, **STOP**
and surface the failing diff plus the error message — do not loop.

### 3. author-samples

Read: `sdk/ai/ai-projects/.github/skills/author-samples/SKILL.md`

Author samples for any non-trivial new public surface that landed in
Step 2 of the previous skill. Validate with `npm run build:samples`.

### 4. author-tests

Read: `sdk/ai/ai-projects/.github/skills/author-tests/SKILL.md`

Generate `.skip`-ped Vitest specs for new GA (non-beta) features only.
Do not attempt to record cassettes. Validate with `npm run test:node`.

### 5. update-changelog

Read: `sdk/ai/ai-projects/.github/skills/update-changelog/SKILL.md`

Update `CHANGELOG.md` for this regen by merging into the existing top
`(Unreleased)` entry when present; otherwise create a new top entry,
classifying each change into Breaking / Features / Bugs / Other, and
sync `package.json` as required by the skill.

### 6. open-regeneration-pr

Read: `sdk/ai/ai-projects/.github/skills/open-regeneration-pr/SKILL.md`

Run:

```powershell
./.github/skills/open-regeneration-pr/scripts/open-pr.ps1 -TspCommit {{TSP_COMMIT}} -BranchName {{BRANCH_NAME}}
```

This stages the five logical commits, pushes to `origin` (no force), and
opens a DRAFT PR via `gh pr create`.

## Success criteria

- `git log --oneline` on `{{BRANCH_NAME}}` shows exactly five
  `[ai-projects] regen: ...` commits in the order: emitter output,
  post-emitter edits, samples, tests, changelog.
- The PR is open as a **draft** against the base branch with title
  `[ai-projects] Regenerate from azure-rest-api-specs@<short-sha>`.
- `npx dev-tool run build-package` is green for all four targets on the
  final commit.
- `review/ai-projects-node.api.md` reflects every newly added public type.
- Print the PR URL as the final line of your output.

## When to STOP and surface to a human

- Any setup command fails because of network sandboxing.
- A protected file under `src/` was modified by the emitter and you cannot
  cleanly revert it.
- `apply-post-emitter-edits` Step 2 classification is genuinely ambiguous
  (i.e. you cannot tell if a missing export is a rename or a new type).
- The `foundryFeatures` rule is violated in a shape not covered by Step 4.
- `npm run test:node` fails for reasons unrelated to missing recordings
  (e.g. a TypeScript error in a generated test file).
- Any step's documented success criteria are not met after one focused
  remediation attempt.

In every "STOP" case, leave the working tree as-is, do **not** push or
open a PR, and report the failing command + error in your final message.
