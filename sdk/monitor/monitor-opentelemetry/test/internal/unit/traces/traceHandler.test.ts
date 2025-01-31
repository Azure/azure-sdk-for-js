// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TraceHandler } from "../../../../src/traces/index.js";
import { MetricHandler } from "../../../../src/metrics/index.js";
import { InternalConfig } from "../../../../src/shared/index.js";
import type { HttpInstrumentationConfig } from "@opentelemetry/instrumentation-http";
import type { ReadableSpan, SpanProcessor } from "@opentelemetry/sdk-trace-base";
import type { ProxyTracerProvider, Span } from "@opentelemetry/api";
import { metrics, trace } from "@opentelemetry/api";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import type { MockInstance } from "vitest";
import { expect, afterEach, assert, beforeAll, describe, it, afterAll, vi } from "vitest";
import type * as Http from "node:http";
import { ExportResultCode } from "@opentelemetry/core";
import type { AzureMonitorTraceExporter } from "@azure/monitor-opentelemetry-exporter";

describe("Library/TraceHandler", () => {
  let http: typeof Http | null = null;
  /* eslint-disable-next-line no-underscore-dangle */
  let _config: InternalConfig;
  let handler: TraceHandler;
  let metricHandler: MetricHandler;
  let mockHttpServer: ReturnType<typeof Http.createServer> | undefined;
  const mockHttpServerPort = 8085;
  let tracerProvider: NodeTracerProvider;

  beforeAll(async () => {
    _config = new InternalConfig();
    if (_config.azureMonitorExporterOptions) {
      _config.azureMonitorExporterOptions.connectionString =
        "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333";
    }

    tracerProvider = new NodeTracerProvider();
    trace.setGlobalTracerProvider(tracerProvider);

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

  let exportSpy: MockInstance<AzureMonitorTraceExporter["export"]>;
  afterEach(async () => {
    await metricHandler.shutdown();
    await handler.shutdown();
    metrics.disable();
    vi.restoreAllMocks();
  });

  function createHandler(httpConfig: HttpInstrumentationConfig) {
    _config.instrumentationOptions.http = httpConfig;
    metricHandler = new MetricHandler(_config);
    handler = new TraceHandler(_config, metricHandler);
    tracerProvider.addSpanProcessor(handler.getAzureMonitorSpanProcessor());
    tracerProvider.addSpanProcessor(handler.getBatchSpanProcessor());
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

    vi.resetModules();
    // Load Http modules, HTTP instrumentation hook will be created in OpenTelemetry
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("http");
  }

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

  describe("#autoCollection of HTTP/HTTPS requests", () => {
    it("http outgoing/incoming requests", async () => {
      createHandler({ enabled: true });
      await makeHttpRequest();
      const provider = (
        trace.getTracerProvider() as ProxyTracerProvider
      ).getDelegate() as NodeTracerProvider;
      await provider.forceFlush();
      expect(exportSpy).toHaveBeenCalledOnce();
      const spans = exportSpy.mock.calls[0][0];
      expect(spans.length).toBe(2);
      assert.deepStrictEqual(spans.length, 2);
      // Incoming request
      assert.deepStrictEqual(spans[0].name, "GET");
      assert.deepStrictEqual(
        spans[0].instrumentationLibrary.name,
        "@opentelemetry/instrumentation-http",
      );
      assert.deepStrictEqual(spans[0].kind, 1, "Span Kind");
      assert.deepStrictEqual(spans[0].status.code, 0, "Span Success"); // Success
      assert.ok(spans[0].startTime);
      assert.ok(spans[0].endTime);
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
        spans[1].instrumentationLibrary.name,
        "@opentelemetry/instrumentation-http",
      );
      assert.deepStrictEqual(spans[1].kind, 2, "Span Kind");
      assert.deepStrictEqual(spans[1].status.code, 0, "Span Success"); // Success
      assert.ok(spans[1].startTime);
      assert.ok(spans[1].endTime);
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
      // assert.deepStrictEqual(spans[0].spanContext().traceId, spans[1].spanContext().traceId);
      assert.notDeepEqual(spans[0].spanContext().spanId, spans[1].spanContext().spanId);
    });

    it("Custom Span processors", async () => {
      createHandler({ enabled: true });
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
      tracerProvider.addSpanProcessor(customSpanProcessor);
      await makeHttpRequest();
      await tracerProvider.forceFlush();
      expect(exportSpy).toHaveBeenCalledOnce();
      const spans = exportSpy.mock.calls[0][0];
      assert.deepStrictEqual(spans.length, 2);
      // Incoming request
      assert.deepStrictEqual(spans[0].attributes["startAttribute"], "SomeValue");
      assert.deepStrictEqual(spans[0].attributes["endAttribute"], "SomeValue2");
      // Outgoing request
      assert.deepStrictEqual(spans[1].attributes["startAttribute"], "SomeValue");
      assert.deepStrictEqual(spans[1].attributes["endAttribute"], "SomeValue2");
    });

    it("Span processing for pre aggregated metrics", async () => {
      createHandler({ enabled: true });
      await makeHttpRequest();
      await tracerProvider.forceFlush();
      expect(exportSpy).toHaveBeenCalledOnce();
      const spans = exportSpy.mock.calls[0][0];
      assert.equal(spans.length, 2);
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

    // TODO: these tests pass in isolation but not as a group due to test pollution. Resolve the test pollution separately
    it.todo("should not track dependencies if configured off", async () => {
      const httpConfig: HttpInstrumentationConfig = {
        enabled: true,
        ignoreOutgoingRequestHook: () => true,
      };
      createHandler(httpConfig);
      await makeHttpRequest();
      await tracerProvider.forceFlush();
      expect(exportSpy).toHaveBeenCalledOnce();
      const spans = exportSpy.mock.calls[0][0];
      assert.deepStrictEqual(spans.length, 1);
      assert.deepStrictEqual(spans[0].kind, 1, "Span Kind"); // Incoming only
    });

    it.todo("should not track requests if configured off", async () => {
      const httpConfig: HttpInstrumentationConfig = {
        enabled: true,
        ignoreIncomingRequestHook: () => true,
      };
      createHandler(httpConfig);
      await makeHttpRequest();
      await tracerProvider.forceFlush();
      expect(exportSpy).toHaveBeenCalledOnce();
      const spans = exportSpy.mock.calls[0][0];
      assert.deepStrictEqual(spans.length, 1);
      assert.deepStrictEqual(spans[0].kind, 2, "Span Kind"); // Outgoing only
    });

    it.todo("http should not track if instrumentations are disabled", async () => {
      createHandler({ enabled: false });
      await makeHttpRequest();
      await makeHttpRequest();
      await tracerProvider.forceFlush();
      expect(exportSpy).not.toHaveBeenCalled();
    });
  });
});
