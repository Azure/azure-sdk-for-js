// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventGridManagementContext } from "../../api/eventGridManagementContext.js";
import {
  listEventTypes,
  regenerateKey,
  listSharedAccessKeys,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/topics/operations.js";
import type {
  TopicsListEventTypesOptionalParams,
  TopicsRegenerateKeyOptionalParams,
  TopicsListSharedAccessKeysOptionalParams,
  TopicsListBySubscriptionOptionalParams,
  TopicsListByResourceGroupOptionalParams,
  TopicsDeleteOptionalParams,
  TopicsUpdateOptionalParams,
  TopicsCreateOrUpdateOptionalParams,
  TopicsGetOptionalParams,
} from "../../api/topics/options.js";
import type {
  TopicSharedAccessKeys,
  TopicRegenerateKeyRequest,
  Topic,
  TopicUpdateParameters,
  EventType,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Topics operations. */
export interface TopicsOperations {
  /** List event types for a topic. */
  listEventTypes: (
    resourceGroupName: string,
    providerNamespace: string,
    resourceTypeName: string,
    resourceName: string,
    options?: TopicsListEventTypesOptionalParams,
  ) => PagedAsyncIterableIterator<EventType>;
  /** Regenerate a shared access key for a topic. */
  regenerateKey: (
    resourceGroupName: string,
    topicName: string,
    regenerateKeyRequest: TopicRegenerateKeyRequest,
    options?: TopicsRegenerateKeyOptionalParams,
  ) => PollerLike<OperationState<TopicSharedAccessKeys>, TopicSharedAccessKeys>;
  /** @deprecated use regenerateKey instead */
  beginRegenerateKey: (
    resourceGroupName: string,
    topicName: string,
    regenerateKeyRequest: TopicRegenerateKeyRequest,
    options?: TopicsRegenerateKeyOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<TopicSharedAccessKeys>, TopicSharedAccessKeys>>;
  /** @deprecated use regenerateKey instead */
  beginRegenerateKeyAndWait: (
    resourceGroupName: string,
    topicName: string,
    regenerateKeyRequest: TopicRegenerateKeyRequest,
    options?: TopicsRegenerateKeyOptionalParams,
  ) => Promise<TopicSharedAccessKeys>;
  /** List the two keys used to publish to a topic. */
  listSharedAccessKeys: (
    resourceGroupName: string,
    topicName: string,
    options?: TopicsListSharedAccessKeysOptionalParams,
  ) => Promise<TopicSharedAccessKeys>;
  /** List all the topics under an Azure subscription. */
  listBySubscription: (
    options?: TopicsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Topic>;
  /** List all the topics under a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: TopicsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Topic>;
  /** Delete existing topic. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    topicName: string,
    options?: TopicsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    topicName: string,
    options?: TopicsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    topicName: string,
    options?: TopicsDeleteOptionalParams,
  ) => Promise<void>;
  /** Asynchronously updates a topic with the specified parameters. */
  update: (
    resourceGroupName: string,
    topicName: string,
    topicUpdateParameters: TopicUpdateParameters,
    options?: TopicsUpdateOptionalParams,
  ) => PollerLike<OperationState<Topic>, Topic>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    topicName: string,
    topicUpdateParameters: TopicUpdateParameters,
    options?: TopicsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Topic>, Topic>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    topicName: string,
    topicUpdateParameters: TopicUpdateParameters,
    options?: TopicsUpdateOptionalParams,
  ) => Promise<Topic>;
  /** Asynchronously creates a new topic with the specified parameters. */
  createOrUpdate: (
    resourceGroupName: string,
    topicName: string,
    topicInfo: Topic,
    options?: TopicsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Topic>, Topic>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    topicName: string,
    topicInfo: Topic,
    options?: TopicsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Topic>, Topic>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    topicName: string,
    topicInfo: Topic,
    options?: TopicsCreateOrUpdateOptionalParams,
  ) => Promise<Topic>;
  /** Get properties of a topic. */
  get: (
    resourceGroupName: string,
    topicName: string,
    options?: TopicsGetOptionalParams,
  ) => Promise<Topic>;
}

function _getTopics(context: EventGridManagementContext) {
  return {
    listEventTypes: (
      resourceGroupName: string,
      providerNamespace: string,
      resourceTypeName: string,
      resourceName: string,
      options?: TopicsListEventTypesOptionalParams,
    ) =>
      listEventTypes(
        context,
        resourceGroupName,
        providerNamespace,
        resourceTypeName,
        resourceName,
        options,
      ),
    regenerateKey: (
      resourceGroupName: string,
      topicName: string,
      regenerateKeyRequest: TopicRegenerateKeyRequest,
      options?: TopicsRegenerateKeyOptionalParams,
    ) => regenerateKey(context, resourceGroupName, topicName, regenerateKeyRequest, options),
    beginRegenerateKey: async (
      resourceGroupName: string,
      topicName: string,
      regenerateKeyRequest: TopicRegenerateKeyRequest,
      options?: TopicsRegenerateKeyOptionalParams,
    ) => {
      const poller = regenerateKey(
        context,
        resourceGroupName,
        topicName,
        regenerateKeyRequest,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRegenerateKeyAndWait: async (
      resourceGroupName: string,
      topicName: string,
      regenerateKeyRequest: TopicRegenerateKeyRequest,
      options?: TopicsRegenerateKeyOptionalParams,
    ) => {
      return await regenerateKey(
        context,
        resourceGroupName,
        topicName,
        regenerateKeyRequest,
        options,
      );
    },
    listSharedAccessKeys: (
      resourceGroupName: string,
      topicName: string,
      options?: TopicsListSharedAccessKeysOptionalParams,
    ) => listSharedAccessKeys(context, resourceGroupName, topicName, options),
    listBySubscription: (options?: TopicsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: TopicsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (resourceGroupName: string, topicName: string, options?: TopicsDeleteOptionalParams) =>
      $delete(context, resourceGroupName, topicName, options),
    beginDelete: async (
      resourceGroupName: string,
      topicName: string,
      options?: TopicsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, topicName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      topicName: string,
      options?: TopicsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, topicName, options);
    },
    update: (
      resourceGroupName: string,
      topicName: string,
      topicUpdateParameters: TopicUpdateParameters,
      options?: TopicsUpdateOptionalParams,
    ) => update(context, resourceGroupName, topicName, topicUpdateParameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      topicName: string,
      topicUpdateParameters: TopicUpdateParameters,
      options?: TopicsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, topicName, topicUpdateParameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      topicName: string,
      topicUpdateParameters: TopicUpdateParameters,
      options?: TopicsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, topicName, topicUpdateParameters, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      topicName: string,
      topicInfo: Topic,
      options?: TopicsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, topicName, topicInfo, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      topicName: string,
      topicInfo: Topic,
      options?: TopicsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, topicName, topicInfo, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      topicName: string,
      topicInfo: Topic,
      options?: TopicsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, topicName, topicInfo, options);
    },
    get: (resourceGroupName: string, topicName: string, options?: TopicsGetOptionalParams) =>
      get(context, resourceGroupName, topicName, options),
  };
}

export function _getTopicsOperations(context: EventGridManagementContext): TopicsOperations {
  return {
    ..._getTopics(context),
  };
}
