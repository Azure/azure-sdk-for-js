---
name: update-changelog
description: 'Update ai-projects CHANGELOG.md after a TypeSpec regeneration. Merges new items into the existing top (Unreleased) entry when present; otherwise creates a new top entry, classifying changes into Breaking Changes / Features Added / Bugs Fixed / Other Changes buckets and syncing package.json version as needed.'
---

# Update CHANGELOG.md for an ai-projects regeneration

## When to Use

- The `apply-post-emitter-edits`, `author-samples`, and `author-tests` skills have all completed.
- A regeneration has produced a meaningful diff in `src/` and `review/ai-projects-node.api.md`.
- You need a CHANGELOG entry before opening the PR.

## Inputs

- The api-surface diff JSON (from [../author-samples/prompts/diff-api-surface.prompt.md](../author-samples/prompts/diff-api-surface.prompt.md)).
- `git diff HEAD -- src/` for context on hand-applied edits and bug fixes.
- The current [CHANGELOG.md](../../../CHANGELOG.md) for voice and section ordering.

## Procedure

Run from `sdk/ai/ai-projects/`.

### Step 1: Read the current CHANGELOG style

Open `CHANGELOG.md`. Note the section ordering used in recent entries:

1. `### Breaking Changes`
2. `### Features Added`
3. `### Bugs Fixed`
4. `### Other Changes`

Voice examples (copy this voice exactly):

- Features: "Add `project.beta.skills` route for accessing skills"
- Breaking: "Rename `id` property in `Schedule` interface to `schedule_id`"
- Bugs: "Remove redundant `foundryFeatures` property from `EvaluationRulesCreateOrUpdateOptionalParam`"
- Other: "Deprecated `TextResponseFormatConfiguration` in favor of `TextResponseFormat`"

### Step 2: Classify changes

For each item from the api-surface diff plus each hand-applied edit:

| Bucket | What goes here |
|--------|----------------|
| Breaking Changes | Removed/renamed public symbols; required→optional or optional→required; method signature changes; namespace renames. |
| Features Added | New public classes, methods, namespaces, interfaces. |
| Bugs Fixed | Behavioral fixes; redundant-property removals; correctness fixes from post-emitter workarounds. |
| Other Changes | Deprecations, internal refactors, dependency bumps. |

Beta-namespace additions still go under **Features Added**, with the namespace path included (e.g., `project.beta.toolboxes`).

### Step 3: Insert or extend the top entry

First, **inspect the current top entry in `CHANGELOG.md`**:

- If it is already an `## <version> (Unreleased)` (or otherwise unreleased) entry, **do not create a new entry and do not bump the version.** Instead, merge the new items into the existing buckets under that entry — adding new bullets, keeping the existing ones, and dropping any subsection that ends up empty. Skip Step 3.5 entirely in this case (the `package.json` version already matches).
- Only if the current top entry is a released version (i.e. its header has a date, not `(Unreleased)`) do you create a new top entry. Use [templates/changelog-entry.md](./templates/changelog-entry.md) and insert it directly **above** that released entry.

When creating a new entry, pick a tentative next version following semver against the previous CHANGELOG entry:

- **Breaking Changes** present → bump major (e.g., `2.1.0` → `3.0.0`).
- **Features Added** only → bump minor (e.g., `2.1.0` → `2.2.0`).
- **Bugs Fixed** / **Other Changes** only → bump patch (e.g., `2.1.0` → `2.1.1`).

Use the header form `## <new-version> (Unreleased)` so the release engineer just has to swap `Unreleased` for a date.

Drop empty subsections (don't leave a `### Bugs Fixed` heading with no items underneath).

### Step 3.5: Sync `package.json` version

**Skip this step if you merged into an existing `(Unreleased)` entry in Step 3** — the version did not change, so `package.json` is already correct.

When you created a new top entry, the `version` field in [`package.json`](../../../package.json) MUST match the version in that new entry. Update `package.json` to match (e.g., `"version": "2.2.0"`). Release tooling fails CI if these drift.

### Step 4: Validate

- The CHANGELOG still parses (`npx prettier --check CHANGELOG.md`).
- No duplicate items across buckets.
- Each line is a single bullet starting with a verb in the same tense as nearby entries.
- `package.json` `version` field matches the top CHANGELOG entry's version (run `node -p "require('./package.json').version"` and compare).

## Hand-off

Done. Hand off to `open-regeneration-pr`.
