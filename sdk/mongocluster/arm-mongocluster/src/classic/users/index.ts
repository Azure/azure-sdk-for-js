// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MongoClusterManagementContext } from "../../api/mongoClusterManagementContext.js";
import { listByMongoCluster, $delete, createOrUpdate, get } from "../../api/users/operations.js";
import type {
  UsersListByMongoClusterOptionalParams,
  UsersDeleteOptionalParams,
  UsersCreateOrUpdateOptionalParams,
  UsersGetOptionalParams,
} from "../../api/users/options.js";
import type { User } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Users operations. */
export interface UsersOperations {
  /** List all the users on a mongo cluster. */
  listByMongoCluster: (
    resourceGroupName: string,
    mongoClusterName: string,
    options?: UsersListByMongoClusterOptionalParams,
  ) => PagedAsyncIterableIterator<User>;
  /** Deletes a mongo cluster user. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    mongoClusterName: string,
    userName: string,
    options?: UsersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Creates a new user or updates an existing user on a mongo cluster. */
  createOrUpdate: (
    resourceGroupName: string,
    mongoClusterName: string,
    userName: string,
    resource: User,
    options?: UsersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<User>, User>;
  /** Gets the defintion of a Mongo cluster user. */
  get: (
    resourceGroupName: string,
    mongoClusterName: string,
    userName: string,
    options?: UsersGetOptionalParams,
  ) => Promise<User>;
}

function _getUsers(context: MongoClusterManagementContext) {
  return {
    listByMongoCluster: (
      resourceGroupName: string,
      mongoClusterName: string,
      options?: UsersListByMongoClusterOptionalParams,
    ) => listByMongoCluster(context, resourceGroupName, mongoClusterName, options),
    delete: (
      resourceGroupName: string,
      mongoClusterName: string,
      userName: string,
      options?: UsersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, mongoClusterName, userName, options),
    createOrUpdate: (
      resourceGroupName: string,
      mongoClusterName: string,
      userName: string,
      resource: User,
      options?: UsersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, mongoClusterName, userName, resource, options),
    get: (
      resourceGroupName: string,
      mongoClusterName: string,
      userName: string,
      options?: UsersGetOptionalParams,
    ) => get(context, resourceGroupName, mongoClusterName, userName, options),
  };
}

export function _getUsersOperations(context: MongoClusterManagementContext): UsersOperations {
  return {
    ..._getUsers(context),
  };
}
