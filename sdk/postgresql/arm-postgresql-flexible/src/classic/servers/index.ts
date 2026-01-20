// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PostgreSQLManagementFlexibleServerContext } from "../../api/postgreSQLManagementFlexibleServerContext.js";
import {
  migrateNetworkMode,
  stop,
  start,
  restart,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/servers/operations.js";
import type {
  ServersMigrateNetworkModeOptionalParams,
  ServersStopOptionalParams,
  ServersStartOptionalParams,
  ServersRestartOptionalParams,
  ServersListBySubscriptionOptionalParams,
  ServersListByResourceGroupOptionalParams,
  ServersDeleteOptionalParams,
  ServersUpdateOptionalParams,
  ServersCreateOrUpdateOptionalParams,
  ServersGetOptionalParams,
} from "../../api/servers/options.js";
import type { Server, ServerForPatch, MigrateNetworkStatus } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Servers operations. */
export interface ServersOperations {
  /** Migrates the network configuration of a PostgreSQL flexible server from customer owned VNET to Microsoft owned VNET with support for private endpoints, or from Microsoft owned VNET with no support for private endpoints to Microsoft owned VNET with support for private endpoints. */
  migrateNetworkMode: (
    resourceGroupName: string,
    serverName: string,
    options?: ServersMigrateNetworkModeOptionalParams,
  ) => PollerLike<OperationState<MigrateNetworkStatus>, MigrateNetworkStatus>;
  /** Stops a server. */
  stop: (
    resourceGroupName: string,
    serverName: string,
    options?: ServersStopOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Starts a stopped server. */
  start: (
    resourceGroupName: string,
    serverName: string,
    options?: ServersStartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Restarts PostgreSQL database engine in a server. */
  restart: (
    resourceGroupName: string,
    serverName: string,
    options?: ServersRestartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Lists all servers in a subscription. */
  listBySubscription: (
    options?: ServersListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Server>;
  /** Lists all servers in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ServersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Server>;
  /** Deletes or drops an existing server. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serverName: string,
    options?: ServersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition. */
  update: (
    resourceGroupName: string,
    serverName: string,
    parameters: ServerForPatch,
    options?: ServersUpdateOptionalParams,
  ) => PollerLike<OperationState<Server>, Server>;
  /** Creates a new server. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    parameters: Server,
    options?: ServersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Server>, Server>;
  /** Gets information about an existing server. */
  get: (
    resourceGroupName: string,
    serverName: string,
    options?: ServersGetOptionalParams,
  ) => Promise<Server>;
}

function _getServers(context: PostgreSQLManagementFlexibleServerContext) {
  return {
    migrateNetworkMode: (
      resourceGroupName: string,
      serverName: string,
      options?: ServersMigrateNetworkModeOptionalParams,
    ) => migrateNetworkMode(context, resourceGroupName, serverName, options),
    stop: (resourceGroupName: string, serverName: string, options?: ServersStopOptionalParams) =>
      stop(context, resourceGroupName, serverName, options),
    start: (resourceGroupName: string, serverName: string, options?: ServersStartOptionalParams) =>
      start(context, resourceGroupName, serverName, options),
    restart: (
      resourceGroupName: string,
      serverName: string,
      options?: ServersRestartOptionalParams,
    ) => restart(context, resourceGroupName, serverName, options),
    listBySubscription: (options?: ServersListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ServersListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      serverName: string,
      options?: ServersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serverName, options),
    update: (
      resourceGroupName: string,
      serverName: string,
      parameters: ServerForPatch,
      options?: ServersUpdateOptionalParams,
    ) => update(context, resourceGroupName, serverName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      parameters: Server,
      options?: ServersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serverName, parameters, options),
    get: (resourceGroupName: string, serverName: string, options?: ServersGetOptionalParams) =>
      get(context, resourceGroupName, serverName, options),
  };
}

export function _getServersOperations(
  context: PostgreSQLManagementFlexibleServerContext,
): ServersOperations {
  return {
    ..._getServers(context),
  };
}
