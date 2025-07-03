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
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    clusterName: string,
    virtualMachineId: string,
    restrictMovementParameter: VirtualMachineRestrictMovement,
    options?: VirtualMachinesRestrictMovementOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Get a VirtualMachine */
  get: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    clusterName: string,
    virtualMachineId: string,
    options?: VirtualMachinesGetOptionalParams,
  ) => Promise<VirtualMachine>;
  /** List VirtualMachine resources by Cluster */
  list: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    clusterName: string,
    options?: VirtualMachinesListOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualMachine>;
}

function _getVirtualMachines(context: AzureVMwareSolutionAPIContext) {
  return {
    restrictMovement: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      clusterName: string,
      virtualMachineId: string,
      restrictMovementParameter: VirtualMachineRestrictMovement,
      options?: VirtualMachinesRestrictMovementOptionalParams,
    ) =>
      restrictMovement(
        context,
        apiVersion,
        resourceGroupName,
        privateCloudName,
        clusterName,
        virtualMachineId,
        restrictMovementParameter,
        options,
      ),
    get: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      clusterName: string,
      virtualMachineId: string,
      options?: VirtualMachinesGetOptionalParams,
    ) =>
      get(
        context,
        apiVersion,
        resourceGroupName,
        privateCloudName,
        clusterName,
        virtualMachineId,
        options,
      ),
    list: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      clusterName: string,
      options?: VirtualMachinesListOptionalParams,
    ) => list(context, apiVersion, resourceGroupName, privateCloudName, clusterName, options),
  };
}

export function _getVirtualMachinesOperations(
  context: AzureVMwareSolutionAPIContext,
): VirtualMachinesOperations {
  return {
    ..._getVirtualMachines(context),
  };
}
