# Testing Guide for Azure Planetary Computer Pro

This package uses the [Azure SDK test recorder](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/test-utils/recorder)
with recorded HTTP sessions stored in the [azure-sdk-assets](https://github.com/Azure/azure-sdk-assets) repo.

## Prerequisites

- An Azure subscription
- A deployed GeoCatalog resource
- Node.js LTS (>= 20.x)
- Access to the GeoCatalog with appropriate permissions

## Setup

### 1. Install Dependencies

From the repository root:

```bash
pnpm install
```

### 2. Configure Environment Variables

Copy the `sample.env` file to `.env` in the package root:

```bash
cd sdk/planetarycomputer/planetarycomputer
cp sample.env .env
```

Edit the `.env` file and fill in your actual values:

```bash
PLANETARYCOMPUTER_ENDPOINT=https://your-geocatalog.geocatalogs.azure.com
PLANETARYCOMPUTER_COLLECTION_ID=your-collection-id
PLANETARYCOMPUTER_ITEM_ID=your-item-id

# Optional — for ingestion tests
PLANETARYCOMPUTER_INGESTION_CONTAINER_URI=https://yourstorage.blob.core.windows.net/container
PLANETARYCOMPUTER_INGESTION_CATALOG_URL=https://example.com/catalog.json
PLANETARYCOMPUTER_MANAGED_IDENTITY_OBJECT_ID=your-managed-identity-object-id
```

### 3. Authentication

The test framework uses `@azure-tools/test-credential` which automatically uses a
`ChainedTokenCredential` that tries the following methods in order:

- **Azure CLI**: Run `az login` first
- **Azure PowerShell**: Run `Connect-AzAccount` first
- **Azure Developer CLI**: Run `azd auth login` first

No special environment variables are needed — just be logged in with any of the above tools.

## Running Tests

### Build the Package

Before running tests, build the package and its dependencies:

```bash
pnpm turbo build --filter=@azure/planetarycomputer... --token 1
```

### Run Tests in Playback Mode (default)

Playback mode uses previously recorded HTTP interactions and doesn't require live resources:

```bash
# Run all node tests (TEST_MODE defaults to playback when unset)
pnpm test:node

# Explicitly set playback mode
TEST_MODE=playback pnpm test:node

# Run a specific test file
TEST_MODE=playback pnpm test:node -- test/public/01_ingestion.spec.ts
```

### Run Tests in Record Mode

Record mode runs live tests against your actual Azure resources and records the HTTP interactions.
Recording is typically done **file-by-file** since each test file targets different API areas.

```bash
# Record a specific test file (recommended)
TEST_MODE=record pnpm test:node -- test/public/01_ingestion.spec.ts

# Record all node tests at once
TEST_MODE=record pnpm test:node
```

On Windows (PowerShell), set the env var separately:

```powershell
$env:TEST_MODE="record"
pnpm test:node
```

### Run Specific Test Files

```bash
pnpm test:node -- test/public/04_stacItemTiler.spec.ts
```

### Run Browser Tests

```bash
pnpm test:browser
```

## Test File Structure

| File | Description |
|---|---|
| `00_collections.spec.ts` | STAC collection CRUD, thumbnail, metadata |
| `01_ingestion.spec.ts` | Ingestion source and run operations |
| `02_stacSpecification.spec.ts` | STAC API conformance and queryables |
| `03_sharedAccessSignature.spec.ts` | SAS token operations |
| `04_stacItemTiler.spec.ts` | Tile rendering for individual STAC items |
| `05_mosaicsTiler.spec.ts` | Mosaic tile rendering and static images |
| `06_mapLegends.spec.ts` | Map legend generation |
| `07_collectionLifecycle.spec.ts` | Collection create/replace/delete lifecycle |
| `08_collectionTiler.spec.ts` | Collection-level tiler operations |

Test utilities:

- `test/public/utils/recordedClient.ts` — Recorder setup and sanitizer configuration
- `test/public/utils/byteHelpers.ts` — Binary response handling for tile/image tests
- `test/public/utils/envVars.ts` — Environment variable definitions

## Managing Recordings

```bash
# Restore recordings (first time or after assets.json changes)
npx dev-tool test-proxy restore

# Push new recordings after re-recording
npx dev-tool test-proxy push
```

> **Important:** Commit the updated `assets.json` alongside your code changes so CI can find the
> correct recordings.

## Key Testing Tips

- **`snippets.spec.ts` is NOT a real test file.** It contains source code for documentation
  snippets. Do not modify it as part of test updates.
- After re-recording, always verify tests pass in playback mode before pushing.
- The recorder automatically sanitizes sensitive data (endpoints, tokens) based on the
  configuration in `recordedClient.ts`.

## Troubleshooting

### Authentication Errors

1. Ensure you're logged in with `az login`, `Connect-AzAccount`, or `azd auth login`
2. Verify environment variables in `.env` are correct
3. Check that your account has the necessary permissions on the GeoCatalog

### Playback Failures

1. Ensure recordings exist: `npx dev-tool test-proxy restore`
2. Check that test code hasn't changed since recording (different HTTP calls = mismatched recordings)
3. Verify `TEST_MODE` is unset or set to `playback`

### Recording Failures

1. Verify your `.env` file has correct values
2. Ensure `TEST_MODE=record` is set
3. Check network connectivity to your GeoCatalog endpoint

## More Information

- [Testing Quickstart](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/Quickstart-on-how-to-write-tests.md)
- [Test Recorder Documentation](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/test-utils/recorder)
- [Asset Sync Workflow](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/recorder/ASSET_SYNC_WORKFLOW.md)
