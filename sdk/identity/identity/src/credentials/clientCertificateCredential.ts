// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { AccessToken } from './accessToken';
import { CredentialScopes, RequestOptionsBase } from '@azure/core-http';
import { AzureCredential } from './azureCredential';
import { IdentityClientOptions } from '../client/identityClient';

export class ClientCertificateCredential extends AzureCredential {
  private _tenantId: string;
  private _clientId: string;
  private _certificatePath: string;

  constructor(
    tenantId: string,
    clientId: string,
    certificatePath: string,
    options?: IdentityClientOptions) {
    super(options)

    this._tenantId = tenantId;
    this._clientId = clientId;
    this._certificatePath = certificatePath;
  }

  protected getTokenCore(scopes: CredentialScopes, requestOptions?: RequestOptionsBase): Promise<AccessToken | null> {
    // TODO: Provide an implementation for Node.js
    throw `This is not yet implemented! ${scopes} ${requestOptions}`
  }
}
