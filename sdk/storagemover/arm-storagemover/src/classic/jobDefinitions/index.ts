// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageMoverContext } from "../../api/storageMoverContext.js";
import {
  stopJob,
  startJob,
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/jobDefinitions/operations.js";
import {
  JobDefinitionsStopJobOptionalParams,
  JobDefinitionsStartJobOptionalParams,
  JobDefinitionsListOptionalParams,
  JobDefinitionsDeleteOptionalParams,
  JobDefinitionsUpdateOptionalParams,
  JobDefinitionsCreateOrUpdateOptionalParams,
  JobDefinitionsGetOptionalParams,
} from "../../api/jobDefinitions/options.js";
import {
  JobDefinition,
  JobDefinitionUpdateParameters,
  JobRunResourceId,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a JobDefinitions operations. */
export interface JobDefinitionsOperations {
  /** Requests the Agent of any active instance of this Job Definition to stop. */
  stopJob: (
    resourceGroupName: string,
    storageMoverName: string,
    projectName: string,
    jobDefinitionName: string,
    options?: JobDefinitionsStopJobOptionalParams,
  ) => Promise<JobRunResourceId>;
  /** Creates a new Job Run resource for the specified Job Definition and passes it to the Agent for execution. */
  startJob: (
    resourceGroupName: string,
    storageMoverName: string,
    projectName: string,
    jobDefinitionName: string,
    options?: JobDefinitionsStartJobOptionalParams,
  ) => Promise<JobRunResourceId>;
  /** Lists all Job Definitions in a Project. */
  list: (
    resourceGroupName: string,
    storageMoverName: string,
    projectName: string,
    options?: JobDefinitionsListOptionalParams,
  ) => PagedAsyncIterableIterator<JobDefinition>;
  /** Deletes a Job Definition resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    storageMoverName: string,
    projectName: string,
    jobDefinitionName: string,
    options?: JobDefinitionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates properties for a Job Definition resource. Properties not specified in the request body will be unchanged. */
  update: (
    resourceGroupName: string,
    storageMoverName: string,
    projectName: string,
    jobDefinitionName: string,
    jobDefinition: JobDefinitionUpdateParameters,
    options?: JobDefinitionsUpdateOptionalParams,
  ) => Promise<JobDefinition>;
  /** Creates or updates a Job Definition resource, which contains configuration for a single unit of managed data transfer. */
  createOrUpdate: (
    resourceGroupName: string,
    storageMoverName: string,
    projectName: string,
    jobDefinitionName: string,
    jobDefinition: JobDefinition,
    options?: JobDefinitionsCreateOrUpdateOptionalParams,
  ) => Promise<JobDefinition>;
  /** Gets a Job Definition resource. */
  get: (
    resourceGroupName: string,
    storageMoverName: string,
    projectName: string,
    jobDefinitionName: string,
    options?: JobDefinitionsGetOptionalParams,
  ) => Promise<JobDefinition>;
}

function _getJobDefinitions(context: StorageMoverContext) {
  return {
    stopJob: (
      resourceGroupName: string,
      storageMoverName: string,
      projectName: string,
      jobDefinitionName: string,
      options?: JobDefinitionsStopJobOptionalParams,
    ) =>
      stopJob(
        context,
        resourceGroupName,
        storageMoverName,
        projectName,
        jobDefinitionName,
        options,
      ),
    startJob: (
      resourceGroupName: string,
      storageMoverName: string,
      projectName: string,
      jobDefinitionName: string,
      options?: JobDefinitionsStartJobOptionalParams,
    ) =>
      startJob(
        context,
        resourceGroupName,
        storageMoverName,
        projectName,
        jobDefinitionName,
        options,
      ),
    list: (
      resourceGroupName: string,
      storageMoverName: string,
      projectName: string,
      options?: JobDefinitionsListOptionalParams,
    ) => list(context, resourceGroupName, storageMoverName, projectName, options),
    delete: (
      resourceGroupName: string,
      storageMoverName: string,
      projectName: string,
      jobDefinitionName: string,
      options?: JobDefinitionsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        storageMoverName,
        projectName,
        jobDefinitionName,
        options,
      ),
    update: (
      resourceGroupName: string,
      storageMoverName: string,
      projectName: string,
      jobDefinitionName: string,
      jobDefinition: JobDefinitionUpdateParameters,
      options?: JobDefinitionsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        storageMoverName,
        projectName,
        jobDefinitionName,
        jobDefinition,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      storageMoverName: string,
      projectName: string,
      jobDefinitionName: string,
      jobDefinition: JobDefinition,
      options?: JobDefinitionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        storageMoverName,
        projectName,
        jobDefinitionName,
        jobDefinition,
        options,
      ),
    get: (
      resourceGroupName: string,
      storageMoverName: string,
      projectName: string,
      jobDefinitionName: string,
      options?: JobDefinitionsGetOptionalParams,
    ) => get(context, resourceGroupName, storageMoverName, projectName, jobDefinitionName, options),
  };
}

export function _getJobDefinitionsOperations(
  context: StorageMoverContext,
): JobDefinitionsOperations {
  return {
    ..._getJobDefinitions(context),
  };
}
