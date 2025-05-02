// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AgentsContext } from "../../api/agentsContext.js";
import {
  MessageRole,
  MessageInputContent,
  ThreadMessage,
  OpenAIPageableListOfThreadMessage,
} from "../../models/models.js";
import {
  MessagesUpdateMessageOptionalParams,
  MessagesGetMessageOptionalParams,
  MessagesListMessagesOptionalParams,
  MessagesCreateMessageOptionalParams,
} from "../../api/messages/options.js";
import {
  updateMessage,
  getMessage,
  listMessages,
  createMessage,
} from "../../api/messages/operations.js";

/** Interface representing a Messages operations. */
export interface MessagesOperations {
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
  ) => Promise<OpenAIPageableListOfThreadMessage>;
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
    updateMessage: (
      threadId: string,
      messageId: string,
      options?: MessagesUpdateMessageOptionalParams,
    ) => updateMessage(context, threadId, messageId, options),
    getMessage: (
      threadId: string,
      messageId: string,
      options?: MessagesGetMessageOptionalParams,
    ) => getMessage(context, threadId, messageId, options),
    listMessages: (
      threadId: string,
      options?: MessagesListMessagesOptionalParams,
    ) => listMessages(context, threadId, options),
    createMessage: (
      threadId: string,
      role: MessageRole,
      content: MessageInputContent,
      options?: MessagesCreateMessageOptionalParams,
    ) => createMessage(context, threadId, role, content, options),
  };
}

export function _getMessagesOperations(
  context: AgentsContext,
): MessagesOperations {
  return {
    ..._getMessages(context),
  };
}
