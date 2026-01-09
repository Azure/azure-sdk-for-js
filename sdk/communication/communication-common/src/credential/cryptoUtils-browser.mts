// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { computeSha256Hash, computeSha256Hmac } from "@azure/core-util";

export const shaHash = async (content: string): Promise<string> =>
  computeSha256Hash(content, "base64");

export const shaHMAC = async (secret: string, content: string): Promise<string> =>
  computeSha256Hmac(secret, content, "base64");
