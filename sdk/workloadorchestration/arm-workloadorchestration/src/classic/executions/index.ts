// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementContext } from "../../api/workloadOrchestrationManagementContext.js";
import {
  listByWorkflowVersion,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/executions/operations.js";
import {
  ExecutionsListByWorkflowVersionOptionalParams,
  ExecutionsDeleteOptionalParams,
  ExecutionsUpdateOptionalParams,
  ExecutionsCreateOrUpdateOptionalParams,
  ExecutionsGetOptionalParams,
} from "../../api/executions/options.js";
import { Execution } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Executions operations. */
export interface ExecutionsOperations {
  /** List Execution Resources */
  listByWorkflowVersion: (
    resourceGroupName: string,
    contextName: string,
    workflowName: string,
    versionName: string,
    options?: ExecutionsListByWorkflowVersionOptionalParams,
  ) => PagedAsyncIterableIterator<Execution>;
  /** Delete Execution Resource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    contextName: string,
    workflowName: string,
    versionName: string,
    executionName: string,
    options?: ExecutionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** update an Execution Resource */
  update: (
    resourceGroupName: string,
    contextName: string,
    workflowName: string,
    versionName: string,
    executionName: string,
    properties: Execution,
    options?: ExecutionsUpdateOptionalParams,
  ) => PollerLike<OperationState<Execution>, Execution>;
  /** Create or update Execution Resource */
  createOrUpdate: (
    resourceGroupName: string,
    contextName: string,
    workflowName: string,
    versionName: string,
    executionName: string,
    resource: Execution,
    options?: ExecutionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Execution>, Execution>;
  /** Get Execution Resource */
  get: (
    resourceGroupName: string,
    contextName: string,
    workflowName: string,
    versionName: string,
    executionName: string,
    options?: ExecutionsGetOptionalParams,
  ) => Promise<Execution>;
}

function _getExecutions(context: WorkloadOrchestrationManagementContext) {
  return {
    listByWorkflowVersion: (
      resourceGroupName: string,
      contextName: string,
      workflowName: string,
      versionName: string,
      options?: ExecutionsListByWorkflowVersionOptionalParams,
    ) =>
      listByWorkflowVersion(
        context,
        resourceGroupName,
        contextName,
        workflowName,
        versionName,
        options,
      ),
    delete: (
      resourceGroupName: string,
      contextName: string,
      workflowName: string,
      versionName: string,
      executionName: string,
      options?: ExecutionsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        contextName,
        workflowName,
        versionName,
        executionName,
        options,
      ),
    update: (
      resourceGroupName: string,
      contextName: string,
      workflowName: string,
      versionName: string,
      executionName: string,
      properties: Execution,
      options?: ExecutionsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        contextName,
        workflowName,
        versionName,
        executionName,
        properties,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      contextName: string,
      workflowName: string,
      versionName: string,
      executionName: string,
      resource: Execution,
      options?: ExecutionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        contextName,
        workflowName,
        versionName,
        executionName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      contextName: string,
      workflowName: string,
      versionName: string,
      executionName: string,
      options?: ExecutionsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        contextName,
        workflowName,
        versionName,
        executionName,
        options,
      ),
  };
}

export function _getExecutionsOperations(
  context: WorkloadOrchestrationManagementContext,
): ExecutionsOperations {
  return {
    ..._getExecutions(context),
  };
}
