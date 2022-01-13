// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @internal
 *
 * Valid key names in WWW-Authenticate header.
 */
const validParsedWWWAuthenticateProperties = [
  "authorization",
  "authorization_url",
  "resource",
  "scope",
  "tenantId",
] as const;

/**
 * @internal
 *
 * A union type representing all valid key names in WWW-Authenticate header.
 */
type ValidParsedWWWAuthenticateProperties = typeof validParsedWWWAuthenticateProperties[number];

/**
 * @internal
 *
 * Holds the known WWWAuthenticate keys and their values as a result of
 * parsing a WWW-Authenticate header.
 */
export type ParsedWWWAuthenticate = {
  [Key in ValidParsedWWWAuthenticateProperties]?: string;
};

/**
 * Parses an WWW-Authenticate response.
 * This transforms a string value like:
 * `Bearer authorization="https://some.url/tenantId", resource="https://some.url"`
 * into an object like:
 * `{ authorization: "https://some.url/tenantId", resource: "https://some.url" }`
 * @param wwwAuthenticate - String value in the WWW-Authenticate header
 */
export function parseWWWAuthenticate(wwwAuthenticate: string): ParsedWWWAuthenticate {
  const pairDelimiter = /,? +/;
  const parsed = wwwAuthenticate
    .split(pairDelimiter)
    .reduce<ParsedWWWAuthenticate>((kvPairs, p) => {
      if (p.match(/\w="/)) {
        // 'sampleKey="sample_value"' -> [sampleKey, "sample_value"] -> { sampleKey: sample_value }
        const [key, value] = p.split("=");
        if (
          validParsedWWWAuthenticateProperties.includes(key as ValidParsedWWWAuthenticateProperties)
        ) {
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
