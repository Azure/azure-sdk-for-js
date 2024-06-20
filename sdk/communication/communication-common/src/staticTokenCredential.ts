// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AccessToken } from "@azure/core-auth";
import { TokenCredential } from "./communicationTokenCredential";

/**
 * StaticTokenCredential
 */
export class StaticTokenCredential implements TokenCredential {
  private readonly token?: AccessToken;
  private readonly fetchToken?: Promise<AccessToken>;

  constructor(token: AccessToken);
  constructor(fetchToken: Promise<AccessToken>);

  constructor(tokenOrFetchToken: AccessToken | Promise<AccessToken>) {
    if (tokenOrFetchToken instanceof Promise) {
      this.fetchToken = tokenOrFetchToken;
      // fetch asap to speed up later call to getToken
      (async() => await this.fetchToken)();
    } else {
      this.token = tokenOrFetchToken;
    }
  }

  public async getToken(): Promise<AccessToken> {
    return this.fetchToken ? this.fetchToken! : this.token!;
  }

  public dispose(): void {
    /* intentionally empty */
  }
}
