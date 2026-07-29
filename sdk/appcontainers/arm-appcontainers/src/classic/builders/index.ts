// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/builders/operations.js";
import {
  BuildersListBySubscriptionOptionalParams,
  BuildersListByResourceGroupOptionalParams,
  BuildersDeleteOptionalParams,
  BuildersUpdateOptionalParams,
  BuildersCreateOrUpdateOptionalParams,
  BuildersGetOptionalParams,
} from "../../api/builders/options.js";
import { BuilderResource, BuilderResourceUpdate } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Builders operations. */
export interface BuildersOperations {
  /** List BuilderResource resources by subscription ID */
  listBySubscription: (
    options?: BuildersListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<BuilderResource>;
  /** List BuilderResource resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: BuildersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<BuilderResource>;
  /** Delete a BuilderResource */
  delete: (
    resourceGroupName: string,
    builderName: string,
    options?: BuildersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    builderName: string,
    options?: BuildersDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    builderName: string,
    options?: BuildersDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a BuilderResource */
  update: (
    resourceGroupName: string,
    builderName: string,
    builderEnvelope: BuilderResourceUpdate,
    options?: BuildersUpdateOptionalParams,
  ) => PollerLike<OperationState<BuilderResource>, BuilderResource>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    builderName: string,
    builderEnvelope: BuilderResourceUpdate,
    options?: BuildersUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<BuilderResource>, BuilderResource>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    builderName: string,
    builderEnvelope: BuilderResourceUpdate,
    options?: BuildersUpdateOptionalParams,
  ) => Promise<BuilderResource>;
  /** Create or update a BuilderResource */
  createOrUpdate: (
    resourceGroupName: string,
    builderName: string,
    builderEnvelope: BuilderResource,
    options?: BuildersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<BuilderResource>, BuilderResource>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    builderName: string,
    builderEnvelope: BuilderResource,
    options?: BuildersCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<BuilderResource>, BuilderResource>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    builderName: string,
    builderEnvelope: BuilderResource,
    options?: BuildersCreateOrUpdateOptionalParams,
  ) => Promise<BuilderResource>;
  /** Get a BuilderResource */
  get: (
    resourceGroupName: string,
    builderName: string,
    options?: BuildersGetOptionalParams,
  ) => Promise<BuilderResource>;
}

function _getBuilders(context: ContainerAppsAPIContext) {
  return {
    listBySubscription: (options?: BuildersListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: BuildersListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      builderName: string,
      options?: BuildersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, builderName, options),
    beginDelete: async (
      resourceGroupName: string,
      builderName: string,
      options?: BuildersDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, builderName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      builderName: string,
      options?: BuildersDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, builderName, options);
    },
    update: (
      resourceGroupName: string,
      builderName: string,
      builderEnvelope: BuilderResourceUpdate,
      options?: BuildersUpdateOptionalParams,
    ) => update(context, resourceGroupName, builderName, builderEnvelope, options),
    beginUpdate: async (
      resourceGroupName: string,
      builderName: string,
      builderEnvelope: BuilderResourceUpdate,
      options?: BuildersUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, builderName, builderEnvelope, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      builderName: string,
      builderEnvelope: BuilderResourceUpdate,
      options?: BuildersUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, builderName, builderEnvelope, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      builderName: string,
      builderEnvelope: BuilderResource,
      options?: BuildersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, builderName, builderEnvelope, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      builderName: string,
      builderEnvelope: BuilderResource,
      options?: BuildersCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        builderName,
        builderEnvelope,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      builderName: string,
      builderEnvelope: BuilderResource,
      options?: BuildersCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        builderName,
        builderEnvelope,
        options,
      );
    },
    get: (resourceGroupName: string, builderName: string, options?: BuildersGetOptionalParams) =>
      get(context, resourceGroupName, builderName, options),
  };
}

export function _getBuildersOperations(context: ContainerAppsAPIContext): BuildersOperations {
  return {
    ..._getBuilders(context),
  };
}
