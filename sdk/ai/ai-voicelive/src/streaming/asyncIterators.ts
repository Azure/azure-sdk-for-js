// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EnhancedVoiceLiveEventEmitter } from '../events/enhancedEventEmitter.js';

export interface ConversationHistoryOptions {
  /** Maximum number of items per page */
  maxPageSize?: number;
  /** Start from a specific item ID */
  startFromId?: string;
  /** Filter items by type */
  itemType?: string;
  /** Include only items from specific participants */
  participantIds?: string[];
}

export interface StreamingTextOptions {
  /** Response ID to stream */
  responseId?: string;
  /** Buffer incoming text chunks */
  bufferChunks?: boolean;
  /** Chunk timeout in milliseconds */
  chunkTimeoutMs?: number;
}

export interface PagedResult<T> {
  items: T[];
  hasMore: boolean;
  nextPageId?: string;
}

export interface AsyncIterableWithPages<T> extends AsyncIterable<T> {
  byPage(settings?: { maxPageSize?: number }): AsyncIterableIterator<PagedResult<T>>;
}

/**
 * Provides async iteration patterns for Voice Live data
 */
export class VoiceLiveAsyncIterators {
  constructor(private readonly _eventEmitter: EnhancedVoiceLiveEventEmitter) {}

  /**
   * Creates an async iterator for conversation history (pagination pattern)
   */
  listConversationHistory(
    options: ConversationHistoryOptions = {}
  ): AsyncIterableWithPages<any> { // TODO: Use proper ConversationItem type when available
    return this._createConversationIterator(options);
  }

  /**
   * Creates an async iterator for streaming text responses
   */
  async* streamText(options: StreamingTextOptions = {}): AsyncIterableIterator<string> {
    const eventStream = this._eventEmitter.createEventStream('server.response.text.delta', {
      filter: options.responseId ? 
        (event: any) => event.responseId === options.responseId : 
        undefined
    });

    let textBuffer = '';
    let lastChunkTime = Date.now();

    for await (const event of eventStream) {
      textBuffer += event.delta;
      
      if (options.bufferChunks) {
        const now = Date.now();
        const timeSinceLastChunk = now - lastChunkTime;
        
        // Yield buffered text if timeout reached or significant chunk accumulated
        if (timeSinceLastChunk >= (options.chunkTimeoutMs || 100) || textBuffer.length >= 50) {
          yield textBuffer;
          textBuffer = '';
          lastChunkTime = now;
        }
      } else {
        // Yield each delta immediately
        yield event.delta;
      }
    }

    // Yield any remaining buffered text
    if (textBuffer) {
      yield textBuffer;
    }
  }

  /**
   * Creates an async iterator for streaming audio data
   */
  async* streamAudio(responseId?: string): AsyncIterableIterator<ArrayBuffer> {
    const eventStream = this._eventEmitter.createEventStream('server.response.audio.delta', {
      filter: responseId ? (event: any) => event.responseId === responseId : undefined
    });

    for await (const event of eventStream) {
      // Delta is already a Uint8Array, convert to ArrayBuffer
      const audioData = event.delta.buffer instanceof ArrayBuffer 
        ? event.delta.buffer.slice(event.delta.byteOffset, event.delta.byteOffset + event.delta.byteLength)
        : new ArrayBuffer(0);
      yield audioData;
    }
  }

  /**
   * Creates an async iterator for animation data
   */
  async* streamAnimation(responseId?: string): AsyncIterableIterator<{
    frames?: number[][] | string;
    frameIndex?: number;
    timestamp: number;
  }> {
    const blendshapeStream = this._eventEmitter.createEventStream('server.response.animation.blendshape.delta', {
      filter: responseId ? (event: any) => event.responseId === responseId : undefined
    });

    for await (const event of blendshapeStream) {
      yield {
        frames: event.frames,
        frameIndex: event.frameIndex,
        timestamp: Date.now()
      };
    }
  }

  /**
   * Creates a combined async iterator for all response data
   */
  async* streamResponse(responseId: string): AsyncIterableIterator<{
    type: 'text' | 'audio' | 'animation';
    data: any;
    timestamp: number;
  }> {
    // For now, just stream text data
    // In production, this would merge multiple streams with proper temporal ordering
    for await (const text of this.streamText({ responseId })) {
      yield {
        type: 'text',
        data: text,
        timestamp: Date.now()
      };
    }
  }

  private _createConversationIterator(
    options: ConversationHistoryOptions
  ): AsyncIterableWithPages<any> {
    const iterator = {
      async* [Symbol.asyncIterator]() {
        let hasMore = true;
        let pageId = options.startFromId;

        while (hasMore) {
          const page = await this._fetchConversationPage(pageId, options);
          
          for (const item of page.items) {
            yield item;
          }

          hasMore = page.hasMore;
          pageId = page.nextPageId;
        }
      },

      async* byPage(settings?: { maxPageSize?: number }) {
        let hasMore = true;
        let pageId = options.startFromId;
        const pageSize = settings?.maxPageSize || options.maxPageSize || 50;

        while (hasMore) {
          const page = await this._fetchConversationPage(pageId, { ...options, maxPageSize: pageSize });
          yield page;

          hasMore = page.hasMore;
          pageId = page.nextPageId;
        }
      },

      _fetchConversationPage: async (_pageId?: string, _opts?: ConversationHistoryOptions): Promise<PagedResult<any>> => {
        // This would integrate with the client's conversation manager
        // For now, return empty results as the actual implementation depends on server API
        return {
          items: [],
          hasMore: false,
          nextPageId: undefined
        };
      }
    };

    return iterator as AsyncIterableWithPages<any>;
  }
}