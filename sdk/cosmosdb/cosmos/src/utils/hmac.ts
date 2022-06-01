// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createHmac } from "crypto";

export async function hmac(key: string, message: string): Promise<string> {
  return createHmac("sha256", Buffer.from(key, "base64")).update(message).digest("base64");
}
