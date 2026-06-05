// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DBforPostgreSQLContext } from "../../api/dBforPostgreSQLContext.js";
import { listByCluster, $delete, create, get } from "../../api/roles/operations.js";
import {
  RolesListByClusterOptionalParams,
  RolesDeleteOptionalParams,
  RolesCreateOptionalParams,
  RolesGetOptionalParams,
} from "../../api/roles/options.js";
import { Role } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Roles operations. */
export interface RolesOperations {
  /** List all the roles in a given cluster. */
  listByCluster: (
    resourceGroupName: string,
    clusterName: string,
    options?: RolesListByClusterOptionalParams,
  ) => PagedAsyncIterableIterator<Role>;
  /** Deletes a cluster role. */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    roleName: string,
    options?: RolesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Creates a new role or updates an existing role. */
  create: (
    resourceGroupName: string,
    clusterName: string,
    roleName: string,
    parameters: Role,
    options?: RolesCreateOptionalParams,
  ) => PollerLike<OperationState<Role>, Role>;
  /** Gets information about a cluster role. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    roleName: string,
    options?: RolesGetOptionalParams,
  ) => Promise<Role>;
}

function _getRoles(context: DBforPostgreSQLContext) {
  return {
    listByCluster: (
      resourceGroupName: string,
      clusterName: string,
      options?: RolesListByClusterOptionalParams,
    ) => listByCluster(context, resourceGroupName, clusterName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      roleName: string,
      options?: RolesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, roleName, options),
    create: (
      resourceGroupName: string,
      clusterName: string,
      roleName: string,
      parameters: Role,
      options?: RolesCreateOptionalParams,
    ) => create(context, resourceGroupName, clusterName, roleName, parameters, options),
    get: (
      resourceGroupName: string,
      clusterName: string,
      roleName: string,
      options?: RolesGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, roleName, options),
  };
}

export function _getRolesOperations(context: DBforPostgreSQLContext): RolesOperations {
  return {
    ..._getRoles(context),
  };
}
