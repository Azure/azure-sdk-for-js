// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { stringToUint8Array, uint8ArrayToString } from "@azure/core-util";

export const baseUri = "https://contoso.api.fake";

export const generateToken = (): string => {
  const validForMinutes = 60;
  const expiresOn = (Date.now() + validForMinutes * 60 * 1000) / 1000;
  const tokenString = JSON.stringify({ exp: expiresOn });
  const base64Token = uint8ArrayToString(stringToUint8Array(tokenString, "utf-8"), "base64");
  return `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${base64Token}.adM-ddBZZlQ1WlN3pdPBOF5G4Wh9iZpxNP_fSvpF4cWs`;
};
