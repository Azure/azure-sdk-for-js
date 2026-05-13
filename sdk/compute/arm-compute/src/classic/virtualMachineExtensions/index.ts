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
  VirtualMachineExtensionsListResult,
} from "../../models/compute/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualMachineExtensions operations. */
export interface VirtualMachineExtensionsOperations {
  /** The operation to get all extensions of a Virtual Machine. */
  list: (
    resourceGroupName: string,
    vmName: string,
    options?: VirtualMachineExtensionsListOptionalParams,
  ) => Promise<VirtualMachineExtensionsListResult>;
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    vmName: string,
    vmExtensionName: string,
    options?: VirtualMachineExtensionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    vmName: string,
    vmExtensionName: string,
    options?: VirtualMachineExtensionsDeleteOptionalParams,
  ) => Promise<void>;
  /** The operation to update the extension. */
  update: (
    resourceGroupName: string,
    vmName: string,
    vmExtensionName: string,
    extensionParameters: VirtualMachineExtensionUpdate,
    options?: VirtualMachineExtensionsUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualMachineExtension>, VirtualMachineExtension>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    vmName: string,
    vmExtensionName: string,
    extensionParameters: VirtualMachineExtensionUpdate,
    options?: VirtualMachineExtensionsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<VirtualMachineExtension>, VirtualMachineExtension>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    vmName: string,
    vmExtensionName: string,
    extensionParameters: VirtualMachineExtensionUpdate,
    options?: VirtualMachineExtensionsUpdateOptionalParams,
  ) => Promise<VirtualMachineExtension>;
  /** The operation to create or update the extension. */
  createOrUpdate: (
    resourceGroupName: string,
    vmName: string,
    vmExtensionName: string,
    extensionParameters: VirtualMachineExtension,
    options?: VirtualMachineExtensionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualMachineExtension>, VirtualMachineExtension>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    vmName: string,
    vmExtensionName: string,
    extensionParameters: VirtualMachineExtension,
    options?: VirtualMachineExtensionsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<VirtualMachineExtension>, VirtualMachineExtension>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    vmName: string,
    vmExtensionName: string,
    extensionParameters: VirtualMachineExtension,
    options?: VirtualMachineExtensionsCreateOrUpdateOptionalParams,
  ) => Promise<VirtualMachineExtension>;
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
    beginDelete: async (
      resourceGroupName: string,
      vmName: string,
      vmExtensionName: string,
      options?: VirtualMachineExtensionsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, vmName, vmExtensionName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      vmName: string,
      vmExtensionName: string,
      options?: VirtualMachineExtensionsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, vmName, vmExtensionName, options);
    },
    update: (
      resourceGroupName: string,
      vmName: string,
      vmExtensionName: string,
      extensionParameters: VirtualMachineExtensionUpdate,
      options?: VirtualMachineExtensionsUpdateOptionalParams,
    ) => update(context, resourceGroupName, vmName, vmExtensionName, extensionParameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      vmName: string,
      vmExtensionName: string,
      extensionParameters: VirtualMachineExtensionUpdate,
      options?: VirtualMachineExtensionsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        vmName,
        vmExtensionName,
        extensionParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      vmName: string,
      vmExtensionName: string,
      extensionParameters: VirtualMachineExtensionUpdate,
      options?: VirtualMachineExtensionsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        vmName,
        vmExtensionName,
        extensionParameters,
        options,
      );
    },
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
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      vmName: string,
      vmExtensionName: string,
      extensionParameters: VirtualMachineExtension,
      options?: VirtualMachineExtensionsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        vmName,
        vmExtensionName,
        extensionParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      vmName: string,
      vmExtensionName: string,
      extensionParameters: VirtualMachineExtension,
      options?: VirtualMachineExtensionsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        vmName,
        vmExtensionName,
        extensionParameters,
        options,
      );
    },
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
