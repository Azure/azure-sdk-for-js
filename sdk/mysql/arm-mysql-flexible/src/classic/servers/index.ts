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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use detachVNet instead */
  beginDetachVNet: (
    resourceGroupName: string,
    serverName: string,
    parameters: ServerDetachVNetParameter,
    options?: ServersDetachVNetOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Server>, Server>>;
  /** @deprecated use detachVNet instead */
  beginDetachVNetAndWait: (
    resourceGroupName: string,
    serverName: string,
    parameters: ServerDetachVNetParameter,
    options?: ServersDetachVNetOptionalParams,
  ) => Promise<Server>;
  /** Resets GTID on a server. */
  resetGtid: (
    resourceGroupName: string,
    serverName: string,
    parameters: ServerGtidSetParameter,
    options?: ServersResetGtidOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use resetGtid instead */
  beginResetGtid: (
    resourceGroupName: string,
    serverName: string,
    parameters: ServerGtidSetParameter,
    options?: ServersResetGtidOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use resetGtid instead */
  beginResetGtidAndWait: (
    resourceGroupName: string,
    serverName: string,
    parameters: ServerGtidSetParameter,
    options?: ServersResetGtidOptionalParams,
  ) => Promise<void>;
  /** Stops a server. */
  stop: (
    resourceGroupName: string,
    serverName: string,
    options?: ServersStopOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use stop instead */
  beginStop: (
    resourceGroupName: string,
    serverName: string,
    options?: ServersStopOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use stop instead */
  beginStopAndWait: (
    resourceGroupName: string,
    serverName: string,
    options?: ServersStopOptionalParams,
  ) => Promise<void>;
  /** Starts a server. */
  start: (
    resourceGroupName: string,
    serverName: string,
    options?: ServersStartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use start instead */
  beginStart: (
    resourceGroupName: string,
    serverName: string,
    options?: ServersStartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use start instead */
  beginStartAndWait: (
    resourceGroupName: string,
    serverName: string,
    options?: ServersStartOptionalParams,
  ) => Promise<void>;
  /** Restarts a server. */
  restart: (
    resourceGroupName: string,
    serverName: string,
    parameters: ServerRestartParameter,
    options?: ServersRestartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use restart instead */
  beginRestart: (
    resourceGroupName: string,
    serverName: string,
    parameters: ServerRestartParameter,
    options?: ServersRestartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use restart instead */
  beginRestartAndWait: (
    resourceGroupName: string,
    serverName: string,
    parameters: ServerRestartParameter,
    options?: ServersRestartOptionalParams,
  ) => Promise<void>;
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
  /** @deprecated use failover instead */
  beginFailover: (
    resourceGroupName: string,
    serverName: string,
    options?: ServersFailoverOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use failover instead */
  beginFailoverAndWait: (
    resourceGroupName: string,
    serverName: string,
    options?: ServersFailoverOptionalParams,
  ) => Promise<void>;
  /** List all the servers in a given subscription. */
  list: (options?: ServersListOptionalParams) => PagedAsyncIterableIterator<Server>;
  /** List all the servers in a given resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ServersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Server>;
  /** Deletes a server. */
  delete: (
    resourceGroupName: string,
    serverName: string,
    options?: ServersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    serverName: string,
    options?: ServersDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    serverName: string,
    options?: ServersDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an existing server. The request body can contain one to many of the properties present in the normal server definition. */
  update: (
    resourceGroupName: string,
    serverName: string,
    parameters: ServerForUpdate,
    options?: ServersUpdateOptionalParams,
  ) => PollerLike<OperationState<Server>, Server>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    serverName: string,
    parameters: ServerForUpdate,
    options?: ServersUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Server>, Server>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    parameters: ServerForUpdate,
    options?: ServersUpdateOptionalParams,
  ) => Promise<Server>;
  /** Creates a new server or updates an existing server. The update action will overwrite the existing server. */
  create: (
    resourceGroupName: string,
    serverName: string,
    parameters: Server,
    options?: ServersCreateOptionalParams,
  ) => PollerLike<OperationState<Server>, Server>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    serverName: string,
    parameters: Server,
    options?: ServersCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Server>, Server>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    serverName: string,
    parameters: Server,
    options?: ServersCreateOptionalParams,
  ) => Promise<Server>;
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
    beginDetachVNet: async (
      resourceGroupName: string,
      serverName: string,
      parameters: ServerDetachVNetParameter,
      options?: ServersDetachVNetOptionalParams,
    ) => {
      const poller = detachVNet(context, resourceGroupName, serverName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDetachVNetAndWait: async (
      resourceGroupName: string,
      serverName: string,
      parameters: ServerDetachVNetParameter,
      options?: ServersDetachVNetOptionalParams,
    ) => {
      return await detachVNet(context, resourceGroupName, serverName, parameters, options);
    },
    resetGtid: (
      resourceGroupName: string,
      serverName: string,
      parameters: ServerGtidSetParameter,
      options?: ServersResetGtidOptionalParams,
    ) => resetGtid(context, resourceGroupName, serverName, parameters, options),
    beginResetGtid: async (
      resourceGroupName: string,
      serverName: string,
      parameters: ServerGtidSetParameter,
      options?: ServersResetGtidOptionalParams,
    ) => {
      const poller = resetGtid(context, resourceGroupName, serverName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginResetGtidAndWait: async (
      resourceGroupName: string,
      serverName: string,
      parameters: ServerGtidSetParameter,
      options?: ServersResetGtidOptionalParams,
    ) => {
      return await resetGtid(context, resourceGroupName, serverName, parameters, options);
    },
    stop: (resourceGroupName: string, serverName: string, options?: ServersStopOptionalParams) =>
      stop(context, resourceGroupName, serverName, options),
    beginStop: async (
      resourceGroupName: string,
      serverName: string,
      options?: ServersStopOptionalParams,
    ) => {
      const poller = stop(context, resourceGroupName, serverName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStopAndWait: async (
      resourceGroupName: string,
      serverName: string,
      options?: ServersStopOptionalParams,
    ) => {
      return await stop(context, resourceGroupName, serverName, options);
    },
    start: (resourceGroupName: string, serverName: string, options?: ServersStartOptionalParams) =>
      start(context, resourceGroupName, serverName, options),
    beginStart: async (
      resourceGroupName: string,
      serverName: string,
      options?: ServersStartOptionalParams,
    ) => {
      const poller = start(context, resourceGroupName, serverName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStartAndWait: async (
      resourceGroupName: string,
      serverName: string,
      options?: ServersStartOptionalParams,
    ) => {
      return await start(context, resourceGroupName, serverName, options);
    },
    restart: (
      resourceGroupName: string,
      serverName: string,
      parameters: ServerRestartParameter,
      options?: ServersRestartOptionalParams,
    ) => restart(context, resourceGroupName, serverName, parameters, options),
    beginRestart: async (
      resourceGroupName: string,
      serverName: string,
      parameters: ServerRestartParameter,
      options?: ServersRestartOptionalParams,
    ) => {
      const poller = restart(context, resourceGroupName, serverName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRestartAndWait: async (
      resourceGroupName: string,
      serverName: string,
      parameters: ServerRestartParameter,
      options?: ServersRestartOptionalParams,
    ) => {
      return await restart(context, resourceGroupName, serverName, parameters, options);
    },
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
    beginFailover: async (
      resourceGroupName: string,
      serverName: string,
      options?: ServersFailoverOptionalParams,
    ) => {
      const poller = failover(context, resourceGroupName, serverName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginFailoverAndWait: async (
      resourceGroupName: string,
      serverName: string,
      options?: ServersFailoverOptionalParams,
    ) => {
      return await failover(context, resourceGroupName, serverName, options);
    },
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
    beginDelete: async (
      resourceGroupName: string,
      serverName: string,
      options?: ServersDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, serverName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      serverName: string,
      options?: ServersDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, serverName, options);
    },
    update: (
      resourceGroupName: string,
      serverName: string,
      parameters: ServerForUpdate,
      options?: ServersUpdateOptionalParams,
    ) => update(context, resourceGroupName, serverName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      serverName: string,
      parameters: ServerForUpdate,
      options?: ServersUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, serverName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      parameters: ServerForUpdate,
      options?: ServersUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, serverName, parameters, options);
    },
    create: (
      resourceGroupName: string,
      serverName: string,
      parameters: Server,
      options?: ServersCreateOptionalParams,
    ) => create(context, resourceGroupName, serverName, parameters, options),
    beginCreate: async (
      resourceGroupName: string,
      serverName: string,
      parameters: Server,
      options?: ServersCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, serverName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      parameters: Server,
      options?: ServersCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, serverName, parameters, options);
    },
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
