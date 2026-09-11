// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerInstanceManagementContext } from "../../api/containerInstanceManagementContext.js";
import {
  connect,
  $delete,
  update,
  createOrUpdate,
  get,
  listByResourceGroup,
  listBySubscription,
} from "../../api/aiAgentsGroups/operations.js";
import type {
  AiAgentsGroupsConnectOptionalParams,
  AiAgentsGroupsDeleteOptionalParams,
  AiAgentsGroupsUpdateOptionalParams,
  AiAgentsGroupsCreateOrUpdateOptionalParams,
  AiAgentsGroupsGetOptionalParams,
  AiAgentsGroupsListByResourceGroupOptionalParams,
  AiAgentsGroupsListBySubscriptionOptionalParams,
} from "../../api/aiAgentsGroups/options.js";
import type {
  AiAgentsGroup,
  AiAgentsGroupTagsUpdate,
  AiAgentsGroupAccessToken,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AiAgentsGroups operations. */
export interface AiAgentsGroupsOperations {
  /** Get an access token and endpoint for connecting to the AiAgentsGroup. */
  connect: (
    resourceGroupName: string,
    aiAgentsGroupName: string,
    options?: AiAgentsGroupsConnectOptionalParams,
  ) => Promise<AiAgentsGroupAccessToken>;
  /** Delete an AiAgentsGroup */
  delete: (
    resourceGroupName: string,
    aiAgentsGroupName: string,
    options?: AiAgentsGroupsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    aiAgentsGroupName: string,
    options?: AiAgentsGroupsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    aiAgentsGroupName: string,
    options?: AiAgentsGroupsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update an AiAgentsGroup */
  update: (
    resourceGroupName: string,
    aiAgentsGroupName: string,
    properties: AiAgentsGroupTagsUpdate,
    options?: AiAgentsGroupsUpdateOptionalParams,
  ) => PollerLike<OperationState<AiAgentsGroup>, AiAgentsGroup>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    aiAgentsGroupName: string,
    properties: AiAgentsGroupTagsUpdate,
    options?: AiAgentsGroupsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AiAgentsGroup>, AiAgentsGroup>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    aiAgentsGroupName: string,
    properties: AiAgentsGroupTagsUpdate,
    options?: AiAgentsGroupsUpdateOptionalParams,
  ) => Promise<AiAgentsGroup>;
  /** Create an AiAgentsGroup */
  createOrUpdate: (
    resourceGroupName: string,
    aiAgentsGroupName: string,
    resource: AiAgentsGroup,
    options?: AiAgentsGroupsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AiAgentsGroup>, AiAgentsGroup>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    aiAgentsGroupName: string,
    resource: AiAgentsGroup,
    options?: AiAgentsGroupsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AiAgentsGroup>, AiAgentsGroup>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    aiAgentsGroupName: string,
    resource: AiAgentsGroup,
    options?: AiAgentsGroupsCreateOrUpdateOptionalParams,
  ) => Promise<AiAgentsGroup>;
  /** Get an AiAgentsGroup */
  get: (
    resourceGroupName: string,
    aiAgentsGroupName: string,
    options?: AiAgentsGroupsGetOptionalParams,
  ) => Promise<AiAgentsGroup>;
  /** List AiAgentsGroup resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: AiAgentsGroupsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<AiAgentsGroup>;
  /** List AiAgentsGroup resources by subscription ID */
  listBySubscription: (
    options?: AiAgentsGroupsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<AiAgentsGroup>;
}
function _getAiAgentsGroups(context: ContainerInstanceManagementContext) {
  return {
    connect: (
      resourceGroupName: string,
      aiAgentsGroupName: string,
      options?: AiAgentsGroupsConnectOptionalParams,
    ) => connect(context, resourceGroupName, aiAgentsGroupName, options),
    delete: (
      resourceGroupName: string,
      aiAgentsGroupName: string,
      options?: AiAgentsGroupsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, aiAgentsGroupName, options),
    beginDelete: async (
      resourceGroupName: string,
      aiAgentsGroupName: string,
      options?: AiAgentsGroupsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, aiAgentsGroupName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      aiAgentsGroupName: string,
      options?: AiAgentsGroupsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, aiAgentsGroupName, options);
    },
    update: (
      resourceGroupName: string,
      aiAgentsGroupName: string,
      properties: AiAgentsGroupTagsUpdate,
      options?: AiAgentsGroupsUpdateOptionalParams,
    ) => update(context, resourceGroupName, aiAgentsGroupName, properties, options),
    beginUpdate: async (
      resourceGroupName: string,
      aiAgentsGroupName: string,
      properties: AiAgentsGroupTagsUpdate,
      options?: AiAgentsGroupsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, aiAgentsGroupName, properties, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      aiAgentsGroupName: string,
      properties: AiAgentsGroupTagsUpdate,
      options?: AiAgentsGroupsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, aiAgentsGroupName, properties, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      aiAgentsGroupName: string,
      resource: AiAgentsGroup,
      options?: AiAgentsGroupsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, aiAgentsGroupName, resource, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      aiAgentsGroupName: string,
      resource: AiAgentsGroup,
      options?: AiAgentsGroupsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        aiAgentsGroupName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      aiAgentsGroupName: string,
      resource: AiAgentsGroup,
      options?: AiAgentsGroupsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, aiAgentsGroupName, resource, options);
    },
    get: (
      resourceGroupName: string,
      aiAgentsGroupName: string,
      options?: AiAgentsGroupsGetOptionalParams,
    ) => get(context, resourceGroupName, aiAgentsGroupName, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: AiAgentsGroupsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    listBySubscription: (options?: AiAgentsGroupsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
  };
}
export function _getAiAgentsGroupsOperations(
  context: ContainerInstanceManagementContext,
): AiAgentsGroupsOperations {
  return {
    ..._getAiAgentsGroups(context),
  };
}
