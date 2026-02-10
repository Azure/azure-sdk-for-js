// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureVMwareSolutionAPIContext } from "../../api/azureVMwareSolutionAPIContext.js";
import { list } from "../../api/skus/operations.js";
import type { SkusListOptionalParams } from "../../api/skus/options.js";
import type { ResourceSku } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Skus operations. */
export interface SkusOperations {
  /** A list of SKUs. */
  list: (options?: SkusListOptionalParams) => PagedAsyncIterableIterator<ResourceSku>;
}

function _getSkus(context: AzureVMwareSolutionAPIContext) {
  return {
    list: (options?: SkusListOptionalParams) => list(context, options),
  };
}

export function _getSkusOperations(context: AzureVMwareSolutionAPIContext): SkusOperations {
  return {
    ..._getSkus(context),
  };
}
