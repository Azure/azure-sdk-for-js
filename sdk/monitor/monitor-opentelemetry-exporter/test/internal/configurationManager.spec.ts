// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, assert, beforeEach, describe, it, vi } from "vitest";
import { ConfigurationManager } from "../../src/_configuration/configurationManager.js";
import { ConfigurationProfile } from "../../src/_configuration/configurationProfile.js";
import type { OneSettingsResponse } from "../../src/_configuration/utils.js";
import { makeOneSettingsRequest } from "../../src/_configuration/utils.js";
import {
  ONE_SETTINGS_CHANGE_URL,
  ONE_SETTINGS_CONFIG_URL,
  ONE_SETTINGS_DEFAULT_REFRESH_INTERVAL_MS,
  ONE_SETTINGS_MAX_REFRESH_INTERVAL_MS,
  ONE_SETTINGS_NODEJS_TARGETING,
} from "../../src/Declarations/Constants.js";

vi.mock("../../src/_configuration/utils.js", () => ({
  makeOneSettingsRequest: vi.fn(),
}));

function response(overrides: Partial<OneSettingsResponse> = {}): OneSettingsResponse {
  return {
    refreshIntervalMs: ONE_SETTINGS_DEFAULT_REFRESH_INTERVAL_MS,
    settings: {},
    statusCode: 200,
    hasException: false,
    ...overrides,
  };
}

describe("ConfigurationManager", () => {
  const manager = ConfigurationManager.getInstance();
  const request = vi.mocked(makeOneSettingsRequest);

  beforeEach(() => {
    manager.reset();
    ConfigurationProfile.getInstance().reset();
    request.mockReset();
  });

  afterEach(() => {
    manager.reset();
    ConfigurationProfile.getInstance().reset();
  });

  it("fills the write-once evaluation profile across repeated initialization", () => {
    manager.initialize({ component: "ext", version: "1.0.0", os: "linux" });
    manager.initialize({ component: "dst", region: "westus", ikey: "test-ikey" });

    assert.deepStrictEqual(ConfigurationProfile.getInstance().snapshot(), {
      os: "linux",
      rp: "",
      attach: "",
      version: "1.0.0",
      component: "ext",
      region: "westus",
      ikey: "test-ikey",
    });
  });

  it("fetches and caches configuration when change detection reports an update", async () => {
    const callback = vi.fn();
    manager.registerCallback(callback);
    request
      .mockResolvedValueOnce(
        response({
          etag: '"etag-1"',
          refreshIntervalMs: 30 * 60 * 1000,
        }),
      )
      .mockResolvedValueOnce(
        response({
          settings: { FEATURE_SDK_STATS: '{"default":"enabled"}' },
        }),
      );

    const interval = await manager.getConfigurationAndRefreshInterval();

    assert.strictEqual(interval, 30 * 60 * 1000);
    assert.deepStrictEqual(manager.getSettings(), {
      FEATURE_SDK_STATS: '{"default":"enabled"}',
    });
    assert.deepStrictEqual(request.mock.calls, [
      [
        ONE_SETTINGS_CHANGE_URL,
        ONE_SETTINGS_NODEJS_TARGETING,
        { "x-ms-onesetinterval": "60" },
        undefined,
      ],
      [ONE_SETTINGS_CONFIG_URL, ONE_SETTINGS_NODEJS_TARGETING, {}, undefined],
    ]);
    assert.deepStrictEqual(callback.mock.calls, [[{ FEATURE_SDK_STATS: '{"default":"enabled"}' }]]);
  });

  it("keeps cached settings and skips the config endpoint on 304", async () => {
    request
      .mockResolvedValueOnce(
        response({
          etag: '"etag-1"',
          settings: {},
        }),
      )
      .mockResolvedValueOnce(response({ settings: { setting: "cached" } }))
      .mockResolvedValueOnce(
        response({
          statusCode: 304,
          etag: '"etag-1"',
          refreshIntervalMs: 15 * 60 * 1000,
        }),
      );

    await manager.getConfigurationAndRefreshInterval();
    request.mockClear();

    const interval = await manager.getConfigurationAndRefreshInterval();

    assert.strictEqual(interval, 15 * 60 * 1000);
    assert.deepStrictEqual(manager.getSettings(), { setting: "cached" });
    assert.deepStrictEqual(request.mock.calls, [
      [
        ONE_SETTINGS_CHANGE_URL,
        ONE_SETTINGS_NODEJS_TARGETING,
        {
          "If-None-Match": '"etag-1"',
          "x-ms-onesetinterval": "60",
        },
        undefined,
      ],
    ]);
  });

  it("does not advance the ETag or notify callbacks when config fetching fails", async () => {
    const callback = vi.fn();
    manager.registerCallback(callback);
    request
      .mockResolvedValueOnce(response({ etag: '"unapplied-etag"', refreshIntervalMs: 120000 }))
      .mockResolvedValueOnce(response({ statusCode: 500 }))
      .mockResolvedValueOnce(response({ statusCode: 304 }));

    assert.strictEqual(await manager.getConfigurationAndRefreshInterval(), 120000);
    request.mockClear();

    await manager.getConfigurationAndRefreshInterval();

    assert.deepStrictEqual(request.mock.calls[0], [
      ONE_SETTINGS_CHANGE_URL,
      ONE_SETTINGS_NODEJS_TARGETING,
      { "x-ms-onesetinterval": "2" },
      undefined,
    ]);
    assert.deepStrictEqual(manager.getSettings(), {});
    assert.strictEqual(callback.mock.calls.length, 0);
  });

  it("does not apply configuration returned after a poll is aborted", async () => {
    const callback = vi.fn();
    const abortController = new AbortController();
    let resolveConfig: ((value: OneSettingsResponse) => void) | undefined;
    manager.registerCallback(callback);
    request
      .mockResolvedValueOnce(response({ etag: '"aborted-etag"', refreshIntervalMs: 120_000 }))
      .mockImplementationOnce(
        () =>
          new Promise((resolve) => {
            resolveConfig = resolve;
          }),
      );

    const poll = manager.getConfigurationAndRefreshInterval(abortController.signal);
    await vi.waitFor(() => assert.strictEqual(request.mock.calls.length, 2));
    abortController.abort();
    resolveConfig?.(response({ settings: { setting: "stale" } }));

    assert.strictEqual(await poll, ONE_SETTINGS_DEFAULT_REFRESH_INTERVAL_MS);
    assert.deepStrictEqual(manager.getSettings(), {});
    assert.strictEqual(callback.mock.calls.length, 0);
  });

  it("applies capped exponential backoff for consecutive transient errors", async () => {
    request
      .mockResolvedValue(response({ statusCode: 503 }))
      .mockResolvedValueOnce(response({ hasException: true, statusCode: 0 }));

    const intervals = [];
    for (let attempt = 0; attempt < 7; attempt++) {
      intervals.push(await manager.getConfigurationAndRefreshInterval());
    }

    assert.deepStrictEqual(intervals, [
      1 * 60 * 60 * 1000,
      2 * 60 * 60 * 1000,
      4 * 60 * 60 * 1000,
      8 * 60 * 60 * 1000,
      16 * 60 * 60 * 1000,
      ONE_SETTINGS_MAX_REFRESH_INTERVAL_MS,
      ONE_SETTINGS_MAX_REFRESH_INTERVAL_MS,
    ]);
  });

  it("backs off after 401 and 403 responses", async () => {
    request
      .mockResolvedValueOnce(response({ statusCode: 401 }))
      .mockResolvedValueOnce(response({ statusCode: 403 }));

    assert.strictEqual(
      await manager.getConfigurationAndRefreshInterval(),
      ONE_SETTINGS_DEFAULT_REFRESH_INTERVAL_MS,
    );
    assert.strictEqual(
      await manager.getConfigurationAndRefreshInterval(),
      2 * ONE_SETTINGS_DEFAULT_REFRESH_INTERVAL_MS,
    );
  });

  it("resets transient backoff after a non-transient response", async () => {
    request
      .mockResolvedValueOnce(response({ statusCode: 503 }))
      .mockResolvedValueOnce(response({ statusCode: 304 }))
      .mockResolvedValueOnce(response({ statusCode: 503 }));

    assert.strictEqual(
      await manager.getConfigurationAndRefreshInterval(),
      ONE_SETTINGS_DEFAULT_REFRESH_INTERVAL_MS,
    );
    assert.strictEqual(
      await manager.getConfigurationAndRefreshInterval(),
      ONE_SETTINGS_DEFAULT_REFRESH_INTERVAL_MS,
    );
    assert.strictEqual(
      await manager.getConfigurationAndRefreshInterval(),
      ONE_SETTINGS_DEFAULT_REFRESH_INTERVAL_MS,
    );
  });

  it("slow-polls after a non-retryable change-detection error", async () => {
    request.mockResolvedValueOnce(response({ statusCode: 404 }));

    assert.strictEqual(
      await manager.getConfigurationAndRefreshInterval(),
      ONE_SETTINGS_MAX_REFRESH_INTERVAL_MS,
    );
    assert.strictEqual(request.mock.calls.length, 1);
  });

  it("replays cached settings to callbacks registered after an update", async () => {
    request
      .mockResolvedValueOnce(response({ etag: '"etag-1"' }))
      .mockResolvedValueOnce(response({ settings: { setting: "cached" } }));
    await manager.getConfigurationAndRefreshInterval();
    const callback = vi.fn();

    manager.registerCallback(callback);

    assert.deepStrictEqual(callback.mock.calls, [[{ setting: "cached" }]]);
  });

  it("isolates callback failures while notifying an update", async () => {
    const successfulCallback = vi.fn();
    manager.registerCallback(() => {
      throw new Error("callback failed");
    });
    manager.registerCallback(successfulCallback);
    request
      .mockResolvedValueOnce(response({ etag: '"etag-1"' }))
      .mockResolvedValueOnce(response({ settings: { setting: "updated" } }));

    await manager.getConfigurationAndRefreshInterval();

    assert.deepStrictEqual(successfulCallback.mock.calls, [[{ setting: "updated" }]]);
  });

  it("releases registered callbacks during shutdown", async () => {
    const callback = vi.fn();
    manager.registerCallback(callback);
    manager.shutdown();
    request
      .mockResolvedValueOnce(response({ etag: '"etag-after-shutdown"' }))
      .mockResolvedValueOnce(response({ settings: { setting: "updated" } }));

    await manager.getConfigurationAndRefreshInterval();

    assert.strictEqual(callback.mock.calls.length, 0);
  });

  describe("polling worker", () => {
    beforeEach(() => {
      manager.reset();
      vi.useFakeTimers();
    });

    afterEach(() => {
      manager.reset();
      vi.useRealTimers();
      vi.restoreAllMocks();
    });

    it("starts polling after a randomized delay between 5 and 15 seconds", async () => {
      const poll = vi
        .spyOn(manager, "getConfigurationAndRefreshInterval")
        .mockResolvedValue(ONE_SETTINGS_DEFAULT_REFRESH_INTERVAL_MS);
      const random = vi.spyOn(Math, "random").mockReturnValue(0);

      manager.initialize();
      await vi.advanceTimersByTimeAsync(4_999);
      assert.strictEqual(poll.mock.calls.length, 0);
      await vi.advanceTimersByTimeAsync(1);
      assert.strictEqual(poll.mock.calls.length, 1);

      manager.shutdown();
      poll.mockClear();
      random.mockReturnValue(1);
      manager.initialize();
      await vi.advanceTimersByTimeAsync(14_999);
      assert.strictEqual(poll.mock.calls.length, 0);
      await vi.advanceTimersByTimeAsync(1);
      assert.strictEqual(poll.mock.calls.length, 1);
    });

    it("unrefs startup and refresh timers", async () => {
      vi.spyOn(manager, "getConfigurationAndRefreshInterval").mockResolvedValue(10_000);
      vi.spyOn(Math, "random").mockReturnValue(0);
      const setTimeoutSpy = vi.spyOn(globalThis, "setTimeout");

      manager.initialize();
      const startupTimer = setTimeoutSpy.mock.results[0]?.value as NodeJS.Timeout;
      assert.strictEqual(startupTimer.hasRef(), false);

      await vi.advanceTimersByTimeAsync(5_000);
      const refreshTimer = setTimeoutSpy.mock.results[1]?.value as NodeJS.Timeout;
      assert.strictEqual(refreshTimer.hasRef(), false);
    });

    it("reschedules with the returned interval only after the current poll completes", async () => {
      let resolveFirstPoll: ((intervalMs: number) => void) | undefined;
      const firstPoll = new Promise<number>((resolve) => {
        resolveFirstPoll = resolve;
      });
      const poll = vi
        .spyOn(manager, "getConfigurationAndRefreshInterval")
        .mockReturnValueOnce(firstPoll)
        .mockResolvedValue(20_000);
      vi.spyOn(Math, "random").mockReturnValue(0);

      manager.initialize();
      await vi.advanceTimersByTimeAsync(5_000);
      assert.strictEqual(poll.mock.calls.length, 1);
      assert.strictEqual(vi.getTimerCount(), 0);

      await vi.advanceTimersByTimeAsync(60_000);
      assert.strictEqual(poll.mock.calls.length, 1);

      resolveFirstPoll?.(7_000);
      await Promise.resolve();
      assert.strictEqual(vi.getTimerCount(), 1);
      await vi.advanceTimersByTimeAsync(6_999);
      assert.strictEqual(poll.mock.calls.length, 1);
      await vi.advanceTimersByTimeAsync(1);
      assert.strictEqual(poll.mock.calls.length, 2);
    });

    it("bounds refresh intervals before scheduling the next poll", async () => {
      const poll = vi
        .spyOn(manager, "getConfigurationAndRefreshInterval")
        .mockResolvedValueOnce(Number.POSITIVE_INFINITY)
        .mockResolvedValueOnce(2 * ONE_SETTINGS_MAX_REFRESH_INTERVAL_MS)
        .mockResolvedValue(ONE_SETTINGS_DEFAULT_REFRESH_INTERVAL_MS);
      vi.spyOn(Math, "random").mockReturnValue(0);

      manager.initialize();
      await vi.advanceTimersByTimeAsync(5_000);
      await vi.advanceTimersByTimeAsync(ONE_SETTINGS_DEFAULT_REFRESH_INTERVAL_MS);
      assert.strictEqual(poll.mock.calls.length, 2);

      await vi.advanceTimersByTimeAsync(ONE_SETTINGS_MAX_REFRESH_INTERVAL_MS - 1);
      assert.strictEqual(poll.mock.calls.length, 2);
      await vi.advanceTimersByTimeAsync(1);
      assert.strictEqual(poll.mock.calls.length, 3);
    });

    it("cancels polling when shut down before startup", async () => {
      const poll = vi
        .spyOn(manager, "getConfigurationAndRefreshInterval")
        .mockResolvedValue(ONE_SETTINGS_DEFAULT_REFRESH_INTERVAL_MS);
      vi.spyOn(Math, "random").mockReturnValue(0.5);

      manager.initialize();
      manager.shutdown();
      await vi.advanceTimersByTimeAsync(15_000);

      assert.strictEqual(poll.mock.calls.length, 0);
      assert.strictEqual(vi.getTimerCount(), 0);
    });

    it("cancels the next poll when shut down between polls", async () => {
      const poll = vi
        .spyOn(manager, "getConfigurationAndRefreshInterval")
        .mockResolvedValue(10_000);
      vi.spyOn(Math, "random").mockReturnValue(0);

      manager.initialize();
      await vi.advanceTimersByTimeAsync(5_000);
      assert.strictEqual(poll.mock.calls.length, 1);

      manager.shutdown();
      await vi.advanceTimersByTimeAsync(10_000);
      assert.strictEqual(poll.mock.calls.length, 1);
      assert.strictEqual(vi.getTimerCount(), 0);
    });

    it("aborts an active poll during shutdown", async () => {
      let activeSignal: AbortSignal | undefined;
      const poll = vi.spyOn(manager, "getConfigurationAndRefreshInterval").mockImplementationOnce(
        (abortSignal) =>
          new Promise((resolve) => {
            activeSignal = abortSignal;
            abortSignal?.addEventListener("abort", () =>
              resolve(ONE_SETTINGS_DEFAULT_REFRESH_INTERVAL_MS),
            );
          }),
      );
      vi.spyOn(Math, "random").mockReturnValue(0);

      manager.initialize();
      await vi.advanceTimersByTimeAsync(5_000);
      assert.strictEqual(activeSignal?.aborted, false);

      manager.shutdown();
      await Promise.resolve();

      assert.strictEqual(activeSignal?.aborted, true);
      assert.strictEqual(poll.mock.calls.length, 1);
      assert.strictEqual(vi.getTimerCount(), 0);
    });

    it("restarts after shutdown", async () => {
      const poll = vi
        .spyOn(manager, "getConfigurationAndRefreshInterval")
        .mockResolvedValue(ONE_SETTINGS_DEFAULT_REFRESH_INTERVAL_MS);
      vi.spyOn(Math, "random").mockReturnValue(0);

      manager.initialize();
      manager.shutdown();
      manager.initialize();
      await vi.advanceTimersByTimeAsync(5_000);

      assert.strictEqual(poll.mock.calls.length, 1);
    });

    it("starts only one worker across repeated initialize calls", async () => {
      const poll = vi
        .spyOn(manager, "getConfigurationAndRefreshInterval")
        .mockResolvedValue(ONE_SETTINGS_DEFAULT_REFRESH_INTERVAL_MS);
      vi.spyOn(Math, "random").mockReturnValue(0);

      manager.initialize();
      manager.initialize();

      assert.strictEqual(vi.getTimerCount(), 1);
      await vi.advanceTimersByTimeAsync(5_000);
      assert.strictEqual(poll.mock.calls.length, 1);
    });
  });
});
