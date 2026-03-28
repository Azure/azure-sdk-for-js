// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  getEntity,
} from "../../api/featurestoreEntityContainers/operations.js";
import type {
  FeaturestoreEntityContainersListOptionalParams,
  FeaturestoreEntityContainersDeleteOptionalParams,
  FeaturestoreEntityContainersCreateOrUpdateOptionalParams,
  FeaturestoreEntityContainersGetEntityOptionalParams,
} from "../../api/featurestoreEntityContainers/options.js";
import type { FeaturestoreEntityContainer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a FeaturestoreEntityContainers operations. */
export interface FeaturestoreEntityContainersOperations {
  /** List featurestore entity containers. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: FeaturestoreEntityContainersListOptionalParams,
  ) => PagedAsyncIterableIterator<FeaturestoreEntityContainer>;
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
    options?: FeaturestoreEntityContainersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or update container. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    body: FeaturestoreEntityContainer,
    options?: FeaturestoreEntityContainersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<FeaturestoreEntityContainer>, FeaturestoreEntityContainer>;
  /** Get container. */
  getEntity: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: FeaturestoreEntityContainersGetEntityOptionalParams,
  ) => Promise<FeaturestoreEntityContainer>;
}

function _getFeaturestoreEntityContainers(context: AzureMachineLearningServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: FeaturestoreEntityContainersListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: FeaturestoreEntityContainersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, name, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      body: FeaturestoreEntityContainer,
      options?: FeaturestoreEntityContainersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, name, body, options),
    getEntity: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: FeaturestoreEntityContainersGetEntityOptionalParams,
    ) => getEntity(context, resourceGroupName, workspaceName, name, options),
  };
}

export function _getFeaturestoreEntityContainersOperations(
  context: AzureMachineLearningServicesManagementContext,
): FeaturestoreEntityContainersOperations {
  return {
    ..._getFeaturestoreEntityContainers(context),
  };
}
