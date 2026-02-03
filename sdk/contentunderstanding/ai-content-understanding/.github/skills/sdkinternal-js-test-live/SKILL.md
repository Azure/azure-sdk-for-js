---
name: sdkinternal-js-test-live
description: "Run tests in live mode against actual Azure services without recording interactions."
---

## Purpose

This skill runs the test suite for the Azure AI Content Understanding SDK (`@azure/ai-content-understanding`) in **live mode**. Live mode runs tests against actual Azure services without recording the HTTP interactions.

## When to Use

Use this skill when:

- Validating that tests work against the live Azure service
- Testing after Azure service updates or changes
- Verifying real-world behavior without modifying recordings
- Final validation before submitting a pull request

## Prerequisites

Before running tests in live mode, ensure:

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
4. **Run tests in live mode**:
   ```bash
   cd sdk/contentunderstanding/ai-content-understanding
   TEST_MODE=live pnpm test
   ```

## Example

```bash
cd /path/to/azure-sdk-for-js
pnpm install
pnpm turbo build --filter=@azure/ai-content-understanding... --token 1
cd sdk/contentunderstanding/ai-content-understanding
TEST_MODE=live pnpm test
```

## Faster Iteration

For faster iteration, run only Node.js tests (skip browser tests):

```bash
cd sdk/contentunderstanding/ai-content-understanding
TEST_MODE=live pnpm test:node
```

## Using the Script

This skill includes a full-featured test runner script that handles pre-flight checks,
credential verification, automatic builds, and logging.

### Script Location

```bash
sdk/contentunderstanding/ai-content-understanding/.github/skills/sdkinternal-js-test-live/scripts/run_tests.sh
```

### Script Usage

```bash
# Run all tests
./run_tests.sh

# Run only Node.js tests (faster)
./run_tests.sh node

# Run only browser tests
./run_tests.sh browser

# Run a specific test file
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
- **Dry run**: See what would be executed without running

## Troubleshooting

**"key must be a non-empty string"**

- Ensure `.env` at the package root contains `CONTENTUNDERSTANDING_KEY` with a valid API key
- Or export the environment variable in your shell

**"Access denied" or authentication errors**

- Verify your endpoint URL is correct
- Ensure your API key is valid or Microsoft Entra ID credentials have correct permissions
- Make sure you have the **Cognitive Services User** role assigned

**"Invalid request" errors**

- Ensure your Azure region supports the analyzers used by the tests
- Verify network access is available for URL-based inputs

## Notes

- Live mode requires valid Azure credentials and a provisioned Microsoft Foundry resource
- Tests will make actual API calls and may incur costs
- Do NOT commit real keys to the repository
- Ensure `.env` is in your `.gitignore`
- Always run commands from the repository root (`azure-sdk-for-js/`) for install and build
- Use `pnpm` only — do not use `npm` or `yarn`
