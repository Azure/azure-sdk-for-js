// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { VoiceLiveClient } from "../../src/voiceLiveClient.js";
import { VoiceLiveSession } from "../../src/voiceLiveSession.js";
import type { SendEventOptions, TurnOptions, AudioStreamOptions } from "../../src/voiceLiveSession.js";
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
  async getToken(_scopes: string | string[]): Promise<{ token: string; expiresOnTimestamp: number }> {
    return {
      token: "mock-token-" + Date.now(),
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
    model: string = TestConstants.MODEL_NAME
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
      if (typeof data === 'string') {
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
  private handleIncomingMessage(message: string): void {
    // This would normally be handled by the session's message processing logic
    // For testing, we can expose this or use events to verify message handling
  }

  /**
   * Handle connection error (protected method that we'll expose for testing)
   */
  private handleConnectionError(error: Error): void {
    // Error handling logic
  }

  /**
   * Handle connection close (protected method that we'll expose for testing)
   */
  private handleConnectionClose(code?: number, reason?: string): void {
    // Connection close handling logic
  }

  // Mock methods for audio testing - these would be implemented by the actual session
  async sendInputAudio?(audioData: Uint8Array, options?: AudioOptions): Promise<void> {
    if (!this._mockWebSocket || this._mockWebSocket.state !== 1) {
      throw new Error("Session not connected");
    }
    
    if (!audioData) {
      throw new Error("Invalid audio data");
    }
    
    const base64Audio = audioToBase64(audioData);
    const message = JSON.stringify({
      type: TestConstants.EVENT_TYPES.INPUT_AUDIO_BUFFER_APPEND,
      audio: base64Audio
    });
    
    await this._mockWebSocket.send(message);
  }

  async sendInputAudioStream?(stream: ReadableStream<Uint8Array>, options?: AudioOptions): Promise<void> {
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

  async startAudioTurn?(options?: TurnOptions): Promise<void> {
    if (!this._mockWebSocket || this._mockWebSocket.state !== 1) {
      throw new Error("Session not connected");
    }
    
    // Check if already in turn
    if ((this as any)._activeTurnId) {
      throw new Error("Audio turn already active");
    }
    
    const message = JSON.stringify({
      type: TestConstants.EVENT_TYPES.INPUT_AUDIO_TURN_START
    });
    
    await this._mockWebSocket.send(message);
    (this as any)._activeTurnId = "test-turn-id";
  }

  async endAudioTurn?(options?: TurnOptions): Promise<void> {
    if (!this._mockWebSocket || this._mockWebSocket.state !== 1) {
      throw new Error("Session not connected");
    }
    
    if (!(this as any)._activeTurnId) {
      throw new Error("No active audio turn");
    }
    
    const message = JSON.stringify({
      type: TestConstants.EVENT_TYPES.INPUT_AUDIO_TURN_END
    });
    
    await this._mockWebSocket.send(message);
    (this as any)._activeTurnId = undefined;
  }

  async clearInputAudioBuffer?(options?: SendEventOptions): Promise<void> {
    if (!this._mockWebSocket || this._mockWebSocket.state !== 1) {
      throw new Error("Session not connected");
    }
    
    const message = JSON.stringify({
      type: "input_audio_buffer.clear"
    });
    
    await this._mockWebSocket.send(message);
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
    useTokenCredential: boolean = true
  ): VoiceLiveClient {
    const credential = useTokenCredential 
      ? new MockTokenCredential() 
      : new MockKeyCredential();
    
    return new VoiceLiveClient(endpoint, credential, {
      apiVersion: "2024-10-01-preview"
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
      TestConstants.MODEL_NAME
    );
    const mockWebSocket = new MockVoiceLiveWebSocket();
    
    session.setMockWebSocket(mockWebSocket);
    
    return {
      session,
      mockWebSocket,
      client
    };
  }

  /**
   * Create a session factory function that returns mock WebSocket
   */
  static createMockWebSocketFactory(mockWebSocket: MockVoiceLiveWebSocket): () => MockVoiceLiveWebSocket {
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
    timeoutMs: number = TestConstants.DEFAULT_TIMEOUT_MS
  ): Promise<void> {
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeoutMs) {
      // Check session state - this depends on the actual session API
      // For now, we'll use a placeholder
      const currentState = (session as any).connectionState;
      if (currentState === targetState) {
        return;
      }
      await new Promise(resolve => setTimeout(resolve, 10));
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
    expectedMessageTypes: string[]
  ): Promise<void> {
    // Wait for all expected messages
    await mockWebSocket.waitForMessages(expectedMessageTypes.length);
    
    const sentMessages = mockWebSocket.getSentMessages();
    
    if (sentMessages.length !== expectedMessageTypes.length) {
      throw new Error(
        `Expected ${expectedMessageTypes.length} messages, got ${sentMessages.length}`
      );
    }
    
    for (let i = 0; i < expectedMessageTypes.length; i++) {
      const message = sentMessages[i];
      const messageType = JSON.parse(message).type;
      
      if (messageType !== expectedMessageTypes[i]) {
        throw new Error(
          `Expected message ${i} to be type '${expectedMessageTypes[i]}', got '${messageType}'`
        );
      }
    }
  }

  /**
   * Simulate server event sequence
   */
  static async simulateServerEvents(
    mockWebSocket: MockVoiceLiveWebSocket,
    events: string[]
  ): Promise<void> {
    for (const event of events) {
      mockWebSocket.enqueueInboundMessage(event);
      // Small delay between events to simulate realistic timing
      await new Promise(resolve => setTimeout(resolve, 1));
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
