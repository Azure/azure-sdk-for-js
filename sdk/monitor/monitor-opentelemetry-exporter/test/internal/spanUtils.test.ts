// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import fs from "fs";
import path from "path";
import { Span, BasicTracerProvider, TracerConfig } from "@opentelemetry/sdk-trace-base";
import { SpanKind, SpanStatusCode, ROOT_CONTEXT } from "@opentelemetry/api";
import * as assert from "assert";
import { hrTimeToMilliseconds } from "@opentelemetry/core";
import { Resource } from "@opentelemetry/resources";
import {
  DbSystemValues,
  SemanticAttributes,
  SemanticResourceAttributes,
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
    [SemanticResourceAttributes.SERVICE_NAMESPACE]: "testServiceNamespace",
  }),
};

const tracer = new BasicTracerProvider(tracerProviderConfig).getTracer("default");
const packageJsonPath = path.resolve(__dirname, "../../../", "./package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

function assertEnvelope(
  envelope: Envelope,
  name: string,
  sampleRate: number,
  baseType: string,
  expectedTags: Tags,
  expectedProperties: Properties,
  expectedMeasurements: Measurements | undefined,
  expectedBaseData: Partial<RequestData | RemoteDependencyData>,
  expectedTime?: Date,
): void {
  assert.strictEqual(Context.sdkVersion, packageJson.version);
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
    ...expectedTags,
  });
  assert.deepStrictEqual((envelope?.data?.baseData as RequestData).properties, expectedProperties);
  assert.deepStrictEqual(
    (envelope?.data?.baseData as RequestData).measurements,
    expectedMeasurements,
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
          "parentSpanId",
        );
        span.setAttributes({
          "extra.attribute": "foo",
          [SemanticAttributes.RPC_GRPC_STATUS_CODE]: 123,
          [SemanticAttributes.RPC_SYSTEM]: "test rpc system",
        });
        span.setStatus({
          code: SpanStatusCode.OK,
        });
        span.end();
        const expectedTags: Tags = {
          [KnownContextTagKeys.AiOperationId]: "traceid",
          [KnownContextTagKeys.AiOperationParentId]: "parentSpanId",
          [KnownContextTagKeys.AiOperationName]: "parent span",
        };
        const expectedProperties = {
          "extra.attribute": "foo",
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
          measurements: {},
        };

        const envelope = readableSpanToEnvelope(span, "ikey");
        assertEnvelope(
          envelope,
          "Microsoft.ApplicationInsights.Request",
          100,
          "RequestData",
          expectedTags,
          expectedProperties,
          emptyMeasurements,
          expectedBaseData,
        );
      });
      it("should create a Dependency Envelope for Client Spans", () => {
        const span = new Span(
          tracer,
          ROOT_CONTEXT,
          "parent span",
          { traceId: "traceid", spanId: "spanId", traceFlags: 0 },
          SpanKind.CLIENT,
          "parentSpanId",
        );
        span.setAttributes({
          "extra.attribute": "foo",
          [SemanticAttributes.RPC_GRPC_STATUS_CODE]: 123,
          [SemanticAttributes.RPC_SYSTEM]: "test rpc system",
        });
        span.setStatus({
          code: SpanStatusCode.OK,
        });
        span.end();
        const expectedTags: Tags = {
          [KnownContextTagKeys.AiOperationId]: "traceid",
          [KnownContextTagKeys.AiOperationParentId]: "parentSpanId",
        };
        const expectedProperties = {
          "extra.attribute": "foo",
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
          measurements: {},
        };

        const envelope = readableSpanToEnvelope(span, "ikey");
        assertEnvelope(
          envelope,
          "Microsoft.ApplicationInsights.RemoteDependency",
          100,
          "RemoteDependencyData",
          expectedTags,
          expectedProperties,
          emptyMeasurements,
          expectedBaseData,
        );
      });
      it("should create a Dependency Envelope for Client Spans with an updated dependency target", () => {
        const span = new Span(
          tracer,
          ROOT_CONTEXT,
          "parent span",
          { traceId: "traceid", spanId: "spanId", traceFlags: 0 },
          SpanKind.CLIENT,
          "parentSpanId",
        );
        span.setAttributes({
          "extra.attribute": "foo",
          [SemanticAttributes.RPC_GRPC_STATUS_CODE]: 123,
          [SemanticAttributes.RPC_SYSTEM]: "test rpc system",
          [SemanticAttributes.PEER_SERVICE]: "test peer service",
        });
        span.setStatus({
          code: SpanStatusCode.OK,
        });
        span.end();
        const expectedTags: Tags = {
          [KnownContextTagKeys.AiOperationId]: "traceid",
          [KnownContextTagKeys.AiOperationParentId]: "parentSpanId",
        };
        const expectedProperties = {
          "extra.attribute": "foo",
        };

        const expectedBaseData: Partial<RemoteDependencyData> = {
          duration: msToTimeSpan(hrTimeToMilliseconds(span.duration)),
          id: `${span.spanContext().spanId}`,
          success: true,
          resultCode: "123",
          target: "test peer service",
          type: "GRPC",
          name: `parent span`,
          version: 2,
          properties: expectedProperties,
          measurements: {},
        };

        const envelope = readableSpanToEnvelope(span, "ikey");
        assertEnvelope(
          envelope,
          "Microsoft.ApplicationInsights.RemoteDependency",
          100,
          "RemoteDependencyData",
          expectedTags,
          expectedProperties,
          emptyMeasurements,
          expectedBaseData,
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
          "parentSpanId",
        );
        span.setAttributes({
          "_MS.sampleRate": "50",
        });
        span.setStatus({
          code: SpanStatusCode.OK,
        });
        span.end();
        const expectedTime = new Date(hrTimeToMilliseconds(span.startTime));
        const expectedTags: Tags = {
          [KnownContextTagKeys.AiOperationId]: "traceid",
          [KnownContextTagKeys.AiOperationParentId]: "parentSpanId",
          [KnownContextTagKeys.AiOperationName]: "parent span",
        };
        const expectedBaseData: Partial<RequestData> = {
          duration: msToTimeSpan(hrTimeToMilliseconds(span.duration)),
          id: `${span.spanContext().spanId}`,
          success: true,
          responseCode: "0",
          name: `parent span`,
          version: 2,
          source: undefined,
          properties: {}, // Should not add sampleRate
          measurements: {},
        };

        const envelope = readableSpanToEnvelope(span, "ikey");
        assertEnvelope(
          envelope,
          "Microsoft.ApplicationInsights.Request",
          50,
          "RequestData",
          expectedTags,
          {},
          emptyMeasurements,
          expectedBaseData,
          expectedTime,
        );
      });

      it("should set the azure SDK properties", () => {
        const span = new Span(
          tracer,
          ROOT_CONTEXT,
          "parent span",
          { traceId: "traceid", spanId: "spanId", traceFlags: 0 },
          SpanKind.INTERNAL,
          "parentSpanId",
        );
        span.setAttributes({
          "az.namespace": "Microsoft.EventHub",
        });
        span.setStatus({
          code: SpanStatusCode.OK,
        });
        span.end();
        const expectedTime = new Date(hrTimeToMilliseconds(span.startTime));
        const expectedTags: Tags = {
          [KnownContextTagKeys.AiOperationId]: "traceid",
          [KnownContextTagKeys.AiOperationParentId]: "parentSpanId",
        };
        const expectedProperties = {
          "az.namespace": "Microsoft.EventHub",
        };
        const expectedBaseData: Partial<RequestData> = {
          duration: msToTimeSpan(hrTimeToMilliseconds(span.duration)),
          id: `${span.spanContext().spanId}`,
          name: "parent span",
          success: true,
          resultCode: "0",
          version: 2,
          type: "InProc | Microsoft.EventHub",
          properties: expectedProperties,
          measurements: {},
        };

        const envelope = readableSpanToEnvelope(span, "ikey");
        assertEnvelope(
          envelope,
          "Microsoft.ApplicationInsights.RemoteDependency",
          100,
          "RemoteDependencyData",
          expectedTags,
          expectedProperties,
          emptyMeasurements,
          expectedBaseData,
          expectedTime,
        );
      });

      it("should create a Dependency Envelope for Client Spans", () => {
        const span = new Span(
          tracer,
          ROOT_CONTEXT,
          "parent span",
          { traceId: "traceid", spanId: "spanId", traceFlags: 0 },
          SpanKind.CLIENT,
          "parentSpanId",
        );
        span.setAttributes({
          "extra.attribute": "foo",
        });
        span.setStatus({
          code: SpanStatusCode.OK,
        });
        span.end();
        const expectedTags: Tags = {
          [KnownContextTagKeys.AiOperationId]: "traceid",
          [KnownContextTagKeys.AiOperationParentId]: "parentSpanId",
        };
        const expectedProperties = {
          "extra.attribute": "foo",
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
          measurements: {},
        };

        const envelope = readableSpanToEnvelope(span, "ikey");
        assertEnvelope(
          envelope,
          "Microsoft.ApplicationInsights.RemoteDependency",
          100,
          "RemoteDependencyData",
          expectedTags,
          expectedProperties,
          emptyMeasurements,
          expectedBaseData,
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
          "parentSpanId",
          [{ context: { traceId: "traceid", spanId: "spanId", traceFlags: 0 } }],
        );
        span.setAttributes({
          [SemanticAttributes.HTTP_METHOD]: "GET",
          [SemanticAttributes.HTTP_ROUTE]: "/api/example",
          [SemanticAttributes.HTTP_URL]: "https://example.com/api/example",
          [SemanticAttributes.HTTP_STATUS_CODE]: 200,
          "extra.attribute": "foo",
        });
        span.setStatus({
          code: SpanStatusCode.OK,
        });
        span.end();
        const expectedTags: Tags = {};
        expectedTags[KnownContextTagKeys.AiOperationId] = "traceid";
        expectedTags[KnownContextTagKeys.AiOperationParentId] = "parentSpanId";
        expectedTags[KnownContextTagKeys.AiOperationName] = "GET /api/example";
        const expectedProperties = {
          "extra.attribute": "foo",
          "_MS.links": JSON.stringify([{ operation_Id: "traceid", id: "spanId" }]),
        };

        const expectedBaseData: RequestData = {
          duration: msToTimeSpan(hrTimeToMilliseconds(span.duration)),
          id: `${span.spanContext().spanId}`,
          success: true,
          responseCode: "200",
          url: "https://example.com/api/example",
          name: expectedTags[KnownContextTagKeys.AiOperationName],
          version: 2,
          source: undefined,
          properties: expectedProperties,
          measurements: {},
        };

        const envelope = readableSpanToEnvelope(span, "ikey");
        assertEnvelope(
          envelope,
          "Microsoft.ApplicationInsights.Request",
          100,
          "RequestData",
          expectedTags,
          expectedProperties,
          emptyMeasurements,
          expectedBaseData,
        );
      });
      it("should set AiOperationName when only httpUrl is set", () => {
        const span = new Span(
          tracer,
          ROOT_CONTEXT,
          "parent span",
          { traceId: "traceid", spanId: "spanId", traceFlags: 0 },
          SpanKind.SERVER,
          "parentSpanId",
        );
        span.setAttributes({
          [SemanticAttributes.HTTP_METHOD]: "GET",
          [SemanticAttributes.HTTP_URL]: "https://example.com/api/example",
          [SemanticAttributes.HTTP_STATUS_CODE]: 200,
          [SemanticAttributes.NET_PEER_IP]: "192.168.123.132",
          "extra.attribute": "foo",
        });
        span.setStatus({
          code: SpanStatusCode.OK,
        });
        span.end();
        const expectedTags: Tags = {};
        expectedTags[KnownContextTagKeys.AiOperationId] = "traceid";
        expectedTags[KnownContextTagKeys.AiOperationParentId] = "parentSpanId";
        expectedTags[KnownContextTagKeys.AiOperationName] = "GET /api/example";
        expectedTags[KnownContextTagKeys.AiLocationIp] = "192.168.123.132";

        const expectedProperties = {
          "extra.attribute": "foo",
        };

        const expectedBaseData: RequestData = {
          duration: msToTimeSpan(hrTimeToMilliseconds(span.duration)),
          id: `${span.spanContext().spanId}`,
          success: true,
          responseCode: "200",
          url: "https://example.com/api/example",
          name: expectedTags[KnownContextTagKeys.AiOperationName],
          version: 2,
          source: undefined,
          properties: expectedProperties,
          measurements: {},
        };

        const envelope = readableSpanToEnvelope(span, "ikey");
        assertEnvelope(
          envelope,
          "Microsoft.ApplicationInsights.Request",
          100,
          "RequestData",
          expectedTags,
          expectedProperties,
          emptyMeasurements,
          expectedBaseData,
        );
      });
      it("should set AiLocationIp when httpMethod not set and netPeerIp is", () => {
        const span = new Span(
          tracer,
          ROOT_CONTEXT,
          "parent span",
          { traceId: "traceid", spanId: "spanId", traceFlags: 0 },
          SpanKind.SERVER,
          "parentSpanId",
        );
        span.setAttributes({
          [SemanticAttributes.HTTP_URL]: "https://example.com/api/example",
          [SemanticAttributes.HTTP_STATUS_CODE]: 200,
          [SemanticAttributes.NET_PEER_IP]: "192.168.123.132",
          "extra.attribute": "foo",
        });
        span.setStatus({
          code: SpanStatusCode.OK,
        });
        span.end();
        const expectedTags: Tags = {};
        expectedTags[KnownContextTagKeys.AiOperationId] = "traceid";
        expectedTags[KnownContextTagKeys.AiOperationParentId] = "parentSpanId";
        expectedTags[KnownContextTagKeys.AiOperationName] = "parent span";
        expectedTags[KnownContextTagKeys.AiLocationIp] = "192.168.123.132";

        const expectedProperties = {
          "extra.attribute": "foo",
        };

        const expectedBaseData: RequestData = {
          duration: msToTimeSpan(hrTimeToMilliseconds(span.duration)),
          id: `${span.spanContext().spanId}`,
          success: true,
          responseCode: "0",
          name: expectedTags[KnownContextTagKeys.AiOperationName],
          version: 2,
          source: undefined,
          properties: expectedProperties,
          measurements: {},
        };

        const envelope = readableSpanToEnvelope(span, "ikey");
        assertEnvelope(
          envelope,
          "Microsoft.ApplicationInsights.Request",
          100,
          "RequestData",
          expectedTags,
          expectedProperties,
          emptyMeasurements,
          expectedBaseData,
        );
      });
      it("should create a Dependency Envelope for Client Spans", () => {
        const span = new Span(
          tracer,
          ROOT_CONTEXT,
          "parent span",
          { traceId: "traceid", spanId: "spanId", traceFlags: 0 },
          SpanKind.CLIENT,
          "parentSpanId",
        );
        span.setAttributes({
          [SemanticAttributes.HTTP_METHOD]: "GET",
          [SemanticAttributes.HTTP_URL]: "https://example.com/api/example",
          [SemanticAttributes.PEER_SERVICE]: "https://someotherexample.com/api/example",
          [SemanticAttributes.HTTP_STATUS_CODE]: 200,
          "extra.attribute": "foo",
        });
        span.setStatus({
          code: SpanStatusCode.OK,
        });
        span.end();
        const expectedTags: Tags = {};
        expectedTags[KnownContextTagKeys.AiOperationId] = span.spanContext().traceId;
        expectedTags[KnownContextTagKeys.AiOperationParentId] = "parentSpanId";
        const expectedProperties = {
          "extra.attribute": "foo",
        };

        const expectedBaseData: RemoteDependencyData = {
          duration: msToTimeSpan(hrTimeToMilliseconds(span.duration)),
          id: `spanId`,
          success: true,
          resultCode: "200",
          type: "Http",
          target: "https://someotherexample.com/api/example",
          data: "https://example.com/api/example",
          name: `GET /api/example`,
          version: 2,
          properties: expectedProperties,
          measurements: {},
        };

        const envelope = readableSpanToEnvelope(span, "ikey");
        assertEnvelope(
          envelope,
          "Microsoft.ApplicationInsights.RemoteDependency",
          100,
          "RemoteDependencyData",
          expectedTags,
          expectedProperties,
          emptyMeasurements,
          expectedBaseData,
        );
      });
    });

    describe("createDepenedencyData", () => {
      it("should create a Dependency Envelope for Producer Spans", () => {
        const span = new Span(
          tracer,
          ROOT_CONTEXT,
          "parent span",
          { traceId: "traceid", spanId: "spanId", traceFlags: 0 },
          SpanKind.PRODUCER,
          "parentSpanId",
        );
        span.setAttributes({
          "extra.attribute": "foo",
        });
        span.end();
        const expectedTags: Tags = {};
        expectedTags[KnownContextTagKeys.AiOperationId] = span.spanContext().traceId;
        expectedTags[KnownContextTagKeys.AiOperationParentId] = "parentSpanId";
        const expectedProperties = {
          "extra.attribute": "foo",
        };

        const expectedBaseData: RemoteDependencyData = {
          duration: msToTimeSpan(hrTimeToMilliseconds(span.duration)),
          id: `spanId`,
          success: true,
          resultCode: "0",
          type: "Queue Message",
          name: "parent span",
          version: 2,
          properties: expectedProperties,
          measurements: {},
        };

        const envelope = readableSpanToEnvelope(span, "ikey");
        assertEnvelope(
          envelope,
          "Microsoft.ApplicationInsights.RemoteDependency",
          100,
          "RemoteDependencyData",
          expectedTags,
          expectedProperties,
          emptyMeasurements,
          expectedBaseData,
        );
      });
      it("should create a Dependency Envelope for Internal Spans", () => {
        const span = new Span(
          tracer,
          ROOT_CONTEXT,
          "parent span",
          { traceId: "traceid", spanId: "spanId", traceFlags: 0 },
          SpanKind.INTERNAL,
          "parentSpanId",
        );
        span.setAttributes({
          "extra.attribute": "foo",
        });
        span.end();
        const expectedTags: Tags = {};
        expectedTags[KnownContextTagKeys.AiOperationId] = span.spanContext().traceId;
        expectedTags[KnownContextTagKeys.AiOperationParentId] = "parentSpanId";
        const expectedProperties = {
          "extra.attribute": "foo",
        };

        const expectedBaseData: RemoteDependencyData = {
          duration: msToTimeSpan(hrTimeToMilliseconds(span.duration)),
          id: `spanId`,
          success: true,
          resultCode: "0",
          type: "InProc",
          name: "parent span",
          version: 2,
          properties: expectedProperties,
          measurements: {},
        };

        const envelope = readableSpanToEnvelope(span, "ikey");
        assertEnvelope(
          envelope,
          "Microsoft.ApplicationInsights.RemoteDependency",
          100,
          "RemoteDependencyData",
          expectedTags,
          expectedProperties,
          emptyMeasurements,
          expectedBaseData,
        );
      });
      it("should remove default port if target is defined", () => {
        const span = new Span(
          tracer,
          ROOT_CONTEXT,
          "parent span",
          { traceId: "traceid", spanId: "spanId", traceFlags: 0 },
          SpanKind.INTERNAL,
          "parentSpanId",
        );
        span.setAttributes({
          [SemanticAttributes.HTTP_METHOD]: "GET",
          [SemanticAttributes.HTTP_HOST]: "http://test:80",
          "extra.attribute": "foo",
        });
        span.end();
        const expectedTags: Tags = {};
        expectedTags[KnownContextTagKeys.AiOperationId] = span.spanContext().traceId;
        expectedTags[KnownContextTagKeys.AiOperationParentId] = "parentSpanId";
        const expectedProperties = {
          "extra.attribute": "foo",
        };

        const expectedBaseData: RemoteDependencyData = {
          duration: msToTimeSpan(hrTimeToMilliseconds(span.duration)),
          id: `spanId`,
          success: true,
          resultCode: "0",
          type: "Http",
          name: "parent span",
          version: 2,
          properties: expectedProperties,
          measurements: {},
          target: "http://test",
          data: "",
        };

        const envelope = readableSpanToEnvelope(span, "ikey");
        assertEnvelope(
          envelope,
          "Microsoft.ApplicationInsights.RemoteDependency",
          100,
          "RemoteDependencyData",
          expectedTags,
          expectedProperties,
          emptyMeasurements,
          expectedBaseData,
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
          "parentSpanId",
        );
        span.setAttributes({
          [SemanticAttributes.DB_SYSTEM]: DbSystemValues.MYSQL,
          [SemanticAttributes.DB_STATEMENT]: "SELECT * FROM Test",
          "extra.attribute": "foo",
        });
        span.setStatus({
          code: SpanStatusCode.OK,
        });
        span.end();
        const expectedTags: Tags = {};
        expectedTags[KnownContextTagKeys.AiOperationId] = span.spanContext().traceId;
        expectedTags[KnownContextTagKeys.AiOperationParentId] = "parentSpanId";
        const expectedProperties = {
          "extra.attribute": "foo",
        };

        const expectedBaseData: RemoteDependencyData = {
          duration: msToTimeSpan(hrTimeToMilliseconds(span.duration)),
          id: `spanId`,
          success: true,
          resultCode: "0",
          type: "mysql",
          target: "mysql",
          data: "SELECT * FROM Test",
          name: `parent span`,
          version: 2,
          properties: expectedProperties,
          measurements: {},
        };

        const envelope = readableSpanToEnvelope(span, "ikey");
        assertEnvelope(
          envelope,
          "Microsoft.ApplicationInsights.RemoteDependency",
          100,
          "RemoteDependencyData",
          expectedTags,
          expectedProperties,
          emptyMeasurements,
          expectedBaseData,
        );
      });
      it("should create a Dependency Envelope for PostgreSQL spans", () => {
        const span = new Span(
          tracer,
          ROOT_CONTEXT,
          "parent span",
          { traceId: "traceid", spanId: "spanId", traceFlags: 0 },
          SpanKind.CLIENT,
          "parentSpanId",
        );
        span.setAttributes({
          [SemanticAttributes.DB_SYSTEM]: DbSystemValues.POSTGRESQL,
          [SemanticAttributes.DB_STATEMENT]: "SELECT * FROM Test",
          "extra.attribute": "foo",
        });
        span.setStatus({
          code: SpanStatusCode.OK,
        });
        span.end();
        const expectedTags: Tags = {};
        expectedTags[KnownContextTagKeys.AiOperationId] = span.spanContext().traceId;
        expectedTags[KnownContextTagKeys.AiOperationParentId] = "parentSpanId";
        const expectedProperties = {
          "extra.attribute": "foo",
        };

        const expectedBaseData: RemoteDependencyData = {
          duration: msToTimeSpan(hrTimeToMilliseconds(span.duration)),
          id: `spanId`,
          success: true,
          resultCode: "0",
          type: "postgresql",
          target: "postgresql",
          data: "SELECT * FROM Test",
          name: `parent span`,
          version: 2,
          properties: expectedProperties,
          measurements: {},
        };

        const envelope = readableSpanToEnvelope(span, "ikey");
        assertEnvelope(
          envelope,
          "Microsoft.ApplicationInsights.RemoteDependency",
          100,
          "RemoteDependencyData",
          expectedTags,
          expectedProperties,
          emptyMeasurements,
          expectedBaseData,
        );
      });
      it("should create a Dependency Envelope for MongoDB spans", () => {
        const span = new Span(
          tracer,
          ROOT_CONTEXT,
          "parent span",
          { traceId: "traceid", spanId: "spanId", traceFlags: 0 },
          SpanKind.CLIENT,
          "parentSpanId",
        );
        span.setAttributes({
          [SemanticAttributes.DB_SYSTEM]: DbSystemValues.MONGODB,
          [SemanticAttributes.DB_STATEMENT]: "SELECT * FROM Test",
          "extra.attribute": "foo",
        });
        span.setStatus({
          code: SpanStatusCode.OK,
        });
        span.end();
        const expectedTags: Tags = {};
        expectedTags[KnownContextTagKeys.AiOperationId] = span.spanContext().traceId;
        expectedTags[KnownContextTagKeys.AiOperationParentId] = "parentSpanId";
        const expectedProperties = {
          "extra.attribute": "foo",
        };

        const expectedBaseData: RemoteDependencyData = {
          duration: msToTimeSpan(hrTimeToMilliseconds(span.duration)),
          id: `spanId`,
          success: true,
          resultCode: "0",
          type: "mongodb",
          target: "mongodb",
          data: "SELECT * FROM Test",
          name: `parent span`,
          version: 2,
          properties: expectedProperties,
          measurements: {},
        };

        const envelope = readableSpanToEnvelope(span, "ikey");
        assertEnvelope(
          envelope,
          "Microsoft.ApplicationInsights.RemoteDependency",
          100,
          "RemoteDependencyData",
          expectedTags,
          expectedProperties,
          emptyMeasurements,
          expectedBaseData,
        );
      });
      it("should create a Dependency Envelope for Redis spans", () => {
        const span = new Span(
          tracer,
          ROOT_CONTEXT,
          "parent span",
          { traceId: "traceid", spanId: "spanId", traceFlags: 0 },
          SpanKind.CLIENT,
          "parentSpanId",
        );
        span.setAttributes({
          [SemanticAttributes.DB_SYSTEM]: DbSystemValues.REDIS,
          [SemanticAttributes.DB_STATEMENT]: "SELECT * FROM Test",
          "extra.attribute": "foo",
        });
        span.setStatus({
          code: SpanStatusCode.OK,
        });
        span.end();
        const expectedTags: Tags = {};
        expectedTags[KnownContextTagKeys.AiOperationId] = span.spanContext().traceId;
        expectedTags[KnownContextTagKeys.AiOperationParentId] = "parentSpanId";
        const expectedProperties = {
          "extra.attribute": "foo",
        };

        const expectedBaseData: RemoteDependencyData = {
          duration: msToTimeSpan(hrTimeToMilliseconds(span.duration)),
          id: `spanId`,
          success: true,
          resultCode: "0",
          type: "redis",
          target: "redis",
          data: "SELECT * FROM Test",
          name: `parent span`,
          version: 2,
          properties: expectedProperties,
          measurements: {},
        };

        const envelope = readableSpanToEnvelope(span, "ikey");
        assertEnvelope(
          envelope,
          "Microsoft.ApplicationInsights.RemoteDependency",
          100,
          "RemoteDependencyData",
          expectedTags,
          expectedProperties,
          emptyMeasurements,
          expectedBaseData,
        );
      });
      it("should create a Dependency Envelope for SQL spans", () => {
        const span = new Span(
          tracer,
          ROOT_CONTEXT,
          "parent span",
          { traceId: "traceid", spanId: "spanId", traceFlags: 0 },
          SpanKind.CLIENT,
          "parentSpanId",
        );
        span.setAttributes({
          [SemanticAttributes.DB_SYSTEM]: DbSystemValues.SQLITE,
          [SemanticAttributes.DB_STATEMENT]: "SELECT * FROM Test",
          "extra.attribute": "foo",
        });
        span.setStatus({
          code: SpanStatusCode.OK,
        });
        span.end();
        const expectedTags: Tags = {};
        expectedTags[KnownContextTagKeys.AiOperationId] = span.spanContext().traceId;
        expectedTags[KnownContextTagKeys.AiOperationParentId] = "parentSpanId";
        const expectedProperties = {
          "extra.attribute": "foo",
        };

        const expectedBaseData: RemoteDependencyData = {
          duration: msToTimeSpan(hrTimeToMilliseconds(span.duration)),
          id: `spanId`,
          success: true,
          resultCode: "0",
          type: "SQL",
          target: "sqlite",
          data: "SELECT * FROM Test",
          name: `parent span`,
          version: 2,
          properties: expectedProperties,
          measurements: {},
        };

        const envelope = readableSpanToEnvelope(span, "ikey");
        assertEnvelope(
          envelope,
          "Microsoft.ApplicationInsights.RemoteDependency",
          100,
          "RemoteDependencyData",
          expectedTags,
          expectedProperties,
          emptyMeasurements,
          expectedBaseData,
        );
      });
      it("should create a Dependency Envelope for other database spans", () => {
        const span = new Span(
          tracer,
          ROOT_CONTEXT,
          "parent span",
          { traceId: "traceid", spanId: "spanId", traceFlags: 0 },
          SpanKind.CLIENT,
          "parentSpanId",
        );
        span.setAttributes({
          [SemanticAttributes.DB_SYSTEM]: DbSystemValues.HIVE,
          [SemanticAttributes.DB_OPERATION]: "SELECT * FROM Test",
          [SemanticAttributes.PEER_SERVICE]: "test",
          [SemanticAttributes.DB_NAME]: "test2",
          "extra.attribute": "foo",
        });
        span.setStatus({
          code: SpanStatusCode.OK,
        });
        span.end();
        const expectedTags: Tags = {};
        expectedTags[KnownContextTagKeys.AiOperationId] = span.spanContext().traceId;
        expectedTags[KnownContextTagKeys.AiOperationParentId] = "parentSpanId";
        const expectedProperties = {
          "extra.attribute": "foo",
        };

        const expectedBaseData: RemoteDependencyData = {
          duration: msToTimeSpan(hrTimeToMilliseconds(span.duration)),
          id: `spanId`,
          success: true,
          resultCode: "0",
          type: "hive",
          target: "test|test2",
          data: "SELECT * FROM Test",
          name: `parent span`,
          version: 2,
          properties: expectedProperties,
          measurements: {},
        };

        const envelope = readableSpanToEnvelope(span, "ikey");
        assertEnvelope(
          envelope,
          "Microsoft.ApplicationInsights.RemoteDependency",
          100,
          "RemoteDependencyData",
          expectedTags,
          expectedProperties,
          emptyMeasurements,
          expectedBaseData,
        );
      });
    });
  });
});
