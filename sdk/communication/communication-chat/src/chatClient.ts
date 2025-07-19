// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ChatClientOptions,
  CreateChatThreadOptions,
  DeleteChatThreadOptions,
  ListChatThreadsOptions,
} from "./models/options.js";
import type {
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
} from "./models/events.js";
import type { ChatThreadItem, CreateChatThreadResult, ListPageSettings } from "./models/models.js";
import type { SignalingClient, SignalingClientOptions } from "@azure/communication-signaling";
import { ConnectionState } from "@azure/communication-signaling";
import {
  mapToChatParticipantRestModel,
  mapToCreateChatThreadOptionsRestModel,
  mapToCreateChatThreadResultSdkModel,
} from "./models/mappers.js";
import { ChatApiClient } from "./generated/src/index.js";
import { ChatThreadClient } from "./chatThreadClient.js";
import type { CommunicationTokenCredential } from "@azure/communication-common";
import type { CreateChatThreadRequest } from "./models/requests.js";
import { EventEmitter } from "events";
import type { InternalPipelineOptions } from "@azure/core-rest-pipeline";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import { createCommunicationTokenCredentialPolicy } from "./credential/communicationTokenCredentialPolicy.js";
import { generateUuid } from "./models/uuid.js";
import { getSignalingClient } from "./signaling/signalingClient.js";
import { logger } from "./models/logger.js";
import { tracingClient } from "./generated/src/tracing.js";

/**
 * Options to configure polling behavior.
 */
export interface PollingOptions {
  /**
   * Indicates whether polling is enabled.
   * It is necessary to set this to true to enable polling.
   * If not set, polling will not be started.
   */
  enabled?: boolean;
  /**
   * The interval in seconds at which to poll for messages.
   * Must be between 10 and 600 seconds.
   * Default is 20 seconds.
   */
  intervalInSec?: number;
  /**
   * Indicates whether adaptive polling is enabled.
   * If true, the client will switch between fast and slow polling modes based on message activity.
   */
  adaptivePolling?: boolean;
  /**
   * The interval in seconds for fast polling mode.
   * Must be between 10 and 600 seconds.
   * Default is 5 seconds.
   */
  fast?: number;
  /**
   * The interval in seconds for slow polling mode.
   * Must be between 10 and 600 seconds.
   * Default is 60 seconds.
   */
  slow?: number;
}

/**
 * Options for starting realtime notifications.
 * If threadsIds is provided, the client will poll for messages in those threads.
 * If pollingOptions is provided, it will configure the polling behavior.
 */
export interface StartRealtimeNotificationsOptions {
  threadsIds?: string[];
  pollingOptions?: PollingOptions;
}

declare interface InternalChatClientOptions extends ChatClientOptions {
  signalingClientOptions?: SignalingClientOptions;
}

/**
 * The client to do chat operations
 */
export class ChatClient {
  private readonly tokenCredential: CommunicationTokenCredential;
  private readonly clientOptions: InternalChatClientOptions;
  private readonly client: ChatApiClient;
  private readonly signalingClient: SignalingClient | undefined = undefined;
  private readonly emitter = new EventEmitter();
  private isRealtimeNotificationsStarted: boolean = false;
  private isRealtimeNotificationsConnected: boolean = false;
  private messagesDetected: [string, string][] = [];
  /* Map to store threads with polling enabled.
   * The key is the thread ID and the value is the ChatThreadClient instance.*/
  private threadsWithPolling: Map<string, ChatThreadClient> = new Map();

  /* Indicates if polling is active
   * If true, the client will poll for messages in the specified threads.*/
  private isPollingEnable: boolean = false;
  /* Flag to indicate if polling is running.
   * This is used to prevent multiple polling loops from running at the same time.
  */
  private isPollingRunning: boolean = false;

  private adaptivePolling: boolean = false;

  private lastTimeRTNWorked: Date | null = null;

  private fastPollCounter: number = 0;

  private pollingMode: Map<string, number> = new Map([
    ["default", 20000],
    ["slow", 60000],
    ["fast", 5000],
  ]);

  private currentPollingMode: string = "default";
  /**
   * Variables to manage adaptive polling.
   * pollingTimestamp is used to track the last time polling was done.
   * pollingTimeOutHandle is used to clear the timeout for polling.
   */
  private pollingTimestamp: Date | null = null;
  private pollingTimeOutHandle: NodeJS.Timeout | null = null;
  private pollingTimeOutInterruption: boolean = false;
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
    options: ChatClientOptions = {},
  ) {
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

    this.clientOptions = { ...options };
    this.clientOptions.signalingClientOptions = {
      ...this.clientOptions.signalingClientOptions,
      resourceEndpoint: this.endpoint,
      gatewayApiVersion: this.client.apiVersion,
    };

    this.signalingClient = getSignalingClient(
      credential,
      logger,
      this.clientOptions.signalingClientOptions,
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
    options: CreateChatThreadOptions = {},
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
              mapToChatParticipantRestModel(participant),
            ),
          },
          updatedRestModelOptions,
        );
        return mapToCreateChatThreadResultSdkModel(result);
      },
    );
  }

  private async *listChatThreadsPage(
    continuationState: ListPageSettings,
    options: ListChatThreadsOptions = {},
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
        options,
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
    options: ListChatThreadsOptions,
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
    options: ListChatThreadsOptions = {},
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
    options: DeleteChatThreadOptions = {},
  ): Promise<void> {
    return tracingClient.withSpan(
      "ChatClient-DeleteChatThread",
      options,
      async (updatedOptions) => {
        await this.client.chat.deleteChatThread(threadId, updatedOptions);
      },
    );
  }

  /**
   * Start receiving realtime notifications.
   * Call this function before subscribing to any event.
   * To add polling for messages as a backup mechanism, its necessary to add options parameter with the pollingThreadsIDs array.
   * @param options - Options for starting realtime notifications.
   */
  public async startRealtimeNotifications(options?: StartRealtimeNotificationsOptions): Promise<void> {
    if (this.signalingClient === undefined) {
      throw new Error("Realtime notifications are not supported in node js.");
    }
    if (this.isRealtimeNotificationsStarted) {
      return;
    }
    this.isRealtimeNotificationsStarted = true;
    await this.signalingClient.start();
    this.subscribeToSignalingEvents();

    // 1. No polling if parameter is undefined or null
    if (options === undefined || options === null) {
      logger.info(
        "No polling options provided. Realtime notifications will be used without polling.",
      );
      return;
    }

    // 2. If options has values, use custom polling values
    const { threadsIds, pollingOptions } = options;
    if (threadsIds !== undefined && threadsIds.length > 0 && threadsIds.length <= 10 && pollingOptions?.enabled === true) {
      logger.info("Chat threads provided");
      // Fetch all chat threads to validate the provided thread IDs
      for (const threadId of threadsIds) {
        try {
          const chatThreadClient = this.getChatThreadClient(threadId);
          this.threadsWithPolling.set(threadId, chatThreadClient);
        } catch (error) {
          logger.error(`Error fetching thread ${threadId}:`, error);
        }
      }
      // Check if we found any matching threads
      if (this.threadsWithPolling.size === 0) {
        logger.warning("No matching chat threads found for the provided threadsIds. Polling will not be started.");
        return;
      }
      // Check and configure polling options
      if (pollingOptions !== undefined) {
        if (
          pollingOptions.intervalInSec !== undefined &&
          pollingOptions.intervalInSec >= 10 &&
          pollingOptions.intervalInSec <= 600) {
          this.pollingMode.set("default", pollingOptions.intervalInSec * 1000);
        } else {
          logger.warning("Invalid polling interval for Default mode. Using default value of 20 seconds.");
        }
        if (pollingOptions.adaptivePolling !== undefined && pollingOptions.adaptivePolling === true) {
          if (
            pollingOptions.slow !== undefined &&
            pollingOptions.slow >= 10 &&
            pollingOptions.slow <= 600
          ) {
            this.pollingMode.set("slow", pollingOptions.slow * 1000);
          } else {
            logger.warning("Invalid polling interval for Slow mode. Using default value of 60 seconds.");
          }
          if (
            pollingOptions.fast !== undefined &&
            pollingOptions.fast >= 1 &&
            pollingOptions.fast <= 600
          ) {
            this.pollingMode.set("fast", pollingOptions.fast * 1000);
          } else {
            logger.warning(
              "Invalid polling interval for Fast mode. Using default value of 5 seconds.",
            );
          }
        }
      }
    } else {
      logger.warning(
        "No valid ThreadsIds provided or enabled has not been set as true in polling options. Polling will not be started.");
      return;
    }

    // Enable adaptive polling if specified
    this.adaptivePolling = !!pollingOptions?.adaptivePolling;
    this.startPolling();
  }

  /**
   * Stop receiving realtime notifications.
   * This function would unsubscribe to all events.
   * This function will also stop polling for messages if it was started.
   */
  public async stopRealtimeNotifications(): Promise<void> {
    if (this.signalingClient === undefined) {
      throw new Error("Realtime notifications are not supported in node js.");
    }
    this.isRealtimeNotificationsStarted = false;
    await this.signalingClient.stop();
    this.emitter.removeAllListeners();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.stopPolling();
  }
  /**
   * Stop polling for messages.
   * This will set isPollingEnable to false, stopping the polling loop.
   */
  public stopPolling(): void {
    this.isPollingEnable = false;
  }

  /**
   * Update the polling frequency value for a specific key.
   * @param pollingMode - The key for the polling frequency to update.
   */
  private updatePollingMode(pollingMode: "default" | "fast" | "slow"): void {
    this.currentPollingMode = pollingMode;
    console.log("Update Polling with frequency:", this.pollingMode.get(this.currentPollingMode));
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
    listener: (e: TypingIndicatorReceivedEvent) => void,
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
    listener: (e: TypingIndicatorReceivedEvent) => void,
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
        if (this.adaptivePolling && this.isPollingEnable) {
          this.isRealtimeNotificationsConnected = true; // RTN is back, set the flag to true
        }
      } else if (payload === ConnectionState.Disconnected) {
        this.emitter.emit("realTimeNotificationDisconnected");
        if (this.adaptivePolling && this.isPollingEnable) {
          this.isRealtimeNotificationsConnected = false; // RTN is gone, set the flag to false
        }
      }
    });

    this.signalingClient.on("chatMessageReceived", (payload) => {
      // this.emitter.emit("chatMessageReceived", payload);
      /**
       * Simulate a 50% chance of emitting the event.
       */
      if (Math.random() < 0.5) {
        this.emitter.emit("chatMessageReceived", payload);
        if (this.isPollingEnable) {
          this.lastTimeRTNWorked = new Date();
          if (this.adaptivePolling && this.currentPollingMode !== "default") {
            // Interrupt current polling and switch to Default mode
            if (this.pollingTimeOutHandle !== null) {
              clearTimeout(this.pollingTimeOutHandle);
              this.pollingTimeOutHandle = null;
              this.isPollingRunning = false; // Reset polling running state
            }
            this.pollingTimeOutInterruption = true;
            this.updatePollingMode("default");
            // Schedule a new poll with Default interval
            this.pollingTimeOutHandle = setTimeout(
              () => this.startPolling(),
              this.pollingMode.get("default") ?? 20000,
            );
            console.log(
              "Polling interrupted and rescheduled with Default interval due to chatMessageReceived.",
            );
          }
          if (this.threadsWithPolling.has(payload.threadId)) {
            this.messagesDetected.push([payload.id, payload.threadId]);
            console.log("Message Stored:", payload.id);
          }
        }
      } else {
        console.log("Message Not Emitted:", payload.id);
      }
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

  /**
   * Start polling for messages in specified threads.
   * @param threadsWithPolling - List of thread IDs to poll for messages.
   * @param pollingFrequency - Frequency (in milliseconds) to poll for messages.
   */
  private async startPolling(): Promise<void> {
    if (this.isPollingRunning) return;
    this.isPollingEnable = true;
    this.isPollingRunning = true;
    const waitTime = this.pollingMode.get(this.currentPollingMode) ?? 20000;
    await new Promise((resolve) => setTimeout(resolve, waitTime));
    const poll = async (): Promise<void> => {
      if (!this.isPollingEnable) {
        this.isPollingRunning = false;
        return;
      }
      try {
        // Check the last time RTN worked and update the polling frequency accordingly.
        // Iterate through the threadsWithPolling map and poll for messages in each thread.
        const returnTime = this.pollingMode.get(this.currentPollingMode) ?? 20000;
        let startTime = new Date(Date.now() - returnTime);
        for (const [key, chatThread] of this.threadsWithPolling) {
          try {
            // if this.pollingTimestamp is not null, we will use it as start time.
            if (this.pollingTimeOutInterruption) {
              console.log("Using special start time.");
              startTime = this.pollingTimestamp ?? startTime;
            }
            this.pollingTimeOutInterruption = false; // Reset the interruption flag after using it
            const messages = chatThread.listMessages({ startTime: startTime });
            const messagesArray = [];
            for await (const message of messages) {
              messagesArray.push(message);
            }
            for (let i = messagesArray.length - 1; i >= 0; i--) {
              const message = messagesArray[i];
              const exists = this.messagesDetected.some(
                ([id, threadId]) => id === message.id && threadId === key,
              );
              /* If the message is not already detected, emit the event and add it to messagesDetected array.*/
              if (!exists) {
                this.emitter.emit("chatMessageReceived", {
                  id: message.id,
                  threadId: key,
                  sender: message.sender,
                  senderDisplayName: message.senderDisplayName,
                  createdOn: message.createdOn,
                  content: message.content,
                  metadata: message.metadata,
                  type: message.type
                });
                this.messagesDetected.push([message.id, key]);
              }
            }
            /**
             * Check if the last time RTN worked is more than the polling interval.
             * If so, switch to Emergency polling mode.
             */
            if (this.adaptivePolling) {
              console.log("Checking adaptive polling conditions...");
              if (
                (Date.now() - (this.lastTimeRTNWorked?.getTime() ?? 0) >
                  (this.pollingMode.get(this.currentPollingMode) ?? 20000) &&
                  this.currentPollingMode === "default") ||
                this.isRealtimeNotificationsConnected === false
              ) {
                console.log("No new messages detected, switching to fast polling mode.");
                this.updatePollingMode("fast");
                this.fastPollCounter = 0;
              } else {
                if (
                  this.currentPollingMode === "fast" &&
                  this.fastPollCounter < 3 &&
                  messagesArray.length === 0
                ) {
                  console.log("No new messages found, switching to slow polling mode.");
                  this.updatePollingMode("slow");
                  this.fastPollCounter = 0; // Reset the fast poll counter
                } else {
                  this.fastPollCounter++;
                }
              }
              this.pollingTimestamp = new Date(); // Update the polling timestamp
            }
          } catch (error) {
            logger.error("Error in polling messages: ", error);
          }
        }
      } catch (err) {
        logger.error("Polling loop error: ", err);
      }

      // Schedule the next poll only after this one finishes
      if (this.isPollingEnable) {
        this.messagesDetected = []; // Clear the messagesDetected array after each poll
        const pollingInterval = this.pollingMode.get(this.currentPollingMode) ?? 20000;
        logger.info(
          "Schedule Polling with frequency:",
          pollingInterval / 1000 + " seconds",
        );
        this.pollingTimeOutHandle = setTimeout(
          poll,
          pollingInterval,
        );
      } else {
        this.isPollingRunning = false;
      }
    };
    poll();
  }
}
