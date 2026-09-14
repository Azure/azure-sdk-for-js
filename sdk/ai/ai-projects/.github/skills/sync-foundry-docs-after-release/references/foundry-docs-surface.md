# Foundry JavaScript docs surface

Starting map only. Search `azure-ai-docs-pr` on every run because ownership and
includes move.

## Active 2.x version references

- `articles/foundry/how-to/develop/sdk-overview.md`
- `articles/foundry/agents/concepts/runtime-components.md`
- `articles/foundry/agents/how-to/memory-usage.md`
- `articles/foundry/agents/how-to/migrate.md`
- `articles/foundry/agents/how-to/tools/work-iq.md`

- `articles/foundry/includes/quickstart-v2-install.md`
- `articles/foundry/includes/how-to-develop-sdk-overview-2.md`

The second include is consumed by both active docs and
`articles/foundry-classic/how-to/develop/sdk-overview.md`. Do not add 2.x-only
content to it. Search all include callers before editing either include.

## Classic boundary

Classic docs intentionally retain SDK `1.0.1`; a 2.x release does not update
them.

## Common unpinned install sites

- `articles/foundry/agents/how-to/use-routines.md`
- `articles/foundry/agents/how-to/tools/ai-search.md`
- `articles/foundry/agents/how-to/tools/azure-functions.md`
- `articles/foundry/agents/how-to/tools/image-generation.md`
- `articles/foundry/agents/how-to/tools/sharepoint.md`
- `articles/foundry/agents/how-to/tools/toolbox.md`

Keep these installs unpinned. Preserve accurate "latest" wording in
`file-search.md`, `function-calling.md`, and `web-overview.md`.

## Snippet forms

1. Inline fenced blocks in an article.
2. JavaScript/TypeScript tabs in a Microsoft Learn tab group.
3. Shared Markdown files referenced with `[!INCLUDE]`.
4. External files referenced with `:::code source="..."`.

Edit include sources, after checking all callers. Resolve `:::code` to its
owning repository; the current root is `~/foundry-samples-main/...`. If source
is unavailable, report a follow-up instead of copying code into the article.

## High-yield snippet areas

- `articles/foundry/agents/concepts/runtime-components.md`
- `articles/foundry/agents/how-to/memory-usage.md`
- `articles/foundry/agents/how-to/migrate.md`
- `articles/foundry/agents/how-to/structured-inputs.md`
- `articles/foundry/agents/how-to/use-routines.md`
- `articles/foundry/agents/how-to/tools/`
- `articles/foundry/how-to/develop/sdk-overview.md`

Search changed API symbols across all `articles/foundry/**`, not only this list.
Do not confuse npm versions with REST/API, model, toolbox URL, Node, metadata,
or other-language versions.
