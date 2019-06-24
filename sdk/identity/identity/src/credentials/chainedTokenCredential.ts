// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AccessToken, TokenCredential, GetTokenOptions } from "@azure/core-http";
import { AggregateAuthenticationError } from "../client/errors";

export class ChainedTokenCredential implements TokenCredential {
  private _sources: TokenCredential[] = [];

  constructor(...sources: TokenCredential[]) {
    this._sources = sources;
  }

  async getToken(
    scopes: string | string[],
    options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    let token = null;
    const errors = [];

    for (let i = 0; i < this._sources.length && token === null; i++) {
      try {
        token = await this._sources[i].getToken(scopes, options);
      } catch (err) {
        errors.push(err);
      }
    }

    if (!token && errors.length > 0) {
      throw new AggregateAuthenticationError(errors);
    }

    return token;
  }
}
