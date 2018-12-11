import * as Models from "./generated/models";
import { Aborter } from "./Aborter";
import { MessageId } from "./generated/operations";
import { Pipeline } from "./Pipeline";
import { MessagesURL } from "./MessagesURL";
import { StorageURL } from "./StorageURL";
import { appendToURLPath } from "./utils/utils.common";

/**
 * A MessageIdURL represents a URL to a specific Azure Storage Queue message allowing you to manipulate the message.
 *
 * @export
 * @class MessageIdURL
 * @extends {StorageURL}
 */
export class MessageIdURL extends StorageURL {
  /**
   * Creates a MessageIdURL object from MessagesURL
   * @param messagesURL
   * @param messageId
   */
  public static fromMessagesURL(
    messagesURL: MessagesURL,
    messageId: string
  ): MessageIdURL {
    return new MessageIdURL(
      appendToURLPath(messagesURL.url, messageId),
      messagesURL.pipeline
    );
  }

  /**
   * messageIdContext provided by protocol layer.
   *
   * @private
   * @type {MessageId}
   * @memberof MessageIdURL
   */
  private messageIdContext: MessageId;

  /**
   * Creates an instance of MessageIdURL.
   * @param {string} url A URL string pointing to Azure Storage queue's message, such as
   *                     "https://myaccount.queue.core.windows.net/myqueue/messages/messageid". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.queue.core.windows.net/myqueue/messages/messageid?sasString".
   * @param {Pipeline} pipeline Call StorageURL.newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof MessageIdURL
   */
  constructor(url: string, pipeline: Pipeline) {
    super(url, pipeline);
    this.messageIdContext = new MessageId(this.storageClientContext);
  }

  /**
   * Creates a new MessageIdURL object identical to the source but with the
   * specified request policy pipeline.
   *
   * @param {Pipeline} pipeline
   * @returns {MessageIdURL}
   * @memberof MessageIdURL
   */
  public withPipeline(pipeline: Pipeline): MessageIdURL {
    return new MessageIdURL(this.url, pipeline);
  }

  /**
   * Delete permanently removes the specified message from its queue.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-message2
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {string} popReceipt A valid pop receipt value returned from an earlier call to the dequeue messages or update message operation.
   * @returns {Promise<Models.MessageIdDeleteResponse>}
   * @memberof MessageIdURL
   */
  public async delete(
    aborter: Aborter,
    popReceipt: string
  ): Promise<Models.MessageIdDeleteResponse> {
    return this.messageIdContext.deleteMethod(popReceipt, {
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
   * @returns {Promise<Models.MessageIdUpdateResponse>}
   * @memberof MessageIdURL
   */
  public async update(
    aborter: Aborter,
    popReceipt: string,
    visibilityTimeout: number,
    message: string
  ): Promise<Models.MessageIdUpdateResponse> {
    return this.messageIdContext.update(
      {
        messageText: message
      },
      popReceipt,
      visibilityTimeout,
      {
        abortSignal: aborter
      }
    );
  }
}
