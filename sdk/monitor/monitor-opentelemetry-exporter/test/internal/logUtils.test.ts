// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import * as assert from "assert";
import { Resource } from "@opentelemetry/resources";
import {
  SemanticAttributes,
  SemanticResourceAttributes,
} from "@opentelemetry/semantic-conventions";

import { Tags, Properties, Measurements } from "../../src/types";
import { getInstance } from "../../src/platform";
import {
  AvailabilityData,
  KnownContextTagKeys,
  MessageData,
  MonitorDomain,
  PageViewData,
  TelemetryEventData,
  TelemetryExceptionData,
  TelemetryExceptionDetails,
} from "../../src/generated";
import { TelemetryItem as Envelope } from "../../src/generated";
import { ReadableLogRecord } from "@opentelemetry/sdk-logs";
import { logToEnvelope } from "../../src/utils/logUtils";
import { hrTimeToMilliseconds } from "@opentelemetry/core";
import { SeverityNumber } from "@opentelemetry/api-logs";
import { HrTime, TraceFlags } from "@opentelemetry/api";

const context = getInstance();

function assertEnvelope(
  envelope?: Envelope,
  name?: string,
  sampleRate?: number,
  baseType?: string,
  expectedProperties?: Properties,
  expectedMeasurements?: Measurements | undefined,
  expectedBaseData?: Partial<MonitorDomain>,
  expectedTime?: Date
): void {
  assert.ok(envelope);
  assert.strictEqual(envelope.name, name);
  assert.strictEqual(envelope.sampleRate, sampleRate);
  assert.deepStrictEqual(envelope.data?.baseType, baseType);

  assert.strictEqual(envelope.instrumentationKey, "ikey");
  assert.ok(envelope.time);
  assert.ok(envelope.version);
  assert.ok(envelope.data);

  if (expectedTime) {
    assert.deepStrictEqual(envelope.time, expectedTime);
  }

  const expectedServiceTags: Tags = {
    [KnownContextTagKeys.AiCloudRole]: "testServiceNamespace.testServiceName",
    [KnownContextTagKeys.AiCloudRoleInstance]: "testServiceInstanceID",
    [KnownContextTagKeys.AiOperationId]: "1f1008dc8e270e85c40a0d7c3939b278",
    [KnownContextTagKeys.AiOperationParentId]: "5e107261f64fa53e",
  };
  assert.deepStrictEqual(envelope.tags, {
    ...context.tags,
    ...expectedServiceTags,
  });
  assert.deepStrictEqual((envelope?.data?.baseData as any).properties, expectedProperties);
  assert.deepStrictEqual((envelope?.data?.baseData as any).measurements, expectedMeasurements);
  assert.deepStrictEqual(envelope.data?.baseData, expectedBaseData);
}

const emptyMeasurements: Measurements = {};

describe("logUtils.ts", () => {
  let testLogRecord: any = {
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_INSTANCE_ID]: "testServiceInstanceID",
      [SemanticResourceAttributes.SERVICE_NAME]: "testServiceName",
      [SemanticResourceAttributes.SERVICE_NAMESPACE]: "testServiceNamespace",
    }),
    instrumentationScope: {
      name: "scope_name_1",
      version: "0.1.0",
      schemaUrl: "http://url.to.schema",
    },
    hrTime: [1680253513, 123241635] as HrTime,
    hrTimeObserved: [1680253513, 123241635] as HrTime,
    attributes: {
      "some-attribute": "some attribute value",
    },
    severityNumber: SeverityNumber.INFO,
    severityText: "Information",
    body: "some_log_body",
    spanContext: {
      traceFlags: TraceFlags.SAMPLED,
      traceId: "1f1008dc8e270e85c40a0d7c3939b278",
      spanId: "5e107261f64fa53e",
    },
  };

  describe("#logToEnvelope", () => {
    it("should create a Message Envelope for Logs", () => {
      const expectedTime = new Date(hrTimeToMilliseconds(testLogRecord.hrTime));
      testLogRecord.body = "Test message";
      testLogRecord.severityLevel = "Information";
      testLogRecord.attributes = {
        "extra.attribute": "foo",
        [SemanticAttributes.MESSAGE_TYPE]: "test message type",
      };
      const expectedProperties = {
        "extra.attribute": "foo",
        [SemanticAttributes.MESSAGE_TYPE]: "test message type",
      };
      const expectedBaseData: Partial<MessageData> = {
        message: `Test message`,
        severityLevel: `Information`,
        version: 2,
        properties: expectedProperties,
        measurements: {},
      };

      const envelope = logToEnvelope(testLogRecord as ReadableLogRecord, "ikey");
      assertEnvelope(
        envelope,
        "Microsoft.ApplicationInsights.Message",
        100,
        "MessageData",
        expectedProperties,
        emptyMeasurements,
        expectedBaseData,
        expectedTime
      );
    });

    it("should create a TelemetryExceptionData Envelope for logs with exception attributes", () => {
      testLogRecord.body = "Test exception";
      testLogRecord.severityNumber = 22;

      const expectedTime = new Date(hrTimeToMilliseconds(testLogRecord.hrTime));
      testLogRecord.attributes = {
        "extra.attribute": "foo",
        [SemanticAttributes.EXCEPTION_TYPE]: "test exception type",
        [SemanticAttributes.EXCEPTION_MESSAGE]: "test exception message",
        [SemanticAttributes.EXCEPTION_STACKTRACE]: "test exception stack",
      };
      const expectedProperties = {
        "extra.attribute": "foo",
      };
      const expectedException: TelemetryExceptionDetails = {
        message: `test exception message`,
        hasFullStack: true,
        stack: `test exception stack`,
        typeName: `test exception type`,
      };

      const expectedBaseData: Partial<TelemetryExceptionData> = {
        exceptions: [expectedException],
        severityLevel: `Critical`,
        version: 2,
        properties: expectedProperties,
        measurements: {},
      };

      const envelope = logToEnvelope(testLogRecord as ReadableLogRecord, "ikey");
      assertEnvelope(
        envelope,
        "Microsoft.ApplicationInsights.Exception",
        100,
        "ExceptionData",
        expectedProperties,
        emptyMeasurements,
        expectedBaseData,
        expectedTime
      );
    });
  });

  describe("#legacyApplicationInsights logs", () => {
    it("should create a Message Envelope", () => {
      const data: MessageData = {
        message: "testMessage",
        severityLevel: "Verbose",
        version: 2,
      };
      testLogRecord.attributes = {
        "_MS.baseType": "MessageData",
        "extra.attribute": "foo",
        [SemanticAttributes.MESSAGE_TYPE]: "test message type",
      };
      testLogRecord.body = JSON.stringify(data);

      const expectedTime = new Date(hrTimeToMilliseconds(testLogRecord.hrTime));
      const expectedProperties = {
        "extra.attribute": "foo",
        [SemanticAttributes.MESSAGE_TYPE]: "test message type",
      };
      const expectedBaseData: Partial<MessageData> = {
        message: `testMessage`,
        severityLevel: `Verbose`,
        version: 2,
        properties: expectedProperties,
        measurements: {},
      };

      const envelope = logToEnvelope(testLogRecord as ReadableLogRecord, "ikey");
      assertEnvelope(
        envelope,
        "Microsoft.ApplicationInsights.Message",
        100,
        "MessageData",
        expectedProperties,
        emptyMeasurements,
        expectedBaseData,
        expectedTime
      );
    });

    it("should create a Exception Envelope", () => {
      const data: TelemetryExceptionData = {
        message: "testMessage",
        severityLevel: "Error",
        exceptions: [
          {
            message: "detailMessage",
            hasFullStack: false,
            typeName: "testType",
          },
        ],
        version: 2,
      };
      testLogRecord.attributes = {
        "_MS.baseType": "ExceptionData",
        "extra.attribute": "foo",
        [SemanticAttributes.MESSAGE_TYPE]: "test message type",
      };
      testLogRecord.body = JSON.stringify(data);
      const expectedTime = new Date(hrTimeToMilliseconds(testLogRecord.hrTime));
      const expectedProperties = {
        "extra.attribute": "foo",
        [SemanticAttributes.MESSAGE_TYPE]: "test message type",
      };
      const expectedBaseData: Partial<TelemetryExceptionData> = {
        message: `testMessage`,
        severityLevel: `Error`,
        exceptions: [
          {
            message: "detailMessage",
            hasFullStack: false,
            typeName: "testType",
          },
        ],
        version: 2,
        properties: expectedProperties,
        measurements: {},
      };

      const envelope = logToEnvelope(testLogRecord, "ikey");
      assertEnvelope(
        envelope,
        "Microsoft.ApplicationInsights.Exception",
        100,
        "ExceptionData",
        expectedProperties,
        emptyMeasurements,
        expectedBaseData,
        expectedTime
      );
    });

    it("should create a Availability Envelope", () => {
      const data: AvailabilityData = {
        id: "testId",
        name: "testName",
        duration: "123",
        success: true,
        runLocation: "testLocation",
        message: "testMessage",
        version: 2,
      };
      testLogRecord.attributes = {
        "_MS.baseType": "AvailabilityData",
        "extra.attribute": "foo",
        [SemanticAttributes.MESSAGE_TYPE]: "test message type",
      };
      testLogRecord.body = JSON.stringify(data);
      const expectedTime = new Date(hrTimeToMilliseconds(testLogRecord.hrTime));
      const expectedProperties = {
        "extra.attribute": "foo",
        [SemanticAttributes.MESSAGE_TYPE]: "test message type",
      };
      const expectedBaseData: Partial<AvailabilityData> = {
        id: "testId",
        name: "testName",
        duration: "123",
        success: true,
        runLocation: "testLocation",
        message: "testMessage",
        version: 2,
        properties: expectedProperties,
        measurements: {},
      };

      const envelope = logToEnvelope(testLogRecord as ReadableLogRecord, "ikey");
      assertEnvelope(
        envelope,
        "Microsoft.ApplicationInsights.Availability",
        100,
        "AvailabilityData",
        expectedProperties,
        emptyMeasurements,
        expectedBaseData,
        expectedTime
      );
    });

    it("should create a PageView Envelope", () => {
      const data: PageViewData = {
        id: "testId",
        name: "testName",
        duration: "123",
        url: "testUrl",
        referredUri: "testreferredUri",
        version: 2,
      };
      testLogRecord.attributes = {
        "_MS.baseType": "PageViewData",
        "extra.attribute": "foo",
        [SemanticAttributes.MESSAGE_TYPE]: "test message type",
      };
      testLogRecord.body = JSON.stringify(data);
      const expectedTime = new Date(hrTimeToMilliseconds(testLogRecord.hrTime));
      const expectedProperties = {
        "extra.attribute": "foo",
        [SemanticAttributes.MESSAGE_TYPE]: "test message type",
      };
      const expectedBaseData: PageViewData = {
        id: "testId",
        name: "testName",
        duration: "123",
        url: "testUrl",
        referredUri: "testreferredUri",
        version: 2,
        properties: expectedProperties,
        measurements: {},
      };

      const envelope = logToEnvelope(testLogRecord as ReadableLogRecord, "ikey");
      assertEnvelope(
        envelope,
        "Microsoft.ApplicationInsights.PageView",
        100,
        "PageViewData",
        expectedProperties,
        emptyMeasurements,
        expectedBaseData,
        expectedTime
      );
    });

    it("should create a Event Envelope", () => {
      const data: TelemetryEventData = {
        name: "testName",
        version: 2,
      };
      testLogRecord.attributes = {
        "_MS.baseType": "EventData",
        "extra.attribute": "foo",
        [SemanticAttributes.MESSAGE_TYPE]: "test message type",
      };
      testLogRecord.body = JSON.stringify(data);
      const expectedTime = new Date(hrTimeToMilliseconds(testLogRecord.hrTime));
      const expectedProperties = {
        "extra.attribute": "foo",
        [SemanticAttributes.MESSAGE_TYPE]: "test message type",
      };
      const expectedBaseData: TelemetryEventData = {
        name: "testName",
        version: 2,
        properties: expectedProperties,
        measurements: {},
      };

      const envelope = logToEnvelope(testLogRecord as ReadableLogRecord, "ikey");
      assertEnvelope(
        envelope,
        "Microsoft.ApplicationInsights.Event",
        100,
        "EventData",
        expectedProperties,
        emptyMeasurements,
        expectedBaseData,
        expectedTime
      );
    });
  });

  it("should parse objects if passed as the message field of a legacy ApplicationInsights log", () => {
    testLogRecord.attributes = {
      "_MS.baseType": "MessageData",
      "extra.attribute": "foo",
      [SemanticAttributes.MESSAGE_TYPE]: "test message type",
    };
    testLogRecord.body =
      '{"message":{"nested":{"nested2":{"test":"test"}}},"severityLevel":"Information","version":2}';
    const expectedTime = new Date(hrTimeToMilliseconds(testLogRecord.hrTime));
    const expectedProperties = {
      "extra.attribute": "foo",
      [SemanticAttributes.MESSAGE_TYPE]: "test message type",
    };
    const expectedBaseData: Partial<MessageData> = {
      message: '{"nested":{"nested2":{"test":"test"}}}',
      severityLevel: `Information`,
      version: 2,
      properties: expectedProperties,
      measurements: {},
    };

    const envelope = logToEnvelope(testLogRecord as ReadableLogRecord, "ikey");
    console.log("TEST ENVELOPE!!!", envelope);
    assertEnvelope(
      envelope,
      "Microsoft.ApplicationInsights.Message",
      100,
      "MessageData",
      expectedProperties,
      emptyMeasurements,
      expectedBaseData,
      expectedTime
    );
  });
});
