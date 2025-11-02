// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  VoiceLiveSessionHandlers,
  VoiceLiveSubscription,
  ConnectionContext,
  SessionContext,
  ConnectedEventArgs,
  DisconnectedEventArgs,
  ErrorEventArgs
} from './sessionHandlers.js';
import type { ServerEventUnion } from '../models/index.js';
import { logger } from '../logger.js';

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
    logger.info('VoiceLive subscription closed', { subscriptionId: this._subscriptionId });
  }

  /**
   * Process a connection event
   */
  async processConnectionEvent(
    eventType: 'connected' | 'disconnected' | 'error',
    args: ConnectedEventArgs | DisconnectedEventArgs | ErrorEventArgs,
    context: ConnectionContext
  ): Promise<void> {
    if (!this._isActive) {
      return;
    }

    try {
      switch (eventType) {
        case 'connected':
          await this._handlers.processConnected?.(args as ConnectedEventArgs, context);
          break;
        case 'disconnected':
          await this._handlers.processDisconnected?.(args as DisconnectedEventArgs, context);
          break;
        case 'error':
          await this._handlers.processError?.(args as ErrorEventArgs, context);
          break;
      }
    } catch (error) {
      logger.error(`Error in ${eventType} handler`, { 
        error, 
        subscriptionId: this._subscriptionId 
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
      await this._handlers.processServerEvent?.(event, context);

      // Call specific handlers based on event type
      switch (event.type) {
        case 'session.created':
          await this._handlers.processSessionCreated?.(event as any, context);
          break;
        case 'response.created':
          await this._handlers.processResponseCreated?.(event as any, context);
          break;
        case 'response.done':
          await this._handlers.processResponseDone?.(event as any, context);
          break;
        case 'response.audio.delta':
          await this._handlers.processAudioReceived?.(event as any, context);
          break;
        case 'response.audio_transcript.delta':
          await this._handlers.processTextReceived?.(event as any, context);
          break;
        case 'input_audio_buffer.speech_started':
          await this._handlers.processSpeechStarted?.(event as any, context);
          break;
        case 'input_audio_buffer.speech_stopped':
          await this._handlers.processSpeechStopped?.(event as any, context);
          break;
        case 'error':
          await this._handlers.processServerError?.(event as any, context);
          break;
        // Add more specific handlers as needed
      }
    } catch (error) {
      logger.error(`Error in server event handler for ${event.type}`, { 
        error, 
        eventType: event.type,
        subscriptionId: this._subscriptionId 
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
    
    logger.info('VoiceLive subscription created', { subscriptionId });
    return subscription;
  }

  /**
   * Remove a subscription
   */
  removeSubscription(subscriptionId: string): void {
    this._subscriptions.delete(subscriptionId);
    logger.info('VoiceLive subscription removed', { subscriptionId });
  }

  /**
   * Process a connection event for all active subscriptions
   */
  async processConnectionEvent(
    eventType: 'connected' | 'disconnected' | 'error',
    args: ConnectedEventArgs | DisconnectedEventArgs | ErrorEventArgs,
    context: ConnectionContext
  ): Promise<void> {
    const activeSubscriptions = Array.from(this._subscriptions.values()).filter(sub => sub.isActive);
    
    // Process all subscriptions concurrently
    await Promise.allSettled(
      activeSubscriptions.map(sub => sub.processConnectionEvent(eventType, args, context))
    );
  }

  /**
   * Process a server event for all active subscriptions
   */
  async processServerEvent(event: ServerEventUnion, context: SessionContext): Promise<void> {
    const activeSubscriptions = Array.from(this._subscriptions.values()).filter(sub => sub.isActive);
    
    // Process all subscriptions concurrently
    await Promise.allSettled(
      activeSubscriptions.map(sub => sub.processServerEvent(event, context))
    );
  }

  /**
   * Close all subscriptions
   */
  async closeAll(): Promise<void> {
    const subscriptions = Array.from(this._subscriptions.values());
    await Promise.allSettled(subscriptions.map(sub => sub.close()));
    this._subscriptions.clear();
  }

  /**
   * Get count of active subscriptions
   */
  get activeCount(): number {
    return Array.from(this._subscriptions.values()).filter(sub => sub.isActive).length;
  }
}