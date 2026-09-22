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
