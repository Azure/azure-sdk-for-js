# Sample Scripts for Azure AI Content Understanding JavaScript SDK

This directory contains scripts to help you set up and run JavaScript samples for the Azure AI Content Understanding SDK.

## Scripts

### `setup_samples.sh`

Sets up the samples environment by building the package, packing it as a tarball, and installing it in the JavaScript samples directory.

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
3. **Packs the package** as a tarball and installs it in the JavaScript samples directory using `npm install --no-save`

**Important:** The samples directory is excluded from the pnpm workspace to avoid dependency conflicts. This script uses a tarball approach for reliable installation.

### `run_single_sample.sh`

Sources the `.env` file and runs a single JavaScript sample with `node`. Useful when you don't want to manually source environment variables.

**Usage:**

```bash
# Run by sample name (looks up in samples/v1/javascript/)
./run_single_sample.sh analyzeUrl

# With .js extension (also works)
./run_single_sample.sh analyzeInvoice.js

# With full path (also works)
./run_single_sample.sh ../../../../samples/v1/javascript/analyzeUrl.js

# List available samples
./run_single_sample.sh --list

# Dry run (see what would be executed)
./run_single_sample.sh analyzeUrl --dry-run

# Show help
./run_single_sample.sh --help
```

## Running Samples Directly (Recommended)

The simplest way to run samples is directly with `node`:

```bash
cd sdk/contentunderstanding/ai-content-understanding/samples/v1/javascript
node analyzeUrl.js
```

The samples use `dotenv/config` to load environment variables from `.env` files. Place a `.env` file in the package root directory, and the samples will pick it up automatically.

## .env File

Create a `.env` file in the package root directory (`sdk/contentunderstanding/ai-content-understanding/`):

```bash
CONTENTUNDERSTANDING_ENDPOINT="https://<your-resource>.services.ai.azure.com/"
CONTENTUNDERSTANDING_KEY="<your-api-key>"
# Add other required environment variables for your samples
```

## Complete Workflow

Here's the typical workflow for running samples:

```bash
# 1. Navigate to the scripts directory
cd sdk/contentunderstanding/ai-content-understanding/.github/skills/sdk-js-sample-run/scripts

# 2. Run the setup script (first time only)
./setup_samples.sh

# 3. Run a sample directly
cd ../../../../samples/v1/javascript
node analyzeUrl.js

# Or use the helper script
cd ../../../.github/skills/sdk-js-sample-run/scripts
./run_single_sample.sh analyzeUrl
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

# 4. Install tarball in JavaScript samples
cd samples/v1/javascript
npm install --no-save --no-package-lock /tmp/azure-ai-content-understanding-*.tgz

# 5. Run a sample
node analyzeUrl.js
```

## Troubleshooting

**"Cannot find module '@azure/ai-content-understanding'"**

- Run `./setup_samples.sh` to build and install the package tarball
- Verify the installation with: `ls -la node_modules/@azure/ai-content-understanding` in the samples directory

**"Missing environment variables"**
- Create a `.env` file in the package root with required variables
- The samples use `dotenv/config` to load variables automatically
- The `run_single_sample.sh` script also sources `.env` via shell for extra reliability

**"Permission denied" when running scripts**
- Make the scripts executable: `chmod +x setup_samples.sh run_single_sample.sh`

**"Sample not found"**
- Run `./run_single_sample.sh --list` to see available samples
- Check that the sample name matches a `.js` file in `samples/v1/javascript/`

## After Making Changes to the SDK

When you make changes to the SDK source code:

1. Rebuild and reinstall the package:
   ```bash
   ./setup_samples.sh --skip-pnpm-install
   ```

2. Run a sample to test your changes:
   ```bash
   cd ../../../../samples/v1/javascript
   node analyzeUrl.js
   ```

## Directory Structure

```
sdk/contentunderstanding/ai-content-understanding/
├── .github/
│   └── skills/
│       └── sdk-js-sample-run/
│           ├── SKILL.md
│           └── scripts/
│               ├── README.md (this file)
│               ├── setup_samples.sh
│               └── run_single_sample.sh
├── samples/
│   └── v1/
│       └── javascript/  (excluded from pnpm workspace)
│           ├── package.json
│           └── *.js samples
└── src/
    └── (SDK source code)
```
