// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  deleteMessage,
  update,
  peekMessages,
  sendMessage,
  clear,
  receiveMessages,
  setAccessPolicy,
  getAccessPolicy,
  setMetadata,
  $delete,
  getMetadata,
  create,
} from "./operations.js";
export type {
  QueueDeleteMessageOptionalParams,
  QueueUpdateOptionalParams,
  QueuePeekMessagesOptionalParams,
  QueueSendMessageOptionalParams,
  QueueClearOptionalParams,
  QueueReceiveMessagesOptionalParams,
  QueueSetAccessPolicyOptionalParams,
  QueueGetAccessPolicyOptionalParams,
  QueueSetMetadataOptionalParams,
  QueueDeleteOptionalParams,
  QueueGetMetadataOptionalParams,
  QueueCreateOptionalParams,
} from "./options.js";
