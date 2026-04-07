// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Environment variables are not available in React Native.
 *
 * @internal
 */
export function getEnvironmentVariable(_name: string): string | undefined {
  return undefined;
}

/**
 * `process.emitWarning` is not available in React Native.
 *
 * @internal
 */
export function emitNodeWarning(_warning: string): void {
  // No-op in React Native environments
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
// https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Core/setUpNavigator.js
export const isReactNative: boolean = true;
