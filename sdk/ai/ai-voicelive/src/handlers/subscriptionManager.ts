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
import type { ServerEventUnion } from "../models/index.js";
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
        case "session.created":
          await this._handlers.onSessionCreated?.(event as any, context);
          break;
        case "session.updated":
          await this._handlers.onSessionUpdated?.(event as any, context);
          break;
        case "session.avatar.connecting":
          await this._handlers.onSessionAvatarConnecting?.(event as any, context);
          break;

        // Input audio buffer events
        case "input_audio_buffer.committed":
          await this._handlers.onInputAudioBufferCommitted?.(event as any, context);
          break;
        case "input_audio_buffer.cleared":
          await this._handlers.onInputAudioBufferCleared?.(event as any, context);
          break;
        case "input_audio_buffer.speech_started":
          await this._handlers.onInputAudioBufferSpeechStarted?.(event as any, context);
          break;
        case "input_audio_buffer.speech_stopped":
          await this._handlers.onInputAudioBufferSpeechStopped?.(event as any, context);
          break;

        // Conversation item events
        case "conversation.item.created":
          await this._handlers.onConversationItemCreated?.(event as any, context);
          break;
        case "conversation.item.input_audio_transcription.completed":
          await this._handlers.onConversationItemInputAudioTranscriptionCompleted?.(
            event as any,
            context,
          );
          break;
        case "conversation.item.input_audio_transcription.failed":
          await this._handlers.onConversationItemInputAudioTranscriptionFailed?.(
            event as any,
            context,
          );
          break;
        case "conversation.item.input_audio_transcription.delta":
          await this._handlers.onConversationItemInputAudioTranscriptionDelta?.(
            event as any,
            context,
          );
          break;
        case "conversation.item.truncated":
          await this._handlers.onConversationItemTruncated?.(event as any, context);
          break;
        case "conversation.item.deleted":
          await this._handlers.onConversationItemDeleted?.(event as any, context);
          break;
        case "conversation.item.retrieved":
          await this._handlers.onConversationItemRetrieved?.(event as any, context);
          break;

        // Response lifecycle events
        case "response.created":
          await this._handlers.onResponseCreated?.(event as any, context);
          break;
        case "response.done":
          await this._handlers.onResponseDone?.(event as any, context);
          break;
        case "response.output_item.added":
          await this._handlers.onResponseOutputItemAdded?.(event as any, context);
          break;
        case "response.output_item.done":
          await this._handlers.onResponseOutputItemDone?.(event as any, context);
          break;
        case "response.content_part.added":
          await this._handlers.onResponseContentPartAdded?.(event as any, context);
          break;
        case "response.content_part.done":
          await this._handlers.onResponseContentPartDone?.(event as any, context);
          break;

        // Response text events
        case "response.text.delta":
          await this._handlers.onResponseTextDelta?.(event as any, context);
          break;
        case "response.text.done":
          await this._handlers.onResponseTextDone?.(event as any, context);
          break;

        // Response audio events
        case "response.audio.delta":
          await this._handlers.onResponseAudioDelta?.(event as any, context);
          break;
        case "response.audio.done":
          await this._handlers.onResponseAudioDone?.(event as any, context);
          break;
        case "response.audio_transcript.delta":
          await this._handlers.onResponseAudioTranscriptDelta?.(event as any, context);
          break;
        case "response.audio_transcript.done":
          await this._handlers.onResponseAudioTranscriptDone?.(event as any, context);
          break;

        // Response animation events
        case "response.animation_blendshapes.delta":
          await this._handlers.onResponseAnimationBlendshapeDelta?.(event as any, context);
          break;
        case "response.animation_blendshapes.done":
          await this._handlers.onResponseAnimationBlendshapeDone?.(event as any, context);
          break;
        case "response.animation_viseme.delta":
          await this._handlers.onResponseAnimationVisemeDelta?.(event as any, context);
          break;
        case "response.animation_viseme.done":
          await this._handlers.onResponseAnimationVisemeDone?.(event as any, context);
          break;

        // Response timing events
        case "response.audio_timestamp.delta":
          await this._handlers.onResponseAudioTimestampDelta?.(event as any, context);
          break;
        case "response.audio_timestamp.done":
          await this._handlers.onResponseAudioTimestampDone?.(event as any, context);
          break;

        // Function call events
        case "response.function_call_arguments.delta":
          await this._handlers.onResponseFunctionCallArgumentsDelta?.(event as any, context);
          break;
        case "response.function_call_arguments.done":
          await this._handlers.onResponseFunctionCallArgumentsDone?.(event as any, context);
          break;

        // Error events
        case "error":
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
