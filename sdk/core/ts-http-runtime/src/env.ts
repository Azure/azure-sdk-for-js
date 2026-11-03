// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import process from "node:process";

declare global {
  // Bun and Deno set process.versions with their runtime identifier
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessVersions {
      bun?: string;
      deno?: string;
    }
  }
}

/**
 * Returns the value of the specified environment variable.
 *
 * @internal
 */
export function getEnvironmentVariable(name: string): string | undefined {
  return process.env[name];
}

/**
 * Emits a Node.js process warning.
 *
 * @internal
 */
export function emitNodeWarning(warning: string): void {
  process.emitWarning(warning);
}

/**
 * A constant that indicates whether the environment the code is running is a Web Browser.
 */
export const isBrowser: boolean = false;

/**
 * A constant that indicates whether the environment the code is running is a Web Worker.
 */
export const isWebWorker: boolean = false;

/**
 * A constant that indicates whether the environment the code is running is Deno.
 */
export const isDeno = typeof process.versions.deno === "string" && process.versions.deno.length > 0;

/**
 * A constant that indicates whether the environment the code is running is Bun.sh.
 */
export const isBun = typeof process.versions.bun === "string" && process.versions.bun.length > 0;

/**
 * A constant that indicates whether the environment the code is running is a Node.js compatible environment.
 */
export const isNodeLike: boolean = true;

/**
 * A constant that indicates whether the environment the code is running is Node.JS.
 */
export const isNodeRuntime = !isBun && !isDeno;

/**
 * A constant that indicates whether the environment the code is running is in React-Native.
 */
export const isReactNative: boolean = false;
