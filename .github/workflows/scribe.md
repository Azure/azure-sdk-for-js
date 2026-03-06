---
on:
  pull_request:
    types: [labeled]
    names: [docs-review-needed]
description: "Scribe: Review a pull request for documentation completeness and consistency"
permissions:
  contents: read
  issues: read
  pull-requests: read
  actions: read
tools:
  github:
    toolsets: [default, actions]
  bash: true
  cache-memory:
  repo-memory:
safe-outputs:
  add-comment:
    max: 10
    discussions: false

---

# Documentation Review

Review pull request #${{ github.event.pull_request.number }} for
documentation completeness and consistency.

Follow the guidelines in [documentation-review-guidelines.md](https://github.com/Azure/azure-sdk-for-js/blob/main/.github/prompts/documentation-review-guidelines.md).

## Important Constraints

- Only review for **documentation gaps and inconsistencies**. Ignore
  code logic, performance, security, and API design.
- Only flag issues **introduced or worsened** by this pull request. Do not
  flag pre-existing documentation gaps in unchanged code.
- If other review agent labels are also present on this PR, stay focused
  on documentation. Do not duplicate findings better handled by other
  agents (Archie for API design, Dexter for dependencies, Sentinel for
  security, Dash for performance, Tester for test coverage).
- Treat `snippets.spec.ts` as **documentation source files** — their
  code must match the API they demonstrate.
- Do **not** flag formatting or whitespace in source code.
- Do **not** flag generated code under `src/generated/`.

## Step 0 — Context Gathering

1. **Check CI status** — use the Actions toolset to check whether CI
   checks are passing. Doc build failures (e.g., broken snippet
   references) surface as CI errors.
2. **Recall past context** — use repo-memory to check for known
   documentation patterns or exceptions for this package. Use
   cache-memory to check if this package has had prior doc findings.

## Step 1 — Identify What Changed

1. List the files changed in the pull request using the GitHub API.
2. Categorize changes:
   - **API changes**: `src/index.ts`, `src/**/*.ts` (new/changed exports)
   - **API report**: `review/*.api.md` (public surface changes)
   - **Documentation**: `README.md`, `CHANGELOG.md`
   - **Snippets**: `test/snippets.spec.ts`
   - **Samples**: `samples-dev/**/*.ts`, `samples/**/*`
3. If no API or documentation files were changed, post a single pull
   request comment saying no documentation concerns and stop.

## Step 2 — Check Consistency Across All Artifacts

For each public API change, apply the full documentation review checklist
from the guidelines. Verify the complete documentation chain: source
exports → TSDoc → snippets.spec.ts → README code fences → CHANGELOG
entries → samples-dev files → API report.

## Step 3 — Check Structural Consistency

1. **README sections** — correct order (title → links → getting started
   → auth → concepts → examples → troubleshooting → next steps →
   contributing)
2. **CHANGELOG format** — version headers, date format, subsection
   order, PR links
3. **Cross-references** — README links to npm, API docs, and samples
   are correct. CHANGELOG PR links are valid.
4. **Snippet naming** — follows `ReadmeSample<Feature>` convention

## Step 4 — Post Findings

Post your findings as a **single pull request comment** on the pull
request. For each finding, include:

- **File**
- **Severity**: 🔴 Missing, 🟡 Inconsistent, 🔵 Suggestion
- A one-line description of the documentation gap
- A concrete suggested fix

Group findings by severity (missing first). If all documentation looks
good, say so explicitly in one sentence.

After your human-readable comment, append a machine-readable summary:

<pre>
&lt;details&gt;
&lt;summary&gt;📊 Structured Report&lt;/summary&gt;

```json
{"agent":"scribe","pr":NUMBER,"summary":"clean|issues_found","findings":[{"file":"...","line":0,"severity":"high|medium|low","category":"...","description":"..."}]}
```

&lt;/details&gt;
</pre>

## Step 5 — Update Memory

After posting, store useful context for future reviews:
- **repo-memory**: save any package-specific documentation conventions
  (e.g., "this package uses a custom README section for protocol methods").
- **cache-memory**: save a brief summary of this review (PR number,
  package, outcome) so future runs can detect recurring doc gaps.
