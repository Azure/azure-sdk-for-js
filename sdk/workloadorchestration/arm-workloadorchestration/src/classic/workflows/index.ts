// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementContext } from "../../api/workloadOrchestrationManagementContext.js";
import {
  listByContext,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/workflows/operations.js";
import {
  WorkflowsListByContextOptionalParams,
  WorkflowsDeleteOptionalParams,
  WorkflowsUpdateOptionalParams,
  WorkflowsCreateOrUpdateOptionalParams,
  WorkflowsGetOptionalParams,
} from "../../api/workflows/options.js";
import { Workflow } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Workflows operations. */
export interface WorkflowsOperations {
  /** List Workflow resources */
  listByContext: (
    resourceGroupName: string,
    contextName: string,
    options?: WorkflowsListByContextOptionalParams,
  ) => PagedAsyncIterableIterator<Workflow>;
  /** Delete a Workflow resource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    contextName: string,
    workflowName: string,
    options?: WorkflowsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** update a Workflow resource */
  update: (
    resourceGroupName: string,
    contextName: string,
    workflowName: string,
    properties: Workflow,
    options?: WorkflowsUpdateOptionalParams,
  ) => PollerLike<OperationState<Workflow>, Workflow>;
  /** Create or update a Workflow resource */
  createOrUpdate: (
    resourceGroupName: string,
    contextName: string,
    workflowName: string,
    resource: Workflow,
    options?: WorkflowsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Workflow>, Workflow>;
  /** Get a Workflow resource */
  get: (
    resourceGroupName: string,
    contextName: string,
    workflowName: string,
    options?: WorkflowsGetOptionalParams,
  ) => Promise<Workflow>;
}

function _getWorkflows(context: WorkloadOrchestrationManagementContext) {
  return {
    listByContext: (
      resourceGroupName: string,
      contextName: string,
      options?: WorkflowsListByContextOptionalParams,
    ) => listByContext(context, resourceGroupName, contextName, options),
    delete: (
      resourceGroupName: string,
      contextName: string,
      workflowName: string,
      options?: WorkflowsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, contextName, workflowName, options),
    update: (
      resourceGroupName: string,
      contextName: string,
      workflowName: string,
      properties: Workflow,
      options?: WorkflowsUpdateOptionalParams,
    ) => update(context, resourceGroupName, contextName, workflowName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      contextName: string,
      workflowName: string,
      resource: Workflow,
      options?: WorkflowsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, contextName, workflowName, resource, options),
    get: (
      resourceGroupName: string,
      contextName: string,
      workflowName: string,
      options?: WorkflowsGetOptionalParams,
    ) => get(context, resourceGroupName, contextName, workflowName, options),
  };
}

export function _getWorkflowsOperations(
  context: WorkloadOrchestrationManagementContext,
): WorkflowsOperations {
  return {
    ..._getWorkflows(context),
  };
}
