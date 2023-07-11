// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import sinon from "sinon";
import { trace, context, isValidTraceId, isValidSpanId } from "@opentelemetry/api";
import { LogRecord as APILogRecord } from "@opentelemetry/api-logs";
import { ExportResultCode } from "@opentelemetry/core";
import { LogHandler } from "../../../../src/logs";
import { MetricHandler } from "../../../../src/metrics";
import { TraceHandler } from "../../../../src/traces";
import { AzureMonitorOpenTelemetryConfig } from "../../../../src/shared";

describe("LogHandler", () => {
  let sandbox: sinon.SinonSandbox;
  let handler: LogHandler;
  let traceHandler: TraceHandler;
  let stub: sinon.SinonStub;
  let metricHandler: MetricHandler;
  const _config = new AzureMonitorOpenTelemetryConfig();
  if (_config.azureMonitorExporterConfig) {
    _config.azureMonitorExporterConfig.connectionString =
      "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333";
  }

  before(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
    handler.shutdown();
    if (traceHandler) {
      traceHandler.shutdown();
    }
    if (metricHandler) {
      metricHandler.shutdown();
    }
  });

  function createLogHandler(config: AzureMonitorOpenTelemetryConfig, metricHandler: MetricHandler) {
    handler = new LogHandler(config, metricHandler);
    stub = sinon.stub(handler["_azureExporter"], "export").callsFake(
      (logs: any, resultCallback: any) =>
        new Promise((resolve) => {
          resultCallback({
            code: ExportResultCode.SUCCESS,
          });
          resolve(logs);
        })
    );
  }

  describe("#logger", () => {
    it("constructor", () => {
      metricHandler = new MetricHandler(_config);
      createLogHandler(_config, metricHandler);
      assert.ok(handler.getLoggerProvider(), "LoggerProvider not available");
      assert.ok(handler.getLogger(), "Logger not available");
    });

    it("tracing", (done) => {
      metricHandler = new MetricHandler(_config);
      createLogHandler(_config, metricHandler);
      traceHandler = new TraceHandler(_config, metricHandler);
      traceHandler["_tracer"].startActiveSpan("test", () => {
        // Generate Log record
        const logRecord: APILogRecord = {
          attributes: {},
          body: "testRecord",
        };
        handler.getLogger().emit(logRecord);
        handler
          .flush()
          .then(() => {
            assert.ok(stub.calledOnce, "Export called");
            const logs = stub.args[0][0];
            assert.equal(logs.length, 1);
            const spanContext = trace.getSpanContext(context.active());
            assert.ok(isValidTraceId(logs[0].spanContext.traceId), "Valid trace Id");
            assert.ok(isValidSpanId(logs[0].spanContext.spanId), "Valid span Id");
            assert.equal(logs[0].spanContext.traceId, spanContext?.traceId);
            assert.equal(logs[0].spanContext.spanId, spanContext?.spanId);
            done();
          })
          .catch((error) => {
            done(error);
          });
      });

      it("Exception standard metrics processed", (done) => {
        _config.enableAutoCollectStandardMetrics = true;
        metricHandler = new MetricHandler(_config);
        createLogHandler(_config, metricHandler);
        // Generate exception Log record
        const logRecord: APILogRecord = {
          attributes: {
            "exception.type": "TestError",
          },
          body: "testErrorRecord",
        };
        handler.getLogger().emit(logRecord);
        handler
          .flush()
          .then(() => {
            let result = stub.args;
            assert.strictEqual(result.length, 1);
            assert.strictEqual(
              result[0][0][0].attributes["_MS.ProcessedByMetricExtractors"],
              "(Name:'Exceptions', Ver:'1.1')"
            );
            done();
          })
          .catch((error) => {
            done(error);
          });
      });

      it("Trace standard metrics processed", (done) => {
        _config.enableAutoCollectStandardMetrics = true;
        metricHandler = new MetricHandler(_config);
        createLogHandler(_config, metricHandler);
        // Generate Log record
        const logRecord: APILogRecord = {
          attributes: {},
          body: "testRecord",
        };
        handler.getLogger().emit(logRecord);
        handler
          .flush()
          .then(() => {
            let result = stub.args;
            assert.strictEqual(result.length, 1);
            assert.strictEqual(
              result[0][0][0].attributes["_MS.ProcessedByMetricExtractors"],
              "(Name:'Traces', Ver:'1.1')"
            );
            done();
          })
          .catch((error) => {
            done(error);
          });
      });
    });
  });
});
