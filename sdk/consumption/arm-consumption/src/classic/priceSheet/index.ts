// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConsumptionManagementContext } from "../../api/consumptionManagementContext.js";
import {
  downloadByBillingAccountPeriod,
  get,
  getByBillingPeriod,
} from "../../api/priceSheet/operations.js";
import {
  PriceSheetDownloadByBillingAccountPeriodOptionalParams,
  PriceSheetGetOptionalParams,
  PriceSheetGetByBillingPeriodOptionalParams,
} from "../../api/priceSheet/options.js";
import { PriceSheetResult, OperationStatus } from "../../models/models.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PriceSheet operations. */
export interface PriceSheetOperations {
  /** Generates the pricesheet for the provided billing period asynchronously based on the enrollment id */
  downloadByBillingAccountPeriod: (
    billingAccountId: string,
    billingPeriodName: string,
    options?: PriceSheetDownloadByBillingAccountPeriodOptionalParams,
  ) => PollerLike<OperationState<OperationStatus>, OperationStatus>;
  /** Gets the price sheet for a subscription. Price sheet is available via this API only for May 1, 2014 or later. */
  get: (options?: PriceSheetGetOptionalParams) => Promise<PriceSheetResult>;
  /** Get the price sheet for a scope by subscriptionId and billing period. Price sheet is available via this API only for May 1, 2014 or later. */
  getByBillingPeriod: (
    billingPeriodName: string,
    options?: PriceSheetGetByBillingPeriodOptionalParams,
  ) => Promise<PriceSheetResult>;
}

function _getPriceSheet(context: ConsumptionManagementContext) {
  return {
    downloadByBillingAccountPeriod: (
      billingAccountId: string,
      billingPeriodName: string,
      options?: PriceSheetDownloadByBillingAccountPeriodOptionalParams,
    ) => downloadByBillingAccountPeriod(context, billingAccountId, billingPeriodName, options),
    get: (options?: PriceSheetGetOptionalParams) => get(context, options),
    getByBillingPeriod: (
      billingPeriodName: string,
      options?: PriceSheetGetByBillingPeriodOptionalParams,
    ) => getByBillingPeriod(context, billingPeriodName, options),
  };
}

export function _getPriceSheetOperations(
  context: ConsumptionManagementContext,
): PriceSheetOperations {
  return {
    ..._getPriceSheet(context),
  };
}
