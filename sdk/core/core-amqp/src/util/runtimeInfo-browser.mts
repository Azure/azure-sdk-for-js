// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Returns information about the platform this function is being run on.
 * @internal
 */
export function getPlatformInfo(): string {
  return `(javascript-Browser-${getReleaseInfo()})`;
}

/**
 * Returns information about Node.js this function is being run on.
 * @internal
 */
export function getFrameworkInfo(): string {
  return `Browser/${getReleaseInfo()}`;
}

/**
 * @internal
 *
 * @returns
 */
function getReleaseInfo(): string {
  if (typeof self === "undefined") {
    return "";
  }

  const navigator = self.navigator;
  return navigator.appVersion;
}
