// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPIContext } from "../../api/azureVMwareSolutionAPIContext.js";
import { ResourceSku } from "../../models/models.js";
import { SkusListOptionalParams } from "../../api/skus/options.js";
import { list } from "../../api/skus/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Skus operations. */
export interface SkusOperations {
  /** A list of SKUs. */
  list: (
    apiVersion: string,
    options?: SkusListOptionalParams,
  ) => PagedAsyncIterableIterator<ResourceSku>;
}

function _getSkus(context: AzureVMwareSolutionAPIContext) {
  return {
    list: (apiVersion: string, options?: SkusListOptionalParams) =>
      list(context, apiVersion, options),
  };
}

export function _getSkusOperations(context: AzureVMwareSolutionAPIContext): SkusOperations {
  return {
    ..._getSkus(context),
  };
}
