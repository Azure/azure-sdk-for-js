// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { AccessToken } from './accessToken';
import { TokenCredential, CredentialScopes, RequestOptionsBase } from '@azure/core-http'
import { IdentityClient, IdentityClientOptions } from '../client/identityClient'

export abstract class AzureCredential implements TokenCredential {
  private cachedToken: AccessToken | null = null;
  protected identityClient: IdentityClient;

  constructor(options?: IdentityClientOptions) {
    this.identityClient = new IdentityClient(options || IdentityClient.getDefaultOptions())
  }

  public async getToken(scopes: CredentialScopes, requestOptions?: RequestOptionsBase): Promise<string | null> {
    // TODO: Implement token refresh logic
    this.cachedToken = await this.getTokenCore(scopes, requestOptions)
    return this.cachedToken != null ? this.cachedToken.token : null;
  }

  protected abstract getTokenCore(scopes: CredentialScopes, requestOptions?: RequestOptionsBase): Promise<AccessToken | null>;
}
