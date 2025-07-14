// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SignalingClient, SignalingClientOptions } from "@azure/communication-signaling";
import { ConnectionState } from "@azure/communication-signaling";
import type {
  ChatEventId,
  ChatMessageReceivedEvent,
  ChatThreadPropertiesUpdatedEvent,
  ParticipantsAddedEvent,
  ParticipantsRemovedEvent,
} from "./signaling/events.js";
import type { CommunicationTokenCredential } from "@azure/communication-common";
import { EventEmitter } from "events";
import { logger } from "./generated/src/logger.js";
import { getSignalingClient } from "./signaling/signalingClient.js";
import type { MessagesServiceClientOptions } from "./generated/src/messagesServiceClient.js";

export interface ConversationEventListener {
  off(event: "chatMessageReceived", listener: (e: ChatMessageReceivedEvent) => void): void;
  off(
    event: "chatThreadPropertiesUpdated",
    listener: (e: ChatThreadPropertiesUpdatedEvent) => void,
  ): void;
  off(event: "participantsAdded", listener: (e: ParticipantsAddedEvent) => void): void;
  off(event: "participantsRemoved", listener: (e: ParticipantsRemovedEvent) => void): void;
  on(event: "chatMessageReceived", listener: (e: ChatMessageReceivedEvent) => void): void;
  on(
    event: "chatThreadPropertiesUpdated",
    listener: (e: ChatThreadPropertiesUpdatedEvent) => void,
  ): void;
  on(event: "participantsAdded", listener: (e: ParticipantsAddedEvent) => void): void;
  on(event: "participantsRemoved", listener: (e: ParticipantsRemovedEvent) => void): void;
  on(event: "realTimeNotificationConnected", listener: () => void): void;
  on(event: "realTimeNotificationDisconnected", listener: () => void): void;
  startRealtimeNotifications(): Promise<void>;
  stopRealtimeNotifications(): Promise<void>;
}

declare interface InternalConversationEventListenerOptions extends SignalingClientOptions {
  signalingClientOptions?: SignalingClientOptions;
}

/**
 * The client to do chat operations
 */
class ConversationEventListenerImpl {
  private readonly tokenCredential: CommunicationTokenCredential;
  private readonly clientOptions: InternalConversationEventListenerOptions;
  private readonly signalingClient: SignalingClient | undefined = undefined;
  private readonly emitter = new EventEmitter();
  private isRealtimeNotificationsStarted: boolean = false;

  constructor(
    private readonly endpoint: string,
    credential: CommunicationTokenCredential,
    options: MessagesServiceClientOptions = {},
  ) {
    this.tokenCredential = credential;

    this.clientOptions = { ...options };
    this.clientOptions.signalingClientOptions = {
      ...this.clientOptions.signalingClientOptions,
      resourceEndpoint: this.endpoint,
      gatewayApiVersion: "2024-03-07",
    };

    this.signalingClient = getSignalingClient(
      this.tokenCredential,
      logger,
      this.clientOptions.signalingClientOptions,
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
   * Subscribe function for chatThreadPropertiesUpdated.
   * @param event - The ChatThreadPropertiesUpdatedEvent.
   * @param listener - The listener to handle the event.
   */
  public on(
    event: "chatThreadPropertiesUpdated",
    listener: (e: ChatThreadPropertiesUpdatedEvent) => void,
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
        "You must call startRealtimeNotifications before you can subscribe to events.",
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
   * Unsubscribe from chatThreadPropertiesUpdated.
   * @param event - The ChatThreadPropertiesUpdatedEvent.
   * @param listener - The listener to handle the event.
   */
  public off(
    event: "chatThreadPropertiesUpdated",
    listener: (e: ChatThreadPropertiesUpdatedEvent) => void,
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

export function createConversationEventListener(
  endpoint: string,
  credential: CommunicationTokenCredential,
  options: MessagesServiceClientOptions = {},
): ConversationEventListener {
  return new ConversationEventListenerImpl(endpoint, credential, options);
}
