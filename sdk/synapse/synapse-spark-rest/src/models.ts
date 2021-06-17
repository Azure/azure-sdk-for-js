// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface SparkBatchJobCollection {
  /** The start index of fetched sessions. */
  from: number;
  /** Number of sessions fetched. */
  total: number;
  /** Batch list */
  sessions?: Array<SparkBatchJob>;
}

export interface SparkBatchJob {
  livyInfo?: SparkBatchJobState;
  /** The batch name. */
  name?: string;
  /** The workspace name. */
  workspaceName?: string;
  /** The Spark pool name. */
  sparkPoolName?: string;
  /** The submitter name. */
  submitterName?: string;
  /** The submitter identifier. */
  submitterId?: string;
  /** The artifact identifier. */
  artifactId?: string;
  /** The job type. */
  jobType?: "SparkBatch" | "SparkSession";
  /** The Spark batch job result. */
  result?: "Uncertain" | "Succeeded" | "Failed" | "Cancelled";
  /** The scheduler information. */
  scheduler?: SparkScheduler;
  /** The plugin information. */
  plugin?: SparkServicePlugin;
  /** The error information. */
  errors?: Array<SparkServiceError>;
  /** The tags. */
  tags?: Record<string, string>;
  /** The session Id. */
  id: number;
  /** The application id of this session */
  appId?: string;
  /** The detailed application info. */
  appInfo?: Record<string, string>;
  /** The batch state */
  state?: string;
  /** The log lines. */
  logLines?: Array<string>;
}

export interface SparkBatchJobState {
  /** the time that at which "not_started" livy state was first seen. */
  notStartedAt?: Date;
  /** the time that at which "starting" livy state was first seen. */
  startingAt?: Date;
  /** the time that at which "running" livy state was first seen. */
  runningAt?: Date;
  /** time that at which "dead" livy state was first seen. */
  deadAt?: Date;
  /** the time that at which "success" livy state was first seen. */
  successAt?: Date;
  /** the time that at which "killed" livy state was first seen. */
  terminatedAt?: Date;
  /** the time that at which "recovering" livy state was first seen. */
  recoveringAt?: Date;
  /** the Spark job state. */
  currentState?: string;
  jobCreationRequest?: SparkRequest;
}

export interface SparkRequest {
  name?: string;
  file?: string;
  className?: string;
  arguments?: Array<string>;
  jars?: Array<string>;
  pythonFiles?: Array<string>;
  files?: Array<string>;
  archives?: Array<string>;
  /** Dictionary of <string> */
  configuration?: Record<string, string>;
  driverMemory?: string;
  driverCores?: number;
  executorMemory?: string;
  executorCores?: number;
  executorCount?: number;
}

export interface SparkScheduler {
  submittedAt?: Date;
  scheduledAt?: Date;
  endedAt?: Date;
  cancellationRequestedAt?: Date;
  currentState?: "Queued" | "Scheduled" | "Ended";
}

export interface SparkServicePlugin {
  preparationStartedAt?: Date;
  resourceAcquisitionStartedAt?: Date;
  submissionStartedAt?: Date;
  monitoringStartedAt?: Date;
  cleanupStartedAt?: Date;
  currentState?:
    | "Preparation"
    | "ResourceAcquisition"
    | "Queued"
    | "Submission"
    | "Monitoring"
    | "Cleanup"
    | "Ended";
}

export interface SparkServiceError {
  message?: string;
  errorCode?: string;
  source?: "System" | "User" | "Unknown" | "Dependency";
}

export interface SparkBatchJobOptions {
  /** Dictionary of <string> */
  tags?: Record<string, string>;
  artifactId?: string;
  name: string;
  file: string;
  className?: string;
  arguments?: Array<string>;
  jars?: Array<string>;
  pythonFiles?: Array<string>;
  files?: Array<string>;
  archives?: Array<string>;
  /** Dictionary of <string> */
  configuration?: Record<string, string>;
  driverMemory?: string;
  driverCores?: number;
  executorMemory?: string;
  executorCores?: number;
  executorCount?: number;
}

export interface SparkSessionCollection {
  from: number;
  total: number;
  sessions?: Array<SparkSession>;
}

export interface SparkSession {
  livyInfo?: SparkSessionState;
  name?: string;
  workspaceName?: string;
  sparkPoolName?: string;
  submitterName?: string;
  submitterId?: string;
  artifactId?: string;
  /** The job type. */
  jobType?: "SparkBatch" | "SparkSession";
  result?: "Uncertain" | "Succeeded" | "Failed" | "Cancelled";
  scheduler?: SparkScheduler;
  plugin?: SparkServicePlugin;
  errors?: Array<SparkServiceError>;
  /** Dictionary of <string> */
  tags?: Record<string, string>;
  id: number;
  appId?: string;
  /** Dictionary of <string> */
  appInfo?: Record<string, string>;
  state?: string;
  logLines?: Array<string>;
}

export interface SparkSessionState {
  notStartedAt?: Date;
  startingAt?: Date;
  idleAt?: Date;
  deadAt?: Date;
  shuttingDownAt?: Date;
  terminatedAt?: Date;
  recoveringAt?: Date;
  busyAt?: Date;
  errorAt?: Date;
  currentState?: string;
  jobCreationRequest?: SparkRequest;
}

export interface SparkSessionOptions {
  /** Dictionary of <string> */
  tags?: Record<string, string>;
  artifactId?: string;
  name: string;
  file?: string;
  className?: string;
  arguments?: Array<string>;
  jars?: Array<string>;
  pythonFiles?: Array<string>;
  files?: Array<string>;
  archives?: Array<string>;
  /** Dictionary of <string> */
  configuration?: Record<string, string>;
  driverMemory?: string;
  driverCores?: number;
  executorMemory?: string;
  executorCores?: number;
  executorCount?: number;
}

export interface SparkStatementCollection {
  total: number;
  statements?: Array<SparkStatement>;
}

export interface SparkStatement {
  id: number;
  code?: string;
  state?: string;
  output?: SparkStatementOutput;
}

export interface SparkStatementOutput {
  status?: string;
  executionCount: number;
  /** Any object */
  data?: Record<string, unknown>;
  errorName?: string;
  errorValue?: string;
  traceback?: Array<string>;
}

export interface SparkStatementOptions {
  code?: string;
  kind?: "spark" | "pyspark" | "dotnetspark" | "sql";
}

export interface SparkStatementCancellationResult {
  /** The msg property from the Livy API. The value is always "canceled". */
  message?: string;
}

export type SparkJobType = "SparkBatch" | "SparkSession";
export type SparkBatchJobResultType =
  | "Uncertain"
  | "Succeeded"
  | "Failed"
  | "Cancelled";
export type SchedulerCurrentState = "Queued" | "Scheduled" | "Ended";
export type PluginCurrentState =
  | "Preparation"
  | "ResourceAcquisition"
  | "Queued"
  | "Submission"
  | "Monitoring"
  | "Cleanup"
  | "Ended";
export type SparkErrorSource = "System" | "User" | "Unknown" | "Dependency";
export type SparkSessionResultType =
  | "Uncertain"
  | "Succeeded"
  | "Failed"
  | "Cancelled";
export type SparkStatementLanguageType =
  | "spark"
  | "pyspark"
  | "dotnetspark"
  | "sql";
export type SparkRequestConfDictionary = Record<string, string>;
export type SparkBatchJobTagsDictionary = Record<string, string>;
export type SparkBatchJobAppInfoDictionary = Record<string, string>;
export type SparkBatchJobOptionsTagsDictionary = Record<string, string>;
export type SparkBatchJobOptionsConfDictionary = Record<string, string>;
export type SparkSessionTagsDictionary = Record<string, string>;
export type SparkSessionAppInfoDictionary = Record<string, string>;
export type SparkSessionOptionsTagsDictionary = Record<string, string>;
export type SparkSessionOptionsConfDictionary = Record<string, string>;
