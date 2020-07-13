// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  HttpResponse,
  TokenCredential,
  isTokenCredential,
  isNode,
  getDefaultProxySettings,
  URLBuilder
} from "@azure/core-http";
import { CanonicalCode } from "@opentelemetry/api";
import {
  EnqueuedMessage,
  DequeuedMessageItem,
  MessagesDequeueHeaders,
  MessagesDequeueOptionalParams,
  MessagesEnqueueHeaders,
  MessagesEnqueueOptionalParams,
  MessagesPeekHeaders,
  MessagesPeekOptionalParams,
  MessageIdUpdateResponse,
  MessageIdDeleteResponse,
  MessagesClearResponse,
  PeekedMessageItem,
  QueueCreateResponse,
  QueueDeleteResponse,
  QueueGetAccessPolicyHeaders,
  QueueGetPropertiesResponse,
  QueueSetAccessPolicyResponse,
  QueueSetMetadataResponse,
  SignedIdentifierModel
} from "./generatedModels";
import { AbortSignalLike } from "@azure/abort-controller";
import { Messages, MessageId, Queue } from "./generated/src/operations";
import { newPipeline, StoragePipelineOptions, Pipeline } from "./Pipeline";
import { StorageClient, CommonOptions } from "./StorageClient";
import {
  appendToURLPath,
  extractConnectionStringParts,
  truncatedISO8061Date,
  getStorageClientContext
} from "./utils/utils.common";
import { StorageSharedKeyCredential } from "./credentials/StorageSharedKeyCredential";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
import { createSpan } from "./utils/tracing";
import { Metadata } from "./models";

/**
 * Options to configure {@link QueueClient.create} operation
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
   * @memberof QueueCreateOptions
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
 * Options to configure {@link QueueClient.exists} operation
 *
 * @export
 * @interface QueueExistsOptions
 */
export interface QueueExistsOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof QueueExistsOptions
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure {@link QueueClient.getProperties} operation
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
   * @memberof QueueGetPropertiesOptions
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure {@link QueueClient.delete} operation
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
   * @memberof QueueDeleteOptions
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure {@link QueueClient.getAccessPolicy} operation
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
   * @memberof QueueGetAccessPolicyOptions
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure {@link QueueClient.setAccessPolicy} operation
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
   * @memberof QueueSetAccessPolicyOptions
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure {@link QueueClient.setMetadata} operation
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
   * @memberof QueueSetMetadataOptions
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
     * @member {Date} startsOn the date-time the policy is active.
     */
    startsOn?: Date;
    /**
     * @member {string} expiresOn the date-time the policy expires.
     */
    expiresOn?: Date;
    /**
     * @member {string} permission the permissions for the acl policy
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-queue-acl
     */
    permissions?: string;
  };
}

/**
 * Contains response data for the {@link QueueClient.getAccessPolicy} operation.
 */
export declare type QueueGetAccessPolicyResponse = {
  signedIdentifiers: SignedIdentifier[];
} & QueueGetAccessPolicyHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: HttpResponse & {
      /**
       * The parsed HTTP response headers.
       */
      parsedHeaders: QueueGetAccessPolicyHeaders;
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;
      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: SignedIdentifierModel[];
    };
  };

/**
 * Options to configure {@link QueueClient.clearMessages} operation
 *
 * @export
 * @interface QueueClearMessagesOptions
 */
export interface QueueClearMessagesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof QueueClearMessagesOptions
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure {@link QueueClient.sendMessage} operation
 *
 * @export
 * @interface QueueSendMessageOptions
 * @extends {MessagesEnqueueOptionalParams}
 */
export interface QueueSendMessageOptions extends MessagesEnqueueOptionalParams, CommonOptions {}

/**
 * Options to configure {@link QueueClient.receiveMessages} operation
 *
 * @export
 * @interface QueueReceiveMessageOptions
 * @extends {MessagesDequeueOptionalParams}
 */
export interface QueueReceiveMessageOptions extends MessagesDequeueOptionalParams, CommonOptions {}

/**
 * Options to configure {@link QueueClient.peekMessages} operation
 *
 * @export
 * @interface QueuePeekMessagesOptions
 * @extends {MessagesPeekOptionalParams}
 */
export interface QueuePeekMessagesOptions extends MessagesPeekOptionalParams, CommonOptions {}

/**
 * Contains the response data for the {@link QueueClient.sendMessage} operation.
 */
export declare type QueueSendMessageResponse = {
  /**
   * @member {string} messageId The ID of the sent Message.
   */
  messageId: string;
  /**
   * @member {string} popReceipt This value is required to delete the Message.
   * If deletion fails using this popreceipt then the message has been received
   * by another client.
   */
  popReceipt: string;
  /**
   * @member {Date} insertedOn The time that the message was inserted into the
   * Queue.
   */
  insertedOn: Date;
  /**
   * @member {Date} expiresOn The time that the message will expire and be
   * automatically deleted.
   */
  expiresOn: Date;
  /**
   * @member {Date} nextVisibleOn The time that the message will again become
   * visible in the Queue.
   */
  nextVisibleOn: Date;
} & MessagesEnqueueHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: HttpResponse & {
      /**
       * The parsed HTTP response headers.
       */
      parsedHeaders: MessagesEnqueueHeaders;
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;
      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: EnqueuedMessage[];
    };
  };

/**
 * The object returned in the `receivedMessageItems` array when calling {@link QueueClient.receiveMessages}.
 *
 * See: {@link QueueReceiveMessageResponse}
 */
export declare type ReceivedMessageItem = DequeuedMessageItem;

/**
 * Contains the response data for the {@link QueueClient.receiveMessages} operation.
 */
export declare type QueueReceiveMessageResponse = {
  receivedMessageItems: ReceivedMessageItem[];
} & MessagesDequeueHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: HttpResponse & {
      /**
       * The parsed HTTP response headers.
       */
      parsedHeaders: MessagesDequeueHeaders;
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;
      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: ReceivedMessageItem[];
    };
  };

/**
 * Contains the response data for the {@link QueueClient.peekMessages} operation.
 */
export declare type QueuePeekMessagesResponse = {
  peekedMessageItems: PeekedMessageItem[];
} & MessagesPeekHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: HttpResponse & {
      /**
       * The parsed HTTP response headers.
       */
      parsedHeaders: MessagesPeekHeaders;
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;
      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: PeekedMessageItem[];
    };
  };

/**
 * Options to configure the {@link QueueClient.deleteMessage} operation
 *
 * @export
 * @interface QueueDeleteMessageOptions
 */
export interface QueueDeleteMessageOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof QueueDeleteMessageOptions
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Contains response data for the {@link QueueClient.updateMessage} operation.
 */
export declare type QueueUpdateMessageResponse = MessageIdUpdateResponse;

/**
 * Contains response data for the {@link QueueClient.deleteMessage} operation.
 */
export declare type QueueDeleteMessageResponse = MessageIdDeleteResponse;

/**
 * Contains response data for the {@link QueueClient.clearMessages} operation.
 */
export declare type QueueClearMessagesResponse = MessagesClearResponse;

/**
 * Options to configure {@link QueueClient.updateMessage} operation
 *
 * @export
 * @interface QueueUpdateMessageOptions
 */
export interface QueueUpdateMessageOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof QueueUpdateMessageOptions
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Contains response data for the {@link QueueClient.createIfNotExists} operation.
 *
 * @export
 * @interface QueueCreateIfNotExistsResponse
 */
export interface QueueCreateIfNotExistsResponse extends QueueCreateResponse {
  /**
   * Indicate whether the queue is successfully created. Is false when the queue is not changed as it already exists.
   *
   * @type {boolean}
   * @memberof QueueCreateIfNotExistsResponse
   */
  succeeded: boolean;
}

/**
 * Contains response data for the {@link QueueClient.deleteIfExists} operation.
 *
 * @export
 * @interface QueueDeleteIfExistsResponse
 */
export interface QueueDeleteIfExistsResponse extends QueueDeleteResponse {
  /**
   * Indicate whether the queue is successfully deleted. Is false if the queue does not exist in the first place.
   *
   * @type {boolean}
   * @memberof QueueDeleteIfExistsResponse
   */
  succeeded: boolean;
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
  private _name: string;
  private _messagesUrl: string;

  /**
   * The name of the queue.
   */
  public get name(): string {
    return this._name;
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
   * @param {StoragePipelineOptions} [options] Options to configure the HTTP pipeline.
   * @memberof QueueClient
   */
  constructor(connectionString: string, queueName: string, options?: StoragePipelineOptions);
  /**
   * Creates an instance of QueueClient.
   *
   * @param {string} url A URL string pointing to Azure Storage queue, such as
   *                     "https://myaccount.queue.core.windows.net/myqueue". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.queue.core.windows.net/myqueue?sasString".
   * @param {StorageSharedKeyCredential | AnonymousCredential | TokenCredential} credential  Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the @azure/identity package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
   * @param {StoragePipelineOptions} [options] Options to configure the HTTP pipeline.
   * @memberof QueueClient
   */
  constructor(
    url: string,
    credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential,
    options?: StoragePipelineOptions
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
      | StorageSharedKeyCredential
      | AnonymousCredential
      | TokenCredential
      | Pipeline
      | string,
    options?: StoragePipelineOptions
  ) {
    options = options || {};
    let pipeline: Pipeline;
    let url: string;
    if (credentialOrPipelineOrQueueName instanceof Pipeline) {
      // (url: string, pipeline: Pipeline)
      url = urlOrConnectionString;
      pipeline = credentialOrPipelineOrQueueName;
    } else if (
      (isNode && credentialOrPipelineOrQueueName instanceof StorageSharedKeyCredential) ||
      credentialOrPipelineOrQueueName instanceof AnonymousCredential ||
      isTokenCredential(credentialOrPipelineOrQueueName)
    ) {
      // (url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions)
      url = urlOrConnectionString;
      pipeline = newPipeline(credentialOrPipelineOrQueueName, options);
    } else if (
      !credentialOrPipelineOrQueueName &&
      typeof credentialOrPipelineOrQueueName !== "string"
    ) {
      // (url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions)
      // The second paramter is undefined. Use anonymous credential.
      url = urlOrConnectionString;
      pipeline = newPipeline(new AnonymousCredential(), options);
    } else if (
      credentialOrPipelineOrQueueName &&
      typeof credentialOrPipelineOrQueueName === "string"
    ) {
      // (connectionString: string, containerName: string, queueName: string, options?: StoragePipelineOptions)
      const extractedCreds = extractConnectionStringParts(urlOrConnectionString);
      if (extractedCreds.kind === "AccountConnString") {
        if (isNode) {
          const queueName = credentialOrPipelineOrQueueName;
          const sharedKeyCredential = new StorageSharedKeyCredential(
            extractedCreds.accountName,
            extractedCreds.accountKey
          );
          url = appendToURLPath(extractedCreds.url, queueName);
          options.proxyOptions = getDefaultProxySettings(extractedCreds.proxyUri);
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
    this._name = this.getQueueNameFromUrl();
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
   * @returns {Promise<QueueCreateResponse>} Response data for the Queue create operation.
   * @memberof QueueClient
   *
   * Example usage:
   *
   * ```js
   * const queueClient = queueServiceClient.getQueueClient("<new queue name>");
   * const createQueueResponse = await queueClient.create();
   * ```
   */
  public async create(options: QueueCreateOptions = {}): Promise<QueueCreateResponse> {
    const { span, spanOptions } = createSpan("QueueClient-create", options.tracingOptions);
    try {
      return await this.queueContext.create({
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
   * Creates a new queue under the specified account if it doesn't already exist.
   * If the queue already exists, it is not changed.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-queue4
   *
   * @param {QueueCreateOptions} [options]
   * @returns {Promise<QueueCreateIfNotExistsResponse>}
   * @memberof QueueClient
   */
  public async createIfNotExists(
    options: QueueCreateOptions = {}
  ): Promise<QueueCreateIfNotExistsResponse> {
    const { span, spanOptions } = createSpan(
      "QueueClient-createIfNotExists",
      options.tracingOptions
    );
    try {
      const response = await this.create({
        ...options,
        tracingOptions: { ...options!.tracingOptions, spanOptions }
      });

      // When a queue with the specified name already exists, the Queue service checks the metadata associated with the existing queue.
      // If the existing metadata is identical to the metadata specified on the Create Queue request, status code 204 (No Content) is returned.
      // If the existing metadata does not match, the operation fails and status code 409 (Conflict) is returned.
      if (response._response.status == 204) {
        return {
          succeeded: false,
          ...response
        };
      }
      return {
        succeeded: true,
        ...response
      };
    } catch (e) {
      if (e.details?.errorCode === "QueueAlreadyExists") {
        span.setStatus({
          code: CanonicalCode.ALREADY_EXISTS,
          message: "Expected exception when creating a queue only if it does not already exist."
        });
        return {
          succeeded: false,
          ...e.response?.parsedHeaders,
          _response: e.response
        };
      }

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
   * Deletes the specified queue permanently if it exists.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-queue3
   *
   * @param {QueueDeleteOptions} [options]
   * @returns {Promise<QueueDeleteIfExistsResponse>}
   * @memberof QueueClient
   */
  public async deleteIfExists(
    options: QueueDeleteOptions = {}
  ): Promise<QueueDeleteIfExistsResponse> {
    const { span, spanOptions } = createSpan("QueueClient-deleteIfExists", options.tracingOptions);
    try {
      const res = await this.delete({
        ...options,
        tracingOptions: { ...options!.tracingOptions, spanOptions }
      });
      return {
        succeeded: true,
        ...res
      };
    } catch (e) {
      if (e.details?.errorCode === "QueueNotFound") {
        span.setStatus({
          code: CanonicalCode.NOT_FOUND,
          message: "Expected exception when deleting a queue only if it exists."
        });
        return {
          succeeded: false,
          ...e.response?.parsedHeaders,
          _response: e.response
        };
      }
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
   * @returns {Promise<QueueDeleteResponse>} Response data for the Queue delete operation.
   * @memberof QueueClient
   *
   * Example usage:
   *
   * ```js
   * const deleteQueueResponse = await queueClient.delete();
   * console.log(
   *   "Delete queue successfully, service assigned request Id:", deleteQueueResponse.requestId
   * );
   * ```
   */
  public async delete(options: QueueDeleteOptions = {}): Promise<QueueDeleteResponse> {
    const { span, spanOptions } = createSpan("QueueClient-delete", options.tracingOptions);
    try {
      return await this.queueContext.deleteMethod({
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
   * Returns true if the specified queue exists; false otherwise.
   *
   * NOTE: use this function with care since an existing queue might be deleted by other clients or
   * applications. Vice versa new queues might be added by other clients or applications after this
   * function completes.
   *
   * @param {QueueExistsOptions} [options] options to Exists operation.
   * @returns {Promise<boolean>}
   * @memberof QueueClient
   */
  public async exists(options: QueueExistsOptions = {}): Promise<boolean> {
    const { span, spanOptions } = createSpan("QueueClient-exists", options.tracingOptions);
    try {
      await this.getProperties({
        abortSignal: options.abortSignal,
        tracingOptions: { ...options.tracingOptions, spanOptions }
      });
      return true;
    } catch (e) {
      if (e.statusCode === 404) {
        span.setStatus({
          code: CanonicalCode.NOT_FOUND,
          message: "Expected exception when checking queue existence"
        });
        return false;
      }
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
   * WARNING: The `metadata` object returned in the response will have its keys in lowercase, even if
   * they originally contained uppercase characters. This differs from the metadata keys returned by
   * the `listQueues` method of {@link QueueServiceClient} using the `includeMetadata` option, which
   * will retain their original casing.
   *
   * @param {QueueGetPropertiesOptions} [options] Options to Queue get properties operation.
   * @returns {Promise<QueueGetPropertiesResponse>} Response data for the Queue get properties operation.
   * @memberof QueueClient
   */
  public async getProperties(
    options: QueueGetPropertiesOptions = {}
  ): Promise<QueueGetPropertiesResponse> {
    const { span, spanOptions } = createSpan("QueueClient-getProperties", options.tracingOptions);
    try {
      return await this.queueContext.getProperties({
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
   * @returns {Promise<QueueSetMetadataResponse>} Response data for the Queue set metadata operation.
   * @memberof QueueClient
   */
  public async setMetadata(
    metadata?: Metadata,
    options: QueueSetMetadataOptions = {}
  ): Promise<QueueSetMetadataResponse> {
    const { span, spanOptions } = createSpan("QueueClient-setMetadata", options.tracingOptions);
    try {
      return await this.queueContext.setMetadata({
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
    const { span, spanOptions } = createSpan("QueueClient-getAccessPolicy", options.tracingOptions);
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
        let accessPolicy: any = undefined;
        if (identifier.accessPolicy) {
          accessPolicy = {
            permissions: identifier.accessPolicy.permissions
          };

          if (identifier.accessPolicy.expiresOn) {
            accessPolicy.expiresOn = new Date(identifier.accessPolicy.expiresOn);
          }

          if (identifier.accessPolicy.startsOn) {
            accessPolicy.startsOn = new Date(identifier.accessPolicy.startsOn);
          }
        }

        res.signedIdentifiers.push({
          accessPolicy,
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
   * @param {SignedIdentifier[]} [queueAcl]
   * @param {QueueSetAccessPolicyOptions} [options] Options to Queue set access policy operation.
   * @returns {Promise<QueueSetAccessPolicyResponse>} Response data for the Queue set access policy operation.
   * @memberof QueueClient
   */
  public async setAccessPolicy(
    queueAcl?: SignedIdentifier[],
    options: QueueSetAccessPolicyOptions = {}
  ): Promise<QueueSetAccessPolicyResponse> {
    const { span, spanOptions } = createSpan("QueueClient-setAccessPolicy", options.tracingOptions);
    try {
      const acl: SignedIdentifierModel[] = [];
      for (const identifier of queueAcl || []) {
        acl.push({
          accessPolicy: {
            expiresOn: identifier.accessPolicy.expiresOn
              ? truncatedISO8061Date(identifier.accessPolicy.expiresOn)
              : undefined,
            permissions: identifier.accessPolicy.permissions,
            startsOn: identifier.accessPolicy.startsOn
              ? truncatedISO8061Date(identifier.accessPolicy.startsOn)
              : undefined
          },
          id: identifier.id
        });
      }

      return await this.queueContext.setAccessPolicy({
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
   * @param {QueueClearMessagesOptions} [options] Options to clear messages operation.
   * @returns {Promise<QueueClearMessagesResponse>} Response data for the clear messages operation.
   * @memberof QueueClient
   */
  public async clearMessages(
    options: QueueClearMessagesOptions = {}
  ): Promise<QueueClearMessagesResponse> {
    const { span, spanOptions } = createSpan("QueueClient-clearMessages", options.tracingOptions);
    try {
      return await this.messagesContext.clear({
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
   * sendMessage adds a new message to the back of a queue. The visibility timeout specifies how long
   * the message should be invisible to Dequeue and Peek operations.
   * The message content is up to 64KB in size, and must be in a format that can be included in an XML request with UTF-8 encoding.
   * To include markup in the message, the contents of the message must either be XML-escaped or Base64-encode.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/put-message
   *
   * @param {string} messageText Text of the message to send
   * @param {QueueSendMessageOptions} [options] Options to send messages operation.
   * @returns {Promise<QueueSendMessageResponse>} Response data for the send messages operation.
   * @memberof QueueClient
   *
   * Example usage:
   *
   * ```js
   * const sendMessageResponse = await queueClient.sendMessage("Hello World!");
   * console.log(
   *   "Sent message successfully, service assigned message Id:", sendMessageResponse.messageId,
   *   "service assigned request Id:", sendMessageResponse.requestId
   * );
   * ```
   */
  public async sendMessage(
    messageText: string,
    options: QueueSendMessageOptions = {}
  ): Promise<QueueSendMessageResponse> {
    const { span, spanOptions } = createSpan("QueueClient-sendMessage", options.tracingOptions);
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
        nextVisibleOn: item.nextVisibleOn,
        insertedOn: item.insertedOn,
        expiresOn: item.expiresOn
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
   * receiveMessages retrieves one or more messages from the front of the queue.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-messages
   *
   * @param {QueueReceiveMessageOptions} [options] Options to receive messages operation.
   * @returns {Promise<QueueReceiveMessageResponse>} Response data for the receive messages operation.
   * @memberof QueueClient
   *
   * Example usage:
   *
   * ```js
   * const response = await queueClient.receiveMessages();
   * if (response.receivedMessageItems.length == 1) {
   *   const receivedMessageItem = response.receivedMessageItems[0];
   *   console.log("Processing & deleting message with content:", receivedMessageItem.messageText);
   *   const deleteMessageResponse = await queueClient.deleteMessage(
   *     receivedMessageItem.messageId,
   *     receivedMessageItem.popReceipt
   *   );
   *   console.log(
   *     "Delete message successfully, service assigned request Id:",
   *     deleteMessageResponse.requestId
   *   );
   * }
   * ```
   */
  public async receiveMessages(
    options: QueueReceiveMessageOptions = {}
  ): Promise<QueueReceiveMessageResponse> {
    const { span, spanOptions } = createSpan("QueueClient-receiveMessages", options.tracingOptions);
    try {
      const response = await this.messagesContext.dequeue({
        abortSignal: options.abortSignal,
        ...options,
        spanOptions
      });

      const res: QueueReceiveMessageResponse = {
        _response: response._response,
        date: response.date,
        requestId: response.requestId,
        clientRequestId: response.clientRequestId,
        receivedMessageItems: [],
        version: response.version,
        errorCode: response.errorCode
      };

      for (const item of response) {
        res.receivedMessageItems.push(item);
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
   * peekMessages retrieves one or more messages from the front of the queue but does not alter the visibility of the message.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/peek-messages
   *
   * @param {QueuePeekMessagesOptions} [options] Options to peek messages operation.
   * @returns {QueuePeekMessagesResponse>} Response data for the peek messages operation.
   * @memberof QueueClient
   *
   * Example usage:
   *
   * ```js
   * const peekMessagesResponse = await queueClient.peekMessages();
   * console.log("The peeked message is:", peekMessagesResponse.peekedMessageItems[0].messageText);
   * ```
   */
  public async peekMessages(
    options: QueuePeekMessagesOptions = {}
  ): Promise<QueuePeekMessagesResponse> {
    const { span, spanOptions } = createSpan("QueueClient-peekMessages", options.tracingOptions);
    try {
      const response = await this.messagesContext.peek({
        abortSignal: options.abortSignal,
        ...options,
        spanOptions
      });

      const res: QueuePeekMessagesResponse = {
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
   * deleteMessage permanently removes the specified message from its queue.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-message2
   *
   * @param {string} messageId Id of the message.
   * @param {string} popReceipt A valid pop receipt value returned from an earlier call to the receive messages or update message operation.
   * @param {QueueDeleteMessageOptions} [options] Options to delete message operation.
   * @returns {Promise<QueueDeleteMessageResponse>} Response data for the delete message operation.
   * @memberof QueueClient
   */
  public async deleteMessage(
    messageId: string,
    popReceipt: string,
    options: QueueDeleteMessageOptions = {}
  ): Promise<QueueDeleteMessageResponse> {
    const { span, spanOptions } = createSpan("QueueClient-deleteMessage", options.tracingOptions);
    try {
      return await this.getMessageIdContext(messageId).deleteMethod(popReceipt, {
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
   * @param {string} messageId Id of the message
   * @param {string} popReceipt A valid pop receipt value returned from an earlier call to the receive messages or update message operation.
   * @param {string} message Message to update.
   * @param {number} visibilityTimeout Specifies the new visibility timeout value, in seconds,
   *                                   relative to server time. The new value must be larger than or equal to 0,
   *                                   and cannot be larger than 7 days. The visibility timeout of a message cannot
   *                                   be set to a value later than the expiry time.
   *                                   A message can be updated until it has been deleted or has expired.
   * @param {QueueUpdateMessageOptions} [options] Options to update message operation.
   * @returns {Promise<QueueUpdateMessageResponse>} Response data for the update message operation.
   * @memberof QueueClient
   */
  public async updateMessage(
    messageId: string,
    popReceipt: string,
    message: string,
    visibilityTimeout?: number,
    options: QueueUpdateMessageOptions = {}
  ): Promise<QueueUpdateMessageResponse> {
    const { span, spanOptions } = createSpan("QueueClient-updateMessage", options.tracingOptions);
    try {
      return await this.getMessageIdContext(messageId).update(
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
    let queueName;
    try {
      //  URL may look like the following
      // "https://myaccount.queue.core.windows.net/myqueue?sasString".
      // "https://myaccount.queue.core.windows.net/myqueue".
      // IPv4/IPv6 address hosts, Endpoints - `http://127.0.0.1:10001/devstoreaccount1/myqueue`
      // http://localhost:10001/devstoreaccount1/queuename

      const parsedUrl = URLBuilder.parse(this.url);

      if (parsedUrl.getHost()!.split(".")[1] === "queue") {
        // "https://myaccount.queue.core.windows.net/queuename".
        // .getPath() -> /queuename
        queueName = parsedUrl.getPath()!.split("/")[1];
      } else {
        // IPv4/IPv6 address hosts... Example - http://192.0.0.10:10001/devstoreaccount1/queuename
        // Single word domain without a [dot] in the endpoint... Example - http://localhost:10001/devstoreaccount1/queuename
        // .getPath() -> /devstoreaccount1/queuename
        queueName = parsedUrl.getPath()!.split("/")[2];
      }

      if (!queueName) {
        throw new Error("Provided queueName is invalid.");
      }

      return queueName;
    } catch (error) {
      throw new Error("Unable to extract queueName with provided information.");
    }
  }
}
