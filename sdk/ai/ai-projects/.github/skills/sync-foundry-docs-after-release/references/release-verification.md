# Release verification

Run from `azure-sdk-for-js`. Fetch tags, then resolve npm `latest`:

```powershell
git fetch origin --tags --prune
$latest = npm view '@azure/ai-projects@latest' version 2>&1
```

If npm exits nonzero or reports inability to reach npm/its registry (`EAI_AGAIN`,
`ENETUNREACH`, `ECONNRESET`, or `ETIMEDOUT`), retry only through:

```powershell
npm view '@azure/ai-projects@latest' version `
  --registry=https://packagefeedproxy.microsoft.io/npm/
```

Use the resolved version unless the user explicitly requests a historical
backfill. Otherwise stop when a supplied version differs from npm `latest`.
Require stable semver, then set:

```powershell
$releaseTag = "@azure/ai-projects_$version"
git rev-parse "refs/tags/$releaseTag"
git show "${releaseTag}:sdk/ai/ai-projects/package.json"
git show "${releaseTag}:sdk/ai/ai-projects/CHANGELOG.md"
npm view "@azure/ai-projects@$version" version
```

Apply the same proxy fallback to the exact npm lookup. Require:

- Exact npm result, tagged `package.json` version, and target version match.
- Tagged changelog has exactly one `## <version> (YYYY-MM-DD)` entry and no
  `(Unreleased)` entry for that version.
- The current branch may differ only because development moved on; all evidence
  for this workflow must then come from `$releaseTag`.

Package metadata or a Git tag without npm publication is not a release.
