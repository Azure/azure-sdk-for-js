// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MySQLManagementFlexibleServerContext } from "../../api/mySQLManagementFlexibleServerContext.js";
import { listByServer } from "../../api/replicas/operations.js";
import type { ReplicasListByServerOptionalParams } from "../../api/replicas/options.js";
import type { Server } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Replicas operations. */
export interface ReplicasOperations {
  /** List all the replicas for a given server. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: ReplicasListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<Server>;
}

function _getReplicas(context: MySQLManagementFlexibleServerContext) {
  return {
    listByServer: (
      resourceGroupName: string,
      serverName: string,
      options?: ReplicasListByServerOptionalParams,
    ) => listByServer(context, resourceGroupName, serverName, options),
  };
}

export function _getReplicasOperations(
  context: MySQLManagementFlexibleServerContext,
): ReplicasOperations {
  return {
    ..._getReplicas(context),
  };
}
