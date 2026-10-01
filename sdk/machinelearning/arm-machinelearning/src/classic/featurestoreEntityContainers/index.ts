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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: FeaturestoreEntityContainersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: FeaturestoreEntityContainersDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: FeaturestoreEntityContainersDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update container. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    body: FeaturestoreEntityContainer,
    options?: FeaturestoreEntityContainersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<FeaturestoreEntityContainer>, FeaturestoreEntityContainer>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    body: FeaturestoreEntityContainer,
    options?: FeaturestoreEntityContainersCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<FeaturestoreEntityContainer>, FeaturestoreEntityContainer>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    body: FeaturestoreEntityContainer,
    options?: FeaturestoreEntityContainersCreateOrUpdateOptionalParams,
  ) => Promise<FeaturestoreEntityContainer>;
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
    beginDelete: async (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: FeaturestoreEntityContainersDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, workspaceName, name, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: FeaturestoreEntityContainersDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, workspaceName, name, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      body: FeaturestoreEntityContainer,
      options?: FeaturestoreEntityContainersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, name, body, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      body: FeaturestoreEntityContainer,
      options?: FeaturestoreEntityContainersCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, workspaceName, name, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      body: FeaturestoreEntityContainer,
      options?: FeaturestoreEntityContainersCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, workspaceName, name, body, options);
    },
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
