// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assertCount, assertLogExpectation } from "../../utils/assert.js";
import { LogBasicScenario } from "../../utils/basic.js";
import { parseBreezeRequest, successfulBreezeResponse } from "../../utils/breezeTestUtils.js";
import type { TelemetryItem as Envelope } from "../../utils/models/index.js";
import { describe, expect, it, afterEach, vi } from "vitest";
import type { HttpClient, PipelineRequest } from "@azure/core-rest-pipeline";
import { AzureMonitorLogExporter } from "@azure/monitor-opentelemetry-exporter";
import { ROOT_CONTEXT, trace } from "@opentelemetry/api";
import { LoggerProvider } from "@opentelemetry/sdk-logs";
import { TracerProvider } from "@opentelemetry/sdk-trace";
import { AzureBatchLogRecordProcessor } from "../../../src/logs/batchLogRecordProcessor.js";
import { AzureMonitorSampleRate } from "../../../src/types.js";

/** TODO: Add winston-transport check functional test */
describe("Log Exporter Scenarios", () => {
  it("exports the span sample rate even when all log attribute slots are used", async () => {
    const sent: Envelope[] = [];
    const exporter = new AzureMonitorLogExporter({
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
    const loggerProvider = new LoggerProvider({
      logRecordLimits: { attributeCountLimit: 1 },
      processors: [
        new AzureBatchLogRecordProcessor(exporter, { enableTraceBasedSamplingForLogs: true }),
      ],
    });
    const tracerProvider = new TracerProvider();
    const span = tracerProvider.getTracer("test").startSpan("sampled");
    try {
      span.setAttribute(AzureMonitorSampleRate, 5);
      loggerProvider.getLogger("test").emit({
        body: "full log",
        attributes: { customer: "preserved" },
        context: trace.setSpan(ROOT_CONTEXT, span),
      });
      await loggerProvider.forceFlush();
      expect(sent).toHaveLength(1);
      expect(sent[0]).toMatchObject({
        sampleRate: 5,
        data: { baseData: { properties: { customer: "preserved" } } },
      });
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
