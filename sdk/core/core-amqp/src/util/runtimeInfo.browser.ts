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
 * @ignore
 * @internal
 */
export function getPlatformInfo(): string {
  return `(javascript-Browser-${getReleaseInfo()})`;
}

/**
 * Returns information about Node.js this function is being run on.
 * @ignore
 * @internal
 */
export function getFrameworkInfo(): string {
  return `Browser/${getReleaseInfo()}`;
}

function getReleaseInfo(): string {
  if (typeof self === "undefined") {
    return "";
  }

  const navigator = self.navigator;
  return navigator.appVersion;
}
