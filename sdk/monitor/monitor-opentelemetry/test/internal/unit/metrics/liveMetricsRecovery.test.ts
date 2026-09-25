// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { MockInstance } from "vitest";
import { SpanKind } from "@opentelemetry/api";
import {
  BasicTracerProvider,
  InMemorySpanExporter,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-base";
import { LiveMetrics } from "../../../../src/metrics/quickpulse/liveMetrics.js";
import { InternalConfig } from "../../../../src/shared/index.js";
import type { FilterConjunctionGroupInfo } from "../../../../src/generated/index.js";
import { createMockSdkLogRecord } from "../../../utils/breezeTestUtils.js";
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

  async function recordTelemetry(name: string): Promise<void> {
    const exporter = new InMemorySpanExporter();
    const provider = new BasicTracerProvider({
      spanProcessors: [new SimpleSpanProcessor(exporter)],
    });
    try {
      provider.getTracer("test").startSpan(name, { kind: SpanKind.SERVER }).end();
      await vi.advanceTimersByTimeAsync(0);
      await provider.forceFlush();
      liveMetrics.recordSpan(exporter.getFinishedSpans()[0]);
      liveMetrics.recordLog(createMockSdkLogRecord(undefined, undefined, { body: name }));
    } finally {
      await provider.shutdown();
    }
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

  it("preserves telemetry arriving during a pending recovery request and its shutdown flush", async () => {
    await startCollecting();
    publish.mockResolvedValue(undefined);
    await vi.advanceTimersByTimeAsync(20000);
    expect(liveMetrics["postInterval"]).toBe(60000);
    const provider = liveMetrics.getMeterProvider();

    let completeRecovery!: (response: QuickpulseResponse) => void;
    let completeFlush!: (response: QuickpulseResponse) => void;
    const recovery = new Promise<QuickpulseResponse>((resolve) => {
      completeRecovery = resolve;
    });
    const flush = new Promise<QuickpulseResponse>((resolve) => {
      completeFlush = resolve;
    });
    publish
      .mockClear()
      .mockResolvedValue(subscribed)
      .mockReturnValueOnce(recovery)
      .mockReturnValueOnce(flush);

    try {
      await vi.advanceTimersByTimeAsync(60000);
      expect(publish).toHaveBeenCalledTimes(1);
      await recordTelemetry("during-recovery");
      completeRecovery(subscribed);
      await vi.advanceTimersByTimeAsync(0);
      expect(publish).toHaveBeenCalledTimes(2);
      expect(liveMetrics["isDeactivating"]).toBe(true);
      const flushedDocuments = publish.mock.calls[1][0].monitoringDataPoints?.[0].documents;

      await recordTelemetry("during-flush");
      completeFlush(subscribed);
      await vi.advanceTimersByTimeAsync(0);
      expect(liveMetrics.getMeterProvider()).toBeDefined();
      expect(liveMetrics.getMeterProvider()).not.toBe(provider);
      expect(flushedDocuments).toMatchObject([
        { documentType: "Request", name: "during-recovery" },
        { documentType: "Trace", message: "during-recovery" },
      ]);

      await vi.advanceTimersByTimeAsync(1000);
      expect(publish).toHaveBeenCalledTimes(3);
      expect(publish.mock.calls[2][0].monitoringDataPoints?.[0].documents).toMatchObject([
        { documentType: "Request", name: "during-flush" },
        { documentType: "Trace", message: "during-flush" },
      ]);
      await vi.advanceTimersByTimeAsync(1000);
      expect(publish).toHaveBeenCalledTimes(4);
      expect(publish.mock.calls[3][0].monitoringDataPoints?.[0].documents).toEqual([]);
    } finally {
      completeRecovery(subscribed);
      completeFlush(subscribed);
    }
  });

  it.each(["unsubscribe", "shutdown"])("still clears buffered telemetry on %s", async (action) => {
    await startCollecting();
    await recordTelemetry("before-stop");
    expect(liveMetrics["documents"]).toHaveLength(2);
    publish.mockClear();
    if (action === "unsubscribe") {
      const unsubscribed = { xMsQpsSubscribed: "false" };
      publish.mockResolvedValue(unsubscribed);
      await liveMetrics["quickPulseDone"](unsubscribed);
    } else {
      await liveMetrics.shutdown();
    }
    expect(liveMetrics.getMeterProvider()).toBeUndefined();
    expect(liveMetrics["documents"]).toEqual([]);
    expect(publish).toHaveBeenCalledTimes(1);
    expect(publish.mock.calls[0][0].monitoringDataPoints?.[0].documents).toEqual([]);
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

  it("resumes default polling before applying the next ping's service hint", async () => {
    await startCollecting();
    publish.mockResolvedValue(undefined);
    await vi.advanceTimersByTimeAsync(20000);
    const unsubscribedPost = { xMsQpsSubscribed: "false" };
    const unsubscribedPing = {
      ...unsubscribedPost,
      xMsQpsServicePollingIntervalHint: "10000",
    };
    publish.mockResolvedValue(unsubscribedPost);
    ping.mockResolvedValue(unsubscribedPing);
    ping.mockClear();
    await vi.advanceTimersByTimeAsync(60000);
    expect(liveMetrics.getMeterProvider()).toBeUndefined();
    await vi.advanceTimersByTimeAsync(4999);
    expect(ping).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1);
    expect(ping).toHaveBeenCalledTimes(1);
    await vi.advanceTimersByTimeAsync(9999);
    expect(ping).toHaveBeenCalledTimes(1);
    await vi.advanceTimersByTimeAsync(1);
    expect(ping).toHaveBeenCalledTimes(2);
    ping.mockResolvedValue(subscribed);
    publish.mockResolvedValue(subscribed);
    await vi.advanceTimersByTimeAsync(11000);
    expect(ping).toHaveBeenCalledTimes(3);
    expect(liveMetrics.getMeterProvider()).toBeDefined();
    expect(liveMetrics["postInterval"]).toBe(1000);
  });

  it("cancels the initial ping timer on shutdown", async () => {
    await liveMetrics.shutdown();
    await vi.advanceTimersByTimeAsync(120000);
    expect(ping).not.toHaveBeenCalled();
  });

  it.each([1000, 60000])(
    "restores filtering configuration when the unsubscribe flush resubscribes at a %i ms interval",
    async (interval) => {
      const filters: FilterConjunctionGroupInfo = {
        filters: [{ fieldName: "ResponseCode", predicate: "Equal", comparand: "200" }],
      };
      const configuration: QuickpulseResponse = {
        ...subscribed,
        xMsQpsConfigurationEtag: "configuration-1",
        metrics: [
          {
            id: "successful-requests",
            telemetryType: "Request",
            filterGroups: [filters],
            projection: "Count()",
            aggregation: "Sum",
            backEndAggregation: "Sum",
          },
        ],
        documentStreams: [
          {
            id: "successful-request-documents",
            documentFilterGroups: [{ telemetryType: "Request", filters }],
          },
        ],
      };
      let failPosts = false;
      ping.mockResolvedValue(configuration);
      publish.mockImplementation(({ configurationEtag }) => {
        if (failPosts) {
          return Promise.resolve(undefined);
        }
        // The service omits unchanged configuration unless the request clears its ETag.
        return Promise.resolve(
          configurationEtag === configuration.eTag
            ? {
                xMsQpsSubscribed: "true",
                xMsQpsConfigurationEtag: configuration.eTag,
              }
            : configuration,
        );
      });
      await startCollecting();
      expect(liveMetrics["validDerivedMetrics"].get("Request")).toEqual(configuration.metrics);
      expect(publish).toHaveBeenLastCalledWith(
        expect.objectContaining({ configurationEtag: "configuration-1" }),
      );
      if (interval === 60000) {
        failPosts = true;
        await vi.advanceTimersByTimeAsync(20000);
        failPosts = false;
      }
      expect(liveMetrics["postInterval"]).toBe(interval);
      const provider = liveMetrics.getMeterProvider();
      publish.mockClear();
      publish.mockResolvedValueOnce({ xMsQpsSubscribed: "false" });
      await vi.advanceTimersByTimeAsync(interval);

      expect(publish).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({ configurationEtag: "configuration-1" }),
      );
      expect(publish).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({ configurationEtag: "" }),
      );
      expect(liveMetrics["isCollectingData"]).toBe(true);
      expect(liveMetrics.getMeterProvider()).toBeDefined();
      expect(liveMetrics.getMeterProvider()).not.toBe(provider);
      expect(liveMetrics["validDerivedMetrics"].get("Request")).toEqual(configuration.metrics);
      expect(
        liveMetrics["validDocumentFilterConjuctionGroupInfos"]
          .get("Request")
          ?.get("successful-request-documents"),
      ).toEqual([filters]);
      expect(liveMetrics["etag"]).toBe("configuration-1");
      expect(liveMetrics["quickpulseExporter"]["etag"]).toBe("configuration-1");
      expect(liveMetrics.getErrors()).toEqual([]);
      publish.mockClear();
      await vi.advanceTimersByTimeAsync(5000);
      expect(publish).toHaveBeenCalledTimes(5);
      expect(publish).toHaveBeenLastCalledWith(
        expect.objectContaining({ configurationEtag: "configuration-1" }),
      );
    },
  );
});
