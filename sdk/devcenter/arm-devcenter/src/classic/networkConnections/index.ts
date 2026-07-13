// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext } from "../../api/devCenterContext.js";
import {
  listHealthDetails,
  getHealthDetails,
  listOutboundNetworkDependenciesEndpoints,
  runHealthChecks,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/networkConnections/operations.js";
import type {
  NetworkConnectionsListHealthDetailsOptionalParams,
  NetworkConnectionsGetHealthDetailsOptionalParams,
  NetworkConnectionsListOutboundNetworkDependenciesEndpointsOptionalParams,
  NetworkConnectionsRunHealthChecksOptionalParams,
  NetworkConnectionsListBySubscriptionOptionalParams,
  NetworkConnectionsListByResourceGroupOptionalParams,
  NetworkConnectionsDeleteOptionalParams,
  NetworkConnectionsUpdateOptionalParams,
  NetworkConnectionsCreateOrUpdateOptionalParams,
  NetworkConnectionsGetOptionalParams,
} from "../../api/networkConnections/options.js";
import type {
  NetworkConnection,
  NetworkConnectionUpdate,
  OutboundEnvironmentEndpoint,
  HealthCheckStatusDetails,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkConnections operations. */
export interface NetworkConnectionsOperations {
  /** Lists health check status details. */
  listHealthDetails: (
    resourceGroupName: string,
    networkConnectionName: string,
    options?: NetworkConnectionsListHealthDetailsOptionalParams,
  ) => PagedAsyncIterableIterator<HealthCheckStatusDetails>;
  /** Gets health check status details. */
  getHealthDetails: (
    resourceGroupName: string,
    networkConnectionName: string,
    options?: NetworkConnectionsGetHealthDetailsOptionalParams,
  ) => Promise<HealthCheckStatusDetails>;
  /** Lists the endpoints that agents may call as part of Dev Box service administration. These FQDNs should be allowed for outbound access in order for the Dev Box service to function. */
  listOutboundNetworkDependenciesEndpoints: (
    resourceGroupName: string,
    networkConnectionName: string,
    options?: NetworkConnectionsListOutboundNetworkDependenciesEndpointsOptionalParams,
  ) => PagedAsyncIterableIterator<OutboundEnvironmentEndpoint>;
  /** Triggers a new health check run. The execution and health check result can be tracked via the network Connection health check details. */
  runHealthChecks: (
    resourceGroupName: string,
    networkConnectionName: string,
    options?: NetworkConnectionsRunHealthChecksOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use runHealthChecks instead */
  beginRunHealthChecks: (
    resourceGroupName: string,
    networkConnectionName: string,
    options?: NetworkConnectionsRunHealthChecksOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use runHealthChecks instead */
  beginRunHealthChecksAndWait: (
    resourceGroupName: string,
    networkConnectionName: string,
    options?: NetworkConnectionsRunHealthChecksOptionalParams,
  ) => Promise<void>;
  /** Lists network connections in a subscription. */
  listBySubscription: (
    options?: NetworkConnectionsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkConnection>;
  /** Lists network connections in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: NetworkConnectionsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkConnection>;
  /** Deletes a Network Connections resource. */
  delete: (
    resourceGroupName: string,
    networkConnectionName: string,
    options?: NetworkConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    networkConnectionName: string,
    options?: NetworkConnectionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    networkConnectionName: string,
    options?: NetworkConnectionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Partially updates a Network Connection. */
  update: (
    resourceGroupName: string,
    networkConnectionName: string,
    body: NetworkConnectionUpdate,
    options?: NetworkConnectionsUpdateOptionalParams,
  ) => PollerLike<OperationState<NetworkConnection>, NetworkConnection>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    networkConnectionName: string,
    body: NetworkConnectionUpdate,
    options?: NetworkConnectionsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NetworkConnection>, NetworkConnection>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    networkConnectionName: string,
    body: NetworkConnectionUpdate,
    options?: NetworkConnectionsUpdateOptionalParams,
  ) => Promise<NetworkConnection>;
  /** Creates or updates a Network Connections resource. */
  createOrUpdate: (
    resourceGroupName: string,
    networkConnectionName: string,
    body: NetworkConnection,
    options?: NetworkConnectionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<NetworkConnection>, NetworkConnection>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    networkConnectionName: string,
    body: NetworkConnection,
    options?: NetworkConnectionsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NetworkConnection>, NetworkConnection>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    networkConnectionName: string,
    body: NetworkConnection,
    options?: NetworkConnectionsCreateOrUpdateOptionalParams,
  ) => Promise<NetworkConnection>;
  /** Gets a network connection resource. */
  get: (
    resourceGroupName: string,
    networkConnectionName: string,
    options?: NetworkConnectionsGetOptionalParams,
  ) => Promise<NetworkConnection>;
}

function _getNetworkConnections(context: DevCenterContext) {
  return {
    listHealthDetails: (
      resourceGroupName: string,
      networkConnectionName: string,
      options?: NetworkConnectionsListHealthDetailsOptionalParams,
    ) => listHealthDetails(context, resourceGroupName, networkConnectionName, options),
    getHealthDetails: (
      resourceGroupName: string,
      networkConnectionName: string,
      options?: NetworkConnectionsGetHealthDetailsOptionalParams,
    ) => getHealthDetails(context, resourceGroupName, networkConnectionName, options),
    listOutboundNetworkDependenciesEndpoints: (
      resourceGroupName: string,
      networkConnectionName: string,
      options?: NetworkConnectionsListOutboundNetworkDependenciesEndpointsOptionalParams,
    ) =>
      listOutboundNetworkDependenciesEndpoints(
        context,
        resourceGroupName,
        networkConnectionName,
        options,
      ),
    runHealthChecks: (
      resourceGroupName: string,
      networkConnectionName: string,
      options?: NetworkConnectionsRunHealthChecksOptionalParams,
    ) => runHealthChecks(context, resourceGroupName, networkConnectionName, options),
    beginRunHealthChecks: async (
      resourceGroupName: string,
      networkConnectionName: string,
      options?: NetworkConnectionsRunHealthChecksOptionalParams,
    ) => {
      const poller = runHealthChecks(context, resourceGroupName, networkConnectionName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRunHealthChecksAndWait: async (
      resourceGroupName: string,
      networkConnectionName: string,
      options?: NetworkConnectionsRunHealthChecksOptionalParams,
    ) => {
      return await runHealthChecks(context, resourceGroupName, networkConnectionName, options);
    },
    listBySubscription: (options?: NetworkConnectionsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: NetworkConnectionsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      networkConnectionName: string,
      options?: NetworkConnectionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, networkConnectionName, options),
    beginDelete: async (
      resourceGroupName: string,
      networkConnectionName: string,
      options?: NetworkConnectionsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, networkConnectionName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      networkConnectionName: string,
      options?: NetworkConnectionsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, networkConnectionName, options);
    },
    update: (
      resourceGroupName: string,
      networkConnectionName: string,
      body: NetworkConnectionUpdate,
      options?: NetworkConnectionsUpdateOptionalParams,
    ) => update(context, resourceGroupName, networkConnectionName, body, options),
    beginUpdate: async (
      resourceGroupName: string,
      networkConnectionName: string,
      body: NetworkConnectionUpdate,
      options?: NetworkConnectionsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, networkConnectionName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      networkConnectionName: string,
      body: NetworkConnectionUpdate,
      options?: NetworkConnectionsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, networkConnectionName, body, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      networkConnectionName: string,
      body: NetworkConnection,
      options?: NetworkConnectionsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, networkConnectionName, body, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      networkConnectionName: string,
      body: NetworkConnection,
      options?: NetworkConnectionsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        networkConnectionName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      networkConnectionName: string,
      body: NetworkConnection,
      options?: NetworkConnectionsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, networkConnectionName, body, options);
    },
    get: (
      resourceGroupName: string,
      networkConnectionName: string,
      options?: NetworkConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, networkConnectionName, options),
  };
}

export function _getNetworkConnectionsOperations(
  context: DevCenterContext,
): NetworkConnectionsOperations {
  return {
    ..._getNetworkConnections(context),
  };
}
