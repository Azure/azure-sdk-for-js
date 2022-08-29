// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isNode } from "@azure/core-util";

export const baseUri = "https://contoso.api.fake";

declare function btoa(stringToEncode: string): string;

export const generateToken = (): string => {
  const validForMinutes = 60;
  const expiresOn = (Date.now() + validForMinutes * 60 * 1000) / 1000;
  const tokenString = JSON.stringify({ exp: expiresOn });
  const base64Token = isNode ? Buffer.from(tokenString).toString("base64") : btoa(tokenString);
  return `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${base64Token}.adM-ddBZZlQ1WlN3pdPBOF5G4Wh9iZpxNP_fSvpF4cWs`;
};
