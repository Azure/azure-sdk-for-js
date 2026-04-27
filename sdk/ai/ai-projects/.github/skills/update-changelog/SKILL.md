---
name: update-changelog
description: 'Insert a new top entry into ai-projects CHANGELOG.md summarizing the regeneration. Use when classifying API changes into Breaking Changes / Features Added / Bugs Fixed / Other Changes buckets after a TypeSpec regeneration. Matches the existing house style and leaves the version line as a placeholder for human review.'
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

### Step 3: Insert a new top entry

Use [templates/changelog-entry.md](./templates/changelog-entry.md). Insert it directly **above** the most recent existing entry.

Leave the version header as `## Unreleased` for the human to bump. Do not guess a version number.

Drop empty subsections (don't leave a `### Bugs Fixed` heading with no items underneath).

### Step 4: Validate

- The CHANGELOG still parses (`npx prettier --check CHANGELOG.md`).
- No duplicate items across buckets.
- Each line is a single bullet starting with a verb in the same tense as nearby entries.

## Hand-off

Done. Hand off to `open-regeneration-pr`.
