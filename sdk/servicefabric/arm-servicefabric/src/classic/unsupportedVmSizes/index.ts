// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceFabricManagementContext } from "../../api/serviceFabricManagementContext.js";
import { list, get } from "../../api/unsupportedVmSizes/operations.js";
import type {
  UnsupportedVmSizesListOptionalParams,
  UnsupportedVmSizesGetOptionalParams,
} from "../../api/unsupportedVmSizes/options.js";
import type { VMSizeResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a UnsupportedVmSizes operations. */
export interface UnsupportedVmSizesOperations {
  /** Get the lists of unsupported vm sizes for Service Fabric Clusters. */
  list: (
    location: string,
    options?: UnsupportedVmSizesListOptionalParams,
  ) => PagedAsyncIterableIterator<VMSizeResource>;
  /** Get unsupported vm size for Service Fabric Clusters. */
  get: (
    location: string,
    vmSize: string,
    options?: UnsupportedVmSizesGetOptionalParams,
  ) => Promise<VMSizeResource>;
}

function _getUnsupportedVmSizes(context: ServiceFabricManagementContext) {
  return {
    list: (location: string, options?: UnsupportedVmSizesListOptionalParams) =>
      list(context, location, options),
    get: (location: string, vmSize: string, options?: UnsupportedVmSizesGetOptionalParams) =>
      get(context, location, vmSize, options),
  };
}

export function _getUnsupportedVmSizesOperations(
  context: ServiceFabricManagementContext,
): UnsupportedVmSizesOperations {
  return {
    ..._getUnsupportedVmSizes(context),
  };
}
