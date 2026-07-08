// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessToken } from "@azure/core-auth";
import { jwtDecode } from "jwt-decode";
import { logger } from "./logger.js";

interface JwtToken {
  exp: number;
}

/**
 * Default lifetime (in seconds) assumed for an encrypted/undecodable token when no expiry is
 * supplied. Must stay in step with `defaultExpiringSoonInterval` (10 min) in
 * autoRefreshTokenCredential.ts: the "refresh an opaque token at half-life" behavior relies on a
 * fresh fallback token immediately landing in the expiring-soon window.
 */
const defaultUndecodableTokenExpiryIntervalInSeconds = 10 * 60;

let undecodableTokenWarningEmitted = false;

/** Type guard for a caller-supplied {@link AccessToken} (carries a valid explicit expiry). */
export const isAccessToken = (value: unknown): value is AccessToken =>
  typeof value === "object" &&
  value !== null &&
  typeof (value as AccessToken).token === "string" &&
  (value as AccessToken).token.length > 0 &&
  typeof (value as AccessToken).expiresOnTimestamp === "number" &&
  Number.isFinite((value as AccessToken).expiresOnTimestamp);

/**
 * Accepts a token that can't be decoded (encrypted/opaque, or a JWT without a usable `exp`) and
 * assigns a fallback expiry of `now + undecodableTokenExpiryIntervalInSeconds`. Emits a one-time
 * warning; throws if the interval is not a positive, finite number.
 */
const resolveOpaqueToken = (
  token: string,
  undecodableTokenExpiryIntervalInSeconds: number,
): AccessToken => {
  if (
    !Number.isFinite(undecodableTokenExpiryIntervalInSeconds) ||
    undecodableTokenExpiryIntervalInSeconds <= 0
  ) {
    throw new Error("undecodableTokenExpiryIntervalInSeconds must be a positive number.");
  }
  if (!undecodableTokenWarningEmitted) {
    undecodableTokenWarningEmitted = true;
    logger.warning(
      `Received a token that could not be decoded; treating it as opaque and assuming a ${undecodableTokenExpiryIntervalInSeconds}s lifetime. ` +
        `Supply an AccessToken with an explicit expiry (e.g. from the token response 'expires_in') to control refresh scheduling.`,
    );
  }
  return {
    token,
    expiresOnTimestamp: Date.now() + undecodableTokenExpiryIntervalInSeconds * 1000,
  };
};

/**
 * Resolves a token into an {@link AccessToken}. Expiry is taken from a caller-supplied
 * `AccessToken` if present, otherwise from the JWT `exp` claim. A token that cannot be decoded
 * (e.g. an encrypted/opaque token) or that lacks a usable `exp` is accepted as-is with a fallback
 * expiry of `now + undecodableTokenExpiryIntervalInSeconds`; an empty/blank token throws.
 */
export const parseToken = (
  token: string | AccessToken,
  undecodableTokenExpiryIntervalInSeconds: number = defaultUndecodableTokenExpiryIntervalInSeconds,
): AccessToken => {
  // Caller supplied an explicit expiry — use it as-is.
  if (isAccessToken(token)) {
    return token;
  }
  if (typeof token !== "string") {
    throw new Error(
      "Invalid token: expected a string or an AccessToken with a non-empty token and a finite expiresOnTimestamp.",
    );
  }
  if (token.trim().length === 0) {
    throw new Error("Invalid token: token must not be empty.");
  }

  // Prefer the expiry from a decodable JWT.
  try {
    const { exp } = jwtDecode<JwtToken>(token);
    if (typeof exp === "number" && Number.isFinite(exp)) {
      return {
        token,
        expiresOnTimestamp: exp * 1000,
      };
    }
  } catch {
    // Not decodable — treated as an opaque token below.
  }

  return resolveOpaqueToken(token, undecodableTokenExpiryIntervalInSeconds);
};
