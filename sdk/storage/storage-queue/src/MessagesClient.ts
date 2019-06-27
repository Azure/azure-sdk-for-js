// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { HttpResponse, TokenCredential, isTokenCredential, isNode } from "@azure/core-http";
import * as Models from "./generated/lib/models";
import { Aborter } from "./Aborter";
import { Messages } from "./generated/lib/operations";
import { newPipeline, NewPipelineOptions, Pipeline } from "./Pipeline";
import { StorageClient } from "./StorageClient";
import { appendToURLPath, extractConnectionStringParts } from "./utils/utils.common";
import { MessageIdClient } from "./MessageIdClient";
import { SharedKeyCredential } from "./credentials/SharedKeyCredential";
import { Credential } from "./credentials/Credential";
import { AnonymousCredential } from "./credentials/AnonymousCredential";

/**
 * Options to configure Messages - Clear operation
 *
 * @export
 * @interface MessagesClearOptions
 */
export interface MessagesClearOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: Aborter;
}

/**
 * Options to configure Messages - Enqueue operation
 *
 * @export
 * @interface MessagesEnqueueOptions
 * @extends {Models.MessagesEnqueueOptionalParams}
 */
export interface MessagesEnqueueOptions extends Models.MessagesEnqueueOptionalParams {}

/**
 * Options to configure Messages - Dequeue operation
 *
 * @export
 * @interface MessagesDequeueOptions
 * @extends {Models.MessagesDequeueOptionalParams}
 */
export interface MessagesDequeueOptions extends Models.MessagesDequeueOptionalParams {}

/**
 * Options to configure Messages - Peek operation
 *
 * @export
 * @interface MessagesPeekOptions
 * @extends {Models.MessagesPeekOptionalParams}
 */
export interface MessagesPeekOptions extends Models.MessagesPeekOptionalParams {}

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
   * ONLY AVAILABLE IN NODE.JS RUNTIME.
   *
   * Creates an instance of MessagesClient.
   *
   * @param {string} connectionString Connection string for an Azure storage account.
   * @param {string} queueName Queue name.
   * @param {NewPipelineOptions} [options] Options to configure the HTTP pipeline.
   * @memberof MessagesClient
   */
  constructor(connectionString: string, queueName: string, options?: NewPipelineOptions);
  /**
   * Creates an instance of MessagesClient.
   *
   * @param {string} url A URL string pointing to Azure Storage queue's messages, such as
   *                     "https://myaccount.queue.core.windows.net/myqueue/messages". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.queue.core.windows.net/myqueue/messages?sasString".
   * @param {Credential | TokenCredential} credential Such as AnonymousCredential, SharedKeyCredential, RawTokenCredential,
   *                                                  or a TokenCredential from @azure/identity. If not specified,
   *                                                  AnonymousCredential is used.
   * @param {NewPipelineOptions} [options] Options to configure the HTTP pipeline.
   * @memberof MessagesClient
   */
  constructor(url: string, credential?: Credential | TokenCredential, options?: NewPipelineOptions);
  /**
   * Creates an instance of MessagesClient.
   *
   * @param {string} url A URL string pointing to Azure Storage queue's messages, such as
   *                     "https://myaccount.queue.core.windows.net/myqueue/messages". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.queue.core.windows.net/myqueue/messages?sasString".
   * @param {Pipeline} pipeline Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof MessagesClient
   */
  constructor(url: string, pipeline: Pipeline);
  constructor(
    urlOrConnectionString: string,
    credentialOrPipelineOrQueueName?: Credential | TokenCredential | Pipeline | string,
    options?: NewPipelineOptions
  ) {
    let pipeline: Pipeline;
    if (credentialOrPipelineOrQueueName instanceof Pipeline) {
      pipeline = credentialOrPipelineOrQueueName;
    } else if (
      credentialOrPipelineOrQueueName instanceof Credential ||
      isTokenCredential(credentialOrPipelineOrQueueName)
    ) {
      pipeline = newPipeline(credentialOrPipelineOrQueueName, options);
    } else if (
      !credentialOrPipelineOrQueueName &&
      typeof credentialOrPipelineOrQueueName !== "string"
    ) {
      // The second paramter is undefined. Use anonymous credential.
      pipeline = newPipeline(new AnonymousCredential(), options);
    } else if (
      credentialOrPipelineOrQueueName &&
      typeof credentialOrPipelineOrQueueName === "string"
    ) {
      if (isNode) {
        const queueName = credentialOrPipelineOrQueueName;
        const extractedCreds = extractConnectionStringParts(urlOrConnectionString);
        const sharedKeyCredential = new SharedKeyCredential(
          extractedCreds.accountName,
          extractedCreds.accountKey
        );
        urlOrConnectionString = extractedCreds.url + "/" + queueName + "/messages";
        pipeline = newPipeline(sharedKeyCredential, options);
      } else {
        throw new Error("Connection string is only supported in Node.js environment");
      }
    } else {
      throw new Error("Expecting non-empty strings for queueName parameter");
    }
    super(urlOrConnectionString, pipeline);
    this.messagesContext = new Messages(this.storageClientContext);
  }

  /**
   * Clear deletes all messages from a queue.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/clear-messages
   *
   * @param {MessagesClearOptions} [options] Options to Messages clear operation.
   * @returns {Promise<Models.MessageClearResponse>} Response data for the Messages clear operation.
   * @memberof MessagesClient
   */
  public async clear(options: MessagesClearOptions = {}): Promise<Models.MessagesClearResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.messagesContext.clear({
      abortSignal: aborter
    });
  }

  /**
   * Creates a MessageIdClient object.
   * @param {string} messageId Id of a message.
   * @returns {MessageIdClient} a MessageIdClient instance for the given messageId.
   */
  public getMessageIdClient(messageId: string): MessageIdClient {
    return new MessageIdClient(appendToURLPath(this.url, messageId), this.pipeline);
  }

  /**
   * Enqueue adds a new message to the back of a queue. The visibility timeout specifies how long
   * the message should be invisible to Dequeue and Peek operations.
   * The message content is up to 64KB in size, and must be in a format that can be included in an XML request with UTF-8 encoding.
   * To include markup in the message, the contents of the message must either be XML-escaped or Base64-encode.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/put-message
   *
   * @param {string} messageText Text of the message to enqueue
   * @param {MessagesEnqueueOptionas} [options] Options to Messages enqueue operation.
   * @returns {Promise<Models.MessagesEnqueueResponse>} Response data for the Messages enqueue operation.
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
   * @param {MessagesDequeueOptionals} [options] Options to Messages dequeue operation.
   * @returns {Promise<Models.MessagesDequeueResponse>} Response data for the Messages dequeue operation.
   * @memberof MessagesClient
   */
  public async dequeue(options: MessagesDequeueOptions = {}): Promise<MessagesDequeueResponse> {
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
   * @param {MessagesPeekOptions} [options] Options to Messages peek operation.
   * @returns {Promise<Models.MessagesPeekResponse>} Response data for the Messages peek operation.
   * @memberof MessagesClient
   */
  public async peek(options: MessagesPeekOptions = {}): Promise<MessagesPeekResponse> {
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
