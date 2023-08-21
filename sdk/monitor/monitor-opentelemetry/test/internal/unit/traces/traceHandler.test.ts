// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import * as sinon from "sinon";
import { ExportResultCode } from "@opentelemetry/core";

import { TraceHandler } from "../../../../src/traces";
import { MetricHandler } from "../../../../src/metrics";
import { AzureMonitorOpenTelemetryConfig } from "../../../../src/shared";
import { HttpInstrumentationConfig } from "@opentelemetry/instrumentation-http";
import { ReadableSpan, SpanProcessor } from "@opentelemetry/sdk-trace-base";
import { Span } from "@opentelemetry/api";

describe("Library/TraceHandler", () => {
  let http: any = null;
  let sandbox: sinon.SinonSandbox;
  let _config: AzureMonitorOpenTelemetryConfig;

  before(() => {
    _config = new AzureMonitorOpenTelemetryConfig();
    if (_config.azureMonitorExporterConfig) {
      _config.azureMonitorExporterConfig.connectionString =
        "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333";
    }
    _config.otlpTraceExporterConfig.enabled = true;
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("#autoCollection of HTTP/HTTPS requests", () => {
    let exportStub: sinon.SinonStub;
    let otlpExportStub: sinon.SinonStub;
    let handler: TraceHandler;
    let metricHandler: MetricHandler;
    let mockHttpServer: any;
    let mockHttpServerPort = 0;

    before(() => {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      const httpConfig: HttpInstrumentationConfig = {
        enabled: true,
      };
      _config.instrumentationOptions.http = httpConfig;
      metricHandler = new MetricHandler(_config);
      handler = new TraceHandler(_config, metricHandler);
      exportStub = sinon.stub(handler["_azureExporter"], "export").callsFake(
        (spans: any, resultCallback: any) =>
          new Promise((resolve) => {
            resultCallback({
              code: ExportResultCode.SUCCESS,
            });
            resolve(spans);
          })
      );
      otlpExportStub = sinon.stub(handler["_otlpExporter"] as any, "export").callsFake(
        (spans: any, resultCallback: any) =>
          new Promise((resolve) => {
            resultCallback({
              code: ExportResultCode.SUCCESS,
            });
            resolve(spans);
          })
      );

      // Load Http modules, HTTP instrumentation hook will be created in OpenTelemetry
      http = require("http") as any;
      createMockServers();
    });

    beforeEach(() => {
      handler.disableInstrumentations();
    });

    afterEach(() => {
      exportStub.resetHistory();
      otlpExportStub.resetHistory();
    });

    after(() => {
      exportStub.restore();
      otlpExportStub.restore();
      mockHttpServer.close();
      metricHandler.shutdown();
      handler.shutdown();
    });

    function createMockServers() {
      mockHttpServer = http.createServer((req: any, res: any) => {
        if (req) {
          res.statusCode = 200;
          res.setHeader("content-type", "application/json");
          res.write(
            JSON.stringify({
              success: true,
            })
          );
          res.end();
        }
      });
      mockHttpServer.listen(0, () => {
        const addr = mockHttpServer.address();
        if (addr == null) {
          new Error("unexpected addr null");
          return;
        }
        if (typeof addr === "string") {
          new Error(`unexpected addr ${addr}`);
          return;
        }
        if (addr.port <= 0) {
          new Error("Could not get port");
          return;
        }
        mockHttpServerPort = addr.port;
      });
    }

    async function makeHttpRequest(): Promise<void> {
      const options = {
        hostname: "localhost",
        port: mockHttpServerPort,
        path: "/test",
        method: "GET",
      };
      return new Promise((resolve, reject) => {
        const req = http.request(options, (res: any) => {
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

    it("http outgoing/incoming requests", (done) => {
      handler["_initializeInstrumentations"]();
      makeHttpRequest()
        .then(() => {
          handler
            .flush()
            .then(() => {
              assert.ok(exportStub.calledOnce, "Export called");
              const spans = exportStub.args[0][0];
              assert.deepStrictEqual(spans.length, 2);
              // Incoming request
              assert.deepStrictEqual(spans[0].name, "GET");
              assert.deepStrictEqual(
                spans[0].instrumentationLibrary.name,
                "@opentelemetry/instrumentation-http"
              );
              assert.deepStrictEqual(spans[0].kind, 1, "Span Kind");
              assert.deepStrictEqual(spans[0].status.code, 0, "Span Success"); // Success
              assert.ok(spans[0].startTime);
              assert.ok(spans[0].endTime);
              assert.deepStrictEqual(
                spans[0].attributes["http.host"],
                `localhost:${mockHttpServerPort}`
              );
              assert.deepStrictEqual(spans[0].attributes["http.method"], "GET");
              assert.deepStrictEqual(spans[0].attributes["http.status_code"], 200);
              assert.deepStrictEqual(spans[0].attributes["http.status_text"], "OK");
              assert.deepStrictEqual(spans[0].attributes["http.target"], "/test");
              assert.deepStrictEqual(
                spans[0].attributes["http.url"],
                `http://localhost:${mockHttpServerPort}/test`
              );
              assert.deepStrictEqual(spans[0].attributes["net.host.name"], "localhost");
              assert.deepStrictEqual(spans[0].attributes["net.host.port"], mockHttpServerPort);
              // Outgoing request
              assert.deepStrictEqual(spans[1].name, "GET");
              assert.deepStrictEqual(
                spans[1].instrumentationLibrary.name,
                "@opentelemetry/instrumentation-http"
              );
              assert.deepStrictEqual(spans[1].kind, 2, "Span Kind");
              assert.deepStrictEqual(spans[1].status.code, 0, "Span Success"); // Success
              assert.ok(spans[1].startTime);
              assert.ok(spans[1].endTime);
              assert.deepStrictEqual(
                spans[1].attributes["http.host"],
                `localhost:${mockHttpServerPort}`
              );
              assert.deepStrictEqual(spans[1].attributes["http.method"], "GET");
              assert.deepStrictEqual(spans[1].attributes["http.status_code"], 200);
              assert.deepStrictEqual(spans[1].attributes["http.status_text"], "OK");
              assert.deepStrictEqual(spans[1].attributes["http.target"], "/test");
              assert.deepStrictEqual(
                spans[1].attributes["http.url"],
                `http://localhost:${mockHttpServerPort}/test`
              );
              assert.deepStrictEqual(spans[1].attributes["net.peer.name"], "localhost");
              assert.deepStrictEqual(spans[1].attributes["net.peer.port"], mockHttpServerPort);

              assert.deepStrictEqual(
                spans[0]["_spanContext"]["traceId"],
                spans[1]["_spanContext"]["traceId"]
              );
              assert.notDeepStrictEqual(
                spans[0]["_spanContext"]["spanId"],
                spans[1]["_spanContext"]["spanId"]
              );
              done();
            })
            .catch((error) => {
              done(error);
            });
        })
        .catch((error) => {
          done(error);
        });
    });

    it("OTLP Export", (done) => {
      handler["_initializeInstrumentations"]();
      makeHttpRequest()
        .then(() => {
          handler
            .flush()
            .then(() => {
              assert.ok(otlpExportStub.calledOnce, "Export called");
              const spans = otlpExportStub.args[0][0];
              assert.deepStrictEqual(spans.length, 2);
              // Incoming request
              assert.deepStrictEqual(spans[0].name, "GET");
              assert.deepStrictEqual(
                spans[0].instrumentationLibrary.name,
                "@opentelemetry/instrumentation-http"
              );
              assert.deepStrictEqual(spans[0].kind, 1, "Span Kind");
              assert.deepStrictEqual(spans[0].status.code, 0, "Span Success"); // Success
              assert.ok(spans[0].startTime);
              assert.ok(spans[0].endTime);
              assert.deepStrictEqual(
                spans[0].attributes["http.host"],
                `localhost:${mockHttpServerPort}`
              );
              assert.deepStrictEqual(spans[0].attributes["http.method"], "GET");
              assert.deepStrictEqual(spans[0].attributes["http.status_code"], 200);
              assert.deepStrictEqual(spans[0].attributes["http.status_text"], "OK");
              assert.deepStrictEqual(spans[0].attributes["http.target"], "/test");
              assert.deepStrictEqual(
                spans[0].attributes["http.url"],
                `http://localhost:${mockHttpServerPort}/test`
              );
              assert.deepStrictEqual(spans[0].attributes["net.host.name"], "localhost");
              assert.deepStrictEqual(spans[0].attributes["net.host.port"], mockHttpServerPort);
              // Outgoing request
              assert.deepStrictEqual(spans[1].name, "GET");
              assert.deepStrictEqual(
                spans[1].instrumentationLibrary.name,
                "@opentelemetry/instrumentation-http"
              );
              assert.deepStrictEqual(spans[1].kind, 2, "Span Kind");
              assert.deepStrictEqual(spans[1].status.code, 0, "Span Success"); // Success
              assert.ok(spans[1].startTime);
              assert.ok(spans[1].endTime);
              assert.deepStrictEqual(
                spans[1].attributes["http.host"],
                `localhost:${mockHttpServerPort}`
              );
              assert.deepStrictEqual(spans[1].attributes["http.method"], "GET");
              assert.deepStrictEqual(spans[1].attributes["http.status_code"], 200);
              assert.deepStrictEqual(spans[1].attributes["http.status_text"], "OK");
              assert.deepStrictEqual(spans[1].attributes["http.target"], "/test");
              assert.deepStrictEqual(
                spans[1].attributes["http.url"],
                `http://localhost:${mockHttpServerPort}/test`
              );
              assert.deepStrictEqual(spans[1].attributes["net.peer.name"], "localhost");
              assert.deepStrictEqual(spans[1].attributes["net.peer.port"], mockHttpServerPort);

              assert.deepStrictEqual(
                spans[0]["_spanContext"]["traceId"],
                spans[1]["_spanContext"]["traceId"]
              );
              assert.notDeepStrictEqual(
                spans[0]["_spanContext"]["spanId"],
                spans[1]["_spanContext"]["spanId"]
              );
              done();
            })
            .catch((error) => {
              done(error);
            });
        })
        .catch((error) => {
          done(error);
        });
    });

    it("Custom Span processors", (done) => {
      handler["_initializeInstrumentations"]();
      let customSpanProcessor: SpanProcessor = {
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
      handler.addSpanProcessor(customSpanProcessor);
      makeHttpRequest()
        .then(() => {
          handler
            .flush()
            .then(() => {
              assert.ok(exportStub.calledOnce, "Export called");
              const spans = exportStub.args[0][0];
              assert.deepStrictEqual(spans.length, 2);
              // Incoming request
              assert.deepStrictEqual(spans[0].attributes["startAttribute"], "SomeValue");
              assert.deepStrictEqual(spans[0].attributes["endAttribute"], "SomeValue2");
              // Outgoing request
              assert.deepStrictEqual(spans[1].attributes["startAttribute"], "SomeValue");
              assert.deepStrictEqual(spans[1].attributes["endAttribute"], "SomeValue2");
              done();
            })
            .catch((error) => {
              done(error);
            });
        })
        .catch((error) => {
          done(error);
        });
    });

    it("Span processing for pre aggregated metrics", (done) => {
      handler["_initializeInstrumentations"]();
      metricHandler["_config"].enableAutoCollectStandardMetrics = true;
      makeHttpRequest()
        .then(() => {
          handler
            .flush()
            .then(() => {
              assert.ok(exportStub.calledOnce, "Export called");
              const spans = exportStub.args[0][0];
              assert.deepStrictEqual(spans.length, 2);
              // Incoming request
              assert.deepStrictEqual(
                spans[0].attributes["_MS.ProcessedByMetricExtractors"],
                "(Name:'Requests', Ver:'1.1')"
              );
              // Outgoing request
              assert.deepStrictEqual(
                spans[1].attributes["_MS.ProcessedByMetricExtractors"],
                "(Name:'Dependencies', Ver:'1.1')"
              );
              done();
            })
            .catch((error) => {
              done(error);
            });
        })
        .catch((error) => {
          done(error);
        });
    });

    it("should not track dependencies if configured off", (done) => {
      const httpConfig: HttpInstrumentationConfig = {
        enabled: true,
        ignoreOutgoingRequestHook: () => true,
      };
      handler["_httpInstrumentation"]?.setConfig(httpConfig);
      handler["_initializeInstrumentations"]();
      makeHttpRequest()
        .then(() => {
          handler
            .flush()
            .then(() => {
              assert.ok(exportStub.calledOnce, "Export called");
              const spans = exportStub.args[0][0];
              assert.deepStrictEqual(spans.length, 1);
              assert.deepStrictEqual(spans[0].kind, 1, "Span Kind"); // Incoming only
              done();
            })
            .catch((error) => {
              done(error);
            });
        })
        .catch((error) => {
          done(error);
        });
    });

    it("should not track requests if configured off", (done) => {
      const httpConfig: HttpInstrumentationConfig = {
        enabled: true,
        ignoreIncomingRequestHook: () => true,
      };
      handler["_httpInstrumentation"]?.setConfig(httpConfig);
      handler["_initializeInstrumentations"]();
      makeHttpRequest()
        .then(() => {
          handler
            .flush()
            .then(() => {
              assert.ok(exportStub.calledOnce, "Export called");
              const spans = exportStub.args[0][0];
              assert.deepStrictEqual(spans.length, 1);
              assert.deepStrictEqual(spans[0].kind, 2, "Span Kind"); // Outgoing only
              done();
            })
            .catch((error) => {
              done(error);
            });
        })
        .catch((error) => {
          done(error);
        });
    });

    it("http should not track if instrumentations are disabled", (done) => {
      handler.disableInstrumentations();
      makeHttpRequest()
        .then(() => {
          makeHttpRequest()
            .then(() => {
              handler
                .flush()
                .then(() => {
                  assert.ok(exportStub.notCalled, "Export not called");
                  done();
                })
                .catch((error) => {
                  done(error);
                });
            })
            .catch((error) => {
              done(error);
            });
        })
        .catch((error) => {
          done(error);
        });
    });
  });
});
