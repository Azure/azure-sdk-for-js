// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
import {
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/virtualMachineScaleSetExtensions/operations.js";
import type {
  VirtualMachineScaleSetExtensionsListOptionalParams,
  VirtualMachineScaleSetExtensionsDeleteOptionalParams,
  VirtualMachineScaleSetExtensionsUpdateOptionalParams,
  VirtualMachineScaleSetExtensionsCreateOrUpdateOptionalParams,
  VirtualMachineScaleSetExtensionsGetOptionalParams,
} from "../../api/virtualMachineScaleSetExtensions/options.js";
import type {
  VirtualMachineScaleSetExtension,
  VirtualMachineScaleSetExtensionUpdate,
} from "../../models/compute/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualMachineScaleSetExtensions operations. */
export interface VirtualMachineScaleSetExtensionsOperations {
  /** Gets a list of all extensions in a VM scale set. */
  list: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetExtensionsListOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualMachineScaleSetExtension>;
  /** The operation to delete the extension. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    vmScaleSetName: string,
    vmssExtensionName: string,
    options?: VirtualMachineScaleSetExtensionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    vmScaleSetName: string,
    vmssExtensionName: string,
    options?: VirtualMachineScaleSetExtensionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    vmScaleSetName: string,
    vmssExtensionName: string,
    options?: VirtualMachineScaleSetExtensionsDeleteOptionalParams,
  ) => Promise<void>;
  /** The operation to update an extension. */
  update: (
    resourceGroupName: string,
    vmScaleSetName: string,
    vmssExtensionName: string,
    extensionParameters: VirtualMachineScaleSetExtensionUpdate,
    options?: VirtualMachineScaleSetExtensionsUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualMachineScaleSetExtension>, VirtualMachineScaleSetExtension>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    vmScaleSetName: string,
    vmssExtensionName: string,
    extensionParameters: VirtualMachineScaleSetExtensionUpdate,
    options?: VirtualMachineScaleSetExtensionsUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<VirtualMachineScaleSetExtension>,
      VirtualMachineScaleSetExtension
    >
  >;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    vmScaleSetName: string,
    vmssExtensionName: string,
    extensionParameters: VirtualMachineScaleSetExtensionUpdate,
    options?: VirtualMachineScaleSetExtensionsUpdateOptionalParams,
  ) => Promise<VirtualMachineScaleSetExtension>;
  /** The operation to create or update an extension. */
  createOrUpdate: (
    resourceGroupName: string,
    vmScaleSetName: string,
    vmssExtensionName: string,
    extensionParameters: VirtualMachineScaleSetExtension,
    options?: VirtualMachineScaleSetExtensionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualMachineScaleSetExtension>, VirtualMachineScaleSetExtension>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    vmScaleSetName: string,
    vmssExtensionName: string,
    extensionParameters: VirtualMachineScaleSetExtension,
    options?: VirtualMachineScaleSetExtensionsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<VirtualMachineScaleSetExtension>,
      VirtualMachineScaleSetExtension
    >
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    vmScaleSetName: string,
    vmssExtensionName: string,
    extensionParameters: VirtualMachineScaleSetExtension,
    options?: VirtualMachineScaleSetExtensionsCreateOrUpdateOptionalParams,
  ) => Promise<VirtualMachineScaleSetExtension>;
  /** The operation to get the extension. */
  get: (
    resourceGroupName: string,
    vmScaleSetName: string,
    vmssExtensionName: string,
    options?: VirtualMachineScaleSetExtensionsGetOptionalParams,
  ) => Promise<VirtualMachineScaleSetExtension>;
}

function _getVirtualMachineScaleSetExtensions(context: ComputeContext) {
  return {
    list: (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetExtensionsListOptionalParams,
    ) => list(context, resourceGroupName, vmScaleSetName, options),
    delete: (
      resourceGroupName: string,
      vmScaleSetName: string,
      vmssExtensionName: string,
      options?: VirtualMachineScaleSetExtensionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, vmScaleSetName, vmssExtensionName, options),
    beginDelete: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      vmssExtensionName: string,
      options?: VirtualMachineScaleSetExtensionsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        vmScaleSetName,
        vmssExtensionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      vmssExtensionName: string,
      options?: VirtualMachineScaleSetExtensionsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, vmScaleSetName, vmssExtensionName, options);
    },
    update: (
      resourceGroupName: string,
      vmScaleSetName: string,
      vmssExtensionName: string,
      extensionParameters: VirtualMachineScaleSetExtensionUpdate,
      options?: VirtualMachineScaleSetExtensionsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        vmScaleSetName,
        vmssExtensionName,
        extensionParameters,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      vmssExtensionName: string,
      extensionParameters: VirtualMachineScaleSetExtensionUpdate,
      options?: VirtualMachineScaleSetExtensionsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        vmScaleSetName,
        vmssExtensionName,
        extensionParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      vmssExtensionName: string,
      extensionParameters: VirtualMachineScaleSetExtensionUpdate,
      options?: VirtualMachineScaleSetExtensionsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        vmScaleSetName,
        vmssExtensionName,
        extensionParameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      vmScaleSetName: string,
      vmssExtensionName: string,
      extensionParameters: VirtualMachineScaleSetExtension,
      options?: VirtualMachineScaleSetExtensionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        vmScaleSetName,
        vmssExtensionName,
        extensionParameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      vmssExtensionName: string,
      extensionParameters: VirtualMachineScaleSetExtension,
      options?: VirtualMachineScaleSetExtensionsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        vmScaleSetName,
        vmssExtensionName,
        extensionParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      vmssExtensionName: string,
      extensionParameters: VirtualMachineScaleSetExtension,
      options?: VirtualMachineScaleSetExtensionsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        vmScaleSetName,
        vmssExtensionName,
        extensionParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      vmScaleSetName: string,
      vmssExtensionName: string,
      options?: VirtualMachineScaleSetExtensionsGetOptionalParams,
    ) => get(context, resourceGroupName, vmScaleSetName, vmssExtensionName, options),
  };
}

export function _getVirtualMachineScaleSetExtensionsOperations(
  context: ComputeContext,
): VirtualMachineScaleSetExtensionsOperations {
  return {
    ..._getVirtualMachineScaleSetExtensions(context),
  };
}
