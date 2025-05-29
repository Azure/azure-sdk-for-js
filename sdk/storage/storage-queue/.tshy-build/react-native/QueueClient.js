// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { isTokenCredential } from "@azure/core-auth";
import { isNode } from "@azure/core-util";
import { newPipeline, isPipelineLike } from "./Pipeline.js";
import { StorageClient, getStorageClientContext } from "./StorageClient.js";
import { appendToURLPath, extractConnectionStringParts, isIpEndpointStyle, truncatedISO8061Date, appendToURLQuery, assertResponse, } from "./utils/utils.common.js";
import { StorageSharedKeyCredential } from "@azure/storage-blob";
import { AnonymousCredential } from "@azure/storage-blob";
import { tracingClient } from "./utils/tracing.js";
import { generateQueueSASQueryParameters, generateQueueSASQueryParametersInternal, } from "./QueueSASSignatureValues.js";
import { getDefaultProxySettings } from "@azure/core-rest-pipeline";
/**
 * A QueueClient represents a URL to an Azure Storage Queue's messages allowing you to manipulate its messages.
 */
export class QueueClient extends StorageClient {
    /**
     * The name of the queue.
     */
    get name() {
        return this._name;
    }
    constructor(urlOrConnectionString, credentialOrPipelineOrQueueName, 
    // Legacy, no way to fix the eslint error without breaking. Disable the rule for this line.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options */
    options) {
        options = options || {};
        let pipeline;
        let url;
        if (isPipelineLike(credentialOrPipelineOrQueueName)) {
            // (url: string, pipeline: Pipeline)
            url = urlOrConnectionString;
            pipeline = credentialOrPipelineOrQueueName;
        }
        else if ((isNode && credentialOrPipelineOrQueueName instanceof StorageSharedKeyCredential) ||
            credentialOrPipelineOrQueueName instanceof AnonymousCredential ||
            isTokenCredential(credentialOrPipelineOrQueueName)) {
            // (url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions)
            url = urlOrConnectionString;
            pipeline = newPipeline(credentialOrPipelineOrQueueName, options);
        }
        else if (!credentialOrPipelineOrQueueName &&
            typeof credentialOrPipelineOrQueueName !== "string") {
            // (url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions)
            // The second parameter is undefined. Use anonymous credential.
            url = urlOrConnectionString;
            pipeline = newPipeline(new AnonymousCredential(), options);
        }
        else if (credentialOrPipelineOrQueueName &&
            typeof credentialOrPipelineOrQueueName === "string") {
            // (connectionString: string, containerName: string, queueName: string, options?: StoragePipelineOptions)
            const extractedCreds = extractConnectionStringParts(urlOrConnectionString);
            if (extractedCreds.kind === "AccountConnString") {
                if (isNode) {
                    const queueName = credentialOrPipelineOrQueueName;
                    const sharedKeyCredential = new StorageSharedKeyCredential(extractedCreds.accountName, extractedCreds.accountKey);
                    url = appendToURLPath(extractedCreds.url, queueName);
                    if (!options.proxyOptions) {
                        options.proxyOptions = getDefaultProxySettings(extractedCreds.proxyUri);
                    }
                    pipeline = newPipeline(sharedKeyCredential, options);
                }
                else {
                    throw new Error("Account connection string is only supported in Node.js environment");
                }
            }
            else if (extractedCreds.kind === "SASConnString") {
                const queueName = credentialOrPipelineOrQueueName;
                url = appendToURLPath(extractedCreds.url, queueName) + "?" + extractedCreds.accountSas;
                pipeline = newPipeline(new AnonymousCredential(), options);
            }
            else {
                throw new Error("Connection string must be either an Account connection string or a SAS connection string");
            }
        }
        else {
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
    getMessageIdContext(messageId) {
        // Build the url with messageId
        const partsOfUrl = this._messagesUrl.split("?");
        const urlWithMessageId = partsOfUrl[1]
            ? appendToURLPath(partsOfUrl[0], messageId) + "?" + partsOfUrl[1]
            : appendToURLPath(partsOfUrl[0], messageId);
        return getStorageClientContext(urlWithMessageId, this.pipeline).messageId;
    }
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
    async create(options = {}) {
        return tracingClient.withSpan("QueueClient-create", options, async (updatedOptions) => {
            return assertResponse(await this.queueContext.create(updatedOptions));
        });
    }
    /**
     * Creates a new queue under the specified account if it doesn't already exist.
     * If the queue already exists, it is not changed.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/create-queue4
     *
     * @param options -
     */
    async createIfNotExists(options = {}) {
        return tracingClient.withSpan("QueueClient-createIfNotExists", options, async (updatedOptions) => {
            var _a, _b;
            try {
                const response = await this.create(updatedOptions);
                // When a queue with the specified name already exists, the Queue service checks the metadata associated with the existing queue.
                // If the existing metadata is identical to the metadata specified on the Create Queue request, status code 204 (No Content) is returned.
                // If the existing metadata does not match, the operation fails and status code 409 (Conflict) is returned.
                if (response._response.status === 204) {
                    return Object.assign({ succeeded: false }, response);
                }
                return Object.assign({ succeeded: true }, response);
            }
            catch (e) {
                if (((_a = e.details) === null || _a === void 0 ? void 0 : _a.errorCode) === "QueueAlreadyExists") {
                    return Object.assign(Object.assign({ succeeded: false }, (_b = e.response) === null || _b === void 0 ? void 0 : _b.parsedHeaders), { _response: e.response });
                }
                throw e;
            }
        });
    }
    /**
     * Deletes the specified queue permanently if it exists.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/delete-queue3
     *
     * @param options -
     */
    async deleteIfExists(options = {}) {
        return tracingClient.withSpan("QueueClient-deleteIfExists", options, async (updatedOptions) => {
            var _a, _b;
            try {
                const res = await this.delete(updatedOptions);
                return Object.assign({ succeeded: true }, res);
            }
            catch (e) {
                if (((_a = e.details) === null || _a === void 0 ? void 0 : _a.errorCode) === "QueueNotFound") {
                    return Object.assign(Object.assign({ succeeded: false }, (_b = e.response) === null || _b === void 0 ? void 0 : _b.parsedHeaders), { _response: e.response });
                }
                throw e;
            }
        });
    }
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
    async delete(options = {}) {
        return tracingClient.withSpan("QueueClient-delete", options, async (updatedOptions) => {
            return assertResponse(await this.queueContext.delete({
                abortSignal: options.abortSignal,
                tracingOptions: updatedOptions.tracingOptions,
            }));
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
    async exists(options = {}) {
        return tracingClient.withSpan("QueueClient-exists", options, async (updatedOptions) => {
            try {
                await this.getProperties(updatedOptions);
                return true;
            }
            catch (e) {
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
    async getProperties(options = {}) {
        return tracingClient.withSpan("QueueClient-getProperties", options, async (updatedOptions) => {
            return assertResponse(await this.queueContext.getProperties(updatedOptions));
        });
    }
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
    async setMetadata(metadata, options = {}) {
        return tracingClient.withSpan("QueueClient-setMetadata", options, async (updatedOptions) => {
            return assertResponse(await this.queueContext.setMetadata(Object.assign(Object.assign({}, updatedOptions), { metadata })));
        });
    }
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
    async getAccessPolicy(options = {}) {
        return tracingClient.withSpan("QueueClient-getAccessPolicy", options, async (updatedOptions) => {
            const response = assertResponse(await this.queueContext.getAccessPolicy({
                abortSignal: options.abortSignal,
                tracingOptions: updatedOptions.tracingOptions,
            }));
            const res = {
                _response: response._response,
                date: response.date,
                requestId: response.requestId,
                clientRequestId: response.clientRequestId,
                signedIdentifiers: [],
                version: response.version,
                errorCode: response.errorCode,
            };
            for (const identifier of response) {
                let accessPolicy = undefined;
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
        });
    }
    /**
     * Sets stored access policies for the queue that may be used with Shared Access Signatures.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/set-queue-acl
     *
     * @param queueAcl -
     * @param options - Options to Queue set access policy operation.
     * @returns Response data for the Queue set access policy operation.
     */
    async setAccessPolicy(queueAcl, options = {}) {
        return tracingClient.withSpan("QueueClient-setAccessPolicy", options, async (updatedOptions) => {
            const acl = [];
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
            return assertResponse(await this.queueContext.setAccessPolicy(Object.assign(Object.assign({}, updatedOptions), { queueAcl: acl })));
        });
    }
    /**
     * Clear deletes all messages from a queue.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/clear-messages
     *
     * @param options - Options to clear messages operation.
     * @returns Response data for the clear messages operation.
     */
    async clearMessages(options = {}) {
        return tracingClient.withSpan("QueueClient-clearMessages", options, async (updatedOptions) => {
            return assertResponse(await this.messagesContext.clear(updatedOptions));
        });
    }
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
    async sendMessage(messageText, options = {}) {
        return tracingClient.withSpan("QueueClient-sendMessage", options, async (updatedOptions) => {
            const response = assertResponse(await this.messagesContext.enqueue({
                messageText: messageText,
            }, updatedOptions));
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
    async receiveMessages(options = {}) {
        return tracingClient.withSpan("QueueClient-receiveMessages", options, async (updatedOptions) => {
            const response = assertResponse(await this.messagesContext.dequeue(updatedOptions));
            const res = {
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
        });
    }
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
    async peekMessages(options = {}) {
        return tracingClient.withSpan("QueueClient-peekMessages", options, async (updatedOptions) => {
            const response = assertResponse(await this.messagesContext.peek(updatedOptions));
            const res = {
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
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/delete-message2
     *
     * @param messageId - Id of the message.
     * @param popReceipt - A valid pop receipt value returned from an earlier call to the receive messages or update message operation.
     * @param options - Options to delete message operation.
     * @returns Response data for the delete message operation.
     */
    async deleteMessage(messageId, popReceipt, options = {}) {
        return tracingClient.withSpan("QueueClient-deleteMessage", options, async (updatedOptions) => {
            return assertResponse(await this.getMessageIdContext(messageId).delete(popReceipt, updatedOptions));
        });
    }
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
    async updateMessage(messageId, popReceipt, message, visibilityTimeout, options = {}) {
        return tracingClient.withSpan("QueueClient-updateMessage", options, async (updatedOptions) => {
            let queueMessage = undefined;
            if (message !== undefined) {
                queueMessage = { messageText: message };
            }
            return assertResponse(await this.getMessageIdContext(messageId).update(popReceipt, visibilityTimeout || 0, {
                abortSignal: options.abortSignal,
                tracingOptions: updatedOptions.tracingOptions,
                queueMessage,
            }));
        });
    }
    getQueueNameFromUrl() {
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
            }
            else if (isIpEndpointStyle(parsedUrl)) {
                // IPv4/IPv6 address hosts... Example - http://192.0.0.10:10001/devstoreaccount1/queuename
                // Single word domain without a [dot] in the endpoint... Example - http://localhost:10001/devstoreaccount1/queuename
                // .getPath() -> /devstoreaccount1/queuename
                queueName = parsedUrl.pathname.split("/")[2];
            }
            else {
                // "https://customdomain.com/queuename".
                // .getPath() -> /queuename
                queueName = parsedUrl.pathname.split("/")[1];
            }
            if (!queueName) {
                throw new Error("Provided queueName is invalid.");
            }
            return queueName;
        }
        catch (error) {
            throw new Error("Unable to extract queueName with provided information.");
        }
    }
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
    generateSasUrl(options) {
        if (!(this.credential instanceof StorageSharedKeyCredential)) {
            throw RangeError("Can only generate the SAS when the client is initialized with a shared key credential");
        }
        const sas = generateQueueSASQueryParameters(Object.assign({ queueName: this.name }, options), this.credential).toString();
        return appendToURLQuery(this.url, sas);
    }
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
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options*/
    generateSasStringToSign(options) {
        if (!(this.credential instanceof StorageSharedKeyCredential)) {
            throw RangeError("Can only generate the SAS when the client is initialized with a shared key credential");
        }
        return generateQueueSASQueryParametersInternal(Object.assign({ queueName: this.name }, options), this.credential).stringToSign;
    }
}
//# sourceMappingURL=QueueClient.js.map