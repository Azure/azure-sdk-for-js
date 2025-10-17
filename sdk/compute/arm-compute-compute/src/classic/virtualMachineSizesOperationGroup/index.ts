// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementContext } from "../../api/computeManagementContext.js";
import { list } from "../../api/virtualMachineSizesOperationGroup/operations.js";
import type { VirtualMachineSizesOperationGroupListOptionalParams } from "../../api/virtualMachineSizesOperationGroup/options.js";
import type { VirtualMachineSize } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a VirtualMachineSizesOperationGroup operations. */
export interface VirtualMachineSizesOperationGroupOperations {
  /** This API is deprecated. Use [Resources Skus](https://docs.microsoft.com/rest/api/compute/resourceskus/list) */
  list: (
    location: string,
    options?: VirtualMachineSizesOperationGroupListOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualMachineSize>;
}

function _getVirtualMachineSizesOperationGroup(context: ComputeManagementContext) {
  return {
    list: (location: string, options?: VirtualMachineSizesOperationGroupListOptionalParams) =>
      list(context, location, options),
  };
}

export function _getVirtualMachineSizesOperationGroupOperations(
  context: ComputeManagementContext,
): VirtualMachineSizesOperationGroupOperations {
  return {
    ..._getVirtualMachineSizesOperationGroup(context),
  };
}
