// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/subscriptionNetworkManagerConnections/operations.js";
import type {
  SubscriptionNetworkManagerConnectionsListOptionalParams,
  SubscriptionNetworkManagerConnectionsDeleteOptionalParams,
  SubscriptionNetworkManagerConnectionsCreateOrUpdateOptionalParams,
  SubscriptionNetworkManagerConnectionsGetOptionalParams,
} from "../../api/subscriptionNetworkManagerConnections/options.js";
import type { NetworkManagerConnection } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SubscriptionNetworkManagerConnections operations. */
export interface SubscriptionNetworkManagerConnectionsOperations {
  /** List all network manager connections created by this subscription. */
  list: (
    options?: SubscriptionNetworkManagerConnectionsListOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkManagerConnection>;
  /** Delete specified connection created by this subscription. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    networkManagerConnectionName: string,
    options?: SubscriptionNetworkManagerConnectionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a network manager connection on this subscription. */
  createOrUpdate: (
    networkManagerConnectionName: string,
    parameters: NetworkManagerConnection,
    options?: SubscriptionNetworkManagerConnectionsCreateOrUpdateOptionalParams,
  ) => Promise<NetworkManagerConnection>;
  /** Get a specified connection created by this subscription. */
  get: (
    networkManagerConnectionName: string,
    options?: SubscriptionNetworkManagerConnectionsGetOptionalParams,
  ) => Promise<NetworkManagerConnection>;
}

function _getSubscriptionNetworkManagerConnections(context: NetworkManagementContext) {
  return {
    list: (options?: SubscriptionNetworkManagerConnectionsListOptionalParams) =>
      list(context, options),
    delete: (
      networkManagerConnectionName: string,
      options?: SubscriptionNetworkManagerConnectionsDeleteOptionalParams,
    ) => $delete(context, networkManagerConnectionName, options),
    createOrUpdate: (
      networkManagerConnectionName: string,
      parameters: NetworkManagerConnection,
      options?: SubscriptionNetworkManagerConnectionsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, networkManagerConnectionName, parameters, options),
    get: (
      networkManagerConnectionName: string,
      options?: SubscriptionNetworkManagerConnectionsGetOptionalParams,
    ) => get(context, networkManagerConnectionName, options),
  };
}

export function _getSubscriptionNetworkManagerConnectionsOperations(
  context: NetworkManagementContext,
): SubscriptionNetworkManagerConnectionsOperations {
  return {
    ..._getSubscriptionNetworkManagerConnections(context),
  };
}
