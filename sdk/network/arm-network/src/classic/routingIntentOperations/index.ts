// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/routingIntentOperations/operations.js";
import type {
  RoutingIntentOperationsListOptionalParams,
  RoutingIntentOperationsDeleteOptionalParams,
  RoutingIntentOperationsCreateOrUpdateOptionalParams,
  RoutingIntentOperationsGetOptionalParams,
} from "../../api/routingIntentOperations/options.js";
import type { RoutingIntent } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RoutingIntentOperations operations. */
export interface RoutingIntentOperationsOperations {
  /** Retrieves the details of all RoutingIntent child resources of the VirtualHub. */
  list: (
    resourceGroupName: string,
    virtualHubName: string,
    options?: RoutingIntentOperationsListOptionalParams,
  ) => PagedAsyncIterableIterator<RoutingIntent>;
  /** Deletes a RoutingIntent. */
  delete: (
    resourceGroupName: string,
    virtualHubName: string,
    routingIntentName: string,
    options?: RoutingIntentOperationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    virtualHubName: string,
    routingIntentName: string,
    options?: RoutingIntentOperationsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    virtualHubName: string,
    routingIntentName: string,
    options?: RoutingIntentOperationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a RoutingIntent resource if it doesn't exist else updates the existing RoutingIntent. */
  createOrUpdate: (
    resourceGroupName: string,
    virtualHubName: string,
    routingIntentName: string,
    routingIntentParameters: RoutingIntent,
    options?: RoutingIntentOperationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<RoutingIntent>, RoutingIntent>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    virtualHubName: string,
    routingIntentName: string,
    routingIntentParameters: RoutingIntent,
    options?: RoutingIntentOperationsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<RoutingIntent>, RoutingIntent>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    virtualHubName: string,
    routingIntentName: string,
    routingIntentParameters: RoutingIntent,
    options?: RoutingIntentOperationsCreateOrUpdateOptionalParams,
  ) => Promise<RoutingIntent>;
  /** Retrieves the details of a RoutingIntent. */
  get: (
    resourceGroupName: string,
    virtualHubName: string,
    routingIntentName: string,
    options?: RoutingIntentOperationsGetOptionalParams,
  ) => Promise<RoutingIntent>;
}

function _getRoutingIntentOperations(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      virtualHubName: string,
      options?: RoutingIntentOperationsListOptionalParams,
    ) => list(context, resourceGroupName, virtualHubName, options),
    delete: (
      resourceGroupName: string,
      virtualHubName: string,
      routingIntentName: string,
      options?: RoutingIntentOperationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, virtualHubName, routingIntentName, options),
    beginDelete: async (
      resourceGroupName: string,
      virtualHubName: string,
      routingIntentName: string,
      options?: RoutingIntentOperationsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        virtualHubName,
        routingIntentName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      virtualHubName: string,
      routingIntentName: string,
      options?: RoutingIntentOperationsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, virtualHubName, routingIntentName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      virtualHubName: string,
      routingIntentName: string,
      routingIntentParameters: RoutingIntent,
      options?: RoutingIntentOperationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        virtualHubName,
        routingIntentName,
        routingIntentParameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      virtualHubName: string,
      routingIntentName: string,
      routingIntentParameters: RoutingIntent,
      options?: RoutingIntentOperationsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        virtualHubName,
        routingIntentName,
        routingIntentParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      virtualHubName: string,
      routingIntentName: string,
      routingIntentParameters: RoutingIntent,
      options?: RoutingIntentOperationsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        virtualHubName,
        routingIntentName,
        routingIntentParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      virtualHubName: string,
      routingIntentName: string,
      options?: RoutingIntentOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, virtualHubName, routingIntentName, options),
  };
}

export function _getRoutingIntentOperationsOperations(
  context: NetworkManagementContext,
): RoutingIntentOperationsOperations {
  return {
    ..._getRoutingIntentOperations(context),
  };
}
