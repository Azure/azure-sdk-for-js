// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { HttpResponse, TokenCredential, isTokenCredential, isNode } from "@azure/core-http";
import { CanonicalCode } from "@azure/core-tracing";
import * as Models from "./generated/src/models";
import { AbortSignalLike } from "@azure/abort-controller";
import { Messages } from "./generated/src/operations";
import { newPipeline, NewPipelineOptions, Pipeline } from "./Pipeline";
import { StorageClient, CommonOptions } from "./StorageClient";
import { appendToURLPath, extractConnectionStringParts } from "./utils/utils.common";
import { MessageIdClient } from "./MessageIdClient";
import { SharedKeyCredential } from "./credentials/SharedKeyCredential";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
import { createSpan } from "./utils/tracing";

/**
 * Options to configure Messages - Clear operation
 *
 * @export
 * @interface MessagesClearOptions
 */
export interface MessagesClearOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure Messages - Enqueue operation
 *
 * @export
 * @interface MessagesEnqueueOptions
 * @extends {Models.MessagesEnqueueOptionalParams}
 */
export interface MessagesEnqueueOptions
  extends Models.MessagesEnqueueOptionalParams,
    CommonOptions {}

/**
 * Options to configure Messages - Dequeue operation
 *
 * @export
 * @interface MessagesDequeueOptions
 * @extends {Models.MessagesDequeueOptionalParams}
 */
export interface MessagesDequeueOptions
  extends Models.MessagesDequeueOptionalParams,
    CommonOptions {}

/**
 * Options to configure Messages - Peek operation
 *
 * @export
 * @interface MessagesPeekOptions
 * @extends {Models.MessagesPeekOptionalParams}
 */
export interface MessagesPeekOptions extends Models.MessagesPeekOptionalParams, CommonOptions {}

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
  private _queueName: string;
  public get queueName(): string {
    return this._queueName;
  }

  /**
   * Creates an instance of MessagesClient.
   *
   * @param {string} connectionString Account connection string or a SAS connection string of an Azure storage account.
   *                                  [ Note - Account connection string can only be used in NODE.JS runtime. ]
   *                                  Account connection string example -
   *                                  `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
   *                                  SAS connection string example -
   *                                  `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
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
   * @param {SharedKeyCredential | AnonymousCredential | TokenCredential} credential Such as AnonymousCredential, SharedKeyCredential
   *                                                  or a TokenCredential from @azure/identity. If not specified,
   *                                                  AnonymousCredential is used.
   * @param {NewPipelineOptions} [options] Options to configure the HTTP pipeline.
   * @memberof MessagesClient
   */
  constructor(
    url: string,
    credential?: SharedKeyCredential | AnonymousCredential | TokenCredential,
    options?: NewPipelineOptions
  );
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
    credentialOrPipelineOrQueueName?:
      | SharedKeyCredential
      | AnonymousCredential
      | TokenCredential
      | Pipeline
      | string,
    options?: NewPipelineOptions
  ) {
    options = options || {};
    let pipeline: Pipeline;
    let url: string;
    if (credentialOrPipelineOrQueueName instanceof Pipeline) {
      // (url: string, pipeline: Pipeline)
      url = urlOrConnectionString;
      pipeline = credentialOrPipelineOrQueueName;
    } else if (
      (isNode && credentialOrPipelineOrQueueName instanceof SharedKeyCredential) ||
      credentialOrPipelineOrQueueName instanceof AnonymousCredential ||
      isTokenCredential(credentialOrPipelineOrQueueName)
    ) {
      // (url: string, credential?: SharedKeyCredential | AnonymousCredential | TokenCredential, options?: NewPipelineOptions)
      url = urlOrConnectionString;
      pipeline = newPipeline(credentialOrPipelineOrQueueName, options);
    } else if (
      !credentialOrPipelineOrQueueName &&
      typeof credentialOrPipelineOrQueueName !== "string"
    ) {
      // (url: string, credential?: SharedKeyCredential | AnonymousCredential | TokenCredential, options?: NewPipelineOptions)
      url = urlOrConnectionString;
      // The second paramter is undefined. Use anonymous credential.
      pipeline = newPipeline(new AnonymousCredential(), options);
    } else if (
      credentialOrPipelineOrQueueName &&
      typeof credentialOrPipelineOrQueueName === "string"
    ) {
      // (connectionString: string, queueName: string, options?: NewPipelineOptions)
      const extractedCreds = extractConnectionStringParts(urlOrConnectionString);
      if (extractedCreds.kind === "AccountConnString") {
        if (isNode) {
          const queueName = credentialOrPipelineOrQueueName;
          const sharedKeyCredential = new SharedKeyCredential(
            extractedCreds.accountName!,
            extractedCreds.accountKey
          );
          url = extractedCreds.url + "/" + queueName + "/messages";
          options.proxy = extractedCreds.proxyUri;
          pipeline = newPipeline(sharedKeyCredential, options);
        } else {
          throw new Error("Account connection string is only supported in Node.js environment");
        }
      } else if (extractedCreds.kind === "SASConnString") {
        const queueName = credentialOrPipelineOrQueueName;
        url = extractedCreds.url + "/" + queueName + "/messages" + "?" + extractedCreds.accountSas;
        pipeline = newPipeline(new AnonymousCredential(), options);
      } else {
        throw new Error(
          "Connection string must be either an Account connection string or a SAS connection string"
        );
      }
    } else {
      throw new Error("Expecting non-empty strings for queueName parameter");
    }
    super(url, pipeline);
    this._queueName = this.getQueueNameFromUrl();
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
    const { span, spanOptions } = createSpan("MessagesClient-clear", options.spanOptions);
    try {
      return this.messagesContext.clear({
        abortSignal: options.abortSignal,
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
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
    const { span, spanOptions } = createSpan("MessagesClient-enqueue", options.spanOptions);
    try {
      const response = await this.messagesContext.enqueue(
        {
          messageText: messageText
        },
        {
          abortSignal: options.abortSignal,
          ...options,
          spanOptions
        }
      );
      const item = response[0];
      return {
        _response: response._response,
        date: response.date,
        requestId: response.requestId,
        clientRequestId: response.clientRequestId,
        version: response.version,
        errorCode: response.errorCode,
        messageId: item.messageId,
        popReceipt: item.popReceipt,
        timeNextVisible: item.timeNextVisible,
        insertionTime: item.insertionTime,
        expirationTime: item.expirationTime
      };
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Dequeue retrieves one or more messages from the front of the queue.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-messages
   *
   * @param {MessagesDequeueOptionals} [options] Options to Messages dequeue operation.
   * @returns {Promise<Models.MessagesDequeueResponse>} Response data for the Messages dequeue operation.
   * @memberof MessagesClient
   */
  public async dequeue(options: MessagesDequeueOptions = {}): Promise<MessagesDequeueResponse> {
    const { span, spanOptions } = createSpan("MessagesClient-dequeue", options.spanOptions);
    try {
      const response = await this.messagesContext.dequeue({
        abortSignal: options.abortSignal,
        ...options,
        spanOptions
      });

      const res: MessagesDequeueResponse = {
        _response: response._response,
        date: response.date,
        requestId: response.requestId,
        clientRequestId: response.clientRequestId,
        dequeuedMessageItems: [],
        version: response.version,
        errorCode: response.errorCode
      };

      for (const item of response) {
        res.dequeuedMessageItems.push(item);
      }

      return res;
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Peek retrieves one or more messages from the front of the queue but does not alter the visibility of the message.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/peek-messages
   *
   * @param {MessagesPeekOptions} [options] Options to Messages peek operation.
   * @returns {Promise<Models.MessagesPeekResponse>} Response data for the Messages peek operation.
   * @memberof MessagesClient
   */
  public async peek(options: MessagesPeekOptions = {}): Promise<MessagesPeekResponse> {
    const { span, spanOptions } = createSpan("MessagesClient-peek", options.spanOptions);
    try {
      const response = await this.messagesContext.peek({
        abortSignal: options.abortSignal,
        ...options,
        spanOptions
      });

      const res: MessagesPeekResponse = {
        _response: response._response,
        date: response.date,
        requestId: response.requestId,
        clientRequestId: response.clientRequestId,
        peekedMessageItems: [],
        version: response.version,
        errorCode: response.errorCode
      };

      for (const item of response) {
        res.peekedMessageItems.push(item);
      }

      return res;
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  private getQueueNameFromUrl(): string {
    //  URL may look like the following
    // "https://myaccount.queue.core.windows.net/myqueue/messages?sasString".
    // "https://myaccount.queue.core.windows.net/myqueue/messages".
    try {
      let urlWithoutSAS = this.url.split("?")[0]; // removing the sas part of url if present
      urlWithoutSAS = urlWithoutSAS.endsWith("/") ? urlWithoutSAS.slice(0, -1) : urlWithoutSAS; // Slicing off '/' at the end if exists

      const queueName = urlWithoutSAS.match("([^/]*)://([^/]*)/([^/]*)/messages")![3];
      if (!queueName) {
        throw new Error("Provided queueName is invalid.");
      } else {
        return queueName;
      }
    } catch (error) {
      throw new Error("Unable to extract queueName with provided information.");
    }
  }
}
