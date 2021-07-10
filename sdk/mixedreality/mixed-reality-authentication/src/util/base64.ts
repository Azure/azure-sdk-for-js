// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isNode } from "@azure/core-http";

declare global {
  // stub these out for the browser
  function btoa(input: string): string;
  function atob(input: string): string;
}

/**
 * Base64 encode.
 *
 * @internal
 * @export
 * @param {string} content
 * @returns {string}
 */
export function base64encode(content: string): string {
  return isNode ? Buffer.from(content).toString("base64") : btoa(content);
}

/**
 * Base64 decode.
 *
 * @internal
 * @export
 * @param {string} encodedString
 * @returns {string}
 */
export function base64decode(encodedString: string): string {
  return isNode ? Buffer.from(encodedString, "base64").toString() : atob(encodedString);
}
