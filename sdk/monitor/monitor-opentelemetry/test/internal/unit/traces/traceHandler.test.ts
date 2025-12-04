// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TraceHandler } from "../../../../src/traces/index.js";
import { MetricHandler } from "../../../../src/metrics/index.js";
import { InternalConfig } from "../../../../src/shared/index.js";
import {
  HttpInstrumentation,
  type HttpInstrumentationConfig,
} from "@opentelemetry/instrumentation-http";
import type { ReadableSpan, SpanProcessor } from "@opentelemetry/sdk-trace-base";
import type { Span } from "@opentelemetry/api";
import { metrics, trace } from "@opentelemetry/api";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import type { MockInstance } from "vitest";
import { expect, afterEach, assert, beforeAll, describe, it, afterAll, vi } from "vitest";
import type Http from "node:http";
import { ExportResultCode } from "@opentelemetry/core";
import type { AzureMonitorTraceExporter } from "@azure/monitor-opentelemetry-exporter";
import type { Instrumentation } from "@opentelemetry/instrumentation";

describe("Library/TraceHandler", () => {
  let http: typeof Http | null = null;
  /* eslint-disable-next-line no-underscore-dangle */
  let _config: InternalConfig;
  let handler: TraceHandler;
  let metricHandler: MetricHandler;
  let mockHttpServer: ReturnType<typeof Http.createServer> | undefined;
  const mockHttpServerPort = 8085;
  let tracerProvider: NodeTracerProvider;
  let exportSpy: MockInstance<AzureMonitorTraceExporter["export"]>;
  let activeInstrumentations: Instrumentation[] = [];

  beforeAll(async () => {
    _config = new InternalConfig();
    if (_config.azureMonitorExporterOptions) {
      _config.azureMonitorExporterOptions.connectionString =
        "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333";
    }

    await new Promise((resolve) => {
      if (!http) {
        // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-assignment
        http = require("http");
      }
      mockHttpServer = http?.createServer((req, res) => {
        console.log(
          `[${new Date().toISOString()}] Mock server received request: ${req.method} ${req.url}`,
        );
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify({ success: true }));
        res.end();
      });
      mockHttpServer?.listen(mockHttpServerPort, () => {
        console.log(`Mock server is listening on port ${mockHttpServerPort}`);
        resolve(null);
      });
    });
  });

  afterAll(async () => {
    if (mockHttpServer) {
      await new Promise((resolve) => {
        mockHttpServer?.closeAllConnections();
        mockHttpServer?.close(() => {
          console.log("Mock server closed");
          resolve(null);
        });
      });
    }
    trace.disable();
  });

  afterEach(async () => {
    activeInstrumentations.forEach((instrumentation) => instrumentation.disable());
    activeInstrumentations = [];
    await metricHandler.shutdown();
    await handler.shutdown();
    metrics.disable();
    vi.restoreAllMocks();
  });

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function createHandler(httpConfig: HttpInstrumentationConfig) {
    _config.instrumentationOptions.http = httpConfig;
    metricHandler = new MetricHandler(_config);
    handler = new TraceHandler(_config, metricHandler);
    handler.getInstrumentations().forEach((instrumentation) => {
      instrumentation.enable();
      activeInstrumentations.push(instrumentation);
    });

    // Because the instrumentation is registered globally, its config is not updated
    // when the handler is created. We need to mock the getConfig method to return
    // the updated config.
    vi.spyOn(HttpInstrumentation.prototype, "getConfig").mockImplementation(() => {
      return httpConfig;
    });

    exportSpy = vi
      .spyOn(handler["_azureExporter"], "export")
      .mockImplementation((spans: any, resultCallback: any) => {
        console.log(
          "in fake, export called, here is the stack trace (there's no error)",
          new Error().stack,
        );
        return new Promise((resolve) => {
          resultCallback({
            code: ExportResultCode.SUCCESS,
          });
          resolve(spans);
        });
      });

    // Load Http modules, HTTP instrumentation hook will be created in OpenTelemetry
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("http");
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async function makeHttpRequest() {
    const options = {
      hostname: "localhost",
      port: mockHttpServerPort,
      path: "/test",
      method: "GET",
    };
    return new Promise<void>((resolve, reject) => {
      const req = http!.request(options, (res: any) => {
        res.on("data", function () {});
        res.on("end", () => {
          resolve();
        });
      });
      req.on("error", (error: Error) => {
        reject(error);
      });
      req.end();
    });
  }

  const customSpanProcessor: SpanProcessor = {
    forceFlush: () => {
      return Promise.resolve();
    },
    onStart: (span: Span) => {
      span.setAttribute("startAttribute", "SomeValue");
    },
    onEnd: (span: ReadableSpan) => {
      span.attributes["endAttribute"] = "SomeValue2";
    },
    shutdown: () => {
      return Promise.resolve();
    },
  };

  describe("#autoCollection of HTTP/HTTPS requests", () => {
    it("http outgoing/incoming requests & custom span processor", async () => {
      createHandler({ enabled: true });
      tracerProvider = new NodeTracerProvider({
        spanProcessors: [
          handler.getAzureMonitorSpanProcessor(),
          customSpanProcessor,
          handler.getBatchSpanProcessor(),
        ],
      });
      trace.setGlobalTracerProvider(tracerProvider);
      activeInstrumentations.forEach((instrumentation) => {
        instrumentation.setTracerProvider(tracerProvider);
      });
      await makeHttpRequest();
      await tracerProvider.forceFlush();
      expect(exportSpy).toHaveBeenCalledOnce();
      const spans = exportSpy.mock.calls[0][0];
      expect(spans.length).toBe(2);
      assert.deepStrictEqual(spans.length, 2);
      // Incoming request
      assert.deepStrictEqual(spans[0].name, "GET");
      assert.deepStrictEqual(
        spans[0].instrumentationScope.name,
        "@opentelemetry/instrumentation-http",
      );
      assert.deepStrictEqual(spans[0].kind, 1, "Span Kind");
      assert.deepStrictEqual(spans[0].status.code, 0, "Span Success"); // Success
      assert.isDefined(spans[0].startTime);
      assert.isDefined(spans[0].endTime);
      assert.deepStrictEqual(spans[0].attributes["http.host"], `localhost:${mockHttpServerPort}`);
      assert.deepStrictEqual(spans[0].attributes["http.method"], "GET");
      assert.deepStrictEqual(spans[0].attributes["http.status_code"], 200);
      assert.deepStrictEqual(spans[0].attributes["http.status_text"], "OK");
      assert.deepStrictEqual(spans[0].attributes["http.target"], "/test");
      assert.deepStrictEqual(
        spans[0].attributes["http.url"],
        `http://localhost:${mockHttpServerPort}/test`,
      );
      assert.deepStrictEqual(spans[0].attributes["net.host.name"], "localhost");
      assert.deepStrictEqual(spans[0].attributes["net.host.port"], mockHttpServerPort);
      // Outgoing request
      assert.deepStrictEqual(spans[1].name, "GET");
      assert.deepStrictEqual(
        spans[1].instrumentationScope.name,
        "@opentelemetry/instrumentation-http",
      );
      assert.deepStrictEqual(spans[1].kind, 2, "Span Kind");
      assert.deepStrictEqual(spans[1].status.code, 0, "Span Success"); // Success
      assert.isDefined(spans[1].startTime);
      assert.isDefined(spans[1].endTime);
      assert.deepStrictEqual(spans[1].attributes["http.host"], `localhost:${mockHttpServerPort}`);
      assert.deepStrictEqual(spans[1].attributes["http.method"], "GET");
      assert.deepStrictEqual(spans[1].attributes["http.status_code"], 200);
      assert.deepStrictEqual(spans[1].attributes["http.status_text"], "OK");
      assert.deepStrictEqual(spans[1].attributes["http.target"], "/test");
      assert.deepStrictEqual(
        spans[1].attributes["http.url"],
        `http://localhost:${mockHttpServerPort}/test`,
      );
      assert.deepStrictEqual(spans[1].attributes["net.peer.name"], "localhost");
      assert.notDeepEqual(spans[0].spanContext().spanId, spans[1].spanContext().spanId);
      // Incoming request
      assert.deepStrictEqual(spans[0].attributes["startAttribute"], "SomeValue");
      assert.deepStrictEqual(spans[0].attributes["endAttribute"], "SomeValue2");
      // Outgoing request
      assert.deepStrictEqual(spans[1].attributes["startAttribute"], "SomeValue");
      assert.deepStrictEqual(spans[1].attributes["endAttribute"], "SomeValue2");

      // Check if the spans are processed by the metric extractors
      // Incoming request
      assert.deepStrictEqual(
        spans[0].attributes["_MS.ProcessedByMetricExtractors"],
        "(Name:'Requests', Ver:'1.1')",
      );
      // Outgoing request
      assert.deepStrictEqual(
        spans[1].attributes["_MS.ProcessedByMetricExtractors"],
        "(Name:'Dependencies', Ver:'1.1')",
      );
    });

    it("http should not track if instrumentations are disabled", () => {
      // Disable all instrumentations
      _config.instrumentationOptions = {
        http: { enabled: false },
        azureSdk: { enabled: false },
        mongoDb: { enabled: false },
        mySql: { enabled: false },
        postgreSql: { enabled: false },
        redis: { enabled: false },
        redis4: { enabled: false },
      };
      metricHandler = new MetricHandler(_config);
      handler = new TraceHandler(_config, metricHandler);
      // No instrumentations should be created
      expect(handler.getInstrumentations()).toHaveLength(0);
    });
  });
});
