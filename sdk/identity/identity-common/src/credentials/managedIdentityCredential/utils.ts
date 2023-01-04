// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Internal type roughly matching the raw responses of the authentication endpoints.
 *
 * @internal
 */
export interface TokenResponseParsedBody {
  access_token?: string;
  refresh_token?: string;
  expires_in: number;
  expires_on?: number | string;
}

/**
 * Given a token response, return the expiration timestamp as the number of milliseconds from the Unix epoch.
 * @param body - A parsed response body from the authentication endpoint.
 */
export function parseExpiresOn(body: TokenResponseParsedBody): number {
  if (typeof body.expires_on === "number") {
    return body.expires_on * 1000;
  }

  if (typeof body.expires_on === "string") {
    const asNumber = +body.expires_on;
    if (!isNaN(asNumber)) {
      return asNumber * 1000;
    }

    const asDate = Date.parse(body.expires_on);
    if (!isNaN(asDate)) {
      return asDate;
    }
  }

  if (typeof body.expires_in === "number") {
    return Date.now() + body.expires_in * 1000;
  }

  throw new Error(
    `Failed to parse token expiration from body. expires_in="${body.expires_in}", expires_on="${body.expires_on}"`
  );
}
