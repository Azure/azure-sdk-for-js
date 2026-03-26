// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/routingIntent/operations.js";
import type {
  RoutingIntentListOptionalParams,
  RoutingIntentDeleteOptionalParams,
  RoutingIntentCreateOrUpdateOptionalParams,
  RoutingIntentGetOptionalParams,
} from "../../api/routingIntent/options.js";
import type { RoutingIntent } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RoutingIntent operations. */
export interface RoutingIntentOperations {
  /** Retrieves the details of all RoutingIntent child resources of the VirtualHub. */
  list: (
    resourceGroupName: string,
    virtualHubName: string,
    options?: RoutingIntentListOptionalParams,
  ) => PagedAsyncIterableIterator<RoutingIntent>;
  /** Deletes a RoutingIntent. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    virtualHubName: string,
    routingIntentName: string,
    options?: RoutingIntentDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    virtualHubName: string,
    routingIntentName: string,
    options?: RoutingIntentDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    virtualHubName: string,
    routingIntentName: string,
    options?: RoutingIntentDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a RoutingIntent resource if it doesn't exist else updates the existing RoutingIntent. */
  createOrUpdate: (
    resourceGroupName: string,
    virtualHubName: string,
    routingIntentName: string,
    routingIntentParameters: RoutingIntent,
    options?: RoutingIntentCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<RoutingIntent>, RoutingIntent>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    virtualHubName: string,
    routingIntentName: string,
    routingIntentParameters: RoutingIntent,
    options?: RoutingIntentCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<RoutingIntent>, RoutingIntent>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    virtualHubName: string,
    routingIntentName: string,
    routingIntentParameters: RoutingIntent,
    options?: RoutingIntentCreateOrUpdateOptionalParams,
  ) => Promise<RoutingIntent>;
  /** Retrieves the details of a RoutingIntent. */
  get: (
    resourceGroupName: string,
    virtualHubName: string,
    routingIntentName: string,
    options?: RoutingIntentGetOptionalParams,
  ) => Promise<RoutingIntent>;
}

function _getRoutingIntent(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      virtualHubName: string,
      options?: RoutingIntentListOptionalParams,
    ) => list(context, resourceGroupName, virtualHubName, options),
    delete: (
      resourceGroupName: string,
      virtualHubName: string,
      routingIntentName: string,
      options?: RoutingIntentDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, virtualHubName, routingIntentName, options),
    beginDelete: async (
      resourceGroupName: string,
      virtualHubName: string,
      routingIntentName: string,
      options?: RoutingIntentDeleteOptionalParams,
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
      options?: RoutingIntentDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, virtualHubName, routingIntentName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      virtualHubName: string,
      routingIntentName: string,
      routingIntentParameters: RoutingIntent,
      options?: RoutingIntentCreateOrUpdateOptionalParams,
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
      options?: RoutingIntentCreateOrUpdateOptionalParams,
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
      options?: RoutingIntentCreateOrUpdateOptionalParams,
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
      options?: RoutingIntentGetOptionalParams,
    ) => get(context, resourceGroupName, virtualHubName, routingIntentName, options),
  };
}

export function _getRoutingIntentOperations(
  context: NetworkManagementContext,
): RoutingIntentOperations {
  return {
    ..._getRoutingIntent(context),
  };
}
