// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// eslint-disable-next-line @typescript-eslint/no-redeclare
import { Buffer } from "node:buffer";

/**
 * Base64 encode.
 *
 * @param content -
 */
export function base64encode(content: string): string {
  return Buffer.from(content).toString("base64");
}

/**
 * Base64 decode.
 *
 * @param encodedString -
 */
export function base64decode(encodedString: string): string {
  return Buffer.from(encodedString, "base64").toString();
}
