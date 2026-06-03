# SDK Regenerate Pipeline — Design

**Owner**: v-wangxinlei
**Files**: `eng/pipelines/sdk-regenerate.yml` + `eng/pipelines/scripts/regenerate-runner.js`
**Status**: experimental, validating on `wxl534/azure-sdk-for-js` fork before merge

---

## 1. Goal

Detect breaking changes introduced by a new version of the TypeSpec emitter
(`@azure-tools/typespec-ts`) **before** that emitter is rolled out to spec authors.

The pipeline answers: *"If we bump the emitter to version X today, which existing
ARM SDK packages would break, and how?"*

Output: one aggregated GitHub PR containing the regenerated `*.api.md` and
`CHANGELOG.md` for every ARM package, plus a structured summary listing every
package with breaking changes and every package skipped (with reason).

---

## 2. Pipeline architecture

```
                        Setup
                          │  (resolve emitter version: explicit | npm dev tag)
                          ▼
                   GenerateMatrix
                          │  (split 200+ arm-* dirs into N shards,
                          │   record dirs missing tsp-location.yaml)
                          ▼
            RegenerateAndBuild  ×N   (matrix, parallel)
                          │  per shard: clone spec → update emitter →
                          │            tsp-client init → pnpm build →
                          │            update-changelog → produce changes.patch
                          ▼
                       Summary
                          │  aggregate all shards' result.json into
                          │  aggregated-results.json
                          ▼
                       CreatePR  (only if CreatePullRequest=true)
                                 reset to origin/<target> → apply all
                                 shard patches → commit → push → open PR
```

All four stages run in a single `BreakCheck` stage on `ubuntu-latest`. Matrix
fan-out is `RegenerationJobCount` (default 10) shards × `MaxWorkers` (default 2)
concurrent regen + `BuildWorkers` concurrent build inside each shard.

---

## 3. Key design decisions

### 3.1 Matrix shard with alphabetical split
- **Why**: 200+ arm-* packages × ~1–10 min each = far too long for a single job.
  Splitting into 10 shards drops wall-clock from ~6h to ~40min.
- Driven by `eng/common/scripts/New-RegenerateMatrix.ps1` (already in repo,
  shared with other regeneration pipelines).
- **Known limitation**: alphabetical split causes load imbalance — the shard
  containing a few slow packages (e.g. `arm-policy`, `arm-datafactory`)
  finishes ~80 min while the fastest finishes ~14 min. A future "swap fastest
  shard ↔ slowest package" tweak is tracked but not yet implemented (low ROI
  vs. the failure modes below).

### 3.2 Reuse official tooling, do not re-implement
- **Regenerate**: `tsp-client init --update-if-exists -c <tspconfig> --local-spec-repo`
  — same CLI spec authors use locally.
- **Build**: `pnpm build` from the package directory — same as CI.
- **Changelog + breaking detection**: `update-changelog` from
  `@azure-tools/js-sdk-release-tools` — same tool `spec-gen-sdk` uses on the
  spec side. Output 100% comparable with what individual AutoPRs produce.
- We initially had a custom `breaking-change-detector.js`; it was deleted in
  favor of `update-changelog` to avoid two competing sources of truth.

### 3.3 Local spec clone (not per-package fetch)
- Each shard clones `azure-rest-api-specs@main` once (shallow, depth=1), then
  passes `--local-spec-repo` to `tsp-client init`. Saves 5–10 min/shard vs
  letting tsp-client fetch the spec per package.
- The `repo:` / `commit:` fields in `tsp-location.yaml` are bypassed by design:
  we want to see *what would happen if every package regenerated against
  current main spec*, not against pinned historical specs.

### 3.4 Auto-inject missing transitive emitter deps
- Some versions of main's `emitter-package.json` omit `@typespec/xml` and
  `@typespec/sse`, which `typespec-client-generator-core` needs at runtime.
- The Setup step now patches them in (pinned to the same version as
  `@typespec/events`, always present) before regenerating the lock file.
  Without this, many sdks will fail at `tsp-client init` with
  `Cannot find package @typespec/xml`.

### 3.5 No per-package timeout
- Aligned with `azure-sdk-for-net` / `azure-sdk-for-go` regen pipelines:
  individual `tsp-client` / `pnpm build` invocations run to completion; the
  ADO job-level `timeoutInMinutes: 180` is the only safety net.
- Trade-off: one hung package can burn an entire shard's budget. Accepted
  because it matches sibling repos' behavior and avoids false "timeout"
  signals that hide real emitter bugs.

### 3.6 Push mode: `api-md` (default) vs `all`
- `api-md` PRs only commit `sdk/**/review/*.api.md` and `sdk/**/CHANGELOG.md`.
  These two files are the *signal* — everything else (regenerated `src/`,
  `package.json` version bumps, lock files) is noise for break-check review.
- `all` mode is available for the rare case where a reviewer needs to see the
  full generated code.

### 3.7 Fork-friendly PR creation
- `PullRequestRepoOwner` / `PullRequestRepoName` parameters let the pipeline
  push to and open a PR on a fork (e.g. `wxl534`) using a user-provided PAT
  (`ForkTokenVariableName`), without needing org-level GitHub App credentials.
- When pushing to the canonical Azure repo, the standard
  `eng/common/pipelines/templates/steps/login-to-github.yml` template provides
  a GitHub App token instead.

### 3.8 Quick-test checkbox
- `QuickTest=true` overrides matrix size / filter to run only **3 small ARM
  packages** (`arm-alertprocessingrules`, `arm-alertrulerecommendations`,
  `arm-alertsmanagement`) end-to-end. ~15-min full-loop validation when
  iterating on the pipeline itself.

### 3.9 PR is *aggregated*, not per-package
- All 100+ regenerated packages go into **one** PR per pipeline run, with a
  branch named `sdk-regenerate-<buildId>`. Every run creates a fresh PR
  (build-id-stamped) so reviewers can compare emitter versions over time.
- Contrast: `spec-gen-sdk` opens one PR per spec. That's right for them
  (single-spec validation, single-team review). For emitter regression, the
  aggregated view is what mentor + emitter owners need.

---

## 4. Failure-mode handling

| Failure | Behavior |
|---|---|
| Package has no `tsp-location.yaml` | Excluded from this pipeline's regeneration scope. No extra skipped-package report is generated. |
| Single package's `tsp-client init` fails | Logged to `logs/regenerate/<pkg>.log`, shard continues with next package, surfaced in aggregated summary. Shard does NOT abort. |
| Single package's `pnpm build` fails | Same: logged + reported, shard continues. The CHANGELOG step is skipped for that package. |
| Entire shard times out (180 min) | ADO marks shard failed; other shards complete independently; Summary stage still runs (`condition: succeededOrFailed()`). CreatePR requires Summary success — currently the only "whole pipeline aborts" path. |
| `git apply --3way` patch conflict in CreatePR | (Fixed in current revision.) The conflicting files are reset to `HEAD` and recorded in `failed-patches.txt`; remaining clean patches still apply; the PR description lists dropped files under "Patches skipped due to upstream conflicts". Typically triggered by an `[AutoPR @azure-arm-*]` commit landing between shard checkout and CreatePR checkout. |
| Fork-vs-upstream drift in `.github/CODEOWNERS` etc. | Cosmetic noise when running on a fork whose `main` is behind `Azure:main`. Workaround: "Sync fork" on GitHub before the run. Will vanish entirely once the pipeline is promoted to the canonical repo. |

---

## 5. Parameters (UI knobs)

| Parameter | Default | Purpose |
|---|---|---|
| `EmitterVersion` | `empty` | Version of `@azure-tools/typespec-ts` to test. Sentinel values (`empty`, `latest`, `auto`, `dev`) resolve to the npm `dev` tag. |
| `MaxWorkers` | 2 | Concurrent `tsp-client init` per shard. |
| `BuildWorkers` | 2 | Concurrent `pnpm build` per shard. |
| `RegenerationJobCount` | 10 | Number of matrix shards. |
| `MinimumPerJob` | 10 | Smallest packages-per-shard before matrix gen collapses shards. |
| `SkipBuild` | false | Skip `pnpm build` (regen + api.md still produced, no changelog). |
| `QuickTest` | false | Override everything: only 3 small ARM packages, single shard. |
| `PackageFilter` | `arm-*` | Wildcard filter passed to matrix gen. Ignored when QuickTest. |
| `SpecRepoBranch` | `main` | Which branch of `azure-rest-api-specs` to clone. |
| `CreatePullRequest` | false | Whether to run the CreatePR job. |
| `ChangePushMode` | `all` | `api-md` (signal-only PR) or `all` (full regenerated code). |
| `PullRequestTargetBranch` | `main` | PR base branch. |
| `PullRequestBranch` | empty | PR head branch name (`empty`/`auto` → `sdk-regenerate-<buildId>`). |
| `PullRequestRepoOwner` / `PullRequestRepoName` | empty | Where to open the PR. Empty → same as build source repo. |
| `ForkTokenVariableName` | empty | Name of an ADO secret variable holding a PAT, used when pushing to a fork. |

---

## 6. Outputs

- **Pipeline artifacts**
  - `matrix_artifacts/` — sharded directory lists
  - `regen_result_<JobKey>/` — per-shard logs and `result.json`
  - `regen_summary/aggregated-results.json` — flat summary consumed by CreatePR
- **GitHub PR** (when `CreatePullRequest=true`)
  - Aggregated commit titled `TypeSpec regeneration changes (<mode>) for emitter <version>`
  - Body sections: regeneration summary, breaking-change packages (clickable
    links to per-package `CHANGELOG.md`), patches skipped due to conflicts.
- **Per-package logs** (under `logs/{regenerate,build,changelog}/<pkg>.log`)
  are published in the shard artifact for deep-dive debugging.

---

## 7. Position vs. `spec-gen-sdk`

| Dimension | `sdk-regenerate.yml` (this) | `spec-gen-sdk` |
|---|---|---|
| Trigger direction | emitter version → all SDKs | spec PR → one SDK |
| Emitter version | dev / explicit tag | locked production version |
| PR granularity | 1 PR per pipeline run (aggregated) | 1 PR per spec change |
| Audience | emitter owners, SDK team leads | spec authors |
| Tool chain | `tsp-client`, `update-changelog` (same package) | `tsp-client`, `update-changelog` (same package) |
| Breaking-change source | `update-changelog` → `typescript-codegen-breaking-change-detector` | identical |

Both pipelines share the same regen + changelog engine — they differ only in
*when* and *why* they fire, and in PR aggregation. No tool duplication.

---

## 8. Known limitations / future work

- **Shard load imbalance**: alphabetical split is naive. Tracked: swap fastest
  shard's last package with slowest package's first one until shard wall-clocks
  converge.
- **Fork-sync friction**: while developing on a fork, `main` must be synced
  before each run to keep the PR diff clean. Goes away on official-repo promotion.
- **No data-plane coverage**: pipeline is ARM-only by design (`-OnlyTypeSpec true`
  + `PackageFilter='arm-*'`). Data-plane packages have very different lifecycles
  and would require a separate matrix-gen rule.
- **CreatePR all-or-nothing on Summary**: if Summary fails (e.g. aggregation
  bug), no PR is produced even when all shards succeeded. Low-frequency,
  acceptable for now.
