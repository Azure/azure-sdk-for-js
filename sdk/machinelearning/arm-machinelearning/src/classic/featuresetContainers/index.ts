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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: FeaturesetContainersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: FeaturesetContainersDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: FeaturesetContainersDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update container. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    body: FeaturesetContainer,
    options?: FeaturesetContainersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<FeaturesetContainer>, FeaturesetContainer>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    body: FeaturesetContainer,
    options?: FeaturesetContainersCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<FeaturesetContainer>, FeaturesetContainer>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    body: FeaturesetContainer,
    options?: FeaturesetContainersCreateOrUpdateOptionalParams,
  ) => Promise<FeaturesetContainer>;
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
    beginDelete: async (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: FeaturesetContainersDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, workspaceName, name, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: FeaturesetContainersDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, workspaceName, name, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      body: FeaturesetContainer,
      options?: FeaturesetContainersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, name, body, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      body: FeaturesetContainer,
      options?: FeaturesetContainersCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, workspaceName, name, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      body: FeaturesetContainer,
      options?: FeaturesetContainersCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, workspaceName, name, body, options);
    },
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
