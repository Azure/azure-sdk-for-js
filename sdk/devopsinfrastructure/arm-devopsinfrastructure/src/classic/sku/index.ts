// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevOpsInfrastructureContext } from "../../api/devOpsInfrastructureContext.js";
import type { SkuListByLocationOptionalParams } from "../../api/options.js";
import { skuListByLocation } from "../../api/sku/index.js";
import type { ResourceSku } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Sku operations. */
export interface SkuOperations {
  /** List ResourceSku resources by subscription ID */
  listByLocation: (
    locationName: string,
    options?: SkuListByLocationOptionalParams,
  ) => PagedAsyncIterableIterator<ResourceSku>;
}

export function getSku(context: DevOpsInfrastructureContext, subscriptionId: string) {
  return {
    listByLocation: (locationName: string, options?: SkuListByLocationOptionalParams) =>
      skuListByLocation(context, subscriptionId, locationName, options),
  };
}

export function getSkuOperations(
  context: DevOpsInfrastructureContext,
  subscriptionId: string,
): SkuOperations {
  return {
    ...getSku(context, subscriptionId),
  };
}
