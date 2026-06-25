// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementContext } from "../../api/sqlManagementContext.js";
import { listByDatabase } from "../../api/synapseLinkWorkspaces/operations.js";
import { SynapseLinkWorkspacesListByDatabaseOptionalParams } from "../../api/synapseLinkWorkspaces/options.js";
import { SynapseLinkWorkspace } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SynapseLinkWorkspaces operations. */
export interface SynapseLinkWorkspacesOperations {
  /** Gets all synapselink workspaces for a database. */
  listByDatabase: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: SynapseLinkWorkspacesListByDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<SynapseLinkWorkspace>;
}

function _getSynapseLinkWorkspaces(context: SqlManagementContext) {
  return {
    listByDatabase: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: SynapseLinkWorkspacesListByDatabaseOptionalParams,
    ) => listByDatabase(context, resourceGroupName, serverName, databaseName, options),
  };
}

export function _getSynapseLinkWorkspacesOperations(
  context: SqlManagementContext,
): SynapseLinkWorkspacesOperations {
  return {
    ..._getSynapseLinkWorkspaces(context),
  };
}
