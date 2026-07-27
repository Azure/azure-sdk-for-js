# @azure-tools/agent-evals

AI agent evaluation framework for the `azure-sdk-for-js` repo, built on
[Vally](https://microsoft.github.io/vally/).

## What this is for

Files like `AGENTS.md` and the skills under `.github/skills/` are effectively
**prompts** for any agent working in this repo — Copilot, CLI agents,
automation. We edit them constantly, and today we have no way to verify that
those edits help (or fail to break) agent behavior.

This package gives us **regression tests for agent behavior**. We pick
high-value rules (e.g. "optional parameter bags must extend `OperationOptions`")
and capture them as evals. When someone edits `AGENTS.md` or one of the
`.github/skills/*` files, running these evals tells us whether agents still
follow the rules.

> We deliberately **do not** author any vally-side skills here. The point of
> the framework is to detect regressions in the **existing** repo skills.
> `.vally.yaml` discovers `.github/skills/*` directly.

## The pipeline

```
stimulus  →  executor  →  trajectory  →  graders  →  score
```

- **Stimulus** — a prompt to send to the agent, plus environment setup.
- **Executor** — the Copilot SDK runs the agent and captures everything.
- **Trajectory** — the structured record of every tool call, message,
  and token-usage event.
- **Graders** — fast static checks (file matches, output checks), expensive
  LLM judges, or shell commands. All produce a normalized score + evidence.
- **Score** — weighted aggregate compared against a threshold.

See the [Vally docs](https://microsoft.github.io/vally/) for the full
model.

## Layout

```
eng/agent-evals/
├── package.json                 # workspace package — owns @microsoft/vally-cli
├── .vally.yaml                  # project config (paths, suites)
├── README.md                    # this file
├── evals/
│   ├── extend-operation-options/eval.yaml
│   ├── build-command-compliance/eval.yaml
│   ├── do-not-edit-generated/eval.yaml
│   ├── respect-snippets-spec/eval.yaml
│   └── consult-package-skill/eval.yaml
└── vally-results/               # trajectory output (gitignored)
```

## Eval inventory

Each eval below has been deliberately filtered through one question:
**could a linter, static analysis, or CI check catch this regression
better?** Evals are reserved for rules where the honest answer is "no"
(behavioral, prose-only, or where the static alternative is so heavy
it's impractical per-PR).

| Eval | Rule under test | Source doc | Why eval, not lint/CI |
|---|---|---|---|
| `extend-operation-options` | Options interfaces extend `OperationOptions` from a core package | `reviewer/sdk-source.instructions.md` | **Migration candidate.** `eslint-plugin-azure-sdk/ts-naming-options` already does naming; extending it to check the `extends` chain is straightforward. Kept here as a framework smoke test until that lint rule lands. |
| `build-command-compliance` | Build with `pnpm turbo build --filter=... --token 1` (not `npm run build`) | `AGENTS.md`, `sdk-workflow` skill | Pure agent **behavior** — tests what the agent says when asked. No code state to lint. |
| `do-not-edit-generated` | Never edit files under a package's `generated/` directory | `create-package-skill` § Security; `documentation/modular-customization.md` | The honest CI alternative — re-run TypeSpec generation and assert a clean tree — costs minutes per package per PR and needs spec source + emitter pinning. Cheap heuristics (filename globs, PR labels) all false-positive on legitimate regeneration. The eval sidesteps this by framing a `src/`-only stimulus. |
| `respect-snippets-spec` | `snippets.spec.ts` is documentation source, not a test file | `AGENTS.md` § Testing | The file on disk looks like a normal vitest spec. The rule is about agent **interpretation** when asked to refactor tests. Nothing structurally distinctive for a linter to match. |
| `consult-package-skill` | Always consult `find-package-skill` registry before modifying a package under `sdk/` | `find-package-skill` skill | Tests an agent **process step** (read file X before editing file Y). No code state changes; only a trajectory-aware test can verify the agent followed the routing guidance. |

### Adding a new eval — apply the same filter

Before authoring a new eval, ask:

1. **Could a linter enforce this?** If yes, write the lint rule
   instead — it runs faster, catches more cases, and integrates with
   existing CI. Add to `eslint-plugin-azure-sdk`.
2. **Could a CI check enforce this?** If yes and the check is cheap,
   prefer CI — it gates the actual regression at PR time rather than
   probabilistically.
3. **Only then write an eval** — and document in the eval's header
   comment which alternative was considered and why an eval was chosen.

This is what protects the eval suite from accumulating low-value tests
that duplicate other guardrails.

## Prerequisites

- Node ≥ 20, pnpm ≥ 10.33 (same as the rest of the repo).
- `pnpm install` at the repo root — `@microsoft/vally-cli` is a
  `devDependency` of this package, so it installs automatically with
  the rest of the workspace.
- Running an eval invokes the GitHub Copilot CLI; you need to be signed in
  there (`copilot` once interactively). LLM judge graders also need
  credentials for whatever model you configure.

## Commands

All commands run via pnpm filtering on this package:

```sh
# Lint every eval spec and every discovered SKILL.md. No agent runs.
pnpm --filter @azure-tools/agent-evals run lint

# Run the default 'smoke' suite end-to-end (currently one eval).
pnpm --filter @azure-tools/agent-evals run eval

# Run every eval the project knows about, regardless of suite.
pnpm --filter @azure-tools/agent-evals run eval:all
```

Trajectories land under `eng/agent-evals/vally-results/<timestamp>/`. They
are git-ignored. You can re-grade a saved trajectory without re-running the
agent with `vally grade --eval-spec <path> < results.jsonl` — useful when
iterating on graders.

## Adding a new eval

1. Create a new directory under `evals/` (kebab-case).
2. Author an `eval.yaml`. Reference the existing
   `evals/extend-operation-options/eval.yaml` as a worked example.
3. The new eval is picked up automatically by the `smoke` suite via the
   glob `evals/**/*.yaml`.
4. Run `pnpm --filter @azure-tools/agent-evals run lint` to validate the
   spec. Fix any schema errors before running the agent.
5. Run `pnpm --filter @azure-tools/agent-evals run eval` to actually
   exercise it.

## Environment strategies

How an eval gets the repo content into the agent's workspace. Pick based
on what the eval needs the agent to do.

### Strategy A: Whole-repo worktree (recommended default)

```yaml
environment:
  git:
    type: worktree
    ref: HEAD
    source: ../../../..
```

- Agent sees every tracked file: `AGENTS.md`, all `.github/skills/*`,
  every `sdk/*` package, all documentation.
- New skills added under `.github/skills/` are automatically in scope —
  no eval changes needed.
- No `node_modules/` (it's gitignored, so `git worktree add` doesn't
  materialize it) — which means no symlink loops, no OOM, fast grading.
- Agent **cannot build or test** (no `node_modules`).
- Works with any grader (file-matches/contains/exists, run-command,
  output-*, prompt, etc.).

Used by all current evals.

### Strategy B: Worktree + install + non-globbing graders

When the eval needs the agent to build / test / actually exercise
runtime behavior:

```yaml
environment:
  git:
    type: worktree
    ref: HEAD
    source: ../../../..
  commands:
    - pnpm install --filter @azure/template...
```

Constraint: `pnpm install` creates absolute-path workspace symlinks in
`node_modules/`. Vally's globbing graders use `readdir(workspace,
{ recursive: true })` which follows those symlinks, hangs the eval, and
eventually OOMs. So **with this strategy, do not use globbing graders**.
Stick to:

| Grader | Globs workspace? |
|---|---|
| `file-exists`, `file-contains`, `file-matches` | ❌ avoid |
| `run-command` | ✅ safe |
| `output-contains`, `output-matches` | ✅ safe |
| `tool-calls`, `skill-invocation` | ✅ safe |
| `completed`, `token-budget`, `turn-count`, `tool-call-count`, `wall-time`, `error-count` | ✅ safe |
| `prompt`, `pairwise` (LLM judges) | ✅ safe |

For file-content assertions, shell out via `run-command`:

```yaml
- type: run-command
  config:
    command: 'grep -rqE "extends\s+OperationOptions" sdk/template/template/src/'
    expected_exit_code: 0
```

(`grep -r` does not follow symlinks by default, so it short-circuits
cleanly.)

For build/test:

```yaml
- type: run-command
  config:
    command: "pnpm turbo build --filter=@azure/template... --token 1"
    expected_exit_code: 0
    timeout: 5m
```

### Strategy C: Clone from a remote URL (not first-class)

Vally has no built-in clone-from-URL. If you need to eval against an
upstream commit not in your local repo, do it via `commands:`:

```yaml
environment:
  commands:
    - git clone --depth 1 https://github.com/Azure/azure-sdk-for-js .
    - pnpm install --filter @azure/template...
```

Tradeoffs: needs network + auth, slower than a local worktree, and you're
back in Strategy B territory for grader choices.

## Known gotchas

These bit us during initial setup; preserved so you don't hit them again.

- **`environment.skills` entries are directory paths**, not paths to
  `SKILL.md`. They are resolved **relative to the eval.yaml file**, not the
  project root.
- **`environment.git.source` and `environment.files[].src` are also
  relative to eval.yaml.** Evals live four levels below the repo root,
  so `../../../..`.
- **`environment.files` with a package directory will OOM grading.**
  Azure SDK packages have `node_modules/` populated by pnpm with
  absolute-path workspace symlinks pointing back into the source tree
  (e.g. `node_modules/@azure/logger → /home/.../sdk/core/logger`).
  Vally's globbing graders follow those into the entire repo and loop
  indefinitely. Use Strategy A (git worktree, no node_modules) instead,
  or explicitly list subdirectories that exclude `node_modules/`.
- **Agents may spontaneously run `pnpm install` to verify their work.**
  Even with a `git worktree` environment (no pre-installed
  node_modules), a well-behaved agent may decide to run
  `pnpm install --frozen-lockfile && pnpm turbo build ...` to verify
  the edit compiles. This populates `node_modules/` with pnpm
  symlinks mid-run, and grading then hangs for the same reason as the
  bullet above. For file-edit evals using globbing graders, explicitly
  tell the agent NOT to run pnpm install / build / test in the
  stimulus. Long-term fix is upstream in vally — `globFiles` should
  set `followSymbolicLinks: false`.
- **Model names are case-sensitive** and must match what the Copilot
  CLI's model registry knows. `claude-sonnet-4.5` is verified working.
  `GPT-5.5` (uppercase) fails; use `gpt-5.5`. The default model id for
  `judge_model` upstream is `claude-sonnet-4.6` if you don't override.
- **`config.model` may be ignored.** The Copilot SDK executor appears
  to use the account's currently-selected Copilot model regardless of
  what's in `eval.yaml`. Worth raising with the vally team if model
  pinning matters for your eval.
- **Grader config keys are strict.** `prompt` graders use `prompt:`, not
  `rubric:`. `file-contains` uses `value:`, not `substring:`. `file-matches`
  uses `path:` (it's already a glob), not `path_glob:`. `run-command` uses
  `expected_exit_code:`. `tool-calls` argument matcher uses `command:`.
  `vally lint` will catch all of these.
- **`vally lint` does not auto-discover from `.vally.yaml`.** Skill and
  eval-spec paths have to be passed positionally / via `-e`. The
  `lint` npm script in this package's `package.json` does the right thing.
- **Agent runs are slow and expensive.** Each eval invokes the Copilot
  CLI in a fresh workspace. Expect ~1–2 minutes wall time and tens to
  hundreds of thousands of tokens per stimulus (mostly cache reads).
- **Inspecting trajectories live.** Pass `--keep-executor-session-logs`
  to `vally eval` and the raw Copilot session `events.jsonl` lands under
  `vally-results/<timestamp>/executor-session-logs/.../trial-0/attempt-0/`.
  Independently of vally, Copilot CLI also writes a live event log at
  `~/.copilot/session-state/<session-id>/events.jsonl` while a session
  is running — useful for tailing in real time.
- **Stale git worktrees.** Vally calls `git worktree remove --force` on
  cleanup, but a crashed run can leave stale entries in
  `git worktree list`. Run `git worktree prune` at the repo root to
  clean them up.
- **Do not pass `--workspace <path>` to `vally eval`.** Without the
  flag, vally creates an isolated `/tmp/vally-eval-XXXXXX` worktree
  per stimulus and cleans up after itself. With it, the worktree lands
  at `<path>/<stimulus-name>/` (a real ~700MB directory next to your
  eval YAMLs) and isn't auto-cleaned. The `pnpm` scripts in this
  package's `package.json` already omit the flag — only worry about
  this if you invoke `vally eval` directly.
- **`COPILOT_CUSTOM_INSTRUCTIONS_DIRS` leaks into eval runs.** The
  vally Copilot executor inherits this env var from the parent shell,
  so any personal global AGENTS.md you have configured (e.g. under
  `~/.config/opencode/`) is loaded into every eval session. For most
  evals this is harmless, but it matters if you're doing a no-prose
  baseline run: `unset COPILOT_CUSTOM_INSTRUCTIONS_DIRS` (or any
  equivalent like `COPILOT_INSTRUCTIONS_FILE`) in the eval shell to
  measure the true "no guidance" agent behavior. The repo's tracked
  AGENTS.md / `.github/skills/*` are picked up from the worktree, not
  from env vars, so this only affects per-user state.
