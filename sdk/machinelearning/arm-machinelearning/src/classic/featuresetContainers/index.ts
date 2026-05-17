// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  getEntity,
} from "../../api/featuresetContainers/operations.js";
import {
  FeaturesetContainersListOptionalParams,
  FeaturesetContainersDeleteOptionalParams,
  FeaturesetContainersCreateOrUpdateOptionalParams,
  FeaturesetContainersGetEntityOptionalParams,
} from "../../api/featuresetContainers/options.js";
import { FeaturesetContainer } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a FeaturesetContainers operations. */
export interface FeaturesetContainersOperations {
  /** List featurestore entity containers. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: FeaturesetContainersListOptionalParams,
  ) => PagedAsyncIterableIterator<FeaturesetContainer>;
  /** Delete container. */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: FeaturesetContainersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or update container. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    body: FeaturesetContainer,
    options?: FeaturesetContainersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<FeaturesetContainer>, FeaturesetContainer>;
  /** Get container. */
  getEntity: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: FeaturesetContainersGetEntityOptionalParams,
  ) => Promise<FeaturesetContainer>;
}

function _getFeaturesetContainers(context: AzureMachineLearningServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: FeaturesetContainersListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: FeaturesetContainersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, name, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      body: FeaturesetContainer,
      options?: FeaturesetContainersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, name, body, options),
    getEntity: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: FeaturesetContainersGetEntityOptionalParams,
    ) => getEntity(context, resourceGroupName, workspaceName, name, options),
  };
}

export function _getFeaturesetContainersOperations(
  context: AzureMachineLearningServicesManagementContext,
): FeaturesetContainersOperations {
  return {
    ..._getFeaturesetContainers(context),
  };
}
