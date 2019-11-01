// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import crypto from "crypto";

export async function generateKey(secret: string, stringToSign: string) {
  const result = encodeURIComponent(
    crypto
      .createHmac("sha256", secret)
      .update(stringToSign)
      .digest("base64")
  );
  return result;
}
