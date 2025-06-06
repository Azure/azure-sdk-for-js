// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPIContext } from "../../api/azureVMwareSolutionAPIContext.js";
import { VirtualMachine, VirtualMachineRestrictMovement } from "../../models/models.js";
import {
  VirtualMachinesRestrictMovementOptionalParams,
  VirtualMachinesGetOptionalParams,
  VirtualMachinesListOptionalParams,
} from "../../api/virtualMachines/options.js";
import { restrictMovement, get, list } from "../../api/virtualMachines/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualMachines operations. */
export interface VirtualMachinesOperations {
  /** Enable or disable DRS-driven VM movement restriction */
  restrictMovement: (
    resourceGroupName: string,
    privateCloudName: string,
    clusterName: string,
    virtualMachineId: string,
    restrictMovementParameter: VirtualMachineRestrictMovement,
    options?: VirtualMachinesRestrictMovementOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Get a VirtualMachine */
  get: (
    resourceGroupName: string,
    privateCloudName: string,
    clusterName: string,
    virtualMachineId: string,
    options?: VirtualMachinesGetOptionalParams,
  ) => Promise<VirtualMachine>;
  /** List VirtualMachine resources by Cluster */
  list: (
    resourceGroupName: string,
    privateCloudName: string,
    clusterName: string,
    options?: VirtualMachinesListOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualMachine>;
}

function _getVirtualMachines(context: AzureVMwareSolutionAPIContext) {
  return {
    restrictMovement: (
      resourceGroupName: string,
      privateCloudName: string,
      clusterName: string,
      virtualMachineId: string,
      restrictMovementParameter: VirtualMachineRestrictMovement,
      options?: VirtualMachinesRestrictMovementOptionalParams,
    ) =>
      restrictMovement(
        context,
        resourceGroupName,
        privateCloudName,
        clusterName,
        virtualMachineId,
        restrictMovementParameter,
        options,
      ),
    get: (
      resourceGroupName: string,
      privateCloudName: string,
      clusterName: string,
      virtualMachineId: string,
      options?: VirtualMachinesGetOptionalParams,
    ) => get(context, resourceGroupName, privateCloudName, clusterName, virtualMachineId, options),
    list: (
      resourceGroupName: string,
      privateCloudName: string,
      clusterName: string,
      options?: VirtualMachinesListOptionalParams,
    ) => list(context, resourceGroupName, privateCloudName, clusterName, options),
  };
}

export function _getVirtualMachinesOperations(
  context: AzureVMwareSolutionAPIContext,
): VirtualMachinesOperations {
  return {
    ..._getVirtualMachines(context),
  };
}
