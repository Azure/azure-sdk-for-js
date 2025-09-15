// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerRegistryManagementContext } from "../../api/containerRegistryManagementContext.js";
import { list, $delete, create, get } from "../../api/importPipelines/operations.js";
import type {
  ImportPipelinesListOptionalParams,
  ImportPipelinesDeleteOptionalParams,
  ImportPipelinesCreateOptionalParams,
  ImportPipelinesGetOptionalParams,
} from "../../api/importPipelines/options.js";
import type { ImportPipeline } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ImportPipelines operations. */
export interface ImportPipelinesOperations {
  /** Lists all import pipelines for the specified container registry. */
  list: (
    resourceGroupName: string,
    registryName: string,
    options?: ImportPipelinesListOptionalParams,
  ) => PagedAsyncIterableIterator<ImportPipeline>;
  /** Deletes an import pipeline from a container registry. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    registryName: string,
    importPipelineName: string,
    options?: ImportPipelinesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Creates an import pipeline for a container registry with the specified parameters. */
  create: (
    resourceGroupName: string,
    registryName: string,
    importPipelineName: string,
    importPipelineCreateParameters: ImportPipeline,
    options?: ImportPipelinesCreateOptionalParams,
  ) => PollerLike<OperationState<ImportPipeline>, ImportPipeline>;
  /** Gets the properties of the import pipeline. */
  get: (
    resourceGroupName: string,
    registryName: string,
    importPipelineName: string,
    options?: ImportPipelinesGetOptionalParams,
  ) => Promise<ImportPipeline>;
}

function _getImportPipelines(context: ContainerRegistryManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      registryName: string,
      options?: ImportPipelinesListOptionalParams,
    ) => list(context, resourceGroupName, registryName, options),
    delete: (
      resourceGroupName: string,
      registryName: string,
      importPipelineName: string,
      options?: ImportPipelinesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, registryName, importPipelineName, options),
    create: (
      resourceGroupName: string,
      registryName: string,
      importPipelineName: string,
      importPipelineCreateParameters: ImportPipeline,
      options?: ImportPipelinesCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        registryName,
        importPipelineName,
        importPipelineCreateParameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      registryName: string,
      importPipelineName: string,
      options?: ImportPipelinesGetOptionalParams,
    ) => get(context, resourceGroupName, registryName, importPipelineName, options),
  };
}

export function _getImportPipelinesOperations(
  context: ContainerRegistryManagementContext,
): ImportPipelinesOperations {
  return {
    ..._getImportPipelines(context),
  };
}
