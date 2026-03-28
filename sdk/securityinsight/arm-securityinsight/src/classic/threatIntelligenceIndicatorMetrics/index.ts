// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { list } from "../../api/threatIntelligenceIndicatorMetrics/operations.js";
import type { ThreatIntelligenceIndicatorMetricsListOptionalParams } from "../../api/threatIntelligenceIndicatorMetrics/options.js";
import type { ThreatIntelligenceMetricsList } from "../../models/models.js";

/** Interface representing a ThreatIntelligenceIndicatorMetrics operations. */
export interface ThreatIntelligenceIndicatorMetricsOperations {
  /** Get threat intelligence indicators metrics (Indicators counts by Type, Threat Type, Source). */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: ThreatIntelligenceIndicatorMetricsListOptionalParams,
  ) => Promise<ThreatIntelligenceMetricsList>;
}

function _getThreatIntelligenceIndicatorMetrics(context: SecurityInsightsContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: ThreatIntelligenceIndicatorMetricsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
  };
}

export function _getThreatIntelligenceIndicatorMetricsOperations(
  context: SecurityInsightsContext,
): ThreatIntelligenceIndicatorMetricsOperations {
  return {
    ..._getThreatIntelligenceIndicatorMetrics(context),
  };
}
