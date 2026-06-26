// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import {
  list,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/fleet/operations.js";
import {
  FleetListOptionalParams,
  FleetListByResourceGroupOptionalParams,
  FleetDeleteOptionalParams,
  FleetUpdateOptionalParams,
  FleetCreateOptionalParams,
  FleetGetOptionalParams,
} from "../../api/fleet/options.js";
import { FleetResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Fleet operations. */
export interface FleetOperations {
  /** Lists all the fleets under the subscription. */
  list: (options?: FleetListOptionalParams) => PagedAsyncIterableIterator<FleetResource>;
  /** Lists all the fleets under the specified subscription and resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: FleetListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<FleetResource>;
  /** Deletes an existing Azure Cosmos DB Fleet. */
  delete: (
    resourceGroupName: string,
    fleetName: string,
    options?: FleetDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    fleetName: string,
    options?: FleetDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    fleetName: string,
    options?: FleetDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the properties of an existing Azure Cosmos DB Fleet. */
  update: (
    resourceGroupName: string,
    fleetName: string,
    options?: FleetUpdateOptionalParams,
  ) => Promise<FleetResource>;
  /** Creates an Azure Cosmos DB fleet under a subscription. */
  create: (
    resourceGroupName: string,
    fleetName: string,
    body: FleetResource,
    options?: FleetCreateOptionalParams,
  ) => Promise<FleetResource>;
  /** Retrieves the properties of an existing Azure Cosmos DB fleet under a subscription */
  get: (
    resourceGroupName: string,
    fleetName: string,
    options?: FleetGetOptionalParams,
  ) => Promise<FleetResource>;
}

function _getFleet(context: CosmosDBManagementContext) {
  return {
    list: (options?: FleetListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: FleetListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (resourceGroupName: string, fleetName: string, options?: FleetDeleteOptionalParams) =>
      $delete(context, resourceGroupName, fleetName, options),
    beginDelete: async (
      resourceGroupName: string,
      fleetName: string,
      options?: FleetDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, fleetName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      fleetName: string,
      options?: FleetDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, fleetName, options);
    },
    update: (resourceGroupName: string, fleetName: string, options?: FleetUpdateOptionalParams) =>
      update(context, resourceGroupName, fleetName, options),
    create: (
      resourceGroupName: string,
      fleetName: string,
      body: FleetResource,
      options?: FleetCreateOptionalParams,
    ) => create(context, resourceGroupName, fleetName, body, options),
    get: (resourceGroupName: string, fleetName: string, options?: FleetGetOptionalParams) =>
      get(context, resourceGroupName, fleetName, options),
  };
}

export function _getFleetOperations(context: CosmosDBManagementContext): FleetOperations {
  return {
    ..._getFleet(context),
  };
}
