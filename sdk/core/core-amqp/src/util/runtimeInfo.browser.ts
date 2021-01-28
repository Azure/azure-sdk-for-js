// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @internal
 *
 * @interface Window
 */
interface Window {}

/**
 * @internal
 */
declare let self: Window & typeof globalThis & { navigator: Navigator };

/**
 * @internal
 *
 * @interface Navigator
 */
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
export function getPlatformInfo(): string {
  return `(javascript-Browser-${getReleaseInfo()})`;
}

/**
 * Returns information about Node.js this function is being run on.
 * @hidden
 * @internal
 */
export function getFrameworkInfo(): string {
  return `Browser/${getReleaseInfo()}`;
}

/**
 * @internal
 *
 * @returns {string}
 */
function getReleaseInfo(): string {
  if (typeof self === "undefined") {
    return "";
  }

  const navigator = self.navigator;
  return navigator.appVersion;
}
