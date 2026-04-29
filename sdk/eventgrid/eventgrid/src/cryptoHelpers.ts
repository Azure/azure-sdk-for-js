// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createHmac } from "node:crypto";
import { stringToUint8Array } from "@azure/core-util";

/**
 * @internal
 */
export async function sha256Hmac(secret: string, stringToSign: string): Promise<string> {
  const decodedSecret = stringToUint8Array(secret, "base64");

  return createHmac("sha256", decodedSecret).update(stringToSign).digest("base64");
}
