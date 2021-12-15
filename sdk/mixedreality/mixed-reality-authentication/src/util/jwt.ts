// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { base64decode } from "./base64";

/**
 * Retrieves the expiration value from the JWT.
 *
 * @internal
 * @param jwtValue - The JWT value.
 */
export function retrieveJwtExpirationTimestamp(jwtValue: string): number {
  // Note: This only supports JWS Compact Serialization format.'
  //       JWE is not supported.

  if (!jwtValue) {
    throw new Error("Argument cannot be null or empty: 'jwt'.");
  }

  const jwtParts = jwtValue.split(".");

  if (jwtParts.length < 3) {
    throw new Error("Invalid JWT structure.");
  }

  const jwtPayloadEncoded = jwtParts[1];

  if (!jwtPayloadEncoded) {
    throw new Error("Invalid JWT payload.");
  }

  const jwtPayloadDecoded = base64decode(jwtPayloadEncoded);

  const jwtPayload = JSON.parse(jwtPayloadDecoded);
  if (!jwtPayload.exp) {
    throw new Error("Invalid JWT payload structure. No expiration.");
  }

  // The JWT expiry value is in seconds-since-epoch whereas JS Dates are in milliseconds-since-epoch.
  return 1000 * Number.parseInt(jwtPayload.exp);
}
