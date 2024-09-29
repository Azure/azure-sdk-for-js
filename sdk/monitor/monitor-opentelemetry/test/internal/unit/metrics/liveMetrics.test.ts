// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import * as assert from "assert";
import * as sinon from "sinon";
import { SpanKind, SpanStatusCode } from "@opentelemetry/api";
import { ExportResultCode, millisToHrTime } from "@opentelemetry/core";
import { LoggerProvider, LogRecord } from "@opentelemetry/sdk-logs";
import { LiveMetrics } from "../../../../src/metrics/quickpulse/liveMetrics";
import { InternalConfig } from "../../../../src/shared";
import { QuickPulseOpenTelemetryMetricNames } from "../../../../src/metrics/quickpulse/types";
/* eslint-disable-next-line @typescript-eslint/no-redeclare */
import { Exception, RemoteDependency, Request } from "../../../../src/generated";
import { AccessToken, TokenCredential } from "@azure/core-auth";

describe("#LiveMetrics", () => {
  let exportStub: sinon.SinonStub;
  let autoCollect: LiveMetrics;

  before(() => {
    const config = new InternalConfig();
    config.azureMonitorExporterOptions.connectionString =
      "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333;";
    autoCollect = new LiveMetrics(config);
    exportStub = sinon.stub(autoCollect["quickpulseExporter"], "export").callsFake(
      (spans: any, resultCallback: any) =>
        new Promise((resolve) => {
          resultCallback({
            code: ExportResultCode.SUCCESS,
          });
          resolve(spans);
        }),
    );
  });

  afterEach(() => {
    exportStub.resetHistory();
  });

  after(() => {
    exportStub.restore();
    autoCollect.shutdown();
  });

  it("should observe instruments during collection", async () => {
    autoCollect["isCollectingData"] = true;
    autoCollect.activateMetrics({ collectionInterval: 100 });

    const loggerProvider = new LoggerProvider();
    const logger = loggerProvider.getLogger("testLogger") as any;

    const traceLog = new LogRecord(
      logger["_sharedState"],
      { name: "test" },
      {
        body: "testMessage",
        timestamp: 1234567890,
      },
    );
    autoCollect.recordLog(traceLog as any);
    traceLog.attributes["exception.type"] = "testExceptionType";
    traceLog.attributes["exception.message"] = "testExceptionMessage";
    for (let i = 0; i < 5; i++) {
      autoCollect.recordLog(traceLog as any);
    }
    const clientSpan: any = {
      kind: SpanKind.CLIENT,
      duration: millisToHrTime(12345678),
      attributes: {
        "http.status_code": 200,
        "http.method": "GET",
        "http.url": "http://test.com",
        customAttribute: "test",
      },
      status: {
        code: SpanStatusCode.OK,
      },
    };
    autoCollect.recordSpan(clientSpan);

    const serverSpan: any = {
      kind: SpanKind.SERVER,
      duration: millisToHrTime(98765432),
      attributes: {
        "http.status_code": 200,
        "http.method": "GET",
        "http.url": "http://test.com",
        customAttribute: "test",
      },
      status: {
        code: SpanStatusCode.OK,
      },
    };
    for (let i = 0; i < 2; i++) {
      autoCollect.recordSpan(serverSpan);
    }

    // Different dimensions
    clientSpan.attributes["http.status_code"] = "400";
    clientSpan.duration = millisToHrTime(900000);
    clientSpan.status.code = SpanStatusCode.ERROR;
    for (let i = 0; i < 3; i++) {
      autoCollect.recordSpan(clientSpan);
    }

    serverSpan.duration = millisToHrTime(100000);
    serverSpan.attributes["http.status_code"] = "400";
    serverSpan.status.code = SpanStatusCode.ERROR;
    for (let i = 0; i < 4; i++) {
      autoCollect.recordSpan(serverSpan);
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    assert.ok(exportStub.called);
    const resourceMetrics = exportStub.args[0][0];
    const scopeMetrics = resourceMetrics.scopeMetrics;
    assert.strictEqual(scopeMetrics.length, 1, "scopeMetrics count");
    const metrics = scopeMetrics[0].metrics;
    assert.strictEqual(metrics.length, 9, "metrics count");

    assert.strictEqual(
      metrics[0].descriptor.name,
      QuickPulseOpenTelemetryMetricNames.REQUEST_DURATION,
    );
    assert.strictEqual(metrics[0].dataPoints.length, 1, "dataPoints count");

    assert.strictEqual(
      metrics[0].descriptor.name,
      QuickPulseOpenTelemetryMetricNames.REQUEST_DURATION,
    );
    assert.strictEqual(metrics[0].dataPoints.length, 1, "dataPoints count");
    // ( (98765432 * 2) + (100000 * 4)/6)
    assert.strictEqual(
      metrics[0].dataPoints[0].value.toFixed(2),
      "32988477.33",
      "REQUEST_DURATION value",
    );
    assert.strictEqual(metrics[1].descriptor.name, QuickPulseOpenTelemetryMetricNames.REQUEST_RATE);
    assert.strictEqual(metrics[1].dataPoints.length, 1, "dataPoints count");
    assert.ok(metrics[1].dataPoints[0].value > 0, "REQUEST_RATE value");
    assert.strictEqual(
      metrics[2].descriptor.name,
      QuickPulseOpenTelemetryMetricNames.REQUEST_FAILURE_RATE,
    );
    assert.strictEqual(metrics[2].dataPoints.length, 1, "dataPoints count");
    assert.ok(metrics[2].dataPoints[0].value > 0, "REQUEST_FAILURE_RATE value");
    assert.strictEqual(
      metrics[3].descriptor.name,
      QuickPulseOpenTelemetryMetricNames.DEPENDENCY_DURATION,
    );
    assert.strictEqual(metrics[3].dataPoints.length, 1, "dataPoints count");
    // (12345678 + (900000 * 3)/4)
    assert.strictEqual(
      metrics[3].dataPoints[0].value.toFixed(2),
      "3761419.50",
      "DEPENDENCY_DURATION value",
    );
    assert.strictEqual(
      metrics[4].descriptor.name,
      QuickPulseOpenTelemetryMetricNames.DEPENDENCY_RATE,
    );
    assert.strictEqual(metrics[4].dataPoints.length, 1, "dataPoints count");
    assert.ok(metrics[4].dataPoints[0].value > 0, "DEPENDENCY_RATE value");
    assert.strictEqual(
      metrics[5].descriptor.name,
      QuickPulseOpenTelemetryMetricNames.DEPENDENCY_FAILURE_RATE,
    );
    assert.strictEqual(metrics[5].dataPoints.length, 1, "dataPoints count");
    assert.ok(metrics[5].dataPoints[0].value > 0, "DEPENDENCY_FAILURE_RATE value");
    assert.strictEqual(
      metrics[6].descriptor.name,
      QuickPulseOpenTelemetryMetricNames.COMMITTED_BYTES,
    );
    assert.strictEqual(metrics[6].dataPoints.length, 1, "dataPoints count");
    assert.ok(metrics[6].dataPoints[0].value > 0, "COMMITTED_BYTES dataPoint value");
    assert.strictEqual(
      metrics[7].descriptor.name,
      QuickPulseOpenTelemetryMetricNames.PROCESSOR_TIME,
    );
    assert.strictEqual(metrics[7].dataPoints.length, 1, "dataPoints count");
    assert.ok(metrics[7].dataPoints[0].value >= 0, "PROCESSOR_TIME dataPoint value");
    assert.strictEqual(
      metrics[8].descriptor.name,
      QuickPulseOpenTelemetryMetricNames.EXCEPTION_RATE,
    );
    assert.strictEqual(metrics[8].dataPoints.length, 1, "dataPoints count");
    assert.ok(metrics[5].dataPoints[0].value > 0, "EXCEPTION_RATE value");

    // Validate documents
    const documents = autoCollect.getDocuments();
    assert.strictEqual(documents.length, 16, "documents count");
    // assert.strictEqual(JSON.stringify(documents), "documents count");
    assert.strictEqual(documents[0].documentType, "Trace");
    assert.strictEqual(documents[0].properties?.length, 0);
    for (let i = 1; i < 5; i++) {
      assert.strictEqual(documents[i].documentType, "Exception");
      assert.strictEqual((documents[i] as Exception).exceptionType, "testExceptionType");
      assert.strictEqual((documents[i] as Exception).exceptionMessage, "testExceptionMessage");
      assert.strictEqual(documents[i].properties?.length, 0);
    }
    assert.strictEqual(documents[6].documentType, "RemoteDependency");
    assert.strictEqual((documents[6] as RemoteDependency).commandName, "http://test.com");
    assert.strictEqual((documents[6] as RemoteDependency).resultCode, "200");
    assert.strictEqual((documents[6] as RemoteDependency).duration, "PT12345.678S");
    assert.equal((documents[6].properties as any)[0].key, "customAttribute");
    assert.equal((documents[6].properties as any)[0].value, "test");
    for (let i = 7; i < 9; i++) {
      assert.strictEqual((documents[i] as Request).url, "http://test.com");
      assert.strictEqual((documents[i] as Request).responseCode, "200");
      assert.strictEqual((documents[i] as Request).duration, "PT98765.432S");
      assert.equal((documents[i].properties as any)[0].key, "customAttribute");
      assert.equal((documents[i].properties as any)[0].value, "test");
    }
    for (let i = 9; i < 12; i++) {
      assert.strictEqual(documents[i].documentType, "RemoteDependency");
      assert.strictEqual((documents[i] as RemoteDependency).commandName, "http://test.com");
      assert.strictEqual((documents[i] as RemoteDependency).resultCode, "400");
      assert.strictEqual((documents[i] as RemoteDependency).duration, "PT900S");
      assert.equal((documents[i].properties as any)[0].key, "customAttribute");
      assert.equal((documents[i].properties as any)[0].value, "test");
    }
    for (let i = 12; i < 15; i++) {
      assert.strictEqual((documents[i] as Request).url, "http://test.com");
      assert.strictEqual((documents[i] as Request).responseCode, "400");
      assert.strictEqual((documents[i] as Request).duration, "PT100S");
      assert.equal((documents[i].properties as any)[0].key, "customAttribute");
      assert.equal((documents[i].properties as any)[0].value, "test");
    }
  });

  it("should retrieve meter provider", () => {
    assert.ok(autoCollect.getMeterProvider());
  });

  it("should not collect when disabled", async () => {
    autoCollect.deactivateMetrics();
    await new Promise((resolve) => setTimeout(resolve, 120));
    assert.ok(exportStub.notCalled);
  });

  it("entra authentication", () => {
    const testConfig = new InternalConfig();
    const testCredential: TokenCredential = {
      getToken() {
        const accessToken: AccessToken = {
          token: "testToken",
          expiresOnTimestamp: Date.now() + 10000,
        };
        return Promise.resolve(accessToken);
      },
    };
    testConfig.azureMonitorExporterOptions.connectionString =
      "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333;LiveEndpoint=https://westus2.livediagnostics.monitor.azure.com/";
    testConfig.azureMonitorExporterOptions.credential = testCredential;
    testConfig.azureMonitorExporterOptions.credentialScopes = "testScope";
    const testAuto = new LiveMetrics(testConfig);
    assert.equal(
      testAuto["pingSender"]["endpointUrl"],
      "https://westus2.livediagnostics.monitor.azure.com",
    );
    assert.equal(
      testAuto["pingSender"]["instrumentationKey"],
      "1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",
    );
    assert.equal(testAuto["pingSender"]["quickpulseClientOptions"]["credential"], testCredential);
    assert.equal(
      testAuto["pingSender"]["quickpulseClientOptions"]["credentialScopes"],
      "testScope",
    );
    assert.equal(
      testAuto["quickpulseExporter"]["sender"]["endpointUrl"],
      "https://westus2.livediagnostics.monitor.azure.com",
    );
    assert.equal(
      testAuto["quickpulseExporter"]["sender"]["instrumentationKey"],
      "1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",
    );
    assert.equal(
      testAuto["quickpulseExporter"]["sender"]["quickpulseClientOptions"]["credential"],
      testCredential,
    );
    assert.equal(
      testAuto["quickpulseExporter"]["sender"]["quickpulseClientOptions"]["credentialScopes"],
      "testScope",
    );
  });
});
