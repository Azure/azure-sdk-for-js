// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * How long before a session expires that a proactive background refresh is started.
 */
export const SESSION_REFRESH_BUFFER_MS = 30 * 1000;

/**
 * How long bearer-token fallback is cached after a fallback-eligible CreateSession failure,
 * so repeated soft failures don't storm the service.
 */
export const FALLBACK_COOLDOWN_MS = 5 * 60 * 1000;

/**
 * A session acquired from the Create Session API, usable to sign requests.
 */
export interface ActiveSession {
  readonly kind: "session";
  /** Opaque token sent in the `Authorization` header. Treat as a credential. */
  readonly sessionToken: string;
  /** Base64 symmetric key used to sign requests with the Shared Key protocol. Treat as a credential. */
  readonly sessionKey: string;
  /** Epoch milliseconds at which the session is no longer usable. */
  readonly expiresOnTimestamp: number;
  /** Epoch milliseconds at which a proactive background refresh should start. */
  readonly refreshAfterTimestamp: number;
}

/**
 * Sentinel recording that session acquisition failed in a way that should fall back to bearer
 * token authentication. Cached like a real session so the fallback is honored for a cooldown.
 */
export interface BearerFallback {
  readonly kind: "bearerFallback";
  /** Epoch milliseconds at which the cooldown ends and acquisition is retried. */
  readonly expiresOnTimestamp: number;
  /** Epoch milliseconds at which a proactive background refresh should start. */
  readonly refreshAfterTimestamp: number;
}

/**
 * A cached session entry: either a usable session or a bearer-fallback sentinel.
 *
 * Modeled as a discriminated union so that signing code cannot reach `sessionKey` without
 * first ruling out the fallback case.
 */
export type SessionTokenInfo = ActiveSession | BearerFallback;

/**
 * Creates a session entry from a Create Session response, scheduling the background refresh
 * {@link SESSION_REFRESH_BUFFER_MS} before expiry.
 */
export function createActiveSession(
  sessionToken: string,
  sessionKey: string,
  expiresOn: Date,
): ActiveSession {
  const expiresOnTimestamp = expiresOn.getTime();
  return {
    kind: "session",
    sessionToken,
    sessionKey,
    expiresOnTimestamp,
    refreshAfterTimestamp: expiresOnTimestamp - SESSION_REFRESH_BUFFER_MS,
  };
}

/**
 * Creates a bearer-fallback sentinel that stays in effect for `cooldownMs`.
 */
export function createBearerFallback(cooldownMs: number = FALLBACK_COOLDOWN_MS): BearerFallback {
  const expiresOnTimestamp = Date.now() + cooldownMs;
  return {
    kind: "bearerFallback",
    expiresOnTimestamp,
    // No refresh buffer, so the cooldown is honored in full with no early re-acquire.
    refreshAfterTimestamp: expiresOnTimestamp,
  };
}
