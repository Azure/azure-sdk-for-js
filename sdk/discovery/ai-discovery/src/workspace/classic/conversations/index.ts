// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkspaceContext } from "../../api/workspaceContext.js";
import {
  Conversation,
  ConversationCreateOrUpdateContent,
} from "../../../models/microsoft/discovery/workspace/models.js";
import { PagedAsyncIterableIterator } from "../../../static-helpers/pagingHelpers.js";
import { list, $delete, stableUpdate, create, get } from "../../api/conversations/operations.js";
import {
  ConversationsListOptionalParams,
  ConversationsDeleteOptionalParams,
  ConversationsUpdateOptionalParams,
  ConversationsCreateOptionalParams,
  ConversationsGetOptionalParams,
} from "../../api/conversations/options.js";

/** Interface representing a Conversations operations. */
export interface ConversationsOperations {
  /** List Conversation resources */
  list: (options?: ConversationsListOptionalParams) => PagedAsyncIterableIterator<Conversation>;
  /** Deletes a Conversation. */
  /** Delete a conversation. */
  deleteConversation: (
    conversationName: string,
    options?: ConversationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a Conversation. */
  update: (
    conversationName: string,
    resource: ConversationCreateOrUpdateContent,
    options?: ConversationsUpdateOptionalParams,
  ) => Promise<Conversation>;
  /** Creates a Conversation. */
  create: (
    projectName: string,
    options?: ConversationsCreateOptionalParams,
  ) => Promise<Conversation>;
  /** Fetch a Conversation by name. */
  get: (
    conversationName: string,
    options?: ConversationsGetOptionalParams,
  ) => Promise<Conversation>;
}
function _getConversations(context: WorkspaceContext) {
  return {
    list: (options?: ConversationsListOptionalParams) => list(context, options),
    deleteConversation: (conversationName: string, options?: ConversationsDeleteOptionalParams) =>
      $delete(context, conversationName, options),
    update: (
      conversationName: string,
      resource: ConversationCreateOrUpdateContent,
      options?: ConversationsUpdateOptionalParams,
    ) => stableUpdate(context, conversationName, resource as Conversation, options),
    create: (projectName: string, options?: ConversationsCreateOptionalParams) =>
      create(context, projectName, options),
    get: (conversationName: string, options?: ConversationsGetOptionalParams) =>
      get(context, conversationName, options),
  };
}
export function _getConversationsOperations(context: WorkspaceContext): ConversationsOperations {
  return {
    ..._getConversations(context),
  };
}
