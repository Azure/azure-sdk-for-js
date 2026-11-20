// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { createOrUpdate, get, list } from "../../api/batchPricings/operations.js";
import type {
  BatchPricingsCreateOrUpdateOptionalParams,
  BatchPricingsGetOptionalParams,
  BatchPricingsListOptionalParams,
} from "../../api/batchPricings/options.js";
import type { PricingBatch } from "../../models/batchPricingsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a BatchPricings operations. */
export interface BatchPricingsOperations {
  /** Updates multiple pricing plan configurations in a single operation. */
  createOrUpdate: (
    scopeId: string,
    pricingBatchName: string,
    pricingBatch: PricingBatch,
    options?: BatchPricingsCreateOrUpdateOptionalParams,
  ) => Promise<PricingBatch>;
  /** Gets the current pricing batch configuration for the specified scope. */
  get: (
    scopeId: string,
    pricingBatchName: string,
    options?: BatchPricingsGetOptionalParams,
  ) => Promise<PricingBatch>;
  /** Lists the pricing batch resources for the specified scope. */
  list: (
    scopeId: string,
    options?: BatchPricingsListOptionalParams,
  ) => PagedAsyncIterableIterator<PricingBatch>;
}

function _getBatchPricings(context: SecurityCenterContext) {
  return {
    createOrUpdate: (
      scopeId: string,
      pricingBatchName: string,
      pricingBatch: PricingBatch,
      options?: BatchPricingsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, scopeId, pricingBatchName, pricingBatch, options),
    get: (scopeId: string, pricingBatchName: string, options?: BatchPricingsGetOptionalParams) =>
      get(context, scopeId, pricingBatchName, options),
    list: (scopeId: string, options?: BatchPricingsListOptionalParams) =>
      list(context, scopeId, options),
  };
}

export function _getBatchPricingsOperations(
  context: SecurityCenterContext,
): BatchPricingsOperations {
  return {
    ..._getBatchPricings(context),
  };
}
