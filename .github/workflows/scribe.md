---
on:
  pull_request_target:
    types: [labeled]
    forks: ["*"]
  workflow_dispatch:
    inputs:
      item_number:
        description: PR number to run the review on
        required: true
        type: string
  permissions:
    pull-requests: write
  steps:
    - name: Remove trigger label
      id: remove_label
      if: github.event_name == 'pull_request_target' && github.event.label.name == 'docs-review-needed'
      uses: actions/github-script@v8
      with:
        script: |
          try {
            await github.rest.issues.removeLabel({
              ...context.repo,
              issue_number: context.payload.pull_request.number,
              name: 'docs-review-needed'
            });
          } catch (e) {
            core.warning(`Could not remove label: ${e.message}`);
          }
labels: [docs-review-needed]
if: github.event.label.name == 'docs-review-needed'
concurrency:
  group: "gh-aw-${{ github.workflow }}-${{ github.event.pull_request.number || github.ref || github.run_id }}-${{ github.event.label.name || '' }}"
  cancel-in-progress: true
description: "Scribe: Review a pull request for documentation completeness and consistency"
permissions:
  contents: read
  pull-requests: read
  actions: read
tools:
  github:
    toolsets: [context, repos, pull_requests, actions]
    min-integrity: unapproved
  bash: ["cat", "date", "echo", "grep", "head", "ls", "pwd", "sort", "tail", "uniq", "wc"]
  cache-memory:
  repo-memory:
safe-outputs:
  create-pull-request-review-comment:
    max: 10
    side: "RIGHT"
    target: "${{ github.event.pull_request.number || github.event.issue.number }}"
  submit-pull-request-review:
    max: 1
    footer: "if-body"
    target: "${{ github.event.pull_request.number || github.event.issue.number }}"
  messages:
    footer: "> 📝 *Proofread by [{workflow_name}]({run_url})*"
    run-started: "📝 [{workflow_name}]({run_url}) is reviewing documentation consistency…"
    run-success: "📝 [{workflow_name}]({run_url}) completed the documentation review. ✅"
    run-failure: "📝 [{workflow_name}]({run_url}) {status}. ❌"
timeout-minutes: 15

---

# Documentation Review

Review pull request #${{ github.event.pull_request.number }} for
documentation completeness and consistency.

Follow the guidelines in [documentation-review-guidelines.md](../prompts/documentation-review-guidelines.md).

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
2. **Recall past context** — use cache-memory to check if this package
   has had prior documentation findings.

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

## Step 4 — Submit Review

Submit your findings as a **pull request review** with inline code comments.

For each finding, create a **review comment** on the specific file and
line using `create-pull-request-review-comment`:

> 🔴 **Missing** — New `listWidgets` export has no TSDoc `@example`
> tag and no matching `snippets.spec.ts` entry.
> **Fix:** Add a `ReadmeSampleListWidgets` snippet test.

After all inline comments, **submit the review** using
`submit-pull-request-review` with:

- **event**: `COMMENT`
- **body**: A one-paragraph summary (count of findings by severity, or
  "Documentation is complete and consistent") followed by:

<pre>
&lt;details&gt;
&lt;summary&gt;📊 Structured Report&lt;/summary&gt;

```json
{"agent":"scribe","pr":NUMBER,"summary":"clean|issues_found","findings":[{"file":"...","line":0,"severity":"critical|medium|low","category":"...","description":"..."}]}
```

&lt;/details&gt;
</pre>

If no issues were found, submit a `COMMENT` review with a one-sentence
body confirming documentation is consistent.

## Step 5 — Update Memory

After posting, store a brief summary in cache-memory (PR number,
package, outcome) so future runs can detect recurring doc gaps.
