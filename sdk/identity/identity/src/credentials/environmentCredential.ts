// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { TokenCredential, isNode, RequestOptionsBase } from '@azure/core-http';
import { IdentityClientOptions } from '../client/identityClient';
import { ClientSecretCredential } from './clientSecretCredential';

export class EnvironmentCredential implements TokenCredential {
  private _credential?: TokenCredential = undefined;

  constructor(options?: IdentityClientOptions) {
    if (!isNode) {
      throw 'EnvironmentCredential is only supported when running in Node.js.'
    }

    const
      tenantId = process.env.AZURE_TENANT_ID,
      clientId = process.env.AZURE_CLIENT_ID,
      clientSecret = process.env.AZURE_CLIENT_SECRET;

    if (tenantId && clientId && clientSecret) {
      this._credential = new ClientSecretCredential(tenantId, clientId, clientSecret, options)
    }
  }

  getToken(scopes: string | string[], requestOptions?: RequestOptionsBase): Promise<string | null> {
    if (this._credential) {
      return this._credential.getToken(scopes, requestOptions)
    }

    return Promise.resolve(null);
  }
}
