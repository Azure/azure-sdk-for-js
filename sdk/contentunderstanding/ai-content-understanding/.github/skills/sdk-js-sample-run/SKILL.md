---
name: sdk-js-sample-run
description: Run a specific sample for the Azure AI Content Understanding JavaScript SDK. Use when users want to run a particular sample like analyzeUrl.js or analyzeInvoice.js.
---

# Run a Specific Sample

Run a specific sample from the Azure AI Content Understanding JavaScript SDK.

> **[COPILOT INTERACTION MODEL]:** This skill is designed to be interactive. At each step marked with **[ASK USER]**, pause execution and prompt the user for input or confirmation before proceeding. Do NOT silently skip these prompts. Use the `ask_questions` tool when available.

## Prerequisites

- Node.js >= 20
- Package built and tarball installed in sample directory (see setup below)
- Environment variables configured in `.env`
- For prebuilt analyzers: model deployments configured (run `updateDefaults.js` first)

> **[ASK USER] Prerequisites check:**
> Before proceeding, verify the user's environment:
>
> 1. "Have you already set up the samples environment and installed the SDK tarball?" -- If no, direct them to the Setup Instructions section below.
> 2. "Have you configured your `.env` file with your endpoint and credentials?" -- If no, direct them to the Credential Setup section below.
> 3. "Have you run `updateDefaults.js` to configure model defaults?" -- If no and they want to use prebuilt analyzers, guide them to run it first.

## Package Directory

```
sdk/contentunderstanding/ai-content-understanding
```

## Available Samples

JavaScript samples are in `samples/v1/javascript/`.

### Getting Started (Run These First)

#### `updateDefaults` -- Required First!

**One-time setup** - Configures model deployment mappings (GPT-4.1, GPT-4.1-mini, text-embedding-3-large) for your Microsoft Foundry resource. Must run before using prebuilt analyzers.

#### `analyzeUrl` -- Start Here!

Analyzes content from a URL using `prebuilt-documentSearch`. Works with documents, images, audio, and video.

- Key concepts: URL input, markdown extraction, multi-modal content

#### `analyzeBinary`

Analyzes local PDF/image files using `prebuilt-documentSearch`.

- Key concepts: Binary input, local file reading, page properties

### Document Analysis

#### `analyzeInvoice`

Extracts structured fields from invoices using `prebuilt-invoice`.

- Key concepts: Field extraction (customer name, totals, dates, line items), confidence scores, array fields

#### `analyzeConfigs`

Extracts advanced features: charts, hyperlinks, formulas, annotations.

- Key concepts: Chart.js output, LaTeX formulas, PDF annotations, enhanced analysis options

#### `analyzeReturnRawJson`

Gets raw JSON response for custom processing.

- Key concepts: Raw response access, saving to file, debugging

### Custom Analyzers

#### `createAnalyzer`

Creates custom analyzer with field schema for domain-specific extraction.

- Key concepts: Field types (string, number, date, object, array), extraction methods (extract, generate, classify)

#### `createClassifier`

Creates classifier to categorize documents (Loan_Application, Invoice, Bank_Statement).

- Key concepts: Content categories, segmentation, document routing

### Analyzer Management

#### `getAnalyzer`

Retrieves analyzer details and configuration.

#### `listAnalyzers`

Lists all available analyzers (prebuilt and custom).

#### `updateAnalyzer`

Updates analyzer description and tags.

#### `deleteAnalyzer`

Deletes a custom analyzer.

#### `copyAnalyzer`

Copies analyzer within the same resource.

#### `grantCopyAuth`

Cross-resource copying between different Azure resources/regions.

- Requires additional env vars: `CONTENTUNDERSTANDING_SOURCE_RESOURCE_ID`, `CONTENTUNDERSTANDING_SOURCE_REGION`, `CONTENTUNDERSTANDING_TARGET_ENDPOINT`, `CONTENTUNDERSTANDING_TARGET_RESOURCE_ID`, `CONTENTUNDERSTANDING_TARGET_REGION`
- Uses `CONTENTUNDERSTANDING_ENDPOINT` as the source endpoint

### Result Management

#### `getResultFile`

Retrieves keyframe images from video analysis.

- Key concepts: Operation IDs, extracting generated files

#### `deleteResult`

Deletes analysis results for data cleanup.

- Key concepts: Result retention (24-hour auto-deletion), compliance

## Workflow

### Step 1: Navigate to Package Directory

```bash
cd sdk/contentunderstanding/ai-content-understanding
```

### Step 2: Set Up the Samples Environment

Run the setup script to install the SDK package and configure the samples directory:

```bash
.github/skills/sdk-js-sample-run/scripts/setup_samples.sh
```

By default, the script tries to install `@azure/ai-content-understanding` from npm. If the package isn't published yet, it automatically falls back to building locally and installing a tarball. It also copies `.env` to the samples folder so `node` can load it directly. If no `.env` exists yet, it will automatically create one from `sample.env` as a starting template.

Use `--local` to force the local build + tarball path (e.g., when testing local source changes):

```bash
.github/skills/sdk-js-sample-run/scripts/setup_samples.sh --local
```

> **[ASK USER] Help fill in `.env`:**
> If the setup script created `.env` from `sample.env` (or the user doesn't have one configured yet), offer to help populate it:
>
> Ask: "It looks like your `.env` was just created from `sample.env` and has placeholder values. Would you like me to help fill in the required variables now?"
>
> - If yes: Proceed to ask for each required value below, then write them into the `.env` file.
> - If no: Remind them to edit `.env` manually before running samples, and skip to Step 3.
>
> **Required variables to ask for:**
>
> 1. Ask: "Please provide your **Microsoft Foundry endpoint URL** (e.g., `https://<your-resource-name>.services.ai.azure.com/`)."
>    → Write the value to `CONTENTUNDERSTANDING_ENDPOINT` in `.env`.
> 2. Ask: "How would you like to **authenticate**?"
>    - **DefaultAzureCredential (recommended)** — No key needed. Make sure you've run `az login`.
>    - **API Key** — Provide your key from Azure Portal → Foundry resource → Keys and Endpoint.
>      → If API Key: write the value to `CONTENTUNDERSTANDING_KEY` in `.env`.
>      → If DefaultAzureCredential: leave `CONTENTUNDERSTANDING_KEY` empty.
> 3. Ask: "What are your **model deployment names**? (Press enter to accept defaults)"
>    - GPT-4.1 deployment name (default: `gpt-4.1`) → Write to `GPT_4_1_DEPLOYMENT`
>    - GPT-4.1-mini deployment name (default: `gpt-4.1-mini`) → Write to `GPT_4_1_MINI_DEPLOYMENT`
>    - text-embedding-3-large deployment name (default: `text-embedding-3-large`) → Write to `TEXT_EMBEDDING_3_LARGE_DEPLOYMENT`
>
> After filling in values, copy the updated `.env` to the samples directory:
>
> ```bash
> cp sdk/contentunderstanding/ai-content-understanding/.env sdk/contentunderstanding/ai-content-understanding/samples/v1/javascript/.env
> ```
>
> Then summarize the configuration (masking any API key) and ask: "Does this look correct?"

<details>
<summary>Manual setup (alternative)</summary>

```bash
# 1. Build the package (from repo root)
pnpm turbo build --filter=@azure/ai-content-understanding... --token 1

# 2. Pack and install tarball
cd sdk/contentunderstanding/ai-content-understanding
pnpm pack --pack-destination /tmp
cd samples/v1/javascript
npm install --no-save --no-package-lock /tmp/azure-ai-content-understanding-*.tgz

# 3. Copy .env so samples can load it via dotenv
cp ../../.env .env
```

</details>

> **[ASK USER] Setup check:**
> Ask: "Have you already set up the samples environment (built the package and installed the tarball)?"
>
> - If yes: Skip to Step 3.
> - If no: Run the setup script or follow the manual steps above.

### Step 3: Configure Credentials

> **[ASK USER] Configuration check:**
> Ask the user: "Do you already have `.env` configured with your endpoint and credentials?"
>
> - If yes: Skip to Step 4.
> - If no: Guide them through the Credential Setup section below.

Create a `.env` file in the package root directory (`sdk/contentunderstanding/ai-content-understanding/`):

```bash
CONTENTUNDERSTANDING_ENDPOINT="https://your-foundry.services.ai.azure.com/"
CONTENTUNDERSTANDING_KEY=""

GPT_4_1_DEPLOYMENT="gpt-4.1"
GPT_4_1_MINI_DEPLOYMENT="gpt-4.1-mini"
TEXT_EMBEDDING_3_LARGE_DEPLOYMENT="text-embedding-3-large"
```

> **[ASK USER] Provide endpoint:**
> Ask the user: "Please provide your **Microsoft Foundry endpoint URL**."
>
> - It should look like: `https://<your-resource-name>.services.ai.azure.com/`
> - If the user does not know where to find it: direct them to Azure Portal → Their Foundry resource → Keys and Endpoint.

> **[ASK USER] Authentication method:**
> Ask the user: "How would you like to **authenticate** with Azure?"
>
> - **Option A: DefaultAzureCredential (recommended)** -- Uses `az login` or managed identity. No API key needed. Make sure you have run `az login`.
> - **Option B: API Key** -- Provide your `CONTENTUNDERSTANDING_KEY` from the Azure Portal → Keys and Endpoint → Key1 or Key2.

> **[ASK USER] Confirm .env:**
> After writing the file, summarize the configuration values (masking any API key) and ask: "Does this configuration look correct?" Wait for confirmation before proceeding.

#### Settings by sample

| Setting                             | Required By            | Description                                                                                                  |
| ----------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------ |
| `CONTENTUNDERSTANDING_ENDPOINT`     | **All samples**        | Your Microsoft Foundry resource endpoint URL                                                                 |
| `CONTENTUNDERSTANDING_KEY`          | All samples (optional) | API key for key-based auth. If empty, `DefaultAzureCredential` is used (recommended -- run `az login` first) |
| `GPT_4_1_DEPLOYMENT`                | updateDefaults         | Deployment name for gpt-4.1 model (default: `gpt-4.1`)                                                       |
| `GPT_4_1_MINI_DEPLOYMENT`           | updateDefaults         | Deployment name for gpt-4.1-mini model (default: `gpt-4.1-mini`)                                             |
| `TEXT_EMBEDDING_3_LARGE_DEPLOYMENT` | updateDefaults         | Deployment name for text-embedding-3-large model (default: `text-embedding-3-large`)                         |

| `CONTENTUNDERSTANDING_SOURCE_RESOURCE_ID` | grantCopyAuth | Source ARM resource ID for cross-resource copy |
| `CONTENTUNDERSTANDING_SOURCE_REGION` | grantCopyAuth | Source region (e.g., `eastus`) for cross-resource copy |
| `CONTENTUNDERSTANDING_TARGET_ENDPOINT` | grantCopyAuth | Target Foundry resource endpoint for cross-resource copy |
| `CONTENTUNDERSTANDING_TARGET_RESOURCE_ID` | grantCopyAuth | Target ARM resource ID for cross-resource copy |
| `CONTENTUNDERSTANDING_TARGET_REGION` | grantCopyAuth | Target region (e.g., `westus`) for cross-resource copy |

#### Samples that need a local file

The `analyzeBinary` and `analyzeConfigs` samples require a local document file. The sample includes a default file path to a test PDF. To use your own file, update the `filePath` variable in the sample code.

> **[ASK USER] Local file (if applicable):**
> If the user chose a sample that requires a local file (analyzeBinary, analyzeConfigs), ask:
> "This sample requires a local document file. Would you like to:"
>
> - **Use the default test file** -- The sample has a built-in file path.
> - **Provide your own file** -- You'll need to update the `filePath` variable in the sample code.

#### Setting up grantCopyAuth cross-resource environment

The `grantCopyAuth` sample requires **two separate Microsoft Foundry resources** (source and target).

Add the following to your `.env`:

```bash
# Source is your CONTENTUNDERSTANDING_ENDPOINT (already configured above)
CONTENTUNDERSTANDING_SOURCE_RESOURCE_ID="/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.CognitiveServices/accounts/{sourceAccountName}"
CONTENTUNDERSTANDING_SOURCE_REGION="eastus"
CONTENTUNDERSTANDING_TARGET_ENDPOINT="https://your-target-foundry.services.ai.azure.com/"
CONTENTUNDERSTANDING_TARGET_RESOURCE_ID="/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.CognitiveServices/accounts/{targetAccountName}"
CONTENTUNDERSTANDING_TARGET_REGION="swedencentral"
```

> **[ASK USER] Cross-resource setup (grantCopyAuth only):**
> If the user chose grantCopyAuth, ask:
>
> 1. "Do you have **two separate Microsoft Foundry resources** (source and target) set up?" -- If no, guide them to create a second resource.
> 2. "Your `CONTENTUNDERSTANDING_ENDPOINT` will be used as the **source endpoint**. Please provide the following for your **source** resource:" -- Source ARM Resource ID, Source region
> 3. "Please provide the following for your **target** resource:" -- Target endpoint URL, Target ARM Resource ID, Target region
> 4. Confirm: "Cross-resource copy works with both `DefaultAzureCredential` and API keys. Both resources must have the **Cognitive Services User** role assigned if using `DefaultAzureCredential`. Is this configured?"

### Step 4: Choose and Run the Sample

> **[ASK USER] Which sample?:**
> Ask the user: "Which sample would you like to run?" with options:
>
> - `updateDefaults` -- Configure model defaults (one-time setup, required first)
> - `analyzeUrl` -- Analyze content from a URL (recommended for first-time users)
> - `analyzeBinary` -- Analyze a local PDF/image file
> - `analyzeInvoice` -- Extract structured fields from an invoice
> - `createAnalyzer` -- Create a custom analyzer
> - Other -- Let me see the full list

Run the sample directly with `node` from the samples directory:

```bash
cd samples/v1/javascript
node <sampleName>.js
```

**Examples:**

```bash
cd samples/v1/javascript
node analyzeUrl.js
node analyzeBinary.js
node analyzeInvoice.js
```

> **Note:** Samples use `dotenv/config` to load environment variables from a `.env` file in the **current working directory**.
> The `setup_samples.sh` script automatically copies `.env` from the package root into the samples folder.
> If you update your `.env`, re-run `setup_samples.sh` or manually copy it:
>
> ```bash
> cp sdk/contentunderstanding/ai-content-understanding/.env sdk/contentunderstanding/ai-content-understanding/samples/v1/javascript/.env
> ```
>
> Alternatively, use the `run_single_sample.sh` convenience script which sources `.env` automatically.

> **[ASK USER] Sample result:**
> After running the sample, ask: "Did the sample run successfully?"
>
> - If yes: "Would you like to run another sample, or are you all set?"
> - If no: Help troubleshoot using the Troubleshooting section below. Common issues include missing `.env` configuration, tarball not installed, or model defaults not configured.

> **[ASK USER] Run another?:**
> If the user wants to run another sample, loop back to the "Which sample?" prompt above.

## Quick Reference

### Most Common Samples for New Users

1. **First-time setup** (run once per Foundry resource):

   ```bash
   cd samples/v1/javascript
   node updateDefaults.js
   ```

2. **Analyze a document from URL:**

   ```bash
   cd samples/v1/javascript
   node analyzeUrl.js
   ```

3. **Analyze a local PDF file:**

   ```bash
   cd samples/v1/javascript
   node analyzeBinary.js
   ```

4. **Extract invoice fields:**
   ```bash
   cd samples/v1/javascript
   node analyzeInvoice.js
   ```

## Scripts

This skill includes helper scripts in the `scripts/` directory. The primary script is for **environment setup**; running samples should be done directly with `node`.

### `setup_samples.sh` -- Environment Setup (Primary Script)

Sets up the samples environment by installing the SDK package and copying `.env`. **This is the main script you should use.**

By default, tries `npm install` from the registry. If the package isn't published, falls back to local build + tarball automatically.

```bash
# Default: try npm, fall back to local build + tarball
./setup_samples.sh

# Force local build + tarball (e.g., testing local changes)
./setup_samples.sh --local

# Local mode: skip build if already built
./setup_samples.sh --local --skip-build

# Local mode: skip pnpm install at repo root
./setup_samples.sh --local --skip-pnpm-install
```

### `run_single_sample.sh` -- Env-Sourcing Convenience Wrapper

A thin wrapper that sources the `.env` file and then runs `node <sample>.js`. Useful only if your shell doesn't already have the environment variables exported. **Prefer running `node <sample>.js` directly** when your environment is already configured.

```bash
# Only needed if env vars are not already exported
./run_single_sample.sh analyzeUrl
./run_single_sample.sh analyzeInvoice.js

# Dry run (see what would be executed)
./run_single_sample.sh analyzeUrl --dry-run
```

## Troubleshooting

| Error                                                             | Solution                                                                                 |
| ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `Cannot find module '@azure/ai-content-understanding'`            | Run `setup_samples.sh` to build and install the package tarball in the samples directory |
| `Missing environment variables` / `CONTENTUNDERSTANDING_ENDPOINT` | Create a `.env` file in the package root with required variables                         |
| `Access denied` or authorization errors                           | Ensure **Cognitive Services User** role is assigned; check API key or run `az login`     |
| `Model deployment not found`                                      | Run `updateDefaults.js` first to configure model mappings                                |
| `File not found` for binary samples                               | Some samples need a local file path; check the `filePath` variable in the sample         |
| `Permission denied` when running scripts                          | Make scripts executable: `chmod +x .github/skills/sdk-js-sample-run/scripts/*.sh`        |

## Related Skills

- `sdkinternal-js-sample-run` -- Run all samples at once (internal)
- `sdkinternal-js-setup` -- Set up environment for the SDK
- `sdk-dotnet-sample-run` -- Run .NET SDK samples
- `sdk-py-sample-run` -- Run Python SDK samples

## Additional Resources

- [Samples README](../../../samples/README.md) -- Detailed sample descriptions with key concepts
- [SDK README](../../../README.md) -- Full SDK documentation
- [Product Documentation](https://learn.microsoft.com/azure/ai-services/content-understanding/)
