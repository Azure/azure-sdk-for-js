// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @internal
 * @ignore
 */
const url = require("url");

/**
 * @internal
 * @ignore
 * @param {string} rawUrl
 * @returns
 */
export const parseURL = (rawUrl: string) => {
  return new url.URL(rawUrl);
};
