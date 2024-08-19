// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// eslint-disable-next-line @typescript-eslint/no-redeclare
 import crypto from "crypto";

/**
 * @internal
 */
export async function generateKey(secret: string, stringToSign: string): Promise<string> {
  const result = encodeURIComponent(
    crypto.createHmac("sha256", secret).update(stringToSign).digest("base64"),
  );
  return result;
}
