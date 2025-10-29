// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { VoiceLiveEventEmitter, type VoiceLiveEventMap } from './voiceLiveEventEmitter.js';

export interface EventFilter<T> {
  (event: T): boolean;
}

export interface EventTransform<TInput, TOutput> {
  (event: TInput): TOutput;
}

export interface EventStreamOptions {
  /** Filter function to apply to events */
  filter?: EventFilter<any>;
  /** Maximum number of events to buffer */
  bufferSize?: number;
  /** Timeout for event collection in ms */
  timeoutMs?: number;
  /** Abort signal to stop streaming */
  abortSignal?: AbortSignal;
}

/**
 * Enhanced event emitter that extends the base VoiceLiveEventEmitter with advanced patterns
 * like async iteration, event filtering, and transformation capabilities.
 */
export class EnhancedVoiceLiveEventEmitter extends VoiceLiveEventEmitter {
  
  /**
   * Creates an async iterator for events of a specific type
   */
  createEventStream<K extends keyof VoiceLiveEventMap>(
    event: K,
    options: EventStreamOptions = {}
  ): AsyncIterableIterator<VoiceLiveEventMap[K]> {
    return this._createEventIterator(event, options);
  }

  /**
   * Creates a filtered event stream
   */
  createFilteredEventStream<K extends keyof VoiceLiveEventMap>(
    event: K,
    filter: EventFilter<VoiceLiveEventMap[K]>,
    options: EventStreamOptions = {}
  ): AsyncIterableIterator<VoiceLiveEventMap[K]> {
    return this._createEventIterator(event, { ...options, filter });
  }

  /**
   * Creates a transformed event stream
   */
  createTransformedEventStream<K extends keyof VoiceLiveEventMap, TOutput>(
    event: K,
    transform: EventTransform<VoiceLiveEventMap[K], TOutput>,
    options: EventStreamOptions = {}
  ): AsyncIterableIterator<TOutput> {
    return this._createTransformedIterator(event, transform, options);
  }

  /**
   * Wait for a specific event with optional filtering
   */
  waitForEvent<K extends keyof VoiceLiveEventMap>(
    event: K,
    filter?: EventFilter<VoiceLiveEventMap[K]>,
    timeoutMs = 30000
  ): Promise<VoiceLiveEventMap[K]> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.off(event, handler);
        reject(new Error(`Timeout waiting for event: ${String(event)}`));
      }, timeoutMs);

      const handler = (eventData: VoiceLiveEventMap[K]) => {
        if (!filter || filter(eventData)) {
          clearTimeout(timeout);
          this.off(event, handler);
          resolve(eventData);
        }
      };

      this.on(event, handler);
    });
  }

  /**
   * Wait for multiple events to occur
   */
  waitForEvents<K extends keyof VoiceLiveEventMap>(
    events: K[],
    timeoutMs = 30000
  ): Promise<{ [P in K]: VoiceLiveEventMap[P] }> {
    return new Promise((resolve, reject) => {
      const results: Partial<{ [P in K]: VoiceLiveEventMap[P] }> = {};
      const handlers: Array<() => void> = [];

      const timeout = setTimeout(() => {
        handlers.forEach(cleanup => cleanup());
        reject(new Error(`Timeout waiting for events: ${events.join(', ')}`));
      }, timeoutMs);

      const checkComplete = () => {
        if (events.every(event => event in results)) {
          clearTimeout(timeout);
          handlers.forEach(cleanup => cleanup());
          resolve(results as { [P in K]: VoiceLiveEventMap[P] });
        }
      };

      events.forEach(event => {
        const handler = (eventData: VoiceLiveEventMap[typeof event]) => {
          results[event] = eventData;
          checkComplete();
        };

        this.on(event, handler);
        handlers.push(() => this.off(event, handler));
      });
    });
  }

  private async* _createEventIterator<K extends keyof VoiceLiveEventMap>(
    event: K,
    options: EventStreamOptions
  ): AsyncIterableIterator<VoiceLiveEventMap[K]> {
    const eventQueue: VoiceLiveEventMap[K][] = [];
    const resolvers: Array<(value: IteratorResult<VoiceLiveEventMap[K]>) => void> = [];
    let isComplete = false;

    const handler = (eventData: VoiceLiveEventMap[K]) => {
      if (options.filter && !options.filter(eventData)) {
        return;
      }

      if (resolvers.length > 0) {
        const resolve = resolvers.shift()!;
        resolve({ value: eventData, done: false });
      } else {
        eventQueue.push(eventData);
        // Respect buffer size
        const bufferSize = options.bufferSize || 100;
        if (eventQueue.length > bufferSize) {
          eventQueue.shift(); // Remove oldest event
        }
      }
    };

    const cleanup = () => {
      this.off(event, handler);
      isComplete = true;
      // Resolve any pending promises
      resolvers.forEach(resolve => resolve({ value: undefined, done: true }));
      resolvers.length = 0;
    };

    this.on(event, handler);

    // Handle abort signal
    if (options.abortSignal) {
      options.abortSignal.addEventListener('abort', cleanup);
    }

    // Handle timeout
    if (options.timeoutMs) {
      setTimeout(cleanup, options.timeoutMs);
    }

    try {
      while (!isComplete) {
        if (eventQueue.length > 0) {
          yield eventQueue.shift()!;
        } else {
          // Wait for next event
          const result = await new Promise<IteratorResult<VoiceLiveEventMap[K]>>(resolve => {
            if (isComplete) {
              resolve({ value: undefined, done: true });
            } else {
              resolvers.push(resolve);
            }
          });

          if (result.done) {
            break;
          }
          yield result.value;
        }
      }
    } finally {
      cleanup();
    }
  }

  private async* _createTransformedIterator<K extends keyof VoiceLiveEventMap, TOutput>(
    event: K,
    transform: EventTransform<VoiceLiveEventMap[K], TOutput>,
    options: EventStreamOptions
  ): AsyncIterableIterator<TOutput> {
    for await (const eventData of this._createEventIterator(event, options)) {
      yield transform(eventData);
    }
  }
}