---
name: sdkinternal-js-test-playback
description: "Run tests in playback mode using pre-recorded HTTP interactions. No Azure resources required."
---

## Purpose

This skill runs the test suite for the Azure AI Content Understanding SDK (`@azure-rest/ai-content-understanding`) in **playback mode**. Playback mode uses pre-recorded HTTP interactions stored in recording files, so no Azure resources or credentials are required.

## When to Use

Use this skill when:

- Running tests locally without Azure credentials
- Verifying that code changes don't break existing functionality
- Running tests in CI/CD pipelines without live Azure access
- Quick validation after code changes

## Prerequisites

Before running tests, ensure:

1. Dependencies are installed: `pnpm install`
2. The package is built: `pnpm turbo build --filter=@azure-rest/ai-content-understanding... --token 1`

No `.env` file or Azure credentials are required for playback mode.

## Instructions

Run all commands from the repository root directory (`azure-sdk-for-js/`):

1. **Install dependencies**: `pnpm install`
2. **Build the package**: `pnpm turbo build --filter=@azure-rest/ai-content-understanding... --token 1`
3. **Run tests in playback mode**:

   ```bash
   cd sdk/contentunderstanding/ai-content-understanding-rest
   pnpm test
   ```

   Or explicitly set playback mode:

   ```bash
   cd sdk/contentunderstanding/ai-content-understanding-rest
   TEST_MODE=playback pnpm test
   ```

## Example

```bash
cd /path/to/azure-sdk-for-js
pnpm install
pnpm turbo build --filter=@azure-rest/ai-content-understanding... --token 1
cd sdk/contentunderstanding/ai-content-understanding-rest
pnpm test
```

## Faster Iteration

For faster iteration, run only Node.js tests (skip browser tests):

```bash
cd sdk/contentunderstanding/ai-content-understanding-rest
pnpm test:node
```

## Using the Script

This skill includes a full-featured test runner script that handles pre-flight checks,
automatic builds, and logging.

### Script Location

```bash
sdk/contentunderstanding/ai-content-understanding-rest/.github/skills/sdkinternal-js-test-playback/scripts/run_tests.sh
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
- **Automatic build**: Builds the package if not already built
- **Logging**: Saves output to timestamped log files
- **Multiple modes**: Run all tests, Node.js only, browser only, or specific files
- **Dry run**: See what would be executed without running

## Notes

- Playback mode is the default test mode when `TEST_MODE` is not set
- Tests use pre-recorded HTTP interactions stored in `recordings/` directory
- No Azure resources or credentials are needed
- Always run commands from the repository root (`azure-sdk-for-js/`) for install and build
- Use `pnpm` only — do not use `npm` or `yarn`
