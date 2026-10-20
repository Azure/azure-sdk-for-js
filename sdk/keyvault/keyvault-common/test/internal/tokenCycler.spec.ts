// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessToken, TokenCredential } from "@azure/core-auth";
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
