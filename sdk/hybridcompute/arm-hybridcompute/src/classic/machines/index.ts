// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementContext } from "../../api/hybridComputeManagementContext.js";
import {
  installPatches,
  assessPatches,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/machines/operations.js";
import {
  MachinesInstallPatchesOptionalParams,
  MachinesAssessPatchesOptionalParams,
  MachinesListBySubscriptionOptionalParams,
  MachinesListByResourceGroupOptionalParams,
  MachinesDeleteOptionalParams,
  MachinesUpdateOptionalParams,
  MachinesCreateOrUpdateOptionalParams,
  MachinesGetOptionalParams,
} from "../../api/machines/options.js";
import {
  Machine,
  MachineUpdate,
  MachineAssessPatchesResult,
  MachineInstallPatchesParameters,
  MachineInstallPatchesResult,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Machines operations. */
export interface MachinesOperations {
  /** The operation to install patches on a hybrid machine identity in Azure. */
  installPatches: (
    resourceGroupName: string,
    name: string,
    installPatchesInput: MachineInstallPatchesParameters,
    options?: MachinesInstallPatchesOptionalParams,
  ) => PollerLike<OperationState<MachineInstallPatchesResult>, MachineInstallPatchesResult>;
  /** @deprecated use installPatches instead */
  beginInstallPatches: (
    resourceGroupName: string,
    name: string,
    installPatchesInput: MachineInstallPatchesParameters,
    options?: MachinesInstallPatchesOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<MachineInstallPatchesResult>, MachineInstallPatchesResult>
  >;
  /** @deprecated use installPatches instead */
  beginInstallPatchesAndWait: (
    resourceGroupName: string,
    name: string,
    installPatchesInput: MachineInstallPatchesParameters,
    options?: MachinesInstallPatchesOptionalParams,
  ) => Promise<MachineInstallPatchesResult>;
  /** The operation to assess patches on a hybrid machine identity in Azure. */
  assessPatches: (
    resourceGroupName: string,
    name: string,
    options?: MachinesAssessPatchesOptionalParams,
  ) => PollerLike<OperationState<MachineAssessPatchesResult>, MachineAssessPatchesResult>;
  /** @deprecated use assessPatches instead */
  beginAssessPatches: (
    resourceGroupName: string,
    name: string,
    options?: MachinesAssessPatchesOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<MachineAssessPatchesResult>, MachineAssessPatchesResult>
  >;
  /** @deprecated use assessPatches instead */
  beginAssessPatchesAndWait: (
    resourceGroupName: string,
    name: string,
    options?: MachinesAssessPatchesOptionalParams,
  ) => Promise<MachineAssessPatchesResult>;
  /** Lists all the hybrid machines in the specified subscription. Use the nextLink property in the response to get the next page of hybrid machines. */
  listBySubscription: (
    options?: MachinesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Machine>;
  /** Lists all the hybrid machines in the specified resource group. Use the nextLink property in the response to get the next page of hybrid machines. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: MachinesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Machine>;
  /** The operation to delete a hybrid machine. */
  delete: (
    resourceGroupName: string,
    machineName: string,
    options?: MachinesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    machineName: string,
    options?: MachinesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    machineName: string,
    options?: MachinesDeleteOptionalParams,
  ) => Promise<void>;
  /** The operation to update a hybrid machine. */
  update: (
    resourceGroupName: string,
    machineName: string,
    parameters: MachineUpdate,
    options?: MachinesUpdateOptionalParams,
  ) => Promise<Machine>;
  /** The operation to create or update a hybrid machine. Please note some properties can be set only during machine creation. */
  createOrUpdate: (
    resourceGroupName: string,
    machineName: string,
    parameters: Machine,
    options?: MachinesCreateOrUpdateOptionalParams,
  ) => Promise<Machine>;
  /** Retrieves information about the model view or the instance view of a hybrid machine. */
  get: (
    resourceGroupName: string,
    machineName: string,
    options?: MachinesGetOptionalParams,
  ) => Promise<Machine>;
}

function _getMachines(context: HybridComputeManagementContext) {
  return {
    installPatches: (
      resourceGroupName: string,
      name: string,
      installPatchesInput: MachineInstallPatchesParameters,
      options?: MachinesInstallPatchesOptionalParams,
    ) => installPatches(context, resourceGroupName, name, installPatchesInput, options),
    beginInstallPatches: async (
      resourceGroupName: string,
      name: string,
      installPatchesInput: MachineInstallPatchesParameters,
      options?: MachinesInstallPatchesOptionalParams,
    ) => {
      const poller = installPatches(context, resourceGroupName, name, installPatchesInput, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginInstallPatchesAndWait: async (
      resourceGroupName: string,
      name: string,
      installPatchesInput: MachineInstallPatchesParameters,
      options?: MachinesInstallPatchesOptionalParams,
    ) => {
      return await installPatches(context, resourceGroupName, name, installPatchesInput, options);
    },
    assessPatches: (
      resourceGroupName: string,
      name: string,
      options?: MachinesAssessPatchesOptionalParams,
    ) => assessPatches(context, resourceGroupName, name, options),
    beginAssessPatches: async (
      resourceGroupName: string,
      name: string,
      options?: MachinesAssessPatchesOptionalParams,
    ) => {
      const poller = assessPatches(context, resourceGroupName, name, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginAssessPatchesAndWait: async (
      resourceGroupName: string,
      name: string,
      options?: MachinesAssessPatchesOptionalParams,
    ) => {
      return await assessPatches(context, resourceGroupName, name, options);
    },
    listBySubscription: (options?: MachinesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: MachinesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      machineName: string,
      options?: MachinesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, machineName, options),
    beginDelete: async (
      resourceGroupName: string,
      machineName: string,
      options?: MachinesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, machineName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      machineName: string,
      options?: MachinesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, machineName, options);
    },
    update: (
      resourceGroupName: string,
      machineName: string,
      parameters: MachineUpdate,
      options?: MachinesUpdateOptionalParams,
    ) => update(context, resourceGroupName, machineName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      machineName: string,
      parameters: Machine,
      options?: MachinesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, machineName, parameters, options),
    get: (resourceGroupName: string, machineName: string, options?: MachinesGetOptionalParams) =>
      get(context, resourceGroupName, machineName, options),
  };
}

export function _getMachinesOperations(
  context: HybridComputeManagementContext,
): MachinesOperations {
  return {
    ..._getMachines(context),
  };
}
