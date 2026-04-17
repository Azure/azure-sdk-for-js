// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TokenCredential } from "@azure/core-auth";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";
import { createTokenCycler, DEFAULT_CYCLER_OPTIONS } from "../../src/util/tokenCycler.js";

describe("tokenCycler", function () {
  beforeEach(() => {
    vi.useFakeTimers({ now: Date.now() });
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("throws when getToken always returns null and no existing token (timeout immediate)", async function () {
    // When token is null, refreshTimeout = Date.now(), so tryGetAccessToken goes to
    // the else branch immediately (line 71), calls getToken, gets null, throws (line 75)
    const credential: TokenCredential = {
      getToken: async () => null,
    };

    const getAccessToken = createTokenCycler(credential, {
      retryIntervalInMs: 50,
      refreshWindowInMs: DEFAULT_CYCLER_OPTIONS.refreshWindowInMs,
      forcedRefreshWindowInMs: DEFAULT_CYCLER_OPTIONS.forcedRefreshWindowInMs,
    });

    // token is null, so mustRefresh is true. beginRefresh gets refreshTimeout = Date.now().
    // Since Date.now() >= refreshTimeout, it goes to else branch, calls getToken which returns null, throws.
    await expect(getAccessToken(["scope"], {})).rejects.toThrow("Failed to refresh access token.");
  });

  it("retries in the while loop when getToken throws before timeout, then succeeds", async function () {
    // To cover lines 68 (catch block) and 85-87 (while loop):
    // Need: an existing token whose expiry is in the future but within forcedRefreshWindow
    // so mustRefresh is true AND Date.now() < refreshTimeout (= token.expiresOnTimestamp)
    let callCount = 0;
    const tokenExpiry = Date.now() + 5000; // 5 seconds from now

    const credential: TokenCredential = {
      getToken: async () => {
        callCount++;
        if (callCount === 1) {
          // Initial token
          return { token: "initial-token", expiresOnTimestamp: tokenExpiry };
        }
        if (callCount === 2) {
          // During refresh, throw to hit line 68 (catch -> return null -> while loop)
          throw new Error("transient failure");
        }
        // On retry, succeed
        return {
          token: "refreshed-token",
          expiresOnTimestamp: Date.now() + 1000 * 60 * 60,
        };
      },
    };

    const getAccessToken = createTokenCycler(credential, {
      retryIntervalInMs: 100,
      refreshWindowInMs: 1000 * 60 * 60, // very large - always shouldRefresh
      forcedRefreshWindowInMs: 10000, // 10s - makes mustRefresh true (tokenExpiry - 10000 < Date.now())
    });

    // First call: gets initial token. mustRefresh is true because token is null.
    const token1 = await getAccessToken(["scope"], {});
    assert.equal(token1.token, "initial-token");

    // Second call: token.expiresOnTimestamp - forcedRefreshWindowInMs < Date.now()
    // So mustRefresh is true. beginRefresh is called with refreshTimeout = tokenExpiry (5000ms in the future).
    // getToken throws (callCount === 2), caught at line 68, returns null.
    // Enters while loop (line 84-87), delays, then retries.
    const tokenPromise = getAccessToken(["scope"], {});

    // Advance timers to let the delay in the while loop resolve
    await vi.advanceTimersByTimeAsync(200);

    const token2 = await tokenPromise;
    assert.equal(token2.token, "refreshed-token");
    assert.isTrue(callCount >= 3);
  });
});
