// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import {
  listByDatabase,
  $delete,
  createOrUpdate,
  get,
} from "../../api/workloadGroups/operations.js";
import type {
  WorkloadGroupsListByDatabaseOptionalParams,
  WorkloadGroupsDeleteOptionalParams,
  WorkloadGroupsCreateOrUpdateOptionalParams,
  WorkloadGroupsGetOptionalParams,
} from "../../api/workloadGroups/options.js";
import type { WorkloadGroup } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a WorkloadGroups operations. */
export interface WorkloadGroupsOperations {
  /** Gets the list of workload groups */
  listByDatabase: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: WorkloadGroupsListByDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<WorkloadGroup>;
  /** Deletes a workload group. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    workloadGroupName: string,
    options?: WorkloadGroupsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    workloadGroupName: string,
    options?: WorkloadGroupsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    workloadGroupName: string,
    options?: WorkloadGroupsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a workload group. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    workloadGroupName: string,
    parameters: WorkloadGroup,
    options?: WorkloadGroupsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<WorkloadGroup>, WorkloadGroup>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    workloadGroupName: string,
    parameters: WorkloadGroup,
    options?: WorkloadGroupsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<WorkloadGroup>, WorkloadGroup>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    workloadGroupName: string,
    parameters: WorkloadGroup,
    options?: WorkloadGroupsCreateOrUpdateOptionalParams,
  ) => Promise<WorkloadGroup>;
  /** Gets a workload group */
  get: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    workloadGroupName: string,
    options?: WorkloadGroupsGetOptionalParams,
  ) => Promise<WorkloadGroup>;
}

function _getWorkloadGroups(context: SqlManagementContext) {
  return {
    listByDatabase: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: WorkloadGroupsListByDatabaseOptionalParams,
    ) => listByDatabase(context, resourceGroupName, serverName, databaseName, options),
    delete: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      workloadGroupName: string,
      options?: WorkloadGroupsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serverName, databaseName, workloadGroupName, options),
    beginDelete: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      workloadGroupName: string,
      options?: WorkloadGroupsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        workloadGroupName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      workloadGroupName: string,
      options?: WorkloadGroupsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        workloadGroupName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      workloadGroupName: string,
      parameters: WorkloadGroup,
      options?: WorkloadGroupsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        workloadGroupName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      workloadGroupName: string,
      parameters: WorkloadGroup,
      options?: WorkloadGroupsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        workloadGroupName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      workloadGroupName: string,
      parameters: WorkloadGroup,
      options?: WorkloadGroupsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        workloadGroupName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      workloadGroupName: string,
      options?: WorkloadGroupsGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, databaseName, workloadGroupName, options),
  };
}

export function _getWorkloadGroupsOperations(
  context: SqlManagementContext,
): WorkloadGroupsOperations {
  return {
    ..._getWorkloadGroups(context),
  };
}
