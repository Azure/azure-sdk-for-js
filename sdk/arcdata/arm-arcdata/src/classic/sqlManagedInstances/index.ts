// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureArcDataContext } from "../../api/azureArcDataContext.js";
import {
  list,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/sqlManagedInstances/operations.js";
import type {
  SqlManagedInstancesListOptionalParams,
  SqlManagedInstancesListByResourceGroupOptionalParams,
  SqlManagedInstancesDeleteOptionalParams,
  SqlManagedInstancesUpdateOptionalParams,
  SqlManagedInstancesCreateOptionalParams,
  SqlManagedInstancesGetOptionalParams,
} from "../../api/sqlManagedInstances/options.js";
import type { SqlManagedInstance, SqlManagedInstanceUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SqlManagedInstances operations. */
export interface SqlManagedInstancesOperations {
  /** List sqlManagedInstance resources in the subscription */
  list: (
    options?: SqlManagedInstancesListOptionalParams,
  ) => PagedAsyncIterableIterator<SqlManagedInstance>;
  /** Gets all sqlManagedInstances in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: SqlManagedInstancesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<SqlManagedInstance>;
  /** Deletes a SQL Managed Instance resource */
  delete: (
    resourceGroupName: string,
    sqlManagedInstanceName: string,
    options?: SqlManagedInstancesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates a SQL Managed Instance resource */
  update: (
    resourceGroupName: string,
    sqlManagedInstanceName: string,
    parameters: SqlManagedInstanceUpdate,
    options?: SqlManagedInstancesUpdateOptionalParams,
  ) => Promise<SqlManagedInstance>;
  /** Creates or replaces a SQL Managed Instance resource */
  create: (
    resourceGroupName: string,
    sqlManagedInstanceName: string,
    sqlManagedInstance: SqlManagedInstance,
    options?: SqlManagedInstancesCreateOptionalParams,
  ) => PollerLike<OperationState<SqlManagedInstance>, SqlManagedInstance>;
  /** Retrieves a SQL Managed Instance resource */
  get: (
    resourceGroupName: string,
    sqlManagedInstanceName: string,
    options?: SqlManagedInstancesGetOptionalParams,
  ) => Promise<SqlManagedInstance>;
}

function _getSqlManagedInstances(context: AzureArcDataContext) {
  return {
    list: (options?: SqlManagedInstancesListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: SqlManagedInstancesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      sqlManagedInstanceName: string,
      options?: SqlManagedInstancesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, sqlManagedInstanceName, options),
    update: (
      resourceGroupName: string,
      sqlManagedInstanceName: string,
      parameters: SqlManagedInstanceUpdate,
      options?: SqlManagedInstancesUpdateOptionalParams,
    ) => update(context, resourceGroupName, sqlManagedInstanceName, parameters, options),
    create: (
      resourceGroupName: string,
      sqlManagedInstanceName: string,
      sqlManagedInstance: SqlManagedInstance,
      options?: SqlManagedInstancesCreateOptionalParams,
    ) => create(context, resourceGroupName, sqlManagedInstanceName, sqlManagedInstance, options),
    get: (
      resourceGroupName: string,
      sqlManagedInstanceName: string,
      options?: SqlManagedInstancesGetOptionalParams,
    ) => get(context, resourceGroupName, sqlManagedInstanceName, options),
  };
}

export function _getSqlManagedInstancesOperations(
  context: AzureArcDataContext,
): SqlManagedInstancesOperations {
  return {
    ..._getSqlManagedInstances(context),
  };
}
