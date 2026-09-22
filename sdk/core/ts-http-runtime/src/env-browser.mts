// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Bundlers and test frameworks (e.g. vitest's `define`) may inject a `process.env`
// object into browser bundles. Declare the minimal shape on globalThis so we can
// access it type-safely without pulling in @types/node.
// Using `globalThis.process` (property access) instead of bare `process` avoids
// ReferenceError when the binding doesn't exist at all.
declare global {
  // eslint-disable-next-line no-var
  var process:
    | { env?: Record<string, string | undefined>; emitWarning?: (warning: string) => void }
    | undefined;
}

/**
 * Returns the value of the specified environment variable.
 * In browser environments, this checks for a globally-defined `process.env`
 * which may be injected by bundlers or test frameworks (e.g. vitest's `define`).
 *
 * @internal
 */
export function getEnvironmentVariable(name: string): string | undefined {
  return globalThis.process?.env?.[name];
}

/**
 * Emits a warning via `process.emitWarning` if available.
 *
 * @internal
 */
export function emitNodeWarning(warning: string): void {
  globalThis.process?.emitWarning?.(warning);
}

/**
 * A constant that indicates whether the environment the code is running is a Web Browser.
 */
// eslint-disable-next-line @azure/azure-sdk/ts-no-window
export const isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";

/**
 * A constant that indicates whether the environment the code is running is a Web Worker.
 */
export const isWebWorker =
  typeof self === "object" &&
  "importScripts" in self &&
  typeof self.importScripts === "function" &&
  (self.constructor?.name === "DedicatedWorkerGlobalScope" ||
    self.constructor?.name === "ServiceWorkerGlobalScope" ||
    self.constructor?.name === "SharedWorkerGlobalScope");

/**
 * A constant that indicates whether the environment the code is running is Deno.
 */
export const isDeno: boolean = false;

/**
 * A constant that indicates whether the environment the code is running is Bun.sh.
 */
export const isBun: boolean = false;

/**
 * A constant that indicates whether the environment the code is running is a Node.js compatible environment.
 */
export const isNodeLike: boolean = false;

/**
 * A constant that indicates whether the environment the code is running is Node.JS.
 */
export const isNodeRuntime: boolean = false;

/**
 * A constant that indicates whether the environment the code is running is in React-Native.
 */
export const isReactNative: boolean = false;
