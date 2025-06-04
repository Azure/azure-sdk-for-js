// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { JwtPayload } from "../common/types.js";

export const base64UrlDecode = (base64Url: string): string => {
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const buffer = Buffer.from(base64, "base64");
  return buffer.toString("utf-8");
};

export const parseJwt = <T = JwtPayload>(token: string): T => {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid JWT token.");
  }
  const payload = base64UrlDecode(parts[1]!);
  return JSON.parse(payload) as T;
};
