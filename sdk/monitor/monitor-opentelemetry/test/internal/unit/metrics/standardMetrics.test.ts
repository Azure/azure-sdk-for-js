// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import * as sinon from "sinon";
import { Attributes, SpanKind } from "@opentelemetry/api";
import { Histogram } from "@opentelemetry/sdk-metrics";
import {
  SemanticAttributes,
  SemanticResourceAttributes,
} from "@opentelemetry/semantic-conventions";
import { ExportResultCode } from "@opentelemetry/core";
import { LoggerProvider, LogRecord } from "@opentelemetry/sdk-logs";
import { Resource } from "@opentelemetry/resources";
import { StandardMetrics } from "../../../../src/metrics/standardMetrics";
import { InternalConfig } from "../../../../src/shared";

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
        })
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
    let resource = new Resource({});
    resource.attributes[SemanticResourceAttributes.SERVICE_NAME] = "testcloudRoleName";
    resource.attributes[SemanticResourceAttributes.SERVICE_INSTANCE_ID] = "testcloudRoleInstance";

    let loggerProvider = new LoggerProvider({ resource: resource });
    let logger = loggerProvider.getLogger("testLogger") as any;

    let traceLog = new LogRecord(
      logger["_sharedState"],
      { name: "test" },
      {
        body: "testMessage",
        timestamp: 123,
      }
    );
    autoCollect.recordLog(traceLog as any);
    traceLog.attributes["exception.type"] = "testExceptionType";
    autoCollect.recordLog(traceLog as any);

    let clientSpan: any = {
      kind: SpanKind.CLIENT,
      duration: [123456],
      attributes: {
        "http.status_code": 200,
      },
      resource: resource,
    };
    clientSpan.attributes[SemanticAttributes.PEER_SERVICE] = "testPeerService";
    autoCollect.recordSpan(clientSpan);

    let serverSpan: any = {
      kind: SpanKind.SERVER,
      duration: [654321],
      attributes: {
        "http.status_code": 200,
      },
      resource: resource,
    };
    autoCollect.recordSpan(serverSpan);

    // Different dimensions
    serverSpan.attributes["http.status_code"] = "400";
    clientSpan.attributes["http.status_code"] = "400";
    for (let i = 0; i < 10; i++) {
      clientSpan.duration[0] = i * 100000;
      autoCollect.recordSpan(clientSpan);
      serverSpan.duration[0] = i * 100000;
      autoCollect.recordSpan(serverSpan);
    }

    await new Promise((resolve) => setTimeout(resolve, 120));

    assert.ok(exportStub.called);
    const resourceMetrics = exportStub.args[0][0];
    const scopeMetrics = resourceMetrics.scopeMetrics;
    assert.strictEqual(scopeMetrics.length, 1, "scopeMetrics count");
    const metrics = scopeMetrics[0].metrics;
    assert.strictEqual(metrics.length, 4, "metrics count");
    assert.strictEqual(metrics[0].descriptor.name, "azureMonitor.http.requestDuration");
    assert.strictEqual(metrics[1].descriptor.name, "azureMonitor.http.dependencyDuration");
    assert.strictEqual(metrics[2].descriptor.name, "azureMonitor.exceptionCount");
    assert.strictEqual(metrics[3].descriptor.name, "azureMonitor.traceCount");

    // Requests
    assert.strictEqual(metrics[0].dataPoints.length, 2, "dataPoints count");
    assert.strictEqual((metrics[0].dataPoints[0].value as Histogram).count, 1, "dataPoint count");
    assert.strictEqual((metrics[0].dataPoints[0].value as Histogram).min, 654321, "dataPoint min");
    assert.strictEqual((metrics[0].dataPoints[0].value as Histogram).max, 654321, "dataPoint max");
    assert.strictEqual((metrics[0].dataPoints[0].value as Histogram).sum, 654321, "dataPoint sum");
    assert.strictEqual(
      metrics[0].dataPoints[0].attributes["cloudRoleInstance"],
      "testcloudRoleInstance"
    );
    assert.strictEqual(metrics[0].dataPoints[0].attributes["cloudRoleName"], "testcloudRoleName");
    assert.strictEqual(metrics[0].dataPoints[0].attributes["IsAutocollected"], "True");
    assert.strictEqual(metrics[0].dataPoints[0].attributes["metricId"], "requests/duration");
    assert.strictEqual(metrics[0].dataPoints[0].attributes["requestResultCode"], "200");
    assert.strictEqual(metrics[0].dataPoints[0].attributes["requestSuccess"], "True");

    assert.strictEqual((metrics[0].dataPoints[1].value as Histogram).count, 10, "dataPoint count");
    assert.strictEqual((metrics[0].dataPoints[1].value as Histogram).min, 0, "dataPoint min");
    assert.strictEqual((metrics[0].dataPoints[1].value as Histogram).max, 900000, "dataPoint max");
    assert.strictEqual((metrics[0].dataPoints[1].value as Histogram).sum, 4500000, "dataPoint sum");
    assert.strictEqual(
      metrics[0].dataPoints[1].attributes["cloudRoleInstance"],
      "testcloudRoleInstance"
    );
    assert.strictEqual(metrics[0].dataPoints[1].attributes["cloudRoleName"], "testcloudRoleName");
    assert.strictEqual(metrics[0].dataPoints[1].attributes["IsAutocollected"], "True");
    assert.strictEqual(metrics[0].dataPoints[1].attributes["metricId"], "requests/duration");
    assert.strictEqual(metrics[0].dataPoints[1].attributes["requestResultCode"], "400");
    assert.strictEqual(metrics[0].dataPoints[1].attributes["requestSuccess"], "False");

    // Dependencies
    assert.strictEqual(metrics[1].dataPoints.length, 2, "dataPoints count");
    assert.strictEqual((metrics[1].dataPoints[0].value as Histogram).count, 1, "dataPoint count");
    assert.strictEqual((metrics[1].dataPoints[0].value as Histogram).min, 123456, "dataPoint min");
    assert.strictEqual((metrics[1].dataPoints[0].value as Histogram).max, 123456, "dataPoint max");
    assert.strictEqual((metrics[1].dataPoints[0].value as Histogram).sum, 123456, "dataPoint sum");
    assert.strictEqual(metrics[1].dataPoints[0].attributes["metricId"], "dependencies/duration");
    assert.strictEqual(metrics[1].dataPoints[0].attributes["dependencyTarget"], "testPeerService");
    assert.strictEqual(metrics[1].dataPoints[0].attributes["dependencyResultCode"], "200");
    assert.strictEqual(metrics[1].dataPoints[0].attributes["dependencyType"], "http");
    assert.strictEqual(metrics[1].dataPoints[0].attributes["dependencySuccess"], "True");

    assert.strictEqual((metrics[1].dataPoints[1].value as Histogram).count, 10, "dataPoint count");
    assert.strictEqual((metrics[1].dataPoints[1].value as Histogram).min, 0, "dataPoint min");
    assert.strictEqual((metrics[1].dataPoints[1].value as Histogram).max, 900000, "dataPoint max");
    assert.strictEqual((metrics[1].dataPoints[1].value as Histogram).sum, 4500000, "dataPoint sum");
    assert.strictEqual(metrics[1].dataPoints[1].attributes["metricId"], "dependencies/duration");
    assert.strictEqual(metrics[1].dataPoints[1].attributes["dependencyTarget"], "testPeerService");
    assert.strictEqual(metrics[1].dataPoints[1].attributes["dependencyResultCode"], "400");
    assert.strictEqual(metrics[1].dataPoints[1].attributes["dependencyType"], "http");
    assert.strictEqual(metrics[1].dataPoints[1].attributes["dependencySuccess"], "False");

    // Exceptions
    assert.strictEqual(metrics[2].dataPoints.length, 1, "dataPoints count");
    assert.strictEqual(metrics[2].dataPoints[0].value, 1, "dataPoint value");
    assert.strictEqual(
      metrics[2].dataPoints[0].attributes["cloudRoleInstance"],
      "testcloudRoleInstance"
    );
    assert.strictEqual(metrics[2].dataPoints[0].attributes["cloudRoleName"], "testcloudRoleName");

    // Traces
    assert.strictEqual(metrics[3].dataPoints.length, 1, "dataPoints count");
    assert.strictEqual(metrics[3].dataPoints[0].value, 1, "dataPoint value");
    assert.strictEqual(
      metrics[3].dataPoints[0].attributes["cloudRoleInstance"],
      "testcloudRoleInstance"
    );
    assert.strictEqual(metrics[3].dataPoints[0].attributes["cloudRoleName"], "testcloudRoleName");
  });

  it("should set service name based on service namespace if provided", async () => {
    let resource = new Resource({});
    resource.attributes[SemanticResourceAttributes.SERVICE_NAMESPACE] = "testcloudRoleName";
    resource.attributes[SemanticResourceAttributes.SERVICE_NAME] = "serviceTestName";
    resource.attributes[SemanticResourceAttributes.SERVICE_INSTANCE_ID] = "testcloudRoleInstance";

    let loggerProvider = new LoggerProvider({ resource: resource });
    let logger = loggerProvider.getLogger("testLogger") as any;

    let traceLog = new LogRecord(
      logger["_sharedState"],
      { name: "test" },
      {
        body: "testMessage",
        timestamp: 123,
      }
    );
    autoCollect.recordLog(traceLog as any);
    traceLog.attributes["exception.type"] = "testExceptionType";
    autoCollect.recordLog(traceLog as any);

    let clientSpan: any = {
      kind: SpanKind.CLIENT,
      duration: [123456],
      attributes: {
        "http.status_code": 200,
      },
      resource: resource,
    };
    clientSpan.attributes[SemanticAttributes.PEER_SERVICE] = "testPeerService";
    autoCollect.recordSpan(clientSpan);

    await new Promise((resolve) => setTimeout(resolve, 120));

    assert.ok(exportStub.called);
    const resourceMetrics = exportStub.args[0][0];
    const scopeMetrics = resourceMetrics.scopeMetrics;
    assert.strictEqual(scopeMetrics.length, 1, "scopeMetrics count");
    const metrics = scopeMetrics[0].metrics;
    assert.strictEqual(
      metrics[2].dataPoints[0].attributes["cloudRoleName"],
      "testcloudRoleName.serviceTestName"
    );
  });

  it("should set depenedncy targets", () => {
    let attributes: Attributes;

    attributes = { [SemanticAttributes.HTTP_URL]: "http://testHttpHost" };
    assert.strictEqual(autoCollect["_getDependencyTarget"](attributes), "http://testHttpHost");

    attributes = { [SemanticAttributes.NET_PEER_NAME]: "testNetPeerName" };
    assert.strictEqual(autoCollect["_getDependencyTarget"](attributes), "testNetPeerName");

    attributes = { [SemanticAttributes.NET_PEER_IP]: "testNetPeerIp" };
    assert.strictEqual(autoCollect["_getDependencyTarget"](attributes), "testNetPeerIp");

    attributes = { "unknown.attribute": "value" };
    assert.strictEqual(autoCollect["_getDependencyTarget"](attributes), "");
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
