---
name: apply-post-emitter-edits
description: 'Apply language-specific post-emitter fixes to ai-projects after a TypeSpec regeneration writes directly into src/ and generated/. Use when reviewing the working-tree diff from `npm run generate:client`, enforcing protected-file rules, reverting unwanted emitter changes (renames, parameter shapes, model deletions), and preparing the package for build verification. Runs after the regenerate-from-typespec skill.'
---

# Apply Post-Emitter Edits to ai-projects

The TypeSpec emitter writes **directly into `src/` and `generated/`**. This skill reviews that working-tree diff, enforces a list of standing rules (protected files, additions-only models, banned parameter shapes), and verifies the build. There is no `incoming/` staging directory and no three-way merge.

## When to Use

- Right after the `regenerate-from-typespec` skill has run `npm run generate:client`.
- `git status` shows uncommitted changes under `src/` and/or `generated/`.
- You need to apply the standing list of search/replace/rename workarounds to emitted code.
- You're verifying that protected hand-maintained files were not clobbered.

## Inputs

- The working-tree diff: `git diff -- sdk/ai/ai-projects/src sdk/ai/ai-projects/generated`.
- [references/post-emitter-workarounds.md](./references/post-emitter-workarounds.md) — protected files, additions-only models, `foundryFeatures` rule, `BetaEvaluatorsOperations.list` rule.

The canonical copy of the workarounds doc is [scripts/post-emitter-workarounds.md](../../../scripts/post-emitter-workarounds.md). If it has been updated, prefer it over the bundled reference.

## Procedure

Run from `sdk/ai/ai-projects/`.

### Step 0: Resolve diff3 conflict markers (if present)

`dev-tool customization apply` may emit literal git-style conflict markers (`<<<<<<<` / `|||||||` / `=======` / `>>>>>>>`) into `src/` files when the spec and the customization layer diverge in the same hunk. **Always take the custom side** (the block between `=======` and `>>>>>>>`):

```powershell
$conflicted = Get-ChildItem -Recurse -File src -Include *.ts |
  Select-String -Pattern '<<<<<<<' -SimpleMatch -List | ForEach-Object { $_.Path }
foreach ($f in $conflicted) {
  $content = Get-Content $f -Raw
  $pattern = '(?s)<<<<<<< [^\r\n]*\r?\n.*?\r?\n=======\r?\n(.*?)>>>>>>> [^\r\n]*\r?\n'
  $resolved = [regex]::Replace($content, $pattern, '$1')
  Set-Content -Path $f -Value $resolved -NoNewline
  Write-Host "$f resolved"
}
# Verify no markers remain anywhere:
Get-ChildItem -Recurse -File src -Include *.ts |
  Select-String -Pattern '<<<<<<<' -SimpleMatch -List | ForEach-Object { $_.Path }
```

If the custom side is missing a type that the spec side adds (common when the spec introduces a brand-new model type like `SessionLogEvent`), Step 2 will catch it. Don't try to merge sides by hand here.

### Step 1: Pre-flight — verify protected files are intact

Inspect `git diff` for the protected paths listed in [references/post-emitter-workarounds.md](./references/post-emitter-workarounds.md). If the emitter touched any of them, **revert those files and surface to a human**:

- `src/aiProjectClient.ts`, `src/constants.ts`
- `src/getCustomFetch-browser.mts`, `src/getCustomFetch.ts`
- `src/overwriteOpenAIClient.ts`, `src/util.ts`
- `src/api/aiProjectContext.ts`
- `src/api/telemetry/index.ts`, `src/api/telemetry/operations.ts`
- `src/api/datasets/operations.ts`
- `src/classic/telemetry/index.ts`, `src/classic/datasets/index.ts`, `src/classic/index.ts`
- `src/static-helpers/**`

Quick check (run from `sdk/ai/ai-projects/`):

```powershell
$protected = @(
  'src/aiProjectClient.ts','src/constants.ts','src/getCustomFetch-browser.mts',
  'src/getCustomFetch.ts','src/overwriteOpenAIClient.ts','src/util.ts',
  'src/api/aiProjectContext.ts','src/api/telemetry/index.ts','src/api/telemetry/operations.ts',
  'src/api/datasets/operations.ts','src/classic/telemetry/index.ts',
  'src/classic/datasets/index.ts','src/classic/index.ts'
)
$changed = git diff --name-only HEAD -- src
$violations = $changed | Where-Object { $protected -contains $_ -or $_ -like 'src/static-helpers/*' }
if ($violations) {
  Write-Warning "Protected files modified by emitter; reverting:`n$($violations -join "`n")"
  $violations | ForEach-Object { git checkout HEAD -- $_ }
}
```

### Step 2: Propagate new public-surface additions from generated/ to src/

**Critical**: `dev-tool customization apply` does **not** automatically copy newly emitted public types/operations into `src/` for files that have an existing customization layer. You must do this by hand.

For each file in `generated/` that gained new exports in this regen, copy those additions into the corresponding `src/` file. Most commonly affected:

- `generated/models/models.ts` → `src/models/models.ts` (new model interfaces, unions, serializers, deserializers)
- `generated/models/index.ts` → `src/models/index.ts` (new re-exports)
- `generated/api/<area>/operations.ts` → `src/api/<area>/operations.ts` (new operation methods)
- `generated/classic/<area>/index.ts` → `src/classic/<area>/index.ts` (new operations on the classic surface)

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
2. **Operations** (`src/api/.../operations.ts`): paste the new operation function plus its `*Send` and `*Deserialize` helpers, AND any new imports they require (e.g. `SessionLogEvent`, `sessionLogEventDeserializer`). **After pasting, re-apply Step 4 (a) below**: if the new method takes `foundryFeatures` as a positional parameter, refactor it to instantiate `foundryFeatures` locally instead.
3. **Classic surface** (`src/classic/.../index.ts`): paste the new method onto the operations interface and the factory return object. Same `foundryFeatures` rule.
4. **Beta union members** (e.g. a new `FabricIQPreviewTool` added to `ToolUnion`): also update the `*Serializer` / `*Deserializer` switch statements that dispatch on the union discriminator.

If nothing is missing, this step is a no-op — confirm and move on.

#### Step 2b: Detect and dedupe redeclared symbols

When a model moves locations between regens, the customization layer can leave both copies in place. Before moving on, scan for duplicate top-level exports in `src/models/models.ts`:

```powershell
$dups = Select-String -Path src/models/models.ts -Pattern '^export (interface|type|function|const|class) (\w+)' |
  ForEach-Object { $_.Matches[0].Groups[2].Value } |
  Group-Object | Where-Object { $_.Count -gt 1 }
$dups | ForEach-Object { Write-Host "DUP: $($_.Name) ($($_.Count) defs)" }
```

Known repeat offenders observed across regens: `MCPToolFilter`, `MCPToolRequireApproval`, `mcpToolFilterSerializer`, `mcpToolRequireApprovalSerializer` and their deserializers. When duplicated, **keep the earlier-defined block** and delete the later one (the later one is usually the spec-side that the customization apply failed to dedupe).

Also look for duplicate **properties within a single interface** (not just duplicate top-level exports) — `dev-tool customization apply` does not dedupe property-level conflicts. Symptom: TS2300 `Duplicate identifier 'status'` and TS1117 `An object literal cannot have multiple properties with the same name` on adjacent lines. Manually delete the second occurrence in both the interface and its deserializer.

### Step 3: Apply additions-only rule for models

Review `git diff` for `src/models/models.ts` and `src/models/index.ts` and revert any **deletions or modifications** to existing models — keep only the `+` lines (your own additions from Step 2).

```powershell
git diff HEAD -- src/models/models.ts src/models/index.ts
```

If the diff includes removals or renames you cannot easily isolate, restore the file from `HEAD` and then re-apply only the added model entries by hand.

### Step 4: Enforce per-rule reverts

From [references/post-emitter-workarounds.md](./references/post-emitter-workarounds.md):

- **`foundryFeatures` must NEVER be a positional method parameter** — but it IS allowed as a property on an `*Options` / `*OptionalParams` class (i.e. as a member of the options bag). Concretely:
  - **Allowed** — `foundryFeatures?: "Foo=V1Preview"` declared as a field on `BetaSkillsListOptionalParams`, then accessed via `options?.foundryFeatures`. The emitter does this by default for many list operations and it is fine.
  - **NOT allowed** — `foundryFeatures` appearing as a positional parameter on a method or `*Send` helper, e.g. `function _$deleteSend(context, name, foundryFeatures, options)` or `delete: (name, foundryFeatures, options) => ...`. If the emitter introduced this, revert to the prior signature and instantiate `foundryFeatures` as a local `const` inside the method body before sending it over the wire.

  ```powershell
  # Find positional-parameter cases (line ends in a comma after foundryFeatures, no `?:`):
  git diff HEAD -- src | Select-String 'foundryFeatures,'
  # Find local-const cases (allowed pattern, for reference):
  git diff HEAD -- src | Select-String 'const foundryFeatures ='
  ```
- **`BetaEvaluatorsOperations.list` must keep its name.** If the emitter renamed it to `listLatestVersions`, revert the rename (method name, all call sites, and any related type names).
  ```powershell
  git diff HEAD -- src | Select-String 'listLatestVersions'
  ```

### Step 5: Resolve style/convention drift

Walk the remaining diff and apply these conventions (the emitter routinely undoes them):

- **`import type` for type-only imports.** If the emitter rewrote `import type { Foo }` to a plain `import { Foo }`, restore the `import type` form and add any newly imported types to it.
- **`@azure/core-paging` for `PagedAsyncIterableIterator`.** If the emitter switched an import to `../static-helpers/pagingHelpers.js`, switch it back to `@azure/core-paging`.
- **Hand-written TSDoc.** If the emitter replaced hand-written TSDoc with a generated `/** model interface ... */` placeholder, restore the hand-written version.

General principle: when the emitted code disagrees with the prior `src/` style, prefer the prior `src/` convention.

### Step 5b: Sync renamed positional parameters in function bodies

When the customization layer renames a positional parameter (e.g. spec `agentSessionId` → custom `sessionId`, or spec `name` → custom `toolboxName` for toolbox operations), the **signature** is updated by the customization but the **body** of the function and any helper invocations are not. You will see TS2304 `Cannot find name 'agentSessionId'` errors. Fix in lockstep with the signature.

**Gotcha — never use a global string-replace.** A naive replace like `'name' -> 'toolboxName'` will turn existing `toolboxName` occurrences into `toolboxtoolboxName`. Always use a word-boundary regex and target specific lines:

```powershell
$lines = Get-Content -Path src/api/.../operations.ts
foreach ($ln in $linesToFix) {  # 1-based line numbers
  $i = $ln - 1
  $lines[$i] = $lines[$i] -replace '(?<![\w.])agentSessionId(?![\w])', 'sessionId'
}
$lines | Set-Content -Path src/api/.../operations.ts
```

Known rename pairs to watch for (signature → body must follow):

| File | Old (spec) | New (custom) |
| --- | --- | --- |
| `src/api/beta/agents/operations.ts` | `agentSessionId` | `sessionId` |
| `src/api/beta/toolboxes/operations.ts` | `name` | `toolboxName` |
| `src/classic/beta/toolboxes/index.ts` | `name` | `toolboxName` |

Also watch for the broken-signature pattern where the customization apply leaves a stray identifier in a parameter list, e.g. `result: Foo & Bar, SessionLogEvent,` in `_downloadSessionFileDeserialize`. Manually trim the extra token.

### Step 5c: Clean stray files

Remove leftover artifacts from the regen / customization process before building:

```powershell
Remove-Item -ErrorAction SilentlyContinue `
  src/restorePollerHelpers.ts, `
  metadata.json, `
  agent_version_lines.txt, `
  src/**/*.tmp, src/**/*.tmp2, src/**/*.bak
```

`src/restorePollerHelpers.ts` should not exist — there's a single `restorePollerHelpers.ts` under `generated/` only. `.tmp`, `.tmp2`, and `.bak` files are subagent scratch from earlier in the workflow.

### Step 6: Build and surface verification

```powershell
npx dev-tool run build-package
```

All four targets (browser, react-native, esm, commonjs) must succeed.

Then regenerate the API report and confirm the new public surface is present in it:

```powershell
npx dev-tool run extract-api
git diff -- review/ai-projects-node.api.md | Select-String '^\+' | Select-Object -First 40
```

**Spot-check that newly added types from Step 2 appear in `review/ai-projects-node.api.md`.** If a type was added to `generated/` but is missing from the API report, Step 2 was incomplete — go back and propagate it.

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
