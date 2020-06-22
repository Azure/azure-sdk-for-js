// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createHash, createHmac } from "crypto";

/**
 * @internal
 * @ignore
 */
export function sha256Digest(body: any): Promise<string> {
  return Promise.resolve(
    createHash("sha256")
      .update(body || "")
      .digest("base64")
  );
}

/**
 * @internal
 * @ignore
 */
export function sha256Hmac(secret: string, stringToSign: string): Promise<string> {
  const decodedSecret = Buffer.from(secret, "base64");

  return Promise.resolve(
    createHmac("sha256", decodedSecret)
      .update(stringToSign)
      .digest("base64")
  );
}
