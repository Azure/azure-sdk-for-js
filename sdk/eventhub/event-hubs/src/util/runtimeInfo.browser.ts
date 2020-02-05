// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
interface Window {}
declare var self: Window & typeof globalThis;

interface NavigatorEx extends Navigator {
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
  return `v0.0.0; Browser ${getReleaseInfo()}`;
}

function getReleaseInfo(): string {
  if (typeof self === "undefined") {
    return "";
  }

  const navigator = self.navigator as NavigatorEx;
  return navigator.appVersion;
}
