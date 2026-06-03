# SDK Regenerate Pipeline — Upstream Issues & Local Workarounds

This document lists known upstream defects surfaced by `eng/pipelines/sdk-regenerate.yml`,
and the workarounds (if any) we currently carry locally. **Every workaround here
should be deleted once the corresponding upstream issue is fixed.**

> Maintainer reminder: when you touch any item below, also re-trigger the
> regenerate pipeline (or its `QuickTest` mode) to confirm the workaround is
> still necessary / still works.

## Legend
- 🔴 **active workaround** in this repo — has to stay until upstream lands
- 🟡 **no workaround** — pipeline accepts the failure / asks operator to retry
- ✅ **fixed upstream** — workaround removed

---

## 1. 🔴 `@typespec/xml` and `@typespec/sse` missing from `eng/emitter-package.json`

| | |
|---|---|
| Discovered | 2026-06-03 `Build 6388211` (shard al_al_0) |
| Symptom | `tsp compile` reports `js-error: Cannot find package '@typespec/xml' imported from .../@azure-tools/typespec-client-generator-core/dist/src/types.js`, followed by ~20 cascading `missing-implementation` errors on every TCGC `extern dec`. |
| Root cause | The dev build of `@azure-tools/typespec-client-generator-core` `require`s `@typespec/xml` and `@typespec/sse` at runtime, but `eng/emitter-package.json` in `main` does not declare them as dependencies → `npm ci` does not install them → emitter crashes during tsp compile. |
| Upstream repos | `Azure/azure-sdk-for-js` (the `emitter-package.json` lives here) and/or `Azure/autorest.typescript` (the emitter that creates the implicit dependency). |
| Suggested fix | Add `@typespec/xml` and `@typespec/sse` to `eng/emitter-package.json` at the same `0.82.x` version line as `@typespec/events`, **and** declare them as explicit `peerDependencies` of `@azure-tools/typespec-ts` so future emitter updates can`t silently break this again. |
| Local workaround | In `eng/pipelines/sdk-regenerate.yml`, the **Prepare emitter + spec repo** step runs an inline `node -e` that patches the two packages into `eng/emitter-package.json` before `tsp-client generate-lock-file`: <br><pre>const v = j.dependencies["@typespec/events"] \|\| "0.82.0";<br>j.dependencies["@typespec/xml"] \|\|= v;<br>j.dependencies["@typespec/sse"] \|\|= v;</pre> |
| When to remove | After `eng/emitter-package.json` on `main` lists `@typespec/xml` and `@typespec/sse`. |

---

## 2. 🔴 ERESOLVE peer-dep drift between dev `typespec-ts` and pinned `typespec-client-generator-core`

| | |
|---|---|
| Discovered | 2026-06-03 `Build 6387896` (all 10 shards), confirmed `Build 6388155` |
| Symptom | `tsp-client generate-lock-file` and the downstream `npm ci` inside `TypeSpec-Project-Generate.ps1` both fail with `npm error code ERESOLVE`: <br>`peer @azure-tools/typespec-client-generator-core@"^0.68.3" from @azure-tools/typespec-ts@0.54.0-alpha.X` <br> vs `eng/emitter-package.json` pinning `0.68.2`. |
| Root cause | The pipeline always pulls **the latest `dev` tag** of `@azure-tools/typespec-ts`, but its transitive peer-dep ranges drift faster than `eng/emitter-package.json` in `main`. Whenever the emitter bumps its `^0.68.x` minimum, the lock-file regeneration fails. |
| Upstream repos | `Azure/autorest.typescript` (the emitter publishing the dev tag) and `Azure/azure-sdk-for-js` (the `emitter-package.json` baseline). |
| Suggested fix | Either (a) automate a daily PR that re-pins `emitter-package.json` transitive versions to whatever the latest `typespec-ts` dev requires, or (b) loosen the explicit pins (`^0.68.0` instead of `0.68.2`) so npm`s resolver can satisfy newer peer ranges. |
| Local workaround | In the **Prepare emitter + spec repo** step we set `npm config set legacy-peer-deps true` on the agent before `tsp-client generate-lock-file`. The setting is written to `~/.npmrc`, so it also applies to the later `npm ci` triggered by `TypeSpec-Project-Generate.ps1`. |
| When to remove | After a sustained run of green pipelines without the `legacy-peer-deps` flag (i.e. once dev-tag updates stop introducing peer-dep conflicts, or once the emitter package surface is reorganised to avoid them). |

---

## 3. 🟡 Nested duplicate workspaces in generated output

| | |
|---|---|
| Discovered | Pre-refactor, original `regenerate-runner.js` shipped `cleanupNestedDuplicateWorkspaces()` / `detectNestedDuplicateWorkspaces()` (~72 LOC). |
| Symptom | After regeneration, some packages contained a nested copy of themselves at `sdk/<service>/<pkg>/sdk/<service>/<pkg>/...` with its own `package.json`. pnpm / turbo refuse to operate on a workspace with nested duplicate package roots. |
| Root cause | The emitter mis-resolves `emitter-output-dir` for certain `tspconfig.yaml` shapes, writing into a sub-path that mirrors the absolute output path. |
| Upstream repo | `Azure/autorest.typescript` |
| Suggested fix | Resolve `emitter-output-dir` against the emitter`s output root, not against the absolute output path. |
| Local workaround | **None.** The post-refactor pipeline deliberately does **not** carry this workaround. If it recurs, the per-shard `pnpm turbo build` step will fail; treat that as a signal to file/escalate this upstream issue. |
| Status | Believed dormant in current emitter; mentor flagged for upstream filing during PR #38604 review. |

---

## 4. 🟡 Generated `warp.config.yml` references `config/tsconfig.src.*.json` files the emitter does not create

| | |
|---|---|
| Discovered | Pre-refactor, original `regenerate-runner.js` shipped `scaffoldWarpConfigs()` (~45 LOC). |
| Symptom | Per-package `warp build` fails with `Cannot find tsconfig.src.cjs.json` (and esm / browser / react-native variants). |
| Root cause | The emitter emits `warp.config.yml` that points at `config/tsconfig.src.*.json` but does not also emit those tsconfig files. |
| Upstream repo | `Azure/autorest.typescript` |
| Suggested fix | Either emit the missing tsconfig files alongside `warp.config.yml`, or change `warp.config.yml` to reference the repo-shared tsconfigs at `eng/tsconfigs/*.json` directly. |
| Local workaround | **None** in the refactored pipeline. |

---

## 5. 🟡 Generated code imports `@azure/logger`, `@azure/core-util`, etc. without declaring them as `dependencies`

| | |
|---|---|
| Discovered | Pre-refactor, original `regenerate-runner.js` shipped `patchMissingDependencies()` (~73 LOC). |
| Symptom | `pnpm turbo build` fails for some generated packages with `Cannot find module '@azure/logger'` (or `@azure/core-util`, `@azure/core-lro`, `@azure/core-paging`, `@azure/abort-controller`). |
| Root cause | The emitter generates `src/**/*.ts` that imports these `@azure/*` packages but does not add them to `package.json`'s `dependencies`. |
| Upstream repo | `Azure/autorest.typescript` |
| Suggested fix | When the emitter writes an import for an `@azure/*` runtime, also add a corresponding entry to the generated `package.json`'s `dependencies` at the appropriate caret-range. |
| Local workaround | **None** in the refactored pipeline. |

---

## 6. ✅→removed `eng/scripts/update-changelog-content.ps1` Windows-backslash bug

| | |
|---|---|
| Discovered | 2026-06-03 `Build 6388255` (changelog 0/3 on Linux agent) |
| Symptom | Shard's changelog step prints `EUSAGE: The npm ci command can only install with an existing package-lock.json` for every package, even though `eng/tools/js-sdk-release-tools/package-lock.json` exists. |
| Root cause | The wrapper script `eng/scripts/update-changelog-content.ps1` calls `npm --prefix eng\tools\js-sdk-release-tools ci`. Linux agents don't treat `\` as a path separator → npm runs `npm ci` against the current dir, which has no lock file. |
| Upstream repo | `Azure/azure-sdk-for-js` (this repo, owned by the release-tools team) |
| Suggested fix | Use `Join-Path` (or forward slashes) in `update-changelog-content.ps1` so it works on Linux and Windows. |
| Local workaround | **None in a script** — instead `regenerate-shard.js` now bypasses the wrapper completely and invokes the underlying CLI directly: `npm --prefix eng/tools/js-sdk-release-tools exec --no -- update-changelog -- ...`. The shard's Prepare step pre-installs `js-sdk-release-tools` once so the per-package call is fast. |
| When to remove | When the wrapper is fixed and we'd rather route through it for parity with manual-developer flows. Until then, the direct call is *less* code than going through the wrapper. |

---

## 7. 🟡 `New-RegenerateMatrix.ps1 -OnlyTypeSpec true` is the only filter for "regen-able" packages

| | |
|---|---|
| Discovered | While refactoring, per mentor`s PR #38604 audit (row 4). |
| Symptom | Packages whose `tsp-location.yaml` is missing or malformed are silently skipped — there is no list surfaced anywhere of "ARM directories that **should** be regen-able but lack a usable `tsp-location.yaml`". |
| Root cause | `New-RegenerateMatrix.ps1` was designed for the .NET pipeline and only returns the include-set, not the exclude-set. |
| Upstream repo | `Azure/azure-sdk-tools` (script lives in `eng/common/`) |
| Suggested fix | Extend `New-RegenerateMatrix.ps1` with `-EmitExcluded <path>` so each pipeline can surface the diff between "all candidate dirs" and "regen-able candidate dirs". |
| Local workaround | **None.** The previous version of the pipeline carried a Setup-stage scanner (`skipped-no-tsp-location.json`); we dropped it in the refactor because it was 25 LOC for a low-signal report. Re-add only if a TPM asks. |

---

## Summary — currently active local patches

| Where | What | Lines | Why upstream-only fix is preferred |
|---|---|---|---|
| `eng/pipelines/sdk-regenerate.yml` → *Prepare emitter + spec repo* | Inject `@typespec/xml` + `@typespec/sse` into `eng/emitter-package.json` | ~3 | Should be declared in `main`'s emitter-package.json so every consumer (not just this pipeline) benefits. |
| `eng/pipelines/sdk-regenerate.yml` → *Prepare emitter + spec repo* | `npm config set legacy-peer-deps true` | 1 | Hides genuine peer-dep mismatches; risks letting a real incompatibility through silently. |
| `eng/pipelines/scripts/regenerate-shard.js` → `changelogOne` | Bypass `update-changelog-content.ps1`, call `npm exec update-changelog` directly (forward-slash `--prefix`) | ~5 | The wrapper's Windows-only backslash path should be fixed so other Linux callers benefit too. |

**Total carried code for upstream-attributable bugs: ~4 lines.** Down from ~190
lines pre-refactor (the three 🟡 rows above — nested workspaces, warp configs,
missing deps — are intentionally **not** worked around any more).

---

## When you fix one upstream

1. Open a PR here that **deletes** the corresponding workaround from
   `eng/pipelines/sdk-regenerate.yml`.
2. Trigger the regenerate pipeline once with `QuickTest` enabled and confirm
   the 3 sentinel packages still regenerate green without the workaround.
3. Flip the row above from 🔴 to ✅ and add a `Fixed in <upstream-PR-link>` note.
4. After two consecutive weekly scheduled runs stay green, delete the ✅ row
   entirely (this document is a working set, not a history log — that is what
   git is for).
