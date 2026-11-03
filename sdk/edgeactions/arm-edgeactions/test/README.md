# Edge Actions tests

Tests use the repository's shared Vitest configuration, `@azure-tools/test-recorder`,
and `createTestCredential()`. Run commands below from this package directory.

## Coverage

- `public/edgeActionsManagement.spec.ts`: independent recorded lifecycles for
  Edge Action tag updates and file/ZIP deployments, version updates, code retrieval,
  default-version swaps, execution-filter CRUD, lists, and negative requests.
  Each test owns a unique Edge Action. Cleanup removes filters, non-default versions,
  the default version, and the parent, even after an assertion fails. By default,
  each test also creates and deletes its own resource group.
- `internal/operations.spec.ts`: deterministic HTTP-client tests for all LROs,
  synchronous completion, Location-only polling, API-version preservation,
  poller restoration, pagination, service errors, and cancellation. The mock
  transport checks raw API-version parameters before URL normalization, and
  identical signed polling URLs fail without exposing their values in diagnostics.
  These are synthetic responses, not service recordings.
- `internal/responseSpec.spec.ts`: regression tests for the response validator.
- `internal/sanitizers.spec.ts`: synthetic, loopback-only record/playback through
  the real test proxy. Its in-memory recording is purged; no Azure access is needed.

## Specification validation

`responseSpec.json` bundles OpenAPI response schemas and referenced definitions
from the commit in `tsp-location.yaml`. Tests do not fetch specifications.
After regeneration changes the source commit, refresh it with:

```powershell
node test\utils\refreshResponseSpec.mjs
pnpm exec prettier --write test\responseSpec.json
```

The response policy validates documented status codes, raw response bodies, and
header types before deserialization. LRO checks validate HTTPS polling URLs,
API versions, ARM operation-status envelopes, terminal status, and final
`Location` responses against the **initiating operation's** result schema.
When the SDK skips a final-result GET, the test reads the advertised endpoint.
For async-operation bodies, only a nonempty string `status` is validated;
additional fields (including timestamps, progress, and error details) are ignored.
HTTP 200, valid polling URLs, and terminal success are still required. This
status envelope is not modeled as a resource response in the Edge Actions OpenAPI document.

Two narrowly scoped RP mismatches are temporarily exempt:

- `swapDefault`'s known **Location HTTP 200 with a body** mismatch. Its initial
  response, polling status, SDK void result, and subsequent GETs confirming the
  default-version change remain checked.
- Explicit `null` in version `properties.validationStatus`, pending the RP fix
  to omit this optional, non-nullable field. Invalid non-null values and all other
  schema errors remain failures. The pinned specification and recordings are not
  rewritten to make the field nullable.

## Running tests

Lifecycle budgets include setup, test steps, and resource cleanup:

| Deployment calls | Total budget |
| ---------------- | ------------ |
| None             | 20 minutes   |
| One              | 50 minutes   |
| Two              | 90 minutes   |

Each `deployVersionCode` call has its own **40-minute deadline**. Deployment
scenarios add ten minutes for other work and cleanup to the combined deployment
allowance. The file/ZIP scenarios each deploy two versions, so each gets 90 minutes;
the budget is calculated from the version list used by the deployment loop.
Cleanup shares the original lifecycle deadline rather than starting another budget.

Requests and LRO waits use cancellation signals so expired operations cannot
continue issuing requests during cleanup. Cleanup uses separate clients and
the remaining lifecycle budget, not an already-cancelled deployment signal.
If the total budget expires during cleanup, cleanup fails explicitly and owned
resources may require manual removal; expiry is not reported as successful cleanup.

```powershell
# Test-proxy startup is managed by dev-tool.
$env:TEST_MODE = "playback"
pnpm exec tsc -b --noEmit
pnpm test:node -- -- test\internal

# Full suite using the published recordings referenced by assets.json:
$env:TEST_MODE = "playback"
pnpm test
```

Asset sync restores the published lifecycle recordings automatically when needed.
Local rerecordings can be replayed before publishing a replacement asset tag.
The old four smoke-test recordings have been replaced. Never manufacture or edit
recordings to make the contract assertions pass.

To record, copy `sample.env` to `.env` in this package directory, populate
`SUBSCRIPTION_ID`, and authenticate interactively with `az login`. The JavaScript
credential helper supports Azure CLI authentication; Python's
`AZURE_TEST_USE_*_AUTH` flags do not configure it.

Like Python, the default lifecycle creates a disposable resource group in
`eastus`. Names use `rgjs-javascriptsdk-edgeaction-test-<suffix>` for groups and
`eajavascript<suffix>` for Edge Actions. Names are unique per test; recorder
variables preserve Edge Action names and the existing/disposable group choice
for playback. Group names are sanitized to `edgeactions-test-rg`.

Creating disposable groups requires subscription-level permission to create and
delete resource groups. Optionally set `RESOURCE_GROUP` to an existing dedicated
group; the tests check that it exists and never delete it. Generated group-name
collisions are rejected. Cleanup attempts deletion of owned groups even if Edge
Action cleanup fails, and reports cleanup errors rather than hiding them.

```powershell
$env:TEST_MODE = "record"
pnpm test:node -- -- test\public\edgeActionsManagement.spec.ts
$env:TEST_MODE = "playback"
pnpm test
```

If port 5000 is occupied, set these in the same terminal before running tests:

```powershell
$env:TEST_PROXY_HTTP_PORT = "5100"
$env:TEST_PROXY_HTTPS_PORT = "5101"
$env:ASPNETCORE_URLS = "http://127.0.0.1:5100;https://127.0.0.1:5101"
```

## Recording safety

The recorder replaces configured environment values, subscription IDs and
resource groups, polling query secrets (`t`, `c`, `s`, `h`, `sig`, `token`),
identity metadata, authentication tokens, cookies, and trace headers.
It also redacts encoded resource-group cleanup operation IDs, which can contain
internal job metadata, and unrelated Edge Action names, tag values, and attachment
identifiers returned by subscription-wide lists, including profile, rule-set/rule,
and AFD endpoint/route names. Tag keys still require inspection.
It preserves URL structure, API versions, status fields, resource types, and
test-generated Edge Action names so assertions still check the service contract.
Only synthetic handler code and synthetic execution-filter values are used.

Inspect **all** new recording files for sensitive data before publishing. Run
playback without live credentials, then publish using asset sync:

```powershell
pnpm exec dev-tool test-proxy diff --stat
pnpm exec dev-tool test-proxy push
```

Commit the resulting `assets.json` tag update, not recording JSON files in this
SDK repository. See `sdk/test-utils/recorder/ASSET_SYNC_WORKFLOW.md` and
`documentation/Quickstart-on-how-to-write-tests.md` for repository-wide guidance.

The repository's existing `.gitignore` excludes `.env`, `.assets`, proxy logs,
test-result XML, build output, and dependency directories. Keep `sample.env`,
test source, `responseSpec.json`, and `assets.json` tracked; the specification
snapshot is a public contract fixture, not an HTTP recording.
