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
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BareMetalMachines operations. */
export interface BareMetalMachinesOperations {
  /** Uncordon the provided bare metal machine's Kubernetes node. */
  uncordon: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    options?: BareMetalMachinesUncordonOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** Start the provided bare metal machine. */
  start: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    options?: BareMetalMachinesStartOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** Run one or more read-only commands on the provided bare metal machine. The URL to storage account with the command execution results and the command exit code can be retrieved from the operation status API once available. */
  runReadCommands: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    bareMetalMachineRunReadCommandsParameters: BareMetalMachineRunReadCommandsParameters,
    options?: BareMetalMachinesRunReadCommandsOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** Run one or more restricted data extractions on the provided bare metal machine. The URL to storage account with the command execution results and the command exit code can be retrieved from the operation status API once available. */
  runDataExtractsRestricted: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    bareMetalMachineRunDataExtractsRestrictedParameters: BareMetalMachineRunDataExtractsParameters,
    options?: BareMetalMachinesRunDataExtractsRestrictedOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** Run one or more data extractions on the provided bare metal machine. The URL to storage account with the command execution results and the command exit code can be retrieved from the operation status API once available. */
  runDataExtracts: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    bareMetalMachineRunDataExtractsParameters: BareMetalMachineRunDataExtractsParameters,
    options?: BareMetalMachinesRunDataExtractsOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** Run the command or the script on the provided bare metal machine. The URL to storage account with the command execution results and the command exit code can be retrieved from the operation status API once available. */
  runCommand: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    bareMetalMachineRunCommandParameters: BareMetalMachineRunCommandParameters,
    options?: BareMetalMachinesRunCommandOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** Restart the provided bare metal machine. */
  restart: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    options?: BareMetalMachinesRestartOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** Replace the provided bare metal machine. */
  replace: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    options?: BareMetalMachinesReplaceOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** Reimage the provided bare metal machine. */
  reimage: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    options?: BareMetalMachinesReimageOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** Power off the provided bare metal machine. */
  powerOff: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    options?: BareMetalMachinesPowerOffOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** Cordon the provided bare metal machine's Kubernetes node. */
  cordon: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    options?: BareMetalMachinesCordonOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
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
  /** Patch properties of the provided bare metal machine, or update tags associated with the bare metal machine. Properties and tag updates can be done independently. */
  update: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    options?: BareMetalMachinesUpdateOptionalParams,
  ) => PollerLike<OperationState<BareMetalMachine>, BareMetalMachine>;
  /** Create a new bare metal machine or update the properties of the existing one. All customer initiated requests will be rejected as the life cycle of this resource is managed by the system. */
  createOrUpdate: (
    resourceGroupName: string,
    bareMetalMachineName: string,
    bareMetalMachineParameters: BareMetalMachine,
    options?: BareMetalMachinesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<BareMetalMachine>, BareMetalMachine>;
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
    start: (
      resourceGroupName: string,
      bareMetalMachineName: string,
      options?: BareMetalMachinesStartOptionalParams,
    ) => start(context, resourceGroupName, bareMetalMachineName, options),
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
    restart: (
      resourceGroupName: string,
      bareMetalMachineName: string,
      options?: BareMetalMachinesRestartOptionalParams,
    ) => restart(context, resourceGroupName, bareMetalMachineName, options),
    replace: (
      resourceGroupName: string,
      bareMetalMachineName: string,
      options?: BareMetalMachinesReplaceOptionalParams,
    ) => replace(context, resourceGroupName, bareMetalMachineName, options),
    reimage: (
      resourceGroupName: string,
      bareMetalMachineName: string,
      options?: BareMetalMachinesReimageOptionalParams,
    ) => reimage(context, resourceGroupName, bareMetalMachineName, options),
    powerOff: (
      resourceGroupName: string,
      bareMetalMachineName: string,
      options?: BareMetalMachinesPowerOffOptionalParams,
    ) => powerOff(context, resourceGroupName, bareMetalMachineName, options),
    cordon: (
      resourceGroupName: string,
      bareMetalMachineName: string,
      options?: BareMetalMachinesCordonOptionalParams,
    ) => cordon(context, resourceGroupName, bareMetalMachineName, options),
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
    update: (
      resourceGroupName: string,
      bareMetalMachineName: string,
      options?: BareMetalMachinesUpdateOptionalParams,
    ) => update(context, resourceGroupName, bareMetalMachineName, options),
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
