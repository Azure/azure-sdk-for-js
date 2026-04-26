#!/usr/bin/env node
/**
 * Agentic Workflows Dashboard CLI (v1.0)
 *
 * Unified CLI for managing the Azure SDK agentic workflows dashboard.
 *
 * Commands:
 *   deploy  - Collect workflow runs and audit data → Azure Monitor
 *   prime   - Bootstrap audit data from GitHub API (no Azure dependency)
 *   status  - Display dashboard metrics in the terminal
 *
 * Design principles:
 *   - Single entry point with clear subcommands
 *   - Consistent options across commands
 *   - Fail-fast with actionable error messages
 *   - Exit codes: 0=success, 2=usage, 3=config, 4=auth, 5=data, 6=ingestion
 */

import { program } from "commander";
import { deployCommand } from "./commands/deploy.js";
import { primeCommand } from "./commands/prime.js";
import { statusCommand } from "./commands/status.js";

// Exit codes (consistent across all commands)
export const EXIT_SUCCESS = 0;
export const EXIT_USAGE_ERROR = 2;
export const EXIT_CONFIG_ERROR = 3;
export const EXIT_AUTH_ERROR = 4;
export const EXIT_DATA_ERROR = 5;
export const EXIT_INGESTION_ERROR = 6;

program
  .name("aw-dashboard")
  .description("Azure SDK Agentic Workflows Dashboard CLI")
  .version("1.0.0");

// Command: deploy
program
  .command("deploy")
  .description("Collect workflow runs and audit data, push to Azure Monitor")
  .option("-r, --repo <repo>", "Specific repo to process (owner/name)")
  .option("--repos <repos>", "Comma-separated list of repos")
  .option("-d, --days <n>", "Lookback period in days", "7")
  .option("-l, --limit <n>", "Max runs per workflow", "100")
  .option("--skip-audit", "Skip audit enrichment (collect runs only)")
  .option("--dry-run", "Validate without pushing to Azure Monitor")
  .option("-v, --verbose", "Verbose output")
  .addHelpText(
    "after",
    `
Environment variables:
  AZURE_MONITOR_DCE_ENDPOINT  Data Collection Endpoint URL
  AZURE_MONITOR_DCR_ID        Data Collection Rule ID
  AZURE_MONITOR_WORKSPACE_ID  Log Analytics Workspace ID (for audit queries)
  GITHUB_TOKEN                GitHub token (or use 'gh auth token')

Examples:
  $ aw-dashboard deploy --days 7 --verbose
  $ aw-dashboard deploy --repo Azure/azure-sdk-for-js --dry-run
  $ aw-dashboard deploy --skip-audit  # Runs only, no token usage
`,
  )
  .action(deployCommand);

// Command: prime
program
  .command("prime")
  .description("Bootstrap audit data from GitHub API (no Azure dependency)")
  .option("-r, --repo <repo>", "Specific repo to process (owner/name)")
  .option("--repos <repos>", "Comma-separated list of repos")
  .option("-d, --days <n>", "Lookback period in days", "7")
  .option("-l, --limit <n>", "Max runs to audit", "50")
  .option("--dry-run", "Validate without pushing to Azure Monitor")
  .option("-v, --verbose", "Verbose output")
  .addHelpText(
    "after",
    `
This command fetches audit data directly from GitHub API instead of
querying Azure Monitor for run inventory. Use it to:

  - Bootstrap a new dashboard deployment
  - Test audit enrichment without Azure credentials
  - Debug specific workflows or runs

Environment variables:
  AZURE_MONITOR_DCE_ENDPOINT  Data Collection Endpoint URL (for ingestion)
  AZURE_MONITOR_DCR_ID        Data Collection Rule ID (for ingestion)
  GITHUB_TOKEN                GitHub token (or use 'gh auth token')

Examples:
  $ aw-dashboard prime --days 3 --verbose
  $ aw-dashboard prime --repo Azure/azure-sdk-for-js --limit 10 --dry-run
`,
  )
  .action(primeCommand);

// Command: status
program
  .command("status")
  .description("Display dashboard metrics in the terminal")
  .option("-r, --repo <repo>", "Filter to specific repo (owner/name)")
  .option("-d, --days <n>", "Lookback period in days", "7")
  .option("--json", "Output as JSON")
  .option("-v, --verbose", "Show detailed breakdown")
  .addHelpText(
    "after",
    `
Queries Azure Monitor and displays key metrics:

  - Workflow run counts and success rates
  - Token usage and estimated costs
  - Audit coverage and staleness
  - Pipeline health indicators

Environment variables:
  AZURE_MONITOR_WORKSPACE_ID  Log Analytics Workspace ID

Examples:
  $ aw-dashboard status
  $ aw-dashboard status --repo Azure/azure-sdk-for-js --days 30
  $ aw-dashboard status --json | jq '.summary'
`,
  )
  .action(statusCommand);

program.parse();
