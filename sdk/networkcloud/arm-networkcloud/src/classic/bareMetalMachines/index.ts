// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudContext } from "../../api/networkCloudContext.js";
import {
  uncordon,
  start,
  runReadCommands,
  runDataExtractsRestricted,
  runDataExtracts,
  runCommand,
  restart,
  replace,
  reimage,
  powerOff,
  cordon,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/bareMetalMachines/operations.js";
import {
  BareMetalMachinesUncordonOptionalParams,
  BareMetalMachinesStartOptionalParams,
  BareMetalMachinesRunReadCommandsOptionalParams,
  BareMetalMachinesRunDataExtractsRestrictedOptionalParams,
  BareMetalMachinesRunDataExtractsOptionalParams,
  BareMetalMachinesRunCommandOptionalParams,
  BareMetalMachinesRestartOptionalParams,
  BareMetalMachinesReplaceOptionalParams,
  BareMetalMachinesReimageOptionalParams,
  BareMetalMachinesPowerOffOptionalParams,
  BareMetalMachinesCordonOptionalParams,
  BareMetalMachinesListBySubscriptionOptionalParams,
  BareMetalMachinesListByResourceGroupOptionalParams,
  BareMetalMachinesDeleteOptionalParams,
  BareMetalMachinesUpdateOptionalParams,
  BareMetalMachinesCreateOrUpdateOptionalParams,
  BareMetalMachinesGetOptionalParams,
} from "../../api/bareMetalMachines/options.js";
import {
  OperationStatusResult,
  BareMetalMachine,
  BareMetalMachineRunCommandParameters,
  BareMetalMachineRunDataExtractsParameters,
  BareMetalMachineRunReadCommandsParameters,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BareMetalMachines operations. */
export interface BareMetalMachinesOperations {
  /** Uncordon the provided bare metal machine's Kubernetes node. */
  uncordon: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    options?: BareMetalMachinesUncordonOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** @deprecated use uncordon instead */
  beginUncordon: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    options?: BareMetalMachinesUncordonOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OperationStatusResult>, OperationStatusResult>>;
  /** @deprecated use uncordon instead */
  beginUncordonAndWait: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    options?: BareMetalMachinesUncordonOptionalParams,
  ) => Promise<OperationStatusResult>;
  /** Start the provided bare metal machine. */
  start: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    options?: BareMetalMachinesStartOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** @deprecated use start instead */
  beginStart: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    options?: BareMetalMachinesStartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OperationStatusResult>, OperationStatusResult>>;
  /** @deprecated use start instead */
  beginStartAndWait: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    options?: BareMetalMachinesStartOptionalParams,
  ) => Promise<OperationStatusResult>;
  /** Run one or more read-only commands on the provided bare metal machine. The URL to storage account with the command execution results and the command exit code can be retrieved from the operation status API once available. */
  runReadCommands: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    bareMetalMachineRunReadCommandsParameters: BareMetalMachineRunReadCommandsParameters,
    options?: BareMetalMachinesRunReadCommandsOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** @deprecated use runReadCommands instead */
  beginRunReadCommands: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    bareMetalMachineRunReadCommandsParameters: BareMetalMachineRunReadCommandsParameters,
    options?: BareMetalMachinesRunReadCommandsOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OperationStatusResult>, OperationStatusResult>>;
  /** @deprecated use runReadCommands instead */
  beginRunReadCommandsAndWait: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    bareMetalMachineRunReadCommandsParameters: BareMetalMachineRunReadCommandsParameters,
    options?: BareMetalMachinesRunReadCommandsOptionalParams,
  ) => Promise<OperationStatusResult>;
  /** Run one or more restricted data extractions on the provided bare metal machine. The URL to storage account with the command execution results and the command exit code can be retrieved from the operation status API once available. */
  runDataExtractsRestricted: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    bareMetalMachineRunDataExtractsRestrictedParameters: BareMetalMachineRunDataExtractsParameters,
    options?: BareMetalMachinesRunDataExtractsRestrictedOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** @deprecated use runDataExtractsRestricted instead */
  beginRunDataExtractsRestricted: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    bareMetalMachineRunDataExtractsRestrictedParameters: BareMetalMachineRunDataExtractsParameters,
    options?: BareMetalMachinesRunDataExtractsRestrictedOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OperationStatusResult>, OperationStatusResult>>;
  /** @deprecated use runDataExtractsRestricted instead */
  beginRunDataExtractsRestrictedAndWait: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    bareMetalMachineRunDataExtractsRestrictedParameters: BareMetalMachineRunDataExtractsParameters,
    options?: BareMetalMachinesRunDataExtractsRestrictedOptionalParams,
  ) => Promise<OperationStatusResult>;
  /** Run one or more data extractions on the provided bare metal machine. The URL to storage account with the command execution results and the command exit code can be retrieved from the operation status API once available. */
  runDataExtracts: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    bareMetalMachineRunDataExtractsParameters: BareMetalMachineRunDataExtractsParameters,
    options?: BareMetalMachinesRunDataExtractsOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** @deprecated use runDataExtracts instead */
  beginRunDataExtracts: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    bareMetalMachineRunDataExtractsParameters: BareMetalMachineRunDataExtractsParameters,
    options?: BareMetalMachinesRunDataExtractsOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OperationStatusResult>, OperationStatusResult>>;
  /** @deprecated use runDataExtracts instead */
  beginRunDataExtractsAndWait: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    bareMetalMachineRunDataExtractsParameters: BareMetalMachineRunDataExtractsParameters,
    options?: BareMetalMachinesRunDataExtractsOptionalParams,
  ) => Promise<OperationStatusResult>;
  /** Run the command or the script on the provided bare metal machine. The URL to storage account with the command execution results and the command exit code can be retrieved from the operation status API once available. */
  runCommand: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    bareMetalMachineRunCommandParameters: BareMetalMachineRunCommandParameters,
    options?: BareMetalMachinesRunCommandOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** @deprecated use runCommand instead */
  beginRunCommand: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    bareMetalMachineRunCommandParameters: BareMetalMachineRunCommandParameters,
    options?: BareMetalMachinesRunCommandOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OperationStatusResult>, OperationStatusResult>>;
  /** @deprecated use runCommand instead */
  beginRunCommandAndWait: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    bareMetalMachineRunCommandParameters: BareMetalMachineRunCommandParameters,
    options?: BareMetalMachinesRunCommandOptionalParams,
  ) => Promise<OperationStatusResult>;
  /** Restart the provided bare metal machine. */
  restart: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    options?: BareMetalMachinesRestartOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** @deprecated use restart instead */
  beginRestart: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    options?: BareMetalMachinesRestartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OperationStatusResult>, OperationStatusResult>>;
  /** @deprecated use restart instead */
  beginRestartAndWait: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    options?: BareMetalMachinesRestartOptionalParams,
  ) => Promise<OperationStatusResult>;
  /** Replace the provided bare metal machine. */
  replace: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    options?: BareMetalMachinesReplaceOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** @deprecated use replace instead */
  beginReplace: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    options?: BareMetalMachinesReplaceOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OperationStatusResult>, OperationStatusResult>>;
  /** @deprecated use replace instead */
  beginReplaceAndWait: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    options?: BareMetalMachinesReplaceOptionalParams,
  ) => Promise<OperationStatusResult>;
  /** Reimage the provided bare metal machine. */
  reimage: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    options?: BareMetalMachinesReimageOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** @deprecated use reimage instead */
  beginReimage: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    options?: BareMetalMachinesReimageOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OperationStatusResult>, OperationStatusResult>>;
  /** @deprecated use reimage instead */
  beginReimageAndWait: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    options?: BareMetalMachinesReimageOptionalParams,
  ) => Promise<OperationStatusResult>;
  /** Power off the provided bare metal machine. */
  powerOff: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    options?: BareMetalMachinesPowerOffOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** @deprecated use powerOff instead */
  beginPowerOff: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    options?: BareMetalMachinesPowerOffOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OperationStatusResult>, OperationStatusResult>>;
  /** @deprecated use powerOff instead */
  beginPowerOffAndWait: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    options?: BareMetalMachinesPowerOffOptionalParams,
  ) => Promise<OperationStatusResult>;
  /** Cordon the provided bare metal machine's Kubernetes node. */
  cordon: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    options?: BareMetalMachinesCordonOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** @deprecated use cordon instead */
  beginCordon: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    options?: BareMetalMachinesCordonOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OperationStatusResult>, OperationStatusResult>>;
  /** @deprecated use cordon instead */
  beginCordonAndWait: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    options?: BareMetalMachinesCordonOptionalParams,
  ) => Promise<OperationStatusResult>;
  /** Get a list of bare metal machines in the provided subscription. */
  listBySubscription: (
    options?: BareMetalMachinesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<BareMetalMachine>;
  /** Get a list of bare metal machines in the provided resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: BareMetalMachinesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<BareMetalMachine>;
  /** Delete the provided bare metal machine. All customer initiated requests will be rejected as the life cycle of this resource is managed by the system. */
  delete: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    options?: BareMetalMachinesDeleteOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    options?: BareMetalMachinesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OperationStatusResult>, OperationStatusResult>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    options?: BareMetalMachinesDeleteOptionalParams,
  ) => Promise<OperationStatusResult>;
  /** Patch properties of the provided bare metal machine, or update tags associated with the bare metal machine. Properties and tag updates can be done independently. */
  update: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    options?: BareMetalMachinesUpdateOptionalParams,
  ) => PollerLike<OperationState<BareMetalMachine>, BareMetalMachine>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    options?: BareMetalMachinesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<BareMetalMachine>, BareMetalMachine>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    options?: BareMetalMachinesUpdateOptionalParams,
  ) => Promise<BareMetalMachine>;
  /** Create a new bare metal machine or update the properties of the existing one. All customer initiated requests will be rejected as the life cycle of this resource is managed by the system. */
  createOrUpdate: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    bareMetalMachineParameters: BareMetalMachine,
    options?: BareMetalMachinesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<BareMetalMachine>, BareMetalMachine>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    bareMetalMachineParameters: BareMetalMachine,
    options?: BareMetalMachinesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<BareMetalMachine>, BareMetalMachine>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    bareMetalMachineParameters: BareMetalMachine,
    options?: BareMetalMachinesCreateOrUpdateOptionalParams,
  ) => Promise<BareMetalMachine>;
  /** Get properties of the provided bare metal machine. */
  get: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    options?: BareMetalMachinesGetOptionalParams,
  ) => Promise<BareMetalMachine>;
}

function _getBareMetalMachines(context: NetworkCloudContext) {
  return {
    uncordon: (
      resourceGroupName: string,
      bareMetalMachineName: string,
      options?: BareMetalMachinesUncordonOptionalParams,
    ) => uncordon(context, resourceGroupName, bareMetalMachineName, options),
    beginUncordon: async (
      resourceGroupName: string,
      bareMetalMachineName: string,
      options?: BareMetalMachinesUncordonOptionalParams,
    ) => {
      const poller = uncordon(context, resourceGroupName, bareMetalMachineName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUncordonAndWait: async (
      resourceGroupName: string,
      bareMetalMachineName: string,
      options?: BareMetalMachinesUncordonOptionalParams,
    ) => {
      return await uncordon(context, resourceGroupName, bareMetalMachineName, options);
    },
    start: (
      resourceGroupName: string,
      bareMetalMachineName: string,
      options?: BareMetalMachinesStartOptionalParams,
    ) => start(context, resourceGroupName, bareMetalMachineName, options),
    beginStart: async (
      resourceGroupName: string,
      bareMetalMachineName: string,
      options?: BareMetalMachinesStartOptionalParams,
    ) => {
      const poller = start(context, resourceGroupName, bareMetalMachineName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStartAndWait: async (
      resourceGroupName: string,
      bareMetalMachineName: string,
      options?: BareMetalMachinesStartOptionalParams,
    ) => {
      return await start(context, resourceGroupName, bareMetalMachineName, options);
    },
    runReadCommands: (
      resourceGroupName: string,
      bareMetalMachineName: string,
      bareMetalMachineRunReadCommandsParameters: BareMetalMachineRunReadCommandsParameters,
      options?: BareMetalMachinesRunReadCommandsOptionalParams,
    ) =>
      runReadCommands(
        context,
        resourceGroupName,
        bareMetalMachineName,
        bareMetalMachineRunReadCommandsParameters,
        options,
      ),
    beginRunReadCommands: async (
      resourceGroupName: string,
      bareMetalMachineName: string,
      bareMetalMachineRunReadCommandsParameters: BareMetalMachineRunReadCommandsParameters,
      options?: BareMetalMachinesRunReadCommandsOptionalParams,
    ) => {
      const poller = runReadCommands(
        context,
        resourceGroupName,
        bareMetalMachineName,
        bareMetalMachineRunReadCommandsParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRunReadCommandsAndWait: async (
      resourceGroupName: string,
      bareMetalMachineName: string,
      bareMetalMachineRunReadCommandsParameters: BareMetalMachineRunReadCommandsParameters,
      options?: BareMetalMachinesRunReadCommandsOptionalParams,
    ) => {
      return await runReadCommands(
        context,
        resourceGroupName,
        bareMetalMachineName,
        bareMetalMachineRunReadCommandsParameters,
        options,
      );
    },
    runDataExtractsRestricted: (
      resourceGroupName: string,
      bareMetalMachineName: string,
      bareMetalMachineRunDataExtractsRestrictedParameters: BareMetalMachineRunDataExtractsParameters,
      options?: BareMetalMachinesRunDataExtractsRestrictedOptionalParams,
    ) =>
      runDataExtractsRestricted(
        context,
        resourceGroupName,
        bareMetalMachineName,
        bareMetalMachineRunDataExtractsRestrictedParameters,
        options,
      ),
    beginRunDataExtractsRestricted: async (
      resourceGroupName: string,
      bareMetalMachineName: string,
      bareMetalMachineRunDataExtractsRestrictedParameters: BareMetalMachineRunDataExtractsParameters,
      options?: BareMetalMachinesRunDataExtractsRestrictedOptionalParams,
    ) => {
      const poller = runDataExtractsRestricted(
        context,
        resourceGroupName,
        bareMetalMachineName,
        bareMetalMachineRunDataExtractsRestrictedParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRunDataExtractsRestrictedAndWait: async (
      resourceGroupName: string,
      bareMetalMachineName: string,
      bareMetalMachineRunDataExtractsRestrictedParameters: BareMetalMachineRunDataExtractsParameters,
      options?: BareMetalMachinesRunDataExtractsRestrictedOptionalParams,
    ) => {
      return await runDataExtractsRestricted(
        context,
        resourceGroupName,
        bareMetalMachineName,
        bareMetalMachineRunDataExtractsRestrictedParameters,
        options,
      );
    },
    runDataExtracts: (
      resourceGroupName: string,
      bareMetalMachineName: string,
      bareMetalMachineRunDataExtractsParameters: BareMetalMachineRunDataExtractsParameters,
      options?: BareMetalMachinesRunDataExtractsOptionalParams,
    ) =>
      runDataExtracts(
        context,
        resourceGroupName,
        bareMetalMachineName,
        bareMetalMachineRunDataExtractsParameters,
        options,
      ),
    beginRunDataExtracts: async (
      resourceGroupName: string,
      bareMetalMachineName: string,
      bareMetalMachineRunDataExtractsParameters: BareMetalMachineRunDataExtractsParameters,
      options?: BareMetalMachinesRunDataExtractsOptionalParams,
    ) => {
      const poller = runDataExtracts(
        context,
        resourceGroupName,
        bareMetalMachineName,
        bareMetalMachineRunDataExtractsParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRunDataExtractsAndWait: async (
      resourceGroupName: string,
      bareMetalMachineName: string,
      bareMetalMachineRunDataExtractsParameters: BareMetalMachineRunDataExtractsParameters,
      options?: BareMetalMachinesRunDataExtractsOptionalParams,
    ) => {
      return await runDataExtracts(
        context,
        resourceGroupName,
        bareMetalMachineName,
        bareMetalMachineRunDataExtractsParameters,
        options,
      );
    },
    runCommand: (
      resourceGroupName: string,
      bareMetalMachineName: string,
      bareMetalMachineRunCommandParameters: BareMetalMachineRunCommandParameters,
      options?: BareMetalMachinesRunCommandOptionalParams,
    ) =>
      runCommand(
        context,
        resourceGroupName,
        bareMetalMachineName,
        bareMetalMachineRunCommandParameters,
        options,
      ),
    beginRunCommand: async (
      resourceGroupName: string,
      bareMetalMachineName: string,
      bareMetalMachineRunCommandParameters: BareMetalMachineRunCommandParameters,
      options?: BareMetalMachinesRunCommandOptionalParams,
    ) => {
      const poller = runCommand(
        context,
        resourceGroupName,
        bareMetalMachineName,
        bareMetalMachineRunCommandParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRunCommandAndWait: async (
      resourceGroupName: string,
      bareMetalMachineName: string,
      bareMetalMachineRunCommandParameters: BareMetalMachineRunCommandParameters,
      options?: BareMetalMachinesRunCommandOptionalParams,
    ) => {
      return await runCommand(
        context,
        resourceGroupName,
        bareMetalMachineName,
        bareMetalMachineRunCommandParameters,
        options,
      );
    },
    restart: (
      resourceGroupName: string,
      bareMetalMachineName: string,
      options?: BareMetalMachinesRestartOptionalParams,
    ) => restart(context, resourceGroupName, bareMetalMachineName, options),
    beginRestart: async (
      resourceGroupName: string,
      bareMetalMachineName: string,
      options?: BareMetalMachinesRestartOptionalParams,
    ) => {
      const poller = restart(context, resourceGroupName, bareMetalMachineName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRestartAndWait: async (
      resourceGroupName: string,
      bareMetalMachineName: string,
      options?: BareMetalMachinesRestartOptionalParams,
    ) => {
      return await restart(context, resourceGroupName, bareMetalMachineName, options);
    },
    replace: (
      resourceGroupName: string,
      bareMetalMachineName: string,
      options?: BareMetalMachinesReplaceOptionalParams,
    ) => replace(context, resourceGroupName, bareMetalMachineName, options),
    beginReplace: async (
      resourceGroupName: string,
      bareMetalMachineName: string,
      options?: BareMetalMachinesReplaceOptionalParams,
    ) => {
      const poller = replace(context, resourceGroupName, bareMetalMachineName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginReplaceAndWait: async (
      resourceGroupName: string,
      bareMetalMachineName: string,
      options?: BareMetalMachinesReplaceOptionalParams,
    ) => {
      return await replace(context, resourceGroupName, bareMetalMachineName, options);
    },
    reimage: (
      resourceGroupName: string,
      bareMetalMachineName: string,
      options?: BareMetalMachinesReimageOptionalParams,
    ) => reimage(context, resourceGroupName, bareMetalMachineName, options),
    beginReimage: async (
      resourceGroupName: string,
      bareMetalMachineName: string,
      options?: BareMetalMachinesReimageOptionalParams,
    ) => {
      const poller = reimage(context, resourceGroupName, bareMetalMachineName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginReimageAndWait: async (
      resourceGroupName: string,
      bareMetalMachineName: string,
      options?: BareMetalMachinesReimageOptionalParams,
    ) => {
      return await reimage(context, resourceGroupName, bareMetalMachineName, options);
    },
    powerOff: (
      resourceGroupName: string,
      bareMetalMachineName: string,
      options?: BareMetalMachinesPowerOffOptionalParams,
    ) => powerOff(context, resourceGroupName, bareMetalMachineName, options),
    beginPowerOff: async (
      resourceGroupName: string,
      bareMetalMachineName: string,
      options?: BareMetalMachinesPowerOffOptionalParams,
    ) => {
      const poller = powerOff(context, resourceGroupName, bareMetalMachineName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPowerOffAndWait: async (
      resourceGroupName: string,
      bareMetalMachineName: string,
      options?: BareMetalMachinesPowerOffOptionalParams,
    ) => {
      return await powerOff(context, resourceGroupName, bareMetalMachineName, options);
    },
    cordon: (
      resourceGroupName: string,
      bareMetalMachineName: string,
      options?: BareMetalMachinesCordonOptionalParams,
    ) => cordon(context, resourceGroupName, bareMetalMachineName, options),
    beginCordon: async (
      resourceGroupName: string,
      bareMetalMachineName: string,
      options?: BareMetalMachinesCordonOptionalParams,
    ) => {
      const poller = cordon(context, resourceGroupName, bareMetalMachineName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCordonAndWait: async (
      resourceGroupName: string,
      bareMetalMachineName: string,
      options?: BareMetalMachinesCordonOptionalParams,
    ) => {
      return await cordon(context, resourceGroupName, bareMetalMachineName, options);
    },
    listBySubscription: (options?: BareMetalMachinesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: BareMetalMachinesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      bareMetalMachineName: string,
      options?: BareMetalMachinesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, bareMetalMachineName, options),
    beginDelete: async (
      resourceGroupName: string,
      bareMetalMachineName: string,
      options?: BareMetalMachinesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, bareMetalMachineName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      bareMetalMachineName: string,
      options?: BareMetalMachinesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, bareMetalMachineName, options);
    },
    update: (
      resourceGroupName: string,
      bareMetalMachineName: string,
      options?: BareMetalMachinesUpdateOptionalParams,
    ) => update(context, resourceGroupName, bareMetalMachineName, options),
    beginUpdate: async (
      resourceGroupName: string,
      bareMetalMachineName: string,
      options?: BareMetalMachinesUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, bareMetalMachineName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      bareMetalMachineName: string,
      options?: BareMetalMachinesUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, bareMetalMachineName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      bareMetalMachineName: string,
      bareMetalMachineParameters: BareMetalMachine,
      options?: BareMetalMachinesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        bareMetalMachineName,
        bareMetalMachineParameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      bareMetalMachineName: string,
      bareMetalMachineParameters: BareMetalMachine,
      options?: BareMetalMachinesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        bareMetalMachineName,
        bareMetalMachineParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      bareMetalMachineName: string,
      bareMetalMachineParameters: BareMetalMachine,
      options?: BareMetalMachinesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        bareMetalMachineName,
        bareMetalMachineParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      bareMetalMachineName: string,
      options?: BareMetalMachinesGetOptionalParams,
    ) => get(context, resourceGroupName, bareMetalMachineName, options),
  };
}

export function _getBareMetalMachinesOperations(
  context: NetworkCloudContext,
): BareMetalMachinesOperations {
  return {
    ..._getBareMetalMachines(context),
  };
}
