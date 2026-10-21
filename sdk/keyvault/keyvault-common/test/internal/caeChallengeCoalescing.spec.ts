// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessToken, TokenCredential } from "@azure/core-auth";
import type {
  Pipeline,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";
import {
  createEmptyPipeline,
  createHttpHeaders,
  createPipelineRequest,
} from "@azure/core-rest-pipeline";
import { createAbortablePromise } from "@azure/core-util";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { keyVaultAuthenticationPolicy } from "../../src/keyVaultAuthenticationPolicy.js";

const url = "https://myvault.vault.azure.net";
const claims = '{"access_token":{}}';

function token(value: string): AccessToken {
  return { token: value, expiresOnTimestamp: Date.now() + 60 * 60 * 1000 };
}

function deferred<T>(): {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (error: Error) => void;
} {
  let resolveValue!: (value: T) => void;
  let rejectValue!: (error: Error) => void;
  const promise = new Promise<T>((resolve, reject) => {
    resolveValue = resolve;
    rejectValue = reject;
  });
  return { promise, resolve: resolveValue, reject: rejectValue };
}

function success(request: PipelineRequest): PipelineResponse {
  return { request, status: 204, headers: createHttpHeaders() };
}

function resourceChallenge(
  request: PipelineRequest,
  resource = "https://vault.azure.net",
  tenant = "tenantA",
): PipelineResponse {
  return {
    request,
    status: 401,
    headers: createHttpHeaders({
      "WWW-Authenticate": `Bearer resource="${resource}", authorization="https://login.windows.net/${tenant}"`,
    }),
  };
}

function caeChallenge(
  request: PipelineRequest,
  value = claims,
  omitPadding = false,
): PipelineResponse {
  const encoded = btoa(value);
  return {
    request,
    status: 401,
    headers: createHttpHeaders({
      "WWW-Authenticate": `Bearer error="insufficient_claims", claims="${omitPadding ? encoded.replace(/=+$/, "") : encoded}"`,
    }),
  };
}

describe("Concurrent CAE challenge acquisition", () => {
  let pipeline: Pipeline;
  let getToken: ReturnType<typeof vi.fn<TokenCredential["getToken"]>>;
  let sendRequest: ReturnType<typeof vi.fn<SendRequest>>;

  function run(path: string, options: { abortSignal?: AbortSignal; timeout?: number } = {}) {
    return pipeline.sendRequest(
      { sendRequest },
      createPipelineRequest({ url: `${url}${path}`, ...options }),
    );
  }

  async function warm(): Promise<void> {
    await run("/warm");
    getToken.mockClear();
    sendRequest.mockClear();
  }

  beforeEach(() => {
    getToken = vi.fn<TokenCredential["getToken"]>().mockResolvedValue(token("initial_token"));
    pipeline = createEmptyPipeline();
    pipeline.addPolicy(keyVaultAuthenticationPolicy({ getToken }));
    sendRequest = vi.fn<SendRequest>().mockImplementation(async (request) => {
      if (!request.headers.has("Authorization")) {
        return resourceChallenge(request);
      }
      if (
        new URL(request.url).pathname !== "/warm" &&
        request.headers.get("Authorization") === "Bearer initial_token"
      ) {
        return caeChallenge(request);
      }
      return success(request);
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it.each(["no signal", "shared signal", "different padding", "empty claims"])(
    "shares equivalent pending CAE acquisitions with %s",
    async (kind) => {
      await warm();
      const pending = deferred<AccessToken>();
      const expectedClaims = kind === "empty claims" ? "" : claims;
      const abortSignal = kind === "shared signal" ? new AbortController().signal : undefined;
      if (kind === "different padding") {
        expect(btoa(expectedClaims)).toMatch(/=+$/);
      }
      getToken.mockReturnValue(pending.promise);
      sendRequest.mockImplementation(async (request) =>
        request.headers.get("Authorization") === "Bearer initial_token"
          ? caeChallenge(
              request,
              expectedClaims,
              kind === "different padding" && request.url.endsWith("/third"),
            )
          : success(request),
      );
      const requests = ["/first", "/second", "/third"].map((path) => run(path, { abortSignal }));
      await vi.waitFor(() => expect(sendRequest).toHaveBeenCalledTimes(3));
      pending.resolve(token("cae_token"));
      const responses = await Promise.all(requests);

      expect(responses.map((response) => response.status)).toEqual([204, 204, 204]);
      expect(getToken).toHaveBeenCalledExactlyOnceWith(
        ["https://vault.azure.net/.default"],
        expect.objectContaining({
          abortSignal,
          claims: expectedClaims,
          tenantId: "tenantA",
          enableCae: true,
        }),
      );
    },
  );

  it("shares interleaved identical claims without mixing different claims", async () => {
    await warm();
    const otherClaims = '{"access_token":{"xms_caeerror":{"value":"20012"}}}';
    const first = deferred<AccessToken>();
    const second = deferred<AccessToken>();
    getToken.mockImplementation((_scopes, options) =>
      options?.claims === claims ? first.promise : second.promise,
    );
    sendRequest.mockImplementation(async (request) => {
      const isSecond = request.url.endsWith("/second");
      if (request.headers.get("Authorization") === "Bearer initial_token") {
        return caeChallenge(request, isSecond ? otherClaims : claims);
      }
      if (!request.url.endsWith("/healthy")) {
        expect(request.headers.get("Authorization")).toBe(
          isSecond ? "Bearer second_claims_token" : "Bearer first_claims_token",
        );
      }
      return success(request);
    });
    const requests = ["/first", "/second", "/third"].map((path) => run(path));
    await vi.waitFor(() => expect(sendRequest).toHaveBeenCalledTimes(3));
    second.resolve(token("second_claims_token"));
    await requests[1];
    first.resolve(token("first_claims_token"));
    await Promise.all(requests);

    expect(getToken).toHaveBeenCalledTimes(2);
    const healthy = await run("/healthy");
    expect(healthy.request.headers.get("Authorization")).toBe("Bearer second_claims_token");
  });

  it.each(["tenant", "scope"])(
    "does not share identical claims across different %s contexts",
    async (difference) => {
      await warm();
      const first = deferred<AccessToken>();
      const second = deferred<AccessToken>();
      const resource = difference === "scope" ? "https://azure.net" : "https://vault.azure.net";
      const tenant = difference === "tenant" ? "tenantB" : "tenantA";
      getToken.mockImplementation((scopes, options) => {
        if (!options?.claims) {
          return Promise.resolve(token("normal_b_token"));
        }
        const isSecond =
          options.tenantId === "tenantB" || String(scopes) === "https://azure.net/.default";
        return isSecond ? second.promise : first.promise;
      });
      sendRequest.mockImplementation(async (request) => {
        const authorization = request.headers.get("Authorization");
        if (request.url.endsWith("/second") && authorization === "Bearer initial_token") {
          return resourceChallenge(request, resource, tenant);
        }
        if (authorization === "Bearer initial_token" || authorization === "Bearer normal_b_token") {
          return caeChallenge(request);
        }
        return success(request);
      });
      const a = run("/first");
      await vi.waitFor(() => expect(getToken).toHaveBeenCalledTimes(1));
      const b = run("/second");
      await vi.waitFor(() => expect(getToken).toHaveBeenCalledTimes(3));
      second.resolve(token("cae_b_token"));
      await b;
      first.resolve(token("cae_a_token"));
      await a;

      expect(getToken).toHaveBeenNthCalledWith(
        1,
        ["https://vault.azure.net/.default"],
        expect.objectContaining({ tenantId: "tenantA", claims }),
      );
      expect(getToken).toHaveBeenNthCalledWith(
        3,
        [`${resource}/.default`],
        expect.objectContaining({ tenantId: tenant, claims }),
      );
      const healthy = await run("/healthy");
      expect(healthy.request.headers.get("Authorization")).toBe("Bearer cae_b_token");
    },
  );

  it.each([false, true])(
    "isolates cancellation without discarding another pending CAE caller (cancel first: %s)",
    async (cancelFirst) => {
      await warm();
      const cancelled = new AbortController();
      const healthy = new AbortController();
      const pending = deferred<AccessToken>();
      getToken.mockImplementation((_scopes, options) =>
        createAbortablePromise<AccessToken>(
          (resolve, reject) => pending.promise.then(resolve, reject),
          { abortSignal: options?.abortSignal },
        ),
      );
      const signals = cancelFirst
        ? [cancelled.signal, healthy.signal]
        : [healthy.signal, cancelled.signal];
      const first = run("/first", { abortSignal: signals[0] });
      const second = run("/second", { abortSignal: signals[1] });
      const outcomes = Promise.allSettled([first, second]);
      await vi.waitFor(() => expect(getToken).toHaveBeenCalledTimes(2));
      const failedRequest = expect(cancelFirst ? first : second).rejects.toMatchObject({
        name: "AbortError",
      });
      cancelled.abort();
      await failedRequest;
      const third = run("/third", { abortSignal: healthy.signal });
      await vi.waitFor(() => expect(sendRequest).toHaveBeenCalledTimes(3));
      pending.resolve(token("cae_token"));
      const results = await outcomes;
      expect(results[cancelFirst ? 1 : 0].status).toBe("fulfilled");
      expect((await third).status).toBe(204);
      expect(getToken).toHaveBeenCalledTimes(2);
    },
  );

  it("keeps equal CAE timeouts independent when callers start at different times", async () => {
    await warm();
    vi.useFakeTimers();
    const pending = [deferred<AccessToken>(), deferred<AccessToken>()];
    let index = 0;
    getToken.mockImplementation((_scopes, options) => {
      expect(options?.requestOptions?.timeout).toBe(100);
      const current = pending[index++];
      const timer = setTimeout(() => current.reject(new Error("credential timeout")), 100);
      return current.promise.finally(() => clearTimeout(timer));
    });
    const first = run("/first", { timeout: 100 });
    const failure = expect(first).rejects.toThrow("credential timeout");
    await vi.advanceTimersByTimeAsync(0);
    expect(getToken).toHaveBeenCalledTimes(1);
    await vi.advanceTimersByTimeAsync(25);
    const second = run("/second", { timeout: 100 });
    await vi.advanceTimersByTimeAsync(0);
    expect(getToken).toHaveBeenCalledTimes(2);
    await vi.advanceTimersByTimeAsync(75);
    await failure;
    pending[1].resolve(token("cae_token"));

    expect((await second).status).toBe(204);
    expect(getToken).toHaveBeenCalledTimes(2);
    expect(sendRequest).toHaveBeenCalledTimes(3);
  });

  it.each(["error", "null"])(
    "recovers after a shared CAE acquisition returns %s",
    async (failure) => {
      await warm();
      const pending = deferred<AccessToken | null>();
      getToken.mockReturnValue(pending.promise);
      const outcomes = Promise.allSettled([run("/first"), run("/second")]);
      await vi.waitFor(() => expect(sendRequest).toHaveBeenCalledTimes(2));
      if (failure === "error") {
        pending.reject(new Error("credential failed"));
      } else {
        pending.resolve(null);
      }
      expect((await outcomes).map((result) => result.status)).toEqual(["rejected", "rejected"]);
      expect(getToken).toHaveBeenCalledTimes(1);

      getToken.mockResolvedValue(token("recovered_cae_token"));
      expect((await run("/retry")).status).toBe(204);
      expect(getToken).toHaveBeenCalledTimes(2);
      const healthy = await run("/healthy");
      expect(healthy.request.headers.get("Authorization")).toBe("Bearer recovered_cae_token");
      expect(getToken).toHaveBeenCalledTimes(2);
    },
  );

  it("starts a fresh acquisition for a subsequent CAE round after shared callers finish", async () => {
    await warm();
    const pending = deferred<AccessToken>();
    getToken.mockReturnValue(pending.promise);
    const firstRound = Promise.all([run("/first"), run("/second")]);
    await vi.waitFor(() => expect(sendRequest).toHaveBeenCalledTimes(2));
    pending.resolve(token("first_cae_token"));
    await firstRound;
    expect(getToken).toHaveBeenCalledTimes(1);

    getToken.mockResolvedValue(token("second_cae_token"));
    sendRequest.mockImplementation(async (request) =>
      request.headers.get("Authorization") === "Bearer first_cae_token"
        ? caeChallenge(request)
        : success(request),
    );
    const secondRound = await run("/next-round");
    expect(secondRound.request.headers.get("Authorization")).toBe("Bearer second_cae_token");
    expect(getToken).toHaveBeenCalledTimes(2);
    expect((await run("/healthy")).request.headers.get("Authorization")).toBe(
      "Bearer second_cae_token",
    );
    expect(getToken).toHaveBeenCalledTimes(2);
  });
});
