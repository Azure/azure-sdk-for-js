/**
 * Type definitions for the Agentic Workflows Dashboard collector
 */

/** GitHub workflow run from the REST API */
export interface GitHubWorkflowRun {
  id: number;
  name: string;
  workflow_id: number;
  run_number: number;
  run_attempt: number;
  status: "queued" | "in_progress" | "completed" | "waiting" | "requested" | "pending";
  conclusion: "success" | "failure" | "cancelled" | "skipped" | "timed_out" | "neutral" | "action_required" | "stale" | null;
  created_at: string;
  updated_at: string;
  run_started_at: string | null;
  event: string;
  actor: {
    login: string;
    type: "User" | "Bot" | "Organization";
  } | null;
  head_branch: string;
  head_sha: string;
  head_repository?: {
    full_name: string;
    fork: boolean;
  };
  html_url: string;
  pull_requests: Array<{ number: number }>;
}

/** GitHub workflow definition */
export interface GitHubWorkflow {
  id: number;
  name: string;
  path: string;
  state: "active" | "deleted" | "disabled_fork" | "disabled_inactivity" | "disabled_manually";
}

/** Normalized run record for Azure Monitor ingestion */
export interface WorkflowRunRecord {
  TimeGenerated: string;
  SchemaVersion: string;
  CollectorVersion: string;
  
  // Identity
  Repository: string;
  WorkflowName: string;
  WorkflowId: number;
  RunId: number;
  RunAttempt: number;
  UpdatedAt: string;
  
  // Status
  Status: string;
  Conclusion: string | null;
  
  // Timing
  CreatedAt: string;
  StartedAt: string | null;
  CompletedAt: string | null;
  QueueTime_s: number | null;
  Duration_s: number | null;
  
  // Context
  TriggerEvent: string;
  Actor: string | null;
  ActorType: string | null;
  HeadBranch: string;
  HeadSha: string;
  HeadRepo: string | null;
  /** Tri-state: "true", "false", or "unknown" (when head_repository missing) */
  IsFromFork: "true" | "false" | "unknown";
  PullRequestNumber: number | null;
  RunUrl: string;
}

/** Audit enrichment record */
export interface WorkflowAuditRecord {
  TimeGenerated: string;
  SchemaVersion: string;
  AuditVersion: string;
  
  // Link to run
  Repository: string;
  RunId: number;
  
  // Token metrics
  InputTokens: number;
  OutputTokens: number;
  CacheReadTokens: number;
  CacheWriteTokens: number;
  CacheHitRate: number;
  
  // Execution metrics
  Turns: number;
  ToolCalls: number;
  SafeOutputCalls: number;
  ErrorCount: number;
  WarningCount: number;
  
  // Engine info
  EngineId: string;
  ModelId: string;
  AwfVersion: string;
}

/** Collector configuration */
export interface CollectorConfig {
  /** Target repositories to collect from */
  repos: string[];
  
  /** GitHub token for API access */
  githubToken: string;
  
  /** Azure Monitor Data Collection Endpoint */
  dceEndpoint?: string;
  
  /** Azure Monitor Data Collection Rule ID */
  dcrId?: string;
  
  /** Stream name for ingestion */
  streamName?: string;
  
  /** Number of hours to look back (watermark overlap) */
  lookbackHours: number;
  
  /** Maximum runs to fetch per workflow */
  maxRunsPerWorkflow: number;
  
  /** Dry run mode (don't push to Azure Monitor) */
  dryRun: boolean;
  
  /** Verbose logging */
  verbose: boolean;
}

/** Collection result */
export interface CollectionResult {
  repo: string;
  workflow: string;
  runsDiscovered: number;
  runsIngested: number;
  errors: string[];
}

/** Overall collection summary */
export interface CollectionSummary {
  startTime: Date;
  endTime: Date;
  totalRepos: number;
  totalWorkflows: number;
  totalRunsDiscovered: number;
  totalRunsIngested: number;
  results: CollectionResult[];
  errors: string[];
}
