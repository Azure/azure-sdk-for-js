/**
 * Status command - Display dashboard metrics in the terminal
 *
 * Queries Azure Monitor and displays key metrics:
 * - Workflow run counts and success rates
 * - Token usage and estimated costs
 * - Audit coverage and staleness
 * - Pipeline health indicators
 */

import { DefaultAzureCredential } from "@azure/identity";
import { LogsQueryClient, LogsQueryResultStatus } from "@azure/monitor-query";
import { MONITORED_REPOS } from "../config.js";
import { validatePositiveInteger } from "../utils.js";
import { EXIT_SUCCESS, EXIT_USAGE_ERROR, EXIT_CONFIG_ERROR, EXIT_AUTH_ERROR } from "../cli.js";

interface StatusOptions {
  repo?: string;
  days: string;
  json?: boolean;
  verbose?: boolean;
}

interface DashboardMetrics {
  timeRange: {
    days: number;
    start: string;
    end: string;
  };
  runs: {
    total: number;
    success: number;
    failure: number;
    cancelled: number;
    other: number;
    successRate: number;
  };
  audits: {
    total: number;
    withTokenData: number;
    coverage: number;
  };
  tokens: {
    totalInput: number;
    totalOutput: number;
    totalCacheRead: number;
    cacheHitRate: number;
  };
  cost: {
    totalUSD: number;
    savingsUSD: number;
  };
  byRepo: Array<{
    repo: string;
    runs: number;
    successRate: number;
    audits: number;
    costUSD: number;
  }>;
  health: {
    collectorLastRun: string | null;
    auditLastRun: string | null;
    collectorStale: boolean;
    auditStale: boolean;
  };
}

/**
 * Query Azure Monitor for dashboard metrics
 */
async function queryMetrics(
  client: LogsQueryClient,
  workspaceId: string,
  days: number,
  repoFilter?: string,
): Promise<DashboardMetrics> {
  const now = new Date();
  const start = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

  const metrics: DashboardMetrics = {
    timeRange: {
      days,
      start: start.toISOString(),
      end: now.toISOString(),
    },
    runs: { total: 0, success: 0, failure: 0, cancelled: 0, other: 0, successRate: 0 },
    audits: { total: 0, withTokenData: 0, coverage: 0 },
    tokens: { totalInput: 0, totalOutput: 0, totalCacheRead: 0, cacheHitRate: 0 },
    cost: { totalUSD: 0, savingsUSD: 0 },
    byRepo: [],
    health: { collectorLastRun: null, auditLastRun: null, collectorStale: false, auditStale: false },
  };

  const repoClause = repoFilter ? `| where Repository == "${repoFilter}"` : "";

  // Query 1: Run summary
  const runsQuery = `
    WorkflowRuns_CL
    | where TimeGenerated > ago(${days}d)
    ${repoClause}
    | summarize 
        Total = count(),
        Success = countif(Conclusion == "success"),
        Failure = countif(Conclusion == "failure"),
        Cancelled = countif(Conclusion == "cancelled")
  `;

  // Query 2: Audit summary
  const auditsQuery = `
    WorkflowAudit_CL
    | where TimeGenerated > ago(${days}d)
    ${repoClause}
    | summarize 
        Total = count(),
        WithTokenData = countif(HasTokenData == true),
        TotalInput = sum(TotalInputTokens),
        TotalOutput = sum(TotalOutputTokens),
        TotalCacheRead = sum(TotalCacheReadTokens),
        TotalCost = sum(EstimatedCostUSD),
        TotalSavings = sum(CacheSavingsUSD)
  `;

  // Query 3: By repo breakdown
  const byRepoQuery = `
    let runs = WorkflowRuns_CL
    | where TimeGenerated > ago(${days}d)
    ${repoClause}
    | summarize RunCount = count(), SuccessCount = countif(Conclusion == "success") by Repository;
    
    let audits = WorkflowAudit_CL
    | where TimeGenerated > ago(${days}d)
    ${repoClause}
    | summarize AuditCount = count(), CostUSD = sum(EstimatedCostUSD) by Repository;
    
    runs
    | join kind=leftouter audits on Repository
    | project Repository, RunCount, SuccessRate = round(100.0 * SuccessCount / RunCount, 1), AuditCount = coalesce(AuditCount, 0), CostUSD = coalesce(CostUSD, 0.0)
    | order by RunCount desc
  `;

  // Query 4: Health check
  const healthQuery = `
    let collectorLast = WorkflowRuns_CL | summarize max(TimeGenerated);
    let auditLast = WorkflowAudit_CL | summarize max(TimeGenerated);
    collectorLast | extend Source = "collector" | union (auditLast | extend Source = "audit")
  `;

  try {
    // Execute queries in parallel
    const [runsResult, auditsResult, byRepoResult, healthResult] = await Promise.all([
      client.queryWorkspace(workspaceId, runsQuery, { duration: `P${days}D` }),
      client.queryWorkspace(workspaceId, auditsQuery, { duration: `P${days}D` }),
      client.queryWorkspace(workspaceId, byRepoQuery, { duration: `P${days}D` }),
      client.queryWorkspace(workspaceId, healthQuery, { duration: `P${days}D` }),
    ]);

    // Process runs result
    if (runsResult.status === LogsQueryResultStatus.Success) {
      const table = runsResult.tables[0];
      if (table && table.rows.length > 0) {
        const row = table.rows[0] as number[];
        metrics.runs.total = row[0] ?? 0;
        metrics.runs.success = row[1] ?? 0;
        metrics.runs.failure = row[2] ?? 0;
        metrics.runs.cancelled = row[3] ?? 0;
        metrics.runs.other = metrics.runs.total - metrics.runs.success - metrics.runs.failure - metrics.runs.cancelled;
        metrics.runs.successRate = metrics.runs.total > 0 
          ? Math.round((100 * metrics.runs.success) / metrics.runs.total * 10) / 10 
          : 0;
      }
    }

    // Process audits result
    if (auditsResult.status === LogsQueryResultStatus.Success) {
      const table = auditsResult.tables[0];
      if (table && table.rows.length > 0) {
        const row = table.rows[0] as number[];
        metrics.audits.total = row[0] ?? 0;
        metrics.audits.withTokenData = row[1] ?? 0;
        metrics.tokens.totalInput = row[2] ?? 0;
        metrics.tokens.totalOutput = row[3] ?? 0;
        metrics.tokens.totalCacheRead = row[4] ?? 0;
        metrics.cost.totalUSD = row[5] ?? 0;
        metrics.cost.savingsUSD = row[6] ?? 0;

        metrics.audits.coverage = metrics.runs.total > 0
          ? Math.round((100 * metrics.audits.total) / metrics.runs.total * 10) / 10
          : 0;
        metrics.tokens.cacheHitRate = metrics.tokens.totalInput > 0
          ? Math.round((100 * metrics.tokens.totalCacheRead) / metrics.tokens.totalInput * 10) / 10
          : 0;
      }
    }

    // Process by-repo result
    if (byRepoResult.status === LogsQueryResultStatus.Success) {
      const table = byRepoResult.tables[0];
      if (table) {
        for (const row of table.rows) {
          metrics.byRepo.push({
            repo: row[0] as string,
            runs: row[1] as number,
            successRate: row[2] as number,
            audits: row[3] as number,
            costUSD: row[4] as number,
          });
        }
      }
    }

    // Process health result
    if (healthResult.status === LogsQueryResultStatus.Success) {
      const table = healthResult.tables[0];
      if (table) {
        for (const row of table.rows) {
          const timestamp = row[0] as string;
          const source = row[1] as string;
          if (source === "collector") {
            metrics.health.collectorLastRun = timestamp;
            const age = (Date.now() - new Date(timestamp).getTime()) / (1000 * 60 * 60);
            metrics.health.collectorStale = age > 2;
          } else if (source === "audit") {
            metrics.health.auditLastRun = timestamp;
            const age = (Date.now() - new Date(timestamp).getTime()) / (1000 * 60 * 60);
            metrics.health.auditStale = age > 25;
          }
        }
      }
    }
  } catch (err) {
    // If tables don't exist yet, return empty metrics
    console.error("Warning: Could not query metrics:", err instanceof Error ? err.message : err);
  }

  return metrics;
}

/**
 * Format number with comma separators
 */
function formatNumber(n: number): string {
  return n.toLocaleString();
}

/**
 * Format currency
 */
function formatUSD(n: number): string {
  return `$${n.toFixed(2)}`;
}

/**
 * Print metrics to terminal
 */
function printMetrics(metrics: DashboardMetrics, verbose: boolean): void {
  console.log("\n📊 Agentic Workflows Dashboard Status");
  console.log(`   Time range: Last ${metrics.timeRange.days} days\n`);

  // Runs section
  console.log("🏃 Workflow Runs");
  console.log(`   Total: ${formatNumber(metrics.runs.total)}`);
  console.log(`   Success: ${formatNumber(metrics.runs.success)} (${metrics.runs.successRate}%)`);
  console.log(`   Failure: ${formatNumber(metrics.runs.failure)}`);
  console.log(`   Cancelled: ${formatNumber(metrics.runs.cancelled)}`);

  // Audits section
  console.log("\n🔍 Audit Coverage");
  console.log(`   Audited runs: ${formatNumber(metrics.audits.total)}`);
  console.log(`   With token data: ${formatNumber(metrics.audits.withTokenData)}`);
  console.log(`   Coverage: ${metrics.audits.coverage}%`);

  // Tokens section
  console.log("\n🎫 Token Usage");
  console.log(`   Input tokens: ${formatNumber(metrics.tokens.totalInput)}`);
  console.log(`   Output tokens: ${formatNumber(metrics.tokens.totalOutput)}`);
  console.log(`   Cache hits: ${formatNumber(metrics.tokens.totalCacheRead)} (${metrics.tokens.cacheHitRate}%)`);

  // Cost section
  console.log("\n💰 Estimated Cost");
  console.log(`   Total: ${formatUSD(metrics.cost.totalUSD)}`);
  console.log(`   Cache savings: ${formatUSD(metrics.cost.savingsUSD)}`);

  // Health section
  console.log("\n🏥 Pipeline Health");
  const collectorIcon = metrics.health.collectorStale ? "⚠️" : "✓";
  const auditIcon = metrics.health.auditStale ? "⚠️" : "✓";
  console.log(`   ${collectorIcon} Collector: ${metrics.health.collectorLastRun ?? "No data"}`);
  console.log(`   ${auditIcon} Audit: ${metrics.health.auditLastRun ?? "No data"}`);

  // By-repo breakdown (verbose mode)
  if (verbose && metrics.byRepo.length > 0) {
    console.log("\n📁 By Repository");
    console.log("   %-40s %8s %8s %8s %10s".replace(/%/g, " "));
    console.log(`   ${"Repository".padEnd(40)} ${"Runs".padStart(8)} ${"Success".padStart(8)} ${"Audits".padStart(8)} ${"Cost".padStart(10)}`);
    console.log(`   ${"-".repeat(40)} ${"-".repeat(8)} ${"-".repeat(8)} ${"-".repeat(8)} ${"-".repeat(10)}`);
    for (const repo of metrics.byRepo) {
      const repoName = repo.repo.length > 40 ? repo.repo.slice(0, 37) + "..." : repo.repo;
      console.log(
        `   ${repoName.padEnd(40)} ${String(repo.runs).padStart(8)} ${(repo.successRate + "%").padStart(8)} ${String(repo.audits).padStart(8)} ${formatUSD(repo.costUSD).padStart(10)}`,
      );
    }
  }

  console.log("");
}

/**
 * Status command implementation
 */
export async function statusCommand(options: StatusOptions): Promise<void> {
  const verbose = options.verbose ?? false;

  // Parse and validate days
  const daysResult = validatePositiveInteger(options.days);
  if (!daysResult.valid) {
    console.error("❌ --days must be a positive integer");
    process.exit(EXIT_USAGE_ERROR);
  }
  const days = daysResult.value;

  // Validate Azure config
  const workspaceId = process.env["AZURE_MONITOR_WORKSPACE_ID"];
  if (!workspaceId) {
    console.error("❌ AZURE_MONITOR_WORKSPACE_ID is required");
    console.error("\nSet this environment variable to query dashboard metrics.");
    process.exit(EXIT_CONFIG_ERROR);
  }

  // Initialize client
  const credential = new DefaultAzureCredential();
  const client = new LogsQueryClient(credential);

  try {
    const metrics = await queryMetrics(client, workspaceId, days, options.repo);

    if (options.json) {
      console.log(JSON.stringify(metrics, null, 2));
    } else {
      printMetrics(metrics, verbose);
    }

    process.exit(EXIT_SUCCESS);
  } catch (err) {
    console.error("❌ Failed to query metrics:", err instanceof Error ? err.message : err);
    process.exit(EXIT_AUTH_ERROR);
  }
}
