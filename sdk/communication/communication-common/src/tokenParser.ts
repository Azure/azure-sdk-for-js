// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessToken } from "@azure/core-auth";
import { jwtDecode } from "jwt-decode";

interface JwtToken {
  exp: number;
}

/** Default lifetime (in seconds) assumed for an encrypted/undecodable token when no expiry is supplied. */
export const defaultUndecodableTokenExpiryIntervalInSeconds = 10 * 60;

// A compact JWE (encrypted JWT) has five segments; a signed JWT has three.
const isEncryptedJwt = (token: string): boolean => token.split(".").length === 5;

/** Type guard for a caller-supplied {@link AccessToken} (carries an explicit expiry). */
export const isAccessToken = (value: unknown): value is AccessToken =>
  typeof value === "object" && value !== null && "token" in value && "expiresOnTimestamp" in value;

/**
 * Resolves a token into an {@link AccessToken}. Expiry is taken from a caller-supplied
 * `AccessToken` if present, otherwise from the JWT `exp` claim. Encrypted tokens that
 * can't be decoded fall back to `now + undecodableTokenExpiryIntervalInSeconds`; malformed
 * strings still throw.
 */
export const parseToken = (
  token: string | AccessToken,
  undecodableTokenExpiryIntervalInSeconds: number = defaultUndecodableTokenExpiryIntervalInSeconds,
): AccessToken => {
  // Caller supplied an explicit expiry — use it as-is.
  if (isAccessToken(token)) {
    return token;
  }

  try {
    const { exp } = jwtDecode<JwtToken>(token);
    return {
      token,
      expiresOnTimestamp: exp * 1000,
    };
  } catch (error) {
    if (!isEncryptedJwt(token)) {
      throw error;
    }
    return {
      token,
      expiresOnTimestamp: Date.now() + undecodableTokenExpiryIntervalInSeconds * 1000,
    };
  }
};
