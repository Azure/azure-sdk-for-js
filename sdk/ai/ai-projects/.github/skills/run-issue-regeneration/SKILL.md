---
name: run-issue-regeneration
description: Runs the issue-assigned @azure/ai-projects TypeSpec regeneration workflow from validated issue inputs through a reviewable draft pull request.
---

# Run an issue-assigned TypeSpec regeneration

Run the `@azure/ai-projects` TypeSpec regeneration from its pinned upstream commit through a reviewable draft pull request. Work only in `sdk/ai/ai-projects/` except for repository setup commands.

## Validate the assignment

Before installing dependencies or editing files:

1. Require the issue body marker `ai-projects-typespec-regen:v1`.
2. Require the title to match exactly:
   `[ai-projects] regen from <40-lowercase-hex-characters> against <base-branch>`.
3. Read `TypeSpec commit` and `Base branch` from the issue body. Require both values to match the title.
4. Require the entire base branch to case-sensitively match the conservative ASCII pattern `^[A-Za-z0-9][A-Za-z0-9._/-]*\z` and pass `git check-ref-format --branch`. Treat it only as a quoted command argument.
5. Require a named working branch other than the base branch. Fetch `origin/<base-branch>`, then require the fetched branch tip to equal `HEAD` exactly. If the assignment started from the wrong branch, stop without making changes and report both commit IDs.

Do not infer, shorten, or silently correct either input.

## Set up the repository

From the repository root:

```bash
pnpm install --filter @azure/ai-projects...
pnpm turbo build --filter=@azure/ai-projects... --token 1
```

Then change to `sdk/ai/ai-projects/` and require `git status --short -- .` to be empty. Stop on setup or preflight failure.

## Run the skills

The package skills are intentionally nested and are not automatically loaded by the cloud-agent runtime. Read each `SKILL.md` in full immediately before executing it, and execute them in this exact order:

1. `.github/skills/regenerate-from-typespec/SKILL.md`
2. `.github/skills/apply-post-emitter-edits/SKILL.md`
3. `.github/skills/author-samples/SKILL.md`
4. `.github/skills/author-tests/SKILL.md`
5. `.github/skills/update-changelog/SKILL.md`
6. `.github/skills/open-regeneration-pr/SKILL.md`

Pass the validated 40-character commit explicitly to `regenerate-from-typespec`. Always restore `tsp-location.saved.yaml` in a `finally` path if generation fails. Do not proceed to the next skill until the current skill's success criteria pass.

Samples and GA tests are conditional. A step may be a documented no-op when the API diff contains no qualifying surface; state that explicitly in the pull request rather than creating placeholder files.

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

Keep the pull request in draft and use the title `[ai-projects] Regenerate from azure-rest-api-specs@<7-character-commit>`. Its description must link the full upstream commit, summarize public API changes, explain any sample/test no-ops, and report each validation command honestly.

Apply every STOP condition from the six skills. On failure, preserve the working tree for diagnosis, do not publish partial manual branches or pull requests, and report the failing command and its output.
