// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  VoiceLiveSessionHandlers,
  VoiceLiveSubscription,
  ConnectionContext,
  SessionContext,
  ConnectedEventArgs,
  DisconnectedEventArgs,
  ErrorEventArgs,
} from "./sessionHandlers.js";
import { type ServerEventUnion, KnownServerEventType } from "../models/index.js";
import { logger } from "../logger.js";

/**
 * Internal implementation of VoiceLiveSubscription
 */
export class VoiceLiveSubscriptionImpl implements VoiceLiveSubscription {
  private _isActive = true;
  private _handlers: VoiceLiveSessionHandlers;
  private _subscriptionId: string;

  constructor(handlers: VoiceLiveSessionHandlers, subscriptionId: string) {
    this._handlers = handlers;
    this._subscriptionId = subscriptionId;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  get subscriptionId(): string {
    return this._subscriptionId;
  }

  async close(): Promise<void> {
    if (!this._isActive) {
      return;
    }

    this._isActive = false;
    logger.info("VoiceLive subscription closed", { subscriptionId: this._subscriptionId });
  }

  /**
   * Process a connection event
   */
  async processConnectionEvent(
    eventType: "connected" | "disconnected" | "error",
    args: ConnectedEventArgs | DisconnectedEventArgs | ErrorEventArgs,
    context: ConnectionContext,
  ): Promise<void> {
    if (!this._isActive) {
      return;
    }

    try {
      switch (eventType) {
        case "connected":
          await this._handlers.onConnected?.(args as ConnectedEventArgs, context);
          break;
        case "disconnected":
          await this._handlers.onDisconnected?.(args as DisconnectedEventArgs, context);
          break;
        case "error":
          await this._handlers.onError?.(args as ErrorEventArgs, context);
          break;
      }
    } catch (error) {
      logger.error(`Error in ${eventType} handler`, {
        error,
        subscriptionId: this._subscriptionId,
      });
      // Don't rethrow - follow Azure SDK pattern of logging but not stopping other handlers
    }
  }

  /**
   * Process a server event
   */
  async processServerEvent(event: ServerEventUnion, context: SessionContext): Promise<void> {
    if (!this._isActive) {
      return;
    }

    try {
      // Call the general server event handler
      await this._handlers.onServerEvent?.(event, context);

      // Call specific handlers based on event type
      switch (event.type) {
        // Session events
        case KnownServerEventType.SessionCreated:
          await this._handlers.onSessionCreated?.(event as any, context);
          break;
        case KnownServerEventType.SessionUpdated:
          await this._handlers.onSessionUpdated?.(event as any, context);
          break;
        case KnownServerEventType.SessionAvatarConnecting:
          await this._handlers.onSessionAvatarConnecting?.(event as any, context);
          break;

        // Input audio buffer events
        case KnownServerEventType.InputAudioBufferCommitted:
          await this._handlers.onInputAudioBufferCommitted?.(event as any, context);
          break;
        case KnownServerEventType.InputAudioBufferCleared:
          await this._handlers.onInputAudioBufferCleared?.(event as any, context);
          break;
        case KnownServerEventType.InputAudioBufferSpeechStarted:
          await this._handlers.onInputAudioBufferSpeechStarted?.(event as any, context);
          break;
        case KnownServerEventType.InputAudioBufferSpeechStopped:
          await this._handlers.onInputAudioBufferSpeechStopped?.(event as any, context);
          break;

        // Conversation item events
        case KnownServerEventType.ConversationItemCreated:
          await this._handlers.onConversationItemCreated?.(event as any, context);
          break;
        case KnownServerEventType.ConversationItemInputAudioTranscriptionCompleted:
          await this._handlers.onConversationItemInputAudioTranscriptionCompleted?.(
            event as any,
            context,
          );
          break;
        case KnownServerEventType.ConversationItemInputAudioTranscriptionFailed:
          await this._handlers.onConversationItemInputAudioTranscriptionFailed?.(
            event as any,
            context,
          );
          break;
        case KnownServerEventType.ConversationItemInputAudioTranscriptionDelta:
          await this._handlers.onConversationItemInputAudioTranscriptionDelta?.(
            event as any,
            context,
          );
          break;
        case KnownServerEventType.ConversationItemTruncated:
          await this._handlers.onConversationItemTruncated?.(event as any, context);
          break;
        case KnownServerEventType.ConversationItemDeleted:
          await this._handlers.onConversationItemDeleted?.(event as any, context);
          break;
        case KnownServerEventType.ConversationItemRetrieved:
          await this._handlers.onConversationItemRetrieved?.(event as any, context);
          break;

        // Response lifecycle events
        case KnownServerEventType.ResponseCreated:
          await this._handlers.onResponseCreated?.(event as any, context);
          break;
        case KnownServerEventType.ResponseDone:
          await this._handlers.onResponseDone?.(event as any, context);
          break;
        case KnownServerEventType.ResponseOutputItemAdded:
          await this._handlers.onResponseOutputItemAdded?.(event as any, context);
          break;
        case KnownServerEventType.ResponseOutputItemDone:
          await this._handlers.onResponseOutputItemDone?.(event as any, context);
          break;
        case KnownServerEventType.ResponseContentPartAdded:
          await this._handlers.onResponseContentPartAdded?.(event as any, context);
          break;
        case KnownServerEventType.ResponseContentPartDone:
          await this._handlers.onResponseContentPartDone?.(event as any, context);
          break;

        // Response text events
        case KnownServerEventType.ResponseTextDelta:
          await this._handlers.onResponseTextDelta?.(event as any, context);
          break;
        case KnownServerEventType.ResponseTextDone:
          await this._handlers.onResponseTextDone?.(event as any, context);
          break;

        // Response audio events
        case KnownServerEventType.ResponseAudioDelta:
          await this._handlers.onResponseAudioDelta?.(event as any, context);
          break;
        case KnownServerEventType.ResponseAudioDone:
          await this._handlers.onResponseAudioDone?.(event as any, context);
          break;
        case KnownServerEventType.ResponseAudioTranscriptDelta:
          await this._handlers.onResponseAudioTranscriptDelta?.(event as any, context);
          break;
        case KnownServerEventType.ResponseAudioTranscriptDone:
          await this._handlers.onResponseAudioTranscriptDone?.(event as any, context);
          break;

        // Response animation events
        case KnownServerEventType.ResponseAnimationBlendshapesDelta:
          await this._handlers.onResponseAnimationBlendshapeDelta?.(event as any, context);
          break;
        case KnownServerEventType.ResponseAnimationBlendshapesDone:
          await this._handlers.onResponseAnimationBlendshapeDone?.(event as any, context);
          break;
        case KnownServerEventType.ResponseAnimationVisemeDelta:
          await this._handlers.onResponseAnimationVisemeDelta?.(event as any, context);
          break;
        case KnownServerEventType.ResponseAnimationVisemeDone:
          await this._handlers.onResponseAnimationVisemeDone?.(event as any, context);
          break;

        // Response timing events
        case KnownServerEventType.ResponseAudioTimestampDelta:
          await this._handlers.onResponseAudioTimestampDelta?.(event as any, context);
          break;
        case KnownServerEventType.ResponseAudioTimestampDone:
          await this._handlers.onResponseAudioTimestampDone?.(event as any, context);
          break;

        // Function call events
        case KnownServerEventType.ResponseFunctionCallArgumentsDelta:
          await this._handlers.onResponseFunctionCallArgumentsDelta?.(event as any, context);
          break;
        case KnownServerEventType.ResponseFunctionCallArgumentsDone:
          await this._handlers.onResponseFunctionCallArgumentsDone?.(event as any, context);
          break;

        // MCP events
        case KnownServerEventType.McpListToolsInProgress:
          await this._handlers.onMcpListToolsInProgress?.(event as any, context);
          break;
        case KnownServerEventType.McpListToolsCompleted:
          await this._handlers.onMcpListToolsCompleted?.(event as any, context);
          break;
        case KnownServerEventType.McpListToolsFailed:
          await this._handlers.onMcpListToolsFailed?.(event as any, context);
          break;
        case KnownServerEventType.ResponseMcpCallArgumentsDelta:
          await this._handlers.onResponseMcpCallArgumentsDelta?.(event as any, context);
          break;
        case KnownServerEventType.ResponseMcpCallArgumentsDone:
          await this._handlers.onResponseMcpCallArgumentsDone?.(event as any, context);
          break;
        case KnownServerEventType.ResponseMcpCallInProgress:
          await this._handlers.onResponseMcpCallInProgress?.(event as any, context);
          break;
        case KnownServerEventType.ResponseMcpCallCompleted:
          await this._handlers.onResponseMcpCallCompleted?.(event as any, context);
          break;
        case KnownServerEventType.ResponseMcpCallFailed:
          await this._handlers.onResponseMcpCallFailed?.(event as any, context);
          break;

        // Error events
        case KnownServerEventType.Error:
          await this._handlers.onServerError?.(event as any, context);
          break;

        // Note: No default case needed - any unmapped events will still trigger onServerEvent above
      }
    } catch (error) {
      logger.error(`Error in server event handler for ${event.type}`, {
        error,
        eventType: event.type,
        subscriptionId: this._subscriptionId,
      });
      // Don't rethrow - follow Azure SDK pattern
    }
  }
}

/**
 * Manages multiple subscriptions for a VoiceLive session
 */
export class SubscriptionManager {
  private _subscriptions = new Map<string, VoiceLiveSubscriptionImpl>();
  private _nextSubscriptionId = 1;

  /**
   * Create a new subscription
   */
  createSubscription(handlers: VoiceLiveSessionHandlers): VoiceLiveSubscription {
    const subscriptionId = `sub_${this._nextSubscriptionId++}`;
    const subscription = new VoiceLiveSubscriptionImpl(handlers, subscriptionId);

    this._subscriptions.set(subscriptionId, subscription);

    logger.info("VoiceLive subscription created", { subscriptionId });
    return subscription;
  }

  /**
   * Remove a subscription
   */
  removeSubscription(subscriptionId: string): void {
    this._subscriptions.delete(subscriptionId);
    logger.info("VoiceLive subscription removed", { subscriptionId });
  }

  /**
   * Process a connection event for all active subscriptions
   */
  async processConnectionEvent(
    eventType: "connected" | "disconnected" | "error",
    args: ConnectedEventArgs | DisconnectedEventArgs | ErrorEventArgs,
    context: ConnectionContext,
  ): Promise<void> {
    const activeSubscriptions = Array.from(this._subscriptions.values()).filter(
      (sub) => sub.isActive,
    );

    // Process all subscriptions concurrently
    await Promise.allSettled(
      activeSubscriptions.map((sub) => sub.processConnectionEvent(eventType, args, context)),
    );
  }

  /**
   * Process a server event for all active subscriptions
   */
  async processServerEvent(event: ServerEventUnion, context: SessionContext): Promise<void> {
    const activeSubscriptions = Array.from(this._subscriptions.values()).filter(
      (sub) => sub.isActive,
    );

    // Process all subscriptions concurrently
    await Promise.allSettled(
      activeSubscriptions.map((sub) => sub.processServerEvent(event, context)),
    );
  }

  /**
   * Close all subscriptions
   */
  async closeAll(): Promise<void> {
    const subscriptions = Array.from(this._subscriptions.values());
    await Promise.allSettled(subscriptions.map((sub) => sub.close()));
    this._subscriptions.clear();
  }

  /**
   * Get count of active subscriptions
   */
  get activeCount(): number {
    return Array.from(this._subscriptions.values()).filter((sub) => sub.isActive).length;
  }
}
