// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @internal
 */
const url = require("url");

/**
 * @internal
 * @param {string} rawUrl
 */
export const parseURL = (rawUrl: string) => {
  return new url.URL(rawUrl);
};
