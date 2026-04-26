# Agentic Workflows Dashboard

Comprehensive tracking dashboard for all agentic workflows across Azure SDK repos.

## CLI

Three commands for the complete workflow:

```bash
# Deploy: Collect runs and audit data → Azure Monitor
aw-dashboard deploy --days 7 --verbose

# Prime: Bootstrap audit data from GitHub API (no Azure inventory needed)
aw-dashboard prime --repo Azure/azure-sdk-for-js --limit 50

# Status: Display metrics in terminal
aw-dashboard status --days 30 --verbose
```

## Quick Start

```bash
# 1. Install and build
npm install && npm run build

# 2. Verify prerequisites
gh auth status          # GitHub CLI logged in
gh aw --help            # gh-aw extension installed

# 3. Dry run (no Azure credentials needed)
node dist/cli.js deploy --dry-run --verbose

# 4. For live mode
az login  # or use managed identity
export AZURE_MONITOR_DCE_ENDPOINT="https://..."
export AZURE_MONITOR_DCR_ID="dcr-..."
export AZURE_MONITOR_WORKSPACE_ID="..."  # for status command
node dist/cli.js deploy --days 7

# 5. View metrics
node dist/cli.js status --verbose
```

## Commands

### `deploy`

Collects workflow runs from GitHub API and optionally enriches with audit data.

```bash
aw-dashboard deploy [options]

Options:
  -r, --repo <repo>   Specific repo (owner/name)
  -d, --days <n>      Lookback period (default: 7)
  -l, --limit <n>     Max runs per workflow (default: 100)
  --skip-audit        Skip audit enrichment
  --dry-run           Validate without Azure ingestion
  -v, --verbose       Detailed output
```

### `prime`

Bootstrap audit data directly from GitHub API. Use when:
- Setting up a new dashboard
- Testing without Azure Monitor inventory
- Debugging specific runs

```bash
aw-dashboard prime [options]

Options:
  -r, --repo <repo>   Specific repo (owner/name)
  -d, --days <n>      Lookback period (default: 7)
  -l, --limit <n>     Max runs to audit (default: 50)
  --dry-run           Validate without Azure ingestion
  -v, --verbose       Detailed output
```

### `status`

Query Azure Monitor and display dashboard metrics in the terminal.

```bash
aw-dashboard status [options]

Options:
  -r, --repo <repo>   Filter to specific repo
  -d, --days <n>      Lookback period (default: 7)
  --json              Output as JSON
  -v, --verbose       Show per-repo breakdown
```

Output includes:
- Workflow run counts and success rates
- Token usage and estimated costs
- Audit coverage percentage
- Pipeline health (staleness indicators)

## Environment Variables

| Variable | Required For | Description |
|----------|-------------|-------------|
| `AZURE_MONITOR_DCE_ENDPOINT` | deploy, prime | Data Collection Endpoint URL |
| `AZURE_MONITOR_DCR_ID` | deploy, prime | Data Collection Rule ID |
| `AZURE_MONITOR_WORKSPACE_ID` | status | Log Analytics Workspace ID |
| `GITHUB_TOKEN` | all | GitHub token (or use `gh auth token`) |

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Success |
| 2 | Usage/argument error |
| 3 | Missing configuration |
| 4 | Authentication error |
| 5 | Data integrity error |
| 6 | Ingestion error |

## Architecture

```
Azure SDK Repos (.NET, JS, Go, Rust, Python, Java)
         │
         ▼
┌────────────────────────────────────────────────────────┐
│ Pipeline 1: Run Inventory (hourly)                     │
│  └── GitHub REST API for runs (fast, reliable)        │
│      └── Push to WorkflowRuns_CL                       │
└────────────────────────────────────────────────────────┘
         │
         ▼
┌────────────────────────────────────────────────────────┐
│ Pipeline 2: Audit Enrichment (daily, async)            │
│  └── gh aw audit on eligible completed runs            │
│      └── Push to WorkflowAudit_CL                      │
└────────────────────────────────────────────────────────┘
         │
         ▼
Azure Monitor / Log Analytics
  ├── WorkflowRuns_CL (run facts)
  ├── WorkflowAudit_CL (token/turn enrichment)
  └── Workbook Dashboards
```

## Implementation Progress

### Phase 1: Run Inventory ✅ COMPLETE
| Task | Status | Notes |
|------|--------|-------|
| Create types.ts | ✅ Done | WorkflowRunRecord, GitHubWorkflowRun interfaces |
| Create github.ts | ✅ Done | Octokit client with pagination |
| Create azure-monitor.ts | ✅ Done | LogsIngestionClient |
| Create collector.ts | ✅ Done | CLI with commander, transform logic |
| Create Bicep infrastructure | ✅ Done | DCE, DCR, Log Analytics, OIDC federation |
| Deploy to Azure | ✅ Done | 387 records ingested across 6 repos |
| Test cross-repo collection | ✅ Done | 18 workflows, 26s collection time |
| Create collector workflow | ✅ Done | `workflow-template.yml` |

### Phase 2: Dashboard & Workbook ✅ COMPLETE
| Task | Status | Notes |
|------|--------|-------|
| Create workbook template | ✅ Done | Azure Monitor Workbook in `infra/main.bicep` |
| Fleet overview panel | ✅ Done | Summary, success trend, by-repo breakdown |
| Reliability panel | ✅ Done | Duration, success rate, failures |
| Pipeline health indicator | ✅ Done | Shows data freshness/staleness |

### Phase 3: Cross-Repo & Backfill
| Task | Status | Notes |
|------|--------|-------|
| Cross-repo auth setup | ⬜ Pending | |
| Historical backfill | ✅ Done | `--backfill --days 30` |

### Phase 4: Audit Enrichment ✅ COMPLETE
| Task | Status | Notes |
|------|--------|-------|
| Audit pipeline | ✅ Done | `gh aw audit` integration with token usage |
| Token/turn visualizations | ✅ Done | Cost, cache, model breakdown in workbook |
| CLI with --help | ✅ Done | Commander-based with full help text |
| Per-repo filtering | ✅ Done | `--repo` and `--repos` options |
| Preflight checks | ✅ Done | Validates gh, gh aw, Azure credentials |

## Data Schema

### WorkflowRuns_CL (Core)
| Column | Type | Description |
|--------|------|-------------|
| TimeGenerated | datetime | Ingestion time |
| SchemaVersion | string | Schema version (1.0) |
| CollectorVersion | string | Collector version |
| Repository | string | e.g., "Azure/azure-sdk-for-js" |
| WorkflowName | string | e.g., "issue-triage" |
| WorkflowId | long | GitHub workflow ID |
| RunId | long | GitHub run ID |
| RunAttempt | int | Attempt number |
| UpdatedAt | datetime | Last update time |
| Status | string | queued, in_progress, completed |
| Conclusion | string | success, failure, cancelled, skipped |
| CreatedAt | datetime | Run created time |
| StartedAt | datetime | Run started time |
| CompletedAt | datetime | Run completed time |
| QueueTime_s | real | Time in queue (seconds) |
| Duration_s | real | Execution duration (seconds) |
| TriggerEvent | string | push, pull_request, issues, schedule |
| Actor | string | GitHub username |
| ActorType | string | User, Bot |
| HeadBranch | string | Branch name |
| HeadSha | string | Commit SHA |
| PullRequestNumber | int | PR number (null if not PR) |

### WorkflowAudit_CL (Enrichment)
| Column | Type | Description |
|--------|------|-------------|
| TimeGenerated | datetime | Audit time |
| Repository | string | Link to run |
| RunId | long | Link to run |
| InputTokens | long | Input token count |
| OutputTokens | long | Output token count |
| CacheReadTokens | long | Cached tokens |
| CacheHitRate | real | Cache efficiency |
| Turns | int | Agent turns |
| ToolCalls | int | Tool call count |
| ErrorCount | int | Errors |
| EngineId | string | copilot, claude, etc. |
| AwfVersion | string | AWF runtime version |

## Configuration

### Azure Infrastructure

Deploy the Bicep template to create all required Azure resources:

```bash
# Create resource group
az group create --name rg-agentic-workflows-dashboard --location eastus2

# Deploy infrastructure
az deployment group create \
  --resource-group rg-agentic-workflows-dashboard \
  --template-file infra/main.bicep \
  --parameters infra/main.parameters.json
```

The deployment creates:
- Log Analytics Workspace with `WorkflowRuns_CL` custom table
- Data Collection Endpoint (DCE)
- Data Collection Rule (DCR) 
- User-assigned Managed Identity with GitHub OIDC federation
- Required role assignments (Monitoring Metrics Publisher, Log Analytics Contributor)

### Environment Variables
| Variable | Description |
|----------|-------------|
| `GITHUB_TOKEN` | Token with actions:read on target repos |
| `AZURE_MONITOR_DCE_ENDPOINT` | Data Collection Endpoint URL |
| `AZURE_MONITOR_DCR_ID` | Data Collection Rule immutable ID |
| `AZURE_MONITOR_WORKSPACE_ID` | Log Analytics workspace ID (for audit inventory mode) |
| `AZURE_CLIENT_ID` | (For OIDC) Managed identity client ID |
| `AZURE_TENANT_ID` | (For OIDC) Azure AD tenant ID |

### Deployed Resources
```
Workspace:  law-agentic-workflows-prod-y4m2uw63wxtmo
DCE:        https://dce-agentic-workflows-prod-y4m2uw63wxtmo-pjpo.eastus2-1.ingest.monitor.azure.com
DCR ID:     dcr-b9c45405d84f4038bea1542ead5d2b33
Stream:     Custom-WorkflowRuns_CL
```

### Target Repos
```typescript
const TARGET_REPOS = [
  "Azure/azure-sdk-for-net",
  "Azure/azure-sdk-for-js", 
  "Azure/azure-sdk-for-go",
  "Azure/azure-sdk-for-rust",
  "Azure/azure-sdk-for-python",
  "Azure/azure-sdk-for-java",
];
```

## Sample Queries

```kusto
// Success rate by repository (last 7 days)
WorkflowRuns_CL
| where TimeGenerated > ago(7d)
| where Conclusion != "skipped"
| summarize 
    Total = count(),
    Successes = countif(Conclusion == "success"),
    Failures = countif(Conclusion == "failure")
    by Repository
| extend SuccessRate = round(100.0 * Successes / Total, 1)
| order by SuccessRate asc

// Workflow duration percentiles
WorkflowRuns_CL
| where TimeGenerated > ago(7d)
| where Duration_s > 0
| summarize 
    p50 = percentile(Duration_s, 50),
    p90 = percentile(Duration_s, 90),
    p99 = percentile(Duration_s, 99)
    by WorkflowName
| order by p90 desc

// Recent failures
WorkflowRuns_CL
| where TimeGenerated > ago(24h)
| where Conclusion == "failure"
| project TimeGenerated, Repository, WorkflowName, Actor, RunUrl
| order by TimeGenerated desc
```

## Files

- `src/collector.ts` - Main collector CLI script
- `src/types.ts` - TypeScript type definitions
- `src/github.ts` - GitHub API client (Octokit)
- `src/azure-monitor.ts` - Azure Monitor ingestion client
- `src/index.ts` - Module exports
- `workflow-template.yml` - GitHub Actions workflow (copy to .github/workflows/)
- `package.json` - Dependencies
- `tsconfig.json` - TypeScript config

## Testing

```bash
# Test run with 7-day lookback (collected 369 runs in 15.7s)
GITHUB_TOKEN=$(gh auth token) node dist/collector.js \
  --repo Azure/azure-sdk-for-js \
  --dry-run \
  --verbose \
  --lookback 168

# Output:
# 📊 COLLECTION SUMMARY
# Repos processed: 1
# Workflows found: 11
# Runs discovered: 369
# Runs ingested: 369
```
