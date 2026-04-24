// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataFactoryManagementContext } from "../../api/dataFactoryManagementContext.js";
import {
  createRun,
  listByFactory,
  $delete,
  createOrUpdate,
  get,
} from "../../api/pipelines/operations.js";
import type {
  PipelinesCreateRunOptionalParams,
  PipelinesListByFactoryOptionalParams,
  PipelinesDeleteOptionalParams,
  PipelinesCreateOrUpdateOptionalParams,
  PipelinesGetOptionalParams,
} from "../../api/pipelines/options.js";
import type { PipelineResource, CreateRunResponse } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Pipelines operations. */
export interface PipelinesOperations {
  /** Creates a run of a pipeline. */
  createRun: (
    resourceGroupName: string,
    factoryName: string,
    pipelineName: string,
    options?: PipelinesCreateRunOptionalParams,
  ) => Promise<CreateRunResponse>;
  /** Lists pipelines. */
  listByFactory: (
    resourceGroupName: string,
    factoryName: string,
    options?: PipelinesListByFactoryOptionalParams,
  ) => PagedAsyncIterableIterator<PipelineResource>;
  /** Deletes a pipeline. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    factoryName: string,
    pipelineName: string,
    options?: PipelinesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a pipeline. */
  createOrUpdate: (
    resourceGroupName: string,
    factoryName: string,
    pipelineName: string,
    pipeline: PipelineResource,
    options?: PipelinesCreateOrUpdateOptionalParams,
  ) => Promise<PipelineResource>;
  /** Gets a pipeline. */
  get: (
    resourceGroupName: string,
    factoryName: string,
    pipelineName: string,
    options?: PipelinesGetOptionalParams,
  ) => Promise<PipelineResource>;
}

function _getPipelines(context: DataFactoryManagementContext) {
  return {
    createRun: (
      resourceGroupName: string,
      factoryName: string,
      pipelineName: string,
      options?: PipelinesCreateRunOptionalParams,
    ) => createRun(context, resourceGroupName, factoryName, pipelineName, options),
    listByFactory: (
      resourceGroupName: string,
      factoryName: string,
      options?: PipelinesListByFactoryOptionalParams,
    ) => listByFactory(context, resourceGroupName, factoryName, options),
    delete: (
      resourceGroupName: string,
      factoryName: string,
      pipelineName: string,
      options?: PipelinesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, factoryName, pipelineName, options),
    createOrUpdate: (
      resourceGroupName: string,
      factoryName: string,
      pipelineName: string,
      pipeline: PipelineResource,
      options?: PipelinesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, factoryName, pipelineName, pipeline, options),
    get: (
      resourceGroupName: string,
      factoryName: string,
      pipelineName: string,
      options?: PipelinesGetOptionalParams,
    ) => get(context, resourceGroupName, factoryName, pipelineName, options),
  };
}

export function _getPipelinesOperations(
  context: DataFactoryManagementContext,
): PipelinesOperations {
  return {
    ..._getPipelines(context),
  };
}
