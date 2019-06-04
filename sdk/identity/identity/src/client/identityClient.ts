// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { AccessToken } from '../credentials/accessToken';
import { RequestOptionsBase, ServiceClient, ServiceClientOptions, CredentialScopes } from '@azure/core-http';

export class IdentityClient extends ServiceClient {
  private static readonly DefaultAuthorityHost = "https://login.microsoftonline.com/"

  constructor(options?: IdentityClientOptions) {
    super(undefined, options)

    if (options != undefined) {
      this.baseUri = options.authorityHost
    }
  }

  async authenticate(tenantId: string, clientId: string, clientSecret: string, scopes: CredentialScopes, requestOptions?: RequestOptionsBase): Promise<AccessToken | null> {
    const response = await this.sendRequest({
      url: `${this.baseUri}/${tenantId}/oauth2/v2.0/token`,
      method: 'GET',
      formData: {
        response_type: 'token',
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
        scope: (typeof scopes === 'string') ? scopes : scopes.join(' ')
      }
    })

    if (response.status == 200 || response.status == 201) {
      let expiresOn = new Date()
      expiresOn.setSeconds(expiresOn.getSeconds() + response.parsedBody.expires_in)

      return {
        token: response.parsedBody.access_token,
        expiresOn: expiresOn
      }
    }

    return null
  }

  static getDefaultOptions(): IdentityClientOptions {
    return {
      authorityHost: IdentityClient.DefaultAuthorityHost,
    }
  }
}

export interface IdentityClientOptions extends ServiceClientOptions {
  authorityHost: string
}
