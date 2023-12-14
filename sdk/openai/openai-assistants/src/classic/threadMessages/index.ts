// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

import { AssistantsContext } from "../../api/AssistantsContext.js";
import {
  createMessage,
  listMessageFiles,
  listMessages,
  modifyMessage,
  retrieveMessage,
  retrieveMessageFile,
} from "../../api/threadMessages/index.js";
import {
  ListResponseOf,
  MessageRole,
  ThreadMessage,
  ThreadMessageFile,
} from "../../models/models.js";
import {
  ThreadMessagesCreateMessageOptions,
  ThreadMessagesListMessageFilesOptions,
  ThreadMessagesListMessagesOptions,
  ThreadMessagesModifyMessageOptions,
  ThreadMessagesRetrieveMessageFileOptions,
  ThreadMessagesRetrieveMessageOptions,
} from "../../models/options.js";

export interface ThreadMessagesOperations {
  createMessage: (
    threadId: string,
    role: string,
    content: string,
    options?: ThreadMessagesCreateMessageOptions
  ) => Promise<ThreadMessage>;
  listMessages: (
    threadId: string,
    options?: ThreadMessagesListMessagesOptions
  ) => Promise<ListResponseOf<ThreadMessage>>;
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
  ) => Promise<ListResponseOf<ThreadMessageFile>>;
  retrieveMessageFile: (
    threadId: string,
    messageId: string,
    fileId: string,
    options?: ThreadMessagesRetrieveMessageFileOptions
  ) => Promise<ThreadMessageFile>;
}

export function getThreadMessages(context: AssistantsContext) {
  return {
    createMessage: (
      threadId: string,
      role: MessageRole,
      content: string,
      options?: ThreadMessagesCreateMessageOptions
    ) => createMessage(context, threadId, role, content, options),
    listMessages: (threadId: string, options?: ThreadMessagesListMessagesOptions) =>
      listMessages(context, threadId, options),
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

export function getThreadMessagesOperations(context: AssistantsContext): ThreadMessagesOperations {
  return {
    ...getThreadMessages(context),
  };
}
