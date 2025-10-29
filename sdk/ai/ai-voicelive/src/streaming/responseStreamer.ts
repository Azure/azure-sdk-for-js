// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { 
  ServerEventResponseTextDelta,
  ServerEventResponseAudioDelta,
  ServerEventResponseAnimationBlendshapeDelta
} from '../models/index.js';
import type { EnhancedVoiceLiveEventEmitter } from '../events/enhancedEventEmitter.js';

export interface TextStreamChunk {
  type: 'text';
  delta: string;
  responseId: string;
  itemId?: string;
  timestamp: number;
}

export interface AudioStreamChunk {
  type: 'audio';
  data: ArrayBuffer;
  responseId: string;
  itemId?: string;
  timestamp: number;
  format?: string;
}

export interface AnimationStreamChunk {
  type: 'animation';
  frames?: number[][] | string;
  frameIndex?: number;
  responseId: string;
  timestamp: number;
}

export type StreamChunk = TextStreamChunk | AudioStreamChunk | AnimationStreamChunk;

export interface StreamingOptions {
  /** Enable text streaming */
  includeText?: boolean;
  /** Enable audio streaming */
  includeAudio?: boolean;
  /** Enable animation streaming */
  includeAnimation?: boolean;
  /** Buffer size for audio chunks */
  audioBufferSize?: number;
  /** Target latency in milliseconds */
  targetLatencyMs?: number;
  /** Abort signal */
  abortSignal?: AbortSignal;
}

/**
 * Handles real-time streaming of response data with buffering and flow control
 */
export class ResponseStreamer {
  constructor(private readonly _eventEmitter: EnhancedVoiceLiveEventEmitter) {}

  /**
   * Creates a unified stream of all response data
   */
  createResponseStream(options: StreamingOptions = {}): AsyncIterableIterator<StreamChunk> {
    return this._createUnifiedStream(options);
  }

  /**
   * Creates a text-only stream
   */
  createTextStream(responseId?: string): AsyncIterableIterator<TextStreamChunk> {
    return this._createTextStream(responseId);
  }

  /**
   * Creates an audio-only stream
   */
  createAudioStream(responseId?: string): AsyncIterableIterator<AudioStreamChunk> {
    return this._createAudioStream(responseId);
  }

  /**
   * Creates an animation-only stream
   */
  createAnimationStream(responseId?: string): AsyncIterableIterator<AnimationStreamChunk> {
    return this._createAnimationStream(responseId);
  }

  private async* _createUnifiedStream(options: StreamingOptions): AsyncIterableIterator<StreamChunk> {
    const streams: AsyncIterableIterator<StreamChunk>[] = [];

    if (options.includeText !== false) {
      streams.push(this._createTextStream());
    }

    if (options.includeAudio !== false) {
      streams.push(this._createAudioStream());
    }

    if (options.includeAnimation !== false) {
      streams.push(this._createAnimationStream());
    }

    // Merge all streams with proper ordering
    yield* this._mergeStreams(streams, options.abortSignal);
  }

  private async* _createTextStream(responseId?: string): AsyncIterableIterator<TextStreamChunk> {
    const eventStream = this._eventEmitter.createEventStream('server.response.text.delta', {
      filter: responseId ? (event: ServerEventResponseTextDelta) => event.responseId === responseId : undefined
    });

    for await (const event of eventStream) {
      yield {
        type: 'text',
        delta: event.delta,
        responseId: event.responseId,
        itemId: event.itemId,
        timestamp: Date.now()
      };
    }
  }

  private async* _createAudioStream(responseId?: string): AsyncIterableIterator<AudioStreamChunk> {
    const eventStream = this._eventEmitter.createEventStream('server.response.audio.delta', {
      filter: responseId ? (event: ServerEventResponseAudioDelta) => event.responseId === responseId : undefined
    });

    for await (const event of eventStream) {
      // Delta is already a Uint8Array, convert to ArrayBuffer
      const audioData = event.delta.buffer instanceof ArrayBuffer 
        ? event.delta.buffer.slice(event.delta.byteOffset, event.delta.byteOffset + event.delta.byteLength)
        : new ArrayBuffer(0); // Fallback for SharedArrayBuffer case
      
      yield {
        type: 'audio',
        data: audioData,
        responseId: event.responseId,
        itemId: event.itemId,
        timestamp: Date.now()
      };
    }
  }

  private async* _createAnimationStream(responseId?: string): AsyncIterableIterator<AnimationStreamChunk> {
    // Listen for blendshape events
    const blendshapeStream = this._eventEmitter.createEventStream('server.response.animation.blendshape.delta', {
      filter: responseId ? (event: ServerEventResponseAnimationBlendshapeDelta) => event.responseId === responseId : undefined
    });

    for await (const event of blendshapeStream) {
      yield {
        type: 'animation',
        frames: event.frames,
        frameIndex: event.frameIndex,
        responseId: event.responseId,
        timestamp: Date.now()
      };
    }
  }

  private async* _mergeStreams(
    streams: AsyncIterableIterator<StreamChunk>[], 
    abortSignal?: AbortSignal
  ): AsyncIterableIterator<StreamChunk> {
    const iterators = streams.map(stream => stream[Symbol.asyncIterator]());
    const pending = new Map<AsyncIterator<StreamChunk>, Promise<IteratorResult<StreamChunk>>>();

    // Initialize all iterators
    for (const iterator of iterators) {
      pending.set(iterator, iterator.next());
    }

    try {
      while (pending.size > 0) {
        // Check for abort signal
        if (abortSignal?.aborted) {
          break;
        }

        // Wait for the first iterator to yield a value
        const promises = Array.from(pending.values());
        const winner = await Promise.race(promises);
        
        if (winner.done) {
          // Remove completed iterator
          for (const [iterator, promise] of pending) {
            if (await promise === winner) {
              pending.delete(iterator);
              break;
            }
          }
        } else {
          // Yield the value and get next from same iterator
          yield winner.value;
          
          for (const [iterator, promise] of pending) {
            if (await promise === winner) {
              pending.set(iterator, iterator.next());
              break;
            }
          }
        }
      }
    } finally {
      // Clean up any remaining iterators
      for (const iterator of iterators) {
        try {
          if (iterator.return) {
            await iterator.return();
          }
        } catch {
          // Ignore cleanup errors
        }
      }
    }
  }
}