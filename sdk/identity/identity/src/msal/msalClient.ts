// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions } from "@azure/core-auth";

export interface MsalClient {
  getTokenByClientSecret(
    scopes: string[],
    clientSecret: string,
    options?: GetTokenOptions,
  ): Promise<AccessToken>;
}

export function createMsalClient(_clientId: string, _tenantId: string): MsalClient {
  return {
    getTokenByClientSecret(
      _scopes: string[],
      _clientSecret: string,
      _options?: GetTokenOptions,
    ): Promise<AccessToken> {
      throw new Error();
      // implementation goes here
    },
  };
}
