// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  JobStatus,
  AgentInsightRunTrigger,
  AgentInsightSeverity,
  AgentInsightStatus,
  PageOrder,
} from "../../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BetaAgentInsightMonitorsUpdateInsightOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaAgentInsightMonitorsGetInsightOptionalParams extends OperationOptions {
  /** Whether to include expanded insight details such as evidence and run links in the response. Defaults to false. */
  includeDetails?: boolean;
}

/** Optional parameters. */
export interface BetaAgentInsightMonitorsListInsightsOptionalParams extends OperationOptions {
  /** A cursor that identifies the last item in the previous page. */
  after?: string;
  /** A cursor that identifies the first item in the next page. */
  before?: string;
  /** The maximum number of items to return. Defaults to 20. */
  limit?: number;
  /** Sort order by creation time. Defaults to descending. */
  order?: PageOrder;
  /** Filter insights by category. */
  category?: string;
  /** Filter insights by severity. */
  severity?: AgentInsightSeverity;
  /** Filter insights by lifecycle status. */
  status?: AgentInsightStatus;
  /** Whether to include expanded insight details such as evidence and run links in the response. Defaults to false. */
  includeDetails?: boolean;
}

/** Optional parameters. */
export interface BetaAgentInsightMonitorsCancelRunOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaAgentInsightMonitorsGetRunOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaAgentInsightMonitorsListRunsOptionalParams extends OperationOptions {
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
export interface BetaAgentInsightMonitorsCreateRunOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Client-generated unique ID for idempotent retries. When absent, the server creates the job unconditionally. */
  operationId?: string;
}

/** Optional parameters. */
export interface BetaAgentInsightMonitorsResetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaAgentInsightMonitorsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaAgentInsightMonitorsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaAgentInsightMonitorsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaAgentInsightMonitorsCreateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaAgentInsightMonitorsListOptionalParams extends OperationOptions {
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
