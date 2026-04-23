// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import { list, $delete, update, create, get } from "../../api/fleetspace/operations.js";
import type {
  FleetspaceListOptionalParams,
  FleetspaceDeleteOptionalParams,
  FleetspaceUpdateOptionalParams,
  FleetspaceCreateOptionalParams,
  FleetspaceGetOptionalParams,
} from "../../api/fleetspace/options.js";
import type { FleetspaceResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Fleetspace operations. */
export interface FleetspaceOperations {
  /** Lists all the fleetspaces under a fleet. */
  list: (
    resourceGroupName: string,
    fleetName: string,
    options?: FleetspaceListOptionalParams,
  ) => PagedAsyncIterableIterator<FleetspaceResource>;
  /** Deletes an existing Azure Cosmos DB Fleetspace. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    fleetName: string,
    fleetspaceName: string,
    options?: FleetspaceDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    fleetName: string,
    fleetspaceName: string,
    options?: FleetspaceDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    fleetName: string,
    fleetspaceName: string,
    options?: FleetspaceDeleteOptionalParams,
  ) => Promise<void>;
  /** Update the properties of an existing Azure Cosmos DB fleetspace under a fleet. */
  update: (
    resourceGroupName: string,
    fleetName: string,
    fleetspaceName: string,
    options?: FleetspaceUpdateOptionalParams,
  ) => PollerLike<OperationState<FleetspaceResource>, FleetspaceResource>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    fleetName: string,
    fleetspaceName: string,
    options?: FleetspaceUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<FleetspaceResource>, FleetspaceResource>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    fleetName: string,
    fleetspaceName: string,
    options?: FleetspaceUpdateOptionalParams,
  ) => Promise<FleetspaceResource>;
  /** Creates an Azure Cosmos DB fleetspace under a fleet. */
  create: (
    resourceGroupName: string,
    fleetName: string,
    fleetspaceName: string,
    body: FleetspaceResource,
    options?: FleetspaceCreateOptionalParams,
  ) => PollerLike<OperationState<FleetspaceResource>, FleetspaceResource>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    fleetName: string,
    fleetspaceName: string,
    body: FleetspaceResource,
    options?: FleetspaceCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<FleetspaceResource>, FleetspaceResource>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    fleetName: string,
    fleetspaceName: string,
    body: FleetspaceResource,
    options?: FleetspaceCreateOptionalParams,
  ) => Promise<FleetspaceResource>;
  /** Retrieves the properties of an existing Azure Cosmos DB fleetspace under a fleet */
  get: (
    resourceGroupName: string,
    fleetName: string,
    fleetspaceName: string,
    options?: FleetspaceGetOptionalParams,
  ) => Promise<FleetspaceResource>;
}

function _getFleetspace(context: CosmosDBManagementContext) {
  return {
    list: (resourceGroupName: string, fleetName: string, options?: FleetspaceListOptionalParams) =>
      list(context, resourceGroupName, fleetName, options),
    delete: (
      resourceGroupName: string,
      fleetName: string,
      fleetspaceName: string,
      options?: FleetspaceDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, fleetName, fleetspaceName, options),
    beginDelete: async (
      resourceGroupName: string,
      fleetName: string,
      fleetspaceName: string,
      options?: FleetspaceDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, fleetName, fleetspaceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      fleetName: string,
      fleetspaceName: string,
      options?: FleetspaceDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, fleetName, fleetspaceName, options);
    },
    update: (
      resourceGroupName: string,
      fleetName: string,
      fleetspaceName: string,
      options?: FleetspaceUpdateOptionalParams,
    ) => update(context, resourceGroupName, fleetName, fleetspaceName, options),
    beginUpdate: async (
      resourceGroupName: string,
      fleetName: string,
      fleetspaceName: string,
      options?: FleetspaceUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, fleetName, fleetspaceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      fleetName: string,
      fleetspaceName: string,
      options?: FleetspaceUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, fleetName, fleetspaceName, options);
    },
    create: (
      resourceGroupName: string,
      fleetName: string,
      fleetspaceName: string,
      body: FleetspaceResource,
      options?: FleetspaceCreateOptionalParams,
    ) => create(context, resourceGroupName, fleetName, fleetspaceName, body, options),
    beginCreate: async (
      resourceGroupName: string,
      fleetName: string,
      fleetspaceName: string,
      body: FleetspaceResource,
      options?: FleetspaceCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, fleetName, fleetspaceName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      fleetName: string,
      fleetspaceName: string,
      body: FleetspaceResource,
      options?: FleetspaceCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, fleetName, fleetspaceName, body, options);
    },
    get: (
      resourceGroupName: string,
      fleetName: string,
      fleetspaceName: string,
      options?: FleetspaceGetOptionalParams,
    ) => get(context, resourceGroupName, fleetName, fleetspaceName, options),
  };
}

export function _getFleetspaceOperations(context: CosmosDBManagementContext): FleetspaceOperations {
  return {
    ..._getFleetspace(context),
  };
}
