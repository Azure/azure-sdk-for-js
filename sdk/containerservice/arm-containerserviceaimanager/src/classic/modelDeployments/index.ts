// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext } from "../../api/containerServiceContext.js";
import {
  listByAIManagerNamespace,
  $delete,
  createOrUpdate,
  get,
} from "../../api/modelDeployments/operations.js";
import type {
  ModelDeploymentsListByAIManagerNamespaceOptionalParams,
  ModelDeploymentsDeleteOptionalParams,
  ModelDeploymentsCreateOrUpdateOptionalParams,
  ModelDeploymentsGetOptionalParams,
} from "../../api/modelDeployments/options.js";
import type { ModelDeployment } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ModelDeployments operations. */
export interface ModelDeploymentsOperations {
  /** List ModelDeployment resources by AIManagerNamespace */
  listByAIManagerNamespace: (
    resourceGroupName: string,
    aiManagerName: string,
    namespaceName: string,
    options?: ModelDeploymentsListByAIManagerNamespaceOptionalParams,
  ) => PagedAsyncIterableIterator<ModelDeployment>;
  /** Delete a ModelDeployment */
  delete: (
    resourceGroupName: string,
    aiManagerName: string,
    namespaceName: string,
    modelDeploymentName: string,
    options?: ModelDeploymentsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or update a `ModelDeployment`. This is a full-replace operation: any optional property omitted from the request body is reset to its default value, or cleared if it has no default. To safely modify a subset of fields, perform a GET, modify the returned resource, and PUT it back using the returned ETag via the `If-Match` header to avoid concurrent overwrites. */
  createOrUpdate: (
    resourceGroupName: string,
    aiManagerName: string,
    namespaceName: string,
    modelDeploymentName: string,
    resource: ModelDeployment,
    options?: ModelDeploymentsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ModelDeployment>, ModelDeployment>;
  /** Get a ModelDeployment */
  get: (
    resourceGroupName: string,
    aiManagerName: string,
    namespaceName: string,
    modelDeploymentName: string,
    options?: ModelDeploymentsGetOptionalParams,
  ) => Promise<ModelDeployment>;
}
function _getModelDeployments(context: ContainerServiceContext) {
  return {
    listByAIManagerNamespace: (
      resourceGroupName: string,
      aiManagerName: string,
      namespaceName: string,
      options?: ModelDeploymentsListByAIManagerNamespaceOptionalParams,
    ) =>
      listByAIManagerNamespace(context, resourceGroupName, aiManagerName, namespaceName, options),
    delete: (
      resourceGroupName: string,
      aiManagerName: string,
      namespaceName: string,
      modelDeploymentName: string,
      options?: ModelDeploymentsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        aiManagerName,
        namespaceName,
        modelDeploymentName,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      aiManagerName: string,
      namespaceName: string,
      modelDeploymentName: string,
      resource: ModelDeployment,
      options?: ModelDeploymentsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        aiManagerName,
        namespaceName,
        modelDeploymentName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      aiManagerName: string,
      namespaceName: string,
      modelDeploymentName: string,
      options?: ModelDeploymentsGetOptionalParams,
    ) =>
      get(context, resourceGroupName, aiManagerName, namespaceName, modelDeploymentName, options),
  };
}
export function _getModelDeploymentsOperations(
  context: ContainerServiceContext,
): ModelDeploymentsOperations {
  return {
    ..._getModelDeployments(context),
  };
}
