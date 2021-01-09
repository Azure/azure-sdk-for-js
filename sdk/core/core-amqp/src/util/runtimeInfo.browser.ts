// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @internal
 * @hidden
 *
 * @interface Window
 */
interface Window {}

/**
 * @internal
 * @hidden
 */
declare let self: Window & typeof globalThis & { navigator: Navigator };

/**
 * @internal
 * @hidden
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
 * @hidden
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
