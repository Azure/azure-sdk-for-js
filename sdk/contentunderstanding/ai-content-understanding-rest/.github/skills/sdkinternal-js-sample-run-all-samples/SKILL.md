---
name: sdkinternal-js-sample-run-all-samples
description: "Run all JavaScript and TypeScript samples for the Azure AI Content Understanding SDK. Handles setup including building the package, packing it as a tarball, and installing it in sample directories."
---

## Purpose

This skill runs all JavaScript and TypeScript samples for the Azure AI Content Understanding SDK (`@azure-rest/ai-content-understanding`). It handles the complete workflow:

1. Installing repo dependencies
2. Building the package
3. Packing the package as a tarball and installing it in sample directories
4. Running the samples

## When to Use

Use this skill when:

- Testing all samples after making changes to the SDK
- Verifying that samples work with the local development version of the package
- Running samples locally before publishing

## Prerequisites

Before running samples, ensure:

1. The Azure AI Content Understanding SDK package is built
2. A `.env` file exists with required environment variables
3. The local package tarball is installed in the sample directories

**Important:** The samples directories are excluded from the pnpm workspace to avoid dependency conflicts. Use the setup script or install the tarball manually.

## .env File Location

The `run_samples_js.sh` script automatically searches up the directory tree for a `.env` file (stopping at the package root). Simply place a `.env` file in the package root directory with the required environment variables, and it will be sourced when running samples from any subdirectory.

## Setup Instructions

### 1. Build the Package

Build the package and all its dependencies:

```bash
cd /path/to/azure-sdk-for-js
pnpm turbo build --filter=@azure-rest/ai-content-understanding... --token 1
```

### 2. Set Up .env File

Create a `.env` file in the package root directory:

```bash
CONTENTUNDERSTANDING_ENDPOINT="https://<your-resource>.services.ai.azure.com/"
CONTENTUNDERSTANDING_KEY="<your-api-key>"
# Add other required environment variables
```

The `run_samples_js.sh` script will automatically find and source this file when running samples.

### 3. Install Package in Sample Directories

Pack the package and install the tarball in both TypeScript and JavaScript sample directories:

```bash
# Pack the package
cd sdk/contentunderstanding/ai-content-understanding-rest
pnpm pack --pack-destination /tmp

# Install in TypeScript samples
cd samples/v1-beta/typescript
npm install --no-save --no-package-lock /tmp/azure-rest-ai-content-understanding-*.tgz

# Install in JavaScript samples
cd ../javascript
npm install --no-save --no-package-lock /tmp/azure-rest-ai-content-understanding-*.tgz
```

### 4. Run the Samples

Use the provided script to run samples:

```bash
cd sdk/contentunderstanding/ai-content-understanding-rest/.github/skills/sdkinternal-js-sample-run-all-samples/scripts
./run_samples_js.sh all
```

## Script Usage

The `run_samples_js.sh` script supports multiple modes:

```bash
# Run all JS and TS samples
./run_samples_js.sh all

# Run only JavaScript samples
./run_samples_js.sh js

# Run only TypeScript samples
./run_samples_js.sh ts

# Run samples from samples-dev directory
./run_samples_js.sh samples-dev

# Run a specific file
./run_samples_js.sh path/to/sample.js

# Dry run (see what would be executed)
./run_samples_js.sh all --dry-run

# Save output to a custom log file
./run_samples_js.sh all --log my-samples.log
```

## Environment Variables

Samples require environment variables to connect to Azure services. The script automatically searches up the directory tree for `.env` files (stopping at the package root).

Simply place a `.env` file in the package root with:

```bash
CONTENTUNDERSTANDING_ENDPOINT="https://<your-resource>.services.ai.azure.com/"
CONTENTUNDERSTANDING_KEY="<your-api-key>"
# Add other required environment variables for your samples
```

## Troubleshooting

**"Cannot find module '@azure-rest/ai-content-understanding'"**

- Ensure the package is built: `pnpm turbo build --filter=@azure-rest/ai-content-understanding...`
- Ensure the tarball is installed: Run `npm install --no-save --no-package-lock /tmp/azure-rest-ai-content-understanding-*.tgz` in both sample directories
- Verify the installation with: `ls -la node_modules/@azure-rest/ai-content-understanding`

**"Missing environment variables"**

- Create a `.env` file in the samples directory with required variables
- The script will source the nearest `.env` file in the directory tree

**TypeScript errors when running samples**

- The script uses `tsx` (TypeScript Execute) for better ESM support
- If samples have TypeScript errors, fix them in the source files

## Complete Workflow

Here's the complete workflow from a clean state:

```bash
# 1. Install repo dependencies
cd /path/to/azure-sdk-for-js
pnpm install

# 2. Build the package
pnpm turbo build --filter=@azure-rest/ai-content-understanding... --token 1

# 3. Pack the package
cd sdk/contentunderstanding/ai-content-understanding-rest
pnpm pack --pack-destination /tmp

# 4. Install tarball in TypeScript samples
cd samples/v1-beta/typescript
npm install --no-save --no-package-lock /tmp/azure-rest-ai-content-understanding-*.tgz

# 5. Install tarball in JavaScript samples
cd ../javascript
npm install --no-save --no-package-lock /tmp/azure-rest-ai-content-understanding-*.tgz

# 6. Run all samples
cd ../../.github/skills/sdkinternal-js-sample-run-all-samples/scripts
./run_samples_js.sh all
```
