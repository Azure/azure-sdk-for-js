// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import { createAbortablePromise } from "@azure/core-util";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createTokenCycler } from "../../src/tokenCycler.js";
import { logger } from "../../src/logger.js";

function deferredToken(): {
  promise: Promise<AccessToken>;
  resolve: (token: AccessToken) => void;
  reject: (error: Error) => void;
} {
  let resolveToken!: (token: AccessToken) => void;
  let rejectToken!: (error: Error) => void;
  const promise = new Promise<AccessToken>((resolve, reject) => {
    resolveToken = resolve;
    rejectToken = reject;
  });
  return { promise, resolve: resolveToken, reject: rejectToken };
}

function token(value: string): AccessToken {
  return { token: value, expiresOnTimestamp: Date.now() + 60 * 60 * 1000 };
}

describe("Key Vault token cycler", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it.each([false, true])(
    "coalesces refreshes with the same cancellation context (signal: %s)",
    async (useSignal) => {
      const pending = deferredToken();
      const getToken = vi.fn<TokenCredential["getToken"]>().mockReturnValue(pending.promise);
      const getAccessToken = createTokenCycler({ getToken });
      const abortSignal = useSignal ? new AbortController().signal : undefined;
      const first = getAccessToken(["scope"], { abortSignal });
      const second = getAccessToken(["scope"], { abortSignal });
      const accessToken = token("shared");

      pending.resolve(accessToken);
      expect(await Promise.all([first, second])).toEqual([accessToken, accessToken]);
      expect(getToken).toHaveBeenCalledTimes(1);
    },
  );

  for (const expired of [false, true]) {
    it.each([false, true])(
      `coalesces interleaved A/B/A refreshes and caches the newest success (expired: ${expired}, signal A: %s)`,
      async (useSignal) => {
        const pending = [deferredToken(), deferredToken()] as const;
        const getToken = vi
          .fn<TokenCredential["getToken"]>()
          .mockResolvedValue(token("unexpected"));
        const getAccessToken = createTokenCycler({ getToken });
        if (expired) {
          getToken.mockResolvedValueOnce({
            token: "expired",
            expiresOnTimestamp: Date.now() + 1000,
          });
          await getAccessToken(["scope"], {});
          await vi.advanceTimersByTimeAsync(2000);
          getToken.mockClear();
        }
        getToken.mockReturnValueOnce(pending[0].promise).mockReturnValueOnce(pending[1].promise);
        const signalA = useSignal ? new AbortController().signal : undefined;
        const signalB = new AbortController().signal;
        const first = getAccessToken(["scope"], { abortSignal: signalA });
        const second = getAccessToken(["scope"], { abortSignal: signalB });
        const third = getAccessToken(["scope"], { abortSignal: signalA });
        const older = token("older");
        const newer = token("newer");

        pending[1].resolve(newer);
        expect(await second).toBe(newer);
        pending[0].resolve(older);
        expect(await Promise.all([first, third])).toEqual([older, older]);
        expect(await getAccessToken(["scope"], {})).toBe(newer);
        expect(getToken).toHaveBeenCalledTimes(2);
      },
    );
  }

  it.each([false, true])(
    "removes fulfilled workers while retaining other active contexts (signal: %s)",
    async (useSignal) => {
      const pending = [deferredToken(), deferredToken(), deferredToken()] as const;
      const getToken = vi
        .fn<TokenCredential["getToken"]>()
        .mockReturnValueOnce(pending[0].promise)
        .mockReturnValueOnce(pending[1].promise)
        .mockReturnValue(pending[2].promise);
      const getAccessToken = createTokenCycler({ getToken });
      const signalA = useSignal ? new AbortController().signal : undefined;
      const signalB = new AbortController().signal;
      const first = getAccessToken(["scope"], { abortSignal: signalA });
      const second = getAccessToken(["scope"], { abortSignal: signalB });
      const expired = { token: "expired", expiresOnTimestamp: Date.now() };
      pending[0].resolve(expired);
      expect(await first).toBe(expired);
      const retry = getAccessToken(["scope"], { abortSignal: signalA });
      const joinedRetry = getAccessToken(["scope"], { abortSignal: signalA });
      const refreshed = token("refreshed");

      pending[2].resolve(refreshed);
      expect(await Promise.all([retry, joinedRetry])).toEqual([refreshed, refreshed]);
      pending[1].resolve(token("older"));
      await second;
      expect(await getAccessToken(["scope"], {})).toBe(refreshed);
      expect(getToken).toHaveBeenCalledTimes(3);
    },
  );

  it.each([false, true])(
    "removes rejected workers so retries can coalesce without losing another context (signal: %s)",
    async (useSignal) => {
      const pending = [deferredToken(), deferredToken(), deferredToken()] as const;
      const getToken = vi
        .fn<TokenCredential["getToken"]>()
        .mockReturnValueOnce(pending[0].promise)
        .mockReturnValueOnce(pending[1].promise)
        .mockReturnValueOnce(pending[2].promise)
        .mockReturnValue(pending[1].promise);
      const getAccessToken = createTokenCycler({ getToken });
      const signalA = useSignal ? new AbortController().signal : undefined;
      const signalB = new AbortController().signal;
      const first = getAccessToken(["scope"], { abortSignal: signalA });
      const second = getAccessToken(["scope"], { abortSignal: signalB });
      const error = new Error("credential failure");
      const failure = expect(first).rejects.toBe(error);
      pending[0].reject(error);
      await failure;
      const retry = getAccessToken(["scope"], { abortSignal: signalA });
      const joinedRetry = getAccessToken(["scope"], { abortSignal: signalA });
      const joinedSecond = getAccessToken(["scope"], { abortSignal: signalB });
      const refreshed = token("refreshed");
      const older = token("older");

      pending[2].resolve(refreshed);
      expect(await Promise.all([retry, joinedRetry])).toEqual([refreshed, refreshed]);
      pending[1].resolve(older);
      expect(await Promise.all([second, joinedSecond])).toEqual([older, older]);
      expect(await getAccessToken(["scope"], {})).toBe(refreshed);
      expect(getToken).toHaveBeenCalledTimes(3);
    },
  );

  it("removes aborted workers without removing another signal's worker", async () => {
    const pending = [deferredToken(), deferredToken()] as const;
    const controllerA = new AbortController();
    const signalB = new AbortController().signal;
    const getToken = vi
      .fn<TokenCredential["getToken"]>()
      .mockImplementation((_scopes, options) =>
        createAbortablePromise<AccessToken>(
          (resolve, reject) =>
            pending[options?.abortSignal === controllerA.signal ? 0 : 1].promise.then(
              resolve,
              reject,
            ),
          { abortSignal: options?.abortSignal },
        ),
      );
    const getAccessToken = createTokenCycler({ getToken });
    const first = getAccessToken(["scope"], { abortSignal: controllerA.signal });
    const second = getAccessToken(["scope"], { abortSignal: signalB });
    const third = getAccessToken(["scope"], { abortSignal: controllerA.signal });
    const failures = [first, third].map((request) =>
      expect(request).rejects.toMatchObject({ name: "AbortError" }),
    );

    controllerA.abort();
    await Promise.all(failures);
    await expect(
      getAccessToken(["scope"], { abortSignal: controllerA.signal }),
    ).rejects.toMatchObject({ name: "AbortError" });
    const joinedSecond = getAccessToken(["scope"], { abortSignal: signalB });
    const surviving = token("surviving");
    pending[1].resolve(surviving);
    pending[0].resolve(token("aborted"));
    expect(await Promise.all([second, joinedSecond])).toEqual([surviving, surviving]);
    expect(await getAccessToken(["scope"], {})).toBe(surviving);
    expect(getToken).toHaveBeenCalledTimes(3);
  });

  it.each(["tenantId", "claims"] as const)(
    "does not share workers with different %s values",
    async (option) => {
      const pending = [deferredToken(), deferredToken()] as const;
      const getToken = vi
        .fn<TokenCredential["getToken"]>()
        .mockReturnValueOnce(pending[0].promise)
        .mockReturnValue(pending[1].promise);
      const getAccessToken = createTokenCycler({ getToken });
      const abortSignal = new AbortController().signal;
      const firstOptions: GetTokenOptions = { abortSignal, [option]: "first" };
      const secondOptions: GetTokenOptions = { abortSignal, [option]: "second" };
      const first = getAccessToken(["scope"], firstOptions);
      const second = getAccessToken(["scope"], secondOptions);
      const third = getAccessToken(["scope"], firstOptions);
      const firstToken = token("first");
      const secondToken = token("second");

      pending[0].resolve(firstToken);
      pending[1].resolve(secondToken);
      expect(await Promise.all([first, second, third])).toEqual([
        firstToken,
        secondToken,
        firstToken,
      ]);
      expect(getToken).toHaveBeenCalledTimes(2);
      expect(getToken.mock.calls[0][1]).toBe(firstOptions);
      expect(getToken.mock.calls[1][1]).toBe(secondOptions);
    },
  );

  for (const expired of [false, true]) {
    for (const cancelFirst of [false, true]) {
      it.each([false, true])(
        `isolates cancellation and preserves a successful refresh (expired: ${expired}, cancel first: ${cancelFirst}, fail before success: %s)`,
        async (failBeforeSuccess) => {
          const controllers = [new AbortController(), new AbortController()] as const;
          const pending = [deferredToken(), deferredToken()] as const;
          const getToken = vi
            .fn<TokenCredential["getToken"]>()
            .mockResolvedValue(token("unexpected"));
          const getAccessToken = createTokenCycler({ getToken });
          if (expired) {
            getToken.mockResolvedValueOnce({
              token: "expired",
              expiresOnTimestamp: Date.now() + 1000,
            });
            await getAccessToken(["scope"], {});
            await vi.advanceTimersByTimeAsync(2000);
            getToken.mockClear();
          }
          for (const deferred of pending) {
            getToken.mockImplementationOnce((_scopes, options) =>
              createAbortablePromise<AccessToken>(
                (resolve, reject) => {
                  return deferred.promise.then(resolve, reject);
                },
                { abortSignal: options?.abortSignal },
              ),
            );
          }
          const requests = controllers.map((controller) =>
            getAccessToken(["scope"], { abortSignal: controller.signal }),
          );
          const cancelled = cancelFirst ? 0 : 1;
          const surviving = cancelFirst ? 1 : 0;
          const accessToken = token("surviving");

          expect(getToken).toHaveBeenCalledTimes(2);
          const failure = expect(requests[cancelled]).rejects.toMatchObject({ name: "AbortError" });
          if (failBeforeSuccess) {
            controllers[cancelled].abort();
            await failure;
          }
          pending[surviving].resolve(accessToken);
          expect(await requests[surviving]).toBe(accessToken);
          if (!failBeforeSuccess) {
            controllers[cancelled].abort();
            await failure;
          }
          pending[cancelled].resolve(token("cancelled"));

          expect(await getAccessToken(["scope"], {})).toBe(accessToken);
          expect(getToken).toHaveBeenCalledTimes(2);
        },
      );
    }
  }

  it.each([
    [100, 100],
    [100, 50],
    [100, undefined],
    [undefined, 100],
  ])(
    "does not share request-relative deadlines (%s ms, %s ms)",
    async (firstTimeout, secondTimeout) => {
      const pending = [deferredToken(), deferredToken()] as const;
      const getToken = vi.fn<TokenCredential["getToken"]>().mockResolvedValue(token("unexpected"));
      for (const deferred of pending) {
        getToken.mockImplementationOnce((_scopes, options) => {
          const timeout = options?.requestOptions?.timeout;
          const timer = timeout
            ? setTimeout(() => deferred.reject(new Error("credential timeout")), timeout)
            : undefined;
          return deferred.promise.finally(() => clearTimeout(timer));
        });
      }
      const getAccessToken = createTokenCycler({ getToken });
      const abortSignal = new AbortController().signal;
      const first = getAccessToken(["scope"], {
        abortSignal,
        requestOptions: { timeout: firstTimeout },
      });
      await vi.advanceTimersByTimeAsync(25);
      const second = getAccessToken(["scope"], {
        abortSignal,
        requestOptions: { timeout: secondTimeout },
      });
      const firstDeadline = firstTimeout ?? Infinity;
      const secondDeadline = secondTimeout === undefined ? Infinity : 25 + secondTimeout;
      const failed = firstDeadline < secondDeadline ? 0 : 1;
      const surviving = failed === 0 ? 1 : 0;
      const requests = [first, second] as const;
      expect(getToken).toHaveBeenCalledTimes(2);
      const failure = expect(requests[failed]).rejects.toThrow("credential timeout");
      await vi.advanceTimersByTimeAsync(Math.min(firstDeadline, secondDeadline) - 25);
      await failure;
      const accessToken = token("surviving");
      pending[surviving].resolve(accessToken);
      expect(await requests[surviving]).toBe(accessToken);
      expect(await getAccessToken(["scope"], {})).toBe(accessToken);
      expect(getToken).toHaveBeenCalledTimes(2);
    },
  );

  it.each([0, 25])(
    "keeps equal timeouts independent without displacing an untimed worker (offset: %s ms)",
    async (offset) => {
      const pending = [deferredToken(), deferredToken(), deferredToken()] as const;
      const getToken = vi
        .fn<TokenCredential["getToken"]>()
        .mockReturnValueOnce(pending[0].promise)
        .mockReturnValueOnce(pending[1].promise)
        .mockReturnValueOnce(pending[2].promise)
        .mockResolvedValue(token("unexpected"));
      const getAccessToken = createTokenCycler({ getToken });
      const abortSignal = new AbortController().signal;
      const first = getAccessToken(["scope"], { abortSignal });
      const timeoutOptions = { abortSignal, requestOptions: { timeout: 100 } };
      const second = getAccessToken(["scope"], timeoutOptions);
      await vi.advanceTimersByTimeAsync(offset);
      const third = getAccessToken(["scope"], timeoutOptions);
      const fourth = getAccessToken(["scope"], { abortSignal });
      const accessTokens = [token("untimed"), token("first timeout"), token("second timeout")];

      pending.forEach((deferred, index) => deferred.resolve(accessTokens[index]));
      expect(await Promise.all([first, second, third, fourth])).toEqual([
        ...accessTokens,
        accessTokens[0],
      ]);
      expect(getToken).toHaveBeenCalledTimes(3);
      expect(getToken.mock.calls[1][1]).toBe(timeoutOptions);
      expect(getToken.mock.calls[2][1]).toBe(timeoutOptions);
      expect(await getAccessToken(["scope"], {})).toBe(accessTokens[2]);
    },
  );

  it("does not replace a newer successful refresh when an older refresh completes last", async () => {
    const pending = [deferredToken(), deferredToken()] as const;
    const getToken = vi
      .fn<TokenCredential["getToken"]>()
      .mockReturnValueOnce(pending[0].promise)
      .mockReturnValueOnce(pending[1].promise);
    const getAccessToken = createTokenCycler({ getToken });
    const first = getAccessToken(["scope"], { abortSignal: new AbortController().signal });
    const second = getAccessToken(["scope"], { abortSignal: new AbortController().signal });
    const newer = token("newer");

    expect(getToken).toHaveBeenCalledTimes(2);
    pending[1].resolve(newer);
    expect(await second).toBe(newer);
    pending[0].resolve(token("older"));
    expect((await first).token).toBe("older");
    expect(await getAccessToken(["scope"], {})).toBe(newer);
    expect(getToken).toHaveBeenCalledTimes(2);
  });

  it("preserves a successful refresh when the credential reuses the previous token object", async () => {
    const pending = [deferredToken(), deferredToken()] as const;
    const reused = { token: "reused", expiresOnTimestamp: Date.now() + 1000 };
    const getToken = vi
      .fn<TokenCredential["getToken"]>()
      .mockResolvedValueOnce(reused)
      .mockReturnValueOnce(pending[0].promise)
      .mockReturnValueOnce(pending[1].promise)
      .mockResolvedValue(token("unexpected"));
    const getAccessToken = createTokenCycler({ getToken });
    await getAccessToken(["scope"], {});
    await vi.advanceTimersByTimeAsync(2000);
    const first = getAccessToken(["scope"], { abortSignal: new AbortController().signal });
    const second = getAccessToken(["scope"], { abortSignal: new AbortController().signal });
    reused.expiresOnTimestamp = Date.now() + 60 * 60 * 1000;
    pending[0].resolve(reused);
    expect(await first).toBe(reused);
    const error = new Error("late credential failure");
    const failure = expect(second).rejects.toBe(error);

    pending[1].reject(error);
    await failure;
    expect(await getAccessToken(["scope"], {})).toBe(reused);
    expect(getToken).toHaveBeenCalledTimes(3);
  });

  it.each([undefined, 100])(
    "does not start background refresh until all active workers finish (remaining timeout: %s)",
    async (timeout) => {
      const pending = [deferredToken(), deferredToken(), deferredToken()] as const;
      const getToken = vi
        .fn<TokenCredential["getToken"]>()
        .mockReturnValueOnce(pending[0].promise)
        .mockReturnValueOnce(pending[1].promise)
        .mockReturnValue(pending[2].promise);
      const getAccessToken = createTokenCycler({ getToken });
      const first = getAccessToken(["scope"], {
        abortSignal: new AbortController().signal,
        requestOptions: { timeout },
      });
      const second = getAccessToken(["scope"], { abortSignal: new AbortController().signal });
      const nearExpiry = { token: "near expiry", expiresOnTimestamp: Date.now() + 10000 };
      pending[1].resolve(nearExpiry);
      expect(await second).toBe(nearExpiry);
      expect(await getAccessToken(["scope"], {})).toBe(nearExpiry);
      const callsWhileRefreshing = getToken.mock.calls.length;
      pending[0].resolve(token("older"));
      await first;
      expect(await getAccessToken(["scope"], {})).toBe(nearExpiry);
      const refreshed = token("refreshed");

      pending[2].resolve(refreshed);
      await vi.advanceTimersByTimeAsync(0);
      expect(callsWhileRefreshing).toBe(2);
      expect(getToken).toHaveBeenCalledTimes(3);
      expect(await getAccessToken(["scope"], {})).toBe(refreshed);
    },
  );

  it.each([false, true])(
    "observes background refresh failures without hiding foreground errors (independent: %s)",
    async (independent) => {
      const warning = vi.spyOn(logger, "warning").mockImplementation(() => {});
      const pending = deferredToken();
      const error = new Error("background credential failure");
      const initial = { token: "initial", expiresOnTimestamp: Date.now() + 10000 };
      const getToken = vi
        .fn<TokenCredential["getToken"]>()
        .mockResolvedValueOnce(initial)
        .mockReturnValueOnce(pending.promise);
      const refreshed = token("refreshed");
      if (independent) {
        getToken.mockResolvedValueOnce(refreshed);
      }
      getToken.mockRejectedValue(error);
      const getAccessToken = createTokenCycler({ getToken });
      const abortSignal = new AbortController().signal;
      await getAccessToken(["scope"], { abortSignal });
      expect(await getAccessToken(["scope"], { abortSignal })).toBe(initial);
      await vi.advanceTimersByTimeAsync(10000);
      const foreground = getAccessToken(["scope"], {
        abortSignal: independent ? new AbortController().signal : abortSignal,
      });
      const outcome = independent
        ? expect(foreground).resolves.toBe(refreshed)
        : expect(foreground).rejects.toBe(error);
      if (independent) {
        await outcome;
      }

      pending.reject(error);
      await vi.advanceTimersByTimeAsync(3000);
      await outcome;
      expect(warning).toHaveBeenCalledExactlyOnceWith(
        "Failed to refresh access token in the background.",
      );
      if (independent) {
        expect(await getAccessToken(["scope"], {})).toBe(refreshed);
      }
    },
  );
});
