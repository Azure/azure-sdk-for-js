// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KeyCredential, TokenCredential, isTokenCredential } from "@azure/core-auth";
import { bearerTokenAuthenticationPolicy } from "@azure/core-rest-pipeline";
import { createFormRecognizerAzureKeyCredentialPolicy } from "./azureKeyCredentialPolicy";
import { DEFAULT_COGNITIVE_SCOPE } from "./constants";
import { GeneratedClient, GeneratedClientOptionalParams } from "./generated";
import { DEFAULT_GENERATED_CLIENT_OPTIONS } from "./options/FormRecognizerClientOptions";

import * as Mappers from "./generated/models/mappers";
import { createSerializer } from "@azure/core-client";
export { Mappers };

// This is used for URL request processing.
export const SERIALIZER = createSerializer(Mappers, false);

/** @internal */
export const identity = <T>(x: T): T => x;

/**
 * Type-strong uncapitalization.
 * @internal
 */
export const uncapitalize = <S extends string = string>(s: string): Uncapitalize<S> =>
  (s.substring(0, 1).toLowerCase() + s.substring(1)) as Uncapitalize<S>;

/**
 * Type-strong capitalization
 * @internal
 */
export const capitalize = <S extends string = string>(s: S): Capitalize<S> =>
  (s.substring(0, 1).toUpperCase() + s.substring(1)) as Capitalize<S>;

/**
 * A string that is a capital letter. See the `Acronymic` type for the use of this seemingly-trivial type.
 * @hidden
 */
export type EnglishCapitalLetter =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z";

/**
 * The type of a string that starts with at least two capital letters. Such strings appear to be "acronymic" for the
 * purposes of our naming convention. This information is used to determine whether or not a field of a document object
 * should be uncapitalized.
 *
 * Examples:
 * - "SSN" (Acronymic), will be mapped to a field of the same name ("SSN")
 * - "SocialSecurityNumber" (not Acronymic), will be mapped to the camelCase field name "socialSecurityNumber"
 *
 * @hidden
 */
export type Acronymic = `${EnglishCapitalLetter}${EnglishCapitalLetter}${string}`;

/**
 * Tests if a string looks like it begins with an acronym, i.e. it starts with two capital letters.
 * @internal
 */
export const isAcronymic = (s: string): s is Acronymic => {
  return /^[A-Z][A-Z]/.test(s);
};

/**
 * Map an optional value through a function
 * @internal
 */
export const maybemap = <T1, T2>(value: T1 | undefined, f: (v: T1) => T2): T2 | undefined =>
  value === undefined ? undefined : f(value);

/**
 * Create a GeneratedClient.
 * @internal
 */
export function makeServiceClient(
  endpoint: string,
  credential: KeyCredential | TokenCredential,
  options: GeneratedClientOptionalParams
): GeneratedClient {
  const client = new GeneratedClient(endpoint?.replace(/\/$/, ""), {
    ...DEFAULT_GENERATED_CLIENT_OPTIONS,
    ...options,
  });

  const authPolicy = isTokenCredential(credential)
    ? bearerTokenAuthenticationPolicy({
        credential,
        scopes: DEFAULT_COGNITIVE_SCOPE,
      })
    : createFormRecognizerAzureKeyCredentialPolicy(credential);

  client.pipeline.addPolicy(authPolicy);

  return client;
}
