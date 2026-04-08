// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import {
  listMemberSchemas,
  refreshMemberSchema,
  listBySyncGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/syncMembers/operations.js";
import type {
  SyncMembersListMemberSchemasOptionalParams,
  SyncMembersRefreshMemberSchemaOptionalParams,
  SyncMembersListBySyncGroupOptionalParams,
  SyncMembersDeleteOptionalParams,
  SyncMembersUpdateOptionalParams,
  SyncMembersCreateOrUpdateOptionalParams,
  SyncMembersGetOptionalParams,
} from "../../api/syncMembers/options.js";
import type { SyncFullSchemaProperties, SyncMember } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SyncMembers operations. */
export interface SyncMembersOperations {
  /** Gets a sync member database schema. */
  listMemberSchemas: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    syncMemberName: string,
    options?: SyncMembersListMemberSchemasOptionalParams,
  ) => PagedAsyncIterableIterator<SyncFullSchemaProperties>;
  /** Refreshes a sync member database schema. */
  refreshMemberSchema: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    syncMemberName: string,
    options?: SyncMembersRefreshMemberSchemaOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use refreshMemberSchema instead */
  beginRefreshMemberSchema: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    syncMemberName: string,
    options?: SyncMembersRefreshMemberSchemaOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use refreshMemberSchema instead */
  beginRefreshMemberSchemaAndWait: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    syncMemberName: string,
    options?: SyncMembersRefreshMemberSchemaOptionalParams,
  ) => Promise<void>;
  /** Lists sync members in the given sync group. */
  listBySyncGroup: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    options?: SyncMembersListBySyncGroupOptionalParams,
  ) => PagedAsyncIterableIterator<SyncMember>;
  /** Deletes a sync member. */
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
    syncMemberName: string,
    options?: SyncMembersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    syncMemberName: string,
    options?: SyncMembersDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    syncMemberName: string,
    options?: SyncMembersDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an existing sync member. */
  update: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    syncMemberName: string,
    parameters: SyncMember,
    options?: SyncMembersUpdateOptionalParams,
  ) => PollerLike<OperationState<SyncMember>, SyncMember>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    syncMemberName: string,
    parameters: SyncMember,
    options?: SyncMembersUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<SyncMember>, SyncMember>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    syncMemberName: string,
    parameters: SyncMember,
    options?: SyncMembersUpdateOptionalParams,
  ) => Promise<SyncMember>;
  /** Creates or updates a sync member. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    syncMemberName: string,
    parameters: SyncMember,
    options?: SyncMembersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<SyncMember>, SyncMember>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    syncMemberName: string,
    parameters: SyncMember,
    options?: SyncMembersCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<SyncMember>, SyncMember>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    syncMemberName: string,
    parameters: SyncMember,
    options?: SyncMembersCreateOrUpdateOptionalParams,
  ) => Promise<SyncMember>;
  /** Gets a sync member. */
  get: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    syncMemberName: string,
    options?: SyncMembersGetOptionalParams,
  ) => Promise<SyncMember>;
}

function _getSyncMembers(context: SqlManagementContext) {
  return {
    listMemberSchemas: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      syncGroupName: string,
      syncMemberName: string,
      options?: SyncMembersListMemberSchemasOptionalParams,
    ) =>
      listMemberSchemas(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        syncMemberName,
        options,
      ),
    refreshMemberSchema: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      syncGroupName: string,
      syncMemberName: string,
      options?: SyncMembersRefreshMemberSchemaOptionalParams,
    ) =>
      refreshMemberSchema(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        syncMemberName,
        options,
      ),
    beginRefreshMemberSchema: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      syncGroupName: string,
      syncMemberName: string,
      options?: SyncMembersRefreshMemberSchemaOptionalParams,
    ) => {
      const poller = refreshMemberSchema(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        syncMemberName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRefreshMemberSchemaAndWait: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      syncGroupName: string,
      syncMemberName: string,
      options?: SyncMembersRefreshMemberSchemaOptionalParams,
    ) => {
      return await refreshMemberSchema(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        syncMemberName,
        options,
      );
    },
    listBySyncGroup: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      syncGroupName: string,
      options?: SyncMembersListBySyncGroupOptionalParams,
    ) =>
      listBySyncGroup(context, resourceGroupName, serverName, databaseName, syncGroupName, options),
    delete: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      syncGroupName: string,
      syncMemberName: string,
      options?: SyncMembersDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        syncMemberName,
        options,
      ),
    beginDelete: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      syncGroupName: string,
      syncMemberName: string,
      options?: SyncMembersDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        syncMemberName,
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
      syncMemberName: string,
      options?: SyncMembersDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        syncMemberName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      syncGroupName: string,
      syncMemberName: string,
      parameters: SyncMember,
      options?: SyncMembersUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        syncMemberName,
        parameters,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      syncGroupName: string,
      syncMemberName: string,
      parameters: SyncMember,
      options?: SyncMembersUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        syncMemberName,
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
      syncMemberName: string,
      parameters: SyncMember,
      options?: SyncMembersUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        syncMemberName,
        parameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      syncGroupName: string,
      syncMemberName: string,
      parameters: SyncMember,
      options?: SyncMembersCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        syncMemberName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      syncGroupName: string,
      syncMemberName: string,
      parameters: SyncMember,
      options?: SyncMembersCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        syncMemberName,
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
      syncMemberName: string,
      parameters: SyncMember,
      options?: SyncMembersCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        syncMemberName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      syncGroupName: string,
      syncMemberName: string,
      options?: SyncMembersGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        syncMemberName,
        options,
      ),
  };
}

export function _getSyncMembersOperations(context: SqlManagementContext): SyncMembersOperations {
  return {
    ..._getSyncMembers(context),
  };
}
