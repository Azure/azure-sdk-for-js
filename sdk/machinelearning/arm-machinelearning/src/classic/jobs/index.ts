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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use cancel instead */
  beginCancel: (
    resourceGroupName: string,
    workspaceName: string,
    id: string,
    options?: JobsCancelOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use cancel instead */
  beginCancelAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    id: string,
    options?: JobsCancelOptionalParams,
  ) => Promise<void>;
  /** Lists Jobs in the workspace. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: JobsListOptionalParams,
  ) => PagedAsyncIterableIterator<JobBase>;
  /** Deletes a Job (asynchronous). */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    id: string,
    options?: JobsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    workspaceName: string,
    id: string,
    options?: JobsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    id: string,
    options?: JobsDeleteOptionalParams,
  ) => Promise<void>;
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
    beginCancel: async (
      resourceGroupName: string,
      workspaceName: string,
      id: string,
      options?: JobsCancelOptionalParams,
    ) => {
      const poller = cancel(context, resourceGroupName, workspaceName, id, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCancelAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      id: string,
      options?: JobsCancelOptionalParams,
    ) => {
      return await cancel(context, resourceGroupName, workspaceName, id, options);
    },
    list: (resourceGroupName: string, workspaceName: string, options?: JobsListOptionalParams) =>
      list(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      id: string,
      options?: JobsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, id, options),
    beginDelete: async (
      resourceGroupName: string,
      workspaceName: string,
      id: string,
      options?: JobsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, workspaceName, id, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      id: string,
      options?: JobsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, workspaceName, id, options);
    },
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
