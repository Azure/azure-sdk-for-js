---
name: code-review
description: "Review pull requests and code changes in the Azure SDK for JavaScript repository. USE FOR: GitHub Copilot code review; CCR; review pull request; review PR; review diff; find bugs or regressions introduced by a PR; cross-domain SDK review. Finds high-confidence correctness, security, API compatibility, performance, dependency, documentation, and test issues. DO NOT USE FOR: implementing fixes; running tests; fixing CI; releases; APIView feedback."
---

# Azure SDK for JavaScript Code Review

Use this skill for GitHub Copilot code review (CCR) and other broad pull
request reviews. If the task already assigns a narrower specialist role, that
scope remains authoritative; use this skill's evidence and quality gates
without expanding the specialist review.

## Review Process

1. Read the pull request description and identify the intended behavior.
2. Categorize the changed files and apply only the relevant guidance below.
3. Review correctness and behavioral regressions first, then apply the
   relevant SDK-specific checks.
4. Trace changes through callers, exports, tests, API reports, documentation,
   and package metadata when those relationships affect correctness.
5. Inspect enough unchanged context to verify existing guards, invariants, and
   behavior before reporting a finding.

For files outside `sdk/`, review for correctness, security, regressions, and
test coverage without imposing SDK-only conventions.

## Load Guidance Progressively

The path-specific reviewer instructions are canonical. Load a full specialist
prompt only when the changed surface or a suspected risk needs deeper analysis.
Do not load every prompt for every pull request.

| Changed surface or risk                        | Canonical instruction                                         | Optional deep checklist                                                                                                                                     |
| ---------------------------------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SDK source or API report                       | `.github/instructions/reviewer/sdk-source.instructions.md`    | `.github/prompts/architecture-review-guidelines.md`, `.github/prompts/security-review-guidelines.md`, or `.github/prompts/performance-review-guidelines.md` |
| Tests or coverage implications                 | `.github/instructions/reviewer/testing.instructions.md`       | `.github/prompts/test-review-guidelines.md`                                                                                                                 |
| README, CHANGELOG, TSDoc, snippets, or samples | `.github/instructions/reviewer/documentation.instructions.md` | `.github/prompts/documentation-review-guidelines.md`                                                                                                        |
| Package manifests or workspace catalogs        | `.github/instructions/reviewer/dependencies.instructions.md`  | `.github/prompts/dependency-review-guidelines.md`                                                                                                           |
| `sdk/*/arm-*` management packages              | `.github/instructions/reviewer/mgmt-sdk.instructions.md`      | `.github/prompts/mgmt-review-guidelines.md`                                                                                                                 |
| `pnpm-lock.yaml`                               | `.github/instructions/reviewer/lockfile.instructions.md`      | None; do not comment on lockfile churn                                                                                                                      |

Management-specific instructions take precedence over conflicting generic SDK
rules. Treat `snippets.spec.ts` as documentation source, not as a test. Before
calling an API removal breaking, establish that it existed in the last GA
release.

Generated code is output, not the fix location. Do not comment on
`generated/` or `src/generated/` files. If generated output exposes a real
management API or tooling defect covered by the management guidance, report
the root cause once on the nearest actionable changed surface and identify the
upstream fix.
