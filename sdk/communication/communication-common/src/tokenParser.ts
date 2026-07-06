// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessToken } from "@azure/core-auth";
import { jwtDecode } from "jwt-decode";

interface JwtToken {
  exp: number;
}

/** Default lifetime (in seconds) assumed for an encrypted/undecodable token when no expiry is supplied. */
const defaultUndecodableTokenExpiryIntervalInSeconds = 10 * 60;

/** Type guard for a caller-supplied {@link AccessToken} (carries an explicit expiry). */
export const isAccessToken = (value: unknown): value is AccessToken =>
  typeof value === "object" && value !== null && "token" in value && "expiresOnTimestamp" in value;

/**
 * Resolves a token into an {@link AccessToken}. Expiry is taken from a caller-supplied
 * `AccessToken` if present, otherwise from the JWT `exp` claim. A token that can't be
 * decoded (e.g. an encrypted/opaque token) is returned as-is with a fallback expiry of
 * `now + undecodableTokenExpiryIntervalInSeconds`; only an empty/blank token throws.
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
    // An empty/blank token is always a caller bug; anything else is treated as an
    // opaque token and passed through with the fallback expiry.
    if (token.trim().length === 0) {
      throw error;
    }
    if (
      !Number.isFinite(undecodableTokenExpiryIntervalInSeconds) ||
      undecodableTokenExpiryIntervalInSeconds <= 0
    ) {
      throw new Error("undecodableTokenExpiryIntervalInSeconds must be a positive number.");
    }
    return {
      token,
      expiresOnTimestamp: Date.now() + undecodableTokenExpiryIntervalInSeconds * 1000,
    };
  }
};
