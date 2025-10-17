// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
import { listByLocation } from "../../api/virtualMachineScaleSetsOperationGroup/operations.js";
import type { VirtualMachineScaleSetsOperationGroupListByLocationOptionalParams } from "../../api/virtualMachineScaleSetsOperationGroup/options.js";
import type { VirtualMachineScaleSet } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a VirtualMachineScaleSetsOperationGroup operations. */
export interface VirtualMachineScaleSetsOperationGroupOperations {
  /** Gets all the VM scale sets under the specified subscription for the specified location. */
  listByLocation: (
    location: string,
    options?: VirtualMachineScaleSetsOperationGroupListByLocationOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualMachineScaleSet>;
}

function _getVirtualMachineScaleSetsOperationGroup(context: ComputeContext) {
  return {
    listByLocation: (
      location: string,
      options?: VirtualMachineScaleSetsOperationGroupListByLocationOptionalParams,
    ) => listByLocation(context, location, options),
  };
}

export function _getVirtualMachineScaleSetsOperationGroupOperations(
  context: ComputeContext,
): VirtualMachineScaleSetsOperationGroupOperations {
  return {
    ..._getVirtualMachineScaleSetsOperationGroup(context),
  };
}
