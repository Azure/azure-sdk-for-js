// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

declare global {
  // React Native provides navigator but doesn't ship DOM lib types.
  // eslint-disable-next-line no-var
  var navigator: { userAgent?: string } | undefined;
}

/**
 * Returns React Native runtime details for user-agent string.
 */
export function userAgentDetails(): string {
  return globalThis.navigator?.userAgent ?? "<environment undetectable>";
}
