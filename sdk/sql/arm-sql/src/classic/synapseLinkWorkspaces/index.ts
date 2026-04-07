// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import { listByDatabase } from "../../api/synapseLinkWorkspaces/operations.js";
import type { SynapseLinkWorkspacesListByDatabaseOptionalParams } from "../../api/synapseLinkWorkspaces/options.js";
import type { SynapseLinkWorkspace } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

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

function _getSynapseLinkWorkspaces(context: SqlContext) {
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
  context: SqlContext,
): SynapseLinkWorkspacesOperations {
  return {
    ..._getSynapseLinkWorkspaces(context),
  };
}
