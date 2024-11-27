// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Checks whether a network connection is detected.
 * @internal
 */
export function checkNetworkConnection(): Promise<boolean> {
  return Promise.resolve(self.navigator.onLine);
}
