// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import fs from "fs";
import path from "path";
import { Span, BasicTracerProvider, TracerConfig } from "@opentelemetry/sdk-trace-base";
import { SpanKind, SpanStatusCode, ROOT_CONTEXT } from "@opentelemetry/api";
import * as assert from "assert";
import { Resource } from "@opentelemetry/resources";
import {
  DBSYSTEMVALUES_HIVE,
  DBSYSTEMVALUES_MONGODB,
  DBSYSTEMVALUES_MYSQL,
  DBSYSTEMVALUES_POSTGRESQL,
  DBSYSTEMVALUES_REDIS,
  DBSYSTEMVALUES_SQLITE,
  SEMATTRS_DB_NAME,
  SEMATTRS_DB_OPERATION,
  SEMATTRS_DB_STATEMENT,
  SEMATTRS_DB_SYSTEM,
  SEMATTRS_HTTP_HOST,
  SEMATTRS_HTTP_METHOD,
  SEMATTRS_HTTP_ROUTE,
  SEMATTRS_HTTP_STATUS_CODE,
  SEMATTRS_HTTP_URL,
  SEMATTRS_NET_PEER_IP,
  SEMATTRS_PEER_SERVICE,
  SEMATTRS_RPC_GRPC_STATUS_CODE,
  SEMATTRS_RPC_SYSTEM,
  SEMRESATTRS_SERVICE_INSTANCE_ID,
  SEMRESATTRS_SERVICE_NAME,
  SEMRESATTRS_SERVICE_NAMESPACE,
} from "@opentelemetry/semantic-conventions";

import { Tags, Properties, Measurements, MaxPropertyLengths } from "../../src/types";
import { Context, getInstance } from "../../src/platform";
import { readableSpanToEnvelope, spanEventsToEnvelopes } from "../../src/utils/spanUtils";
import {
  RemoteDependencyData,
  RequestData,
  KnownContextTagKeys,
  TelemetryExceptionData,
  MessageData,
} from "../../src/generated";
import { TelemetryItem as Envelope } from "../../src/generated";
import { DependencyTypes } from "../../src/utils/constants/applicationinsights";
import { hrTimeToDate } from "../../src/utils/common";

const context = getInstance();

const tracerProviderConfig: TracerConfig = {
  resource: new Resource({
    [SEMRESATTRS_SERVICE_INSTANCE_ID]: "testServiceInstanceID",
    [SEMRESATTRS_SERVICE_NAME]: "testServiceName",
    [SEMRESATTRS_SERVICE_NAMESPACE]: "testServiceNamespace",
  }),
};

const tracer = new BasicTracerProvider(tracerProviderConfig).getTracer("default");
const packageJsonPath = path.resolve(__dirname, "../../", "./package.json");
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
  assert.deepStrictEqual(
    (envelope?.data?.baseData as Partial<RequestData>).properties,
    expectedProperties,
  );
  assert.deepStrictEqual(
    (envelope?.data?.baseData as Partial<RequestData>).measurements,
    expectedMeasurements,
  );
  // Not posibble to get specific time + duration in these tests
  if (envelope.data?.baseData) {
    delete envelope.data.baseData.duration;
  }
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
          [SEMATTRS_RPC_GRPC_STATUS_CODE]: 123,
          [SEMATTRS_RPC_SYSTEM]: "test rpc system",
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
          [SEMATTRS_RPC_GRPC_STATUS_CODE]: 123,
          [SEMATTRS_RPC_SYSTEM]: "test rpc system",
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
      it("should create success:false Dependency Envelope for Client spans with status code ERROR", () => {
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
          [SEMATTRS_RPC_GRPC_STATUS_CODE]: 400,
          [SEMATTRS_RPC_SYSTEM]: "test rpc system",
        });
        span.setStatus({
          code: SpanStatusCode.ERROR,
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
          id: `${span.spanContext().spanId}`,
          success: false,
          resultCode: "400",
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
          [SEMATTRS_RPC_GRPC_STATUS_CODE]: 123,
          [SEMATTRS_RPC_SYSTEM]: "test rpc system",
          [SEMATTRS_PEER_SERVICE]: "test peer service",
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
      it("should create a Dependency Envelope for Client Spans WCF defined as the RPC system", () => {
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
          [SEMATTRS_RPC_GRPC_STATUS_CODE]: 123,
          [SEMATTRS_RPC_SYSTEM]: DependencyTypes.Wcf,
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
          id: `${span.spanContext().spanId}`,
          success: true,
          resultCode: "123",
          type: "WCF Service",
          target: "WCF Service",
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
          "microsoft.sample_rate": "50",
        });
        span.setStatus({
          code: SpanStatusCode.OK,
        });
        span.end();
        const expectedTime = hrTimeToDate(span.startTime);
        const expectedTags: Tags = {
          [KnownContextTagKeys.AiOperationId]: "traceid",
          [KnownContextTagKeys.AiOperationParentId]: "parentSpanId",
          [KnownContextTagKeys.AiOperationName]: "parent span",
        };
        const expectedBaseData: Partial<RequestData> = {
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

      it("should create a success:false Request Envelope for Server Spans with 4xx status codes", () => {
        const span = new Span(
          tracer,
          ROOT_CONTEXT,
          "parent span",
          { traceId: "traceid", spanId: "spanId", traceFlags: 0 },
          SpanKind.SERVER,
          "parentSpanId",
        );
        span.setAttributes({
          "microsoft.sample_rate": "50",
          [SEMATTRS_HTTP_STATUS_CODE]: 400,
        });
        span.setStatus({
          code: SpanStatusCode.UNSET,
        });
        span.end();
        const expectedTime = hrTimeToDate(span.startTime);
        const expectedTags: Tags = {
          [KnownContextTagKeys.AiOperationId]: "traceid",
          [KnownContextTagKeys.AiOperationParentId]: "parentSpanId",
          [KnownContextTagKeys.AiOperationName]: "parent span",
        };
        const expectedBaseData: Partial<RequestData> = {
          id: `${span.spanContext().spanId}`,
          success: false,
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
        const expectedTime = hrTimeToDate(span.startTime);
        const expectedTags: Tags = {
          [KnownContextTagKeys.AiOperationId]: "traceid",
          [KnownContextTagKeys.AiOperationParentId]: "parentSpanId",
        };
        const expectedProperties = {
          "az.namespace": "Microsoft.EventHub",
        };
        const expectedBaseData: Partial<RequestData> = {
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
          [SEMATTRS_HTTP_METHOD]: "GET",
          [SEMATTRS_HTTP_ROUTE]: "/api/example",
          [SEMATTRS_HTTP_URL]: "https://example.com/api/example",
          [SEMATTRS_HTTP_STATUS_CODE]: 200,
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

        const expectedBaseData: Partial<RequestData> = {
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
          [SEMATTRS_HTTP_METHOD]: "GET",
          [SEMATTRS_HTTP_URL]: "https://example.com/api/example",
          [SEMATTRS_HTTP_STATUS_CODE]: 200,
          [SEMATTRS_NET_PEER_IP]: "192.168.123.132",
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

        const expectedBaseData: Partial<RequestData> = {
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
          [SEMATTRS_HTTP_URL]: "https://example.com/api/example",
          [SEMATTRS_HTTP_STATUS_CODE]: 200,
          [SEMATTRS_NET_PEER_IP]: "192.168.123.132",
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

        const expectedBaseData: Partial<RequestData> = {
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
          [SEMATTRS_HTTP_METHOD]: "GET",
          [SEMATTRS_HTTP_URL]: "https://example.com/api/example",
          [SEMATTRS_PEER_SERVICE]: "https://someotherexample.com/api/example",
          [SEMATTRS_HTTP_STATUS_CODE]: 200,
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

        const expectedBaseData: Partial<RemoteDependencyData> = {
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

        const expectedBaseData: Partial<RemoteDependencyData> = {
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

        const expectedBaseData: Partial<RemoteDependencyData> = {
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
          [SEMATTRS_HTTP_METHOD]: "GET",
          [SEMATTRS_HTTP_HOST]: "http://test:80",
          "extra.attribute": "foo",
        });
        span.end();
        const expectedTags: Tags = {};
        expectedTags[KnownContextTagKeys.AiOperationId] = span.spanContext().traceId;
        expectedTags[KnownContextTagKeys.AiOperationParentId] = "parentSpanId";
        const expectedProperties = {
          "extra.attribute": "foo",
        };

        const expectedBaseData: Partial<RemoteDependencyData> = {
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
          [SEMATTRS_DB_SYSTEM]: DBSYSTEMVALUES_MYSQL,
          [SEMATTRS_DB_STATEMENT]: "SELECT * FROM Test",
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

        const expectedBaseData: Partial<RemoteDependencyData> = {
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
          [SEMATTRS_DB_SYSTEM]: DBSYSTEMVALUES_POSTGRESQL,
          [SEMATTRS_DB_STATEMENT]: "SELECT * FROM Test",
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

        const expectedBaseData: Partial<RemoteDependencyData> = {
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
          [SEMATTRS_DB_SYSTEM]: DBSYSTEMVALUES_MONGODB,
          [SEMATTRS_DB_STATEMENT]: "SELECT * FROM Test",
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

        const expectedBaseData: Partial<RemoteDependencyData> = {
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
          [SEMATTRS_DB_SYSTEM]: DBSYSTEMVALUES_REDIS,
          [SEMATTRS_DB_STATEMENT]: "SELECT * FROM Test",
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

        const expectedBaseData: Partial<RemoteDependencyData> = {
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
          [SEMATTRS_DB_SYSTEM]: DBSYSTEMVALUES_SQLITE,
          [SEMATTRS_DB_STATEMENT]: "SELECT * FROM Test",
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

        const expectedBaseData: Partial<RemoteDependencyData> = {
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
          [SEMATTRS_DB_SYSTEM]: DBSYSTEMVALUES_HIVE,
          [SEMATTRS_DB_OPERATION]: "SELECT * FROM Test",
          [SEMATTRS_PEER_SERVICE]: "test",
          [SEMATTRS_DB_NAME]: "test2",
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

        const expectedBaseData: Partial<RemoteDependencyData> = {
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
  describe("#spanEventsToEnvelopes", () => {
    it("should create exception envelope for server exception events", () => {
      const testError = new Error("test error");
      const span = new Span(
        tracer,
        ROOT_CONTEXT,
        "parent span",
        { traceId: "traceid", spanId: "spanId", traceFlags: 0 },
        SpanKind.SERVER,
        "parentSpanId",
      );
      span.recordException(testError);
      span.end();
      const envelopes = spanEventsToEnvelopes(span, "ikey");

      const expectedTags: Tags = {};
      expectedTags[KnownContextTagKeys.AiOperationId] = span.spanContext().traceId;
      expectedTags[KnownContextTagKeys.AiOperationParentId] = "spanId";
      const expectedProperties = {};
      const testErrorStack = testError.stack;
      const expectedBaseData: Partial<TelemetryExceptionData> = {
        exceptions: [
          {
            hasFullStack: true,
            message: "test error",
            stack: testErrorStack,
            typeName: "Error",
          },
        ],
        version: 2,
        properties: {},
      };

      assertEnvelope(
        envelopes[0],
        "Microsoft.ApplicationInsights.Exception",
        100,
        "ExceptionData",
        expectedTags,
        expectedProperties,
        undefined,
        expectedBaseData,
      );
    });
    it("should not create an envelope for client exception span events", () => {
      const testError = new Error("test error");
      const span = new Span(
        tracer,
        ROOT_CONTEXT,
        "parent span",
        { traceId: "traceid", spanId: "spanId", traceFlags: 0 },
        SpanKind.CLIENT,
        "parentSpanId",
      );
      span.recordException(testError);
      span.end();
      const envelopes = spanEventsToEnvelopes(span, "ikey");

      const expectedTags: Tags = {};
      expectedTags[KnownContextTagKeys.AiOperationId] = span.spanContext().traceId;
      expectedTags[KnownContextTagKeys.AiOperationParentId] = "spanId";
      assert.ok(envelopes.length === 0);
    });
  });
  it("should create message envelope for span events", () => {
    const span = new Span(
      tracer,
      ROOT_CONTEXT,
      "parent span",
      { traceId: "traceid", spanId: "spanId", traceFlags: 0 },
      SpanKind.SERVER,
      "parentSpanId",
    );
    span.addEvent("test event");
    span.end();
    const envelopes = spanEventsToEnvelopes(span, "ikey");

    const expectedTags: Tags = {};
    expectedTags[KnownContextTagKeys.AiOperationId] = span.spanContext().traceId;
    expectedTags[KnownContextTagKeys.AiOperationParentId] = "spanId";
    const expectedProperties = {};
    const expectedBaseData: Partial<MessageData> = {
      message: "test event",
      properties: expectedProperties,
      version: 2,
    };

    assertEnvelope(
      envelopes[0],
      "Microsoft.ApplicationInsights.Message",
      100,
      "MessageData",
      expectedTags,
      expectedProperties,
      undefined,
      expectedBaseData,
    );
  });
  it("should truncate message envelope for span events", () => {
    const message = "a".repeat(MaxPropertyLengths.FIFTEEN_BIT + 1);
    const span = new Span(
      tracer,
      ROOT_CONTEXT,
      "parent span",
      { traceId: "traceid", spanId: "spanId", traceFlags: 0 },
      SpanKind.SERVER,
      "parentSpanId",
    );
    span.addEvent(message);
    span.end();
    const envelopes = spanEventsToEnvelopes(span, "ikey");

    const expectedTags: Tags = {};
    expectedTags[KnownContextTagKeys.AiOperationId] = span.spanContext().traceId;
    expectedTags[KnownContextTagKeys.AiOperationParentId] = "spanId";
    const expectedProperties = {};
    const expectedBaseData: Partial<MessageData> = {
      message: message.substring(0, MaxPropertyLengths.FIFTEEN_BIT),
      properties: expectedProperties,
      version: 2,
    };

    assertEnvelope(
      envelopes[0],
      "Microsoft.ApplicationInsights.Message",
      100,
      "MessageData",
      expectedTags,
      expectedProperties,
      undefined,
      expectedBaseData,
    );
  });
});
