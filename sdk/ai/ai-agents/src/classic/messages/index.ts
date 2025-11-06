// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AgentsContext } from "../../api/agentsContext.js";
import {
  $delete,
  updateMessage,
  getMessage,
  listMessages,
  createMessage,
} from "../../api/messages/operations.js";
import type {
  MessagesDeleteOptionalParams,
  MessagesUpdateMessageOptionalParams,
  MessagesGetMessageOptionalParams,
  MessagesListMessagesOptionalParams,
  MessagesCreateMessageOptionalParams,
} from "../../api/messages/options.js";
import type {
  MessageRole,
  MessageInputContent,
  ThreadMessage,
  MessageDeletionStatus,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Messages operations. */
export interface MessagesOperations {
  /** Deletes an existing message on an existing thread. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    threadId: string,
    messageId: string,
    options?: MessagesDeleteOptionalParams,
  ) => Promise<MessageDeletionStatus>;
  /** Modifies an existing message on an existing thread. */
  updateMessage: (
    threadId: string,
    messageId: string,
    options?: MessagesUpdateMessageOptionalParams,
  ) => Promise<ThreadMessage>;
  /** Retrieves an existing message. */
  getMessage: (
    threadId: string,
    messageId: string,
    options?: MessagesGetMessageOptionalParams,
  ) => Promise<ThreadMessage>;
  /** Gets a list of messages that exist on a thread. */
  listMessages: (
    threadId: string,
    options?: MessagesListMessagesOptionalParams,
  ) => PagedAsyncIterableIterator<ThreadMessage>;
  /** Creates a new message on a specified thread. */
  createMessage: (
    threadId: string,
    role: MessageRole,
    content: MessageInputContent,
    options?: MessagesCreateMessageOptionalParams,
  ) => Promise<ThreadMessage>;
}

function _getMessages(context: AgentsContext) {
  return {
    delete: (threadId: string, messageId: string, options?: MessagesDeleteOptionalParams) =>
      $delete(context, threadId, messageId, options),
    updateMessage: (
      threadId: string,
      messageId: string,
      options?: MessagesUpdateMessageOptionalParams,
    ) => updateMessage(context, threadId, messageId, options),
    getMessage: (threadId: string, messageId: string, options?: MessagesGetMessageOptionalParams) =>
      getMessage(context, threadId, messageId, options),
    listMessages: (threadId: string, options?: MessagesListMessagesOptionalParams) =>
      listMessages(context, threadId, options),
    createMessage: (
      threadId: string,
      role: MessageRole,
      content: MessageInputContent,
      options?: MessagesCreateMessageOptionalParams,
    ) => createMessage(context, threadId, role, content, options),
  };
}

export function _getMessagesOperations(context: AgentsContext): MessagesOperations {
  return {
    ..._getMessages(context),
  };
}
