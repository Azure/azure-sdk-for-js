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
  ConversationsStableUpdateOptionalParams,
  ConversationsCreateOptionalParams,
  ConversationsGetOptionalParams,
} from "../../api/conversations/options.js";

/** Interface representing a Conversations operations. */
export interface ConversationsOperations {
  /** List Conversation resources */
  list: (options?: ConversationsListOptionalParams) => PagedAsyncIterableIterator<Conversation>;
  /** Deletes a Conversation. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (conversationName: string, options?: ConversationsDeleteOptionalParams) => Promise<void>;
  /** Updates a Conversation. */
  update: (
    conversationName: string,
    resource: ConversationCreateOrUpdateContent,
    options?: ConversationsStableUpdateOptionalParams,
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
    delete: (conversationName: string, options?: ConversationsDeleteOptionalParams) =>
      $delete(context, conversationName, options),
    update: (
      conversationName: string,
      resource: ConversationCreateOrUpdateContent,
      options?: ConversationsStableUpdateOptionalParams,
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
