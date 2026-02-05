````skill
---
name: sdkinternal-js-test-run
description: "Run tests for the Azure AI Content Understanding SDK in various modes: live, record, playback, or all modes sequentially."
---

## Purpose

This skill runs the test suite for the Azure AI Content Understanding SDK (`@azure/ai-content-understanding`) in different test modes:

- **live** - Runs tests against actual Azure services without recording
- **record** - Runs tests and captures HTTP interactions to recording files
- **playback** - Runs tests using pre-recorded HTTP interactions (no Azure resources required)
- **all** - Runs all three modes sequentially: live → record → playback

## When to Use

Use this skill when:

- **live mode**: Validating tests against the live Azure service, testing after service updates
- **record mode**: Adding new tests, updating recordings after API changes, refreshing recordings
- **playback mode**: Running tests without Azure credentials, quick validation, CI/CD pipelines
- **all modes**: Comprehensive test validation before submitting a pull request

## Prerequisites

Before running tests, ensure:

1. Dependencies are installed: `pnpm install`
2. The package is built: `pnpm turbo build --filter=@azure/ai-content-understanding... --token 1`
3. For live/record modes: A `.env` file exists with required environment variables
4. For playback mode: No credentials required

## Environment Setup

For live and record modes, the script reads credentials from the `.env` file at the package root:

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
3. **Set up environment** (for live/record): Ensure `.env` exists at the package root with credentials
4. **Run tests**:
   ```bash
   cd sdk/contentunderstanding/ai-content-understanding
   ./.github/skills/sdkinternal-js-test-run/scripts/run_tests.sh <mode>
   ```

## Examples

```bash
cd /path/to/azure-sdk-for-js
pnpm install
pnpm turbo build --filter=@azure/ai-content-understanding... --token 1
cd sdk/contentunderstanding/ai-content-understanding

# Run in different modes
./.github/skills/sdkinternal-js-test-run/scripts/run_tests.sh live
./.github/skills/sdkinternal-js-test-run/scripts/run_tests.sh record
./.github/skills/sdkinternal-js-test-run/scripts/run_tests.sh playback
./.github/skills/sdkinternal-js-test-run/scripts/run_tests.sh all
```

## Faster Iteration

For faster iteration, run only Node.js tests (skip browser tests):

```bash
cd sdk/contentunderstanding/ai-content-understanding
./.github/skills/sdkinternal-js-test-run/scripts/run_tests.sh live node
./.github/skills/sdkinternal-js-test-run/scripts/run_tests.sh playback node
```

## Using the Script

This skill includes a full-featured test runner script that handles pre-flight checks,
credential verification (when needed), automatic builds, and logging.

### Script Location

```bash
sdk/contentunderstanding/ai-content-understanding/.github/skills/sdkinternal-js-test-run/scripts/run_tests.sh
```

### Script Usage

```bash
# Test mode is required as first argument
./run_tests.sh <test-mode> [test-target] [OPTIONS]

# Test modes: live, record, playback, all
./run_tests.sh live          # Run all tests in live mode
./run_tests.sh record        # Run all tests in record mode
./run_tests.sh playback      # Run all tests in playback mode
./run_tests.sh all           # Run all three modes sequentially

# Test targets (optional): all (default), node, browser, or specific file
./run_tests.sh live node            # Run only Node.js tests in live mode
./run_tests.sh record browser       # Run only browser tests in record mode
./run_tests.sh playback test/foo.ts # Run a specific test file in playback mode

# Options
./run_tests.sh playback node --skip-build     # Skip build verification
./run_tests.sh live all --dry-run             # Dry run (see what would be executed)
./run_tests.sh all node --stop-on-failure     # Stop on first failure (for 'all' mode)
./run_tests.sh record all --log my-tests.log  # Save output to a custom log file
```

### Script Features

- **Pre-flight checks**: Verifies package is built, pnpm is available
- **Credential verification**: Checks for required environment variables (live/record modes)
- **Automatic .env sourcing**: Loads credentials from package root `.env`
- **Automatic build**: Builds the package if not already built
- **Sequential execution**: For 'all' mode, runs live → record → playback in order
- **Logging**: Saves output to timestamped log files
- **Multiple targets**: Run all tests, Node.js only, browser only, or specific files
- **Stop on failure**: Option to stop if any mode fails (for 'all' mode)
- **Dry run**: See what would be executed without running

## Manual Execution

If you prefer to run tests manually without using the script:

```bash
cd sdk/contentunderstanding/ai-content-understanding

# Live mode
TEST_MODE=live pnpm test

# Record mode
TEST_MODE=record pnpm test

# Playback mode
TEST_MODE=playback pnpm test

# Or just (playback is default)
pnpm test
```

## Test Modes Explained

### Live Mode

- Runs tests against actual Azure services
- Validates real-world behavior
- Requires valid Azure credentials
- May incur costs
- Use for final validation before PR

### Record Mode

- Runs tests against actual Azure services
- Captures HTTP requests/responses to `recordings/` directory
- Sensitive data is automatically sanitized
- Requires valid Azure credentials
- Use when adding new tests or updating recordings

### Playback Mode

- Uses pre-recorded HTTP interactions
- No Azure resources or credentials needed
- Fast execution
- Default mode when `TEST_MODE` is not set
- Use for quick validation and CI/CD

### All Modes

- Runs all three modes sequentially: live → record → playback
- Comprehensive validation
- Ensures recordings are up-to-date
- Use before submitting a pull request

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

**Recordings not updating**

- Delete existing recording files before re-recording if needed
- Ensure you're running with `TEST_MODE=record` explicitly set

## Notes

- Live and record modes require valid Azure credentials and a provisioned Microsoft Foundry resource
- Live and record modes will make actual API calls and may incur costs
- Playback mode does not require credentials
- Recordings are automatically sanitized to remove sensitive data
- Review recordings before committing to ensure no sensitive data leaked
- Do NOT commit real keys to the repository
- Ensure `.env` is in your `.gitignore`
- Always run commands from the repository root (`azure-sdk-for-js/`) for install and build
- Use `pnpm` only — do not use `npm` or `yarn`

````
