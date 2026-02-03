---
name: sdkinternal-js-sample-run-single-sample
description: "Run a single JavaScript or TypeScript sample for the Azure AI Content Understanding SDK. Useful for quick testing and debugging individual samples."
---

## Purpose

This skill runs a single JavaScript or TypeScript sample file for the Azure AI Content Understanding SDK (`@azure/ai-content-understanding`). Use this for quick iteration when developing or debugging a specific sample.

## When to Use

Use this skill when:

- Testing a specific sample after making changes
- Debugging a single sample that's failing
- Quick verification of a sample without running the full suite
- Developing a new sample iteratively

## Prerequisites

Before running a sample, ensure:

1. The Azure AI Content Understanding SDK package is built
2. A `.env` file exists with required environment variables
3. The local package tarball is installed in the sample directory (for samples in `samples/v1-beta/`)

**Note:** For samples in `samples-dev/`, the package is resolved from source via tsconfig paths, so no tarball installation is needed.

## .env File Location

The script automatically searches up the directory tree for a `.env` file (stopping at the package root). Place a `.env` file in the package root directory with the required environment variables.

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

### 3. Install Package in Sample Directories (for samples/v1-beta only)

For samples under `samples/v1-beta/`, pack and install the tarball:

```bash
cd sdk/contentunderstanding/ai-content-understanding
pnpm pack --pack-destination /tmp

# For TypeScript sample
cd samples/v1-beta/typescript
npm install --no-save --no-package-lock /tmp/azure-ai-content-understanding-*.tgz

# For JavaScript sample
cd ../javascript
npm install --no-save --no-package-lock /tmp/azure-ai-content-understanding-*.tgz
```

### 4. Run a Single Sample

Use the provided script to run a specific sample:

```bash
cd sdk/contentunderstanding/ai-content-understanding/.github/skills/sdkinternal-js-sample-run-single-sample/scripts
./run_single_sample.sh path/to/sample.ts
```

## Script Usage

The `run_single_sample.sh` script runs a single sample file:

```bash
# Run a TypeScript sample from samples-dev
./run_single_sample.sh ../../../../samples-dev/analyzeDocument.ts

# Run a JavaScript sample from samples/v1-beta
./run_single_sample.sh ../../../../samples/v1-beta/javascript/analyzeDocument.js

# Run a TypeScript sample from samples/v1-beta
./run_single_sample.sh ../../../../samples/v1-beta/typescript/src/analyzeDocument.ts

# Use absolute path
./run_single_sample.sh /path/to/azure-sdk-for-js/sdk/contentunderstanding/ai-content-understanding/samples-dev/analyzeDocument.ts

# Dry run (see what would be executed)
./run_single_sample.sh path/to/sample.ts --dry-run
```

## Supported File Types

- **`.js`** - JavaScript files, executed with `node`
- **`.ts`** - TypeScript files, executed with `tsx` for ESM support

## Environment Variables

Samples require environment variables to connect to Azure services. The script automatically searches up the directory tree for `.env` files (stopping at the package root).

```bash
CONTENTUNDERSTANDING_ENDPOINT="https://<your-resource>.services.ai.azure.com/"
CONTENTUNDERSTANDING_KEY="<your-api-key>"
```

## Troubleshooting

**"Cannot find module '@azure/ai-content-understanding'"**

- For `samples-dev/`: Ensure the package is built with `pnpm turbo build --filter=@azure/ai-content-understanding...`
- For `samples/v1-beta/`: Ensure the tarball is installed in the sample directory

**"File not found"**

- Check that the file path is correct (absolute or relative to current directory)
- Ensure the file extension is `.js` or `.ts`

**"Missing environment variables"**

- Create a `.env` file in the package root with required variables
- The script will source the nearest `.env` file in the directory tree

**TypeScript errors**

- The script uses `tsx` for TypeScript execution with ESM support
- Fix any TypeScript errors in the sample source file

## Example Workflow

Quick iteration on a single sample:

```bash
# 1. Navigate to the script directory
cd sdk/contentunderstanding/ai-content-understanding/.github/skills/sdkinternal-js-sample-run-single-sample/scripts

# 2. Run your sample
./run_single_sample.sh ../../../../samples-dev/analyzeDocument.ts

# 3. Make changes to the sample

# 4. Run again
./run_single_sample.sh ../../../../samples-dev/analyzeDocument.ts
```
