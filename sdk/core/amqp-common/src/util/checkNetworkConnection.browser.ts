// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/**
 * Checks whether a network connection is detected.
 * @ignore
 * @internal
 */
export function checkNetworkConnection(): Promise<boolean> {
  return Promise.resolve(window.navigator.onLine);
}
