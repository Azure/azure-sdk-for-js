// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventGridManagementContext } from "../../api/eventGridManagementContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/systemTopics/operations.js";
import type {
  SystemTopicsListBySubscriptionOptionalParams,
  SystemTopicsListByResourceGroupOptionalParams,
  SystemTopicsDeleteOptionalParams,
  SystemTopicsUpdateOptionalParams,
  SystemTopicsCreateOrUpdateOptionalParams,
  SystemTopicsGetOptionalParams,
} from "../../api/systemTopics/options.js";
import type { SystemTopic, SystemTopicUpdateParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SystemTopics operations. */
export interface SystemTopicsOperations {
  /** List all the system topics under an Azure subscription. */
  listBySubscription: (
    options?: SystemTopicsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<SystemTopic>;
  /** List all the system topics under a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: SystemTopicsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<SystemTopic>;
  /** Delete existing system topic. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    systemTopicName: string,
    options?: SystemTopicsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    systemTopicName: string,
    options?: SystemTopicsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    systemTopicName: string,
    options?: SystemTopicsDeleteOptionalParams,
  ) => Promise<void>;
  /** Asynchronously updates a system topic with the specified parameters. */
  update: (
    resourceGroupName: string,
    systemTopicName: string,
    systemTopicUpdateParameters: SystemTopicUpdateParameters,
    options?: SystemTopicsUpdateOptionalParams,
  ) => PollerLike<OperationState<SystemTopic>, SystemTopic>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    systemTopicName: string,
    systemTopicUpdateParameters: SystemTopicUpdateParameters,
    options?: SystemTopicsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<SystemTopic>, SystemTopic>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    systemTopicName: string,
    systemTopicUpdateParameters: SystemTopicUpdateParameters,
    options?: SystemTopicsUpdateOptionalParams,
  ) => Promise<SystemTopic>;
  /** Asynchronously creates a new system topic with the specified parameters. */
  createOrUpdate: (
    resourceGroupName: string,
    systemTopicName: string,
    systemTopicInfo: SystemTopic,
    options?: SystemTopicsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<SystemTopic>, SystemTopic>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    systemTopicName: string,
    systemTopicInfo: SystemTopic,
    options?: SystemTopicsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<SystemTopic>, SystemTopic>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    systemTopicName: string,
    systemTopicInfo: SystemTopic,
    options?: SystemTopicsCreateOrUpdateOptionalParams,
  ) => Promise<SystemTopic>;
  /** Get properties of a system topic. */
  get: (
    resourceGroupName: string,
    systemTopicName: string,
    options?: SystemTopicsGetOptionalParams,
  ) => Promise<SystemTopic>;
}

function _getSystemTopics(context: EventGridManagementContext) {
  return {
    listBySubscription: (options?: SystemTopicsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: SystemTopicsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      systemTopicName: string,
      options?: SystemTopicsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, systemTopicName, options),
    beginDelete: async (
      resourceGroupName: string,
      systemTopicName: string,
      options?: SystemTopicsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, systemTopicName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      systemTopicName: string,
      options?: SystemTopicsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, systemTopicName, options);
    },
    update: (
      resourceGroupName: string,
      systemTopicName: string,
      systemTopicUpdateParameters: SystemTopicUpdateParameters,
      options?: SystemTopicsUpdateOptionalParams,
    ) => update(context, resourceGroupName, systemTopicName, systemTopicUpdateParameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      systemTopicName: string,
      systemTopicUpdateParameters: SystemTopicUpdateParameters,
      options?: SystemTopicsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        systemTopicName,
        systemTopicUpdateParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      systemTopicName: string,
      systemTopicUpdateParameters: SystemTopicUpdateParameters,
      options?: SystemTopicsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        systemTopicName,
        systemTopicUpdateParameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      systemTopicName: string,
      systemTopicInfo: SystemTopic,
      options?: SystemTopicsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, systemTopicName, systemTopicInfo, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      systemTopicName: string,
      systemTopicInfo: SystemTopic,
      options?: SystemTopicsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        systemTopicName,
        systemTopicInfo,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      systemTopicName: string,
      systemTopicInfo: SystemTopic,
      options?: SystemTopicsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        systemTopicName,
        systemTopicInfo,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      systemTopicName: string,
      options?: SystemTopicsGetOptionalParams,
    ) => get(context, resourceGroupName, systemTopicName, options),
  };
}

export function _getSystemTopicsOperations(
  context: EventGridManagementContext,
): SystemTopicsOperations {
  return {
    ..._getSystemTopics(context),
  };
}
