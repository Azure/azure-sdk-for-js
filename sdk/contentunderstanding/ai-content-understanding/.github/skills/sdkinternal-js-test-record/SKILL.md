---
name: sdkinternal-js-test-record
description: "Run tests in record mode to capture HTTP interactions for future playback tests."
---

## Purpose

This skill runs the test suite for the Azure AI Content Understanding SDK (`@azure/ai-content-understanding`) in **record mode**. Record mode runs tests against actual Azure services and captures the HTTP interactions to recording files for future playback tests.

## When to Use

Use this skill when:

- Adding new tests that need recorded interactions
- Updating existing test recordings after API changes
- Refreshing recordings after service behavior changes
- Setting up tests for new functionality

## Prerequisites

Before running tests in record mode, ensure:

1. Dependencies are installed: `pnpm install`
2. The package is built: `pnpm turbo build --filter=@azure/ai-content-understanding... --token 1`
3. A `.env` file exists with required environment variables (see below)
4. Required Azure resources are provisioned and configured

## Environment Setup

The script reads credentials from the existing `.env` file at the package root:

```
sdk/contentunderstanding/ai-content-understanding/.env
```

This file should contain:

```bash
CONTENTUNDERSTANDING_ENDPOINT="https://<your-resource>.services.ai.azure.com/"
CONTENTUNDERSTANDING_KEY="<your-api-key>"
# Add model deployment names if required for prebuilt analyzers
```

Alternatively, export credentials directly in your shell:

```bash
export CONTENTUNDERSTANDING_ENDPOINT="https://<your-resource>.services.ai.azure.com/"
export CONTENTUNDERSTANDING_KEY="<your-api-key>"
```

## Instructions

Run all commands from the repository root directory (`azure-sdk-for-js/`):

1. **Install dependencies**: `pnpm install`
2. **Build the package**: `pnpm turbo build --filter=@azure/ai-content-understanding... --token 1`
3. **Set up environment**: Ensure `.env` exists at the package root with credentials (see above)
4. **Run tests in record mode**:
   ```bash
   cd sdk/contentunderstanding/ai-content-understanding
   TEST_MODE=record pnpm test
   ```

## Example

```bash
cd /path/to/azure-sdk-for-js
pnpm install
pnpm turbo build --filter=@azure/ai-content-understanding... --token 1
cd sdk/contentunderstanding/ai-content-understanding
TEST_MODE=record pnpm test
```

## Faster Iteration

For faster iteration, run only Node.js tests (skip browser tests):

```bash
cd sdk/contentunderstanding/ai-content-understanding
TEST_MODE=record pnpm test:node
```

## What Gets Recorded

When running in record mode:

- HTTP requests and responses are captured to `recordings/` directory
- Sensitive data (API keys, endpoints) is automatically sanitized
- Recording files can be committed to the repository for playback tests

## Using the Script

This skill includes a full-featured test runner script that handles pre-flight checks,
credential verification, automatic builds, and logging.

### Script Location

```bash
sdk/contentunderstanding/ai-content-understanding/.github/skills/sdkinternal-js-test-record/scripts/run_tests.sh
```

### Script Usage

```bash
# Run all tests and record
./run_tests.sh

# Run and record only Node.js tests (faster)
./run_tests.sh node

# Run and record only browser tests
./run_tests.sh browser

# Run and record a specific test file
./run_tests.sh test/analyzer.spec.ts

# Skip build verification
./run_tests.sh node --skip-build

# Dry run (see what would be executed)
./run_tests.sh all --dry-run

# Save output to a custom log file
./run_tests.sh all --log my-tests.log
```

### Script Features

- **Pre-flight checks**: Verifies package is built, pnpm is available
- **Credential verification**: Checks for required environment variables
- **Automatic .env sourcing**: Loads credentials from package root `.env`
- **Automatic build**: Builds the package if not already built
- **Logging**: Saves output to timestamped log files
- **Multiple modes**: Run all tests, Node.js only, browser only, or specific files
- **Post-run guidance**: Provides next steps after recording completes
- **Dry run**: See what would be executed without running

## Troubleshooting

**"key must be a non-empty string"**

- Ensure `.env` at the package root contains `CONTENTUNDERSTANDING_KEY` with a valid API key
- Or export the environment variable in your shell

**"Access denied" or authentication errors**

- Verify your endpoint URL is correct
- Ensure your API key is valid or Microsoft Entra ID credentials have correct permissions
- Make sure you have the **Cognitive Services User** role assigned

**"Invalid request" LRO errors**

- Ensure your Azure region supports the analyzers used by the tests
- Verify network access is available for URL-based inputs

**Recordings not updating**

- Delete existing recording files before re-recording if needed
- Ensure you're running with `TEST_MODE=record` explicitly set

## Notes

- Record mode requires valid Azure credentials and a provisioned Microsoft Foundry resource
- Tests will make actual API calls and may incur costs
- Recordings are automatically sanitized to remove sensitive data
- Review recordings before committing to ensure no sensitive data leaked
- Do NOT commit real keys to the repository
- Ensure `.env` is in your `.gitignore`
- Always run commands from the repository root (`azure-sdk-for-js/`) for install and build
- Use `pnpm` only — do not use `npm` or `yarn`
