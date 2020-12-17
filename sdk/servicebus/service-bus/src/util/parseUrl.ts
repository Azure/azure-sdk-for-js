// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @internal
 * @hidden
 */
const url = require("url");

/**
 * @internal
 * @hidden
 * @param {string} rawUrl
 */
export const parseURL = (rawUrl: string) => {
  return new url.URL(rawUrl);
};
