// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConsumptionManagementContext } from "../../api/consumptionManagementContext.js";
import { list } from "../../api/usageDetails/operations.js";
import { UsageDetailsListOptionalParams } from "../../api/usageDetails/options.js";
import { UsageDetailUnion } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a UsageDetails operations. */
export interface UsageDetailsOperations {
  /**
   * Lists the usage details for the defined scope. Usage details are available via this API only for May 1, 2014 or later.
   *
   * **Note:Microsoft will be retiring the Consumption Usage Details API at some point in the future. We do not recommend that you take a new dependency on this API. Please use the Cost Details API instead. We will notify customers once a date for retirement has been determined.For Learn more,see [Generate Cost Details Report - Create Operation](https://learn.microsoft.com/en-us/rest/api/cost-management/generate-cost-details-report/create-operation?tabs=HTTP)**
   */
  list: (
    scope: string,
    options?: UsageDetailsListOptionalParams,
  ) => PagedAsyncIterableIterator<UsageDetailUnion>;
}

function _getUsageDetails(context: ConsumptionManagementContext) {
  return {
    list: (scope: string, options?: UsageDetailsListOptionalParams) =>
      list(context, scope, options),
  };
}

export function _getUsageDetailsOperations(
  context: ConsumptionManagementContext,
): UsageDetailsOperations {
  return {
    ..._getUsageDetails(context),
  };
}
