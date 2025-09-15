// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable no-underscore-dangle*/

import { trace, context, isValidTraceId, isValidSpanId } from "@opentelemetry/api";
import type { LogRecord as APILogRecord } from "@opentelemetry/api-logs";
import { SeverityNumber, logs } from "@opentelemetry/api-logs";
import { ExportResultCode } from "@opentelemetry/core";
import { LoggerProvider } from "@opentelemetry/sdk-logs";
import { LogHandler } from "../../../../src/logs/index.js";
import { MetricHandler } from "../../../../src/metrics/index.js";
import { InternalConfig } from "../../../../src/shared/index.js";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { SemanticAttributes } from "@opentelemetry/semantic-conventions";
import type { BunyanInstrumentationConfig } from "@opentelemetry/instrumentation-bunyan";
import type { WinstonInstrumentationConfig } from "@opentelemetry/instrumentation-winston";
import type { MockInstance } from "vitest";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  assert,
} from "vitest";

describe("LogHandler", () => {
  let handler: LogHandler;
  let exportStub: MockInstance<(typeof handler)["_azureExporter"]["export"]>;
  let metricHandler: MetricHandler;
  let originalEnv: NodeJS.ProcessEnv;
  const _config = new InternalConfig();
  if (_config.azureMonitorExporterOptions) {
    _config.azureMonitorExporterOptions.connectionString =
      "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333";
  }

  beforeAll(() => {
    metricHandler = new MetricHandler(_config);
    handler = new LogHandler(_config, metricHandler);
    exportStub = vi.spyOn(handler["_azureExporter"], "export").mockImplementation(
      (_, resultCallback) =>
        new Promise((resolve) => {
          resultCallback({
            code: ExportResultCode.SUCCESS,
          });
          resolve();
        }),
    );
    const loggerProvider: LoggerProvider = new LoggerProvider({
      processors: [handler.getBatchLogRecordProcessor(), handler.getAzureLogRecordProcessor()],
    });
    logs.setGlobalLoggerProvider(loggerProvider);

    const tracerProvider = new NodeTracerProvider();
    tracerProvider.register();
  });

  beforeEach(() => {
    originalEnv = process.env;
  });

  afterEach(() => {
    process.env = originalEnv;
    exportStub.mockReset();
  });

  afterAll(() => {
    logs.disable();
    trace.disable();
  });

  describe("#logger", () => {
    it("export", async () => {
      // Generate exception Log record
      const logRecord: APILogRecord = {
        body: "testLog",
      };
      logs.getLogger("testLogger").emit(logRecord);
      await (logs.getLoggerProvider() as LoggerProvider).forceFlush();
      expect(exportStub).toHaveBeenCalledOnce();
      const args = exportStub.mock.calls[0];
      assert.strictEqual(args[0][0].body, "testLog");
    });

    it("tracing", async () => {
      await trace.getTracer("testTracer").startActiveSpan("test", async () => {
        // Generate Log record
        const logRecord: APILogRecord = {
          attributes: {},
          body: "testRecord",
        };
        logs.getLogger("testLogger").emit(logRecord);
        await (logs.getLoggerProvider() as LoggerProvider).forceFlush();
        expect(exportStub).toHaveBeenCalledOnce();
        const lgs = exportStub.mock.calls[0][0][0];
        const spanContext = trace.getSpanContext(context.active());
        assert.ok(isValidTraceId(lgs.spanContext!.traceId), "Valid trace Id");
        assert.ok(isValidSpanId(lgs.spanContext!.spanId), "Valid span Id");
        assert.deepStrictEqual(lgs.spanContext!.traceId, spanContext?.traceId);
        assert.deepStrictEqual(lgs.spanContext!.spanId, spanContext?.spanId);
      });
    });

    it("Exception standard metrics processed", async () => {
      // Generate exception Log record
      const logRecord: APILogRecord = {
        attributes: {
          "exception.type": "TestError",
        },
        body: "testErrorRecord",
      };
      logs.getLogger("testLogger").emit(logRecord);
      await (logs.getLoggerProvider() as LoggerProvider).forceFlush();
      expect(exportStub).toHaveBeenCalledOnce();
      const result = exportStub.mock.calls[0];
      assert.strictEqual(
        result[0][0].attributes["_MS.ProcessedByMetricExtractors"],
        "(Name:'Exceptions', Ver:'1.1')",
      );
    });

    it("Trace standard metrics processed", async () => {
      // Generate Log record
      const logRecord: APILogRecord = {
        attributes: {},
        body: "testRecord",
      };
      logs.getLogger("testLogger").emit(logRecord);
      await (logs.getLoggerProvider() as LoggerProvider).forceFlush();
      expect(exportStub).toHaveBeenCalledOnce();
      const result = exportStub.mock.calls[0];
      assert.strictEqual(
        result[0][0].attributes["_MS.ProcessedByMetricExtractors"],
        "(Name:'Traces', Ver:'1.1')",
      );
    });

    it("Trace standard metrics synthetic processed", async () => {
      // Generate Log record
      const logRecord: APILogRecord = {
        attributes: {
          // Shows that the record is synthetic
          [SemanticAttributes.HTTP_USER_AGENT]: "AlwaysOn",
        },
        body: "testRecord",
      };
      logs.getLogger("testLogger").emit(logRecord);
      await (logs.getLoggerProvider() as LoggerProvider).forceFlush();
      expect(exportStub).toHaveBeenCalledOnce();
      const result = exportStub.mock.calls[0];
      assert.strictEqual(
        result[0][0].attributes["_MS.ProcessedByMetricExtractors"],
        "(Name:'Traces', Ver:'1.1')",
      );
      assert.strictEqual(result[0][0].attributes["operation/synthetic"], "True");
    });

    it("should add bunyan instrumentation", () => {
      const config = new InternalConfig();
      config.azureMonitorExporterOptions.connectionString =
        "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333";
      config.instrumentationOptions.bunyan = {
        enabled: true,
      };
      const logHandler = new LogHandler(config, metricHandler);
      assert.ok(logHandler.getInstrumentations().length > 0, "Log instrumentations not added");
      assert.strictEqual(
        logHandler.getInstrumentations()[0].instrumentationName,
        "@opentelemetry/instrumentation-bunyan",
        "Bunyan instrumentation not added",
      );
    });

    it("should add winston instrumentation", () => {
      const config = new InternalConfig();
      config.azureMonitorExporterOptions.connectionString =
        "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333";
      config.instrumentationOptions.winston = {
        enabled: true,
      };
      const logHandler = new LogHandler(config, metricHandler);
      assert.ok(logHandler.getInstrumentations().length > 0, "Log instrumentations not added");
      assert.strictEqual(
        logHandler.getInstrumentations()[0].instrumentationName,
        "@opentelemetry/instrumentation-winston",
        "Winston instrumentation not added",
      );
    });

    it("should set bunyan log level with the APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL env var", () => {
      process.env.APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL = "DEBUG";
      const config = new InternalConfig();
      config.azureMonitorExporterOptions.connectionString =
        "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333";
      config.instrumentationOptions.bunyan = {
        enabled: true,
      };
      const logHandler = new LogHandler(config, metricHandler);
      assert.strictEqual(
        (logHandler.getInstrumentations()[0].getConfig() as BunyanInstrumentationConfig)
          .logSeverity,
        SeverityNumber.DEBUG,
      );
    });

    it("should set winston log level with the APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL env var", () => {
      process.env.APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL = "ERROR";
      const config = new InternalConfig();
      config.azureMonitorExporterOptions.connectionString =
        "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333";
      config.instrumentationOptions.winston = {
        enabled: true,
      };
      const logHandler = new LogHandler(config, metricHandler);
      assert.strictEqual(
        (logHandler.getInstrumentations()[0].getConfig() as WinstonInstrumentationConfig)
          .logSeverity,
        SeverityNumber.ERROR,
      );
    });
  });
});
