// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevOpsInfrastructureContext } from "../../api/devOpsInfrastructureContext.js";
import { listByLocation } from "../../api/sku/operations.js";
import type { SkuListByLocationOptionalParams } from "../../api/sku/options.js";
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
function _getSku(context: DevOpsInfrastructureContext) {
  return {
    listByLocation: (locationName: string, options?: SkuListByLocationOptionalParams) =>
      listByLocation(context, locationName, options),
  };
}
export function _getSkuOperations(context: DevOpsInfrastructureContext): SkuOperations {
  return {
    ..._getSku(context),
  };
}
