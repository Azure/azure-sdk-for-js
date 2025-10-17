// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
import {
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/virtualMachineScaleSetVMExtensions/operations.js";
import type {
  VirtualMachineScaleSetVMExtensionsListOptionalParams,
  VirtualMachineScaleSetVMExtensionsDeleteOptionalParams,
  VirtualMachineScaleSetVMExtensionsUpdateOptionalParams,
  VirtualMachineScaleSetVMExtensionsCreateOrUpdateOptionalParams,
  VirtualMachineScaleSetVMExtensionsGetOptionalParams,
} from "../../api/virtualMachineScaleSetVMExtensions/options.js";
import type {
  VirtualMachineScaleSetVMExtension,
  VirtualMachineScaleSetVMExtensionUpdate,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualMachineScaleSetVMExtensions operations. */
export interface VirtualMachineScaleSetVMExtensionsOperations {
  /** The operation to get all extensions of an instance in Virtual Machine Scaleset. */
  list: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMExtensionsListOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualMachineScaleSetVMExtension>;
  /** The operation to delete the VMSS VM extension. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    vmExtensionName: string,
    options?: VirtualMachineScaleSetVMExtensionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** The operation to update the VMSS VM extension. */
  update: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    vmExtensionName: string,
    extensionParameters: VirtualMachineScaleSetVMExtensionUpdate,
    options?: VirtualMachineScaleSetVMExtensionsUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** The operation to create or update the VMSS VM extension. */
  createOrUpdate: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    vmExtensionName: string,
    extensionParameters: VirtualMachineScaleSetVMExtension,
    options?: VirtualMachineScaleSetVMExtensionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** The operation to get the VMSS VM extension. */
  get: (
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    vmExtensionName: string,
    options?: VirtualMachineScaleSetVMExtensionsGetOptionalParams,
  ) => Promise<VirtualMachineScaleSetVMExtension>;
}

function _getVirtualMachineScaleSetVMExtensions(context: ComputeContext) {
  return {
    list: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      options?: VirtualMachineScaleSetVMExtensionsListOptionalParams,
    ) => list(context, resourceGroupName, vmScaleSetName, instanceId, options),
    delete: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      vmExtensionName: string,
      options?: VirtualMachineScaleSetVMExtensionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, vmScaleSetName, instanceId, vmExtensionName, options),
    update: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      vmExtensionName: string,
      extensionParameters: VirtualMachineScaleSetVMExtensionUpdate,
      options?: VirtualMachineScaleSetVMExtensionsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        vmScaleSetName,
        instanceId,
        vmExtensionName,
        extensionParameters,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      vmExtensionName: string,
      extensionParameters: VirtualMachineScaleSetVMExtension,
      options?: VirtualMachineScaleSetVMExtensionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        vmScaleSetName,
        instanceId,
        vmExtensionName,
        extensionParameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      vmScaleSetName: string,
      instanceId: string,
      vmExtensionName: string,
      options?: VirtualMachineScaleSetVMExtensionsGetOptionalParams,
    ) => get(context, resourceGroupName, vmScaleSetName, instanceId, vmExtensionName, options),
  };
}

export function _getVirtualMachineScaleSetVMExtensionsOperations(
  context: ComputeContext,
): VirtualMachineScaleSetVMExtensionsOperations {
  return {
    ..._getVirtualMachineScaleSetVMExtensions(context),
  };
}
