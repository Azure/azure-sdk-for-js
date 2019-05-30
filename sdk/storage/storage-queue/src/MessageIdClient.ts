// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as Models from "./generated/lib/models";
import { Aborter } from "./Aborter";
import { MessageId } from "./generated/lib/operations";
import { Pipeline } from "./Pipeline";
import { StorageClient } from "./StorageClient";

export interface MessageIdDeleteOptions {
  abortSignal?: Aborter;
}

export interface MessageIdUpdateOptions {
  abortSignal?: Aborter;
}

/**
 * A MessageIdClient represents a URL to a specific Azure Storage Queue message allowing you to manipulate the message.
 *
 * @export
 * @class MessageIdClient
 * @extends {StorageClient}
 */
export class MessageIdClient extends StorageClient {
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
   * Delete permanently removes the specified message from its queue.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-message2
   *
   * @param {string} popReceipt A valid pop receipt value returned from an earlier call to the dequeue messages or update message operation.
   * @param {MessageIdDeleteOptions} [options] Optional options to MessageId Delete operation.
   * @returns {Promise<Models.MessageIdDeleteResponse>}
   * @memberof MessageIdClient
   */
  public async delete(
    popReceipt: string,
    options: MessageIdDeleteOptions = {}
  ): Promise<Models.MessageIdDeleteResponse> {
    const aborter = options.abortSignal || Aborter.none;
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
   * @param {string} popReceipt A valid pop receipt value returned from an earlier call to the dequeue messages or update message operation.
   * @param {number} visibilityTimeout Specifies the new visibility timeout value, in seconds,
   *                                   relative to server time. The new value must be larger than or equal to 0,
   *                                   and cannot be larger than 7 days. The visibility timeout of a message cannot
   *                                   be set to a value later than the expiry time.
   *                                   A message can be updated until it has been deleted or has expired.
   * @param {string} message Message to update.
   * @param {MessageIdUpdateOptions} [options] Optional options to MessageId Update operation.
   * @returns {Promise<Models.MessageIdUpdateResponse>}
   * @memberof MessageIdClient
   */
  public async update(
    popReceipt: string,
    visibilityTimeout: number,
    message: string,
    options: MessageIdUpdateOptions = {}
  ): Promise<Models.MessageIdUpdateResponse> {
    const aborter = options.abortSignal || Aborter.none;
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
