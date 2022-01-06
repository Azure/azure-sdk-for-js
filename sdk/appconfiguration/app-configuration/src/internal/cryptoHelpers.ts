// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createHash, createHmac } from "crypto";

/**
 * @internal
 */
export async function sha256Digest(body: string | undefined): Promise<string> {
  return createHash("sha256")
    .update(body || "")
    .digest("base64");
}

/**
 * @internal
 */
export async function sha256Hmac(secret: string, stringToSign: string): Promise<string> {
  const decodedSecret = Buffer.from(secret, "base64");

  return createHmac("sha256", decodedSecret).update(stringToSign).digest("base64");
}
