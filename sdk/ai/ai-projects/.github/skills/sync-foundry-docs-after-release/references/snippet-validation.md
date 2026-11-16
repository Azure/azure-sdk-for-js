# JavaScript and TypeScript snippet validation

The docs harness `--dry-run` checks syntax but does not install the target SDK.
Use it first, then prove API compatibility against the exact release.

For each complete changed JS/TS block:

1. Copy the block unchanged to a scratch `.js` or `.ts` file outside both
   repositories.
2. Run
   [`test-released-snippet.ps1`](../scripts/test-released-snippet.ps1) with the
   scratch path and released version.
3. Record the result and delete the scratch source.

The checker requires Node 22+, pins `@azure/ai-projects` exactly, installs in an
isolated temporary project through
`https://packagefeedproxy.microsoft.io/npm/`, compiles with TypeScript, and
removes the project unless `-KeepTemp` is set.

For a partial block, create a minimal scratch harness that supplies only omitted
declarations while retaining published statements unchanged. Keep that harness
with the validation report. For snippets with relative files or a larger sample
project, run the owning project's compile check with the SDK pinned exactly.
Stop and report a gap when the source or dependencies are unavailable.

Do not treat compilation as behavioral proof. Run live snippets only with
explicit approval; Azure calls can create resources or charges. The generic
docs harness has no language filter, so avoid non-dry runs on mixed-language
articles unless every block is intentionally in scope.
