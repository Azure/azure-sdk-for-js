// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @internal
 * @ignore
 */
import url from "url";

/**
 * @internal
 * @ignore
 * @param {string} rawUrl
 * @returns
 */
export function parseUrl(rawUrl: string): any {
  return new url.URL(rawUrl);
}
