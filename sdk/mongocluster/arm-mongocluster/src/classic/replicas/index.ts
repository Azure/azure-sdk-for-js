// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MongoClusterManagementContext } from "../../api/mongoClusterManagementContext.js";
import { listByParent } from "../../api/replicas/operations.js";
import type { ReplicasListByParentOptionalParams } from "../../api/replicas/options.js";
import type { Replica } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Replicas operations. */
export interface ReplicasOperations {
  /** List all the replicas for the mongo cluster. */
  listByParent: (
    resourceGroupName: string,
    mongoClusterName: string,
    options?: ReplicasListByParentOptionalParams,
  ) => PagedAsyncIterableIterator<Replica>;
}

function _getReplicas(context: MongoClusterManagementContext) {
  return {
    listByParent: (
      resourceGroupName: string,
      mongoClusterName: string,
      options?: ReplicasListByParentOptionalParams,
    ) => listByParent(context, resourceGroupName, mongoClusterName, options),
  };
}

export function _getReplicasOperations(context: MongoClusterManagementContext): ReplicasOperations {
  return {
    ..._getReplicas(context),
  };
}
