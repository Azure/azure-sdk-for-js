// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import {
  listSyncDatabaseIds,
  triggerSync,
  refreshHubSchema,
  listLogs,
  listHubSchemas,
  cancelSync,
  listByDatabase,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/syncGroups/operations.js";
import type {
  SyncGroupsListSyncDatabaseIdsOptionalParams,
  SyncGroupsTriggerSyncOptionalParams,
  SyncGroupsRefreshHubSchemaOptionalParams,
  SyncGroupsListLogsOptionalParams,
  SyncGroupsListHubSchemasOptionalParams,
  SyncGroupsCancelSyncOptionalParams,
  SyncGroupsListByDatabaseOptionalParams,
  SyncGroupsDeleteOptionalParams,
  SyncGroupsUpdateOptionalParams,
  SyncGroupsCreateOrUpdateOptionalParams,
  SyncGroupsGetOptionalParams,
} from "../../api/syncGroups/options.js";
import type {
  SyncGroup,
  SyncFullSchemaProperties,
  SyncGroupLogProperties,
  SyncDatabaseIdProperties,
  SyncGroupsType,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SyncGroups operations. */
export interface SyncGroupsOperations {
  /** Gets a collection of sync database ids. */
  listSyncDatabaseIds: (
    locationName: string,
    options?: SyncGroupsListSyncDatabaseIdsOptionalParams,
  ) => PagedAsyncIterableIterator<SyncDatabaseIdProperties>;
  /** Triggers a sync group synchronization. */
  triggerSync: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    options?: SyncGroupsTriggerSyncOptionalParams,
  ) => Promise<void>;
  /** Refreshes a hub database schema. */
  refreshHubSchema: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    options?: SyncGroupsRefreshHubSchemaOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use refreshHubSchema instead */
  beginRefreshHubSchema: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    options?: SyncGroupsRefreshHubSchemaOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use refreshHubSchema instead */
  beginRefreshHubSchemaAndWait: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    options?: SyncGroupsRefreshHubSchemaOptionalParams,
  ) => Promise<void>;
  /** Gets a collection of sync group logs. */
  listLogs: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    startTime: string,
    endTime: string,
    typeParam: SyncGroupsType,
    options?: SyncGroupsListLogsOptionalParams,
  ) => PagedAsyncIterableIterator<SyncGroupLogProperties>;
  /** Gets a collection of hub database schemas. */
  listHubSchemas: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    options?: SyncGroupsListHubSchemasOptionalParams,
  ) => PagedAsyncIterableIterator<SyncFullSchemaProperties>;
  /** Cancels a sync group synchronization. */
  cancelSync: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    options?: SyncGroupsCancelSyncOptionalParams,
  ) => Promise<void>;
  /** Lists sync groups under a hub database. */
  listByDatabase: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: SyncGroupsListByDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<SyncGroup>;
  /** Deletes a sync group. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    options?: SyncGroupsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    options?: SyncGroupsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    options?: SyncGroupsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a sync group. */
  update: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    parameters: SyncGroup,
    options?: SyncGroupsUpdateOptionalParams,
  ) => PollerLike<OperationState<SyncGroup>, SyncGroup>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    parameters: SyncGroup,
    options?: SyncGroupsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<SyncGroup>, SyncGroup>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    parameters: SyncGroup,
    options?: SyncGroupsUpdateOptionalParams,
  ) => Promise<SyncGroup>;
  /** Creates or updates a sync group. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    parameters: SyncGroup,
    options?: SyncGroupsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<SyncGroup>, SyncGroup>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    parameters: SyncGroup,
    options?: SyncGroupsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<SyncGroup>, SyncGroup>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    parameters: SyncGroup,
    options?: SyncGroupsCreateOrUpdateOptionalParams,
  ) => Promise<SyncGroup>;
  /** Gets a sync group. */
  get: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    options?: SyncGroupsGetOptionalParams,
  ) => Promise<SyncGroup>;
}

function _getSyncGroups(context: SqlContext) {
  return {
    listSyncDatabaseIds: (
      locationName: string,
      options?: SyncGroupsListSyncDatabaseIdsOptionalParams,
    ) => listSyncDatabaseIds(context, locationName, options),
    triggerSync: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      syncGroupName: string,
      options?: SyncGroupsTriggerSyncOptionalParams,
    ) => triggerSync(context, resourceGroupName, serverName, databaseName, syncGroupName, options),
    refreshHubSchema: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      syncGroupName: string,
      options?: SyncGroupsRefreshHubSchemaOptionalParams,
    ) =>
      refreshHubSchema(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        options,
      ),
    beginRefreshHubSchema: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      syncGroupName: string,
      options?: SyncGroupsRefreshHubSchemaOptionalParams,
    ) => {
      const poller = refreshHubSchema(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRefreshHubSchemaAndWait: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      syncGroupName: string,
      options?: SyncGroupsRefreshHubSchemaOptionalParams,
    ) => {
      return await refreshHubSchema(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        options,
      );
    },
    listLogs: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      syncGroupName: string,
      startTime: string,
      endTime: string,
      typeParam: SyncGroupsType,
      options?: SyncGroupsListLogsOptionalParams,
    ) =>
      listLogs(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        startTime,
        endTime,
        typeParam,
        options,
      ),
    listHubSchemas: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      syncGroupName: string,
      options?: SyncGroupsListHubSchemasOptionalParams,
    ) =>
      listHubSchemas(context, resourceGroupName, serverName, databaseName, syncGroupName, options),
    cancelSync: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      syncGroupName: string,
      options?: SyncGroupsCancelSyncOptionalParams,
    ) => cancelSync(context, resourceGroupName, serverName, databaseName, syncGroupName, options),
    listByDatabase: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: SyncGroupsListByDatabaseOptionalParams,
    ) => listByDatabase(context, resourceGroupName, serverName, databaseName, options),
    delete: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      syncGroupName: string,
      options?: SyncGroupsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serverName, databaseName, syncGroupName, options),
    beginDelete: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      syncGroupName: string,
      options?: SyncGroupsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      syncGroupName: string,
      options?: SyncGroupsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      syncGroupName: string,
      parameters: SyncGroup,
      options?: SyncGroupsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        parameters,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      syncGroupName: string,
      parameters: SyncGroup,
      options?: SyncGroupsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      syncGroupName: string,
      parameters: SyncGroup,
      options?: SyncGroupsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        parameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      syncGroupName: string,
      parameters: SyncGroup,
      options?: SyncGroupsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      syncGroupName: string,
      parameters: SyncGroup,
      options?: SyncGroupsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      syncGroupName: string,
      parameters: SyncGroup,
      options?: SyncGroupsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      syncGroupName: string,
      options?: SyncGroupsGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, databaseName, syncGroupName, options),
  };
}

export function _getSyncGroupsOperations(context: SqlContext): SyncGroupsOperations {
  return {
    ..._getSyncGroups(context),
  };
}
