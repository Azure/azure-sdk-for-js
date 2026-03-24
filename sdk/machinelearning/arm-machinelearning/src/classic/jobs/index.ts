// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import { cancel, list, $delete, createOrUpdate, get } from "../../api/jobs/operations.js";
import type {
  JobsCancelOptionalParams,
  JobsListOptionalParams,
  JobsDeleteOptionalParams,
  JobsCreateOrUpdateOptionalParams,
  JobsGetOptionalParams,
} from "../../api/jobs/options.js";
import type { JobBase } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Jobs operations. */
export interface JobsOperations {
  /** Cancels a Job (asynchronous). */
  cancel: (
    resourceGroupName: string,
    workspaceName: string,
    id: string,
    options?: JobsCancelOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Lists Jobs in the workspace. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: JobsListOptionalParams,
  ) => PagedAsyncIterableIterator<JobBase>;
  /** Deletes a Job (asynchronous). */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    id: string,
    options?: JobsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /**
   * Creates and executes a Job.
   * For update case, the Tags in the definition passed in will replace Tags in the existing job.
   */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    id: string,
    body: JobBase,
    options?: JobsCreateOrUpdateOptionalParams,
  ) => Promise<JobBase>;
  /** Gets a Job by name/id. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    id: string,
    options?: JobsGetOptionalParams,
  ) => Promise<JobBase>;
}

function _getJobs(context: AzureMachineLearningServicesManagementContext) {
  return {
    cancel: (
      resourceGroupName: string,
      workspaceName: string,
      id: string,
      options?: JobsCancelOptionalParams,
    ) => cancel(context, resourceGroupName, workspaceName, id, options),
    list: (resourceGroupName: string, workspaceName: string, options?: JobsListOptionalParams) =>
      list(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      id: string,
      options?: JobsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, id, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      id: string,
      body: JobBase,
      options?: JobsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, id, body, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      id: string,
      options?: JobsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, id, options),
  };
}

export function _getJobsOperations(
  context: AzureMachineLearningServicesManagementContext,
): JobsOperations {
  return {
    ..._getJobs(context),
  };
}
