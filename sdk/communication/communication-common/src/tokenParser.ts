// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken } from "@azure/core-auth";
import jwtDecode from "jwt-decode";

interface JwtToken {
  exp: number;
  skypeid: string;
}

interface AccessTokenWithIdentity extends AccessToken {
  rawId: string;
}

export const parseToken = (token: string): AccessTokenWithIdentity => {
  const { exp, skypeid } = jwtDecode<JwtToken>(token);
  return {
    token,
    expiresOnTimestamp: exp * 1000,
    rawId: `8:${skypeid}`,
  };
};
