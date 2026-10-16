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

  it("does not share an ordinary in-flight refresh with a claims challenge", async function () {
    let resolveOrdinary: (token: Awaited<ReturnType<TokenCredential["getToken"]>>) => void;
    let resolveClaim: (token: Awaited<ReturnType<TokenCredential["getToken"]>>) => void;
    const ordinaryToken = new Promise<Awaited<ReturnType<TokenCredential["getToken"]>>>(
      (resolve) => {
        resolveOrdinary = resolve;
      },
    );
    const claimToken = new Promise<Awaited<ReturnType<TokenCredential["getToken"]>>>((resolve) => {
      resolveClaim = resolve;
    });
    const getToken = vi.fn<TokenCredential["getToken"]>((_, options) =>
      options?.claims === "claim-A" ? claimToken : ordinaryToken,
    );
    const getAccessToken = createTokenCycler({ getToken });

    const ordinaryRefresh = getAccessToken(["scope"], { enableCae: true });
    const claimsRefresh = getAccessToken(["scope"], { enableCae: true, claims: "claim-A" });

    expect(getToken).toHaveBeenCalledTimes(2);
    expect(getToken).toHaveBeenNthCalledWith(2, ["scope"], { enableCae: true, claims: "claim-A" });

    resolveClaim!({ token: "claim-A", expiresOnTimestamp: Date.now() + 300_000 });
    await expect(claimsRefresh).resolves.toMatchObject({ token: "claim-A" });

    resolveOrdinary!({ token: "ordinary", expiresOnTimestamp: Date.now() + 60_000 });
    await expect(ordinaryRefresh).resolves.toMatchObject({ token: "ordinary" });

    await expect(getAccessToken(["scope"], { enableCae: true })).resolves.toMatchObject({
      token: "claim-A",
    });
    expect(getToken).toHaveBeenCalledTimes(2);
  });

  it("deduplicates identical claims refreshes but keeps different claims isolated", async function () {
    let resolveClaimA: (token: Awaited<ReturnType<TokenCredential["getToken"]>>) => void;
    let resolveClaimB: (token: Awaited<ReturnType<TokenCredential["getToken"]>>) => void;
    const claimAToken = new Promise<Awaited<ReturnType<TokenCredential["getToken"]>>>((resolve) => {
      resolveClaimA = resolve;
    });
    const claimBToken = new Promise<Awaited<ReturnType<TokenCredential["getToken"]>>>((resolve) => {
      resolveClaimB = resolve;
    });
    const getToken = vi.fn<TokenCredential["getToken"]>((_, options) => {
      if (options?.claims === "claim-A") {
        return claimAToken;
      }
      if (options?.claims === "claim-B") {
        return claimBToken;
      }
      throw new Error("unexpected token request");
    });
    const getAccessToken = createTokenCycler({ getToken });

    const firstClaimARefresh = getAccessToken(["scope"], { claims: "claim-A", enableCae: true });
    const secondClaimARefresh = getAccessToken(["scope"], { claims: "claim-A", enableCae: true });
    const claimBRefresh = getAccessToken(["scope"], { claims: "claim-B", enableCae: true });

    expect(getToken).toHaveBeenCalledTimes(2);

    resolveClaimA!({ token: "claim-A", expiresOnTimestamp: Date.now() + 60_000 });
    await expect(firstClaimARefresh).resolves.toMatchObject({ token: "claim-A" });
    await expect(secondClaimARefresh).resolves.toMatchObject({ token: "claim-A" });

    resolveClaimB!({ token: "claim-B", expiresOnTimestamp: Date.now() + 60_000 });
    await expect(claimBRefresh).resolves.toMatchObject({ token: "claim-B" });
    expect(getToken).toHaveBeenCalledTimes(2);
  });

  it("retries in the while loop when getToken throws before timeout, then succeeds", async function () {
    // To cover lines 68 (catch block) and 85-87 (while loop):
    // Need: an existing token whose expiry is in the future but within forcedRefreshWindow
    // so mustRefresh is true AND Date.now() < refreshTimeout (= token.expiresOnTimestamp)
    const tokenExpiry = Date.now() + 5000; // 5 seconds from now

    const getToken = vi.fn<TokenCredential["getToken"]>();
    getToken.mockResolvedValueOnce({ token: "initial-token", expiresOnTimestamp: tokenExpiry });
    getToken.mockRejectedValueOnce(new Error("transient failure"));
    getToken.mockResolvedValueOnce({
      token: "refreshed-token",
      expiresOnTimestamp: Date.now() + 1000 * 60 * 60,
    });

    const credential: TokenCredential = {
      getToken: getToken,
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
    expect(getToken).toHaveBeenCalledTimes(3);
  });
});
