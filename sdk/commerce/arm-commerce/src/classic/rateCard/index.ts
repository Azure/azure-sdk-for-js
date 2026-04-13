// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { UsageManagementContext } from "../../api/usageManagementContext.js";
import { get } from "../../api/rateCard/operations.js";
import type { RateCardGetOptionalParams } from "../../api/rateCard/options.js";
import type { ResourceRateCardInfo } from "../../models/models.js";

/** Interface representing a RateCard operations. */
export interface RateCardOperations {
  /** Enables you to query for the resource/meter metadata and related prices used in a given subscription by Offer ID, Currency, Locale and Region. The metadata associated with the billing meters, including but not limited to service names, types, resources, units of measure, and regions, is subject to change at any time and without notice. If you intend to use this billing data in an automated fashion, please use the billing meter GUID to uniquely identify each billable item. If the billing meter GUID is scheduled to change due to a new billing model, you will be notified in advance of the change. */
  get: (filter: string, options?: RateCardGetOptionalParams) => Promise<ResourceRateCardInfo>;
}

function _getRateCard(context: UsageManagementContext) {
  return {
    get: (filter: string, options?: RateCardGetOptionalParams) => get(context, filter, options),
  };
}

export function _getRateCardOperations(context: UsageManagementContext): RateCardOperations {
  return {
    ..._getRateCard(context),
  };
}
