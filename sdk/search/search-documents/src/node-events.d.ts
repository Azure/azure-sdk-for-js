// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Ambient module declaration for node:events in browser builds.
 */
declare module "node:events" {
  export class EventEmitter {
    on(event: string, listener: (...args: unknown[]) => void): this;
    removeListener(event: string, listener: (...args: unknown[]) => void): this;
    emit(event: string, ...args: unknown[]): boolean;
  }
}
