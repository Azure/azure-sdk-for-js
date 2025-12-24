# Testing

This document describes how the tests in `sdk/storage/storage-blob` are organized, how to run them (Node & browser), how recordings work, and every environment variable recognized by the test infrastructure.

## 1. Build First

Before running any tests, build the repo/package as documented in the central contributing guide:

- Building: https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md#building
- General testing guidance: https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md#testing

## 2. Test Organization

```
test/
  public/                # Public surface tests for blobs (Node + browser)
    node/                # Public surface tests for Node only
  internal/              # Tests covering non-exported/internal helpers
    node/                # Node only internal tests
  utils/                 # Cross-test utilities (env injection, dynamic setup, fake values)
  resources/             # Binary/parquet/avro sample payloads used by query & parsing tests
```

Key utility files:
- `test/utils/constants.ts`: Declares enum `EnvVarKeys` and provides fake/test defaults for playback.
- `test/utils/injectables.ts`: Provides helpers to return values of all variables needed by the tests.
- `test/utils/setup.ts`: Ensures mandatory variables are present (in live/record modes) and synthesizes derived endpoint URLs.
- `test/public/utils/*.ts`: Helpers to create clients in different credential/pipeline configurations (`createBlobServiceClient`, etc.).

### Public vs Internal
- `public/` tests exercise the exported API surface (e.g. `BlockBlobClient`, `ContainerClient`).
- `internal/` tests validate internal logic such as parsing, retry implementations, batch utilities, or private helpers not directly exported.

### Recording Infrastructure
The suite uses `@azure-tools/test-recorder` (Vitest integration) to support three modes:
- `TEST_MODE=playback` (default): Uses previously recorded HTTP interactions located under `_recordings` (auto-generated). Fast & offline.
- `TEST_MODE=record`: Runs live against Azure, capturing new recordings (overwriting or adding under `_recordings`).
- `TEST_MODE=live`: Runs live without recording (useful for diagnosing real-time issues).

When recording, test code calls `recorder.variable(name, value)` to persist dynamically generated identifiers (like container/blob names) so playback runs are stable.

### Browser vs Node
- Node tests: `pnpm run test:node -- <optional pattern>`
- Browser tests: `pnpm run test:browser -- <optional pattern>` (build step creates `dist-test/browser/` bundle consumed by Playwright-like harness).

## 3. Azure Resources

Live tests require one or more Azure Storage accounts (General Purpose v2) with various configurations (soft delete, hierarchical namespace / Data Lake, GRS replication, premium file, object replication source & destination, etc.). You can:
1. Provision manually, OR
2. Use the shared provisioning script & Bicep template:
   - Script: `eng/common/TestResources/New-TestResources.ps1`
   - Storage Bicep reference: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/test-resources.bicep

The blob tests may create and delete containers, blobs, leases, tiers, snapshots, versions, and OR (object replication) related containers.

## 4. Environment Variables

Minimum variables needed by the tests are documented in https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/storage-blob/test.env

Additional categories exist for specialized scenarios (Data Lake / DFS, soft delete, GRS, premium file, object replication, encryption, etc.). Each group mirrors the base variables: account name, service URLs, key, SAS, and connection strings. For any `<PREFIX>` below (e.g. `DFS`, `SOFT_DELETE`, `FULL`, `PREMIUM_FILE`, `GRS`, `OR_DEST`), the pattern repeats:

`<PREFIX>_ACCOUNT_NAME`
`<PREFIX>_ACCOUNT_BLOB_URL` (or `..._DFS_...` uses `dfs.core.windows.net`)
`<PREFIX>_ACCOUNT_FILE_URL`
`<PREFIX>_ACCOUNT_QUEUE_URL`
`<PREFIX>_ACCOUNT_KEY`
`<PREFIX>_ACCOUNT_SAS`
`<PREFIX>_STORAGE_CONNECTION_STRING`
`<PREFIX>_STORAGE_CONNECTION_STRING_WITH_SAS`

Some prefixes omit certain services (e.g. premium file lacks blob URL), but the constants file documents all recognized keys.

### Full Enumerated List (exact names)
Core / default:
- `TEST_MODE`
- `SUBSCRIPTION_ID` (required when tests dynamically query account properties in record/live and need mgmt plane)
- `RESOURCE_GROUP`
- `ACCOUNT_NAME`
- `ACCOUNT_BLOB_URL`
- `ACCOUNT_FILE_URL`
- `ACCOUNT_QUEUE_URL`
- `ACCOUNT_KEY`
- `ACCOUNT_SAS`
- `STORAGE_CONNECTION_STRING`
- `STORAGE_CONNECTION_STRING_WITH_SAS`

Data Lake (Hierarchical Namespace enabled) account:
- `DFS_ACCOUNT_NAME`
- `DFS_ACCOUNT_BLOB_URL`
- `DFS_ACCOUNT_FILE_URL`
- `DFS_ACCOUNT_QUEUE_URL`
- `DFS_ACCOUNT_KEY`
- `DFS_ACCOUNT_SAS`
- `DFS_STORAGE_CONNECTION_STRING`
- `DFS_STORAGE_CONNECTION_STRING_WITH_SAS`

Data Lake Soft Delete account:
- `DFS_SOFT_DELETE_ACCOUNT_NAME`
- `DFS_SOFT_DELETE_ACCOUNT_BLOB_URL`
- `DFS_SOFT_DELETE_ACCOUNT_FILE_URL`
- `DFS_SOFT_DELETE_ACCOUNT_QUEUE_URL`
- `DFS_SOFT_DELETE_ACCOUNT_KEY`
- `DFS_SOFT_DELETE_ACCOUNT_SAS`
- `DFS_SOFT_DELETE_STORAGE_CONNECTION_STRING`
- `DFS_SOFT_DELETE_STORAGE_CONNECTION_STRING_WITH_SAS`

"Full" account (configured with broader feature set for cross-service tests):
- `FULL_ACCOUNT_NAME`
- `FULL_ACCOUNT_BLOB_URL`
- `FULL_ACCOUNT_FILE_URL`
- `FULL_ACCOUNT_QUEUE_URL`
- `FULL_ACCOUNT_KEY`
- `FULL_ACCOUNT_SAS`
- `FULL_STORAGE_CONNECTION_STRING`
- `FULL_STORAGE_CONNECTION_STRING_WITH_SAS`

Soft Delete (Blob/File/Queue soft delete validation):
- `SOFT_DELETE_ACCOUNT_NAME`
- `SOFT_DELETE_ACCOUNT_BLOB_URL`
- `SOFT_DELETE_ACCOUNT_FILE_URL`
- `SOFT_DELETE_ACCOUNT_QUEUE_URL`
- `SOFT_DELETE_ACCOUNT_KEY`
- `SOFT_DELETE_ACCOUNT_SAS`
- `SOFT_DELETE_STORAGE_CONNECTION_STRING`
- `SOFT_DELETE_STORAGE_CONNECTION_STRING_WITH_SAS`

Premium File (premium file share scenarios):
- `PREMIUM_FILE_ACCOUNT_NAME`
- `PREMIUM_FILE_ACCOUNT_FILE_URL`
- `PREMIUM_FILE_ACCOUNT_KEY`
- `PREMIUM_FILE_ACCOUNT_SAS`
- `PREMIUM_FILE_STORAGE_CONNECTION_STRING`
- `PREMIUM_FILE_STORAGE_CONNECTION_STRING_WITH_SAS`

GRS (geo-redundant storage) account:
- `GRS_ACCOUNT_NAME`
- `GRS_ACCOUNT_BLOB_URL`
- `GRS_ACCOUNT_FILE_URL`
- `GRS_ACCOUNT_QUEUE_URL`
- `GRS_ACCOUNT_KEY`
- `GRS_ACCOUNT_SAS`
- `GRS_STORAGE_CONNECTION_STRING`
- `GRS_STORAGE_CONNECTION_STRING_WITH_SAS`

Object Replication destination account:
- `OR_DEST_ACCOUNT_NAME`
- `OR_DEST_ACCOUNT_BLOB_URL`
- `OR_DEST_ACCOUNT_FILE_URL`
- `OR_DEST_ACCOUNT_QUEUE_URL`
- `OR_DEST_ACCOUNT_KEY`
- `OR_DEST_ACCOUNT_SAS`
- `OR_DEST_STORAGE_CONNECTION_STRING`
- `OR_DEST_STORAGE_CONNECTION_STRING_WITH_SAS`

Metadata / special test accounts & containers:
- `MD_ACCOUNT_NAME`
- `MD_ACCOUNT_KEY`
- `OR_SOURCE_CONTAINER_NAME`
- `OR_DEST_CONTAINER_NAME`
- `IMMUTABLE_CONTAINER_NAME`

Encryption / customer-provided key & scopes:
- `CUSTOMER_PROVIDED_KEY` (JSON or base64 object components if injected differently; in playback a canned key is used)
- `ENCRYPTION_SCOPE_1`
- `ENCRYPTION_SCOPE_2`

### Optional / Derived Behavior
- If specific `*_ACCOUNT_*` URLs are not provided, some setup logic may derive them from the name plus the standard suffix `core.windows.net`.
- In playback mode, many of these variables are populated with fake deterministic values from `constants.ts` if not explicitly set.

## 5. Sample Files
Binary & parquet/avro files under `test/resources/` feed query & quick query (avro/parquet) tests.

## 6. Running Tests
Node (all):
```
pnpm run test:node
```
Specific file (example):
```
pnpm run test:node -- test/public/blockblobclient.spec.ts
```
Browser:
```
pnpm run test:browser
```
Record live interactions:
```
TEST_MODE=record pnpm run test:node -- test/public/blockblobclient.spec.ts
```
Live only (no recordings):
```
TEST_MODE=live pnpm run test:node
```

## 7. Local Emulator (Azurite)
Some unit-style tests can run against the Azurite emulator by supplying a development connection string (`UseDevelopmentStorage=true`). This is not the primary path for the blob test suite; features like hierarchical namespace (Data Lake) and certain replication behaviors require real Azure accounts.

## 8. Adding New Tests
1. Place public API tests under `test/public/`.
2. Use `getUniqueName` (from `test/public/utils/utils.ts`) to ensure deterministic playback.
3. Prefer token credential mode unless specifically validating SAS / shared key logic — helper factories accept a mode parameter: `TokenCredential`, `Pipeline`, `Custom`.
4. For new environment variable needs, add keys to `EnvVarKeys` and fake defaults in `constants.ts`.
5. Run in `record` mode once, commit new `_recordings` artifacts by running `npx dev-tool test-proxy push` (ensure they pass repository sanitization requirements).

## 9. Troubleshooting
- Missing variable: tests will throw from `setup.ts` with the exact env key.
- Playback mismatch: delete the specific recording file and re-run in `record` mode (ensure no secrets appear in diff).
- Browser failures only: ensure bundling occurred (`pnpm turbo build`; the test script usually builds automatically, but stale `dist-test` artifacts can be cleared by a clean build).
