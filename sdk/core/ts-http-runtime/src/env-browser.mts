// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Environment variables are not available in the browser.
 *
 * @internal
 */
export function getEnvironmentVariable(_name: string): string | undefined {
  return undefined;
}

/**
 * `process.emitWarning` is not available in the browser.
 *
 * @internal
 */
export function emitNodeWarning(_warning: string): void {
  // No-op in browser environments
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
