# Docs checkout and fork sync

Remote names are roles, not assumptions. Accept either the canonical repository
or a verified GitHub fork of `MicrosoftDocs/azure-ai-docs-pr`.

## Inspect the checkout

Require clean SDK and docs trees. Read each remote URL without printing
credentials. Accept GitHub HTTPS, SCP-style SSH, or `ssh://` URLs only when they
end in `<owner>/azure-ai-docs-pr(.git)`. Derive each `owner/repo` slug.

The canonical remote is the remote whose slug is exactly
`MicrosoftDocs/azure-ai-docs-pr`. Verify every fork candidate with:

```powershell
gh api "repos/$forkSlug" --jq `
  '{full_name, fork, parent: .parent.full_name, default_branch}'
```

Require `fork: true`, parent `MicrosoftDocs/azure-ai-docs-pr`, and default
branch `main`. Also require canonical default branch `main`. If `origin` is not
canonical, it must pass this fork check. Stop on ambiguous multiple forks.

Record `$canonicalRemote`, optional `$forkRemote`, and `$forkSlug`. Common valid
layouts are:

- `origin` = canonical and `fork` = verified fork.
- `origin` = verified fork and `upstream` = canonical.

If `origin` is a verified fork and no canonical remote exists, defer setup until
the preparation phase. If a remote named `upstream` already points elsewhere,
stop instead of replacing it.

## Prepare after release verification

If needed, add the canonical remote, then fetch canonical `main`:

```powershell
git -C $docsRepo remote add upstream `
  https://github.com/MicrosoftDocs/azure-ai-docs-pr.git
$canonicalRemote = 'upstream'
git -C $docsRepo fetch $canonicalRemote main
```

Run `remote add` only when no canonical remote exists. If a verified fork is
configured, synchronize its remote `main` on GitHub:

```powershell
gh repo sync $forkSlug `
  --source MicrosoftDocs/azure-ai-docs-pr `
  --branch main
```

Never add `--force`. If fast-forward synchronization fails because the fork
diverged, stop for human resolution. After success:

```powershell
git -C $docsRepo fetch $canonicalRemote main
git -C $docsRepo fetch $forkRemote main
$canonicalSha = git -C $docsRepo rev-parse `
  "refs/remotes/$canonicalRemote/main"
$forkSha = git -C $docsRepo rev-parse "refs/remotes/$forkRemote/main"
if ($canonicalSha -ne $forkSha) { throw 'Fork main did not synchronize.' }
```

Create the work branch from canonical `main`:

```powershell
git -C $docsRepo switch --create "docs/ai-projects-$version" `
  "refs/remotes/$canonicalRemote/main"
```

For an existing work branch, require canonical `main` to be its ancestor and
inspect `git diff --name-only "$canonicalRemote/main...HEAD"`; stop on unrelated
work.
