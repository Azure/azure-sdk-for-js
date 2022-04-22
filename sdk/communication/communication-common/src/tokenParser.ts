// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken } from "@azure/core-auth";
import { CommunicationToken } from "./models";
import jwtDecode from "jwt-decode";

interface JwtToken {
  exp: number;
  skypeid: string;
  resourceId: string;
}

export const parseCommunicationToken = (token: string): CommunicationToken => {
  const { exp, skypeid, resourceId } = jwtDecode<JwtToken>(token);
  return {
    token,
    expiresOn: new Date(exp * 1000),
    identity: { communicationUserId: `8:${skypeid}` }, // createIdentifierFromRawId
    resourceId: resourceId,
    scheme: "Bearer",
  };
};

export const convertToAccessToken = (token: CommunicationToken): AccessToken => {
  return { token: token.token, expiresOnTimestamp: token.expiresOn.getTime() };
};
