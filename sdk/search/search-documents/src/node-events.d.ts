// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Ambient type declarations for node:events in browser and React Native builds.
 *
 * This file enables polyfill-friendly imports of Node.js modules without requiring
 * @types/node in browser builds. The strategy:
 *
 * 1. Source code imports directly from "node:events" (standard Node.js module)
 * 2. For Node.js builds: @types/node provides full type definitions
 * 3. For browser/RN builds: This ambient file provides minimal type definitions
 * 4. At runtime: Bundlers automatically polyfill "node:events" with browser-compatible
 *    implementations (e.g., the `events` npm package or `eventemitter3`)
 *
 * This approach requires no user configuration - bundlers like webpack, Vite, and
 * esbuild handle Node.js module polyfilling automatically.
 */
declare module "node:events" {
  export class EventEmitter {
    on(eventName: string | symbol, listener: (...args: any[]) => void): this;
    once(eventName: string | symbol, listener: (...args: any[]) => void): this;
    off(eventName: string | symbol, listener: (...args: any[]) => void): this;
    removeListener(eventName: string | symbol, listener: (...args: any[]) => void): this;
    emit(eventName: string | symbol, ...args: any[]): boolean;
  }
  export default EventEmitter;
}
