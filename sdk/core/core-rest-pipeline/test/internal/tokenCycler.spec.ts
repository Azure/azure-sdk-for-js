// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { GetTokenOptions, TokenCredential } from "@azure/core-auth";
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

  const requestIdentityCases: Array<{
    name: string;
    firstScopes: string | string[];
    secondScopes: string | string[];
    firstOptions: GetTokenOptions;
    secondOptions: GetTokenOptions;
  }> = [
    { name: "scopes", firstScopes: ["scope-A"], secondScopes: ["scope-B"], firstOptions: {}, secondOptions: {} },
    { name: "tenantId", firstScopes: ["scope"], secondScopes: ["scope"], firstOptions: { tenantId: "tenant-A" }, secondOptions: { tenantId: "tenant-B" } },
    { name: "claims", firstScopes: ["scope"], secondScopes: ["scope"], firstOptions: { claims: "claims-A" }, secondOptions: { claims: "claims-B" } },
    { name: "enableCae", firstScopes: ["scope"], secondScopes: ["scope"], firstOptions: { enableCae: false }, secondOptions: { enableCae: true } },
    { name: "proof-of-possession", firstScopes: ["scope"], secondScopes: ["scope"], firstOptions: { proofOfPossessionOptions: { nonce: "nonce-A", resourceRequestMethod: "GET", resourceRequestUrl: "https://example.test/a" } }, secondOptions: { proofOfPossessionOptions: { nonce: "nonce-B", resourceRequestMethod: "GET", resourceRequestUrl: "https://example.test/a" } } },
  ];

  for (const testCase of requestIdentityCases) {
    it(`isolates overlapping refreshes with different ${testCase.name} values`, async function () {
      const resolvers: Array<(token: Awaited<ReturnType<TokenCredential["getToken"]>>) => void> = [];
      const getToken = vi.fn<TokenCredential["getToken"]>(
        () =>
          new Promise<Awaited<ReturnType<TokenCredential["getToken"]>>>((resolve) => {
            resolvers.push(resolve);
          }),
      );
      const getAccessToken = createTokenCycler({ getToken });
      const first = getAccessToken(testCase.firstScopes, testCase.firstOptions);
      const second = getAccessToken(testCase.secondScopes, testCase.secondOptions);
      expect(getToken).toHaveBeenCalledTimes(2);
      resolvers[1]!({ token: "second", expiresOnTimestamp: Date.now() + 300_000 });
      await expect(second).resolves.toMatchObject({ token: "second" });
      resolvers[0]!({ token: "first", expiresOnTimestamp: Date.now() + 300_000 });
      await expect(first).resolves.toMatchObject({ token: "first" });
    });

    it(`deduplicates matching ${testCase.name} values`, async function () {
      let resolveToken!: (token: Awaited<ReturnType<TokenCredential["getToken"]>>) => void;
      const token = new Promise<Awaited<ReturnType<TokenCredential["getToken"]>>>((resolve) => { resolveToken = resolve; });
      const getToken = vi.fn<TokenCredential["getToken"]>(() => token);
      const getAccessToken = createTokenCycler({ getToken });
      const first = getAccessToken(testCase.firstScopes, testCase.firstOptions);
      const matching = getAccessToken(testCase.firstScopes, testCase.firstOptions);
      expect(getToken).toHaveBeenCalledOnce();
      resolveToken!({ token: "shared", expiresOnTimestamp: Date.now() + 300_000 });
      await expect(first).resolves.toMatchObject({ token: "shared" });
      await expect(matching).resolves.toMatchObject({ token: "shared" });
    });
  }

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
