// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { QueuesContext } from "../../api/queuesContext.js";
import {
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
} from "../../api/queue/operations.js";
import {
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
} from "../../api/queue/options.js";
import {
  SignedIdentifiers,
  ReceivedMessages,
  QueueMessage,
  ListOfSentMessage,
  PeekedMessages,
} from "../../models/models.js";
import { StorageCompatResponseInfo } from "../../static-helpers/storageCompatResponse.js";

/** Interface representing a Queue operations. */
export interface QueueOperations {
  /** Deletes the specified message. */
  deleteMessage: (
    messageId: string,
    popReceipt: string,
    options?: QueueDeleteMessageOptionalParams,
  ) => Promise<
    {
      version: string;
      requestId?: string;
      clientRequestId?: string;
      date: Date;
    } & StorageCompatResponseInfo<
      undefined,
      { version: string; requestId?: string; clientRequestId?: string; date: Date }
    >
  >;
  /** Updates the visibility timeout of a message. This operation can also be used to update the contents of a message. */
  updateMessage: (
    messageId: string,
    popReceipt: string,
    visibilityTimeout: number,
    options?: QueueUpdateMessageOptionalParams,
  ) => Promise<
    {
      popReceipt: string;
      nextVisibleOn: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
      date: Date;
    } & StorageCompatResponseInfo<
      undefined,
      {
        popReceipt: string;
        nextVisibleOn: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
        date: Date;
      }
    >
  >;
  /** Retrieves one or more messages from the front of the queue, but does not alter the visibility of the message. */
  peekMessages: (
    options?: QueuePeekMessagesOptionalParams,
  ) => Promise<
    {
      version: string;
      requestId?: string;
      clientRequestId?: string;
      date: Date;
      contentType: "application/xml";
    } & PeekedMessages &
      StorageCompatResponseInfo<
        PeekedMessages,
        {
          version: string;
          requestId?: string;
          clientRequestId?: string;
          date: Date;
          contentType: "application/xml";
        }
      >
  >;
  /**
   * Adds a new message to the back of the message queue. A visibility timeout
   * can also be specified to make the message invisible until the visibility timeout
   * expires.
   */
  sendMessage: (
    queueMessage: QueueMessage,
    options?: QueueSendMessageOptionalParams,
  ) => Promise<
    {
      version: string;
      requestId?: string;
      clientRequestId?: string;
      date: Date;
      contentType: "application/xml";
    } & ListOfSentMessage &
      StorageCompatResponseInfo<
        ListOfSentMessage,
        {
          version: string;
          requestId?: string;
          clientRequestId?: string;
          date: Date;
          contentType: "application/xml";
        }
      >
  >;
  /** Deletes all messages from the specified queue. */
  clear: (
    options?: QueueClearOptionalParams,
  ) => Promise<
    {
      version: string;
      requestId?: string;
      clientRequestId?: string;
      date: Date;
    } & StorageCompatResponseInfo<
      undefined,
      { version: string; requestId?: string; clientRequestId?: string; date: Date }
    >
  >;
  /** Retrieves one or more messages from the front of the queue. */
  receiveMessages: (
    options?: QueueReceiveMessagesOptionalParams,
  ) => Promise<
    {
      version: string;
      requestId?: string;
      clientRequestId?: string;
      date: Date;
      contentType: "application/xml";
    } & ReceivedMessages &
      StorageCompatResponseInfo<
        ReceivedMessages,
        {
          version: string;
          requestId?: string;
          clientRequestId?: string;
          date: Date;
          contentType: "application/xml";
        }
      >
  >;
  /** Sets the permissions for the specified queue. */
  setAccessPolicy: (
    options?: QueueSetAccessPolicyOptionalParams,
  ) => Promise<
    {
      version: string;
      requestId?: string;
      clientRequestId?: string;
      date: Date;
    } & StorageCompatResponseInfo<
      undefined,
      { version: string; requestId?: string; clientRequestId?: string; date: Date }
    >
  >;
  /** Gets the access policy for the specified queue. */
  getAccessPolicy: (
    options?: QueueGetAccessPolicyOptionalParams,
  ) => Promise<
    {
      version: string;
      requestId?: string;
      clientRequestId?: string;
      date: Date;
      contentType: "application/xml";
    } & SignedIdentifiers &
      StorageCompatResponseInfo<
        SignedIdentifiers,
        {
          version: string;
          requestId?: string;
          clientRequestId?: string;
          date: Date;
          contentType: "application/xml";
        }
      >
  >;
  /** Sets user-defined metadata for the specified queue. */
  setMetadata: (
    options?: QueueSetMetadataOptionalParams,
  ) => Promise<
    {
      version: string;
      requestId?: string;
      clientRequestId?: string;
      date: Date;
    } & StorageCompatResponseInfo<
      undefined,
      { version: string; requestId?: string; clientRequestId?: string; date: Date }
    >
  >;
  /** Permanently deletes the specified queue. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    options?: QueueDeleteOptionalParams,
  ) => Promise<
    {
      version: string;
      requestId?: string;
      clientRequestId?: string;
      date: Date;
    } & StorageCompatResponseInfo<
      undefined,
      { version: string; requestId?: string; clientRequestId?: string; date: Date }
    >
  >;
  /** Returns all user-defined metadata and system properties for the specified queue. */
  getProperties: (
    options?: QueueGetPropertiesOptionalParams,
  ) => Promise<
    {
      approximateMessagesCount?: number;
      version: string;
      requestId?: string;
      clientRequestId?: string;
      date: Date;
    } & StorageCompatResponseInfo<
      undefined,
      {
        approximateMessagesCount?: number;
        version: string;
        requestId?: string;
        clientRequestId?: string;
        date: Date;
      }
    >
  >;
  /**
   * Creates a new queue. If a queue with the same name already exists, the operation succeeds when the metadata
   * is identical. If the metadata differs, the operation fails.
   */
  create: (
    options?: QueueCreateOptionalParams,
  ) => Promise<
    {
      version: string;
      requestId?: string;
      clientRequestId?: string;
      date: Date;
    } & StorageCompatResponseInfo<
      undefined,
      { version: string; requestId?: string; clientRequestId?: string; date: Date }
    >
  >;
}

function _getQueue(context: QueuesContext) {
  return {
    deleteMessage: (
      messageId: string,
      popReceipt: string,
      options?: QueueDeleteMessageOptionalParams,
    ) => deleteMessage(context, messageId, popReceipt, options),
    updateMessage: (
      messageId: string,
      popReceipt: string,
      visibilityTimeout: number,
      options?: QueueUpdateMessageOptionalParams,
    ) => updateMessage(context, messageId, popReceipt, visibilityTimeout, options),
    peekMessages: (options?: QueuePeekMessagesOptionalParams) => peekMessages(context, options),
    sendMessage: (queueMessage: QueueMessage, options?: QueueSendMessageOptionalParams) =>
      sendMessage(context, queueMessage, options),
    clear: (options?: QueueClearOptionalParams) => clear(context, options),
    receiveMessages: (options?: QueueReceiveMessagesOptionalParams) =>
      receiveMessages(context, options),
    setAccessPolicy: (options?: QueueSetAccessPolicyOptionalParams) =>
      setAccessPolicy(context, options),
    getAccessPolicy: (options?: QueueGetAccessPolicyOptionalParams) =>
      getAccessPolicy(context, options),
    setMetadata: (options?: QueueSetMetadataOptionalParams) => setMetadata(context, options),
    delete: (options?: QueueDeleteOptionalParams) => $delete(context, options),
    getProperties: (options?: QueueGetPropertiesOptionalParams) => getProperties(context, options),
    create: (options?: QueueCreateOptionalParams) => create(context, options),
  };
}

export function _getQueueOperations(context: QueuesContext): QueueOperations {
  return {
    ..._getQueue(context),
  };
}
