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

Copy the `sample.env` file to `.env` in the package root:

```bash
cd sdk/planetarycomputer/planetarycomputer
cp sample.env .env
```

Edit the `.env` file and fill in your actual values.

### 3. Authentication

The test framework uses `@azure-tools/test-credential` which automatically uses a `ChainedTokenCredential` that tries the following methods in order:

- **Azure PowerShell**: Run `Connect-AzAccount` first
- **Azure CLI**: Run `az login` first
- **Azure Developer CLI**: Run `azd auth login` first

No special environment variables are needed — just be logged in with any of the above tools.

## Running Tests

### Build the Package

```bash
pnpm turbo build --filter=@azure/planetarycomputer... --token 1
```

### Run Tests in Record Mode

```bash
TEST_MODE=record npm run test:node
```

### Run Tests in Playback Mode

```bash
npm run test:node
```

### Run Specific Test Files

```bash
npm run test:node -- --reporter verbose 00_stacCollection
```

## More Information

- [Testing Quickstart](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/Quickstart-on-how-to-write-tests.md)
- [Test Recorder Documentation](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/test-utils/recorder)
