---
name: run-issue-regeneration
description: Runs the issue-assigned @azure/ai-projects TypeSpec regeneration workflow from required issue-description inputs through a reviewable draft pull request.
---

# Run an issue-assigned TypeSpec regeneration

Run the `@azure/ai-projects` TypeSpec regeneration from its pinned upstream commit through a reviewable draft pull request. Work only in `sdk/ai/ai-projects/` except for repository setup commands.

## Validate the assignment

Before installing dependencies or editing files:

1. Read exactly one unambiguous value labeled `TypeSpec commit` and exactly one unambiguous value labeled `Base branch` from the issue description. If either value is missing, duplicated, or ambiguous, stop without making changes and report the required labels.
2. Require the TypeSpec commit to match `^[0-9a-f]{40}$` exactly.
3. Require the entire base branch to case-sensitively match the conservative ASCII pattern `^[A-Za-z0-9][A-Za-z0-9._/-]*\z` and pass `git check-ref-format --branch`. Treat it only as a quoted command argument.
4. Require a named working branch other than the base branch. Fetch `origin/<base-branch>` successfully before proceeding. Do not require `HEAD` to match the base branch tip; issue-assigned sessions run on a separate working branch that may already contain commits. Instead, require the working branch to be either (a) ahead of `origin/<base-branch>` or (b) able to merge or rebase cleanly onto `origin/<base-branch>`. If neither condition holds, stop without making changes and report the divergence details, including the merge base and ahead/behind state relative to `origin/<base-branch>`.

Do not derive either input from the issue title. Do not infer, shorten, or silently correct either input.

## Set up the repository

From the repository root:

```bash
npm --prefix eng/common/tsp-client ci
pnpm install --filter @azure/ai-projects...
pnpm turbo build --filter=@azure/ai-projects... --token 1
```

The pinned `tsp-client` CLI is installed in the separate npm project and the
generation script invokes it through `npm --prefix ... exec`; it does not need
to be added to `PATH`.

Then change to `sdk/ai/ai-projects/` and run the clean-tree preflight:

```bash
pwsh -NoProfile -File ./.github/skills/regenerate-from-typespec/scripts/assert-clean-tree.ps1
```

The setup build's API extraction writes `review/ai-projects-browser.api.diff.md` and `review/ai-projects-react-native.api.diff.md`. Those two files are build output, not user changes, so do not stop because of them: the script deletes untracked copies and restores tracked copies, then requires `git status --short -- .` to be empty. Stop on setup failure, or if the script reports any other change.

## Run the skills

The package skills are intentionally nested and are not automatically loaded by the cloud-agent runtime. Read each `SKILL.md` in full immediately before executing it, and execute them in this exact order:

1. `.github/skills/regenerate-from-typespec/SKILL.md`
2. `.github/skills/apply-post-emitter-edits/SKILL.md`
3. `.github/skills/author-samples/SKILL.md`
4. `.github/skills/author-tests/SKILL.md`
5. `.github/skills/update-changelog/SKILL.md`
6. `.github/skills/open-regeneration-pr/SKILL.md`

Pass the validated 40-character commit explicitly to `regenerate-from-typespec`. Run the emitter with that skill's `scripts/generate-client.ps1`, not `npm run generate:client`. The committed emitter lockfile can pin internal Azure Artifacts feeds that the cloud agent firewall cannot resolve, and the script rewrites them to the public npm registry in the temporary copy only. For example:

```bash
pwsh -NoProfile -Command '$ErrorActionPreference = "Stop"; try { & ./.github/skills/regenerate-from-typespec/scripts/update-tsp-commit.ps1 -Commit <validated-commit>; & ./.github/skills/regenerate-from-typespec/scripts/generate-client.ps1 } finally { & ./.github/skills/regenerate-from-typespec/scripts/update-tsp-commit.ps1 -RestoreOnly }'
```

Always restore `tsp-location.saved.yaml` in a `finally` path if generation fails. Do not proceed to the next skill until the current skill's success criteria pass.

A customization rejection is not a STOP condition. When the resolver cannot merge an emitted change (`Customization rejected N unresolved or unsafe change(s)`, or a symptom such as `missing resolved operation ...`), `generate-client.ps1` retries in recovery mode, keeps the customized code for each such change, writes `temp/customization-worklist.md`, and exits 0. Continue with the skills in order and use your best judgement on every worklist entry, as `apply-post-emitter-edits` Step 0a describes. The compiler errors those kept changes cause (an operation that no longer matches its serializer, hand-written code that builds a type the emitter changed) belong to the same work: trace each to its entry and fix it in `src/` rather than reporting it. Record every disposition for the pull request description.

Protected-file drift, diff3 conflict markers, and recovery-worklist entries produced by customization are inputs to `apply-post-emitter-edits`, not reasons to stop or to publish partial emitter output. That skill must reject broad emitter rewrites, preserve existing custom behavior, resolve all markers, and remove its listed stray files before the samples, tests, and changelog skills run. Narrowly scoped protected-file edits necessary to integrate verified upstream APIs are permitted under that skill's audit and validation requirements.

On resumption after emitter output has already been committed, do not regenerate blindly or discard prior output. Record the clean pre-regeneration ref and use it for generated/source/API comparisons and guard `--base-ref` arguments instead of the partially integrated `HEAD`. Reuse verified completed setup/emission work, then finish every remaining skill and validation. The worklist is gitignored scratch and is not committed; if it is missing on resumption, rebuild it without writing source by running `node scripts/customize.mjs --recover --dry-run --base-ref <clean-ref>`. If the logical-commit script cannot represent already-committed output or explicitly requested guidance edits, preserve the changes and report the grouping limitation; do not reset history or publish partial integration.

New samples and GA test scaffolding are conditional. Existing sample/test
maintenance and compilation are mandatory, including existing beta consumers.
Reconcile verified method and model-shape changes using the authoring skills
before treating validation as blocked; apply one focused remediation pass and
stop if the error is unexplained or remains unresolved. A step may be a documented
no-op only when no new files were needed, no existing consumers changed, and its
compilation passed. State that explicitly in the pull request rather than creating
placeholder files. Maintenance-only changes must be included in the sample/test
commit groups, without the corresponding no-op switch.

For the sixth skill, the issue assignment already owns the working branch and draft pull request. Prepare the logical commits without creating another branch, pushing manually, or opening another pull request:

```powershell
./.github/skills/open-regeneration-pr/scripts/open-pr.ps1 `
  -TspCommit '<validated-commit>' `
  -BaseBranch '<validated-base-branch>' `
  -ManagedAgentSession
```

Append `-SamplesNoOp` only when `author-samples` explicitly completed as a documented no-op, and append `-TestsNoOp` only when `author-tests` explicitly completed as a documented no-op.

The result may contain three to five non-empty regeneration commits, always in this relative order: emitter output, post-emitter edits, samples, tests, changelog. Empty sample or test groups require the corresponding explicit no-op switch; all other unexplained empty groups are failures.

## Finish the managed pull request

Keep the pull request in draft and use the title `[ai-projects] Regenerate from azure-rest-api-specs@<7-character-commit>`. Its description must link the full upstream commit, summarize public API changes, explain any sample/test no-ops, and report each validation command honestly. When recovery mode ran, it must also include the judgement-call table from `apply-post-emitter-edits` Step 0a (one row per worklist entry with its disposition and reason, and **needs review** flagged where you were unsure) so a reviewer can see and overrule every call you made.

Apply every STOP condition from the six skills, with two clarifications. Customization diagnostics are not STOP conditions (see above), and neither are build or type errors that trace to a worklist entry or to a described upstream change: fix those under the Step 0a rubric and continue. STOP when input validation fails, setup (including network sandboxing) or the emitter itself fails, or an error is unexplained or survives one focused remediation. On STOP, do not publish partial manual branches or pull requests, and report the failing command and its output in your final message and in the pull request description. The session's runtime commits whatever remains in the working tree when the session ends (it did, as `Apply remaining changes`, on the halted regeneration that prompted this guidance), so a working tree "left for diagnosis" is published rather than preserved. Before stopping, restore `src/` if it holds unresolved merge output (conflict markers, duplicated declarations) with `git restore -- src; git clean -fd -- src`, and delete a stray `metadata.json`. State in the description exactly what the branch contains, and never call leftover changes uncommitted or unpublished.

Before finishing a managed session, verify that no conflict markers remain under `src/`, `src/restorePollerHelpers.ts` and `metadata.json` do not exist, and the changelog group is non-empty. Never report progress or commit emitter output as the completed regeneration while any required downstream skill is pending or failed.
