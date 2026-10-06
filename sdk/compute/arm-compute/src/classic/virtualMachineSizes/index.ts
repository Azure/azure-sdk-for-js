// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementContext } from "../../api/computeManagementContext.js";
import { list } from "../../api/virtualMachineSizes/operations.js";
import type { VirtualMachineSizesListOptionalParams } from "../../api/virtualMachineSizes/options.js";
import type { VirtualMachineSize } from "../../models/compute/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a VirtualMachineSizes operations. */
export interface VirtualMachineSizesOperations {
  /** This API is deprecated. Use [Resources Skus](https://docs.microsoft.com/rest/api/compute/resourceskus/list) */
  list: (
    location: string,
    options?: VirtualMachineSizesListOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualMachineSize>;
}

function _getVirtualMachineSizes(context: ComputeManagementContext) {
  return {
    list: (location: string, options?: VirtualMachineSizesListOptionalParams) =>
      list(context, location, options),
  };
}

export function _getVirtualMachineSizesOperations(
  context: ComputeManagementContext,
): VirtualMachineSizesOperations {
  return {
    ..._getVirtualMachineSizes(context),
  };
}
