// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @internal
 * @ignore
 * @param {string} rawUrl
 * @returns
 */
export const parseURL = (rawUrl: string) => {
  return new self.URL(rawUrl);
};
