// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createHash, createHmac } from "crypto";

export const shaHash = async (content: string): Promise<string> =>
  createHash("sha256").update(content).digest("base64");

export const shaHMAC = async (secret: string, content: string): Promise<string> => {
  const decodedSecret = Buffer.from(secret, "base64");

  return createHmac("sha256", decodedSecret).update(content).digest("base64");
};
