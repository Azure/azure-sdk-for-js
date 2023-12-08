// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ListResponseOf,
} from "../../models/models.js";
import {
  AssistantMessage,
  AssistantRole,
  AssistantMessageFile,
} from "../../../generated/src/models/models.js";
import {
  AssistantMessagesCreateMessageOptions,
  AssistantMessagesListMessagesOptions,
  AssistantMessagesRetrieveMessageOptions,
  AssistantMessagesModifyMessageOptions,
  AssistantMessagesListMessageFilesOptions,
  AssistantMessagesRetrieveMessageFileOptions,
} from "../../../generated/src/models/options.js";

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
  ) => Promise<ListResponseOf<AssistantMessage>>;
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
  ) => Promise<ListResponseOf<AssistantMessageFile>>;
  retrieveMessageFile: (
    threadId: string,
    messageId: string,
    fileId: string,
    options?: AssistantMessagesRetrieveMessageFileOptions
  ) => Promise<AssistantMessageFile>;
}