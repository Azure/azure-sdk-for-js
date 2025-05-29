import type { TokenCredential } from "@azure/core-auth";
import type { EnqueuedMessage, DequeuedMessageItem, MessagesDequeueHeaders, MessagesEnqueueHeaders, MessagesPeekHeaders, MessageIdUpdateResponse, MessageIdDeleteResponse, MessagesClearResponse, PeekedMessageItem, QueueDeleteResponse, QueueGetAccessPolicyHeaders, QueueGetPropertiesResponse, QueueSetAccessPolicyResponse, QueueSetMetadataResponse, SignedIdentifierModel, QueueCreateResponse } from "./generatedModels.js";
import type { AbortSignalLike } from "@azure/abort-controller";
import type { StoragePipelineOptions, Pipeline } from "./Pipeline.js";
import type { CommonOptions } from "./StorageClient.js";
import { StorageClient } from "./StorageClient.js";
import type { WithResponse } from "./utils/utils.common.js";
import { StorageSharedKeyCredential } from "@azure/storage-blob";
import { AnonymousCredential } from "@azure/storage-blob";
import type { Metadata } from "./models.js";
import type { SasIPRange } from "./SasIPRange.js";
import type { QueueSASPermissions } from "./QueueSASPermissions.js";
import type { SASProtocol } from "./SASQueryParameters.js";
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
         * @see https://learn.microsoft.com/en-us/rest/api/storageservices/set-queue-acl
         */
        permissions?: string;
    };
}
/**
 * Contains response data for the {@link QueueClient.getAccessPolicy} operation.
 */
export declare type QueueGetAccessPolicyResponse = WithResponse<{
    signedIdentifiers: SignedIdentifier[];
} & QueueGetAccessPolicyHeaders, QueueGetAccessPolicyHeaders, SignedIdentifierModel[]>;
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
    /** The The timeout parameter is expressed in seconds. For more information, see <a href="https://learn.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-queue-service-operations">Setting Timeouts for Queue Service Operations.</a> */
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
export interface QueueSendMessageOptions extends MessagesEnqueueOptionalParams, CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
}
/** Optional parameters. */
export interface MessagesDequeueOptionalParams extends CommonOptions {
    /** The The timeout parameter is expressed in seconds. For more information, see <a href="https://learn.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-queue-service-operations">Setting Timeouts for Queue Service Operations.</a> */
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
export interface QueueReceiveMessageOptions extends MessagesDequeueOptionalParams, CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
}
/** Optional parameters. */
export interface MessagesPeekOptionalParams extends CommonOptions {
    /** The The timeout parameter is expressed in seconds. For more information, see <a href="https://learn.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-queue-service-operations">Setting Timeouts for Queue Service Operations.</a> */
    timeoutInSeconds?: number;
    /** Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled. */
    requestId?: string;
    /** Optional. A nonzero integer value that specifies the number of messages to retrieve from the queue, up to a maximum of 32. If fewer are visible, the visible messages are returned. By default, a single message is retrieved from the queue with this operation. */
    numberOfMessages?: number;
}
/**
 * Options to configure {@link QueueClient.peekMessages} operation
 */
export interface QueuePeekMessagesOptions extends MessagesPeekOptionalParams, CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
}
/**
 * Contains the response data for the {@link QueueClient.sendMessage} operation.
 */
export declare type QueueSendMessageResponse = WithResponse<{
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
} & MessagesEnqueueHeaders, MessagesEnqueueHeaders, EnqueuedMessage[]>;
/**
 * The object returned in the `receivedMessageItems` array when calling {@link QueueClient.receiveMessages}.
 *
 * See: {@link QueueReceiveMessageResponse}
 */
export declare type ReceivedMessageItem = DequeuedMessageItem;
/**
 * Contains the response data for the {@link QueueClient.receiveMessages} operation.
 */
export declare type QueueReceiveMessageResponse = WithResponse<{
    receivedMessageItems: ReceivedMessageItem[];
} & MessagesDequeueHeaders, MessagesDequeueHeaders, ReceivedMessageItem[]>;
/**
 * Contains the response data for the {@link QueueClient.peekMessages} operation.
 */
export declare type QueuePeekMessagesResponse = WithResponse<{
    peekedMessageItems: PeekedMessageItem[];
} & MessagesPeekHeaders, MessagesPeekHeaders, PeekedMessageItem[]>;
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
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/establishing-a-stored-access-policy
     */
    identifier?: string;
}
/**
 * A QueueClient represents a URL to an Azure Storage Queue's messages allowing you to manipulate its messages.
 */
export declare class QueueClient extends StorageClient {
    /**
     * messagesContext provided by protocol layer.
     */
    private messagesContext;
    /**
     * queueContext provided by protocol layer.
     */
    private queueContext;
    private _name;
    private _messagesUrl;
    /**
     * The name of the queue.
     */
    get name(): string;
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
    constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions);
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
    private getMessageIdContext;
    /**
     * Creates a new queue under the specified account.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/create-queue4
     *
     * @param options - Options to Queue create operation.
     * @returns Response data for the Queue create operation.
     *
     * Example usage:
     *
     * ```ts snippet:ReadmeSampleCreateQueue
     * import { QueueServiceClient } from "@azure/storage-queue";
     * import { DefaultAzureCredential } from "@azure/identity";
     *
     * const account = "<account>";
     * const queueServiceClient = new QueueServiceClient(
     *   `https://${account}.queue.core.windows.net`,
     *   new DefaultAzureCredential(),
     * );
     *
     * const queueName = "<valid queue name>";
     * const queueClient = queueServiceClient.getQueueClient(queueName);
     * const createQueueResponse = await queueClient.create();
     * console.log(
     *   `Created queue ${queueName} successfully, service assigned request Id: ${createQueueResponse.requestId}`,
     * );
     * ```
     */
    create(options?: QueueCreateOptions): Promise<QueueCreateResponse>;
    /**
     * Creates a new queue under the specified account if it doesn't already exist.
     * If the queue already exists, it is not changed.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/create-queue4
     *
     * @param options -
     */
    createIfNotExists(options?: QueueCreateOptions): Promise<QueueCreateIfNotExistsResponse>;
    /**
     * Deletes the specified queue permanently if it exists.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/delete-queue3
     *
     * @param options -
     */
    deleteIfExists(options?: QueueDeleteOptions): Promise<QueueDeleteIfExistsResponse>;
    /**
     * Deletes the specified queue permanently.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/delete-queue3
     *
     * @param options - Options to Queue delete operation.
     * @returns Response data for the Queue delete operation.
     *
     * Example usage:
     *
     * ```ts snippet:ReadmeSampleDeleteQueue
     * import { QueueServiceClient } from "@azure/storage-queue";
     * import { DefaultAzureCredential } from "@azure/identity";
     *
     * const account = "<account>";
     * const queueServiceClient = new QueueServiceClient(
     *   `https://${account}.queue.core.windows.net`,
     *   new DefaultAzureCredential(),
     * );
     *
     * const queueName = "<valid queue name>";
     * const queueClient = queueServiceClient.getQueueClient(queueName);
     * const deleteQueueResponse = await queueClient.delete();
     * console.log(
     *   `Deleted queue successfully, service assigned request Id: ${deleteQueueResponse.requestId}`,
     * );
     * ```
     */
    delete(options?: QueueDeleteOptions): Promise<QueueDeleteResponse>;
    /**
     * Returns true if the specified queue exists; false otherwise.
     *
     * NOTE: use this function with care since an existing queue might be deleted by other clients or
     * applications. Vice versa new queues might be added by other clients or applications after this
     * function completes.
     *
     * @param options - options to Exists operation.
     */
    exists(options?: QueueExistsOptions): Promise<boolean>;
    /**
     * Gets all user-defined metadata and system properties for the specified
     * queue. Metadata is associated with the queue as name-values pairs.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/get-queue-metadata
     *
     * WARNING: The `metadata` object returned in the response will have its keys in lowercase, even if
     * they originally contained uppercase characters. This differs from the metadata keys returned by
     * the `listQueues` method of {@link QueueServiceClient} using the `includeMetadata` option, which
     * will retain their original casing.
     *
     * @param options - Options to Queue get properties operation.
     * @returns Response data for the Queue get properties operation.
     */
    getProperties(options?: QueueGetPropertiesOptions): Promise<QueueGetPropertiesResponse>;
    /**
     * Sets one or more user-defined name-value pairs for the specified queue.
     *
     * If no option provided, or no metadata defined in the option parameter, the queue
     * metadata will be removed.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/set-queue-metadata
     *
     * @param metadata - If no metadata provided, all existing metadata will be removed.
     * @param options - Options to Queue set metadata operation.
     * @returns Response data for the Queue set metadata operation.
     */
    setMetadata(metadata?: Metadata, options?: QueueSetMetadataOptions): Promise<QueueSetMetadataResponse>;
    /**
     * Gets details about any stored access policies specified on the queue that may be used with Shared Access Signatures.
     *
     * WARNING: JavaScript Date will potential lost precision when parsing start and expiry string.
     * For example, new Date("2018-12-31T03:44:23.8827891Z").toISOString() will get "2018-12-31T03:44:23.882Z".
     *
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/get-queue-acl
     *
     * @param options - Options to Queue get access policy operation.
     * @returns Response data for the Queue get access policy operation.
     */
    getAccessPolicy(options?: QueueGetAccessPolicyOptions): Promise<QueueGetAccessPolicyResponse>;
    /**
     * Sets stored access policies for the queue that may be used with Shared Access Signatures.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/set-queue-acl
     *
     * @param queueAcl -
     * @param options - Options to Queue set access policy operation.
     * @returns Response data for the Queue set access policy operation.
     */
    setAccessPolicy(queueAcl?: SignedIdentifier[], options?: QueueSetAccessPolicyOptions): Promise<QueueSetAccessPolicyResponse>;
    /**
     * Clear deletes all messages from a queue.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/clear-messages
     *
     * @param options - Options to clear messages operation.
     * @returns Response data for the clear messages operation.
     */
    clearMessages(options?: QueueClearMessagesOptions): Promise<QueueClearMessagesResponse>;
    /**
     * sendMessage adds a new message to the back of a queue. The visibility timeout specifies how long
     * the message should be invisible to Dequeue and Peek operations.
     * The message content is up to 64KB in size, and must be in a format that can be included in an XML request with UTF-8 encoding.
     * To include markup in the message, the contents of the message must either be XML-escaped or Base64-encode.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/put-message
     *
     * @param messageText - Text of the message to send
     * @param options - Options to send messages operation.
     * @returns Response data for the send messages operation.
     *
     * Example usage:
     *
     * ```ts snippet:ReadmeSampleSendMessage
     * import { QueueServiceClient } from "@azure/storage-queue";
     * import { DefaultAzureCredential } from "@azure/identity";
     *
     * const account = "<account>";
     * const queueServiceClient = new QueueServiceClient(
     *   `https://${account}.queue.core.windows.net`,
     *   new DefaultAzureCredential(),
     * );
     *
     * const queueName = "<valid queue name>";
     * const queueClient = queueServiceClient.getQueueClient(queueName);
     * // Send a message into the queue using the sendMessage method.
     * const sendMessageResponse = await queueClient.sendMessage("Hello World!");
     * console.log(
     *   `Sent message successfully, service assigned message Id: ${sendMessageResponse.messageId}, service assigned request Id: ${sendMessageResponse.requestId}`,
     * );
     * ```
     */
    sendMessage(messageText: string, options?: QueueSendMessageOptions): Promise<QueueSendMessageResponse>;
    /**
     * receiveMessages retrieves one or more messages from the front of the queue.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/get-messages
     *
     * @param options - Options to receive messages operation.
     * @returns Response data for the receive messages operation.
     *
     * Example usage:
     *
     * ```ts snippet:ReadmeSampleReceiveMessage
     * import { QueueServiceClient } from "@azure/storage-queue";
     * import { DefaultAzureCredential } from "@azure/identity";
     *
     * const account = "<account>";
     * const queueServiceClient = new QueueServiceClient(
     *   `https://${account}.queue.core.windows.net`,
     *   new DefaultAzureCredential(),
     * );
     *
     * const queueName = "<valid queue name>";
     * const queueClient = queueServiceClient.getQueueClient(queueName);
     * const response = await queueClient.receiveMessages();
     * if (response.receivedMessageItems.length === 1) {
     *   const receivedMessageItem = response.receivedMessageItems[0];
     *   console.log(`Processing & deleting message with content: ${receivedMessageItem.messageText}`);
     *   const deleteMessageResponse = await queueClient.deleteMessage(
     *     receivedMessageItem.messageId,
     *     receivedMessageItem.popReceipt,
     *   );
     *   console.log(
     *     `Delete message successfully, service assigned request Id: ${deleteMessageResponse.requestId}`,
     *   );
     * }
     * ```
     */
    receiveMessages(options?: QueueReceiveMessageOptions): Promise<QueueReceiveMessageResponse>;
    /**
     * peekMessages retrieves one or more messages from the front of the queue but does not alter the visibility of the message.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/peek-messages
     *
     * @param options - Options to peek messages operation.
     * @returns Response data for the peek messages operation.
     *
     * Example usage:
     *
     * ```ts snippet:ReadmeSamplePeekMessage
     * import { QueueServiceClient } from "@azure/storage-queue";
     * import { DefaultAzureCredential } from "@azure/identity";
     *
     * const account = "<account>";
     * const queueServiceClient = new QueueServiceClient(
     *   `https://${account}.queue.core.windows.net`,
     *   new DefaultAzureCredential(),
     * );
     *
     * const queueName = "<valid queue name>";
     * const queueClient = queueServiceClient.getQueueClient(queueName);
     * const peekMessagesResponse = await queueClient.peekMessages();
     * console.log(`The peeked message is: ${peekMessagesResponse.peekedMessageItems[0].messageText}`);
     * ```
     */
    peekMessages(options?: QueuePeekMessagesOptions): Promise<QueuePeekMessagesResponse>;
    /**
     * deleteMessage permanently removes the specified message from its queue.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/delete-message2
     *
     * @param messageId - Id of the message.
     * @param popReceipt - A valid pop receipt value returned from an earlier call to the receive messages or update message operation.
     * @param options - Options to delete message operation.
     * @returns Response data for the delete message operation.
     */
    deleteMessage(messageId: string, popReceipt: string, options?: QueueDeleteMessageOptions): Promise<QueueDeleteMessageResponse>;
    /**
     * Update changes a message's visibility timeout and contents.
     * The message content is up to 64KB in size, and must be in a format that can be included in an XML request with UTF-8 encoding.
     * To include markup in the message, the contents of the message must either be XML-escaped or Base64-encode.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/update-message
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
    updateMessage(messageId: string, popReceipt: string, message?: string, visibilityTimeout?: number, options?: QueueUpdateMessageOptions): Promise<QueueUpdateMessageResponse>;
    private getQueueNameFromUrl;
    /**
     * Only available for QueueClient constructed with a shared key credential.
     *
     * Generates a Service Shared Access Signature (SAS) URI based on the client properties
     * and parameters passed in. The SAS is signed by the shared key credential of the client.
     *
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/constructing-a-service-sas
     *
     * @param options - Optional parameters.
     * @returns The SAS URI consisting of the URI to the resource represented by this client, followed by the generated SAS token.
     */
    generateSasUrl(options: QueueGenerateSasUrlOptions): string;
    /**
     * Only available for QueueClient constructed with a shared key credential.
     *
     * Generates string to sign for a Service Shared Access Signature (SAS) URI based on the client properties
     * and parameters passed in. The SAS is signed by the shared key credential of the client.
     *
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/constructing-a-service-sas
     *
     * @param options - Optional parameters.
     * @returns The SAS URI consisting of the URI to the resource represented by this client, followed by the generated SAS token.
     */
    generateSasStringToSign(options: QueueGenerateSasUrlOptions): string;
}
//# sourceMappingURL=QueueClient.d.ts.map