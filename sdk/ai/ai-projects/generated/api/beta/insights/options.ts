// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { InsightType } from "../../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BetaInsightsListOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "Insights=V1Preview";
  /** Filter by the type of analysis. */
  typeParam?: InsightType;
  /** Filter by the evaluation ID. */
  evalId?: string;
  /** Filter by the evaluation run ID. */
  runId?: string;
  /** Filter by the agent name. */
  agentName?: string;
  /** Whether to include coordinates for visualization in the response. Defaults to false. */
  includeCoordinates?: boolean;
}

/** Optional parameters. */
export interface BetaInsightsGetOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "Insights=V1Preview";
  /** Whether to include coordinates for visualization in the response. Defaults to false. */
  includeCoordinates?: boolean;
}

/** Optional parameters. */
export interface BetaInsightsGenerateOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "Insights=V1Preview";
  /** Unique, client-generated identifier for ensuring request idempotency. Use the same ID for retries to prevent duplicate evaluations. */
  repeatabilityRequestId?: string;
  /** Timestamp indicating when this request was first initiated. Used in conjunction with repeatability-request-id for idempotency control. */
  repeatabilityFirstSent?: Date;
}
