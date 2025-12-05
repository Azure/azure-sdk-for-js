// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureFleetContext } from "../../api/azureFleetContext.js";
import {
  cancel,
  listVirtualMachines,
  listVirtualMachineScaleSets,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/fleets/operations.js";
import type {
  FleetsCancelOptionalParams,
  FleetsListVirtualMachinesOptionalParams,
  FleetsListVirtualMachineScaleSetsOptionalParams,
  FleetsListBySubscriptionOptionalParams,
  FleetsListByResourceGroupOptionalParams,
  FleetsDeleteOptionalParams,
  FleetsUpdateOptionalParams,
  FleetsCreateOrUpdateOptionalParams,
  FleetsGetOptionalParams,
} from "../../api/fleets/options.js";
import type {
  Fleet,
  FleetUpdate,
  VirtualMachineScaleSet,
  VirtualMachine,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Fleets operations. */
export interface FleetsOperations {
  /** Cancels an instance Fleet creation that is in progress. */
  cancel: (
    resourceGroupName: string,
    fleetName: string,
    options?: FleetsCancelOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use cancel instead */
  beginCancel: (
    resourceGroupName: string,
    fleetName: string,
    options?: FleetsCancelOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use cancel instead */
  beginCancelAndWait: (
    resourceGroupName: string,
    fleetName: string,
    options?: FleetsCancelOptionalParams,
  ) => Promise<void>;
  /** List VirtualMachine resources of an instance Fleet. */
  listVirtualMachines: (
    resourceGroupName: string,
    name: string,
    options?: FleetsListVirtualMachinesOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualMachine>;
  /** List VirtualMachineScaleSet resources by Fleet */
  listVirtualMachineScaleSets: (
    resourceGroupName: string,
    name: string,
    options?: FleetsListVirtualMachineScaleSetsOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualMachineScaleSet>;
  /** List Fleet resources by subscription ID */
  listBySubscription: (
    options?: FleetsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Fleet>;
  /** List Fleet resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: FleetsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Fleet>;
  /** Delete a Fleet */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    fleetName: string,
    options?: FleetsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    fleetName: string,
    options?: FleetsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    fleetName: string,
    options?: FleetsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a Fleet */
  update: (
    resourceGroupName: string,
    fleetName: string,
    properties: FleetUpdate,
    options?: FleetsUpdateOptionalParams,
  ) => PollerLike<OperationState<Fleet>, Fleet>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    fleetName: string,
    properties: FleetUpdate,
    options?: FleetsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Fleet>, Fleet>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    fleetName: string,
    properties: FleetUpdate,
    options?: FleetsUpdateOptionalParams,
  ) => Promise<Fleet>;
  /** Create a Fleet */
  createOrUpdate: (
    resourceGroupName: string,
    fleetName: string,
    resource: Fleet,
    options?: FleetsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Fleet>, Fleet>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    fleetName: string,
    resource: Fleet,
    options?: FleetsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Fleet>, Fleet>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    fleetName: string,
    resource: Fleet,
    options?: FleetsCreateOrUpdateOptionalParams,
  ) => Promise<Fleet>;
  /** Get a Fleet */
  get: (
    resourceGroupName: string,
    fleetName: string,
    options?: FleetsGetOptionalParams,
  ) => Promise<Fleet>;
}

function _getFleets(context: AzureFleetContext) {
  return {
    cancel: (resourceGroupName: string, fleetName: string, options?: FleetsCancelOptionalParams) =>
      cancel(context, resourceGroupName, fleetName, options),
    beginCancel: async (
      resourceGroupName: string,
      fleetName: string,
      options?: FleetsCancelOptionalParams,
    ) => {
      const poller = cancel(context, resourceGroupName, fleetName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCancelAndWait: async (
      resourceGroupName: string,
      fleetName: string,
      options?: FleetsCancelOptionalParams,
    ) => {
      return await cancel(context, resourceGroupName, fleetName, options);
    },
    listVirtualMachines: (
      resourceGroupName: string,
      name: string,
      options?: FleetsListVirtualMachinesOptionalParams,
    ) => listVirtualMachines(context, resourceGroupName, name, options),
    listVirtualMachineScaleSets: (
      resourceGroupName: string,
      name: string,
      options?: FleetsListVirtualMachineScaleSetsOptionalParams,
    ) => listVirtualMachineScaleSets(context, resourceGroupName, name, options),
    listBySubscription: (options?: FleetsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: FleetsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (resourceGroupName: string, fleetName: string, options?: FleetsDeleteOptionalParams) =>
      $delete(context, resourceGroupName, fleetName, options),
    beginDelete: async (
      resourceGroupName: string,
      fleetName: string,
      options?: FleetsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, fleetName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      fleetName: string,
      options?: FleetsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, fleetName, options);
    },
    update: (
      resourceGroupName: string,
      fleetName: string,
      properties: FleetUpdate,
      options?: FleetsUpdateOptionalParams,
    ) => update(context, resourceGroupName, fleetName, properties, options),
    beginUpdate: async (
      resourceGroupName: string,
      fleetName: string,
      properties: FleetUpdate,
      options?: FleetsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, fleetName, properties, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      fleetName: string,
      properties: FleetUpdate,
      options?: FleetsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, fleetName, properties, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      fleetName: string,
      resource: Fleet,
      options?: FleetsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, fleetName, resource, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      fleetName: string,
      resource: Fleet,
      options?: FleetsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, fleetName, resource, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      fleetName: string,
      resource: Fleet,
      options?: FleetsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, fleetName, resource, options);
    },
    get: (resourceGroupName: string, fleetName: string, options?: FleetsGetOptionalParams) =>
      get(context, resourceGroupName, fleetName, options),
  };
}

export function _getFleetsOperations(context: AzureFleetContext): FleetsOperations {
  return {
    ..._getFleets(context),
  };
}
