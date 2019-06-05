// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { AccessToken } from './accessToken';
import { RequestOptionsBase } from '@azure/core-http';
import { AzureCredential } from './azureCredential';
import { IdentityClientOptions } from '../client/identityClient';

export class ClientSecretCredential extends AzureCredential {
  private _tenantId: string;
  private _clientId: string;
  private _clientSecret: string;

  constructor(
    tenantId: string,
    clientId: string,
    clientSecret: string,
    options?: IdentityClientOptions) {
    super(options)
    
    this._tenantId = tenantId;
    this._clientId = clientId;
    this._clientSecret = clientSecret;
  }

  protected getAccessToken(scopes: string | string[], requestOptions?: RequestOptionsBase): Promise<AccessToken | null> {
    return this.identityClient.authenticate(
      this._tenantId,
      this._clientId,
      this._clientSecret,
      scopes,
      requestOptions)
  }
}
