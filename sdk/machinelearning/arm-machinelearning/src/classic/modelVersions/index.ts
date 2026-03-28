// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import { publish, list, $delete, createOrUpdate, get } from "../../api/modelVersions/operations.js";
import type {
  ModelVersionsPublishOptionalParams,
  ModelVersionsListOptionalParams,
  ModelVersionsDeleteOptionalParams,
  ModelVersionsCreateOrUpdateOptionalParams,
  ModelVersionsGetOptionalParams,
} from "../../api/modelVersions/options.js";
import type { DestinationAsset, ModelVersion } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ModelVersions operations. */
export interface ModelVersionsOperations {
  /** Publish version asset into registry. */
  publish: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    body: DestinationAsset,
    options?: ModelVersionsPublishOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List model versions. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: ModelVersionsListOptionalParams,
  ) => PagedAsyncIterableIterator<ModelVersion>;
  /** Delete version. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    options?: ModelVersionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update version. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    body: ModelVersion,
    options?: ModelVersionsCreateOrUpdateOptionalParams,
  ) => Promise<ModelVersion>;
  /** Get version. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    options?: ModelVersionsGetOptionalParams,
  ) => Promise<ModelVersion>;
}

function _getModelVersions(context: AzureMachineLearningServicesManagementContext) {
  return {
    publish: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      version: string,
      body: DestinationAsset,
      options?: ModelVersionsPublishOptionalParams,
    ) => publish(context, resourceGroupName, workspaceName, name, version, body, options),
    list: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: ModelVersionsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, name, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      version: string,
      options?: ModelVersionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, name, version, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      version: string,
      body: ModelVersion,
      options?: ModelVersionsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, name, version, body, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      version: string,
      options?: ModelVersionsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, name, version, options),
  };
}

export function _getModelVersionsOperations(
  context: AzureMachineLearningServicesManagementContext,
): ModelVersionsOperations {
  return {
    ..._getModelVersions(context),
  };
}
