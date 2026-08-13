# `_shared/` — library, not a skill

Pure-TypeScript helpers used by the authoring skill scripts under
`.github/skills/cu-sdk-author-analyzer*/`.

The leading underscore marks this as a **library directory**, not a skill. It
is intentionally excluded from the Copilot skill picker.

Rules for `schemaValidator.ts` (the validator):

- **No `@azure/*` imports.** No network calls. No I/O beyond reading /
  parsing caller-provided JSON.
- **No new runtime dependencies.** Native Node `fs` only.
- **Stable, small, well-tested.** Anything here is referenced by multiple skill
  scripts; breakage cascades.

The CLI command modules (`extractLayoutCommand.ts`, `createAndTestCommand.ts`,
`createAndTestRouterCommand.ts`) wrap the `ContentUnderstandingClient` from
`@azure/ai-content-understanding`. They are allowed to import `@azure/*` since
they're the bridge between the validator and the service.

Current modules:

- [`schemaValidator.ts`](src/schemaValidator.ts) — validates analyzer schema
  JSON before any service call (catches `baseAnalyzerId` typos, missing
  `fieldSchema`, missing `contentCategories` analyzer routes, etc.). Pure
  TypeScript.
- [`cli.ts`](src/cli.ts) — subcommand dispatcher.
- [`clientHelpers.ts`](src/clientHelpers.ts) — client builder + raw-response
  capture policy + JS-SDK serializer translation (`items` →
  `itemDefinition`).
- [`extractLayoutCommand.ts`](src/extractLayoutCommand.ts) — Stage 1: extract
  document layout.
- [`createAndTestCommand.ts`](src/createAndTestCommand.ts) — Stage 2
  (single-type).
- [`createAndTestRouterCommand.ts`](src/createAndTestRouterCommand.ts) —
  Stage 2 (classify-and-route).

## Install

The tool is **intentionally NOT part of the pnpm workspace** — it's a
standalone CLI that lives outside the published source tree under
`.github/skills/_shared/`, so it has zero effect on the published
`@azure/ai-content-understanding` artifact.

To keep pnpm's repo-root `sdk/**` workspace glob from picking this directory
up (which would fail CI because the tool's deps aren't in the top-level
lockfile), the tracked file is `package.json.template` — the runtime
`package.json` is `.gitignore`d and generated locally on install:

```bash
(cd .github/skills/_shared && \
    [ -f package.json ] || cp package.json.template package.json && \
    npm install)
```

The tool depends on the published `@azure/ai-content-understanding` package
from npm, not the in-tree source, so contributors can iterate without first
running a repo-root build.

## Run

```bash
(cd .github/skills/_shared && \
    node_modules/.bin/tsx src/cli.ts extract-layout \
    --input <file-or-folder> --output <dir>)
```

Or, with the npm script wrapper:

```bash
(cd .github/skills/_shared && \
    npm run cli -- extract-layout \
    --input <file-or-folder> --output <dir>)
```

## Run tests

```bash
(cd .github/skills/_shared && npm test)
```
