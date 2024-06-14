// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, isTokenCredential } from "@azure/core-auth";
import { isNode } from "@azure/core-util";
import {
  EnqueuedMessage,
  DequeuedMessageItem,
  MessagesDequeueHeaders,
  MessagesEnqueueHeaders,
  MessagesPeekHeaders,
  MessageIdUpdateResponse,
  MessageIdDeleteResponse,
  MessagesClearResponse,
  PeekedMessageItem,
  QueueCreateHeaders,
  QueueDeleteResponse,
  QueueGetAccessPolicyHeaders,
  QueueGetPropertiesResponse,
  QueueSetAccessPolicyResponse,
  QueueSetMetadataResponse,
  SignedIdentifierModel,
  QueueCreateResponse,
  QueueDeleteHeaders,
  QueueSetMetadataHeaders,
  QueueGetPropertiesHeaders,
  QueueSetAccessPolicyHeaders,
  MessagesClearHeaders,
  MessageIdDeleteHeaders,
  MessageIdUpdateHeaders,
} from "./generatedModels";
import { AbortSignalLike } from "@azure/abort-controller";
import { Messages, MessageId, Queue } from "./generated/src/operationsInterfaces";
import { newPipeline, StoragePipelineOptions, Pipeline, isPipelineLike } from "./Pipeline";
import { StorageClient, CommonOptions, getStorageClientContext } from "./StorageClient";
import {
  appendToURLPath,
  extractConnectionStringParts,
  isIpEndpointStyle,
  truncatedISO8061Date,
  appendToURLQuery,
  WithResponse,
  assertResponse,
} from "./utils/utils.common";
import { StorageSharedKeyCredential } from "../../storage-blob/src/credentials/StorageSharedKeyCredential";
import { AnonymousCredential } from "../../storage-blob/src/credentials/AnonymousCredential";
import { tracingClient } from "./utils/tracing";
import { Metadata } from "./models";
import { generateQueueSASQueryParameters } from "./QueueSASSignatureValues";
import { SasIPRange } from "./SasIPRange";
import { QueueSASPermissions } from "./QueueSASPermissions";
import { SASProtocol } from "./SASQueryParameters";
import { getDefaultProxySettings } from "@azure/core-rest-pipeline";

/**
 * Options to configure {@link QueueClient.create} operation
 */
export interface QueueCreateOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * A collection of key-value string pair to associate with the queue object.
   * The keys need to be lower-case.
   */
  metadata?: Metadata;
}

/**
 * Options to configure {@link QueueClient.exists} operation
 */
export interface QueueExistsOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure {@link QueueClient.getProperties} operation
 */
export interface QueueGetPropertiesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure {@link QueueClient.delete} operation
 */
export interface QueueDeleteOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure {@link QueueClient.getAccessPolicy} operation
 */
export interface QueueGetAccessPolicyOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure {@link QueueClient.setAccessPolicy} operation
 */
export interface QueueSetAccessPolicyOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure {@link QueueClient.setMetadata} operation
 */
export interface QueueSetMetadataOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Signed identifier.
 */
export interface SignedIdentifier {
  /**
   * a unique id
   */
  id: string;
  /**
   * Access Policy
   */
  accessPolicy: {
    /**
     * the date-time the policy is active.
     */
    startsOn?: Date;
    /**
     * the date-time the policy expires.
     */
    expiresOn?: Date;
    /**
     * the permissions for the acl policy
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-queue-acl
     */
    permissions?: string;
  };
}

/**
 * Contains response data for the {@link QueueClient.getAccessPolicy} operation.
 */
export declare type QueueGetAccessPolicyResponse = WithResponse<
  {
    signedIdentifiers: SignedIdentifier[];
  } & QueueGetAccessPolicyHeaders,
  QueueGetAccessPolicyHeaders,
  SignedIdentifierModel[]
>;

/**
 * Options to configure {@link QueueClient.clearMessages} operation
 */
export interface QueueClearMessagesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
}

/** Optional parameters. */
export interface MessagesEnqueueOptionalParams extends CommonOptions {
  /** The The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-queue-service-operations">Setting Timeouts for Queue Service Operations.</a> */
  timeoutInSeconds?: number;
  /** Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled. */
  requestId?: string;
  /** Optional. If specified, the request must be made using an x-ms-version of 2011-08-18 or later. If not specified, the default value is 0. Specifies the new visibility timeout value, in seconds, relative to server time. The new value must be larger than or equal to 0, and cannot be larger than 7 days. The visibility timeout of a message cannot be set to a value later than the expiry time. visibilitytimeout should be set to a value smaller than the time-to-live value. */
  visibilityTimeout?: number;
  /** Optional. Specifies the time-to-live interval for the message, in seconds. Prior to version 2017-07-29, the maximum time-to-live allowed is 7 days. For version 2017-07-29 or later, the maximum time-to-live can be any positive number, as well as -1 indicating that the message does not expire. If this parameter is omitted, the default time-to-live is 7 days. */
  messageTimeToLive?: number;
}

/**
 * Options to configure {@link QueueClient.sendMessage} operation
 */
export interface QueueSendMessageOptions extends MessagesEnqueueOptionalParams, CommonOptions {}

/** Optional parameters. */
export interface MessagesDequeueOptionalParams extends CommonOptions {
  /** The The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-queue-service-operations">Setting Timeouts for Queue Service Operations.</a> */
  timeoutInSeconds?: number;
  /** Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled. */
  requestId?: string;
  /** Optional. A nonzero integer value that specifies the number of messages to retrieve from the queue, up to a maximum of 32. If fewer are visible, the visible messages are returned. By default, a single message is retrieved from the queue with this operation. */
  numberOfMessages?: number;
  /** Optional. Specifies the new visibility timeout value, in seconds, relative to server time. The default value is 30 seconds. A specified value must be larger than or equal to 1 second, and cannot be larger than 7 days, or larger than 2 hours on REST protocol versions prior to version 2011-08-18. The visibility timeout of a message can be set to a value later than the expiry time. */
  visibilityTimeout?: number;
}

/**
 * Options to configure {@link QueueClient.receiveMessages} operation
 */
export interface QueueReceiveMessageOptions extends MessagesDequeueOptionalParams, CommonOptions {}

/** Optional parameters. */
export interface MessagesPeekOptionalParams extends CommonOptions {
  /** The The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-queue-service-operations">Setting Timeouts for Queue Service Operations.</a> */
  timeoutInSeconds?: number;
  /** Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled. */
  requestId?: string;
  /** Optional. A nonzero integer value that specifies the number of messages to retrieve from the queue, up to a maximum of 32. If fewer are visible, the visible messages are returned. By default, a single message is retrieved from the queue with this operation. */
  numberOfMessages?: number;
}

/**
 * Options to configure {@link QueueClient.peekMessages} operation
 */
export interface QueuePeekMessagesOptions extends MessagesPeekOptionalParams, CommonOptions {}

/**
 * Contains the response data for the {@link QueueClient.sendMessage} operation.
 */
export declare type QueueSendMessageResponse = WithResponse<
  {
    /**
     * The ID of the sent Message.
     */
    messageId: string;
    /**
     * This value is required to delete the Message.
     * If deletion fails using this popreceipt then the message has been received
     * by another client.
     */
    popReceipt: string;
    /**
     * The time that the message was inserted into the
     * Queue.
     */
    insertedOn: Date;
    /**
     * The time that the message will expire and be
     * automatically deleted.
     */
    expiresOn: Date;
    /**
     * The time that the message will again become
     * visible in the Queue.
     */
    nextVisibleOn: Date;
  } & MessagesEnqueueHeaders,
  MessagesEnqueueHeaders,
  EnqueuedMessage[]
>;

/**
 * The object returned in the `receivedMessageItems` array when calling {@link QueueClient.receiveMessages}.
 *
 * See: {@link QueueReceiveMessageResponse}
 */
export declare type ReceivedMessageItem = DequeuedMessageItem;

/**
 * Contains the response data for the {@link QueueClient.receiveMessages} operation.
 */
export declare type QueueReceiveMessageResponse = WithResponse<
  {
    receivedMessageItems: ReceivedMessageItem[];
  } & MessagesDequeueHeaders,
  MessagesDequeueHeaders,
  ReceivedMessageItem[]
>;

/**
 * Contains the response data for the {@link QueueClient.peekMessages} operation.
 */
export declare type QueuePeekMessagesResponse = WithResponse<
  {
    peekedMessageItems: PeekedMessageItem[];
  } & MessagesPeekHeaders,
  MessagesPeekHeaders,
  PeekedMessageItem[]
>;

/**
 * Options to configure the {@link QueueClient.deleteMessage} operation
 */
export interface QueueDeleteMessageOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
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
 */
export interface QueueUpdateMessageOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Contains response data for the {@link QueueClient.createIfNotExists} operation.
 */
export interface QueueCreateIfNotExistsResponse extends QueueCreateResponse {
  /**
   * Indicate whether the queue is successfully created. Is false when the queue is not changed as it already exists.
   */
  succeeded: boolean;
}

/**
 * Contains response data for the {@link QueueClient.deleteIfExists} operation.
 */
export interface QueueDeleteIfExistsResponse extends QueueDeleteResponse {
  /**
   * Indicate whether the queue is successfully deleted. Is false if the queue does not exist in the first place.
   */
  succeeded: boolean;
}

/**
 * Options to configure {@link QueueClient.generateSasUrl} operation.
 */
export interface QueueGenerateSasUrlOptions {
  /**
   * The version of the service this SAS will target. If not specified, it will default to the version targeted by the
   * library.
   */
  version?: string;

  /**
   * Optional. SAS protocols, HTTPS only or HTTPSandHTTP
   */
  protocol?: SASProtocol;

  /**
   * Optional. When the SAS will take effect.
   */
  startsOn?: Date;

  /**
   * Optional only when identifier is provided. The time after which the SAS will no longer work.
   */
  expiresOn?: Date;

  /**
   * Optional only when identifier is provided.
   * Please refer to {@link QueueSASPermissions} for help constructing the permissions string.
   */
  permissions?: QueueSASPermissions;

  /**
   * Optional. IP ranges allowed in this SAS.
   */
  ipRange?: SasIPRange;

  /**
   * Optional. The name of the access policy on the queue this SAS references if any.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/establishing-a-stored-access-policy
   */
  identifier?: string;
}

/**
 * A QueueClient represents a URL to an Azure Storage Queue's messages allowing you to manipulate its messages.
 */
export class QueueClient extends StorageClient {
  /**
   * messagesContext provided by protocol layer.
   */
  private messagesContext: Messages;
  /**
   * queueContext provided by protocol layer.
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
   * @param connectionString - Account connection string or a SAS connection string of an Azure storage account.
   *                                  [ Note - Account connection string can only be used in NODE.JS runtime. ]
   *                                  Account connection string example -
   *                                  `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
   *                                  SAS connection string example -
   *                                  `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
   * @param queueName - Queue name.
   * @param options - Options to configure the HTTP pipeline.
   */
  // Legacy, no way to fix the eslint error without breaking. Disable the rule for this line.
  /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options */
  constructor(connectionString: string, queueName: string, options?: StoragePipelineOptions);
  /**
   * Creates an instance of QueueClient.
   *
   * @param url - A URL string pointing to Azure Storage queue, such as
   *                     "https://myaccount.queue.core.windows.net/myqueue". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.queue.core.windows.net/myqueue?sasString".
   * @param credential -  Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the `@azure/identity` package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
   * @param options - Options to configure the HTTP pipeline.
   */
  constructor(
    url: string,
    credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential,
    // Legacy, no way to fix the eslint error without breaking. Disable the rule for this line.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options */
    options?: StoragePipelineOptions,
  );
  /**
   * Creates an instance of QueueClient.
   *
   * @param url - A URL string pointing to Azure Storage queue, such as
   *                     "https://myaccount.queue.core.windows.net/myqueue". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.queue.core.windows.net/myqueue?sasString".
   * @param pipeline - Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
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
    // Legacy, no way to fix the eslint error without breaking. Disable the rule for this line.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options */
    options?: StoragePipelineOptions,
  ) {
    options = options || {};
    let pipeline: Pipeline;
    let url: string;
    if (isPipelineLike(credentialOrPipelineOrQueueName)) {
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
      // The second parameter is undefined. Use anonymous credential.
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
            extractedCreds.accountKey,
          );
          url = appendToURLPath(extractedCreds.url, queueName);

          if (!options.proxyOptions) {
            options.proxyOptions = getDefaultProxySettings(extractedCreds.proxyUri);
          }

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
          "Connection string must be either an Account connection string or a SAS connection string",
        );
      }
    } else {
      throw new Error("Expecting non-empty strings for queueName parameter");
    }
    super(url, pipeline);
    this._name = this.getQueueNameFromUrl();
    this.queueContext = this.storageClientContext.queue;

    // MessagesContext
    // Build the url with "messages"
    const partsOfUrl = this.url.split("?");
    this._messagesUrl = partsOfUrl[1]
      ? appendToURLPath(partsOfUrl[0], "messages") + "?" + partsOfUrl[1]
      : appendToURLPath(partsOfUrl[0], "messages");

    this.messagesContext = getStorageClientContext(this._messagesUrl, this.pipeline).messages;
  }

  private getMessageIdContext(messageId: string): MessageId {
    // Build the url with messageId
    const partsOfUrl = this._messagesUrl.split("?");
    const urlWithMessageId = partsOfUrl[1]
      ? appendToURLPath(partsOfUrl[0], messageId) + "?" + partsOfUrl[1]
      : appendToURLPath(partsOfUrl[0], messageId);

    return getStorageClientContext(urlWithMessageId, this.pipeline).messageId;
  }

  /**
   * Creates a new queue under the specified account.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-queue4
   *
   * @param options - Options to Queue create operation.
   * @returns Response data for the Queue create operation.
   *
   * Example usage:
   *
   * ```js
   * const queueClient = queueServiceClient.getQueueClient("<new queue name>");
   * const createQueueResponse = await queueClient.create();
   * ```
   */
  public async create(options: QueueCreateOptions = {}): Promise<QueueCreateResponse> {
    return tracingClient.withSpan("QueueClient-create", options, async (updatedOptions) => {
      return assertResponse<QueueCreateHeaders, QueueCreateHeaders>(
        await this.queueContext.create(updatedOptions),
      );
    });
  }

  /**
   * Creates a new queue under the specified account if it doesn't already exist.
   * If the queue already exists, it is not changed.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-queue4
   *
   * @param options -
   */
  public async createIfNotExists(
    options: QueueCreateOptions = {},
  ): Promise<QueueCreateIfNotExistsResponse> {
    return tracingClient.withSpan(
      "QueueClient-createIfNotExists",
      options,
      async (updatedOptions) => {
        try {
          const response = await this.create(updatedOptions);

          // When a queue with the specified name already exists, the Queue service checks the metadata associated with the existing queue.
          // If the existing metadata is identical to the metadata specified on the Create Queue request, status code 204 (No Content) is returned.
          // If the existing metadata does not match, the operation fails and status code 409 (Conflict) is returned.
          if (response._response.status === 204) {
            return {
              succeeded: false,
              ...response,
            };
          }
          return {
            succeeded: true,
            ...response,
          };
        } catch (e: any) {
          if (e.details?.errorCode === "QueueAlreadyExists") {
            return {
              succeeded: false,
              ...e.response?.parsedHeaders,
              _response: e.response,
            };
          }

          throw e;
        }
      },
    );
  }

  /**
   * Deletes the specified queue permanently if it exists.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-queue3
   *
   * @param options -
   */
  public async deleteIfExists(
    options: QueueDeleteOptions = {},
  ): Promise<QueueDeleteIfExistsResponse> {
    return tracingClient.withSpan("QueueClient-deleteIfExists", options, async (updatedOptions) => {
      try {
        const res = await this.delete(updatedOptions);
        return {
          succeeded: true,
          ...res,
        };
      } catch (e: any) {
        if (e.details?.errorCode === "QueueNotFound") {
          return {
            succeeded: false,
            ...e.response?.parsedHeaders,
            _response: e.response,
          };
        }
        throw e;
      }
    });
  }

  /**
   * Deletes the specified queue permanently.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-queue3
   *
   * @param options - Options to Queue delete operation.
   * @returns Response data for the Queue delete operation.
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
    return tracingClient.withSpan("QueueClient-delete", options, async (updatedOptions) => {
      return assertResponse<QueueDeleteHeaders, QueueDeleteHeaders>(
        await this.queueContext.delete({
          abortSignal: options.abortSignal,
          tracingOptions: updatedOptions.tracingOptions,
        }),
      );
    });
  }

  /**
   * Returns true if the specified queue exists; false otherwise.
   *
   * NOTE: use this function with care since an existing queue might be deleted by other clients or
   * applications. Vice versa new queues might be added by other clients or applications after this
   * function completes.
   *
   * @param options - options to Exists operation.
   */
  public async exists(options: QueueExistsOptions = {}): Promise<boolean> {
    return tracingClient.withSpan("QueueClient-exists", options, async (updatedOptions) => {
      try {
        await this.getProperties(updatedOptions);
        return true;
      } catch (e: any) {
        if (e.statusCode === 404) {
          return false;
        }
        throw e;
      }
    });
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
   * @param options - Options to Queue get properties operation.
   * @returns Response data for the Queue get properties operation.
   */
  public async getProperties(
    options: QueueGetPropertiesOptions = {},
  ): Promise<QueueGetPropertiesResponse> {
    return tracingClient.withSpan("QueueClient-getProperties", options, async (updatedOptions) => {
      return assertResponse<QueueGetPropertiesHeaders, QueueGetPropertiesHeaders>(
        await this.queueContext.getProperties(updatedOptions),
      );
    });
  }

  /**
   * Sets one or more user-defined name-value pairs for the specified queue.
   *
   * If no option provided, or no metadata defined in the option parameter, the queue
   * metadata will be removed.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-queue-metadata
   *
   * @param metadata - If no metadata provided, all existing metadata will be removed.
   * @param options - Options to Queue set metadata operation.
   * @returns Response data for the Queue set metadata operation.
   */
  public async setMetadata(
    metadata?: Metadata,
    options: QueueSetMetadataOptions = {},
  ): Promise<QueueSetMetadataResponse> {
    return tracingClient.withSpan("QueueClient-setMetadata", options, async (updatedOptions) => {
      return assertResponse<QueueSetMetadataHeaders, QueueSetMetadataHeaders>(
        await this.queueContext.setMetadata({
          ...updatedOptions,
          metadata,
        }),
      );
    });
  }

  /**
   * Gets details about any stored access policies specified on the queue that may be used with Shared Access Signatures.
   *
   * WARNING: JavaScript Date will potential lost precision when parsing start and expiry string.
   * For example, new Date("2018-12-31T03:44:23.8827891Z").toISOString() will get "2018-12-31T03:44:23.882Z".
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-queue-acl
   *
   * @param options - Options to Queue get access policy operation.
   * @returns Response data for the Queue get access policy operation.
   */
  public async getAccessPolicy(
    options: QueueGetAccessPolicyOptions = {},
  ): Promise<QueueGetAccessPolicyResponse> {
    return tracingClient.withSpan(
      "QueueClient-getAccessPolicy",
      options,
      async (updatedOptions) => {
        const response = assertResponse<
          QueueGetAccessPolicyHeaders & SignedIdentifierModel[],
          QueueGetAccessPolicyHeaders,
          SignedIdentifierModel[]
        >(
          await this.queueContext.getAccessPolicy({
            abortSignal: options.abortSignal,
            tracingOptions: updatedOptions.tracingOptions,
          }),
        );

        const res: QueueGetAccessPolicyResponse = {
          _response: response._response,
          date: response.date,
          requestId: response.requestId,
          clientRequestId: response.clientRequestId,
          signedIdentifiers: [],
          version: response.version,
          errorCode: response.errorCode,
        };

        for (const identifier of response) {
          let accessPolicy: any = undefined;
          if (identifier.accessPolicy) {
            accessPolicy = {
              permissions: identifier.accessPolicy.permissions,
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
            id: identifier.id,
          });
        }

        return res;
      },
    );
  }

  /**
   * Sets stored access policies for the queue that may be used with Shared Access Signatures.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-queue-acl
   *
   * @param queueAcl -
   * @param options - Options to Queue set access policy operation.
   * @returns Response data for the Queue set access policy operation.
   */
  public async setAccessPolicy(
    queueAcl?: SignedIdentifier[],
    options: QueueSetAccessPolicyOptions = {},
  ): Promise<QueueSetAccessPolicyResponse> {
    return tracingClient.withSpan(
      "QueueClient-setAccessPolicy",
      options,
      async (updatedOptions) => {
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
                : undefined,
            },
            id: identifier.id,
          });
        }

        return assertResponse<QueueSetAccessPolicyHeaders, QueueSetAccessPolicyHeaders>(
          await this.queueContext.setAccessPolicy({
            ...updatedOptions,
            queueAcl: acl,
          }),
        );
      },
    );
  }

  /**
   * Clear deletes all messages from a queue.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/clear-messages
   *
   * @param options - Options to clear messages operation.
   * @returns Response data for the clear messages operation.
   */
  public async clearMessages(
    options: QueueClearMessagesOptions = {},
  ): Promise<QueueClearMessagesResponse> {
    return tracingClient.withSpan("QueueClient-clearMessages", options, async (updatedOptions) => {
      return assertResponse<MessagesClearHeaders, MessagesClearHeaders>(
        await this.messagesContext.clear(updatedOptions),
      );
    });
  }

  /**
   * sendMessage adds a new message to the back of a queue. The visibility timeout specifies how long
   * the message should be invisible to Dequeue and Peek operations.
   * The message content is up to 64KB in size, and must be in a format that can be included in an XML request with UTF-8 encoding.
   * To include markup in the message, the contents of the message must either be XML-escaped or Base64-encode.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/put-message
   *
   * @param messageText - Text of the message to send
   * @param options - Options to send messages operation.
   * @returns Response data for the send messages operation.
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
    options: QueueSendMessageOptions = {},
  ): Promise<QueueSendMessageResponse> {
    return tracingClient.withSpan("QueueClient-sendMessage", options, async (updatedOptions) => {
      const response = assertResponse<
        MessagesEnqueueHeaders & EnqueuedMessage[],
        MessagesEnqueueHeaders,
        EnqueuedMessage[]
      >(
        await this.messagesContext.enqueue(
          {
            messageText: messageText,
          },
          updatedOptions,
        ),
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
        expiresOn: item.expiresOn,
      };
    });
  }

  /**
   * receiveMessages retrieves one or more messages from the front of the queue.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-messages
   *
   * @param options - Options to receive messages operation.
   * @returns Response data for the receive messages operation.
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
    options: QueueReceiveMessageOptions = {},
  ): Promise<QueueReceiveMessageResponse> {
    return tracingClient.withSpan(
      "QueueClient-receiveMessages",
      options,
      async (updatedOptions) => {
        const response = assertResponse<
          MessagesDequeueHeaders & DequeuedMessageItem[],
          MessagesDequeueHeaders,
          DequeuedMessageItem[]
        >(await this.messagesContext.dequeue(updatedOptions));

        const res: QueueReceiveMessageResponse = {
          _response: response._response,
          date: response.date,
          requestId: response.requestId,
          clientRequestId: response.clientRequestId,
          receivedMessageItems: [],
          version: response.version,
          errorCode: response.errorCode,
        };

        for (const item of response) {
          res.receivedMessageItems.push(item);
        }

        return res;
      },
    );
  }

  /**
   * peekMessages retrieves one or more messages from the front of the queue but does not alter the visibility of the message.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/peek-messages
   *
   * @param options - Options to peek messages operation.
   * @returns Response data for the peek messages operation.
   *
   * Example usage:
   *
   * ```js
   * const peekMessagesResponse = await queueClient.peekMessages();
   * console.log("The peeked message is:", peekMessagesResponse.peekedMessageItems[0].messageText);
   * ```
   */
  public async peekMessages(
    options: QueuePeekMessagesOptions = {},
  ): Promise<QueuePeekMessagesResponse> {
    return tracingClient.withSpan("QueueClient-peekMessages", options, async (updatedOptions) => {
      const response = assertResponse<
        MessagesPeekHeaders & PeekedMessageItem[],
        MessagesPeekHeaders,
        PeekedMessageItem[]
      >(await this.messagesContext.peek(updatedOptions));

      const res: QueuePeekMessagesResponse = {
        _response: response._response,
        date: response.date,
        requestId: response.requestId,
        clientRequestId: response.clientRequestId,
        peekedMessageItems: [],
        version: response.version,
        errorCode: response.errorCode,
      };

      for (const item of response) {
        res.peekedMessageItems.push(item);
      }

      return res;
    });
  }

  /**
   * deleteMessage permanently removes the specified message from its queue.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-message2
   *
   * @param messageId - Id of the message.
   * @param popReceipt - A valid pop receipt value returned from an earlier call to the receive messages or update message operation.
   * @param options - Options to delete message operation.
   * @returns Response data for the delete message operation.
   */
  public async deleteMessage(
    messageId: string,
    popReceipt: string,
    options: QueueDeleteMessageOptions = {},
  ): Promise<QueueDeleteMessageResponse> {
    return tracingClient.withSpan("QueueClient-deleteMessage", options, async (updatedOptions) => {
      return assertResponse<MessageIdDeleteHeaders, MessageIdDeleteHeaders>(
        await this.getMessageIdContext(messageId).delete(popReceipt, updatedOptions),
      );
    });
  }

  /**
   * Update changes a message's visibility timeout and contents.
   * The message content is up to 64KB in size, and must be in a format that can be included in an XML request with UTF-8 encoding.
   * To include markup in the message, the contents of the message must either be XML-escaped or Base64-encode.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/update-message
   *
   * @param messageId - Id of the message
   * @param popReceipt - A valid pop receipt value returned from an earlier call to the receive messages or update message operation.
   * @param message - Message to update. If this parameter is undefined, then the content of the message won't be updated.
   * @param visibilityTimeout - Specifies the new visibility timeout value, in seconds,
   *                                   relative to server time. The new value must be larger than or equal to 0,
   *                                   and cannot be larger than 7 days. The visibility timeout of a message cannot
   *                                   be set to a value later than the expiry time.
   *                                   A message can be updated until it has been deleted or has expired.
   * @param options - Options to update message operation.
   * @returns Response data for the update message operation.
   */
  public async updateMessage(
    messageId: string,
    popReceipt: string,
    message?: string,
    visibilityTimeout?: number,
    options: QueueUpdateMessageOptions = {},
  ): Promise<QueueUpdateMessageResponse> {
    return tracingClient.withSpan("QueueClient-updateMessage", options, async (updatedOptions) => {
      let queueMessage = undefined;
      if (message !== undefined) {
        queueMessage = { messageText: message };
      }
      return assertResponse<MessageIdUpdateHeaders, MessageIdUpdateHeaders>(
        await this.getMessageIdContext(messageId).update(popReceipt, visibilityTimeout || 0, {
          abortSignal: options.abortSignal,
          tracingOptions: updatedOptions.tracingOptions,
          queueMessage,
        }),
      );
    });
  }

  private getQueueNameFromUrl(): string {
    let queueName;
    try {
      //  URL may look like the following
      // "https://myaccount.queue.core.windows.net/myqueue?sasString".
      // "https://myaccount.queue.core.windows.net/myqueue".
      // IPv4/IPv6 address hosts, Endpoints - `http://127.0.0.1:10001/devstoreaccount1/myqueue`
      // http://localhost:10001/devstoreaccount1/queuename

      const parsedUrl = new URL(this.url);

      if (parsedUrl.hostname.split(".")[1] === "queue") {
        // "https://myaccount.queue.core.windows.net/queuename".
        // .getPath() -> /queuename
        queueName = parsedUrl.pathname.split("/")[1];
      } else if (isIpEndpointStyle(parsedUrl)) {
        // IPv4/IPv6 address hosts... Example - http://192.0.0.10:10001/devstoreaccount1/queuename
        // Single word domain without a [dot] in the endpoint... Example - http://localhost:10001/devstoreaccount1/queuename
        // .getPath() -> /devstoreaccount1/queuename
        queueName = parsedUrl.pathname.split("/")[2];
      } else {
        // "https://customdomain.com/queuename".
        // .getPath() -> /queuename
        queueName = parsedUrl.pathname.split("/")[1];
      }

      if (!queueName) {
        throw new Error("Provided queueName is invalid.");
      }

      return queueName;
    } catch (error: any) {
      throw new Error("Unable to extract queueName with provided information.");
    }
  }

  /**
   * Only available for QueueClient constructed with a shared key credential.
   *
   * Generates a Service Shared Access Signature (SAS) URI based on the client properties
   * and parameters passed in. The SAS is signed by the shared key credential of the client.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/constructing-a-service-sas
   *
   * @param options - Optional parameters.
   * @returns The SAS URI consisting of the URI to the resource represented by this client, followed by the generated SAS token.
   */
  public generateSasUrl(options: QueueGenerateSasUrlOptions): string {
    if (!(this.credential instanceof StorageSharedKeyCredential)) {
      throw RangeError(
        "Can only generate the SAS when the client is initialized with a shared key credential",
      );
    }

    const sas = generateQueueSASQueryParameters(
      {
        queueName: this.name,
        ...options,
      },
      this.credential,
    ).toString();

    return appendToURLQuery(this.url, sas);
  }
}
