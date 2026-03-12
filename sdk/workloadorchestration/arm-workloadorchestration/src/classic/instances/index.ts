// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementContext } from "../../api/workloadOrchestrationManagementContext.js";
import {
  listBySolution,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/instances/operations.js";
import {
  InstancesListBySolutionOptionalParams,
  InstancesDeleteOptionalParams,
  InstancesUpdateOptionalParams,
  InstancesCreateOrUpdateOptionalParams,
  InstancesGetOptionalParams,
} from "../../api/instances/options.js";
import { Instance } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Instances operations. */
export interface InstancesOperations {
  /** List Instance Resources */
  listBySolution: (
    resourceGroupName: string,
    targetName: string,
    solutionName: string,
    options?: InstancesListBySolutionOptionalParams,
  ) => PagedAsyncIterableIterator<Instance>;
  /** Delete Instance Resource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    targetName: string,
    solutionName: string,
    instanceName: string,
    options?: InstancesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update an Instance Resource */
  update: (
    resourceGroupName: string,
    targetName: string,
    solutionName: string,
    instanceName: string,
    properties: Instance,
    options?: InstancesUpdateOptionalParams,
  ) => PollerLike<OperationState<Instance>, Instance>;
  /** Create or update Instance Resource */
  createOrUpdate: (
    resourceGroupName: string,
    targetName: string,
    solutionName: string,
    instanceName: string,
    resource: Instance,
    options?: InstancesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Instance>, Instance>;
  /** Get Instance Resource */
  get: (
    resourceGroupName: string,
    targetName: string,
    solutionName: string,
    instanceName: string,
    options?: InstancesGetOptionalParams,
  ) => Promise<Instance>;
}

function _getInstances(context: WorkloadOrchestrationManagementContext) {
  return {
    listBySolution: (
      resourceGroupName: string,
      targetName: string,
      solutionName: string,
      options?: InstancesListBySolutionOptionalParams,
    ) => listBySolution(context, resourceGroupName, targetName, solutionName, options),
    delete: (
      resourceGroupName: string,
      targetName: string,
      solutionName: string,
      instanceName: string,
      options?: InstancesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, targetName, solutionName, instanceName, options),
    update: (
      resourceGroupName: string,
      targetName: string,
      solutionName: string,
      instanceName: string,
      properties: Instance,
      options?: InstancesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        targetName,
        solutionName,
        instanceName,
        properties,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      targetName: string,
      solutionName: string,
      instanceName: string,
      resource: Instance,
      options?: InstancesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        targetName,
        solutionName,
        instanceName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      targetName: string,
      solutionName: string,
      instanceName: string,
      options?: InstancesGetOptionalParams,
    ) => get(context, resourceGroupName, targetName, solutionName, instanceName, options),
  };
}

export function _getInstancesOperations(
  context: WorkloadOrchestrationManagementContext,
): InstancesOperations {
  return {
    ..._getInstances(context),
  };
}
