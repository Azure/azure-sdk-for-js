// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBForPostgreSQLContext } from "../../api/cosmosDBForPostgreSQLContext.js";
import { listByCluster, $delete, create, get } from "../../api/roles/operations.js";
import {
  RolesListByClusterOptionalParams,
  RolesDeleteOptionalParams,
  RolesCreateOptionalParams,
  RolesGetOptionalParams,
} from "../../api/roles/options.js";
import { Role } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    roleName: string,
    options?: RolesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    roleName: string,
    options?: RolesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a new role or updates an existing role. */
  create: (
    resourceGroupName: string,
    clusterName: string,
    roleName: string,
    parameters: Role,
    options?: RolesCreateOptionalParams,
  ) => PollerLike<OperationState<Role>, Role>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    clusterName: string,
    roleName: string,
    parameters: Role,
    options?: RolesCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Role>, Role>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    roleName: string,
    parameters: Role,
    options?: RolesCreateOptionalParams,
  ) => Promise<Role>;
  /** Gets information about a cluster role. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    roleName: string,
    options?: RolesGetOptionalParams,
  ) => Promise<Role>;
}

function _getRoles(context: CosmosDBForPostgreSQLContext) {
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
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      roleName: string,
      options?: RolesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, clusterName, roleName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      roleName: string,
      options?: RolesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, clusterName, roleName, options);
    },
    create: (
      resourceGroupName: string,
      clusterName: string,
      roleName: string,
      parameters: Role,
      options?: RolesCreateOptionalParams,
    ) => create(context, resourceGroupName, clusterName, roleName, parameters, options),
    beginCreate: async (
      resourceGroupName: string,
      clusterName: string,
      roleName: string,
      parameters: Role,
      options?: RolesCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, clusterName, roleName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      roleName: string,
      parameters: Role,
      options?: RolesCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, clusterName, roleName, parameters, options);
    },
    get: (
      resourceGroupName: string,
      clusterName: string,
      roleName: string,
      options?: RolesGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, roleName, options),
  };
}

export function _getRolesOperations(context: CosmosDBForPostgreSQLContext): RolesOperations {
  return {
    ..._getRoles(context),
  };
}
