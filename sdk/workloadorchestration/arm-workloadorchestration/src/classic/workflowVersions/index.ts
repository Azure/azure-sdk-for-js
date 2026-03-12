// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementContext } from "../../api/workloadOrchestrationManagementContext.js";
import {
  listByWorkflow,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/workflowVersions/operations.js";
import {
  WorkflowVersionsListByWorkflowOptionalParams,
  WorkflowVersionsDeleteOptionalParams,
  WorkflowVersionsUpdateOptionalParams,
  WorkflowVersionsCreateOrUpdateOptionalParams,
  WorkflowVersionsGetOptionalParams,
} from "../../api/workflowVersions/options.js";
import { WorkflowVersion } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a WorkflowVersions operations. */
export interface WorkflowVersionsOperations {
  /** List Workflow Version Resources */
  listByWorkflow: (
    resourceGroupName: string,
    contextName: string,
    workflowName: string,
    options?: WorkflowVersionsListByWorkflowOptionalParams,
  ) => PagedAsyncIterableIterator<WorkflowVersion>;
  /** Delete a Workflow Version Resource */
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
    options?: WorkflowVersionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** update an WorkflowVersion Resource */
  update: (
    resourceGroupName: string,
    contextName: string,
    workflowName: string,
    versionName: string,
    properties: WorkflowVersion,
    options?: WorkflowVersionsUpdateOptionalParams,
  ) => PollerLike<OperationState<WorkflowVersion>, WorkflowVersion>;
  /** Create or update a Workflow Version Resource */
  createOrUpdate: (
    resourceGroupName: string,
    contextName: string,
    workflowName: string,
    versionName: string,
    resource: WorkflowVersion,
    options?: WorkflowVersionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<WorkflowVersion>, WorkflowVersion>;
  /** Get a Workflow Version Resource */
  get: (
    resourceGroupName: string,
    contextName: string,
    workflowName: string,
    versionName: string,
    options?: WorkflowVersionsGetOptionalParams,
  ) => Promise<WorkflowVersion>;
}

function _getWorkflowVersions(context: WorkloadOrchestrationManagementContext) {
  return {
    listByWorkflow: (
      resourceGroupName: string,
      contextName: string,
      workflowName: string,
      options?: WorkflowVersionsListByWorkflowOptionalParams,
    ) => listByWorkflow(context, resourceGroupName, contextName, workflowName, options),
    delete: (
      resourceGroupName: string,
      contextName: string,
      workflowName: string,
      versionName: string,
      options?: WorkflowVersionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, contextName, workflowName, versionName, options),
    update: (
      resourceGroupName: string,
      contextName: string,
      workflowName: string,
      versionName: string,
      properties: WorkflowVersion,
      options?: WorkflowVersionsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        contextName,
        workflowName,
        versionName,
        properties,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      contextName: string,
      workflowName: string,
      versionName: string,
      resource: WorkflowVersion,
      options?: WorkflowVersionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        contextName,
        workflowName,
        versionName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      contextName: string,
      workflowName: string,
      versionName: string,
      options?: WorkflowVersionsGetOptionalParams,
    ) => get(context, resourceGroupName, contextName, workflowName, versionName, options),
  };
}

export function _getWorkflowVersionsOperations(
  context: WorkloadOrchestrationManagementContext,
): WorkflowVersionsOperations {
  return {
    ..._getWorkflowVersions(context),
  };
}
