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
  describe,
  it,
  assert,
  vi,
  beforeEach,
  afterEach,
  beforeAll,
  afterAll,
  expect,
} from "vitest";

describe("LogHandler", () => {
  let handler: LogHandler;
  let exportStub: MockInstance;
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
      (lgs: any, resultCallback: any) =>
        new Promise((resolve) => {
          resultCallback({
            code: ExportResultCode.SUCCESS,
          });
          resolve(lgs);
        }),
    );
    const loggerProvider: LoggerProvider = new LoggerProvider();
    loggerProvider.addLogRecordProcessor(handler.getBatchLogRecordProcessor());
    loggerProvider.addLogRecordProcessor(handler.getAzureLogRecordProcessor());
    logs.setGlobalLoggerProvider(loggerProvider);

    const tracerProvider = new NodeTracerProvider();
    tracerProvider.register();
  });

  beforeEach(() => {
    originalEnv = process.env;
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
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
      const result = exportStub.mock.calls;
      assert.strictEqual(result.length, 1);
      assert.strictEqual(result[0][0][0].body, "testLog");
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
        const lgs = exportStub.mock.calls[0][0];
        assert.deepStrictEqual(lgs.length, 1);
        const spanContext = trace.getSpanContext(context.active());
        assert.ok(isValidTraceId(lgs[0].spanContext.traceId), "Valid trace Id");
        assert.ok(isValidSpanId(lgs[0].spanContext.spanId), "Valid span Id");
        assert.deepStrictEqual(lgs[0].spanContext.traceId, spanContext?.traceId);
        assert.deepStrictEqual(lgs[0].spanContext.spanId, spanContext?.spanId);
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
      const result = exportStub.mock.calls;
      assert.strictEqual(result.length, 1);
      assert.strictEqual(
        result[0][0][0].attributes["_MS.ProcessedByMetricExtractors"],
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
      const result = exportStub.mock.calls;
      assert.strictEqual(result.length, 1);
      assert.strictEqual(
        result[0][0][0].attributes["_MS.ProcessedByMetricExtractors"],
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
      const result = exportStub.mock.calls;
      assert.strictEqual(result.length, 1);
      assert.strictEqual(
        result[0][0][0].attributes["_MS.ProcessedByMetricExtractors"],
        "(Name:'Traces', Ver:'1.1')",
      );
      assert.strictEqual(result[0][0][0].attributes["operation/synthetic"], "True");
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
