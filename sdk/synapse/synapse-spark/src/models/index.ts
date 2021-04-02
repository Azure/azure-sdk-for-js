// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import * as coreHttp from "@azure/core-http";

/**
 * Response for batch list operation.
 */
export interface SparkBatchJobCollection {
  /**
   * The start index of fetched sessions.
   */
  from: number;
  /**
   * Number of sessions fetched.
   */
  total: number;
  /**
   * Batch list
   */
  sessions?: SparkBatchJob[];
}

export interface SparkBatchJob {
  livyInfo?: SparkBatchJobState;
  /**
   * The batch name.
   */
  name?: string;
  /**
   * The workspace name.
   */
  workspaceName?: string;
  /**
   * The Spark pool name.
   */
  sparkPoolName?: string;
  /**
   * The submitter name.
   */
  submitterName?: string;
  /**
   * The submitter identifier.
   */
  submitterId?: string;
  /**
   * The artifact identifier.
   */
  artifactId?: string;
  /**
   * The job type.
   */
  jobType?: SparkJobType;
  /**
   * The Spark batch job result.
   */
  result?: SparkBatchJobResultType;
  /**
   * The scheduler information.
   */
  scheduler?: SparkScheduler;
  /**
   * The plugin information.
   */
  plugin?: SparkServicePlugin;
  /**
   * The error information.
   */
  errors?: SparkServiceError[];
  /**
   * The tags.
   */
  tags?: { [propertyName: string]: string };
  /**
   * The session Id.
   */
  id: number;
  /**
   * The application id of this session
   */
  appId?: string | null;
  /**
   * The detailed application info.
   */
  appInfo?: { [propertyName: string]: string } | null;
  /**
   * The batch state
   */
  state?: string;
  /**
   * The log lines.
   */
  logLines?: string[] | null;
}

export interface SparkBatchJobState {
  /**
   * the time that at which "not_started" livy state was first seen.
   */
  notStartedAt?: Date | null;
  /**
   * the time that at which "starting" livy state was first seen.
   */
  startingAt?: Date | null;
  /**
   * the time that at which "running" livy state was first seen.
   */
  runningAt?: Date | null;
  /**
   * time that at which "dead" livy state was first seen.
   */
  deadAt?: Date | null;
  /**
   * the time that at which "success" livy state was first seen.
   */
  successAt?: Date | null;
  /**
   * the time that at which "killed" livy state was first seen.
   */
  terminatedAt?: Date | null;
  /**
   * the time that at which "recovering" livy state was first seen.
   */
  recoveringAt?: Date | null;
  /**
   * the Spark job state.
   */
  currentState?: string;
  jobCreationRequest?: SparkRequest;
}

export interface SparkRequest {
  name?: string;
  file?: string;
  className?: string;
  arguments?: string[];
  jars?: string[];
  pythonFiles?: string[];
  files?: string[];
  archives?: string[];
  /**
   * Dictionary of <string>
   */
  configuration?: { [propertyName: string]: string };
  driverMemory?: string;
  driverCores?: number;
  executorMemory?: string;
  executorCores?: number;
  executorCount?: number;
}

export interface SparkScheduler {
  submittedAt?: Date | null;
  scheduledAt?: Date | null;
  endedAt?: Date | null;
  cancellationRequestedAt?: Date;
  currentState?: SchedulerCurrentState;
}

export interface SparkServicePlugin {
  preparationStartedAt?: Date | null;
  resourceAcquisitionStartedAt?: Date | null;
  submissionStartedAt?: Date | null;
  monitoringStartedAt?: Date | null;
  cleanupStartedAt?: Date | null;
  currentState?: PluginCurrentState;
}

export interface SparkServiceError {
  message?: string;
  errorCode?: string;
  source?: SparkErrorSource;
}

export interface SparkBatchJobOptions {
  /**
   * Dictionary of <string>
   */
  tags?: { [propertyName: string]: string };
  artifactId?: string;
  name: string;
  file: string;
  className?: string;
  arguments?: string[];
  jars?: string[];
  pythonFiles?: string[];
  files?: string[];
  archives?: string[];
  /**
   * Dictionary of <string>
   */
  configuration?: { [propertyName: string]: string };
  driverMemory?: string;
  driverCores?: number;
  executorMemory?: string;
  executorCores?: number;
  executorCount?: number;
}

export interface SparkSessionCollection {
  from: number;
  total: number;
  sessions?: SparkSession[];
}

export interface SparkSession {
  livyInfo?: SparkSessionState;
  name?: string;
  workspaceName?: string;
  sparkPoolName?: string;
  submitterName?: string;
  submitterId?: string;
  artifactId?: string;
  /**
   * The job type.
   */
  jobType?: SparkJobType;
  result?: SparkSessionResultType;
  scheduler?: SparkScheduler;
  plugin?: SparkServicePlugin;
  /**
   * The error information.
   */
  errors?: SparkServiceError[];
  /**
   * Dictionary of <string>
   */
  tags?: { [propertyName: string]: string };
  id: number;
  appId?: string | null;
  /**
   * Dictionary of <string>
   */
  appInfo?: { [propertyName: string]: string } | null;
  state?: string;
  logLines?: string[] | null;
}

export interface SparkSessionState {
  notStartedAt?: Date | null;
  startingAt?: Date | null;
  idleAt?: Date | null;
  deadAt?: Date | null;
  shuttingDownAt?: Date | null;
  /**
   * the time that at which "killed" livy state was first seen.
   */
  terminatedAt?: Date | null;
  recoveringAt?: Date | null;
  busyAt?: Date | null;
  errorAt?: Date | null;
  currentState?: string;
  jobCreationRequest?: SparkRequest;
}

export interface SparkSessionOptions {
  /**
   * Dictionary of <string>
   */
  tags?: { [propertyName: string]: string };
  artifactId?: string;
  name: string;
  file?: string;
  className?: string;
  arguments?: string[];
  jars?: string[];
  pythonFiles?: string[];
  files?: string[];
  archives?: string[];
  /**
   * Dictionary of <string>
   */
  configuration?: { [propertyName: string]: string };
  driverMemory?: string;
  driverCores?: number;
  executorMemory?: string;
  executorCores?: number;
  executorCount?: number;
}

export interface SparkStatementCollection {
  total: number;
  statements?: SparkStatement[];
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
  /**
   * Any object
   */
  data?: any;
  errorName?: string;
  errorValue?: string;
  traceback?: string[];
}

export interface SparkStatementOptions {
  code?: string;
  kind?: SparkStatementLanguageType;
}

export interface SparkStatementCancellationResult {
  msg?: string;
}

/**
 * Known values of {@link SparkJobType} that the service accepts.
 */
export const enum KnownSparkJobType {
  SparkBatch = "SparkBatch",
  SparkSession = "SparkSession"
}

/**
 * Defines values for SparkJobType. \
 * {@link KnownSparkJobType} can be used interchangeably with SparkJobType,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **SparkBatch** \
 * **SparkSession**
 */
export type SparkJobType = string;

/**
 * Known values of {@link SparkBatchJobResultType} that the service accepts.
 */
export const enum KnownSparkBatchJobResultType {
  Uncertain = "Uncertain",
  Succeeded = "Succeeded",
  Failed = "Failed",
  Cancelled = "Cancelled"
}

/**
 * Defines values for SparkBatchJobResultType. \
 * {@link KnownSparkBatchJobResultType} can be used interchangeably with SparkBatchJobResultType,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **Uncertain** \
 * **Succeeded** \
 * **Failed** \
 * **Cancelled**
 */
export type SparkBatchJobResultType = string;

/**
 * Known values of {@link SchedulerCurrentState} that the service accepts.
 */
export const enum KnownSchedulerCurrentState {
  Queued = "Queued",
  Scheduled = "Scheduled",
  Ended = "Ended"
}

/**
 * Defines values for SchedulerCurrentState. \
 * {@link KnownSchedulerCurrentState} can be used interchangeably with SchedulerCurrentState,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **Queued** \
 * **Scheduled** \
 * **Ended**
 */
export type SchedulerCurrentState = string;

/**
 * Known values of {@link PluginCurrentState} that the service accepts.
 */
export const enum KnownPluginCurrentState {
  Preparation = "Preparation",
  ResourceAcquisition = "ResourceAcquisition",
  Queued = "Queued",
  Submission = "Submission",
  Monitoring = "Monitoring",
  Cleanup = "Cleanup",
  Ended = "Ended"
}

/**
 * Defines values for PluginCurrentState. \
 * {@link KnownPluginCurrentState} can be used interchangeably with PluginCurrentState,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **Preparation** \
 * **ResourceAcquisition** \
 * **Queued** \
 * **Submission** \
 * **Monitoring** \
 * **Cleanup** \
 * **Ended**
 */
export type PluginCurrentState = string;

/**
 * Known values of {@link SparkErrorSource} that the service accepts.
 */
export const enum KnownSparkErrorSource {
  System = "System",
  User = "User",
  Unknown = "Unknown",
  Dependency = "Dependency"
}

/**
 * Defines values for SparkErrorSource. \
 * {@link KnownSparkErrorSource} can be used interchangeably with SparkErrorSource,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **System** \
 * **User** \
 * **Unknown** \
 * **Dependency**
 */
export type SparkErrorSource = string;

/**
 * Known values of {@link SparkSessionResultType} that the service accepts.
 */
export const enum KnownSparkSessionResultType {
  Uncertain = "Uncertain",
  Succeeded = "Succeeded",
  Failed = "Failed",
  Cancelled = "Cancelled"
}

/**
 * Defines values for SparkSessionResultType. \
 * {@link KnownSparkSessionResultType} can be used interchangeably with SparkSessionResultType,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **Uncertain** \
 * **Succeeded** \
 * **Failed** \
 * **Cancelled**
 */
export type SparkSessionResultType = string;

/**
 * Known values of {@link SparkStatementLanguageType} that the service accepts.
 */
export const enum KnownSparkStatementLanguageType {
  Spark = "spark",
  Pyspark = "pyspark",
  Dotnetspark = "dotnetspark",
  Sql = "sql"
}

/**
 * Defines values for SparkStatementLanguageType. \
 * {@link KnownSparkStatementLanguageType} can be used interchangeably with SparkStatementLanguageType,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **spark** \
 * **pyspark** \
 * **dotnetspark** \
 * **sql**
 */
export type SparkStatementLanguageType = string;

/**
 * Optional parameters.
 */
export interface SparkBatchGetSparkBatchJobsOptionalParams extends coreHttp.OperationOptions {
  /**
   * Optional param specifying which index the list should begin from.
   */
  fromParam?: number;
  /**
   * Optional param specifying the size of the returned list.
   *             By default it is 20 and that is the maximum.
   */
  size?: number;
  /**
   * Optional query param specifying whether detailed response is returned beyond plain livy.
   */
  detailed?: boolean;
}

/**
 * Contains response data for the getSparkBatchJobs operation.
 */
export type SparkBatchGetSparkBatchJobsResponse = SparkBatchJobCollection & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: SparkBatchJobCollection;
  };
};

/**
 * Optional parameters.
 */
export interface SparkBatchCreateSparkBatchJobOptionalParams extends coreHttp.OperationOptions {
  /**
   * Optional query param specifying whether detailed response is returned beyond plain livy.
   */
  detailed?: boolean;
}

/**
 * Contains response data for the createSparkBatchJob operation.
 */
export type SparkBatchCreateSparkBatchJobResponse = SparkBatchJob & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: SparkBatchJob;
  };
};

/**
 * Optional parameters.
 */
export interface SparkBatchGetSparkBatchJobOptionalParams extends coreHttp.OperationOptions {
  /**
   * Optional query param specifying whether detailed response is returned beyond plain livy.
   */
  detailed?: boolean;
}

/**
 * Contains response data for the getSparkBatchJob operation.
 */
export type SparkBatchGetSparkBatchJobResponse = SparkBatchJob & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: SparkBatchJob;
  };
};

/**
 * Optional parameters.
 */
export interface SparkSessionGetSparkSessionsOptionalParams extends coreHttp.OperationOptions {
  /**
   * Optional param specifying which index the list should begin from.
   */
  fromParam?: number;
  /**
   * Optional param specifying the size of the returned list.
   *             By default it is 20 and that is the maximum.
   */
  size?: number;
  /**
   * Optional query param specifying whether detailed response is returned beyond plain livy.
   */
  detailed?: boolean;
}

/**
 * Contains response data for the getSparkSessions operation.
 */
export type SparkSessionGetSparkSessionsResponse = SparkSessionCollection & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: SparkSessionCollection;
  };
};

/**
 * Optional parameters.
 */
export interface SparkSessionCreateSparkSessionOptionalParams extends coreHttp.OperationOptions {
  /**
   * Optional query param specifying whether detailed response is returned beyond plain livy.
   */
  detailed?: boolean;
}

/**
 * Contains response data for the createSparkSession operation.
 */
export type SparkSessionCreateSparkSessionResponse = SparkSession & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: SparkSession;
  };
};

/**
 * Optional parameters.
 */
export interface SparkSessionGetSparkSessionOptionalParams extends coreHttp.OperationOptions {
  /**
   * Optional query param specifying whether detailed response is returned beyond plain livy.
   */
  detailed?: boolean;
}

/**
 * Contains response data for the getSparkSession operation.
 */
export type SparkSessionGetSparkSessionResponse = SparkSession & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: SparkSession;
  };
};

/**
 * Contains response data for the getSparkStatements operation.
 */
export type SparkSessionGetSparkStatementsResponse = SparkStatementCollection & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: SparkStatementCollection;
  };
};

/**
 * Contains response data for the createSparkStatement operation.
 */
export type SparkSessionCreateSparkStatementResponse = SparkStatement & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: SparkStatement;
  };
};

/**
 * Contains response data for the getSparkStatement operation.
 */
export type SparkSessionGetSparkStatementResponse = SparkStatement & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: SparkStatement;
  };
};

/**
 * Contains response data for the cancelSparkStatement operation.
 */
export type SparkSessionCancelSparkStatementResponse = SparkStatementCancellationResult & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: SparkStatementCancellationResult;
  };
};

/**
 * Optional parameters.
 */
export interface SparkClientOptionalParams extends coreHttp.ServiceClientOptions {
  /**
   * Valid api-version for the request.
   */
  livyApiVersion?: string;
  /**
   * Overrides client endpoint.
   */
  endpoint?: string;
}
