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
  appId?: string;
  /**
   * The detailed application info.
   */
  appInfo?: { [propertyName: string]: string };
  /**
   * The batch state
   */
  state?: string;
  /**
   * The log lines.
   */
  logLines?: string[];
}

export interface SparkBatchJobState {
  /**
   * the time that at which "not_started" livy state was first seen.
   */
  notStartedAt?: Date;
  /**
   * the time that at which "starting" livy state was first seen.
   */
  startingAt?: Date;
  /**
   * the time that at which "running" livy state was first seen.
   */
  runningAt?: Date;
  /**
   * time that at which "dead" livy state was first seen.
   */
  deadAt?: Date;
  /**
   * the time that at which "success" livy state was first seen.
   */
  successAt?: Date;
  /**
   * the time that at which "killed" livy state was first seen.
   */
  terminatedAt?: Date;
  /**
   * the time that at which "recovering" livy state was first seen.
   */
  recoveringAt?: Date;
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
  submittedAt?: Date;
  scheduledAt?: Date;
  endedAt?: Date;
  cancellationRequestedAt?: Date;
  currentState?: SchedulerCurrentState;
}

export interface SparkServicePlugin {
  preparationStartedAt?: Date;
  resourceAcquisitionStartedAt?: Date;
  submissionStartedAt?: Date;
  monitoringStartedAt?: Date;
  cleanupStartedAt?: Date;
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
  appId?: string;
  /**
   * Dictionary of <string>
   */
  appInfo?: { [propertyName: string]: string };
  state?: string;
  logLines?: string[];
}

export interface SparkSessionState {
  notStartedAt?: Date;
  startingAt?: Date;
  idleAt?: Date;
  deadAt?: Date;
  shuttingDownAt?: Date;
  /**
   * the time that at which "killed" livy state was first seen.
   */
  terminatedAt?: Date;
  recoveringAt?: Date;
  busyAt?: Date;
  errorAt?: Date;
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
 * Defines values for SparkJobType.
 */
export type SparkJobType = "SparkBatch" | "SparkSession" | string;
/**
 * Defines values for SparkBatchJobResultType.
 */
export type SparkBatchJobResultType =
  | "Uncertain"
  | "Succeeded"
  | "Failed"
  | "Cancelled"
  | string;
/**
 * Defines values for SchedulerCurrentState.
 */
export type SchedulerCurrentState = "Queued" | "Scheduled" | "Ended" | string;
/**
 * Defines values for PluginCurrentState.
 */
export type PluginCurrentState =
  | "Preparation"
  | "ResourceAcquisition"
  | "Queued"
  | "Submission"
  | "Monitoring"
  | "Cleanup"
  | "Ended"
  | string;
/**
 * Defines values for SparkErrorSource.
 */
export type SparkErrorSource =
  | "System"
  | "User"
  | "Unknown"
  | "Dependency"
  | string;
/**
 * Defines values for SparkSessionResultType.
 */
export type SparkSessionResultType =
  | "Uncertain"
  | "Succeeded"
  | "Failed"
  | "Cancelled"
  | string;
/**
 * Defines values for SparkStatementLanguageType.
 */
export type SparkStatementLanguageType =
  | "spark"
  | "pyspark"
  | "dotnetspark"
  | "sql"
  | string;

/**
 * Optional parameters.
 */
export interface SparkBatchGetSparkBatchJobsOptionalParams
  extends coreHttp.OperationOptions {
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
export interface SparkBatchCreateSparkBatchJobOptionalParams
  extends coreHttp.OperationOptions {
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
export interface SparkBatchGetSparkBatchJobOptionalParams
  extends coreHttp.OperationOptions {
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
export interface SparkSessionGetSparkSessionsOptionalParams
  extends coreHttp.OperationOptions {
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
export interface SparkSessionCreateSparkSessionOptionalParams
  extends coreHttp.OperationOptions {
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
export interface SparkSessionGetSparkSessionOptionalParams
  extends coreHttp.OperationOptions {
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
export interface SynapseSparkOptionalParams
  extends coreHttp.ServiceClientOptions {
  /**
   * Valid api-version for the request.
   */
  livyApiVersion?: string;
  /**
   * Overrides client endpoint.
   */
  endpoint?: string;
}
