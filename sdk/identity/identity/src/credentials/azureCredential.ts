// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { AccessToken } from './accessToken';
import { TokenCredential, RequestOptionsBase } from '@azure/core-http'
import { IdentityClient, IdentityClientOptions } from '../client/identityClient'

export abstract class AzureCredential implements TokenCredential {
  private cachedToken: AccessToken | null = null;
  private refreshBufferMs: number;
  protected identityClient: IdentityClient;

  constructor(options?: IdentityClientOptions) {
    options = options || IdentityClient.getDefaultOptions()
    this.identityClient = new IdentityClient(options)
    this.refreshBufferMs = options.refreshBufferMs
  }

  public async getToken(scopes: string | string[], requestOptions?: RequestOptionsBase): Promise<string | null> {
    if (this.cachedToken && new Date(Date.now() + this.refreshBufferMs) < this.cachedToken.expiresOn) {
      return this.cachedToken.token
    }

    this.cachedToken = await this.getTokenCore(scopes, requestOptions)
    return this.cachedToken != null ? this.cachedToken.token : null;
  }

  protected abstract getTokenCore(scopes: string | string[], requestOptions?: RequestOptionsBase): Promise<AccessToken | null>;
}
