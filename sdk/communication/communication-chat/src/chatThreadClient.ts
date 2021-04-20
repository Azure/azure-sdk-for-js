// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { logger } from "./models/logger";
import { SDK_VERSION } from "./constants";
import {
  CommunicationIdentifier,
  CommunicationTokenCredential,
  serializeCommunicationIdentifier
} from "@azure/communication-common";
import {
  InternalPipelineOptions,
  createPipelineFromOptions,
  operationOptionsToRequestOptionsBase
} from "@azure/core-http";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { SpanStatusCode } from "@azure/core-tracing";
import { createSpan } from "./tracing";
import {
  SendReadReceiptRequest,
  AddParticipantsRequest,
  SendMessageRequest
} from "./models/requests";

import {
  AddChatParticipantsResult,
  ChatMessage,
  ChatMessageReadReceipt,
  ChatParticipant,
  ChatThreadProperties,
  SendChatMessageResult,
  ListPageSettings
} from "./models/models";
import {
  mapToAddChatParticipantsRequestRestModel,
  mapToChatMessageSdkModel,
  mapToChatParticipantSdkModel,
  mapToChatThreadPropertiesSdkModel,
  mapToReadReceiptSdkModel
} from "./models/mappers";
import {
  ChatThreadClientOptions,
  SendMessageOptions,
  GetMessageOptions,
  DeleteMessageOptions,
  ListMessagesOptions,
  UpdateMessageOptions,
  UpdateTopicOptions,
  AddParticipantsOptions,
  ListParticipantsOptions,
  RemoveParticipantOptions,
  SendTypingNotificationOptions,
  SendReadReceiptOptions,
  ListReadReceiptsOptions,
  GetPropertiesOptions
} from "./models/options";
import { ChatApiClient } from "./generated/src";
import { createCommunicationTokenCredentialPolicy } from "./credential/communicationTokenCredentialPolicy";
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

  private timeOfLastTypingRequest: Date | undefined = undefined;

  constructor(
    private readonly endpoint: string,
    threadId: string,
    credential: CommunicationTokenCredential,
    options: ChatThreadClientOptions = {}
  ) {
    this.threadId = threadId;
    this.tokenCredential = credential;

    const libInfo = `azsdk-js-communication-chat/${SDK_VERSION}`;

    if (!options.userAgentOptions) {
      options.userAgentOptions = {};
    }

    const userAgentOptions = { ...options.userAgentOptions };
    if (options.userAgentOptions.userAgentPrefix) {
      userAgentOptions.userAgentPrefix = `${options.userAgentOptions.userAgentPrefix} ${libInfo}`;
    } else {
      userAgentOptions.userAgentPrefix = libInfo;
    }

    const internalPipelineOptions: InternalPipelineOptions = {
      ...{ ...options, userAgentOptions },
      ...{
        loggingOptions: {
          logger: logger.info
        }
      }
    };

    const authPolicy = createCommunicationTokenCredentialPolicy(this.tokenCredential);
    const pipeline = createPipelineFromOptions(internalPipelineOptions, authPolicy);

    this.client = new ChatApiClient(this.endpoint, pipeline);
  }

  /**
   * Gets a chat thread.
   * Returns the chat thread.
   * @param options -  Operation options.
   */
  public async getProperties(options: GetPropertiesOptions = {}): Promise<ChatThreadProperties> {
    const { span, updatedOptions } = createSpan("ChatClient-GetProperties", options);

    try {
      const { _response, ...result } = await this.client.chatThread.getChatThreadProperties(
        this.threadId,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return mapToChatThreadPropertiesSdkModel(result);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Updates a thread's topic.
   * @param topic - The topic needs to be updated to.
   * @param options - Operation options.
   */
  public async updateTopic(topic: string, options: UpdateTopicOptions = {}): Promise<void> {
    const { span, updatedOptions } = createSpan("ChatThreadClient-UpdateTopic", options);

    try {
      await this.client.chatThread.updateChatThreadProperties(
        this.threadId,
        { topic: topic },
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Sends a chat message to a thread identified by threadId.
   * Returns the id of the created message.
   * @param request - Request for sending a message.
   * @param options - Operation options.
   */
  public async sendMessage(
    request: SendMessageRequest,
    options: SendMessageOptions = {}
  ): Promise<SendChatMessageResult> {
    const { span, updatedOptions } = createSpan("ChatThreadClient-SendMessage", options);

    try {
      // reset typing notification clock
      this.timeOfLastTypingRequest = undefined;

      const { _response, ...result } = await this.client.chatThread.sendChatMessage(
        this.threadId,
        { ...request, ...options },
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return result;
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Gets a chat message identified by messageId.
   * Returns the specific message.
   * @param messageId - The message id of the message.
   * @param options - Operation options.
   */
  public async getMessage(
    messageId: string,
    options: GetMessageOptions = {}
  ): Promise<ChatMessage> {
    const { span, updatedOptions } = createSpan("ChatThreadClient-GetMessage", options);

    try {
      const { _response, ...result } = await this.client.chatThread.getChatMessage(
        this.threadId,
        messageId,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return mapToChatMessageSdkModel(result);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  private async *listMessagesPage(
    pageSettings: ListPageSettings,
    options: ListMessagesOptions = {}
  ): AsyncIterableIterator<ChatMessage[]> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    if (!pageSettings.continuationToken) {
      const currentSetResponse = await this.client.chatThread.listChatMessages(
        this.threadId,
        requestOptions
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
        requestOptions
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
    const { span, updatedOptions } = createSpan("ChatThreadClient-ListMessages", options);

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
        }
      };
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
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
  public async deleteMessage(messageId: string, options: DeleteMessageOptions = {}): Promise<void> {
    const { span, updatedOptions } = createSpan("ChatThreadClient-DeleteMessage", options);

    try {
      await this.client.chatThread.deleteChatMessage(
        this.threadId,
        messageId,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Updates a message identified by threadId and messageId
   * @param messageId - The message id of the message.
   * @param options - Operation options.
   */
  public async updateMessage(messageId: string, options: UpdateMessageOptions = {}): Promise<void> {
    const { span, updatedOptions } = createSpan("ChatThreadClient-UpdateMessage", options);

    try {
      await this.client.chatThread.updateChatMessage(
        this.threadId,
        messageId,
        options,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Adds the details of chat participants belonging to the thread identified by threadId.
   * @param request - Thread participants' details to add in the thread roster
   * @param options - Operation options.
   */
  public async addParticipants(
    request: AddParticipantsRequest,
    options: AddParticipantsOptions = {}
  ): Promise<AddChatParticipantsResult> {
    const { span, updatedOptions } = createSpan("ChatThreadClient-AddParticipants", options);

    try {
      const { _response, ...result } = await this.client.chatThread.addChatParticipants(
        this.threadId,
        mapToAddChatParticipantsRequestRestModel(request),
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return result;
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  private async *listParticipantsPage(
    continuationState: ListPageSettings,
    options: ListParticipantsOptions = {}
  ): AsyncIterableIterator<ChatParticipant[]> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    if (!continuationState.continuationToken) {
      const currentSetResponse = await this.client.chatThread.listChatParticipants(
        this.threadId,
        requestOptions
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
        requestOptions
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
    options: ListParticipantsOptions
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
    options: ListParticipantsOptions = {}
  ): PagedAsyncIterableIterator<ChatParticipant> {
    const { span, updatedOptions } = createSpan("ChatThreadClient-ListParticipants", options);

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
        }
      };
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
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
    options: RemoveParticipantOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan("ChatThreadClient-RemoveParticipant", options);

    try {
      await this.client.chatThread.removeChatParticipant(
        this.threadId,
        serializeCommunicationIdentifier(participant),
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Sends a typing notification to the thread.
   * Doesn't attempt to send if the time since last notification is smaller than the minimum typing interval
   * @param options - - Operation options
   * @returns True if the typing message notification could be sent, otherwise false.
   */
  public async sendTypingNotification(
    options: SendTypingNotificationOptions = {}
  ): Promise<boolean> {
    const { span, updatedOptions } = createSpan("ChatThreadClient-SendTypingNotification", options);

    try {
      const dateNow = new Date();
      if (this.canPostTypingNotification(dateNow)) {
        await this.client.chatThread.sendTypingNotification(
          this.threadId,
          operationOptionsToRequestOptionsBase(updatedOptions)
        );

        this.timeOfLastTypingRequest = dateNow;
        return true;
      }

      logger.info(`Typing Notification NOT Send. [thread_id=${this.threadId}]`);
      return false;
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Sends a read receipt to the thread identified by threadId.
   * @param messageId - The message id of the message that user latest read.
   * @param request - Request for sending a read receipt
   * @param options - Operation options.
   */
  public async sendReadReceipt(
    request: SendReadReceiptRequest,
    options: SendReadReceiptOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan("ChatThreadClient-SendReadReceipt", options);

    try {
      await this.client.chatThread.sendChatReadReceipt(
        this.threadId,
        request,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  private async *listReadReceiptsPage(
    continuationState: ListPageSettings,
    options: ListReadReceiptsOptions = {}
  ): AsyncIterableIterator<ChatMessageReadReceipt[]> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    if (!continuationState.continuationToken) {
      const currentSetResponse = await this.client.chatThread.listChatReadReceipts(
        this.threadId,
        requestOptions
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
        requestOptions
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
    options: ListReadReceiptsOptions
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
    options: ListReadReceiptsOptions = {}
  ): PagedAsyncIterableIterator<ChatMessageReadReceipt> {
    const { span, updatedOptions } = createSpan("ChatThreadClient-ListChatReadReceipts", options);

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
        }
      };
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
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
}
