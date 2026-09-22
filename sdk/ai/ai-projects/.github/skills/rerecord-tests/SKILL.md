---
name: rerecord-tests
description: 'Re-record the ai-projects live test suite, push only the recordings whose playback passes to the Azure/azure-sdk-assets repo, and open a PR for the updated assets.json. Use when test recordings are stale, a recorded test fails in playback in CI, or new recorded tests need fresh recordings. Wraps TEST_MODE=record / TEST_MODE=playback runs, dev-tool test-proxy push, and a single-file assets.json PR via the gh CLI.'
---

# Re-record ai-projects tests and publish recordings

Records the live test suite for `@azure/ai-projects`, verifies the new
recordings play back green, pushes **only the passing** recordings to the
`Azure/azure-sdk-assets` repo, and opens a PR that contains just the updated
`assets.json` tag.

This package uses the **asset-sync** workflow: recordings live in
`Azure/azure-sdk-assets`, not in this repo. The only file that lands in a PR is
[`assets.json`](../../../assets.json), whose `Tag` points at the pushed
recordings. See [`sdk/test-utils/recorder/ASSET_SYNC_WORKFLOW.md`](../../../../../test-utils/recorder/ASSET_SYNC_WORKFLOW.md).

## When to Use

- Recordings are stale and the recorded test suite fails in `playback` mode.
- New recorded tests were added (e.g. after the `author-tests` skill) and need
  real recordings captured against live Azure resources.
- A deliberate re-record is requested to refresh `assets.json`.

## Prerequisites

- **Live Azure access.** Record mode hits real Foundry resources. You must be
  authenticated (`az login`, or a working `DefaultAzureCredential`) and have the
  test environment variables populated. Key ones (see
  [`test/public/utils/createClient.ts`](../../../test/public/utils/createClient.ts)):
  `FOUNDRY_PROJECT_ENDPOINT`, `FOUNDRY_MODEL_NAME`, `FOUNDRY_AGENT_NAME`,
  `AZURE_AI_PUBLISHED_ENDPOINT`, `MODEL_ENDPOINT`, plus the connection-id vars
  for the tool tests. Missing vars only fail the tests that need them — those
  recordings are simply not pushed (see "Only passing recordings", below).
- **Write access to `Azure/azure-sdk-assets`.** Required by `test-proxy push`.
  [Request access here](https://dev.azure.com/azure-sdk/internal/_wiki/wikis/internal.wiki/785/Externalizing-Recordings-(Asset-Sync)).
- **`pwsh`** and the **`gh`** CLI installed and authenticated against
  `Azure/azure-sdk-for-js`.
- A clean working tree apart from changes under `sdk/ai/ai-projects/`.

## Procedure

Run everything from `sdk/ai/ai-projects/`. The flow mirrors the asset-sync
diagram: **record → verify in playback → push → commit `assets.json` → PR**.

### Step 1: Restore current recordings (baseline)

```powershell
npx dev-tool test-proxy restore
```

Pulls the recordings referenced by the current `assets.json` so re-recording
diffs against a known baseline.

### Step 2: Record, verify playback, and (optionally) push

```powershell
./.github/skills/rerecord-tests/scripts/rerecord.ps1
```

The script ([scripts/rerecord.ps1](./scripts/rerecord.ps1)):

1. Runs the suite in **record** mode (`TEST_MODE=record npm run test:node`),
   writing fresh recordings into the repo-root `.assets/` working tree.
2. Runs the suite again in **playback** mode (`TEST_MODE=playback`) with **no**
   live env vars, to prove the recordings are self-contained.
3. If any spec **failed** playback, it refuses to push and prints the exact
   manual steps to drop the failing recordings (so only passing recordings are
   ever published — see "Only passing recordings").
4. Stops there by default. Pass `-Push` to also run `npx dev-tool test-proxy
   push`, which uploads the kept recordings and rewrites the `Tag` in
   `assets.json`. `-Push` is ignored when playback is red.

Useful flags:

- `-TestFilter <pattern>` — scope to a subset (passed through to the vitest
  runner) instead of the whole suite.
- `-Push` — push recordings and update `assets.json` after a green playback.
- `-SkipRecord` — skip record mode and only re-run playback verification
  (useful after manually fixing a recording).

### Step 3: Push recordings (if not already pushed)

If you ran Step 2 without `-Push`, push once playback is green:

```powershell
npx dev-tool test-proxy push
```

This updates the `Tag` field in `assets.json`. Confirm the diff:

```powershell
git --no-pager diff -- assets.json
```

Only the `Tag` line should change. The recordings are now visible at
`https://github.com/Azure/azure-sdk-assets/tree/<new-tag>`.

### Step 4: Open the assets.json PR

```powershell
./.github/skills/rerecord-tests/scripts/open-assets-pr.ps1
```

The script ([scripts/open-assets-pr.ps1](./scripts/open-assets-pr.ps1)):

1. Aborts if `assets.json` has no change, or if there are changes outside
   `sdk/ai/ai-projects/assets.json` (the only file this PR should touch).
2. Creates branch `rerecord/ai-projects/<yyyyMMdd-HHmm>` from `HEAD`.
3. Commits **only** `assets.json` with message
   `[ai-projects] Re-record tests: update assets.json`.
4. Pushes to `origin` (never force) and opens a **draft** PR via `gh`, with a
   body that links the new assets tag and lists the verification checklist.

## Only passing recordings

The user contract is "push the recordings that pass." A recording is "passing"
only if its spec is green in **playback** mode (Step 2.2). When playback is red,
the script refuses to push and tells you to drop the failing recordings first,
so the assets tag never publishes a broken recording.

To inspect or hand-tune what will be pushed:

1. Run `npx dev-tool test-proxy diff` — it locates the `.assets/<hash>/` clone
   (via `.assets/.breadcrumb`) and prints the changed recording files for this
   package.
2. `cd` into that clone dir and `git restore <file>` (or `git clean`) any
   recording you do **not** want pushed.
3. Return to `sdk/ai/ai-projects/` and run `npx dev-tool test-proxy push` (or
   `./.github/skills/rerecord-tests/scripts/rerecord.ps1 -SkipRecord -Push`).

## Out of scope

- **Does not provision or configure live Azure resources or env vars.** If
  record mode can't authenticate, surface that to the human — do not fabricate
  recordings.
- **Does not edit test source** (`test/**`). If a spec needs a code change to
  record cleanly, that belongs to the `author-tests` skill or a human.
- **Does not flip the PR to ready-for-review** — humans do that.

## Safety rails

- **Never** runs `git push --force` / `--force-with-lease`.
- **Never** commits anything other than `assets.json`. Recordings live in the
  assets repo, not here.
- **Never** pushes recordings for specs that failed playback.
- Aborts if the working tree is dirty outside `sdk/ai/ai-projects/`.

## Notes

- Record mode is slow and bills real services; prefer `-TestFilter` while
  iterating on a single failing spec, then do a full run before pushing.
- If playback fails right after a successful record, the recording likely
  contains an unsanitized value or a non-deterministic field. Re-run with
  `dev-tool run test:vitest --test-proxy-debug` to see sanitizer activity, fix
  the sanitizer in `test/public/utils/createClient.ts`, and re-record.
- `npm run test:node` runs **both** recorded and unit-style specs. Pure unit
  specs (e.g. `test/public/tracing/*.spec.ts`) don't produce recordings and are
  unaffected by record/playback mode.
