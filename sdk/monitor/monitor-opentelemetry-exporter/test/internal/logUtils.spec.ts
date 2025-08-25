// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  SEMRESATTRS_SERVICE_INSTANCE_ID,
  SEMRESATTRS_SERVICE_NAME,
  SEMRESATTRS_SERVICE_NAMESPACE,
  SEMATTRS_EXCEPTION_TYPE,
  SEMATTRS_MESSAGE_TYPE,
  SEMATTRS_EXCEPTION_MESSAGE,
  SEMATTRS_EXCEPTION_STACKTRACE,
  ATTR_CLIENT_ADDRESS,
  ATTR_NETWORK_PEER_ADDRESS,
  SEMATTRS_NET_PEER_IP,
  SEMATTRS_HTTP_CLIENT_IP,
} from "@opentelemetry/semantic-conventions";
import type { Tags, Properties, Measurements } from "../../src/types.js";
import { experimentalOpenTelemetryValues, MaxPropertyLengths } from "../../src/types.js";
import { getInstance } from "../../src/platform/index.js";
import type {
  AvailabilityData,
  MessageData,
  MonitorDomain,
  PageViewData,
  TelemetryEventData,
  TelemetryExceptionData,
  TelemetryExceptionDetails,
} from "../../src/generated/index.js";
import { KnownContextTagKeys } from "../../src/generated/index.js";
import type { TelemetryItem as Envelope } from "../../src/generated/index.js";
import type { ReadableLogRecord } from "@opentelemetry/sdk-logs";
import { logToEnvelope } from "../../src/utils/logUtils.js";
import { SeverityNumber } from "@opentelemetry/api-logs";
import type { HrTime } from "@opentelemetry/api";
import { TraceFlags } from "@opentelemetry/api";
import { hrTimeToDate } from "../../src/utils/common.js";
import { describe, it, assert } from "vitest";
import { resourceFromAttributes } from "@opentelemetry/resources";

const context = getInstance();

const expectedServiceTagsBase: Tags = {
  [KnownContextTagKeys.AiCloudRole]: "testServiceNamespace.testServiceName",
  [KnownContextTagKeys.AiCloudRoleInstance]: "testServiceInstanceID",
  [KnownContextTagKeys.AiOperationId]: "1f1008dc8e270e85c40a0d7c3939b278",
  [KnownContextTagKeys.AiOperationParentId]: "5e107261f64fa53e",
};

function assertEnvelope(
  envelope?: Envelope,
  name?: string,
  sampleRate?: number,
  baseType?: string,
  expectedProperties?: Properties,
  expectedMeasurements?: Measurements,
  expectedBaseData?: Partial<MonitorDomain>,
  expectedTime?: Date,
  expectedServiceTags: Tags = expectedServiceTagsBase,
): void {
  assert.isDefined(envelope);
  assert.strictEqual(envelope?.name, name);
  assert.strictEqual(envelope?.sampleRate, sampleRate);
  assert.deepStrictEqual(envelope?.data?.baseType, baseType);

  assert.strictEqual(envelope?.instrumentationKey, "ikey");
  assert.ok(envelope?.time);
  assert.ok(envelope?.version);
  assert.ok(envelope?.data);

  if (expectedTime) {
    assert.deepStrictEqual(envelope?.time, expectedTime);
  }

  assert.deepStrictEqual(envelope?.tags, {
    ...context.tags,
    ...expectedServiceTags,
    [KnownContextTagKeys.AiOperationSyntheticSource]: "True",
  });
  assert.deepStrictEqual((envelope?.data?.baseData as any).properties, expectedProperties);
  assert.deepStrictEqual((envelope?.data?.baseData as any).measurements, expectedMeasurements);
  assert.deepStrictEqual(envelope?.data?.baseData, expectedBaseData);
}

const emptyMeasurements: Measurements = {};

describe("logUtils.ts", () => {
  const testLogRecord: any = {
    resource: resourceFromAttributes({
      [SEMRESATTRS_SERVICE_INSTANCE_ID]: "testServiceInstanceID",
      [SEMRESATTRS_SERVICE_NAME]: "testServiceName",
      [SEMRESATTRS_SERVICE_NAMESPACE]: "testServiceNamespace",
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
      [ATTR_CLIENT_ADDRESS]: "127.0.0.1",
      [experimentalOpenTelemetryValues.SYNTHETIC_TYPE]: "bot",
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
      const expectedTime = hrTimeToDate(testLogRecord.hrTime);
      testLogRecord.body = "Test message";
      testLogRecord.severityLevel = "Information";
      testLogRecord.attributes = {
        "extra.attribute": "foo",
        [SEMATTRS_MESSAGE_TYPE]: "test message type",
        [ATTR_NETWORK_PEER_ADDRESS]: "127.0.0.1",
        [experimentalOpenTelemetryValues.SYNTHETIC_TYPE]: "test",
      };
      const expectedProperties = {
        "extra.attribute": "foo",
        [SEMATTRS_MESSAGE_TYPE]: "test message type",
      };
      const expectedBaseData: Partial<MessageData> = {
        message: `Test message`,
        severityLevel: `Information`,
        version: 2,
        properties: expectedProperties,
        measurements: emptyMeasurements,
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
        expectedTime,
        expectedServiceTagsBase,
      );
    });

    it("should not populate synthetic source on envelope if synthetic type is not defined", () => {
      testLogRecord.body = "Test message";
      testLogRecord.severityLevel = "Information";
      testLogRecord.attributes = {
        "extra.attribute": "foo",
        [SEMATTRS_MESSAGE_TYPE]: "test message type",
        [ATTR_NETWORK_PEER_ADDRESS]: "127.0.0.1",
        [experimentalOpenTelemetryValues.SYNTHETIC_TYPE]: "",
      };

      const envelope = logToEnvelope(testLogRecord as ReadableLogRecord, "ikey");
      assert.deepStrictEqual(envelope?.tags, {
        ...context.tags,
        ...expectedServiceTagsBase,
      });
    });

    it("should create a TelemetryExceptionData Envelope for logs with exception attributes", () => {
      testLogRecord.body = "Test exception";
      testLogRecord.severityNumber = 22;

      const expectedTime = hrTimeToDate(testLogRecord.hrTime);
      testLogRecord.attributes = {
        "extra.attribute": "foo",
        [SEMATTRS_EXCEPTION_TYPE]: "test exception type",
        [SEMATTRS_EXCEPTION_MESSAGE]: "test exception message",
        [SEMATTRS_EXCEPTION_STACKTRACE]: "test exception stack",
        [SEMATTRS_NET_PEER_IP]: "127.0.0.1",
        [experimentalOpenTelemetryValues.SYNTHETIC_TYPE]: "bot",
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
        expectedTime,
        expectedServiceTagsBase,
      );
    });
  });

  describe("#legacyApplicationInsights logs", () => {
    it("should create a Message Envelope", () => {
      const data: MessageData = {
        message: "testMessage",
        severityLevel: "Verbose",
        measurements: { testMeasurement: 1 },
        version: 2,
      };
      testLogRecord.attributes = {
        "_MS.baseType": "MessageData",
        "extra.attribute": "foo",
        [SEMATTRS_MESSAGE_TYPE]: "test message type",
        [ATTR_CLIENT_ADDRESS]: "127.0.0.1",
        [experimentalOpenTelemetryValues.SYNTHETIC_TYPE]: "bot",
      };
      testLogRecord.body = data;

      const expectedTime = hrTimeToDate(testLogRecord.hrTime);
      const expectedProperties = {
        "extra.attribute": "foo",
        [SEMATTRS_MESSAGE_TYPE]: "test message type",
      };
      const expectedMeasurements: Measurements = {
        testMeasurement: 1,
      };
      const expectedBaseData: Partial<MessageData> = {
        message: `testMessage`,
        severityLevel: `Verbose`,
        version: 2,
        properties: expectedProperties,
        measurements: expectedMeasurements,
      };

      const envelope = logToEnvelope(testLogRecord as ReadableLogRecord, "ikey");
      assertEnvelope(
        envelope,
        "Microsoft.ApplicationInsights.Message",
        100,
        "MessageData",
        expectedProperties,
        expectedMeasurements,
        expectedBaseData,
        expectedTime,
        expectedServiceTagsBase,
      );
    });

    it("should truncate properties of a Message Envelope", () => {
      const data: MessageData = {
        message: "a".repeat(MaxPropertyLengths.FIFTEEN_BIT + 1),
        severityLevel: "Verbose",
        measurements: { testMeasurement: 1 },
        version: 2,
      };
      testLogRecord.attributes = {
        "_MS.baseType": "MessageData",
        "extra.attribute": "foo",
        [SEMATTRS_MESSAGE_TYPE]: "test message type",
        [ATTR_CLIENT_ADDRESS]: "127.0.0.1",
        [experimentalOpenTelemetryValues.SYNTHETIC_TYPE]: "bot",
      };
      testLogRecord.body = data;

      const expectedTime = hrTimeToDate(testLogRecord.hrTime);
      const expectedProperties = {
        "extra.attribute": "foo",
        [SEMATTRS_MESSAGE_TYPE]: "test message type",
      };
      const expectedMeasurements: Measurements = {
        testMeasurement: 1,
      };
      const expectedBaseData: Partial<MessageData> = {
        message: "a".repeat(MaxPropertyLengths.FIFTEEN_BIT),
        severityLevel: `Verbose`,
        version: 2,
        properties: expectedProperties,
        measurements: expectedMeasurements,
      };

      const envelope = logToEnvelope(testLogRecord as ReadableLogRecord, "ikey");
      assertEnvelope(
        envelope,
        "Microsoft.ApplicationInsights.Message",
        100,
        "MessageData",
        expectedProperties,
        expectedMeasurements,
        expectedBaseData,
        expectedTime,
        expectedServiceTagsBase,
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
        [SEMATTRS_MESSAGE_TYPE]: "test message type",
        [SEMATTRS_HTTP_CLIENT_IP]: "127.0.0.1",
        [experimentalOpenTelemetryValues.SYNTHETIC_TYPE]: "bot",
      };
      testLogRecord.body = data;
      const expectedTime = hrTimeToDate(testLogRecord.hrTime);
      const expectedProperties = {
        "extra.attribute": "foo",
        [SEMATTRS_MESSAGE_TYPE]: "test message type",
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
        expectedTime,
        expectedServiceTagsBase,
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
        [SEMATTRS_MESSAGE_TYPE]: "test message type",
        [SEMATTRS_HTTP_CLIENT_IP]: "127.0.0.1",
        [experimentalOpenTelemetryValues.SYNTHETIC_TYPE]: "bot",
      };
      testLogRecord.body = data;
      const expectedTime = hrTimeToDate(testLogRecord.hrTime);
      const expectedProperties = {
        "extra.attribute": "foo",
        [SEMATTRS_MESSAGE_TYPE]: "test message type",
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
        expectedTime,
        expectedServiceTagsBase,
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
        [SEMATTRS_MESSAGE_TYPE]: "test message type",
        [SEMATTRS_HTTP_CLIENT_IP]: "127.0.0.1",
        [experimentalOpenTelemetryValues.SYNTHETIC_TYPE]: "bot",
      };
      testLogRecord.body = data;
      const expectedTime = hrTimeToDate(testLogRecord.hrTime);
      const expectedProperties = {
        "extra.attribute": "foo",
        [SEMATTRS_MESSAGE_TYPE]: "test message type",
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
        expectedTime,
        expectedServiceTagsBase,
      );
    });

    it("should create an Event Envelope", () => {
      const data: TelemetryEventData = {
        name: "testName",
        version: 2,
      };
      testLogRecord.attributes = {
        "_MS.baseType": "EventData",
        "extra.attribute": "foo",
        [SEMATTRS_MESSAGE_TYPE]: "test message type",
        [SEMATTRS_HTTP_CLIENT_IP]: "127.0.0.1",
        [experimentalOpenTelemetryValues.SYNTHETIC_TYPE]: "bot",
      };
      testLogRecord.body = data;
      const expectedTime = hrTimeToDate(testLogRecord.hrTime);
      const expectedProperties = {
        "extra.attribute": "foo",
        [SEMATTRS_MESSAGE_TYPE]: "test message type",
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
        expectedTime,
        expectedServiceTagsBase,
      );
    });

    it("should create a Custom Event Envelope", () => {
      testLogRecord.attributes = {
        "microsoft.custom_event.name": "testing name",
        "extra.attribute": "foo",
        [ATTR_CLIENT_ADDRESS]: "127.0.0.1",
        [experimentalOpenTelemetryValues.SYNTHETIC_TYPE]: "bot",
      };
      const expectedTime = hrTimeToDate(testLogRecord.hrTime);
      const expectedProperties = {
        "extra.attribute": "foo",
      };
      const expectedBaseData: TelemetryEventData = {
        name: "testing name",
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
        expectedTime,
        expectedServiceTagsBase,
      );
    });
  });

  it("should parse objects if passed as the message field of a legacy ApplicationInsights log", () => {
    testLogRecord.attributes = {
      "_MS.baseType": "MessageData",
      "extra.attribute": "foo",
      [SEMATTRS_MESSAGE_TYPE]: "test message type",
      [SEMATTRS_HTTP_CLIENT_IP]: "127.0.0.1",
      [experimentalOpenTelemetryValues.SYNTHETIC_TYPE]: "bot",
    };
    testLogRecord.body = {
      message: { nested: { nested2: { test: "test" } } },
      severityLevel: "Information",
      version: 2,
    };
    const expectedTime = hrTimeToDate(testLogRecord.hrTime);
    const expectedProperties = {
      "extra.attribute": "foo",
      [SEMATTRS_MESSAGE_TYPE]: "test message type",
    };
    const expectedBaseData: Partial<MessageData> = {
      message: '{"nested":{"nested2":{"test":"test"}}}',
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
      expectedTime,
      expectedServiceTagsBase,
    );
  });
});
