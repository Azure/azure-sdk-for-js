#!/usr/bin/env node
/**
 * Audit Enrichment Script (v23)
 * 
 * Fetches audit data from `gh aw audit` and ingests to WorkflowAudit_CL table.
 * 
 * Key improvements:
 * - v5: Time semantics, per-model records, cache savings
 * - v12: ESM module, error propagation, github-api limit enforcement
 * - v13: Returns errors, uses execFileSync to prevent shell injection
 * - v14: Fatal exit on errors, PartialFailure fatal, run_attempt validation
 * - v15: Canonical IDs from run (not audit), audit shape validation, KQL divide-by-zero fix
 * - v16: Only audit latest attempt (gh aw audit limitation), enforce maxRuns strictly
 * - v17: Always fetch full pages (per_page=100), github-api collects all then sorts globally
 * - v18: Paginates with days filter, collector sorts by updated_at, coverage KQL fixed
 * - v19: Page caps, fail on partial errors, sanitize token values before persisting
 * - v20: Retry audit_failed, workflows per_page=100, classify HasTokenData post-sanitization
 * - v21: Max retry cap (3), Infinity guards, paginate workflows, fix main() counter sync
 * - v22: UX improvements - commander CLI, --repo filter, --verbose, distinct exit codes, help
 * - v23: UX trust - gh/gh aw preflight, real Azure auth check, fail-fast on missing config,
 *        actionable error messages with remediation steps
 * 
 * Usage:
 *   node dist/audit-enrichment.js [options]
 * 
 * Examples:
 *   node dist/audit-enrichment.js --help
 *   node dist/audit-enrichment.js --dry-run --verbose
 *   node dist/audit-enrichment.js --repo Azure/azure-sdk-for-js --limit 10
 *   node dist/audit-enrichment.js --github-api --days 3
 */

import { program } from "commander";
import { spawn, execFileSync } from "child_process";
import { DefaultAzureCredential } from "@azure/identity";
import { LogsIngestionClient } from "@azure/monitor-ingestion";
import { LogsQueryClient, LogsQueryResultStatus } from "@azure/monitor-query";
import { MONITORED_REPOS } from "./config.js";
import {
  MODEL_PRICING,
  AUDITABLE_CONCLUSIONS,
  calculateModelCost,
  calculateCacheSavings,
  calculateCacheHitRate,
  selectPrimaryModel,
  processWithConcurrency,
  createIsoDuration,
  sanitizeFiniteNonNegative,
  validatePositiveInteger,
} from "./utils.js";
import { fileURLToPath } from "url";
import { resolve } from "path";

// v22: Exit codes for better automation
export const EXIT_SUCCESS = 0;
export const EXIT_USAGE_ERROR = 2;
export const EXIT_CONFIG_ERROR = 3;
export const EXIT_AUTH_ERROR = 4;
export const EXIT_DATA_ERROR = 5;
export const EXIT_INGESTION_ERROR = 6;

interface FirewallTokenUsage {
  total_input_tokens: number;
  total_output_tokens: number;
  total_cache_read_tokens: number;
  total_cache_write_tokens: number;
  total_requests: number;
  total_duration_ms: number;
  cache_efficiency: number;
  by_model?: Record<string, {
    provider: string;
    input_tokens: number;
    output_tokens: number;
    cache_read_tokens: number;
    cache_write_tokens: number;
    requests: number;
    duration_ms: number;
  }>;
}

/**
 * v11: Centralized token detection - checks all meaningful token fields
 * Returns true if any billable token usage exists (input, output, or cache-read)
 * @internal Exported for testing
 */
export function hasTokenData(fw: FirewallTokenUsage | undefined): boolean {
  if (!fw) return false;
  
  // v11: Check ALL meaningful token fields, not just input
  // Output-only or cache-only usage is still billable data
  const hasTotalTokens = 
    fw.total_input_tokens > 0 || 
    fw.total_output_tokens > 0 || 
    fw.total_cache_read_tokens > 0;
  
  if (hasTotalTokens) return true;
  
  // Check by_model sum if totals report 0
  if (fw.by_model) {
    const byModelSum = Object.values(fw.by_model).reduce((sum, m) => 
      sum + (m.input_tokens || 0) + (m.output_tokens || 0) + (m.cache_read_tokens || 0), 0);
    return byModelSum > 0;
  }
  
  return false;
}

// @internal Exported for testing
export interface AuditResult {
  overview: {
    run_id: number;
    run_attempt: number;
    workflow_name: string;
    conclusion: string;
    created_at: string;
    started_at: string;
    completed_at: string;
  };
  metrics: {
    turns?: number;
    action_minutes?: number;
    error_count: number;
    warning_count: number;
  };
  firewall_token_usage?: FirewallTokenUsage;
  tool_usage?: Array<{
    name: string;
    call_count: number;
  }>;
  github_rate_limit_usage?: {
    total_requests_made: number;
    core_consumed: number;
  };
}

// v5: Per-model audit record for accurate cost attribution
// @internal Exported for testing
export interface AuditRecord {
  TimeGenerated: string;
  RunId: number;
  RunAttempt: number;
  Repository: string;
  WorkflowName: string;
  CreatedAt: string;
  CompletedAt: string;  // v5: canonical analysis timestamp
  PullRequestNumber: number;
  InputTokens: number;
  OutputTokens: number;
  CacheReadTokens: number;
  CacheWriteTokens: number;
  CacheHitRate: number;
  Turns: number;
  ToolCalls: number;
  ErrorCount: number;
  WarningCount: number;
  ModelId: string;
  RequestCount: number;
  DurationMs: number;
  CacheEfficiency: number;
  EstimatedCostUSD: number;
  EstimatedSavingsUSD: number;  // v5: model-specific cache savings
  GitHubApiRequests: number;
  IsPrimaryModel: boolean;
  // v7: Track audit status for coverage
  HasTokenData: boolean;
  AuditStatus: "success" | "no_firewall" | "zero_tokens" | "audit_failed";
  // v8: Schema versioning for reprocessing stale data
  AuditVersion: number;
}

// @internal Exported for testing
export interface RunInfo {
  runId: number;
  runAttempt: number;
  repo: string;
  workflowName: string;
  createdAt: string;
  completedAt: string;
  pullRequestNumber: number;
}

// v14: Current audit schema version - increment when logic changes materially
// v14 changes: Fatal exit on errors, PartialFailure is fatal, run_attempt validation
// v21 changes: Max retry cap (3), Infinity guards, paginate workflows, fix main() counter sync
// v22 changes: UX improvements - commander CLI, --repo filter, --verbose, distinct exit codes
// v23 changes: UX trust - gh/gh aw preflight, real Azure auth check, fail-fast on missing config
export const AUDIT_VERSION = 23;

// v21: Maximum retry attempts for audit_failed runs before treating as terminal
export const MAX_AUDIT_RETRIES = 3;

// Environment variables
const DCE_ENDPOINT = process.env.AZURE_MONITOR_DCE_ENDPOINT;
const DCR_ID = process.env.AZURE_MONITOR_DCR_ID;
const WORKSPACE_ID = process.env.AZURE_MONITOR_WORKSPACE_ID;
const AUDIT_STREAM_NAME = "Custom-WorkflowAudit_CL";

// Bounded parallelism - max concurrent gh aw audit calls
const MAX_CONCURRENCY = 5;

// v23: Preflight check results
interface PreflightResult {
  success: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * v23: Check that gh CLI is installed and authenticated
 */
function checkGhCli(): { ok: boolean; error?: string; remediation?: string } {
  try {
    execFileSync("gh", ["--version"], { stdio: "pipe" });
  } catch {
    return {
      ok: false,
      error: "GitHub CLI (gh) is not installed or not in PATH",
      remediation: "Install from: https://cli.github.com/",
    };
  }
  
  try {
    execFileSync("gh", ["auth", "status"], { stdio: "pipe" });
  } catch {
    return {
      ok: false,
      error: "GitHub CLI is not authenticated",
      remediation: "Run: gh auth login",
    };
  }
  
  return { ok: true };
}

/**
 * v23: Check that gh aw extension is installed
 */
function checkGhAwExtension(): { ok: boolean; error?: string; remediation?: string } {
  try {
    // gh aw --help should work if extension is installed
    execFileSync("gh", ["aw", "--help"], { stdio: "pipe" });
    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "GitHub agentic workflows extension (gh aw) is not installed",
      remediation: "Install from: https://github.com/github/gh-aw",
    };
  }
}

/**
 * v23: Check Azure credentials by actually acquiring a token
 */
async function checkAzureCredentials(): Promise<{ ok: boolean; error?: string; remediation?: string }> {
  try {
    const credential = new DefaultAzureCredential();
    // Actually try to get a token for Azure Monitor scope
    await credential.getToken("https://monitor.azure.com/.default");
    return { ok: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      ok: false,
      error: `Azure authentication failed: ${msg}`,
      remediation: "Run: az login --use-device-code\n   Or configure: AZURE_CLIENT_ID, AZURE_TENANT_ID, AZURE_CLIENT_SECRET",
    };
  }
}

/**
 * v23: Run all preflight checks based on mode
 */
async function runPreflightChecks(options: {
  needsGh: boolean;
  needsAzure: boolean;
  verbose: boolean;
}): Promise<PreflightResult> {
  const result: PreflightResult = { success: true, errors: [], warnings: [] };
  
  if (options.needsGh) {
    if (options.verbose) console.log("🔍 Checking GitHub CLI...");
    
    const ghCheck = checkGhCli();
    if (!ghCheck.ok) {
      result.success = false;
      result.errors.push(`${ghCheck.error}\n   ${ghCheck.remediation}`);
    }
    
    const awCheck = checkGhAwExtension();
    if (!awCheck.ok) {
      result.success = false;
      result.errors.push(`${awCheck.error}\n   ${awCheck.remediation}`);
    }
    
    if (options.verbose && ghCheck.ok && awCheck.ok) {
      console.log("✓ GitHub CLI and gh aw extension ready");
    }
  }
  
  if (options.needsAzure) {
    if (options.verbose) console.log("🔍 Checking Azure credentials...");
    
    const azureCheck = await checkAzureCredentials();
    if (!azureCheck.ok) {
      result.success = false;
      result.errors.push(`${azureCheck.error}\n   ${azureCheck.remediation}`);
    }
    
    if (options.verbose && azureCheck.ok) {
      console.log("✓ Azure credentials verified");
    }
  }
  
  return result;
}

/**
 * v23: Enhanced audit result with error details
 */
interface AuditCallResult {
  data: AuditResult | null;
  error?: string;
  errorType?: "timeout" | "exit_code" | "parse" | "spawn";
}

/**
 * Run gh aw audit asynchronously using spawn
 * v23: Returns error details for actionable messages
 */
function auditRunAsync(runId: number, repo: string): Promise<AuditCallResult> {
  return new Promise((resolve) => {
    const child = spawn("gh", ["aw", "audit", String(runId), "--repo", repo, "--json"], {
      stdio: ["pipe", "pipe", "pipe"],
    });
    
    let stdout = "";
    let stderr = "";
    
    child.stdout.on("data", (data) => { stdout += data; });
    child.stderr.on("data", (data) => { stderr += data; });
    
    const timeout = setTimeout(() => {
      child.kill("SIGTERM");
      resolve({ data: null, error: "timeout after 120s", errorType: "timeout" });
    }, 120000);
    
    child.on("close", (code) => {
      clearTimeout(timeout);
      if (code !== 0) {
        // v23: Preserve stderr for actionable error message
        const errorMsg = stderr.trim() || `exit code ${code}`;
        resolve({ data: null, error: errorMsg, errorType: "exit_code" });
        return;
      }
      try {
        resolve({ data: JSON.parse(stdout) });
      } catch (parseErr) {
        resolve({ data: null, error: "invalid JSON response", errorType: "parse" });
      }
    });
    
    child.on("error", (err) => {
      clearTimeout(timeout);
      resolve({ data: null, error: err.message, errorType: "spawn" });
    });
  });
}

/**
 * Query WorkflowRuns_CL for runs that need auditing
 * Uses CompletedAt for time filtering (consistent with collector's updatedAfter)
 */
async function getRunsFromInventory(
  logsClient: LogsQueryClient,
  workspaceId: string,
  days: number,
  limit: number
): Promise<RunInfo[]> {
  // v6: Cap days at 30 to match Log Analytics query duration limit
  const effectiveDays = Math.min(days, 30);
  if (days > 30) {
    console.warn(`Warning: --days ${days} exceeds 30-day limit, using ${effectiveDays} days`);
  }
  
  const conclusionsList = Array.from(AUDITABLE_CONCLUSIONS).map(c => `"${c}"`).join(", ");
  
  // Query runs from inventory that are missing from audit table or have stale audit data
  // Use CompletedAt for time filtering to match collector's updatedAfter logic
  // v9: Filter by AuditVersion >= current to reprocess runs audited with older schema
  // v16: Only audit the latest attempt per RunId since gh aw audit only returns latest
  // v21: Count prior audit_failed attempts and exclude runs that have exceeded MAX_AUDIT_RETRIES
  const query = `
    let currentVersion = ${AUDIT_VERSION};
    let maxRetries = ${MAX_AUDIT_RETRIES};
    let runs = WorkflowRuns_CL
    | where Repository != "test/repo"
    | where Conclusion in (${conclusionsList})
    | where isnotempty(CompletedAt)
    | where CompletedAt > ago(${effectiveDays}d)
    | summarize arg_max(RunAttempt, *) by RunId
    | project RunId, RunAttempt, Repository, WorkflowName, CreatedAt, CompletedAt, PullRequestNumber;
    let terminal = WorkflowAudit_CL
    | where CompletedAt > ago(${effectiveDays}d)
    | where AuditVersion >= currentVersion
    // v21: Terminal statuses OR audit_failed with >= maxRetries attempts
    | where AuditStatus in ("success", "no_firewall", "zero_tokens")
    | summarize arg_max(TimeGenerated, *) by RunId, RunAttempt
    | project RunId, RunAttempt;
    let tooManyRetries = WorkflowAudit_CL
    | where CompletedAt > ago(${effectiveDays}d)
    | where AuditVersion >= currentVersion
    | where AuditStatus == "audit_failed"
    | summarize FailCount=count() by RunId, RunAttempt
    | where FailCount >= maxRetries
    | project RunId, RunAttempt;
    runs
    | join kind=leftanti terminal on RunId, RunAttempt
    | join kind=leftanti tooManyRetries on RunId, RunAttempt
    | top ${limit} by CompletedAt desc
  `;
  
  // Use proper ISO duration matching the KQL filter
  const result = await logsClient.queryWorkspace(workspaceId, query, { 
    duration: createIsoDuration(effectiveDays + 1)  // +1 for safety margin
  });
  
  // v14: Treat non-success as errors - PartialFailure is now fatal (no silent under-auditing)
  if (result.status === LogsQueryResultStatus.PartialFailure) {
    console.error("❌ Inventory query returned partial results");
    console.error("   Partial error:", result.partialError);
    throw new Error("Inventory query failed with PartialFailure status - refusing to continue with incomplete data");
  } else if (result.status !== LogsQueryResultStatus.Success) {
    throw new Error(`Inventory query failed with unexpected status`);
  }
  
  // Success status - tables are guaranteed to exist
  const table = result.tables[0];
  if (!table) {
    return [];
  }
  return table.rows.map((row: unknown[]) => ({
    runId: row[0] as number,
    runAttempt: row[1] as number,
    repo: row[2] as string,
    workflowName: row[3] as string,
    createdAt: row[4] as string,
    completedAt: row[5] as string,
    pullRequestNumber: (row[6] as number) ?? 0,
  }));
}

// v13: Result type for github-api fallback with error tracking
interface GitHubApiFetchResult {
  runs: RunInfo[];
  errors: string[];
}

// v13: Strict repo name validation to prevent injection
const REPO_PATTERN = /^[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/;

function validateRepoName(repo: string): boolean {
  return REPO_PATTERN.test(repo) && repo.length <= 200;
}

/**
 * Legacy: Get runs from GitHub API (fallback when inventory not available)
 * v12: Added globalLimit parameter to enforce total cap
 * v13: Returns errors, uses execFileSync to prevent shell injection
 * v18: Paginate with per_page=100, filter by days cutoff
 */
async function getRunsFromGitHub(repos: string[], days: number, globalLimit: number): Promise<GitHubApiFetchResult> {
  const runs: RunInfo[] = [];
  const errors: string[] = [];
  const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  
  // v17: Collect from all repos first, then sort globally and slice
  // This ensures we get the newest runs across all repos, not biased by iteration order
  for (const repo of repos) {
    // v13: Validate repo name to prevent injection
    if (!validateRepoName(repo)) {
      const errMsg = `Invalid repo name format: ${repo}`;
      console.error(`  ❌ ${errMsg}`);
      errors.push(errMsg);
      continue;
    }
    
    console.log(`\n📦 ${repo} (GitHub API fallback)`);
    try {
      // v21: Paginate workflow discovery (default only returns ~30)
      const allWorkflows: any[] = [];
      let wfPage = 1;
      const maxWfPages = 5;  // Cap at 5 pages (500 workflows)
      
      while (wfPage <= maxWfPages) {
        const output = execFileSync("gh", ["api", `repos/${repo}/actions/workflows?per_page=100&page=${wfPage}`], { encoding: "utf-8" });
        const data = JSON.parse(output);
        allWorkflows.push(...data.workflows);
        if (data.workflows.length < 100) break;
        wfPage++;
      }
      
      const workflows = allWorkflows.filter((w: any) => w.path?.includes(".lock.yml"));
      if (wfPage > maxWfPages) {
        console.log(`  ⚠️ Hit ${maxWfPages}-page cap on workflows (found ${allWorkflows.length})`);
      }
      
      for (const workflow of workflows) {
        // v19: Paginate with page cap to bound API calls; filter by updated_at in-memory
        let page = 1;
        const maxPages = 10;  // Cap at 10 pages (1000 runs) per workflow
        
        while (page <= maxPages) {
          // v18: Always use per_page=100 for proper pagination
          const runsOutput = execFileSync(
            "gh",
            ["api", `repos/${repo}/actions/workflows/${workflow.id}/runs?per_page=100&page=${page}`],
            { encoding: "utf-8" }
          );
          const runsData = JSON.parse(runsOutput);
          
          if (runsData.workflow_runs.length === 0) break;
          
          for (const run of runsData.workflow_runs) {
            // v19: Filter by updated_at, but don't stop paging (old runs can be updated recently)
            const updatedAt = new Date(run.updated_at || run.created_at);
            if (updatedAt < cutoffDate) {
              continue;  // Skip but keep paging
            }
            
            if (run.conclusion && AUDITABLE_CONCLUSIONS.has(run.conclusion)) {
              runs.push({
                runId: run.id,
                runAttempt: run.run_attempt || 1,
                repo,
                workflowName: workflow.name,
                createdAt: run.created_at,
                completedAt: run.updated_at || run.created_at,
                pullRequestNumber: run.pull_requests?.[0]?.number ?? 0,
              });
            }
          }
          
          // Check if we've exhausted results
          if (runsData.workflow_runs.length < 100) break;
          page++;
        }
        
        if (page > maxPages) {
          console.log(`  📋 ${workflow.name}: hit ${maxPages}-page cap (total: ${runs.length})`);
        } else {
          console.log(`  📋 ${workflow.name}: found runs (total collected: ${runs.length})`);
        }
      }
    } catch (error) {
      const errMsg = `${repo}: ${error instanceof Error ? error.message : error}`;
      console.error(`  ❌ Error: ${errMsg}`);
      errors.push(errMsg);
    }
  }
  
  // v17: Sort globally by completion time, then enforce limit
  // This ensures we audit the newest runs across ALL repos
  runs.sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
  const limitedRuns = runs.slice(0, globalLimit);
  console.log(`\n📊 Collected ${runs.length} total runs (within ${days} days), returning newest ${limitedRuns.length}`);
  return { runs: limitedRuns, errors };
}

/**
 * Create a failed audit record from RunInfo only (when audit command fails/times out)
 * v8: Ensures audit_failed status is always recorded for coverage tracking
 * @internal Exported for testing
 */
export function createFailedAuditRecord(run: RunInfo): AuditRecord {
  return {
    TimeGenerated: new Date().toISOString(),
    RunId: run.runId,
    RunAttempt: run.runAttempt,
    Repository: run.repo,
    WorkflowName: run.workflowName,
    CreatedAt: run.createdAt,
    CompletedAt: run.completedAt,
    PullRequestNumber: run.pullRequestNumber,
    InputTokens: 0,
    OutputTokens: 0,
    CacheReadTokens: 0,
    CacheWriteTokens: 0,
    CacheHitRate: 0,
    CacheEfficiency: 0,
    Turns: 0,
    ToolCalls: 0,
    ErrorCount: 0,
    WarningCount: 0,
    ModelId: "none",
    RequestCount: 0,
    DurationMs: 0,
    EstimatedCostUSD: 0,
    EstimatedSavingsUSD: 0,
    GitHubApiRequests: 0,
    IsPrimaryModel: true,
    HasTokenData: false,
    AuditStatus: "audit_failed",
    AuditVersion: AUDIT_VERSION,
  };
}

/**
 * Create audit records - one per model for multi-model runs
 * v5: Uses imported calculateModelCost and calculateCacheSavings from utils.ts
 * v7: Uses calculateCacheHitRate for validated cache rates, adds HasTokenData/AuditStatus
 * v10: Uses centralized hasTokenData() helper
 * @internal Exported for testing
 */
export function createAuditRecords(
  run: RunInfo,
  audit: AuditResult,
  status: "success" | "no_firewall" | "zero_tokens" | "audit_failed" = "success"
): AuditRecord[] {
  const fw = audit.firewall_token_usage;
  
  // v10: Use centralized hasTokenData() helper
  const hasTokens = hasTokenData(fw);
  
  // v7: Always create at least one record for coverage tracking
  if (!hasTokens) {
    // Create a status-only record for coverage
    // v15: Use run.runId/run.runAttempt as canonical identifiers (not audit.overview)
    return [{
      TimeGenerated: new Date().toISOString(),
      RunId: run.runId,
      RunAttempt: run.runAttempt,
      Repository: run.repo,
      WorkflowName: run.workflowName,
      CreatedAt: audit.overview?.created_at || run.createdAt,
      CompletedAt: run.completedAt,
      PullRequestNumber: run.pullRequestNumber,
      InputTokens: 0,
      OutputTokens: 0,
      CacheReadTokens: 0,
      CacheWriteTokens: 0,
      CacheHitRate: 0,
      CacheEfficiency: 0,
      Turns: audit.metrics?.turns ?? 0,
      ToolCalls: (audit.tool_usage || []).reduce((sum, t) => sum + (t.call_count || 0), 0),
      ErrorCount: audit.metrics?.error_count ?? 0,
      WarningCount: audit.metrics?.warning_count ?? 0,
      ModelId: "none",
      RequestCount: 0,
      DurationMs: 0,
      EstimatedCostUSD: 0,
      EstimatedSavingsUSD: 0,
      GitHubApiRequests: audit.github_rate_limit_usage?.total_requests_made ?? 0,
      IsPrimaryModel: true,
      HasTokenData: false,
      AuditStatus: status === "success" ? (fw ? "zero_tokens" : "no_firewall") : status,
      AuditVersion: AUDIT_VERSION,
    }];
  }
  
  const records: AuditRecord[] = [];
  const totalToolCalls = (audit.tool_usage || []).reduce((sum, t) => sum + (t.call_count || 0), 0);
  const githubRequests = audit.github_rate_limit_usage?.total_requests_made ?? 0;
  const turns = audit.metrics?.turns ?? 0;
  const errorCount = audit.metrics?.error_count ?? 0;
  const warningCount = audit.metrics?.warning_count ?? 0;
  
  // v12: TypeScript narrowing - fw is guaranteed to exist here since hasTokenData passed
  // We create a local binding to help TypeScript understand fw is non-null
  const firewallData = fw!;
  
  // Determine primary model using imported selectPrimaryModel
  const primaryModel = selectPrimaryModel(firewallData.by_model);
  
  if (firewallData.by_model && Object.keys(firewallData.by_model).length > 0) {
    // Create one record per model
    for (const [modelId, usage] of Object.entries(firewallData.by_model)) {
      // v21: Use sanitizeFiniteNonNegative for Infinity/NaN protection
      const inputTokens = sanitizeFiniteNonNegative(usage.input_tokens);
      const outputTokens = sanitizeFiniteNonNegative(usage.output_tokens);
      const cacheReadTokens = Math.min(sanitizeFiniteNonNegative(usage.cache_read_tokens), inputTokens);
      const cacheWriteTokens = sanitizeFiniteNonNegative(usage.cache_write_tokens);
      
      // v20: Classify HasTokenData based on SANITIZED values (not raw)
      const hasTokensAfterSanitization = inputTokens > 0 || outputTokens > 0 || cacheReadTokens > 0;
      
      // v7: Use calculateCacheHitRate for validated rate
      const cacheRate = calculateCacheHitRate(inputTokens, cacheReadTokens);
      
      // Use imported functions from utils.ts
      const cost = calculateModelCost(
        modelId,
        inputTokens,
        outputTokens,
        cacheReadTokens,
        cacheWriteTokens
      );
      
      const savings = calculateCacheSavings(modelId, cacheReadTokens);
      
      // v21: Sanitize cache_efficiency too
      const cacheEfficiency = sanitizeFiniteNonNegative(firewallData.cache_efficiency);
      
      records.push({
        TimeGenerated: new Date().toISOString(),
        // v15: Use run.runId/run.runAttempt as canonical identifiers (not audit.overview)
        RunId: run.runId,
        RunAttempt: run.runAttempt,
        Repository: run.repo,
        WorkflowName: run.workflowName,
        CreatedAt: audit.overview?.created_at || run.createdAt,
        CompletedAt: run.completedAt,  // v5: canonical analysis timestamp
        PullRequestNumber: run.pullRequestNumber,
        // v19: Persist sanitized token values
        InputTokens: inputTokens,
        OutputTokens: outputTokens,
        CacheReadTokens: cacheReadTokens,
        CacheWriteTokens: cacheWriteTokens,
        CacheHitRate: Math.round(cacheRate * 10) / 10,
        CacheEfficiency: Math.round(cacheEfficiency * 1000) / 1000,
        Turns: turns,
        ToolCalls: totalToolCalls,
        ErrorCount: errorCount,
        WarningCount: warningCount,
        ModelId: modelId,
        RequestCount: usage.requests,
        DurationMs: usage.duration_ms,
        EstimatedCostUSD: Math.round(cost * 10000) / 10000,
        EstimatedSavingsUSD: Math.round(savings * 10000) / 10000,
        GitHubApiRequests: githubRequests,
        IsPrimaryModel: modelId === primaryModel,
        // v20: Use sanitized classification
        HasTokenData: hasTokensAfterSanitization,
        AuditStatus: hasTokensAfterSanitization ? "success" : "zero_tokens",
        AuditVersion: AUDIT_VERSION,
      });
    }
  } else {
    // Single record with totals (no model breakdown available)
    // v21: Use sanitizeFiniteNonNegative for Infinity/NaN protection
    const inputTokens = sanitizeFiniteNonNegative(firewallData.total_input_tokens);
    const outputTokens = sanitizeFiniteNonNegative(firewallData.total_output_tokens);
    const cacheReadTokens = Math.min(sanitizeFiniteNonNegative(firewallData.total_cache_read_tokens), inputTokens);
    const cacheWriteTokens = sanitizeFiniteNonNegative(firewallData.total_cache_write_tokens);
    
    // v20: Classify HasTokenData based on SANITIZED values (not raw)
    const hasTokensAfterSanitization = inputTokens > 0 || outputTokens > 0 || cacheReadTokens > 0;
    
    // v7: Use calculateCacheHitRate for validated rate
    const cacheRate = calculateCacheHitRate(inputTokens, cacheReadTokens);
    
    const cost = calculateModelCost(
      "unknown",
      inputTokens,
      outputTokens,
      cacheReadTokens,
      cacheWriteTokens
    );
    
    const savings = calculateCacheSavings("unknown", cacheReadTokens);
    
    // v21: Sanitize cache_efficiency too
    const cacheEfficiency = sanitizeFiniteNonNegative(firewallData.cache_efficiency);
    
    records.push({
      TimeGenerated: new Date().toISOString(),
      // v15: Use run.runId/run.runAttempt as canonical identifiers (not audit.overview)
      RunId: run.runId,
      RunAttempt: run.runAttempt,
      Repository: run.repo,
      WorkflowName: run.workflowName,
      CreatedAt: audit.overview?.created_at || run.createdAt,
      CompletedAt: run.completedAt,  // v5: canonical analysis timestamp
      PullRequestNumber: run.pullRequestNumber,
      // v19: Persist sanitized token values
      InputTokens: inputTokens,
      OutputTokens: outputTokens,
      CacheReadTokens: cacheReadTokens,
      CacheWriteTokens: cacheWriteTokens,
      CacheHitRate: Math.round(cacheRate * 10) / 10,
      CacheEfficiency: Math.round(cacheEfficiency * 1000) / 1000,
      Turns: turns,
      ToolCalls: totalToolCalls,
      ErrorCount: errorCount,
      WarningCount: warningCount,
      ModelId: "unknown",
      RequestCount: firewallData.total_requests,
      DurationMs: firewallData.total_duration_ms,
      EstimatedCostUSD: Math.round(cost * 10000) / 10000,
      EstimatedSavingsUSD: Math.round(savings * 10000) / 10000,
      GitHubApiRequests: githubRequests,
      IsPrimaryModel: true,
      // v20: Use sanitized classification
      HasTokenData: hasTokensAfterSanitization,
      AuditStatus: hasTokensAfterSanitization ? "success" : "zero_tokens",
      AuditVersion: AUDIT_VERSION,
    });
  }
  
  return records;
}

// v22: Core audit processing (called by commander action)
async function runAuditProcessing(runs: RunInfo[], dryRun: boolean, verbose: boolean): Promise<{ records: AuditRecord[]; dryRun: boolean }> {
  console.log(`⚡ Processing ${runs.length} audits with ${MAX_CONCURRENCY} workers...\n`);

  // Track results
  const records: AuditRecord[] = [];
  let runsWithTokens = 0;
  let runsNoFirewall = 0;
  let runsSkipped = 0;
  let runsFailed = 0;

  // Process with bounded parallelism
  await processWithConcurrency(runs, async (run, index) => {
    const prefix = `[${index + 1}/${runs.length}] ${run.repo.split("/")[1]}/${run.runId}`;
    
    const auditResult = await auditRunAsync(run.runId, run.repo);
    
    if (!auditResult.data) {
      // v23: Show actionable error message
      const errorDetail = verbose && auditResult.error ? `: ${auditResult.error}` : "";
      console.log(`${prefix} ❌ (audit failed${errorDetail})`);
      runsFailed++;
      // v8: Always emit a row for failed audits so coverage is accurate
      const failedRecord = createFailedAuditRecord(run);
      records.push(failedRecord);
      return;
    }
    
    const audit = auditResult.data;
    
    // v15: Validate audit JSON shape before using it
    if (!audit.overview || typeof audit.overview !== "object") {
      console.log(`${prefix} ❌ (malformed audit: missing overview)`);
      runsFailed++;
      const failedRecord = createFailedAuditRecord(run);
      records.push(failedRecord);
      return;
    }
    
    // v14: Validate returned attempt matches requested attempt
    // gh aw audit returns the latest attempt by default; if it doesn't match, record as mismatch
    const returnedAttempt = audit.overview.run_attempt || 1;
    if (returnedAttempt !== run.runAttempt) {
      console.log(`${prefix} ⚠️ (attempt mismatch: requested ${run.runAttempt}, got ${returnedAttempt})`);
      runsFailed++;
      // Record as failed to avoid attributing wrong attempt's data
      const failedRecord = createFailedAuditRecord(run);
      records.push(failedRecord);
      return;
    }
    
    const fw = audit.firewall_token_usage;
    
    // v21: Create records first, then classify based on returned records (fixes counter sync issue)
    // Previously, main() used hasTokenData(fw) which checks raw values, but createAuditRecords()
    // reclassifies based on sanitized values, causing counter/record mismatches
    const runRecords = createAuditRecords(run, audit, fw ? "success" : "no_firewall");
    records.push(...runRecords);
    
    // v21: Classify based on actual records, not raw data
    const hasAnyTokens = runRecords.some(r => r.HasTokenData);
    const firstStatus = runRecords[0]?.AuditStatus;
    
    if (firstStatus === "no_firewall") {
      console.log(`${prefix} ⚠️ (no firewall_token_usage)`);
      runsNoFirewall++;
    } else if (!hasAnyTokens) {
      console.log(`${prefix} ⏭ (zero tokens after sanitization)`);
      runsSkipped++;
    } else {
      runsWithTokens++;
      const totalCost = runRecords.reduce((sum, r) => sum + r.EstimatedCostUSD, 0);
      const models = runRecords.map(r => r.ModelId).join(", ");
      console.log(`${prefix} ✓ ${audit.metrics?.turns ?? 0}T/${runRecords[0]?.ToolCalls ?? 0}C $${totalCost.toFixed(4)} [${models}]`);
    }
  }, MAX_CONCURRENCY);

  console.log(`\n${"─".repeat(50)}`);
  console.log(`📊 Summary:`);
  console.log(`   Runs processed: ${runs.length}`);
  console.log(`   With token data: ${runsWithTokens}`);
  console.log(`   Skipped (zero tokens): ${runsSkipped}`);
  console.log(`   No firewall data: ${runsNoFirewall}`);
  console.log(`   Failed: ${runsFailed}`);
  console.log(`   Records to ingest: ${records.length}`);

  // Calculate totals
  if (records.length > 0) {
    // v8: Sum ALL model records for tokens (they're model-level data, not duplicated)
    // Only IsPrimaryModel filtering is needed for truly run-level fields like Turns
    const tokenRecords = records.filter(r => r.HasTokenData);
    const totalInput = tokenRecords.reduce((sum, r) => sum + r.InputTokens, 0);
    const totalOutput = tokenRecords.reduce((sum, r) => sum + r.OutputTokens, 0);
    const totalCached = tokenRecords.reduce((sum, r) => sum + r.CacheReadTokens, 0);
    const totalCost = tokenRecords.reduce((sum, r) => sum + r.EstimatedCostUSD, 0);
    
    // Group by model
    const byModel = new Map<string, { count: number; cost: number }>();
    for (const r of tokenRecords) {
      const m = byModel.get(r.ModelId) || { count: 0, cost: 0 };
      m.count++;
      m.cost += r.EstimatedCostUSD;
      byModel.set(r.ModelId, m);
    }
    
    console.log(`\n💰 Estimated total cost: $${totalCost.toFixed(2)}`);
    console.log(`   Input: ${(totalInput / 1_000_000).toFixed(2)}M tokens`);
    console.log(`   Output: ${(totalOutput / 1_000_000).toFixed(2)}M tokens`);
    if (totalInput > 0) {
      console.log(`   Cached: ${(totalCached / 1_000_000).toFixed(2)}M tokens (${Math.round(100 * totalCached / totalInput)}% hit rate)`);
    }
    
    console.log(`\n📊 By model:`);
    for (const [model, stats] of byModel.entries()) {
      console.log(`   ${model}: ${stats.count} records, $${stats.cost.toFixed(2)}`);
    }
  }

  return { records, dryRun };
}

// v22: Ingest records to Azure Monitor (separated for cleaner error handling)
async function ingestRecords(records: AuditRecord[], dryRun: boolean, verbose: boolean): Promise<void> {
  if (dryRun) {
    console.log("\n[DRY RUN] Would ingest:");
    for (const r of records.slice(0, 10)) {
      console.log(`  ${r.Repository} run ${r.RunId} (${r.ModelId}): $${r.EstimatedCostUSD.toFixed(4)}`);
    }
    if (records.length > 10) {
      console.log(`  ... and ${records.length - 10} more`);
    }
  } else if (records.length > 0 && DCE_ENDPOINT && DCR_ID) {
    console.log(`\n📤 Ingesting to Azure Monitor (${AUDIT_STREAM_NAME})...`);
    const credential = new DefaultAzureCredential();
    const client = new LogsIngestionClient(DCE_ENDPOINT, credential);
    
    // v13: Re-throw ingestion errors to fail the job (no silent data loss)
    await client.upload(DCR_ID, AUDIT_STREAM_NAME, records as any);
    console.log(`✓ Ingested ${records.length} audit records`);
  } else if (records.length === 0) {
    console.log("\n✓ No records to ingest");
  } else {
    console.log("\n⚠️  Set AZURE_MONITOR_DCE_ENDPOINT and AZURE_MONITOR_DCR_ID to ingest");
  }
}

// v22: CLI setup using commander for better UX
program
  .name("aw-audit")
  .description("Audit enrichment for agentic workflow runs - collects token usage from gh aw audit")
  .version(`v${AUDIT_VERSION}`)
  .option("-r, --repo <repo>", "Specific repo to audit (owner/name)")
  .option("--repos <repos>", "Comma-separated list of repos")
  .option("-l, --limit <count>", "Maximum runs to audit", "500")
  .option("-d, --days <days>", "Days to look back", "7")
  .option("-n, --dry-run", "Dry run (don't push to Azure Monitor)")
  .option("--github-api", "Use GitHub API directly instead of Log Analytics inventory")
  .option("-v, --verbose", "Verbose output")
  .addHelpText("after", `
Environment Variables:
  AZURE_MONITOR_WORKSPACE_ID   Log Analytics workspace ID (required for inventory mode)
  AZURE_MONITOR_DCE_ENDPOINT   Data Collection Endpoint URL (required for ingestion)
  AZURE_MONITOR_DCR_ID         Data Collection Rule ID (required for ingestion)
  GITHUB_TOKEN                 GitHub token (for --github-api mode)

Examples:
  $ node dist/audit-enrichment.js --dry-run --verbose
  $ node dist/audit-enrichment.js --repo Azure/azure-sdk-for-js --limit 10
  $ node dist/audit-enrichment.js --github-api --days 3
  $ node dist/audit-enrichment.js --repos Azure/azure-sdk-for-js,Azure/azure-sdk-for-python

Audit Status Values:
  success      - Audit completed, token data present
  zero_tokens  - Audit completed, but no billable usage
  no_firewall  - Audit ran, but firewall section missing
  audit_failed - gh aw audit command failed (retried up to ${MAX_AUDIT_RETRIES}x)
`)
  .action(async (options) => {
    try {
      // v22: Strict numeric validation using shared helper
      const limitResult = validatePositiveInteger(options.limit);
      if (!limitResult.valid) {
        console.error(`❌ Invalid --limit value: must be a positive integer (got: ${options.limit})`);
        process.exit(EXIT_USAGE_ERROR);
      }
      
      const daysResult = validatePositiveInteger(options.days);
      if (!daysResult.valid) {
        console.error(`❌ Invalid --days value: must be a positive integer (got: ${options.days})`);
        process.exit(EXIT_USAGE_ERROR);
      }
      
      // v22: Determine repos
      let repos = MONITORED_REPOS;
      if (options.repo) {
        repos = [options.repo];
      } else if (options.repos) {
        repos = options.repos.split(",").map((r: string) => r.trim());
      }
      
      const config = {
        limit: limitResult.value,
        days: daysResult.value,
        dryRun: options.dryRun || false,
        useGitHubApi: options.githubApi || false,
        verbose: options.verbose || false,
        repos,
      };
      
      // v23: Fail fast on missing config in live mode (no silent dry-run fallback)
      if (!config.dryRun && (!DCE_ENDPOINT || !DCR_ID)) {
        console.error("❌ Missing Azure Monitor configuration for live mode");
        console.error("   Required: AZURE_MONITOR_DCE_ENDPOINT, AZURE_MONITOR_DCR_ID");
        console.error("   Or use --dry-run for local testing");
        process.exit(EXIT_CONFIG_ERROR);
      }
      
      // v23: Inventory mode requires workspace ID
      if (!config.useGitHubApi && !WORKSPACE_ID) {
        console.error("❌ Inventory mode requires AZURE_MONITOR_WORKSPACE_ID");
        console.error("   Set the env var, or use --github-api for GitHub API mode");
        process.exit(EXIT_CONFIG_ERROR);
      }
      
      // v23: Run preflight checks with real validation
      const needsAzure = !config.dryRun || (!config.useGitHubApi && !!WORKSPACE_ID);
      const preflight = await runPreflightChecks({
        needsGh: true, // Always need gh for auditing
        needsAzure,
        verbose: config.verbose,
      });
      
      if (!preflight.success) {
        console.error("\n❌ Preflight checks failed:\n");
        for (const error of preflight.errors) {
          console.error(`   • ${error}\n`);
        }
        process.exit(EXIT_CONFIG_ERROR);
      }
      
      console.log(`\n🔍 Audit Enrichment v${AUDIT_VERSION}`);
      console.log(`📊 Mode: ${config.useGitHubApi ? "GITHUB API" : "INVENTORY (WorkflowRuns_CL)"}`);
      console.log(`📁 Repos: ${config.repos.length === MONITORED_REPOS.length ? "all monitored" : config.repos.join(", ")}`);
      console.log(`🔢 Limit: ${config.limit} runs`);
      console.log(`📅 Lookback: ${config.days} days`);
      console.log(`⚡ Concurrency: ${MAX_CONCURRENCY}`);
      console.log(`🧪 Run mode: ${config.dryRun ? "DRY RUN" : "LIVE"}\n`);
      
      const result = await processAudits(config);
      await ingestRecords(result.records, result.dryRun, config.verbose);
      
      process.exit(EXIT_SUCCESS);
    } catch (err) {
      // v22: Categorize errors for better exit codes
      const errMsg = err instanceof Error ? err.message : String(err);
      
      if (errMsg.includes("PartialFailure") || errMsg.includes("incomplete data")) {
        console.error("❌ Data integrity error:", errMsg);
        process.exit(EXIT_DATA_ERROR);
      } else if (errMsg.includes("authentication") || errMsg.includes("credential") || errMsg.includes("401")) {
        console.error("❌ Authentication error:", errMsg);
        console.error("   Run 'az login' or check your Azure credentials");
        process.exit(EXIT_AUTH_ERROR);
      } else if (errMsg.includes("upload") || errMsg.includes("ingest")) {
        console.error("❌ Ingestion error:", errMsg);
        process.exit(EXIT_INGESTION_ERROR);
      } else {
        console.error("❌ Fatal error:", err);
        process.exit(EXIT_DATA_ERROR);
      }
    }
  });

// v22: Core audit processing logic (extracted for testability)
interface AuditConfig {
  limit: number;
  days: number;
  dryRun: boolean;
  useGitHubApi: boolean;
  verbose: boolean;
  repos: string[];
}

async function processAudits(config: AuditConfig): Promise<{ records: AuditRecord[]; dryRun: boolean }> {
  // Get runs to audit
  let runs: RunInfo[];
  let fetchErrors: string[] = [];
  
  if (config.useGitHubApi) {
    // v18: Pass days to github-api for time filtering
    const result = await getRunsFromGitHub(config.repos, config.days, config.limit);
    runs = result.runs;
    fetchErrors = result.errors;
    
    // v13: Fail if ALL repos failed (no data at all)
    if (runs.length === 0 && fetchErrors.length > 0) {
      console.error(`\n❌ All repository fetches failed:`);
      for (const err of fetchErrors) {
        console.error(`   - ${err}`);
      }
      throw new Error("All repository fetches failed - incomplete data");
    }
    
    // v19: Fail on partial fetch failures too (data integrity > availability)
    if (fetchErrors.length > 0) {
      console.error(`\n❌ ${fetchErrors.length} repo(s) failed to fetch:`);
      for (const err of fetchErrors) {
        console.error(`   - ${err}`);
      }
      throw new Error("Partial fetch failures - incomplete data");
    }
  } else {
    console.log("📡 Querying WorkflowRuns_CL for runs missing audit data...\n");
    const credential = new DefaultAzureCredential();
    const logsClient = new LogsQueryClient(credential);
    // WORKSPACE_ID is guaranteed to exist here due to config validation above
    runs = await getRunsFromInventory(logsClient, WORKSPACE_ID!, config.days, config.limit);
    console.log(`✓ Found ${runs.length} runs needing audit\n`);
  }
  
  // v22: Filter by repo if specified
  if (config.repos !== MONITORED_REPOS) {
    const repoSet = new Set(config.repos);
    runs = runs.filter(r => repoSet.has(r.repo));
  }
  
  if (runs.length === 0) {
    console.log("✓ All runs are already audited (or no runs found)");
    return { records: [], dryRun: config.dryRun };
  }
  
  return runAuditProcessing(runs, config.dryRun, config.verbose);
}

// v10: Guard main() to only run when executed directly (not imported)
// Uses fileURLToPath for cross-platform compatibility (Windows, paths with spaces)
const isMainModule = (() => {
  try {
    const thisFile = fileURLToPath(import.meta.url);
    const entryArg = process.argv[1];
    if (!entryArg) return false;
    const entryFile = resolve(entryArg);
    return thisFile === entryFile;
  } catch {
    return false;
  }
})();

if (isMainModule) {
  program.parse();
}
