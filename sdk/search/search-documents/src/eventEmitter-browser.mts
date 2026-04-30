// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * EventEmitter for browser builds.
 *
 * Browser users must set globalThis.EventEmitter to a compatible polyfill.
 *
 * @example
 * ```js
 * import EventEmitter from "eventemitter3";
 * globalThis.EventEmitter = EventEmitter;
 * ```
 */

interface EventEmitterLike {
  on(event: string, listener: (...args: unknown[]) => void): this;
  removeListener(event: string, listener: (...args: unknown[]) => void): this;
  emit(event: string, ...args: unknown[]): boolean;
}

type EventEmitterConstructor = new () => EventEmitterLike;

declare global {
  // eslint-disable-next-line no-var
  var EventEmitter: EventEmitterConstructor | undefined;
}

function getEventEmitter(): EventEmitterConstructor {
  if (globalThis.EventEmitter) {
    return globalThis.EventEmitter;
  }
  throw new Error(
    "EventEmitter is not available. Set globalThis.EventEmitter to a polyfill:\n" +
      '  import EventEmitter from "eventemitter3";\n' +
      "  globalThis.EventEmitter = EventEmitter;",
  );
}

export const EventEmitter = getEventEmitter();


