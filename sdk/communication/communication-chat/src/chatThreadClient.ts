// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { logger } from "./models/logger";
import {
  CommunicationIdentifier,
  CommunicationTokenCredential,
  serializeCommunicationIdentifier,
} from "@azure/communication-common";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  AddParticipantsRequest,
  SendMessageRequest,
  SendReadReceiptRequest,
} from "./models/requests";

import {
  AddChatParticipantsResult,
  ChatMessage,
  ChatMessageReadReceipt,
  ChatParticipant,
  ChatThreadProperties,
  ListPageSettings,
  SendChatMessageResult,
  UploadChatImageResult,
} from "./models/models";
import {
  mapToAddChatParticipantsRequestRestModel,
  mapToChatMessageSdkModel,
  mapToChatParticipantSdkModel,
  mapToChatThreadPropertiesSdkModel,
  mapToReadReceiptSdkModel,
  mapToSendChatMessageRequestRestModel,
  mapToUpdateChatMessageRequestRestModel,
} from "./models/mappers";
import {
  AddParticipantsOptions,
  ChatThreadClientOptions,
  DeleteMessageOptions,
  GetMessageOptions,
  GetPropertiesOptions,
  ListMessagesOptions,
  ListParticipantsOptions,
  ListReadReceiptsOptions,
  RemoveParticipantOptions,
  SendMessageOptions,
  SendReadReceiptOptions,
  SendTypingNotificationOptions,
  UpdateMessageOptions,
  UpdateTopicOptions,
  UpdateChatThreadPropertiesOptions,
  DeleteImageOptions,
  UploadImageOptions,
  UploadImageStreamOptions,
} from "./models/options";
import {
  ChatApiClient,
  ChatThreadGetChatThreadPropertiesOptionalParams,
  ChatThreadUpdateChatThreadPropertiesOptionalParams,
  ChatThreadSendChatMessageOptionalParams,
  ChatThreadGetChatMessageOptionalParams,
  ChatThreadDeleteChatMessageOptionalParams,
  ChatThreadUpdateChatMessageOptionalParams,
  ChatThreadAddChatParticipantsOptionalParams,
  ChatThreadRemoveChatParticipantOptionalParams,
  ChatThreadSendChatReadReceiptOptionalParams,
  ChatThreadUploadChatImageOptionalParams,
  ChatThreadDeleteChatImageOptionalParams,
} from "./generated/src";
import { InternalPipelineOptions } from "@azure/core-rest-pipeline";
import { createXhrHttpClient, isReadableStream, isBlob } from "./xhrHttpClient";
import { createCommunicationTokenCredentialPolicy } from "./credential/communicationTokenCredentialPolicy";
import { tracingClient } from "./generated/src/tracing";

const minimumTypingIntervalInMilliSeconds: number = 8000;

/**
 * The client to do chat operations
 */
export class ChatThreadClient {
  /**
   * Thread ID of the ChatThreadClient
   */
  readonly threadId: string;

  private readonly tokenCredential: CommunicationTokenCredential;
  private readonly client: ChatApiClient;
  private readonly xhrClient?: ChatApiClient;

  private timeOfLastTypingRequest: Date | undefined = undefined;

  constructor(
    private readonly endpoint: string,
    threadId: string,
    credential: CommunicationTokenCredential,
    options: ChatThreadClientOptions = {},
  ) {
    this.threadId = threadId;
    this.tokenCredential = credential;

    const internalPipelineOptions: InternalPipelineOptions = {
      ...options,
      ...{
        loggingOptions: {
          logger: logger.info,
        },
      },
    };

    this.client = new ChatApiClient(this.endpoint, {
      endpoint: this.endpoint,
      ...internalPipelineOptions,
    });

    const authPolicy = createCommunicationTokenCredentialPolicy(this.tokenCredential);
    this.client.pipeline.addPolicy(authPolicy);

    if (typeof XMLHttpRequest !== "undefined") {
      this.xhrClient = new ChatApiClient(this.endpoint, {
        endpoint: this.endpoint,
        ...internalPipelineOptions,
        httpClient: createXhrHttpClient(),
      });
      this.xhrClient.pipeline.addPolicy(authPolicy);
    }
  }

  /**
   * Gets a chat thread.
   * Returns the chat thread.
   * @param options -  Operation options.
   */
  public getProperties(options: GetPropertiesOptions = {}): Promise<ChatThreadProperties> {
    return tracingClient.withSpan(
      "ChatClient-GetProperties",
      options,
      async (updatedOptions: ChatThreadGetChatThreadPropertiesOptionalParams | undefined) => {
        const result = await this.client.chatThread.getChatThreadProperties(
          this.threadId,
          updatedOptions,
        );
        return mapToChatThreadPropertiesSdkModel(result);
      },
    );
  }

  /**
   * Updates a thread's topic.
   * @param topic - The topic needs to be updated to.
   * @param options - Operation options.
   */
  public updateTopic(topic: string, options: UpdateTopicOptions = {}): Promise<void> {
    return tracingClient.withSpan(
      "ChatThreadClient-UpdateTopic",
      options,
      async (updatedOptions: ChatThreadUpdateChatThreadPropertiesOptionalParams | undefined) => {
        await this.client.chatThread.updateChatThreadProperties(
          this.threadId,
          { topic: topic },
          updatedOptions,
        );
      },
    );
  }

  /**
   * Updates a thread's properties.
   * @param options - Operation options.
   */
  public updateProperties(options: UpdateChatThreadPropertiesOptions = {}): Promise<void> {
    return tracingClient.withSpan(
      "ChatThreadClient-UpdateProperties",
      options,
      async (updatedOptions: ChatThreadUpdateChatThreadPropertiesOptionalParams | undefined) => {
        await this.client.chatThread.updateChatThreadProperties(
          this.threadId,
          options,
          updatedOptions,
        );
      },
    );
  }

  /**
   * Sends a chat message to a thread identified by threadId.
   * Returns the id of the created message.
   * @param request - Request for sending a message.
   * @param options - Operation options.
   */
  public sendMessage(
    request: SendMessageRequest,
    options: SendMessageOptions = {},
  ): Promise<SendChatMessageResult> {
    return tracingClient.withSpan(
      "ChatThreadClient-SendMessage",
      options,
      async (updatedOptions: ChatThreadSendChatMessageOptionalParams | undefined) => {
        // reset typing notification clock
        this.timeOfLastTypingRequest = undefined;

        const result = await this.client.chatThread.sendChatMessage(
          this.threadId,
          mapToSendChatMessageRequestRestModel(request, options),
          updatedOptions,
        );
        return result;
      },
    );
  }

  /**
   * Gets a chat message identified by messageId.
   * Returns the specific message.
   * @param messageId - The message id of the message.
   * @param options - Operation options.
   */
  public getMessage(messageId: string, options: GetMessageOptions = {}): Promise<ChatMessage> {
    return tracingClient.withSpan(
      "ChatThreadClient-GetMessage",
      options,
      async (updatedOptions: ChatThreadGetChatMessageOptionalParams | undefined) => {
        const result = await this.client.chatThread.getChatMessage(
          this.threadId,
          messageId,
          updatedOptions,
        );
        return mapToChatMessageSdkModel(result);
      },
    );
  }

  private async *listMessagesPage(
    pageSettings: ListPageSettings,
    options: ListMessagesOptions = {},
  ): AsyncIterableIterator<ChatMessage[]> {
    if (!pageSettings.continuationToken) {
      const currentSetResponse = await this.client.chatThread.listChatMessages(
        this.threadId,
        options,
      );
      pageSettings.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(mapToChatMessageSdkModel, this);
      }
    }

    while (pageSettings.continuationToken) {
      const currentSetResponse = await this.client.chatThread.listChatMessagesNext(
        this.threadId,
        pageSettings.continuationToken,
        options,
      );
      pageSettings.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(mapToChatMessageSdkModel, this);
      } else {
        break;
      }
    }
  }

  private async *listMessagesAll(options: ListMessagesOptions): AsyncIterableIterator<ChatMessage> {
    for await (const page of this.listMessagesPage({}, options)) {
      yield* page;
    }
  }

  /**
   * Gets a list of message from a thread identified by threadId.
   * Returns the list of the messages.
   * @param options - Get messages options.
   */
  public listMessages(options: ListMessagesOptions = {}): PagedAsyncIterableIterator<ChatMessage> {
    const { span, updatedOptions } = tracingClient.startSpan(
      "ChatThreadClient-ListMessages",
      options,
    );

    try {
      const iter = this.listMessagesAll(updatedOptions);
      return {
        next() {
          return iter.next();
        },
        [Symbol.asyncIterator]() {
          return this;
        },
        byPage: (settings: ListPageSettings = {}) => {
          return this.listMessagesPage(settings, updatedOptions);
        },
      };
    } catch (e: any) {
      span.setStatus({
        status: "error",
        error: e,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Deletes a message identified by threadId and messageId
   * @param messageId - The message id of the message.
   * @param options - Operation options.
   */
  public deleteMessage(messageId: string, options: DeleteMessageOptions = {}): Promise<void> {
    return tracingClient.withSpan(
      "ChatThreadClient-DeleteMessage",
      options,
      async (updatedOptions: ChatThreadDeleteChatMessageOptionalParams | undefined) => {
        await this.client.chatThread.deleteChatMessage(this.threadId, messageId, updatedOptions);
      },
    );
  }

  /**
   * Updates a message identified by threadId and messageId
   * @param messageId - The message id of the message.
   * @param options - Operation options.
   */
  public async updateMessage(messageId: string, options: UpdateMessageOptions = {}): Promise<void> {
    return tracingClient.withSpan(
      "ChatThreadClient-UpdateMessage",
      options,
      async (updatedOptions: ChatThreadUpdateChatMessageOptionalParams | undefined) => {
        await this.client.chatThread.updateChatMessage(
          this.threadId,
          messageId,
          mapToUpdateChatMessageRequestRestModel(options),
          updatedOptions,
        );
      },
    );
  }

  /**
   * Adds the details of chat participants belonging to the thread identified by threadId.
   * @param request - Thread participants' details to add in the thread roster
   * @param options - Operation options.
   */
  public async addParticipants(
    request: AddParticipantsRequest,
    options: AddParticipantsOptions = {},
  ): Promise<AddChatParticipantsResult> {
    return tracingClient.withSpan(
      "ChatThreadClient-AddParticipants",
      options,
      async (updatedOptions: ChatThreadAddChatParticipantsOptionalParams | undefined) => {
        const result = await this.client.chatThread.addChatParticipants(
          this.threadId,
          mapToAddChatParticipantsRequestRestModel(request),
          updatedOptions,
        );
        return result;
      },
    );
  }

  private async *listParticipantsPage(
    continuationState: ListPageSettings,
    options: ListParticipantsOptions = {},
  ): AsyncIterableIterator<ChatParticipant[]> {
    if (!continuationState.continuationToken) {
      const currentSetResponse = await this.client.chatThread.listChatParticipants(
        this.threadId,
        options,
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(mapToChatParticipantSdkModel, this);
      }
    }

    while (continuationState.continuationToken) {
      const currentSetResponse = await this.client.chatThread.listChatParticipantsNext(
        this.threadId,
        continuationState.continuationToken,
        options,
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(mapToChatParticipantSdkModel, this);
      } else {
        break;
      }
    }
  }

  private async *listParticipantsAll(
    options: ListParticipantsOptions,
  ): AsyncIterableIterator<ChatParticipant> {
    for await (const page of this.listParticipantsPage({}, options)) {
      yield* page;
    }
  }

  /**
   * Gets the participants of the thread identified by threadId.
   * Returns the lists of the participants.
   * @param options - Operation options.
   */
  public listParticipants(
    options: ListParticipantsOptions = {},
  ): PagedAsyncIterableIterator<ChatParticipant> {
    const { span, updatedOptions } = tracingClient.startSpan(
      "ChatThreadClient-ListParticipants",
      options,
    );

    try {
      const iter = this.listParticipantsAll(updatedOptions);
      return {
        next() {
          return iter.next();
        },
        [Symbol.asyncIterator]() {
          return this;
        },
        byPage: (settings: ListPageSettings = {}) => {
          return this.listParticipantsPage(settings, updatedOptions);
        },
      };
    } catch (e: any) {
      span.setStatus({
        status: "error",
        error: e,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Removes participant from the thread identified by threadId.
   * @param participant - Thread participant to remove from the thread roster
   * @param options - Operation options.
   */
  public async removeParticipant(
    participant: CommunicationIdentifier,
    options: RemoveParticipantOptions = {},
  ): Promise<void> {
    return tracingClient.withSpan(
      "ChatThreadClient-RemoveParticipant",
      options,
      async (updatedOptions: ChatThreadRemoveChatParticipantOptionalParams | undefined) => {
        await this.client.chatThread.removeChatParticipant(
          this.threadId,
          serializeCommunicationIdentifier(participant),
          updatedOptions,
        );
      },
    );
  }

  /**
   * Sends a typing notification to the thread.
   * Doesn't attempt to send if the time since last notification is smaller than the minimum typing interval
   * @param options - - Operation options
   * @returns True if the typing message notification could be sent, otherwise false.
   */
  public async sendTypingNotification(
    options: SendTypingNotificationOptions = {},
  ): Promise<boolean> {
    return tracingClient.withSpan(
      "ChatThreadClient-SendTypingNotification",
      options,
      async (updatedOptions: SendTypingNotificationOptions) => {
        const dateNow = new Date();
        const { senderDisplayName, ...restOptions } = updatedOptions;

        if (this.canPostTypingNotification(dateNow)) {
          this.timeOfLastTypingRequest = dateNow;

          await this.client.chatThread.sendTypingNotification(this.threadId, {
            sendTypingNotificationRequest: { senderDisplayName: senderDisplayName },
            ...restOptions,
          });
          return true;
        }

        logger.info(`Typing Notification NOT Send. [thread_id=${this.threadId}]`);
        return false;
      },
    );
  }

  /**
   * Sends a read receipt to the thread identified by threadId.
   * @param request - Request for sending a read receipt
   * @param options - Operation options.
   */
  public async sendReadReceipt(
    request: SendReadReceiptRequest,
    options: SendReadReceiptOptions = {},
  ): Promise<void> {
    return tracingClient.withSpan(
      "ChatThreadClient-SendReadReceipt",
      options,
      async (updatedOptions: ChatThreadSendChatReadReceiptOptionalParams | undefined) => {
        await this.client.chatThread.sendChatReadReceipt(this.threadId, request, updatedOptions);
      },
    );
  }

  private async *listReadReceiptsPage(
    continuationState: ListPageSettings,
    options: ListReadReceiptsOptions = {},
  ): AsyncIterableIterator<ChatMessageReadReceipt[]> {
    if (!continuationState.continuationToken) {
      const currentSetResponse = await this.client.chatThread.listChatReadReceipts(
        this.threadId,
        options,
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(mapToReadReceiptSdkModel, this);
      }
    }

    while (continuationState.continuationToken) {
      const currentSetResponse = await this.client.chatThread.listChatReadReceiptsNext(
        this.threadId,
        continuationState.continuationToken,
        options,
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value.map(mapToReadReceiptSdkModel, this);
      } else {
        break;
      }
    }
  }

  private async *listReadReceiptsAll(
    options: ListReadReceiptsOptions,
  ): AsyncIterableIterator<ChatMessageReadReceipt> {
    for await (const page of this.listReadReceiptsPage({}, options)) {
      yield* page;
    }
  }

  /**
   * Gets a list of read receipt from a thread identified by threadId.
   * Returns the list of the messages.
   * @param options - Get messages options.
   */
  public listReadReceipts(
    options: ListReadReceiptsOptions = {},
  ): PagedAsyncIterableIterator<ChatMessageReadReceipt> {
    const { span, updatedOptions } = tracingClient.startSpan(
      "ChatThreadClient-ListChatReadReceipts",
      options,
    );

    try {
      const iter = this.listReadReceiptsAll(updatedOptions);
      return {
        next() {
          return iter.next();
        },
        [Symbol.asyncIterator]() {
          return this;
        },
        byPage: (settings: ListPageSettings = {}) => {
          return this.listReadReceiptsPage(settings, updatedOptions);
        },
      };
    } catch (e: any) {
      span.setStatus({
        status: "error",
        error: e,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  private canPostTypingNotification(dateNow: Date): boolean {
    if (this.timeOfLastTypingRequest) {
      const timeSinceLastRequestInMilliSeconds =
        dateNow.getTime() - this.timeOfLastTypingRequest.getTime();

      if (timeSinceLastRequestInMilliSeconds < minimumTypingIntervalInMilliSeconds) {
        logger.info(`Typing interval check failed. [last_request=${this.timeOfLastTypingRequest}]`);
        return false;
      }
    }

    return true;
  }

  /**
   * Uploads an chat image to a thread identified by threadId.
   * Allowed image types "jpg", "png", "gif", "heic", "webp".
   * Returns the id of the uploaded image.
   * @param image - Request for uploading an image.
   * @param imageFilename - The image's file name with file extension.
   * @param options - Operation options.
   */
  public async uploadImage(
    image: ArrayBuffer | Blob,
    imageFilename: string,
    options?: UploadImageOptions,
  ): Promise<UploadChatImageResult>;

  /**
   * Uploads an chat image stream to a thread identified by threadId.
   * Allowed image types "jpg", "png", "gif", "heic", "webp".
   * Returns the id of the uploaded image.
   * @param image - Request for uploading an image.
   * @param imageFileName - The image's file name with file extension.
   * @param imageBytesLength - The image's file length in bytes.
   * @param options - Operation options.
   */
  public async uploadImage(
    image: ReadableStream<Uint8Array> | NodeJS.ReadableStream,
    imageFileName: string,
    imageBytesLength: number,
    // eslint-disable-next-line
    options?: UploadImageStreamOptions,
  ): Promise<UploadChatImageResult>;

  async uploadImage(
    image: ArrayBuffer | Blob | ReadableStream<Uint8Array> | NodeJS.ReadableStream,
    imageFilename: string,
    imageBytesLengthOrOptions?: number | UploadImageOptions,
    options: UploadImageStreamOptions = {},
  ): Promise<UploadChatImageResult> {
    let uploadImageOptions = {};
    if (imageBytesLengthOrOptions !== undefined) {
      if (typeof imageBytesLengthOrOptions === "number") {
        uploadImageOptions = { ...options, imageBytesLength: imageBytesLengthOrOptions };
      } else {
        uploadImageOptions = { ...options, ...imageBytesLengthOrOptions };
      }
    }

    return tracingClient.withSpan(
      "ChatThreadClient-UploadImage",
      uploadImageOptions,
      async (updatedOptions: ChatThreadUploadChatImageOptionalParams | undefined) => {
        let result: UploadChatImageResult;
        if (
          this.xhrClient && // is browser
          ((!this.supportsReadableStream() && isReadableStream(image)) || // is readable stream but no support, need to convert
            !isReadableStream(image))
        ) {
          // use xhrClient if (to support onUploadProgress)
          // - is readable stream but no support => convert to ArrayBuffer (so will have content-length)
          // - is not readable stream
          result = await this.xhrClient.chatThread.uploadChatImage(
            this.threadId,
            isReadableStream(image) ? await this.getArrayBufferFromReadableStream(image) : image,
            { imageFilename, ...updatedOptions },
          );
        } else {
          // backend (node fetch client) or readable readable stream
          // Backend (no browser) need to convert Blob/ReadableStream to ArrayBuffer
          let chatImageFile = image;
          if (isBlob(image)) {
            chatImageFile = await this.getArrayBufferFromBlob(image);
          } else if (isReadableStream(image)) {
            chatImageFile = await this.getArrayBufferFromReadableStream(image);
          }
          result = await this.client.chatThread.uploadChatImage(this.threadId, chatImageFile, {
            imageFilename,
            ...updatedOptions,
          });
        }
        return result;
      },
    );
  }

  /**
   * Deletes an image identified by threadId and imageId
   * @param imageId - The image id of the image.
   * @param options - Operation options.
   */
  public deleteImage(imageId: string, options: DeleteImageOptions = {}): Promise<void> {
    return tracingClient.withSpan(
      "ChatThreadClient-DeleteImage",
      options,
      async (updatedOptions: ChatThreadDeleteChatImageOptionalParams | undefined) => {
        await this.client.chatThread.deleteChatImage(this.threadId, imageId, updatedOptions);
      },
    );
  }

  private supportsReadableStream(): boolean {
    let duplexAccessed = false;
    const hasContentType = new Request("", {
      body: new ReadableStream(),
      method: "POST",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      get duplex() {
        duplexAccessed = true;
        return "half";
      },
    }).headers.has("Content-Type");
    return duplexAccessed && !hasContentType;
  }

  private async getArrayBufferFromReadableStream(
    body: ReadableStream<Uint8Array>,
  ): Promise<ArrayBuffer> {
    const arrayBuffer = await new Response(body).arrayBuffer();
    return new Uint8Array(arrayBuffer);
  }

  private async getArrayBufferFromBlob(body: Blob): Promise<ArrayBuffer> {
    return new Uint8Array(await body.arrayBuffer());
  }
}
