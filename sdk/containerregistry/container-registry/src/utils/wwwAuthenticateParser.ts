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
  // Match on things that look like property name/value pairs. We assume that values are quoted,
  // this hasn't been an issue yet...
  const pattern = /(\w+?)="(.*?)"/g;

  const value: ParsedWWWAuthenticate = {};

  let match: string[] | null;
  while ((match = pattern.exec(wwwAuthenticate)) !== null) {
    value[match[1] as keyof ParsedWWWAuthenticate] = match[2];
  }

  return value;
}
