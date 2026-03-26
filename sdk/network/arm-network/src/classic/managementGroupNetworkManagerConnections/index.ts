// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/managementGroupNetworkManagerConnections/operations.js";
import type {
  ManagementGroupNetworkManagerConnectionsListOptionalParams,
  ManagementGroupNetworkManagerConnectionsDeleteOptionalParams,
  ManagementGroupNetworkManagerConnectionsCreateOrUpdateOptionalParams,
  ManagementGroupNetworkManagerConnectionsGetOptionalParams,
} from "../../api/managementGroupNetworkManagerConnections/options.js";
import type { NetworkManagerConnection } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ManagementGroupNetworkManagerConnections operations. */
export interface ManagementGroupNetworkManagerConnectionsOperations {
  /** List all network manager connections created by this management group. */
  list: (
    managementGroupId: string,
    options?: ManagementGroupNetworkManagerConnectionsListOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkManagerConnection>;
  /** Delete specified pending connection created by this management group. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    managementGroupId: string,
    networkManagerConnectionName: string,
    options?: ManagementGroupNetworkManagerConnectionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a network manager connection on this management group. */
  createOrUpdate: (
    managementGroupId: string,
    networkManagerConnectionName: string,
    parameters: NetworkManagerConnection,
    options?: ManagementGroupNetworkManagerConnectionsCreateOrUpdateOptionalParams,
  ) => Promise<NetworkManagerConnection>;
  /** Get a specified connection created by this management group. */
  get: (
    managementGroupId: string,
    networkManagerConnectionName: string,
    options?: ManagementGroupNetworkManagerConnectionsGetOptionalParams,
  ) => Promise<NetworkManagerConnection>;
}

function _getManagementGroupNetworkManagerConnections(context: NetworkManagementContext) {
  return {
    list: (
      managementGroupId: string,
      options?: ManagementGroupNetworkManagerConnectionsListOptionalParams,
    ) => list(context, managementGroupId, options),
    delete: (
      managementGroupId: string,
      networkManagerConnectionName: string,
      options?: ManagementGroupNetworkManagerConnectionsDeleteOptionalParams,
    ) => $delete(context, managementGroupId, networkManagerConnectionName, options),
    createOrUpdate: (
      managementGroupId: string,
      networkManagerConnectionName: string,
      parameters: NetworkManagerConnection,
      options?: ManagementGroupNetworkManagerConnectionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, managementGroupId, networkManagerConnectionName, parameters, options),
    get: (
      managementGroupId: string,
      networkManagerConnectionName: string,
      options?: ManagementGroupNetworkManagerConnectionsGetOptionalParams,
    ) => get(context, managementGroupId, networkManagerConnectionName, options),
  };
}

export function _getManagementGroupNetworkManagerConnectionsOperations(
  context: NetworkManagementContext,
): ManagementGroupNetworkManagerConnectionsOperations {
  return {
    ..._getManagementGroupNetworkManagerConnections(context),
  };
}
