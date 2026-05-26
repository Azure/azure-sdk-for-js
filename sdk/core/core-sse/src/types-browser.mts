// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * An alias for Node.js's `http.IncomingMessage` type. Defined as `never` on
 * browser and React Native platforms where Node.js HTTP is not available.
 */
export type NodeIncomingMessage = never;

/**
 * `NodeJSReadableStream` is not available in the browser or React Native.
 */
export type NodeJSReadableStream = never;

/**
 * No-op in browser/React Native — Node streams are not available.
 */
export function cancelNodeStream(_stream: never): void {
  // unreachable
}
