// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  deleteMessage,
  updateMessage,
  peekMessages,
  sendMessage,
  clear,
  receiveMessages,
  setAccessPolicy,
  getAccessPolicy,
  setMetadata,
  $delete,
  getProperties,
  create,
} from "./operations.js";
export type {
  QueueDeleteMessageOptionalParams,
  QueueUpdateMessageOptionalParams,
  QueuePeekMessagesOptionalParams,
  QueueSendMessageOptionalParams,
  QueueClearOptionalParams,
  QueueReceiveMessagesOptionalParams,
  QueueSetAccessPolicyOptionalParams,
  QueueGetAccessPolicyOptionalParams,
  QueueSetMetadataOptionalParams,
  QueueDeleteOptionalParams,
  QueueGetPropertiesOptionalParams,
  QueueCreateOptionalParams,
} from "./options.js";
