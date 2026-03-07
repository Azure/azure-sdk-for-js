// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { computeSha256Hmac } from "@azure/core-util";

export async function hmac(key: string, message: string): Promise<string> {
  return computeSha256Hmac(key, message, "base64");
}
