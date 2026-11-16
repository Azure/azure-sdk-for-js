// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkspaceContext } from "../../api/workspaceContext.js";
import { Conversation } from "../../../models/microsoft/discovery/workspace/models.js";
import { PagedConversation } from "../../../models/models.js";
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
  list: (options?: ConversationsListOptionalParams) => Promise<PagedConversation>;
  /** Deletes a Conversation. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (conversationName: string, options?: ConversationsDeleteOptionalParams) => Promise<void>;
  /** Updates a Conversation. */
  stableUpdate: (
    conversationName: string,
    resource: Conversation,
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
    stableUpdate: (
      conversationName: string,
      resource: Conversation,
      options?: ConversationsStableUpdateOptionalParams,
    ) => stableUpdate(context, conversationName, resource, options),
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
