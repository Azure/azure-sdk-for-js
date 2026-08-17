// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, assert, beforeEach, describe, it, vi } from "vitest";
import { ConfigurationManager } from "../../src/_configuration/configurationManager.js";
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
    request.mockReset();
  });

  afterEach(() => {
    manager.reset();
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
      [ONE_SETTINGS_CHANGE_URL, ONE_SETTINGS_NODEJS_TARGETING, { "x-ms-onesetinterval": "60" }],
      [ONE_SETTINGS_CONFIG_URL, ONE_SETTINGS_NODEJS_TARGETING],
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
    ]);
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
});
