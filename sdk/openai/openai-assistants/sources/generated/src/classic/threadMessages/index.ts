// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AssistantsContext } from "../../api/AssistantsContext.js";
import {
  OpenAIPageableListOf,
  ThreadMessage,
  MessageRole,
  MessageFile,
} from "../../models/models.js";
import {
  createMessage,
  listMessages,
  retrieveMessage,
  modifyMessage,
  listMessageFiles,
  retrieveMessageFile,
} from "../../api/threadMessages/index.js";
import {
  ThreadMessagesCreateMessageOptions,
  ThreadMessagesListMessagesOptions,
  ThreadMessagesRetrieveMessageOptions,
  ThreadMessagesModifyMessageOptions,
  ThreadMessagesListMessageFilesOptions,
  ThreadMessagesRetrieveMessageFileOptions,
} from "../../models/options.js";

export interface ThreadMessagesOperations {
  createMessage: (
    threadId: string,
    role: MessageRole,
    content: string,
    options?: ThreadMessagesCreateMessageOptions
  ) => Promise<ThreadMessage>;
  listMessages: (
    threadId: string,
    options?: ThreadMessagesListMessagesOptions
  ) => Promise<OpenAIPageableListOf>;
  retrieveMessage: (
    threadId: string,
    messageId: string,
    options?: ThreadMessagesRetrieveMessageOptions
  ) => Promise<ThreadMessage>;
  modifyMessage: (
    threadId: string,
    messageId: string,
    options?: ThreadMessagesModifyMessageOptions
  ) => Promise<ThreadMessage>;
  listMessageFiles: (
    threadId: string,
    messageId: string,
    options?: ThreadMessagesListMessageFilesOptions
  ) => Promise<OpenAIPageableListOf>;
  retrieveMessageFile: (
    threadId: string,
    messageId: string,
    fileId: string,
    options?: ThreadMessagesRetrieveMessageFileOptions
  ) => Promise<MessageFile>;
}

export function getThreadMessages(context: AssistantsContext) {
  return {
    createMessage: (
      threadId: string,
      role: MessageRole,
      content: string,
      options?: ThreadMessagesCreateMessageOptions
    ) => createMessage(context, threadId, role, content, options),
    listMessages: (
      threadId: string,
      options?: ThreadMessagesListMessagesOptions
    ) => listMessages(context, threadId, options),
    retrieveMessage: (
      threadId: string,
      messageId: string,
      options?: ThreadMessagesRetrieveMessageOptions
    ) => retrieveMessage(context, threadId, messageId, options),
    modifyMessage: (
      threadId: string,
      messageId: string,
      options?: ThreadMessagesModifyMessageOptions
    ) => modifyMessage(context, threadId, messageId, options),
    listMessageFiles: (
      threadId: string,
      messageId: string,
      options?: ThreadMessagesListMessageFilesOptions
    ) => listMessageFiles(context, threadId, messageId, options),
    retrieveMessageFile: (
      threadId: string,
      messageId: string,
      fileId: string,
      options?: ThreadMessagesRetrieveMessageFileOptions
    ) => retrieveMessageFile(context, threadId, messageId, fileId, options),
  };
}

export function getThreadMessagesOperations(
  context: AssistantsContext
): ThreadMessagesOperations {
  return {
    ...getThreadMessages(context),
  };
}
