// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { stringToUint8Array, uint8ArrayToString } from "@azure/core-util";

export function getToken(tokenString: string): string {
  return uint8ArrayToString(stringToUint8Array(tokenString, "utf-8"), "base64");
}
