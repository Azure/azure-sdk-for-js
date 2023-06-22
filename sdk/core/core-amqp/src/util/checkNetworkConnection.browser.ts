// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @internal
 */
interface Window {}

/**
 * @internal
 */
declare let self: Window & typeof globalThis & { navigator: Navigator };

/**
 * @internal
 */
interface Navigator {
  /**
   * Returns a string representing the browser version info.
   */
  onLine: boolean;
}

/**
 * Checks whether a network connection is detected.
 * @internal
 */
export function checkNetworkConnection(): Promise<boolean> {
  return Promise.resolve(self.navigator.onLine);
}
