# Reviewer Agents

This repository includes eight specialized AI reviewer agents that can review
pull requests for specific quality dimensions. Each agent is an expert in its
domain and produces targeted, actionable feedback.

## Available Agents

| Agent | Label | Focus |
|-------|-------|-------|
| **Archie** | `architecture-review-needed` | Public API surface — naming, exports, breaking changes, type safety |
| **Dash** | `performance-review-needed` | Runtime performance — latency, memory, bundle size, async patterns |
| **Dexter** | `dependency-review-needed` | Dependency management — version ranges, workspace protocol, new deps |
| **Mgmt-review** | `mgmt-review-needed` | Management-plane SDKs — API design guidelines, tooling validation |
| **Scribe** | `docs-review-needed` | Documentation — README, CHANGELOG, TSDoc, snippets, samples |
| **Sentinel** | `security-review-needed` | Security — credential exposure, injection, unsafe patterns, supply chain |
| **Tester** | `test-review-needed` | Testing — coverage, recorder setup, test quality, browser tests |

### On-Demand Analysis Agent

| Agent | Focus |
|-------|-------|
| **Mgmt-breaking-change-analysis** | ARM SDK breaking change analysis — categorizes and traces root causes for PRs migrating from Swagger/AutoRest to TypeSpec/emitter. Invoked on-demand; does not trigger via a PR label. |

## Using Agents on Pull Requests

### Triggering a Review

On GitHub, repository collaborators with label permissions can add the
corresponding **label** to a pull request to request a review. The workflows
authorize the requester separately; human requesters need **write**, **maintain**,
or **admin** access.

All seven label-triggered reviewers use the shared intake flow described below.
Management review also accepts requests from the explicitly allowlisted
`azure-sdk-automation[bot]`; that bot cannot request the other reviewers.

For example, to request an architecture review:

1. Open your pull request on GitHub.
2. If you have permission to manage labels, use the **Labels** sidebar to add
   the `architecture-review-needed` label.
3. If you do not have label permissions (for example, you're an external
   contributor), leave a comment asking a maintainer to add the label for you.
4. Once the label is applied, the **Archie** agent will run and post review
   comments directly on the PR.

Collaborators with label permissions can apply **multiple labels** to trigger
several agents on the same PR. Each agent focuses only on its domain and will
not duplicate findings from other agents.

### Shared Review Intake

Review requests use a split intake, routing, and review flow:

```text
one or more review-needed labels
  -> PR Review Intake (pull_request, no repository permissions or checkout)
  -> PR Review Router (workflow_run, trusted code from the default branch)
  -> Selected reviewers (workflow_dispatch, API-only reviews and constrained safe outputs)
```

The router resolves the PR using GitHub's run metadata and commit-to-PR API,
including for fork PRs whose run metadata has an empty `pull_requests` array.
It does not download artifacts or execute PR code. It verifies the originating
workflow, repository, requester, current head SHA, and requested labels before
dispatching the matching reviewer workflows on the default branch. The intake's
`request` job must succeed in the current run attempt; a successful workflow
conclusion with a skipped request job does not activate reviews. If multiple
current PRs share the commit and carry review labels, routing stops before any
dispatch and requires an explicit manual review instead. Labels are
mapped to fixed workflow names in `eng/tools/pr-review/review-request.cjs`, not
to workflow names supplied by the PR. A failed dispatch is reported without
preventing dispatch of the other requested reviewers.

Each reviewer revalidates automatic requests against the same unique PR target.
When starting, it consumes its request label and replaces it with its in-progress
label. For example, Archie replaces
`architecture-review-needed` with `architecture-review-in-progress`. Runs for the
same reviewer and PR are serialized, while different reviewers run independently.
Duplicate automatic requests skip once their label has been consumed. Review
output is rejected if the PR closes or its head changes during the review.
Reapply the request label or use a manual dispatch to retry a failed or stale
review.

For a manual retry, run the desired reviewer (for example, **Architecture Review**)
from the Actions UI on the default branch, supplying `item_number`. `head_sha` is
optional for manual reviews; when supplied, it must still be the current PR head. Leave
`request_run_id` empty: the router supplies this provenance input for automatic
requests. Manual reviews do not require the request label.

The intake, router, validation helper, and reviewer workflows must be on the
default branch before this flow can run. Fork workflow approval requirements
still apply to the intake, and `pull_request` events do not run for PRs with merge
conflicts. A maintainer can use manual dispatch in those cases.

All reviewers inspect PR content as data through the GitHub API. They do not
check out or execute PR code. In particular, Dash evaluates existing benchmark
evidence from unprivileged CI for the reviewed commit rather than running
PR-derived microbenchmarks inside the privileged reviewer. When evidence is
missing, it reports the performance claim as unverified.

To add another reviewer, extend the intake's label filter and the fixed routing
map in `eng/tools/pr-review/review-request.cjs`, then give that reviewer the same
validated dispatch contract. The bot allowlist is scoped to each reviewer.

### What to Expect

- Agents post inline review comments on the PR diff (up to 10 comments each).
- Each comment includes a **severity** indicator:
  - 🔴 Critical / Breaking / Missing — highest priority to address
  - 🟡 Concern / Design issue — should address when feasible
  - 🔵 Suggestion — nice to have, optional improvement

  These severities are advisory and help authors and maintainers prioritize
  follow-up; they do not by themselves block merging.
- If no issues are found, the agent posts a single summary comment noting that
  no significant issues were identified.

### Recommended Combinations

| Scenario | Labels to Apply |
|----------|----------------|
| New client library feature | `architecture-review-needed`, `test-review-needed`, `docs-review-needed` |
| Dependency update | `dependency-review-needed`, `security-review-needed` |
| Management SDK changes | `mgmt-review-needed` |
| Performance-sensitive change | `performance-review-needed`, `test-review-needed` |
| Full review | `architecture-review-needed`, `performance-review-needed`, `dependency-review-needed`, `docs-review-needed`, `security-review-needed`, `test-review-needed` |

## Using Agents Locally in VS Code

The same agents are available as **custom agents** in VS Code Copilot Chat
(via Copilot CLI). Their definitions live in `.github/agents/*.agent.md`.

### Prerequisites

- [VS Code](https://code.visualstudio.com/) with the
  [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)
  and [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat)
  extensions installed.
- The repository must be open as a workspace in VS Code.

### Invoking an Agent

In the Copilot Chat panel, use the `@` prefix to summon an agent by name:

```
@archie Review the changes in this branch for API design issues
```

```
@sentinel Check the staged changes for security vulnerabilities
```

```
@tester Are there any untested public methods in sdk/storage/storage-blob/src/BlobClient.ts?
```

```
@dexter Review the dependency changes in sdk/keyvault/keyvault-keys/package.json
```

```
@scribe Check that the README and CHANGELOG are consistent with the code changes
```

```
@dash Look for performance regressions in the current diff
```

```
@mgmt-review Review this management SDK PR for API design guideline compliance
```

### Available Agent Names

| Chat command | Agent |
|--------------|-------|
| `@archie` | Architecture / API design review |
| `@dash` | Performance review |
| `@dexter` | Dependency review |
| `@mgmt-review` | Management SDK review |
| `@mgmt-breaking-change-analysis` | ARM SDK breaking change analysis (on-demand) |
| `@scribe` | Documentation review |
| `@sentinel` | Security review |
| `@tester` | Test coverage and quality review |

### Tips

- Agents have access to file reading, code search, and bash tools — they can
  explore the codebase to answer questions.
- You can ask an agent to review specific files, a git diff, or the entire
  branch.
- Agents follow the detailed guidance and references in `.github/prompts/`.
- Agents respect the same scoping rules as in CI: they ignore `src/generated/`,
  `snippets.spec.ts`, formatting issues, and domains outside their expertise.

## Agent Configuration

Agent definitions and their detailed review guidelines are stored in:

```
.github/
├── agents/                          # Agent identity and checklist
│   ├── archie.agent.md
│   ├── dash.agent.md
│   ├── dexter.agent.md
│   ├── mgmt-breaking-change-analysis.agent.md
│   ├── mgmt-review.agent.md
│   ├── scribe.agent.md
│   ├── sentinel.agent.md
│   └── tester.agent.md
├── prompts/                         # Detailed review and analysis guidance
│   ├── architecture-review-guidelines.md
│   ├── performance-review-guidelines.md
│   ├── dependency-review-guidelines.md
│   ├── mgmt-breaking-change-analysis-guidelines.md
│   ├── mgmt-breaking-change-patterns.md
│   ├── mgmt-review-guidelines.md
│   ├── documentation-review-guidelines.md
│   ├── security-review-guidelines.md
│   └── test-review-guidelines.md
└── workflows/                       # CI workflow triggers
    ├── pr-review-intake.yml          # Unprivileged PR review signal
    ├── pr-review-router.yml          # Trusted label-to-reviewer dispatcher
    ├── archie.md / archie.lock.yml
    ├── dash.md / dash.lock.yml
    ├── dexter.md / dexter.lock.yml
    ├── mgmt-review.md / mgmt-review.lock.yml
    ├── scribe.md / scribe.lock.yml
    ├── sentinel.md / sentinel.lock.yml
    └── tester.md / tester.lock.yml
```

- **`.github/agents/*.agent.md`** — Defines the agent persona, checklist, scope,
  and output format. Used by both VS Code Copilot Chat and CI workflows.
- **`.github/prompts/*.md`** — Comprehensive review and analysis guidance plus
  supporting references used by agents. Edit these to update review criteria or
  analysis behavior.
- **`.github/workflows/*.md`** — Agentic Workflow source files that define the
  CI trigger, permissions, and tools. Compiled to `.lock.yml` via
  `gh aw compile`.
- **`eng/tools/pr-review/review-request.cjs`** — Shared deterministic routing and
  request validation for all seven label-triggered reviewers. Its tests run
  locally with `node --test eng/tools/pr-review/review-request.test.cjs`.
- **`eng/tools/pr-review/ci.yml`** — Tool-owned Azure Pipelines definition for
  the routing tests, following the dev-tool CI pattern. Branch and PR triggers
  are path-filtered to the routing tools and reviewer workflows, rather than
  running in every SDK package's Analyze job. Register a pipeline against this
  YAML file in Azure DevOps to enable automatic runs.

To modify an agent's behavior, edit the corresponding `.agent.md` and/or
guidelines file. For CI trigger changes, edit the workflow `.md` file and
recompile with:

```bash
gh aw compile <agent-name>
```
