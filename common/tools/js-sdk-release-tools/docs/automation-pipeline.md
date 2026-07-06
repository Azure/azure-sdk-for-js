# JS SDK Automation Pipeline

This document describes how the JS SDK release automation pipeline works, covering the entry point, SDK type and run mode determination, folder cleanup logic per mode, and detailed generation steps for each SDK type.

## Table of Contents

1. [Overall Architecture](#1-overall-architecture)
2. [Overall Flow & Utilities](#2-overall-flow--utilities)
3. [SDK Generation Steps](#3-sdk-generation-steps)
   - [3.1 HighLevelClient (HLC)](#31-highlevelclient-hlc--management-plane-sdk)
   - [3.2 RestLevelClient (RLC)](#32-restlevelclient-rlc--rest-level-client)
   - [3.3 ModularClient (MLC)](#33-modularclient-mlc--modular-client)
4. [Folder Cleanup Logic](#4-folder-cleanup-logic)
5. [Changelog & Version Bump (Common)](#5-changelog--version-bump-common)
6. [Output JSON Structure](#6-output-json-structure)

---

## 1. Overall Architecture

### CLI Entry Points

The package exposes the following CLI commands (defined in `package.json` `bin`):

#### AutoPR / Release Pipeline

| Command                     | Parameters                                                                                            | Description                                                                                                  |
| --------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `code-gen-pipeline`         | `--inputJsonPath`, `--outputJsonPath`, `--use`, `--typespecEmitter`, `--sdkGenerationType`, `--local` | Main automation entry point; used by the AutoPR release pipeline to generate and package SDK code end-to-end |
| `hlc-code-gen-for-pipeline` | _(same as above)_                                                                                     | Alias for `code-gen-pipeline` (legacy HLC-specific name)                                                     |

#### Dev Loop Experience

| Command            | Parameters                                                                      | Description                                                                                                                                                                    |
| ------------------ | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `update-changelog` | `--sdkRepoPath`, `--packagePath`                                                | Regenerates `CHANGELOG.md` only (does not bump version)                                                                                                                        |
| `update-version`   | `--sdkRepoPath`, `--packagePath`, `--releaseType`, `--version`, `--releaseDate` | Updates the version in `package.json`, updates version information in `CHANGELOG.md` without regenerating changelog content, and updates user-agent/version metadata in source |
| `generate-ci-yaml` | `--sdkRepoPath`, `--packagePath`                                                | Creates or updates the `ci.yml` / `ci.mgmt.yml` file for a package                                                                                                             |

#### Local Code Generation

| Command          | Parameters                                   | Description                                                          |
| ---------------- | -------------------------------------------- | -------------------------------------------------------------------- |
| `hlc-code-gen`   | see [hlc.md](./hlc.md)                       | Local HLC (management-plane) code generation from swagger/README     |
| `rlc-code-gen`   | see [llc.md](./llc.md)                       | Local RLC (data-plane) code generation                               |
| `changelog-tool` | see [changelog-tool.md](./changelog-tool.md) | Generate changelog by comparing api.md against published npm package |

### SDK Type Enum (`SDKType`)

| Type              | Value               | Description                                                                |
| ----------------- | ------------------- | -------------------------------------------------------------------------- |
| `HighLevelClient` | `'HighLevelClient'` | HLC — Management plane SDK (autorest-based, corresponds to `@azure/arm-*`) |
| `RestLevelClient` | `'RestLevelClient'` | RLC — REST level client (autorest or TypeSpec based)                       |
| `ModularClient`   | `'ModularClient'`   | MLC — Modular client (TypeSpec-based, typically management plane)          |

### Run Mode (`RunMode`)

| Mode              | Value                 | Description                                     |
| ----------------- | --------------------- | ----------------------------------------------- |
| `Release`         | `'release'`           | Official production release pipeline            |
| `Local`           | `'local'`             | Developer local run (skips node_modules backup) |
| `SpecPullRequest` | `'spec-pull-request'` | Triggered by spec PR for automated validation   |
| `Batch`           | `'batch'`             | Bulk SDK generation across multiple packages    |

---

## 2. Overall Flow & Utilities

### Overall Flow Diagram

```
CLI Entry (autoGenerateInPipeline.ts)
  │
  ├── Parse inputJson → parseInputJson()
  ├── Determine SDKType
  ├── backupNodeModules()  (non-local mode only)
  │
  ├── switch(SDKType)
  │   │
  │   ├── HighLevelClient ──→ generateMgmt()
  │   │   ├── autorest code generation
  │   │   ├── Find changed packages (git diff)
  │   │   ├── Update ci.yml / _meta.json
  │   │   ├── pnpm install → pnpm build → changelog → pnpm pack
  │   │   └── Update snippets / README
  │   │
  │   ├── RestLevelClient ──→ generateRLCInPipeline()
  │   │   ├── TypeSpec → tsp-client init or tsp compile
  │   │   │   OR
  │   │   ├── Swagger → autorest code generation
  │   │   ├── Update ci.yml
  │   │   ├── install → customize → lint → build → pack
  │   │   ├── format → snippets → changelog
  │   │   └── Output artifacts & apiView
  │   │
  │   └── ModularClient ──→ generateAzureSDKPackage()
  │       ├── CODEOWNERS & ignore-links
  │       ├── tsp-client init code generation
  │       ├── buildPackage:
  │       │   ├── pnpm install
  │       │   ├── lint fix (Release/Local)
  │       │   ├── customize (Data Plane)
  │       │   ├── turbo build
  │       │   ├── extract ApiView info
  │       │   ├── test package
  │       │   ├── format
  │       │   └── update snippets
  │       ├── changelog & bump version (Management Plane only)
  │       ├── tryBuildSamples
  │       ├── createArtifact (pack → .tgz)
  │       └── createOrUpdateCiYaml
  │
  ├── restoreNodeModules()  (non-local mode only)
  └── Write outputJson
```

### Utility Operations Summary

| Operation            | Function                                     | Required / Optional                  | Description                                               |
| -------------------- | -------------------------------------------- | ------------------------------------ | --------------------------------------------------------- |
| Backup node_modules  | `backupNodeModules()`                        | ✅ Required (non-local)              | Recursively rename `node_modules` → `node_modules_backup` |
| Restore node_modules | `restoreNodeModules()`                       | ✅ Required (non-local)              | Recursively rename back to `node_modules`                 |
| Format code          | `formatSdk()`                                | ✅ Required                          | `npm run format`                                          |
| Update snippets      | `updateSnippets()`                           | ✅ Required                          | `dev-tool run update-snippets`                            |
| Lint fix             | `lintFix()`                                  | ⚠️ Optional (`Release`/`Local` only) | `npm run lint:fix`                                        |
| Apply custom code    | `customizeCodes()`                           | ⚠️ Optional (Data Plane, pnpm)       | `dev-tool customization apply-v2 -s ./generated -c ./src` |
| Clean up package dir | `cleanUpPackageDirectory()`                  | ✅ Required                          | Cleanup strategy based on SDK type + `RunMode`            |
| Specify API version  | `specifyApiVersionToGenerateSDKByTypeSpec()` | ⚠️ Optional                          | Modify `api-version` field in `tspconfig.yaml`            |

---

## 4. Folder Cleanup Logic

The cleanup behavior is determined by **SDK type** and **run mode**. The core function is `cleanUpPackageDirectory()`.

Two run mode categories are used internally:

- **Pipeline modes** (`Release` or `Local`): Perform targeted cleanup to preserve manually authored files.
- **Automation modes** (`SpecPullRequest` or `Batch`): Perform a full cleanup to ensure a pristine environment.

### 4.1 HighLevelClient (HLC) — Management Plane

HLC packages correspond to `@azure/arm-*` and are generated by the `generateMgmt()` entry point using autorest.

| Run Mode                    | Cleanup Behavior        | Details                                                                                            |
| --------------------------- | ----------------------- | -------------------------------------------------------------------------------------------------- |
| `Release` / `Local`         | **No explicit cleanup** | Autorest overwrites generated files in-place. No directory-level cleanup is performed by the tool. |
| `SpecPullRequest` / `Batch` | **No explicit cleanup** | Same — autorest generation overwrites files.                                                       |

> **Note**: The HLC generation path does not perform any directory-level cleanup. The partial cleanup behavior that preserves `test/` and `assets.json` applies only when an MLC or RLC generation detects that the target package was previously generated as HLC (i.e., converting from HLC to MLC).

### 4.2 RestLevelClient (RLC) — Data Plane REST Client

RLC packages are identified as `"sdk-type": "client"` without modular markers.

| Run Mode                    | Cleanup Behavior              | Details                                                                                                                            |
| --------------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `Release` / `Local`         | **Skip cleanup (tool-level)** | The tool does not delete the package directory. Before writing new files, the emitter automatically empties the sources directory. |
| `SpecPullRequest` / `Batch` | **Full cleanup**              | Removes the entire package directory and recreates it empty.                                                                       |

> **Note on generation path**: The emitter behavior described below applies **only to the TypeSpec path** (Path A in §3.2). When RLC packages are generated from Swagger via autorest (Path B), the TypeSpec emitter is not involved — autorest directly overwrites files under `--output-folder` without the priority-based source directory selection described below.

#### What the emitter clears before writing (TypeSpec path only)

The emitter selects the sources directory using this priority order:

1. `src/generated/` — if it exists (customization pattern: hand-authored code in `src/`, generated code in `src/generated/`)
2. `generated/` — if it exists (alternative customization pattern)
3. `src/` — otherwise

The selected folder is **fully emptied** before new source files are written.

**Files and folders preserved across emitter runs:**

| File / Folder                | Behavior                                                                                                                                                            |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `test/`                      | Preserved — if a test folder already exists, the emitter skips test file generation                                                                                 |
| `package.json`               | Updated in-place (dependencies, exports, and version fields are merged)                                                                                             |
| `README.md`                  | Updated in-place; fully regenerated only if the client name changed                                                                                                 |
| `CHANGELOG.md`               | Not touched (managed by js-sdk-release-tools)                                                                                                                       |
| `assets.json`                | Not touched                                                                                                                                                         |
| `swagger/`                   | Not touched                                                                                                                                                         |
| `src/` (hand-authored files) | Preserved **only when** the customization pattern is active (`src/generated/` exists) — the emitter clears only `src/generated/`, leaving the rest of `src/` intact |
| `samples-dev/`               | Cleared only when sample generation is enabled in `tspconfig.yaml`                                                                                                  |

> **Note on `clearOutputFolder`**: If `tspconfig.yaml` sets `clearOutputFolder: true`, the emitter wipes the entire package directory (preserving only `TempTypeSpecFiles/`) before emptying the sources directory. This overrides the skip-cleanup behavior above.

### 4.3 ModularClient (MLC) — Modular Client

MLC packages are identified by `is-modular-library: true` in `tspconfig.yaml`.

**Cleanup sub-types within MLC:**

#### Management Plane MLC — Converting from HLC (existing HLC `package.json` found)

When a management plane package previously generated via autorest (HLC) is being regenerated as a ModularClient, the old package directory retains HLC markers in `package.json`. Cleanup is based on run mode:

| Run Mode                    | Cleanup Behavior    | Details                                                                                                        |
| --------------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------- |
| `Release` / `Local`         | **Partial cleanup** | Preserves `test/` and `assets.json`. All other generated files, including `src/`, are removed and regenerated. |
| `SpecPullRequest` / `Batch` | **Full cleanup**    | Removes the entire package directory.                                                                          |

#### Management Plane MLC — New or existing ModularClient package

When generating a brand-new package (no directory yet), or regenerating a package that is already a `ModularClient` in its `package.json`:

| Run Mode                    | Cleanup Behavior              | Details                                                                                                                                    |
| --------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `Release` / `Local`         | **Skip cleanup (tool-level)** | The tool does not delete the package directory. The emitter empties the sources directory before writing new files (see §4.2 for details). |
| `SpecPullRequest` / `Batch` | **Skip cleanup**              | Same — no directory-level cleanup by the tool; emitter handles source regeneration.                                                        |

> **Note**: If the package directory does not exist yet, no cleanup action is taken.

#### Data Plane MLC

| Run Mode                    | Cleanup Behavior              | Details                                                                                                                                             |
| --------------------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Release` / `Local`         | **Skip cleanup (tool-level)** | Same as RLC: the tool does not delete the package directory; the emitter empties the sources directory. See §4.2 for the full file-level breakdown. |
| `SpecPullRequest` / `Batch` | **Full cleanup**              | Removes the entire package directory.                                                                                                               |

### 4.4 Summary Table

| SDK Type          | Plane      | Source State        | `Release` / `Local`                             | `SpecPullRequest` / `Batch`                     |
| ----------------- | ---------- | ------------------- | ----------------------------------------------- | ----------------------------------------------- |
| `HighLevelClient` | Management | N/A                 | No cleanup (autorest overwrites files in-place) | No cleanup (autorest overwrites files in-place) |
| `RestLevelClient` | Data       | N/A                 | Skip (emitter cleans `src/`)                    | Full cleanup                                    |
| `ModularClient`   | Management | Converting from HLC | Partial: keep `test/`, `assets.json`            | Full cleanup                                    |
| `ModularClient`   | Management | New or already MLC  | Skip (emitter handles)                          | Skip (emitter handles)                          |
| `ModularClient`   | Data       | N/A                 | Skip (emitter cleans `src/`)                    | Full cleanup                                    |

---

## 3. SDK Generation Steps

### 3.1 HighLevelClient (HLC) — Management Plane SDK

#### Processing Steps

| Step                                     | Required                              | Operation                                      | Command / Details                                                                                                                                                                                                                                                                  | Code Link                                               |
| ---------------------------------------- | ------------------------------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| **1. Code Generation**                   | ✅ Required (unless `skipGeneration`) | Run autorest to generate code                  | `autorest --version=3.9.7 --typescript --modelerfour.lenient-model-deduplication --azure-arm --head-as-boolean=true --license-header=MICROSOFT_MIT_NO_VERSION --generate-test --typescript-sdks-folder={sdkRepo} {readmeMd}` + optional `--tag=package-{apiVersion}` `--use={use}` | [generateMgmt.ts#L50](../src/hlc/generateMgmt.ts)   |
| **2. Find Changed Packages**             | ✅ Required                           | `getChangedPackageDirectory()`                 | Uses `git diff` to find changed package directories after generation                                                                                                                                                                                                               | [generateMgmt.ts#L73](../src/hlc/generateMgmt.ts)   |
| **3. Modify Test/Sample Config**         | ✅ Required                           | `changeConfigOfTestAndSample()`                | Modify `tsconfig.json` to skip compiling `test/` and `sample/` directories                                                                                                                                                                                                         | [generateMgmt.ts#L88](../src/hlc/generateMgmt.ts)   |
| **4. Write `_meta.json`**                | ✅ Required (non-skipGeneration)      | Write code generation metadata                 | Contains `commit`, `readme`, `autorest_command`, `repository_url`, `release_tool`, etc.                                                                                                                                                                                            | [generateMgmt.ts#L90](../src/hlc/generateMgmt.ts)   |
| **5. Generate/Modify CI YAML**           | ✅ Required (non-skipGeneration)      | `modifyOrGenerateCiYml()`                      | Create or update `ci.mgmt.yml`                                                                                                                                                                                                                                                     | [generateMgmt.ts#L105](../src/hlc/generateMgmt.ts) |
| **6. Install Dependencies**              | ✅ Required                           | pnpm                                           | `pnpm install`                                                                                                                                                                                                                                                                     | [generateMgmt.ts#L124](../src/hlc/generateMgmt.ts) |
| **7. Lint Fix**                          | ⚠️ Optional                           | `lintFix()` — only in `Release` / `Local` mode | `npm run lint:fix`                                                                                                                                                                                                                                                                 | [generateMgmt.ts#L139](../src/hlc/generateMgmt.ts) |
| **8. Build**                             | ✅ Required                           | Compile package (excluding test/sample)        | `pnpm build --filter {packageName}...`                                                                                                                                                                                                                                             | [generateMgmt.ts#L127](../src/hlc/generateMgmt.ts) |
| **9. Generate Changelog & Bump Version** | ✅ Required (non-skipGeneration)      | `generateChangelogAndBumpVersion()`            | Compare `api.md` between npm published version and local; detect breaking changes; generate changelog; bump version                                                                                                                                                                | [generateMgmt.ts#L130](../src/hlc/generateMgmt.ts) |
| **10. Pack**                             | ✅ Required                           | Generate `.tgz` package                        | `pnpm run --filter {packageName}... pack`                                                                                                                                                                                                                                          | [generateMgmt.ts#L133](../src/hlc/generateMgmt.ts) |
| **11. Update Snippets**                  | ✅ Required                           | `updateSnippets()`                             | `dev-tool run update-snippets`                                                                                                                                                                                                                                                     | [generateMgmt.ts#L152](../src/hlc/generateMgmt.ts) |
| **12. Modify README**                    | ✅ Required (non-skipGeneration)      | `changeReadmeMd()`                             | Update package `README.md`                                                                                                                                                                                                                                                         | [generateMgmt.ts#L155](../src/hlc/generateMgmt.ts) |
| **13. Add ApiView Info**                 | ✅ Required                           | `addApiViewInfo()`                             | Find `temp/**/*.api.json` file path and add to `outputJson`                                                                                                                                                                                                                        | [generateMgmt.ts#L182](../src/hlc/generateMgmt.ts) |
| **14. Restore Config**                   | ✅ Required (non-skipGeneration)      | `changeConfigOfTestAndSample(Revert)`          | Restore original `tsconfig.json` configuration                                                                                                                                                                                                                                     | [generateMgmt.ts#L203](../src/hlc/generateMgmt.ts) |

---

### 3.2 RestLevelClient (RLC) — REST Level Client

There are two generation paths based on the source: **TypeSpec project** or **Swagger/README project**.

#### Path A: TypeSpec Project (`options.typespecProject` exists)

| Step                            | Required                                       | Operation                        | Command / Details                                                                                                                                                                        | Code Link                                                                                     |
| ------------------------------- | ---------------------------------------------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| **1. Get Target Package Dir**   | ✅ Required                                    | `getGeneratedPackageDirectory()` | Parse `emitter-output-dir` / `service-dir` + `package-dir` from `tspconfig.yaml`                                                                                                         | [generateRLCInPipeline.ts#L46](../src/llc/generateRLCInPipeline/generateRLCInPipeline.ts) |
| **2. Clean Up Package Dir**     | ✅ Required                                    | `cleanUpPackageDirectory()`      | Cleanup strategy based on `runMode` and SDK type (see [Section 4](#4-folder-cleanup-logic))                                                                                              | [generateRLCInPipeline.ts#L48](../src/llc/generateRLCInPipeline/generateRLCInPipeline.ts) |
| **3a. Code Gen (command mode)** | ✅ Conditional (`sdkGenerationType = command`) | TypeSpec direct compile          | ① Copy `emitter-package.json` → ② `npm install` → ③ Update `tspconfig.yaml` → ④ `npx tsp compile {source} --emit @azure-tools/typespec-ts --arg "js-sdk-folder={sdkRepo}"`               | [generateRLCInPipeline.ts#L68](../src/llc/generateRLCInPipeline/generateRLCInPipeline.ts) |
| **3b. Code Gen (script mode)**  | ✅ Conditional (`sdkGenerationType = script`)  | tsp-client generation            | `npm --prefix eng/common/tsp-client exec -- tsp-client init --update-if-exists --debug --tsp-config {tspconfig.yaml} --local-spec-repo {tspDefDir} --repo {repoUrl} --commit {commitId}` | [generateRLCInPipeline.ts#L82](../src/llc/generateRLCInPipeline/generateRLCInPipeline.ts) |

> Note: Steps **3a** and **3b** are mutually exclusive alternatives. The pipeline executes only one of them per run, based on `sdkGenerationType`.

#### Path B: Swagger Project (no `typespecProject`)

| Step                        | Required    | Operation                                    | Command / Details                                                                                                                                                                                                                                                                               | Code Link                                                                                       |
| --------------------------- | ----------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **1. Find Autorest Config** | ✅ Required | Search SDK repo for existing autorest config | Scans `sdk/{RP}/{package}-rest/swagger/README.md` files looking for a matching `require` URL or `input-file` path that references the incoming spec. The PR-comment-based config generation path was removed as a security fix ([#14743](https://github.com/Azure/azure-sdk-tools/pull/14743)). | [generateRLCInPipeline.ts#L93](../src/llc/generateRLCInPipeline/generateRLCInPipeline.ts)   |
| **2. Code Generation**      | ✅ Required | Run autorest                                 | `autorest --version=3.9.7 {README.md} --output-folder={packagePath}` + optional `--use` `--multi-client=true` `--tag=package-{apiVersion}`                                                                                                                                                      | [generateRLCInPipeline.ts#L149](../src/llc/generateRLCInPipeline/generateRLCInPipeline.ts) |

#### Common Post-generation Steps (both paths)

| Step                                      | Required    | Operation                                   | Command / Details                                                                                                      | Code Link                                                                                       |
| ----------------------------------------- | ----------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **4. Generate/Modify CI YAML**            | ✅ Required | `modifyOrGenerateCiYml()`                   | Create or update `ci.yml`                                                                                              | [generateRLCInPipeline.ts#L180](../src/llc/generateRLCInPipeline/generateRLCInPipeline.ts) |
| **5. Modify Test/Sample Config**          | ✅ Required | `changeConfigOfTestAndSample()`             | Skip test/sample compilation                                                                                           | [generateRLCInPipeline.ts#L186](../src/llc/generateRLCInPipeline/generateRLCInPipeline.ts) |
| **6. Install Dependencies**               | ✅ Required | pnpm                                        | `pnpm install`                                                                                                         | [generateRLCInPipeline.ts#L204](../src/llc/generateRLCInPipeline/generateRLCInPipeline.ts) |
| **7. Apply Custom Code**                  | ⚠️ Optional | `customizeCodes()` — pnpm repo only         | `dev-tool customization apply-v2 -s ./generated -c ./src`                                                              | [generateRLCInPipeline.ts#L215](../src/llc/generateRLCInPipeline/generateRLCInPipeline.ts) |
| **8. Lint Fix**                           | ⚠️ Optional | `lintFix()` — `Release` / `Local` mode only | `npm run lint:fix`                                                                                                     | [generateRLCInPipeline.ts#L218](../src/llc/generateRLCInPipeline/generateRLCInPipeline.ts) |
| **9. Build**                              | ✅ Required | Compile package                             | `pnpm build --filter {packageName}...` (`Release`/`Local`) or `pnpm run --filter {packageName}... build` (other modes) | [generateRLCInPipeline.ts#L208](../src/llc/generateRLCInPipeline/generateRLCInPipeline.ts) |
| **10. Pack**                              | ✅ Required | Generate `.tgz`                             | `pnpm run --filter {packageName}... pack`                                                                              | [generateRLCInPipeline.ts#L210](../src/llc/generateRLCInPipeline/generateRLCInPipeline.ts) |
| **11. Format Code**                       | ✅ Required | `formatSdk()`                               | `npm run format`                                                                                                       | [generateRLCInPipeline.ts#L239](../src/llc/generateRLCInPipeline/generateRLCInPipeline.ts) |
| **12. Update Snippets**                   | ✅ Required | `updateSnippets()`                          | `dev-tool run update-snippets`                                                                                         | [generateRLCInPipeline.ts#L240](../src/llc/generateRLCInPipeline/generateRLCInPipeline.ts) |
| **13. Generate Changelog & Bump Version** | ✅ Required | `generateChangelogAndBumpVersion()`         | Same as HLC                                                                                                            | [generateRLCInPipeline.ts#L249](../src/llc/generateRLCInPipeline/generateRLCInPipeline.ts) |
| **14. Add ApiView Info**                  | ✅ Required | `addApiViewInfo()`                          | Find `*.api.json` files                                                                                                | [generateRLCInPipeline.ts#L260](../src/llc/generateRLCInPipeline/generateRLCInPipeline.ts) |
| **15. Restore Config**                    | ✅ Required | `changeConfigOfTestAndSample(Revert)`       | Restore original `tsconfig.json`                                                                                       | [generateRLCInPipeline.ts#L279](../src/llc/generateRLCInPipeline/generateRLCInPipeline.ts) |

---

### 3.3 ModularClient (MLC) — Modular Client

#### Processing Steps

| Step                                      | Required       | Operation                                      | Command / Details                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Code Link                                                                                               |
| ----------------------------------------- | -------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **1. Get Target Package Dir**             | ✅ Required    | `getGeneratedPackageDirectory()`               | Parse `emitter-output-dir` / `service-dir` + `package-dir` from `tspconfig.yaml`                                                                                                                                                                                                                                                                                                                                                                                                                         | [modularClientPackageGenerator.ts#L28](../src/mlc/clientGenerator/modularClientPackageGenerator.ts) |
| **2. Generate CODEOWNERS & ignore-links** | ⚠️ Optional    | `codeOwnersAndIgnoreLinkGenerator()`           | For first-time published packages: update `.github/CODEOWNERS` and `eng/ignore-links.txt`                                                                                                                                                                                                                                                                                                                                                                                                                | [modularClientPackageGenerator.ts#L30](../src/mlc/clientGenerator/modularClientPackageGenerator.ts) |
| **3. Record Original Version**            | ✅ Required    | `getNpmPackageInfo()`                          | Read existing `package.json` version to restore after code generation                                                                                                                                                                                                                                                                                                                                                                                                                                    | [modularClientPackageGenerator.ts#L33](../src/mlc/clientGenerator/modularClientPackageGenerator.ts) |
| **4. Clean Up Package Dir**               | ✅ Required    | `cleanUpPackageDirectory()`                    | Cleanup strategy based on `runMode` + SDK type (see [Section 4](#4-folder-cleanup-logic))                                                                                                                                                                                                                                                                                                                                                                                                                | [modularClientPackageGenerator.ts#L35](../src/mlc/clientGenerator/modularClientPackageGenerator.ts) |
| **5. Specify API Version**                | ⚠️ Optional    | `specifyApiVersionToGenerateSDKByTypeSpec()`   | Modify `api-version` field in `tspconfig.yaml` if `apiVersion` is specified                                                                                                                                                                                                                                                                                                                                                                                                                              | [modularClientPackageGenerator.ts#L37](../src/mlc/clientGenerator/modularClientPackageGenerator.ts) |
| **6. Code Generation**                    | ✅ Required    | `generateTypeScriptCodeFromTypeSpec()`         | `npm --prefix eng/common/tsp-client exec -- tsp-client init --update-if-exists --debug --tsp-config {tspconfig.yaml} --local-spec-repo {typeSpecDir} --repo {repoUrl} --commit {commitId}`                                                                                                                                                                                                                                                                                                               | [typeSpecUtils.ts#L13](../src/mlc/clientGenerator/utils/typeSpecUtils.ts)                           |
| **7. Restore Version**                    | ✅ Required    | `updatePackageVersion()`                       | Restore `package.json` version to the pre-generation original to avoid version drift                                                                                                                                                                                                                                                                                                                                                                                                                     | [typeSpecUtils.ts#L49](../src/mlc/clientGenerator/utils/typeSpecUtils.ts)                           |
| **8. Build Package**                      | ✅ Required    | `buildPackage()` — contains multiple sub-steps | See [sub-steps below](#buildpackage-sub-steps)                                                                                                                                                                                                                                                                                                                                                                                                                                                           | [modularClientPackageGenerator.ts#L41](../src/mlc/clientGenerator/modularClientPackageGenerator.ts) |
| **9. Generate Changelog & Bump Version**  | ✅ Required    | `generateChangelogAndBumpVersion()`            | Same as HLC; skipped for Data Plane packages                                                                                                                                                                                                                                                                                                                                                                                                                                                             | [modularClientPackageGenerator.ts#L47](../src/mlc/clientGenerator/modularClientPackageGenerator.ts) |
| **10. Try Build Samples**                 | ⚠️ Conditional | `tryBuildSamples()`                            | `dev-tool run build:samples`. Blocking rules: **Management plane** — failure is a hard error in `Release` mode only; treated as a warning in all other modes (`SpecPullRequest`, `Batch`, `Local`). **Data plane** — always treated as a warning (never blocks). Known gap ([#14610](https://github.com/Azure/azure-sdk-tools/issues/14610)): sample failures are not caught during spec PR validation (`SpecPullRequest` mode), so a package that passes spec PR checks can still fail at release time. | [modularClientPackageGenerator.ts#L49](../src/mlc/clientGenerator/modularClientPackageGenerator.ts) |
| **11. Update Package Result**             | ✅ Required    | `updateNpmPackageResult()`                     | Read `package.json` name/version into `PackageResult`                                                                                                                                                                                                                                                                                                                                                                                                                                                    | [modularClientPackageGenerator.ts#L56](../src/mlc/clientGenerator/modularClientPackageGenerator.ts) |
| **12. Create Release Artifact**           | ✅ Required    | `createArtifact()`                             | `pnpm run --filter {packageName}... pack`, generates `.tgz`                                                                                                                                                                                                                                                                                                                                                                                                                                              | [modularClientPackageGenerator.ts#L63](../src/mlc/clientGenerator/modularClientPackageGenerator.ts) |
| **13. Create/Update CI YAML**             | ✅ Required    | `createOrUpdateCiYaml()`                       | Create or update `ci.mgmt.yml`                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | [modularClientPackageGenerator.ts#L67](../src/mlc/clientGenerator/modularClientPackageGenerator.ts) |

#### `buildPackage()` Sub-steps Detail

| Sub-step             | Required    | Command / Operation                                                                               | Code Link                                            |
| -------------------- | ----------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| pnpm install         | ✅ Required | `pnpm install`                                                                                    | [rushUtils.ts#L127](../src/common/rushUtils.ts) |
| Lint fix             | ⚠️ Optional | `npm run lint:fix` — only in `Release` / `Local` mode                                             | [rushUtils.ts#L139](../src/common/rushUtils.ts) |
| Apply custom code    | ⚠️ Optional | `dev-tool customization apply-v2 -s ./generated -c ./src` — Data Plane packages only              | [rushUtils.ts#L146](../src/common/rushUtils.ts) |
| turbo build          | ✅ Required | `pnpm turbo build --filter {packageName}... --token 1` (build errors are warnings for Data Plane) | [rushUtils.ts#L150](../src/common/rushUtils.ts) |
| Extract ApiView info | ✅ Required | Find `temp/**/*-node.api.json` or `temp/**/*.api.json`                                            | [rushUtils.ts#L157](../src/common/rushUtils.ts) |
| Test package         | ⚠️ Optional | `pnpm run test:node` — `TEST_MODE=record`; failure does not block                                 | [rushUtils.ts#L169](../src/common/rushUtils.ts) |
| Format               | ✅ Required | `npm run format`                                                                                  | [rushUtils.ts#L170](../src/common/rushUtils.ts) |
| Update snippets      | ✅ Required | `dev-tool run update-snippets`                                                                    | [rushUtils.ts#L171](../src/common/rushUtils.ts) |

---

## 5. Changelog & Version Bump (Common)

> **Note**: Changelog generation is **skipped** for Data Plane (`ModularClient` / `DataPlane`) packages.

### Core Logic

```
1. Query npm registry for published package info (tryGetNpmView)
2. Determine if first release (shouldTreatAsFirstRelease)
   ├── First Release:
   │   → makeChangesForFirstRelease(): use initial changelog template,
   │     set version to 1.0.0-beta.1 or 1.0.0
   │
   └── Non-first Release:
       ├── Download published stable version (npm pack {packageName}@{stableVersion})
       ├── Determine if track2 or track1:
       │
       ├── Track2 Previously Released:
       │   ├── Compare old and new api.md (using DifferenceDetector)
       │   ├── Generate changelog (using ChangelogGenerator)
       │   ├── Calculate new version (getNewVersion):
       │   │   - Has breaking change → bump minor/major
       │   │   - No changes → bump patch
       │   │   - Beta version → bump preview
       │   └── makeChangesForReleasingTrack2(): write CHANGELOG.md and update package.json version
       │
       └── Track1 Previously Released:
           └── makeChangesForMigrateTrack1ToTrack2(): generate migration changelog
```

### Key Sub-operations

| Operation                        | Command                                               |
| -------------------------------- | ----------------------------------------------------- |
| Download and extract npm package | `npm pack {packageName}@{version}` → `tar -xzf {tgz}` |
| Get original version             | `git show HEAD:{package.json path}`                   |
| Clean up temp files              | Delete `changelog-temp/` directory                    |

---

## 6. Output JSON Structure

Final structure written to `--outputJsonPath`:

```json
{
  "packages": [
    {
      "packageName": "@azure/arm-xxx",
      "version": "1.0.0",
      "language": "JavaScript",
      "path": ["sdk/xxx/arm-xxx", "ci.mgmt.yml"],
      "packageFolder": "sdk/xxx/arm-xxx",
      "typespecProject": ["specification/xxx/XXX"],
      "readmeMd": ["specification/xxx/resource-manager/readme.md"],
      "artifacts": ["sdk/xxx/arm-xxx/azure-arm-xxx-1.0.0.tgz"],
      "apiViewArtifact": "sdk/xxx/arm-xxx/temp/arm-xxx.api.json",
      "changelog": {
        "content": "### Breaking Changes\n...",
        "hasBreakingChange": true,
        "breakingChangeItems": ["..."]
      },
      "result": "succeeded",
      "installInstructions": { "full": "npm install ..." }
    }
  ],
  "language": "JavaScript"
}
```
