// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { InsightType } from "../../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BetaInsightsListOptionalParams extends OperationOptions {
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
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface BetaInsightsGetOptionalParams extends OperationOptions {
  /** Whether to include coordinates for visualization in the response. Defaults to false. */
  includeCoordinates?: boolean;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface BetaInsightsGenerateOptionalParams extends OperationOptions {
  /** Unique, client-generated identifier for ensuring request idempotency. Use the same ID for retries to prevent duplicate evaluations. */
  repeatabilityRequestId?: string;
  /** Timestamp indicating when this request was first initiated. Used in conjunction with repeatability-request-id for idempotency control. */
  repeatabilityFirstSent?: Date;
}
