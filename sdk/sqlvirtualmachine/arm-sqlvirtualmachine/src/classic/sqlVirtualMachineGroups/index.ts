// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlVirtualMachineContext } from "../../api/sqlVirtualMachineContext.js";
import {
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/sqlVirtualMachineGroups/operations.js";
import type {
  SqlVirtualMachineGroupsListOptionalParams,
  SqlVirtualMachineGroupsListByResourceGroupOptionalParams,
  SqlVirtualMachineGroupsDeleteOptionalParams,
  SqlVirtualMachineGroupsUpdateOptionalParams,
  SqlVirtualMachineGroupsCreateOrUpdateOptionalParams,
  SqlVirtualMachineGroupsGetOptionalParams,
} from "../../api/sqlVirtualMachineGroups/options.js";
import type { SqlVirtualMachineGroup, SqlVirtualMachineGroupUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SqlVirtualMachineGroups operations. */
export interface SqlVirtualMachineGroupsOperations {
  /** Gets all SQL virtual machine groups in a subscription. */
  list: (
    options?: SqlVirtualMachineGroupsListOptionalParams,
  ) => PagedAsyncIterableIterator<SqlVirtualMachineGroup>;
  /** Gets all SQL virtual machine groups in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: SqlVirtualMachineGroupsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<SqlVirtualMachineGroup>;
  /** Deletes a SQL virtual machine group. */
  delete: (
    resourceGroupName: string,
    sqlVirtualMachineGroupName: string,
    options?: SqlVirtualMachineGroupsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates SQL virtual machine group tags. */
  update: (
    resourceGroupName: string,
    sqlVirtualMachineGroupName: string,
    parameters: SqlVirtualMachineGroupUpdate,
    options?: SqlVirtualMachineGroupsUpdateOptionalParams,
  ) => PollerLike<OperationState<SqlVirtualMachineGroup>, SqlVirtualMachineGroup>;
  /** Creates or updates a SQL virtual machine group. */
  createOrUpdate: (
    resourceGroupName: string,
    sqlVirtualMachineGroupName: string,
    parameters: SqlVirtualMachineGroup,
    options?: SqlVirtualMachineGroupsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<SqlVirtualMachineGroup>, SqlVirtualMachineGroup>;
  /** Gets a SQL virtual machine group. */
  get: (
    resourceGroupName: string,
    sqlVirtualMachineGroupName: string,
    options?: SqlVirtualMachineGroupsGetOptionalParams,
  ) => Promise<SqlVirtualMachineGroup>;
}

function _getSqlVirtualMachineGroups(context: SqlVirtualMachineContext) {
  return {
    list: (options?: SqlVirtualMachineGroupsListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: SqlVirtualMachineGroupsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      sqlVirtualMachineGroupName: string,
      options?: SqlVirtualMachineGroupsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, sqlVirtualMachineGroupName, options),
    update: (
      resourceGroupName: string,
      sqlVirtualMachineGroupName: string,
      parameters: SqlVirtualMachineGroupUpdate,
      options?: SqlVirtualMachineGroupsUpdateOptionalParams,
    ) => update(context, resourceGroupName, sqlVirtualMachineGroupName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      sqlVirtualMachineGroupName: string,
      parameters: SqlVirtualMachineGroup,
      options?: SqlVirtualMachineGroupsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, sqlVirtualMachineGroupName, parameters, options),
    get: (
      resourceGroupName: string,
      sqlVirtualMachineGroupName: string,
      options?: SqlVirtualMachineGroupsGetOptionalParams,
    ) => get(context, resourceGroupName, sqlVirtualMachineGroupName, options),
  };
}

export function _getSqlVirtualMachineGroupsOperations(
  context: SqlVirtualMachineContext,
): SqlVirtualMachineGroupsOperations {
  return {
    ..._getSqlVirtualMachineGroups(context),
  };
}
