// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OracleDatabaseManagementContext } from "../../api/oracleDatabaseManagementContext.js";
import {
  listByResourceGroup,
  $delete,
  update,
  get,
  createOrUpdate,
  listBySubscription,
} from "../../api/dbSystems/operations.js";
import type {
  DbSystemsListByResourceGroupOptionalParams,
  DbSystemsDeleteOptionalParams,
  DbSystemsUpdateOptionalParams,
  DbSystemsGetOptionalParams,
  DbSystemsCreateOrUpdateOptionalParams,
  DbSystemsListBySubscriptionOptionalParams,
} from "../../api/dbSystems/options.js";
import type { DbSystem, DbSystemUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DbSystems operations. */
export interface DbSystemsOperations {
  /** List DbSystem resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: DbSystemsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<DbSystem>;
  /** Delete a DbSystem */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    dbSystemName: string,
    options?: DbSystemsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a DbSystem */
  update: (
    resourceGroupName: string,
    dbSystemName: string,
    properties: DbSystemUpdate,
    options?: DbSystemsUpdateOptionalParams,
  ) => PollerLike<OperationState<DbSystem>, DbSystem>;
  /** Get a DbSystem */
  get: (
    resourceGroupName: string,
    dbSystemName: string,
    options?: DbSystemsGetOptionalParams,
  ) => Promise<DbSystem>;
  /** Create a DbSystem */
  createOrUpdate: (
    resourceGroupName: string,
    dbSystemName: string,
    resource: DbSystem,
    options?: DbSystemsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DbSystem>, DbSystem>;
  /** List DbSystem resources by subscription ID */
  listBySubscription: (
    options?: DbSystemsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<DbSystem>;
}

function _getDbSystems(context: OracleDatabaseManagementContext) {
  return {
    listByResourceGroup: (
      resourceGroupName: string,
      options?: DbSystemsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      dbSystemName: string,
      options?: DbSystemsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, dbSystemName, options),
    update: (
      resourceGroupName: string,
      dbSystemName: string,
      properties: DbSystemUpdate,
      options?: DbSystemsUpdateOptionalParams,
    ) => update(context, resourceGroupName, dbSystemName, properties, options),
    get: (resourceGroupName: string, dbSystemName: string, options?: DbSystemsGetOptionalParams) =>
      get(context, resourceGroupName, dbSystemName, options),
    createOrUpdate: (
      resourceGroupName: string,
      dbSystemName: string,
      resource: DbSystem,
      options?: DbSystemsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, dbSystemName, resource, options),
    listBySubscription: (options?: DbSystemsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
  };
}

export function _getDbSystemsOperations(
  context: OracleDatabaseManagementContext,
): DbSystemsOperations {
  return {
    ..._getDbSystems(context),
  };
}
