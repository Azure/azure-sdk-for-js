// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

interface Window {}
declare let self: Window & typeof globalThis & { navigator: Navigator };

interface Navigator {
  /**
   * Returns a string representing the browser version info.
   */
  appVersion: string;
}

/**
 * Returns information about the platform this function is being run on.
 * @hidden
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
