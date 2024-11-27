// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Buffer } from "node:buffer";

export function getToken(tokenString: string): string {
  return Buffer.from(tokenString).toString("base64");
}
