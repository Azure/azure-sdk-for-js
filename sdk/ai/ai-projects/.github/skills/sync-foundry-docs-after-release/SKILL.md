---
name: sync-foundry-docs-after-release
description: "Sync Microsoft Foundry JavaScript/TypeScript documentation after an @azure/ai-projects release. Use when a stable package version has shipped and azure-ai-docs-pr needs its SDK version guidance, inline JavaScript snippets, TypeScript snippets, includes, or external sample references audited against the released API. Verifies the release tag and npm publication, derives API changes from the release diff, updates only affected Foundry docs, and validates snippets before handoff. Do not use for unreleased builds or Foundry classic 1.x docs."
argument-hint: "[docs repo path] [released version]"
---

# Sync Foundry docs after an ai-projects release

Audit Microsoft Foundry docs against a released `@azure/ai-projects` package,
sync explicit 2.x version guidance, and update affected JS/TS examples from SDK
source. This workflow edits `azure-ai-docs-pr`, not SDK source or samples.

## When to use

- A stable `@azure/ai-projects` version has been published.
- Foundry articles still name an older 2.x JavaScript library version.
- A release added, removed, renamed, or reshaped APIs used by Foundry JS/TS
  examples.
- A post-release docs PR is needed in `azure-ai-docs-pr`.

Do not use this skill to document an unreleased package, update other language
tabs opportunistically, or migrate Foundry classic content from SDK 1.x.

## Inputs

| Name       | Default                                                                | Description                                       |
| ---------- | ---------------------------------------------------------------------- | ------------------------------------------------- |
| `sdkRepo`  | Current `azure-sdk-for-js` root                                        | Repository containing `sdk/ai/ai-projects`.       |
| `docsRepo` | Explicit argument, `AZURE_AI_DOCS_PR`, then `~/repos/azure-ai-docs-pr` | Clean canonical checkout or verified GitHub fork. |
| `version`  | npm `latest` dist-tag                                                  | Stable published version to document.             |

Use [references/foundry-docs-surface.md](./references/foundry-docs-surface.md)
as the maintained starting map. Always run a fresh search because docs move and
new articles can acquire package references between releases.

## Safety rails

- Stop if either repository has unrelated changes. Never stash, discard, or
  overwrite another contributor's work.
- Stop if the target version, npm publication, release tag, tagged package
  metadata, and tagged dated changelog entry do not all identify the same
  stable version. The current branch can already contain the next unreleased
  version; in that case, use only the released tag snapshot as SDK evidence.
- Work from a dedicated docs branch based on the latest canonical
  `MicrosoftDocs/azure-ai-docs-pr` `main`. Remote names are not fixed.
- Read the docs repository's `.github/AGENTS.md`,
  `.github/copilot-instructions.md`, and applicable nested instructions before
  editing.
- Do not edit `articles/foundry-classic/**` or its `1.0.1` references for a 2.x
  release.
- Do not bulk-replace version numbers. API versions, model versions, Java/.NET
  package versions, Node versions, and REST dates are different domains.
- Do not edit SDK files under `generated/` or published `samples/`. For JS
  evidence, use `src/`, `review/ai-projects-node.api.md`, `README.md`,
  `test/snippets.spec.ts`, and `samples-dev/`.
- Do not invent examples. Every changed call, option, model, and return shape
  must be supported by the released API report and an SDK source/sample anchor.
- Treat the docs snippet harness's `--dry-run` as syntax validation only. Prove
  SDK API compatibility separately against the exact released package.
- Do not run live docs snippets or create Azure resources without explicit user
  approval. Static and compile-only validation comes first.
- Do not stage, commit, push work, or open a docs PR unless the user requests
  it. The only preauthorized remote mutation is a non-force synchronization of
  a verified fork's `main` from canonical `main` during checkout preparation.

## Procedure

Run SDK commands from the `azure-sdk-for-js` root and docs commands from the
`azure-ai-docs-pr` root.

### 1. Resolve and inspect the docs checkout

Resolve `docsRepo` in this order:

1. The path supplied by the user.
2. `$env:AZURE_AI_DOCS_PR`.
3. `Join-Path $HOME 'repos/azure-ai-docs-pr'`.

Follow the inspection phase in
[docs checkout and fork sync](./references/docs-checkout.md). Accept either:

- A canonical checkout, where any remote points to
  `MicrosoftDocs/azure-ai-docs-pr`.
- A checkout whose `origin` is verified through GitHub metadata as a fork of
  `MicrosoftDocs/azure-ai-docs-pr`.

Record the canonical remote and optional fork remote by repository identity,
not by assuming names such as `origin`, `upstream`, or `fork`. Also record the
current branch, upstream, and both repository statuses:

```powershell
git -C $docsRepo remote
git -C $docsRepo branch --show-current
git -C $docsRepo status --short
git -C $sdkRepo status --short
```

Before editing, read:

- `.github/AGENTS.md`
- `.github/copilot-instructions.md`
- Applicable files under `.github/instructions/`
- `.github/skills/test-code-snippets/SKILL.md`
- `.github/skills/learn-tabs/references/validation-checks.md`

Preserve monikers, tab order, Markdown includes, `<!-- preserve -->` sections,
and any generated-content boundaries those instructions identify.

Do not switch or create a branch yet. Prove the release and build its API change
ledger first, without changing either working tree.

### 2. Prove that the SDK version is released

Follow [release verification](./references/release-verification.md). Require a
stable npm `latest` version, matching exact npm publication, local release tag,
tagged package version, and one dated tagged changelog entry. A package version
or Git tag alone is not proof of publication.

If the current SDK branch has moved to the next version, continue from the
released tag snapshot. Never substitute newer unreleased APIs into this docs
change.

### 3. Build the release change ledger

Follow [release diff and evidence](./references/release-diff.md) to resolve the
immediate stable predecessor and compare tagged package metadata, API report,
source, README, snippets, and samples. Record any Node engine change.

Create a short ledger before touching docs:

- Added public operations, models, options, enum/union values, and properties.
- Removed or renamed public symbols and their replacements.
- Signature, requiredness, return-shape, paging, polling, and behavior changes.
- New or updated SDK samples that demonstrate each customer-facing change.
- Release changes that do not affect documentation snippets.

Use this authority order when sources disagree. Read each source from
`$releaseTag`, not from the current branch:

1. Released `review/ai-projects-node.api.md` and exported `src/` declarations.
2. Released `test/snippets.spec.ts`, `samples-dev/`, and README snippets.
3. The dated changelog entry for intent and customer impact.

### 4. Synchronize the fork and create the docs branch

After release proof and ledger creation succeed, follow the preparation phase in
[docs checkout and fork sync](./references/docs-checkout.md).

If a verified fork exists, initiate `gh repo sync` for its `main` from
`MicrosoftDocs/azure-ai-docs-pr` `main`, without `--force`, then fetch and
require the fork and canonical remote-tracking refs to match. This covers both
common layouts: `origin=canonical, fork=fork` and
`origin=fork, upstream=canonical`.

Create `docs/ai-projects-<version>` explicitly from canonical `main`, never
from the currently checked-out feature branch. If the branch already exists,
do not reset or recreate it; require it to contain the latest canonical `main`
and no unrelated changes.

### 5. Inventory affected Foundry documentation

Search the current docs tree instead of relying only on the reference map:

````powershell
git -C $docsRepo grep -n -E `
  '@azure/ai-projects|Azure AI Projects client library' -- `
  articles/foundry articles/foundry-classic
git -C $docsRepo grep -n -E '\b[0-9]+\.[0-9]+\.[0-9]+( or later)?\b' -- `
  articles/foundry
git -C $docsRepo grep -n -E '```(javascript|typescript|js|ts)|:::code' -- `
  articles/foundry
````

For every removed, renamed, or materially changed API in the ledger, search its
old and new symbol names under `articles/foundry/**`. Include shared Markdown
includes and the source of every `:::code` directive.

Before editing a shared include, find every caller by searching for its file
name across both `articles/foundry/**` and `articles/foundry-classic/**`. If a
classic article consumes it, do not put 2.x-only prose or code in that include;
update the active caller or split the include according to docs-repo patterns.

Classify each match before editing:

| Match                                                                                | Action                                                                      |
| ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| Exact active 2.x SDK version in prose or a version matrix                            | Update to the released version.                                             |
| Minimum-version statement tied to a feature                                          | Update only when that feature first appears in this release.                |
| Unpinned `npm install @azure/ai-projects`                                            | Keep unpinned; verify it installs the current stable package.               |
| "latest" or "current version" guidance                                               | Keep unless it is technically false; do not replace reflexively with a pin. |
| Foundry classic `1.0.1` guidance                                                     | Leave unchanged.                                                            |
| REST `api-version`, model version, Node version, or another language package version | Leave unchanged unless independently required by the release.               |

### 6. Synchronize version guidance

Update explicit active 2.x references from the prior SDK version to the released
version. Keep installation commands unpinned unless the article deliberately
teaches side-by-side version selection. In particular:

- Update current-version matrices and sentences such as
  `Use Node.js 22 or later with @azure/ai-projects <version>`.
- Update `<version> or later` only when it describes the general current SDK or
  a feature introduced by the release.
- Do not change the Node requirement unless `package.json.engines.node` changed.
- Update `ms.date` to the edit date in every modified published article/include.
- Add `ai-usage: ai-assisted` to modified files under `articles/**` when it is
  absent and AI meaningfully contributed, as required by docs-repo guidance.

### 7. Update JavaScript and TypeScript snippets

Audit every JS/TS snippet that uses an API in the release ledger. Cover:

- Inline `javascript`, `typescript`, `js`, and `ts` fenced blocks.
- JavaScript/TypeScript tabs inside Microsoft Learn tab groups or zone pivots.
- Shared `[!INCLUDE]` files; edit the include source rather than every caller.
- `:::code` directives; resolve and update the owning external sample instead
  of copying it into the article.

For each affected example:

1. Start from the nearest released SDK sample or snippet source.
2. Match released method names, argument order, options-bag properties, model
   discriminators, async/paging/poller usage, and return shape.
3. Keep `DefaultAzureCredential`, environment variables, placeholders, and
   cleanup behavior consistent with docs-repo rules.
4. Update nearby prose and expected output when the observable behavior changed.
5. Preserve the surrounding language tabs exactly. Do not rewrite Python,
   .NET, Java, or REST examples merely to mirror JavaScript.

If an external `:::code` source checkout is missing or the new API cannot be
compiled or behavior-tested, stop that snippet update and report the owning
repository/path as a follow-up. Do not publish an unverified approximation.

### 8. Validate the docs change

First rerun searches for the prior version and every removed API symbol. Review
each remaining hit and explain why it is intentionally retained.

From `azure-ai-docs-pr`, validate the snippet environment and each changed
article or include:

```powershell
python .github/skills/test-code-snippets/scripts/test_snippets.py --check-env
python .github/skills/test-code-snippets/scripts/test_snippets.py `
  --doc <changed-article-or-include.md> --dry-run
```

`--dry-run` does not prove SDK API compatibility. Follow
[snippet validation](./references/snippet-validation.md). For each complete
changed JS/TS block, copy it unchanged to a scratch file outside both
repositories and run the exact-version checker:

```powershell
$snippetTester = Join-Path $packageDir `
  '.github/skills/sync-foundry-docs-after-release/scripts/test-released-snippet.ps1'
& $snippetTester -SnippetPath <scratch-snippet.ts> -Version $version
```

Then run the docs repository's tab-count, tab-ID-order, and stray-tab-anchor
checks from `.github/skills/learn-tabs/references/validation-checks.md` against
the changed files. Inspect VS Code Markdown diagnostics for broken links and
metadata errors.

Do not run the generic harness in non-dry mode across a mixed-language article
without understanding its scope. `--live --confirm` requires explicit user
approval because it can call Azure and create billable resources.

Finally verify:

- Every modified file belongs to the intended Foundry JS docs surface.
- No `articles/foundry-classic/**` file changed.
- No protected section or unrelated language tab changed.
- No shared include introduced 2.x-only content into a classic caller.
- Every explicit current 2.x reference equals the released version.
- Every changed API call exists in the released API report.
- `git diff --check` passes in `azure-ai-docs-pr`.

## Handoff

Leave a focused working-tree diff in `azure-ai-docs-pr` and report:

- Released and previous SDK versions/tags.
- Version-reference files updated and intentionally retained matches.
- JS/TS snippets updated, with their SDK source anchors.
- External snippet follow-ups or validation gaps.
- Exact validation commands and outcomes.

If the user asks to publish, create a dedicated docs commit and preview pull
request in `MicrosoftDocs/azure-ai-docs-pr` following that repository's branch,
AI-disclosure, and Open Publishing requirements. For a fork checkout, push the
work branch to the verified fork remote and target canonical `main`. Never
force-push.
