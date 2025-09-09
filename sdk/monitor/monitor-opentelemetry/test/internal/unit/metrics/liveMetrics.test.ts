// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SpanKind, SpanStatusCode } from "@opentelemetry/api";
import { ExportResultCode, millisToHrTime } from "@opentelemetry/core";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { createMockSdkLogRecord } from "../../../utils/breezeTestUtils.js";
import { LiveMetrics } from "../../../../src/metrics/quickpulse/liveMetrics.js";
import { InternalConfig } from "../../../../src/shared/index.js";
import {
  QuickPulseMetricNames,
  QuickPulseOpenTelemetryMetricNames,
} from "../../../../src/metrics/quickpulse/types.js";
import type { Exception, RemoteDependency, Request } from "../../../../src/generated/index.js";
import type { AccessToken, TokenCredential } from "@azure/core-auth";
import { resourceMetricsToQuickpulseDataPoint } from "../../../../src/metrics/quickpulse/utils.js";
import {
  ATTR_HTTP_REQUEST_METHOD,
  ATTR_HTTP_RESPONSE_STATUS_CODE,
  ATTR_URL_FULL,
} from "@opentelemetry/semantic-conventions";
import type { MockInstance } from "vitest";
import { afterEach, assert, beforeEach, describe, expect, it, vi } from "vitest";

/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
describe("#LiveMetrics", () => {
  let exportStub: MockInstance<(typeof autoCollect)["quickpulseExporter"]["export"]>;
  let autoCollect: LiveMetrics;

  beforeEach(() => {
    const config = new InternalConfig();
    config.azureMonitorExporterOptions.connectionString =
      "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333;";
    autoCollect = new LiveMetrics(config);
    exportStub = vi.spyOn(autoCollect["quickpulseExporter"], "export").mockImplementation(
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
    autoCollect.shutdown();
    vi.restoreAllMocks();
  });

  it("should observe instruments during collection", async () => {
    autoCollect["isCollectingData"] = true;
    autoCollect.activateMetrics({ collectionInterval: 100 });

    const resource = resourceFromAttributes({});
    const traceLog = createMockSdkLogRecord(
      resource,
      { name: "test" },
      {
        body: "testMessage",
      },
    );
    autoCollect.recordLog(traceLog as any);

    // Create separate exception logs
    for (let i = 0; i < 5; i++) {
      const exceptionLog = createMockSdkLogRecord(
        resource,
        { name: "test" },
        {
          body: "testMessage",
        },
      );
      exceptionLog.attributes["exception.type"] = "testExceptionType";
      exceptionLog.attributes["exception.message"] = "testExceptionMessage";
      autoCollect.recordLog(exceptionLog as any);
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

    const noUrlClientSpan: any = {
      name: "test-name",
      kind: SpanKind.SERVER,
      duration: millisToHrTime(12345678),
      attributes: {
        "http.status_code": 200,
        "http.method": "GET",
        customAttribute: "test",
      },
      status: {
        code: SpanStatusCode.OK,
      },
    };
    autoCollect.recordSpan(noUrlClientSpan);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(exportStub).toHaveBeenCalled();
    const resourceMetrics = exportStub.mock.calls[0][0];
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
    // ( (98765432 * 2) + (100000 * 4) + 12345678 /7)
    assert.strictEqual(
      (metrics[0].dataPoints[0].value as number).toFixed(2),
      "30039506.00",
      "REQUEST_DURATION value",
    );
    assert.strictEqual(metrics[1].descriptor.name, QuickPulseOpenTelemetryMetricNames.REQUEST_RATE);
    assert.strictEqual(metrics[1].dataPoints.length, 1, "dataPoints count");
    assert.isAbove(metrics[1].dataPoints[0].value as number, 0, "REQUEST_RATE value");
    assert.strictEqual(
      metrics[2].descriptor.name,
      QuickPulseOpenTelemetryMetricNames.REQUEST_FAILURE_RATE,
    );
    assert.strictEqual(metrics[2].dataPoints.length, 1, "dataPoints count");
    assert.isAbove(metrics[2].dataPoints[0].value as number, 0, "REQUEST_FAILURE_RATE value");
    assert.strictEqual(
      metrics[3].descriptor.name,
      QuickPulseOpenTelemetryMetricNames.DEPENDENCY_DURATION,
    );
    assert.strictEqual(metrics[3].dataPoints.length, 1, "dataPoints count");
    // (12345678 + (900000 * 3)/4)
    assert.strictEqual(
      (metrics[3].dataPoints[0].value as number).toFixed(2),
      "3761419.50",
      "DEPENDENCY_DURATION value",
    );
    assert.strictEqual(
      metrics[4].descriptor.name,
      QuickPulseOpenTelemetryMetricNames.DEPENDENCY_RATE,
    );
    assert.strictEqual(metrics[4].dataPoints.length, 1, "dataPoints count");
    assert.isAbove(metrics[4].dataPoints[0].value as number, 0, "DEPENDENCY_RATE value");
    assert.strictEqual(
      metrics[5].descriptor.name,
      QuickPulseOpenTelemetryMetricNames.DEPENDENCY_FAILURE_RATE,
    );
    assert.strictEqual(metrics[5].dataPoints.length, 1, "dataPoints count");
    assert.isAbove(metrics[5].dataPoints[0].value as number, 0, "DEPENDENCY_FAILURE_RATE value");
    assert.strictEqual(
      metrics[6].descriptor.name,
      QuickPulseOpenTelemetryMetricNames.PHYSICAL_BYTES,
    );
    assert.strictEqual(metrics[6].dataPoints.length, 1, "dataPoints count");
    assert.isAbove(metrics[6].dataPoints[0].value as number, 0, "PHYSICAL_BYTES value");
    assert.strictEqual(
      metrics[7].descriptor.name,
      QuickPulseOpenTelemetryMetricNames.PROCESSOR_TIME_NORMALIZED,
    );
    assert.strictEqual(metrics[7].dataPoints.length, 1, "dataPoints count");
    assert.isAtLeast(
      metrics[7].dataPoints[0].value as number,
      0,
      "PROCESSOR_TIME_NORMALIZED value",
    );
    assert.strictEqual(
      metrics[8].descriptor.name,
      QuickPulseOpenTelemetryMetricNames.EXCEPTION_RATE,
    );
    assert.strictEqual(metrics[8].dataPoints.length, 1, "dataPoints count");
    assert.isAbove(metrics[8].dataPoints[0].value as number, 0, "EXCEPTION_RATE value");

    // Validate documents
    const documents = autoCollect.getDocuments();
    assert.strictEqual(documents.length, 17, "documents count");
    // assert.strictEqual(JSON.stringify(documents), "documents count");
    assert.strictEqual(documents[0].documentType, "Trace");
    assert.strictEqual(documents[0].properties?.length, 0);
    for (let i = 1; i < 5; i++) {
      assert.strictEqual(documents[i].documentType, "Exception");
      assert.strictEqual((documents[i] as Exception).exceptionType, "testExceptionType");
      assert.strictEqual((documents[i] as Exception).exceptionMessage, "testExceptionMessage");
      assert.strictEqual(documents[i].properties?.length, 0);
    }
    const dependencyDoc6 = documents[6] as RemoteDependency;
    assert.strictEqual(dependencyDoc6.documentType, "RemoteDependency");
    assert.strictEqual(dependencyDoc6.commandName, "http://test.com");
    assert.strictEqual(dependencyDoc6.resultCode, "200");
    assert.strictEqual(dependencyDoc6.duration, "PT12345.678S");
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
    // Ensure that requests with no URL don't throw
    const requestDoc16 = documents[16] as Request;
    assert.strictEqual(requestDoc16.url, "");
    assert.strictEqual(requestDoc16.name, "test-name");
    assert.strictEqual(requestDoc16.responseCode, "200");
    assert.strictEqual(requestDoc16.duration, "PT12345.678S");
    assert.equal((requestDoc16.properties as any)[0].key, "customAttribute");
    assert.equal((requestDoc16.properties as any)[0].value, "test");

    // testing that the old/new names for the perf counters appear in the monitoring data point,
    // with the values of the process counters
    const monitoringDataPoints = resourceMetricsToQuickpulseDataPoint(
      resourceMetrics,
      autoCollect["quickpulseExporter"]["baseMonitoringDataPoint"],
      documents,
      [],
      new Map<string, number>(),
    );
    assert.ok(monitoringDataPoints[0].metrics?.length === 11);
    assert.ok(
      monitoringDataPoints[0].metrics![6].name === QuickPulseMetricNames.PHYSICAL_BYTES.toString(),
    );
    assert.ok(monitoringDataPoints[0].metrics![6].value > 0);
    assert.ok(
      monitoringDataPoints[0].metrics![7].name === QuickPulseMetricNames.COMMITTED_BYTES.toString(),
    );
    assert.ok(
      monitoringDataPoints[0].metrics![7].value === monitoringDataPoints[0].metrics![6].value,
    );
    assert.ok(
      monitoringDataPoints[0].metrics![8].name ===
        QuickPulseMetricNames.PROCESSOR_TIME_NORMALIZED.toString(),
    );
    assert.ok(monitoringDataPoints[0].metrics![8].value >= 0);
    assert.ok(
      monitoringDataPoints[0].metrics![9].name === QuickPulseMetricNames.PROCESSOR_TIME.toString(),
    );
    assert.ok(
      monitoringDataPoints[0].metrics![9].value === monitoringDataPoints[0].metrics![8].value,
    );
  });

  it("[new sem conv] should observe instruments during collection", async () => {
    autoCollect["isCollectingData"] = true;
    autoCollect.activateMetrics({ collectionInterval: 100 });

    const resource = resourceFromAttributes({});
    const traceLog = createMockSdkLogRecord(
      resource,
      { name: "test" },
      {
        body: "testMessage",
      },
    );
    autoCollect.recordLog(traceLog as any);

    // Create separate exception logs
    for (let i = 0; i < 5; i++) {
      const exceptionLog = createMockSdkLogRecord(
        resource,
        { name: "test" },
        {
          body: "testMessage",
        },
      );
      exceptionLog.attributes["exception.type"] = "testExceptionType";
      exceptionLog.attributes["exception.message"] = "testExceptionMessage";
      autoCollect.recordLog(exceptionLog as any);
    }
    const clientSpan: any = {
      kind: SpanKind.CLIENT,
      duration: millisToHrTime(12345678),
      attributes: {
        [ATTR_HTTP_RESPONSE_STATUS_CODE]: 200,
        [ATTR_HTTP_REQUEST_METHOD]: "GET",
        [ATTR_URL_FULL]: "http://test.com",
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
        [ATTR_HTTP_RESPONSE_STATUS_CODE]: 200,
        [ATTR_HTTP_REQUEST_METHOD]: "GET",
        [ATTR_URL_FULL]: "http://test.com",
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
    clientSpan.attributes[ATTR_HTTP_RESPONSE_STATUS_CODE] = "400";
    clientSpan.duration = millisToHrTime(900000);
    clientSpan.status.code = SpanStatusCode.ERROR;
    for (let i = 0; i < 3; i++) {
      autoCollect.recordSpan(clientSpan);
    }

    serverSpan.duration = millisToHrTime(100000);
    serverSpan.attributes[ATTR_HTTP_RESPONSE_STATUS_CODE] = "400";
    serverSpan.status.code = SpanStatusCode.ERROR;
    for (let i = 0; i < 4; i++) {
      autoCollect.recordSpan(serverSpan);
    }

    const noUrlClientSpan: any = {
      name: "test-name",
      kind: SpanKind.SERVER,
      duration: millisToHrTime(12345678),
      attributes: {
        [ATTR_HTTP_RESPONSE_STATUS_CODE]: 200,
        [ATTR_HTTP_REQUEST_METHOD]: "GET",
        customAttribute: "test",
      },
      status: {
        code: SpanStatusCode.OK,
      },
    };
    autoCollect.recordSpan(noUrlClientSpan);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(exportStub).toHaveBeenCalled();
    const resourceMetrics = exportStub.mock.calls[0][0];
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
    // ( (98765432 * 2) + (100000 * 4) + 12345678 /7)
    assert.strictEqual(
      (metrics[0].dataPoints[0].value as number).toFixed(2),
      "30039506.00",
      "REQUEST_DURATION value",
    );
    assert.strictEqual(metrics[1].descriptor.name, QuickPulseOpenTelemetryMetricNames.REQUEST_RATE);
    assert.strictEqual(metrics[1].dataPoints.length, 1, "dataPoints count");
    assert.isAbove(metrics[1].dataPoints[0].value as number, 0, "REQUEST_RATE value");
    assert.strictEqual(
      metrics[2].descriptor.name,
      QuickPulseOpenTelemetryMetricNames.REQUEST_FAILURE_RATE,
    );
    assert.strictEqual(metrics[2].dataPoints.length, 1, "dataPoints count");
    assert.isAbove(metrics[2].dataPoints[0].value as number, 0, "REQUEST_FAILURE_RATE value");
    assert.strictEqual(
      metrics[3].descriptor.name,
      QuickPulseOpenTelemetryMetricNames.DEPENDENCY_DURATION,
    );
    assert.strictEqual(metrics[3].dataPoints.length, 1, "dataPoints count");
    // (12345678 + (900000 * 3)/4)
    assert.strictEqual(
      (metrics[3].dataPoints[0].value as number).toFixed(2),
      "3761419.50",
      "DEPENDENCY_DURATION value",
    );
    assert.strictEqual(
      metrics[4].descriptor.name,
      QuickPulseOpenTelemetryMetricNames.DEPENDENCY_RATE,
    );
    assert.strictEqual(metrics[4].dataPoints.length, 1, "dataPoints count");
    assert.isAbove(metrics[4].dataPoints[0].value as number, 0, "DEPENDENCY_RATE value");
    assert.strictEqual(
      metrics[5].descriptor.name,
      QuickPulseOpenTelemetryMetricNames.DEPENDENCY_FAILURE_RATE,
    );
    assert.strictEqual(metrics[5].dataPoints.length, 1, "dataPoints count");
    assert.isAbove(metrics[5].dataPoints[0].value as number, 0, "DEPENDENCY_FAILURE_RATE value");
    assert.strictEqual(
      metrics[6].descriptor.name,
      QuickPulseOpenTelemetryMetricNames.PHYSICAL_BYTES,
    );
    assert.strictEqual(metrics[6].dataPoints.length, 1, "dataPoints count");
    assert.isAbove(metrics[6].dataPoints[0].value as number, 0, "PHYSICAL_BYTES value");
    assert.strictEqual(
      metrics[7].descriptor.name,
      QuickPulseOpenTelemetryMetricNames.PROCESSOR_TIME_NORMALIZED,
    );
    assert.strictEqual(metrics[7].dataPoints.length, 1, "dataPoints count");
    assert.isAtLeast(
      metrics[7].dataPoints[0].value as number,
      0,
      "PROCESSOR_TIME_NORMALIZED value",
    );
    assert.strictEqual(
      metrics[8].descriptor.name,
      QuickPulseOpenTelemetryMetricNames.EXCEPTION_RATE,
    );
    assert.strictEqual(metrics[8].dataPoints.length, 1, "dataPoints count");
    assert.isAbove(metrics[8].dataPoints[0].value as number, 0, "EXCEPTION_RATE value");

    // Validate documents
    const documents = autoCollect.getDocuments();
    assert.strictEqual(documents.length, 17, "documents count");
    // assert.strictEqual(JSON.stringify(documents), "documents count");
    assert.strictEqual(documents[0].documentType, "Trace");
    assert.strictEqual(documents[0].properties?.length, 0);
    for (let i = 1; i < 5; i++) {
      assert.strictEqual(documents[i].documentType, "Exception");
      assert.strictEqual((documents[i] as Exception).exceptionType, "testExceptionType");
      assert.strictEqual((documents[i] as Exception).exceptionMessage, "testExceptionMessage");
      assert.strictEqual(documents[i].properties?.length, 0);
    }
    const dependencyDoc6 = documents[6] as RemoteDependency;
    assert.strictEqual(dependencyDoc6.documentType, "RemoteDependency");
    assert.strictEqual(dependencyDoc6.commandName, "http://test.com");
    assert.strictEqual(dependencyDoc6.resultCode, "200");
    assert.strictEqual(dependencyDoc6.duration, "PT12345.678S");
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
    // Ensure that requests with no URL don't throw
    const requestDoc16 = documents[16] as Request;
    assert.strictEqual(requestDoc16.url, "");
    assert.strictEqual(requestDoc16.name, "test-name");
    assert.strictEqual(requestDoc16.responseCode, "200");
    assert.strictEqual(requestDoc16.duration, "PT12345.678S");
    assert.equal((requestDoc16.properties as any)[0].key, "customAttribute");
    assert.equal((requestDoc16.properties as any)[0].value, "test");

    // testing that the old/new names for the perf counters appear in the monitoring data point,
    // with the values of the process counters
    const monitoringDataPoints = resourceMetricsToQuickpulseDataPoint(
      resourceMetrics,
      autoCollect["quickpulseExporter"]["baseMonitoringDataPoint"],
      documents,
      [],
      new Map<string, number>(),
    );
    assert.ok(monitoringDataPoints[0].metrics?.length === 11);
    assert.ok(
      monitoringDataPoints[0].metrics![6].name === QuickPulseMetricNames.PHYSICAL_BYTES.toString(),
    );
    assert.ok(monitoringDataPoints[0].metrics![6].value > 0);
    assert.ok(
      monitoringDataPoints[0].metrics![7].name === QuickPulseMetricNames.COMMITTED_BYTES.toString(),
    );
    assert.ok(
      monitoringDataPoints[0].metrics![7].value === monitoringDataPoints[0].metrics![6].value,
    );
    assert.ok(
      monitoringDataPoints[0].metrics![8].name ===
        QuickPulseMetricNames.PROCESSOR_TIME_NORMALIZED.toString(),
    );
    assert.ok(monitoringDataPoints[0].metrics![8].value >= 0);
    assert.ok(
      monitoringDataPoints[0].metrics![9].name === QuickPulseMetricNames.PROCESSOR_TIME.toString(),
    );
    assert.ok(
      monitoringDataPoints[0].metrics![9].value === monitoringDataPoints[0].metrics![8].value,
    );
  });

  it("should retrieve meter provider", () => {
    autoCollect.activateMetrics();
    assert.ok(autoCollect.getMeterProvider());
  });

  it("should not collect when disabled", async () => {
    autoCollect.deactivateMetrics();
    await new Promise((resolve) => setTimeout(resolve, 120));
    expect(exportStub).not.toHaveBeenCalled();
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
  it("support credential scopes from connection string", () => {
    const testConfig = new InternalConfig();
    const testCredential = {
      getToken() {
        const accessToken = {
          token: "testToken",
          expiresOnTimestamp: Date.now() + 10000,
        };
        return Promise.resolve(accessToken);
      },
    };
    testConfig.azureMonitorExporterOptions.connectionString =
      "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333;LiveEndpoint=https://westus2.livediagnostics.monitor.azure.com/;AADAudience=testScope1";
    testConfig.azureMonitorExporterOptions.credential = testCredential;
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
      "testScope1",
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
      "testScope1",
    );
  });
});
/* eslint-enable @typescript-eslint/no-unnecessary-type-assertion */
