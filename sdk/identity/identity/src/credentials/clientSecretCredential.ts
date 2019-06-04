// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { AccessToken } from './accessToken';
import { CredentialScopes, RequestOptionsBase } from '@azure/core-http';
import { AzureCredential } from './azureCredential';
import { IdentityClientOptions } from '../client/identityClient';

export class ClientSecretCredential extends AzureCredential {
  constructor(
    private tenantId: string,
    private clientId: string,
    private clientSecret: string,
    options?: IdentityClientOptions) {
    super(options)
  }

  protected getTokenCore(scopes: CredentialScopes, requestOptions?: RequestOptionsBase): Promise<AccessToken | null> {
    return this.identityClient.authenticate(
      this.tenantId,
      this.clientId,
      this.clientSecret,
      scopes,
      requestOptions)
  }
}
