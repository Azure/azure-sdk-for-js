// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventGridManagementContext } from "../../api/eventGridManagementContext.js";
import {
  deactivate,
  activate,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/partnerTopics/operations.js";
import type {
  PartnerTopicsDeactivateOptionalParams,
  PartnerTopicsActivateOptionalParams,
  PartnerTopicsListBySubscriptionOptionalParams,
  PartnerTopicsListByResourceGroupOptionalParams,
  PartnerTopicsDeleteOptionalParams,
  PartnerTopicsUpdateOptionalParams,
  PartnerTopicsCreateOrUpdateOptionalParams,
  PartnerTopicsGetOptionalParams,
} from "../../api/partnerTopics/options.js";
import type { PartnerTopic, PartnerTopicUpdateParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PartnerTopics operations. */
export interface PartnerTopicsOperations {
  /** Deactivate specific partner topic. */
  deactivate: (
    resourceGroupName: string,
    partnerTopicName: string,
    options?: PartnerTopicsDeactivateOptionalParams,
  ) => Promise<PartnerTopic>;
  /** Activate a newly created partner topic. */
  activate: (
    resourceGroupName: string,
    partnerTopicName: string,
    options?: PartnerTopicsActivateOptionalParams,
  ) => Promise<PartnerTopic>;
  /** List all the partner topics under an Azure subscription. */
  listBySubscription: (
    options?: PartnerTopicsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<PartnerTopic>;
  /** List all the partner topics under a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: PartnerTopicsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<PartnerTopic>;
  /** Delete existing partner topic. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    partnerTopicName: string,
    options?: PartnerTopicsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    partnerTopicName: string,
    options?: PartnerTopicsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    partnerTopicName: string,
    options?: PartnerTopicsDeleteOptionalParams,
  ) => Promise<void>;
  /** Asynchronously updates a partner topic with the specified parameters. */
  update: (
    resourceGroupName: string,
    partnerTopicName: string,
    partnerTopicUpdateParameters: PartnerTopicUpdateParameters,
    options?: PartnerTopicsUpdateOptionalParams,
  ) => Promise<PartnerTopic>;
  /** Asynchronously creates a new partner topic with the specified parameters. */
  createOrUpdate: (
    resourceGroupName: string,
    partnerTopicName: string,
    partnerTopicInfo: PartnerTopic,
    options?: PartnerTopicsCreateOrUpdateOptionalParams,
  ) => Promise<PartnerTopic>;
  /** Get properties of a partner topic. */
  get: (
    resourceGroupName: string,
    partnerTopicName: string,
    options?: PartnerTopicsGetOptionalParams,
  ) => Promise<PartnerTopic>;
}

function _getPartnerTopics(context: EventGridManagementContext) {
  return {
    deactivate: (
      resourceGroupName: string,
      partnerTopicName: string,
      options?: PartnerTopicsDeactivateOptionalParams,
    ) => deactivate(context, resourceGroupName, partnerTopicName, options),
    activate: (
      resourceGroupName: string,
      partnerTopicName: string,
      options?: PartnerTopicsActivateOptionalParams,
    ) => activate(context, resourceGroupName, partnerTopicName, options),
    listBySubscription: (options?: PartnerTopicsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: PartnerTopicsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      partnerTopicName: string,
      options?: PartnerTopicsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, partnerTopicName, options),
    beginDelete: async (
      resourceGroupName: string,
      partnerTopicName: string,
      options?: PartnerTopicsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, partnerTopicName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      partnerTopicName: string,
      options?: PartnerTopicsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, partnerTopicName, options);
    },
    update: (
      resourceGroupName: string,
      partnerTopicName: string,
      partnerTopicUpdateParameters: PartnerTopicUpdateParameters,
      options?: PartnerTopicsUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, partnerTopicName, partnerTopicUpdateParameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      partnerTopicName: string,
      partnerTopicInfo: PartnerTopic,
      options?: PartnerTopicsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, partnerTopicName, partnerTopicInfo, options),
    get: (
      resourceGroupName: string,
      partnerTopicName: string,
      options?: PartnerTopicsGetOptionalParams,
    ) => get(context, resourceGroupName, partnerTopicName, options),
  };
}

export function _getPartnerTopicsOperations(
  context: EventGridManagementContext,
): PartnerTopicsOperations {
  return {
    ..._getPartnerTopics(context),
  };
}
