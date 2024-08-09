// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DefaultScopeSuffix } from "./constants";

/**
 * Most MSIs send requests to the IMDS endpoint, or a similar endpoint.
 * These are GET requests that require sending a `resource` parameter on the query.
 * This resource can be derived from the scopes received through the getToken call, as long as only one scope is received.
 * Multiple scopes assume that the resulting token will have access to multiple resources, which won't be the case.
 *
 * For that reason, when we encounter multiple scopes, we return undefined.
 * It's up to the individual MSI implementations to throw the errors (which helps us provide less generic errors).
 */
export function mapScopesToResource(scopes: string | string[]): string | undefined {
  let scope = "";
  if (Array.isArray(scopes)) {
    if (scopes.length !== 1) {
      return;
    }

    scope = scopes[0];
  } else if (typeof scopes === "string") {
    scope = scopes;
  }

  if (!scope.endsWith(DefaultScopeSuffix)) {
    return scope;
  }

  return scope.substr(0, scope.lastIndexOf(DefaultScopeSuffix));
}

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
  refresh_on?: number | string;
}

/**
 * Given a token response, return the expiration timestamp as the number of milliseconds from the Unix epoch.
 * @param body - A parsed response body from the authentication endpoint.
 */
export function parseExpirationTimestamp(body: TokenResponseParsedBody): number {
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
    `Failed to parse token expiration from body. expires_in="${body.expires_in}", expires_on="${body.expires_on}"`,
  );
}

/**
 * Given a token response, return the expiration timestamp as the number of milliseconds from the Unix epoch.
 * @param body - A parsed response body from the authentication endpoint.
 */
export function parseRefreshTimestamp(body: TokenResponseParsedBody): number | undefined {
  if(body.refresh_on){
    if (typeof body.refresh_on === "number") {
      return body.refresh_on * 1000;
    }

    if (typeof body.refresh_on === "string") {
      const asNumber = +body.refresh_on;
      if (!isNaN(asNumber)) {
        return asNumber * 1000;
      }

      const asDate = Date.parse(body.refresh_on);
      if (!isNaN(asDate)) {
        return asDate;
      }
    }
  }
  return undefined;
}
