// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AccessToken, TokenCredential, GetTokenOptions } from "@azure/core-http";
import { AggregateAuthenticationError, CredentialUnavailable } from "../client/errors";
import { createSpan } from "../util/tracing";
import { CanonicalCode } from "@opentelemetry/api";
import { credentialLogger, CredentialLogger } from '../util/logging';

/**
 * Enables multiple `TokenCredential` implementations to be tried in order
 * until one of the getToken methods returns an access token.
 */
export class ChainedTokenCredential implements TokenCredential {
  /**
   * The name to use during logging
   */
  protected credentialName = "ChainedTokenCredential";

  /**
   * The message to use when the chained token fails to get a token
   */
  protected UnavailableMessage = "ChainedTokenCredential => failed to retrieve a token from the included credentials";

  private _logger?: CredentialLogger;
  private get logger(): CredentialLogger {
    if (this._logger) {
      return this._logger;
    }
    this._logger = credentialLogger(this.credentialName);
    return this._logger;
  };

  private _sources: TokenCredential[] = [];

  /**
   * Creates an instance of ChainedTokenCredential using the given credentials.
   *
   * @param sources `TokenCredential` implementations to be tried in order.
   *
   * Example usage:
   * ```javascript
   * const firstCredential = new ClientSecretCredential(tenantId, clientId, clientSecret);
   * const secondCredential = new ClientSecretCredential(tenantId, anotherClientId, anotherSecret);
   * const credentialChain = new ChainedTokenCredential(firstCredential, secondCredential);
   * ```
   */
  constructor(...sources: TokenCredential[]) {
    this._sources = sources;
  }

  /**
   * Returns the first access token returned by one of the chained
   * `TokenCredential` implementations.  Throws an {@link AggregateAuthenticationError}
   * when one or more credentials throws an {@link AuthenticationError} and
   * no credentials have returned an access token.
   *
   * @param scopes The list of scopes for which the token will have access.
   * @param options The options used to configure any requests this
   *                `TokenCredential` implementation might make.
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
        if (err instanceof CredentialUnavailable) {
          errors.push(err);
        } else {
          this.logger.getToken.throwError(err);
        }
      }
    }

    if (!token && errors.length > 0) {
      const err = new AggregateAuthenticationError(errors);
      span.setStatus({
        code: CanonicalCode.UNAUTHENTICATED,
        message: err.message
      });
      this.logger.getToken.throwError(err);
      throw err;
    }

    span.end();

    this.logger.getToken.success(scopes);
    return token;
  }
}
