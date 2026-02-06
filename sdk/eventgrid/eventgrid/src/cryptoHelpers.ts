// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { computeSha256Hmac } from "@azure/core-util";

/**
 * @internal
 */
export async function sha256Hmac(secret: string, stringToSign: string): Promise<string> {
  return computeSha256Hmac(secret, stringToSign, "base64");
}
