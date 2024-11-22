// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export function parseJwt(token: string): any {
  const base64Payload = token.split(".")[1];
  const payload = Buffer.from(base64Payload, "base64");
  return JSON.parse(payload.toString());
}
