// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { TokenCredential, RequestOptionsBase } from '@azure/core-http';

export class AggregateCredential implements TokenCredential {
  private _sources: TokenCredential[] = []

  constructor(...sources: TokenCredential[]) {
    this._sources = sources
  }

  async getToken(scopes: string | string[], requestOptions?: RequestOptionsBase): Promise<string | null> {
    let token = null

    for (let i = 0; i < this._sources.length; i++) {
      token = await this._sources[i].getToken(scopes, requestOptions)
    }

    return token
  }
}
