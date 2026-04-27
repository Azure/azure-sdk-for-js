// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import {
  start,
  regenerateAuthToken,
  listConnectionInfo,
  listByDatabaseAccount,
  $delete,
  createOrUpdate,
  get,
} from "../../api/notebookWorkspaces/operations.js";
import type {
  NotebookWorkspacesStartOptionalParams,
  NotebookWorkspacesRegenerateAuthTokenOptionalParams,
  NotebookWorkspacesListConnectionInfoOptionalParams,
  NotebookWorkspacesListByDatabaseAccountOptionalParams,
  NotebookWorkspacesDeleteOptionalParams,
  NotebookWorkspacesCreateOrUpdateOptionalParams,
  NotebookWorkspacesGetOptionalParams,
} from "../../api/notebookWorkspaces/options.js";
import type {
  NotebookWorkspace,
  NotebookWorkspaceName,
  NotebookWorkspaceCreateUpdateParameters,
  NotebookWorkspaceConnectionInfoResult,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NotebookWorkspaces operations. */
export interface NotebookWorkspacesOperations {
  /** Starts the notebook workspace */
  start: (
    resourceGroupName: string,
    accountName: string,
    notebookWorkspaceName: NotebookWorkspaceName,
    options?: NotebookWorkspacesStartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use start instead */
  beginStart: (
    resourceGroupName: string,
    accountName: string,
    notebookWorkspaceName: NotebookWorkspaceName,
    options?: NotebookWorkspacesStartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use start instead */
  beginStartAndWait: (
    resourceGroupName: string,
    accountName: string,
    notebookWorkspaceName: NotebookWorkspaceName,
    options?: NotebookWorkspacesStartOptionalParams,
  ) => Promise<void>;
  /** Regenerates the auth token for the notebook workspace */
  regenerateAuthToken: (
    resourceGroupName: string,
    accountName: string,
    notebookWorkspaceName: NotebookWorkspaceName,
    options?: NotebookWorkspacesRegenerateAuthTokenOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use regenerateAuthToken instead */
  beginRegenerateAuthToken: (
    resourceGroupName: string,
    accountName: string,
    notebookWorkspaceName: NotebookWorkspaceName,
    options?: NotebookWorkspacesRegenerateAuthTokenOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use regenerateAuthToken instead */
  beginRegenerateAuthTokenAndWait: (
    resourceGroupName: string,
    accountName: string,
    notebookWorkspaceName: NotebookWorkspaceName,
    options?: NotebookWorkspacesRegenerateAuthTokenOptionalParams,
  ) => Promise<void>;
  /** Retrieves the connection info for the notebook workspace */
  listConnectionInfo: (
    resourceGroupName: string,
    accountName: string,
    notebookWorkspaceName: NotebookWorkspaceName,
    options?: NotebookWorkspacesListConnectionInfoOptionalParams,
  ) => Promise<NotebookWorkspaceConnectionInfoResult>;
  /** Gets the notebook workspace resources of an existing Cosmos DB account. */
  listByDatabaseAccount: (
    resourceGroupName: string,
    accountName: string,
    options?: NotebookWorkspacesListByDatabaseAccountOptionalParams,
  ) => PagedAsyncIterableIterator<NotebookWorkspace>;
  /** Deletes the notebook workspace for a Cosmos DB account. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    notebookWorkspaceName: NotebookWorkspaceName,
    options?: NotebookWorkspacesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    accountName: string,
    notebookWorkspaceName: NotebookWorkspaceName,
    options?: NotebookWorkspacesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    accountName: string,
    notebookWorkspaceName: NotebookWorkspaceName,
    options?: NotebookWorkspacesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates the notebook workspace for a Cosmos DB account. */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    notebookWorkspaceName: NotebookWorkspaceName,
    notebookCreateUpdateParameters: NotebookWorkspaceCreateUpdateParameters,
    options?: NotebookWorkspacesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<NotebookWorkspace>, NotebookWorkspace>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    notebookWorkspaceName: NotebookWorkspaceName,
    notebookCreateUpdateParameters: NotebookWorkspaceCreateUpdateParameters,
    options?: NotebookWorkspacesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NotebookWorkspace>, NotebookWorkspace>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    accountName: string,
    notebookWorkspaceName: NotebookWorkspaceName,
    notebookCreateUpdateParameters: NotebookWorkspaceCreateUpdateParameters,
    options?: NotebookWorkspacesCreateOrUpdateOptionalParams,
  ) => Promise<NotebookWorkspace>;
  /** Gets the notebook workspace for a Cosmos DB account. */
  get: (
    resourceGroupName: string,
    accountName: string,
    notebookWorkspaceName: NotebookWorkspaceName,
    options?: NotebookWorkspacesGetOptionalParams,
  ) => Promise<NotebookWorkspace>;
}

function _getNotebookWorkspaces(context: CosmosDBManagementContext) {
  return {
    start: (
      resourceGroupName: string,
      accountName: string,
      notebookWorkspaceName: NotebookWorkspaceName,
      options?: NotebookWorkspacesStartOptionalParams,
    ) => start(context, resourceGroupName, accountName, notebookWorkspaceName, options),
    beginStart: async (
      resourceGroupName: string,
      accountName: string,
      notebookWorkspaceName: NotebookWorkspaceName,
      options?: NotebookWorkspacesStartOptionalParams,
    ) => {
      const poller = start(context, resourceGroupName, accountName, notebookWorkspaceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStartAndWait: async (
      resourceGroupName: string,
      accountName: string,
      notebookWorkspaceName: NotebookWorkspaceName,
      options?: NotebookWorkspacesStartOptionalParams,
    ) => {
      return await start(context, resourceGroupName, accountName, notebookWorkspaceName, options);
    },
    regenerateAuthToken: (
      resourceGroupName: string,
      accountName: string,
      notebookWorkspaceName: NotebookWorkspaceName,
      options?: NotebookWorkspacesRegenerateAuthTokenOptionalParams,
    ) =>
      regenerateAuthToken(context, resourceGroupName, accountName, notebookWorkspaceName, options),
    beginRegenerateAuthToken: async (
      resourceGroupName: string,
      accountName: string,
      notebookWorkspaceName: NotebookWorkspaceName,
      options?: NotebookWorkspacesRegenerateAuthTokenOptionalParams,
    ) => {
      const poller = regenerateAuthToken(
        context,
        resourceGroupName,
        accountName,
        notebookWorkspaceName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRegenerateAuthTokenAndWait: async (
      resourceGroupName: string,
      accountName: string,
      notebookWorkspaceName: NotebookWorkspaceName,
      options?: NotebookWorkspacesRegenerateAuthTokenOptionalParams,
    ) => {
      return await regenerateAuthToken(
        context,
        resourceGroupName,
        accountName,
        notebookWorkspaceName,
        options,
      );
    },
    listConnectionInfo: (
      resourceGroupName: string,
      accountName: string,
      notebookWorkspaceName: NotebookWorkspaceName,
      options?: NotebookWorkspacesListConnectionInfoOptionalParams,
    ) =>
      listConnectionInfo(context, resourceGroupName, accountName, notebookWorkspaceName, options),
    listByDatabaseAccount: (
      resourceGroupName: string,
      accountName: string,
      options?: NotebookWorkspacesListByDatabaseAccountOptionalParams,
    ) => listByDatabaseAccount(context, resourceGroupName, accountName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      notebookWorkspaceName: NotebookWorkspaceName,
      options?: NotebookWorkspacesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, notebookWorkspaceName, options),
    beginDelete: async (
      resourceGroupName: string,
      accountName: string,
      notebookWorkspaceName: NotebookWorkspaceName,
      options?: NotebookWorkspacesDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        accountName,
        notebookWorkspaceName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      accountName: string,
      notebookWorkspaceName: NotebookWorkspaceName,
      options?: NotebookWorkspacesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, accountName, notebookWorkspaceName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      notebookWorkspaceName: NotebookWorkspaceName,
      notebookCreateUpdateParameters: NotebookWorkspaceCreateUpdateParameters,
      options?: NotebookWorkspacesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        notebookWorkspaceName,
        notebookCreateUpdateParameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      accountName: string,
      notebookWorkspaceName: NotebookWorkspaceName,
      notebookCreateUpdateParameters: NotebookWorkspaceCreateUpdateParameters,
      options?: NotebookWorkspacesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        notebookWorkspaceName,
        notebookCreateUpdateParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      accountName: string,
      notebookWorkspaceName: NotebookWorkspaceName,
      notebookCreateUpdateParameters: NotebookWorkspaceCreateUpdateParameters,
      options?: NotebookWorkspacesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        notebookWorkspaceName,
        notebookCreateUpdateParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      accountName: string,
      notebookWorkspaceName: NotebookWorkspaceName,
      options?: NotebookWorkspacesGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, notebookWorkspaceName, options),
  };
}

export function _getNotebookWorkspacesOperations(
  context: CosmosDBManagementContext,
): NotebookWorkspacesOperations {
  return {
    ..._getNotebookWorkspaces(context),
  };
}
