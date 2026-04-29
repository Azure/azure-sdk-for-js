# GitHub App Authentication

This guide explains how to use GitHub App authentication instead of a Personal Access Token (PAT) for the Agentic Workflows Collector.

## Why GitHub App?

| Feature | PAT | GitHub App |
|---------|-----|------------|
| Token lifetime | Until revoked | 1 hour (auto-renewed) |
| Permissions | User-scoped | Fine-grained per-repo |
| Audit trail | Limited | Full app activity logs |
| Rate limits | 5,000/hr | 5,000/hr per installation |
| Secret rotation | Manual | Automatic |

## Step 1: Create the GitHub App

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
