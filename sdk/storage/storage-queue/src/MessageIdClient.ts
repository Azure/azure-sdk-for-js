import * as Models from "./generated/lib/models";
import { Aborter } from "@azure/core-aborter";
import { MessageId } from "./generated/lib/operations";
import { Pipeline } from "./Pipeline";
import { MessagesClient } from "./MessagesClient";
import { StorageClient } from "./StorageClient";
import { appendToURLPath } from "./utils/utils.common";

/**
 * A MessageIdClient represents a URL to a specific Azure Storage Queue message allowing you to manipulate the message.
 *
 * @export
 * @class MessageIdClient
 * @extends {StorageClient}
 */
export class MessageIdClient extends StorageClient {
  /**
   * Creates a MessageIdClient object from MessagesClient
   * @param messagesClient
   * @param messageId
   */
  public static fromMessagesClient(
    messagesClient: MessagesClient,
    messageId: string
  ): MessageIdClient {
    return new MessageIdClient(
      appendToURLPath(messagesClient.url, messageId),
      messagesClient.pipeline
    );
  }

  /**
   * messageIdContext provided by protocol layer.
   *
   * @private
   * @type {MessageId}
   * @memberof MessageIdClient
   */
  private messageIdContext: MessageId;

  /**
   * Creates an instance of MessageIdClient.
   * @param {string} url A URL string pointing to Azure Storage queue's message, such as
   *                     "https://myaccount.queue.core.windows.net/myqueue/messages/messageid". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.queue.core.windows.net/myqueue/messages/messageid?sasString".
   * @param {Pipeline} pipeline Call StorageClient.newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof MessageIdClient
   */
  constructor(url: string, pipeline: Pipeline) {
    super(url, pipeline);
    this.messageIdContext = new MessageId(this.storageClientContext);
  }

  /**
   * Creates a new MessageIdClient object identical to the source but with the
   * specified request policy pipeline.
   *
   * @param {Pipeline} pipeline
   * @returns {MessageIdClient}
   * @memberof MessageIdClient
   */
  public withPipeline(pipeline: Pipeline): MessageIdClient {
    return new MessageIdClient(this.url, pipeline);
  }

  /**
   * Delete permanently removes the specified message from its queue.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-message2
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {string} popReceipt A valid pop receipt value returned from an earlier call to the dequeue messages or update message operation.
   * @returns {Promise<Models.MessageIdDeleteResponse>}
   * @memberof MessageIdClient
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
   * The message content is up to 64KB in size, and must be in a format that can be included in an XML request with UTF-8 encoding.
   * To include markup in the message, the contents of the message must either be XML-escaped or Base64-encode.
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
   * @memberof MessageIdClient
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
