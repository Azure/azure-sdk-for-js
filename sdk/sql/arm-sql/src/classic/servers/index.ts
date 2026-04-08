// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import {
  checkNameAvailability,
  refreshStatus,
  importDatabase,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/servers/operations.js";
import type {
  ServersCheckNameAvailabilityOptionalParams,
  ServersRefreshStatusOptionalParams,
  ServersImportDatabaseOptionalParams,
  ServersListOptionalParams,
  ServersListByResourceGroupOptionalParams,
  ServersDeleteOptionalParams,
  ServersUpdateOptionalParams,
  ServersCreateOrUpdateOptionalParams,
  ServersGetOptionalParams,
} from "../../api/servers/options.js";
import type {
  ImportExportOperationResult,
  Server,
  ServerUpdate,
  ImportNewDatabaseDefinition,
  RefreshExternalGovernanceStatusOperationResult,
  CheckNameAvailabilityRequest,
  CheckNameAvailabilityResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Servers operations. */
export interface ServersOperations {
  /** Determines whether a resource can be created with the specified name. */
  checkNameAvailability: (
    parameters: CheckNameAvailabilityRequest,
    options?: ServersCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckNameAvailabilityResponse>;
  /** Refresh external governance enablement status. */
  refreshStatus: (
    resourceGroupName: string,
    serverName: string,
    options?: ServersRefreshStatusOptionalParams,
  ) => PollerLike<
    OperationState<RefreshExternalGovernanceStatusOperationResult>,
    RefreshExternalGovernanceStatusOperationResult
  >;
  /** @deprecated use refreshStatus instead */
  beginRefreshStatus: (
    resourceGroupName: string,
    serverName: string,
    options?: ServersRefreshStatusOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<RefreshExternalGovernanceStatusOperationResult>,
      RefreshExternalGovernanceStatusOperationResult
    >
  >;
  /** @deprecated use refreshStatus instead */
  beginRefreshStatusAndWait: (
    resourceGroupName: string,
    serverName: string,
    options?: ServersRefreshStatusOptionalParams,
  ) => Promise<RefreshExternalGovernanceStatusOperationResult>;
  /** Imports a bacpac into a new database. */
  importDatabase: (
    resourceGroupName: string,
    serverName: string,
    parameters: ImportNewDatabaseDefinition,
    options?: ServersImportDatabaseOptionalParams,
  ) => PollerLike<OperationState<ImportExportOperationResult>, ImportExportOperationResult>;
  /** @deprecated use importDatabase instead */
  beginImportDatabase: (
    resourceGroupName: string,
    serverName: string,
    parameters: ImportNewDatabaseDefinition,
    options?: ServersImportDatabaseOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ImportExportOperationResult>, ImportExportOperationResult>
  >;
  /** @deprecated use importDatabase instead */
  beginImportDatabaseAndWait: (
    resourceGroupName: string,
    serverName: string,
    parameters: ImportNewDatabaseDefinition,
    options?: ServersImportDatabaseOptionalParams,
  ) => Promise<ImportExportOperationResult>;
  /** Gets a list of all servers in the subscription. */
  list: (options?: ServersListOptionalParams) => PagedAsyncIterableIterator<Server>;
  /** Gets a list of servers in a resource groups. */
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
  /** Updates a server. */
  update: (
    resourceGroupName: string,
    serverName: string,
    parameters: ServerUpdate,
    options?: ServersUpdateOptionalParams,
  ) => PollerLike<OperationState<Server>, Server>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    serverName: string,
    parameters: ServerUpdate,
    options?: ServersUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Server>, Server>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    parameters: ServerUpdate,
    options?: ServersUpdateOptionalParams,
  ) => Promise<Server>;
  /** Creates or updates a server. */
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
  /** Gets a server. */
  get: (
    resourceGroupName: string,
    serverName: string,
    options?: ServersGetOptionalParams,
  ) => Promise<Server>;
}

function _getServers(context: SqlManagementContext) {
  return {
    checkNameAvailability: (
      parameters: CheckNameAvailabilityRequest,
      options?: ServersCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, parameters, options),
    refreshStatus: (
      resourceGroupName: string,
      serverName: string,
      options?: ServersRefreshStatusOptionalParams,
    ) => refreshStatus(context, resourceGroupName, serverName, options),
    beginRefreshStatus: async (
      resourceGroupName: string,
      serverName: string,
      options?: ServersRefreshStatusOptionalParams,
    ) => {
      const poller = refreshStatus(context, resourceGroupName, serverName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRefreshStatusAndWait: async (
      resourceGroupName: string,
      serverName: string,
      options?: ServersRefreshStatusOptionalParams,
    ) => {
      return await refreshStatus(context, resourceGroupName, serverName, options);
    },
    importDatabase: (
      resourceGroupName: string,
      serverName: string,
      parameters: ImportNewDatabaseDefinition,
      options?: ServersImportDatabaseOptionalParams,
    ) => importDatabase(context, resourceGroupName, serverName, parameters, options),
    beginImportDatabase: async (
      resourceGroupName: string,
      serverName: string,
      parameters: ImportNewDatabaseDefinition,
      options?: ServersImportDatabaseOptionalParams,
    ) => {
      const poller = importDatabase(context, resourceGroupName, serverName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginImportDatabaseAndWait: async (
      resourceGroupName: string,
      serverName: string,
      parameters: ImportNewDatabaseDefinition,
      options?: ServersImportDatabaseOptionalParams,
    ) => {
      return await importDatabase(context, resourceGroupName, serverName, parameters, options);
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
      parameters: ServerUpdate,
      options?: ServersUpdateOptionalParams,
    ) => update(context, resourceGroupName, serverName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      serverName: string,
      parameters: ServerUpdate,
      options?: ServersUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, serverName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      parameters: ServerUpdate,
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

export function _getServersOperations(context: SqlManagementContext): ServersOperations {
  return {
    ..._getServers(context),
  };
}
