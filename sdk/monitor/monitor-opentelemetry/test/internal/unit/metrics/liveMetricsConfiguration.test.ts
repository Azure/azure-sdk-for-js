// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { MockInstance } from "vitest";
import { SpanKind, trace } from "@opentelemetry/api";
import { logs } from "@opentelemetry/api-logs";
import {
  AzureMonitorLogExporter,
  AzureMonitorTraceExporter,
} from "@azure/monitor-opentelemetry-exporter";
import { ExportResultCode } from "@opentelemetry/core";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { MeterProvider } from "@opentelemetry/sdk-metrics";
import {
  BasicTracerProvider,
  InMemorySpanExporter,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-base";
import { LiveMetrics } from "../../../../src/metrics/quickpulse/liveMetrics.js";
import { MetricHandler } from "../../../../src/metrics/handler.js";
import { InternalConfig } from "../../../../src/shared/config.js";
import { useAzureMonitor, shutdownAzureMonitor } from "../../../../src/index.js";
import { createMockSdkLogRecord } from "../../../utils/breezeTestUtils.js";
import type {
  QuickpulseResponse,
  QuickpulseSender,
} from "../../../../src/metrics/quickpulse/export/sender.js";

type FeatureCallback = (enabled: boolean) => void | Promise<void>;
const configuration = vi.hoisted(() => ({
  register: vi.fn<(featureKey: string, callback: FeatureCallback) => () => void>(),
  unregister: vi.fn<() => void>(),
}));

vi.mock("@azure/monitor-opentelemetry-exporter/_configuration", () => ({
  _registerFeatureCallback: configuration.register,
}));

describe("OneSettings Live Metrics", () => {
  let liveMetrics: LiveMetrics | undefined;
  let ping: MockInstance<QuickpulseSender["isSubscribed"]>;
  let publish: MockInstance<QuickpulseSender["publish"]>;
  const subscribed: QuickpulseResponse = {
    xMsQpsSubscribed: "true",
    metrics: [],
    documentStreams: [],
  };
  const options = {
    azureMonitorExporterOptions: {
      connectionString: "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",
      disableOfflineStorage: true,
    },
    enableStandardMetrics: false,
    enablePerformanceCounters: false,
    instrumentationOptions: {
      http: { enabled: false },
      azureSdk: { enabled: false },
      mongoDb: { enabled: false },
      mySql: { enabled: false },
      postgreSql: { enabled: false },
      redis: { enabled: false },
      redis4: { enabled: false },
    },
  };

  beforeEach(() => {
    vi.useFakeTimers({
      toFake: ["Date", "setTimeout", "clearTimeout", "setInterval", "clearInterval"],
    });
    configuration.register.mockReset().mockReturnValue(configuration.unregister);
    configuration.unregister.mockReset();
  });

  afterEach(async () => {
    await liveMetrics?.shutdown();
    liveMetrics = undefined;
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  function createLiveMetrics(): LiveMetrics {
    liveMetrics = new LiveMetrics(new InternalConfig(options));
    ping = vi.spyOn(liveMetrics["pingSender"], "isSubscribed").mockResolvedValue(subscribed);
    publish = vi
      .spyOn(liveMetrics["quickpulseExporter"].getSender(), "publish")
      .mockResolvedValue(subscribed);
    return liveMetrics;
  }

  function callback(): FeatureCallback {
    return configuration.register.mock.calls[0][1];
  }

  async function startCollecting(): Promise<LiveMetrics> {
    const collector = createLiveMetrics();
    await vi.advanceTimersByTimeAsync(6000);
    expect(collector.getMeterProvider()).toBeDefined();
    return collector;
  }

  it("preserves default five-second polling and one-second collection", async () => {
    createLiveMetrics();
    expect(configuration.register).toHaveBeenCalledWith(
      "FEATURE_LIVE_METRICS",
      expect.any(Function),
    );
    await vi.advanceTimersByTimeAsync(4999);
    expect(ping).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1);
    expect(ping).toHaveBeenCalledOnce();
    await vi.advanceTimersByTimeAsync(3000);
    expect(publish).toHaveBeenCalledTimes(3);
  });

  it("applies cached disablement before scheduling the first ping", async () => {
    configuration.register.mockImplementationOnce((_, registered) => {
      void registered(false);
      return configuration.unregister;
    });
    const collector = createLiveMetrics();
    await vi.advanceTimersByTimeAsync(65000);
    expect(ping).not.toHaveBeenCalled();
    expect(publish).not.toHaveBeenCalled();
    expect(collector.getMeterProvider()).toBeUndefined();
    await callback()(true);
    await vi.advanceTimersByTimeAsync(6000);
    expect(ping).toHaveBeenCalledOnce();
    expect(publish).toHaveBeenCalledOnce();
  });

  it("stops polling, collection, and the shutdown flush", async () => {
    const collector = await startCollecting();
    const pingSignal = ping.mock.calls[0][0].abortSignal;
    const postSignal = publish.mock.calls[0][0].abortSignal;
    publish.mockClear();
    await callback()(false);
    expect(pingSignal?.aborted).toBe(true);
    expect(postSignal?.aborted).toBe(true);
    expect(collector.getMeterProvider()).toBeUndefined();
    await vi.advanceTimersByTimeAsync(120000);
    expect(ping).toHaveBeenCalledOnce();
    expect(publish).not.toHaveBeenCalled();
    expect(collector["documents"]).toEqual([]);
  });

  it("does not collect spans or logs while disabled", async () => {
    const collector = await startCollecting();
    await callback()(false);
    const exporter = new InMemorySpanExporter();
    const provider = new BasicTracerProvider({
      spanProcessors: [new SimpleSpanProcessor(exporter)],
    });
    try {
      const span = provider
        .getTracer("test")
        .startSpan("disabled-request", { kind: SpanKind.SERVER });
      span.end();
      await vi.advanceTimersByTimeAsync(0);
      await provider.forceFlush();
      collector.recordSpan(exporter.getFinishedSpans()[0]);
      collector.recordLog(createMockSdkLogRecord(undefined, undefined, { body: "disabled-log" }));
      expect(collector["totalRequestCount"]).toBe(0);
      expect(collector.getDocuments()).toEqual([]);
    } finally {
      await provider.shutdown();
    }
  });

  it("re-enables with a fresh reader, configuration fetch, and normal intervals", async () => {
    const collector = await startCollecting();
    const originalProvider = collector.getMeterProvider();
    collector["etag"] = "old-configuration";
    collector["postInterval"] = 60000;
    await callback()(false);
    await callback()(true);
    await vi.advanceTimersByTimeAsync(6000);
    expect(collector.getMeterProvider()).toBeDefined();
    expect(collector.getMeterProvider()).not.toBe(originalProvider);
    expect(ping.mock.calls[1][0].configurationEtag).toBe("");
    expect(ping.mock.calls[1][0].abortSignal?.aborted).toBe(false);
    expect(publish.mock.calls[1][0].abortSignal?.aborted).toBe(false);
    publish.mockClear();
    await vi.advanceTimersByTimeAsync(3000);
    expect(publish).toHaveBeenCalledTimes(3);
  });

  it("does not restart on repeated identical settings", async () => {
    const collector = await startCollecting();
    const provider = collector.getMeterProvider();
    const deactivate = vi.spyOn(collector, "deactivateMetrics");
    await callback()(true);
    expect(collector.getMeterProvider()).toBe(provider);
    expect(deactivate).not.toHaveBeenCalled();
    await callback()(false);
    await callback()(false);
    expect(deactivate).toHaveBeenCalledOnce();
  });

  it("serializes rapid toggles while a shutdown is pending", async () => {
    const collector = await startCollecting();
    let finishShutdown!: () => void;
    const pendingShutdown = new Promise<void>((resolve) => {
      finishShutdown = resolve;
    });
    const deactivate = collector.deactivateMetrics.bind(collector);
    const shutdown = vi.spyOn(collector, "deactivateMetrics").mockImplementationOnce(async () => {
      await pendingShutdown;
      await deactivate();
    });
    const stop = callback()(false);
    const restart = callback()(true);
    const stopAgain = callback()(false);
    await vi.advanceTimersByTimeAsync(6000);
    expect(publish).toHaveBeenCalledOnce();
    finishShutdown();
    await Promise.all([stop, restart, stopAgain]);
    expect(shutdown).toHaveBeenCalledTimes(2);
    expect(collector.getMeterProvider()).toBeUndefined();
    await vi.advanceTimersByTimeAsync(6000);
    expect(ping).toHaveBeenCalledOnce();
  });

  it("recovers after a rejected shutdown transition", async () => {
    const collector = await startCollecting();
    const deactivate = collector.deactivateMetrics.bind(collector);
    vi.spyOn(collector, "deactivateMetrics").mockImplementationOnce(async () => {
      await deactivate();
      throw new Error("Shutdown failed");
    });
    await expect(callback()(false)).rejects.toThrow("Shutdown failed");
    await callback()(true);
    await vi.advanceTimersByTimeAsync(6000);
    expect(collector.getMeterProvider()).toBeDefined();
    expect(ping).toHaveBeenCalledTimes(2);
  });

  it("does not resume polling until an in-progress shutdown completes", async () => {
    const collector = await startCollecting();
    let finishShutdown!: () => void;
    const pendingShutdown = new Promise<void>((resolve) => {
      finishShutdown = resolve;
    });
    const deactivate = collector.deactivateMetrics.bind(collector);
    vi.spyOn(collector, "deactivateMetrics").mockImplementationOnce(async () => {
      await pendingShutdown;
      await deactivate();
    });
    const stop = callback()(false);
    const restart = callback()(true);
    await vi.advanceTimersByTimeAsync(65000);
    expect(ping).toHaveBeenCalledOnce();
    expect(publish).toHaveBeenCalledOnce();
    finishShutdown();
    await Promise.all([stop, restart]);
    await vi.advanceTimersByTimeAsync(6000);
    expect(ping).toHaveBeenCalledTimes(2);
    expect(publish).toHaveBeenCalledTimes(2);
  });

  it("ignores an old ping response after disablement and re-enablement", async () => {
    const collector = createLiveMetrics();
    let finishPing!: (response: QuickpulseResponse) => void;
    ping.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          finishPing = resolve;
        }),
    );
    await vi.advanceTimersByTimeAsync(5000);
    expect(ping).toHaveBeenCalledOnce();
    await callback()(false);
    await callback()(true);
    await vi.advanceTimersByTimeAsync(6000);
    const provider = collector.getMeterProvider();
    finishPing({ xMsQpsSubscribed: "false" });
    await vi.advanceTimersByTimeAsync(0);
    expect(collector.getMeterProvider()).toBe(provider);
    expect(collector["isCollectingData"]).toBe(true);
  });

  it("ignores an old post response after disablement and re-enablement", async () => {
    const collector = await startCollecting();
    let finishPost!: (response: QuickpulseResponse) => void;
    publish.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          finishPost = resolve;
        }),
    );
    // A direct export can outlive the reader that is being shut down.
    const result = vi.fn();
    const pendingExport = collector["quickpulseExporter"].export(
      {
        resource: resourceFromAttributes({}),
        scopeMetrics: [],
      },
      result,
    );
    await callback()(false);
    await callback()(true);
    await vi.advanceTimersByTimeAsync(6000);
    const provider = collector.getMeterProvider();
    finishPost({ xMsQpsSubscribed: "false" });
    await pendingExport;
    expect(result).toHaveBeenCalledExactlyOnceWith({ code: ExportResultCode.SUCCESS });
    expect(collector.getMeterProvider()).toBe(provider);
    expect(collector.getMeterProvider()).toBeDefined();
    expect(collector["isCollectingData"]).toBe(true);
    expect(ping).toHaveBeenCalledTimes(2);
  });

  it("unregisters on shutdown and cannot be re-enabled by a late callback", async () => {
    const collector = await startCollecting();
    await collector.shutdown();
    expect(configuration.unregister).toHaveBeenCalledOnce();
    const postCount = publish.mock.calls.length;
    await callback()(true);
    await vi.advanceTimersByTimeAsync(65000);
    expect(ping).toHaveBeenCalledOnce();
    expect(publish).toHaveBeenCalledTimes(postCount);
    expect(collector.getMeterProvider()).toBeUndefined();
  });

  it("preserves the local enableLiveMetrics opt-out", async () => {
    const handler = new MetricHandler(new InternalConfig({ ...options, enableLiveMetrics: false }));
    const provider = new MeterProvider({ readers: [handler.getMetricReader()] });
    try {
      expect(configuration.register).not.toHaveBeenCalled();
      expect(handler["_liveMetrics"]).toBeUndefined();
      await vi.advanceTimersByTimeAsync(6000);
    } finally {
      await handler.shutdown();
      await provider.shutdown();
    }
  });

  it("keeps custom metric export running when Live Metrics is disabled", async () => {
    const handler = new MetricHandler(new InternalConfig(options));
    const provider = new MeterProvider({ readers: [handler.getMetricReader()] });
    const exported = vi
      .spyOn(handler["_azureExporter"], "export")
      .mockImplementation((_, result) => {
        result({ code: ExportResultCode.SUCCESS });
        return Promise.resolve();
      });
    try {
      await callback()(false);
      provider.getMeter("test").createCounter("custom-counter").add(3);
      await provider.forceFlush();
      expect(exported).toHaveBeenCalledOnce();
      expect(exported.mock.calls[0][0].scopeMetrics[0].metrics[0]).toMatchObject({
        descriptor: { name: "custom-counter" },
        dataPoints: [{ value: 3 }],
      });
      expect(handler["_liveMetrics"]?.getMeterProvider()).toBeUndefined();
    } finally {
      await handler.shutdown();
      await provider.shutdown();
    }
  });

  it("unregisters the previous collector on distro reinitialization and the current one on shutdown", async () => {
    try {
      useAzureMonitor(options);
      expect(configuration.register).toHaveBeenCalledOnce();
      useAzureMonitor({ ...options, enableLiveMetrics: false });
      expect(configuration.unregister).toHaveBeenCalledOnce();
      expect(configuration.register).toHaveBeenCalledOnce();
      useAzureMonitor(options);
      expect(configuration.register).toHaveBeenCalledTimes(2);
      await shutdownAzureMonitor();
      expect(configuration.unregister).toHaveBeenCalledTimes(2);
    } finally {
      await shutdownAzureMonitor();
    }
  });

  it("continues exporting ordinary traces and logs after remote disablement", async () => {
    const traceExport = vi
      .spyOn(AzureMonitorTraceExporter.prototype, "export")
      .mockImplementation((_, result) => {
        result({ code: ExportResultCode.SUCCESS });
        return Promise.resolve();
      });
    const logExport = vi
      .spyOn(AzureMonitorLogExporter.prototype, "export")
      .mockImplementation((_, result) => {
        result({ code: ExportResultCode.SUCCESS });
        return Promise.resolve();
      });
    try {
      useAzureMonitor({ ...options, tracesPerSecond: 0, samplingRatio: 1 });
      await callback()(false);
      trace.getTracer("test").startSpan("ordinary-span").end();
      logs.getLogger("test").emit({ body: "ordinary-log" });
      await vi.advanceTimersByTimeAsync(0);
      await shutdownAzureMonitor();
      expect(traceExport.mock.calls.flatMap(([spans]) => spans.map((span) => span.name))).toContain(
        "ordinary-span",
      );
      expect(
        logExport.mock.calls.flatMap(([records]) => records.map((record) => record.body)),
      ).toContain("ordinary-log");
    } finally {
      await shutdownAzureMonitor();
    }
  });
});
