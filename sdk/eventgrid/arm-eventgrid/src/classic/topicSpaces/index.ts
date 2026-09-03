// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventGridManagementContext } from "../../api/eventGridManagementContext.js";
import { listByNamespace, $delete, createOrUpdate, get } from "../../api/topicSpaces/operations.js";
import type {
  TopicSpacesListByNamespaceOptionalParams,
  TopicSpacesDeleteOptionalParams,
  TopicSpacesCreateOrUpdateOptionalParams,
  TopicSpacesGetOptionalParams,
} from "../../api/topicSpaces/options.js";
import type { TopicSpace } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a TopicSpaces operations. */
export interface TopicSpacesOperations {
  /** Get all the topic spaces under a namespace. */
  listByNamespace: (
    resourceGroupName: string,
    namespaceName: string,
    options?: TopicSpacesListByNamespaceOptionalParams,
  ) => PagedAsyncIterableIterator<TopicSpace>;
  /** Delete an existing topic space. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    namespaceName: string,
    topicSpaceName: string,
    options?: TopicSpacesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    namespaceName: string,
    topicSpaceName: string,
    options?: TopicSpacesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    namespaceName: string,
    topicSpaceName: string,
    options?: TopicSpacesDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update a topic space with the specified parameters. */
  createOrUpdate: (
    resourceGroupName: string,
    namespaceName: string,
    topicSpaceName: string,
    topicSpaceInfo: TopicSpace,
    options?: TopicSpacesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<TopicSpace>, TopicSpace>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    namespaceName: string,
    topicSpaceName: string,
    topicSpaceInfo: TopicSpace,
    options?: TopicSpacesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<TopicSpace>, TopicSpace>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    namespaceName: string,
    topicSpaceName: string,
    topicSpaceInfo: TopicSpace,
    options?: TopicSpacesCreateOrUpdateOptionalParams,
  ) => Promise<TopicSpace>;
  /** Get properties of a topic space. */
  get: (
    resourceGroupName: string,
    namespaceName: string,
    topicSpaceName: string,
    options?: TopicSpacesGetOptionalParams,
  ) => Promise<TopicSpace>;
}

function _getTopicSpaces(context: EventGridManagementContext) {
  return {
    listByNamespace: (
      resourceGroupName: string,
      namespaceName: string,
      options?: TopicSpacesListByNamespaceOptionalParams,
    ) => listByNamespace(context, resourceGroupName, namespaceName, options),
    delete: (
      resourceGroupName: string,
      namespaceName: string,
      topicSpaceName: string,
      options?: TopicSpacesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, namespaceName, topicSpaceName, options),
    beginDelete: async (
      resourceGroupName: string,
      namespaceName: string,
      topicSpaceName: string,
      options?: TopicSpacesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, namespaceName, topicSpaceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      namespaceName: string,
      topicSpaceName: string,
      options?: TopicSpacesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, namespaceName, topicSpaceName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      namespaceName: string,
      topicSpaceName: string,
      topicSpaceInfo: TopicSpace,
      options?: TopicSpacesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        namespaceName,
        topicSpaceName,
        topicSpaceInfo,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      namespaceName: string,
      topicSpaceName: string,
      topicSpaceInfo: TopicSpace,
      options?: TopicSpacesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        namespaceName,
        topicSpaceName,
        topicSpaceInfo,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      namespaceName: string,
      topicSpaceName: string,
      topicSpaceInfo: TopicSpace,
      options?: TopicSpacesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        namespaceName,
        topicSpaceName,
        topicSpaceInfo,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      namespaceName: string,
      topicSpaceName: string,
      options?: TopicSpacesGetOptionalParams,
    ) => get(context, resourceGroupName, namespaceName, topicSpaceName, options),
  };
}

export function _getTopicSpacesOperations(
  context: EventGridManagementContext,
): TopicSpacesOperations {
  return {
    ..._getTopicSpaces(context),
  };
}
