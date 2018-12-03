import { HttpResponse } from "ms-rest-js";
import * as Models from "../lib/generated/models";
import { Aborter } from "./Aborter";
import { Messages } from "./generated/operations";
import { Pipeline } from "./Pipeline";
import { QueueURL } from "./QueueURL";
import { StorageURL } from "./StorageURL";
import { appendToURLPath } from "./utils/utils.common";

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
 * A MessagesURL represents a URL to an Azure Storage Queue's messages allowing you to manipulate its messages.
 *
 * @export
 * @class MessagesURL
 * @extends {StorageURL}
 */
export class MessagesURL extends StorageURL {
    /**
     * Creates a MessagesURL object from QueueURL
     * @param queueURL
     * @param queueName
     */
    public static fromQueueURL(
        queueURL: QueueURL
    ): MessagesURL {
        return new MessagesURL(
            appendToURLPath(queueURL.url, "messages"),
            queueURL.pipeline
        );
    }

    /**
     * messagesContext provided by protocol layer.
     *
     * @private
     * @type {Messages}
     * @memberof MessagesURL
     */
    private messagesContext: Messages;

    /**
     * Creates an instance of MessagesURL.
     * @param {string} url A URL string pointing to Azure Storage queue's messages, such as
     *                     "https://myaccount.queue.core.windows.net/myqueue/messages". You can
     *                     append a SAS if using AnonymousCredential, such as
     *                     "https://myaccount.queue.core.windows.net/myqueue/messages?sasString".
     * @param {Pipeline} pipeline Call StorageURL.newPipeline() to create a default
     *                            pipeline, or provide a customized pipeline.
     * @memberof MessagesURL
     */
    constructor(url: string, pipeline: Pipeline) {
        super(url, pipeline);
        this.messagesContext = new Messages(this.storageClientContext);
    }

    /**
     * Creates a new MessagesURL object identical to the source but with the
     * specified request policy pipeline.
     *
     * @param {Pipeline} pipeline
     * @returns {MessagesURL}
     * @memberof MessagesURL
     */
    public withPipeline(pipeline: Pipeline): MessagesURL {
        return new MessagesURL(this.url, pipeline);
    }

    /**
     * Clear deletes all messages from a queue.
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/clear-messages
     *
     * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
     *                          goto documents of Aborter for more examples about request cancellation
     * @returns {Promise<Models.MessageClearResponse>}
     * @memberof MessagesURL
     */
    public async clear(
        aborter: Aborter,
    ): Promise<Models.MessagesClearResponse> {
        return this.messagesContext.clear({
            abortSignal: aborter
        });
    }

    /**
     * Enqueue adds a new message to the back of a queue. The visibility timeout specifies how long 
     * the message should be invisible to Dequeue and Peek operations. 
     * The message content must be a UTF-8 encoded string that is up to 64KB in size.
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/put-message
     *
     * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
     *                          goto documents of Aborter for more examples about request cancellation
     * @param {string} messageText
     * @param {Models.MessagesEnqueueOptionalParams} [options]
     * @returns {Promise<Models.MessagesEnqueueResponse>}
     * @memberof MessagesURL
     */
    public async enqueue(
        aborter: Aborter,
        messageText: string,
        options: Models.MessagesEnqueueOptionalParams = {}
    ): Promise<MessagesEnqueueResponse> {
        const response = await this.messagesContext.enqueue(
            {
                messageText: messageText
            },
            {
                abortSignal: aborter,
                ...options
            });
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
        }
    }

    /**
   * Dequeue retrieves one or more messages from the front of the queue.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-messages
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {Models.MessagesDequeueOptionalParams} [options]
   * @returns {Promise<Models.MessagesDequeueResponse>}
   * @memberof MessagesURL
   */
    public async dequeue(
        aborter: Aborter,
        options: Models.MessagesDequeueOptionalParams = {}
    ): Promise<MessagesDequeueResponse> {
        const response = await this.messagesContext.dequeue(
            {
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
        }

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
    * @param {Models.MessagesPeekOptionalParams} [options]
    * @returns {Promise<Models.MessagesPeekResponse>}
    * @memberof MessagesURL
    */
    public async peek(
        aborter: Aborter,
        options: Models.MessagesPeekOptionalParams = {}
    ): Promise<MessagesPeekResponse> {
        const response = await this.messagesContext.peek(
            {
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
        }

        for (const item of response) {
            res.peekedMessageItems.push(item);
        }

        return res;
    }
}
