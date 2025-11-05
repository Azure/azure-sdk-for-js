// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from 'vitest';
import { VoiceLiveClient } from '../src/voiceLiveClient.js';

// Mock credential for testing
const mockCredential = {
  async getToken(_scopes: string | string[]) {
    return {
      token: 'mock-token',
      expiresOnTimestamp: Date.now() + 3600000
    };
  }
};

describe('VoiceLiveClient', () => {
  it('should create a client instance', () => {
    const client = new VoiceLiveClient(
      'https://test.voicelive.azure.com',
      mockCredential,
      {
        enableDebugLogging: true
      }
    );

    expect(client).toBeInstanceOf(VoiceLiveClient);
    expect(client.isConnected).toBe(false);
    expect(client.sessionId).toBeUndefined();
    expect(client.activeTurnId).toBeUndefined();
  });

  it('should have proper connection state before connecting', () => {
    const client = new VoiceLiveClient(
      'https://test.voicelive.azure.com',
      mockCredential
    );

    expect(client.connectionState).toBe('disconnected');
    expect(client.isConnected).toBe(false);
  });

  it('should support audio streaming options', () => {
    const client = new VoiceLiveClient(
      'https://test.voicelive.azure.com',
      mockCredential
    );

    // Test that methods exist (they will throw since not connected, but that's expected)
    expect(typeof client.sendAudio).toBe('function');
    expect(typeof client.startAudioTurn).toBe('function');
    expect(typeof client.endAudioTurn).toBe('function');
  });

  it('should support session and conversation management', () => {
    const client = new VoiceLiveClient(
      'https://test.voicelive.azure.com',  
      mockCredential
    );

    // Test that methods exist
    expect(typeof client.updateSession).toBe('function');
    expect(typeof client.addConversationItem).toBe('function');
    expect(typeof client.sendEvent).toBe('function');
  });
});
