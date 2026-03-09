// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { QueuesContext } from "../../api/queuesContext.js";
import {
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
} from "../../api/queue/operations.js";
import {
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
} from "../../api/queue/options.js";
import {
  SignedIdentifiers,
  ListOfReceivedMessage,
  QueueMessage,
  ListOfSentMessage,
  ListOfPeekedMessage,
} from "../../models/azure/storage/queues/models.js";
import { StorageCompatResponseInfo } from "../../static-helpers/storageCompatResponse.js";

/** Interface representing a Queue operations. */
export interface QueueOperations {
  /** The Delete operation deletes the specified message. */
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
  /**
   * The Update operation was introduced with version 2011-08-18 of the Queue
   * service API. The Update Message operation updates the visibility timeout of a
   * message. You can also use this operation to update the contents of a message. A
   * message must be in a format that can be included in an XML request with UTF-8
   * encoding, and the encoded message can be up to 64KB in size.
   */
  update: (
    messageId: string,
    popReceipt: string,
    visibilityTimeout: number,
    options?: QueueUpdateOptionalParams,
  ) => Promise<
    {
      popReceipt: string;
      timeNextVisible: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
      date: Date;
    } & StorageCompatResponseInfo<
      undefined,
      {
        popReceipt: string;
        timeNextVisible: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
        date: Date;
      }
    >
  >;
  /**
   * The Peek operation retrieves one or more messages from the front of the queue,
   * but does not alter the visibility of the message.
   */
  peekMessages: (
    options?: QueuePeekMessagesOptionalParams,
  ) => Promise<
    {
      version: string;
      requestId?: string;
      clientRequestId?: string;
      date: Date;
      contentType: "application/xml";
    } & ListOfPeekedMessage &
      StorageCompatResponseInfo<
        ListOfPeekedMessage,
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
   * The Enqueue operation adds a new message to the back of the message queue. A
   * visibility timeout can also be specified to make the message invisible until
   * the visibility timeout expires. A message must be in a format that can be
   * included in an XML request with UTF-8 encoding. The encoded message can be up
   * to 64 KB in size for versions 2011-08-18 and newer, or 8 KB in size for
   * previous versions.
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
  /** The Clear operation deletes all messages from the specified queue. */
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
  /**
   * The Dequeue operation retrieves one or more messages from the front of the
   * queue.
   */
  receiveMessages: (
    options?: QueueReceiveMessagesOptionalParams,
  ) => Promise<
    {
      version: string;
      requestId?: string;
      clientRequestId?: string;
      date: Date;
      contentType: "application/xml";
    } & ListOfReceivedMessage &
      StorageCompatResponseInfo<
        ListOfReceivedMessage,
        {
          version: string;
          requestId?: string;
          clientRequestId?: string;
          date: Date;
          contentType: "application/xml";
        }
      >
  >;
  /** sets the permissions for the specified queue. */
  setAccessPolicy: (
    queueAcl: SignedIdentifiers,
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
  /** gets the permissions for the specified queue. The permissions indicate whether queue data may be accessed publicly. */
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
  /** operation sets one or more user-defined name-value pairs for the specified queue. */
  setMetadata: (
    metadata: string,
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
  /** operation permanently deletes the specified queue */
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
  /** returns all user-defined metadata and system properties for the specified queue. */
  getMetadata: (
    options?: QueueGetMetadataOptionalParams,
  ) => Promise<
    {
      metadata?: string;
      approximateMessagesCount?: number;
      version: string;
      requestId?: string;
      clientRequestId?: string;
      date: Date;
    } & StorageCompatResponseInfo<
      undefined,
      {
        metadata?: string;
        approximateMessagesCount?: number;
        version: string;
        requestId?: string;
        clientRequestId?: string;
        date: Date;
      }
    >
  >;
  /** Creates a new queue under the specified account. If the queue with the same name already exists, the operation fails. */
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
    update: (
      messageId: string,
      popReceipt: string,
      visibilityTimeout: number,
      options?: QueueUpdateOptionalParams,
    ) => update(context, messageId, popReceipt, visibilityTimeout, options),
    peekMessages: (options?: QueuePeekMessagesOptionalParams) => peekMessages(context, options),
    sendMessage: (queueMessage: QueueMessage, options?: QueueSendMessageOptionalParams) =>
      sendMessage(context, queueMessage, options),
    clear: (options?: QueueClearOptionalParams) => clear(context, options),
    receiveMessages: (options?: QueueReceiveMessagesOptionalParams) =>
      receiveMessages(context, options),
    setAccessPolicy: (queueAcl: SignedIdentifiers, options?: QueueSetAccessPolicyOptionalParams) =>
      setAccessPolicy(context, queueAcl, options),
    getAccessPolicy: (options?: QueueGetAccessPolicyOptionalParams) =>
      getAccessPolicy(context, options),
    setMetadata: (metadata: string, options?: QueueSetMetadataOptionalParams) =>
      setMetadata(context, metadata, options),
    delete: (options?: QueueDeleteOptionalParams) => $delete(context, options),
    getMetadata: (options?: QueueGetMetadataOptionalParams) => getMetadata(context, options),
    create: (options?: QueueCreateOptionalParams) => create(context, options),
  };
}

export function _getQueueOperations(context: QueuesContext): QueueOperations {
  return {
    ..._getQueue(context),
  };
}
