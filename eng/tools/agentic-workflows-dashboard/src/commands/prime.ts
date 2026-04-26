/**
 * Prime command - Bootstrap audit data from GitHub API
 *
 * This command fetches workflow runs directly from GitHub API and audits them,
 * without requiring an existing Azure Monitor inventory. Use it to:
 *
 * - Bootstrap a new dashboard deployment
 * - Test audit enrichment locally
 * - Debug specific workflows or runs
 */

import { DefaultAzureCredential } from "@azure/identity";
import { LogsIngestionClient } from "@azure/monitor-ingestion";
import { spawn } from "node:child_process";
import { MONITORED_REPOS } from "../config.js";
import { GitHubClient } from "../github.js";
import {
  AUDITABLE_CONCLUSIONS,
  calculateModelCost,
  calculateCacheSavings,
  calculateCacheHitRate,
  selectPrimaryModel,
  processWithConcurrency,
  sanitizeFiniteNonNegative,
  validatePositiveInteger,
} from "../utils.js";
import type { GitHubWorkflowRun } from "../types.js";
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

interface PrimeOptions {
  repo?: string;
  repos?: string;
  days: string;
  limit: string;
  dryRun?: boolean;
  verbose?: boolean;
}

interface AuditRecord {
  TimeGenerated: string;
  AuditVersion: string;
  Repository: string;
  WorkflowName: string;
  RunId: number;
  RunAttempt: number;
  CreatedAt: string;
  CompletedAt: string;
  PullRequestNumber: number;
  AuditStatus: string;
  HasTokenData: boolean;
  PrimaryModel: string;
  TotalInputTokens: number;
  TotalOutputTokens: number;
  TotalCacheReadTokens: number;
  TotalCacheWriteTokens: number;
  EstimatedCostUSD: number;
  CacheSavingsUSD: number;
  CacheHitRate: number;
  TurnCount: number;
  ToolCallCount: number;
  Duration_ISO8601: string;
  RawAuditJson: string;
}

interface AuditResult {
  status: "success" | "failed" | "pending";
  usage?: {
    total_input_tokens: number;
    total_output_tokens: number;
    total_cache_read_tokens: number;
    total_cache_write_tokens: number;
    by_model?: Record<string, { input_tokens: number }>;
  };
  turn_count?: number;
  tool_call_count?: number;
  duration?: string;
}

/**
 * Run gh aw audit for a single run
 */
async function auditRun(
  repo: string,
  runId: number,
  verbose: boolean,
): Promise<{ data: AuditResult | null; error?: string }> {
  return new Promise((resolve) => {
    const args = ["aw", "audit", "--repo", repo, "--run-id", String(runId), "--json"];
    const proc = spawn("gh", args, { stdio: ["ignore", "pipe", "pipe"] });

    let stdout = "";
    let stderr = "";
    const timeout = setTimeout(() => {
      proc.kill("SIGTERM");
      resolve({ data: null, error: "Audit timed out after 60s" });
    }, 60000);

    proc.stdout.on("data", (chunk) => (stdout += chunk));
    proc.stderr.on("data", (chunk) => (stderr += chunk));

    proc.on("close", (code) => {
      clearTimeout(timeout);
      if (code !== 0) {
        resolve({ data: null, error: stderr || `Exit code ${code}` });
        return;
      }
      try {
        const data = JSON.parse(stdout) as AuditResult;
        resolve({ data });
      } catch {
        resolve({ data: null, error: "Failed to parse audit JSON" });
      }
    });

    proc.on("error", (err) => {
      clearTimeout(timeout);
      resolve({ data: null, error: err.message });
    });
  });
}

/**
 * Create audit record from audit result
 */
function createAuditRecord(
  repo: string,
  workflowName: string,
  run: GitHubWorkflowRun,
  audit: AuditResult,
): AuditRecord {
  const usage = audit.usage ?? {
    total_input_tokens: 0,
    total_output_tokens: 0,
    total_cache_read_tokens: 0,
    total_cache_write_tokens: 0,
  };

  const primaryModel = selectPrimaryModel(usage.by_model);
  const inputTokens = sanitizeFiniteNonNegative(usage.total_input_tokens);
  const outputTokens = sanitizeFiniteNonNegative(usage.total_output_tokens);
  const cacheReadTokens = sanitizeFiniteNonNegative(usage.total_cache_read_tokens);
  const cacheWriteTokens = sanitizeFiniteNonNegative(usage.total_cache_write_tokens);

  const cost = calculateModelCost(primaryModel, inputTokens, outputTokens, cacheReadTokens, cacheWriteTokens);
  const savings = calculateCacheSavings(primaryModel, cacheReadTokens);
  const cacheHitRate = calculateCacheHitRate(inputTokens, cacheReadTokens);

  // Determine if we have real token data
  const hasTokenData = inputTokens > 0 || outputTokens > 0;

  return {
    TimeGenerated: new Date().toISOString(),
    AuditVersion: AUDIT_VERSION,
    Repository: repo,
    WorkflowName: workflowName,
    RunId: run.id,
    RunAttempt: run.run_attempt,
    CreatedAt: run.created_at,
    CompletedAt: run.updated_at,
    PullRequestNumber: run.pull_requests?.[0]?.number ?? 0,
    AuditStatus: audit.status,
    HasTokenData: hasTokenData,
    PrimaryModel: primaryModel,
    TotalInputTokens: inputTokens,
    TotalOutputTokens: outputTokens,
    TotalCacheReadTokens: cacheReadTokens,
    TotalCacheWriteTokens: cacheWriteTokens,
    EstimatedCostUSD: cost,
    CacheSavingsUSD: savings,
    CacheHitRate: cacheHitRate,
    TurnCount: audit.turn_count ?? 0,
    ToolCallCount: audit.tool_call_count ?? 0,
    Duration_ISO8601: audit.duration ?? "PT0S",
    RawAuditJson: JSON.stringify(audit),
  };
}

/**
 * Prime command implementation
 */
export async function primeCommand(options: PrimeOptions): Promise<void> {
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

  // Validate Azure config for ingestion (unless dry-run)
  const dceEndpoint = process.env["AZURE_MONITOR_DCE_ENDPOINT"];
  const dcrId = process.env["AZURE_MONITOR_DCR_ID"];

  if (!dryRun && (!dceEndpoint || !dcrId)) {
    console.error("❌ Missing Azure configuration for ingestion:");
    if (!dceEndpoint) console.error("   AZURE_MONITOR_DCE_ENDPOINT is required");
    if (!dcrId) console.error("   AZURE_MONITOR_DCR_ID is required");
    console.error("\nSet these environment variables or use --dry-run to test locally.");
    process.exit(EXIT_CONFIG_ERROR);
  }

  // Initialize clients
  const githubToken = process.env["GITHUB_TOKEN"];
  const github = new GitHubClient(githubToken);

  let ingestionClient: LogsIngestionClient | null = null;
  if (!dryRun && dceEndpoint && dcrId) {
    const credential = new DefaultAzureCredential();
    ingestionClient = new LogsIngestionClient(dceEndpoint, credential);
  }

  console.log("\n🔄 Priming audit data from GitHub API");
  console.log(`   Repos: ${repos.length}`);
  console.log(`   Lookback: ${days} days`);
  console.log(`   Max runs: ${maxRuns}`);
  console.log(`   Mode: ${dryRun ? "DRY RUN" : "LIVE"}\n`);

  const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  let totalAudited = 0;
  let totalSucceeded = 0;
  let totalFailed = 0;
  const errors: string[] = [];

  // Process each repository
  for (const repoFullName of repos) {
    const parts = repoFullName.split("/");
    const owner = parts[0];
    const repo = parts[1];

    if (!owner || !repo) {
      console.error(`  ❌ Invalid repo format: ${repoFullName}`);
      errors.push(`Invalid repo: ${repoFullName}`);
      continue;
    }

    console.log(`📁 ${repoFullName}`);

    try {
      // Discover agentic workflows
      const workflowResult = await github.discoverAgenticWorkflows(owner, repo);
      if (workflowResult.error) {
        console.error(`  ❌ ${workflowResult.error.message}`);
        errors.push(workflowResult.error.message);
        continue;
      }

      const workflows = workflowResult.data;
      if (workflows.length === 0) {
        if (verbose) console.log("  No agentic workflows found");
        continue;
      }

      // Collect completed runs for auditing
      const auditableRuns: Array<{ workflow: string; run: GitHubWorkflowRun }> = [];

      for (const workflow of workflows) {
        const runsResult = await github.fetchWorkflowRuns(owner, repo, workflow.id, {
          updatedAfter: cutoff,
          maxRuns,
        });

        if (runsResult.error) {
          console.error(`  ❌ ${workflow.name}: ${runsResult.error.message}`);
          continue;
        }

        // Filter to auditable conclusions
        const auditable = runsResult.data.filter(
          (r) => r.conclusion && AUDITABLE_CONCLUSIONS.has(r.conclusion),
        );

        for (const run of auditable) {
          auditableRuns.push({ workflow: workflow.name, run });
        }
      }

      if (auditableRuns.length === 0) {
        if (verbose) console.log("  No auditable runs found");
        continue;
      }

      // Limit total runs
      const toAudit = auditableRuns.slice(0, maxRuns);
      console.log(`  Auditing ${toAudit.length} runs...`);

      // Audit runs with bounded concurrency
      const auditRecords: AuditRecord[] = [];

      await processWithConcurrency(
        toAudit,
        async ({ workflow, run }) => {
          totalAudited++;
          const result = await auditRun(repoFullName, run.id, verbose);

          if (result.data) {
            totalSucceeded++;
            const record = createAuditRecord(repoFullName, workflow, run, result.data);
            auditRecords.push(record);
            if (verbose) {
              console.log(`    ✓ ${run.id}: ${result.data.status}`);
            }
          } else {
            totalFailed++;
            if (verbose) {
              console.log(`    ❌ ${run.id}: ${result.error}`);
            }
          }
        },
        5, // concurrency
      );

      // Ingest audit records
      if (auditRecords.length > 0 && ingestionClient && dcrId) {
        try {
          const records = auditRecords as unknown as Record<string, unknown>[];
          await ingestionClient.upload(dcrId, "Custom-WorkflowAudit_CL", records);
          if (verbose) console.log(`  ✓ Ingested ${auditRecords.length} audit records`);
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          console.error(`  ❌ Ingestion failed: ${msg}`);
          errors.push(`Ingestion: ${msg}`);
        }
      } else if (dryRun && auditRecords.length > 0) {
        if (verbose) console.log(`  [DRY RUN] Would ingest ${auditRecords.length} audit records`);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`  ❌ Error: ${msg}`);
      errors.push(msg);
    }
  }

  // Summary
  console.log("\n📊 Prime Summary");
  console.log(`   Runs audited: ${totalAudited}`);
  console.log(`   Succeeded: ${totalSucceeded}`);
  console.log(`   Failed: ${totalFailed}`);
  if (errors.length > 0) {
    console.log(`   Errors: ${errors.length}`);
  }

  process.exit(errors.length > 0 ? EXIT_DATA_ERROR : EXIT_SUCCESS);
}
