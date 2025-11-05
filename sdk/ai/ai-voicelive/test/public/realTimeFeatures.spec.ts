// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, beforeEach } from 'vitest';
import { VoiceLiveClient } from '../../src/index.js';
import { MockTokenCredential } from '@azure-tools/test-credential';

describe('Real-time Features Integration', () => {
  let client: VoiceLiveClient;
  let credential: MockTokenCredential;

  beforeEach(() => {
    credential = new MockTokenCredential();
    client = new VoiceLiveClient('https://test.voice-live.com', credential);
  });

  it('should provide access to enhanced event system', () => {
    expect(client.events).toBeDefined();
    expect(typeof client.events.createEventStream).toBe('function');
    expect(typeof client.events.waitForEvent).toBe('function');
    expect(typeof client.events.createFilteredEventStream).toBe('function');
  });

  it('should provide access to response streaming', () => {
    expect(client.streaming).toBeDefined();
    expect(typeof client.streaming.createResponseStream).toBe('function');
    expect(typeof client.streaming.createTextStream).toBe('function');
    expect(typeof client.streaming.createAudioStream).toBe('function');
    expect(typeof client.streaming.createAnimationStream).toBe('function');
  });

  it('should provide access to async iterators', () => {
    expect(client.asyncIterators).toBeDefined();
    expect(typeof client.asyncIterators.streamText).toBe('function');
    expect(typeof client.asyncIterators.streamAudio).toBe('function');
    expect(typeof client.asyncIterators.streamAnimation).toBe('function');
    expect(typeof client.asyncIterators.listConversationHistory).toBe('function');
  });

  it('should provide access to audio processor', () => {
    expect(client.audioProcessor).toBeDefined();
    expect(typeof client.audioProcessor.processIncomingAudio).toBe('function');
    expect(typeof client.audioProcessor.audioToBase64).toBe('function');
    expect(typeof client.audioProcessor.base64ToAudio).toBe('function');
    expect(client.audioProcessor.defaultFormat).toBeDefined();
  });

  it('should provide access to video processor', () => {
    expect(client.videoProcessor).toBeDefined();
    expect(typeof client.videoProcessor.processAvatarFrame).toBe('function');
    expect(typeof client.videoProcessor.frameToBase64).toBe('function');
    expect(typeof client.videoProcessor.interpolateAvatarFrames).toBe('function');
    expect(typeof client.videoProcessor.validateAvatarFrame).toBe('function');
  });

  it('should provide access to avatar manager', () => {
    expect(client.avatarManager).toBeDefined();
    expect(typeof client.avatarManager.setAvatarConfig).toBe('function');
    expect(typeof client.avatarManager.setEventHandlers).toBe('function');
    expect(typeof client.avatarManager.getInterpolatedBlendshapes).toBe('function');
    expect(typeof client.avatarManager.getActiveVisemes).toBe('function');
    expect(client.avatarManager.currentState).toBeDefined();
  });

  it('should provide waitForEvent convenience method', () => {
    expect(typeof client.waitForEvent).toBe('function');
  });

  it('should create text stream iterator', async () => {
    const textIterator = client.asyncIterators.streamText({ responseId: 'test-response' });
    expect(textIterator).toBeDefined();
    expect(typeof textIterator[Symbol.asyncIterator]).toBe('function');
  });

  it('should create audio stream iterator', async () => {
    const audioIterator = client.asyncIterators.streamAudio('test-response');
    expect(audioIterator).toBeDefined();
    expect(typeof audioIterator[Symbol.asyncIterator]).toBe('function');
  });

  it('should create animation stream iterator', async () => {
    const animationIterator = client.asyncIterators.streamAnimation('test-response');
    expect(animationIterator).toBeDefined();
    expect(typeof animationIterator[Symbol.asyncIterator]).toBe('function');
  });

  it('should process audio data correctly', () => {
    const testAudioData = new ArrayBuffer(1024);
    const audioFormat = {
      sampleRate: 24000,
      channels: 1,
      bitDepth: 16,
      encoding: 'pcm' as const
    };

    const processed = client.audioProcessor.processIncomingAudio(testAudioData, audioFormat);
    
    expect(processed.data).toBeDefined();
    expect(processed.format).toEqual(audioFormat);
    expect(processed.timestamp).toBeGreaterThan(0);
    expect(processed.duration).toBeGreaterThan(0);
  });

  it('should process avatar frames correctly', () => {
    const blendshapes = { 'eyeBlink_L': 0.5, 'eyeBlink_R': 0.5 };
    const visemes = [{ id: 'A', weight: 0.8 }];
    const timestamp = Date.now();

    const avatarFrame = client.videoProcessor.processAvatarFrame(blendshapes, visemes, timestamp);
    
    expect(avatarFrame.blendshapes).toEqual(blendshapes);
    expect(avatarFrame.visemes).toEqual(visemes);
    expect(avatarFrame.timestamp).toBe(timestamp);
  });

  it('should validate avatar frames', () => {
    const validFrame = {
      blendshapes: { 'eyeBlink_L': 0.5 },
      visemes: [{ id: 'A', weight: 0.8 }],
      timestamp: Date.now()
    };

    const validation = client.videoProcessor.validateAvatarFrame(validFrame);
    expect(validation.isValid).toBe(true);
    expect(validation.errors).toHaveLength(0);

    const invalidFrame = {
      blendshapes: { 'eyeBlink_L': 2.0 }, // Invalid range
      visemes: [{ id: 'A', weight: -0.5 }], // Invalid range
      timestamp: Date.now()
    };

    const invalidValidation = client.videoProcessor.validateAvatarFrame(invalidFrame);
    expect(invalidValidation.isValid).toBe(false);
    expect(invalidValidation.errors.length).toBeGreaterThan(0);
  });
});
