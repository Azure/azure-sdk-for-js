// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { VoiceLiveClient } from "../../src/client/voiceLiveClient.js";
import { VoiceLiveSession } from "../../src/client/voiceLiveSession.js";
import type { SendEventOptions, TurnOptions } from "../../src/client/voiceLiveSession.js";
import type { ConversationRequestItem } from "../../src/models/index.js";
import { MockVoiceLiveWebSocket } from "./mockWebSocket.js";
import { TestConstants, audioToBase64 } from "./testConstants.js";
import type { TokenCredential, KeyCredential } from "@azure/core-auth";

// Define audio options interface for testing
interface AudioOptions {
  format?: string;
  sampleRate?: number;
  channels?: number;
  abortSignal?: AbortSignal;
}

/**
 * Mock credential for testing
 */
export class MockTokenCredential implements TokenCredential {
  constructor(private _token?: string) {}

  async getToken(
    _scopes: string | string[],
  ): Promise<{ token: string; expiresOnTimestamp: number }> {
    return {
      token: this._token || "mock-token-" + Date.now(),
      expiresOnTimestamp: Date.now() + 3600000, // 1 hour from now
    };
  }
}

/**
 * Mock key credential for testing
 */
export class MockKeyCredential implements KeyCredential {
  constructor(private _key: string = TestConstants.TEST_API_KEY) {}

  get key(): string {
    return this._key;
  }
}

/**
 * Testable VoiceLiveSession that allows WebSocket injection
 */
export class TestableVoiceLiveSession extends VoiceLiveSession {
  private _mockWebSocket?: MockVoiceLiveWebSocket;

  constructor(
    endpoint: string,
    credential: TokenCredential | KeyCredential,
    apiVersion: string = "2025-10-01",
    model: string = TestConstants.MODEL_NAME,
  ) {
    super(endpoint, credential, apiVersion, model);
  }

  /**
   * Inject a mock WebSocket for testing
   */
  setMockWebSocket(mockWebSocket: MockVoiceLiveWebSocket): void {
    this._mockWebSocket = mockWebSocket;
    // Override the internal WebSocket factory to return our mock
    // This requires access to internal session state - we'll need to design this carefully
    // For now, we'll use a more direct approach through the connection manager
  }

  /**
   * Get the injected mock WebSocket for test assertions
   */
  getMockWebSocket(): MockVoiceLiveWebSocket | undefined {
    return this._mockWebSocket;
  }

  /**
   * Override connection method to use mock WebSocket
   * This is a simplified approach - in production we'd want a more elegant injection mechanism
   */
  async connectWithMock(mockWebSocket: MockVoiceLiveWebSocket): Promise<void> {
    this._mockWebSocket = mockWebSocket;

    // Simulate connection setup
    await mockWebSocket.connect(TestConstants.WS_ENDPOINT);

    // Set up event handlers
    mockWebSocket.onOpen(() => {
      // Session is now connected
    });

    mockWebSocket.onMessage((data) => {
      // Handle incoming messages
      if (typeof data === "string") {
        this.handleIncomingMessage(data);
      }
    });

    mockWebSocket.onError((error) => {
      // Handle errors
      this.handleConnectionError(error);
    });

    mockWebSocket.onClose((code, reason) => {
      // Handle connection close
      this.handleConnectionClose(code, reason);
    });
  }

  /**
   * Handle incoming message (protected method that we'll expose for testing)
   */
  private handleIncomingMessage(_message: string): void {
    // This would normally be handled by the session's message processing logic
    // For testing, we can expose this or use events to verify message handling
  }

  /**
   * Handle connection error (protected method that we'll expose for testing)
   */
  private handleConnectionError(_error: Error): void {
    // Error handling logic - clear active turn on error
    (this as any)._activeTurnId = undefined;
  }

  /**
   * Handle connection close (protected method that we'll expose for testing)
   */
  private handleConnectionClose(_code?: number, _reason?: string): void {
    // Connection close handling logic - clear active turn on close
    (this as any)._activeTurnId = undefined;
  }

  // Mock methods for audio testing - these would be implemented by the actual session
  async sendInputAudio?(audioData: Uint8Array, options?: AudioOptions): Promise<void> {
    if (options?.abortSignal?.aborted) {
      throw new Error("Aborted");
    }

    if (!this._mockWebSocket || this._mockWebSocket.state !== 1) {
      throw new Error("Session not connected");
    }

    if (!audioData) {
      throw new Error("Invalid audio data");
    }

    const base64Audio = audioToBase64(audioData);
    const message = JSON.stringify({
      type: TestConstants.EVENT_TYPES.INPUT_AUDIO_BUFFER_APPEND,
      audio: base64Audio,
    });

    await this._mockWebSocket.send(message, options?.abortSignal);
  }

  async sendInputAudioStream?(
    stream: ReadableStream<Uint8Array>,
    options?: AudioOptions,
  ): Promise<void> {
    if (!this._mockWebSocket || this._mockWebSocket.state !== 1) {
      throw new Error("Session not connected");
    }

    const reader = stream.getReader();

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        if (value) {
          await this.sendInputAudio!(value, options);
        }
      }
    } finally {
      reader.releaseLock();
    }
  }

  async startAudioTurn(_options: TurnOptions = {}): Promise<string> {
    if (!this._mockWebSocket || this._mockWebSocket.state !== 1) {
      throw new Error("Session not connected");
    }

    // Check if already in turn
    if ((this as any)._activeTurnId) {
      throw new Error("Audio turn already active");
    }

    const turnId = "test-turn-id-" + Date.now();
    const message = JSON.stringify({
      type: TestConstants.EVENT_TYPES.INPUT_AUDIO_TURN_START,
    });

    await this._mockWebSocket.send(message);
    (this as any)._activeTurnId = turnId;
    return turnId;
  }

  async endAudioTurn(_turnId?: string, _options: SendEventOptions = {}): Promise<void> {
    if (!this._mockWebSocket || this._mockWebSocket.state !== 1) {
      throw new Error("Session not connected");
    }

    if (!(this as any)._activeTurnId) {
      throw new Error("No active audio turn");
    }

    const message = JSON.stringify({
      type: TestConstants.EVENT_TYPES.INPUT_AUDIO_TURN_END,
    });

    await this._mockWebSocket.send(message);
    (this as any)._activeTurnId = undefined;
  }

  async clearInputAudioBuffer(_options: SendEventOptions = {}): Promise<void> {
    if (!this._mockWebSocket || this._mockWebSocket.state !== 1) {
      throw new Error("Session not connected");
    }

    const message = JSON.stringify({
      type: "input_audio_buffer.clear",
    });

    await this._mockWebSocket.send(message);
  }

  // Additional mock methods for testing
  async configureSession?(config: Record<string, unknown>): Promise<void> {
    if (!this._mockWebSocket || this._mockWebSocket.state !== 1) {
      throw new Error("Session not connected");
    }

    const message = JSON.stringify({
      type: "session.update",
      session: config,
    });

    await this._mockWebSocket.send(message);
  }

  async addConversationItem(
    item: ConversationRequestItem,
    _options: SendEventOptions = {},
  ): Promise<void> {
    if (!this._mockWebSocket || this._mockWebSocket.state !== 1) {
      throw new Error("Session not connected");
    }

    const message = JSON.stringify({
      type: TestConstants.EVENT_TYPES.CONVERSATION_ITEM_CREATE,
      item: item,
    });

    await this._mockWebSocket.send(message);
  }

  async createResponse?(): Promise<void> {
    if (!this._mockWebSocket || this._mockWebSocket.state !== 1) {
      throw new Error("Session not connected");
    }

    const message = JSON.stringify({
      type: TestConstants.EVENT_TYPES.RESPONSE_CREATE,
    });

    await this._mockWebSocket.send(message);
  }

  /**
   * Clear active turn state for testing (simulates error recovery)
   */
  clearActiveTurn(): void {
    (this as any)._activeTurnId = undefined;
  }

  async sendFunctionCallOutput?(callId: string, output: string): Promise<void> {
    if (!callId) throw new Error("Call ID is required");
    if (!output) throw new Error("Function output is required");

    if (!this._mockWebSocket || this._mockWebSocket.state !== 1) {
      throw new Error("Session not connected");
    }

    const message = JSON.stringify({
      type: TestConstants.EVENT_TYPES.FUNCTION_CALL_OUTPUT,
      call_id: callId,
      output: output,
    });

    await this._mockWebSocket.send(message);

    // Remove from active calls
    const activeCalls = (this as any)._activeFunctionCalls || [];
    const index = activeCalls.findIndex((call: any) => call.callId === callId);
    if (index >= 0) {
      activeCalls.splice(index, 1);
    }
  }

  async sendFunctionCallOutputChunk?(callId: string, chunk: string): Promise<void> {
    if (!callId) throw new Error("Call ID is required");
    if (!chunk) throw new Error("Chunk is required");

    if (!this._mockWebSocket || this._mockWebSocket.state !== 1) {
      throw new Error("Session not connected");
    }

    const message = JSON.stringify({
      type: TestConstants.EVENT_TYPES.FUNCTION_CALL_OUTPUT,
      call_id: callId,
      output: chunk,
      is_chunk: true,
    });

    await this._mockWebSocket.send(message);
  }

  async sendFunctionCallOutputBinary?(callId: string, data: Uint8Array): Promise<void> {
    if (!callId) throw new Error("Call ID is required");
    if (!data) throw new Error("Data is required");

    const base64Data = audioToBase64(data);
    await this.sendFunctionCallOutput!(callId, base64Data);
  }

  onServerEvent?(eventType: string, handler: (event: any) => void): () => void {
    if (!this._mockWebSocket) {
      throw new Error("No WebSocket available");
    }

    const messageHandler = (data: string | ArrayBuffer): void => {
      if (typeof data === "string") {
        try {
          const event = JSON.parse(data);
          if (event.type === eventType) {
            handler(event);

            // Track function calls
            if (event.type === TestConstants.EVENT_TYPES.FUNCTION_CALL_ARGUMENTS_DONE) {
              const activeCalls = (this as any)._activeFunctionCalls || [];
              activeCalls.push({
                callId: event.call_id,
                functionName: event.name,
                arguments: event.arguments,
              });
              (this as any)._activeFunctionCalls = activeCalls;
            }
          }
        } catch {
          // Ignore invalid JSON
        }
      }
    };

    this._mockWebSocket.onMessage(messageHandler);

    // Store handlers for cleanup
    if (!(this as any)._messageHandlers) {
      (this as any)._messageHandlers = [];
    }
    (this as any)._messageHandlers.push(messageHandler);

    // Return unsubscribe function that actually removes the handler
    return () => {
      this._mockWebSocket?.removeMessageHandler?.(messageHandler);
    };
  }

  onError?(handler: (error: Error) => void): () => void {
    if (!this._mockWebSocket) {
      throw new Error("No WebSocket available");
    }

    this._mockWebSocket.onError(handler);

    // Return unsubscribe function
    return () => {
      // In a real implementation, this would remove the specific handler
    };
  }

  async waitForFunctionCall?(callId: string, timeoutInMs: number = 5000): Promise<any> {
    const startTime = Date.now();

    while (Date.now() - startTime < timeoutInMs) {
      const activeCalls = (this as any)._activeFunctionCalls || [];
      const call = activeCalls.find((c: any) => c.callId === callId);
      if (call) {
        return call;
      }
      await new Promise((resolve) => setTimeout(resolve, 10));
    }

    throw new Error("Function call timeout");
  }

  getActiveFunctionCalls?(): any[] {
    return (this as any)._activeFunctionCalls || [];
  }

  async cancelFunctionCall?(callId: string): Promise<void> {
    const activeCalls = (this as any)._activeFunctionCalls || [];
    const index = activeCalls.findIndex((call: any) => call.callId === callId);
    if (index >= 0) {
      activeCalls.splice(index, 1);
    }
  }
}

/**
 * Factory for creating test sessions with mock WebSocket infrastructure
 */
export class TestSessionFactory {
  /**
   * Create a VoiceLiveClient with mock credentials for testing
   */
  static createTestClient(
    endpoint: string = TestConstants.ENDPOINT,
    useTokenCredential: boolean = true,
  ): VoiceLiveClient {
    const credential = useTokenCredential ? new MockTokenCredential() : new MockKeyCredential();

    return new VoiceLiveClient(endpoint, credential, {
      apiVersion: "2024-10-01-preview",
    });
  }

  /**
   * Create a testable session with injected mock WebSocket
   */
  static createSessionWithMockWebSocket(): {
    session: TestableVoiceLiveSession;
    mockWebSocket: MockVoiceLiveWebSocket;
    client: VoiceLiveClient;
  } {
    const client = this.createTestClient();
    const credential = new MockTokenCredential();
    const session = new TestableVoiceLiveSession(
      TestConstants.ENDPOINT,
      credential,
      "2025-10-01",
      TestConstants.MODEL_NAME,
    );
    const mockWebSocket = new MockVoiceLiveWebSocket();

    session.setMockWebSocket(mockWebSocket);

    return {
      session,
      mockWebSocket,
      client,
    };
  }

  /**
   * Create a session factory function that returns mock WebSocket
   */
  static createMockWebSocketFactory(
    mockWebSocket: MockVoiceLiveWebSocket,
  ): () => MockVoiceLiveWebSocket {
    return () => mockWebSocket;
  }

  /**
   * Create session with pre-configured test options
   */
  static createConfiguredTestSession(): {
    session: TestableVoiceLiveSession;
    mockWebSocket: MockVoiceLiveWebSocket;
    client: VoiceLiveClient;
  } {
    const { session, mockWebSocket, client } = this.createSessionWithMockWebSocket();

    // Pre-configure the session for typical test scenarios
    // Add any default configuration here

    return { session, mockWebSocket, client };
  }

  /**
   * Wait for session to reach a specific state
   */
  static async waitForSessionState(
    session: VoiceLiveSession,
    targetState: string,
    timeoutInMs: number = TestConstants.DEFAULT_TIMEOUT_MS,
  ): Promise<void> {
    const startTime = Date.now();

    while (Date.now() - startTime < timeoutInMs) {
      // Check session state - this depends on the actual session API
      // For now, we'll use a placeholder
      const currentState = (session as any).connectionState;
      if (currentState === targetState) {
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 10));
    }

    throw new Error(`Timeout waiting for session state: ${targetState}`);
  }

  /**
   * Create multiple test sessions for concurrent testing
   */
  static createMultipleSessions(count: number): Array<{
    session: TestableVoiceLiveSession;
    mockWebSocket: MockVoiceLiveWebSocket;
    client: VoiceLiveClient;
  }> {
    const sessions = [];
    for (let i = 0; i < count; i++) {
      sessions.push(this.createSessionWithMockWebSocket());
    }
    return sessions;
  }
}

/**
 * Test utilities for session lifecycle management
 */
export class SessionTestUtils {
  /**
   * Verify that a session sends the correct connection messages
   */
  static async verifyConnectionSequence(
    mockWebSocket: MockVoiceLiveWebSocket,
    expectedMessageTypes: string[],
  ): Promise<void> {
    // Wait for all expected messages
    await mockWebSocket.waitForMessages(expectedMessageTypes.length);

    const sentMessages = mockWebSocket.getSentMessages();

    if (sentMessages.length !== expectedMessageTypes.length) {
      throw new Error(
        `Expected ${expectedMessageTypes.length} messages, got ${sentMessages.length}`,
      );
    }

    for (let i = 0; i < expectedMessageTypes.length; i++) {
      const message = sentMessages[i];
      const messageType = JSON.parse(message).type;

      if (messageType !== expectedMessageTypes[i]) {
        throw new Error(
          `Expected message ${i} to be type '${expectedMessageTypes[i]}', got '${messageType}'`,
        );
      }
    }
  }

  /**
   * Simulate server event sequence
   */
  static async simulateServerEvents(
    mockWebSocket: MockVoiceLiveWebSocket,
    events: string[],
  ): Promise<void> {
    for (const event of events) {
      mockWebSocket.enqueueInboundMessage(event);
      // Small delay between events to simulate realistic timing
      await new Promise((resolve) => setTimeout(resolve, 1));
    }
  }

  /**
   * Extract and validate session configuration from sent messages
   */
  static extractSessionConfig(mockWebSocket: MockVoiceLiveWebSocket): any {
    const sessionUpdateMessages = mockWebSocket.getMessagesByType("session.update");

    if (sessionUpdateMessages.length === 0) {
      throw new Error("No session.update messages found");
    }

    return sessionUpdateMessages[sessionUpdateMessages.length - 1].session;
  }
}
