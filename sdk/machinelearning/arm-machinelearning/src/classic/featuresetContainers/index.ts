// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  getEntity,
} from "../../api/featuresetContainers/operations.js";
import type {
  FeaturesetContainersListOptionalParams,
  FeaturesetContainersDeleteOptionalParams,
  FeaturesetContainersCreateOrUpdateOptionalParams,
  FeaturesetContainersGetEntityOptionalParams,
} from "../../api/featuresetContainers/options.js";
import type { FeaturesetContainer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a FeaturesetContainers operations. */
export interface FeaturesetContainersOperations {
  /** List featurestore entity containers. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: FeaturesetContainersListOptionalParams,
  ) => PagedAsyncIterableIterator<FeaturesetContainer>;
  /** Delete container. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
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
