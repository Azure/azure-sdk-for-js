// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { AzureCommunicationTokenCredential } from "../../src/index.js";
import { stringToUint8Array, uint8ArrayToString } from "@azure/core-util";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";

const generateToken = (validForMinutes: number): string => {
  const expiresOn = (Date.now() + validForMinutes * 60 * 1000) / 1000;
  const tokenString = JSON.stringify({ exp: expiresOn });
  const base64Token = uint8ArrayToString(stringToUint8Array(tokenString, "utf-8"), "base64");
  return `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${base64Token}.adM-ddBZZlQ1WlN3pdPBOF5G4Wh9iZpxNP_fSvpF4cWs`;
};

// Produces a structurally-valid but undecodable encrypted JWT (JWE: five segments).
const generateEncryptedToken = (): string => {
  const segment = uint8ArrayToString(stringToUint8Array("opaque", "utf-8"), "base64");
  return [segment, segment, segment, segment, segment].join(".");
};

const exposeInternalTimeout = (
  tokenCredential: AzureCommunicationTokenCredential,
): ReturnType<typeof setTimeout> => {
  return ((tokenCredential as any).tokenCredential as any).activeTimeout;
};

const exposeInternalUpdatePromise = async (
  tokenCredential: AzureCommunicationTokenCredential,
): Promise<void> => {
  const internalPromise = ((tokenCredential as any).tokenCredential as any).activeTokenUpdating;
  if (internalPromise) {
    await internalPromise;
  }
};

describe("CommunicationTokenCredential", function () {
  beforeEach(function () {
    vi.useFakeTimers();
  });

  afterEach(function () {
    vi.useRealTimers();
  });

  it("handles valid JWT strings", async function () {
    new AzureCommunicationTokenCredential(generateToken(60));
  });

  it("throws if non-JWT token", async function () {
    assert.throws(() => new AzureCommunicationTokenCredential("IAmNotAToken"), /Invalid token/);
  });

  it("throws if non-JWT passed as lambda", async function () {
    await expect(() =>
      new AzureCommunicationTokenCredential({
        tokenRefresher: async () => "IAmNotAToken",
      }).getToken(),
    ).rejects.toThrow();
  });

  it("returns token as expected", async function () {
    const token = generateToken(60);
    const tokenCredential = new AzureCommunicationTokenCredential(token);
    const tokenResult = (await tokenCredential.getToken()).token;
    assert.strictEqual(tokenResult, token);
  });

  it("returns token as expected when using lambda", async function () {
    const token = generateToken(60);
    const tokenRefresher = vi.fn().mockResolvedValue(token);
    const tokenCredential = new AzureCommunicationTokenCredential({
      tokenRefresher,
    });
    const tokenResult = (await tokenCredential.getToken()).token;
    assert.strictEqual(tokenResult, token);
    expect(tokenRefresher).toHaveBeenCalledOnce();
  });

  it("uses initial token as expected", async function () {
    const token = generateToken(60);
    const tokenRefresher = vi.fn().mockResolvedValue(generateToken(120));
    const tokenCredential = new AzureCommunicationTokenCredential({
      tokenRefresher,
      token,
      refreshProactively: true,
    });
    const tokenResult = (await tokenCredential.getToken()).token;
    assert.strictEqual(tokenResult, token);
    expect(tokenRefresher).not.toHaveBeenCalled();
  });

  it("no proactive refresh, accepts expired token", async function () {
    const tokenRefresher = vi.fn().mockResolvedValue(generateToken(-1));
    new AzureCommunicationTokenCredential({
      tokenRefresher,
    });
    vi.advanceTimersByTime(5 * 60 * 1000);
    expect(tokenRefresher).not.toHaveBeenCalled();
  });

  it("with proactive refresh, passing an expired token to constructor triggers immediate refresh", async function () {
    const tokenRefresher = vi.fn().mockResolvedValue(generateToken(30));
    new AzureCommunicationTokenCredential({
      tokenRefresher,
      refreshProactively: true,
      token: generateToken(-1),
    });
    vi.advanceTimersByTime(5 * 60 * 1000);

    expect(tokenRefresher).toHaveBeenCalledOnce();
  });

  it("throws if tokenRefresher returns an expired token", async function () {
    const tokenRefresher = vi.fn().mockResolvedValue(generateToken(-1));
    const credential = new AzureCommunicationTokenCredential({
      tokenRefresher: tokenRefresher,
    });
    vi.advanceTimersByTime(5 * 60 * 1000);

    await expect(credential.getToken()).rejects.toThrow(Error);
    expect(tokenRefresher).toHaveBeenCalledOnce();
  });

  it("returns expired token when not using a lambda", async function () {
    const token = generateToken(-1);
    const tokenCredential = new AzureCommunicationTokenCredential(token);
    const tokenResult = (await tokenCredential.getToken()).token;
    assert.strictEqual(tokenResult, token);
  });

  it("passes abortSignal through to tokenRefresher", async function () {
    const tokenRefresher = vi.fn().mockResolvedValue(generateToken(60));
    const tokenCredential = new AzureCommunicationTokenCredential({
      tokenRefresher,
    });
    const aborter = new AbortController();
    const options = { abortSignal: aborter.signal };
    tokenCredential.getToken(options);
    expect(tokenRefresher).toHaveBeenCalledWith(options.abortSignal);
  });

  it("throws if disposed", async function () {
    const withStatic = new AzureCommunicationTokenCredential(generateToken(60));
    const withLambda = new AzureCommunicationTokenCredential({
      tokenRefresher: async () => generateToken(60),
    });
    withStatic.dispose();
    withLambda.dispose();
    await expect(() => withStatic.getToken()).rejects.toThrow();
    await expect(() => withLambda.getToken()).rejects.toThrow();
  });

  it("doesn't swallow error from tokenRefresher", async function () {
    const tokenRefresher = vi.fn().mockImplementation(() => {
      new Error("No token for you!");
    });
    const tokenCredential = new AzureCommunicationTokenCredential({
      tokenRefresher,
    });
    await expect(() => tokenCredential.getToken()).rejects.toThrow();
  });

  it("requests new token when token is about to expire", async function () {
    const token = generateToken(20);
    const newToken = generateToken(60);
    const tokenRefresher = vi.fn().mockResolvedValue(token);
    const tokenCredential = new AzureCommunicationTokenCredential({ tokenRefresher });

    const tokenResult = await tokenCredential.getToken();
    assert.strictEqual(tokenResult.token, token);

    tokenRefresher.mockResolvedValue(newToken);
    // go into the soon-to-expire window
    vi.advanceTimersByTime(19 * 60 * 1000);
    const secondTokenResult = await tokenCredential.getToken();

    // returns old token because it's still valid
    assert.strictEqual(secondTokenResult.token, token);

    vi.advanceTimersByTime(5 * 60 * 1000);
    // now it returns new token
    const thirdTokenResult = await tokenCredential.getToken();
    assert.strictEqual(thirdTokenResult.token, newToken);

    expect(tokenRefresher).toHaveBeenCalledTimes(2);
  });

  it("proactively refreshes token when it is about to expire", async function () {
    const token = (): string => generateToken(20);
    const tokenRefresher = vi.fn().mockResolvedValue(token());
    new AzureCommunicationTokenCredential({
      tokenRefresher,
      refreshProactively: true,
      token: token(),
    });

    // go into the soon-to-expire window
    vi.advanceTimersByTime(19 * 60 * 1000);
    expect(tokenRefresher).toHaveBeenCalledOnce();
  });

  it("repeats proactive refreshing", async function () {
    const token = (): string => generateToken(20);
    const tokenRefresher = vi.fn().mockResolvedValue(token());
    const tokenCredential = new AzureCommunicationTokenCredential({
      tokenRefresher,
      refreshProactively: true,
      token: token(),
    });

    const internalTimeout = exposeInternalTimeout(tokenCredential);
    // go into the soon-to-expire window
    vi.advanceTimersByTime(19 * 60 * 1000);

    await exposeInternalUpdatePromise(tokenCredential);
    const newInternalTimeout = exposeInternalTimeout(tokenCredential);

    assert.isDefined(internalTimeout);
    assert.isDefined(newInternalTimeout);
    assert.notEqual(internalTimeout, newInternalTimeout);
  });

  it("dispose cancels timer", async function () {
    const token = (): string => generateToken(20);
    const tokenRefresher = vi.fn().mockResolvedValue(token());
    const tokenCredential = new AzureCommunicationTokenCredential({
      tokenRefresher,
      refreshProactively: true,
      token: token(),
    });

    tokenCredential.dispose();

    // go into the soon-to-expire window
    vi.advanceTimersByTimeAsync(19 * 60 * 1000);
    expect(tokenRefresher).not.toHaveBeenCalled();
  });

  it("multiple calls to getToken call tokenRefresher only once", async function () {
    const tokenRefresher = vi.fn().mockResolvedValue(generateToken(60));
    const tokenCredential = new AzureCommunicationTokenCredential({ tokenRefresher });

    for (let i = 0; i < 10; i++) {
      await tokenCredential.getToken();
    }

    expect(tokenRefresher).toHaveBeenCalledOnce();
  });

  it("calls tokenRefresher only once when proactive refreshing is in progress", async function () {
    const tokenRefresher = vi.fn().mockResolvedValue(generateToken(20));
    const tokenCredential = new AzureCommunicationTokenCredential({
      tokenRefresher,
      refreshProactively: true,
    });

    // go into the soon-to-expire window
    vi.advanceTimersByTime(19 * 60 * 1000);
    await tokenCredential.getToken();
    expect(tokenRefresher).toHaveBeenCalledOnce();
  });

  it("accepts an encrypted (undecodable) token using the fallback expiry", async function () {
    const encryptedToken = generateEncryptedToken();
    const tokenCredential = new AzureCommunicationTokenCredential(encryptedToken);
    const result = await tokenCredential.getToken();
    assert.strictEqual(result.token, encryptedToken);
    // fallback lifetime is 10 minutes
    assert.strictEqual(result.expiresOnTimestamp, Date.now() + 10 * 60 * 1000);
  });

  it("uses a caller-supplied expiry without decoding the token", async function () {
    const encryptedToken = generateEncryptedToken();
    const expiresOnTimestamp = Date.now() + 8 * 60 * 60 * 1000;
    const tokenRefresher = vi.fn().mockResolvedValue({ token: encryptedToken, expiresOnTimestamp });
    const tokenCredential = new AzureCommunicationTokenCredential({ tokenRefresher });
    const result = await tokenCredential.getToken();
    assert.strictEqual(result.token, encryptedToken);
    assert.strictEqual(result.expiresOnTimestamp, expiresOnTimestamp);
  });

  it("accepts a static AccessToken with an explicit expiry", async function () {
    const encryptedToken = generateEncryptedToken();
    const expiresOnTimestamp = Date.now() + 60 * 60 * 1000;
    const tokenCredential = new AzureCommunicationTokenCredential({
      token: encryptedToken,
      expiresOnTimestamp,
    });
    const result = await tokenCredential.getToken();
    assert.strictEqual(result.token, encryptedToken);
    assert.strictEqual(result.expiresOnTimestamp, expiresOnTimestamp);
  });

  it("honors undecodableTokenExpiryIntervalInSeconds for an undecodable token", async function () {
    const encryptedToken = generateEncryptedToken();
    const tokenRefresher = vi.fn().mockResolvedValue(encryptedToken);
    const tokenCredential = new AzureCommunicationTokenCredential({
      tokenRefresher,
      undecodableTokenExpiryIntervalInSeconds: 1800,
    });
    const result = await tokenCredential.getToken();
    assert.strictEqual(result.expiresOnTimestamp, Date.now() + 1800 * 1000);
  });

  it("proactively refreshes an undecodable token at half its fallback lifetime", async function () {
    const tokenRefresher = vi.fn().mockResolvedValue(generateEncryptedToken());
    new AzureCommunicationTokenCredential({
      tokenRefresher,
      refreshProactively: true,
      token: generateEncryptedToken(),
    });
    // 10-min fallback lands on the expiring-soon boundary, so refresh is scheduled at half-life (5 min)
    vi.advanceTimersByTime(4 * 60 * 1000);
    expect(tokenRefresher).not.toHaveBeenCalled();
    vi.advanceTimersByTime(60 * 1000 + 1000);
    expect(tokenRefresher).toHaveBeenCalledOnce();
  });

  it("still throws for a malformed token string", async function () {
    assert.throws(() => new AzureCommunicationTokenCredential("not.a.real.token"), /Invalid token/);
  });

  it("applies fractional backoff when the token is about to expire", async function () {
    const defaultRefreshAfterLifetimePercentage = 0.5;
    const tokenExpirationMinutes = 20;
    const expectedPreBackOffCallCount = 1;
    const expectedTotalCallCount = Math.floor(
      Math.log(tokenExpirationMinutes * 60) / Math.log(1 / defaultRefreshAfterLifetimePercentage),
    );
    const staticToken = generateToken(tokenExpirationMinutes);
    const tokenRefresher = vi.fn().mockResolvedValue(((): string => staticToken)()); // keep returning the same token for the duration of the test
    const tokenCredential = new AzureCommunicationTokenCredential({
      tokenRefresher,
      refreshProactively: true,
      token: staticToken,
    });

    const newToken = await tokenCredential.getToken();

    // go into the soon-to-expire window
    for (let i = 0; i < 10 * 60; i++) {
      // perform token refreshing & scheduling
      await exposeInternalUpdatePromise(tokenCredential);
      vi.advanceTimersByTime(1000);
    }

    // expect the token to be refreshed only once within the first 10 minutes
    expect(tokenRefresher).toHaveBeenCalledTimes(expectedPreBackOffCallCount);

    // iterate until the penultimate second of the token expiration
    // to prevent an exception being thrown due to the token being expired
    while (Math.floor((newToken.expiresOnTimestamp - Date.now()) / 1000) > 1) {
      // perform token refreshing & scheduling
      await exposeInternalUpdatePromise(tokenCredential);
      vi.advanceTimersByTime(1000);
    }

    // expect the token to be refreshed with an increasing frequency in the remaining 10 minutes
    expect(tokenRefresher).toHaveBeenCalledTimes(expectedTotalCallCount);
  });
});
