// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementContext } from "../../api/computeManagementContext.js";
import { list } from "../../api/resourceSkus/operations.js";
import { ResourceSkusListOptionalParams } from "../../api/resourceSkus/options.js";
import { ResourceSku } from "../../models/computeSku/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ResourceSkus operations. */
export interface ResourceSkusOperations {
  /** Gets the list of Microsoft.Compute SKUs available for your Subscription. */
  list: (options?: ResourceSkusListOptionalParams) => PagedAsyncIterableIterator<ResourceSku>;
}

function _getResourceSkus(context: ComputeManagementContext) {
  return {
    list: (options?: ResourceSkusListOptionalParams) => list(context, options),
  };
}

export function _getResourceSkusOperations(
  context: ComputeManagementContext,
): ResourceSkusOperations {
  return {
    ..._getResourceSkus(context),
  };
}
