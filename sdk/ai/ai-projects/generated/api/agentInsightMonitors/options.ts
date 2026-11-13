// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  JobStatus,
  AgentInsightPriorities,
  AgentInsightRunTrigger,
  AgentInsightSeverity,
  AgentInsightStatus,
  PageOrder,
} from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AgentInsightMonitorsUpdateInsightOptionalParams extends OperationOptions {
  /** The lifecycle status to apply to the insight. */
  status?: AgentInsightStatus;
}

/** Optional parameters. */
export interface AgentInsightMonitorsGetInsightOptionalParams extends OperationOptions {
  /** Whether to include expanded insight details such as evidence and run links in the response. Defaults to false. */
  includeDetails?: boolean;
}

/** Optional parameters. */
export interface AgentInsightMonitorsListInsightsOptionalParams extends OperationOptions {
  /** A cursor that identifies the last item in the previous page. */
  after?: string;
  /** A cursor that identifies the first item in the next page. */
  before?: string;
  /** The maximum number of items to return. Defaults to 20. */
  limit?: number;
  /** Sort order by creation time. Defaults to descending. */
  order?: PageOrder;
  /** Match any listed category. Commas separate identifiers; identifiers containing commas cannot be filtered individually. */
  categories?: string[];
  /** Match any listed severity. */
  severities?: AgentInsightSeverity[];
  /** Match any listed status. */
  statuses?: AgentInsightStatus[];
  /** Whether to include expanded insight details such as evidence and run links in the response. Defaults to false. */
  includeDetails?: boolean;
}

/** Optional parameters. */
export interface AgentInsightMonitorsCancelRunOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AgentInsightMonitorsGetRunOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AgentInsightMonitorsListRunsOptionalParams extends OperationOptions {
  /** A cursor that identifies the last item in the previous page. */
  after?: string;
  /** A cursor that identifies the first item in the next page. */
  before?: string;
  /** The maximum number of items to return. Defaults to 20. */
  limit?: number;
  /** Sort order by creation time. Defaults to descending. */
  order?: PageOrder;
  /** Filter runs by status. */
  status?: JobStatus;
  /** Filter runs by trigger. */
  trigger?: AgentInsightRunTrigger;
}

/** Optional parameters. */
export interface AgentInsightMonitorsCreateRunOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Client-generated unique ID for idempotent retries. When absent, the server creates the job unconditionally. */
  operationId?: string;
  /** Optional finite positive number of hours of trace history to analyze, up to 2,160. Defaults to 168. */
  lookbackHours?: number;
}

/** Optional parameters. */
export interface AgentInsightMonitorsResetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AgentInsightMonitorsUpdateOptionalParams extends OperationOptions {
  /** Whether scheduled insight generation is armed for the monitor. */
  enabled?: boolean;
  /** Interval between scheduled insight runs, in hours. */
  runIntervalHours?: number;
  /** The model deployment to use for analyzing traces. Accepts either the deployment name alone or with the connection name as '{connectionName}/modelDeploymentName'. */
  modelDeploymentName?: string;
  /** Replaces all priorities. Omit to preserve them; null clears them. */
  priorities?: AgentInsightPriorities;
}

/** Optional parameters. */
export interface AgentInsightMonitorsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AgentInsightMonitorsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AgentInsightMonitorsCreateOptionalParams extends OperationOptions {
  /** Whether scheduled insight generation should be armed. Defaults to false. */
  enabled?: boolean;
  /** Interval between scheduled insight runs, in hours. Defaults to 6. */
  runIntervalHours?: number;
  /** Analysis priorities for the monitor. */
  priorities?: AgentInsightPriorities;
}

/** Optional parameters. */
export interface AgentInsightMonitorsListOptionalParams extends OperationOptions {
  /** A cursor that identifies the last item in the previous page. */
  after?: string;
  /** A cursor that identifies the first item in the next page. */
  before?: string;
  /** The maximum number of items to return. Defaults to 20. */
  limit?: number;
  /** Sort order by creation time. Defaults to descending. */
  order?: PageOrder;
  /** Filter monitors by agent name. */
  agentName?: string;
}
