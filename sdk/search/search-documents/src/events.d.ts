// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Ambient type declarations for the events module in browser and React Native builds.
// For Node.js builds, @types/node provides full type definitions.
// For browser/RN builds, bundlers polyfill the events module automatically.
declare module "events" {
  export class EventEmitter {
    on(eventName: string, listener: (...args: unknown[]) => void): this;
    emit(eventName: string, ...args: unknown[]): boolean;
    removeListener(eventName: string, listener: (...args: unknown[]) => void): this;
  }
}
