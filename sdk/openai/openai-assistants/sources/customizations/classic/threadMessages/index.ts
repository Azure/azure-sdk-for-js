// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ListResponseOf } from "../../models/models.js";
import {
  ThreadMessage,
  MessageFile,
} from "../../../generated/src/models/models.js";
import {
  ThreadMessagesCreateMessageOptions,
  ThreadMessagesListMessagesOptions,
  ThreadMessagesRetrieveMessageOptions,
  ThreadMessagesModifyMessageOptions,
  ThreadMessagesListMessageFilesOptions,
  ThreadMessagesRetrieveMessageFileOptions,
} from "../../../generated/src/models/options.js";

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
  ) => Promise<ListResponseOf<MessageFile>>;
  retrieveMessageFile: (
    threadId: string,
    messageId: string,
    fileId: string,
    options?: ThreadMessagesRetrieveMessageFileOptions
  ) => Promise<ThreadMessageFile>;
}
