---
name: sdkinternal-js-sample-run
description: "Run JavaScript and TypeScript samples for the Azure AI Content Understanding SDK. Supports running all samples or a single sample for quick testing and debugging. Handles setup including building the package, packing it as a tarball, and installing it in sample directories."
---

## Purpose

This skill runs JavaScript and TypeScript samples for the Azure AI Content Understanding SDK (`@azure/ai-content-understanding`). It provides scripts for:

1. Installing repo dependencies
2. Building the package
3. Packing the package as a tarball and installing it in sample directories
4. Running all samples or a single sample

## When to Use

Use this skill when:

- Testing all samples after making changes to the SDK
- Testing a specific sample after making changes
- Debugging a single sample that's failing
- Quick verification of a sample without running the full suite
- Developing a new sample iteratively
- Verifying that samples work with the local development version of the package
- Running samples locally before publishing

## Prerequisites

Before running samples, ensure:

1. The Azure AI Content Understanding SDK package is built
2. A `.env` file exists with required environment variables
3. The local package tarball is installed in the sample directories (for `samples/v1-beta/`)

**Notes:**

- The samples directories are excluded from the pnpm workspace to avoid dependency conflicts. Use the setup script or install the tarball manually.
- For samples in `samples-dev/`, the package is resolved from source via tsconfig paths, so no tarball installation is needed.

## .env File Location

All scripts automatically search up the directory tree for a `.env` file (stopping at the package root). Simply place a `.env` file in the package root directory with the required environment variables, and it will be sourced when running samples from any subdirectory.

## Setup Instructions

### 1. Build the Package

Build the package and all its dependencies:

```bash
cd /path/to/azure-sdk-for-js
pnpm turbo build --filter=@azure/ai-content-understanding... --token 1
```

### 2. Set Up .env File

Create a `.env` file in the package root directory:

```bash
CONTENTUNDERSTANDING_ENDPOINT="https://<your-resource>.services.ai.azure.com/"
CONTENTUNDERSTANDING_KEY="<your-api-key>"
# Add other required environment variables
```

### 3. Install Package in Sample Directories

Pack the package and install the tarball in both TypeScript and JavaScript sample directories:

```bash
# Pack the package
cd sdk/contentunderstanding/ai-content-understanding
pnpm pack --pack-destination /tmp

# Install in TypeScript samples
cd samples/v1-beta/typescript
npm install --no-save --no-package-lock /tmp/azure-ai-content-understanding-*.tgz

# Install in JavaScript samples
cd ../javascript
npm install --no-save --no-package-lock /tmp/azure-ai-content-understanding-*.tgz
```

### 4. Run the Samples

Use the provided scripts to run samples:

```bash
cd sdk/contentunderstanding/ai-content-understanding/.github/skills/sdkinternal-js-sample/scripts

# Run all samples
./run_samples.sh all

# Or run a single sample
./run_single_sample.sh path/to/sample.ts
```

## Scripts

This skill includes three scripts in the `scripts/` directory:

### `setup_samples.sh` - Setup Script

Sets up the samples environment by building the package, packing it as a tarball, and installing it in sample directories.

```bash
# Run all setup steps (pnpm install, build, pack, install tarball)
./setup_samples.sh

# Skip building if already built
./setup_samples.sh --skip-build

# Skip pnpm install at repo root
./setup_samples.sh --skip-pnpm-install
```

### `run_samples.sh` - Run All Samples

Runs JavaScript and TypeScript samples after setup is complete. Supports multiple modes:

```bash
# Run all JS and TS samples
./run_samples.sh all

# Run only JavaScript samples
./run_samples.sh js

# Run only TypeScript samples
./run_samples.sh ts

# Run samples from samples-dev directory
./run_samples.sh samples-dev

# Run a specific file
./run_samples.sh path/to/sample.js

# Dry run (see what would be executed)
./run_samples.sh all --dry-run

# Save output to a custom log file
./run_samples.sh all --log my-samples.log
```

### `run_single_sample.sh` - Run Single Sample

Runs a single JavaScript or TypeScript sample file. Useful for quick testing and debugging.

```bash
# Run a TypeScript sample from samples-dev
./run_single_sample.sh ../../../../samples-dev/analyzeDocument.ts

# Run a JavaScript sample from samples/v1-beta
./run_single_sample.sh ../../../../samples/v1-beta/javascript/analyzeDocument.js

# Run a TypeScript sample from samples/v1-beta
./run_single_sample.sh ../../../../samples/v1-beta/typescript/src/analyzeDocument.ts

# Use absolute path
./run_single_sample.sh /path/to/azure-sdk-for-js/sdk/.../samples-dev/sample.ts

# Dry run (see what would be executed)
./run_single_sample.sh path/to/sample.ts --dry-run
```

**Supported file types:**

- `.js` - JavaScript files (executed with `node`)
- `.ts` - TypeScript files (executed with `tsx` for ESM support)

## Environment Variables

Samples require environment variables to connect to Azure services. All scripts automatically search up the directory tree for `.env` files (stopping at the package root).

Place a `.env` file in the package root with:

```bash
CONTENTUNDERSTANDING_ENDPOINT="https://<your-resource>.services.ai.azure.com/"
CONTENTUNDERSTANDING_KEY="<your-api-key>"
# Add other required environment variables for your samples
```

## Troubleshooting

**"Cannot find module '@azure/ai-content-understanding'"**

- For `samples-dev/`: Ensure the package is built with `pnpm turbo build --filter=@azure/ai-content-understanding...`
- For `samples/v1-beta/`: Ensure the tarball is installed with `npm install --no-save --no-package-lock /tmp/azure-ai-content-understanding-*.tgz` in both sample directories
- Verify the installation with: `ls -la node_modules/@azure/ai-content-understanding`

**"Missing environment variables"**

- Create a `.env` file in the package root with required variables
- The script will source the nearest `.env` file in the directory tree

**"File not found"**

- Check that the file path is correct (absolute or relative to current directory)
- Ensure the file extension is `.js` or `.ts`

**TypeScript errors when running samples**

- For `samples-dev/`: The script uses `tsx` for TypeScript execution with ESM support
- For `samples/v1-beta/typescript/`: The script builds with `npm run build` and runs compiled JS from `dist/`
- Fix any TypeScript errors in the sample source files

## Complete Workflow

Here's the recommended workflow:

```bash
# 1. Navigate to the scripts directory
cd sdk/contentunderstanding/ai-content-understanding/.github/skills/sdkinternal-js-sample/scripts

# 2. Run the setup script (handles install, build, pack, and tarball install)
./setup_samples.sh

# 3. Run all samples
./run_samples.sh all

# Or run a single sample for quick iteration
./run_single_sample.sh ../../../../samples-dev/analyzeDocument.ts
```

### Manual Setup (Alternative)

If you prefer to set up manually without using `setup_samples.sh`:

```bash
# 1. Install repo dependencies
cd /path/to/azure-sdk-for-js
pnpm install

# 2. Build the package
pnpm turbo build --filter=@azure/ai-content-understanding... --token 1

# 3. Pack the package
cd sdk/contentunderstanding/ai-content-understanding
pnpm pack --pack-destination /tmp

# 4. Install tarball in TypeScript samples
cd samples/v1-beta/typescript
npm install --no-save --no-package-lock /tmp/azure-ai-content-understanding-*.tgz

# 5. Install tarball in JavaScript samples
cd ../javascript
npm install --no-save --no-package-lock /tmp/azure-ai-content-understanding-*.tgz

# 6. Run all samples
cd ../../.github/skills/sdkinternal-js-sample/scripts
./run_samples.sh all
```
