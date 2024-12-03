// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevOpsInfrastructureContext } from "../../api/devOpsInfrastructureContext.js";
import { SkuListByLocationOptionalParams } from "../../api/options.js";
import { skuListByLocation } from "../../api/sku/index.js";
import { ResourceSku } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

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
