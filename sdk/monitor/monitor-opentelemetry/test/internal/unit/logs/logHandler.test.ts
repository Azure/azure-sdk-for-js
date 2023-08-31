// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import sinon from "sinon";
import { trace, context, isValidTraceId, isValidSpanId } from "@opentelemetry/api";
import { LogRecord as APILogRecord, logs } from "@opentelemetry/api-logs";
import { ExportResultCode } from "@opentelemetry/core";
import { LogHandler } from "../../../../src/logs";
import { MetricHandler } from "../../../../src/metrics";
import { InternalConfig } from "../../../../src/shared";
import { TraceHandler } from "../../../../src/traces";

describe("LogHandler", () => {
  let sandbox: sinon.SinonSandbox;
  let handler: LogHandler;
  let exportStub: sinon.SinonStub;
  let metricHandler: MetricHandler;
  const _config = new InternalConfig();
  if (_config.azureMonitorExporterConfig) {
    _config.azureMonitorExporterConfig.connectionString =
      "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333";
  }

  before(() => {
    sandbox = sinon.createSandbox();
    metricHandler = new MetricHandler(_config);
    handler = new LogHandler(_config, metricHandler);
    exportStub = sinon.stub(handler["_azureExporter"], "export").callsFake(
      (logs: any, resultCallback: any) =>
        new Promise((resolve) => {
          resultCallback({
            code: ExportResultCode.SUCCESS,
          });
          resolve(logs);
        })
    );
  });

  afterEach(() => {
    sandbox.restore();
    exportStub.resetHistory();
  });

  describe("#logger", () => {
    it("constructor", () => {
      assert.ok(logs.getLoggerProvider(), "LoggerProvider not available");
      assert.ok(logs.getLogger("testLogger"), "Logger not available");
    });

    it("export", (done) => {
      // Generate exception Log record
      const logRecord: APILogRecord = {
        body: "testLog",
      };
      logs.getLogger("testLogger").emit(logRecord);
      handler
        .flush()
        .then(() => {
          let result = exportStub.args;
          assert.strictEqual(result.length, 1);
          assert.strictEqual(result[0][0][0].body, "testLog");
          done();
        })
        .catch((error) => {
          done(error);
        });
    });

    it("tracing", (done) => {
      new TraceHandler(_config, metricHandler);
      trace.getTracer("testTracer").startActiveSpan("test", () => {
        // Generate Log record
        const logRecord: APILogRecord = {
          attributes: {},
          body: "testRecord",
        };
        logs.getLogger("testLogger").emit(logRecord);
        handler
          .flush()
          .then(() => {
            assert.ok(exportStub.calledOnce, "Export called");
            const logs = exportStub.args[0][0];
            assert.deepStrictEqual(logs.length, 1);
            const spanContext = trace.getSpanContext(context.active());
            assert.ok(isValidTraceId(logs[0].spanContext.traceId), "Valid trace Id");
            assert.ok(isValidSpanId(logs[0].spanContext.spanId), "Valid span Id");
            assert.deepStrictEqual(logs[0].spanContext.traceId, spanContext?.traceId);
            assert.deepStrictEqual(logs[0].spanContext.spanId, spanContext?.spanId);
            done();
          })
          .catch((error) => {
            done(error);
          });
      });

      it("Exception standard metrics processed", (done) => {
        // Generate exception Log record
        const logRecord: APILogRecord = {
          attributes: {
            "exception.type": "TestError",
          },
          body: "testErrorRecord",
        };
        logs.getLogger("testLogger").emit(logRecord);
        handler
          .flush()
          .then(() => {
            let result = exportStub.args;
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
        // Generate Log record
        const logRecord: APILogRecord = {
          attributes: {},
          body: "testRecord",
        };
        logs.getLogger("testLogger").emit(logRecord);
        handler
          .flush()
          .then(() => {
            let result = exportStub.args;
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
