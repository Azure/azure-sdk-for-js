// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Returns browser runtime details for user-agent string.
 */
export function userAgentDetails(): string {
  return navigator.userAgent ?? "<environment undetectable>";
}
