// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, beforeEach, afterEach, expect, vi } from "vitest";
import type { HttpMethods, PipelineRequest } from "@azure/core-rest-pipeline";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import { AutoRefreshingCache } from "../../src/session/AutoRefreshingCache.js";
import { isSessionEligible } from "../../src/session/ContainerSessionProvider.js";
import type { ActiveSession, SessionTokenInfo } from "../../src/session/models.js";
import { createBearerFallback, SESSION_REFRESH_BUFFER_MS } from "../../src/session/models.js";

const BASE_TIME = Date.UTC(2026, 0, 1, 0, 0, 0);
const FIVE_MINUTES = 5 * 60 * 1000;

function makeSession(token: string, expiresInMs: number = FIVE_MINUTES): ActiveSession {
  const expiresOnTimestamp = Date.now() + expiresInMs;
  return {
    kind: "session",
    sessionToken: token,
    sessionKey: "a2V5",
    expiresOnTimestamp,
    refreshAfterTimestamp: expiresOnTimestamp - SESSION_REFRESH_BUFFER_MS,
  };
}

/** Lets the background refresh continuation run; it is driven by promises, not timers. */
async function flushMicrotasks(): Promise<void> {
  for (let i = 0; i < 10; i++) {
    await Promise.resolve();
  }
}

function timeoutError(): Error {
  const error = new Error("The operation was aborted due to timeout");
  error.name = "TimeoutError";
  return error;
}

describe("AutoRefreshingCache", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(BASE_TIME);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("collapses concurrent callers into a single acquisition", async () => {
    const expected = makeSession("token-1");
    const acquire = vi.fn(async () => expected);
    const cache = new AutoRefreshingCache(acquire);

    const results = await Promise.all([
      cache.get(),
      cache.get(),
      cache.get(),
      cache.get(),
      cache.get(),
    ]);

    assert.strictEqual(acquire.mock.calls.length, 1);
    for (const result of results) {
      assert.strictEqual(result, expected);
    }
  });

  it("serves the cached session without re-acquiring while it is valid", async () => {
    const acquire = vi.fn(async () => makeSession("token-1"));
    const cache = new AutoRefreshingCache(acquire);

    const first = await cache.get();
    vi.setSystemTime(BASE_TIME + 60 * 1000);
    const second = await cache.get();

    assert.strictEqual(acquire.mock.calls.length, 1);
    assert.strictEqual(second, first);
  });

  it("returns the current session immediately and promotes the refreshed one", async () => {
    let issued = 0;
    const acquire = vi.fn(async () => makeSession(`token-${++issued}`));
    const cache = new AutoRefreshingCache(acquire, 1000);

    const first = (await cache.get()) as ActiveSession;
    assert.strictEqual(first.sessionToken, "token-1");

    // Past refreshAfter but before expiry: the stale-but-valid value is returned right away.
    vi.setSystemTime(first.refreshAfterTimestamp + 1);
    const duringRefresh = (await cache.get()) as ActiveSession;
    assert.strictEqual(duringRefresh.sessionToken, "token-1");

    await flushMicrotasks();

    const afterRefresh = (await cache.get()) as ActiveSession;
    assert.strictEqual(afterRefresh.sessionToken, "token-2");
    assert.strictEqual(acquire.mock.calls.length, 2);
  });

  it("blocks and re-acquires once the session has expired", async () => {
    let issued = 0;
    const acquire = vi.fn(async () => makeSession(`token-${++issued}`));
    const cache = new AutoRefreshingCache(acquire);

    const first = (await cache.get()) as ActiveSession;
    vi.setSystemTime(first.expiresOnTimestamp + 1);

    const second = (await cache.get()) as ActiveSession;
    assert.strictEqual(second.sessionToken, "token-2");
    assert.strictEqual(acquire.mock.calls.length, 2);
  });

  it("joins the running background refresh when the session is invalidated mid-flight", async () => {
    let release: ((session: SessionTokenInfo) => void) | undefined;
    let issued = 0;
    const acquire = vi.fn(async () => {
      issued++;
      // Only the background attempt is held open; the first call resolves immediately.
      return issued === 1
        ? makeSession("token-1")
        : new Promise<SessionTokenInfo>((resolve) => (release = resolve));
    });
    const cache = new AutoRefreshingCache(acquire, 1000);

    const first = (await cache.get()) as ActiveSession;
    vi.setSystemTime(first.refreshAfterTimestamp + 1);
    await cache.get();
    await flushMicrotasks();
    assert.strictEqual(acquire.mock.calls.length, 2, "the background refresh must have started");

    // A 401 arrives for the session being refreshed, so the next caller has nothing to serve.
    cache.invalidateIfCurrent(first);
    const blocked = cache.get();
    await flushMicrotasks();

    assert.strictEqual(
      acquire.mock.calls.length,
      2,
      "the blocked caller must join the in-flight refresh, not start a second one",
    );

    release?.(makeSession("token-2"));
    assert.strictEqual(((await blocked) as ActiveSession).sessionToken, "token-2");
    assert.strictEqual(((await cache.get()) as ActiveSession).sessionToken, "token-2");
  });

  it("swallows a background failure, keeps the old value, and throttles the next attempt", async () => {
    const backgroundTimeoutMs = 1000;
    let issued = 0;
    const acquire = vi.fn(async () => {
      issued++;
      if (issued === 2) {
        throw new Error("service unavailable");
      }
      return makeSession(`token-${issued}`);
    });
    const cache = new AutoRefreshingCache(acquire, backgroundTimeoutMs);

    const first = (await cache.get()) as ActiveSession;
    const refreshTime = first.refreshAfterTimestamp + 1;
    vi.setSystemTime(refreshTime);

    await cache.get();
    await flushMicrotasks();

    const afterFailure = (await cache.get()) as ActiveSession;
    assert.strictEqual(afterFailure.sessionToken, "token-1", "old value must still be served");
    assert.strictEqual(
      afterFailure.refreshAfterTimestamp,
      refreshTime + backgroundTimeoutMs,
      "next background attempt must be throttled",
    );
  });

  it("retries on the next request when the background refresh times out", async () => {
    const backgroundTimeoutMs = 1000;
    let issued = 0;
    const acquire = vi.fn(async () => {
      issued++;
      if (issued === 2) {
        throw timeoutError();
      }
      return makeSession(`token-${issued}`);
    });
    const cache = new AutoRefreshingCache(acquire, backgroundTimeoutMs);

    const first = (await cache.get()) as ActiveSession;
    const refreshTime = first.refreshAfterTimestamp + 1;
    vi.setSystemTime(refreshTime);

    await cache.get();
    await flushMicrotasks();

    const afterTimeout = (await cache.get()) as ActiveSession;
    assert.strictEqual(afterTimeout.sessionToken, "token-1");
    assert.strictEqual(
      afterTimeout.refreshAfterTimestamp,
      refreshTime,
      "a timeout must be retried on the very next request, not throttled",
    );
  });

  it("invalidates the session the caller actually used", async () => {
    let issued = 0;
    const acquire = vi.fn(async () => makeSession(`token-${++issued}`));
    const cache = new AutoRefreshingCache(acquire);

    const used = await cache.get();
    cache.invalidateIfCurrent(used);

    const next = (await cache.get()) as ActiveSession;
    assert.strictEqual(next.sessionToken, "token-2");
    assert.strictEqual(acquire.mock.calls.length, 2);
  });

  it("ignores invalidation when the cache has already moved on", async () => {
    let issued = 0;
    const acquire = vi.fn(async () => makeSession(`token-${++issued}`));
    const cache = new AutoRefreshingCache(acquire);

    const stale = (await cache.get()) as ActiveSession;

    // Force a new session, then try to invalidate using the superseded one.
    vi.setSystemTime(stale.expiresOnTimestamp + 1);
    const current = await cache.get();
    cache.invalidateIfCurrent(stale);

    assert.strictEqual(await cache.get(), current, "the newer session must survive");
    assert.strictEqual(acquire.mock.calls.length, 2);
  });

  it("honors a bearer-fallback sentinel for its full cooldown, then re-acquires", async () => {
    const cooldownMs = FIVE_MINUTES;
    let issued = 0;
    const acquire = vi.fn(async (): Promise<SessionTokenInfo> => {
      issued++;
      return issued === 1 ? createBearerFallback(cooldownMs) : makeSession("token-after-cooldown");
    });
    const cache = new AutoRefreshingCache(acquire);

    const fallback = await cache.get();
    assert.strictEqual(fallback.kind, "bearerFallback");

    // Anywhere inside the cooldown the sentinel is reused, with no background re-acquire.
    vi.setSystemTime(BASE_TIME + cooldownMs - 1);
    assert.strictEqual((await cache.get()).kind, "bearerFallback");
    await flushMicrotasks();
    assert.strictEqual(acquire.mock.calls.length, 1);

    vi.setSystemTime(BASE_TIME + cooldownMs + 1);
    const recovered = await cache.get();
    assert.strictEqual(recovered.kind, "session");
    assert.strictEqual(acquire.mock.calls.length, 2);
  });

  it("does not fail other callers when one caller aborts", async () => {
    let resolveAcquire: ((value: SessionTokenInfo) => void) | undefined;
    const acquire = vi.fn(
      () =>
        new Promise<SessionTokenInfo>((resolve) => {
          resolveAcquire = resolve;
        }),
    );
    const cache = new AutoRefreshingCache(acquire);

    const controller = new AbortController();
    const abandoned = cache.get(controller.signal);
    const survivor = cache.get();

    controller.abort();
    await expect(abandoned).rejects.toThrow();

    const expected = makeSession("token-1");
    resolveAcquire!(expected);

    assert.strictEqual(await survivor, expected);
    assert.strictEqual(acquire.mock.calls.length, 1);
  });
});

describe("isSessionEligible", () => {
  const account = "https://myaccount.blob.core.windows.net";

  interface Case {
    readonly name: string;
    readonly url: string;
    readonly method?: HttpMethods;
    readonly headers?: Record<string, string>;
  }

  const eligible: Case[] = [
    { name: "blob download", url: `${account}/container/blob.txt` },
    { name: "blob in a virtual directory", url: `${account}/container/nested/path/blob.txt` },
    {
      name: "blob with a snapshot",
      url: `${account}/container/blob.txt?snapshot=2026-01-01T00%3A00%3A00Z`,
    },
    { name: "blob with a version id", url: `${account}/container/blob.txt?versionid=2026-01-01` },
    {
      name: "blob on an IP-style endpoint",
      url: "http://127.0.0.1:10000/devstoreaccount1/container/blob.txt",
    },
    {
      name: "blob download carrying an unrelated header",
      url: `${account}/container/blob.txt`,
      headers: { "x-ms-range": "bytes=0-1023" },
    },
  ];

  const ineligible: Case[] = [
    { name: "PUT", url: `${account}/container/blob.txt`, method: "PUT" },
    { name: "HEAD (get properties)", url: `${account}/container/blob.txt`, method: "HEAD" },
    { name: "DELETE", url: `${account}/container/blob.txt`, method: "DELETE" },
    { name: "container-level request", url: `${account}/container` },
    { name: "container-level request with a trailing slash", url: `${account}/container/` },
    { name: "service-level request", url: `${account}/` },
    { name: "list containers", url: `${account}/?comp=list` },
    { name: "get block list", url: `${account}/container/blob.txt?comp=blocklist` },
    { name: "get blob metadata", url: `${account}/container/blob.txt?comp=metadata` },
    { name: "get blob tags", url: `${account}/container/blob.txt?comp=tags` },
    { name: "restype=container", url: `${account}/container?restype=container` },
    { name: "restype=account", url: `${account}/container/blob.txt?restype=account` },
    { name: "restype=service", url: `${account}/?restype=service` },
    {
      name: "DataLake dfs endpoint",
      url: "https://myaccount.dfs.core.windows.net/filesystem/file.txt",
    },
    {
      name: "DataLake dfs endpoint behind a private endpoint",
      url: "https://myaccount.privatelink.dfs.core.windows.net/filesystem/file.txt",
    },
    {
      name: "comp with non-canonical casing",
      url: `${account}/container/blob.txt?Comp=blocklist`,
    },
    {
      name: "restype with non-canonical casing",
      url: `${account}/container/blob.txt?RESTYPE=account`,
    },
    {
      name: "container-level request on an IP-style endpoint",
      url: "http://127.0.0.1:10000/devstoreaccount1/container",
    },
    {
      name: "structured message download",
      url: `${account}/container/blob.txt`,
      headers: { "x-ms-structured-body": "XSM/1.0; properties=crc64" },
    },
    {
      name: "structured message download with a differently cased header",
      url: `${account}/container/blob.txt`,
      headers: { "X-MS-Structured-Body": "XSM/1.0; properties=crc64" },
    },
  ];

  function requestFor({ url, method = "GET", headers = {} }: Case): PipelineRequest {
    return createPipelineRequest({ url, method, headers: createHttpHeaders(headers) });
  }

  for (const testCase of eligible) {
    it(`allows ${testCase.name}`, () => {
      assert.isTrue(isSessionEligible(requestFor(testCase)));
    });
  }

  for (const testCase of ineligible) {
    it(`rejects ${testCase.name}`, () => {
      assert.isFalse(isSessionEligible(requestFor(testCase)));
    });
  }
});
