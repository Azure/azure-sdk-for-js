# Release diff and evidence

Resolve stable tags in semantic-version order after fetching tags:

```powershell
$stableTags = @(git tag --list '@azure/ai-projects_*' --sort=-v:refname |
  Where-Object { $_ -match '^@azure/ai-projects_\d+\.\d+\.\d+$' })
$targetIndex = [Array]::IndexOf($stableTags, $releaseTag)
```

For npm `latest`, require `$targetIndex -eq 0`. The immediate predecessor is
`$stableTags[$targetIndex + 1]`; stop if either index is unavailable. Compare:

```powershell
git diff "$previousTag..$releaseTag" -- `
  sdk/ai/ai-projects/package.json `
  sdk/ai/ai-projects/CHANGELOG.md `
  sdk/ai/ai-projects/review/ai-projects-node.api.md `
  sdk/ai/ai-projects/README.md `
  sdk/ai/ai-projects/src `
  sdk/ai/ai-projects/test/snippets.spec.ts `
  sdk/ai/ai-projects/samples-dev
```

Compare tagged `package.json.engines.node` values separately. Build a ledger of
added/removed/renamed APIs; signatures and requiredness; options, unions, and
return shapes; paging/polling behavior; and new authoritative samples.

Evidence priority, always read from `$releaseTag`:

1. API report and exported `src/` declarations.
2. `test/snippets.spec.ts`, `samples-dev/`, and README snippets.
3. Dated changelog entry for intent.

Mark release changes that require no docs update. Never use newer current-branch
source as evidence for the released API.
