// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { query, count } from "../../api/threatIntelligence/operations.js";
import {
  ThreatIntelligenceQueryOptionalParams,
  ThreatIntelligenceCountOptionalParams,
} from "../../api/threatIntelligence/options.js";
import { ThreatIntelligenceCount, TIObjectUnion, TiType } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ThreatIntelligence operations. */
export interface ThreatIntelligenceOperations {
  /** Gets all TI objects for the workspace. */
  query: (
    resourceGroupName: string,
    workspaceName: string,
    tiType: TiType,
    options?: ThreatIntelligenceQueryOptionalParams,
  ) => PagedAsyncIterableIterator<TIObjectUnion>;
  /** Gets the count of all TI objects for the workspace. */
  count: (
    resourceGroupName: string,
    workspaceName: string,
    tiType: TiType,
    options?: ThreatIntelligenceCountOptionalParams,
  ) => Promise<ThreatIntelligenceCount>;
}

function _getThreatIntelligence(context: SecurityInsightsContext) {
  return {
    query: (
      resourceGroupName: string,
      workspaceName: string,
      tiType: TiType,
      options?: ThreatIntelligenceQueryOptionalParams,
    ) => query(context, resourceGroupName, workspaceName, tiType, options),
    count: (
      resourceGroupName: string,
      workspaceName: string,
      tiType: TiType,
      options?: ThreatIntelligenceCountOptionalParams,
    ) => count(context, resourceGroupName, workspaceName, tiType, options),
  };
}

export function _getThreatIntelligenceOperations(
  context: SecurityInsightsContext,
): ThreatIntelligenceOperations {
  return {
    ..._getThreatIntelligence(context),
  };
}
