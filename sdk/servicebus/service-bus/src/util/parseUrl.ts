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
 */
export const parseURL = (rawUrl: string) => {
  return new url.URL(rawUrl);
};
