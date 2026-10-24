// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { GetTokenOptions, TokenCredential } from "@azure/core-auth";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";
import { createTokenCycler, DEFAULT_CYCLER_OPTIONS } from "../../src/util/tokenCycler.js";

const requestIdentityCases: Array<{
  name: string;
  firstScopes: string | string[];
  secondScopes: string | string[];
  firstOptions: GetTokenOptions;
  secondOptions: GetTokenOptions;
}> = [
  {
    name: "scopes",
    firstScopes: ["scope-A"],
    secondScopes: ["scope-B"],
    firstOptions: {},
    secondOptions: {},
  },
  {
    name: "tenantId",
    firstScopes: ["scope"],
    secondScopes: ["scope"],
    firstOptions: { tenantId: "tenant-A" },
    secondOptions: { tenantId: "tenant-B" },
  },
  {
    name: "enableCae",
    firstScopes: ["scope"],
    secondScopes: ["scope"],
    firstOptions: { enableCae: false },
    secondOptions: { enableCae: true },
  },
  {
    name: "proof-of-possession nonce",
    firstScopes: ["scope"],
    secondScopes: ["scope"],
    firstOptions: {
      proofOfPossessionOptions: {
        nonce: "nonce-A",
        resourceRequestMethod: "GET",
        resourceRequestUrl: "https://example.test/resource",
      },
    },
    secondOptions: {
      proofOfPossessionOptions: {
        nonce: "nonce-B",
        resourceRequestMethod: "GET",
        resourceRequestUrl: "https://example.test/resource",
      },
    },
  },
  {
    name: "proof-of-possession request method",
    firstScopes: ["scope"],
    secondScopes: ["scope"],
    firstOptions: {
      proofOfPossessionOptions: {
        nonce: "nonce",
        resourceRequestMethod: "GET",
        resourceRequestUrl: "https://example.test/resource",
      },
    },
    secondOptions: {
      proofOfPossessionOptions: {
        nonce: "nonce",
        resourceRequestMethod: "POST",
        resourceRequestUrl: "https://example.test/resource",
      },
    },
  },
  {
    name: "proof-of-possession request URL",
    firstScopes: ["scope"],
    secondScopes: ["scope"],
    firstOptions: {
      proofOfPossessionOptions: {
        nonce: "nonce",
        resourceRequestMethod: "GET",
        resourceRequestUrl: "https://example.test/resource-A",
      },
    },
    secondOptions: {
      proofOfPossessionOptions: {
        nonce: "nonce",
        resourceRequestMethod: "GET",
        resourceRequestUrl: "https://example.test/resource-B",
      },
    },
  },
];

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

  for (const testCase of requestIdentityCases) {
    it(`keeps overlapping refreshes with different ${testCase.name} values isolated`, async function () {
      const resolvers: Array<(token: Awaited<ReturnType<TokenCredential["getToken"]>>) => void> =
        [];
      const getToken = vi.fn<TokenCredential["getToken"]>(
        () =>
          new Promise<Awaited<ReturnType<TokenCredential["getToken"]>>>((resolve) => {
            resolvers.push(resolve);
          }),
      );
      const getAccessToken = createTokenCycler({ getToken });

      const firstRefresh = getAccessToken(testCase.firstScopes, testCase.firstOptions);
      const secondRefresh = getAccessToken(testCase.secondScopes, testCase.secondOptions);

      expect(getToken).toHaveBeenCalledTimes(2);
      resolvers[1]!({ token: "second", expiresOnTimestamp: Date.now() + 300_000 });
      await expect(secondRefresh).resolves.toMatchObject({ token: "second" });

      resolvers[0]!({ token: "first", expiresOnTimestamp: Date.now() + 300_000 });
      await expect(firstRefresh).resolves.toMatchObject({ token: "first" });
    });

    it(`deduplicates overlapping refreshes with matching ${testCase.name} values`, async function () {
      let resolveToken: (token: Awaited<ReturnType<TokenCredential["getToken"]>>) => void;
      const token = new Promise<Awaited<ReturnType<TokenCredential["getToken"]>>>((resolve) => {
        resolveToken = resolve;
      });
      const getToken = vi.fn<TokenCredential["getToken"]>(() => token);
      const getAccessToken = createTokenCycler({ getToken });

      const firstRefresh = getAccessToken(testCase.firstScopes, testCase.firstOptions);
      const matchingRefresh = getAccessToken(testCase.firstScopes, testCase.firstOptions);

      expect(getToken).toHaveBeenCalledOnce();
      resolveToken!({ token: "shared", expiresOnTimestamp: Date.now() + 300_000 });
      await expect(firstRefresh).resolves.toMatchObject({ token: "shared" });
      await expect(matchingRefresh).resolves.toMatchObject({ token: "shared" });
    });

    it(`does not reuse a settled token for a different ${testCase.name} value`, async function () {
      const getToken = vi
        .fn<TokenCredential["getToken"]>()
        .mockResolvedValueOnce({ token: "first", expiresOnTimestamp: Date.now() + 300_000 })
        .mockResolvedValueOnce({ token: "second", expiresOnTimestamp: Date.now() + 300_000 });
      const getAccessToken = createTokenCycler({ getToken });

      await expect(
        getAccessToken(testCase.firstScopes, testCase.firstOptions),
      ).resolves.toMatchObject({
        token: "first",
      });
      await expect(
        getAccessToken(testCase.secondScopes, testCase.secondOptions),
      ).resolves.toMatchObject({
        token: "second",
      });
      await expect(
        getAccessToken(testCase.firstScopes, testCase.firstOptions),
      ).resolves.toMatchObject({
        token: "first",
      });
      await expect(
        getAccessToken(testCase.secondScopes, testCase.secondOptions),
      ).resolves.toMatchObject({
        token: "second",
      });
      expect(getToken).toHaveBeenCalledTimes(2);
    });
  }

  it("bounds settled tokens for changing request identities", async function () {
    const getToken = vi.fn<TokenCredential["getToken"]>((scopes) =>
      Promise.resolve({
        token: Array.isArray(scopes) ? scopes.join(" ") : scopes,
        expiresOnTimestamp: Date.now() + 300_000,
      }),
    );
    const getAccessToken = createTokenCycler({ getToken });

    for (let index = 0; index <= 100; index += 1) {
      await getAccessToken([`scope-${index}`], {});
    }
    await getAccessToken(["scope-0"], {});

    // The cycler keeps only the 100 most recently refreshed identities, so a
    // long-lived client with changing scopes or PoP inputs cannot retain every
    // historical token indefinitely.
    expect(getToken).toHaveBeenCalledTimes(102);
  });

  it("keeps a valid cached token when a claims refresh fails", async function () {
    const claimsError = new Error("claims refresh failed");
    const getToken = vi.fn<TokenCredential["getToken"]>((_, requestOptions) => {
      if (requestOptions?.claims === "claim-A") {
        return Promise.reject(claimsError);
      }
      return Promise.resolve({ token: "cached", expiresOnTimestamp: Date.now() + 300_000 });
    });
    const getAccessToken = createTokenCycler({ getToken });

    await expect(getAccessToken(["scope"], { enableCae: true })).resolves.toMatchObject({
      token: "cached",
    });
    await expect(getAccessToken(["scope"], { enableCae: true, claims: "claim-A" })).rejects.toThrow(
      claimsError,
    );
    await expect(getAccessToken(["scope"], { enableCae: true })).resolves.toMatchObject({
      token: "cached",
    });
    expect(getToken).toHaveBeenCalledTimes(2);
  });

  it("caches a completed ordinary refresh after the concurrent claims refresh fails", async function () {
    let resolveOrdinary: (token: Awaited<ReturnType<TokenCredential["getToken"]>>) => void;
    let rejectClaims: (reason?: unknown) => void;
    const ordinaryToken = new Promise<Awaited<ReturnType<TokenCredential["getToken"]>>>(
      (resolve) => {
        resolveOrdinary = resolve;
      },
    );
    const claimsToken = new Promise<Awaited<ReturnType<TokenCredential["getToken"]>>>(
      (resolve, reject) => {
        void resolve;
        rejectClaims = reject;
      },
    );
    const getToken = vi.fn<TokenCredential["getToken"]>((_, requestOptions) =>
      requestOptions?.claims === "claim-A" ? claimsToken : ordinaryToken,
    );
    const getAccessToken = createTokenCycler({ getToken });

    const claimsRefresh = getAccessToken(["scope"], { enableCae: true, claims: "claim-A" });
    const ordinaryRefresh = getAccessToken(["scope"], { enableCae: true });
    expect(getToken).toHaveBeenCalledTimes(2);

    resolveOrdinary!({ token: "ordinary", expiresOnTimestamp: Date.now() + 300_000 });
    await expect(ordinaryRefresh).resolves.toMatchObject({ token: "ordinary" });
    rejectClaims!(new Error("claims refresh failed"));
    await expect(claimsRefresh).rejects.toThrow("claims refresh failed");

    await expect(getAccessToken(["scope"], { enableCae: true })).resolves.toMatchObject({
      token: "ordinary",
    });
    expect(getToken).toHaveBeenCalledTimes(2);
  });

  it("renews a cached claims token with a later ordinary refresh", async function () {
    const getToken = vi
      .fn<TokenCredential["getToken"]>()
      .mockResolvedValueOnce({ token: "claim-A", expiresOnTimestamp: Date.now() + 60_000 })
      .mockResolvedValueOnce({ token: "ordinary", expiresOnTimestamp: Date.now() + 600_000 });
    const getAccessToken = createTokenCycler({ getToken });

    await expect(
      getAccessToken(["scope"], { enableCae: true, claims: "claim-A" }),
    ).resolves.toMatchObject({ token: "claim-A" });

    await expect(getAccessToken(["scope"], { enableCae: true })).resolves.toMatchObject({
      token: "claim-A",
    });
    await Promise.resolve();

    await expect(getAccessToken(["scope"], { enableCae: true })).resolves.toMatchObject({
      token: "ordinary",
    });
    expect(getToken).toHaveBeenCalledTimes(2);
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

  it("allows proactive renewal after a newer claims worker supersedes an older pending worker", async function () {
    let resolveClaimA: (token: Awaited<ReturnType<TokenCredential["getToken"]>>) => void;
    let resolveClaimB: (token: Awaited<ReturnType<TokenCredential["getToken"]>>) => void;
    let resolveOrdinary: (token: Awaited<ReturnType<TokenCredential["getToken"]>>) => void;
    const claimAToken = new Promise<Awaited<ReturnType<TokenCredential["getToken"]>>>((resolve) => {
      resolveClaimA = resolve;
    });
    const claimBToken = new Promise<Awaited<ReturnType<TokenCredential["getToken"]>>>((resolve) => {
      resolveClaimB = resolve;
    });
    const ordinaryToken = new Promise<Awaited<ReturnType<TokenCredential["getToken"]>>>(
      (resolve) => {
        resolveOrdinary = resolve;
      },
    );
    const getToken = vi.fn<TokenCredential["getToken"]>((_, requestOptions) => {
      if (requestOptions?.claims === "claim-A") {
        return claimAToken;
      }
      if (requestOptions?.claims === "claim-B") {
        return claimBToken;
      }
      return ordinaryToken;
    });
    const getAccessToken = createTokenCycler({ getToken });

    const claimARefresh = getAccessToken(["scope"], { claims: "claim-A", enableCae: true });
    const claimBRefresh = getAccessToken(["scope"], { claims: "claim-B", enableCae: true });

    resolveClaimB!({
      token: "claim-B",
      expiresOnTimestamp: Date.now() + 300_000,
      refreshAfterTimestamp: Date.now() - 1,
    });
    await expect(claimBRefresh).resolves.toMatchObject({ token: "claim-B" });

    await expect(getAccessToken(["scope"], { enableCae: true })).resolves.toMatchObject({
      token: "claim-B",
    });
    expect(getToken).toHaveBeenCalledTimes(3);
    expect(getToken).toHaveBeenLastCalledWith(["scope"], { enableCae: true });

    resolveOrdinary!({ token: "ordinary", expiresOnTimestamp: Date.now() + 300_000 });
    resolveClaimA!({ token: "claim-A", expiresOnTimestamp: Date.now() + 300_000 });
    await expect(claimARefresh).resolves.toMatchObject({ token: "claim-A" });
  });

  it("deduplicates alternating pending claims refreshes by request identity", async function () {
    let resolveClaimA: (token: Awaited<ReturnType<TokenCredential["getToken"]>>) => void;
    let resolveClaimB: (token: Awaited<ReturnType<TokenCredential["getToken"]>>) => void;
    const claimAToken = new Promise<Awaited<ReturnType<TokenCredential["getToken"]>>>((resolve) => {
      resolveClaimA = resolve;
    });
    const claimBToken = new Promise<Awaited<ReturnType<TokenCredential["getToken"]>>>((resolve) => {
      resolveClaimB = resolve;
    });
    const getToken = vi.fn<TokenCredential["getToken"]>((_, requestOptions) => {
      if (requestOptions?.claims === "claim-A") {
        return claimAToken;
      }
      if (requestOptions?.claims === "claim-B") {
        return claimBToken;
      }
      throw new Error("unexpected token request");
    });
    const getAccessToken = createTokenCycler({ getToken });

    const firstClaimARefresh = getAccessToken(["scope"], { claims: "claim-A", enableCae: true });
    const claimBRefresh = getAccessToken(["scope"], { claims: "claim-B", enableCae: true });
    const secondClaimARefresh = getAccessToken(["scope"], {
      claims: "claim-A",
      enableCae: true,
    });

    expect(getToken).toHaveBeenCalledTimes(2);

    resolveClaimA!({ token: "claim-A", expiresOnTimestamp: Date.now() + 300_000 });
    await expect(firstClaimARefresh).resolves.toMatchObject({ token: "claim-A" });
    await expect(secondClaimARefresh).resolves.toMatchObject({ token: "claim-A" });

    resolveClaimB!({ token: "claim-B", expiresOnTimestamp: Date.now() + 300_000 });
    await expect(claimBRefresh).resolves.toMatchObject({ token: "claim-B" });
  });

  it("caches a rejoined claims refresh after a newer challenge fails", async function () {
    let resolveClaimA: (token: Awaited<ReturnType<TokenCredential["getToken"]>>) => void;
    let rejectClaimB: (reason?: unknown) => void;
    const claimAToken = new Promise<Awaited<ReturnType<TokenCredential["getToken"]>>>((resolve) => {
      resolveClaimA = resolve;
    });
    const claimBToken = new Promise<Awaited<ReturnType<TokenCredential["getToken"]>>>(
      (_resolve, reject) => {
        rejectClaimB = reject;
      },
    );
    const getToken = vi.fn<TokenCredential["getToken"]>((_, requestOptions) => {
      if (requestOptions?.claims === "claim-A") {
        return claimAToken;
      }
      if (requestOptions?.claims === "claim-B") {
        return claimBToken;
      }
      throw new Error("ordinary request should reuse the cached claim-A token");
    });
    const getAccessToken = createTokenCycler({ getToken });

    const firstClaimARefresh = getAccessToken(["scope"], { claims: "claim-A", enableCae: true });
    const claimBRefresh = getAccessToken(["scope"], { claims: "claim-B", enableCae: true });
    const secondClaimARefresh = getAccessToken(["scope"], {
      claims: "claim-A",
      enableCae: true,
    });
    const rejectedClaimB = expect(claimBRefresh).rejects.toThrow("claim-B failed");

    expect(getToken).toHaveBeenCalledTimes(2);
    rejectClaimB!(new Error("claim-B failed"));
    await rejectedClaimB;

    resolveClaimA!({ token: "claim-A", expiresOnTimestamp: Date.now() + 300_000 });
    await expect(firstClaimARefresh).resolves.toMatchObject({ token: "claim-A" });
    await expect(secondClaimARefresh).resolves.toMatchObject({ token: "claim-A" });

    await expect(getAccessToken(["scope"], { enableCae: true })).resolves.toMatchObject({
      token: "claim-A",
    });
    expect(getToken).toHaveBeenCalledTimes(2);
  });

  it("preserves an earlier successful claims token when a newer claims refresh fails", async function () {
    let resolveClaimA: (token: Awaited<ReturnType<TokenCredential["getToken"]>>) => void;
    let rejectClaimB: (reason?: unknown) => void;
    const claimAToken = new Promise<Awaited<ReturnType<TokenCredential["getToken"]>>>((resolve) => {
      resolveClaimA = resolve;
    });
    const claimBToken = new Promise<Awaited<ReturnType<TokenCredential["getToken"]>>>(
      (_resolve, reject) => {
        rejectClaimB = reject;
      },
    );
    const getToken = vi.fn<TokenCredential["getToken"]>((_, requestOptions) => {
      if (requestOptions?.claims === "claim-A") {
        return claimAToken;
      }
      if (requestOptions?.claims === "claim-B") {
        return claimBToken;
      }
      throw new Error("ordinary request should reuse the successful claim-A token");
    });
    const getAccessToken = createTokenCycler({ getToken });

    const claimARefresh = getAccessToken(["scope"], { claims: "claim-A", enableCae: true });
    const claimBRefresh = getAccessToken(["scope"], { claims: "claim-B", enableCae: true });
    resolveClaimA!({ token: "claim-A", expiresOnTimestamp: Date.now() + 300_000 });
    await expect(claimARefresh).resolves.toMatchObject({ token: "claim-A" });

    const rejectedClaimB = expect(claimBRefresh).rejects.toThrow("claim-B failed");
    rejectClaimB!(new Error("claim-B failed"));
    await rejectedClaimB;

    await expect(getAccessToken(["scope"], { enableCae: true })).resolves.toMatchObject({
      token: "claim-A",
    });
    expect(getToken).toHaveBeenCalledTimes(2);
  });

  it("prefers a deferred claims result over an ordinary fallback after a newer challenge fails", async function () {
    let resolveClaimA: (token: Awaited<ReturnType<TokenCredential["getToken"]>>) => void;
    let rejectClaimB: (reason?: unknown) => void;
    let resolveOrdinary: (token: Awaited<ReturnType<TokenCredential["getToken"]>>) => void;
    const claimAToken = new Promise<Awaited<ReturnType<TokenCredential["getToken"]>>>((resolve) => {
      resolveClaimA = resolve;
    });
    const claimBToken = new Promise<Awaited<ReturnType<TokenCredential["getToken"]>>>(
      (_resolve, reject) => {
        rejectClaimB = reject;
      },
    );
    const ordinaryToken = new Promise<Awaited<ReturnType<TokenCredential["getToken"]>>>(
      (resolve) => {
        resolveOrdinary = resolve;
      },
    );
    const getToken = vi.fn<TokenCredential["getToken"]>((_, requestOptions) => {
      if (requestOptions?.claims === "claim-A") {
        return claimAToken;
      }
      if (requestOptions?.claims === "claim-B") {
        return claimBToken;
      }
      return ordinaryToken;
    });
    const getAccessToken = createTokenCycler({ getToken });

    const claimARefresh = getAccessToken(["scope"], { claims: "claim-A", enableCae: true });
    const claimBRefresh = getAccessToken(["scope"], { claims: "claim-B", enableCae: true });
    const ordinaryRefresh = getAccessToken(["scope"], { enableCae: true });
    expect(getToken).toHaveBeenCalledTimes(3);

    resolveClaimA!({ token: "claim-A", expiresOnTimestamp: Date.now() + 300_000 });
    await expect(claimARefresh).resolves.toMatchObject({ token: "claim-A" });

    const rejectedClaimB = expect(claimBRefresh).rejects.toThrow("claim-B failed");
    rejectClaimB!(new Error("claim-B failed"));
    await rejectedClaimB;

    await expect(getAccessToken(["scope"], { enableCae: true })).resolves.toMatchObject({
      token: "claim-A",
    });
    expect(getToken).toHaveBeenCalledTimes(3);

    resolveOrdinary!({ token: "ordinary", expiresOnTimestamp: Date.now() + 300_000 });
    await expect(ordinaryRefresh).resolves.toMatchObject({ token: "ordinary" });
    await expect(getAccessToken(["scope"], { enableCae: true })).resolves.toMatchObject({
      token: "claim-A",
    });
    expect(getToken).toHaveBeenCalledTimes(3);
  });

  it("does not let an ordinary worker started after a surviving claims worker overwrite it", async function () {
    let resolveClaimA: (token: Awaited<ReturnType<TokenCredential["getToken"]>>) => void;
    let rejectClaimB: (reason?: unknown) => void;
    let resolveOrdinary: (token: Awaited<ReturnType<TokenCredential["getToken"]>>) => void;
    const claimAToken = new Promise<Awaited<ReturnType<TokenCredential["getToken"]>>>((resolve) => {
      resolveClaimA = resolve;
    });
    const claimBToken = new Promise<Awaited<ReturnType<TokenCredential["getToken"]>>>(
      (_resolve, reject) => {
        rejectClaimB = reject;
      },
    );
    const ordinaryToken = new Promise<Awaited<ReturnType<TokenCredential["getToken"]>>>(
      (resolve) => {
        resolveOrdinary = resolve;
      },
    );
    const getToken = vi.fn<TokenCredential["getToken"]>((_, requestOptions) => {
      if (requestOptions?.claims === "claim-A") {
        return claimAToken;
      }
      if (requestOptions?.claims === "claim-B") {
        return claimBToken;
      }
      return ordinaryToken;
    });
    const getAccessToken = createTokenCycler({ getToken });

    const claimARefresh = getAccessToken(["scope"], { claims: "claim-A", enableCae: true });
    const claimBRefresh = getAccessToken(["scope"], { claims: "claim-B", enableCae: true });
    const rejectedClaimB = expect(claimBRefresh).rejects.toThrow("claim-B failed");
    rejectClaimB!(new Error("claim-B failed"));
    await rejectedClaimB;

    const ordinaryRefresh = getAccessToken(["scope"], { enableCae: true });
    expect(getToken).toHaveBeenCalledTimes(3);

    resolveClaimA!({ token: "claim-A", expiresOnTimestamp: Date.now() + 300_000 });
    await expect(claimARefresh).resolves.toMatchObject({ token: "claim-A" });
    resolveOrdinary!({ token: "ordinary", expiresOnTimestamp: Date.now() + 300_000 });
    await expect(ordinaryRefresh).resolves.toMatchObject({ token: "ordinary" });

    await expect(getAccessToken(["scope"], { enableCae: true })).resolves.toMatchObject({
      token: "claim-A",
    });
    expect(getToken).toHaveBeenCalledTimes(3);
  });

  it("reuses a completed ordinary refresh while a claims refresh is pending", async function () {
    let resolveClaims: (token: Awaited<ReturnType<TokenCredential["getToken"]>>) => void;
    let resolveOrdinary: (token: Awaited<ReturnType<TokenCredential["getToken"]>>) => void;
    const claimsToken = new Promise<Awaited<ReturnType<TokenCredential["getToken"]>>>((resolve) => {
      resolveClaims = resolve;
    });
    const ordinaryToken = new Promise<Awaited<ReturnType<TokenCredential["getToken"]>>>(
      (resolve) => {
        resolveOrdinary = resolve;
      },
    );
    const getToken = vi.fn<TokenCredential["getToken"]>((_, requestOptions) =>
      requestOptions?.claims === "claim-A" ? claimsToken : ordinaryToken,
    );
    const getAccessToken = createTokenCycler({ getToken });

    const claimsRefresh = getAccessToken(["scope"], { claims: "claim-A", enableCae: true });
    const ordinaryRefresh = getAccessToken(["scope"], { enableCae: true });
    resolveOrdinary!({ token: "ordinary", expiresOnTimestamp: Date.now() + 300_000 });
    await expect(ordinaryRefresh).resolves.toMatchObject({ token: "ordinary" });

    await expect(getAccessToken(["scope"], { enableCae: true })).resolves.toMatchObject({
      token: "ordinary",
    });
    expect(getToken).toHaveBeenCalledTimes(2);

    resolveClaims!({ token: "claim-A", expiresOnTimestamp: Date.now() + 300_000 });
    await expect(claimsRefresh).resolves.toMatchObject({ token: "claim-A" });
  });

  it("starts a cache-capable renewal after claims success retires an ordinary worker", async function () {
    let resolveClaims: (token: Awaited<ReturnType<TokenCredential["getToken"]>>) => void;
    let resolveOrdinaryDuringClaims: (
      token: Awaited<ReturnType<TokenCredential["getToken"]>>,
    ) => void;
    let resolveRenewal: (token: Awaited<ReturnType<TokenCredential["getToken"]>>) => void;
    const claimsToken = new Promise<Awaited<ReturnType<TokenCredential["getToken"]>>>((resolve) => {
      resolveClaims = resolve;
    });
    const ordinaryDuringClaimsToken = new Promise<Awaited<ReturnType<TokenCredential["getToken"]>>>(
      (resolve) => {
        resolveOrdinaryDuringClaims = resolve;
      },
    );
    const renewalToken = new Promise<Awaited<ReturnType<TokenCredential["getToken"]>>>(
      (resolve) => {
        resolveRenewal = resolve;
      },
    );
    let ordinaryRequests = 0;
    const getToken = vi.fn<TokenCredential["getToken"]>((_, requestOptions) => {
      if (requestOptions?.claims === "claim-A") {
        return claimsToken;
      }
      ordinaryRequests += 1;
      return ordinaryRequests === 1 ? ordinaryDuringClaimsToken : renewalToken;
    });
    const getAccessToken = createTokenCycler({ getToken });

    const claimsRefresh = getAccessToken(["scope"], { claims: "claim-A", enableCae: true });
    const ordinaryDuringClaimsRefresh = getAccessToken(["scope"], { enableCae: true });
    resolveClaims!({
      token: "claim-A",
      expiresOnTimestamp: Date.now() + 300_000,
      refreshAfterTimestamp: Date.now() - 1,
    });
    await expect(claimsRefresh).resolves.toMatchObject({ token: "claim-A" });

    await expect(getAccessToken(["scope"], { enableCae: true })).resolves.toMatchObject({
      token: "claim-A",
    });
    expect(getToken).toHaveBeenCalledTimes(3);

    resolveRenewal!({ token: "renewed", expiresOnTimestamp: Date.now() + 300_000 });
    await vi.advanceTimersByTimeAsync(0);
    await expect(getAccessToken(["scope"], { enableCae: true })).resolves.toMatchObject({
      token: "renewed",
    });

    resolveOrdinaryDuringClaims!({ token: "stale", expiresOnTimestamp: Date.now() + 300_000 });
    await expect(ordinaryDuringClaimsRefresh).resolves.toMatchObject({ token: "stale" });
  });

  it("starts a fresh ordinary worker after a claims challenge evicts a pre-challenge worker", async function () {
    let resolvePreChallenge: (token: Awaited<ReturnType<TokenCredential["getToken"]>>) => void;
    let resolvePostChallenge: (token: Awaited<ReturnType<TokenCredential["getToken"]>>) => void;
    let resolveClaim: (token: Awaited<ReturnType<TokenCredential["getToken"]>>) => void;
    const preChallengeToken = new Promise<Awaited<ReturnType<TokenCredential["getToken"]>>>(
      (resolve) => {
        resolvePreChallenge = resolve;
      },
    );
    const postChallengeToken = new Promise<Awaited<ReturnType<TokenCredential["getToken"]>>>(
      (resolve) => {
        resolvePostChallenge = resolve;
      },
    );
    const claimToken = new Promise<Awaited<ReturnType<TokenCredential["getToken"]>>>((resolve) => {
      resolveClaim = resolve;
    });
    let ordinaryRequestCount = 0;
    const getToken = vi.fn<TokenCredential["getToken"]>((_, requestOptions) => {
      if (requestOptions?.claims === "claim-A") {
        return claimToken;
      }

      ordinaryRequestCount += 1;
      if (ordinaryRequestCount === 1) {
        return Promise.resolve({
          token: "initial",
          expiresOnTimestamp: Date.now() + 300_000,
          refreshAfterTimestamp: Date.now() - 1,
        });
      }
      return ordinaryRequestCount === 2 ? preChallengeToken : postChallengeToken;
    });
    const getAccessToken = createTokenCycler({ getToken });

    await expect(getAccessToken(["scope"], { enableCae: true })).resolves.toMatchObject({
      token: "initial",
    });
    // Starts ordinary worker A while the initial token remains usable.
    await expect(getAccessToken(["scope"], { enableCae: true })).resolves.toMatchObject({
      token: "initial",
    });

    const claimsRefresh = getAccessToken(["scope"], { claims: "claim-A", enableCae: true });
    resolveClaim!({
      token: "claim-A",
      expiresOnTimestamp: Date.now() + 300_000,
      refreshAfterTimestamp: Date.now() - 1,
    });
    await expect(claimsRefresh).resolves.toMatchObject({ token: "claim-A" });

    // The challenge evicted A. B must start a new credential call instead of
    // rejoining A with its pre-challenge timeout and credentials.
    await expect(getAccessToken(["scope"], { enableCae: true })).resolves.toMatchObject({
      token: "claim-A",
    });
    expect(getToken).toHaveBeenCalledTimes(4);

    resolvePostChallenge!({ token: "ordinary-B", expiresOnTimestamp: Date.now() + 300_000 });
    await vi.advanceTimersByTimeAsync(0);
    await expect(getAccessToken(["scope"], { enableCae: true })).resolves.toMatchObject({
      token: "ordinary-B",
    });

    // A may still settle, but it can no longer overwrite B's post-challenge token.
    resolvePreChallenge!({ token: "ordinary-A", expiresOnTimestamp: Date.now() + 300_000 });
    await vi.advanceTimersByTimeAsync(0);
    await expect(getAccessToken(["scope"], { enableCae: true })).resolves.toMatchObject({
      token: "ordinary-B",
    });
  });

  it("keeps a pending claims refresh as the cache owner over an ordinary refresh", async function () {
    let resolveClaim: (token: Awaited<ReturnType<TokenCredential["getToken"]>>) => void;
    let resolveOrdinaryRefresh: (token: Awaited<ReturnType<TokenCredential["getToken"]>>) => void;
    const claimToken = new Promise<Awaited<ReturnType<TokenCredential["getToken"]>>>((resolve) => {
      resolveClaim = resolve;
    });
    const ordinaryRefreshToken = new Promise<Awaited<ReturnType<TokenCredential["getToken"]>>>(
      (resolve) => {
        resolveOrdinaryRefresh = resolve;
      },
    );
    let ordinaryRequestCount = 0;
    const getToken = vi.fn<TokenCredential["getToken"]>((_, requestOptions) => {
      if (requestOptions?.claims === "claim-A") {
        return claimToken;
      }

      ordinaryRequestCount += 1;
      if (ordinaryRequestCount === 1) {
        return Promise.resolve({
          token: "initial",
          expiresOnTimestamp: Date.now() + 300_000,
          refreshAfterTimestamp: Date.now() - 1,
        });
      }
      return ordinaryRefreshToken;
    });
    const getAccessToken = createTokenCycler({ getToken });

    await expect(getAccessToken(["scope"], { enableCae: true })).resolves.toMatchObject({
      token: "initial",
    });

    const claimsRefresh = getAccessToken(["scope"], { claims: "claim-A", enableCae: true });
    const ordinaryRefresh = getAccessToken(["scope"], { enableCae: true });
    expect(getToken).toHaveBeenCalledTimes(3);

    // The ordinary caller can keep using its still-valid cached token while its
    // background refresh waits. That worker must not replace a successful claim response.
    await expect(ordinaryRefresh).resolves.toMatchObject({ token: "initial" });
    resolveOrdinaryRefresh!({ token: "ordinary", expiresOnTimestamp: Date.now() + 300_000 });
    await vi.advanceTimersByTimeAsync(0);

    resolveClaim!({ token: "claim-A", expiresOnTimestamp: Date.now() + 300_000 });
    await expect(claimsRefresh).resolves.toMatchObject({ token: "claim-A" });

    await expect(getAccessToken(["scope"], { enableCae: true })).resolves.toMatchObject({
      token: "claim-A",
    });
    expect(getToken).toHaveBeenCalledTimes(3);
  });

  it("keeps a claims token after an evicted pre-challenge refresh fails", async function () {
    let rejectPreChallengeRefresh: (reason?: unknown) => void;
    let resolveClaimsRefresh: (token: Awaited<ReturnType<TokenCredential["getToken"]>>) => void;
    const rejectedPreChallengeToken = new Promise<Awaited<ReturnType<TokenCredential["getToken"]>>>(
      (_resolve, reject) => {
        rejectPreChallengeRefresh = reject;
      },
    );
    const claimsRefreshToken = new Promise<Awaited<ReturnType<TokenCredential["getToken"]>>>(
      (resolve) => {
        resolveClaimsRefresh = resolve;
      },
    );
    let ordinaryRequestCount = 0;
    const getToken = vi.fn<TokenCredential["getToken"]>((_, requestOptions) => {
      if (requestOptions?.claims === "claim-A") {
        return claimsRefreshToken;
      }

      ordinaryRequestCount += 1;
      if (ordinaryRequestCount === 1) {
        return Promise.resolve({
          token: "initial",
          expiresOnTimestamp: Date.now() + 300_000,
          refreshAfterTimestamp: Date.now() - 1,
        });
      }
      return rejectedPreChallengeToken;
    });
    const getAccessToken = createTokenCycler({ getToken });

    await expect(getAccessToken(["scope"], { enableCae: true })).resolves.toMatchObject({
      token: "initial",
    });
    // Start ordinary worker A while the initial token remains usable.
    await expect(getAccessToken(["scope"], { enableCae: true })).resolves.toMatchObject({
      token: "initial",
    });

    const claimsRefresh = getAccessToken(["scope"], { claims: "claim-A", enableCae: true });
    resolveClaimsRefresh!({ token: "claims", expiresOnTimestamp: Date.now() + 300_000 });
    await expect(claimsRefresh).resolves.toMatchObject({ token: "claims" });

    // A was evicted by the challenge. Its rejection must not clear B's token.
    rejectPreChallengeRefresh!(new Error("ordinary refresh failed"));
    await vi.advanceTimersByTimeAsync(1);

    await expect(getAccessToken(["scope"], { enableCae: true })).resolves.toMatchObject({
      token: "claims",
    });
  });

  it("observes a rejected superseded proactive refresh", async function () {
    let rejectProactive: (reason?: unknown) => void;
    let resolveClaim: (token: Awaited<ReturnType<TokenCredential["getToken"]>>) => void;
    const rejectedProactiveToken = new Promise<Awaited<ReturnType<TokenCredential["getToken"]>>>(
      (_resolve, reject) => {
        rejectProactive = reject;
      },
    );
    const claimToken = new Promise<Awaited<ReturnType<TokenCredential["getToken"]>>>((resolve) => {
      resolveClaim = resolve;
    });
    let ordinaryRequestCount = 0;
    const getToken = vi.fn<TokenCredential["getToken"]>((_, requestOptions) => {
      if (requestOptions?.claims === "claim-A") {
        return claimToken;
      }

      ordinaryRequestCount += 1;
      if (ordinaryRequestCount === 1) {
        return Promise.resolve({
          token: "initial",
          expiresOnTimestamp: Date.now() + 1,
          refreshAfterTimestamp: Date.now() - 1,
        });
      }
      if (ordinaryRequestCount === 2) {
        return rejectedProactiveToken;
      }
      return Promise.resolve(null);
    });
    const getAccessToken = createTokenCycler(
      { getToken },
      { retryIntervalInMs: 0, forcedRefreshWindowInMs: 0, refreshWindowInMs: 300_000 },
    );

    await expect(getAccessToken(["scope"], {})).resolves.toMatchObject({ token: "initial" });
    // This returns the still-valid cached token while it starts a background refresh.
    await expect(getAccessToken(["scope"], {})).resolves.toMatchObject({ token: "initial" });

    const claimsRefresh = getAccessToken(["scope"], { claims: "claim-A", enableCae: true });
    resolveClaim!({ token: "claim-A", expiresOnTimestamp: Date.now() + 300_000 });
    await expect(claimsRefresh).resolves.toMatchObject({ token: "claim-A" });

    const unhandledRejection = vi.fn();
    const handleUnhandledRejection = () => unhandledRejection();
    const nodeProcess = globalThis as unknown as {
      process?: {
        on?: (event: string, listener: () => void) => void;
        off?: (event: string, listener: () => void) => void;
      };
    };
    const supportsNodeUnhandledRejectionEvents = typeof nodeProcess.process?.on === "function";
    const globalEventTarget = globalThis as unknown as {
      addEventListener?: (event: string, listener: () => void) => void;
      removeEventListener?: (event: string, listener: () => void) => void;
    };

    if (supportsNodeUnhandledRejectionEvents) {
      nodeProcess.process?.on?.("unhandledRejection", handleUnhandledRejection);
    } else {
      globalEventTarget.addEventListener?.("unhandledrejection", handleUnhandledRejection);
    }

    try {
      rejectProactive!(new Error("ordinary refresh failed"));
      await vi.advanceTimersByTimeAsync(1);
      await Promise.resolve();

      expect(unhandledRejection).not.toHaveBeenCalled();
    } finally {
      if (supportsNodeUnhandledRejectionEvents) {
        nodeProcess.process?.off?.("unhandledRejection", handleUnhandledRejection);
      } else {
        globalEventTarget.removeEventListener?.("unhandledrejection", handleUnhandledRejection);
      }
    }
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
