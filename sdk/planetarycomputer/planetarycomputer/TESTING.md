# Testing Guide for Azure Planetary Computer Pro

This guide explains how to run tests for the Azure Planetary Computer Pro client library.

## Prerequisites

- An Azure subscription
- A deployed GeoCatalog resource
- Node.js LTS version
- Access to the GeoCatalog with appropriate permissions

## Setup

### 1. Install Dependencies

From the repository root:

```bash
pnpm install
```

### 2. Configure Environment Variables

Copy the `.env.example` file to `.env` in the package root:

```bash
cd sdk/planetarycomputer/planetarycomputer
cp .env.example .env
```

Edit the `.env` file and fill in your actual values:

```bash
# Required for live tests
TEST_MODE=live

# Authentication (choose one)
AZURE_TEST_USE_CLI_AUTH=true

# Your GeoCatalog endpoint
PLANETARYCOMPUTER_ENDPOINT=https://your-geocatalog.geocatalogs.azure.com

# Test data identifiers
PLANETARYCOMPUTER_COLLECTION_ID=your-collection-id
PLANETARYCOMPUTER_ITEM_ID=your-item-id

# (Optional) For ingestion tests
PLANETARYCOMPUTER_INGESTION_CONTAINER_URI=https://yourstorage.blob.core.windows.net/container
PLANETARYCOMPUTER_INGESTION_CATALOG_URL=https://example.com/catalog.json
PLANETARYCOMPUTER_MANAGED_IDENTITY_OBJECT_ID=your-managed-identity-object-id
```

### 3. Authentication

The test framework uses `@azure-tools/test-credential` which supports multiple authentication methods:

- **Azure CLI** (recommended): Set `AZURE_TEST_USE_CLI_AUTH=true` and run `az login` first
- **PowerShell**: Set `AZURE_TEST_USE_PWSH_AUTH=true`
- **Azure Developer CLI**: Set `AZURE_TEST_USE_AZD_AUTH=true`

## Running Tests

### Build the Package

Before running tests, build the package and its dependencies:

```bash
pnpm build --filter=@azure/planetarycomputer...
```

### Run Tests in Record Mode

Record mode runs live tests against your actual Azure resources and records the HTTP interactions:

```bash
# On Windows (PowerShell)
$env:TEST_MODE="record"
pnpm test

# On Linux/macOS
export TEST_MODE=record
pnpm test
```

### Run Tests in Playback Mode

Playback mode uses previously recorded HTTP interactions and doesn't require live resources:

```bash
# On Windows (PowerShell)
$env:TEST_MODE="playback"
pnpm test

# On Linux/macOS
export TEST_MODE=playback
pnpm test
```

### Run Specific Test Files

```bash
pnpm test collections.spec.ts
```

### Run Node-Only Tests

```bash
pnpm test:node
```

### Run Browser Tests

```bash
pnpm test:browser
```

## Test Structure

The test utilities are organized as follows:

- `test/public/utils/envVars.ts` - Environment variable definitions and helpers
- `test/public/utils/createClient.ts` - Client creation utilities
- `test/public/utils/recordedClient.ts` - Recorder setup and configuration
- `test/public/*.spec.ts` - Test files organized by feature

## Writing New Tests

Example test structure:

```ts snippet:listCollections
import { DefaultAzureCredential } from "@azure/identity";
import { PlanetaryComputerProClient } from "@azure/planetarycomputer";

// [START listCollections]
const credential = new DefaultAzureCredential();
const catalogUri = "<your-geocatalog-endpoint>";
const client = new PlanetaryComputerProClient(catalogUri, credential);
const collections = await client.stac.listCollections();
console.log(`Found ${collections.collections.length} collections`);
for (const collection of collections.collections) {
  console.log(`- ${collection.id}: ${collection.description}`);
}
```

## Best Practices

1. **Use Environment Variables**: Never hardcode sensitive data or resource identifiers
2. **Record Tests**: Always record tests after making changes to ensure playback works
3. **Clean Up Resources**: Use `afterEach` hooks to clean up any created resources
4. **Sanitize Secrets**: The recorder automatically sanitizes sensitive data based on `replaceableVariables`
5. **Test Both Success and Error Cases**: Include tests for expected errors

## Troubleshooting

### Authentication Errors

If you get authentication errors:

1. Ensure you're logged in with the appropriate tool (az CLI, PowerShell, etc.)
2. Verify the environment variables are set correctly
3. Check that your account has the necessary permissions on the GeoCatalog

### Recording Failures

If recording fails:

1. Verify your `.env` file has correct values
2. Ensure `TEST_MODE=record` is set
3. Check network connectivity to Azure services
4. Verify the GeoCatalog resource is accessible

### Playback Failures

If playback fails:

1. Ensure recordings exist in the `recordings/` folder
2. Verify `TEST_MODE=playback` is set
3. Check that the test hasn't changed since recording

## More Information

For more details on testing in the Azure SDK for JS, see:

- [Testing Quickstart](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/Quickstart-on-how-to-write-tests.md)
- [Test Recorder Documentation](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/test-utils/recorder)
