// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementContext } from "../../api/eventHubManagementContext.js";
import {
  listByEventHub,
  $delete,
  createOrUpdate,
  get,
} from "../../api/consumerGroups/operations.js";
import {
  ConsumerGroupsListByEventHubOptionalParams,
  ConsumerGroupsDeleteOptionalParams,
  ConsumerGroupsCreateOrUpdateOptionalParams,
  ConsumerGroupsGetOptionalParams,
} from "../../api/consumerGroups/options.js";
import { ConsumerGroup } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ConsumerGroups operations. */
export interface ConsumerGroupsOperations {
  /** Gets all the consumer groups in a Namespace. An empty feed is returned if no consumer group exists in the Namespace. */
  listByEventHub: (
    resourceGroupName: string,
    namespaceName: string,
    eventHubName: string,
    options?: ConsumerGroupsListByEventHubOptionalParams,
  ) => PagedAsyncIterableIterator<ConsumerGroup>;
  /** Deletes a consumer group from the specified Event Hub and resource group. */
  delete: (
    resourceGroupName: string,
    namespaceName: string,
    eventHubName: string,
    consumerGroupName: string,
    options?: ConsumerGroupsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an Event Hubs consumer group as a nested resource within a Namespace. */
  createOrUpdate: (
    resourceGroupName: string,
    namespaceName: string,
    eventHubName: string,
    consumerGroupName: string,
    parameters: ConsumerGroup,
    options?: ConsumerGroupsCreateOrUpdateOptionalParams,
  ) => Promise<ConsumerGroup>;
  /** Gets a description for the specified consumer group. */
  get: (
    resourceGroupName: string,
    namespaceName: string,
    eventHubName: string,
    consumerGroupName: string,
    options?: ConsumerGroupsGetOptionalParams,
  ) => Promise<ConsumerGroup>;
}

function _getConsumerGroups(context: EventHubManagementContext) {
  return {
    listByEventHub: (
      resourceGroupName: string,
      namespaceName: string,
      eventHubName: string,
      options?: ConsumerGroupsListByEventHubOptionalParams,
    ) => listByEventHub(context, resourceGroupName, namespaceName, eventHubName, options),
    delete: (
      resourceGroupName: string,
      namespaceName: string,
      eventHubName: string,
      consumerGroupName: string,
      options?: ConsumerGroupsDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, namespaceName, eventHubName, consumerGroupName, options),
    createOrUpdate: (
      resourceGroupName: string,
      namespaceName: string,
      eventHubName: string,
      consumerGroupName: string,
      parameters: ConsumerGroup,
      options?: ConsumerGroupsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        namespaceName,
        eventHubName,
        consumerGroupName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      namespaceName: string,
      eventHubName: string,
      consumerGroupName: string,
      options?: ConsumerGroupsGetOptionalParams,
    ) => get(context, resourceGroupName, namespaceName, eventHubName, consumerGroupName, options),
  };
}

export function _getConsumerGroupsOperations(
  context: EventHubManagementContext,
): ConsumerGroupsOperations {
  return {
    ..._getConsumerGroups(context),
  };
}
