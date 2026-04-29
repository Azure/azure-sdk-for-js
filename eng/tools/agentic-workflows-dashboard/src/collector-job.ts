/**
 * Agentic Workflows Collector Job
 * 
 * Standalone Node.js script for collecting workflow runs and audit data.
 * Designed to run as a Container Apps Job on a schedule.
 * 
 * Authentication (in order of preference):
 * 1. EngSys Key Vault signing (GITHUB_KV_NAME + GITHUB_KV_KEY_NAME + GITHUB_APP_ID)
 *    - Uses Azure SDK Automation App with non-exportable key in EngSys Key Vault
 *    - Most secure: private key never leaves Key Vault
 * 2. GitHub App with private key (GITHUB_APP_ID + GITHUB_APP_PRIVATE_KEY + GITHUB_APP_INSTALLATION_ID)
 *    - Uses your own GitHub App with private key stored in your Key Vault
 * 3. GitHub PAT (GITHUB_TOKEN)
 *    - Legacy: uses a long-lived Personal Access Token
 * 
 * Required environment variables:
 * - AZURE_MONITOR_DCE_ENDPOINT: Data Collection Endpoint URL
 * - AZURE_MONITOR_DCR_ID: Data Collection Rule ID
 * - STORAGE_ACCOUNT_NAME: Azure Storage account for state
 * - REPOSITORIES: Comma-separated list of repos to monitor (required)
 */

import { DefaultAzureCredential } from "@azure/identity";
import { CryptographyClient, KeyClient } from "@azure/keyvault-keys";
import { LogsIngestionClient } from "@azure/monitor-ingestion";
import { BlobServiceClient } from "@azure/storage-blob";
import { createAppAuth } from "@octokit/auth-app";
import { createHash } from "node:crypto";
import { spawn } from "node:child_process";

// ========== GitHub Authentication ==========

// EngSys Key Vault config (preferred - uses shared Azure SDK Automation App)
interface EngSysKvConfig {
  keyVaultName: string;       // e.g., "azuresdkengkeyvault"
  keyName: string;            // e.g., "azure-sdk-automation"
  appId: string;              // e.g., "1086291"
  installationOwner: string;  // e.g., "Azure"
}

// GitHub App config (alternative - your own App with private key)
interface GitHubAppConfig {
  appId: string;
  privateKey: string;
  installationId: string;
}

// Check if EngSys Key Vault signing is configured
function getEngSysKvConfig(): EngSysKvConfig | null {
  const keyVaultName = process.env.GITHUB_KV_NAME;
  const keyName = process.env.GITHUB_KV_KEY_NAME;
  const appId = process.env.GITHUB_APP_ID;
  
  if (keyVaultName && keyName && appId) {
    return {
      keyVaultName,
      keyName,
      appId,
      installationOwner: process.env.GITHUB_INSTALLATION_OWNER || "Azure",
    };
  }
  return null;
}

// Check if GitHub App with private key is configured
function getGitHubAppConfig(): GitHubAppConfig | null {
  const appId = process.env.GITHUB_APP_ID;
  const privateKey = process.env.GITHUB_APP_PRIVATE_KEY;
  const installationId = process.env.GITHUB_APP_INSTALLATION_ID;
  
  if (appId && privateKey && installationId) {
    return { appId, privateKey, installationId };
  }
  return null;
}

// Base64URL encode (JWT format)
function base64UrlEncode(data: Buffer | string): string {
  const buffer = typeof data === "string" ? Buffer.from(data) : data;
  return buffer.toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

// Generate JWT signed via Azure Key Vault (key never exported)
async function generateJwtViaKeyVault(kvConfig: EngSysKvConfig): Promise<string> {
  const credential = new DefaultAzureCredential();
  const keyVaultUrl = `https://${kvConfig.keyVaultName}.vault.azure.net`;
  
  // Get the key reference
  const keyClient = new KeyClient(keyVaultUrl, credential);
  const key = await keyClient.getKey(kvConfig.keyName);
  
  if (!key.id) {
    throw new Error(`Key ${kvConfig.keyName} not found in ${kvConfig.keyVaultName}`);
  }
  
  // Create JWT header and payload
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iat: now - 10,     // 10 seconds clock skew
    exp: now + 600,    // 10 minutes
    iss: kvConfig.appId,
  };
  
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;
  
  // Hash the unsigned token (RS256 signs the SHA-256 hash)
  const digest = createHash("sha256").update(unsignedToken).digest();
  
  // Sign using Key Vault (private key never leaves KV)
  const cryptoClient = new CryptographyClient(key.id, credential);
  const signResult = await cryptoClient.sign("RS256", digest);
  
  const signature = base64UrlEncode(Buffer.from(signResult.result));
  return `${unsignedToken}.${signature}`;
}

// Get GitHub App installation ID for an org
async function getInstallationId(jwt: string, owner: string): Promise<string> {
  const response = await fetch("https://api.github.com/app/installations", {
    headers: {
      Authorization: `Bearer ${jwt}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  
  if (!response.ok) {
    throw new Error(`Failed to list installations: ${response.status}`);
  }
  
  const installations = await response.json() as Array<{ id: number; account: { login: string } }>;
  const installation = installations.find(i => i.account.login.toLowerCase() === owner.toLowerCase());
  
  if (!installation) {
    throw new Error(`No installation found for ${owner}. Available: ${installations.map(i => i.account.login).join(", ")}`);
  }
  
  return String(installation.id);
}

// Exchange JWT for installation access token
async function getInstallationAccessToken(jwt: string, installationId: string): Promise<string> {
  const response = await fetch(`https://api.github.com/app/installations/${installationId}/access_tokens`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  
  if (!response.ok) {
    throw new Error(`Failed to get installation token: ${response.status}`);
  }
  
  const data = await response.json() as { token: string };
  return data.token;
}

// Authenticate using EngSys Key Vault signing
async function authenticateViaEngSysKv(kvConfig: EngSysKvConfig): Promise<string> {
  log.info(`Signing JWT via Key Vault: ${kvConfig.keyVaultName}/${kvConfig.keyName}`);
  const jwt = await generateJwtViaKeyVault(kvConfig);
  
  log.info(`Finding installation for: ${kvConfig.installationOwner}`);
  const installationId = await getInstallationId(jwt, kvConfig.installationOwner);
  log.info(`Installation ID: ${installationId}`);
  
  log.info("Exchanging JWT for installation token...");
  return getInstallationAccessToken(jwt, installationId);
}

// Authenticate using GitHub App with private key
async function authenticateViaGitHubApp(appConfig: GitHubAppConfig): Promise<string> {
  const auth = createAppAuth({
    appId: appConfig.appId,
    privateKey: appConfig.privateKey,
    installationId: parseInt(appConfig.installationId, 10),
  });
  
  const { token } = await auth({ type: "installation" });
  return token;
}

// Configuration from environment
const config = {
  dceEndpoint: process.env.AZURE_MONITOR_DCE_ENDPOINT!,
  dcrId: process.env.AZURE_MONITOR_DCR_ID!,
  // Token will be set dynamically - either from PAT or GitHub App
  githubToken: "",
  // REPOSITORIES is required - set via Bicep parameter monitoredRepositories
  repositories: (process.env.REPOSITORIES || "").split(",").filter(r => r.trim()),
  storageAccountName: process.env.STORAGE_ACCOUNT_NAME || "",
};

const STATE_CONTAINER = "collection-state";
const RUNS_STATE_BLOB = "workflow-runs-state.json";
const AUDIT_STATE_BLOB = "workflow-audit-state.json";
const AUDIT_VERSION = 25;

// Conclusions that can be audited (completed runs with meaningful output)
const AUDITABLE_CONCLUSIONS = ["success", "failure"];

// State tracking for runs collection
interface RepoState {
  lastCollectedAt: string;
  lastRunAt: string;
  lastRunCount: number;
}

// Track run ID with timestamp for time-based pruning
interface TrackedRun {
  key: string;        // RunId:RunAttempt
  ingestedAt: string; // ISO timestamp
}

interface CollectionState {
  version: number;
  repos: Record<string, RepoState>;
  // Track ingested runs with timestamps (for 90-day pruning)
  ingestedRuns: TrackedRun[];
}

// Retention period matches Log Analytics (90 days)
const RETENTION_DAYS = 90;

function runKey(runId: number, attempt: number): string {
  return `${runId}:${attempt}`;
}

function pruneOldRuns(runs: TrackedRun[]): TrackedRun[] {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - RETENTION_DAYS);
  return runs.filter(r => new Date(r.ingestedAt) > cutoff);
}

// Track audited run ID with timestamp for time-based pruning
interface TrackedAudit {
  key: string;        // repo:runId:attempt
  auditedAt: string;  // ISO timestamp
}

// State tracking for audit - tracks audited run IDs with timestamps
interface AuditState {
  version: number;
  // Legacy format: string[] - auto-migrated to TrackedAudit[]
  auditedRuns: TrackedAudit[] | string[];
}

function pruneOldAudits(audits: TrackedAudit[]): TrackedAudit[] {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - RETENTION_DAYS);
  return audits.filter(a => new Date(a.auditedAt) > cutoff);
}

// Migrate legacy string[] format to TrackedAudit[] format
function migrateAuditState(state: AuditState): TrackedAudit[] {
  if (state.auditedRuns.length === 0) return [];
  
  // Check if already new format
  if (typeof state.auditedRuns[0] === "object") {
    return state.auditedRuns as TrackedAudit[];
  }
  
  // Migrate: assign current timestamp (will expire naturally over 90 days)
  const now = new Date().toISOString();
  return (state.auditedRuns as string[]).map(key => ({ key, auditedAt: now }));
}

interface GitHubWorkflow {
  id: number;
  name: string;
  path: string;
  state: string;
}

interface GitHubWorkflowsResponse {
  workflows: GitHubWorkflow[];
}

interface WorkflowRun {
  id: number;
  workflow_id: number;
  name: string;
  run_number: number;
  run_attempt: number;
  status: string;
  conclusion: string | null;
  event: string;
  created_at: string;
  updated_at: string;
  run_started_at: string | null;
  head_branch: string;
  head_sha: string;
  html_url: string;
  actor: { login: string; type: string } | null;
  triggering_actor: { login: string } | null;
  repository: { full_name: string };
  head_repository: { full_name: string } | null;
  pull_requests: Array<{
    number: number;
    base: { repo: { url: string } };
  }>;
}

interface GitHubRunsResponse {
  workflow_runs: WorkflowRun[];
}

interface WorkflowRunRecord {
  TimeGenerated: string;
  Repository: string;
  WorkflowName: string;
  WorkflowId: number;
  RunId: number;
  RunAttempt: number;
  Status: string;
  Conclusion: string | null;
  CreatedAt: string;
  StartedAt: string | null;
  CompletedAt: string | null;
  QueueTime_s: number | null;
  Duration_s: number | null;
  TriggerEvent: string;
  Actor: string | null;
  ActorType: string | null;
  HeadBranch: string;
  HeadSha: string;
  HeadRepo: string | null;
  IsFromFork: "true" | "false" | "unknown";
  PullRequestNumber: number | null;
  PullRequestRepo: string | null;
  RunUrl: string;
}

// Audit record for WorkflowAudit_CL
interface AuditRecord {
  TimeGenerated: string;
  RunId: number;
  RunAttempt: number;
  Repository: string;
  WorkflowName: string;
  CreatedAt: string;
  CompletedAt: string;
  PullRequestNumber: number;
  InputTokens: number;
  OutputTokens: number;
  CacheReadTokens: number;
  CacheWriteTokens: number;
  CacheHitRate: number;
  Turns: number;
  ToolCalls: number;
  ErrorCount: number;
  ModelId: string;
  RequestCount: number;
  DurationMs: number;
  EstimatedCostUSD: number;
  EstimatedSavingsUSD: number;
  IsPrimaryModel: boolean;
  HasTokenData: boolean;
  AuditStatus: string;
  AuditVersion: number;
}

// gh aw audit output structure
interface AuditResult {
  overview?: {
    conclusion?: string;
    duration?: string;
    created_at?: string;
  };
  metrics?: {
    turns?: number;
    error_count?: number;
  };
  tool_usage?: Array<{ call_count?: number }>;
  firewall_token_usage?: {
    total_input_tokens?: number;
    total_output_tokens?: number;
    total_cache_read_tokens?: number;
    total_cache_write_tokens?: number;
    total_requests?: number;
    total_duration_ms?: number;
    by_model?: Record<string, {
      input_tokens?: number;
      output_tokens?: number;
      cache_read_tokens?: number;
      cache_write_tokens?: number;
      requests?: number;
      duration_ms?: number;
    }>;
  };
}

// Model pricing (USD per million tokens)
const MODEL_COSTS: Record<string, { input: number; output: number; cacheRead: number }> = {
  "claude-sonnet-4.6": { input: 3.0, output: 15.0, cacheRead: 0.3 },
  "claude-sonnet-4.5": { input: 3.0, output: 15.0, cacheRead: 0.3 },
  "claude-haiku-4.5": { input: 0.8, output: 4.0, cacheRead: 0.08 },
  "claude-opus-4": { input: 15.0, output: 75.0, cacheRead: 1.5 },
  "gpt-5": { input: 2.5, output: 10.0, cacheRead: 0.25 },
  "gpt-4.1": { input: 2.0, output: 8.0, cacheRead: 0.2 },
  default: { input: 3.0, output: 15.0, cacheRead: 0.3 },
};

function getModelCosts(modelId: string): { input: number; output: number; cacheRead: number } {
  for (const [prefix, costs] of Object.entries(MODEL_COSTS)) {
    if (modelId.startsWith(prefix)) return costs;
  }
  return MODEL_COSTS["default"] ?? { input: 3.0, output: 15.0, cacheRead: 0.3 };
}

// Simple logging
const log = {
  info: (msg: string) => console.log(`[INFO] ${new Date().toISOString()} ${msg}`),
  warn: (msg: string) => console.warn(`[WARN] ${new Date().toISOString()} ${msg}`),
  error: (msg: string) => console.error(`[ERROR] ${new Date().toISOString()} ${msg}`),
};

async function githubFetch<T>(url: string): Promise<T | null> {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${config.githubToken}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (!response.ok) {
    log.warn(`GitHub API error: ${url} returned ${response.status}`);
    return null;
  }

  return response.json() as Promise<T>;
}

async function discoverAgenticWorkflows(owner: string, repo: string): Promise<GitHubWorkflow[]> {
  const url = `https://api.github.com/repos/${owner}/${repo}/actions/workflows?per_page=100`;
  const response = await githubFetch<GitHubWorkflowsResponse>(url);
  
  if (!response) return [];
  
  // Filter for agentic workflows (*.lock.yml)
  return response.workflows.filter(
    (wf) => wf.path.endsWith(".lock.yml") && wf.state === "active"
  );
}

async function fetchWorkflowRuns(
  owner: string,
  repo: string,
  workflowId: number,
  since?: string
): Promise<WorkflowRun[]> {
  const allRuns: WorkflowRun[] = [];
  let page = 1;
  const perPage = 100;
  
  // Paginate to get all runs (not just first 100)
  while (true) {
    let url = `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflowId}/runs?per_page=${perPage}&page=${page}&status=completed`;
    
    if (since) {
      url += `&created=>${since}`;
    }
    
    const response = await githubFetch<GitHubRunsResponse>(url);
    const runs = response?.workflow_runs ?? [];
    
    if (runs.length === 0) break;
    
    allRuns.push(...runs);
    
    // Stop if we got fewer than perPage (last page)
    if (runs.length < perPage) break;
    
    page++;
    
    // Safety limit: max 10 pages (1000 runs per workflow per collection)
    if (page > 10) {
      log.warn(`Reached pagination limit for workflow ${workflowId}, some runs may be missed`);
      break;
    }
  }
  
  return allRuns;
}

function transformRun(repo: string, run: WorkflowRun): WorkflowRunRecord | null {
  if (run.status !== "completed") {
    return null;
  }

  const now = new Date().toISOString();
  const createdAt = new Date(run.created_at);
  const startedAt = run.run_started_at ? new Date(run.run_started_at) : null;
  const completedAt = run.updated_at ? new Date(run.updated_at) : null;

  let queueTime: number | null = null;
  let duration: number | null = null;

  if (startedAt) {
    queueTime = Math.round((startedAt.getTime() - createdAt.getTime()) / 1000);
  }
  if (startedAt && completedAt) {
    duration = Math.round((completedAt.getTime() - startedAt.getTime()) / 1000);
  }

  const isPREvent = run.event === "pull_request" || run.event === "pull_request_target";
  const firstPR = isPREvent ? run.pull_requests?.[0] : undefined;
  const pullRequestNumber = firstPR?.number ?? null;
  const prRepoUrl = firstPR?.base?.repo?.url;
  const prRepoMatch = prRepoUrl ? prRepoUrl.match(/repos\/([^/]+\/[^/]+)/) : null;
  const pullRequestRepo: string | null = prRepoMatch?.[1] ?? null;

  let isFromFork: "true" | "false" | "unknown";
  if (!run.head_repository) {
    isFromFork = "unknown";
  } else if (run.head_repository.full_name !== repo) {
    isFromFork = "true";
  } else {
    isFromFork = "false";
  }

  return {
    TimeGenerated: now,
    Repository: repo,
    WorkflowName: run.name,
    WorkflowId: run.workflow_id,
    RunId: run.id,
    RunAttempt: run.run_attempt,
    Status: run.status,
    Conclusion: run.conclusion,
    CreatedAt: run.created_at,
    StartedAt: run.run_started_at,
    CompletedAt: run.updated_at,
    QueueTime_s: queueTime,
    Duration_s: duration,
    TriggerEvent: run.event,
    Actor: run.actor?.login ?? null,
    ActorType: run.actor?.type ?? null,
    HeadBranch: run.head_branch,
    HeadSha: run.head_sha,
    HeadRepo: run.head_repository?.full_name ?? null,
    IsFromFork: isFromFork,
    PullRequestNumber: pullRequestNumber,
    PullRequestRepo: pullRequestRepo,
    RunUrl: run.html_url,
  };
}

async function ingestRecords(records: WorkflowRunRecord[]): Promise<void> {
  if (records.length === 0) {
    log.info("No run records to ingest");
    return;
  }

  const credential = new DefaultAzureCredential();
  const client = new LogsIngestionClient(config.dceEndpoint, credential);
  const streamName = "Custom-WorkflowRuns_CL";
  const batchSize = 100;

  for (let i = 0; i < records.length; i += batchSize) {
    const batch = records.slice(i, i + batchSize) as unknown as Record<string, unknown>[];
    await client.upload(config.dcrId, streamName, batch);
    log.info(`Ingested run batch ${Math.floor(i / batchSize) + 1}: ${batch.length} records`);
  }

  log.info(`Total run records ingested: ${records.length}`);
}

async function loadBlobState<T>(blobName: string, defaultState: T): Promise<T> {
  if (!config.storageAccountName) {
    log.info(`No storage account configured, using default state for ${blobName}`);
    return defaultState;
  }

  const credential = new DefaultAzureCredential();
  const blobServiceUrl = `https://${config.storageAccountName}.blob.core.windows.net`;
  const blobServiceClient = new BlobServiceClient(blobServiceUrl, credential);
  const containerClient = blobServiceClient.getContainerClient(STATE_CONTAINER);
  const blobClient = containerClient.getBlockBlobClient(blobName);

  try {
    const downloadResponse = await blobClient.download();
    const chunks: Buffer[] = [];
    for await (const chunk of downloadResponse.readableStreamBody!) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
    const content = Buffer.concat(chunks).toString("utf-8");
    return JSON.parse(content) as T;
  } catch (error: unknown) {
    if ((error as { statusCode?: number }).statusCode === 404) {
      log.info(`No existing ${blobName} found, using default`);
      return defaultState;
    }
    throw error;
  }
}

async function saveBlobState<T>(blobName: string, state: T): Promise<void> {
  if (!config.storageAccountName) {
    log.info(`No storage account configured, skipping ${blobName} save`);
    return;
  }

  const credential = new DefaultAzureCredential();
  const blobServiceUrl = `https://${config.storageAccountName}.blob.core.windows.net`;
  const blobServiceClient = new BlobServiceClient(blobServiceUrl, credential);
  const containerClient = blobServiceClient.getContainerClient(STATE_CONTAINER);

  await containerClient.createIfNotExists();

  const blobClient = containerClient.getBlockBlobClient(blobName);
  const content = JSON.stringify(state, null, 2);
  const contentBuffer = Buffer.from(content);

  // upload() overwrites by default - no need to delete first
  await blobClient.upload(contentBuffer, contentBuffer.length, {
    blobHTTPHeaders: { blobContentType: "application/json" },
  });
}

async function runAudit(repo: string, runId: number): Promise<AuditResult | null> {
  return new Promise((resolve) => {
    log.info(`Running audit: gh aw audit ${runId} --repo ${repo} --json`);
    
    const proc = spawn("gh", ["aw", "audit", String(runId), "--repo", repo, "--json"], {
      timeout: 120000, // 2 minute timeout
      env: { ...process.env, GH_TOKEN: config.githubToken },
    });

    let stdout = "";
    let stderr = "";

    proc.stdout.on("data", (chunk) => (stdout += chunk));
    proc.stderr.on("data", (chunk) => (stderr += chunk));

    proc.on("close", (code) => {
      if (code !== 0) {
        log.warn(`Audit failed for ${repo}#${runId}: ${stderr || `exit ${code}`}`);
        resolve(null);
        return;
      }
      try {
        resolve(JSON.parse(stdout) as AuditResult);
      } catch {
        log.warn(`Failed to parse audit JSON for ${repo}#${runId}`);
        resolve(null);
      }
    });

    proc.on("error", (err) => {
      log.warn(`Audit spawn error for ${repo}#${runId}: ${err.message}`);
      resolve(null);
    });
  });
}

function createAuditRecord(run: WorkflowRunRecord, audit: AuditResult | null): AuditRecord {
  const now = new Date().toISOString();
  const usage = audit?.firewall_token_usage;

  if (!audit || !usage) {
    return {
      TimeGenerated: now,
      RunId: run.RunId,
      RunAttempt: run.RunAttempt,
      Repository: run.Repository,
      WorkflowName: run.WorkflowName,
      CreatedAt: run.CreatedAt,
      CompletedAt: run.CompletedAt ?? now,
      PullRequestNumber: run.PullRequestNumber ?? 0,
      InputTokens: 0,
      OutputTokens: 0,
      CacheReadTokens: 0,
      CacheWriteTokens: 0,
      CacheHitRate: 0,
      Turns: audit?.metrics?.turns ?? 0,
      ToolCalls: (audit?.tool_usage ?? []).reduce((sum, t) => sum + (t.call_count ?? 0), 0),
      ErrorCount: audit?.metrics?.error_count ?? 0,
      ModelId: "none",
      RequestCount: 0,
      DurationMs: 0,
      EstimatedCostUSD: 0,
      EstimatedSavingsUSD: 0,
      IsPrimaryModel: true,
      HasTokenData: false,
      AuditStatus: audit ? "no_firewall" : "audit_failed",
      AuditVersion: AUDIT_VERSION,
    };
  }

  const byModel = usage.by_model ?? {};
  const modelEntries = Object.entries(byModel);
  let primaryModel = "unknown";
  if (modelEntries.length > 0) {
    const sorted = modelEntries.sort((a, b) =>
      ((b[1].input_tokens ?? 0) + (b[1].output_tokens ?? 0)) -
      ((a[1].input_tokens ?? 0) + (a[1].output_tokens ?? 0))
    );
    primaryModel = sorted[0]?.[0] ?? "unknown";
  }

  const inputTokens = usage.total_input_tokens ?? 0;
  const outputTokens = usage.total_output_tokens ?? 0;
  const cacheReadTokens = usage.total_cache_read_tokens ?? 0;
  const cacheWriteTokens = usage.total_cache_write_tokens ?? 0;

  const costs = getModelCosts(primaryModel);
  const cost = (inputTokens * costs.input + outputTokens * costs.output + cacheReadTokens * costs.cacheRead) / 1_000_000;
  const savings = (cacheReadTokens * (costs.input - costs.cacheRead)) / 1_000_000;
  const cacheHitRate = inputTokens > 0 ? (cacheReadTokens / inputTokens) * 100 : 0;

  const hasTokenData = inputTokens > 0 || outputTokens > 0;

  return {
    TimeGenerated: now,
    RunId: run.RunId,
    RunAttempt: run.RunAttempt,
    Repository: run.Repository,
    WorkflowName: run.WorkflowName,
    CreatedAt: run.CreatedAt,
    CompletedAt: run.CompletedAt ?? now,
    PullRequestNumber: run.PullRequestNumber ?? 0,
    InputTokens: inputTokens,
    OutputTokens: outputTokens,
    CacheReadTokens: cacheReadTokens,
    CacheWriteTokens: cacheWriteTokens,
    CacheHitRate: Math.round(cacheHitRate * 10) / 10,
    Turns: audit.metrics?.turns ?? 0,
    ToolCalls: (audit.tool_usage ?? []).reduce((sum, t) => sum + (t.call_count ?? 0), 0),
    ErrorCount: audit.metrics?.error_count ?? 0,
    ModelId: primaryModel,
    RequestCount: usage.total_requests ?? 0,
    DurationMs: usage.total_duration_ms ?? 0,
    EstimatedCostUSD: Math.round(cost * 10000) / 10000,
    EstimatedSavingsUSD: Math.round(savings * 10000) / 10000,
    IsPrimaryModel: true,
    HasTokenData: hasTokenData,
    AuditStatus: hasTokenData ? "success" : "zero_tokens",
    AuditVersion: AUDIT_VERSION,
  };
}

async function ingestAuditRecords(records: AuditRecord[]): Promise<void> {
  if (records.length === 0) {
    log.info("No audit records to ingest");
    return;
  }

  const credential = new DefaultAzureCredential();
  const client = new LogsIngestionClient(config.dceEndpoint, credential);
  const streamName = "Custom-WorkflowAudit_CL";
  const batchSize = 100;

  for (let i = 0; i < records.length; i += batchSize) {
    const batch = records.slice(i, i + batchSize) as unknown as Record<string, unknown>[];
    await client.upload(config.dcrId, streamName, batch);
    log.info(`Ingested audit batch ${Math.floor(i / batchSize) + 1}: ${batch.length} records`);
  }

  log.info(`Total audit records ingested: ${records.length}`);
}

function auditKey(repo: string, runId: number, attempt: number): string {
  return `${repo}:${runId}:${attempt}`;
}

async function main(): Promise<void> {
  log.info("=== Agentic Workflows Collector Job ===");

  // Initialize GitHub authentication (in order of preference)
  const engSysKvConfig = getEngSysKvConfig();
  const appConfig = getGitHubAppConfig();
  
  try {
    if (engSysKvConfig) {
      // Option 1: EngSys Key Vault signing (most secure - key never exported)
      log.info("Using EngSys Key Vault signing (Azure SDK Automation App)");
      config.githubToken = await authenticateViaEngSysKv(engSysKvConfig);
      log.info("Generated installation token via Key Vault signing");
    } else if (appConfig) {
      // Option 2: GitHub App with private key
      log.info("Using GitHub App authentication (private key)");
      config.githubToken = await authenticateViaGitHubApp(appConfig);
      log.info("Generated installation token (expires in 1 hour)");
    } else if (process.env.GITHUB_TOKEN) {
      // Option 3: PAT (legacy)
      log.info("Using GitHub PAT authentication (legacy)");
      config.githubToken = process.env.GITHUB_TOKEN;
    } else {
      log.error("No GitHub authentication configured. Options:");
      log.error("  1. EngSys KV: GITHUB_KV_NAME, GITHUB_KV_KEY_NAME, GITHUB_APP_ID");
      log.error("  2. GitHub App: GITHUB_APP_ID, GITHUB_APP_PRIVATE_KEY, GITHUB_APP_INSTALLATION_ID");
      log.error("  3. PAT: GITHUB_TOKEN");
      process.exit(1);
    }
  } catch (error) {
    log.error(`GitHub authentication failed: ${error}`);
    process.exit(1);
  }

  // Validate config
  if (!config.dceEndpoint || !config.dcrId) {
    log.error("Missing required environment variables: AZURE_MONITOR_DCE_ENDPOINT, AZURE_MONITOR_DCR_ID");
    process.exit(1);
  }

  if (config.repositories.length === 0) {
    log.error("REPOSITORIES environment variable is required (comma-separated list)");
    process.exit(1);
  }

  log.info(`Repositories: ${config.repositories.join(", ")}`);

  // Load existing state
  const defaultRunsState: CollectionState = { version: 1, repos: {}, ingestedRuns: [] };
  const runsState = await loadBlobState(RUNS_STATE_BLOB, defaultRunsState);
  
  // Migrate old state format and prune old runs
  if (!runsState.ingestedRuns) {
    runsState.ingestedRuns = [];
  }
  
  // Handle migration from string[] to TrackedRun[] format
  const migratedRuns: TrackedRun[] = runsState.ingestedRuns.map(r => {
    if (typeof r === 'string') {
      // Old format: just the key string - assume recent
      return { key: r, ingestedAt: new Date().toISOString() };
    }
    return r as TrackedRun;
  });
  
  // Prune runs older than 90 days
  const prunedRuns = pruneOldRuns(migratedRuns);
  const prunedCount = migratedRuns.length - prunedRuns.length;
  if (prunedCount > 0) {
    log.info(`Pruned ${prunedCount} runs older than ${RETENTION_DAYS} days`);
  }
  
  const ingestedSet = new Set(prunedRuns.map(r => r.key));
  log.info(`Loaded runs state: ${Object.keys(runsState.repos).length} repos tracked, ${ingestedSet.size} runs in tracking window`);

  const allRecords: WorkflowRunRecord[] = [];
  const repoLatestTimes: Record<string, string> = {};
  let totalWorkflows = 0;

  // --- RUNS COLLECTION PHASE ---
  log.info("--- Starting runs collection ---");

  // Process repos in parallel for efficiency
  async function processRepo(repo: string): Promise<{
    records: WorkflowRunRecord[];
    latestTime: string | null;
    workflowCount: number;
  }> {
    const repoTrimmed = repo.trim();
    const [owner, repoName] = repoTrimmed.split("/");

    if (!owner || !repoName) {
      log.warn(`Invalid repo format: ${repoTrimmed}`);
      return { records: [], latestTime: null, workflowCount: 0 };
    }

    const since = runsState.repos[repoTrimmed]?.lastCollectedAt;
    if (since) {
      log.info(`Processing ${repoTrimmed} (since ${since.slice(0, 16)})...`);
    } else {
      log.info(`Processing ${repoTrimmed} (full collection)...`);
    }

    try {
      const workflows = await discoverAgenticWorkflows(owner, repoName);

      if (workflows.length === 0) {
        log.info(`  No agentic workflows found in ${repoTrimmed}`);
        return { records: [], latestTime: null, workflowCount: 0 };
      }

      const repoRecords: WorkflowRunRecord[] = [];

      for (const workflow of workflows) {
        log.info(`  Fetching runs for: ${workflow.name}`);

        const runs = await fetchWorkflowRuns(owner, repoName, workflow.id, since);
        const records = runs
          .map((run) => transformRun(repoTrimmed, run))
          .filter((r): r is WorkflowRunRecord => r !== null)
          // Filter out already-ingested runs to prevent duplicates
          .filter((r) => !ingestedSet.has(runKey(r.RunId, r.RunAttempt)));

        log.info(`    ${records.length} new completed runs`);
        repoRecords.push(...records);
      }

      let latestTime: string | null = null;
      if (repoRecords.length > 0) {
        latestTime = repoRecords
          .map((r) => r.CreatedAt)
          .sort()
          .pop()!;
      }

      return { records: repoRecords, latestTime, workflowCount: workflows.length };
    } catch (error) {
      log.error(`Error processing ${repoTrimmed}: ${error}`);
      return { records: [], latestTime: null, workflowCount: 0 };
    }
  }

  // Process all repos in parallel
  const repoResults = await Promise.all(config.repositories.map(processRepo));
  
  for (let i = 0; i < config.repositories.length; i++) {
    const repo = config.repositories[i]!.trim();
    const result = repoResults[i]!;
    
    allRecords.push(...result.records);
    totalWorkflows += result.workflowCount;
    
    if (result.latestTime) {
      repoLatestTimes[repo] = result.latestTime;
    }
  }

  log.info(`Processed ${totalWorkflows} workflows, collected ${allRecords.length} NEW runs`);

  // Ingest run records if any
  if (allRecords.length > 0) {
    try {
      await ingestRecords(allRecords);

      // Update repo-level state
      for (const [repo, latestTime] of Object.entries(repoLatestTimes)) {
        runsState.repos[repo] = {
          lastCollectedAt: latestTime,
          lastRunAt: new Date().toISOString(),
          lastRunCount: allRecords.filter((r) => r.Repository === repo).length,
        };
      }

      // Track newly ingested runs with timestamps (for 90-day pruning)
      const now = new Date().toISOString();
      const newTrackedRuns: TrackedRun[] = allRecords.map((r) => ({
        key: runKey(r.RunId, r.RunAttempt),
        ingestedAt: now,
      }));
      runsState.ingestedRuns = [...prunedRuns, ...newTrackedRuns];

      await saveBlobState(RUNS_STATE_BLOB, runsState);
      log.info("Runs collection completed successfully");
    } catch (error) {
      log.error(`Runs ingestion failed: ${error}`);
      throw error;
    }
  } else {
    log.info("No new runs to ingest");
  }

  // --- AUDIT PHASE ---
  log.info("--- Starting audit phase ---");

  const defaultAuditState: AuditState = { version: 1, auditedRuns: [] };
  const auditState = await loadBlobState(AUDIT_STATE_BLOB, defaultAuditState);
  
  // Migrate from legacy format and prune old audits
  let auditedRuns = migrateAuditState(auditState);
  const beforePrune = auditedRuns.length;
  auditedRuns = pruneOldAudits(auditedRuns);
  if (beforePrune > auditedRuns.length) {
    log.info(`Pruned ${beforePrune - auditedRuns.length} audits older than ${RETENTION_DAYS} days`);
  }
  
  const auditedSet = new Set(auditedRuns.map(a => a.key));
  log.info(`Loaded audit state: ${auditedSet.size} runs already audited`);

  // Find auditable runs that haven't been audited yet
  const auditableRuns = allRecords.filter(
    (run) =>
      AUDITABLE_CONCLUSIONS.includes(run.Conclusion ?? "") &&
      !auditedSet.has(auditKey(run.Repository, run.RunId, run.RunAttempt))
  );

  log.info(`Found ${auditableRuns.length} runs to audit`);

  if (auditableRuns.length === 0) {
    // Save pruned state if changed
    if (beforePrune > auditedRuns.length) {
      auditState.auditedRuns = auditedRuns;
      await saveBlobState(AUDIT_STATE_BLOB, auditState);
    }
    log.info("No runs to audit, done");
    log.info("=== Job completed ===");
    return;
  }

  // Audit runs (limit to prevent timeout)
  const maxAudits = 50; // Increased from 20 since Container Apps have longer timeouts
  const toAudit = auditableRuns.slice(0, maxAudits);
  const auditRecords: AuditRecord[] = [];
  const newlyAudited: TrackedAudit[] = [];
  const now = new Date().toISOString();

  for (const run of toAudit) {
    const key = auditKey(run.Repository, run.RunId, run.RunAttempt);
    log.info(`Auditing ${run.Repository}#${run.RunId}...`);

    const auditResult = await runAudit(run.Repository, run.RunId);
    const record = createAuditRecord(run, auditResult);
    auditRecords.push(record);
    newlyAudited.push({ key, auditedAt: now });
  }

  // Ingest audit records
  if (auditRecords.length > 0) {
    try {
      await ingestAuditRecords(auditRecords);

      auditState.auditedRuns = [...auditedRuns, ...newlyAudited];
      await saveBlobState(AUDIT_STATE_BLOB, auditState);
      log.info(`Audit phase completed: ${auditRecords.length} runs audited`);
    } catch (error) {
      log.error(`Audit ingestion failed: ${error}`);
    }
  }

  if (auditableRuns.length > maxAudits) {
    log.info(`Note: ${auditableRuns.length - maxAudits} runs deferred to next collection`);
  }

  log.info("=== Job completed ===");
}

// Run the job
main().catch((error) => {
  log.error(`Fatal error: ${error}`);
  process.exit(1);
});
