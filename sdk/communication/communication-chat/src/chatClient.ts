// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />

import {
  ChatClientOptions,
  CreateChatThreadOptions,
  DeleteChatThreadOptions,
  ListChatThreadsOptions,
} from "./models/options";
import {
  ChatEventId,
  ChatMessageDeletedEvent,
  ChatMessageEditedEvent,
  ChatMessageReceivedEvent,
  ChatThreadCreatedEvent,
  ChatThreadDeletedEvent,
  ChatThreadPropertiesUpdatedEvent,
  ParticipantsAddedEvent,
  ParticipantsRemovedEvent,
  ReadReceiptReceivedEvent,
  TypingIndicatorReceivedEvent,
} from "./models/events";
import { ChatThreadItem, CreateChatThreadResult, ListPageSettings } from "./models/models";
import { ConnectionState, SignalingClient } from "@azure/communication-signaling";
import {
  mapToChatParticipantRestModel,
  mapToCreateChatThreadOptionsRestModel,
  mapToCreateChatThreadResultSdkModel,
} from "./models/mappers";

import { ChatApiClient } from "./generated/src";
import { ChatThreadClient } from "./chatThreadClient";
import { CommunicationTokenCredential } from "@azure/communication-common";
import { CreateChatThreadRequest } from "./models/requests";
import { EventEmitter } from "events";
import { InternalPipelineOptions } from "@azure/core-rest-pipeline";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { createCommunicationTokenCredentialPolicy } from "./credential/communicationTokenCredentialPolicy";
import { generateUuid } from "./models/uuid";
import { getSignalingClient } from "./signaling/signalingClient";
import { logger } from "./models/logger";
import { tracingClient } from "./generated/src/tracing";

/**
 * The client to do chat operations
 */
export class ChatClient {
  private readonly tokenCredential: CommunicationTokenCredential;
  private readonly clientOptions: ChatClientOptions;
  private readonly client: ChatApiClient;
  private readonly signalingClient: SignalingClient | undefined = undefined;
  private readonly emitter = new EventEmitter();
  private isRealtimeNotificationsStarted: boolean = false;

  /**
   * Creates an instance of the ChatClient for a given resource and user.
   *
   * @param endpoint - The url of the Communication Services resource.
   * @param credential - The token credential. Use AzureCommunicationTokenCredential from \@azure/communication-common to create a credential.
   * @param options - Additional client options.
   */
  constructor(
    private readonly endpoint: string,
    credential: CommunicationTokenCredential,
    options: ChatClientOptions = {}
  ) {
    this.tokenCredential = credential;
    this.clientOptions = { ...options };

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

    (options as any).signalingClientOptions = {
      ...(options as any).signalingClientOptions,
      resourceEndpoint: this.endpoint,
    };

    this.signalingClient = getSignalingClient(
      credential,
      logger,
      (options as any).signalingClientOptions
    );
  }

  /**
   * Returns ChatThreadClient with the specific thread id.
   * @param threadId - Thread ID for the ChatThreadClient
   */
  public getChatThreadClient(threadId: string): ChatThreadClient {
    return new ChatThreadClient(this.endpoint, threadId, this.tokenCredential, this.clientOptions);
  }

  /**
   * Creates a chat thread.
   * Returns thread client with the id of the created thread.
   * @param request - Request for creating a chat thread.
   * @param options - Operation options.
   */
  public async createChatThread(
    request: CreateChatThreadRequest,
    options: CreateChatThreadOptions = {}
  ): Promise<CreateChatThreadResult> {
    return tracingClient.withSpan(
      "ChatClient-CreateChatThread",
      options,
      async (updatedOptions) => {
        // We generate an UUID if the user does not provide an idempotencyToken value
        updatedOptions.idempotencyToken = updatedOptions.idempotencyToken ?? generateUuid();
        const updatedRestModelOptions = mapToCreateChatThreadOptionsRestModel(updatedOptions);

        const result = await this.client.chat.createChatThread(
          {
            topic: request.topic,
            participants: options.participants?.map((participant) =>
              mapToChatParticipantRestModel(participant)
            ),
          },
          updatedRestModelOptions
        );
        return mapToCreateChatThreadResultSdkModel(result);
      }
    );
  }

  private async *listChatThreadsPage(
    continuationState: ListPageSettings,
    options: ListChatThreadsOptions = {}
  ): AsyncIterableIterator<ChatThreadItem[]> {
    if (!continuationState.continuationToken) {
      const currentSetResponse = await this.client.chat.listChatThreads(options);
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value;
      }
    }

    while (continuationState.continuationToken) {
      const currentSetResponse = await this.client.chat.listChatThreadsNext(
        continuationState.continuationToken,
        options
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
  ): AsyncIterableIterator<ChatThreadItem> {
    for await (const page of this.listChatThreadsPage({}, options)) {
      yield* page;
    }
  }

  /**
   * Gets the list of chat threads of a user.
   * @param options - List chat threads options.
   */
  public listChatThreads(
    options: ListChatThreadsOptions = {}
  ): PagedAsyncIterableIterator<ChatThreadItem> {
    const { span, updatedOptions } = tracingClient.startSpan("ChatClient-ListChatThreads", options);
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
        },
      };
    } catch (e: any) {
      span.setStatus({
        error: e,
        status: "error",
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Deletes a chat thread.
   * @param threadId - The ID of the thread to delete.
   * @param options -  Operation options.
   */
  public async deleteChatThread(
    threadId: string,
    options: DeleteChatThreadOptions = {}
  ): Promise<void> {
    return tracingClient.withSpan(
      "ChatClient-DeleteChatThread",
      options,
      async (updatedOptions) => {
        await this.client.chat.deleteChatThread(threadId, updatedOptions);
      }
    );
  }

  /**
   * Start receiving realtime notifications.
   * Call this function before subscribing to any event.
   */
  public async startRealtimeNotifications(): Promise<void> {
    if (this.signalingClient === undefined) {
      throw new Error("Realtime notifications are not supported in node js.");
    }

    if (this.isRealtimeNotificationsStarted) {
      return;
    }

    this.isRealtimeNotificationsStarted = true;
    await this.signalingClient.start();
    this.subscribeToSignalingEvents();
  }

  /**
   * Stop receiving realtime notifications.
   * This function would unsubscribe to all events.
   */
  public async stopRealtimeNotifications(): Promise<void> {
    if (this.signalingClient === undefined) {
      throw new Error("Realtime notifications are not supported in node js.");
    }

    this.isRealtimeNotificationsStarted = false;
    await this.signalingClient.stop();
    this.emitter.removeAllListeners();
  }

  /**
   * Subscribe function for chatMessageReceived.
   * The initial sender will also receive this event.
   * You need to call startRealtimeNotifications before subscribing to any event.
   * @param event - The ChatMessageReceivedEvent.
   * @param listener - The listener to handle the event.
   */
  public on(event: "chatMessageReceived", listener: (e: ChatMessageReceivedEvent) => void): void;

  /**
   * Subscribe function for chatMessageEdited.
   * The initial sender will also receive this event.
   * @param event - The ChatMessageEditedEvent.
   * @param listener - The listener to handle the event.
   */
  public on(event: "chatMessageEdited", listener: (e: ChatMessageEditedEvent) => void): void;

  /**
   * Subscribe function for chatMessageDeleted.
   * The initial sender will also receive this event.
   * @param event - The ChatMessageDeletedEvent.
   * @param listener - The listener to handle the event.
   */
  public on(event: "chatMessageDeleted", listener: (e: ChatMessageDeletedEvent) => void): void;

  /**
   * Subscribe function for typingIndicatorReceived.
   * The initial sender will also receive this event.
   * @param event - The TypingIndicatorReceivedEvent.
   * @param listener - The listener to handle the event.
   */
  public on(
    event: "typingIndicatorReceived",
    listener: (e: TypingIndicatorReceivedEvent) => void
  ): void;

  /**
   * Subscribe function for readReceiptReceived.
   * @param event - The ReadReceiptReceivedEvent.
   * @param listener - The listener to handle the event.
   */
  public on(event: "readReceiptReceived", listener: (e: ReadReceiptReceivedEvent) => void): void;

  /**
   * Subscribe function for chatThreadCreated.
   * @param event - The ChatThreadCreatedEvent.
   * @param listener - The listener to handle the event.
   */
  public on(event: "chatThreadCreated", listener: (e: ChatThreadCreatedEvent) => void): void;

  /**
   * Subscribe function for chatThreadDeleted.
   * @param event - The ChatThreadDeletedEvent.
   * @param listener - The listener to handle the event.
   */
  public on(event: "chatThreadDeleted", listener: (e: ChatThreadDeletedEvent) => void): void;

  /**
   * Subscribe function for chatThreadPropertiesUpdated.
   * @param event - The ChatThreadPropertiesUpdatedEvent.
   * @param listener - The listener to handle the event.
   */
  public on(
    event: "chatThreadPropertiesUpdated",
    listener: (e: ChatThreadPropertiesUpdatedEvent) => void
  ): void;

  /**
   * Subscribe function for participantsAdded.
   * @param event - The ParticipantsAddedEvent.
   * @param listener - The listener to handle the event.
   */
  public on(event: "participantsAdded", listener: (e: ParticipantsAddedEvent) => void): void;

  /**
   * Subscribe function for participantsRemoved.
   * @param event - The ParticipantsRemovedEvent.
   * @param listener - The listener to handle the event.
   */
  public on(event: "participantsRemoved", listener: (e: ParticipantsRemovedEvent) => void): void;

  /**
   * Subscribe function for realTimeNotificationConnected.
   * @param event - The realTimeNotificationConnected Event
   * @param listener - The listener to handle the event.
   */
  public on(event: "realTimeNotificationConnected", listener: () => void): void;

  /**
   * Subscribe function for realTimeNotificationDisconnected.
   * @param event - The realTimeNotificationDisconnected Event
   * @param listener - The listener to handle the event.
   */
  public on(event: "realTimeNotificationDisconnected", listener: () => void): void;

  public on(event: ChatEventId, listener: (e?: any) => void): void {
    if (this.signalingClient === undefined) {
      throw new Error("Realtime notifications are only supported in the browser.");
    }
    if (
      !this.isRealtimeNotificationsStarted &&
      event !== "realTimeNotificationConnected" &&
      event !== "realTimeNotificationDisconnected"
    ) {
      throw new Error(
        "You must call startRealtimeNotifications before you can subscribe to events."
      );
    }

    this.emitter.on(event, listener);
  }

  /**
   * Unsubscribe from chatMessageReceived.
   * @param event - The ChatMessageReceivedEvent.
   * @param listener - The listener to handle the event.
   */
  public off(event: "chatMessageReceived", listener: (e: ChatMessageReceivedEvent) => void): void;

  /**
   * Unsubscribe from chatMessageEdited.
   * @param event - The ChatMessageEditedEvent.
   * @param listener - The listener to handle the event.
   */
  public off(event: "chatMessageEdited", listener: (e: ChatMessageEditedEvent) => void): void;

  /**
   * Unsubscribe from chatMessageDeleted.
   * @param event - The ChatMessageDeletedEvent.
   * @param listener - The listener to handle the event.
   */
  public off(event: "chatMessageDeleted", listener: (e: ChatMessageDeletedEvent) => void): void;

  /**
   * Unsubscribe from typingIndicatorReceived.
   * @param event - The TypingIndicatorReceivedEvent.
   * @param listener - The listener to handle the event.
   */
  public off(
    event: "typingIndicatorReceived",
    listener: (e: TypingIndicatorReceivedEvent) => void
  ): void;

  /**
   * Unsubscribe from readReceiptReceived.
   * @param event - The ReadReceiptReceivedEvent.
   * @param listener - The listener to handle the event.
   */
  public off(event: "readReceiptReceived", listener: (e: ReadReceiptReceivedEvent) => void): void;

  /**
   *  Unsubscribe from chatThreadCreated.
   * @param event - The ChatThreadCreatedEvent.
   * @param listener - The listener to handle the event.
   */
  public off(event: "chatThreadCreated", listener: (e: ChatThreadCreatedEvent) => void): void;

  /**
   *  Unsubscribe from chatThreadDeleted.
   * @param event - The ChatThreadDeletedEvent.
   * @param listener - The listener to handle the event.
   */
  public off(event: "chatThreadDeleted", listener: (e: ChatThreadDeletedEvent) => void): void;

  /**
   * Unsubscribe from chatThreadPropertiesUpdated.
   * @param event - The ChatThreadPropertiesUpdatedEvent.
   * @param listener - The listener to handle the event.
   */
  public off(
    event: "chatThreadPropertiesUpdated",
    listener: (e: ChatThreadPropertiesUpdatedEvent) => void
  ): void;

  /**
   * Unsubscribe from participantsAdded.
   * @param event - The ParticipantsAddedEvent.
   * @param listener - The listener to handle the event.
   */
  public off(event: "participantsAdded", listener: (e: ParticipantsAddedEvent) => void): void;

  /**
   * Unsubscribe from participantsRemoved.
   * @param event - The ParticipantsRemovedEvent.
   * @param listener - The listener to handle the event.
   */
  public off(event: "participantsRemoved", listener: (e: ParticipantsRemovedEvent) => void): void;

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

    this.signalingClient.on("connectionChanged", (payload) => {
      if (payload === ConnectionState.Connected) {
        this.emitter.emit("realTimeNotificationConnected");
      } else if (payload === ConnectionState.Disconnected) {
        this.emitter.emit("realTimeNotificationDisconnected");
      }
    });

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

    this.signalingClient.on("chatThreadCreated", (payload) => {
      this.emitter.emit("chatThreadCreated", payload);
    });

    this.signalingClient.on("chatThreadDeleted", (payload) => {
      this.emitter.emit("chatThreadDeleted", payload);
    });

    this.signalingClient.on("chatThreadPropertiesUpdated", (payload) => {
      this.emitter.emit("chatThreadPropertiesUpdated", payload);
    });

    this.signalingClient.on("participantsAdded", (payload) => {
      this.emitter.emit("participantsAdded", payload);
    });

    this.signalingClient.on("participantsRemoved", (payload) => {
      this.emitter.emit("participantsRemoved", payload);
    });
  }
}
