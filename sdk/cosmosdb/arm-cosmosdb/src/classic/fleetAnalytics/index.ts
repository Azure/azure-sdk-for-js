// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import { list, $delete, create, get } from "../../api/fleetAnalytics/operations.js";
import type {
  FleetAnalyticsListOptionalParams,
  FleetAnalyticsDeleteOptionalParams,
  FleetAnalyticsCreateOptionalParams,
  FleetAnalyticsGetOptionalParams,
} from "../../api/fleetAnalytics/options.js";
import type { FleetAnalyticsResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a FleetAnalytics operations. */
export interface FleetAnalyticsOperations {
  /** Lists all the FleetAnalytics under a fleet. */
  list: (
    resourceGroupName: string,
    fleetName: string,
    options?: FleetAnalyticsListOptionalParams,
  ) => PagedAsyncIterableIterator<FleetAnalyticsResource>;
  /** Deletes an existing Azure Cosmos DB FleetAnalytics. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    fleetName: string,
    fleetAnalyticsName: string,
    options?: FleetAnalyticsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    fleetName: string,
    fleetAnalyticsName: string,
    options?: FleetAnalyticsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    fleetName: string,
    fleetAnalyticsName: string,
    options?: FleetAnalyticsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates an Azure Cosmos DB FleetAnalytics under a fleet. */
  create: (
    resourceGroupName: string,
    fleetName: string,
    fleetAnalyticsName: string,
    body: FleetAnalyticsResource,
    options?: FleetAnalyticsCreateOptionalParams,
  ) => Promise<FleetAnalyticsResource>;
  /** Retrieves the properties of an existing Azure Cosmos DB FleetAnalytics under a fleet */
  get: (
    resourceGroupName: string,
    fleetName: string,
    fleetAnalyticsName: string,
    options?: FleetAnalyticsGetOptionalParams,
  ) => Promise<FleetAnalyticsResource>;
}

function _getFleetAnalytics(context: CosmosDBManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      fleetName: string,
      options?: FleetAnalyticsListOptionalParams,
    ) => list(context, resourceGroupName, fleetName, options),
    delete: (
      resourceGroupName: string,
      fleetName: string,
      fleetAnalyticsName: string,
      options?: FleetAnalyticsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, fleetName, fleetAnalyticsName, options),
    beginDelete: async (
      resourceGroupName: string,
      fleetName: string,
      fleetAnalyticsName: string,
      options?: FleetAnalyticsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, fleetName, fleetAnalyticsName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      fleetName: string,
      fleetAnalyticsName: string,
      options?: FleetAnalyticsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, fleetName, fleetAnalyticsName, options);
    },
    create: (
      resourceGroupName: string,
      fleetName: string,
      fleetAnalyticsName: string,
      body: FleetAnalyticsResource,
      options?: FleetAnalyticsCreateOptionalParams,
    ) => create(context, resourceGroupName, fleetName, fleetAnalyticsName, body, options),
    get: (
      resourceGroupName: string,
      fleetName: string,
      fleetAnalyticsName: string,
      options?: FleetAnalyticsGetOptionalParams,
    ) => get(context, resourceGroupName, fleetName, fleetAnalyticsName, options),
  };
}

export function _getFleetAnalyticsOperations(
  context: CosmosDBManagementContext,
): FleetAnalyticsOperations {
  return {
    ..._getFleetAnalytics(context),
  };
}
