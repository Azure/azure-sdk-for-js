// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-http";
import { IdentityClientOptions, IdentityClient } from "../client/identityClient";

export class ManagedIdentityCredential implements TokenCredential {
  private identityClient: IdentityClient;
  private _clientId: string | undefined;

  constructor(clientId?: string, options?: IdentityClientOptions) {
    this.identityClient = new IdentityClient(options);
    this._clientId = clientId;
  }

  public getToken(
    scopes: string | string[],
    options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    return this.identityClient.authenticateManagedIdentity(scopes, this._clientId, options);
  }
}
