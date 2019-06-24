// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-http";
import { IdentityClientOptions, IdentityClient } from "../client/identityClient";

export class ClientSecretCredential implements TokenCredential {
  private identityClient: IdentityClient;
  private _tenantId: string;
  private _clientId: string;
  private _clientSecret: string;

  constructor(
    tenantId: string,
    clientId: string,
    clientSecret: string,
    options?: IdentityClientOptions
  ) {
    this.identityClient = new IdentityClient(options);
    this._tenantId = tenantId;
    this._clientId = clientId;
    this._clientSecret = clientSecret;
  }

  public getToken(
    scopes: string | string[],
    options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    return this.identityClient.authenticateClientSecret(
      this._tenantId,
      this._clientId,
      this._clientSecret,
      scopes,
      options
    );
  }
}
