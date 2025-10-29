// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ServerEventResponseAnimationBlendshapeDelta,
  ServerEventResponseAnimationVisemeDelta,
  ServerEventSessionAvatarConnecting
} from '../models/index.js';
import type { EnhancedVoiceLiveEventEmitter } from '../events/enhancedEventEmitter.js';
import type { VideoProcessor, AvatarFrame } from '../media/videoProcessor.js';

export interface AvatarConfiguration {
  /** Avatar ID or configuration */
  id: string;
  /** Avatar display name */
  name?: string;
  /** Avatar-specific settings */
  settings?: Record<string, any>;
}

export interface AvatarState {
  isConnected: boolean;
  config?: AvatarConfiguration;
  currentBlendshapes: Record<string, number>;
  currentVisemes: Array<{ id: string; weight: number; timestamp: number }>;
  lastUpdate: number;
  connectionStatus: 'disconnected' | 'connecting' | 'connected' | 'error';
}

export interface AvatarEventHandlers {
  onBlendshapeUpdate?: (blendshapes: Record<string, number>) => void;
  onVisemeUpdate?: (visemes: Array<{ id: string; weight: number }>) => void;
  onAvatarStateChange?: (state: AvatarState) => void;
  onConnectionStatusChange?: (status: AvatarState['connectionStatus']) => void;
}

export interface BlendshapeFrame {
  data: Record<string, number>;
  timestamp: number;
  frameIndex: number;
}

export interface VisemeFrame {
  data: Array<{ id: string; weight: number }>;
  timestamp: number;
}

/**
 * Manages avatar state and animation events for Voice Live
 */
export class AvatarManager {
  private _state: AvatarState = {
    isConnected: false,
    currentBlendshapes: {},
    currentVisemes: [],
    lastUpdate: 0,
    connectionStatus: 'disconnected'
  };

  private readonly _handlers: AvatarEventHandlers = {};
  private readonly _blendshapeBuffer: BlendshapeFrame[] = [];
  private readonly _visemeBuffer: VisemeFrame[] = [];
  private readonly _maxBufferSize = 60; // Keep 1 second at 60fps

  constructor(
    private readonly _eventEmitter: EnhancedVoiceLiveEventEmitter,
    private readonly _videoProcessor: VideoProcessor
  ) {
    this._setupEventHandlers();
  }

  /**
   * Set avatar configuration
   */
  setAvatarConfig(config: AvatarConfiguration): void {
    this._state.config = config;
    this._notifyStateChange();
  }

  /**
   * Set event handlers for avatar events
   */
  setEventHandlers(handlers: AvatarEventHandlers): void {
    Object.assign(this._handlers, handlers);
  }

  /**
   * Handle avatar connecting event
   */
  handleAvatarConnecting(_event: ServerEventSessionAvatarConnecting): void {
    this._updateConnectionStatus('connecting');
    this._state.isConnected = false;
    this._notifyStateChange();
  }

  /**
   * Handle blendshape update event
   */
  handleBlendshapeUpdate(event: ServerEventResponseAnimationBlendshapeDelta): void {
    const timestamp = Date.now();
    
    // Parse blendshapes from frames data
    const blendshapes = this._parseBlendshapesFromFrames(event.frames, event.frameIndex);
    
    // Update current state
    this._state.currentBlendshapes = {
      ...this._state.currentBlendshapes,
      ...blendshapes
    };
    this._state.lastUpdate = timestamp;

    // Buffer for smoothing
    this._blendshapeBuffer.push({
      data: { ...blendshapes },
      timestamp,
      frameIndex: event.frameIndex
    });

    // Limit buffer size
    if (this._blendshapeBuffer.length > this._maxBufferSize) {
      this._blendshapeBuffer.shift();
    }

    // Notify handlers
    this._handlers.onBlendshapeUpdate?.(this._state.currentBlendshapes);
    this._notifyStateChange();
  }

  /**
   * Handle viseme update event
   */
  handleVisemeUpdate(event: ServerEventResponseAnimationVisemeDelta): void {
    const timestamp = Date.now();
    
    // Parse visemes from event
    const visemes = this._parseVisemesFromEvent(event);
    
    // Update current visemes
    this._state.currentVisemes = visemes.map(viseme => ({
      ...viseme,
      timestamp
    }));
    this._state.lastUpdate = timestamp;

    // Buffer for animation smoothing
    this._visemeBuffer.push({
      data: [...visemes],
      timestamp
    });

    // Limit buffer size
    if (this._visemeBuffer.length > this._maxBufferSize) {
      this._visemeBuffer.shift();
    }

    // Notify handlers
    this._handlers.onVisemeUpdate?.(this._state.currentVisemes);
    this._notifyStateChange();
  }

  /**
   * Get interpolated blendshapes for smooth animation
   */
  getInterpolatedBlendshapes(targetTime: number): Record<string, number> {
    if (this._blendshapeBuffer.length < 2) {
      return this._state.currentBlendshapes;
    }

    // Find surrounding frames
    const frames = this._blendshapeBuffer.filter(frame => 
      frame.timestamp <= targetTime + 50 && frame.timestamp >= targetTime - 50
    );

    if (frames.length === 0) {
      return this._state.currentBlendshapes;
    }

    // Use the latest frame within tolerance
    const latest = frames[frames.length - 1];
    return latest.data;
  }

  /**
   * Get active visemes at a specific time
   */
  getActiveVisemes(targetTime: number): Array<{ id: string; weight: number }> {
    const tolerance = 100; // 100ms tolerance
    const activeVisemes = this._state.currentVisemes.filter(viseme => 
      Math.abs(viseme.timestamp - targetTime) <= tolerance
    );

    return activeVisemes.map(viseme => ({
      id: viseme.id,
      weight: viseme.weight
    }));
  }

  /**
   * Create an avatar frame combining current blendshapes and visemes
   */
  createCurrentAvatarFrame(): AvatarFrame {
    return this._videoProcessor.processAvatarFrame(
      this._state.currentBlendshapes,
      this._state.currentVisemes.map(v => ({ id: v.id, weight: v.weight })),
      Date.now()
    );
  }

  /**
   * Get interpolated avatar frame for a specific time
   */
  getInterpolatedAvatarFrame(targetTime: number): AvatarFrame {
    const blendshapes = this.getInterpolatedBlendshapes(targetTime);
    const visemes = this.getActiveVisemes(targetTime);

    return this._videoProcessor.processAvatarFrame(
      blendshapes,
      visemes,
      targetTime
    );
  }

  /**
   * Get current avatar state
   */
  get currentState(): AvatarState {
    return { ...this._state };
  }

  /**
   * Get connection status
   */
  get connectionStatus(): AvatarState['connectionStatus'] {
    return this._state.connectionStatus;
  }

  private _setupEventHandlers(): void {
    this._eventEmitter.on('server.session.avatar.connecting', (event) => {
      this.handleAvatarConnecting(event);
    });

    this._eventEmitter.on('server.response.animation.blendshape.delta', (event) => {
      this.handleBlendshapeUpdate(event);
    });

    this._eventEmitter.on('server.response.animation.viseme.delta', (event) => {
      this.handleVisemeUpdate(event);
    });
  }

  private _updateConnectionStatus(status: AvatarState['connectionStatus']): void {
    if (this._state.connectionStatus !== status) {
      this._state.connectionStatus = status;
      this._handlers.onConnectionStatusChange?.(status);
    }
  }

  private _notifyStateChange(): void {
    this._handlers.onAvatarStateChange?.(this.currentState);
  }

  private _parseBlendshapesFromFrames(frames: number[][] | string, frameIndex: number): Record<string, number> {
    // This is a simplified implementation
    // In practice, you'd need to parse the frames data according to the avatar format
    if (typeof frames === 'string') {
      try {
        const parsed = JSON.parse(frames);
        if (Array.isArray(parsed) && parsed[frameIndex]) {
          return this._arrayToBlendshapes(parsed[frameIndex]);
        }
      } catch {
        // Failed to parse, return empty
      }
      return {};
    }

    if (Array.isArray(frames) && frames[frameIndex]) {
      return this._arrayToBlendshapes(frames[frameIndex]);
    }

    return {};
  }

  private _arrayToBlendshapes(frameData: number[]): Record<string, number> {
    // This would map frame data to specific blendshape names
    // For now, use generic mapping
    const blendshapes: Record<string, number> = {};
    frameData.forEach((value, index) => {
      blendshapes[`blendshape_${index}`] = value;
    });
    return blendshapes;
  }

  private _parseVisemesFromEvent(_event: ServerEventResponseAnimationVisemeDelta): Array<{ id: string; weight: number }> {
    // This would parse visemes from the event data
    // For now, return empty array as the exact structure depends on the server implementation
    return [];
  }
}