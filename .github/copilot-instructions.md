# Repository guidance has moved

Agent-facing guidance for this repository now lives in
[`AGENTS.md`](../AGENTS.md) at the repository root. It acts as a
**resolver**: each topic points at its canonical home (skills under
`.github/skills/`, reviewer instructions under
`.github/instructions/reviewer/`, and deep-dive docs under
`documentation/`) so the same rule isn't duplicated across files.

Start there. This file is intentionally kept as a lightweight redirect
so tooling and pipelines that reference `.github/copilot-instructions.md`
by path continue to resolve during the transition.


<!-- github-knowledge-base-start -->
## Knowledge Base

### Purpose

This repository uses the Knowledge Base at [https://github.com/Azure/azure-sdk-for-js](https://github.com/Azure/azure-sdk-for-js) on branch `main`.

### Required behavior

1. Before changing code, read `docs/index.md` from that branch.
2. Use the index to open only the knowledge files relevant to the task.
3. If the index is unavailable, stop and report that the Knowledge Base could not be loaded.

### Source of truth

Generated knowledge tracks the code. When the knowledge and code disagree, trust the code.
<!-- github-knowledge-base-end -->
