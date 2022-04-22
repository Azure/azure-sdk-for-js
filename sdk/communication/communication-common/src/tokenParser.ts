// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken } from "@azure/core-auth";
import jwtDecode from "jwt-decode";

interface JwtToken {
  exp: number;
}

//TODO: get rid of
export const parseToken = (token: string): AccessToken => {
  const { exp } = jwtDecode<JwtToken>(token);
  return {
    token,
    expiresOnTimestamp: exp * 1000,
  };
};
