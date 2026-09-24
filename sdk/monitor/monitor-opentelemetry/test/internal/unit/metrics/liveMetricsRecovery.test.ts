// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { MockInstance } from "vitest";
import { LiveMetrics } from "../../../../src/metrics/quickpulse/liveMetrics.js";
import { InternalConfig } from "../../../../src/shared/index.js";
import type {
  QuickpulseResponse,
  QuickpulseSender,
} from "../../../../src/metrics/quickpulse/export/sender.js";

describe("Live Metrics recovery", () => {
  let liveMetrics: LiveMetrics;
  let publish: MockInstance<QuickpulseSender["publish"]>;
  let ping: MockInstance<QuickpulseSender["isSubscribed"]>;
  const subscribed: QuickpulseResponse = {
    xMsQpsSubscribed: "true",
    eTag: "configuration-1",
    metrics: [],
    documentStreams: [],
  };

  beforeEach(() => {
    vi.useFakeTimers({
      toFake: ["Date", "setTimeout", "clearTimeout", "setInterval", "clearInterval"],
    });
    const config = new InternalConfig({
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333;",
      },
    });
    liveMetrics = new LiveMetrics(config);
    ping = vi.spyOn(liveMetrics["pingSender"], "isSubscribed").mockResolvedValue(subscribed);
    publish = vi
      .spyOn(liveMetrics["quickpulseExporter"].getSender(), "publish")
      .mockResolvedValue(subscribed);
  });

  afterEach(async () => {
    await liveMetrics.shutdown();
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  async function startCollecting(): Promise<void> {
    await vi.advanceTimersByTimeAsync(6000);
    expect(liveMetrics.getMeterProvider()).toBeDefined();
  }

  it("keeps one-second posts after a delayed event loop when the request succeeds", async () => {
    await startCollecting();
    const provider = liveMetrics.getMeterProvider();
    vi.setSystemTime(Date.now() + 25000);
    publish.mockClear();
    await vi.advanceTimersByTimeAsync(5000);
    expect(publish).toHaveBeenCalledTimes(5);
    expect(liveMetrics.getMeterProvider()).toBe(provider);
  });

  it("does not back off for a transient failure below the post timeout", async () => {
    await startCollecting();
    const provider = liveMetrics.getMeterProvider();
    publish.mockResolvedValueOnce(undefined);
    await vi.advanceTimersByTimeAsync(2000);
    expect(liveMetrics.getMeterProvider()).toBe(provider);
    expect(liveMetrics["postInterval"]).toBe(1000);
  });

  it("backs off without looping and restores the actual one-second reader after recovery", async () => {
    await startCollecting();
    publish.mockResolvedValue(undefined);
    await vi.advanceTimersByTimeAsync(20000);
    expect(liveMetrics["postInterval"]).toBe(60000);
    publish.mockClear();
    await vi.advanceTimersByTimeAsync(59999);
    expect(publish).not.toHaveBeenCalled();
    publish.mockResolvedValue(subscribed);
    await vi.advanceTimersByTimeAsync(1);
    expect(liveMetrics["postInterval"]).toBe(1000);
    publish.mockClear();
    await vi.advanceTimersByTimeAsync(5000);
    expect(publish).toHaveBeenCalledTimes(5);
  });

  it("does not repeatedly tear down the reader throughout a sustained outage", async () => {
    await startCollecting();
    const deactivate = vi.spyOn(liveMetrics, "deactivateMetrics");
    publish.mockResolvedValue(undefined);
    await vi.advanceTimersByTimeAsync(20000);
    expect(deactivate).toHaveBeenCalledTimes(1);
    publish.mockClear();
    await vi.advanceTimersByTimeAsync(180000);
    expect(deactivate).toHaveBeenCalledTimes(1);
    expect(publish).toHaveBeenCalledTimes(3);
  });

  it("retains collection configuration through backoff and recovery", async () => {
    await startCollecting();
    liveMetrics["validDerivedMetrics"].set("Request", []);
    liveMetrics["etag"] = "configuration-1";
    publish.mockResolvedValue(undefined);
    await vi.advanceTimersByTimeAsync(20000);
    expect(liveMetrics["validDerivedMetrics"].has("Request")).toBe(true);
    publish.mockResolvedValue(subscribed);
    await vi.advanceTimersByTimeAsync(60000);
    expect(liveMetrics["validDerivedMetrics"].has("Request")).toBe(true);
    expect(liveMetrics["etag"]).toBe("configuration-1");
  });

  it("does not restart when a successful shutdown flush says still subscribed", async () => {
    await startCollecting();
    await liveMetrics.shutdown();
    publish.mockClear();
    await vi.advanceTimersByTimeAsync(120000);
    expect(liveMetrics.getMeterProvider()).toBeUndefined();
    expect(liveMetrics["isCollectingData"]).toBe(false);
    expect(publish).not.toHaveBeenCalled();
  });

  it("does not restart after shutdown races with an in-flight ping", async () => {
    let completePing!: (response: QuickpulseResponse) => void;
    ping.mockReturnValue(
      new Promise((resolve) => {
        completePing = resolve;
      }),
    );
    await vi.advanceTimersByTimeAsync(5000);
    await liveMetrics.shutdown();
    completePing(subscribed);
    await vi.advanceTimersByTimeAsync(120000);
    expect(liveMetrics.getMeterProvider()).toBeUndefined();
    expect(liveMetrics["isCollectingData"]).toBe(false);
  });

  it("does not discard configuration when a successful response has only headers", async () => {
    await startCollecting();
    liveMetrics["validDerivedMetrics"].set("Request", []);
    liveMetrics["etag"] = "configuration-1";
    await liveMetrics["quickPulseDone"]({
      xMsQpsSubscribed: "true",
      xMsQpsConfigurationEtag: "configuration-2",
    });
    expect(liveMetrics["etag"]).toBe("configuration-1");
    expect(liveMetrics["validDerivedMetrics"].has("Request")).toBe(true);
  });

  it("recovers when the failure fallback's final flush succeeds", async () => {
    await startCollecting();
    liveMetrics["lastSuccessTime"] = Date.now() - 20000;
    publish.mockResolvedValueOnce(undefined);
    await vi.advanceTimersByTimeAsync(1000);
    expect(liveMetrics["postInterval"]).toBe(1000);
    publish.mockClear();
    await vi.advanceTimersByTimeAsync(5000);
    expect(publish).toHaveBeenCalledTimes(5);
  });

  it("coalesces overlapping recovery responses into one reader restart", async () => {
    await startCollecting();
    publish.mockResolvedValue(undefined);
    await vi.advanceTimersByTimeAsync(20000);
    publish.mockResolvedValue(subscribed);
    const activate = vi.spyOn(liveMetrics, "activateMetrics");
    await Promise.all([
      liveMetrics["quickPulseDone"](subscribed),
      liveMetrics["quickPulseDone"](subscribed),
    ]);
    expect(activate).toHaveBeenCalledTimes(1);
    publish.mockClear();
    await vi.advanceTimersByTimeAsync(5000);
    expect(publish).toHaveBeenCalledTimes(5);
  });

  it("joins an in-flight recovery shutdown without restarting collection", async () => {
    await startCollecting();
    liveMetrics["lastSuccessTime"] = Date.now() - 20000;
    let resolveFlush!: (response: QuickpulseResponse) => void;
    publish.mockReturnValueOnce(
      new Promise((resolve) => {
        resolveFlush = resolve;
      }),
    );
    const provider = liveMetrics.getMeterProvider()!;
    const shutdown = vi.spyOn(provider, "shutdown");
    const fallback = liveMetrics["quickPulseDone"](undefined);
    await vi.advanceTimersByTimeAsync(0);
    const stopping = liveMetrics.shutdown();
    resolveFlush(subscribed);
    await Promise.all([fallback, stopping]);
    expect(shutdown).toHaveBeenCalledTimes(1);
    expect(liveMetrics.getMeterProvider()).toBeUndefined();
    expect(liveMetrics["isCollectingData"]).toBe(false);
    publish.mockClear();
    await vi.advanceTimersByTimeAsync(120000);
    expect(publish).not.toHaveBeenCalled();
  });

  it("resumes a single ping timer with the service hint when unsubscribed during fallback", async () => {
    await startCollecting();
    publish.mockResolvedValue(undefined);
    await vi.advanceTimersByTimeAsync(20000);
    const unsubscribed = {
      xMsQpsSubscribed: "false",
      xMsQpsServicePollingIntervalHint: "10000",
    };
    publish.mockResolvedValue(unsubscribed);
    ping.mockResolvedValue(unsubscribed);
    ping.mockClear();
    await vi.advanceTimersByTimeAsync(60000);
    expect(liveMetrics.getMeterProvider()).toBeUndefined();
    await vi.advanceTimersByTimeAsync(9999);
    expect(ping).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1);
    expect(ping).toHaveBeenCalledTimes(1);
    ping.mockResolvedValue(subscribed);
    publish.mockResolvedValue(subscribed);
    await vi.advanceTimersByTimeAsync(11000);
    expect(liveMetrics.getMeterProvider()).toBeDefined();
    expect(liveMetrics["postInterval"]).toBe(1000);
  });

  it("cancels the initial ping timer on shutdown", async () => {
    await liveMetrics.shutdown();
    await vi.advanceTimersByTimeAsync(120000);
    expect(ping).not.toHaveBeenCalled();
  });

  it("resumes collection if the final unsubscribe flush reports a new subscription", async () => {
    await startCollecting();
    const provider = liveMetrics.getMeterProvider();
    publish.mockResolvedValueOnce({ xMsQpsSubscribed: "false" });
    await vi.advanceTimersByTimeAsync(1000);
    expect(liveMetrics["isCollectingData"]).toBe(true);
    expect(liveMetrics.getMeterProvider()).toBeDefined();
    expect(liveMetrics.getMeterProvider()).not.toBe(provider);
    publish.mockClear();
    await vi.advanceTimersByTimeAsync(5000);
    expect(publish).toHaveBeenCalledTimes(5);
  });
});
