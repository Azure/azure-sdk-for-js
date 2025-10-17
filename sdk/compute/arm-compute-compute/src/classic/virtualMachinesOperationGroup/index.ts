// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementContext } from "../../api/computeManagementContext.js";
import { listByLocation } from "../../api/virtualMachinesOperationGroup/operations.js";
import type { VirtualMachinesOperationGroupListByLocationOptionalParams } from "../../api/virtualMachinesOperationGroup/options.js";
import type { VirtualMachine } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a VirtualMachinesOperationGroup operations. */
export interface VirtualMachinesOperationGroupOperations {
  /** Gets all the virtual machines under the specified subscription for the specified location. */
  listByLocation: (
    location: string,
    options?: VirtualMachinesOperationGroupListByLocationOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualMachine>;
}

function _getVirtualMachinesOperationGroup(context: ComputeManagementContext) {
  return {
    listByLocation: (
      location: string,
      options?: VirtualMachinesOperationGroupListByLocationOptionalParams,
    ) => listByLocation(context, location, options),
  };
}

export function _getVirtualMachinesOperationGroupOperations(
  context: ComputeManagementContext,
): VirtualMachinesOperationGroupOperations {
  return {
    ..._getVirtualMachinesOperationGroup(context),
  };
}
