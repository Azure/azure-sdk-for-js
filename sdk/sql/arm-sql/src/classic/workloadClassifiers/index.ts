// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import {
  listByWorkloadGroup,
  $delete,
  createOrUpdate,
  get,
} from "../../api/workloadClassifiers/operations.js";
import type {
  WorkloadClassifiersListByWorkloadGroupOptionalParams,
  WorkloadClassifiersDeleteOptionalParams,
  WorkloadClassifiersCreateOrUpdateOptionalParams,
  WorkloadClassifiersGetOptionalParams,
} from "../../api/workloadClassifiers/options.js";
import type { WorkloadClassifier } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a WorkloadClassifiers operations. */
export interface WorkloadClassifiersOperations {
  /** Gets the list of workload classifiers for a workload group */
  listByWorkloadGroup: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    workloadGroupName: string,
    options?: WorkloadClassifiersListByWorkloadGroupOptionalParams,
  ) => PagedAsyncIterableIterator<WorkloadClassifier>;
  /** Deletes a workload classifier. */
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
    workloadClassifierName: string,
    options?: WorkloadClassifiersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    workloadGroupName: string,
    workloadClassifierName: string,
    options?: WorkloadClassifiersDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    workloadGroupName: string,
    workloadClassifierName: string,
    options?: WorkloadClassifiersDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a workload classifier. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    workloadGroupName: string,
    workloadClassifierName: string,
    parameters: WorkloadClassifier,
    options?: WorkloadClassifiersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<WorkloadClassifier>, WorkloadClassifier>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    workloadGroupName: string,
    workloadClassifierName: string,
    parameters: WorkloadClassifier,
    options?: WorkloadClassifiersCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<WorkloadClassifier>, WorkloadClassifier>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    workloadGroupName: string,
    workloadClassifierName: string,
    parameters: WorkloadClassifier,
    options?: WorkloadClassifiersCreateOrUpdateOptionalParams,
  ) => Promise<WorkloadClassifier>;
  /** Gets a workload classifier */
  get: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    workloadGroupName: string,
    workloadClassifierName: string,
    options?: WorkloadClassifiersGetOptionalParams,
  ) => Promise<WorkloadClassifier>;
}

function _getWorkloadClassifiers(context: SqlManagementContext) {
  return {
    listByWorkloadGroup: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      workloadGroupName: string,
      options?: WorkloadClassifiersListByWorkloadGroupOptionalParams,
    ) =>
      listByWorkloadGroup(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        workloadGroupName,
        options,
      ),
    delete: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      workloadGroupName: string,
      workloadClassifierName: string,
      options?: WorkloadClassifiersDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        workloadGroupName,
        workloadClassifierName,
        options,
      ),
    beginDelete: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      workloadGroupName: string,
      workloadClassifierName: string,
      options?: WorkloadClassifiersDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        workloadGroupName,
        workloadClassifierName,
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
      workloadClassifierName: string,
      options?: WorkloadClassifiersDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        workloadGroupName,
        workloadClassifierName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      workloadGroupName: string,
      workloadClassifierName: string,
      parameters: WorkloadClassifier,
      options?: WorkloadClassifiersCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        workloadGroupName,
        workloadClassifierName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      workloadGroupName: string,
      workloadClassifierName: string,
      parameters: WorkloadClassifier,
      options?: WorkloadClassifiersCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        workloadGroupName,
        workloadClassifierName,
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
      workloadClassifierName: string,
      parameters: WorkloadClassifier,
      options?: WorkloadClassifiersCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        workloadGroupName,
        workloadClassifierName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      workloadGroupName: string,
      workloadClassifierName: string,
      options?: WorkloadClassifiersGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        workloadGroupName,
        workloadClassifierName,
        options,
      ),
  };
}

export function _getWorkloadClassifiersOperations(
  context: SqlManagementContext,
): WorkloadClassifiersOperations {
  return {
    ..._getWorkloadClassifiers(context),
  };
}
