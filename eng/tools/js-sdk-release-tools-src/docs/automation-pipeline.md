# JS SDK Automation Pipeline

This document describes how the JS SDK release automation pipeline works, covering the entry point, SDK type and run mode determination, folder cleanup logic per mode, and detailed generation steps for each SDK type.

## Table of Contents

1. [Overall Architecture](#1-overall-architecture)
2. [Overall Flow & Utilities](#2-overall-flow--utilities)
3. [SDK Generation Steps](#3-sdk-generation-steps)
   - [3.1 HighLevelClient (HLC)](#31-highlevelclient-hlc--management-plane-sdk)

- [3.2 ModularClient (MLC)](#32-modularclient-mlc--modular-client)

4. [Folder Cleanup Logic](#4-folder-cleanup-logic)
5. [Changelog & Version Bump (Common)](#5-changelog--version-bump-common)
6. [Output JSON Structure](#6-output-json-structure)

---

## 1. Overall Architecture

### CLI Entry Points

The package exposes the following CLI commands (defined in `package.json` `bin`):

#### AutoPR / Release Pipeline

| Command                     | Parameters                                                | Description                                                                                                  |
| --------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `code-gen-pipeline`         | `--inputJsonPath`, `--outputJsonPath`, `--use`, `--local` | Main automation entry point; used by the AutoPR release pipeline to generate and package SDK code end-to-end |
| `hlc-code-gen-for-pipeline` | _(same as above)_                                         | Alias for `code-gen-pipeline` (legacy HLC-specific name)                                                     |

#### Dev Loop Experience

| Command            | Parameters                                                                      | Description                                                                                                                                                                    |
| ------------------ | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `update-changelog` | `--sdkRepoPath`, `--packagePath`                                                | Regenerates `CHANGELOG.md` only (does not bump version)                                                                                                                        |
| `update-version`   | `--sdkRepoPath`, `--packagePath`, `--releaseType`, `--version`, `--releaseDate` | Updates the version in `package.json`, updates version information in `CHANGELOG.md` without regenerating changelog content, and updates user-agent/version metadata in source |
| `generate-ci-yaml` | `--sdkRepoPath`, `--packagePath`                                                | Creates or updates the `ci.yml` / `ci.mgmt.yml` file for a package                                                                                                             |

#### Local Code Generation

| Command          | Parameters                                                                                                                             | Description                                                          |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `hlc-code-gen`   | see [hlc.md](https://github.com/Azure/azure-sdk-for-js/blob/main/eng/tools/js-sdk-release-tools-src/docs/hlc.md)                       | Local HLC (management-plane) code generation from swagger/README     |
| `changelog-tool` | see [changelog-tool.md](https://github.com/Azure/azure-sdk-for-js/blob/main/eng/tools/js-sdk-release-tools-src/docs/changelog-tool.md) | Generate changelog by comparing api.md against published npm package |

### SDK Type Enum (`SDKType`)

| Type              | Value               | Description                                                                |
| ----------------- | ------------------- | -------------------------------------------------------------------------- |
| `HighLevelClient` | `'HighLevelClient'` | HLC — Management plane SDK (autorest-based, corresponds to `@azure/arm-*`) |
| `RestLevelClient` | `'RestLevelClient'` | Legacy RLC package; generation is no longer supported                      |
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
  │   ├── RestLevelClient ──→ fail with TypeSpec migration guidance
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

> **Note**: The HLC generation path does not perform any directory-level cleanup. The partial cleanup behavior that preserves `test/` and `assets.json` applies only when an MLC generation detects that the target package was previously generated as HLC (i.e., converting from HLC to MLC).

### 4.2 ModularClient (MLC) — Modular Client

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

| Run Mode                    | Cleanup Behavior              | Details                                                                                  |
| --------------------------- | ----------------------------- | ---------------------------------------------------------------------------------------- |
| `Release` / `Local`         | **Skip cleanup (tool-level)** | The tool does not delete the package directory. The emitter handles source regeneration. |
| `SpecPullRequest` / `Batch` | **Skip cleanup**              | Same — no directory-level cleanup by the tool; emitter handles source regeneration.      |

> **Note**: If the package directory does not exist yet, no cleanup action is taken.

#### Data Plane MLC

| Run Mode                    | Cleanup Behavior              | Details                                                                                  |
| --------------------------- | ----------------------------- | ---------------------------------------------------------------------------------------- |
| `Release` / `Local`         | **Skip cleanup (tool-level)** | The tool does not delete the package directory; the emitter handles source regeneration. |
| `SpecPullRequest` / `Batch` | **Full cleanup**              | Removes the entire package directory.                                                    |

### 4.3 Summary Table

| SDK Type          | Plane      | Source State        | `Release` / `Local`                             | `SpecPullRequest` / `Batch`                     |
| ----------------- | ---------- | ------------------- | ----------------------------------------------- | ----------------------------------------------- |
| `HighLevelClient` | Management | N/A                 | No cleanup (autorest overwrites files in-place) | No cleanup (autorest overwrites files in-place) |
| `ModularClient`   | Management | Converting from HLC | Partial: keep `test/`, `assets.json`            | Full cleanup                                    |
| `ModularClient`   | Management | New or already MLC  | Skip (emitter handles)                          | Skip (emitter handles)                          |
| `ModularClient`   | Data       | N/A                 | Skip (emitter cleans `src/`)                    | Full cleanup                                    |

---

## 3. SDK Generation Steps

### 3.1 HighLevelClient (HLC) — Management Plane SDK

#### Processing Steps

| Step                                     | Required                              | Operation                                      | Command / Details                                                                                                                                                                                                                                                                  | Code Link              |
| ---------------------------------------- | ------------------------------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| **1. Code Generation**                   | ✅ Required (unless `skipGeneration`) | Run autorest to generate code                  | `autorest --version=3.9.7 --typescript --modelerfour.lenient-model-deduplication --azure-arm --head-as-boolean=true --license-header=MICROSOFT_MIT_NO_VERSION --generate-test --typescript-sdks-folder={sdkRepo} {readmeMd}` + optional `--tag=package-{apiVersion}` `--use={use}` | [generateMgmt.ts#L50]  |
| **2. Find Changed Packages**             | ✅ Required                           | `getChangedPackageDirectory()`                 | Uses `git diff` to find changed package directories after generation                                                                                                                                                                                                               | [generateMgmt.ts#L73]  |
| **3. Modify Test/Sample Config**         | ✅ Required                           | `changeConfigOfTestAndSample()`                | Modify `tsconfig.json` to skip compiling `test/` and `sample/` directories                                                                                                                                                                                                         | [generateMgmt.ts#L88]  |
| **4. Write `_meta.json`**                | ✅ Required (non-skipGeneration)      | Write code generation metadata                 | Contains `commit`, `readme`, `autorest_command`, `repository_url`, `release_tool`, etc.                                                                                                                                                                                            | [generateMgmt.ts#L90]  |
| **5. Generate/Modify CI YAML**           | ✅ Required (non-skipGeneration)      | `modifyOrGenerateCiYml()`                      | Create or update `ci.mgmt.yml`                                                                                                                                                                                                                                                     | [generateMgmt.ts#L105] |
| **6. Install Dependencies**              | ✅ Required                           | pnpm                                           | `pnpm install`                                                                                                                                                                                                                                                                     | [generateMgmt.ts#L124] |
| **7. Lint Fix**                          | ⚠️ Optional                           | `lintFix()` — only in `Release` / `Local` mode | `npm run lint:fix`                                                                                                                                                                                                                                                                 | [generateMgmt.ts#L139] |
| **8. Build**                             | ✅ Required                           | Compile package (excluding test/sample)        | `pnpm build --filter {packageName}...`                                                                                                                                                                                                                                             | [generateMgmt.ts#L127] |
| **9. Generate Changelog & Bump Version** | ✅ Required (non-skipGeneration)      | `generateChangelogAndBumpVersion()`            | Compare `api.md` between npm published version and local; detect breaking changes; generate changelog; bump version                                                                                                                                                                | [generateMgmt.ts#L130] |
| **10. Pack**                             | ✅ Required                           | Generate `.tgz` package                        | `pnpm run --filter {packageName}... pack`                                                                                                                                                                                                                                          | [generateMgmt.ts#L133] |
| **11. Update Snippets**                  | ✅ Required                           | `updateSnippets()`                             | `dev-tool run update-snippets`                                                                                                                                                                                                                                                     | [generateMgmt.ts#L152] |
| **12. Modify README**                    | ✅ Required (non-skipGeneration)      | `changeReadmeMd()`                             | Update package `README.md`                                                                                                                                                                                                                                                         | [generateMgmt.ts#L155] |
| **13. Add ApiView Info**                 | ✅ Required                           | `addApiViewInfo()`                             | Find `temp/**/*.api.json` file path and add to `outputJson`                                                                                                                                                                                                                        | [generateMgmt.ts#L182] |
| **14. Restore Config**                   | ✅ Required (non-skipGeneration)      | `changeConfigOfTestAndSample(Revert)`          | Restore original `tsconfig.json` configuration                                                                                                                                                                                                                                     | [generateMgmt.ts#L203] |

---

### 3.2 ModularClient (MLC) — Modular Client

#### Processing Steps

| Step                                      | Required       | Operation                                      | Command / Details                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Code Link                              |
| ----------------------------------------- | -------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| **1. Get Target Package Dir**             | ✅ Required    | `getGeneratedPackageDirectory()`               | Parse `emitter-output-dir` / `service-dir` + `package-dir` from `tspconfig.yaml`                                                                                                                                                                                                                                                                                                                                                                                                                         | [modularClientPackageGenerator.ts#L28] |
| **2. Generate CODEOWNERS & ignore-links** | ⚠️ Optional    | `codeOwnersAndIgnoreLinkGenerator()`           | For first-time published packages: update `.github/CODEOWNERS` and `eng/ignore-links.txt`                                                                                                                                                                                                                                                                                                                                                                                                                | [modularClientPackageGenerator.ts#L30] |
| **3. Record Original Version**            | ✅ Required    | `getNpmPackageInfo()`                          | Read existing `package.json` version to restore after code generation                                                                                                                                                                                                                                                                                                                                                                                                                                    | [modularClientPackageGenerator.ts#L33] |
| **4. Clean Up Package Dir**               | ✅ Required    | `cleanUpPackageDirectory()`                    | Cleanup strategy based on `runMode` + SDK type (see [Section 4](#4-folder-cleanup-logic))                                                                                                                                                                                                                                                                                                                                                                                                                | [modularClientPackageGenerator.ts#L35] |
| **5. Specify API Version**                | ⚠️ Optional    | `specifyApiVersionToGenerateSDKByTypeSpec()`   | Modify `api-version` field in `tspconfig.yaml` if `apiVersion` is specified                                                                                                                                                                                                                                                                                                                                                                                                                              | [modularClientPackageGenerator.ts#L37] |
| **6. Code Generation**                    | ✅ Required    | `generateTypeScriptCodeFromTypeSpec()`         | `npm --prefix eng/common/tsp-client exec -- tsp-client init --update-if-exists --debug --tsp-config {tspconfig.yaml} --local-spec-repo {typeSpecDir} --repo {repoUrl} --commit {commitId}`                                                                                                                                                                                                                                                                                                               | [typeSpecUtils.ts#L13]                 |
| **7. Restore Version**                    | ✅ Required    | `updatePackageVersion()`                       | Restore `package.json` version to the pre-generation original to avoid version drift                                                                                                                                                                                                                                                                                                                                                                                                                     | [typeSpecUtils.ts#L49]                 |
| **8. Build Package**                      | ✅ Required    | `buildPackage()` — contains multiple sub-steps | See [sub-steps below](#buildpackage-sub-steps)                                                                                                                                                                                                                                                                                                                                                                                                                                                           | [modularClientPackageGenerator.ts#L41] |
| **9. Generate Changelog & Bump Version**  | ✅ Required    | `generateChangelogAndBumpVersion()`            | Same as HLC; skipped for Data Plane packages                                                                                                                                                                                                                                                                                                                                                                                                                                                             | [modularClientPackageGenerator.ts#L47] |
| **10. Try Build Samples**                 | ⚠️ Conditional | `tryBuildSamples()`                            | `dev-tool run build:samples`. Blocking rules: **Management plane** — failure is a hard error in `Release` mode only; treated as a warning in all other modes (`SpecPullRequest`, `Batch`, `Local`). **Data plane** — always treated as a warning (never blocks). Known gap ([#14610](https://github.com/Azure/azure-sdk-tools/issues/14610)): sample failures are not caught during spec PR validation (`SpecPullRequest` mode), so a package that passes spec PR checks can still fail at release time. | [modularClientPackageGenerator.ts#L49] |
| **11. Update Package Result**             | ✅ Required    | `updateNpmPackageResult()`                     | Read `package.json` name/version into `PackageResult`                                                                                                                                                                                                                                                                                                                                                                                                                                                    | [modularClientPackageGenerator.ts#L56] |
| **12. Create Release Artifact**           | ✅ Required    | `createArtifact()`                             | `pnpm run --filter {packageName}... pack`, generates `.tgz`                                                                                                                                                                                                                                                                                                                                                                                                                                              | [modularClientPackageGenerator.ts#L63] |
| **13. Create/Update CI YAML**             | ✅ Required    | `createOrUpdateCiYaml()`                       | Create or update `ci.mgmt.yml`                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | [modularClientPackageGenerator.ts#L67] |

#### `buildPackage()` Sub-steps Detail

| Sub-step             | Required    | Command / Operation                                                                               | Code Link           |
| -------------------- | ----------- | ------------------------------------------------------------------------------------------------- | ------------------- |
| pnpm install         | ✅ Required | `pnpm install`                                                                                    | [rushUtils.ts#L127] |
| Lint fix             | ⚠️ Optional | `npm run lint:fix` — only in `Release` / `Local` mode                                             | [rushUtils.ts#L139] |
| Apply custom code    | ⚠️ Optional | `dev-tool customization apply-v2 -s ./generated -c ./src` — Data Plane packages only              | [rushUtils.ts#L146] |
| turbo build          | ✅ Required | `pnpm turbo build --filter {packageName}... --token 1` (build errors are warnings for Data Plane) | [rushUtils.ts#L150] |
| Extract ApiView info | ✅ Required | Find `temp/**/*-node.api.json` or `temp/**/*.api.json`                                            | [rushUtils.ts#L157] |
| Test package         | ⚠️ Optional | `pnpm run test:node` — `TEST_MODE=record`; failure does not block                                 | [rushUtils.ts#L169] |
| Format               | ✅ Required | `npm run format`                                                                                  | [rushUtils.ts#L170] |
| Update snippets      | ✅ Required | `dev-tool run update-snippets`                                                                    | [rushUtils.ts#L171] |

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
