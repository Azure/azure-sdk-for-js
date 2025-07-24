// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementContext } from "../../api/confluentManagementContext.js";
import { list, $delete, create, get } from "../../api/topics/operations.js";
import {
  TopicsListOptionalParams,
  TopicsDeleteOptionalParams,
  TopicsCreateOptionalParams,
  TopicsGetOptionalParams,
} from "../../api/topics/options.js";
import { TopicRecord } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

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
