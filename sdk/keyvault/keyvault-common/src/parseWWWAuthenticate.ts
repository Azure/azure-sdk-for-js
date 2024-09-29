// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Parameters parsed out of the WWW-Authenticate header value by the parseWWWAuthenticate function.
 */
export interface WWWAuthenticate {
  /**
   * The authorization parameter, if present.
   */
  authorization?: string;

  /**
   * The authorization_url parameter, if present.
   */
  authorization_url?: string;

  /**
   * The resource parameter, if present.
   */
  resource?: string;

  /**
   * The scope parameter, if present.
   */
  scope?: string;

  /**
   * The tenantId parameter, if present.
   */
  tenantId?: string;
}

const validWWWAuthenticateProperties: readonly (keyof WWWAuthenticate)[] = [
  "authorization",
  "authorization_url",
  "resource",
  "scope",
  "tenantId",
] as const;

/**
 * Parses an WWW-Authenticate response header.
 * This transforms a string value like:
 * `Bearer authorization="https://some.url/tenantId", resource="https://some.url"`
 * into an object like:
 * `{ authorization: "https://some.url/tenantId", resource: "https://some.url" }`
 * @param headerValue - String value in the WWW-Authenticate header
 */
export function parseWWWAuthenticateHeader(headerValue: string): WWWAuthenticate {
  const pairDelimiter = /,? +/;
  const parsed = headerValue.split(pairDelimiter).reduce<WWWAuthenticate>((kvPairs, p) => {
    if (p.match(/\w="/)) {
      // 'sampleKey="sample_value"' -> [sampleKey, "sample_value"] -> { sampleKey: sample_value }
      const [key, value] = p.split("=");
      if (validWWWAuthenticateProperties.includes(key as keyof WWWAuthenticate)) {
        // The values will be wrapped in quotes, which need to be stripped out.
        return { ...kvPairs, [key]: value.slice(1, -1) };
      }
    }
    return kvPairs;
  }, {});

  // Finally, we pull the tenantId from the authorization header to support multi-tenant authentication.
  if (parsed.authorization) {
    try {
      const tenantId = new URL(parsed.authorization).pathname.substring(1);
      if (tenantId) {
        parsed.tenantId = tenantId;
      }
    } catch (_) {
      throw new Error(`The challenge authorization URI '${parsed.authorization}' is invalid.`);
    }
  }

  return parsed;
}
