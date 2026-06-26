// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeveloperHubServiceContext } from "../../api/developerHubServiceContext.js";
import {
  list,
  listByResourceGroup,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/workflowOperations/operations.js";
import {
  WorkflowOperationsListOptionalParams,
  WorkflowOperationsListByResourceGroupOptionalParams,
  WorkflowOperationsDeleteOptionalParams,
  WorkflowOperationsUpdateTagsOptionalParams,
  WorkflowOperationsCreateOrUpdateOptionalParams,
  WorkflowOperationsGetOptionalParams,
} from "../../api/workflowOperations/options.js";
import { TagsObject, Workflow, DeleteWorkflowResponse } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WorkflowOperations operations. */
export interface WorkflowOperationsOperations {
  /** Gets a list of workflows associated with the specified subscription. */
  list: (options?: WorkflowOperationsListOptionalParams) => PagedAsyncIterableIterator<Workflow>;
  /** Gets a list of workflows within a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: WorkflowOperationsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Workflow>;
  /** Deletes a workflow */
  delete: (
    resourceGroupName: string,
    workflowName: string,
    options?: WorkflowOperationsDeleteOptionalParams,
  ) => Promise<DeleteWorkflowResponse | undefined>;
  /** Updates tags on a workflow. */
  updateTags: (
    resourceGroupName: string,
    workflowName: string,
    parameters: TagsObject,
    options?: WorkflowOperationsUpdateTagsOptionalParams,
  ) => Promise<Workflow>;
  /** Creates or updates a workflow */
  createOrUpdate: (
    resourceGroupName: string,
    workflowName: string,
    parameters: Workflow,
    options?: WorkflowOperationsCreateOrUpdateOptionalParams,
  ) => Promise<Workflow>;
  /** Gets a workflow. */
  get: (
    resourceGroupName: string,
    workflowName: string,
    options?: WorkflowOperationsGetOptionalParams,
  ) => Promise<Workflow>;
}

function _getWorkflowOperations(context: DeveloperHubServiceContext) {
  return {
    list: (options?: WorkflowOperationsListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: WorkflowOperationsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      workflowName: string,
      options?: WorkflowOperationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workflowName, options),
    updateTags: (
      resourceGroupName: string,
      workflowName: string,
      parameters: TagsObject,
      options?: WorkflowOperationsUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, workflowName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      workflowName: string,
      parameters: Workflow,
      options?: WorkflowOperationsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workflowName, parameters, options),
    get: (
      resourceGroupName: string,
      workflowName: string,
      options?: WorkflowOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, workflowName, options),
  };
}

export function _getWorkflowOperationsOperations(
  context: DeveloperHubServiceContext,
): WorkflowOperationsOperations {
  return {
    ..._getWorkflowOperations(context),
  };
}
