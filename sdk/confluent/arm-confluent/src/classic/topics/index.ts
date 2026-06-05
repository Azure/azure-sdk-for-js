// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConfluentManagementContext } from "../../api/confluentManagementContext.js";
import { list, $delete, create, get } from "../../api/topics/operations.js";
import type {
  TopicsListOptionalParams,
  TopicsDeleteOptionalParams,
  TopicsCreateOptionalParams,
  TopicsGetOptionalParams,
} from "../../api/topics/options.js";
import type { TopicRecord } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Topics operations. */
export interface TopicsOperations {
  /** Lists of all the topics in a clusters */
  list: (
    resourceGroupName: string,
    organizationName: string,
    environmentId: string,
    clusterId: string,
    options?: TopicsListOptionalParams,
  ) => PagedAsyncIterableIterator<TopicRecord>;
  /** Delete confluent topic by name */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    organizationName: string,
    environmentId: string,
    clusterId: string,
    topicName: string,
    options?: TopicsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    organizationName: string,
    environmentId: string,
    clusterId: string,
    topicName: string,
    options?: TopicsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    organizationName: string,
    environmentId: string,
    clusterId: string,
    topicName: string,
    options?: TopicsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create confluent topics by Name */
  create: (
    resourceGroupName: string,
    organizationName: string,
    environmentId: string,
    clusterId: string,
    topicName: string,
    options?: TopicsCreateOptionalParams,
  ) => Promise<TopicRecord>;
  /** Get confluent topic by Name */
  get: (
    resourceGroupName: string,
    organizationName: string,
    environmentId: string,
    clusterId: string,
    topicName: string,
    options?: TopicsGetOptionalParams,
  ) => Promise<TopicRecord>;
}

function _getTopics(context: ConfluentManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      organizationName: string,
      environmentId: string,
      clusterId: string,
      options?: TopicsListOptionalParams,
    ) => list(context, resourceGroupName, organizationName, environmentId, clusterId, options),
    delete: (
      resourceGroupName: string,
      organizationName: string,
      environmentId: string,
      clusterId: string,
      topicName: string,
      options?: TopicsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        organizationName,
        environmentId,
        clusterId,
        topicName,
        options,
      ),
    beginDelete: async (
      resourceGroupName: string,
      organizationName: string,
      environmentId: string,
      clusterId: string,
      topicName: string,
      options?: TopicsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        organizationName,
        environmentId,
        clusterId,
        topicName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      organizationName: string,
      environmentId: string,
      clusterId: string,
      topicName: string,
      options?: TopicsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        organizationName,
        environmentId,
        clusterId,
        topicName,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      organizationName: string,
      environmentId: string,
      clusterId: string,
      topicName: string,
      options?: TopicsCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        organizationName,
        environmentId,
        clusterId,
        topicName,
        options,
      ),
    get: (
      resourceGroupName: string,
      organizationName: string,
      environmentId: string,
      clusterId: string,
      topicName: string,
      options?: TopicsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        organizationName,
        environmentId,
        clusterId,
        topicName,
        options,
      ),
  };
}

export function _getTopicsOperations(context: ConfluentManagementContext): TopicsOperations {
  return {
    ..._getTopics(context),
  };
}
