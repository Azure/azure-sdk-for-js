---
name: cu-sdk-setup
description: Guide SDK users through setting up their JavaScript / Node.js environment for Azure AI Content Understanding. Use this skill when users need help installing the SDK, configuring Azure resources, deploying required models, setting environment variables, or running samples.
---

# SDK User Environment Setup for Azure AI Content Understanding (JavaScript)

Set up your JavaScript / Node.js environment to use the Azure AI Content Understanding SDK and run samples.

> **[COPILOT INTERACTION MODEL]:** This skill is designed to be interactive. At each step marked with **[ASK USER]**, pause execution and prompt the user for input or confirmation before proceeding. Do NOT silently skip these prompts. Use the `ask_questions` tool when available.

## Prerequisites

Before starting, ensure you have:

- **Node.js 20 or later** installed
- An **Azure subscription** ([create one for free](https://azure.microsoft.com/free/))
- A **Microsoft Foundry resource** in a [supported region](https://learn.microsoft.com/azure/ai-services/content-understanding/language-region-support)

> **[COPILOT] Probe Node.js runtime first (before asking):**
> Do not take the user's word for it — run these checks, then report. This prevents silent failures later in `npm install`.
>
> ```bash
> # POSIX / WSL / macOS
> node --version 2>/dev/null
> npm --version 2>/dev/null
> ```
>
> ```powershell
> # Windows PowerShell
> node --version
> npm --version
> ```
>
> **Decision table:**
>
> | Finding                                           | Action                                                                             |
> | ------------------------------------------------- | ---------------------------------------------------------------------------------- |
> | `node v20+` and `npm` present                     | ✓ Good to go. Proceed to Step 1.                                                   |
> | Node missing or `< v20`                           | Report the finding, then go to the **[ASK USER] Node install choice** block below. |
> | `npm` missing (very rare — should ship with Node) | Reinstall Node.js LTS.                                                             |
>
> **[ASK USER] Node install choice (only when probe fails):**
> Ask the user: "Node.js is missing or older than v20. How would you like to proceed?"
>
> - **Option A: Install it for me** — Agent runs the platform-appropriate install command (see below), verifies, and continues.
> - **Option B: I'll install it myself** — Agent prints the install command for the user's platform and stops. User runs it, re-opens the terminal, and tells the agent to resume.
>
> **Default install commands (Option A):**
>
> - **macOS** → `brew install node` (requires Homebrew; if not installed, fall back to Option B)
> - **Debian / Ubuntu / WSL** → `curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - && sudo apt-get install -y nodejs`
> - **Windows** → `winget install OpenJS.NodeJS.LTS` (run in an elevated PowerShell if needed)
> - **Cross-platform via nvm** → `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash && nvm install --lts`
>
> The companion `setup_user_env.sh` / `setup_user_env.ps1` scripts already implement this probe + install flow automatically. Prefer running them rather than hand-rolling these steps.
>
> Report the detected Node version back to the user in one sentence before the `[ASK USER]` block below.

> **[ASK USER] Prerequisites Check:**
> After the probe above, confirm the remaining items:
>
> 1. "Do you already have a **Microsoft Foundry resource** set up in Azure?" — If no, jump to **Step 4** (Azure Resource Setup) first, then return here.
> 2. "Have you already deployed the required **AI models** (GPT-4.1, GPT-4.1-mini, text-embedding-3-large) in Microsoft Foundry?" — If no, include Step 4.3 and Step 5 in the workflow.

## Package Directory

```
sdk/contentunderstanding/ai-content-understanding
```

## Workflow

### Step 1: Navigate to Package Directory

```bash
cd sdk/contentunderstanding/ai-content-understanding
```

### Step 2: Install the SDK

> **[ASK USER] Installation mode:**
> Ask the user: "How would you like to install the SDK?"
>
> - **Option A: npm install (recommended)** — Installs the latest published version from the npm registry. Best for running samples or building Content Understanding-based applications.
> - **Option B: Local build + tarball (for SDK contribution)** — Builds the package from local source, packs a tarball, and installs it into the samples directory. Use this when contributing to the SDK or testing unpublished changes.

The companion script `setup_user_env.sh` / `setup_user_env.ps1` handles **both** paths automatically: it first tries `npm install` from the registry and falls back to a local `pnpm` build + tarball if the package is not yet published. It also writes `.env` and copies it into the samples directory.

**Option A: npm install (recommended, in your own project):**

```bash
npm install @azure/ai-content-understanding @azure/identity
```

**Option B: Local build + tarball (for SDK contribution):**

```bash
# From the package root
.github/skills/cu-sdk-setup/scripts/setup_user_env.sh --local
```

> **[COPILOT] Repeated-run behavior:**
> On repeated runs, if `@azure/ai-content-understanding` is already installed under `samples/v1/javascript/node_modules/`, the setup script may skip the install step. Only rerun the install commands when the package is missing or you want to force a refresh.

> **[ASK USER] Installation check:**
> After running the install commands, ask: "Did the installation complete without errors?" If the user reports errors (permissions, missing `pnpm` for Option B, build failure), help troubleshoot before continuing.

### Step 3: Configure Environment Variables

#### 3.1 Create `.env` (with safety check)

**Important:** This step copies the template without overwriting any existing `.env` file.

```bash
if [ -f ".env" ]; then
    echo "WARNING: .env file already exists - NOT overwriting"
    echo "If you want to start fresh, manually delete .env first: rm .env"
else
    cp sample.env .env
    echo "Created .env from sample.env"
    echo "Please edit .env and configure the required variables (see Step 3.2)"
fi
```

**For Windows PowerShell:**

```powershell
if (Test-Path ".env") {
    Write-Host "WARNING: .env file already exists - NOT overwriting"
    Write-Host "If you want to start fresh, manually delete .env first: Remove-Item .env"
} else {
    Copy-Item sample.env .env
    Write-Host "Created .env from sample.env"
    Write-Host "Please edit .env and configure the required variables (see Step 3.2)"
}
```

> **[ASK USER] Existing .env:**
> If a `.env` file already exists, ask: "A `.env` file already exists. Would you like to **keep** the existing one, or **start fresh** by deleting it and copying from `sample.env`?"

#### 3.2 Configure Required Variables

> **[ASK USER] Authentication method:**
> Ask the user: "How would you like to **authenticate** with Azure?"
>
> - **Option A: API Key** — You'll need your `CONTENTUNDERSTANDING_KEY` from the Azure Portal.
> - **Option B: DefaultAzureCredential (recommended)** — Uses `az login` or managed identity. No API key needed.
>
> Based on their choice, guide accordingly below.

> **[ASK USER] Provide endpoint:**
> Ask the user: "Please provide your **Microsoft Foundry endpoint URL**."
>
> - It should look like: `https://<your-resource-name>.services.ai.azure.com/`
> - Validate: it should NOT include `api-version` or other query parameters.
> - If the user doesn't know where to find it: direct them to Azure Portal → Their Foundry resource → Keys and Endpoint.

> **[ASK USER] Provide API key (if Option A):**
> If the user chose API Key authentication, ask: "Please provide your **API key** (`CONTENTUNDERSTANDING_KEY`)."
>
> - Found at: Azure Portal → Your Foundry resource → Keys and Endpoint → Key1 or Key2.
>
> If the user chose DefaultAzureCredential, remind them: "Make sure you've run `az login` to authenticate."

Open `.env` in your editor and set the following **required** variables:

| Variable                        | Description                                        | How to Get It                                                           |
| ------------------------------- | -------------------------------------------------- | ----------------------------------------------------------------------- |
| `CONTENTUNDERSTANDING_ENDPOINT` | Your Microsoft Foundry endpoint URL                | Azure Portal → Your Foundry resource → Keys and Endpoint                |
| `CONTENTUNDERSTANDING_KEY`      | API key (optional if using DefaultAzureCredential) | Azure Portal → Your Foundry resource → Keys and Endpoint → Key1 or Key2 |

**For running `updateDefaults.js` (one-time model configuration):**

> **[COPILOT] Probe existing model defaults on the Foundry resource:**
> Before asking the user for deployment names, probe what the resource already has configured. This avoids redundant prompting when the resource is already wired up. Use a raw HTTP call (curl + Azure CLI access token) so the probe works even when the SDK is not yet installed in the samples directory.
>
> ```bash
> EP="${CONTENTUNDERSTANDING_ENDPOINT%/}"
> APIVER="2025-11-01"
> if [ -n "${CONTENTUNDERSTANDING_KEY:-}" ]; then
>     RESP=$(curl -sS -w "\n%{http_code}" -H "Ocp-Apim-Subscription-Key: $CONTENTUNDERSTANDING_KEY" \
>         "$EP/contentunderstanding/defaults?api-version=$APIVER")
> else
>     TOKEN=$(az account get-access-token --resource https://cognitiveservices.azure.com --query accessToken -o tsv 2>/dev/null)
>     RESP=$(curl -sS -w "\n%{http_code}" -H "Authorization: Bearer $TOKEN" \
>         "$EP/contentunderstanding/defaults?api-version=$APIVER")
> fi
> CODE=$(printf '%s' "$RESP" | tail -n1)
> BODY=$(printf '%s' "$RESP" | sed '$d')
> # Parse with node (or jq); branch on $CODE first (200/401/403/other)
> ```
>
> Branch on the HTTP code + parsed body:
>
> | Code / state                                                                       | Meaning                               | Action                                                                                                                                                                                                                                                                |
> | ---------------------------------------------------------------------------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
> | `200` and all 3 keys (`gpt-4.1`, `gpt-4.1-mini`, `text-embedding-3-large`) present | **ALL_SET** — defaults already mapped | Show detected values; ask _"Detected existing defaults: gpt-4.1=`<A>`, gpt-4.1-mini=`<B>`, text-embedding-3-large=`<C>`. Use these? (Y/n)"_. On Y, prefill the 3 env vars and **skip Step 5** (defaults already configured). On n, fall through to per-model prompts. |
> | `200` and some but not all keys present                                            | **PARTIAL**                           | Prefill the ones that are set. Prompt for the missing ones. After Step 3 completes, run Step 5 to fill the gaps.                                                                                                                                                      |
> | `200` and no model defaults                                                        | **NONE**                              | Fall through to per-model prompts. Step 5 will configure them.                                                                                                                                                                                                        |
> | `401` or `403`                                                                     | **AUTH_ERROR**                        | Print: _"Probe unavailable (auth failed). If you're using DefaultAzureCredential, run `az login` and ensure the Cognitive Services User role is assigned. Continuing with manual entry."_ Fall through.                                                               |
> | other / connection failure                                                         | Unexpected                            | Print _"Probe failed (HTTP `<code>`). Continuing with manual entry."_ Fall through.                                                                                                                                                                                   |
>
> These labels describe the Step 4 defaults-probe result only. They are not the overall `setup_user_env` script process exit codes.
>
> The companion `setup_user_env.sh` / `setup_user_env.ps1` script implements this probe automatically and prefills the prompts.

> **[ASK USER] Model deployment names (only when probe did not yield all values):**
> For each model not already prefilled from the probe, ask with a sensible default:
>
> - "What is your **GPT-4.1** deployment name?" (default: `gpt-4.1`)
> - "What is your **GPT-4.1-mini** deployment name?" (default: `gpt-4.1-mini`)
> - "What is your **text-embedding-3-large** deployment name?" (default: `text-embedding-3-large`)
>
> If the user prefers to configure these later, let them know they can run `updateDefaults.js` (Step 5) anytime before using prebuilt analyzers.

| Variable                            | Description                                 | How to Get It                                                       |
| ----------------------------------- | ------------------------------------------- | ------------------------------------------------------------------- |
| `GPT_4_1_DEPLOYMENT`                | Your GPT-4.1 deployment name                | Microsoft Foundry → Deployments → Your GPT-4.1 deployment name      |
| `GPT_4_1_MINI_DEPLOYMENT`           | Your GPT-4.1-mini deployment name           | Microsoft Foundry → Deployments → Your GPT-4.1-mini deployment name |
| `TEXT_EMBEDDING_3_LARGE_DEPLOYMENT` | Your text-embedding-3-large deployment name | Microsoft Foundry → Deployments → Your embedding deployment name    |

#### 3.3 Copy `.env` into the Samples Directory

Samples use `dotenv/config` to load environment variables from the **current working directory**. Copy your `.env` into the samples folder so `node` can load it when running samples:

```bash
cp .env samples/v1/javascript/.env
```

> **Note:** The `setup_user_env.sh` script does this automatically. If you edit `.env` later, re-run the script with `--verify-only` to recheck, or manually re-copy.

#### 3.4 Validate Your Configuration

> **[ASK USER] Validate configuration:**
> After the user has provided all values, summarize the configuration (mask any API key) and ask them to confirm:
>
> ```
> Here's your configuration:
>   CONTENTUNDERSTANDING_ENDPOINT = <value>
>   Authentication: API Key / DefaultAzureCredential
>   GPT_4_1_DEPLOYMENT = <value>
>   GPT_4_1_MINI_DEPLOYMENT = <value>
>   TEXT_EMBEDDING_3_LARGE_DEPLOYMENT = <value>
>
> Does this look correct? (Yes / No — let me fix something)
> ```
>
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

| Analyzer Type                                                                                     | Required Models                      |
| ------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `prebuilt-documentSearch`, `prebuilt-imageSearch`, `prebuilt-audioSearch`, `prebuilt-videoSearch` | gpt-4.1-mini, text-embedding-3-large |
| Other prebuilt analyzers (invoice, receipt, etc.)                                                 | gpt-4.1, text-embedding-3-large      |

**To deploy a model:**

1. In Microsoft Foundry → **Deployments** → **Deploy model** → **Deploy base model**
2. Search and deploy: `gpt-4.1`, `gpt-4.1-mini`, `text-embedding-3-large`
3. Note deployment names (recommendation: use the model name as the deployment name)

> **[ASK USER] Models deployed:**
> Ask: "Have you deployed the required models? Please provide the **deployment names** you used for each:"
>
> - GPT-4.1 deployment name
> - GPT-4.1-mini deployment name
> - text-embedding-3-large deployment name
>
> Use these names to populate the `.env` file.

### Step 5: Configure Model Defaults (One-Time Setup)

> **[COPILOT] Skip condition:**
> If the Step 3.2 probe returned **ALL_SET** and the user accepted the detected values, defaults are already configured on the Foundry resource — skip this step and tell the user _"Your Foundry resource already has model defaults configured; skipping Step 5."_ Otherwise continue below.

> **[ASK USER] Run model defaults?:**
> Ask: "Would you like to run `updateDefaults.js` now to configure model defaults? This is a **one-time setup** per Microsoft Foundry resource. (Yes / Skip for now)"
>
> - If yes, ensure deployment name env vars are set, then run the script.
> - If no, let them know they'll need to run it before using prebuilt analyzers.

Run the configuration script to map deployed models to prebuilt analyzers:

```bash
cd samples/v1/javascript
node updateDefaults.js
```

This is a **one-time setup per Microsoft Foundry resource**.

### Step 6: Run Samples

> **[ASK USER] Which samples?:**
> Ask: "Which sample would you like to run first?" with options:
>
> - `analyzeBinary.js` — Analyze a local PDF (quickest; completes in under a minute)
> - `analyzeUrl.js` — Full demo: document + video + audio + image from URLs (runs several analyses; takes a few minutes, please be patient)
> - `analyzeInvoice.js` — Extract invoice fields
> - Other — Let me see the full list
> - Skip — I'll run samples on my own later
>
> If the user picks "Other", list available samples from the `samples/v1/javascript/` directory.
>
> **[COPILOT] Timing note (do not parrot verbatim to user):** `analyzeUrl.js` runs multiple sequential LROs (document + video + audio + image, with multiple content-range variants). Video/audio chapter generation is slow on the service side, so total runtime can be on the order of 15+ minutes today. Do not interpret quiet periods (no stdout for several minutes during a video/audio LRO) as a hang. Only consider killing if there is **no new stdout for 5+ minutes** AND no active HTTP traffic. When talking to the user, prefer phrasing like "takes a few minutes" or "please be patient" rather than citing exact large minute counts.

```bash
# From the samples directory (so dotenv/config picks up the local .env)
cd samples/v1/javascript

# Run a sample
node analyzeUrl.js
node analyzeBinary.js
```

Or use the sample-run helper script (sources `.env` automatically and supports running from anywhere):

```bash
.github/skills/cu-sdk-sample-run/scripts/run_sample.sh analyzeUrl
```

> **[ASK USER] Sample result:**
> After running a sample, ask: "Did the sample run successfully? Would you like to run another sample or are you all set?"

## Automated Setup Script (Linux/macOS/WSL)

Run the interactive setup script that handles all steps automatically:

```bash
# From the package directory
cd sdk/contentunderstanding/ai-content-understanding
.github/skills/cu-sdk-setup/scripts/setup_user_env.sh
```

The script will:

1. Probe and (optionally) install Node.js (>= 20).
2. Detect existing `.env` and ask before overwriting.
3. Probe the Foundry resource for existing model defaults and prefill prompts.
4. Collect endpoint, auth method, and model deployment names.
5. Write `.env` (gitignored) at the package root, preserving any existing keys.
6. Install the SDK in `samples/v1/javascript/` (npm registry, with local `pnpm` build + tarball fallback).
7. Copy `.env` into the samples directory so `dotenv/config` can load it.
8. Run a 5-step verification against the live endpoint.

Common flags:

- `--verify-only` — Skip install/config; just run the 5 checks.
- `--non-interactive` — No prompts; use existing `.env` / env vars / overrides.
- `--local` — Force local build + tarball (skip npm registry).
- `--endpoint URL` / `--api-key KEY` — Override prompts.

### Automated Setup Script (Windows)

```powershell
cd sdk/contentunderstanding/ai-content-understanding
.\.github\skills\cu-sdk-setup\scripts\setup_user_env.ps1
```

Same flags as the bash version (using PowerShell syntax: `-VerifyOnly`, `-NonInteractive`, `-Local`, `-Endpoint`, `-ApiKey`).

### Manual Quick Setup

If you prefer to run steps manually:

```bash
cd sdk/contentunderstanding/ai-content-understanding

# Copy sample.env if .env doesn't exist
if [ ! -f ".env" ]; then
    cp sample.env .env
    echo "Created .env - Please edit and configure required variables"
else
    echo "WARNING: .env already exists - skipping copy"
fi

# Install SDK in samples directory (npm registry path)
( cd samples/v1/javascript && npm install )

# Copy .env into samples so dotenv/config can load it
cp .env samples/v1/javascript/.env
```

## Troubleshooting

| Error                                                             | Solution                                                                                                                    |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `node: command not found`                                         | Install Node.js 20+ from [nodejs.org](https://nodejs.org/) or via `winget install OpenJS.NodeJS.LTS` / `brew install node`. |
| `Cannot find module '@azure/ai-content-understanding'`            | Run `setup_user_env.sh` to install (with automatic local-build fallback if not yet on npm).                                 |
| `Missing environment variables` / `CONTENTUNDERSTANDING_ENDPOINT` | Ensure `.env` exists in `samples/v1/javascript/` and is populated. Re-copy with `cp .env samples/v1/javascript/.env`.       |
| `Access denied due to invalid subscription key`                   | Verify `CONTENTUNDERSTANDING_ENDPOINT` URL is correct. Check API key or run `az login`.                                     |
| `Model deployment not found`                                      | Deploy required models in Microsoft Foundry. Run `updateDefaults.js`.                                                       |
| `Cognitive Services User role not assigned`                       | Add the role in Azure Portal → Your resource → Access Control (IAM).                                                        |
| `pnpm: command not found` (only on `--local` install path)        | Install with `npm install -g pnpm`.                                                                                         |

## Related Skills

- `cu-sdk-sample-run` - Run individual samples (including `updateDefaults` for model deployment setup)
- `cu-sdk-common-knowledge` - Domain knowledge for Content Understanding concepts

## Additional Resources

- [SDK README](../../../README.md) - Full documentation
- [Samples directory](../../../samples/v1/javascript/) - JavaScript sample files
- [Product Documentation](https://learn.microsoft.com/azure/ai-services/content-understanding/)
- [Prebuilt Analyzers](https://learn.microsoft.com/azure/ai-services/content-understanding/concepts/prebuilt-analyzers)
