// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />

import { logger } from "./models/logger";
import { EventEmitter } from "events";
import { SDK_VERSION } from "./constants";
import { CommunicationTokenCredential } from "@azure/communication-common";
import {
  SignalingClient,
  ChatEventId,
  ChatMessageReceivedEvent,
  ChatMessageEditedEvent,
  ChatMessageDeletedEvent,
  ReadReceiptReceivedEvent,
  TypingIndicatorReceivedEvent
} from "@azure/communication-signaling";
import { getSignalingClient } from "./signaling/signalingClient";
import { createCommunicationTokenCredentialPolicy } from "./credential/communicationTokenCredentialPolicy";
import { ChatApiClient } from "./generated/src/chatApiClient";
import {
  InternalPipelineOptions,
  createPipelineFromOptions,
  operationOptionsToRequestOptionsBase
} from "@azure/core-http";
import "@azure/core-paging";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { CanonicalCode } from "@opentelemetry/api";
import { createSpan } from "./tracing";
import { ChatThreadClient } from "./chatThreadClient";
import {
  ChatClientOptions,
  CreateChatThreadOptions,
  GetChatThreadOptions,
  ListChatThreadsOptions,
  DeleteChatThreadOptions
} from "./models/options";
import { GetChatThreadResponse, ListPageSettings, OperationResponse } from "./models/models";
import {
  mapToChatThreadSdkModel,
  attachHttpResponse,
  mapToChatThreadMemberRestModel
} from "./models/mappers";
import { ChatThreadInfo } from "./generated/src/models";
import { CreateChatThreadRequest } from "./models/requests";

export { ChatThreadInfo } from "./generated/src/models";

/**
 * The client to do chat operations
 */
export class ChatClient {
  private readonly tokenCredential: CommunicationTokenCredential;
  private readonly clientOptions: ChatClientOptions;
  private readonly api: ChatApiClient;
  private readonly signalingClient: SignalingClient | undefined = undefined;
  private readonly emitter = new EventEmitter();
  private isRealtimeNotificationsStarted: boolean = false;

  /**
   * Creates an instance of the ChatClient for a given resource and user.
   *
   * @param url The url of the Communication Services resouce.
   * @param credential The token credential. Use AzureCommunicationTokenCredential from @azure/communication-common to create a credential.
   * @param options Additional client options.
   */
  constructor(
    private readonly url: string,
    credential: CommunicationTokenCredential,
    options: ChatClientOptions = {}
  ) {
    this.tokenCredential = credential;
    this.clientOptions = { ...options };

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

    this.api = new ChatApiClient(this.url, pipeline);

    this.signalingClient = getSignalingClient(credential, logger);
  }

  /**
   * Returns ChatThreadClient with the specific thread id.
   * @param threadId Thread ID for the ChatThreadClient
   */
  public async getChatThreadClient(threadId: string): Promise<ChatThreadClient> {
    return new ChatThreadClient(threadId, this.url, this.tokenCredential, this.clientOptions);
  }

  /**
   * Creates a chat thread.
   * Returns thread client with the id of the created thread.
   * @param request Request for creating a chat thread.
   * @param options Operation options.
   */
  public async createChatThread(
    request: CreateChatThreadRequest,
    options: CreateChatThreadOptions = {}
  ): Promise<ChatThreadClient> {
    const { span, updatedOptions } = createSpan("ChatClient-CreateChatThread", options);

    try {
      const response = await this.api.createChatThread(
        {
          topic: request.topic,
          members: request.members?.map((member) => mapToChatThreadMemberRestModel(member))
        },
        operationOptionsToRequestOptionsBase(updatedOptions)
      );

      const multiStatusResponses = response.multipleStatus ?? [];
      const threadId = multiStatusResponses.find((r) => r.type === "Thread" && r.statusCode === 201)
        ?.id;
      if (threadId) {
        return this.getChatThreadClient(threadId);
      }

      throw new Error("Chat thread creation failed.");
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Gets a chat thread.
   * Returns the chat thread.
   * @param threadId The ID of the thread to get.
   * @param options  Operation options.
   */
  public async getChatThread(
    threadId: string,
    options: GetChatThreadOptions = {}
  ): Promise<GetChatThreadResponse> {
    const { span, updatedOptions } = createSpan("ChatClient-GetChatThread", options);

    try {
      const response = await this.api.getChatThread(
        threadId,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      const thread = mapToChatThreadSdkModel(response);
      return attachHttpResponse(thread, response._response);
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  private async *listChatThreadsPage(
    continuationState: ListPageSettings,
    options: ListChatThreadsOptions = {}
  ): AsyncIterableIterator<ChatThreadInfo[]> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    if (!continuationState.continuationToken) {
      const currentSetResponse = await this.api.listChatThreads(requestOptions);
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value;
      }
    }

    while (continuationState.continuationToken) {
      const currentSetResponse = await this.api.listChatThreadsNext(
        continuationState.continuationToken,
        requestOptions
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value;
      } else {
        break;
      }
    }
  }

  private async *listChatThreadsAll(
    options: ListChatThreadsOptions
  ): AsyncIterableIterator<ChatThreadInfo> {
    for await (const page of this.listChatThreadsPage({}, options)) {
      yield* page;
    }
  }

  /**
   * Gets the list of chat threads of a user.
   * @param options List chat threads options.
   */
  public listChatThreads(
    options: ListChatThreadsOptions = {}
  ): PagedAsyncIterableIterator<ChatThreadInfo> {
    const { span, updatedOptions } = createSpan("ChatClient-ListChatThreads", options);
    try {
      const iter = this.listChatThreadsAll(updatedOptions);
      return {
        next() {
          return iter.next();
        },
        [Symbol.asyncIterator]() {
          return this;
        },
        byPage: (settings: ListPageSettings = {}) => {
          return this.listChatThreadsPage(settings, updatedOptions);
        }
      };
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Deletes a chat thread.
   * @param threadId The ID of the thread to delete.
   * @param options  Operation options.
   */
  public async deleteChatThread(
    threadId: string,
    options: DeleteChatThreadOptions = {}
  ): Promise<OperationResponse> {
    const { span, updatedOptions } = createSpan("ChatClient-DeleteChatThread", options);

    try {
      return await this.api.deleteChatThread(
        threadId,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Start receiving realtime notifications.
   * Call this function before subscribing to any event.
   */
  public async startRealtimeNotifications(): Promise<void> {
    if (this.signalingClient === undefined) {
      throw new Error("Realtime notifications are only supported in the browser.");
    }

    if (this.isRealtimeNotificationsStarted) {
      return;
    }

    this.isRealtimeNotificationsStarted = true;
    this.signalingClient.start();
    this.subscribeToSignalingEvents();
  }

  /**
   * Stop receiving realtime notifications.
   * This function would unsubscribe to all events.
   */
  public async stopRealtimeNotifications(): Promise<void> {
    if (this.signalingClient === undefined) {
      throw new Error("Realtime notifications are only supported in the browser.");
    }

    this.isRealtimeNotificationsStarted = false;
    this.signalingClient.stop();
    this.emitter.removeAllListeners();
  }

  /**
   * Subscribe function for chatMessageReceived.
   * The initial sender will also receive this event.
   * You need to call startRealtimeNotifications before subscribing to any event.
   * @param event The ChatMessageReceivedEvent.
   * @param listener The listener to handle the event.
   */
  public on(event: "chatMessageReceived", listener: (e: ChatMessageReceivedEvent) => void): void;

  /**
   * Subscribe function for chatMessageEdited.
   * The initial sender will also receive this event.
   * @param event The ChatMessageEditedEvent.
   * @param listener The listener to handle the event.
   */
  public on(event: "chatMessageEdited", listener: (e: ChatMessageEditedEvent) => void): void;

  /**
   * Subscribe function for chatMessageDeleted.
   * The initial sender will also receive this event.
   * @param event The ChatMessageDeletedEvent.
   * @param listener The listener to handle the event.
   */
  public on(event: "chatMessageDeleted", listener: (e: ChatMessageDeletedEvent) => void): void;

  /**
   * Subscribe function for typingIndicatorReceived.
   * The initial sender will also receive this event.
   * @param event The TypingIndicatorReceivedEvent.
   * @param listener The listener to handle the event.
   */
  public on(
    event: "typingIndicatorReceived",
    listener: (e: TypingIndicatorReceivedEvent) => void
  ): void;

  /**
   * Subscribe function for readReceiptReceived.
   * @param event The ReadReceiptReceivedEvent.
   * @param listener The listener to handle the event.
   */
  public on(event: "readReceiptReceived", listener: (e: ReadReceiptReceivedEvent) => void): void;

  public on(event: ChatEventId, listener: (e: any) => void): void {
    if (this.signalingClient === undefined) {
      throw new Error("Realtime notifications are only supported in the browser.");
    }

    if (!this.isRealtimeNotificationsStarted) {
      throw new Error(
        "You must call startRealtimeNotifications before you can subscribe to events."
      );
    }

    this.emitter.on(event, listener);
  }

  /**
   * Unsubscribe from chatMessageReceived.
   * @param event The ChatMessageReceivedEvent.
   * @param listener The listener to handle the event.
   */
  public off(event: "chatMessageReceived", listener: (e: ChatMessageReceivedEvent) => void): void;

  /**
   * Unsubscribe from chatMessageEdited.
   * @param event The ChatMessageEditedEvent.
   * @param listener The listener to handle the event.
   */
  public off(event: "chatMessageEdited", listener: (e: ChatMessageEditedEvent) => void): void;

  /**
   * Unsubscribe from chatMessageDeleted.
   * @param event The ChatMessageDeletedEvent.
   * @param listener The listener to handle the event.
   */
  public off(event: "chatMessageDeleted", listener: (e: ChatMessageDeletedEvent) => void): void;

  /**
   * Unsubscribe from typingIndicatorReceived.
   * @param event The TypingIndicatorReceivedEvent.
   * @param listener The listener to handle the event.
   */
  public off(
    event: "typingIndicatorReceived",
    listener: (e: TypingIndicatorReceivedEvent) => void
  ): void;

  /**
   * Unsubscribe from readReceiptReceived.
   * @param event The ReadReceiptReceivedEvent.
   * @param listener The listener to handle the event.
   */
  public off(event: "readReceiptReceived", listener: (e: ReadReceiptReceivedEvent) => void): void;

  public off(event: ChatEventId, listener: (e: any) => void): void {
    if (this.signalingClient === undefined) {
      throw new Error("Realtime notifications are only supported in the browser.");
    }

    this.emitter.removeListener(event, listener);
  }

  private subscribeToSignalingEvents(): void {
    if (this.signalingClient === undefined) {
      throw new Error("Realtime notifications are only supported in the browser.");
    }

    this.signalingClient.on("chatMessageReceived", (payload) => {
      this.emitter.emit("chatMessageReceived", payload);
    });

    this.signalingClient.on("chatMessageEdited", (payload) => {
      this.emitter.emit("chatMessageEdited", payload);
    });

    this.signalingClient.on("chatMessageDeleted", (payload) => {
      this.emitter.emit("chatMessageDeleted", payload);
    });

    this.signalingClient.on("typingIndicatorReceived", (payload) => {
      this.emitter.emit("typingIndicatorReceived", payload);
    });

    this.signalingClient.on("readReceiptReceived", (payload) => {
      this.emitter.emit("readReceiptReceived", payload);
    });
  }
}
