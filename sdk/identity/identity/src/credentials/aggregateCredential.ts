// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { AccessToken, TokenCredential, GetTokenOptions } from "@azure/core-http";

export class AggregateCredential implements TokenCredential {
  private _sources: TokenCredential[] = [];

  constructor(...sources: TokenCredential[]) {
    this._sources = sources;
  }

  async getToken(
    scopes: string | string[],
    options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    let token = null;

    for (let i = 0; i < this._sources.length && token === null; i++) {
      token = await this._sources[i].getToken(scopes, options);
    }

    return token;
  }
}
