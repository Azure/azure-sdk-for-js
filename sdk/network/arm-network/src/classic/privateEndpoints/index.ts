// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  listBySubscription,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/privateEndpoints/operations.js";
import type {
  PrivateEndpointsListBySubscriptionOptionalParams,
  PrivateEndpointsListOptionalParams,
  PrivateEndpointsDeleteOptionalParams,
  PrivateEndpointsCreateOrUpdateOptionalParams,
  PrivateEndpointsGetOptionalParams,
} from "../../api/privateEndpoints/options.js";
import type { PrivateEndpoint } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PrivateEndpoints operations. */
export interface PrivateEndpointsOperations {
  /** Gets all private endpoints in a subscription. */
  listBySubscription: (
    options?: PrivateEndpointsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateEndpoint>;
  /** Gets all private endpoints in a resource group. */
  list: (
    resourceGroupName: string,
    options?: PrivateEndpointsListOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateEndpoint>;
  /** Deletes the specified private endpoint. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    privateEndpointName: string,
    options?: PrivateEndpointsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    privateEndpointName: string,
    options?: PrivateEndpointsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    privateEndpointName: string,
    options?: PrivateEndpointsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an private endpoint in the specified resource group. */
  createOrUpdate: (
    resourceGroupName: string,
    privateEndpointName: string,
    parameters: PrivateEndpoint,
    options?: PrivateEndpointsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<PrivateEndpoint>, PrivateEndpoint>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    privateEndpointName: string,
    parameters: PrivateEndpoint,
    options?: PrivateEndpointsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<PrivateEndpoint>, PrivateEndpoint>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    privateEndpointName: string,
    parameters: PrivateEndpoint,
    options?: PrivateEndpointsCreateOrUpdateOptionalParams,
  ) => Promise<PrivateEndpoint>;
  /** Gets the specified private endpoint by resource group. */
  get: (
    resourceGroupName: string,
    privateEndpointName: string,
    options?: PrivateEndpointsGetOptionalParams,
  ) => Promise<PrivateEndpoint>;
}

function _getPrivateEndpoints(context: NetworkManagementContext) {
  return {
    listBySubscription: (options?: PrivateEndpointsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    list: (resourceGroupName: string, options?: PrivateEndpointsListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      privateEndpointName: string,
      options?: PrivateEndpointsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, privateEndpointName, options),
    beginDelete: async (
      resourceGroupName: string,
      privateEndpointName: string,
      options?: PrivateEndpointsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, privateEndpointName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      privateEndpointName: string,
      options?: PrivateEndpointsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, privateEndpointName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      privateEndpointName: string,
      parameters: PrivateEndpoint,
      options?: PrivateEndpointsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, privateEndpointName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      privateEndpointName: string,
      parameters: PrivateEndpoint,
      options?: PrivateEndpointsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        privateEndpointName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      privateEndpointName: string,
      parameters: PrivateEndpoint,
      options?: PrivateEndpointsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        privateEndpointName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      privateEndpointName: string,
      options?: PrivateEndpointsGetOptionalParams,
    ) => get(context, resourceGroupName, privateEndpointName, options),
  };
}

export function _getPrivateEndpointsOperations(
  context: NetworkManagementContext,
): PrivateEndpointsOperations {
  return {
    ..._getPrivateEndpoints(context),
  };
}
