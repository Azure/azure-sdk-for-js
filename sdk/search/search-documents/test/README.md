# Testing

To test this project, make sure to build it by following our [building instructions](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md#building), then follow the [testing instructions](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md#testing).

## Offline tests and playback

`TEST_MODE=playback` is the default. Public recorded tests use the test proxy and
recordings referenced by `assets.json`; they do not need a live Search service or
Azure credentials. Run `pnpm test:node` for the Node suite. Internal tests can also
be run independently with `pnpm exec vitest run test/internal`.

When the default API version changes, existing recordings may no longer match
requests. Regenerate recordings against an approved service running the target
API version; do not rewrite recording contents or suppress mismatches.

## Live tests and recording

Use an existing, explicitly approved test service. These tests create, populate,
query, and delete indexes and knowledge resources; do not target a production
service. Set the variables from [`sample.env`](../sample.env) locally:

- `TEST_MODE=live` to call the service without recording, or `TEST_MODE=record` to
  regenerate recordings.
- `ENDPOINT`: a reachable Azure AI Search endpoint supporting the target preview
  API and the features exercised by the selected tests.
- `AZURE_OPENAI_ENDPOINT` and `AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME` for File
  knowledge source tests. The sample configuration expects an embedding
  deployment using `text-embedding-ada-002`.

The test principal needs **Search Service Contributor** and **Search Index Data
Contributor** permissions. The Search service also needs a managed identity with
**Cognitive Services OpenAI User** access to the embedding resource for File
knowledge source ingestion.

The existing live-only model scenarios additionally require
`AZURE_OPENAI_CHAT_DEPLOYMENT_NAME` (a `gpt-4o` deployment), and the Fabric
scenarios require `FABRIC_WORKSPACE_ID`, `FABRIC_DATA_AGENT_ID`, and
`FABRIC_ONTOLOGY_ID` identifying accessible, pre-provisioned resources. The
live-only Work IQ configuration test needs `WORKIQ_APPLICATION_ID` and
`WORKIQ_FEDERATED_CREDENTIAL_ID`, with optional `WORKIQ_TENANT_ID`.
These live-only tests do not produce playback recordings.

### Authentication

Public service tests use `createTestCredential()` from
[`@azure-tools/test-credential`](../../../test-utils/test-credential/src/index.ts).
In Node live/record mode, its credential chain supports existing Azure PowerShell,
Azure CLI (`az login`), and Azure Developer CLI sessions, followed by environment
credentials. An existing Entra session is sufficient for client authentication
when it belongs to the correct tenant and has the required roles; it does not
provide the external service resources or their permissions.

The current public `AzureKeyCredential("key")` cases only test client constructors
offline; they do not require a Search admin key. Do not add secrets to source
control or share them in chat. Browser live tests also require the credential
relay managed by the repository's browser test tooling.

### Resource template and recording assets

The shared [Bicep template](../../test-resources.bicep) provisions a basic Search
service and the two Search roles. It does **not** provision the OpenAI, Fabric,
Work IQ, or managed-identity dependencies needed for all preview scenarios.
The optional
[resource creation script](https://github.com/Azure/azure-sdk-for-js/blob/main/eng/common/TestResources/New-TestResources.ps1)
must only be used with authorization to provision resources.

After successful recording and sanitization review, use
`pnpm exec dev-tool test-proxy push` to publish recording assets and update
`assets.json`, as described in the package skill. Live execution, resource
provisioning, and publishing recording assets each require appropriate
authorization.
