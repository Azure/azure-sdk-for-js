// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import {
  listLinkedDatabases,
  generateKey,
  listByServer,
  $delete,
  createOrUpdate,
  get,
} from "../../api/syncAgents/operations.js";
import type {
  SyncAgentsListLinkedDatabasesOptionalParams,
  SyncAgentsGenerateKeyOptionalParams,
  SyncAgentsListByServerOptionalParams,
  SyncAgentsDeleteOptionalParams,
  SyncAgentsCreateOrUpdateOptionalParams,
  SyncAgentsGetOptionalParams,
} from "../../api/syncAgents/options.js";
import type {
  SyncAgent,
  SyncAgentKeyProperties,
  SyncAgentLinkedDatabase,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SyncAgents operations. */
export interface SyncAgentsOperations {
  /** Lists databases linked to a sync agent. */
  listLinkedDatabases: (
    resourceGroupName: string,
    serverName: string,
    syncAgentName: string,
    options?: SyncAgentsListLinkedDatabasesOptionalParams,
  ) => PagedAsyncIterableIterator<SyncAgentLinkedDatabase>;
  /** Generates a sync agent key. */
  generateKey: (
    resourceGroupName: string,
    serverName: string,
    syncAgentName: string,
    options?: SyncAgentsGenerateKeyOptionalParams,
  ) => Promise<SyncAgentKeyProperties>;
  /** Lists sync agents in a server. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: SyncAgentsListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<SyncAgent>;
  /** Deletes a sync agent. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serverName: string,
    syncAgentName: string,
    options?: SyncAgentsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    serverName: string,
    syncAgentName: string,
    options?: SyncAgentsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    serverName: string,
    syncAgentName: string,
    options?: SyncAgentsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a sync agent. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    syncAgentName: string,
    parameters: SyncAgent,
    options?: SyncAgentsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<SyncAgent>, SyncAgent>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    syncAgentName: string,
    parameters: SyncAgent,
    options?: SyncAgentsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<SyncAgent>, SyncAgent>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    syncAgentName: string,
    parameters: SyncAgent,
    options?: SyncAgentsCreateOrUpdateOptionalParams,
  ) => Promise<SyncAgent>;
  /** Gets a sync agent. */
  get: (
    resourceGroupName: string,
    serverName: string,
    syncAgentName: string,
    options?: SyncAgentsGetOptionalParams,
  ) => Promise<SyncAgent>;
}

function _getSyncAgents(context: SqlManagementContext) {
  return {
    listLinkedDatabases: (
      resourceGroupName: string,
      serverName: string,
      syncAgentName: string,
      options?: SyncAgentsListLinkedDatabasesOptionalParams,
    ) => listLinkedDatabases(context, resourceGroupName, serverName, syncAgentName, options),
    generateKey: (
      resourceGroupName: string,
      serverName: string,
      syncAgentName: string,
      options?: SyncAgentsGenerateKeyOptionalParams,
    ) => generateKey(context, resourceGroupName, serverName, syncAgentName, options),
    listByServer: (
      resourceGroupName: string,
      serverName: string,
      options?: SyncAgentsListByServerOptionalParams,
    ) => listByServer(context, resourceGroupName, serverName, options),
    delete: (
      resourceGroupName: string,
      serverName: string,
      syncAgentName: string,
      options?: SyncAgentsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serverName, syncAgentName, options),
    beginDelete: async (
      resourceGroupName: string,
      serverName: string,
      syncAgentName: string,
      options?: SyncAgentsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, serverName, syncAgentName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      serverName: string,
      syncAgentName: string,
      options?: SyncAgentsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, serverName, syncAgentName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      syncAgentName: string,
      parameters: SyncAgent,
      options?: SyncAgentsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serverName, syncAgentName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      serverName: string,
      syncAgentName: string,
      parameters: SyncAgent,
      options?: SyncAgentsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        syncAgentName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      syncAgentName: string,
      parameters: SyncAgent,
      options?: SyncAgentsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        syncAgentName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      serverName: string,
      syncAgentName: string,
      options?: SyncAgentsGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, syncAgentName, options),
  };
}

export function _getSyncAgentsOperations(context: SqlManagementContext): SyncAgentsOperations {
  return {
    ..._getSyncAgents(context),
  };
}
