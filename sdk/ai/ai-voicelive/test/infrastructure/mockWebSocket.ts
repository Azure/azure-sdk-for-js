// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { VoiceLiveWebSocketLike, WebSocketState } from "../../src/websocket/websocketLike.js";

/**
 * Mock implementation of VoiceLiveWebSocketLike for testing purposes.
 * Provides message capture, queuing, and state simulation capabilities.
 */
export class MockVoiceLiveWebSocket implements VoiceLiveWebSocketLike {
  private _state: WebSocketState = 1; // WebSocketState.Open
  private _sentMessages: string[] = [];
  private _testMode = false;

  // Event handlers
  private _onOpenHandler?: () => void;
  private _onCloseHandler?: (code: number, reason: string) => void;
  private _onMessageHandlers: Array<(data: string | ArrayBuffer) => void> = [];
  private _onErrorHandler?: (error: Error) => void;

  constructor() {
    // Start in open state for testing convenience
    this._state = 1; // WebSocketState.Open
  }

  /**
   * Get if WebSocket is connected (for VoiceLiveWebSocketLike compatibility)
   */
  get isConnected(): boolean {
    return this._state === 1; // WebSocketState.Open
  }

  /**
   * Get WebSocket ready state (for VoiceLiveWebSocketLike compatibility)
   */
  get readyState(): number {
    return this._state;
  }

  /**
   * Mock connection - immediately resolves for testing
   */
  async connect(_url: string, _protocols?: string[], abortSignal?: AbortSignal): Promise<void> {
    if (abortSignal?.aborted) {
      throw new Error("Connection aborted");
    }

    this._state = 0; // WebSocketState.Connecting

    // Simulate connection delay
    await new Promise((resolve) => setTimeout(resolve, 1));

    if (abortSignal?.aborted) {
      throw new Error("Connection aborted");
    }

    this._state = 1; // WebSocketState.Open
    this._onOpenHandler?.();
  }

  /**
   * Mock disconnect
   */
  async disconnect(code?: number, reason?: string): Promise<void> {
    if (this._state === 3) return; // Already closed

    this._state = 2; // WebSocketState.Closing

    // Simulate close delay
    await new Promise((resolve) => setTimeout(resolve, 1));

    this._state = 3; // WebSocketState.Closed
    this._onCloseHandler?.(code ?? 1000, reason ?? "Normal close");
  }

  /**
   * Mock send - captures messages for assertion
   */
  async send(data: string | ArrayBuffer, abortSignal?: AbortSignal): Promise<void> {
    if (this._state !== 1) {
      // Not open
      throw new Error("WebSocket is not open");
    }

    if (abortSignal?.aborted) {
      throw new Error("Send aborted");
    }

    const message = typeof data === "string" ? data : new TextDecoder().decode(data);
    this._sentMessages.push(message);
  }

  /**
   * Register open event handler
   */
  onOpen(handler: () => void): void {
    this._onOpenHandler = handler;
  }

  /**
   * Register close event handler
   */
  onClose(handler: (code: number, reason: string) => void): void {
    this._onCloseHandler = handler;
  }

  /**
   * Register message event handler
   */
  onMessage(handler: (data: string | ArrayBuffer) => void): void {
    this._onMessageHandlers.push(handler);
  }

  /**
   * Remove specific message handler
   */
  removeMessageHandler(handler: (data: string | ArrayBuffer) => void): void {
    const index = this._onMessageHandlers.indexOf(handler);
    if (index > -1) {
      this._onMessageHandlers.splice(index, 1);
    }
  }

  /**
   * Register error event handler
   */
  onError(handler: (error: Error) => void): void {
    this._onErrorHandler = handler;
  }

  /**
   * Remove all event handlers
   */
  removeAllListeners(): void {
    this._onOpenHandler = undefined;
    this._onCloseHandler = undefined;
    this._onMessageHandlers = [];
    this._onErrorHandler = undefined;
  }

  /**
   * Set test mode for predictable message delivery timing
   */
  setTestMode(enabled: boolean): void {
    this._testMode = enabled;
  }

  // Test utility methods

  /**
   * Get current WebSocket state
   */
  get state(): WebSocketState {
    return this._state;
  }

  /**
   * Get all sent messages for testing assertions
   */
  getSentMessages(): readonly string[] {
    return [...this._sentMessages];
  }

  /**
   * Get the last sent message
   */
  getLastSentMessage(): string | undefined {
    return this._sentMessages[this._sentMessages.length - 1];
  }

  /**
   * Get count of messages of a specific type
   */
  getMessageCountByType(messageType: string): number {
    return this._sentMessages.filter((msg) => {
      try {
        const parsed = JSON.parse(msg);
        return parsed.type === messageType;
      } catch {
        return false;
      }
    }).length;
  }

  /**
   * Get messages of a specific type
   */
  getMessagesByType(messageType: string): any[] {
    return this._sentMessages
      .filter((msg) => {
        try {
          const parsed = JSON.parse(msg);
          return parsed.type === messageType;
        } catch {
          return false;
        }
      })
      .map((msg) => JSON.parse(msg));
  }

  /**
   * Clear all sent messages (useful for test setup)
   */
  clearSentMessages(): void {
    this._sentMessages.length = 0;
  }

  /**
   * Enqueue an inbound message to be delivered to the message handler
   */
  enqueueInboundMessage(message: string): void {
    if (this._testMode) {
      // Synchronous delivery for predictable testing
      this._onMessageHandlers.forEach((handler) => handler(message));
    } else {
      // Async delivery for realistic simulation
      const currentHandlers = [...this._onMessageHandlers];

      // Simulate message delivery
      setTimeout(() => {
        if (currentHandlers.length > 0) {
          // Only call handlers that were active when message was enqueued
          // and are still active (not unsubscribed)
          currentHandlers.forEach((handler) => {
            if (this._onMessageHandlers.includes(handler)) {
              handler(message);
            }
          });
        }
      }, 1);
    }
  }

  /**
   * Simulate a WebSocket error
   */
  simulateError(error: Error): void {
    this._onErrorHandler?.(error);
  }

  /**
   * Simulate abort during operation
   */
  simulateAbort(): void {
    this._state = 3; // WebSocketState.Closed
    this.simulateError(new Error("Connection aborted"));
  }

  /**
   * Wait for at least the specified number of messages to be sent
   */
  async waitForMessages(count: number, timeoutInMs = 5000): Promise<void> {
    const startTime = Date.now();

    while (this._sentMessages.length < count) {
      if (Date.now() - startTime > timeoutInMs) {
        throw new Error(`Timeout waiting for ${count} messages. Got ${this._sentMessages.length}`);
      }
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
  }

  /**
   * Wait for a message of a specific type
   */
  async waitForMessageType(messageType: string, timeoutInMs = 5000): Promise<any> {
    const startTime = Date.now();

    while (Date.now() - startTime < timeoutInMs) {
      const messages = this.getMessagesByType(messageType);
      if (messages.length > 0) {
        return messages[messages.length - 1];
      }
      await new Promise((resolve) => setTimeout(resolve, 10));
    }

    throw new Error(`Timeout waiting for message type: ${messageType}`);
  }
}
