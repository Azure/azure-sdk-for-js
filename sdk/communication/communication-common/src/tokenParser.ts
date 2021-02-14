// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import jwtDecode from "jwt-decode";
import { AccessToken } from "@azure/core-http";

interface JwtToken {
  exp: number;
}

export const parseToken = (token: string): AccessToken => {
  const { exp } = jwtDecode<JwtToken>(token);
  return {
    token,
    expiresOnTimestamp: exp * 1000
  };
};
