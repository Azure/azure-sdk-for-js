// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConsumptionManagementContext } from "../../api/consumptionManagementContext.js";
import {
  getForBillingPeriodByManagementGroup,
  getByManagementGroup,
} from "../../api/aggregatedCost/operations.js";
import {
  AggregatedCostGetForBillingPeriodByManagementGroupOptionalParams,
  AggregatedCostGetByManagementGroupOptionalParams,
} from "../../api/aggregatedCost/options.js";
import { ManagementGroupAggregatedCostResult } from "../../models/models.js";

/** Interface representing a AggregatedCost operations. */
export interface AggregatedCostOperations {
  /** Provides the aggregate cost of a management group and all child management groups by specified billing period */
  getForBillingPeriodByManagementGroup: (
    managementGroupId: string,
    billingPeriodName: string,
    options?: AggregatedCostGetForBillingPeriodByManagementGroupOptionalParams,
  ) => Promise<ManagementGroupAggregatedCostResult>;
  /** Provides the aggregate cost of a management group and all child management groups by current billing period. */
  getByManagementGroup: (
    managementGroupId: string,
    options?: AggregatedCostGetByManagementGroupOptionalParams,
  ) => Promise<ManagementGroupAggregatedCostResult>;
}

function _getAggregatedCost(context: ConsumptionManagementContext) {
  return {
    getForBillingPeriodByManagementGroup: (
      managementGroupId: string,
      billingPeriodName: string,
      options?: AggregatedCostGetForBillingPeriodByManagementGroupOptionalParams,
    ) =>
      getForBillingPeriodByManagementGroup(context, managementGroupId, billingPeriodName, options),
    getByManagementGroup: (
      managementGroupId: string,
      options?: AggregatedCostGetByManagementGroupOptionalParams,
    ) => getByManagementGroup(context, managementGroupId, options),
  };
}

export function _getAggregatedCostOperations(
  context: ConsumptionManagementContext,
): AggregatedCostOperations {
  return {
    ..._getAggregatedCost(context),
  };
}
