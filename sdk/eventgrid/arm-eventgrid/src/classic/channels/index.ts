// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventGridManagementContext } from "../../api/eventGridManagementContext.js";
import {
  getFullUrl,
  listByPartnerNamespace,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/channels/operations.js";
import type {
  ChannelsGetFullUrlOptionalParams,
  ChannelsListByPartnerNamespaceOptionalParams,
  ChannelsDeleteOptionalParams,
  ChannelsUpdateOptionalParams,
  ChannelsCreateOrUpdateOptionalParams,
  ChannelsGetOptionalParams,
} from "../../api/channels/options.js";
import type {
  Channel,
  ChannelUpdateParameters,
  EventSubscriptionFullUrl,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Channels operations. */
export interface ChannelsOperations {
  /** Get the full endpoint URL of a partner destination channel. */
  getFullUrl: (
    resourceGroupName: string,
    partnerNamespaceName: string,
    channelName: string,
    options?: ChannelsGetFullUrlOptionalParams,
  ) => Promise<EventSubscriptionFullUrl>;
  /** List all the channels in a partner namespace. */
  listByPartnerNamespace: (
    resourceGroupName: string,
    partnerNamespaceName: string,
    options?: ChannelsListByPartnerNamespaceOptionalParams,
  ) => PagedAsyncIterableIterator<Channel>;
  /** Delete an existing channel. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    partnerNamespaceName: string,
    channelName: string,
    options?: ChannelsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    partnerNamespaceName: string,
    channelName: string,
    options?: ChannelsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    partnerNamespaceName: string,
    channelName: string,
    options?: ChannelsDeleteOptionalParams,
  ) => Promise<void>;
  /** Synchronously updates a channel with the specified parameters. */
  update: (
    resourceGroupName: string,
    partnerNamespaceName: string,
    channelName: string,
    channelUpdateParameters: ChannelUpdateParameters,
    options?: ChannelsUpdateOptionalParams,
  ) => Promise<void>;
  /** Synchronously creates or updates a new channel with the specified parameters. */
  createOrUpdate: (
    resourceGroupName: string,
    partnerNamespaceName: string,
    channelName: string,
    channelInfo: Channel,
    options?: ChannelsCreateOrUpdateOptionalParams,
  ) => Promise<Channel>;
  /** Get properties of a channel. */
  get: (
    resourceGroupName: string,
    partnerNamespaceName: string,
    channelName: string,
    options?: ChannelsGetOptionalParams,
  ) => Promise<Channel>;
}

function _getChannels(context: EventGridManagementContext) {
  return {
    getFullUrl: (
      resourceGroupName: string,
      partnerNamespaceName: string,
      channelName: string,
      options?: ChannelsGetFullUrlOptionalParams,
    ) => getFullUrl(context, resourceGroupName, partnerNamespaceName, channelName, options),
    listByPartnerNamespace: (
      resourceGroupName: string,
      partnerNamespaceName: string,
      options?: ChannelsListByPartnerNamespaceOptionalParams,
    ) => listByPartnerNamespace(context, resourceGroupName, partnerNamespaceName, options),
    delete: (
      resourceGroupName: string,
      partnerNamespaceName: string,
      channelName: string,
      options?: ChannelsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, partnerNamespaceName, channelName, options),
    beginDelete: async (
      resourceGroupName: string,
      partnerNamespaceName: string,
      channelName: string,
      options?: ChannelsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        partnerNamespaceName,
        channelName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      partnerNamespaceName: string,
      channelName: string,
      options?: ChannelsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, partnerNamespaceName, channelName, options);
    },
    update: (
      resourceGroupName: string,
      partnerNamespaceName: string,
      channelName: string,
      channelUpdateParameters: ChannelUpdateParameters,
      options?: ChannelsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        partnerNamespaceName,
        channelName,
        channelUpdateParameters,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      partnerNamespaceName: string,
      channelName: string,
      channelInfo: Channel,
      options?: ChannelsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        partnerNamespaceName,
        channelName,
        channelInfo,
        options,
      ),
    get: (
      resourceGroupName: string,
      partnerNamespaceName: string,
      channelName: string,
      options?: ChannelsGetOptionalParams,
    ) => get(context, resourceGroupName, partnerNamespaceName, channelName, options),
  };
}

export function _getChannelsOperations(context: EventGridManagementContext): ChannelsOperations {
  return {
    ..._getChannels(context),
  };
}
