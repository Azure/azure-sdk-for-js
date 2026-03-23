// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PostgreSQLManagementFlexibleServerContext } from "../../api/postgreSQLManagementFlexibleServerContext.js";
import { listByServer } from "../../api/replicas/operations.js";
import type { ReplicasListByServerOptionalParams } from "../../api/replicas/options.js";
import type { Server } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Replicas operations. */
export interface ReplicasOperations {
  /** Lists all read replicas of a server. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: ReplicasListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<Server>;
}

function _getReplicas(context: PostgreSQLManagementFlexibleServerContext) {
  return {
    listByServer: (
      resourceGroupName: string,
      serverName: string,
      options?: ReplicasListByServerOptionalParams,
    ) => listByServer(context, resourceGroupName, serverName, options),
  };
}

export function _getReplicasOperations(
  context: PostgreSQLManagementFlexibleServerContext,
): ReplicasOperations {
  return {
    ..._getReplicas(context),
  };
}
