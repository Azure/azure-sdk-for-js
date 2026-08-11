// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext } from "../../api/containerServiceContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/modelSources/operations.js";
import type {
  ModelSourcesListOptionalParams,
  ModelSourcesDeleteOptionalParams,
  ModelSourcesCreateOrUpdateOptionalParams,
  ModelSourcesGetOptionalParams,
} from "../../api/modelSources/options.js";
import type { ModelSource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ModelSources operations. */
export interface ModelSourcesOperations {
  /** List ModelSource resources by AIManager */
  list: (
    resourceGroupName: string,
    aiManagerName: string,
    options?: ModelSourcesListOptionalParams,
  ) => PagedAsyncIterableIterator<ModelSource>;
  /** Delete a ModelSource */
  delete: (
    resourceGroupName: string,
    aiManagerName: string,
    modelSourceName: string,
    options?: ModelSourcesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or update a `ModelSource`. This is a full-replace operation: any optional property omitted from the request body is reset to its default value, or cleared if it has no default. To safely modify a subset of fields, perform a GET, modify the returned resource, and PUT it back using the returned ETag via the `If-Match` header to avoid concurrent overwrites. */
  createOrUpdate: (
    resourceGroupName: string,
    aiManagerName: string,
    modelSourceName: string,
    resource: ModelSource,
    options?: ModelSourcesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ModelSource>, ModelSource>;
  /** Get a ModelSource */
  get: (
    resourceGroupName: string,
    aiManagerName: string,
    modelSourceName: string,
    options?: ModelSourcesGetOptionalParams,
  ) => Promise<ModelSource>;
}
function _getModelSources(context: ContainerServiceContext) {
  return {
    list: (
      resourceGroupName: string,
      aiManagerName: string,
      options?: ModelSourcesListOptionalParams,
    ) => list(context, resourceGroupName, aiManagerName, options),
    delete: (
      resourceGroupName: string,
      aiManagerName: string,
      modelSourceName: string,
      options?: ModelSourcesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, aiManagerName, modelSourceName, options),
    createOrUpdate: (
      resourceGroupName: string,
      aiManagerName: string,
      modelSourceName: string,
      resource: ModelSource,
      options?: ModelSourcesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, aiManagerName, modelSourceName, resource, options),
    get: (
      resourceGroupName: string,
      aiManagerName: string,
      modelSourceName: string,
      options?: ModelSourcesGetOptionalParams,
    ) => get(context, resourceGroupName, aiManagerName, modelSourceName, options),
  };
}
export function _getModelSourcesOperations(
  context: ContainerServiceContext,
): ModelSourcesOperations {
  return {
    ..._getModelSources(context),
  };
}
