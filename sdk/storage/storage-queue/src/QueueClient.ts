// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { HttpResponse, TokenCredential, isTokenCredential, isNode } from "@azure/core-http";
import { CanonicalCode } from "@azure/core-tracing";
import * as Models from "./generated/src/models";
import { AbortSignalLike } from "@azure/abort-controller";
import { Messages, MessageId, Queue } from "./generated/src/operations";
import { newPipeline, NewPipelineOptions, Pipeline } from "./Pipeline";
import { StorageClient, CommonOptions } from "./StorageClient";
import {
  appendToURLPath,
  extractConnectionStringParts,
  truncatedISO8061Date,
  getStorageClientContext
} from "./utils/utils.common";
import { SharedKeyCredential } from "./credentials/SharedKeyCredential";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
import { createSpan } from "./utils/tracing";
import { Metadata } from "./models";

/**
 * Options to configure Queue - Create operation
 *
 * @export
 * @interface QueueCreateOptions
 */
export interface QueueCreateOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * A collection of key-value string pair to associate with the queue object.
   * The keys need to be lower-case.
   *
   * @type {Metadata}
   * @memberof QueueCreateOptions
   */
  metadata?: Metadata;
}

/**
 * Options to configure Queue - Get Properties operation
 *
 * @export
 * @interface QueueGetPropertiesOptions
 */
export interface QueueGetPropertiesOptions extends CommonOptions {
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
 * Options to configure Queue - Delete operation
 *
 * @export
 * @interface QueueDeleteOptions
 */
export interface QueueDeleteOptions extends CommonOptions {
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
 * Options to configure Queue - Get Access Policy operation
 *
 * @export
 * @interface QueueGetAccessPolicyOptions
 */
export interface QueueGetAccessPolicyOptions extends CommonOptions {
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
 * Options to configure Queue - Set Access Policy operation
 *
 * @export
 * @interface QueueSetAccessPolicyOptions
 */
export interface QueueSetAccessPolicyOptions extends CommonOptions {
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
 * Options to configure Queue - Set Metadata operation
 *
 * @export
 * @interface QueueSetMetadataOptions
 */
export interface QueueSetMetadataOptions extends CommonOptions {
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
 * Signed identifier.
 *
 * @export
 * @interface SignedIdentifier
 */
export interface SignedIdentifier {
  /**
   * @member {string} id a unique id
   */
  id: string;
  /**
   * @member {AccessPolicy} accessPolicy
   */
  accessPolicy: {
    /**
     * @member {Date} start the date-time the policy is active.
     */
    start: Date;
    /**
     * @member {string} expiry the date-time the policy expires.
     */
    expiry: Date;
    /**
     * @member {string} permission the permissions for the acl policy
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-queue-acl
     */
    permission: string;
  };
}

export declare type QueueGetAccessPolicyResponse = {
  signedIdentifiers: SignedIdentifier[];
} & Models.QueueGetAccessPolicyHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: HttpResponse & {
      /**
       * The parsed HTTP response headers.
       */
      parsedHeaders: Models.QueueGetAccessPolicyHeaders;
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;
      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: Models.SignedIdentifier[];
    };
  };

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
 * Options to configure MessageId - Delete operation
 *
 * @export
 * @interface MessageIdDeleteOptions
 */
export interface MessageIdDeleteOptions extends CommonOptions {
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
 * Options to configure MessageId - Update operation
 *
 * @export
 * @interface MessageIdUpdateOptions
 */
export interface MessageIdUpdateOptions extends CommonOptions {
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
 * A QueueClient represents a URL to an Azure Storage Queue's messages allowing you to manipulate its messages.
 *
 * @export
 * @class QueueClient
 */
export class QueueClient extends StorageClient {
  /**
   * messagesContext provided by protocol layer.
   *
   * @private
   * @type {Messages}
   * @memberof QueueClient
   */
  private messagesContext: Messages;
  /**
   * queueContext provided by protocol layer.
   *
   * @private
   * @type {Queue}
   * @memberof QueueClient
   */
  private queueContext: Queue;
  private _queueName: string;
  private _messagesUrl: string;
  public get queueName(): string {
    return this._queueName;
  }

  /**
   * Creates an instance of QueueClient.
   *
   * @param {string} connectionString Account connection string or a SAS connection string of an Azure storage account.
   *                                  [ Note - Account connection string can only be used in NODE.JS runtime. ]
   *                                  Account connection string example -
   *                                  `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
   *                                  SAS connection string example -
   *                                  `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
   * @param {string} queueName Queue name.
   * @param {NewPipelineOptions} [options] Options to configure the HTTP pipeline.
   * @memberof QueueClient
   */
  constructor(connectionString: string, queueName: string, options?: NewPipelineOptions);
  /**
   * Creates an instance of QueueClient.
   *
   * @param {string} url A URL string pointing to Azure Storage queue, such as
   *                     "https://myaccount.queue.core.windows.net/myqueue". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.queue.core.windows.net/myqueue?sasString".
   * @param {SharedKeyCredential | AnonymousCredential | TokenCredential} credential Such as AnonymousCredential, SharedKeyCredential
   *                                                  or a TokenCredential from @azure/identity. If not specified,
   *                                                  AnonymousCredential is used.
   * @param {NewPipelineOptions} [options] Options to configure the HTTP pipeline.
   * @memberof QueueClient
   */
  constructor(
    url: string,
    credential?: SharedKeyCredential | AnonymousCredential | TokenCredential,
    options?: NewPipelineOptions
  );
  /**
   * Creates an instance of QueueClient.
   *
   * @param {string} url A URL string pointing to Azure Storage queue, such as
   *                     "https://myaccount.queue.core.windows.net/myqueue". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.queue.core.windows.net/myqueue?sasString".
   * @param {Pipeline} pipeline Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof QueueClient
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
      // The second paramter is undefined. Use anonymous credential.
      url = urlOrConnectionString;
      pipeline = newPipeline(new AnonymousCredential(), options);
    } else if (
      credentialOrPipelineOrQueueName &&
      typeof credentialOrPipelineOrQueueName === "string"
    ) {
      // (connectionString: string, containerName: string, queueName: string, options?: NewPipelineOptions)
      const extractedCreds = extractConnectionStringParts(urlOrConnectionString);
      if (extractedCreds.kind === "AccountConnString") {
        if (isNode) {
          const queueName = credentialOrPipelineOrQueueName;
          const sharedKeyCredential = new SharedKeyCredential(
            extractedCreds.accountName,
            extractedCreds.accountKey
          );
          url = appendToURLPath(extractedCreds.url, queueName);
          options.proxy = extractedCreds.proxyUri;
          pipeline = newPipeline(sharedKeyCredential, options);
        } else {
          throw new Error("Account connection string is only supported in Node.js environment");
        }
      } else if (extractedCreds.kind === "SASConnString") {
        const queueName = credentialOrPipelineOrQueueName;
        url = appendToURLPath(extractedCreds.url, queueName) + "?" + extractedCreds.accountSas;
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
    this.queueContext = new Queue(this.storageClientContext);

    // MessagesContext
    // Build the url with "messages"
    const partsOfUrl = this.url.split("?");
    this._messagesUrl = partsOfUrl[1]
      ? appendToURLPath(partsOfUrl[0], "messages") + "?" + partsOfUrl[1]
      : appendToURLPath(partsOfUrl[0], "messages");

    this.messagesContext = new Messages(getStorageClientContext(this._messagesUrl, this.pipeline));
  }

  private getMessageIdContext(messageId: string): MessageId {
    // Build the url with messageId
    const partsOfUrl = this._messagesUrl.split("?");
    const urlWithMessageId = partsOfUrl[1]
      ? appendToURLPath(partsOfUrl[0], messageId) + "?" + partsOfUrl[1]
      : appendToURLPath(partsOfUrl[0], messageId);

    return new MessageId(getStorageClientContext(urlWithMessageId, this.pipeline));
  }

  /**
   * Creates a new queue under the specified account.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-queue4
   *
   * @param {QueueCreateOptions} [options] Options to Queue create operation.
   * @returns {Promise<Models.QueueCreateResponse>} Response data for the Queue create operation.
   * @memberof QueueClient
   */
  public async create(options: QueueCreateOptions = {}): Promise<Models.QueueCreateResponse> {
    const { span, spanOptions } = createSpan("QueueClient-create", options.spanOptions);
    try {
      return this.queueContext.create({
        ...options,
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
   * Deletes the specified queue permanently.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-queue3
   *
   * @param {QueueDeleteOptions} [options] Options to Queue delete operation.
   * @returns {Promise<Models.QueueDeleteResponse>} Response data for the Queue delete operation.
   * @memberof QueueClient
   */
  public async delete(options: QueueDeleteOptions = {}): Promise<Models.QueueDeleteResponse> {
    const { span, spanOptions } = createSpan("QueueClient-delete", options.spanOptions);
    try {
      return this.queueContext.deleteMethod({
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
   * Gets all user-defined metadata and system properties for the specified
   * queue. Metadata is associated with the queue as name-values pairs.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-queue-metadata
   *
   * @param {QueueGetPropertiesOptions} [options] Options to Queue get properties operation.
   * @returns {Promise<Models.QueueGetPropertiesResponse>} Response data for the Queue get properties operation.
   * @memberof QueueClient
   */
  public async getProperties(
    options: QueueGetPropertiesOptions = {}
  ): Promise<Models.QueueGetPropertiesResponse> {
    const { span, spanOptions } = createSpan("QueueClient-getProperties", options.spanOptions);
    try {
      return this.queueContext.getProperties({
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
   * Sets one or more user-defined name-value pairs for the specified queue.
   *
   * If no option provided, or no metadata defined in the option parameter, the queue
   * metadata will be removed.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-queue-metadata
   *
   * @param {Metadata} [metadata] If no metadata provided, all existing metadata will be removed.
   * @param {QueueSetMetadataOptions} [options] Options to Queue set metadata operation.
   * @returns {Promise<Models.QueueSetMetadataResponse>} Response data for the Queue set metadata operation.
   * @memberof QueueClient
   */
  public async setMetadata(
    metadata?: Metadata,
    options: QueueSetMetadataOptions = {}
  ): Promise<Models.QueueSetMetadataResponse> {
    const { span, spanOptions } = createSpan("QueueClient-setMetadata", options.spanOptions);
    try {
      return this.queueContext.setMetadata({
        abortSignal: options.abortSignal,
        metadata,
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
   * Gets details about any stored access policies specified on the queue that may be used with Shared Access Signatures.
   *
   * WARNING: JavaScript Date will potential lost precision when parsing start and expiry string.
   * For example, new Date("2018-12-31T03:44:23.8827891Z").toISOString() will get "2018-12-31T03:44:23.882Z".
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-queue-acl
   *
   * @param {QueueGetAccessPolicyOptions} [options] Options to Queue get access policy operation.
   * @returns {Promise<QueueGetAccessPolicyResponse>} Response data for the Queue get access policy operation.
   * @memberof QueueClient
   */
  public async getAccessPolicy(
    options: QueueGetAccessPolicyOptions = {}
  ): Promise<QueueGetAccessPolicyResponse> {
    const { span, spanOptions } = createSpan("QueueClient-getAccessPolicy", options.spanOptions);
    try {
      const response = await this.queueContext.getAccessPolicy({
        abortSignal: options.abortSignal,
        spanOptions
      });

      const res: QueueGetAccessPolicyResponse = {
        _response: response._response,
        date: response.date,
        requestId: response.requestId,
        clientRequestId: response.clientRequestId,
        signedIdentifiers: [],
        version: response.version,
        errorCode: response.errorCode
      };

      for (const identifier of response) {
        res.signedIdentifiers.push({
          accessPolicy: {
            expiry: new Date(identifier.accessPolicy.expiry),
            permission: identifier.accessPolicy.permission,
            start: new Date(identifier.accessPolicy.start)
          },
          id: identifier.id
        });
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
   * Sets stored access policies for the queue that may be used with Shared Access Signatures.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-queue-acl
   *
   * @param {PublicAccessType} [access]
   * @param {SignedIdentifier[]} [queueAcl]
   * @param {QueueSetAccessPolicyOptions} [options] Options to Queue set access policy operation.
   * @returns {Promise<Models.QueueSetAccessPolicyResponse>} Response data for the Queue set access policy operation.
   * @memberof QueueClient
   */
  public async setAccessPolicy(
    queueAcl?: SignedIdentifier[],
    options: QueueSetAccessPolicyOptions = {}
  ): Promise<Models.QueueSetAccessPolicyResponse> {
    const { span, spanOptions } = createSpan("QueueClient-setAccessPolicy", options.spanOptions);
    try {
      const acl: Models.SignedIdentifier[] = [];
      for (const identifier of queueAcl || []) {
        acl.push({
          accessPolicy: {
            expiry: truncatedISO8061Date(identifier.accessPolicy.expiry),
            permission: identifier.accessPolicy.permission,
            start: truncatedISO8061Date(identifier.accessPolicy.start)
          },
          id: identifier.id
        });
      }

      return this.queueContext.setAccessPolicy({
        abortSignal: options.abortSignal,
        queueAcl: acl,
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
   * Clear deletes all messages from a queue.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/clear-messages
   *
   * @param {MessagesClearOptions} [options] Options to Messages clear operation.
   * @returns {Promise<Models.MessageClearResponse>} Response data for the Messages clear operation.
   * @memberof QueueClient
   */
  public async clearMessages(
    options: MessagesClearOptions = {}
  ): Promise<Models.MessagesClearResponse> {
    const { span, spanOptions } = createSpan("QueueClient-clearMessages", options.spanOptions);
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
   * Enqueue adds a new message to the back of a queue. The visibility timeout specifies how long
   * the message should be invisible to Dequeue and Peek operations.
   * The message content is up to 64KB in size, and must be in a format that can be included in an XML request with UTF-8 encoding.
   * To include markup in the message, the contents of the message must either be XML-escaped or Base64-encode.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/put-message
   *
   * @param {string} messageText Text of the message to enqueue
   * @param {MessagesEnqueueOptionas} [options] Options to Messages enqueue operation.
   * @returns {Promise<Models.MessagesEnqueueResponse>} Response data for the Messages enqueue operation.
   * @memberof QueueClient
   */
  public async enqueueMessage(
    messageText: string,
    options: MessagesEnqueueOptions = {}
  ): Promise<MessagesEnqueueResponse> {
    const { span, spanOptions } = createSpan("QueueClient-enqueueMessage", options.spanOptions);
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
   * @memberof QueueClient
   */
  public async dequeueMessages(
    options: MessagesDequeueOptions = {}
  ): Promise<MessagesDequeueResponse> {
    const { span, spanOptions } = createSpan("QueueClient-dequeueMessages", options.spanOptions);
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
   * @memberof QueueClient
   */
  public async peekMessages(options: MessagesPeekOptions = {}): Promise<MessagesPeekResponse> {
    const { span, spanOptions } = createSpan("QueueClient-peekMessages", options.spanOptions);
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

  /**
   * Delete permanently removes the specified message from its queue.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-message2
   *
   * @param {string} popReceipt A valid pop receipt value returned from an earlier call to the dequeue messages or update message operation.
   * @param {MessageIdDeleteOptions} [options] Options to MessageId Delete operation.
   * @returns {Promise<Models.MessageIdDeleteResponse>} Response data for the MessageId delete operation.
   * @memberof QueueClient
   */
  public async deleteMessage(
    messageId: string,
    popReceipt: string,
    options: MessageIdDeleteOptions = {}
  ): Promise<Models.MessageIdDeleteResponse> {
    const { span, spanOptions } = createSpan("QueueClient-deleteMessage", options.spanOptions);
    try {
      return this.getMessageIdContext(messageId).deleteMethod(popReceipt, {
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
   * Update changes a message's visibility timeout and contents.
   * The message content is up to 64KB in size, and must be in a format that can be included in an XML request with UTF-8 encoding.
   * To include markup in the message, the contents of the message must either be XML-escaped or Base64-encode.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/update-message
   *
   * @param {string} popReceipt A valid pop receipt value returned from an earlier call to the dequeue messages or update message operation.
   * @param {string} message Message to update.
   * @param {number} visibilityTimeout Specifies the new visibility timeout value, in seconds,
   *                                   relative to server time. The new value must be larger than or equal to 0,
   *                                   and cannot be larger than 7 days. The visibility timeout of a message cannot
   *                                   be set to a value later than the expiry time.
   *                                   A message can be updated until it has been deleted or has expired.
   * @param {MessageIdUpdateOptions} [options] Options to MessageId Update operation.
   * @returns {Promise<Models.MessageIdUpdateResponse>} Response data for the MessageId update operation.
   * @memberof QueueClient
   */
  public async updateMessage(
    messageId: string,
    popReceipt: string,
    message: string,
    visibilityTimeout?: number,
    options: MessageIdUpdateOptions = {}
  ): Promise<Models.MessageIdUpdateResponse> {
    const { span, spanOptions } = createSpan("QueueClient-updateMessage", options.spanOptions);
    try {
      return this.getMessageIdContext(messageId).update(
        {
          messageText: message
        },
        popReceipt,
        visibilityTimeout || 0,
        {
          abortSignal: options.abortSignal,
          spanOptions
        }
      );
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
    // "https://myaccount.queue.core.windows.net/myqueue?sasString".
    // "https://myaccount.queue.core.windows.net/myqueue".
    try {
      let urlWithoutSAS = this.url.split("?")[0]; // removing the sas part of url if present
      urlWithoutSAS = urlWithoutSAS.endsWith("/") ? urlWithoutSAS.slice(0, -1) : urlWithoutSAS; // Slicing off '/' at the end if exists

      const queueName = urlWithoutSAS.match("([^/]*)://([^/]*)/([^/]*)")![3];
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
