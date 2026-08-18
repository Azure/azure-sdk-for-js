---
name: apply-post-emitter-edits
description: "Audit deterministic PostEmitter.ps1 fixes and apply semantic post-emitter edits after ai-projects TypeSpec regeneration. Use when classifying generated API changes, propagating genuine additions, validating non-additive changes against upstream commits, and reconciling the final public surface. Runs after the regenerate-from-typespec skill."
---

# Apply Post-Emitter Edits to ai-projects

The TypeSpec emitter writes **directly into `src/` and `generated/`**. `npm run generate:client` runs `PostEmitter.ps1` immediately after JavaScript customization to apply bounded deterministic repairs. This skill audits those postconditions, then performs the semantic work the hook deliberately cannot do: upstream-intent validation, three-way public-surface classification, genuine-addition propagation, additions-only decisions, and final API reconciliation.

When the preceding `regenerate-from-typespec` skill produced `temp/typespec-commit-descriptions.md`, use that file only to validate whether changed SDK source matches upstream TypeSpec intent. The standing workarounds still apply, but upstream commit descriptions can justify specific non-additive spec changes that should be preserved rather than reverted.

## When to Use

- Right after the `regenerate-from-typespec` skill has run `npm run generate:client`.
- `git status` shows uncommitted changes under `src/` and/or `generated/`.
- `temp/typespec-commit-descriptions.md` exists and should be used to validate that the post-merge SDK diff adheres to the upstream TypeSpec change descriptions.
- You need to verify that `PostEmitter.ps1` completed and left every deterministic postcondition satisfied.
- You need to classify and propagate public-surface changes that cannot be decided mechanically.

## Inputs

- The working-tree diff: `git diff -- sdk/ai/ai-projects/src sdk/ai/ai-projects/generated`.
- The `PostEmitter.ps1` rule-by-rule summary from `npm run generate:client`.
- `temp/typespec-commit-descriptions.md` from `regenerate-from-typespec` — upstream commit subjects and bodies for the old-exclusive/new-inclusive TypeSpec range.
- [references/post-emitter-workarounds.md](./references/post-emitter-workarounds.md) — protected files, additions-only models, `foundryFeatures` rule, `BetaEvaluatorsOperations.list` rule.

The canonical copy of the workarounds doc is [scripts/post-emitter-workarounds.md](../../../scripts/post-emitter-workarounds.md). If it has been updated, prefer it over the bundled reference.

## Procedure

Run from `sdk/ai/ai-projects/`.

Use this phase order to avoid mixing unrelated decisions:

| Phase          | Steps                    | Exit point                                                                                                                                         |
| -------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hook audit     | Step -1, Step 0, Step 1  | Upstream intent is known and every deterministic postcondition is satisfied.                                                                       |
| Public surface | Step 2, Step 2b, Step 3  | Genuine generated additions are copied into `src/`; existing models keep additions-only behavior unless upstream commits explicitly say otherwise. |
| Semantic style | Step 4, Step 5           | Automated rules remain satisfied and non-automated customization conventions are restored.                                                         |
| Verification   | Step 5b, Step 5c, Step 6 | Rename/scratch audits, build, API extraction, API reconciliation, and formatting all pass.                                                         |

### Recovery: customization stopped on a dirty target

`npm run generate:client` runs formatting before `dev-tool customization apply`. If the active formatter rewrites committed `src/` files, customization can stop with `Uncommitted changes were detected in the target directory` after generation has already updated `generated/`.

Do not regenerate again and do not restore all of `src/`. First confirm that regeneration preflight recorded a clean `src/` tree, inspect every current `src/` diff, and identify changes that are formatter-only. Restore only those proven formatter-created files, then apply customization to the already-emitted `generated/` tree:

```powershell
git diff -- src
git restore --source=HEAD -- <verified-formatter-only-files>
npx dev-tool customization apply
```

If any affected file had a user change before regeneration, stop and recover that change instead of restoring the file. After customization completes, run `npm run post-emitter`, then continue with Step 0.

### Step -1: Read the upstream validation guide

If `temp/typespec-commit-descriptions.md` exists, read it before resolving conflicts or reverting model changes. Extract the expected upstream themes (for example: added operations, renamed parameters, removed fields, required-vs-optional shape changes, hidden protocol methods). Use those descriptions to validate the final `src/`, `generated/`, and API report diffs.

Do not use the guide to keep extensive emitted-code changes that are unrelated to the captured upstream commit descriptions. Use it as the deciding evidence only for specific conflicts between a standing rule and an upstream-described TypeSpec change, such as a removed field, renamed parameter, requiredness change, or hidden protocol method. In particular, preserve non-additive model changes only when they are clearly described by the TypeSpec commits in the captured range.

### Step 0: Require deterministic hook success

`npm run generate:client` must finish its `npm run post-emitter` step successfully. If customization was run separately during dirty-target recovery, run the hook explicitly:

```powershell
npm run post-emitter
```

The hook must report success for every rule category: known diff3 conflicts, protected paths, generated import/export and operation renames, `api-version`, positional `foundryFeatures`, beta evaluator `list`, configured positional renames, Node built-in imports, the three job-aware pollers, and known duplicates/scratch files. It also runs `git diff --check`.

Stop if the hook fails or any postcondition remains unsatisfied. Do not repeat broad automatic edits manually. If the hook reports an unrecognized deterministic variant, add a bounded rule and fixture only when the intended behavior is unambiguous; otherwise surface the variant for human classification.

Conflict cleanup remains syntax-only. Step 2 must still determine whether the customized side omitted genuine generated additions. If a conflict-corrupted additions-only file shows broad existing-export removals, restore its clean committed baseline and reapply only classified additions.

### Step 1: Audit protected paths

Review the hook summary and confirm the protected paths in [references/post-emitter-workarounds.md](./references/post-emitter-workarounds.md) match `HEAD`. `PostEmitter.ps1` restores modified or deleted protected paths before any replacement rule runs and fails if a difference remains.

If a protected path still appears in `git diff`, stop. Do not reinterpret it as generated surface or reproduce the deleted JavaScript hook's user-agent rewrite.

### Step 2: Propagate new public-surface additions from generated/ to src/

**Critical**: `dev-tool customization apply` does **not** automatically copy newly emitted public types/operations into `src/` for files that have an existing customization layer. You must do this by hand.

For each file in `generated/` that gained new exports in this regen, copy those additions into the corresponding `src/` file. Most commonly affected:

- `generated/models/models.ts` → `src/models/models.ts` (new model interfaces, unions, serializers, deserializers)
- `generated/models/index.ts` → `src/models/index.ts` (new re-exports)
- `generated/api/<area>/operations.ts` → `src/api/<area>/operations.ts` (new operation methods)
- `generated/classic/<area>/index.ts` → `src/classic/<area>/index.ts` (new operations on the classic surface)

`PostEmitter.ps1` already propagates unambiguous generated symbol renames through named imports, named barrel exports, modular operations, and classic operation keys. Step 2 is still required for genuine additions, removals, aliases that intentionally differ from generated names, and any ambiguous/non-additive change.

**Detection script** — list every type/function exported from `generated/` that is missing in `src/`:

```powershell
$genFiles = Get-ChildItem -Recurse generated -Include *.ts -File
foreach ($g in $genFiles) {
  $rel = (Resolve-Path -Relative $g.FullName) -replace '^\.\\generated\\','src\'
  if (-not (Test-Path $rel)) { continue }
  $genExports = Select-String -Path $g.FullName -Pattern '^export (interface|type|function|const|class) (\w+)' |
    ForEach-Object { $_.Matches[0].Groups[2].Value }
  $srcExports = Select-String -Path $rel -Pattern '^export (interface|type|function|const|class) (\w+)' |
    ForEach-Object { $_.Matches[0].Groups[2].Value }
  $missing = $genExports | Where-Object { $_ -and ($srcExports -notcontains $_) }
  if ($missing) { Write-Host "$rel missing: $($missing -join ', ')" }
}
```

For each `missing` entry, **first classify it** as one of:

- **Rename** (customization side won during conflict resolution): the type's purpose already exists in `src/` under a different name. Examples observed: `_FileSearchToolFiltersValue` ↔ `_ComparisonFilterValue`, `_FileSearchToolFiltersFilter` ↔ `_CompoundFilterFilter`, `_updateAgentSend` ↔ `_updateSend`, `DeleteVersionOptionalParams` ↔ `BetaToolboxesDeleteVersionOptionalParams`, `listSessionFiles` ↔ `getSessionFiles`. **Action**: skip propagation. If the spec-side name is still referenced inside `src/models/models.ts` (e.g. inside a serializer body the customization didn't touch), add a private alias rather than copying the definition:
  ```ts
  /** Alias for _FileSearchToolFiltersValue (spec-rename of _ComparisonFilterValue) */
  type _FileSearchToolFiltersValue = _ComparisonFilterValue;
  ```
  Quick rename detector — count occurrences in gen vs src for each candidate; `gen=N, src=0` is a strong rename signal:
  ```powershell
  foreach ($n in $candidates) {
    $g = (Select-String -Path generated/models/models.ts -Pattern "\b$([regex]::Escape($n))\b" | Measure-Object).Count
    $s = (Select-String -Path src/models/models.ts       -Pattern "\b$([regex]::Escape($n))\b" | Measure-Object).Count
    Write-Host "$n : gen=$g src=$s"
  }
  ```
- **Genuine addition**: the type is new to the spec and has no equivalent in `src/`. Examples observed: `FabricIQPreviewTool`, `SessionLogEvent`, `TelemetryConfig`, `AgentVersionStatus`. **Action**: propagate per the buckets below.

Then, for each genuine addition:

1. **Models** (`src/models/models.ts`, `src/models/index.ts`): paste the new interfaces / serializers / deserializers / re-exports from `generated/`. The "additions only" rule means **only add**; never delete or modify existing entries even if `generated/` did so.
2. **Operations** (`src/api/.../operations.ts`): paste the new operation function plus its `*Send` and `*Deserialize` helpers, AND any new imports they require (e.g. `SessionLogEvent`, `sessionLogEventDeserializer`). Rerun `npm run post-emitter` after propagation so deterministic parameter/import/poller rules are reasserted.
3. **Classic surface** (`src/classic/.../index.ts`): paste the new method onto the operations interface and the factory return object. Same `foundryFeatures` rule.
4. **Beta union members** (e.g. a new `FabricIQPreviewTool` added to `ToolUnion`): also update the `*Serializer` / `*Deserializer` switch statements that dispatch on the union discriminator.

**ApiError / ErrorModel compatibility**: preserve the public error shape from `@azure/ai-projects` 2.1.1. `ApiErrorResponse` and `ErrorModel` are public; a standalone `ApiError` model is not part of the public API surface. If the emitter adds `ApiError`, `apiErrorDeserializer`, or `apiErrorArrayDeserializer` under `generated/`, do **not** propagate those symbols into `src/` exports or API review output. Keep `ApiErrorResponse.error` and job/resource `error` properties typed as `ErrorModel`, and deserialize them with `errorDeserializer`. Do not edit `generated/` just to remove emitted `ApiError`; doing so creates churn for the next merge.

If nothing is missing, this step is a no-op — confirm and move on.

#### Distinguish emitter additions from customization renames

Do not classify additions from only the current `generated/` versus current `src/` comparison. Conflict cleanup can make `src/` temporarily incomplete, and the customization layer intentionally keeps many symbols under names that differ from generated output.

Use this three-way test:

1. **Current `generated/` versus `HEAD:generated/`** identifies what the emitter actually added or removed in this regeneration.
2. **Current `generated/` versus `HEAD:src/`** identifies which emitted symbols were already represented by the committed customization layer.
3. **Current `generated/` versus cleaned current `src/`** identifies what still needs propagation after conflict cleanup.

A symbol is a genuine addition only when it is new relative to committed generated output, has no same-purpose symbol in committed customized source, and is still absent from cleaned current source. This prevents propagating known rename pairs and avoids copying `ApiError` merely because the generated name differs from the maintained `ErrorModel` surface.

For files with severe conflict churn, restore these additions-only/public-export files before running the three-way test:

```powershell
git restore --source=HEAD -- src/models/models.ts src/models/index.ts src/index.ts
```

Restore only files proven clean before regeneration. Never use this recovery on a file that contained user changes at preflight.

#### Step 2b: Audit declarations after conflict cleanup

`PostEmitter.ps1` removes the known duplicate `MCPToolFilter` / `MCPToolRequireApproval` declarations and the duplicate `AgentVersion.status` shapes. Scan for any other duplicate top-level exports in `src/models/models.ts`:

```powershell
$dups = Select-String -Path src/models/models.ts -Pattern '^export (interface|type|function|const|class) (\w+)' |
  ForEach-Object { $_.Matches[0].Groups[2].Value } |
  Group-Object | Where-Object { $_.Count -gt 1 }
$dups | ForEach-Object { Write-Host "DUP: $($_.Name) ($($_.Count) defs)" }
```

If an unfamiliar duplicate remains, stop and classify whether it represents a conflict-corrupted file or a genuine new shape. Do not extend the hook into general TypeScript deduplication.

### Step 3: Apply additions-only rule for models

Review `git diff` for `src/models/models.ts` and `src/models/index.ts` and revert any **deletions or modifications** to existing models — keep only the `+` lines (your own additions from Step 2) unless `temp/typespec-commit-descriptions.md` clearly describes the non-additive shape change.

Examples of commit-description-validated exceptions include a field explicitly removed upstream, a union member explicitly removed upstream, or response properties explicitly made required. When keeping one of these exceptions, make sure the API report reflects the same upstream intent.

```powershell
git diff HEAD -- src/models/models.ts src/models/index.ts
```

If the diff includes removals or renames you cannot easily isolate, restore the file from `HEAD` and then re-apply only the added model entries by hand.

### Step 4: Audit deterministic workaround postconditions

Confirm the final semantic edits did not reintroduce any automated drift:

- named imports/barrel exports do not retain a baseline model name when generated output contains one unambiguous renamed counterpart
- a modular/classic `$delete` does not remain when generated output contains an unambiguous semantic `delete<Model>` operation
- no `api%2Dversion` under `src/`
- no positional `foundryFeatures`; options-bag properties remain allowed
- no beta evaluator `listLatestVersions` surface; the separate `listVersions` remains
- no named `node:fs` or `node:path` import under `src/api/`
- the three job-create operations and classic interfaces use `JobPoller<T>`

Rerun `npm run post-emitter` after hand-propagating operations. A nonzero result is a STOP condition, not an invitation to repeat its replacements manually.

### Step 5: Resolve style/convention drift

Walk the remaining diff and apply these conventions (the emitter routinely undoes them):

- **`import type` for type-only imports.** If the emitter rewrote `import type { Foo }` to a plain `import { Foo }`, restore the `import type` form and add any newly imported types to it.
- **`@azure/core-paging` for `PagedAsyncIterableIterator`.** If the emitter switched an import to `../static-helpers/pagingHelpers.js`, switch it back to `@azure/core-paging`.
- **Hand-written TSDoc.** If the emitter replaced hand-written TSDoc with a generated `/** model interface ... */` placeholder, restore the hand-written version.

General principle: when the emitted code disagrees with the prior `src/` style, prefer the prior `src/` convention.

### Step 5b: Audit configured positional renames

`PostEmitter.ps1` reads [references/parameter-renames.yml](./references/parameter-renames.yml), confirms a customized signature already uses the new name, and updates only code tokens in that function body. Property accesses, object keys, substrings, and beta agent session-file identifiers are preserved.

If a regen surfaces a new deterministic signature/body mismatch, add a bounded entry to the rename table and a fixture to `scripts/test-post-emitter.ps1`, then rerun `npm run test:post-emitter` and `npm run post-emitter`. Do not use a global string replacement. A broken signature or ambiguous rename remains manual semantic work and is a STOP condition until classified.

### Step 5c: Audit scratch cleanup

Confirm `src/restorePollerHelpers.ts`, `metadata.json`, `agent_version_lines.txt`, and untracked `*.tmp`, `*.tmp2`, and `*.bak` files under `src/` are absent. `PostEmitter.ps1` removes `src/restorePollerHelpers.ts` immediately after protected-path restoration so a later rule failure cannot leave it behind; the tracked `generated/restorePollerHelpers.ts` remains. Tracked browser and React Native API diff reports must remain untouched.

### Step 6: Build and surface verification

```powershell
npx dev-tool run build-package
```

All four targets (browser, react-native, esm, commonjs) must succeed.

If `dev-tool` or one of its workspace dependencies is missing because a prior install was interrupted, recover the package dependency closure rather than reinstalling all workspace projects mid-regen:

```powershell
pnpm install --filter @azure/ai-projects...
```

If the repository's configured Azure Artifacts feed returns `401`, do not change or print credentials. After confirming the required packages are public or local workspace packages, retry the same filtered install with `--registry=https://registry.npmjs.org/`. Avoid an unfiltered `pnpm install` during post-emitter work: it can remove existing module directories before a feed failure and leave `dev-tool` only partially installed.

Then regenerate the API report and confirm the new public surface is present in it:

```powershell
npx dev-tool run extract-api
git diff -- review/ai-projects-node.api.md | Select-String '^\+' | Select-Object -First 40
```

**Spot-check that newly added types from Step 2 appear in `review/ai-projects-node.api.md`.** If a type was added to `generated/` but is missing from the API report, Step 2 was incomplete — go back and propagate it.

If `temp/typespec-commit-descriptions.md` exists, also spot-check that the API report changes line up with the upstream commit descriptions. For example, added operations/types should appear, hidden protocol methods should stay out of the public surface, and described removals or requiredness changes should be visible where applicable.

Finally:

```powershell
npm run check-format
```

## Hand-off

Once the build is green, hand off to the `author-samples` skill.

## Anti-patterns

- Do **not** "fix" a protected file even if its diff looks innocuous — revert it instead.
- Do **not** stage or commit before this skill completes; downstream skills (`author-samples`, `author-tests`, `update-changelog`, `open-regeneration-pr`) rely on the working-tree diff being intact.
- Do **not** introduce an `incoming/` staging directory or `git merge-file` workflow — the emitter writes directly to `src/` and `generated/`, and the workflow operates on the resulting `git diff`.
- Do **not** use unbounded `(Get-Content X) -replace 'old', 'new' | Set-Content X` for parameter renames — it silently corrupts substrings (`name` → `toolboxName` produced `toolboxtoolboxName`). Always use `(?<![\w.])old(?![\w])` word-boundary anchors and prefer per-line edits.
- Do **not** delegate the entire build-fix loop to a single subagent prompt with seven independent tasks — observed failure mode is the subagent stopping after 3 of N. Either run fixes inline or split into ≤3 fixes per subagent invocation.
- Do **not** trust `npx dev-tool run extract-api` after a single source edit — it may pick up stale `dist/` artifacts. Run `npm run build` (which cleans first) before re-extracting if the API report still shows old symbols.
- Do **not** trust a zero-result protected-file audit unless Git paths were normalized with `--relative`; repository-relative paths silently fail the package-relative comparison.
- Do **not** repair a conflict-corrupted model file one duplicate at a time when the diff shows broad existing-export removals. Restore the clean committed customization baseline and propagate only verified additions.
