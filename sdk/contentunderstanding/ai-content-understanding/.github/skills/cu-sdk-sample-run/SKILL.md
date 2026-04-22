---
name: cu-sdk-sample-run
description: Run a specific sample for the Azure AI Content Understanding JavaScript SDK. Use when users want to run a particular sample like analyzeUrl.js or analyzeInvoice.js.
---

# Run a Specific Sample

Run a specific sample from the Azure AI Content Understanding JavaScript SDK.

> **[COPILOT INTERACTION MODEL]:** This skill is designed to be interactive. At each step marked with **[ASK USER]**, pause execution and prompt the user for input or confirmation before proceeding. Do NOT silently skip these prompts. Use the `ask_questions` tool when available.

## Prerequisites

- Node.js >= 20
- **Environment already set up** via the `cu-sdk-setup` skill (SDK tarball installed + `.env` configured)
- For prebuilt analyzers: model deployments configured (run `updateDefaults.js` first — also covered by `cu-sdk-setup`)

> **[ASK USER] Prerequisites check:**
> Before proceeding, verify the user's environment:
>
> 1. "Have you already set up your environment using the **`cu-sdk-setup`** skill (SDK tarball installed + `.env` configured)?" -- If no, hand off to that skill first.
> 2. "Have you run `updateDefaults.js` to configure model defaults?" -- If no and they want to use prebuilt analyzers, guide them to run it first.

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

### Step 1: Ensure Environment Is Set Up

> **[ASK USER] Environment check:**
> Ask: "Have you already set up your environment (built/installed the SDK tarball and configured `.env` with endpoint and credentials)?"
>
> - If **yes**: Proceed to Step 2 to pick a sample.
> - If **no**: Hand off to the **`cu-sdk-setup`** skill to walk through installation and `.env` configuration, then come back here.

For full environment setup — installing the SDK, creating `.env`, configuring authentication, and running `updateDefaults.js` — see the **`cu-sdk-setup`** skill.

Quick check that setup is complete:

```bash
cd sdk/contentunderstanding/ai-content-understanding
# Verify .env is present in the samples directory
test -f samples/v1/javascript/.env && echo "OK" || echo "Run cu-sdk-setup first"
```

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

### Step 2: Choose and Run the Sample

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

### After the Sample Runs — Review Results and Explain the Sample

After the sample completes, the skill **must** do the following for the user (do not skip):

1. **Show the terminal command to re-run this sample directly**, so the user can iterate without the skill. For example:
   ```bash
   cd samples/v1/javascript && node analyzeUrl.js
   # or for TypeScript samples:
   cd samples/v1/typescript && npx tsx src/analyzeUrl.ts
   ```
   Substitute `analyzeUrl` with the sample the user just ran.

2. **Briefly explain the key code concepts** demonstrated in the sample. Tailor the explanation to the specific sample; common concepts include:
   - **Client creation** — how the `ContentUnderstandingClient` is constructed (endpoint + `DefaultAzureCredential` or `AzureKeyCredential`)
   - **Analyzer selection** — which prebuilt (`prebuilt-documentSearch`, `prebuilt-invoice`, etc.) or custom analyzer is used and why
   - **Input type** — URL vs. binary stream vs. local file
   - **Result processing** — how the returned `AnalyzeResult` is traversed (pages, fields, contents)
   - **Content type casting** — e.g., narrowing `AnalyzedContent` to `AnalyzedDocumentContent` / `AnalyzedImageContent` / `AnalyzedAudioContent` / `AnalyzedVideoContent` when needed
   - **Long-running operations** — if the sample uses `getLongRunningPoller` / `pollUntilDone`

> **[ASK USER] Sample result:**
> Ask: "Did the sample run successfully?"
>
> - If yes: present the re-run command and the key-code explanation (above), then ask: "Would you like to run another sample, or are you all set?"
> - If no: help troubleshoot using the Troubleshooting section below. Common issues include missing `.env` configuration, tarball not installed, or model defaults not configured.

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
| `Permission denied` when running scripts                          | Make scripts executable: `chmod +x .github/skills/cu-sdk-sample-run/scripts/*.sh`        |

## Related Skills

- `cu-sdk-setup` — Interactive environment setup (install SDK, configure `.env`, run `updateDefaults.js`). Run this first if your environment is not yet set up.
- `cu-sdk-common-knowledge` — Domain knowledge for Content Understanding concepts

## Additional Resources

- [SDK README](../../../README.md) — Full SDK documentation
- [Samples directory](../../../samples/v1/javascript/) — JavaScript sample files
- [Product Documentation](https://learn.microsoft.com/azure/ai-services/content-understanding/)
