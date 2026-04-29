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
    skipped: number;
    other: number;
    successRate: number;
    effectiveSuccessRate: number; // success / (total - skipped)
    avgDurationMin: number;
    avgQueueTimeSec: number;
  };
  triggers: {
    pullRequest: number;
    schedule: number;
    workflowDispatch: number;
    other: number;
  };
  audits: {
    total: number;
    withTokenData: number;
    coverage: number;
    avgTurns: number;
    avgToolCalls: number;
    totalErrors: number;
    totalWarnings: number;
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
  models: Array<{
    model: string;
    runs: number;
    tokens: number;
    cost: number;
  }>;
  byRepo: Array<{
    repo: string;
    runs: number;
    successRate: number;
    audits: number;
    costUSD: number;
  }>;
  byWorkflow: Array<{
    workflow: string;
    runs: number;
    successRate: number;
    avgDuration: number;
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
    runs: { total: 0, success: 0, failure: 0, cancelled: 0, skipped: 0, other: 0, successRate: 0, effectiveSuccessRate: 0, avgDurationMin: 0, avgQueueTimeSec: 0 },
    triggers: { pullRequest: 0, schedule: 0, workflowDispatch: 0, other: 0 },
    audits: { total: 0, withTokenData: 0, coverage: 0, avgTurns: 0, avgToolCalls: 0, totalErrors: 0, totalWarnings: 0 },
    tokens: { totalInput: 0, totalOutput: 0, totalCacheRead: 0, cacheHitRate: 0 },
    cost: { totalUSD: 0, savingsUSD: 0 },
    models: [],
    byRepo: [],
    byWorkflow: [],
    health: { collectorLastRun: null, auditLastRun: null, collectorStale: false, auditStale: false },
  };

  const repoClause = repoFilter ? `| where Repository == "${repoFilter}"` : "";

  // Query 1: Run summary with duration and queue time
  const runsQuery = `
    WorkflowRuns_CL
    | where TimeGenerated > ago(${days}d)
    ${repoClause}
    | summarize 
        Total = count(),
        Success = countif(Conclusion == "success"),
        Failure = countif(Conclusion == "failure"),
        Cancelled = countif(Conclusion == "cancelled"),
        Skipped = countif(Conclusion == "skipped"),
        AvgDuration = avg(Duration_s),
        AvgQueueTime = avg(QueueTime_s),
        PRTriggers = countif(TriggerEvent == "pull_request" or TriggerEvent == "pull_request_target"),
        ScheduleTriggers = countif(TriggerEvent == "schedule"),
        DispatchTriggers = countif(TriggerEvent == "workflow_dispatch")
  `;

  // Query 2: Audit summary with turns and errors
  const auditsQuery = `
    WorkflowAudit_CL
    | where TimeGenerated > ago(${days}d)
    ${repoClause}
    | summarize 
        Total = count(),
        WithTokenData = countif(HasTokenData == true),
        TotalInput = sum(InputTokens),
        TotalOutput = sum(OutputTokens),
        TotalCacheRead = sum(CacheReadTokens),
        TotalCost = sum(EstimatedCostUSD),
        TotalSavings = sum(EstimatedSavingsUSD),
        AvgTurns = avg(Turns),
        AvgToolCalls = avg(ToolCalls),
        TotalErrors = sum(ErrorCount)
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

  // Query 4: By workflow breakdown
  const byWorkflowQuery = `
    WorkflowRuns_CL
    | where TimeGenerated > ago(${days}d)
    ${repoClause}
    | where Conclusion != "skipped"
    | summarize 
        RunCount = count(), 
        SuccessCount = countif(Conclusion == "success"),
        AvgDuration = avg(Duration_s)
      by WorkflowName
    | project WorkflowName, RunCount, SuccessRate = round(100.0 * SuccessCount / RunCount, 1), AvgDuration = round(AvgDuration / 60, 1)
    | order by RunCount desc
    | take 10
  `;

  // Query 5: By model breakdown
  const byModelQuery = `
    WorkflowAudit_CL
    | where TimeGenerated > ago(${days}d)
    ${repoClause}
    | where HasTokenData == true
    | summarize 
        Runs = count(),
        Tokens = sum(InputTokens + OutputTokens),
        Cost = sum(EstimatedCostUSD)
      by ModelId
    | order by Runs desc
  `;

  // Query 6: Health check
  const healthQuery = `
    let collectorLast = WorkflowRuns_CL | summarize max(TimeGenerated);
    let auditLast = WorkflowAudit_CL | summarize max(TimeGenerated);
    collectorLast | extend Source = "collector" | union (auditLast | extend Source = "audit")
  `;

  try {
    // Execute queries in parallel
    const [runsResult, auditsResult, byRepoResult, byWorkflowResult, byModelResult, healthResult] = await Promise.all([
      client.queryWorkspace(workspaceId, runsQuery, { duration: `P${days}D` }),
      client.queryWorkspace(workspaceId, auditsQuery, { duration: `P${days}D` }),
      client.queryWorkspace(workspaceId, byRepoQuery, { duration: `P${days}D` }),
      client.queryWorkspace(workspaceId, byWorkflowQuery, { duration: `P${days}D` }),
      client.queryWorkspace(workspaceId, byModelQuery, { duration: `P${days}D` }),
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
        metrics.runs.skipped = row[4] ?? 0;
        metrics.runs.avgDurationMin = Math.round((row[5] ?? 0) / 60 * 10) / 10;
        metrics.runs.avgQueueTimeSec = Math.round(row[6] ?? 0);
        metrics.triggers.pullRequest = row[7] ?? 0;
        metrics.triggers.schedule = row[8] ?? 0;
        metrics.triggers.workflowDispatch = row[9] ?? 0;
        metrics.triggers.other = metrics.runs.total - metrics.triggers.pullRequest - metrics.triggers.schedule - metrics.triggers.workflowDispatch;
        
        metrics.runs.other = metrics.runs.total - metrics.runs.success - metrics.runs.failure - metrics.runs.cancelled - metrics.runs.skipped;
        metrics.runs.successRate = metrics.runs.total > 0 
          ? Math.round((100 * metrics.runs.success) / metrics.runs.total * 10) / 10 
          : 0;
        // Effective success rate excludes skipped runs
        const effectiveTotal = metrics.runs.total - metrics.runs.skipped;
        metrics.runs.effectiveSuccessRate = effectiveTotal > 0
          ? Math.round((100 * metrics.runs.success) / effectiveTotal * 10) / 10
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
        metrics.audits.avgTurns = Math.round(row[7] ?? 0);
        metrics.audits.avgToolCalls = Math.round(row[8] ?? 0);
        metrics.audits.totalErrors = row[9] ?? 0;
        metrics.audits.totalWarnings = row[10] ?? 0;

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

    // Process by-workflow result
    if (byWorkflowResult.status === LogsQueryResultStatus.Success) {
      const table = byWorkflowResult.tables[0];
      if (table) {
        for (const row of table.rows) {
          metrics.byWorkflow.push({
            workflow: row[0] as string,
            runs: row[1] as number,
            successRate: row[2] as number,
            avgDuration: row[3] as number,
          });
        }
      }
    }

    // Process by-model result
    if (byModelResult.status === LogsQueryResultStatus.Success) {
      const table = byModelResult.tables[0];
      if (table) {
        for (const row of table.rows) {
          metrics.models.push({
            model: row[0] as string,
            runs: row[1] as number,
            tokens: row[2] as number,
            cost: row[3] as number,
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

  // Runs section - show effective success rate (excluding skipped)
  const effectiveTotal = metrics.runs.total - metrics.runs.skipped;
  console.log("🏃 Workflow Runs");
  console.log(`   Total: ${formatNumber(metrics.runs.total)} (${formatNumber(metrics.runs.skipped)} skipped)`);
  console.log(`   Executed: ${formatNumber(effectiveTotal)}`);
  console.log(`   Success: ${formatNumber(metrics.runs.success)} (${metrics.runs.effectiveSuccessRate}%)`);
  console.log(`   Failure: ${formatNumber(metrics.runs.failure)}`);
  console.log(`   Cancelled: ${formatNumber(metrics.runs.cancelled)}`);
  if (metrics.runs.avgDurationMin > 0) {
    console.log(`   Avg duration: ${metrics.runs.avgDurationMin} min`);
  }
  if (metrics.runs.avgQueueTimeSec > 0) {
    console.log(`   Avg queue time: ${metrics.runs.avgQueueTimeSec}s`);
  }

  // Triggers section
  if (metrics.triggers.pullRequest > 0 || metrics.triggers.schedule > 0 || metrics.triggers.workflowDispatch > 0) {
    console.log("\n🎯 Triggers");
    console.log(`   Pull requests: ${formatNumber(metrics.triggers.pullRequest)}`);
    console.log(`   Scheduled: ${formatNumber(metrics.triggers.schedule)}`);
    console.log(`   Manual dispatch: ${formatNumber(metrics.triggers.workflowDispatch)}`);
    if (metrics.triggers.other > 0) {
      console.log(`   Other: ${formatNumber(metrics.triggers.other)}`);
    }
  }

  // Audits section
  console.log("\n🔍 Audit Coverage");
  console.log(`   Audited runs: ${formatNumber(metrics.audits.total)}`);
  console.log(`   With token data: ${formatNumber(metrics.audits.withTokenData)}`);
  console.log(`   Coverage: ${metrics.audits.coverage}%`);
  if (metrics.audits.avgTurns > 0 || metrics.audits.avgToolCalls > 0) {
    console.log(`   Avg turns: ${metrics.audits.avgTurns} | Avg tool calls: ${metrics.audits.avgToolCalls}`);
  }
  if (metrics.audits.totalErrors > 0 || metrics.audits.totalWarnings > 0) {
    console.log(`   Errors: ${formatNumber(metrics.audits.totalErrors)} | Warnings: ${formatNumber(metrics.audits.totalWarnings)}`);
  }

  // Tokens section
  console.log("\n🎫 Token Usage");
  console.log(`   Input tokens: ${formatNumber(metrics.tokens.totalInput)}`);
  console.log(`   Output tokens: ${formatNumber(metrics.tokens.totalOutput)}`);
  console.log(`   Cache hits: ${formatNumber(metrics.tokens.totalCacheRead)} (${metrics.tokens.cacheHitRate}%)`);

  // Cost section
  console.log("\n💰 Estimated Cost");
  console.log(`   Total: ${formatUSD(metrics.cost.totalUSD)}`);
  console.log(`   Cache savings: ${formatUSD(metrics.cost.savingsUSD)}`);

  // Models section
  if (metrics.models.length > 0) {
    console.log("\n🤖 By Model");
    console.log(`   ${"Model".padEnd(30)} ${"Runs".padStart(8)} ${"Tokens".padStart(12)} ${"Cost".padStart(10)}`);
    console.log(`   ${"-".repeat(30)} ${"-".repeat(8)} ${"-".repeat(12)} ${"-".repeat(10)}`);
    for (const model of metrics.models) {
      const modelName = model.model.length > 30 ? model.model.slice(0, 27) + "..." : model.model;
      console.log(
        `   ${modelName.padEnd(30)} ${String(model.runs).padStart(8)} ${formatNumber(model.tokens).padStart(12)} ${formatUSD(model.cost).padStart(10)}`,
      );
    }
  }

  // By-workflow breakdown (always shown)
  if (metrics.byWorkflow.length > 0) {
    console.log("\n⚙️  By Workflow");
    console.log(`   ${"Workflow".padEnd(35)} ${"Runs".padStart(8)} ${"Success".padStart(8)} ${"Avg Min".padStart(8)}`);
    console.log(`   ${"-".repeat(35)} ${"-".repeat(8)} ${"-".repeat(8)} ${"-".repeat(8)}`);
    for (const wf of metrics.byWorkflow) {
      const wfName = wf.workflow.length > 35 ? wf.workflow.slice(0, 32) + "..." : wf.workflow;
      console.log(
        `   ${wfName.padEnd(35)} ${String(wf.runs).padStart(8)} ${(wf.successRate + "%").padStart(8)} ${String(wf.avgDuration).padStart(8)}`,
      );
    }
  }

  // By-repo breakdown (always shown)
  if (metrics.byRepo.length > 0) {
    console.log("\n📁 By Repository");
    console.log(`   ${"Repository".padEnd(40)} ${"Runs".padStart(8)} ${"Success".padStart(8)} ${"Audits".padStart(8)} ${"Cost".padStart(10)}`);
    console.log(`   ${"-".repeat(40)} ${"-".repeat(8)} ${"-".repeat(8)} ${"-".repeat(8)} ${"-".repeat(10)}`);
    for (const repo of metrics.byRepo) {
      const repoName = repo.repo.length > 40 ? repo.repo.slice(0, 37) + "..." : repo.repo;
      console.log(
        `   ${repoName.padEnd(40)} ${String(repo.runs).padStart(8)} ${(repo.successRate + "%").padStart(8)} ${String(repo.audits).padStart(8)} ${formatUSD(repo.costUSD).padStart(10)}`,
      );
    }
  }

  // Health section
  console.log("\n🏥 Pipeline Health");
  const collectorIcon = metrics.health.collectorStale ? "⚠️" : "✓";
  const auditIcon = metrics.health.auditStale ? "⚠️" : "✓";
  console.log(`   ${collectorIcon} Collector: ${metrics.health.collectorLastRun ?? "No data"}`);
  console.log(`   ${auditIcon} Audit: ${metrics.health.auditLastRun ?? "No data"}`);

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
