---
on:
  pull_request:
    types: [labeled]
labels: [performance-review-needed]
if: github.event.label.name == 'performance-review-needed'
description: "Dash: Review a pull request for performance regressions"
permissions:
  contents: read
  pull-requests: read
  actions: read
tools:
  github:
    toolsets: [context, repos, pull_requests, actions]
    min-integrity: unapproved
  bash: true
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
    footer: "> ⚡ *Benchmarked by [{workflow_name}]({run_url})*"
    run-started: "⚡ [{workflow_name}]({run_url}) is profiling this PR for performance regressions…"
    run-success: "⚡ [{workflow_name}]({run_url}) completed the performance review. ✅"
    run-failure: "⚡ [{workflow_name}]({run_url}) {status}. ❌"
timeout-minutes: 15

---

# Performance Review

Review pull request #${{ github.event.pull_request.number }} for
performance regressions and anti-patterns.

Follow the guidelines in [performance-review-guidelines.md](../prompts/performance-review-guidelines.md).

## Important Constraints

- Only review for **performance issues**. Ignore style, formatting,
  API design, and security.
- Only flag issues **introduced or worsened** by this pull request. Do not
  flag pre-existing issues in unchanged code.
- If other review agent labels are also present on this PR, stay focused
  on performance. Do not duplicate findings better handled by other agents
  (Archie for API design, Dexter for dependencies, Sentinel for security,
  Scribe for documentation, Tester for test coverage).
- Focus on production source code in `src/` directories.
- Do **not** flag micro-optimizations with no measurable impact.
- When reviewing PRs that claim performance improvements, **verify
  claims with micro-benchmarks** (see Step 2.5) before accepting or
  rejecting them. Use the bash tool to run quick Node.js benchmarks.
- **Confirm high-impact changes positively** — not every comment needs
  to be negative. If a change delivers a measurable large improvement,
  say so with benchmark data (use ✅ **Confirmed** severity).
- Do **not** comment on generated code under `src/generated/` unless
  it introduces an obvious hot-path regression.
- `snippets.spec.ts` files under `sdk/**/*/test/` are documentation
  snippet sources, **not** real tests — ignore them.

## Step 0 — Context Gathering

1. **Check CI status** — use the Actions toolset to check whether CI
   checks are passing. Performance issues sometimes manifest as timeouts
   or OOM in CI.
2. **Recall past context** — use cache-memory to check if this package
   has had prior performance findings.

## Step 1 — Identify Changed Files

1. List the files changed in the pull request using the GitHub API.
2. Prioritize:
   - Core pipeline files (`*pipeline*`, `*policy*`, `*client*`)
   - Paging and iteration logic (`*paging*`, `list*` methods)
   - Streaming and large payload handling (`*stream*`, `*blob*`,
     `*download*`, `*upload*`)
   - Retry and polling logic (`*retry*`, `*lro*`, `*poller*`)
   - Hot-path utilities called from multiple operations
3. If no performance-relevant code was changed, post a single pull
   request comment saying no performance concerns were found and stop.

## Step 2 — Check Against Guidelines

For each changed file, apply the full performance review checklist from
the guidelines document. Cover all categories: pagination, AbortSignal,
memory allocation, streaming, HTTP efficiency, retry/polling, sync
blocking, bundle size, async patterns, caching, and TypeScript patterns.

## Step 2.5 — Micro-Benchmark Verification

For any finding that involves a **performance optimization** (new or
modified), write and run a quick Node.js micro-benchmark using `bash`
to **measure** the actual impact before posting the finding. This
includes changes you want to flag AND changes you want to confirm as
beneficial. Follow the micro-benchmark methodology in the guidelines
(Section 12).

**When to benchmark:**

- The PR adds a fast path, cache, or heuristic to skip expensive work
- The PR replaces a polling mechanism with an event-driven approach
- You identify an allocation pattern and want to suggest an alternative
- You want to verify whether an optimization is net-positive or
  net-negative across representative inputs

**When NOT to benchmark:**

- The issue is structural (missing AbortSignal, unbounded buffer, no
  pagination) — these are correctness/design issues, not speed claims
- The change is self-evidently beneficial (removing dead code, fixing
  a quadratic loop to linear)
- The affected code path is not hot (called fewer than 1,000 times per
  second in typical usage)

**How to benchmark:**

1. Write a standalone `bench.mjs` file using the template from the
   guidelines document (Section 12).
2. Run it with `node bench.mjs` via the bash tool.
3. Include the benchmark results as a markdown table in your review
   comment for that finding.
4. **Assess materiality**: compare the absolute per-operation cost
   to the I/O overhead on the same code path. A 100 ns saving on a
   path that includes a 5 ms network call is noise.
5. Clean up: remove the benchmark file after collecting results.

**Optimization justification:**

Before endorsing or only suggesting improvements to a new optimization, also apply the
optimization justification checklist from the guidelines (Section 13):
- Search for existing alternatives that already solve the same problem
- Assess complexity vs measured benefit
- Check for regressions across different input classes
- Question module-level state (caches, memoization)

## Step 3 — Submit Review

Submit your findings as a **pull request review** with inline code comments.

For each finding, create a **review comment** on the specific file and
line using `create-pull-request-review-comment`:

> 🔴 **Critical** — `downloadToBuffer()` allocates unbounded buffer.
> **Impact:** OOM on large downloads.
> **Fix:** Add a `maxSize` option or suggest streaming.

After all inline comments, **submit the review** using
`submit-pull-request-review` with:

- **event**: `COMMENT`
- **body**: A one-paragraph summary (count of findings by severity, or
  "No performance issues found") followed by:

<pre>
&lt;details&gt;
&lt;summary&gt;📊 Structured Report&lt;/summary&gt;

```json
{"agent":"dash","pr":NUMBER,"summary":"clean|issues_found","findings":[{"file":"...","line":0,"severity":"critical|medium|low|confirmed","category":"...","description":"..."}]}
```

&lt;/details&gt;
</pre>

If no issues were found, submit a `COMMENT` review with a one-sentence
body confirming no performance regressions were detected.

## Step 4 — Update Memory

After posting, store a brief summary in cache-memory (PR number,
package, outcome) so future runs can track performance trends.
