# GitHub App Authentication

This guide explains how to use GitHub App authentication instead of a Personal Access Token (PAT) for the Agentic Workflows Collector.

## Authentication Options

| Option | Security | Setup | Maintenance |
|--------|----------|-------|-------------|
| **1. EngSys Key Vault** | ⭐⭐⭐⭐⭐ | Request access | None |
| **2. Own GitHub App** | ⭐⭐⭐⭐ | Create App | Rotate keys |
| **3. PAT (legacy)** | ⭐⭐ | Create token | Rotate manually |

---

## Option 1: EngSys Key Vault Signing (Recommended)

Uses the shared **Azure SDK Automation** GitHub App with a non-exportable private key in the EngSys Key Vault. The private key never leaves Key Vault—it's only used for signing operations.

### Prerequisites

Request the EngSys team to grant your managed identity access:

**Email to:** AzSDKEngTeam@microsoft.com  
**Subject:** Request Key Vault Crypto User access for Agentic Workflows Dashboard

```
Hi EngSys team,

We're running the Agentic Workflows Dashboard (Container Apps Job) to monitor 
GitHub Copilot usage across Azure SDK repositories.

We'd like to use the Azure SDK Automation GitHub App (ID: 1086291) with Key Vault 
signing instead of managing our own credentials.

Could you please grant Key Vault Crypto User role on azuresdkengkeyvault to our 
managed identity?

  Principal ID: <get from Azure portal or `az identity show`>
  Identity Name: id-agentic-workflows-prod
  Resource Group: dealmaha-agentic-workflows
  Subscription: <your subscription>

This identity needs to call `az keyvault key sign` to generate JWTs for GitHub 
API authentication. It does NOT need to read or export the key.

Thanks!
```

### Deployment

Once access is granted:

```bash
az deployment group create \
  -g dealmaha-agentic-workflows \
  -f infra/main.bicep \
  -p deployContainerJob=true \
  -p nameSuffix=54ua3vksrntq4 \
  -p githubKvName=azuresdkengkeyvault \
  -p githubKvKeyName=azure-sdk-automation \
  -p githubAppId=1086291 \
  -p githubInstallationOwner=Azure
```

### How It Works

```
Container Job starts
    │
    ├─→ Authenticate to Azure (managed identity)
    │
    ├─→ Call Key Vault to SIGN JWT (key never leaves KV)
    │     └─ Uses CryptographyClient.sign("RS256", digest)
    │
    ├─→ Exchange JWT for installation token (1hr TTL)
    │     └─ POST /app/installations/{id}/access_tokens
    │
    └─→ Use token for GitHub API & gh CLI
```

---

## Option 2: Your Own GitHub App

If you can't use EngSys Key Vault, create your own GitHub App.

### Step 1: Create the GitHub App

1. Go to **GitHub → Settings → Developer settings → GitHub Apps → New GitHub App**

2. Fill in the basic info:
   - **Name:** `Azure SDK Agentic Workflows Collector` (must be unique)
   - **Homepage URL:** `https://github.com/Azure/azure-sdk-for-js`
   - **Webhook:** Uncheck "Active" (not needed)

3. Set **Repository permissions:**
   - **Actions:** Read-only ✓
   - **Metadata:** Read-only ✓ (required)

4. Set **Where can this GitHub App be installed?:**
   - Select "Only on this account" for org-internal use

5. Click **Create GitHub App**

## Step 2: Generate a Private Key

1. On the app's settings page, scroll to **Private keys**
2. Click **Generate a private key**
3. Save the downloaded `.pem` file securely

## Step 3: Install the App

1. Go to **Install App** in the left sidebar
2. Select the organization (e.g., `Azure`)
3. Choose **Only select repositories** and add:
   - `azure-sdk-for-js`
   - `azure-sdk-for-python`
   - `azure-sdk-for-net`
   - `azure-sdk-for-java`
   - `azure-sdk-for-go`
   - `azure-sdk-tools`
   - `azure-rest-api-specs`
4. Click **Install**
5. Note the **Installation ID** from the URL: `https://github.com/settings/installations/<INSTALLATION_ID>`

## Step 4: Gather Credentials

You need three values:

| Credential | Where to find |
|------------|---------------|
| **App ID** | GitHub App settings page → General → App ID |
| **Installation ID** | URL after installing: `/installations/<ID>` |
| **Private Key** | The `.pem` file downloaded in Step 2 |

## Step 5: Deploy with GitHub App Auth

```bash
# Read the private key
PRIVATE_KEY=$(cat path/to/private-key.pem)

# Deploy with GitHub App credentials
az deployment group create \
  -g dealmaha-agentic-workflows \
  -f infra/main.bicep \
  -p deployContainerJob=true \
  -p nameSuffix=54ua3vksrntq4 \
  -p githubAppId=<APP_ID> \
  -p "githubAppPrivateKey=$PRIVATE_KEY" \
  -p githubAppInstallationId=<INSTALLATION_ID>
```

The Bicep will:
1. Create a Key Vault and store the private key
2. Configure the Container Apps Job to use GitHub App auth
3. Grant the job's managed identity access to Key Vault secrets

## How It Works

```
Container Apps Job starts
    │
    ├─→ Load private key from Key Vault
    │
    ├─→ Generate JWT signed with private key
    │
    ├─→ Exchange JWT for installation token (1hr TTL)
    │
    └─→ Use token for GitHub API & gh CLI
```

The collector automatically:
- Generates a short-lived installation token at startup
- Uses it for all GitHub API calls
- Token expires after 1 hour (job typically completes in ~10 minutes)

## Migrating from PAT

To switch from PAT to GitHub App:

1. Create the GitHub App (Steps 1-4 above)
2. Deploy with the new parameters:
   ```bash
   az deployment group create \
     -g dealmaha-agentic-workflows \
     -f infra/main.bicep \
     -p githubAppId=<ID> \
     -p "githubAppPrivateKey=$KEY" \
     -p githubAppInstallationId=<INST_ID> \
     -p githubToken=''  # Clear old PAT
   ```
3. The job will automatically use GitHub App auth on next run

## Troubleshooting

### "Invalid JWT" Error

- Verify the App ID is correct
- Check the private key hasn't been regenerated (download new one if needed)
- Ensure the key is in PEM format with proper line breaks

### "Installation not found" Error

- Verify the Installation ID is correct
- Check the app is still installed on the target repos
- Ensure repositories haven't been removed from the installation

### Token Generation Fails

Check the container logs:
```kql
ContainerAppConsoleLogs_CL
| where ContainerJobName_s == "job-aw-collector-prod"
| where Log_s contains "GitHub App" or Log_s contains "token"
| project TimeGenerated, Log_s
```

## Security Considerations

1. **Private key storage:** The private key is stored in Azure Key Vault with RBAC
2. **No long-lived tokens:** Installation tokens expire in 1 hour
3. **Audit trail:** GitHub logs all API calls made by the app
4. **Minimal permissions:** Only Actions:read access is requested
