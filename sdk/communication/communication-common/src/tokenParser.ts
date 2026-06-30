// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessToken } from "@azure/core-auth";
import { jwtDecode } from "jwt-decode";

interface JwtToken {
  exp: number;
}

/** Default lifetime assumed for an encrypted/undecodable token when no expiry is supplied. */
export const defaultUndecodableTokenExpiryIntervalInMs = 10 * 60 * 1000;

// A compact JWE (encrypted JWT) has five segments; a signed JWT has three.
const isEncryptedJwt = (token: string): boolean => token.split(".").length === 5;

/**
 * Resolves a token into an {@link AccessToken}. Expiry is taken from a caller-supplied
 * `AccessToken` if present, otherwise from the JWT `exp` claim. Encrypted tokens that
 * can't be decoded fall back to `now + undecodableTokenExpiryIntervalInMs`; malformed
 * strings still throw.
 */
export const parseToken = (
  token: string | AccessToken,
  undecodableTokenExpiryIntervalInMs: number = defaultUndecodableTokenExpiryIntervalInMs,
): AccessToken => {
  if (typeof token !== "string") {
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
      expiresOnTimestamp: Date.now() + undecodableTokenExpiryIntervalInMs,
    };
  }
};
