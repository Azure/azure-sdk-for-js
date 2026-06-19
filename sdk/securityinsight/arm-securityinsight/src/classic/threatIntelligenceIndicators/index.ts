// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { list } from "../../api/threatIntelligenceIndicators/operations.js";
import type { ThreatIntelligenceIndicatorsListOptionalParams } from "../../api/threatIntelligenceIndicators/options.js";
import type { ThreatIntelligenceInformationUnion } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ThreatIntelligenceIndicators operations. */
export interface ThreatIntelligenceIndicatorsOperations {
  /** Get all threat intelligence indicators. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: ThreatIntelligenceIndicatorsListOptionalParams,
  ) => PagedAsyncIterableIterator<ThreatIntelligenceInformationUnion>;
}

function _getThreatIntelligenceIndicators(context: SecurityInsightsContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: ThreatIntelligenceIndicatorsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
  };
}

export function _getThreatIntelligenceIndicatorsOperations(
  context: SecurityInsightsContext,
): ThreatIntelligenceIndicatorsOperations {
  return {
    ..._getThreatIntelligenceIndicators(context),
  };
}
