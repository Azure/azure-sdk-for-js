// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { list, get } from "../../api/billingStatistics/operations.js";
import {
  BillingStatisticsListOptionalParams,
  BillingStatisticsGetOptionalParams,
} from "../../api/billingStatistics/options.js";
import { BillingStatisticUnion } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a BillingStatistics operations. */
export interface BillingStatisticsOperations {
  /** Gets all Microsoft Sentinel billing statistics. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: BillingStatisticsListOptionalParams,
  ) => PagedAsyncIterableIterator<BillingStatisticUnion>;
  /** Gets a billing statistic */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    billingStatisticName: string,
    options?: BillingStatisticsGetOptionalParams,
  ) => Promise<BillingStatisticUnion>;
}

function _getBillingStatistics(context: SecurityInsightsContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: BillingStatisticsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      billingStatisticName: string,
      options?: BillingStatisticsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, billingStatisticName, options),
  };
}

export function _getBillingStatisticsOperations(
  context: SecurityInsightsContext,
): BillingStatisticsOperations {
  return {
    ..._getBillingStatistics(context),
  };
}
