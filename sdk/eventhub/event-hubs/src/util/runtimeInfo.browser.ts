// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
interface Window {}
declare var self: Window & typeof globalThis & { navigator: Navigator };

interface Navigator {
  /**
   * Returns a string representing the browser version info.
   */
  appVersion: string;
}

/**
 * Returns information about the platform this function is being run on.
 * @ignore
 * @internal
 */
export function getRuntimeInfo(): string {
  return `BROWSER-VERSION; Browser ${getReleaseInfo()}`;
}

function getReleaseInfo(): string {
  if (typeof self === "undefined") {
    return "";
  }

  const navigator = self.navigator;
  return navigator.appVersion;
}
