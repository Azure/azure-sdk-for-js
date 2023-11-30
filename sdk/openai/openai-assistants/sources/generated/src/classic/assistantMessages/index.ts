// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AssistantsContext } from "../../api/AssistantsContext.js";
import {
  ListResponseOf,
  AssistantMessage,
  AssistantRole,
  AssistantMessageFile,
} from "../../models/models.js";
import {
  createMessage,
  listMessages,
  retrieveMessage,
  modifyMessage,
  listMessageFiles,
  retrieveMessageFile,
} from "../../api/assistantMessages/index.js";
import {
  AssistantMessagesCreateMessageOptions,
  AssistantMessagesListMessagesOptions,
  AssistantMessagesRetrieveMessageOptions,
  AssistantMessagesModifyMessageOptions,
  AssistantMessagesListMessageFilesOptions,
  AssistantMessagesRetrieveMessageFileOptions,
} from "../../models/options.js";

export interface AssistantMessagesOperations {
  createMessage: (
    threadId: string,
    role: AssistantRole,
    content: string,
    options?: AssistantMessagesCreateMessageOptions
  ) => Promise<AssistantMessage>;
  listMessages: (
    threadId: string,
    options?: AssistantMessagesListMessagesOptions
  ) => Promise<ListResponseOf>;
  retrieveMessage: (
    threadId: string,
    messageId: string,
    options?: AssistantMessagesRetrieveMessageOptions
  ) => Promise<AssistantMessage>;
  modifyMessage: (
    threadId: string,
    messageId: string,
    options?: AssistantMessagesModifyMessageOptions
  ) => Promise<AssistantMessage>;
  listMessageFiles: (
    threadId: string,
    messageId: string,
    options?: AssistantMessagesListMessageFilesOptions
  ) => Promise<ListResponseOf>;
  retrieveMessageFile: (
    threadId: string,
    messageId: string,
    fileId: string,
    options?: AssistantMessagesRetrieveMessageFileOptions
  ) => Promise<AssistantMessageFile>;
}

export function getAssistantMessages(context: AssistantsContext) {
  return {
    createMessage: (
      threadId: string,
      role: AssistantRole,
      content: string,
      options?: AssistantMessagesCreateMessageOptions
    ) => createMessage(context, threadId, role, content, options),
    listMessages: (
      threadId: string,
      options?: AssistantMessagesListMessagesOptions
    ) => listMessages(context, threadId, options),
    retrieveMessage: (
      threadId: string,
      messageId: string,
      options?: AssistantMessagesRetrieveMessageOptions
    ) => retrieveMessage(context, threadId, messageId, options),
    modifyMessage: (
      threadId: string,
      messageId: string,
      options?: AssistantMessagesModifyMessageOptions
    ) => modifyMessage(context, threadId, messageId, options),
    listMessageFiles: (
      threadId: string,
      messageId: string,
      options?: AssistantMessagesListMessageFilesOptions
    ) => listMessageFiles(context, threadId, messageId, options),
    retrieveMessageFile: (
      threadId: string,
      messageId: string,
      fileId: string,
      options?: AssistantMessagesRetrieveMessageFileOptions
    ) => retrieveMessageFile(context, threadId, messageId, fileId, options),
  };
}

export function getAssistantMessagesOperations(
  context: AssistantsContext
): AssistantMessagesOperations {
  return {
    ...getAssistantMessages(context),
  };
}
