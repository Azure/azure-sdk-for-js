// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as Models from "./generated/lib/models";
import { Aborter } from "./Aborter";
import { MessageId } from "./generated/lib/operations";
import { newPipeline, NewPipelineOptions, Pipeline } from "./Pipeline";
import { Credential } from "./credentials/Credential";
import { SharedKeyCredential } from "./credentials/SharedKeyCredential";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
import { StorageClient } from "./StorageClient";

/**
 * Options to configure MessageId - Delete operation
 *
 * @export
 * @interface MessageIdDeleteOptions
 */
export interface MessageIdDeleteOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: Aborter;
}

/**
 * Options to configure MessageId - Update operation
 *
 * @export
 * @interface MessageIdUpdateOptions
 */
export interface MessageIdUpdateOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: Aborter;
}

/**
 * A MessageIdClient represents a URL to a specific Azure Storage Queue message allowing you to manipulate the message.
 *
 * @export
 * @class MessageIdClient
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
   *
   * @param {string} connectionString Connection string for an Azure storage account.
   * @param {string} queueName Queue name.
   * @param {string} messageId Message Id.
   * @param {NewPipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof MessageIdClient
   */
  constructor(
    connectionString: string,
    queueName: string,
    messageId: string,
    options?: NewPipelineOptions
  );
  /**
   * Creates an instance of MessageIdClient.
   *
   * @param {string} url A URL string pointing to Azure Storage queue's message, such as
   *                     "https://myaccount.queue.core.windows.net/myqueue/messages/messageid". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.queue.core.windows.net/myqueue/messages/messageid?sasString".
   * @param {Credential} credential Such as AnonymousCredential, SharedKeyCredential or TokenCredential.
   *                                If not specified, anonymous credential is used.
   * @param {NewPipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof MessageIdClient
   */
  constructor(url: string, credential: Credential, options?: NewPipelineOptions);
  /**
   * Creates an instance of MessageIdClient.
   *
   * @param {string} url A URL string pointing to Azure Storage queue's message, such as
   *                     "https://myaccount.queue.core.windows.net/myqueue/messages/messageid". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.queue.core.windows.net/myqueue/messages/messageid?sasString".
   * @param {Pipeline} pipeline Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof MessageIdClient
   */
  constructor(url: string, pipeline: Pipeline);
  constructor(
    urlOrConnectionString: string,
    credentialOrPipelineOrQueueName?: Credential | Pipeline | string,
    messageIdOrOptions?: string | NewPipelineOptions,
    options: NewPipelineOptions = {}
  ) {
    let pipeline: Pipeline;
    if (credentialOrPipelineOrQueueName instanceof Pipeline) {
      pipeline = credentialOrPipelineOrQueueName;
    } else if (credentialOrPipelineOrQueueName instanceof Credential) {
      options = messageIdOrOptions as NewPipelineOptions;
      pipeline = newPipeline(credentialOrPipelineOrQueueName, options);
    } else if (
      !credentialOrPipelineOrQueueName &&
      typeof credentialOrPipelineOrQueueName !== "string"
    ) {
      options = messageIdOrOptions as NewPipelineOptions;
      // The second paramter is undefined. Use anonymous credential.
      pipeline = newPipeline(new AnonymousCredential(), options);
    } else if (
      credentialOrPipelineOrQueueName &&
      typeof credentialOrPipelineOrQueueName === "string" &&
      messageIdOrOptions &&
      typeof messageIdOrOptions === "string"
    ) {
      const queueName = credentialOrPipelineOrQueueName;
      const messageId = messageIdOrOptions;
      // TODO: extract parts from connection string
      const sharedKeyCredential = new SharedKeyCredential("name", "key");
      urlOrConnectionString = "endpoint from connection string" + queueName + "/" + messageId;
      pipeline = newPipeline(sharedKeyCredential, options);
    } else {
      throw new Error("Expecting non-empty strings for queueName and messageId parameters");
    }
    super(urlOrConnectionString, pipeline);
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
   * @param {string} message Message to update.
   * @param {number} visibilityTimeout Specifies the new visibility timeout value, in seconds,
   *                                   relative to server time. The new value must be larger than or equal to 0,
   *                                   and cannot be larger than 7 days. The visibility timeout of a message cannot
   *                                   be set to a value later than the expiry time.
   *                                   A message can be updated until it has been deleted or has expired.
   * @param {MessageIdUpdateOptions} [options] Optional options to MessageId Update operation.
   * @returns {Promise<Models.MessageIdUpdateResponse>}
   * @memberof MessageIdClient
   */
  public async update(
    popReceipt: string,
    message: string,
    visibilityTimeout?: number,
    options: MessageIdUpdateOptions = {}
  ): Promise<Models.MessageIdUpdateResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.messageIdContext.update(
      {
        messageText: message
      },
      popReceipt,
      visibilityTimeout || 0,
      {
        abortSignal: aborter
      }
    );
  }
}
