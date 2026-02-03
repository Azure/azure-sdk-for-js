---
name: sdkinternal-js-test-all-modes
description: "Run tests in all modes sequentially: live, record, then playback."
---

## Purpose

This skill runs the test suite for the Azure AI Content Understanding SDK (`@azure/ai-content-understanding`) in **all three test modes** sequentially:

1. **Live mode** - Runs tests against actual Azure services
2. **Record mode** - Runs tests and captures HTTP interactions to recording files
3. **Playback mode** - Runs tests using the recorded HTTP interactions

## When to Use

Use this skill when:

- Performing comprehensive test validation before submitting a pull request
- Validating the complete test cycle (live → record → playback)
- Ensuring recordings are up-to-date and playback works correctly
- Running full regression testing

## Prerequisites

Before running tests, ensure:

1. Dependencies are installed: `pnpm install`
2. The package is built: `pnpm turbo build --filter=@azure/ai-content-understanding... --token 1`
3. A `.env` file exists with required environment variables (needed for live and record modes)
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
4. **Run tests in all modes**:
   ```bash
   cd sdk/contentunderstanding/ai-content-understanding
   ./.github/skills/sdkinternal-js-test-all/scripts/run_tests.sh
   ```

## Example

```bash
cd /path/to/azure-sdk-for-js
pnpm install
pnpm turbo build --filter=@azure/ai-content-understanding... --token 1
cd sdk/contentunderstanding/ai-content-understanding
./.github/skills/sdkinternal-js-test-all/scripts/run_tests.sh
```

## Manual Execution

If you prefer to run each mode manually:

```bash
cd sdk/contentunderstanding/ai-content-understanding

# Step 1: Live mode
TEST_MODE=live pnpm test

# Step 2: Record mode
TEST_MODE=record pnpm test

# Step 3: Playback mode
TEST_MODE=playback pnpm test
```

## Faster Iteration

For faster iteration, run only Node.js tests (skip browser tests):

```bash
cd sdk/contentunderstanding/ai-content-understanding
./.github/skills/sdkinternal-js-test-all/scripts/run_tests.sh node
```

## Using the Script

This skill includes a full-featured test runner script that handles pre-flight checks,
credential verification, automatic builds, and logging.

### Script Location

```bash
sdk/contentunderstanding/ai-content-understanding/.github/skills/sdkinternal-js-test-all/scripts/run_tests.sh
```

### Script Usage

```bash
# Run all tests in all modes
./run_tests.sh

# Run only Node.js tests in all modes (faster)
./run_tests.sh node

# Run only browser tests in all modes
./run_tests.sh browser

# Run a specific test file in all modes
./run_tests.sh test/analyzer.spec.ts

# Skip build verification
./run_tests.sh node --skip-build

# Dry run (see what would be executed)
./run_tests.sh all --dry-run

# Save output to a custom log file
./run_tests.sh all --log my-tests.log

# Stop on first failure (don't continue to next mode)
./run_tests.sh all --stop-on-failure
```

### Script Features

- **Pre-flight checks**: Verifies package is built, pnpm is available
- **Credential verification**: Checks for required environment variables
- **Automatic .env sourcing**: Loads credentials from package root `.env`
- **Automatic build**: Builds the package if not already built
- **Sequential execution**: Runs live → record → playback in order
- **Logging**: Saves output to timestamped log files
- **Multiple modes**: Run all tests, Node.js only, browser only, or specific files
- **Stop on failure**: Option to stop if any mode fails
- **Dry run**: See what would be executed without running

## Test Execution Order

The script runs tests in the following order:

1. **Live mode** (`TEST_MODE=live`) - Validates against actual Azure services
2. **Record mode** (`TEST_MODE=record`) - Captures HTTP interactions to recordings
3. **Playback mode** (`TEST_MODE=playback`) - Verifies recordings work correctly

This order ensures:

- Live tests validate real service behavior first
- Recordings are captured with verified behavior
- Playback confirms recordings are valid and complete

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

**Live passes but playback fails**

- Check that recordings were updated after live tests
- Verify recordings directory contains fresh recording files
- Re-run record mode to update recordings

## Notes

- Live and record modes require valid Azure credentials and a provisioned Microsoft Foundry resource
- Live and record modes will make actual API calls and may incur costs
- Playback mode does not require credentials
- Do NOT commit real keys to the repository
- Ensure `.env` is in your `.gitignore`
- Always run commands from the repository root (`azure-sdk-for-js/`) for install and build
- Use `pnpm` only — do not use `npm` or `yarn`
