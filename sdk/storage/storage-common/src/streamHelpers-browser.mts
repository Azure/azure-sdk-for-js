// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * No-op in browser - Web ReadableStreams use controller.close() instead.
 * @internal
 */
export function signalStreamEnd(_pushData: (data: any) => any): void {
  // Browser streams don't need this - controller.close() is called separately
}
