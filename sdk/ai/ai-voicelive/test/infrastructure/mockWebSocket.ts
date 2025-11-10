// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { VoiceLiveWebSocketLike, WebSocketState } from "../../src/websocket/websocketLike.js";

/**
 * Mock implementation of VoiceLiveWebSocketLike for testing purposes.
 * Provides message capture, queuing, and state simulation capabilities.
 */
export class MockVoiceLiveWebSocket implements VoiceLiveWebSocketLike {
  private _state: WebSocketState = 1; // WebSocketState.Open
  private _inboundQueue: string[] = [];
  private _sentMessages: string[] = [];
  private _closeCode?: number;
  private _closeReason?: string;
  private _aborted = false;

  // Event handlers
  private _onOpenHandler?: () => void;
  private _onCloseHandler?: (code?: number, reason?: string) => void;
  private _onMessageHandler?: (data: string | ArrayBuffer) => void;
  private _onErrorHandler?: (error: Error) => void;

  constructor() {
    // Start in open state for testing convenience
    this._state = 1; // WebSocketState.Open
  }

  /**
   * Mock connection - immediately resolves for testing
   */
  async connect(url: string, protocols?: string[], abortSignal?: AbortSignal): Promise<void> {
    if (abortSignal?.aborted) {
      throw new Error("Connection aborted");
    }

    this._state = 0; // WebSocketState.Connecting
    
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 1));
    
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
    this._closeCode = code;
    this._closeReason = reason;
    
    // Simulate close delay
    await new Promise(resolve => setTimeout(resolve, 1));
    
    this._state = 3; // WebSocketState.Closed
    this._onCloseHandler?.(code, reason);
  }

  /**
   * Mock send - captures messages for assertion
   */
  async send(data: string | ArrayBuffer, abortSignal?: AbortSignal): Promise<void> {
    if (this._state !== 1) { // Not open
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
  onClose(handler: (code?: number, reason?: string) => void): void {
    this._onCloseHandler = handler;
  }

  /**
   * Register message event handler
   */
  onMessage(handler: (data: string | ArrayBuffer) => void): void {
    this._onMessageHandler = handler;
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
    this._onMessageHandler = undefined;
    this._onErrorHandler = undefined;
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
    return this._sentMessages.filter(msg => {
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
      .filter(msg => {
        try {
          const parsed = JSON.parse(msg);
          return parsed.type === messageType;
        } catch {
          return false;
        }
      })
      .map(msg => JSON.parse(msg));
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
    this._inboundQueue.push(message);
    // Simulate message delivery
    setTimeout(() => {
      if (this._onMessageHandler && this._inboundQueue.length > 0) {
        const msg = this._inboundQueue.shift();
        if (msg) {
          this._onMessageHandler(msg);
        }
      }
    }, 1);
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
    this._aborted = true;
    this._state = 3; // WebSocketState.Closed
    this.simulateError(new Error("Connection aborted"));
  }

  /**
   * Wait for at least the specified number of messages to be sent
   */
  async waitForMessages(count: number, timeoutMs = 5000): Promise<void> {
    const startTime = Date.now();
    
    while (this._sentMessages.length < count) {
      if (Date.now() - startTime > timeoutMs) {
        throw new Error(`Timeout waiting for ${count} messages. Got ${this._sentMessages.length}`);
      }
      await new Promise(resolve => setTimeout(resolve, 10));
    }
  }

  /**
   * Wait for a message of a specific type
   */
  async waitForMessageType(messageType: string, timeoutMs = 5000): Promise<any> {
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeoutMs) {
      const messages = this.getMessagesByType(messageType);
      if (messages.length > 0) {
        return messages[messages.length - 1];
      }
      await new Promise(resolve => setTimeout(resolve, 10));
    }
    
    throw new Error(`Timeout waiting for message type: ${messageType}`);
  }
}
