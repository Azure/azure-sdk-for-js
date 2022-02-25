// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-auth";

import {
  MixedRealityStsClient,
  MixedRealityStsClientOptions,
} from "@azure/mixed-reality-authentication";

/**
 * Represents a token credential that can be used to access a Mixed Reality service.
 * @internal
 */
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
}
