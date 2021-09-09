// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Checks whether a network connection is detected.
 * @internal
 */
export function checkNetworkConnection(): Promise<boolean> {
  return Promise.resolve(self.navigator.onLine);
}
