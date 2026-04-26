#!/usr/bin/env node
/**
 * Agentic Workflows Dashboard Collector (v23)
 * 
 * Collects workflow run metrics from Azure SDK repositories
 * and pushes them to Azure Monitor for dashboarding.
 * 
 * Key improvements:
 * - v23: UX consistency with audit script - exit codes, help text, fail-fast config
 */

import { program } from "commander";
import { GitHubClient } from "./github.js";
import { AzureMonitorClient, MockAzureMonitorClient } from "./azure-monitor.js";
import { MONITORED_REPOS, SCHEMA_VERSION, COLLECTOR_VERSION } from "./config.js";
import { validatePositiveInteger } from "./utils.js";
import type {
  CollectorConfig,
  CollectionSummary,
  GitHubWorkflowRun,
  WorkflowRunRecord,
} from "./types.js";

// v23: Exit codes (consistent with audit script)
export const EXIT_SUCCESS = 0;
export const EXIT_USAGE_ERROR = 2;
export const EXIT_CONFIG_ERROR = 3;
export const EXIT_AUTH_ERROR = 4;
export const EXIT_DATA_ERROR = 5;
export const EXIT_INGESTION_ERROR = 6;

/**
 * Transform a GitHub workflow run to our normalized record format
 */
function transformRun(
  repo: string,
  workflowName: string,
  run: GitHubWorkflowRun
): WorkflowRunRecord {
  const createdAt = new Date(run.created_at);
  const startedAt = run.run_started_at ? new Date(run.run_started_at) : null;
  const completedAt = run.status === "completed" && run.updated_at 
    ? new Date(run.updated_at) 
    : null;

  // Calculate timing metrics
  let queueTime: number | null = null;
  let duration: number | null = null;

  if (startedAt) {
    queueTime = (startedAt.getTime() - createdAt.getTime()) / 1000;
  }
  if (startedAt && completedAt) {
    duration = (completedAt.getTime() - startedAt.getTime()) / 1000;
  }

  // Fork detection: tri-state (true, false, unknown)
  // - true: head_repository exists and differs from base repo
  // - false: head_repository exists and matches base repo
  // - unknown: head_repository is missing (can't determine)
  let isFromFork: "true" | "false" | "unknown";
  if (!run.head_repository) {
    isFromFork = "unknown";
  } else if (run.head_repository.full_name !== repo) {
    isFromFork = "true";
  } else {
    isFromFork = "false";
  }

  return {
    TimeGenerated: new Date().toISOString(),
    SchemaVersion: SCHEMA_VERSION,
    CollectorVersion: COLLECTOR_VERSION,

    // Identity
    Repository: repo,
    WorkflowName: workflowName,
    WorkflowId: run.workflow_id,
    RunId: run.id,
    RunAttempt: run.run_attempt,
    UpdatedAt: run.updated_at,

    // Status
    Status: run.status,
    Conclusion: run.conclusion,

    // Timing
    CreatedAt: run.created_at,
    StartedAt: run.run_started_at,
    CompletedAt: completedAt?.toISOString() || null,
    QueueTime_s: queueTime,
    Duration_s: duration,

    // Context
    TriggerEvent: run.event,
    Actor: run.actor?.login || null,
    ActorType: run.actor?.type || null,
    HeadBranch: run.head_branch,
    HeadSha: run.head_sha,
    HeadRepo: run.head_repository?.full_name || null,
    IsFromFork: isFromFork,
    PullRequestNumber: run.pull_requests[0]?.number || null,
    RunUrl: run.html_url,
  };
}

/**
 * Main collector function
 */
async function collect(config: CollectorConfig): Promise<CollectionSummary> {
  const summary: CollectionSummary = {
    startTime: new Date(),
    endTime: new Date(),
    totalRepos: 0,
    totalWorkflows: 0,
    totalRunsDiscovered: 0,
    totalRunsIngested: 0,
    results: [],
    errors: [],
  };

  // Initialize clients
  const github = new GitHubClient(config.githubToken, config.verbose);
  const monitor = config.dryRun || !config.dceEndpoint
    ? new MockAzureMonitorClient(config.verbose)
    : new AzureMonitorClient(
        config.dceEndpoint,
        config.dcrId!,
        config.streamName!,
        config.verbose
      );

  // Calculate lookback cutoff (uses updatedAfter to catch long-running jobs)
  const cutoff = new Date();
  cutoff.setHours(cutoff.getHours() - config.lookbackHours);

  console.log(`\n🔍 Collecting workflow runs updated since ${cutoff.toISOString()}`);
  console.log(`📊 Target repos: ${config.repos.length}`);
  console.log(`🧪 Mode: ${config.dryRun ? "DRY RUN" : "LIVE"}\n`);

  // Check rate limit
  const rateLimit = await github.getRateLimit();
  console.log(`📈 GitHub API: ${rateLimit.remaining} requests remaining\n`);

  // Process each repository
  for (const repoFullName of config.repos) {
    const [owner, repo] = repoFullName.split("/");
    console.log(`\n📦 Processing ${repoFullName}...`);
    summary.totalRepos++;

    try {
      // Discover agentic workflows
      // v12: Handle errors explicitly instead of treating them as "no workflows"
      const workflowResult = await github.discoverAgenticWorkflows(owner, repo);
      
      if (workflowResult.error) {
        const errMsg = `Failed to discover workflows in ${repoFullName}: ${workflowResult.error.message}`;
        console.error(`  ❌ ${errMsg}`);
        // v13: Also push to summary.errors for proper exit code
        summary.errors.push(errMsg);
        summary.results.push({
          repo: repoFullName,
          workflow: "*",
          runsDiscovered: 0,
          runsIngested: 0,
          errors: [errMsg],
        });
        continue;
      }
      
      const workflows = workflowResult.data;
      
      if (workflows.length === 0) {
        console.log(`  No agentic workflows found`);
        continue;
      }

      // Process each workflow
      for (const workflow of workflows) {
        summary.totalWorkflows++;
        // Use the workflow display name, not the file name
        const workflowName = workflow.name;
        console.log(`  📄 ${workflowName}`);

        try {
          // Fetch runs updated since cutoff (catches long-running jobs that just completed)
          // v12: Handle errors explicitly
          const runsResult = await github.fetchWorkflowRuns(owner, repo, workflow.id, {
            updatedAfter: cutoff,
            maxRuns: config.maxRunsPerWorkflow,
          });

          if (runsResult.error) {
            const errMsg = `Failed to fetch runs for ${workflowName}: ${runsResult.error.message}`;
            console.error(`    ❌ ${errMsg}`);
            // v13: Also push to summary.errors for proper exit code
            summary.errors.push(errMsg);
            summary.results.push({
              repo: repoFullName,
              workflow: workflowName,
              runsDiscovered: 0,
              runsIngested: 0,
              errors: [errMsg],
            });
            continue;
          }
          
          const runs = runsResult.data;
          summary.totalRunsDiscovered += runs.length;

          if (runs.length === 0) {
            console.log(`    No runs in time window`);
            continue;
          }

          // Transform to records
          const records = runs.map((run) => transformRun(repoFullName, workflowName, run));

          // Ingest to Azure Monitor
          await monitor.ingestRuns(records);
          summary.totalRunsIngested += records.length;

          summary.results.push({
            repo: repoFullName,
            workflow: workflowName,
            runsDiscovered: runs.length,
            runsIngested: records.length,
            errors: [],
          });
        } catch (error) {
          const errMsg = `Error processing ${workflowName}: ${error}`;
          console.error(`    ❌ ${errMsg}`);
          summary.errors.push(errMsg);
        }
      }
    } catch (error) {
      const errMsg = `Error processing repo ${repoFullName}: ${error}`;
      console.error(`  ❌ ${errMsg}`);
      summary.errors.push(errMsg);
    }
  }

  summary.endTime = new Date();

  // Print summary
  console.log("\n" + "=".repeat(60));
  console.log("📊 COLLECTION SUMMARY");
  console.log("=".repeat(60));
  console.log(`Duration: ${(summary.endTime.getTime() - summary.startTime.getTime()) / 1000}s`);
  console.log(`Repos processed: ${summary.totalRepos}`);
  console.log(`Workflows found: ${summary.totalWorkflows}`);
  console.log(`Runs discovered: ${summary.totalRunsDiscovered}`);
  console.log(`Runs ingested: ${summary.totalRunsIngested}`);
  console.log(`Errors: ${summary.errors.length}`);

  if (config.dryRun && monitor instanceof MockAzureMonitorClient) {
    const { byRepo, byConclusion } = monitor.getSummary();
    console.log("\n📈 Records by repo:");
    for (const [repo, count] of Object.entries(byRepo)) {
      console.log(`  ${repo}: ${count}`);
    }
    console.log("\n📈 Records by conclusion:");
    for (const [conclusion, count] of Object.entries(byConclusion)) {
      console.log(`  ${conclusion}: ${count}`);
    }
  }

  if (summary.errors.length > 0) {
    console.log("\n❌ Errors:");
    for (const err of summary.errors) {
      console.log(`  - ${err}`);
    }
  }

  return summary;
}

// CLI setup
program
  .name("aw-collector")
  .description("Collect agentic workflow run inventory from Azure SDK repos")
  .version(COLLECTOR_VERSION)
  .option("-r, --repo <repo>", "Specific repo to collect (owner/name)")
  .option("--repos <repos>", "Comma-separated list of repos")
  .option("-t, --token <token>", "GitHub token (default: GITHUB_TOKEN env)")
  .option("--dce <endpoint>", "Azure Monitor DCE endpoint")
  .option("--dcr <id>", "Azure Monitor DCR ID")
  .option("--stream <name>", "Azure Monitor stream name", "Custom-WorkflowRuns_CL")
  .option("-l, --lookback <hours>", "Hours to look back", "24")
  .option("-m, --max-runs <count>", "Max runs per workflow", "100")
  .option("-n, --dry-run", "Dry run (don't push to Azure Monitor)")
  .option("-v, --verbose", "Verbose output")
  .option("--backfill", "Backfill mode (30 days)")
  .option("--days <days>", "Days to backfill", "30")
  .addHelpText("after", `
Environment Variables:
  GITHUB_TOKEN                 GitHub token with actions:read scope (required)
  AZURE_MONITOR_DCE_ENDPOINT   Data Collection Endpoint URL (required for live mode)
  AZURE_MONITOR_DCR_ID         Data Collection Rule ID (required for live mode)

Examples:
  $ node dist/collector.js --dry-run --verbose
  $ node dist/collector.js --repo Azure/azure-sdk-for-js --lookback 72
  $ node dist/collector.js --backfill --days 30

Exit Codes:
  0 - Success
  2 - Usage/argument error
  3 - Missing configuration
  5 - Data/collection error
  6 - Ingestion error
`)
  .action(async (options) => {
    // Determine repos - use shared config as default
    let repos = MONITORED_REPOS;
    if (options.repo) {
      repos = [options.repo];
    } else if (options.repos) {
      repos = options.repos.split(",").map((r: string) => r.trim());
    }

    // v9: Strict numeric validation using shared helper
    const lookbackResult = validatePositiveInteger(options.lookback);
    if (!lookbackResult.valid) {
      console.error(`❌ Invalid --lookback value: must be a positive integer (got: ${options.lookback})`);
      process.exit(EXIT_USAGE_ERROR);
    }

    const maxRunsResult = validatePositiveInteger(options.maxRuns);
    if (!maxRunsResult.valid) {
      console.error(`❌ Invalid --max-runs value: must be a positive integer (got: ${options.maxRuns})`);
      process.exit(EXIT_USAGE_ERROR);
    }

    const daysResult = validatePositiveInteger(options.days);
    if (!daysResult.valid) {
      console.error(`❌ Invalid --days value: must be a positive integer (got: ${options.days})`);
      process.exit(EXIT_USAGE_ERROR);
    }

    // Calculate lookback
    let lookbackHours = lookbackResult.value;
    if (options.backfill) {
      lookbackHours = daysResult.value * 24;
      console.log(`📅 Backfill mode: looking back ${options.days} days`);
    }

    const config: CollectorConfig = {
      repos,
      githubToken: options.token || process.env.GITHUB_TOKEN || "",
      dceEndpoint: options.dce || process.env.AZURE_MONITOR_DCE_ENDPOINT,
      dcrId: options.dcr || process.env.AZURE_MONITOR_DCR_ID,
      streamName: options.stream || process.env.AZURE_MONITOR_STREAM_NAME || "Custom-WorkflowRuns_CL",
      lookbackHours,
      maxRunsPerWorkflow: maxRunsResult.value,
      dryRun: options.dryRun || false,
      verbose: options.verbose || false,
    };

    // v23: Validate GitHub token
    if (!config.githubToken) {
      console.error("❌ GitHub token required");
      console.error("   Set GITHUB_TOKEN env or use --token");
      process.exit(EXIT_CONFIG_ERROR);
    }

    // v23: Fail fast on missing config in live mode (no silent dry-run fallback)
    if (!config.dryRun && (!config.dceEndpoint || !config.dcrId)) {
      console.error("❌ Missing Azure Monitor configuration for live mode");
      console.error("   Required: AZURE_MONITOR_DCE_ENDPOINT, AZURE_MONITOR_DCR_ID");
      console.error("   Or use --dry-run for local testing");
      process.exit(EXIT_CONFIG_ERROR);
    }

    try {
      const summary = await collect(config);
      // v23: Use distinct exit codes
      if (summary.errors.length > 0) {
        process.exit(EXIT_DATA_ERROR);
      }
      process.exit(EXIT_SUCCESS);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      if (errMsg.includes("upload") || errMsg.includes("ingest")) {
        console.error("❌ Ingestion error:", error);
        process.exit(EXIT_INGESTION_ERROR);
      }
      console.error("❌ Fatal error:", error);
      process.exit(EXIT_DATA_ERROR);
    }
  });

program.parse();
