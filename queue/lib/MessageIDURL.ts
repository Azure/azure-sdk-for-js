import * as Models from "../lib/generated/models";
import { Aborter } from "./Aborter";
import { MessageID } from "./generated/operations";
import { Pipeline } from "./Pipeline";
import { MessagesURL } from "./MessagesURL";
import { StorageURL } from "./StorageURL";
import { appendToURLPath } from "./utils/utils.common";

/**
 * A MessageIDURL represents a URL to a specific Azure Storage Queue message allowing you to manipulate the message.
 *
 * @export
 * @class MessageIDURL
 * @extends {StorageURL}
 */
export class MessageIDURL extends StorageURL {
    /**
     * Creates a MessageIDURL object from MessagesURL
     * @param messagesURL
     * @param messageID
     */
    public static fromMessagesURL(
        messagesURL: MessagesURL,
        messageID: string
    ): MessageIDURL {
        return new MessageIDURL(
            appendToURLPath(messagesURL.url, messageID),
            messagesURL.pipeline
        );
    }

    /**
     * messageIDContext provided by protocol layer.
     *
     * @private
     * @type {MessageID}
     * @memberof MessageIDURL
     */
    private messageIDContext: MessageID;

    /**
     * Creates an instance of MessageIDURL.
     * @param {string} url A URL string pointing to Azure Storage queue's message, such as
     *                     "https://myaccount.queue.core.windows.net/myqueue/messages/messageid". You can
     *                     append a SAS if using AnonymousCredential, such as
     *                     "https://myaccount.queue.core.windows.net/myqueue/messages/messageid?sasString".
     * @param {Pipeline} pipeline Call StorageURL.newPipeline() to create a default
     *                            pipeline, or provide a customized pipeline.
     * @memberof MessageIDURL
     */
    constructor(url: string, pipeline: Pipeline) {
        super(url, pipeline);
        this.messageIDContext = new MessageID(this.storageClientContext);
    }

    /**
     * Creates a new MessageIDURL object identical to the source but with the
     * specified request policy pipeline.
     *
     * @param {Pipeline} pipeline
     * @returns {MessageIDURL}
     * @memberof MessageIDURL
     */
    public withPipeline(pipeline: Pipeline): MessageIDURL {
        return new MessageIDURL(this.url, pipeline);
    }

    /**
     * Delete permanently removes the specified message from its queue.
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-message2
     *
     * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
     *                          goto documents of Aborter for more examples about request cancellation
     * @param {string} popReceipt A valid pop receipt value returned from an earlier call to the dequeue messages or update message operation.
     * @returns {Promise<Models.MessageIDDeleteResponse>}
     * @memberof MessageIDURL
     */
    public async delete(
        aborter: Aborter,
        popReceipt: string,
    ): Promise<Models.MessageIDDeleteResponse> {
        return this.messageIDContext.deleteMethod(
            popReceipt,
            {
                abortSignal: aborter 
            });
    }

    /**
    * Update changes a message's visibility timeout and contents. 
    * The message content must be a UTF-8 encoded string that is up to 64KB in size.
    * @see https://docs.microsoft.com/en-us/rest/api/storageservices/update-message
    *
    * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
    *                          goto documents of Aborter for more examples about request cancellation
    * @param {string} popReceipt A valid pop receipt value returned from an earlier call to the dequeue messages or update message operation.
    * @param {number} visibilityTimeout Specifies the new visibility timeout value, in seconds, 
    *                                   relative to server time. The new value must be larger than or equal to 0, 
    *                                   and cannot be larger than 7 days. The visibility timeout of a message cannot 
    *                                   be set to a value later than the expiry time. 
    *                                   A message can be updated until it has been deleted or has expired.
    * @param {string} message Message to update.
    * @returns {Promise<Models.MessageIDUpdateResponse>}
    * @memberof MessageIDURL
    */
    public async update(
        aborter: Aborter,
        popReceipt: string,
        visibilityTimeout: number,
        message: string
    ): Promise<Models.MessageIDUpdateResponse> {
        return this.messageIDContext.update(
            {
                messageText: message
            },
            popReceipt,
            visibilityTimeout,
            {
                abortSignal: aborter
            });
    }
}