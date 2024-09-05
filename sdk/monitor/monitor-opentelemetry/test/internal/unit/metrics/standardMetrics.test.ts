// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import * as assert from "assert";
import * as sinon from "sinon";
import { Attributes, SpanKind, SpanStatusCode } from "@opentelemetry/api";
import { Histogram } from "@opentelemetry/sdk-metrics";
import {
  SEMATTRS_HTTP_STATUS_CODE,
  SEMATTRS_NET_HOST_PORT,
  SEMATTRS_HTTP_USER_AGENT,
  SEMATTRS_NET_PEER_NAME,
  SEMATTRS_PEER_SERVICE,
  SEMRESATTRS_SERVICE_INSTANCE_ID,
  SEMRESATTRS_SERVICE_NAME,
  SEMRESATTRS_SERVICE_NAMESPACE,
} from "@opentelemetry/semantic-conventions";
import { ExportResultCode } from "@opentelemetry/core";
import { LoggerProvider, LogRecord } from "@opentelemetry/sdk-logs";
import { Resource } from "@opentelemetry/resources";
import { StandardMetrics } from "../../../../src/metrics/standardMetrics";
import { InternalConfig } from "../../../../src/shared";
import { getDependencyTarget } from "../../../../src/metrics/utils";

describe("#StandardMetricsHandler", () => {
  let exportStub: sinon.SinonStub;
  let autoCollect: StandardMetrics;

  before(() => {
    const config = new InternalConfig();
    config.azureMonitorExporterOptions.connectionString =
      "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333;";
    autoCollect = new StandardMetrics(config, { collectionInterval: 100 });
    exportStub = sinon.stub(autoCollect["_azureExporter"], "export").callsFake(
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
    const resource = new Resource({});
    resource.attributes[SEMRESATTRS_SERVICE_NAME] = "testcloudRoleName";
    resource.attributes[SEMRESATTRS_SERVICE_INSTANCE_ID] = "testcloudRoleInstance";

    const loggerProvider = new LoggerProvider({ resource: resource });
    const logger = loggerProvider.getLogger("testLogger") as any;

    const traceLog = new LogRecord(
      logger["_sharedState"],
      { name: "test" },
      {
        body: "testMessage",
        timestamp: 123,
      },
    );
    autoCollect.recordLog(traceLog as any);
    traceLog.attributes["exception.type"] = "testExceptionType";
    autoCollect.recordLog(traceLog as any);

    const clientSpan: any = {
      kind: SpanKind.CLIENT,
      duration: [123456],
      attributes: {
        [SEMATTRS_HTTP_STATUS_CODE]: 200,
      },
      status: { code: SpanStatusCode.OK },
      resource: resource,
    };
    clientSpan.attributes[SEMATTRS_PEER_SERVICE] = "testPeerService";
    autoCollect.recordSpan(clientSpan);

    const serverSpan: any = {
      kind: SpanKind.SERVER,
      duration: [654321],
      attributes: {
        [SEMATTRS_HTTP_STATUS_CODE]: 200,
      },
      resource: resource,
      status: { code: SpanStatusCode.OK },
    };
    autoCollect.recordSpan(serverSpan);

    // Different dimensions
    serverSpan.attributes[SEMATTRS_HTTP_STATUS_CODE] = "400";
    clientSpan.attributes[SEMATTRS_HTTP_STATUS_CODE] = "400";
    clientSpan.status.code = SpanStatusCode.ERROR;
    serverSpan.status.code = SpanStatusCode.ERROR;
    for (let i = 0; i < 10; i++) {
      clientSpan.duration[0] = i * 100000;
      autoCollect.recordSpan(clientSpan);
      serverSpan.duration[0] = i * 100000;
      autoCollect.recordSpan(serverSpan);
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    assert.ok(exportStub.called);
    const resourceMetrics = exportStub.args[0][0];
    const scopeMetrics = resourceMetrics.scopeMetrics;
    assert.strictEqual(scopeMetrics.length, 1, "scopeMetrics count");
    const metrics = scopeMetrics[0].metrics;
    assert.strictEqual(metrics.length, 4, "metrics count");
    assert.strictEqual(metrics[0].descriptor.name, "requests/duration");
    assert.strictEqual(metrics[1].descriptor.name, "dependencies/duration");
    assert.strictEqual(metrics[2].descriptor.name, "exceptions/count");
    assert.strictEqual(metrics[3].descriptor.name, "traces/count");

    // Requests
    assert.strictEqual(metrics[0].dataPoints.length, 2, "dataPoints count");
    assert.strictEqual((metrics[0].dataPoints[0].value as Histogram).count, 1, "dataPoint count");
    assert.strictEqual((metrics[0].dataPoints[0].value as Histogram).min, 654321, "dataPoint min");
    assert.strictEqual((metrics[0].dataPoints[0].value as Histogram).max, 654321, "dataPoint max");
    assert.strictEqual((metrics[0].dataPoints[0].value as Histogram).sum, 654321, "dataPoint sum");
    assert.strictEqual(
      metrics[0].dataPoints[0].attributes["cloud/roleInstance"],
      "testcloudRoleInstance",
    );
    assert.strictEqual(metrics[0].dataPoints[0].attributes["cloud/roleName"], "testcloudRoleName");
    assert.strictEqual(metrics[0].dataPoints[0].attributes["_MS.IsAutocollected"], "True");
    assert.strictEqual(metrics[0].dataPoints[0].attributes["_MS.MetricId"], "requests/duration");
    assert.strictEqual(metrics[0].dataPoints[0].attributes["request/resultCode"], "200");
    assert.strictEqual(metrics[0].dataPoints[0].attributes["Request.Success"], "True");

    assert.strictEqual((metrics[0].dataPoints[1].value as Histogram).count, 10, "dataPoint count");
    assert.strictEqual((metrics[0].dataPoints[1].value as Histogram).min, 0, "dataPoint min");
    assert.strictEqual((metrics[0].dataPoints[1].value as Histogram).max, 900000, "dataPoint max");
    assert.strictEqual((metrics[0].dataPoints[1].value as Histogram).sum, 4500000, "dataPoint sum");
    assert.strictEqual(
      metrics[0].dataPoints[1].attributes["cloud/roleInstance"],
      "testcloudRoleInstance",
    );
    assert.strictEqual(metrics[0].dataPoints[1].attributes["cloud/roleName"], "testcloudRoleName");
    assert.strictEqual(metrics[0].dataPoints[1].attributes["_MS.IsAutocollected"], "True");
    assert.strictEqual(metrics[0].dataPoints[1].attributes["_MS.MetricId"], "requests/duration");
    assert.strictEqual(metrics[0].dataPoints[1].attributes["request/resultCode"], "400");
    assert.strictEqual(metrics[0].dataPoints[1].attributes["Request.Success"], "False");

    // Dependencies
    assert.strictEqual(metrics[1].dataPoints.length, 2, "dataPoints count");
    assert.strictEqual((metrics[1].dataPoints[0].value as Histogram).count, 1, "dataPoint count");
    assert.strictEqual((metrics[1].dataPoints[0].value as Histogram).min, 123456, "dataPoint min");
    assert.strictEqual((metrics[1].dataPoints[0].value as Histogram).max, 123456, "dataPoint max");
    assert.strictEqual((metrics[1].dataPoints[0].value as Histogram).sum, 123456, "dataPoint sum");
    assert.strictEqual(
      metrics[1].dataPoints[0].attributes["_MS.MetricId"],
      "dependencies/duration",
    );
    assert.strictEqual(metrics[1].dataPoints[0].attributes["dependency/target"], "testPeerService");
    assert.strictEqual(metrics[1].dataPoints[0].attributes["dependency/resultCode"], "200");
    assert.strictEqual(metrics[1].dataPoints[0].attributes["Dependency.Type"], "http");
    assert.strictEqual(metrics[1].dataPoints[0].attributes["Dependency.Success"], "True");

    assert.strictEqual((metrics[1].dataPoints[1].value as Histogram).count, 10, "dataPoint count");
    assert.strictEqual((metrics[1].dataPoints[1].value as Histogram).min, 0, "dataPoint min");
    assert.strictEqual((metrics[1].dataPoints[1].value as Histogram).max, 900000, "dataPoint max");
    assert.strictEqual((metrics[1].dataPoints[1].value as Histogram).sum, 4500000, "dataPoint sum");
    assert.strictEqual(
      metrics[1].dataPoints[1].attributes["_MS.MetricId"],
      "dependencies/duration",
    );
    assert.strictEqual(metrics[1].dataPoints[1].attributes["dependency/target"], "testPeerService");
    assert.strictEqual(metrics[1].dataPoints[1].attributes["dependency/resultCode"], "400");
    assert.strictEqual(metrics[1].dataPoints[1].attributes["Dependency.Type"], "http");
    assert.strictEqual(metrics[1].dataPoints[1].attributes["Dependency.Success"], "False");

    // Exceptions
    assert.strictEqual(metrics[2].dataPoints.length, 1, "dataPoints count");
    assert.strictEqual(metrics[2].dataPoints[0].value, 1, "dataPoint value");
    assert.strictEqual(
      metrics[2].dataPoints[0].attributes["cloudRoleInstance"],
      "testcloudRoleInstance",
    );
    assert.strictEqual(metrics[2].dataPoints[0].attributes["cloudRoleName"], "testcloudRoleName");

    // Traces
    assert.strictEqual(metrics[3].dataPoints.length, 1, "dataPoints count");
    assert.strictEqual(metrics[3].dataPoints[0].value, 1, "dataPoint value");
    assert.strictEqual(
      metrics[3].dataPoints[0].attributes["cloudRoleInstance"],
      "testcloudRoleInstance",
    );
    assert.strictEqual(metrics[3].dataPoints[0].attributes["cloudRoleName"], "testcloudRoleName");
  });

  it("should mark as synthetic if UserAgent is 'AlwaysOn'", async () => {
    const resource = new Resource({});
    const serverSpan: any = {
      kind: SpanKind.SERVER,
      duration: [654321],
      status: { code: SpanStatusCode.OK },
      attributes: {
        [SEMATTRS_HTTP_STATUS_CODE]: 200,
        [SEMATTRS_HTTP_USER_AGENT]: "AlwaysOn",
      },
      resource: resource,
    };
    autoCollect.recordSpan(serverSpan);

    for (let i = 0; i < 10; i++) {
      serverSpan.duration[0] = i * 100000;
      autoCollect.recordSpan(serverSpan);
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    assert.ok(exportStub.called);
    const resourceMetrics = exportStub.args[0][0];
    const scopeMetrics = resourceMetrics.scopeMetrics;
    assert.strictEqual(scopeMetrics.length, 1, "scopeMetrics count");
    const metrics = scopeMetrics[0].metrics;
    assert.strictEqual(metrics.length, 1, "metrics count");
    assert.strictEqual(metrics[0].descriptor.name, "requests/duration");
    assert.equal(metrics[0].dataPoints[0].attributes["operation/synthetic"], "True");
  });

  it("should set service name based on service namespace if provided", async () => {
    const resource = new Resource({});
    resource.attributes[SEMRESATTRS_SERVICE_NAMESPACE] = "testcloudRoleName";
    resource.attributes[SEMRESATTRS_SERVICE_NAME] = "serviceTestName";
    resource.attributes[SEMRESATTRS_SERVICE_INSTANCE_ID] = "testcloudRoleInstance";

    const loggerProvider = new LoggerProvider({ resource: resource });
    const logger = loggerProvider.getLogger("testLogger") as any;

    const traceLog = new LogRecord(
      logger["_sharedState"],
      { name: "test" },
      {
        body: "testMessage",
        timestamp: 123,
      },
    );
    autoCollect.recordLog(traceLog as any);
    traceLog.attributes["exception.type"] = "testExceptionType";
    autoCollect.recordLog(traceLog as any);

    const clientSpan: any = {
      kind: SpanKind.CLIENT,
      duration: [123456],
      attributes: {
        [SEMATTRS_HTTP_STATUS_CODE]: 200,
      },
      status: { code: SpanStatusCode.OK },
      resource: resource,
    };
    clientSpan.attributes[SEMATTRS_PEER_SERVICE] = "testPeerService";
    autoCollect.recordSpan(clientSpan);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    assert.ok(exportStub.called);
    const resourceMetrics = exportStub.args[0][0];
    const scopeMetrics = resourceMetrics.scopeMetrics;
    assert.strictEqual(scopeMetrics.length, 1, "scopeMetrics count");
    const metrics = scopeMetrics[0].metrics;
    assert.strictEqual(
      metrics[2].dataPoints[0].attributes["cloudRoleName"],
      "testcloudRoleName.serviceTestName",
    );
  });

  it("should set dependency targets", () => {
    let attributes: Attributes;

    attributes = { [SEMATTRS_PEER_SERVICE]: "TestService" };
    assert.strictEqual(getDependencyTarget(attributes), "TestService");

    attributes = { [SEMATTRS_NET_PEER_NAME]: "test.com" };
    assert.strictEqual(getDependencyTarget(attributes), "test.com");

    attributes = { [SEMATTRS_NET_PEER_NAME]: "test.com", [SEMATTRS_NET_HOST_PORT]: "8080" };
    assert.strictEqual(getDependencyTarget(attributes), "test.com:8080");

    attributes = { "unknown.attribute": "value" };
    assert.strictEqual(getDependencyTarget(attributes), "");
  });

  it("should retrieve meter provider", () => {
    assert.ok(autoCollect.getMeterProvider());
  });

  it("should not collect when disabled", async () => {
    autoCollect.shutdown();
    await new Promise((resolve) => setTimeout(resolve, 120));
    assert.ok(exportStub.notCalled);
  });

  it("should calculate even if telemetry is sampled out", async () => {
    autoCollect.shutdown();
    await new Promise((resolve) => setTimeout(resolve, 120));
    assert.ok(exportStub.notCalled);
  });
});
