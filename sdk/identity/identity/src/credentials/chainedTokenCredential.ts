// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AccessToken, TokenCredential, GetTokenOptions } from "@azure/core-http";
import { AggregateAuthenticationError } from "../client/errors";

/**
 * Enables multiple {@link TokenCredential} implementations to be tried in order
 * until one of the getToken methods returns an {@link AccessToken}.
 */
export class ChainedTokenCredential implements TokenCredential {
  private _sources: TokenCredential[] = [];

  constructor(...sources: TokenCredential[]) {
    this._sources = sources;
  }

  /**
   * Returns the first {@link AccessToken} returned by one of the chained
   * {@link TokenCredential} implementations.  Throws an {@link AggregateAuthenticationError}
   * when one or more credentials throws an {@link AuthenticationError} and
   * no credentials have returned an {@link AccessToken}.
   * 
   * @param scopes The list of scopes for which the token will have access.
   * @param options The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
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
