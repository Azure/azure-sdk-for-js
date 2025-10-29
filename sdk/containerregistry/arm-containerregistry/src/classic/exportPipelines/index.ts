// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerRegistryManagementContext } from "../../api/containerRegistryManagementContext.js";
import { list, $delete, create, get } from "../../api/exportPipelines/operations.js";
import type {
  ExportPipelinesListOptionalParams,
  ExportPipelinesDeleteOptionalParams,
  ExportPipelinesCreateOptionalParams,
  ExportPipelinesGetOptionalParams,
} from "../../api/exportPipelines/options.js";
import type { ExportPipeline } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ExportPipelines operations. */
export interface ExportPipelinesOperations {
  /** Lists all export pipelines for the specified container registry. */
  list: (
    resourceGroupName: string,
    registryName: string,
    options?: ExportPipelinesListOptionalParams,
  ) => PagedAsyncIterableIterator<ExportPipeline>;
  /** Deletes an export pipeline from a container registry. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    registryName: string,
    exportPipelineName: string,
    options?: ExportPipelinesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Creates an export pipeline for a container registry with the specified parameters. */
  create: (
    resourceGroupName: string,
    registryName: string,
    exportPipelineName: string,
    exportPipelineCreateParameters: ExportPipeline,
    options?: ExportPipelinesCreateOptionalParams,
  ) => PollerLike<OperationState<ExportPipeline>, ExportPipeline>;
  /** Gets the properties of the export pipeline. */
  get: (
    resourceGroupName: string,
    registryName: string,
    exportPipelineName: string,
    options?: ExportPipelinesGetOptionalParams,
  ) => Promise<ExportPipeline>;
}

function _getExportPipelines(context: ContainerRegistryManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      registryName: string,
      options?: ExportPipelinesListOptionalParams,
    ) => list(context, resourceGroupName, registryName, options),
    delete: (
      resourceGroupName: string,
      registryName: string,
      exportPipelineName: string,
      options?: ExportPipelinesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, registryName, exportPipelineName, options),
    create: (
      resourceGroupName: string,
      registryName: string,
      exportPipelineName: string,
      exportPipelineCreateParameters: ExportPipeline,
      options?: ExportPipelinesCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        registryName,
        exportPipelineName,
        exportPipelineCreateParameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      registryName: string,
      exportPipelineName: string,
      options?: ExportPipelinesGetOptionalParams,
    ) => get(context, resourceGroupName, registryName, exportPipelineName, options),
  };
}

export function _getExportPipelinesOperations(
  context: ContainerRegistryManagementContext,
): ExportPipelinesOperations {
  return {
    ..._getExportPipelines(context),
  };
}
