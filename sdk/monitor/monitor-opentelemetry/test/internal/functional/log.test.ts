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
import { TracerProvider } from "@opentelemetry/sdk-trace";
import { AzureBatchLogRecordProcessor } from "../../../src/logs/batchLogRecordProcessor.js";
import { AzureMonitorSampleRate } from "../../../src/types.js";

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
