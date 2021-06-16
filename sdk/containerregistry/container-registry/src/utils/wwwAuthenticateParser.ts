// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Defined supported names of WWW-Authenticate name-value pairs.
 */
export type ValidParsedWWWAuthenticateProperties =
  // "authorization_uri" was used in the track 1 version of KeyVault.
  // This is not a relevant property anymore, since the service is consistently answering with "authorization".
  // | "authorization_uri"
  | "authorization"
  | "claims"
  // Even though the service is moving to "scope", both "resource" and "scope" should be supported.
  | "resource"
  | "scope"
  | "service";

/**
 * Represents the result of `parseWWWAuthenticate()`;
 */
export type ParsedWWWAuthenticate = {
  [Key in ValidParsedWWWAuthenticateProperties]?: string;
};

/**
 * Parses an WWW-Authenticate response.
 * This transforms a string value like:
 * `Bearer authorization="some_authorization", resource="https://some.url"`
 * into an object like:
 * `{ authorization: "some_authorization", resource: "https://some.url" }`
 * @param wwwAuthenticate - String value in the WWW-Authenticate header
 */
export function parseWWWAuthenticate(wwwAuthenticate: string): ParsedWWWAuthenticate {
  // First we split the string by either `,`, `, ` or ` `.
  const parts = wwwAuthenticate.split(/, *| +/);
  // Then we only keep the strings with an equal sign after a word and before a quote.
  // also splitting these sections by their equal sign
  const keyValues = parts.reduce<string[][]>(
    (acc, str) => (str.match(/\w="/) ? [...acc, str.split("=")] : acc),
    []
  );
  // Then we transform these key-value pairs back into an object.
  const parsed = keyValues.reduce<ParsedWWWAuthenticate>(
    (result, [key, value]: string[]) => ({
      ...result,
      [key]: value.slice(1, -1)
    }),
    {}
  );
  return parsed;
}
