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
  KnownContextTagKeys,
  MessageData,
  TelemetryExceptionData,
  TelemetryExceptionDetails,
} from "../../src/generated";
import { TelemetryItem as Envelope } from "../../src/generated";
import { LogRecord, Logger, LoggerProvider } from "@opentelemetry/sdk-logs";
import { LoggerProviderConfig } from "@opentelemetry/sdk-logs/build/src/types";
import { logToEnvelope } from "../../src/utils/logUtils";
import { hrTimeToMilliseconds } from "@opentelemetry/core";

const context = getInstance();

const providerConfig: LoggerProviderConfig = {
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_INSTANCE_ID]: "testServiceInstanceID",
    [SemanticResourceAttributes.SERVICE_NAME]: "testServiceName",
    [SemanticResourceAttributes.SERVICE_NAMESPACE]: "testServiceNamespace",
  }),
};

const loggerProvider = new LoggerProvider(providerConfig);
const logger = loggerProvider.getLogger("default") as Logger;

function assertEnvelope(
  envelope: Envelope,
  name: string,
  sampleRate: number,
  baseType: string,
  expectedProperties: Properties,
  expectedMeasurements: Measurements | undefined,
  expectedBaseData: Partial<MessageData | TelemetryExceptionData>,
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
  describe("#logToEnvelope", () => {
    it("should create a Message Envelope for Logs", () => {
      const log = new LogRecord(logger, {
        body: "Test message",
        severityNumber: 12,
      });
      const expectedTime = new Date(hrTimeToMilliseconds(log.hrTime));
      log.setAttributes({
        "extra.attribute": "foo",
        [SemanticAttributes.MESSAGE_TYPE]: "test message type",
      });
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

      const envelope = logToEnvelope(log, "ikey");
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
      const log = new LogRecord(logger, {
        body: "Test exception",
        severityNumber: 22,
      });
      const expectedTime = new Date(hrTimeToMilliseconds(log.hrTime));
      log.setAttributes({
        "extra.attribute": "foo",
        [SemanticAttributes.EXCEPTION_TYPE]: "test exception type",
        [SemanticAttributes.EXCEPTION_MESSAGE]: "test exception message",
        [SemanticAttributes.EXCEPTION_STACKTRACE]: "test exception stack",
      });
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

      const envelope = logToEnvelope(log, "ikey");
      assertEnvelope(
        envelope,
        "Microsoft.ApplicationInsights.Exception",
        100,
        "TelemetryExceptionData",
        expectedProperties,
        emptyMeasurements,
        expectedBaseData,
        expectedTime
      );
    });
  });
});
