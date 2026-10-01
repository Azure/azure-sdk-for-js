// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlVirtualMachineManagementContext } from "../../api/sqlVirtualMachineManagementContext.js";
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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    sqlVirtualMachineGroupName: string,
    options?: SqlVirtualMachineGroupsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    sqlVirtualMachineGroupName: string,
    options?: SqlVirtualMachineGroupsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates SQL virtual machine group tags. */
  update: (
    resourceGroupName: string,
    sqlVirtualMachineGroupName: string,
    parameters: SqlVirtualMachineGroupUpdate,
    options?: SqlVirtualMachineGroupsUpdateOptionalParams,
  ) => PollerLike<OperationState<SqlVirtualMachineGroup>, SqlVirtualMachineGroup>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    sqlVirtualMachineGroupName: string,
    parameters: SqlVirtualMachineGroupUpdate,
    options?: SqlVirtualMachineGroupsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<SqlVirtualMachineGroup>, SqlVirtualMachineGroup>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    sqlVirtualMachineGroupName: string,
    parameters: SqlVirtualMachineGroupUpdate,
    options?: SqlVirtualMachineGroupsUpdateOptionalParams,
  ) => Promise<SqlVirtualMachineGroup>;
  /** Creates or updates a SQL virtual machine group. */
  createOrUpdate: (
    resourceGroupName: string,
    sqlVirtualMachineGroupName: string,
    parameters: SqlVirtualMachineGroup,
    options?: SqlVirtualMachineGroupsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<SqlVirtualMachineGroup>, SqlVirtualMachineGroup>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    sqlVirtualMachineGroupName: string,
    parameters: SqlVirtualMachineGroup,
    options?: SqlVirtualMachineGroupsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<SqlVirtualMachineGroup>, SqlVirtualMachineGroup>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    sqlVirtualMachineGroupName: string,
    parameters: SqlVirtualMachineGroup,
    options?: SqlVirtualMachineGroupsCreateOrUpdateOptionalParams,
  ) => Promise<SqlVirtualMachineGroup>;
  /** Gets a SQL virtual machine group. */
  get: (
    resourceGroupName: string,
    sqlVirtualMachineGroupName: string,
    options?: SqlVirtualMachineGroupsGetOptionalParams,
  ) => Promise<SqlVirtualMachineGroup>;
}

function _getSqlVirtualMachineGroups(context: SqlVirtualMachineManagementContext) {
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
    beginDelete: async (
      resourceGroupName: string,
      sqlVirtualMachineGroupName: string,
      options?: SqlVirtualMachineGroupsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, sqlVirtualMachineGroupName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      sqlVirtualMachineGroupName: string,
      options?: SqlVirtualMachineGroupsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, sqlVirtualMachineGroupName, options);
    },
    update: (
      resourceGroupName: string,
      sqlVirtualMachineGroupName: string,
      parameters: SqlVirtualMachineGroupUpdate,
      options?: SqlVirtualMachineGroupsUpdateOptionalParams,
    ) => update(context, resourceGroupName, sqlVirtualMachineGroupName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      sqlVirtualMachineGroupName: string,
      parameters: SqlVirtualMachineGroupUpdate,
      options?: SqlVirtualMachineGroupsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        sqlVirtualMachineGroupName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      sqlVirtualMachineGroupName: string,
      parameters: SqlVirtualMachineGroupUpdate,
      options?: SqlVirtualMachineGroupsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        sqlVirtualMachineGroupName,
        parameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      sqlVirtualMachineGroupName: string,
      parameters: SqlVirtualMachineGroup,
      options?: SqlVirtualMachineGroupsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, sqlVirtualMachineGroupName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      sqlVirtualMachineGroupName: string,
      parameters: SqlVirtualMachineGroup,
      options?: SqlVirtualMachineGroupsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        sqlVirtualMachineGroupName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      sqlVirtualMachineGroupName: string,
      parameters: SqlVirtualMachineGroup,
      options?: SqlVirtualMachineGroupsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        sqlVirtualMachineGroupName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      sqlVirtualMachineGroupName: string,
      options?: SqlVirtualMachineGroupsGetOptionalParams,
    ) => get(context, resourceGroupName, sqlVirtualMachineGroupName, options),
  };
}

export function _getSqlVirtualMachineGroupsOperations(
  context: SqlVirtualMachineManagementContext,
): SqlVirtualMachineGroupsOperations {
  return {
    ..._getSqlVirtualMachineGroups(context),
  };
}
