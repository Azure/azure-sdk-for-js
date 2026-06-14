// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Returns Node.js runtime details for user-agent string.
 */
export function userAgentDetails(): string {
  return `Node.js/${process.versions.node} (${process.platform}; ${process.arch})`;
}
