// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { HttpResponse } from "@azure/ms-rest-js";
import * as Models from "./generated/lib/models";
import { Aborter } from "./Aborter";
import { Messages } from "./generated/lib/operations";
import { Pipeline } from "./Pipeline";
import { StorageClient } from "./StorageClient";
import { appendToURLPath } from "./utils/utils.common";
import { MessageIdClient } from "./MessageIdClient";

export interface MessagesClearOptions {
  abortSignal?: Aborter;
}

export interface MessagesEnqueueOptions extends Models.MessagesEnqueueOptionalParams {
}

export interface MessagesDequeueOptions extends Models.MessagesDequeueOptionalParams {
}

export interface MessagesPeekOptions extends Models.MessagesPeekOptionalParams {
}

export declare type MessagesEnqueueResponse = {
  /**
   * @member {string} messageId The ID of the enqueued Message.
   */
  messageId: string;
  /**
   * @member {string} popReceipt This value is required to delete the Message.
   * If deletion fails using this popreceipt then the message has been dequeued
   * by another client.
   */
  popReceipt: string;
  /**
   * @member {Date} insertionTime The time that the message was inserted into the
   * Queue.
   */
  insertionTime: Date;
  /**
   * @member {Date} expirationTime The time that the message will expire and be
   * automatically deleted.
   */
  expirationTime: Date;
  /**
   * @member {Date} timeNextVisible The time that the message will again become
   * visible in the Queue.
   */
  timeNextVisible: Date;
} & Models.MessagesEnqueueHeaders & {
  /**
   * The underlying HTTP response.
   */
  _response: HttpResponse & {
    /**
     * The parsed HTTP response headers.
     */
    parsedHeaders: Models.MessagesEnqueueHeaders;
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: Models.EnqueuedMessage[];
  };
};

export declare type MessagesDequeueResponse = {
  dequeuedMessageItems: Models.DequeuedMessageItem[];
} & Models.MessagesDequeueHeaders & {
  /**
   * The underlying HTTP response.
   */
  _response: HttpResponse & {
    /**
     * The parsed HTTP response headers.
     */
    parsedHeaders: Models.MessagesDequeueHeaders;
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: Models.DequeuedMessageItem[];
  };
};

export declare type MessagesPeekResponse = {
  peekedMessageItems: Models.PeekedMessageItem[];
} & Models.MessagesPeekHeaders & {
  /**
   * The underlying HTTP response.
   */
  _response: HttpResponse & {
    /**
     * The parsed HTTP response headers.
     */
    parsedHeaders: Models.MessagesPeekHeaders;
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: Models.PeekedMessageItem[];
  };
};

/**
 * A MessagesClient represents a URL to an Azure Storage Queue's messages allowing you to manipulate its messages.
 *
 * @export
 * @class MessagesClient
 * @extends {StorageClient}
 */
export class MessagesClient extends StorageClient {
  /**
   * messagesContext provided by protocol layer.
   *
   * @private
   * @type {Messages}
   * @memberof MessagesClient
   */
  private messagesContext: Messages;

  /**
   * Creates an instance of MessagesClient.
   * @param {string} url A URL string pointing to Azure Storage queue's messages, such as
   *                     "https://myaccount.queue.core.windows.net/myqueue/messages". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.queue.core.windows.net/myqueue/messages?sasString".
   * @param {Pipeline} pipeline Call StorageClient.newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof MessagesClient
   */
  constructor(url: string, pipeline: Pipeline) {
    super(url, pipeline);
    this.messagesContext = new Messages(this.storageClientContext);
  }

  /**
   * Clear deletes all messages from a queue.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/clear-messages
   *
   * @param {MessagesClearOptions} [options] Optional options to Messages clear operation.
   * @returns {Promise<Models.MessageClearResponse>}
   * @memberof MessagesClient
   */
  public async clear(
    options: MessagesClearOptions = {}
  ): Promise<Models.MessagesClearResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.messagesContext.clear({
      abortSignal: aborter
    });
  }

  /**
   * Creates a MessageIdClient object.
   * @param messageId
   */
  public createMessageIdClient(
    messageId: string
  ): MessageIdClient {
    return new MessageIdClient(
      appendToURLPath(this.url, messageId),
      this.pipeline
    );
  }

  /**
   * Enqueue adds a new message to the back of a queue. The visibility timeout specifies how long
   * the message should be invisible to Dequeue and Peek operations.
   * The message content is up to 64KB in size, and must be in a format that can be included in an XML request with UTF-8 encoding.
   * To include markup in the message, the contents of the message must either be XML-escaped or Base64-encode.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/put-message
   *
   * @param {string} messageText
   * @param {MessagesEnqueueOptionas} [options] Optional optiosn to Messages enqueue operation.
   * @returns {Promise<Models.MessagesEnqueueResponse>}
   * @memberof MessagesClient
   */
  public async enqueue(
    messageText: string,
    options: MessagesEnqueueOptions = {}
  ): Promise<MessagesEnqueueResponse> {
    const aborter = options.abortSignal || Aborter.none;
    const response = await this.messagesContext.enqueue(
      {
        messageText: messageText
      },
      {
        abortSignal: aborter,
        ...options
      }
    );
    const item = response[0];
    return {
      _response: response._response,
      date: response.date,
      requestId: response.requestId,
      version: response.version,
      errorCode: response.errorCode,
      messageId: item.messageId,
      popReceipt: item.popReceipt,
      timeNextVisible: item.timeNextVisible,
      insertionTime: item.insertionTime,
      expirationTime: item.expirationTime
    };
  }

  /**
   * Dequeue retrieves one or more messages from the front of the queue.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-messages
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {MessagesDequeueOptionals} [options] Optional optiosn to Messages dequeue operation.
   * @returns {Promise<Models.MessagesDequeueResponse>}
   * @memberof MessagesClient
   */
  public async dequeue(
    options: MessagesDequeueOptions = {}
  ): Promise<MessagesDequeueResponse> {
    const aborter = options.abortSignal || Aborter.none;
    const response = await this.messagesContext.dequeue({
      abortSignal: aborter,
      ...options
    });

    const res: MessagesDequeueResponse = {
      _response: response._response,
      date: response.date,
      requestId: response.requestId,
      dequeuedMessageItems: [],
      version: response.version,
      errorCode: response.errorCode
    };

    for (const item of response) {
      res.dequeuedMessageItems.push(item);
    }

    return res;
  }

  /**
   * Peek retrieves one or more messages from the front of the queue but does not alter the visibility of the message.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/peek-messages
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {MessagesPeekOptions} [options] Optional optiosn to Messages peek operation.
   * @returns {Promise<Models.MessagesPeekResponse>}
   * @memberof MessagesClient
   */
  public async peek(
    options: MessagesPeekOptions = {}
  ): Promise<MessagesPeekResponse> {
    const aborter = options.abortSignal || Aborter.none;
    const response = await this.messagesContext.peek({
      abortSignal: aborter,
      ...options
    });

    const res: MessagesPeekResponse = {
      _response: response._response,
      date: response.date,
      requestId: response.requestId,
      peekedMessageItems: [],
      version: response.version,
      errorCode: response.errorCode
    };

    for (const item of response) {
      res.peekedMessageItems.push(item);
    }

    return res;
  }
}
