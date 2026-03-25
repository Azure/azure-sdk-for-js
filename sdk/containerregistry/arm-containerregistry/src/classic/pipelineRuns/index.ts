// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerRegistryManagementContext } from "../../api/containerRegistryManagementContext.js";
import { list, $delete, create, get } from "../../api/pipelineRuns/operations.js";
import type {
  PipelineRunsListOptionalParams,
  PipelineRunsDeleteOptionalParams,
  PipelineRunsCreateOptionalParams,
  PipelineRunsGetOptionalParams,
} from "../../api/pipelineRuns/options.js";
import type { PipelineRun } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PipelineRuns operations. */
export interface PipelineRunsOperations {
  /** Lists all the pipeline runs for the specified container registry. */
  list: (
    resourceGroupName: string,
    registryName: string,
    options?: PipelineRunsListOptionalParams,
  ) => PagedAsyncIterableIterator<PipelineRun>;
  /** Deletes a pipeline run from a container registry. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    registryName: string,
    pipelineRunName: string,
    options?: PipelineRunsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    registryName: string,
    pipelineRunName: string,
    options?: PipelineRunsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    registryName: string,
    pipelineRunName: string,
    options?: PipelineRunsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a pipeline run for a container registry with the specified parameters */
  create: (
    resourceGroupName: string,
    registryName: string,
    pipelineRunName: string,
    pipelineRunCreateParameters: PipelineRun,
    options?: PipelineRunsCreateOptionalParams,
  ) => PollerLike<OperationState<PipelineRun>, PipelineRun>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    registryName: string,
    pipelineRunName: string,
    pipelineRunCreateParameters: PipelineRun,
    options?: PipelineRunsCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<PipelineRun>, PipelineRun>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    registryName: string,
    pipelineRunName: string,
    pipelineRunCreateParameters: PipelineRun,
    options?: PipelineRunsCreateOptionalParams,
  ) => Promise<PipelineRun>;
  /** Gets the detailed information for a given pipeline run. */
  get: (
    resourceGroupName: string,
    registryName: string,
    pipelineRunName: string,
    options?: PipelineRunsGetOptionalParams,
  ) => Promise<PipelineRun>;
}

function _getPipelineRuns(context: ContainerRegistryManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      registryName: string,
      options?: PipelineRunsListOptionalParams,
    ) => list(context, resourceGroupName, registryName, options),
    delete: (
      resourceGroupName: string,
      registryName: string,
      pipelineRunName: string,
      options?: PipelineRunsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, registryName, pipelineRunName, options),
    beginDelete: async (
      resourceGroupName: string,
      registryName: string,
      pipelineRunName: string,
      options?: PipelineRunsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, registryName, pipelineRunName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      registryName: string,
      pipelineRunName: string,
      options?: PipelineRunsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, registryName, pipelineRunName, options);
    },
    create: (
      resourceGroupName: string,
      registryName: string,
      pipelineRunName: string,
      pipelineRunCreateParameters: PipelineRun,
      options?: PipelineRunsCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        registryName,
        pipelineRunName,
        pipelineRunCreateParameters,
        options,
      ),
    beginCreate: async (
      resourceGroupName: string,
      registryName: string,
      pipelineRunName: string,
      pipelineRunCreateParameters: PipelineRun,
      options?: PipelineRunsCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        registryName,
        pipelineRunName,
        pipelineRunCreateParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      registryName: string,
      pipelineRunName: string,
      pipelineRunCreateParameters: PipelineRun,
      options?: PipelineRunsCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        registryName,
        pipelineRunName,
        pipelineRunCreateParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      registryName: string,
      pipelineRunName: string,
      options?: PipelineRunsGetOptionalParams,
    ) => get(context, resourceGroupName, registryName, pipelineRunName, options),
  };
}

export function _getPipelineRunsOperations(
  context: ContainerRegistryManagementContext,
): PipelineRunsOperations {
  return {
    ..._getPipelineRuns(context),
  };
}
