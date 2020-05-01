// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

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
