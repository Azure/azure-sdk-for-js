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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Servers operations. */
export interface ServersOperations {
  /** Migrates the network configuration of a PostgreSQL flexible server from customer owned VNET to Microsoft owned VNET with support for private endpoints, or from Microsoft owned VNET with no support for private endpoints to Microsoft owned VNET with support for private endpoints. */
  migrateNetworkMode: (
    resourceGroupName: string,
    serverName: string,
    options?: ServersMigrateNetworkModeOptionalParams,
  ) => PollerLike<OperationState<MigrateNetworkStatus>, MigrateNetworkStatus>;
  /** @deprecated use migrateNetworkMode instead */
  beginMigrateNetworkMode: (
    resourceGroupName: string,
    serverName: string,
    options?: ServersMigrateNetworkModeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<MigrateNetworkStatus>, MigrateNetworkStatus>>;
  /** @deprecated use migrateNetworkMode instead */
  beginMigrateNetworkModeAndWait: (
    resourceGroupName: string,
    serverName: string,
    options?: ServersMigrateNetworkModeOptionalParams,
  ) => Promise<MigrateNetworkStatus>;
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
  /** Starts a stopped server. */
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
  /** Restarts PostgreSQL database engine in a server. */
  restart: (
    resourceGroupName: string,
    serverName: string,
    options?: ServersRestartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use restart instead */
  beginRestart: (
    resourceGroupName: string,
    serverName: string,
    options?: ServersRestartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use restart instead */
  beginRestartAndWait: (
    resourceGroupName: string,
    serverName: string,
    options?: ServersRestartOptionalParams,
  ) => Promise<void>;
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
  /** Updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition. */
  update: (
    resourceGroupName: string,
    serverName: string,
    parameters: ServerForPatch,
    options?: ServersUpdateOptionalParams,
  ) => PollerLike<OperationState<Server>, Server>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    serverName: string,
    parameters: ServerForPatch,
    options?: ServersUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Server>, Server>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    parameters: ServerForPatch,
    options?: ServersUpdateOptionalParams,
  ) => Promise<Server>;
  /** Creates a new server. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    parameters: Server,
    options?: ServersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Server>, Server>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    parameters: Server,
    options?: ServersCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Server>, Server>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    parameters: Server,
    options?: ServersCreateOrUpdateOptionalParams,
  ) => Promise<Server>;
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
    beginMigrateNetworkMode: async (
      resourceGroupName: string,
      serverName: string,
      options?: ServersMigrateNetworkModeOptionalParams,
    ) => {
      const poller = migrateNetworkMode(context, resourceGroupName, serverName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginMigrateNetworkModeAndWait: async (
      resourceGroupName: string,
      serverName: string,
      options?: ServersMigrateNetworkModeOptionalParams,
    ) => {
      return await migrateNetworkMode(context, resourceGroupName, serverName, options);
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
      options?: ServersRestartOptionalParams,
    ) => restart(context, resourceGroupName, serverName, options),
    beginRestart: async (
      resourceGroupName: string,
      serverName: string,
      options?: ServersRestartOptionalParams,
    ) => {
      const poller = restart(context, resourceGroupName, serverName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRestartAndWait: async (
      resourceGroupName: string,
      serverName: string,
      options?: ServersRestartOptionalParams,
    ) => {
      return await restart(context, resourceGroupName, serverName, options);
    },
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
      parameters: ServerForPatch,
      options?: ServersUpdateOptionalParams,
    ) => update(context, resourceGroupName, serverName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      serverName: string,
      parameters: ServerForPatch,
      options?: ServersUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, serverName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      parameters: ServerForPatch,
      options?: ServersUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, serverName, parameters, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      parameters: Server,
      options?: ServersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serverName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      serverName: string,
      parameters: Server,
      options?: ServersCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, serverName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      parameters: Server,
      options?: ServersCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, serverName, parameters, options);
    },
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
