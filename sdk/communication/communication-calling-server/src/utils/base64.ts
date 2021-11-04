// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isNode } from "@azure/core-http";

/**
 * Base64 encode.
 *
 * @internal
 * @param content - string need to be encoded
 */
export function base64encode(content: string): string {
  return isNode ? Buffer.from(content).toString("base64") : btoa(content);
}

/**
 * Base64 decode.
 *
 * @internal
 * @param encodedString - string need to be decoded
 */
export function base64decode(encodedString: string): string {
  return isNode ? Buffer.from(encodedString, "base64").toString() : atob(encodedString);
}
