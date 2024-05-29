// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createHmac } from "node:crypto";

export async function signString(key: string, toSign: string): Promise<string> {
  const hmac = createHmac("sha256", key).update(toSign).digest("base64");
  return encodeURIComponent(hmac);
}
