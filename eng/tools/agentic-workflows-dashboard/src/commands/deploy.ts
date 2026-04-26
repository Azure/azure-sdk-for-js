/**
 * Deploy command - Collect workflow runs and audit data, push to Azure Monitor
 */

import { DefaultAzureCredential } from "@azure/identity";
import { LogsIngestionClient } from "@azure/monitor-ingestion";
import { LogsQueryClient, LogsQueryResultStatus } from "@azure/monitor-query";
import { spawn } from "node:child_process";
import { MONITORED_REPOS, SCHEMA_VERSION, COLLECTOR_VERSION } from "../config.js";
import { GitHubClient } from "../github.js";
import {
  AUDITABLE_CONCLUSIONS,
  calculateModelCost,
  calculateCacheSavings,
  calculateCacheHitRate,
  selectPrimaryModel,
  processWithConcurrency,
  createIsoDuration,
  sanitizeFiniteNonNegative,
  validatePositiveInteger,
} from "../utils.js";
import type { GitHubWorkflowRun, WorkflowRunRecord } from "../types.js";
import {
  EXIT_SUCCESS,
  EXIT_USAGE_ERROR,
  EXIT_CONFIG_ERROR,
  EXIT_AUTH_ERROR,
  EXIT_DATA_ERROR,
  EXIT_INGESTION_ERROR,
} from "../cli.js";

// Audit version for schema tracking
const AUDIT_VERSION = "24";

interface DeployOptions {
  repo?: string;
  repos?: string;
  days: string;
  limit: string;
  skipAudit?: boolean;
  dryRun?: boolean;
  verbose?: boolean;
}

interface DeploySummary {
  runsCollected: number;
  runsIngested: number;
  auditsSucceeded: number;
  auditsFailed: number;
  errors: string[];
}

/**
 * Transform a GitHub workflow run to normalized record format
 */
function transformRun(repo: string, workflowName: string, run: GitHubWorkflowRun): WorkflowRunRecord {
  const createdAt = new Date(run.created_at);
  const startedAt = run.run_started_at ? new Date(run.run_started_at) : null;
  const completedAt = run.status === "completed" && run.updated_at ? new Date(run.updated_at) : null;

  let queueTime: number | null = null;
  let duration: number | null = null;

  if (startedAt) {
    queueTime = (startedAt.getTime() - createdAt.getTime()) / 1000;
  }
  if (startedAt && completedAt) {
    duration = (completedAt.getTime() - startedAt.getTime()) / 1000;
  }

  // Fork detection
  let isFromFork: "true" | "false" | "unknown" = "unknown";
  if (run.head_repository) {
    isFromFork = run.head_repository.full_name !== repo ? "true" : "false";
  }

  return {
    TimeGenerated: new Date().toISOString(),
    SchemaVersion: SCHEMA_VERSION,
    CollectorVersion: COLLECTOR_VERSION,
    Repository: repo,
    WorkflowName: workflowName,
    WorkflowId: run.workflow_id,
    RunId: run.id,
    RunAttempt: run.run_attempt,
    UpdatedAt: run.updated_at,
    Status: run.status,
    Conclusion: run.conclusion,
    CreatedAt: run.created_at,
    StartedAt: run.run_started_at,
    CompletedAt: completedAt?.toISOString() ?? null,
    QueueTime_s: queueTime,
    Duration_s: duration,
    TriggerEvent: run.event,
    Actor: run.actor?.login ?? null,
    ActorType: run.actor?.type ?? null,
    HeadBranch: run.head_branch,
    HeadSha: run.head_sha,
    HeadRepo: run.head_repository?.full_name ?? null,
    IsFromFork: isFromFork,
    PullRequestNumber: run.pull_requests?.[0]?.number ?? null,
    RunUrl: run.html_url,
  };
}

/**
 * Validate Azure configuration
 */
function validateAzureConfig(dryRun: boolean): {
  dceEndpoint: string | undefined;
  dcrId: string | undefined;
  workspaceId: string | undefined;
  valid: boolean;
  errors: string[];
} {
  const dceEndpoint = process.env["AZURE_MONITOR_DCE_ENDPOINT"];
  const dcrId = process.env["AZURE_MONITOR_DCR_ID"];
  const workspaceId = process.env["AZURE_MONITOR_WORKSPACE_ID"];
  const errors: string[] = [];

  if (!dryRun) {
    if (!dceEndpoint) errors.push("AZURE_MONITOR_DCE_ENDPOINT is required");
    if (!dcrId) errors.push("AZURE_MONITOR_DCR_ID is required");
  }

  return {
    dceEndpoint,
    dcrId,
    workspaceId,
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Deploy command implementation
 */
export async function deployCommand(options: DeployOptions): Promise<void> {
  const verbose = options.verbose ?? false;

  // Parse and validate numeric options
  const daysResult = validatePositiveInteger(options.days);
  const limitResult = validatePositiveInteger(options.limit);

  if (!daysResult.valid || !limitResult.valid) {
    console.error("❌ Invalid options:");
    if (!daysResult.valid) console.error("   --days must be a positive integer");
    if (!limitResult.valid) console.error("   --limit must be a positive integer");
    process.exit(EXIT_USAGE_ERROR);
  }

  const days = daysResult.value;
  const maxRuns = limitResult.value;
  const dryRun = options.dryRun ?? false;

  // Determine repos
  let repos = MONITORED_REPOS;
  if (options.repo) {
    repos = [options.repo];
  } else if (options.repos) {
    repos = options.repos.split(",").map((r) => r.trim());
  }

  // Validate Azure config (unless dry-run)
  const azureConfig = validateAzureConfig(dryRun);
  if (!azureConfig.valid) {
    console.error("❌ Missing Azure configuration:");
    for (const err of azureConfig.errors) {
      console.error(`   ${err}`);
    }
    console.error("\nSet these environment variables or use --dry-run to validate locally.");
    process.exit(EXIT_CONFIG_ERROR);
  }

  // Initialize clients
  const githubToken = process.env["GITHUB_TOKEN"];
  const github = new GitHubClient(githubToken);

  let ingestionClient: LogsIngestionClient | null = null;
  if (!dryRun && azureConfig.dceEndpoint && azureConfig.dcrId) {
    const credential = new DefaultAzureCredential();
    ingestionClient = new LogsIngestionClient(azureConfig.dceEndpoint, credential);
  }

  const summary: DeploySummary = {
    runsCollected: 0,
    runsIngested: 0,
    auditsSucceeded: 0,
    auditsFailed: 0,
    errors: [],
  };

  console.log("\n🚀 Deploying agentic workflows data");
  console.log(`   Repos: ${repos.length}`);
  console.log(`   Lookback: ${days} days`);
  console.log(`   Max runs per workflow: ${maxRuns}`);
  console.log(`   Mode: ${dryRun ? "DRY RUN" : "LIVE"}`);
  console.log(`   Audit: ${options.skipAudit ? "SKIPPED" : "ENABLED"}\n`);

  const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  // Process each repository
  for (const repoFullName of repos) {
    const parts = repoFullName.split("/");
    const owner = parts[0];
    const repo = parts[1];

    if (!owner || !repo) {
      console.error(`  ❌ Invalid repo format: ${repoFullName}`);
      summary.errors.push(`Invalid repo: ${repoFullName}`);
      continue;
    }

    console.log(`📁 ${repoFullName}`);

    try {
      // Discover agentic workflows
      const workflowResult = await github.discoverAgenticWorkflows(owner, repo);
      if (workflowResult.error) {
        console.error(`  ❌ ${workflowResult.error.message}`);
        summary.errors.push(workflowResult.error.message);
        continue;
      }

      const workflows = workflowResult.data;
      if (workflows.length === 0) {
        if (verbose) console.log("  No agentic workflows found");
        continue;
      }

      // Collect runs for each workflow
      const allRecords: WorkflowRunRecord[] = [];

      for (const workflow of workflows) {
        const runsResult = await github.fetchWorkflowRuns(owner, repo, workflow.id, {
          updatedAfter: cutoff,
          maxRuns,
        });

        if (runsResult.error) {
          console.error(`  ❌ ${workflow.name}: ${runsResult.error.message}`);
          summary.errors.push(runsResult.error.message);
          continue;
        }

        const runs = runsResult.data;
        if (verbose) console.log(`  ${workflow.name}: ${runs.length} runs`);

        for (const run of runs) {
          allRecords.push(transformRun(repoFullName, workflow.name, run));
        }
      }

      summary.runsCollected += allRecords.length;

      // Ingest runs to Azure Monitor
      if (allRecords.length > 0 && ingestionClient && azureConfig.dcrId) {
        try {
          // Cast through unknown to satisfy strict typing
          const records = allRecords as unknown as Record<string, unknown>[];
          await ingestionClient.upload(azureConfig.dcrId, "Custom-WorkflowRuns_CL", records);
          summary.runsIngested += allRecords.length;
          if (verbose) console.log(`  ✓ Ingested ${allRecords.length} run records`);
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          console.error(`  ❌ Ingestion failed: ${msg}`);
          summary.errors.push(`Ingestion: ${msg}`);
        }
      } else if (dryRun) {
        summary.runsIngested += allRecords.length;
        if (verbose) console.log(`  [DRY RUN] Would ingest ${allRecords.length} run records`);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`  ❌ Error: ${msg}`);
      summary.errors.push(msg);
    }
  }

  // Summary
  console.log("\n📊 Deploy Summary");
  console.log(`   Runs collected: ${summary.runsCollected}`);
  console.log(`   Runs ingested: ${summary.runsIngested}`);
  if (!options.skipAudit) {
    console.log(`   Audits succeeded: ${summary.auditsSucceeded}`);
    console.log(`   Audits failed: ${summary.auditsFailed}`);
  }
  if (summary.errors.length > 0) {
    console.log(`   Errors: ${summary.errors.length}`);
  }

  process.exit(summary.errors.length > 0 ? EXIT_DATA_ERROR : EXIT_SUCCESS);
}
