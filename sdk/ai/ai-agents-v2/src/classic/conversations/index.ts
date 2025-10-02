// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AgentsContext } from "../../api/agentsContext.js";
import {
  listConversationItems,
  deleteConversationItem,
  getConversationItem,
  createConversationItems,
  listConversations,
  deleteConversation,
  getConversation,
  updateConversation,
  createConversation,
} from "../../api/conversations/operations.js";
import {
  ConversationsListConversationItemsOptionalParams,
  ConversationsDeleteConversationItemOptionalParams,
  ConversationsGetConversationItemOptionalParams,
  ConversationsCreateConversationItemsOptionalParams,
  ConversationsListConversationsOptionalParams,
  ConversationsDeleteConversationOptionalParams,
  ConversationsGetConversationOptionalParams,
  ConversationsUpdateConversationOptionalParams,
  ConversationsCreateConversationOptionalParams,
} from "../../api/conversations/options.js";
import {
  ItemParamUnion,
  ConversationResource,
  DeletedConversationResource,
  ConversationItemList,
  ItemResourceUnion,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Conversations operations. */
export interface ConversationsOperations {
  /** List all items for a conversation with the given ID. */
  listConversationItems: (
    conversationId: string,
    options?: ConversationsListConversationItemsOptionalParams,
  ) => PagedAsyncIterableIterator<ItemResourceUnion>;
  /** Delete an item from a conversation with the given IDs. */
  deleteConversationItem: (
    conversationId: string,
    itemId: string,
    options?: ConversationsDeleteConversationItemOptionalParams,
  ) => Promise<ConversationResource>;
  /** Get a single item from a conversation with the given IDs. */
  getConversationItem: (
    conversationId: string,
    itemId: string,
    options?: ConversationsGetConversationItemOptionalParams,
  ) => Promise<ItemResourceUnion>;
  /** Create items in a conversation with the given ID. */
  createConversationItems: (
    conversationId: string,
    items: ItemParamUnion[],
    options?: ConversationsCreateConversationItemsOptionalParams,
  ) => Promise<ConversationItemList>;
  /** Returns the list of all conversations. */
  listConversations: (
    options?: ConversationsListConversationsOptionalParams,
  ) => PagedAsyncIterableIterator<ConversationResource>;
  /** Deletes a conversation. */
  deleteConversation: (
    conversationId: string,
    options?: ConversationsDeleteConversationOptionalParams,
  ) => Promise<DeletedConversationResource>;
  /** Retrieves a conversation. */
  getConversation: (
    conversationId: string,
    options?: ConversationsGetConversationOptionalParams,
  ) => Promise<ConversationResource>;
  /** Update a conversation. */
  updateConversation: (
    conversationId: string,
    options?: ConversationsUpdateConversationOptionalParams,
  ) => Promise<ConversationResource>;
  /** Create a conversation. */
  createConversation: (
    options?: ConversationsCreateConversationOptionalParams,
  ) => Promise<ConversationResource>;
}

function _getConversations(context: AgentsContext) {
  return {
    listConversationItems: (
      conversationId: string,
      options?: ConversationsListConversationItemsOptionalParams,
    ) => listConversationItems(context, conversationId, options),
    deleteConversationItem: (
      conversationId: string,
      itemId: string,
      options?: ConversationsDeleteConversationItemOptionalParams,
    ) => deleteConversationItem(context, conversationId, itemId, options),
    getConversationItem: (
      conversationId: string,
      itemId: string,
      options?: ConversationsGetConversationItemOptionalParams,
    ) => getConversationItem(context, conversationId, itemId, options),
    createConversationItems: (
      conversationId: string,
      items: ItemParamUnion[],
      options?: ConversationsCreateConversationItemsOptionalParams,
    ) => createConversationItems(context, conversationId, items, options),
    listConversations: (
      options?: ConversationsListConversationsOptionalParams,
    ) => listConversations(context, options),
    deleteConversation: (
      conversationId: string,
      options?: ConversationsDeleteConversationOptionalParams,
    ) => deleteConversation(context, conversationId, options),
    getConversation: (
      conversationId: string,
      options?: ConversationsGetConversationOptionalParams,
    ) => getConversation(context, conversationId, options),
    updateConversation: (
      conversationId: string,
      options?: ConversationsUpdateConversationOptionalParams,
    ) => updateConversation(context, conversationId, options),
    createConversation: (
      options?: ConversationsCreateConversationOptionalParams,
    ) => createConversation(context, options),
  };
}

export function _getConversationsOperations(
  context: AgentsContext,
): ConversationsOperations {
  return {
    ..._getConversations(context),
  };
}
