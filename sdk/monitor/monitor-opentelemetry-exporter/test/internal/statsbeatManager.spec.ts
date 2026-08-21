// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const providerMocks = vi.hoisted(() => {
  const network = {
    shutdown: vi.fn().mockResolvedValue(undefined),
    countSuccess: vi.fn(),
    countFailure: vi.fn(),
    countRetry: vi.fn(),
    countThrottle: vi.fn(),
    countException: vi.fn(),
    countReadFailure: vi.fn(),
    countWriteFailure: vi.fn(),
  };
  const longInterval = {
    shutdown: vi.fn().mockResolvedValue(undefined),
  };
  return {
    network,
    longInterval,
    getNetworkInstance: vi.fn(() => network),
    getLongIntervalInstance: vi.fn(() => longInterval),
  };
});

vi.mock("../../src/export/statsbeat/networkStatsbeatMetrics.js", () => ({
  NetworkStatsbeatMetrics: {
    getInstance: providerMocks.getNetworkInstance,
  },
}));

vi.mock("../../src/export/statsbeat/longIntervalStatsbeatMetrics.js", () => ({
  LongIntervalStatsbeatMetrics: {
    getInstance: providerMocks.getLongIntervalInstance,
  },
}));

import { StatsbeatManager } from "../../src/export/statsbeat/statsbeatManager.js";
import { AzureMonitorTraceExporter } from "../../src/export/trace.js";

describe("StatsbeatManager", () => {
  const options = {
    instrumentationKey: "1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",
    endpointUrl: "https://westeurope-5.in.applicationinsights.azure.com",
    disableOfflineStorage: true,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (StatsbeatManager as any).instance = undefined;
  });

  afterEach(async () => {
    await StatsbeatManager.getInstance().shutdown();
  });

  it("is process-global and initializes both providers once", () => {
    const manager = StatsbeatManager.getInstance();

    expect(StatsbeatManager.getInstance()).toBe(manager);
    manager.initialize(options);
    manager.initialize(options);

    expect(providerMocks.getNetworkInstance).toHaveBeenCalledOnce();
    expect(providerMocks.getLongIntervalInstance).toHaveBeenCalledOnce();
    expect(manager.networkStatsbeatMetrics).toBe(providerMocks.network);
    expect(manager.longIntervalStatsbeatMetrics).toBe(providerMocks.longInterval);
  });

  it("coordinates shutdown and restarts with the last configuration", async () => {
    const manager = StatsbeatManager.getInstance();
    manager.initialize(options);

    await manager.shutdown();

    expect(providerMocks.network.shutdown).toHaveBeenCalledOnce();
    expect(providerMocks.longInterval.shutdown).toHaveBeenCalledOnce();
    expect(manager.networkStatsbeatMetrics).toBeUndefined();
    expect(manager.longIntervalStatsbeatMetrics).toBeUndefined();

    manager.initialize();

    expect(providerMocks.getNetworkInstance).toHaveBeenCalledTimes(2);
    expect(providerMocks.getNetworkInstance).toHaveBeenLastCalledWith(options);
    expect(providerMocks.getLongIntervalInstance).toHaveBeenCalledTimes(2);
  });

  it("waits for an active shutdown before restarting providers", async () => {
    let resolveNetworkShutdown!: () => void;
    let resolveLongIntervalShutdown!: () => void;
    providerMocks.network.shutdown.mockImplementationOnce(
      () =>
        new Promise<void>((resolve) => {
          resolveNetworkShutdown = resolve;
        }),
    );
    providerMocks.longInterval.shutdown.mockImplementationOnce(
      () =>
        new Promise<void>((resolve) => {
          resolveLongIntervalShutdown = resolve;
        }),
    );
    const manager = StatsbeatManager.getInstance();
    manager.initialize(options);

    const firstShutdown = manager.shutdown();
    const secondShutdown = manager.shutdown();
    manager.initialize(options);

    expect(secondShutdown).toBe(firstShutdown);
    expect(providerMocks.getNetworkInstance).toHaveBeenCalledOnce();
    expect(providerMocks.getLongIntervalInstance).toHaveBeenCalledOnce();

    resolveNetworkShutdown();
    resolveLongIntervalShutdown();
    await firstShutdown;

    expect(providerMocks.getNetworkInstance).toHaveBeenCalledTimes(2);
    expect(providerMocks.getLongIntervalInstance).toHaveBeenCalledTimes(2);
  });

  it("honors a later shutdown while a restart is pending", async () => {
    let resolveNetworkShutdown!: () => void;
    let resolveLongIntervalShutdown!: () => void;
    providerMocks.network.shutdown.mockImplementationOnce(
      () =>
        new Promise<void>((resolve) => {
          resolveNetworkShutdown = resolve;
        }),
    );
    providerMocks.longInterval.shutdown.mockImplementationOnce(
      () =>
        new Promise<void>((resolve) => {
          resolveLongIntervalShutdown = resolve;
        }),
    );
    const manager = StatsbeatManager.getInstance();
    manager.initialize(options);

    const shutdownPromise = manager.shutdown();
    manager.initialize(options);
    expect(manager.shutdown()).toBe(shutdownPromise);

    resolveNetworkShutdown();
    resolveLongIntervalShutdown();
    await shutdownPromise;

    expect(providerMocks.getNetworkInstance).toHaveBeenCalledOnce();
    expect(providerMocks.getLongIntervalInstance).toHaveBeenCalledOnce();
  });

  it("waits for both providers and does not restart after a shutdown failure", async () => {
    const shutdownError = new Error("network shutdown failed");
    let resolveLongIntervalShutdown!: () => void;
    providerMocks.network.shutdown.mockRejectedValueOnce(shutdownError);
    providerMocks.longInterval.shutdown.mockImplementationOnce(
      () =>
        new Promise<void>((resolve) => {
          resolveLongIntervalShutdown = resolve;
        }),
    );
    const manager = StatsbeatManager.getInstance();
    manager.initialize(options);

    const shutdownPromise = manager.shutdown();
    manager.initialize(options);
    let shutdownSettled = false;
    void shutdownPromise
      .catch(() => undefined)
      .finally(() => {
        shutdownSettled = true;
      });
    await Promise.resolve();

    expect(shutdownSettled).toBe(false);
    resolveLongIntervalShutdown();
    await expect(shutdownPromise).rejects.toBe(shutdownError);

    expect(providerMocks.getNetworkInstance).toHaveBeenCalledOnce();
    expect(providerMocks.getLongIntervalInstance).toHaveBeenCalledOnce();
    expect(manager.networkStatsbeatMetrics).toBeUndefined();
    expect(manager.longIntervalStatsbeatMetrics).toBeUndefined();
  });

  it("routes Network Statsbeat counters through the active provider", () => {
    const manager = StatsbeatManager.getInstance();
    const error = new Error("network");
    manager.initialize(options);

    manager.countSuccess(10);
    manager.countFailure(20, 500);
    manager.countRetry(503);
    manager.countThrottle(429);
    manager.countException(error);
    manager.countReadFailure();
    manager.countWriteFailure();

    expect(providerMocks.network.countSuccess).toHaveBeenCalledWith(10);
    expect(providerMocks.network.countFailure).toHaveBeenCalledWith(20, 500);
    expect(providerMocks.network.countRetry).toHaveBeenCalledWith(503);
    expect(providerMocks.network.countThrottle).toHaveBeenCalledWith(429);
    expect(providerMocks.network.countException).toHaveBeenCalledWith(error);
    expect(providerMocks.network.countReadFailure).toHaveBeenCalledOnce();
    expect(providerMocks.network.countWriteFailure).toHaveBeenCalledOnce();
  });

  it("keeps global Statsbeat active when an exporter shuts down", async () => {
    const exporter = new AzureMonitorTraceExporter({
      connectionString: `InstrumentationKey=${options.instrumentationKey}`,
      disableOfflineStorage: true,
    });
    const manager = StatsbeatManager.getInstance();
    const networkMetrics = manager.networkStatsbeatMetrics;
    const longIntervalMetrics = manager.longIntervalStatsbeatMetrics;

    await exporter.shutdown();

    expect(manager.networkStatsbeatMetrics).toBe(networkMetrics);
    expect(manager.longIntervalStatsbeatMetrics).toBe(longIntervalMetrics);
    expect(providerMocks.network.shutdown).not.toHaveBeenCalled();
    expect(providerMocks.longInterval.shutdown).not.toHaveBeenCalled();
  });
});
