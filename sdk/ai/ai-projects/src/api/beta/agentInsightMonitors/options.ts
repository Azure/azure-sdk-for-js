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
export interface BetaAgentInsightMonitorsUpdateInsightOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "AgentInsights=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentInsightMonitorsGetInsightOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "AgentInsights=V1Preview";
  /** Whether to include expanded insight details such as evidence and run links in the response. Defaults to false. */
  includeDetails?: boolean;
}

/** Optional parameters. */
export interface BetaAgentInsightMonitorsListInsightsOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "AgentInsights=V1Preview";
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
export interface BetaAgentInsightMonitorsCancelRunOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "AgentInsights=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentInsightMonitorsGetRunOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "AgentInsights=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentInsightMonitorsListRunsOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "AgentInsights=V1Preview";
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
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "AgentInsights=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentInsightMonitorsResetOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "AgentInsights=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentInsightMonitorsUpdateOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "AgentInsights=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentInsightMonitorsDeleteOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "AgentInsights=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentInsightMonitorsGetOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "AgentInsights=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentInsightMonitorsCreateOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "AgentInsights=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentInsightMonitorsListOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "AgentInsights=V1Preview";
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
