// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudContext } from "../../api/networkCloudContext.js";
import {
  listByVirtualMachine,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/consoles/operations.js";
import {
  ConsolesListByVirtualMachineOptionalParams,
  ConsolesDeleteOptionalParams,
  ConsolesUpdateOptionalParams,
  ConsolesCreateOrUpdateOptionalParams,
  ConsolesGetOptionalParams,
} from "../../api/consoles/options.js";
import { OperationStatusResult, Console } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Consoles operations. */
export interface ConsolesOperations {
  /** Get a list of consoles for the provided virtual machine. */
  listByVirtualMachine: (
    resourceGroupName: string,
    virtualMachineName: string,
    options?: ConsolesListByVirtualMachineOptionalParams,
  ) => PagedAsyncIterableIterator<Console>;
  /** Delete the provided virtual machine console. */
  delete: (
    resourceGroupName: string,
    virtualMachineName: string,
    consoleName: string,
    options?: ConsolesDeleteOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    virtualMachineName: string,
    consoleName: string,
    options?: ConsolesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OperationStatusResult>, OperationStatusResult>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    virtualMachineName: string,
    consoleName: string,
    options?: ConsolesDeleteOptionalParams,
  ) => Promise<OperationStatusResult>;
  /** Patch the properties of the provided virtual machine console, or update the tags associated with the virtual machine console. Properties and tag updates can be done independently. */
  update: (
    resourceGroupName: string,
    virtualMachineName: string,
    consoleName: string,
    options?: ConsolesUpdateOptionalParams,
  ) => PollerLike<OperationState<Console>, Console>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    virtualMachineName: string,
    consoleName: string,
    options?: ConsolesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Console>, Console>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    virtualMachineName: string,
    consoleName: string,
    options?: ConsolesUpdateOptionalParams,
  ) => Promise<Console>;
  /** Create a new virtual machine console or update the properties of the existing virtual machine console. */
  createOrUpdate: (
    resourceGroupName: string,
    virtualMachineName: string,
    consoleName: string,
    consoleParameters: Console,
    options?: ConsolesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Console>, Console>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    virtualMachineName: string,
    consoleName: string,
    consoleParameters: Console,
    options?: ConsolesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Console>, Console>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    virtualMachineName: string,
    consoleName: string,
    consoleParameters: Console,
    options?: ConsolesCreateOrUpdateOptionalParams,
  ) => Promise<Console>;
  /** Get properties of the provided virtual machine console. */
  get: (
    resourceGroupName: string,
    virtualMachineName: string,
    consoleName: string,
    options?: ConsolesGetOptionalParams,
  ) => Promise<Console>;
}

function _getConsoles(context: NetworkCloudContext) {
  return {
    listByVirtualMachine: (
      resourceGroupName: string,
      virtualMachineName: string,
      options?: ConsolesListByVirtualMachineOptionalParams,
    ) => listByVirtualMachine(context, resourceGroupName, virtualMachineName, options),
    delete: (
      resourceGroupName: string,
      virtualMachineName: string,
      consoleName: string,
      options?: ConsolesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, virtualMachineName, consoleName, options),
    beginDelete: async (
      resourceGroupName: string,
      virtualMachineName: string,
      consoleName: string,
      options?: ConsolesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, virtualMachineName, consoleName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      virtualMachineName: string,
      consoleName: string,
      options?: ConsolesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, virtualMachineName, consoleName, options);
    },
    update: (
      resourceGroupName: string,
      virtualMachineName: string,
      consoleName: string,
      options?: ConsolesUpdateOptionalParams,
    ) => update(context, resourceGroupName, virtualMachineName, consoleName, options),
    beginUpdate: async (
      resourceGroupName: string,
      virtualMachineName: string,
      consoleName: string,
      options?: ConsolesUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, virtualMachineName, consoleName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      virtualMachineName: string,
      consoleName: string,
      options?: ConsolesUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, virtualMachineName, consoleName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      virtualMachineName: string,
      consoleName: string,
      consoleParameters: Console,
      options?: ConsolesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        virtualMachineName,
        consoleName,
        consoleParameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      virtualMachineName: string,
      consoleName: string,
      consoleParameters: Console,
      options?: ConsolesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        virtualMachineName,
        consoleName,
        consoleParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      virtualMachineName: string,
      consoleName: string,
      consoleParameters: Console,
      options?: ConsolesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        virtualMachineName,
        consoleName,
        consoleParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      virtualMachineName: string,
      consoleName: string,
      options?: ConsolesGetOptionalParams,
    ) => get(context, resourceGroupName, virtualMachineName, consoleName, options),
  };
}

export function _getConsolesOperations(context: NetworkCloudContext): ConsolesOperations {
  return {
    ..._getConsoles(context),
  };
}
