# Reviewer Agents

This repository includes seven specialized AI reviewer agents that can review
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

## Using Agents on Pull Requests

### Triggering a Review

On GitHub, only repository collaborators with at least **triage** or **write**
access can add labels to pull requests. When one of these collaborators adds
the corresponding **label** to a pull request, the agent runs automatically
via a `pull_request_target` workflow.

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
| `@scribe` | Documentation review |
| `@sentinel` | Security review |
| `@tester` | Test coverage and quality review |

### Tips

- Agents have access to file reading, code search, and bash tools — they can
  explore the codebase to answer questions.
- You can ask an agent to review specific files, a git diff, or the entire
  branch.
- Agents follow the detailed guidelines in `.github/prompts/*-review-guidelines.md`.
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
│   ├── mgmt-review.agent.md
│   ├── scribe.agent.md
│   ├── sentinel.agent.md
│   └── tester.agent.md
├── prompts/                         # Detailed review guidelines
│   ├── architecture-review-guidelines.md
│   ├── performance-review-guidelines.md
│   ├── dependency-review-guidelines.md
│   ├── mgmt-review-guidelines.md
│   ├── documentation-review-guidelines.md
│   ├── security-review-guidelines.md
│   └── test-review-guidelines.md
└── workflows/                       # CI workflow triggers
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
- **`.github/prompts/*-review-guidelines.md`** — Comprehensive review guidelines
  referenced by each agent. Edit these to update review criteria.
- **`.github/workflows/*.md`** — Agentic Workflow source files that define the
  CI trigger (label), permissions, and tools. Compiled to `.lock.yml` via
  `gh aw compile`.

To modify an agent's behavior, edit the corresponding `.agent.md` and/or
guidelines file. For CI trigger changes, edit the workflow `.md` file and
recompile with:

```bash
gh aw compile <agent-name>
```
