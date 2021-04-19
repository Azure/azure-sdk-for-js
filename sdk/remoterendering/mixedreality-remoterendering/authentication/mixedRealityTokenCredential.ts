// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-auth";

import {
  MixedRealityStsClient,
  MixedRealityStsClientOptions
} from "@azure/mixedreality-authentication";
import { StaticAccessTokenCredential } from "./staticAccessTokenCredential";

export class MixedRealityTokenCredential implements TokenCredential {
  private stsClient: MixedRealityStsClient;

  constructor(
    accountId: string,
    accountDomain: string,
    credential: TokenCredential,
    options: MixedRealityStsClientOptions
  ) {
    this.stsClient = new MixedRealityStsClient(accountId, accountDomain, credential, options);
  }

  getToken(_scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken | null> {
    return this.stsClient.getToken(options);
  }

  static getMixedRealityCredential(
    accountId: string,
    accountDomain: string,
    credential: TokenCredential,
    options: MixedRealityStsClientOptions
  ): TokenCredential {
    if (credential instanceof StaticAccessTokenCredential) {
      // Static access tokens are assumed to be Mixed Reality access tokens already, so we don't need to exchange
      // them using the MixedRealityTokenCredential.
      return credential;
    }

    return new MixedRealityTokenCredential(accountId, accountDomain, credential, options);
  }
}
