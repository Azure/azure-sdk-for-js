// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Mock } from "vitest";
import type { ConfigurationChangeCallback } from "../../src/_configuration/configurationManager.js";
import type { CustomerSDKStatsManager } from "../../src/export/statsbeat/customerSDKStatsManager.js";
import type { CustomerSDKStatsMetrics } from "../../src/export/statsbeat/customerSDKStats.js";
import type { StatsbeatOptions } from "../../src/export/statsbeat/types.js";
import type { SenderResult } from "../../src/types.js";
import type { BaseSender } from "../../src/platform/nodejs/baseSender.js";
import { diag } from "@opentelemetry/api";
import { ExportResultCode } from "@opentelemetry/core";
import { RestError } from "@azure/core-rest-pipeline";

interface MetricsMocks {
  shutdown: Mock<() => Promise<void>>;
  countSuccessfulItems: Mock;
  countDroppedItems: Mock;
  countRetryItems: Mock;
  isTimeoutError: Mock;
}

const mocks = vi.hoisted(() => {
  const createMetrics = (): MetricsMocks => ({
    shutdown: vi.fn<() => Promise<void>>().mockResolvedValue(undefined),
    countSuccessfulItems: vi.fn(),
    countDroppedItems: vi.fn(),
    countRetryItems: vi.fn(),
    isTimeoutError: vi.fn(),
  });
  return {
    createMetrics,
    getInstance: vi.fn<(_options: StatsbeatOptions) => Promise<ReturnType<typeof createMetrics>>>(),
    registerCallback: vi.fn<(callback: ConfigurationChangeCallback) => void>(),
    persistProviders: [] as Array<() => CustomerSDKStatsMetrics | undefined>,
    internalStats: {
      initialize: vi.fn(),
      shutdown: vi.fn<() => Promise<void>>().mockResolvedValue(undefined),
      countSuccess: vi.fn(),
      countRetry: vi.fn(),
      countFailure: vi.fn(),
      countException: vi.fn(),
    },
  };
});

vi.mock("../../src/export/statsbeat/customerSDKStats.js", () => ({
  CustomerSDKStatsMetrics: { getInstance: mocks.getInstance },
}));

vi.mock("../../src/_configuration/configurationManager.js", () => ({
  ConfigurationManager: { getInstance: () => ({ registerCallback: mocks.registerCallback }) },
}));

vi.mock("../../src/export/statsbeat/statsbeatManager.js", () => ({
  StatsbeatManager: { getInstance: () => mocks.internalStats },
}));

vi.mock("../../src/platform/nodejs/persist/index.js", () => ({
  FileSystemPersist: vi.fn(function (
    _instrumentationKey: string,
    _options: unknown,
    provider: () => CustomerSDKStatsMetrics | undefined,
  ) {
    mocks.persistProviders.push(provider);
    return {
      push: vi.fn().mockResolvedValue(true),
      restore: vi.fn().mockResolvedValue(true),
      shutdown: vi.fn(),
      shift: vi.fn().mockResolvedValue(null),
    };
  }),
}));

const options: StatsbeatOptions = {
  instrumentationKey: "1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",
  endpointUrl: "https://westeurope-5.in.applicationinsights.azure.com",
  disableOfflineStorage: true,
  networkCollectionInterval: 30000,
};
const enabledSettings = { FEATURE_CUSTOMER_SDK_STATS: '{"default":"enabled"}' };
const disabledSettings = { FEATURE_CUSTOMER_SDK_STATS: '{"default":"disabled"}' };

function callback(): ConfigurationChangeCallback {
  const registered = mocks.registerCallback.mock.calls[0]?.[0];
  if (!registered) {
    throw new Error("Customer SDK Stats configuration callback was not registered");
  }
  return registered;
}

function deferred<T>(): {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (reason: Error) => void;
} {
  let resolvePromise!: (value: T) => void;
  let rejectPromise!: (reason: Error) => void;
  const promise = new Promise<T>((resolve, reject) => {
    resolvePromise = resolve;
    rejectPromise = reject;
  });
  return { promise, resolve: resolvePromise, reject: rejectPromise };
}

describe("CustomerSDKStatsManager", () => {
  let manager: CustomerSDKStatsManager;
  let metrics: ReturnType<typeof mocks.createMetrics>;

  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();
    vi.stubEnv("APPLICATIONINSIGHTS_SDKSTATS_DISABLED", undefined);
    vi.stubEnv("APPLICATION_INSIGHTS_NO_STATSBEAT", undefined);
    vi.stubEnv("APPLICATIONINSIGHTS_SDKSTATS_EXPORT_INTERVAL", undefined);
    mocks.persistProviders.length = 0;
    metrics = mocks.createMetrics();
    mocks.getInstance.mockResolvedValue(metrics);
    const { CustomerSDKStatsManager: Manager } =
      await import("../../src/export/statsbeat/customerSDKStatsManager.js");
    manager = Manager.getInstance();
  });

  afterEach(async () => {
    metrics.shutdown.mockResolvedValue(undefined);
    await manager.shutdown();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("defaults to enabled, sharing one collector and one callback", async () => {
    await Promise.all([manager.initialize(options), manager.initialize(options)]);

    expect(mocks.getInstance).toHaveBeenCalledExactlyOnceWith(options);
    expect(mocks.registerCallback).toHaveBeenCalledOnce();
    expect(manager.customerSDKStatsMetrics).toBe(metrics);
  });

  it.each([enabledSettings, disabledSettings])(
    "replays cached settings safely: %j",
    async (settings) => {
      mocks.registerCallback.mockImplementationOnce((registered) => {
        void registered(settings);
      });

      await manager.initialize(options);

      expect(mocks.registerCallback).toHaveBeenCalledOnce();
      expect(mocks.getInstance).toHaveBeenCalledTimes(settings === enabledSettings ? 1 : 0);
    },
  );

  it("stops immediately and restarts once with the original options", async () => {
    await manager.initialize(options);
    const disabled = callback()(disabledSettings);
    expect(manager.customerSDKStatsMetrics).toBeUndefined();
    await disabled;
    expect(metrics.shutdown).toHaveBeenCalledOnce();

    await manager.initialize(options);
    expect(mocks.getInstance).toHaveBeenCalledOnce();

    const restarted = mocks.createMetrics();
    mocks.getInstance.mockResolvedValueOnce(restarted);
    await callback()(enabledSettings);
    await callback()(enabledSettings);

    expect(mocks.getInstance).toHaveBeenCalledTimes(2);
    expect(mocks.getInstance).toHaveBeenLastCalledWith(options);
    expect(manager.customerSDKStatsMetrics).toBe(restarted);
    expect(mocks.internalStats.shutdown).not.toHaveBeenCalled();
  });

  it.each([
    {},
    { FEATURE_SDK_STATS: '{"default":"disabled"}' },
    { FEATURE_CUSTOMER_SDK_STATS: "invalid-json" },
    { FEATURE_CUSTOMER_SDK_STATS: '{"default":"unexpected"}' },
    { FEATURE_CUSTOMER_SDK_STATS: { default: true } },
  ])(
    "preserves enabled and disabled states for missing or invalid settings: %j",
    async (settings) => {
      await manager.initialize(options);
      await callback()(settings);
      expect(manager.customerSDKStatsMetrics).toBe(metrics);

      await callback()(disabledSettings);
      await callback()(settings);
      expect(manager.customerSDKStatsMetrics).toBeUndefined();
      expect(mocks.getInstance).toHaveBeenCalledOnce();
    },
  );

  it.each([{}, { FEATURE_SDK_STATS: '{"default":"disabled"}' }])(
    "does not log when the customer setting is missing: %j",
    async (settings) => {
      const debug = vi.spyOn(diag, "debug");
      await manager.initialize(options);

      await callback()(settings);
      await callback()(disabledSettings);
      await callback()(settings);

      expect(debug).not.toHaveBeenCalled();
    },
  );

  it.each(["invalid-json", '{"default":"unexpected"}', { default: true }, null, undefined])(
    "logs a present but invalid customer setting: %j",
    async (value) => {
      const debug = vi.spyOn(diag, "debug");
      await manager.initialize(options);

      await callback()({ FEATURE_CUSTOMER_SDK_STATS: value });

      expect(debug).toHaveBeenCalledWith(
        "Ignoring invalid OneSettings customer SDK Stats setting.",
      );
    },
  );

  it("applies feature overrides using the shared configuration profile", async () => {
    const { ConfigurationProfile } =
      await import("../../src/_configuration/configurationProfile.js");
    ConfigurationProfile.getInstance().fill({ os: "linux", component: "ext", version: "1.0.0" });
    await manager.initialize(options);

    await callback()({
      FEATURE_CUSTOMER_SDK_STATS: JSON.stringify({
        default: "enabled",
        override: [{ os: ["linux", "windows"], component: "ext", ver: "1.0.0" }],
      }),
    });

    expect(manager.customerSDKStatsMetrics).toBeUndefined();
    expect(metrics.shutdown).toHaveBeenCalledOnce();
  });

  it.each(["APPLICATIONINSIGHTS_SDKSTATS_DISABLED", "APPLICATION_INSIGHTS_NO_STATSBEAT"])(
    "does not override local opt-out %s",
    async (environmentVariable) => {
      vi.stubEnv(environmentVariable, "true");
      await manager.initialize(options);
      await callback()(enabledSettings);

      expect(mocks.getInstance).not.toHaveBeenCalled();
      expect(manager.customerSDKStatsMetrics).toBeUndefined();
    },
  );

  it("shuts down a collector disabled during asynchronous initialization", async () => {
    const starting = deferred<ReturnType<typeof mocks.createMetrics>>();
    mocks.getInstance.mockReturnValueOnce(starting.promise);
    const initialization = manager.initialize(options);
    await Promise.resolve();

    const disabled = callback()(disabledSettings);
    starting.resolve(metrics);
    await initialization;
    await disabled;

    expect(metrics.shutdown).toHaveBeenCalledOnce();
    expect(manager.customerSDKStatsMetrics).toBeUndefined();
  });

  it("waits for shutdown before re-enabling and never exposes the stopping collector", async () => {
    await manager.initialize(options);
    const stopping = deferred<void>();
    metrics.shutdown.mockReturnValueOnce(stopping.promise);
    const disabled = callback()(disabledSettings);
    await Promise.resolve();
    const enabled = callback()(enabledSettings);

    expect(manager.customerSDKStatsMetrics).toBeUndefined();
    expect(mocks.getInstance).toHaveBeenCalledOnce();
    stopping.resolve(undefined);
    await disabled;
    await enabled;

    expect(mocks.getInstance).toHaveBeenCalledTimes(2);
    expect(manager.customerSDKStatsMetrics).toBe(metrics);
  });

  it("honors a later disable while a restart is pending", async () => {
    await manager.initialize(options);
    const stopping = deferred<void>();
    metrics.shutdown.mockReturnValueOnce(stopping.promise);
    const firstDisable = callback()(disabledSettings);
    await Promise.resolve();
    const enable = callback()(enabledSettings);
    const lastDisable = callback()(disabledSettings);
    stopping.resolve(undefined);

    await Promise.all([firstDisable, enable, lastDisable]);

    expect(mocks.getInstance).toHaveBeenCalledOnce();
    expect(manager.customerSDKStatsMetrics).toBeUndefined();
  });

  it("propagates initialization failures and can retry", async () => {
    const error = new Error("initialization failed");
    mocks.getInstance.mockRejectedValueOnce(error);
    await expect(manager.initialize(options)).rejects.toBe(error);
    expect(manager.customerSDKStatsMetrics).toBeUndefined();

    await callback()(enabledSettings);

    expect(manager.customerSDKStatsMetrics).toBe(metrics);
  });

  it("does not restart after a failed shutdown until cleanup succeeds", async () => {
    await manager.initialize(options);
    const error = new Error("shutdown failed");
    metrics.shutdown.mockRejectedValue(error);
    await expect(callback()(disabledSettings)).rejects.toBe(error);
    await expect(callback()(enabledSettings)).rejects.toBe(error);

    expect(mocks.getInstance).toHaveBeenCalledOnce();
    expect(manager.customerSDKStatsMetrics).toBeUndefined();

    metrics.shutdown.mockResolvedValue(undefined);
    await callback()(enabledSettings);
    expect(mocks.getInstance).toHaveBeenCalledTimes(2);
  });

  async function createSender(
    trackStatsbeat = true,
    isStatsbeatSender = false,
  ): Promise<BaseSender & { send: Mock<() => Promise<SenderResult>> }> {
    const { BaseSender } = await import("../../src/platform/nodejs/baseSender.js");
    class Sender extends BaseSender {
      send = vi
        .fn<() => Promise<SenderResult>>()
        .mockResolvedValue({ statusCode: 200, result: "" });
      handlePermanentRedirect(): boolean {
        return false;
      }
    }
    return new Sender({
      endpointUrl: options.endpointUrl,
      instrumentationKey: options.instrumentationKey,
      trackStatsbeat,
      isStatsbeatSender,
      exporterOptions: { disableOfflineStorage: true },
    });
  }

  it("routes all senders and persistence accounting to the current collector", async () => {
    const first = await createSender();
    const second = await createSender();
    await manager.initialize(options);
    const envelopes = [{ name: "test", time: new Date() }];
    try {
      await first.exportEnvelopes(envelopes);
      await second.exportEnvelopes(envelopes);
      expect(metrics.countSuccessfulItems).toHaveBeenCalledTimes(2);
      expect(mocks.persistProviders.map((provider) => provider())).toEqual([metrics, metrics]);

      await callback()(disabledSettings);
      expect((await first.exportEnvelopes(envelopes)).code).toBe(ExportResultCode.SUCCESS);
      expect(metrics.countSuccessfulItems).toHaveBeenCalledTimes(2);
      expect(mocks.persistProviders.map((provider) => provider())).toEqual([undefined, undefined]);

      const restarted = mocks.createMetrics();
      mocks.getInstance.mockResolvedValueOnce(restarted);
      await callback()(enabledSettings);
      await first.exportEnvelopes(envelopes);
      await second.exportEnvelopes(envelopes);
      expect(restarted.countSuccessfulItems).toHaveBeenCalledTimes(2);
      expect(mocks.persistProviders.map((provider) => provider())).toEqual([restarted, restarted]);
    } finally {
      await first.shutdown();
      await second.shutdown();
    }
  });

  it.each([
    [false, false, undefined],
    [true, true, undefined],
    [true, false, "true"],
  ])(
    "does not attach excluded senders to shared metrics (%s, %s, %s)",
    async (trackStatsbeat, isStatsbeatSender, disabled) => {
      await manager.initialize(options);
      vi.stubEnv("APPLICATIONINSIGHTS_SDKSTATS_DISABLED", disabled);
      const sender = await createSender(trackStatsbeat, isStatsbeatSender);
      try {
        await sender.exportEnvelopes([{ name: "test", time: new Date() }]);
        expect(metrics.countSuccessfulItems).not.toHaveBeenCalled();
        expect(mocks.persistProviders[0]()).toBeUndefined();
      } finally {
        await sender.shutdown();
      }
    },
  );

  it("keeps shared stats active when an individual sender shuts down", async () => {
    const sender = await createSender();
    await manager.initialize(options);

    await sender.shutdown();

    expect(metrics.shutdown).not.toHaveBeenCalled();
    expect(manager.customerSDKStatsMetrics).toBe(metrics);
  });

  it("shuts down customer stats on an invalid instrumentation key", async () => {
    const sender = await createSender();
    await manager.initialize(options);
    sender.send.mockRejectedValueOnce(
      new RestError("Invalid instrumentation key", { statusCode: 400 }),
    );
    try {
      await sender.exportEnvelopes([{ name: "test", time: new Date() }]);
      await manager.shutdown();
      expect(metrics.shutdown).toHaveBeenCalledOnce();
      expect(manager.customerSDKStatsMetrics).toBeUndefined();
    } finally {
      await sender.shutdown();
    }
  });
});
