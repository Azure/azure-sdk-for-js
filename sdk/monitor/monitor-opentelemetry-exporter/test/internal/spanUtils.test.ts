// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import fs from "fs";
import path from "path";
import { Span, BasicTracerProvider, TracerConfig } from "@opentelemetry/tracing";
import { SpanKind, SpanStatusCode, ROOT_CONTEXT } from "@opentelemetry/api";
import * as assert from "assert";
import { hrTimeToMilliseconds } from "@opentelemetry/core";
import { Resource } from "@opentelemetry/resources";
import {
  DbSystemValues,
  SemanticAttributes,
  SemanticResourceAttributes
} from "@opentelemetry/semantic-conventions";

import { Tags, Properties, Measurements } from "../../src/types";
import { Context, getInstance } from "../../src/platform";
import { msToTimeSpan } from "../../src/utils/breezeUtils";
import { readableSpanToEnvelope } from "../../src/utils/spanUtils";
import { RemoteDependencyData, RequestData, KnownContextTagKeys } from "../../src/generated";
import { TelemetryItem as Envelope } from "../../src/generated";

const context = getInstance();

const tracerProviderConfig: TracerConfig = {
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_INSTANCE_ID]: "testServiceInstanceID",
    [SemanticResourceAttributes.SERVICE_NAME]: "testServiceName",
    [SemanticResourceAttributes.SERVICE_NAMESPACE]: "testServiceNamespace"
  })
};

const tracer = new BasicTracerProvider(tracerProviderConfig).getTracer("default");
const packageJsonPath = path.resolve(__dirname, "../../", "./package.json");
let packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

function assertEnvelope(
  envelope: Envelope,
  name: string,
  baseType: string,
  expectedTags: Tags,
  expectedProperties: Properties,
  expectedMeasurements: Measurements | undefined,
  expectedBaseData: Partial<RequestData | RemoteDependencyData>,
  expectedTime?: Date
): void {
  assert.strictEqual(Context.sdkVersion, packageJson.version);
  assert.ok(envelope);
  assert.strictEqual(envelope.name, name);
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
    [KnownContextTagKeys.AiCloudRoleInstance]: "testServiceInstanceID"
  };
  assert.deepStrictEqual(envelope.tags, {
    ...context.tags,
    ...expectedServiceTags,
    ...expectedTags
  });
  assert.deepStrictEqual((envelope?.data?.baseData as RequestData).properties, expectedProperties);
  assert.deepStrictEqual(
    (envelope?.data?.baseData as RequestData).measurements,
    expectedMeasurements
  );
  assert.deepStrictEqual(envelope.data?.baseData, expectedBaseData);
}

const emptyMeasurements: Measurements = {};

describe("spanUtils.ts", () => {
  describe("#readableSpanToEnvelope", () => {
    describe("GRPC", () => {
      it("should create a Request Envelope for Server Spans", () => {
        const span = new Span(
          tracer,
          ROOT_CONTEXT,
          "parent span",
          { traceId: "traceid", spanId: "spanId", traceFlags: 0 },
          SpanKind.SERVER,
          "parentSpanId"
        );
        span.setAttributes({
          "extra.attribute": "foo",
          [SemanticAttributes.RPC_GRPC_STATUS_CODE]: 123,
          [SemanticAttributes.RPC_SYSTEM]: "test rpc system"
        });
        span.setStatus({
          code: SpanStatusCode.OK
        });
        span.end();
        const expectedTags: Tags = {
          [KnownContextTagKeys.AiOperationId]: "traceid",
          [KnownContextTagKeys.AiOperationParentId]: "parentSpanId",
          [KnownContextTagKeys.AiOperationName]: "parent span"
        };
        const expectedProperties = {
          "extra.attribute": "foo"
        };

        const expectedBaseData: Partial<RequestData> = {
          source: undefined,
          duration: msToTimeSpan(hrTimeToMilliseconds(span.duration)),
          id: `${span.spanContext().spanId}`,
          success: true,
          responseCode: "123",
          name: `parent span`,
          version: 2,
          properties: expectedProperties,
          measurements: {}
        };

        const envelope = readableSpanToEnvelope(span, "ikey");
        assertEnvelope(
          envelope,
          "Microsoft.ApplicationInsights.Request",
          "RequestData",
          expectedTags,
          expectedProperties,
          emptyMeasurements,
          expectedBaseData
        );
      });
      it("should create a Dependency Envelope for Client Spans", () => {
        const span = new Span(
          tracer,
          ROOT_CONTEXT,
          "parent span",
          { traceId: "traceid", spanId: "spanId", traceFlags: 0 },
          SpanKind.CLIENT,
          "parentSpanId"
        );
        span.setAttributes({
          "extra.attribute": "foo",
          [SemanticAttributes.RPC_GRPC_STATUS_CODE]: 123,
          [SemanticAttributes.RPC_SYSTEM]: "test rpc system"
        });
        span.setStatus({
          code: SpanStatusCode.OK
        });
        span.end();
        const expectedTags: Tags = {
          [KnownContextTagKeys.AiOperationId]: "traceid",
          [KnownContextTagKeys.AiOperationParentId]: "parentSpanId"
        };
        const expectedProperties = {
          "extra.attribute": "foo"
        };

        const expectedBaseData: Partial<RemoteDependencyData> = {
          duration: msToTimeSpan(hrTimeToMilliseconds(span.duration)),
          id: `${span.spanContext().spanId}`,
          success: true,
          resultCode: "123",
          target: "test rpc system",
          type: "GRPC",
          name: `parent span`,
          version: 2,
          properties: expectedProperties,
          measurements: {}
        };

        const envelope = readableSpanToEnvelope(span, "ikey");
        assertEnvelope(
          envelope,
          "Microsoft.ApplicationInsights.RemoteDependency",
          "RemoteDependencyData",
          expectedTags,
          expectedProperties,
          emptyMeasurements,
          expectedBaseData
        );
      });
    });
    describe("Generic", () => {
      it("should create a Request Envelope for Server Spans", () => {
        const span = new Span(
          tracer,
          ROOT_CONTEXT,
          "parent span",
          { traceId: "traceid", spanId: "spanId", traceFlags: 0 },
          SpanKind.SERVER,
          "parentSpanId"
        );
        span.setAttributes({
          "extra.attribute": "foo"
        });
        span.setStatus({
          code: SpanStatusCode.OK
        });
        span.end();
        const expectedTime = new Date(hrTimeToMilliseconds(span.startTime));
        const expectedTags: Tags = {
          [KnownContextTagKeys.AiOperationId]: "traceid",
          [KnownContextTagKeys.AiOperationParentId]: "parentSpanId",
          [KnownContextTagKeys.AiOperationName]: "parent span"
        };
        const expectedProperties = {
          "extra.attribute": "foo"
        };

        const expectedBaseData: Partial<RequestData> = {
          duration: msToTimeSpan(hrTimeToMilliseconds(span.duration)),
          id: `${span.spanContext().spanId}`,
          success: true,
          responseCode: "0",
          name: `parent span`,
          version: 2,
          source: undefined,
          properties: expectedProperties,
          measurements: {}
        };

        const envelope = readableSpanToEnvelope(span, "ikey");
        assertEnvelope(
          envelope,
          "Microsoft.ApplicationInsights.Request",
          "RequestData",
          expectedTags,
          expectedProperties,
          emptyMeasurements,
          expectedBaseData,
          expectedTime
        );
      });

      it("should create a Dependency Envelope for Client Spans", () => {
        const span = new Span(
          tracer,
          ROOT_CONTEXT,
          "parent span",
          { traceId: "traceid", spanId: "spanId", traceFlags: 0 },
          SpanKind.CLIENT,
          "parentSpanId"
        );
        span.setAttributes({
          "extra.attribute": "foo"
        });
        span.setStatus({
          code: SpanStatusCode.OK
        });
        span.end();
        const expectedTags: Tags = {
          [KnownContextTagKeys.AiOperationId]: "traceid",
          [KnownContextTagKeys.AiOperationParentId]: "parentSpanId"
        };
        const expectedProperties = {
          "extra.attribute": "foo"
        };

        const expectedBaseData: Partial<RemoteDependencyData> = {
          duration: msToTimeSpan(hrTimeToMilliseconds(span.duration)),
          id: `${span.spanContext().spanId}`,
          success: true,
          resultCode: "0",
          type: "Dependency",
          name: `parent span`,
          version: 2,
          properties: expectedProperties,
          measurements: {}
        };

        const envelope = readableSpanToEnvelope(span, "ikey");
        assertEnvelope(
          envelope,
          "Microsoft.ApplicationInsights.RemoteDependency",
          "RemoteDependencyData",
          expectedTags,
          expectedProperties,
          emptyMeasurements,
          expectedBaseData
        );
      });
    });

    describe("HTTP", () => {
      it("(HTTP) should create a Request Envelope for Server Spans", () => {
        const span = new Span(
          tracer,
          ROOT_CONTEXT,
          "parent span",
          { traceId: "traceid", spanId: "spanId", traceFlags: 0 },
          SpanKind.SERVER,
          "parentSpanId"
        );
        span.setAttributes({
          [SemanticAttributes.HTTP_METHOD]: "GET",
          [SemanticAttributes.HTTP_ROUTE]: "/api/example",
          [SemanticAttributes.HTTP_URL]: "https://example.com/api/example",
          [SemanticAttributes.HTTP_STATUS_CODE]: 200,
          "extra.attribute": "foo"
        });
        span.setStatus({
          code: SpanStatusCode.OK
        });
        span.end();
        const expectedTags: Tags = {};
        expectedTags[KnownContextTagKeys.AiOperationId] = "traceid";
        expectedTags[KnownContextTagKeys.AiOperationParentId] = "parentSpanId";
        expectedTags[KnownContextTagKeys.AiOperationName] = "GET parent span";

        const expectedProperties = {
          "extra.attribute": "foo"
        };

        const expectedBaseData: RequestData = {
          duration: msToTimeSpan(hrTimeToMilliseconds(span.duration)),
          id: `${span.spanContext().spanId}`,
          success: true,
          responseCode: "200",
          url: "https://example.com/api/example",
          name: `parent span`,
          version: 2,
          source: undefined,
          properties: expectedProperties,
          measurements: {}
        };

        const envelope = readableSpanToEnvelope(span, "ikey");
        assertEnvelope(
          envelope,
          "Microsoft.ApplicationInsights.Request",
          "RequestData",
          expectedTags,
          expectedProperties,
          emptyMeasurements,
          expectedBaseData
        );
      });
      it("should create a Dependency Envelope for Client Spans", () => {
        const span = new Span(
          tracer,
          ROOT_CONTEXT,
          "parent span",
          { traceId: "traceid", spanId: "spanId", traceFlags: 0 },
          SpanKind.CLIENT,
          "parentSpanId"
        );
        span.setAttributes({
          [SemanticAttributes.HTTP_METHOD]: "GET",
          [SemanticAttributes.HTTP_URL]: "https://example.com/api/example",
          [SemanticAttributes.PEER_SERVICE]: "https://someotherexample.com/api/example",
          [SemanticAttributes.HTTP_STATUS_CODE]: 200,
          "extra.attribute": "foo"
        });
        span.setStatus({
          code: SpanStatusCode.OK
        });
        span.end();
        const expectedTags: Tags = {};
        expectedTags[KnownContextTagKeys.AiOperationId] = span.spanContext().traceId;
        expectedTags[KnownContextTagKeys.AiOperationParentId] = "parentSpanId";
        const expectedProperties = {
          "extra.attribute": "foo"
        };

        const expectedBaseData: RemoteDependencyData = {
          duration: msToTimeSpan(hrTimeToMilliseconds(span.duration)),
          id: `spanId`,
          success: true,
          resultCode: "200",
          type: "Http",
          target: "https://someotherexample.com/api/example",
          data: "https://example.com/api/example",
          name: `parent span`,
          version: 2,
          properties: expectedProperties,
          measurements: {}
        };

        const envelope = readableSpanToEnvelope(span, "ikey");
        assertEnvelope(
          envelope,
          "Microsoft.ApplicationInsights.RemoteDependency",
          "RemoteDependencyData",
          expectedTags,
          expectedProperties,
          emptyMeasurements,
          expectedBaseData
        );
      });
    });

    describe("DB", () => {
      it("should create a Dependency Envelope for Client Spans", () => {
        const span = new Span(
          tracer,
          ROOT_CONTEXT,
          "parent span",
          { traceId: "traceid", spanId: "spanId", traceFlags: 0 },
          SpanKind.CLIENT,
          "parentSpanId"
        );
        span.setAttributes({
          [SemanticAttributes.DB_SYSTEM]: DbSystemValues.MYSQL,
          [SemanticAttributes.DB_STATEMENT]: "SELECT * FROM Test",
          "extra.attribute": "foo"
        });
        span.setStatus({
          code: SpanStatusCode.OK
        });
        span.end();
        const expectedTags: Tags = {};
        expectedTags[KnownContextTagKeys.AiOperationId] = span.spanContext().traceId;
        expectedTags[KnownContextTagKeys.AiOperationParentId] = "parentSpanId";
        const expectedProperties = {
          "extra.attribute": "foo"
        };

        const expectedBaseData: RemoteDependencyData = {
          duration: msToTimeSpan(hrTimeToMilliseconds(span.duration)),
          id: `spanId`,
          success: true,
          resultCode: "0",
          type: "SQL",
          target: "mysql",
          data: "SELECT * FROM Test",
          name: `parent span`,
          version: 2,
          properties: expectedProperties,
          measurements: {}
        };

        const envelope = readableSpanToEnvelope(span, "ikey");
        assertEnvelope(
          envelope,
          "Microsoft.ApplicationInsights.RemoteDependency",
          "RemoteDependencyData",
          expectedTags,
          expectedProperties,
          emptyMeasurements,
          expectedBaseData
        );
      });
    });
  });
});
