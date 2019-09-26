// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AccessToken, TokenCredential, GetTokenOptions, CanonicalCode } from "@azure/core-http";
import { AggregateAuthenticationError } from "../client/errors";
import { createSpan } from "../util/tracing";

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

    const { span, options: newOptions } = createSpan("ChainedTokenCredential-getToken", options);

    for (let i = 0; i < this._sources.length && token === null; i++) {
      try {
        token = await this._sources[i].getToken(scopes, newOptions);
      } catch (err) {
        span.setStatus({
          code: CanonicalCode.UNAUTHENTICATED,
          message: err.message
        });
        errors.push(err);
      }
    }

    span.end();

    if (!token && errors.length > 0) {
      throw new AggregateAuthenticationError(errors);
    }

    return token;
  }
}
