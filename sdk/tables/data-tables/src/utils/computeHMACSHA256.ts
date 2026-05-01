// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { computeSha256Hmac } from "@azure/core-util";

export async function computeHMACSHA256(stringToSign: string, accountKey: string): Promise<string> {
  return computeSha256Hmac(accountKey, stringToSign, "base64");
}
