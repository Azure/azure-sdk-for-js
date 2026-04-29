# Agentic Workflows Dashboard

Track GitHub Copilot agentic workflows across Azure SDK repositories.

## What It Does

- **Collects** workflow run metadata and token usage from GitHub (Container Apps Job, every 6 hours)
- **Visualizes** success rates, costs, and trends (Azure Monitor Workbook)
- **CLI tools** for manual queries and bootstrapping

## Quick Start

```bash
# Install
npm install && npm run build

# View current metrics
node dist/cli.js status --verbose

# Manually trigger audit enrichment (for bootstrapping)
node dist/cli.js prime --repo Azure/azure-sdk-for-js --days 7
```

## Commands

| Command | Purpose |
|---------|---------|
| `status` | Query metrics from Azure Monitor |
| `prime` | Bootstrap audit data from GitHub API |
| `deploy` | Collect runs and audit data, push to Azure Monitor |
| `infra` | Deploy Azure infrastructure |

## Authentication

### Option 1: GitHub App (Recommended)

More secure with short-lived tokens. See [docs/GITHUB-APP-SETUP.md](docs/GITHUB-APP-SETUP.md).

```bash
az deployment group create ... \
  -p githubAppId=<APP_ID> \
  -p "githubAppPrivateKey=$(cat key.pem)" \
  -p githubAppInstallationId=<INSTALLATION_ID>
```

### Option 2: Personal Access Token

Simpler but uses a long-lived token.

```bash
az deployment group create ... \
  -p "githubToken=$(gh auth token)"
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `AZURE_MONITOR_DCE_ENDPOINT` | Data Collection Endpoint URL |
| `AZURE_MONITOR_DCR_ID` | Data Collection Rule ID |
| `AZURE_MONITOR_WORKSPACE_ID` | Log Analytics Workspace ID |
| `GITHUB_TOKEN` | GitHub PAT (legacy) |
| `GITHUB_APP_ID` | GitHub App ID (recommended) |
| `GITHUB_APP_PRIVATE_KEY` | GitHub App private key (from Key Vault) |
| `GITHUB_APP_INSTALLATION_ID` | GitHub App installation ID |

## Architecture

```
GitHub API (7 repos)
      │
      ▼
┌─────────────────────────────────────┐
│  Container Apps Job (every 6 hours) │
│  ├─ Collects workflow runs          │
│  │  └─ WorkflowRuns_CL              │
│  └─ Audits with gh aw audit         │
│     └─ WorkflowAudit_CL             │
└─────────────────────────────────────┘
      │
      ▼
Azure Monitor Workbook
```

### Components

| Resource | Purpose |
|----------|---------|
| **Container Apps Job** | Scheduled collector with `gh` CLI and `gh-aw` extension |
| **Azure Container Registry** | Hosts the collector Docker image |
| **Log Analytics Workspace** | Stores `WorkflowRuns_CL` and `WorkflowAudit_CL` tables |
| **Data Collection Endpoint/Rule** | Ingestion pipeline for custom logs |
| **Storage Account** | State tracking (deduplication) |

## Data

Two tables in Azure Monitor:

| Table | Contents | Collection |
|-------|----------|------------|
| `WorkflowRuns_CL` | Run metadata (status, duration, actor) | Automatic (6h) |
| `WorkflowAudit_CL` | Token usage, costs, model breakdown | Automatic (6h) |

See [docs/SCHEMA.md](docs/SCHEMA.md) for field definitions.

## Deployment

```bash
# Deploy all infrastructure (Container Apps Job + Azure Monitor)
node dist/cli.js infra

# After deployment, build and push the container image:
az acr build -r <acr-name> -t aw-collector:latest .
```

## Operations

### Trigger Manual Collection

```bash
az containerapp job start -n job-aw-collector-prod -g <resource-group>
```

### View Job Logs

```bash
az containerapp job execution list -n job-aw-collector-prod -g <resource-group>
```

### Rebuild Container Image

```bash
cd eng/tools/agentic-workflows-dashboard
az acr build -r <acr-name> -t aw-collector:latest .
```

## Monitored Repositories

Configured via Bicep parameter `monitoredRepositories` in `infra/main.bicep`.
Run `az deployment group show -g <rg> -n main --query properties.outputs.monitoredRepositories` to see current list.
