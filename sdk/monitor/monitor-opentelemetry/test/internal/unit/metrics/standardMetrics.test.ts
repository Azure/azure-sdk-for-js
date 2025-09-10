// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Attributes } from "@opentelemetry/api";
import { SpanKind, SpanStatusCode } from "@opentelemetry/api";
import type { Histogram } from "@opentelemetry/sdk-metrics";
import {
  SEMATTRS_HTTP_STATUS_CODE,
  SEMATTRS_NET_HOST_PORT,
  SEMATTRS_HTTP_USER_AGENT,
  SEMATTRS_NET_PEER_NAME,
  SEMATTRS_PEER_SERVICE,
  SEMRESATTRS_SERVICE_INSTANCE_ID,
  SEMRESATTRS_SERVICE_NAME,
  SEMRESATTRS_SERVICE_NAMESPACE,
  SEMRESATTRS_K8S_DEPLOYMENT_NAME,
  SEMRESATTRS_K8S_POD_NAME,
  ATTR_HTTP_RESPONSE_STATUS_CODE,
  ATTR_USER_AGENT_ORIGINAL,
  ATTR_CLIENT_ADDRESS,
  ATTR_SERVER_PORT,
} from "@opentelemetry/semantic-conventions";
import { ExportResultCode } from "@opentelemetry/core";
import type { SdkLogRecord } from "@opentelemetry/sdk-logs";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { StandardMetrics } from "../../../../src/metrics/standardMetrics.js";
import { InternalConfig } from "../../../../src/shared/index.js";
import { getDependencyTarget } from "../../../../src/metrics/utils.js";
import type { MockInstance } from "vitest";
import { expect, afterAll, afterEach, beforeAll, describe, it, vi, assert } from "vitest";

describe("#StandardMetricsHandler", () => {
  let exportStub: MockInstance<(typeof autoCollect)["_azureExporter"]["export"]>;
  let autoCollect: StandardMetrics;

  beforeAll(() => {
    const config = new InternalConfig();
    config.azureMonitorExporterOptions.connectionString =
      "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333;";
    autoCollect = new StandardMetrics(config, { collectionInterval: 100 });
    exportStub = vi.spyOn(autoCollect["_azureExporter"], "export").mockImplementation(
      (_, resultCallback) =>
        new Promise((resolve) => {
          resultCallback({
            code: ExportResultCode.SUCCESS,
          });
          resolve();
        }),
    );
  });

  afterEach(() => {
    exportStub.mockReset();
  });

  afterAll(() => {
    vi.restoreAllMocks();
    autoCollect.shutdown();
  });

  it("should use AKS attributes to populate common dimensions on standard metrics", async () => {
    const resource = resourceFromAttributes({});
    resource.attributes[SEMRESATTRS_K8S_DEPLOYMENT_NAME] = "k8sDeploymentName";
    resource.attributes[SEMRESATTRS_K8S_POD_NAME] = "k8sPodName";
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
    expect(exportStub).toHaveBeenCalled();

    const resourceMetrics = exportStub.mock.calls[0][0];
    const scopeMetrics = resourceMetrics.scopeMetrics;
    assert.strictEqual(scopeMetrics.length, 1, "scopeMetrics count");
    const metrics = scopeMetrics[0].metrics;
    assert.strictEqual(metrics[0].dataPoints[0].attributes["cloud/roleName"], "k8sDeploymentName");
    assert.strictEqual(metrics[0].dataPoints[0].attributes["cloud/roleInstance"], "k8sPodName");
  });

  it("should observe instruments during collection", async () => {
    const resource = resourceFromAttributes({});
    resource.attributes[SEMRESATTRS_SERVICE_NAME] = "testcloudRoleName";
    resource.attributes[SEMRESATTRS_SERVICE_INSTANCE_ID] = "testcloudRoleInstance";

    const traceLog: SdkLogRecord = {
      hrTime: [0, 123],
      hrTimeObserved: [0, 123],
      resource: resource,
      instrumentationScope: { name: "test" },
      attributes: { body: "testMessage" },
      droppedAttributesCount: 0,
      setAttribute: (key: string, value?: any) => {
        traceLog.attributes[key] = value;
        return traceLog;
      },
      setAttributes: (attributes: any) => {
        Object.assign(traceLog.attributes, attributes);
        return traceLog;
      },
      setBody: (body: any) => {
        traceLog.body = body;
        return traceLog;
      },
      setEventName: (eventName: string) => {
        traceLog.eventName = eventName;
        return traceLog;
      },
      setSeverityNumber: (severityNumber: any) => {
        traceLog.severityNumber = severityNumber;
        return traceLog;
      },
      setSeverityText: (severityText: string) => {
        traceLog.severityText = severityText;
        return traceLog;
      },
    };
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

    expect(exportStub).toHaveBeenCalled();
    const resourceMetrics = exportStub.mock.calls[0][0];
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
    const resource = resourceFromAttributes({});
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

    await new Promise((resolve) => setTimeout(resolve, 1500));
    expect(exportStub).toHaveBeenCalled();
    const resourceMetrics = exportStub.mock.calls[0][0];
    const scopeMetrics = resourceMetrics.scopeMetrics;
    assert.strictEqual(scopeMetrics.length, 1, "scopeMetrics count");
    const metrics = scopeMetrics[0].metrics;
    assert.strictEqual(metrics.length, 1, "metrics count");
    assert.strictEqual(metrics[0].descriptor.name, "requests/duration");
    assert.equal(metrics[0].dataPoints[0].attributes["operation/synthetic"], "True");
  });

  it("[new sem conv] should mark as synthetic if UserAgent is 'AlwaysOn'", async () => {
    const resource = resourceFromAttributes({});
    const serverSpan: any = {
      kind: SpanKind.SERVER,
      duration: [654321],
      status: { code: SpanStatusCode.OK },
      attributes: {
        [ATTR_HTTP_RESPONSE_STATUS_CODE]: 200,
        [ATTR_USER_AGENT_ORIGINAL]: "AlwaysOn",
      },
      resource: resource,
    };
    autoCollect.recordSpan(serverSpan);

    for (let i = 0; i < 10; i++) {
      serverSpan.duration[0] = i * 100000;
      autoCollect.recordSpan(serverSpan);
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));
    expect(exportStub).toHaveBeenCalled();
    const resourceMetrics = exportStub.mock.calls[0][0];
    const scopeMetrics = resourceMetrics.scopeMetrics;
    assert.strictEqual(scopeMetrics.length, 1, "scopeMetrics count");
    const metrics = scopeMetrics[0].metrics;
    assert.strictEqual(metrics.length, 1, "metrics count");
    assert.strictEqual(metrics[0].descriptor.name, "requests/duration");
    assert.equal(metrics[0].dataPoints[0].attributes["operation/synthetic"], "True");
  });

  it("should set service name based on service namespace if provided", async () => {
    const resource = resourceFromAttributes({});
    resource.attributes[SEMRESATTRS_SERVICE_NAMESPACE] = "testcloudRoleName";
    resource.attributes[SEMRESATTRS_SERVICE_NAME] = "serviceTestName";
    resource.attributes[SEMRESATTRS_SERVICE_INSTANCE_ID] = "testcloudRoleInstance";

    const traceLog: SdkLogRecord = {
      hrTime: [0, 123],
      hrTimeObserved: [0, 123],
      resource: resource,
      instrumentationScope: { name: "test" },
      attributes: { body: "testMessage" },
      droppedAttributesCount: 0,
      setAttribute: (key: string, value?: any) => {
        traceLog.attributes[key] = value;
        return traceLog;
      },
      setAttributes: (attributes: any) => {
        Object.assign(traceLog.attributes, attributes);
        return traceLog;
      },
      setBody: (body: any) => {
        traceLog.body = body;
        return traceLog;
      },
      setEventName: (eventName: string) => {
        traceLog.eventName = eventName;
        return traceLog;
      },
      setSeverityNumber: (severityNumber: any) => {
        traceLog.severityNumber = severityNumber;
        return traceLog;
      },
      setSeverityText: (severityText: string) => {
        traceLog.severityText = severityText;
        return traceLog;
      },
    };
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

    expect(exportStub).toHaveBeenCalled();
    const resourceMetrics = exportStub.mock.calls[0][0];
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

  it("[new sem conv] should set dependency targets", () => {
    let attributes: Attributes;

    attributes = { [SEMATTRS_PEER_SERVICE]: "TestService" };
    assert.strictEqual(getDependencyTarget(attributes), "TestService");

    attributes = { [ATTR_CLIENT_ADDRESS]: "test.com" };
    assert.strictEqual(getDependencyTarget(attributes), "test.com");

    attributes = { [ATTR_CLIENT_ADDRESS]: "test.com", [ATTR_SERVER_PORT]: "8080" };
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
    expect(exportStub).not.toHaveBeenCalled();
  });

  it("should calculate even if telemetry is sampled out", async () => {
    autoCollect.shutdown();
    await new Promise((resolve) => setTimeout(resolve, 120));
    expect(exportStub).not.toHaveBeenCalled();
  });
});
