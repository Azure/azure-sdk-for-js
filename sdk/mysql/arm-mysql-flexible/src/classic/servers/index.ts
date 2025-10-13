// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MySQLManagementFlexibleServerContext } from "../../api/mySQLManagementFlexibleServerContext.js";
import {
  detachVNet,
  resetGtid,
  stop,
  start,
  restart,
  validateEstimateHighAvailability,
  failover,
  list,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/servers/operations.js";
import type {
  ServersDetachVNetOptionalParams,
  ServersResetGtidOptionalParams,
  ServersStopOptionalParams,
  ServersStartOptionalParams,
  ServersRestartOptionalParams,
  ServersValidateEstimateHighAvailabilityOptionalParams,
  ServersFailoverOptionalParams,
  ServersListOptionalParams,
  ServersListByResourceGroupOptionalParams,
  ServersDeleteOptionalParams,
  ServersUpdateOptionalParams,
  ServersCreateOptionalParams,
  ServersGetOptionalParams,
} from "../../api/servers/options.js";
import type {
  Server,
  ServerForUpdate,
  HighAvailabilityValidationEstimation,
  ServerRestartParameter,
  ServerGtidSetParameter,
  ServerDetachVNetParameter,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Servers operations. */
export interface ServersOperations {
  /** Detach VNet on a server. */
  detachVNet: (
    resourceGroupName: string,
    serverName: string,
    parameters: ServerDetachVNetParameter,
    options?: ServersDetachVNetOptionalParams,
  ) => PollerLike<OperationState<Server>, Server>;
  /** Resets GTID on a server. */
  resetGtid: (
    resourceGroupName: string,
    serverName: string,
    parameters: ServerGtidSetParameter,
    options?: ServersResetGtidOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Stops a server. */
  stop: (
    resourceGroupName: string,
    serverName: string,
    options?: ServersStopOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Starts a server. */
  start: (
    resourceGroupName: string,
    serverName: string,
    options?: ServersStartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Restarts a server. */
  restart: (
    resourceGroupName: string,
    serverName: string,
    parameters: ServerRestartParameter,
    options?: ServersRestartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Validate a deployment of high availability. */
  validateEstimateHighAvailability: (
    resourceGroupName: string,
    serverName: string,
    parameters: HighAvailabilityValidationEstimation,
    options?: ServersValidateEstimateHighAvailabilityOptionalParams,
  ) => Promise<HighAvailabilityValidationEstimation>;
  /** Manual failover a server. */
  failover: (
    resourceGroupName: string,
    serverName: string,
    options?: ServersFailoverOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List all the servers in a given subscription. */
  list: (options?: ServersListOptionalParams) => PagedAsyncIterableIterator<Server>;
  /** List all the servers in a given resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ServersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Server>;
  /** Deletes a server. */
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
  /** Updates an existing server. The request body can contain one to many of the properties present in the normal server definition. */
  update: (
    resourceGroupName: string,
    serverName: string,
    parameters: ServerForUpdate,
    options?: ServersUpdateOptionalParams,
  ) => PollerLike<OperationState<Server>, Server>;
  /** Creates a new server or updates an existing server. The update action will overwrite the existing server. */
  create: (
    resourceGroupName: string,
    serverName: string,
    parameters: Server,
    options?: ServersCreateOptionalParams,
  ) => PollerLike<OperationState<Server>, Server>;
  /** Gets information about a server. */
  get: (
    resourceGroupName: string,
    serverName: string,
    options?: ServersGetOptionalParams,
  ) => Promise<Server>;
}

function _getServers(context: MySQLManagementFlexibleServerContext) {
  return {
    detachVNet: (
      resourceGroupName: string,
      serverName: string,
      parameters: ServerDetachVNetParameter,
      options?: ServersDetachVNetOptionalParams,
    ) => detachVNet(context, resourceGroupName, serverName, parameters, options),
    resetGtid: (
      resourceGroupName: string,
      serverName: string,
      parameters: ServerGtidSetParameter,
      options?: ServersResetGtidOptionalParams,
    ) => resetGtid(context, resourceGroupName, serverName, parameters, options),
    stop: (resourceGroupName: string, serverName: string, options?: ServersStopOptionalParams) =>
      stop(context, resourceGroupName, serverName, options),
    start: (resourceGroupName: string, serverName: string, options?: ServersStartOptionalParams) =>
      start(context, resourceGroupName, serverName, options),
    restart: (
      resourceGroupName: string,
      serverName: string,
      parameters: ServerRestartParameter,
      options?: ServersRestartOptionalParams,
    ) => restart(context, resourceGroupName, serverName, parameters, options),
    validateEstimateHighAvailability: (
      resourceGroupName: string,
      serverName: string,
      parameters: HighAvailabilityValidationEstimation,
      options?: ServersValidateEstimateHighAvailabilityOptionalParams,
    ) =>
      validateEstimateHighAvailability(context, resourceGroupName, serverName, parameters, options),
    failover: (
      resourceGroupName: string,
      serverName: string,
      options?: ServersFailoverOptionalParams,
    ) => failover(context, resourceGroupName, serverName, options),
    list: (options?: ServersListOptionalParams) => list(context, options),
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
      parameters: ServerForUpdate,
      options?: ServersUpdateOptionalParams,
    ) => update(context, resourceGroupName, serverName, parameters, options),
    create: (
      resourceGroupName: string,
      serverName: string,
      parameters: Server,
      options?: ServersCreateOptionalParams,
    ) => create(context, resourceGroupName, serverName, parameters, options),
    get: (resourceGroupName: string, serverName: string, options?: ServersGetOptionalParams) =>
      get(context, resourceGroupName, serverName, options),
  };
}

export function _getServersOperations(
  context: MySQLManagementFlexibleServerContext,
): ServersOperations {
  return {
    ..._getServers(context),
  };
}
