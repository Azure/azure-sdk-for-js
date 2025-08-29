// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementContext } from "../../api/workloadOrchestrationManagementContext.js";
import { listByInstance, get } from "../../api/instanceHistories/operations.js";
import {
  InstanceHistoriesListByInstanceOptionalParams,
  InstanceHistoriesGetOptionalParams,
} from "../../api/instanceHistories/options.js";
import { InstanceHistory } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a InstanceHistories operations. */
export interface InstanceHistoriesOperations {
  /** List InstanceHistory Resources */
  listByInstance: (
    resourceGroupName: string,
    targetName: string,
    solutionName: string,
    instanceName: string,
    options?: InstanceHistoriesListByInstanceOptionalParams,
  ) => PagedAsyncIterableIterator<InstanceHistory>;
  /** Get InstanceHistory Resource */
  get: (
    resourceGroupName: string,
    targetName: string,
    solutionName: string,
    instanceName: string,
    instanceHistoryName: string,
    options?: InstanceHistoriesGetOptionalParams,
  ) => Promise<InstanceHistory>;
}

function _getInstanceHistories(context: WorkloadOrchestrationManagementContext) {
  return {
    listByInstance: (
      resourceGroupName: string,
      targetName: string,
      solutionName: string,
      instanceName: string,
      options?: InstanceHistoriesListByInstanceOptionalParams,
    ) =>
      listByInstance(context, resourceGroupName, targetName, solutionName, instanceName, options),
    get: (
      resourceGroupName: string,
      targetName: string,
      solutionName: string,
      instanceName: string,
      instanceHistoryName: string,
      options?: InstanceHistoriesGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        targetName,
        solutionName,
        instanceName,
        instanceHistoryName,
        options,
      ),
  };
}

export function _getInstanceHistoriesOperations(
  context: WorkloadOrchestrationManagementContext,
): InstanceHistoriesOperations {
  return {
    ..._getInstanceHistories(context),
  };
}
