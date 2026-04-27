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
} from "../../api/workflow/operations.js";
import {
  WorkflowListOptionalParams,
  WorkflowListByResourceGroupOptionalParams,
  WorkflowDeleteOptionalParams,
  WorkflowUpdateTagsOptionalParams,
  WorkflowCreateOrUpdateOptionalParams,
  WorkflowGetOptionalParams,
} from "../../api/workflow/options.js";
import { TagsObject, Workflow, DeleteWorkflowResponse } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Workflow operations. */
export interface WorkflowOperations {
  /** Gets a list of workflows associated with the specified subscription. */
  list: (options?: WorkflowListOptionalParams) => PagedAsyncIterableIterator<Workflow>;
  /** Gets a list of workflows within a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: WorkflowListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Workflow>;
  /** Deletes a workflow */
  delete: (
    resourceGroupName: string,
    workflowName: string,
    options?: WorkflowDeleteOptionalParams,
  ) => Promise<DeleteWorkflowResponse>;
  /** Updates tags on a workflow. */
  updateTags: (
    resourceGroupName: string,
    workflowName: string,
    parameters: TagsObject,
    options?: WorkflowUpdateTagsOptionalParams,
  ) => Promise<Workflow>;
  /** Creates or updates a workflow */
  createOrUpdate: (
    resourceGroupName: string,
    workflowName: string,
    parameters: Workflow,
    options?: WorkflowCreateOrUpdateOptionalParams,
  ) => Promise<Workflow>;
  /** Gets a workflow. */
  get: (
    resourceGroupName: string,
    workflowName: string,
    options?: WorkflowGetOptionalParams,
  ) => Promise<Workflow>;
}

function _getWorkflow(context: DeveloperHubServiceContext) {
  return {
    list: (options?: WorkflowListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: WorkflowListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      workflowName: string,
      options?: WorkflowDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workflowName, options),
    updateTags: (
      resourceGroupName: string,
      workflowName: string,
      parameters: TagsObject,
      options?: WorkflowUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, workflowName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      workflowName: string,
      parameters: Workflow,
      options?: WorkflowCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workflowName, parameters, options),
    get: (resourceGroupName: string, workflowName: string, options?: WorkflowGetOptionalParams) =>
      get(context, resourceGroupName, workflowName, options),
  };
}

export function _getWorkflowOperations(context: DeveloperHubServiceContext): WorkflowOperations {
  return {
    ..._getWorkflow(context),
  };
}
