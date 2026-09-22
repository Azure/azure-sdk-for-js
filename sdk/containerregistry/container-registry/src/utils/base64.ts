// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { stringToUint8Array, uint8ArrayToString } from "@azure/core-util";

/**
 * Base64 decode
 *
 * @internal
 * @param encodedString -
 * @returns
 */
export function base64decode(encodedString: string): string {
  return uint8ArrayToString(stringToUint8Array(encodedString, "base64"), "utf-8");
}
