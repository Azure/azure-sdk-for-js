// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AgentsContext } from "../../api/agentsContext.js";
import {
  MessageRole,
  MessageInputContent,
  ThreadMessage,
  MessageDeletionStatus,
} from "../../models/models.js";
import {
  MessagesDeleteOptionalParams,
  MessagesUpdateMessageOptionalParams,
  MessagesGetMessageOptionalParams,
  MessagesListMessagesOptionalParams,
  MessagesCreateMessageOptionalParams,
} from "../../api/messages/options.js";
import {
  $delete,
  updateMessage,
  getMessage,
  listMessages,
  createMessage,
} from "../../api/messages/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Messages operations. */
export interface MessagesOperations {
  /** Deletes an existing message on an existing thread. */
  delete: (
    threadId: string,
    messageId: string,
    options?: MessagesDeleteOptionalParams,
  ) => Promise<MessageDeletionStatus>;
  /** Modifies an existing message on an existing thread. */
  update: (
    threadId: string,
    messageId: string,
    options?: MessagesUpdateMessageOptionalParams,
  ) => Promise<ThreadMessage>;
  /** Retrieves an existing message. */
  get: (
    threadId: string,
    messageId: string,
    options?: MessagesGetMessageOptionalParams,
  ) => Promise<ThreadMessage>;
  /** Gets a list of messages that exist on a thread. */
  list: (
    threadId: string,
    options?: MessagesListMessagesOptionalParams,
  ) => PagedAsyncIterableIterator<ThreadMessage>;
  /** Creates a new message on a specified thread. */
  create: (
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
    update: (threadId: string, messageId: string, options?: MessagesUpdateMessageOptionalParams) =>
      updateMessage(context, threadId, messageId, options),
    get: (threadId: string, messageId: string, options?: MessagesGetMessageOptionalParams) =>
      getMessage(context, threadId, messageId, options),
    list: (threadId: string, options?: MessagesListMessagesOptionalParams) =>
      listMessages(context, threadId, options),
    create: (
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
