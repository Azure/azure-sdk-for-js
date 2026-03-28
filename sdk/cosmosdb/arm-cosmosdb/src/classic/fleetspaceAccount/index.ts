// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import { list, $delete, create, get } from "../../api/fleetspaceAccount/operations.js";
import type {
  FleetspaceAccountListOptionalParams,
  FleetspaceAccountDeleteOptionalParams,
  FleetspaceAccountCreateOptionalParams,
  FleetspaceAccountGetOptionalParams,
} from "../../api/fleetspaceAccount/options.js";
import type { FleetspaceAccountResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a FleetspaceAccount operations. */
export interface FleetspaceAccountOperations {
  /** Lists all the fleetspaces accounts  under a fleetspace. */
  list: (
    resourceGroupName: string,
    fleetName: string,
    fleetspaceName: string,
    options?: FleetspaceAccountListOptionalParams,
  ) => PagedAsyncIterableIterator<FleetspaceAccountResource>;
  /** Removes an existing Azure Cosmos DB fleetspace account from a fleetspace. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    fleetName: string,
    fleetspaceName: string,
    fleetspaceAccountName: string,
    options?: FleetspaceAccountDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    fleetName: string,
    fleetspaceName: string,
    fleetspaceAccountName: string,
    options?: FleetspaceAccountDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    fleetName: string,
    fleetspaceName: string,
    fleetspaceAccountName: string,
    options?: FleetspaceAccountDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates an Azure Cosmos DB fleetspace account under a fleetspace. */
  create: (
    resourceGroupName: string,
    fleetName: string,
    fleetspaceName: string,
    fleetspaceAccountName: string,
    body: FleetspaceAccountResource,
    options?: FleetspaceAccountCreateOptionalParams,
  ) => PollerLike<OperationState<FleetspaceAccountResource>, FleetspaceAccountResource>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    fleetName: string,
    fleetspaceName: string,
    fleetspaceAccountName: string,
    body: FleetspaceAccountResource,
    options?: FleetspaceAccountCreateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<FleetspaceAccountResource>, FleetspaceAccountResource>
  >;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    fleetName: string,
    fleetspaceName: string,
    fleetspaceAccountName: string,
    body: FleetspaceAccountResource,
    options?: FleetspaceAccountCreateOptionalParams,
  ) => Promise<FleetspaceAccountResource>;
  /** Retrieves the properties of an existing Azure Cosmos DB fleetspace account under a fleetspace */
  get: (
    resourceGroupName: string,
    fleetName: string,
    fleetspaceName: string,
    fleetspaceAccountName: string,
    options?: FleetspaceAccountGetOptionalParams,
  ) => Promise<FleetspaceAccountResource>;
}

function _getFleetspaceAccount(context: CosmosDBManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      fleetName: string,
      fleetspaceName: string,
      options?: FleetspaceAccountListOptionalParams,
    ) => list(context, resourceGroupName, fleetName, fleetspaceName, options),
    delete: (
      resourceGroupName: string,
      fleetName: string,
      fleetspaceName: string,
      fleetspaceAccountName: string,
      options?: FleetspaceAccountDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        fleetName,
        fleetspaceName,
        fleetspaceAccountName,
        options,
      ),
    beginDelete: async (
      resourceGroupName: string,
      fleetName: string,
      fleetspaceName: string,
      fleetspaceAccountName: string,
      options?: FleetspaceAccountDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        fleetName,
        fleetspaceName,
        fleetspaceAccountName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      fleetName: string,
      fleetspaceName: string,
      fleetspaceAccountName: string,
      options?: FleetspaceAccountDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        fleetName,
        fleetspaceName,
        fleetspaceAccountName,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      fleetName: string,
      fleetspaceName: string,
      fleetspaceAccountName: string,
      body: FleetspaceAccountResource,
      options?: FleetspaceAccountCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        fleetName,
        fleetspaceName,
        fleetspaceAccountName,
        body,
        options,
      ),
    beginCreate: async (
      resourceGroupName: string,
      fleetName: string,
      fleetspaceName: string,
      fleetspaceAccountName: string,
      body: FleetspaceAccountResource,
      options?: FleetspaceAccountCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        fleetName,
        fleetspaceName,
        fleetspaceAccountName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      fleetName: string,
      fleetspaceName: string,
      fleetspaceAccountName: string,
      body: FleetspaceAccountResource,
      options?: FleetspaceAccountCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        fleetName,
        fleetspaceName,
        fleetspaceAccountName,
        body,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      fleetName: string,
      fleetspaceName: string,
      fleetspaceAccountName: string,
      options?: FleetspaceAccountGetOptionalParams,
    ) => get(context, resourceGroupName, fleetName, fleetspaceName, fleetspaceAccountName, options),
  };
}

export function _getFleetspaceAccountOperations(
  context: CosmosDBManagementContext,
): FleetspaceAccountOperations {
  return {
    ..._getFleetspaceAccount(context),
  };
}
