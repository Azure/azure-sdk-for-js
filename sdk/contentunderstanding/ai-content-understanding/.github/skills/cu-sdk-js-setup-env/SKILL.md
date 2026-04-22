---
name: cu-sdk-js-setup-env
description: Interactive environment setup for the Azure AI Content Understanding JavaScript SDK. Installs the package, configures the `.env` file (endpoint, authentication, model deployments), and optionally runs the one-time `updateDefaults.js` configuration. Use when users need help setting up their JS environment before running samples.
---

# SDK User Environment Setup for Azure AI Content Understanding (JavaScript)

Set up your JavaScript/Node.js environment to use the Azure AI Content Understanding SDK and run samples.

> **[COPILOT INTERACTION MODEL]:** This skill is designed to be interactive. At each step marked with **[ASK USER]**, pause execution and prompt the user for input or confirmation before proceeding. Do NOT silently skip these prompts. Use the `ask_questions` tool when available.

## Prerequisites

Before starting, ensure you have:

- **Node.js 20 or later** installed (verify with `node --version`)
- **pnpm** installed globally (verify with `pnpm --version`; install via `npm install -g pnpm` if missing)
- An **Azure subscription** ([create one for free](https://azure.microsoft.com/free/))
- A **Microsoft Foundry resource** in a [supported region](https://learn.microsoft.com/azure/ai-services/content-understanding/language-region-support)

> **[ASK USER] Prerequisites Check:**
> Before proceeding, ask the user to confirm their prerequisites:
> 1. "Do you have **Node.js 20+** and **pnpm** installed?" — If no, guide them to install first.
> 2. "Do you already have a **Microsoft Foundry resource** set up in Azure?" — If no, jump to **Step 4** (Azure Resource Setup) first, then return here.
> 3. "Have you already deployed the required **AI models** (GPT-4.1, GPT-4.1-mini, text-embedding-3-large) in Microsoft Foundry?" — If no, include Step 4.3 and Step 5 in the workflow.

## Package Directory

```
sdk/contentunderstanding/ai-content-understanding
```

## Workflow

### Step 1: Navigate to Package Directory

```bash
cd sdk/contentunderstanding/ai-content-understanding
```

### Step 2: Install the SDK and Build

> **[ASK USER] Installation mode:**
> Ask the user: "How would you like to install the SDK?"
> - **Option A: npm install (recommended)** — Installs the latest published version from npm. Best for running samples or building Content Understanding-based applications.
> - **Option B: Local build + tarball (for SDK contribution / testing local changes)** — Builds the package from local source, packs a tarball, and installs it into the samples directory. Use when contributing to the SDK or testing unpublished changes.

**Option A: npm install (recommended, in your own project):**
```bash
npm install @azure/ai-content-understanding @azure/identity
```

**Option B: Local build + tarball (for SDK contribution or local testing):**

Use the provided setup script, which handles both paths. It tries `npm install` from the registry first and automatically falls back to a local build + tarball if the package is not yet published. It also copies `.env` from the package root into the samples directory so samples can load it via `dotenv`.

```bash
# From the package root (sdk/contentunderstanding/ai-content-understanding)
.github/skills/cu-sdk-js-sample-run/scripts/setup_samples.sh

# Force local build + tarball (e.g., when testing local source changes):
.github/skills/cu-sdk-js-sample-run/scripts/setup_samples.sh --local
```

> **[ASK USER] Setup check:**
> After running the script, ask: "Did the setup script complete without errors?" If the user reports errors (permissions, missing `pnpm`, build failure), help troubleshoot before continuing.

### Step 3: Configure Environment Variables

#### 3.1 Create `.env` (with safety check)

The setup script in Step 2 automatically creates `.env` from `sample.env` if it does not already exist. If you need to create one manually:

**For Linux/macOS (bash):**
```bash
if [ -f ".env" ]; then
    echo "WARNING: .env file already exists - NOT overwriting"
else
    cp sample.env .env
    echo "Created .env from sample.env"
fi
```

**For Windows PowerShell:**
```powershell
if (Test-Path ".env") {
    Write-Host "WARNING: .env file already exists - NOT overwriting"
} else {
    Copy-Item sample.env .env
    Write-Host "Created .env from sample.env"
}
```

> **[ASK USER] Existing .env:**
> If a `.env` file already exists, ask: "A `.env` file already exists. Would you like to **keep** the existing one, or **start fresh** by deleting it and copying from `sample.env`?"

#### 3.2 Configure Required Variables

> **[ASK USER] Authentication method:**
> Ask the user: "How would you like to **authenticate** with Azure?"
> - **Option A: DefaultAzureCredential (recommended)** — Uses `az login` or managed identity. No API key needed.
> - **Option B: API Key** — You'll need your `CONTENTUNDERSTANDING_KEY` from the Azure Portal.
>
> Based on their choice, guide accordingly below.

> **[ASK USER] Provide endpoint:**
> Ask the user: "Please provide your **Microsoft Foundry endpoint URL**."
> - It should look like: `https://<your-resource-name>.services.ai.azure.com/`
> - Validate: it should NOT include `api-version` or other query parameters.
> - If the user doesn't know where to find it: direct them to Azure Portal → Their Foundry resource → Keys and Endpoint.

> **[ASK USER] Provide API key (if Option B):**
> If the user chose API Key authentication, ask: "Please provide your **API key** (`CONTENTUNDERSTANDING_KEY`)."
> - Found at: Azure Portal → Your Foundry resource → Keys and Endpoint → Key1 or Key2.
>
> If the user chose DefaultAzureCredential, remind them: "Make sure you've run `az login` to authenticate."

Open `.env` in your editor and set the following variables:

| Variable | Description | How to Get It |
|----------|-------------|---------------|
| `CONTENTUNDERSTANDING_ENDPOINT` | Your Microsoft Foundry endpoint URL | Azure Portal → Your Foundry resource → Keys and Endpoint |
| `CONTENTUNDERSTANDING_KEY` | API key (optional if using DefaultAzureCredential) | Azure Portal → Your Foundry resource → Keys and Endpoint → Key1 or Key2 |

**For running `updateDefaults.js` (one-time model configuration):**

> **[ASK USER] Model deployment names:**
> Ask the user: "Do you want to configure **model deployment names** now? These are needed for `updateDefaults.js` (one-time setup)."
> - If yes, ask for each deployment name with sensible defaults:
>   - "What is your **GPT-4.1** deployment name?" (default: `gpt-4.1`)
>   - "What is your **GPT-4.1-mini** deployment name?" (default: `gpt-4.1-mini`)
>   - "What is your **text-embedding-3-large** deployment name?" (default: `text-embedding-3-large`)
> - If no, let them know they can configure these later before running `updateDefaults.js`.

| Variable | Description | How to Get It |
|----------|-------------|---------------|
| `GPT_4_1_DEPLOYMENT` | Your GPT-4.1 deployment name | Microsoft Foundry → Deployments → Your GPT-4.1 deployment name |
| `GPT_4_1_MINI_DEPLOYMENT` | Your GPT-4.1-mini deployment name | Microsoft Foundry → Deployments → Your GPT-4.1-mini deployment name |
| `TEXT_EMBEDDING_3_LARGE_DEPLOYMENT` | Your text-embedding-3-large deployment name | Microsoft Foundry → Deployments → Your embedding deployment name |

#### 3.3 Copy `.env` into the Samples Directory

Samples use `dotenv/config` to load environment variables from the **current working directory**. Copy your `.env` into the samples folder so `node` can load it when running samples:

```bash
cp .env samples/v1/javascript/.env
```

> **Note:** The `setup_samples.sh` script from Step 2 does this automatically. If you edit `.env` later, re-run `setup_samples.sh` or manually re-copy.

#### 3.4 Validate Your Configuration

> **[ASK USER] Validate configuration:**
> After the user has provided all values, summarize the configuration (masking any API key) and ask them to confirm:
> ```
> Here's your configuration:
>   CONTENTUNDERSTANDING_ENDPOINT = <value>
>   Authentication: DefaultAzureCredential / API Key
>   GPT_4_1_DEPLOYMENT = <value>
>   GPT_4_1_MINI_DEPLOYMENT = <value>
>   TEXT_EMBEDDING_3_LARGE_DEPLOYMENT = <value>
>
> Does this look correct? (Yes / No — let me fix something)
> ```
> Only write to `.env` after the user confirms.

**Example `.env` configuration:**
```bash
# Required for all samples
CONTENTUNDERSTANDING_ENDPOINT=https://my-foundry-resource.services.ai.azure.com/

# Optional: API key (if not set, DefaultAzureCredential is used)
CONTENTUNDERSTANDING_KEY=

# Required for updateDefaults.js (model configuration)
GPT_4_1_DEPLOYMENT=gpt-4.1
GPT_4_1_MINI_DEPLOYMENT=gpt-4.1-mini
TEXT_EMBEDDING_3_LARGE_DEPLOYMENT=text-embedding-3-large
```

### Step 4: Azure Resource Setup (if not done)

> **[NOTE]:** Only guide the user through this step if they indicated during the prerequisites check that they do NOT yet have a Microsoft Foundry resource. Otherwise, skip to Step 5.

If you haven't set up your Microsoft Foundry resource yet:

#### 4.1 Create Microsoft Foundry Resource

1. Go to [Azure Portal](https://portal.azure.com/)
2. Create a **Microsoft Foundry resource** in a [supported region](https://learn.microsoft.com/azure/ai-services/content-understanding/language-region-support)
3. Navigate to **Resource Management** > **Keys and Endpoint**
4. Copy the **Endpoint** URL and optionally a **Key**

> **[ASK USER] Resource created:**
> After guiding the user to create the resource, ask: "Have you created the Microsoft Foundry resource? Please share the **endpoint URL** so we can continue with configuration."

#### 4.2 Grant Cognitive Services User Role

This role is required even if you own the resource:

1. In your Foundry resource, go to **Access Control (IAM)**
2. Click **Add** > **Add role assignment**
3. Select **Cognitive Services User** role
4. Assign it to yourself

> **[ASK USER] Role assigned:**
> Ask: "Have you assigned the **Cognitive Services User** role to yourself? This is required even if you own the resource."

#### 4.3 Deploy Required Models

| Analyzer Type | Required Models |
|--------------|-----------------|
| `prebuilt-documentSearch`, `prebuilt-imageSearch`, `prebuilt-audioSearch`, `prebuilt-videoSearch` | gpt-4.1-mini, text-embedding-3-large |
| Other prebuilt analyzers (invoice, receipt, etc.) | gpt-4.1, text-embedding-3-large |

**To deploy a model:**
1. In Microsoft Foundry → **Deployments** → **Deploy model** → **Deploy base model**
2. Search and deploy: `gpt-4.1`, `gpt-4.1-mini`, `text-embedding-3-large`
3. Note deployment names (recommendation: use model name as deployment name)

> **[ASK USER] Models deployed:**
> Ask: "Have you deployed the required models? Please provide the **deployment names** you used for each:"
> - GPT-4.1 deployment name
> - GPT-4.1-mini deployment name
> - text-embedding-3-large deployment name
>
> Use these names to populate the `.env` file.

### Step 5: Configure Model Defaults (One-Time Setup)

> **[ASK USER] Run model defaults?:**
> Ask: "Would you like to run `updateDefaults.js` now to configure model defaults? This is a **one-time setup** per Microsoft Foundry resource. (Yes / Skip for now)"
> - If yes, ensure deployment name env vars are set, then run the script.
> - If no, let them know they'll need to run it before using prebuilt analyzers.

Run the configuration script to map deployed models to prebuilt analyzers:

```bash
cd samples/v1/javascript
node updateDefaults.js
```

This is a **one-time setup per Microsoft Foundry resource**.

### Step 6: Next — Run a Sample

After environment setup is complete, hand off to the `cu-sdk-js-sample-run` skill to pick and run a sample:

> **[ASK USER] Run a sample?:**
> Ask: "Environment is ready. Would you like to run a sample now? I can hand off to `cu-sdk-js-sample-run` to help you choose and run one."

## Troubleshooting

| Error | Solution |
|-------|----------|
| `node: command not found` | Install Node.js 20+ from [nodejs.org](https://nodejs.org/). |
| `pnpm: command not found` | Install with `npm install -g pnpm`. |
| `Cannot find module '@azure/ai-content-understanding'` | Run `setup_samples.sh` to install the tarball into the samples directory. |
| `Missing environment variables` / `CONTENTUNDERSTANDING_ENDPOINT` | Ensure `.env` exists in the samples directory and is populated. Re-copy with `cp .env samples/v1/javascript/.env`. |
| `Access denied due to invalid subscription key` | Verify `CONTENTUNDERSTANDING_ENDPOINT` URL is correct. Check API key or run `az login`. |
| `Model deployment not found` | Deploy required models in Microsoft Foundry. Run `updateDefaults.js`. |
| `Cognitive Services User role not assigned` | Add the role in Azure Portal → Your resource → Access Control (IAM). |

## Related Skills

- `cu-sdk-js-sample-run` — Run JavaScript SDK samples after environment is set up
- `cu-sdk-common-knowledge` — Domain knowledge for Content Understanding concepts

## Additional Resources

- [SDK README](../../../README.md) — Full documentation
- [Samples directory](../../../samples/v1/javascript/) — JavaScript sample files
- [Product Documentation](https://learn.microsoft.com/azure/ai-services/content-understanding/)
- [Prebuilt Analyzers](https://learn.microsoft.com/azure/ai-services/content-understanding/concepts/prebuilt-analyzers)
