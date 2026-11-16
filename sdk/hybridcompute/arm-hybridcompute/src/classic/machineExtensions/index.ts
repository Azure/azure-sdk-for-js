// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HybridComputeManagementContext } from "../../api/hybridComputeManagementContext.js";
import {
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/machineExtensions/operations.js";
import type {
  MachineExtensionsListOptionalParams,
  MachineExtensionsDeleteOptionalParams,
  MachineExtensionsUpdateOptionalParams,
  MachineExtensionsCreateOrUpdateOptionalParams,
  MachineExtensionsGetOptionalParams,
} from "../../api/machineExtensions/options.js";
import type { MachineExtension, MachineExtensionUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a MachineExtensions operations. */
export interface MachineExtensionsOperations {
  /** The operation to get all extensions of a non-Azure machine */
  list: (
    resourceGroupName: string,
    machineName: string,
    options?: MachineExtensionsListOptionalParams,
  ) => PagedAsyncIterableIterator<MachineExtension>;
  /** The operation to delete the extension. */
  delete: (
    resourceGroupName: string,
    machineName: string,
    extensionName: string,
    options?: MachineExtensionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    machineName: string,
    extensionName: string,
    options?: MachineExtensionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    machineName: string,
    extensionName: string,
    options?: MachineExtensionsDeleteOptionalParams,
  ) => Promise<void>;
  /** The operation to create or update the extension. */
  update: (
    resourceGroupName: string,
    machineName: string,
    extensionName: string,
    extensionParameters: MachineExtensionUpdate,
    options?: MachineExtensionsUpdateOptionalParams,
  ) => PollerLike<OperationState<MachineExtension>, MachineExtension>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    machineName: string,
    extensionName: string,
    extensionParameters: MachineExtensionUpdate,
    options?: MachineExtensionsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<MachineExtension>, MachineExtension>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    machineName: string,
    extensionName: string,
    extensionParameters: MachineExtensionUpdate,
    options?: MachineExtensionsUpdateOptionalParams,
  ) => Promise<MachineExtension>;
  /** The operation to create or update the extension. */
  createOrUpdate: (
    resourceGroupName: string,
    machineName: string,
    extensionName: string,
    extensionParameters: MachineExtension,
    options?: MachineExtensionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<MachineExtension>, MachineExtension>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    machineName: string,
    extensionName: string,
    extensionParameters: MachineExtension,
    options?: MachineExtensionsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<MachineExtension>, MachineExtension>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    machineName: string,
    extensionName: string,
    extensionParameters: MachineExtension,
    options?: MachineExtensionsCreateOrUpdateOptionalParams,
  ) => Promise<MachineExtension>;
  /** The operation to get the extension. */
  get: (
    resourceGroupName: string,
    machineName: string,
    extensionName: string,
    options?: MachineExtensionsGetOptionalParams,
  ) => Promise<MachineExtension>;
}

function _getMachineExtensions(context: HybridComputeManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      machineName: string,
      options?: MachineExtensionsListOptionalParams,
    ) => list(context, resourceGroupName, machineName, options),
    delete: (
      resourceGroupName: string,
      machineName: string,
      extensionName: string,
      options?: MachineExtensionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, machineName, extensionName, options),
    beginDelete: async (
      resourceGroupName: string,
      machineName: string,
      extensionName: string,
      options?: MachineExtensionsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, machineName, extensionName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      machineName: string,
      extensionName: string,
      options?: MachineExtensionsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, machineName, extensionName, options);
    },
    update: (
      resourceGroupName: string,
      machineName: string,
      extensionName: string,
      extensionParameters: MachineExtensionUpdate,
      options?: MachineExtensionsUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, machineName, extensionName, extensionParameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      machineName: string,
      extensionName: string,
      extensionParameters: MachineExtensionUpdate,
      options?: MachineExtensionsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        machineName,
        extensionName,
        extensionParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      machineName: string,
      extensionName: string,
      extensionParameters: MachineExtensionUpdate,
      options?: MachineExtensionsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        machineName,
        extensionName,
        extensionParameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      machineName: string,
      extensionName: string,
      extensionParameters: MachineExtension,
      options?: MachineExtensionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        machineName,
        extensionName,
        extensionParameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      machineName: string,
      extensionName: string,
      extensionParameters: MachineExtension,
      options?: MachineExtensionsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        machineName,
        extensionName,
        extensionParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      machineName: string,
      extensionName: string,
      extensionParameters: MachineExtension,
      options?: MachineExtensionsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        machineName,
        extensionName,
        extensionParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      machineName: string,
      extensionName: string,
      options?: MachineExtensionsGetOptionalParams,
    ) => get(context, resourceGroupName, machineName, extensionName, options),
  };
}

export function _getMachineExtensionsOperations(
  context: HybridComputeManagementContext,
): MachineExtensionsOperations {
  return {
    ..._getMachineExtensions(context),
  };
}
