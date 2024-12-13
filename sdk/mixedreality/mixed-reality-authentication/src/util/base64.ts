// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Buffer } from "node:buffer";

/**
 * Base64 encode.
 *
 * @internal
 * @param content - The string to be encoded
 * @returns encoded string
 */
export function base64encode(content: string): string {
  return Buffer.from(content).toString("base64");
}

/**
 * Base64 decode.
 *
 * @internal
 * @param encodedString - The encoded string
 * @returns decoded string
 */
export function base64decode(encodedString: string): string {
  return Buffer.from(encodedString, "base64").toString();
}
