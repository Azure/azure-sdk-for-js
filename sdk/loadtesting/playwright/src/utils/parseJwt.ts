// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { stringToUint8Array, uint8ArrayToString } from "@azure/core-util";
import type { JwtPayload } from "../common/types.js";

export const base64UrlDecode = (base64Url: string): string => {
  return uint8ArrayToString(stringToUint8Array(base64Url, "base64url"), "utf-8");
};

export const parseJwt = <T = JwtPayload>(token: string): T => {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid JWT token.");
  }
  const payload = base64UrlDecode(parts[1]!);
  return JSON.parse(payload) as T;
};
