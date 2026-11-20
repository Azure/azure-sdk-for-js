// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assertCount, assertLogExpectation } from "../../utils/assert.js";
import { LogBasicScenario } from "../../utils/basic.js";
import { parseBreezeRequest, successfulBreezeResponse } from "../../utils/breezeTestUtils.js";
import type { TelemetryItem as Envelope } from "../../utils/models/index.js";
import { describe, expect, it, afterEach, vi } from "vitest";
import type { HttpClient, PipelineRequest } from "@azure/core-rest-pipeline";
import { AzureMonitorLogExporter } from "@azure/monitor-opentelemetry-exporter";
import { ROOT_CONTEXT, trace, TraceFlags } from "@opentelemetry/api";
import { BatchLogRecordProcessor, LoggerProvider } from "@opentelemetry/sdk-logs";
import { RandomIdGenerator, TracerProvider } from "@opentelemetry/sdk-trace";
import { AzureBatchLogRecordProcessor } from "../../../src/logs/batchLogRecordProcessor.js";
import { AzureMonitorSampleRate } from "../../../src/types.js";
import { EnvConfig } from "../../../src/shared/envConfig.js";
import { InternalConfig } from "../../../src/shared/config.js";
import { MetricHandler } from "../../../src/metrics/handler.js";
import { TraceHandler } from "../../../src/traces/handler.js";

function createExporter(sent: Envelope[]): AzureMonitorLogExporter {
  return new AzureMonitorLogExporter({
    connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000001",
    httpClient: {
      sendRequest(request) {
        const envelopes = parseBreezeRequest(request);
        sent.push(...envelopes);
        return Promise.resolve({
          request,
          headers: request.headers,
          status: 200,
          bodyAsText: JSON.stringify(successfulBreezeResponse(envelopes.length)),
        });
      },
    },
  });
}

/** TODO: Add winston-transport check functional test */
describe("Log Exporter Scenarios", () => {
  it("keeps the span sample rate local to the filtering processor even when log attributes are full", async () => {
    const filtered: Envelope[] = [];
    const unfiltered: Envelope[] = [];
    const loggerProvider = new LoggerProvider({
      logRecordLimits: { attributeCountLimit: 1 },
      processors: [
        new AzureBatchLogRecordProcessor(createExporter(filtered), {
          enableTraceBasedSamplingForLogs: true,
        }),
        new BatchLogRecordProcessor({ exporter: createExporter(unfiltered) }),
      ],
    });
    const tracerProvider = new TracerProvider();
    const span = tracerProvider.getTracer("test").startSpan("sampled");
    const logger = loggerProvider.getLogger("test");
    try {
      span.setAttribute(AzureMonitorSampleRate, 5);
      logger.emit({
        body: "sampled",
        attributes: { customer: "preserved" },
        context: trace.setSpan(ROOT_CONTEXT, span),
      });
      logger.emit({
        body: "unsampled",
        context: trace.setSpanContext(ROOT_CONTEXT, {
          traceId: "00000000000000000000000000000002",
          spanId: "0000000000000002",
          traceFlags: TraceFlags.NONE,
        }),
      });
      await loggerProvider.forceFlush();
      expect(filtered).toMatchObject([
        {
          sampleRate: 5,
          data: { baseData: { message: "sampled", properties: { customer: "preserved" } } },
        },
      ]);
      expect(unfiltered).toMatchObject([
        { sampleRate: 100, data: { baseData: { message: "sampled" } } },
        { sampleRate: 100, data: { baseData: { message: "unsampled" } } },
      ]);
    } finally {
      span.end();
      await Promise.all([loggerProvider.shutdown(), tracerProvider.shutdown()]);
    }
  });

  it("only weights parent-based logs when the trace was sampled by the local root sampler", async () => {
    vi.stubEnv("OTEL_TRACES_SAMPLER", "parentbased_trace_id_ratio");
    vi.stubEnv("OTEL_TRACES_SAMPLER_ARG", "0.05");
    const envConfig = vi.spyOn(EnvConfig, "getInstance").mockReturnValue(new EnvConfig());
    const config = new InternalConfig({
      enableTraceBasedSamplingForLogs: true,
      enableLiveMetrics: false,
      enableStandardMetrics: false,
      enablePerformanceCounters: false,
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000001",
      },
    });
    config.instrumentationOptions = {};
    const metrics = new MetricHandler(config);
    const handler = new TraceHandler(config, metrics);
    const idGenerator = new RandomIdGenerator();
    idGenerator.generateTraceId = () => "00000000000000000000000000000001";
    const tracerProvider = new TracerProvider({
      sampler: handler.getSampler(),
      spanProcessors: [handler.getAzureMonitorSpanProcessor()],
      idGenerator,
    });
    const sent: Envelope[] = [];
    const loggerProvider = new LoggerProvider({
      processors: [
        new AzureBatchLogRecordProcessor(createExporter(sent), {
          enableTraceBasedSamplingForLogs: true,
          fallbackSampleRate: handler.fallbackLogSampleRate,
        }),
      ],
    });
    try {
      const tracer = tracerProvider.getTracer("test");
      const logger = loggerProvider.getLogger("test");
      const remote = trace.setSpanContext(ROOT_CONTEXT, {
        traceId: "ffffffff000000000000000000000000",
        spanId: "0000000000000002",
        traceFlags: TraceFlags.SAMPLED,
        isRemote: true,
      });
      logger.emit({ context: remote });
      for (const parent of [remote, ROOT_CONTEXT]) {
        const span = tracer.startSpan("request", {}, parent);
        const ctx = trace.setSpan(parent, span);
        const child = tracer.startSpan("dependency", {}, ctx);
        logger.emit({ context: ctx });
        logger.emit({ context: trace.setSpan(ctx, child) });
        child.end();
        span.end();
      }
      await loggerProvider.forceFlush();
      expect(sent.map((item) => item.sampleRate)).toEqual([100, 100, 100, 5, 5]);
    } finally {
      envConfig.mockRestore();
      vi.unstubAllEnvs();
      await Promise.all([loggerProvider.shutdown(), tracerProvider.shutdown()]);
      await handler.shutdown();
      await metrics.shutdown();
    }
  });

  describe(LogBasicScenario.prototype.constructor.name, () => {
    const scenario = new LogBasicScenario();
    let ingest: Envelope[] = [];

    afterEach(() => {
      scenario.cleanup();
      ingest = [];
    });

    it("should work", async () => {
      const azMonHttpClient: HttpClient = {
        sendRequest: vi.fn().mockImplementation((request: PipelineRequest) => {
          if (request.url !== "https://dc.services.visualstudio.com/v2.1/track") {
            throw new Error(`unexpected request to url ${request.url}`);
          }
          const envelope = parseBreezeRequest(request);
          ingest.push(...envelope);
          return Promise.resolve({
            headers: request.headers,
            request,
            status: 200,
            bodyAsText: JSON.stringify(successfulBreezeResponse(1)),
          });
        }),
      };

      scenario.prepare(azMonHttpClient);
      await scenario.run();
      await scenario.flush();
      assertLogExpectation(ingest, scenario.expectation);
      assertCount(ingest, scenario.expectation);
    });
  });
});
