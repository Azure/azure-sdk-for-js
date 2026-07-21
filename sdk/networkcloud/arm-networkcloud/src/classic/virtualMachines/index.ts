// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudContext } from "../../api/networkCloudContext.js";
import {
  start,
  restart,
  reimage,
  powerOff,
  assignRelay,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/virtualMachines/operations.js";
import {
  VirtualMachinesStartOptionalParams,
  VirtualMachinesRestartOptionalParams,
  VirtualMachinesReimageOptionalParams,
  VirtualMachinesPowerOffOptionalParams,
  VirtualMachinesAssignRelayOptionalParams,
  VirtualMachinesListBySubscriptionOptionalParams,
  VirtualMachinesListByResourceGroupOptionalParams,
  VirtualMachinesDeleteOptionalParams,
  VirtualMachinesUpdateOptionalParams,
  VirtualMachinesCreateOrUpdateOptionalParams,
  VirtualMachinesGetOptionalParams,
} from "../../api/virtualMachines/options.js";
import { OperationStatusResult, VirtualMachine } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualMachines operations. */
export interface VirtualMachinesOperations {
  /** Start the provided virtual machine. */
  start: (
    resourceGroupName: string,
    virtualMachineName: string,
    options?: VirtualMachinesStartOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** @deprecated use start instead */
  beginStart: (
    resourceGroupName: string,
    virtualMachineName: string,
    options?: VirtualMachinesStartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OperationStatusResult>, OperationStatusResult>>;
  /** @deprecated use start instead */
  beginStartAndWait: (
    resourceGroupName: string,
    virtualMachineName: string,
    options?: VirtualMachinesStartOptionalParams,
  ) => Promise<OperationStatusResult>;
  /** Restart the provided virtual machine. */
  restart: (
    resourceGroupName: string,
    virtualMachineName: string,
    options?: VirtualMachinesRestartOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** @deprecated use restart instead */
  beginRestart: (
    resourceGroupName: string,
    virtualMachineName: string,
    options?: VirtualMachinesRestartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OperationStatusResult>, OperationStatusResult>>;
  /** @deprecated use restart instead */
  beginRestartAndWait: (
    resourceGroupName: string,
    virtualMachineName: string,
    options?: VirtualMachinesRestartOptionalParams,
  ) => Promise<OperationStatusResult>;
  /** Reimage the provided virtual machine. */
  reimage: (
    resourceGroupName: string,
    virtualMachineName: string,
    options?: VirtualMachinesReimageOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** @deprecated use reimage instead */
  beginReimage: (
    resourceGroupName: string,
    virtualMachineName: string,
    options?: VirtualMachinesReimageOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OperationStatusResult>, OperationStatusResult>>;
  /** @deprecated use reimage instead */
  beginReimageAndWait: (
    resourceGroupName: string,
    virtualMachineName: string,
    options?: VirtualMachinesReimageOptionalParams,
  ) => Promise<OperationStatusResult>;
  /** Power off the provided virtual machine. */
  powerOff: (
    resourceGroupName: string,
    virtualMachineName: string,
    options?: VirtualMachinesPowerOffOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** @deprecated use powerOff instead */
  beginPowerOff: (
    resourceGroupName: string,
    virtualMachineName: string,
    options?: VirtualMachinesPowerOffOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OperationStatusResult>, OperationStatusResult>>;
  /** @deprecated use powerOff instead */
  beginPowerOffAndWait: (
    resourceGroupName: string,
    virtualMachineName: string,
    options?: VirtualMachinesPowerOffOptionalParams,
  ) => Promise<OperationStatusResult>;
  /** Assigns a relay to the specified Microsoft.HybridCompute machine associated with the provided virtual machine. */
  assignRelay: (
    resourceGroupName: string,
    virtualMachineName: string,
    options?: VirtualMachinesAssignRelayOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** @deprecated use assignRelay instead */
  beginAssignRelay: (
    resourceGroupName: string,
    virtualMachineName: string,
    options?: VirtualMachinesAssignRelayOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OperationStatusResult>, OperationStatusResult>>;
  /** @deprecated use assignRelay instead */
  beginAssignRelayAndWait: (
    resourceGroupName: string,
    virtualMachineName: string,
    options?: VirtualMachinesAssignRelayOptionalParams,
  ) => Promise<OperationStatusResult>;
  /** Get a list of virtual machines in the provided subscription. */
  listBySubscription: (
    options?: VirtualMachinesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualMachine>;
  /** Get a list of virtual machines in the provided resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: VirtualMachinesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualMachine>;
  /** Delete the provided virtual machine. */
  delete: (
    resourceGroupName: string,
    virtualMachineName: string,
    options?: VirtualMachinesDeleteOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    virtualMachineName: string,
    options?: VirtualMachinesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OperationStatusResult>, OperationStatusResult>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    virtualMachineName: string,
    options?: VirtualMachinesDeleteOptionalParams,
  ) => Promise<OperationStatusResult>;
  /** Patch the properties of the provided virtual machine, or update the tags associated with the virtual machine. Properties and tag updates can be done independently. */
  update: (
    resourceGroupName: string,
    virtualMachineName: string,
    options?: VirtualMachinesUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualMachine>, VirtualMachine>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    virtualMachineName: string,
    options?: VirtualMachinesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<VirtualMachine>, VirtualMachine>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    virtualMachineName: string,
    options?: VirtualMachinesUpdateOptionalParams,
  ) => Promise<VirtualMachine>;
  /** Create a new virtual machine or update the properties of the existing virtual machine. */
  createOrUpdate: (
    resourceGroupName: string,
    virtualMachineName: string,
    virtualMachineParameters: VirtualMachine,
    options?: VirtualMachinesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualMachine>, VirtualMachine>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    virtualMachineName: string,
    virtualMachineParameters: VirtualMachine,
    options?: VirtualMachinesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<VirtualMachine>, VirtualMachine>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    virtualMachineName: string,
    virtualMachineParameters: VirtualMachine,
    options?: VirtualMachinesCreateOrUpdateOptionalParams,
  ) => Promise<VirtualMachine>;
  /** Get properties of the provided virtual machine. */
  get: (
    resourceGroupName: string,
    virtualMachineName: string,
    options?: VirtualMachinesGetOptionalParams,
  ) => Promise<VirtualMachine>;
}

function _getVirtualMachines(context: NetworkCloudContext) {
  return {
    start: (
      resourceGroupName: string,
      virtualMachineName: string,
      options?: VirtualMachinesStartOptionalParams,
    ) => start(context, resourceGroupName, virtualMachineName, options),
    beginStart: async (
      resourceGroupName: string,
      virtualMachineName: string,
      options?: VirtualMachinesStartOptionalParams,
    ) => {
      const poller = start(context, resourceGroupName, virtualMachineName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStartAndWait: async (
      resourceGroupName: string,
      virtualMachineName: string,
      options?: VirtualMachinesStartOptionalParams,
    ) => {
      return await start(context, resourceGroupName, virtualMachineName, options);
    },
    restart: (
      resourceGroupName: string,
      virtualMachineName: string,
      options?: VirtualMachinesRestartOptionalParams,
    ) => restart(context, resourceGroupName, virtualMachineName, options),
    beginRestart: async (
      resourceGroupName: string,
      virtualMachineName: string,
      options?: VirtualMachinesRestartOptionalParams,
    ) => {
      const poller = restart(context, resourceGroupName, virtualMachineName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRestartAndWait: async (
      resourceGroupName: string,
      virtualMachineName: string,
      options?: VirtualMachinesRestartOptionalParams,
    ) => {
      return await restart(context, resourceGroupName, virtualMachineName, options);
    },
    reimage: (
      resourceGroupName: string,
      virtualMachineName: string,
      options?: VirtualMachinesReimageOptionalParams,
    ) => reimage(context, resourceGroupName, virtualMachineName, options),
    beginReimage: async (
      resourceGroupName: string,
      virtualMachineName: string,
      options?: VirtualMachinesReimageOptionalParams,
    ) => {
      const poller = reimage(context, resourceGroupName, virtualMachineName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginReimageAndWait: async (
      resourceGroupName: string,
      virtualMachineName: string,
      options?: VirtualMachinesReimageOptionalParams,
    ) => {
      return await reimage(context, resourceGroupName, virtualMachineName, options);
    },
    powerOff: (
      resourceGroupName: string,
      virtualMachineName: string,
      options?: VirtualMachinesPowerOffOptionalParams,
    ) => powerOff(context, resourceGroupName, virtualMachineName, options),
    beginPowerOff: async (
      resourceGroupName: string,
      virtualMachineName: string,
      options?: VirtualMachinesPowerOffOptionalParams,
    ) => {
      const poller = powerOff(context, resourceGroupName, virtualMachineName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPowerOffAndWait: async (
      resourceGroupName: string,
      virtualMachineName: string,
      options?: VirtualMachinesPowerOffOptionalParams,
    ) => {
      return await powerOff(context, resourceGroupName, virtualMachineName, options);
    },
    assignRelay: (
      resourceGroupName: string,
      virtualMachineName: string,
      options?: VirtualMachinesAssignRelayOptionalParams,
    ) => assignRelay(context, resourceGroupName, virtualMachineName, options),
    beginAssignRelay: async (
      resourceGroupName: string,
      virtualMachineName: string,
      options?: VirtualMachinesAssignRelayOptionalParams,
    ) => {
      const poller = assignRelay(context, resourceGroupName, virtualMachineName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginAssignRelayAndWait: async (
      resourceGroupName: string,
      virtualMachineName: string,
      options?: VirtualMachinesAssignRelayOptionalParams,
    ) => {
      return await assignRelay(context, resourceGroupName, virtualMachineName, options);
    },
    listBySubscription: (options?: VirtualMachinesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: VirtualMachinesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      virtualMachineName: string,
      options?: VirtualMachinesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, virtualMachineName, options),
    beginDelete: async (
      resourceGroupName: string,
      virtualMachineName: string,
      options?: VirtualMachinesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, virtualMachineName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      virtualMachineName: string,
      options?: VirtualMachinesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, virtualMachineName, options);
    },
    update: (
      resourceGroupName: string,
      virtualMachineName: string,
      options?: VirtualMachinesUpdateOptionalParams,
    ) => update(context, resourceGroupName, virtualMachineName, options),
    beginUpdate: async (
      resourceGroupName: string,
      virtualMachineName: string,
      options?: VirtualMachinesUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, virtualMachineName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      virtualMachineName: string,
      options?: VirtualMachinesUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, virtualMachineName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      virtualMachineName: string,
      virtualMachineParameters: VirtualMachine,
      options?: VirtualMachinesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        virtualMachineName,
        virtualMachineParameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      virtualMachineName: string,
      virtualMachineParameters: VirtualMachine,
      options?: VirtualMachinesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        virtualMachineName,
        virtualMachineParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      virtualMachineName: string,
      virtualMachineParameters: VirtualMachine,
      options?: VirtualMachinesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        virtualMachineName,
        virtualMachineParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      virtualMachineName: string,
      options?: VirtualMachinesGetOptionalParams,
    ) => get(context, resourceGroupName, virtualMachineName, options),
  };
}

export function _getVirtualMachinesOperations(
  context: NetworkCloudContext,
): VirtualMachinesOperations {
  return {
    ..._getVirtualMachines(context),
  };
}
