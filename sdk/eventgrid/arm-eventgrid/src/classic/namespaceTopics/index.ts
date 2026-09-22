// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventGridManagementContext } from "../../api/eventGridManagementContext.js";
import {
  regenerateKey,
  listSharedAccessKeys,
  listByNamespace,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/namespaceTopics/operations.js";
import type {
  NamespaceTopicsRegenerateKeyOptionalParams,
  NamespaceTopicsListSharedAccessKeysOptionalParams,
  NamespaceTopicsListByNamespaceOptionalParams,
  NamespaceTopicsDeleteOptionalParams,
  NamespaceTopicsUpdateOptionalParams,
  NamespaceTopicsCreateOrUpdateOptionalParams,
  NamespaceTopicsGetOptionalParams,
} from "../../api/namespaceTopics/options.js";
import type {
  NamespaceTopic,
  NamespaceTopicUpdateParameters,
  TopicSharedAccessKeys,
  TopicRegenerateKeyRequest,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NamespaceTopics operations. */
export interface NamespaceTopicsOperations {
  /** Regenerate a shared access key for a namespace topic. */
  regenerateKey: (
    resourceGroupName: string,
    namespaceName: string,
    topicName: string,
    regenerateKeyRequest: TopicRegenerateKeyRequest,
    options?: NamespaceTopicsRegenerateKeyOptionalParams,
  ) => PollerLike<OperationState<TopicSharedAccessKeys>, TopicSharedAccessKeys>;
  /** @deprecated use regenerateKey instead */
  beginRegenerateKey: (
    resourceGroupName: string,
    namespaceName: string,
    topicName: string,
    regenerateKeyRequest: TopicRegenerateKeyRequest,
    options?: NamespaceTopicsRegenerateKeyOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<TopicSharedAccessKeys>, TopicSharedAccessKeys>>;
  /** @deprecated use regenerateKey instead */
  beginRegenerateKeyAndWait: (
    resourceGroupName: string,
    namespaceName: string,
    topicName: string,
    regenerateKeyRequest: TopicRegenerateKeyRequest,
    options?: NamespaceTopicsRegenerateKeyOptionalParams,
  ) => Promise<TopicSharedAccessKeys>;
  /** List the two keys used to publish to a namespace topic. */
  listSharedAccessKeys: (
    resourceGroupName: string,
    namespaceName: string,
    topicName: string,
    options?: NamespaceTopicsListSharedAccessKeysOptionalParams,
  ) => Promise<TopicSharedAccessKeys>;
  /** List all the namespace topics under a namespace. */
  listByNamespace: (
    resourceGroupName: string,
    namespaceName: string,
    options?: NamespaceTopicsListByNamespaceOptionalParams,
  ) => PagedAsyncIterableIterator<NamespaceTopic>;
  /** Delete existing namespace topic. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    namespaceName: string,
    topicName: string,
    options?: NamespaceTopicsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    namespaceName: string,
    topicName: string,
    options?: NamespaceTopicsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    namespaceName: string,
    topicName: string,
    options?: NamespaceTopicsDeleteOptionalParams,
  ) => Promise<void>;
  /** Asynchronously updates a namespace topic with the specified parameters. */
  update: (
    resourceGroupName: string,
    namespaceName: string,
    topicName: string,
    namespaceTopicUpdateParameters: NamespaceTopicUpdateParameters,
    options?: NamespaceTopicsUpdateOptionalParams,
  ) => PollerLike<OperationState<NamespaceTopic>, NamespaceTopic>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    namespaceName: string,
    topicName: string,
    namespaceTopicUpdateParameters: NamespaceTopicUpdateParameters,
    options?: NamespaceTopicsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NamespaceTopic>, NamespaceTopic>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    namespaceName: string,
    topicName: string,
    namespaceTopicUpdateParameters: NamespaceTopicUpdateParameters,
    options?: NamespaceTopicsUpdateOptionalParams,
  ) => Promise<NamespaceTopic>;
  /** Asynchronously creates a new namespace topic with the specified parameters. */
  createOrUpdate: (
    resourceGroupName: string,
    namespaceName: string,
    topicName: string,
    namespaceTopicInfo: NamespaceTopic,
    options?: NamespaceTopicsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<NamespaceTopic>, NamespaceTopic>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    namespaceName: string,
    topicName: string,
    namespaceTopicInfo: NamespaceTopic,
    options?: NamespaceTopicsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NamespaceTopic>, NamespaceTopic>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    namespaceName: string,
    topicName: string,
    namespaceTopicInfo: NamespaceTopic,
    options?: NamespaceTopicsCreateOrUpdateOptionalParams,
  ) => Promise<NamespaceTopic>;
  /** Get properties of a namespace topic. */
  get: (
    resourceGroupName: string,
    namespaceName: string,
    topicName: string,
    options?: NamespaceTopicsGetOptionalParams,
  ) => Promise<NamespaceTopic>;
}

function _getNamespaceTopics(context: EventGridManagementContext) {
  return {
    regenerateKey: (
      resourceGroupName: string,
      namespaceName: string,
      topicName: string,
      regenerateKeyRequest: TopicRegenerateKeyRequest,
      options?: NamespaceTopicsRegenerateKeyOptionalParams,
    ) =>
      regenerateKey(
        context,
        resourceGroupName,
        namespaceName,
        topicName,
        regenerateKeyRequest,
        options,
      ),
    beginRegenerateKey: async (
      resourceGroupName: string,
      namespaceName: string,
      topicName: string,
      regenerateKeyRequest: TopicRegenerateKeyRequest,
      options?: NamespaceTopicsRegenerateKeyOptionalParams,
    ) => {
      const poller = regenerateKey(
        context,
        resourceGroupName,
        namespaceName,
        topicName,
        regenerateKeyRequest,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRegenerateKeyAndWait: async (
      resourceGroupName: string,
      namespaceName: string,
      topicName: string,
      regenerateKeyRequest: TopicRegenerateKeyRequest,
      options?: NamespaceTopicsRegenerateKeyOptionalParams,
    ) => {
      return await regenerateKey(
        context,
        resourceGroupName,
        namespaceName,
        topicName,
        regenerateKeyRequest,
        options,
      );
    },
    listSharedAccessKeys: (
      resourceGroupName: string,
      namespaceName: string,
      topicName: string,
      options?: NamespaceTopicsListSharedAccessKeysOptionalParams,
    ) => listSharedAccessKeys(context, resourceGroupName, namespaceName, topicName, options),
    listByNamespace: (
      resourceGroupName: string,
      namespaceName: string,
      options?: NamespaceTopicsListByNamespaceOptionalParams,
    ) => listByNamespace(context, resourceGroupName, namespaceName, options),
    delete: (
      resourceGroupName: string,
      namespaceName: string,
      topicName: string,
      options?: NamespaceTopicsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, namespaceName, topicName, options),
    beginDelete: async (
      resourceGroupName: string,
      namespaceName: string,
      topicName: string,
      options?: NamespaceTopicsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, namespaceName, topicName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      namespaceName: string,
      topicName: string,
      options?: NamespaceTopicsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, namespaceName, topicName, options);
    },
    update: (
      resourceGroupName: string,
      namespaceName: string,
      topicName: string,
      namespaceTopicUpdateParameters: NamespaceTopicUpdateParameters,
      options?: NamespaceTopicsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        namespaceName,
        topicName,
        namespaceTopicUpdateParameters,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      namespaceName: string,
      topicName: string,
      namespaceTopicUpdateParameters: NamespaceTopicUpdateParameters,
      options?: NamespaceTopicsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        namespaceName,
        topicName,
        namespaceTopicUpdateParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      namespaceName: string,
      topicName: string,
      namespaceTopicUpdateParameters: NamespaceTopicUpdateParameters,
      options?: NamespaceTopicsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        namespaceName,
        topicName,
        namespaceTopicUpdateParameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      namespaceName: string,
      topicName: string,
      namespaceTopicInfo: NamespaceTopic,
      options?: NamespaceTopicsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        namespaceName,
        topicName,
        namespaceTopicInfo,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      namespaceName: string,
      topicName: string,
      namespaceTopicInfo: NamespaceTopic,
      options?: NamespaceTopicsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        namespaceName,
        topicName,
        namespaceTopicInfo,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      namespaceName: string,
      topicName: string,
      namespaceTopicInfo: NamespaceTopic,
      options?: NamespaceTopicsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        namespaceName,
        topicName,
        namespaceTopicInfo,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      namespaceName: string,
      topicName: string,
      options?: NamespaceTopicsGetOptionalParams,
    ) => get(context, resourceGroupName, namespaceName, topicName, options),
  };
}

export function _getNamespaceTopicsOperations(
  context: EventGridManagementContext,
): NamespaceTopicsOperations {
  return {
    ..._getNamespaceTopics(context),
  };
}
