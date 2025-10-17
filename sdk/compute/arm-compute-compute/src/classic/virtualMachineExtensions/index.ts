// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementContext } from "../../api/computeManagementContext.js";
import {
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/virtualMachineExtensions/operations.js";
import type {
  VirtualMachineExtensionsListOptionalParams,
  VirtualMachineExtensionsDeleteOptionalParams,
  VirtualMachineExtensionsUpdateOptionalParams,
  VirtualMachineExtensionsCreateOrUpdateOptionalParams,
  VirtualMachineExtensionsGetOptionalParams,
} from "../../api/virtualMachineExtensions/options.js";
import type {
  VirtualMachineExtension,
  VirtualMachineExtensionUpdate,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualMachineExtensions operations. */
export interface VirtualMachineExtensionsOperations {
  /** The operation to get all extensions of a Virtual Machine. */
  list: (
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachineExtensionsListOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualMachineExtension>;
  /** The operation to delete the extension. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    vmName: string,
    vmExtensionName: string,
    options?: VirtualMachineExtensionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** The operation to update the extension. */
  update: (
    resourceGroupName: string,
    vmName: string,
    vmExtensionName: string,
    extensionParameters: VirtualMachineExtensionUpdate,
    options?: VirtualMachineExtensionsUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** The operation to create or update the extension. */
  createOrUpdate: (
    resourceGroupName: string,
    vmName: string,
    vmExtensionName: string,
    extensionParameters: VirtualMachineExtension,
    options?: VirtualMachineExtensionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** The operation to get the extension. */
  get: (
    resourceGroupName: string,
    vmName: string,
    vmExtensionName: string,
    options?: VirtualMachineExtensionsGetOptionalParams,
  ) => Promise<VirtualMachineExtension>;
}

function _getVirtualMachineExtensions(context: ComputeManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      vmName: string,
      options?: VirtualMachineExtensionsListOptionalParams,
    ) => list(context, resourceGroupName, vmName, options),
    delete: (
      resourceGroupName: string,
      vmName: string,
      vmExtensionName: string,
      options?: VirtualMachineExtensionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, vmName, vmExtensionName, options),
    update: (
      resourceGroupName: string,
      vmName: string,
      vmExtensionName: string,
      extensionParameters: VirtualMachineExtensionUpdate,
      options?: VirtualMachineExtensionsUpdateOptionalParams,
    ) => update(context, resourceGroupName, vmName, vmExtensionName, extensionParameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      vmName: string,
      vmExtensionName: string,
      extensionParameters: VirtualMachineExtension,
      options?: VirtualMachineExtensionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        vmName,
        vmExtensionName,
        extensionParameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      vmName: string,
      vmExtensionName: string,
      options?: VirtualMachineExtensionsGetOptionalParams,
    ) => get(context, resourceGroupName, vmName, vmExtensionName, options),
  };
}

export function _getVirtualMachineExtensionsOperations(
  context: ComputeManagementContext,
): VirtualMachineExtensionsOperations {
  return {
    ..._getVirtualMachineExtensions(context),
  };
}
