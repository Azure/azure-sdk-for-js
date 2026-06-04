// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureBotServiceContext } from "../../api/azureBotServiceContext.js";
import {
  listWithKeys,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/channels/operations.js";
import type {
  ChannelsListWithKeysOptionalParams,
  ChannelsListByResourceGroupOptionalParams,
  ChannelsDeleteOptionalParams,
  ChannelsUpdateOptionalParams,
  ChannelsCreateOptionalParams,
  ChannelsGetOptionalParams,
} from "../../api/channels/options.js";
import type { BotChannel, ListChannelWithKeysResponse, ChannelName } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Channels operations. */
export interface ChannelsOperations {
  /** Lists a Channel registration for a Bot Service including secrets */
  listWithKeys: (
    resourceGroupName: string,
    resourceName: string,
    channelName: ChannelName,
    options?: ChannelsListWithKeysOptionalParams,
  ) => Promise<ListChannelWithKeysResponse>;
  /** Returns all the Channel registrations of a particular BotService resource */
  listByResourceGroup: (
    resourceGroupName: string,
    resourceName: string,
    options?: ChannelsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<BotChannel>;
  /** Deletes a Channel registration from a Bot Service */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    channelName: string,
    options?: ChannelsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a Channel registration for a Bot Service */
  update: (
    resourceGroupName: string,
    resourceName: string,
    channelName: ChannelName,
    parameters: BotChannel,
    options?: ChannelsUpdateOptionalParams,
  ) => Promise<BotChannel>;
  /** Creates a Channel registration for a Bot Service */
  create: (
    resourceGroupName: string,
    resourceName: string,
    channelName: ChannelName,
    parameters: BotChannel,
    options?: ChannelsCreateOptionalParams,
  ) => Promise<BotChannel>;
  /** Returns a BotService Channel registration specified by the parameters. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    channelName: string,
    options?: ChannelsGetOptionalParams,
  ) => Promise<BotChannel>;
}

function _getChannels(context: AzureBotServiceContext) {
  return {
    listWithKeys: (
      resourceGroupName: string,
      resourceName: string,
      channelName: ChannelName,
      options?: ChannelsListWithKeysOptionalParams,
    ) => listWithKeys(context, resourceGroupName, resourceName, channelName, options),
    listByResourceGroup: (
      resourceGroupName: string,
      resourceName: string,
      options?: ChannelsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, resourceName, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      channelName: string,
      options?: ChannelsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, channelName, options),
    update: (
      resourceGroupName: string,
      resourceName: string,
      channelName: ChannelName,
      parameters: BotChannel,
      options?: ChannelsUpdateOptionalParams,
    ) => update(context, resourceGroupName, resourceName, channelName, parameters, options),
    create: (
      resourceGroupName: string,
      resourceName: string,
      channelName: ChannelName,
      parameters: BotChannel,
      options?: ChannelsCreateOptionalParams,
    ) => create(context, resourceGroupName, resourceName, channelName, parameters, options),
    get: (
      resourceGroupName: string,
      resourceName: string,
      channelName: string,
      options?: ChannelsGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, channelName, options),
  };
}

export function _getChannelsOperations(context: AzureBotServiceContext): ChannelsOperations {
  return {
    ..._getChannels(context),
  };
}
