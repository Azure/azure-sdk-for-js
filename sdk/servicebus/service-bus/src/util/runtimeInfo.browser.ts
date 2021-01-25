// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @internal
 * @ignore
 */
interface NavigatorEx extends Navigator {
  // oscpu is not yet standards-compliant, but can not be undefined in TypeScript 3.6.2
  readonly oscpu: string;
}

/**
 * Returns information about the platform this function is being run on.
 * @ignore
 * @internal
 */
export function getRuntimeInfo(): string {
  const navigator = window.navigator as NavigatorEx;
  const osInfo = {
    key: "OS",
    value: (navigator.oscpu || navigator.platform).replace(" ", "")
  };

  return `${osInfo.key}/${osInfo.value}`;
}
