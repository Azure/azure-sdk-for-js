# Sample Scripts for Azure AI Content Understanding SDK

This directory contains scripts to help you set up and run samples for the Azure AI Content Understanding SDK.

## Scripts

### `setup_samples.sh`

Sets up the samples environment by building the package, packing it as a tarball, and installing it in sample directories.

**Usage:**

```bash
# Run all setup steps (pnpm install, build, pack, install tarball)
./setup_samples.sh

# Skip building if already built
./setup_samples.sh --skip-build

# Skip pnpm install at repo root
./setup_samples.sh --skip-pnpm-install

# Show help
./setup_samples.sh --help
```

**What it does:**

1. **Installs repo dependencies** using `pnpm install` at the repo root
2. **Builds the package** and all its dependencies using Turborepo
3. **Packs the package** as a tarball and installs it in both TypeScript and JavaScript sample directories using `npm install --no-save`

**Important:** The samples directories are excluded from the pnpm workspace to avoid dependency conflicts. This script uses a tarball approach for reliable installation.

### .env File Handling

The `run_samples_js.sh` script automatically searches up the directory tree for a `.env` file (stopping at the package root). Place a `.env` file in the package root directory, and it will be sourced automatically when running samples.

### `run_samples_js.sh`

Runs JavaScript and TypeScript samples after setup is complete.

**Usage:**

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

# Show help
./run_samples_js.sh --help
```

## Complete Workflow

Here's the typical workflow for running samples:

```bash
# 1. Navigate to the scripts directory
cd sdk/contentunderstanding/ai-content-understanding/.github/skills/sdkinternal-js-sample-run-all-samples/scripts

# 2. Run the setup script (first time only)
./setup_samples.sh

# 3. Run the samples
./run_samples_js.sh all
```

## Environment Variables

Samples require environment variables to connect to Azure services. The `run_samples_js.sh` script automatically searches up the directory tree for a `.env` file (stopping at the package root).

Create a `.env` file in the package root directory:

```bash
CONTENTUNDERSTANDING_ENDPOINT="https://<your-resource>.services.ai.azure.com/"
CONTENTUNDERSTANDING_KEY="<your-api-key>"
# Add other required environment variables for your samples
```

## Manual Setup (Alternative)

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
```

## Troubleshooting

**"Cannot find module '@azure/ai-content-understanding'"**
- Run `./setup_samples.sh` to build and install the package
- Verify the installation with: `ls -la node_modules/@azure/ai-content-understanding` in the samples directory

**"Missing environment variables"**
- Create a `.env` file in the samples directory with required variables
- The script will source the nearest `.env` file in the directory tree

**"Permission denied" when running scripts**
- Make the scripts executable: `chmod +x setup_samples.sh run_samples_js.sh`

**TypeScript errors when running samples**
- The script uses `tsx` (TypeScript Execute) for better ESM support
- If samples have TypeScript errors, fix them in the source files

## After Making Changes to the SDK

When you make changes to the SDK source code:

1. Rebuild and reinstall the package:
   ```bash
   ./setup_samples.sh --skip-pnpm-install
   ```
   
2. Run the samples to test your changes:
   ```bash
   ./run_samples_js.sh all
   ```

## Directory Structure

```
sdk/contentunderstanding/ai-content-understanding/
├── .github/
│   └── skills/
│       └── sdkinternal-js-sample-run-all-samples/
│           ├── SKILL.md
│           └── scripts/
│               ├── README.md (this file)
│               ├── setup_samples.sh
│               └── run_samples_js.sh
├── samples/
│   └── v1-beta/
│       ├── javascript/  (excluded from pnpm workspace)
│       │   ├── package.json
│       │   └── *.js samples
│       └── typescript/  (excluded from pnpm workspace)
│           ├── package.json
│           └── *.ts samples
└── src/
    └── (SDK source code)
```
