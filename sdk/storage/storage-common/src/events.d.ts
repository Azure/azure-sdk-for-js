// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Ambient type declarations for the 'events' npm package.
// The 'events' package is a browser-compatible polyfill for Node.js EventEmitter.
// This declaration provides minimal types for browser builds without requiring @types/node.
declare module "events" {
  class EventEmitter {
    on(eventName: string, listener: (...args: any[]) => void): this;
    emit(eventName: string, ...args: any[]): boolean;
    removeListener(eventName: string, listener: (...args: any[]) => void): this;
  }
  export { EventEmitter };
}
