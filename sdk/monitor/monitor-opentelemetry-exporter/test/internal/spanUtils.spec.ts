// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import fs from "node:fs";
import path from "node:path";
import type { TracerConfig } from "@opentelemetry/sdk-trace-base";
import { BasicTracerProvider } from "@opentelemetry/sdk-trace-base";
import type { SpanOptions } from "@opentelemetry/api";
import {
  SpanKind,
  SpanStatusCode,
  ROOT_CONTEXT,
  trace,
  context as OTelContext,
} from "@opentelemetry/api";
import { resourceFromAttributes } from "@opentelemetry/resources";
import {
  ATTR_CLIENT_ADDRESS,
  ATTR_HTTP_REQUEST_METHOD,
  ATTR_HTTP_RESPONSE_STATUS_CODE,
  ATTR_HTTP_ROUTE,
  ATTR_NETWORK_PEER_ADDRESS,
  ATTR_URL_FULL,
  ATTR_USER_AGENT_ORIGINAL,
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
  SEMATTRS_HTTP_SCHEME,
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

import type { Tags, Properties, Measurements } from "../../src/types.js";
import { experimentalOpenTelemetryValues, MaxPropertyLengths } from "../../src/types.js";
import { Context, getInstance } from "../../src/platform/index.js";
import { readableSpanToEnvelope, spanEventsToEnvelopes } from "../../src/utils/spanUtils.js";
import type {
  RemoteDependencyData,
  RequestData,
  TelemetryExceptionData,
  MessageData,
  MonitorDomain,
} from "../../src/generated/index.js";
import { KnownContextTagKeys } from "../../src/generated/index.js";
import type { TelemetryItem as Envelope } from "../../src/generated/index.js";
import { DependencyTypes } from "../../src/utils/constants/applicationinsights.js";
import { hrTimeToDate } from "../../src/utils/common.js";
import { describe, it, assert } from "vitest";
import { spanToReadableSpan } from "../utils/spanToReadableSpan.js";

const context = getInstance();

const tracerProviderConfig: TracerConfig = {
  resource: resourceFromAttributes({
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
  assert.deepStrictEqual(envelope.data?.baseData, expectedBaseData as MonitorDomain);
}

const emptyMeasurements: Measurements = {};

describe("spanUtils.ts", () => {
  describe("#readableSpanToEnvelope", () => {
    describe("GRPC", () => {
      it("should create a Request Envelope for Server Spans", () => {
        const spanOptions: SpanOptions = {
          kind: SpanKind.SERVER,
        };
        const parentSpan = tracer.startSpan("parent span", spanOptions, ROOT_CONTEXT);
        const ctx = trace.setSpan(OTelContext.active(), parentSpan);
        const childSpan = tracer.startSpan("child span", spanOptions, ctx);
        childSpan.setAttributes({
          "extra.attribute": "foo",
          [SEMATTRS_RPC_GRPC_STATUS_CODE]: 123,
          [SEMATTRS_RPC_SYSTEM]: "test rpc system",
          [experimentalOpenTelemetryValues.SYNTHETIC_TYPE]: "test",
        });
        childSpan.setStatus({
          code: SpanStatusCode.OK,
        });
        childSpan.end();
        parentSpan.end();
        const readableSpan = spanToReadableSpan(childSpan);
        const expectedTags: Tags = {
          [KnownContextTagKeys.AiOperationId]: readableSpan.spanContext().traceId,
          [KnownContextTagKeys.AiOperationParentId]: readableSpan.parentSpanContext?.spanId || "",
          [KnownContextTagKeys.AiOperationName]: "child span",
          [KnownContextTagKeys.AiOperationSyntheticSource]: "True",
        };
        const expectedProperties = {
          "extra.attribute": "foo",
        };

        const expectedBaseData: Partial<RequestData> = {
          source: undefined,
          id: `${childSpan.spanContext().spanId}`,
          success: true,
          responseCode: "123",
          name: `child span`,
          version: 2,
          properties: expectedProperties,
          measurements: {},
        };

        const envelope = readableSpanToEnvelope(readableSpan, "ikey");
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
        const spanOptions: SpanOptions = {
          kind: SpanKind.CLIENT,
        };
        const span = tracer.startSpan("parent span", spanOptions, ROOT_CONTEXT);
        span.setAttributes({
          "extra.attribute": "foo",
          [SEMATTRS_RPC_GRPC_STATUS_CODE]: 123,
          [SEMATTRS_RPC_SYSTEM]: "test rpc system",
        });
        span.setStatus({
          code: SpanStatusCode.OK,
        });
        span.end();
        const readableSpan = spanToReadableSpan(span);
        const expectedTags: Tags = {
          [KnownContextTagKeys.AiOperationId]: span.spanContext().traceId,
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
          name: readableSpan.name,
          version: 2,
          properties: expectedProperties,
          measurements: {},
        };

        const envelope = readableSpanToEnvelope(readableSpan, "ikey");
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
        const spanOptions: SpanOptions = {
          kind: SpanKind.CLIENT,
        };
        const span = tracer.startSpan("parent span", spanOptions, ROOT_CONTEXT);
        span.setAttributes({
          "extra.attribute": "foo",
          [SEMATTRS_RPC_GRPC_STATUS_CODE]: 400,
          [SEMATTRS_RPC_SYSTEM]: "test rpc system",
        });
        span.setStatus({
          code: SpanStatusCode.ERROR,
        });
        span.end();
        const readableSpan = spanToReadableSpan(span);
        const expectedTags: Tags = {
          [KnownContextTagKeys.AiOperationId]: span.spanContext().traceId,
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
          name: readableSpan.name,
          version: 2,
          properties: expectedProperties,
          measurements: {},
        };

        const envelope = readableSpanToEnvelope(spanToReadableSpan(span), "ikey");
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
        const spanOptions: SpanOptions = {
          kind: SpanKind.CLIENT,
        };
        const parentSpan = tracer.startSpan("parent span", spanOptions, ROOT_CONTEXT);
        const childSpan = tracer.startSpan(
          "child span",
          spanOptions,
          trace.setSpan(OTelContext.active(), parentSpan),
        );
        childSpan.setAttributes({
          "extra.attribute": "foo",
          [SEMATTRS_RPC_GRPC_STATUS_CODE]: 123,
          [SEMATTRS_RPC_SYSTEM]: "test rpc system",
          [SEMATTRS_PEER_SERVICE]: "test peer service",
          [experimentalOpenTelemetryValues.SYNTHETIC_TYPE]: "bot",
        });
        childSpan.setStatus({
          code: SpanStatusCode.OK,
        });
        parentSpan.end();
        childSpan.end();
        const readableSpan = spanToReadableSpan(childSpan);
        const expectedTags: Tags = {
          [KnownContextTagKeys.AiOperationId]: readableSpan.spanContext().traceId,
          [KnownContextTagKeys.AiOperationParentId]: readableSpan.parentSpanContext?.spanId || "",
          [KnownContextTagKeys.AiOperationSyntheticSource]: "True",
        };
        const expectedProperties = {
          "extra.attribute": "foo",
        };

        const expectedBaseData: Partial<RemoteDependencyData> = {
          id: `${childSpan.spanContext().spanId}`,
          success: true,
          resultCode: "123",
          target: "test peer service",
          type: "GRPC",
          name: `child span`,
          version: 2,
          properties: expectedProperties,
          measurements: {},
        };

        const envelope = readableSpanToEnvelope(readableSpan, "ikey");
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
        const spanOptions: SpanOptions = {
          kind: SpanKind.CLIENT,
        };
        const parentSpan = tracer.startSpan("parent span", spanOptions, ROOT_CONTEXT);
        const ctx = trace.setSpan(OTelContext.active(), parentSpan);
        const childSpan = tracer.startSpan("child span", spanOptions, ctx);
        childSpan.setAttributes({
          "extra.attribute": "foo",
          [SEMATTRS_RPC_GRPC_STATUS_CODE]: 123,
          [SEMATTRS_RPC_SYSTEM]: DependencyTypes.Wcf,
        });
        childSpan.setStatus({
          code: SpanStatusCode.OK,
        });
        childSpan.end();
        parentSpan.end();
        const readableSpan = spanToReadableSpan(childSpan);
        const expectedTags: Tags = {
          [KnownContextTagKeys.AiOperationId]: readableSpan.spanContext().traceId,
          [KnownContextTagKeys.AiOperationParentId]: readableSpan.parentSpanContext?.spanId || "",
        };
        const expectedProperties = {
          "extra.attribute": "foo",
        };

        const expectedBaseData: Partial<RemoteDependencyData> = {
          id: `${childSpan.spanContext().spanId}`,
          success: true,
          resultCode: "123",
          type: "WCF Service",
          target: "WCF Service",
          name: `child span`,
          version: 2,
          properties: expectedProperties,
          measurements: {},
        };

        const envelope = readableSpanToEnvelope(readableSpan, "ikey");
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
        const spanOptions: SpanOptions = {
          kind: SpanKind.SERVER,
        };
        const parentSpan = tracer.startSpan("parent span", spanOptions, ROOT_CONTEXT);
        const ctx = trace.setSpan(OTelContext.active(), parentSpan);
        const childSpan = tracer.startSpan("child span", spanOptions, ctx);
        childSpan.setAttributes({
          "microsoft.sample_rate": "50",
        });
        childSpan.setStatus({
          code: SpanStatusCode.OK,
        });
        childSpan.end();
        parentSpan.end();
        const readableSpan = spanToReadableSpan(childSpan);
        const expectedTime = hrTimeToDate(readableSpan.startTime);
        const expectedTags: Tags = {
          [KnownContextTagKeys.AiOperationId]: readableSpan.spanContext().traceId,
          [KnownContextTagKeys.AiOperationParentId]: readableSpan.parentSpanContext?.spanId || "",
          [KnownContextTagKeys.AiOperationName]: "child span",
        };
        const expectedBaseData: Partial<RequestData> = {
          id: `${childSpan.spanContext().spanId}`,
          success: true,
          responseCode: "0",
          name: `child span`,
          version: 2,
          source: undefined,
          properties: {}, // Should not add sampleRate
          measurements: {},
        };

        const envelope = readableSpanToEnvelope(readableSpan, "ikey");
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
        const spanOptions: SpanOptions = {
          kind: SpanKind.SERVER,
        };
        const parentSpan = tracer.startSpan("parent span", spanOptions, ROOT_CONTEXT);
        const ctx = trace.setSpan(OTelContext.active(), parentSpan);
        const childSpan = tracer.startSpan("child span", spanOptions, ctx);
        childSpan.setAttributes({
          "microsoft.sample_rate": "50",
          [SEMATTRS_HTTP_STATUS_CODE]: 400,
        });
        childSpan.setStatus({
          code: SpanStatusCode.UNSET,
        });
        childSpan.end();
        parentSpan.end();
        const readableSpan = spanToReadableSpan(childSpan);
        const expectedTime = hrTimeToDate(readableSpan.startTime);
        const expectedTags: Tags = {
          [KnownContextTagKeys.AiOperationId]: readableSpan.spanContext().traceId,
          [KnownContextTagKeys.AiOperationParentId]: readableSpan.parentSpanContext?.spanId || "",
          [KnownContextTagKeys.AiOperationName]: readableSpan.name,
        };
        const expectedBaseData: Partial<RequestData> = {
          id: `${childSpan.spanContext().spanId}`,
          success: false,
          responseCode: "0",
          name: `child span`,
          version: 2,
          source: undefined,
          properties: {}, // Should not add sampleRate
          measurements: {},
        };

        const envelope = readableSpanToEnvelope(readableSpan, "ikey");
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
        const spanOptions: SpanOptions = {
          kind: SpanKind.INTERNAL,
        };
        const span = tracer.startSpan("span", spanOptions, ROOT_CONTEXT);
        span.setAttributes({
          "az.namespace": "Microsoft.EventHub",
        });
        span.setStatus({
          code: SpanStatusCode.OK,
        });
        span.end();
        const readableSpan = spanToReadableSpan(span);
        const expectedTime = hrTimeToDate(readableSpan.startTime);
        const expectedTags: Tags = {
          [KnownContextTagKeys.AiOperationId]: readableSpan.spanContext().traceId,
        };
        const expectedProperties = {
          "az.namespace": "Microsoft.EventHub",
        };
        const expectedBaseData: Partial<RequestData> = {
          id: `${span.spanContext().spanId}`,
          name: "span",
          success: true,
          resultCode: "0",
          version: 2,
          type: "InProc | Microsoft.EventHub",
          properties: expectedProperties,
          measurements: {},
        };

        const envelope = readableSpanToEnvelope(readableSpan, "ikey");
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
        const spanOptions: SpanOptions = {
          kind: SpanKind.CLIENT,
        };
        const span = tracer.startSpan("span", spanOptions, ROOT_CONTEXT);
        span.setAttributes({
          "extra.attribute": "foo",
        });
        span.setStatus({
          code: SpanStatusCode.OK,
        });
        span.end();
        const readableSpan = spanToReadableSpan(span);
        const expectedTags: Tags = {
          [KnownContextTagKeys.AiOperationId]: span.spanContext().traceId,
        };
        const expectedProperties = {
          "extra.attribute": "foo",
        };

        const expectedBaseData: Partial<RemoteDependencyData> = {
          id: `${span.spanContext().spanId}`,
          success: true,
          resultCode: "0",
          type: "Dependency",
          name: `${readableSpan.name}`,
          version: 2,
          properties: expectedProperties,
          measurements: {},
        };

        const envelope = readableSpanToEnvelope(spanToReadableSpan(span), "ikey");
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
        const spanOptions: SpanOptions = {
          kind: SpanKind.SERVER,
          links: [{ context: { traceId: "traceId", spanId: "spanId", traceFlags: 0 } }],
        };
        const parentSpan = tracer.startSpan("parent span", spanOptions, ROOT_CONTEXT);
        const ctx = trace.setSpan(OTelContext.active(), parentSpan);
        const childSpan = tracer.startSpan("child span", spanOptions, ctx);
        childSpan.setAttributes({
          [SEMATTRS_HTTP_METHOD]: "GET",
          [SEMATTRS_HTTP_ROUTE]: "/api/example",
          [SEMATTRS_HTTP_URL]: "https://example.com/api/example",
          [SEMATTRS_HTTP_STATUS_CODE]: 200,
          [SEMATTRS_HTTP_SCHEME]: "https",
          "extra.attribute": "foo",
        });
        childSpan.setStatus({
          code: SpanStatusCode.OK,
        });
        childSpan.end();
        parentSpan.end();
        const readableSpan = spanToReadableSpan(childSpan);
        const expectedTags: Tags = {};
        expectedTags[KnownContextTagKeys.AiOperationId] = readableSpan.spanContext().traceId;
        expectedTags[KnownContextTagKeys.AiOperationParentId] =
          readableSpan.parentSpanContext?.spanId || "";
        expectedTags[KnownContextTagKeys.AiOperationName] = "GET /api/example";
        const expectedProperties = {
          "extra.attribute": "foo",
          "_MS.links": JSON.stringify([{ operation_Id: "traceId", id: "spanId" }]),
        };

        const expectedBaseData: Partial<RequestData> = {
          id: `${childSpan.spanContext().spanId}`,
          success: true,
          responseCode: "200",
          url: "https://example.com/api/example",
          name: expectedTags[KnownContextTagKeys.AiOperationName],
          version: 2,
          source: undefined,
          properties: expectedProperties,
          measurements: {},
        };

        const envelope = readableSpanToEnvelope(readableSpan, "ikey");
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
      it("(HTTP) [new sem conv] should create a Request Envelope for Server Spans", () => {
        const spanOptions: SpanOptions = {
          links: [{ context: { traceId: "traceid", spanId: "spanId", traceFlags: 0 } }],
          kind: SpanKind.SERVER,
        };
        const span = tracer.startSpan("parent span", spanOptions, ROOT_CONTEXT);
        span.setAttributes({
          [ATTR_HTTP_REQUEST_METHOD]: "GET",
          [ATTR_HTTP_ROUTE]: "/api/example",
          [ATTR_URL_FULL]: "https://example.com/api/example",
          [ATTR_HTTP_RESPONSE_STATUS_CODE]: 200,
          [ATTR_CLIENT_ADDRESS]: "10.1.2.80",
          [ATTR_USER_AGENT_ORIGINAL]: "test",
          "extra.attribute": "foo",
        });
        span.setStatus({
          code: SpanStatusCode.OK,
        });
        span.end();
        const expectedTags: Tags = {};
        expectedTags[KnownContextTagKeys.AiOperationId] = span.spanContext().traceId;
        expectedTags[KnownContextTagKeys.AiOperationName] = "GET /api/example";
        expectedTags[KnownContextTagKeys.AiLocationIp] = "10.1.2.80";
        expectedTags["ai.user.userAgent"] = "test";
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

        const envelope = readableSpanToEnvelope(spanToReadableSpan(span), "ikey");
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
        const spanOptions: SpanOptions = {
          kind: SpanKind.SERVER,
        };
        const span = tracer.startSpan("span", spanOptions, ROOT_CONTEXT);
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
        expectedTags[KnownContextTagKeys.AiOperationId] = span.spanContext().traceId;
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

        const envelope = readableSpanToEnvelope(spanToReadableSpan(span), "ikey");
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
      it("[new sem conv] should set AiOperationName when only httpUrl is set", () => {
        const spanOptions: SpanOptions = {
          kind: SpanKind.SERVER,
        };
        const span = tracer.startSpan("span", spanOptions, ROOT_CONTEXT);
        span.setAttributes({
          [ATTR_HTTP_REQUEST_METHOD]: "GET",
          [ATTR_URL_FULL]: "https://example.com/api/example",
          [ATTR_HTTP_RESPONSE_STATUS_CODE]: 200,
          [ATTR_NETWORK_PEER_ADDRESS]: "192.168.123.132",
          "extra.attribute": "foo",
        });
        span.setStatus({
          code: SpanStatusCode.OK,
        });
        span.end();
        const expectedTags: Tags = {};
        expectedTags[KnownContextTagKeys.AiOperationId] = span.spanContext().traceId;
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

        const envelope = readableSpanToEnvelope(spanToReadableSpan(span), "ikey");
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
        const spanOptions: SpanOptions = {
          kind: SpanKind.SERVER,
        };
        const span = tracer.startSpan("span", spanOptions, ROOT_CONTEXT);
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
        expectedTags[KnownContextTagKeys.AiOperationId] = span.spanContext().traceId;
        expectedTags[KnownContextTagKeys.AiOperationName] = "span";
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

        const envelope = readableSpanToEnvelope(spanToReadableSpan(span), "ikey");
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
      it("[new sem conv] should set AiLocationIp when httpMethod not set and netPeerIp is", () => {
        const spanOptions: SpanOptions = {
          kind: SpanKind.SERVER,
        };
        const span = tracer.startSpan("span", spanOptions, ROOT_CONTEXT);
        span.setAttributes({
          [ATTR_URL_FULL]: "https://example.com/api/example",
          [ATTR_HTTP_RESPONSE_STATUS_CODE]: 200,
          [ATTR_NETWORK_PEER_ADDRESS]: "192.168.123.132",
          "extra.attribute": "foo",
        });
        span.setStatus({
          code: SpanStatusCode.OK,
        });
        span.end();
        const expectedTags: Tags = {};
        expectedTags[KnownContextTagKeys.AiOperationId] = span.spanContext().traceId;
        expectedTags[KnownContextTagKeys.AiOperationName] = "span";
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

        const envelope = readableSpanToEnvelope(spanToReadableSpan(span), "ikey");
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
        const spanOptions: SpanOptions = {
          kind: SpanKind.CLIENT,
        };
        const parentSpan = tracer.startSpan("parent span", spanOptions, ROOT_CONTEXT);
        // Get the parent span context to assign to the child span
        const ctx = trace.setSpan(OTelContext.active(), parentSpan);
        const childSpan = tracer.startSpan("child span", {}, ctx);
        childSpan.setAttributes({
          [SEMATTRS_HTTP_METHOD]: "GET",
          [SEMATTRS_HTTP_URL]: "https://example.com/api/example",
          [SEMATTRS_PEER_SERVICE]: "https://someotherexample.com/api/example",
          [SEMATTRS_HTTP_STATUS_CODE]: 200,
          [SEMATTRS_HTTP_SCHEME]: "https",
          "extra.attribute": "foo",
        });
        childSpan.setStatus({
          code: SpanStatusCode.OK,
        });
        childSpan.end();
        parentSpan.end();
        const readableSpan = spanToReadableSpan(childSpan);
        const expectedTags: Tags = {};
        expectedTags[KnownContextTagKeys.AiOperationId] = readableSpan.spanContext().traceId;
        expectedTags[KnownContextTagKeys.AiOperationParentId] =
          readableSpan.parentSpanContext?.spanId || "";
        const expectedProperties = {
          "extra.attribute": "foo",
        };

        const expectedBaseData: Partial<RemoteDependencyData> = {
          id: readableSpan.spanContext().spanId,
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

        const envelope = readableSpanToEnvelope(readableSpan, "ikey");
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
      it("[new sem conv] should create a Dependency Envelope for Client Spans", () => {
        const spanOptions: SpanOptions = {
          kind: SpanKind.CLIENT,
        };
        const parentSpan = tracer.startSpan("parent span", spanOptions, ROOT_CONTEXT);
        const ctx = trace.setSpan(OTelContext.active(), parentSpan);
        const childSpan = tracer.startSpan("child span", {}, ctx);
        childSpan.setAttributes({
          [ATTR_HTTP_REQUEST_METHOD]: "GET",
          [ATTR_URL_FULL]: "https://example.com/api/example",
          [SEMATTRS_PEER_SERVICE]: "https://someotherexample.com/api/example",
          [ATTR_HTTP_RESPONSE_STATUS_CODE]: 200,
          "extra.attribute": "foo",
        });
        childSpan.setStatus({
          code: SpanStatusCode.OK,
        });
        childSpan.end();
        parentSpan.end();
        const readableSpan = spanToReadableSpan(childSpan);
        const expectedTags: Tags = {};
        expectedTags[KnownContextTagKeys.AiOperationId] = readableSpan.spanContext().traceId;
        expectedTags[KnownContextTagKeys.AiOperationParentId] =
          readableSpan.parentSpanContext?.spanId || "";
        const expectedProperties = {
          "extra.attribute": "foo",
        };

        const expectedBaseData: Partial<RemoteDependencyData> = {
          id: readableSpan.spanContext().spanId,
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

        const envelope = readableSpanToEnvelope(readableSpan, "ikey");
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
      it("Request Envelope success value should be set to false if HTTP > 400 with SpanStatus to UNSET", () => {
        const spanOptions: SpanOptions = {
          kind: SpanKind.SERVER,
        };
        const span = tracer.startSpan("span", spanOptions, ROOT_CONTEXT);

        span.setAttributes({ [ATTR_HTTP_RESPONSE_STATUS_CODE]: 404 });
        span.setStatus({
          code: SpanStatusCode.UNSET,
        });
        span.end();
        const readableSpan = spanToReadableSpan(span);

        const envelope = readableSpanToEnvelope(readableSpan, "ikey");
        assert.strictEqual(envelope.data!.baseData!.success, false);
      });
      it("Request Envelope should not override user set SpanStatus", () => {
        const spanOptions: SpanOptions = {
          kind: SpanKind.SERVER,
        };
        const span = tracer.startSpan("span", spanOptions, ROOT_CONTEXT);

        span.setAttributes({ [ATTR_HTTP_RESPONSE_STATUS_CODE]: 404 });
        span.setStatus({
          code: SpanStatusCode.OK,
        });
        span.end();
        const readableSpan = spanToReadableSpan(span);
        const envelope = readableSpanToEnvelope(readableSpan, "ikey");
        assert.strictEqual(envelope.data!.baseData!.success, true);
      });
    });

    describe("createDepenedencyData", () => {
      it("should create a Dependency Envelope for Producer Spans", () => {
        const spanOptions: SpanOptions = {
          kind: SpanKind.PRODUCER,
        };
        const parentSpan = tracer.startSpan("parent span", spanOptions, ROOT_CONTEXT);
        const ctx = trace.setSpan(OTelContext.active(), parentSpan);
        const childSpan = tracer.startSpan("child span", spanOptions, ctx);
        childSpan.setAttributes({
          "extra.attribute": "foo",
        });
        childSpan.end();
        parentSpan.end();
        const readableSpan = spanToReadableSpan(childSpan);
        const expectedTags: Tags = {};
        expectedTags[KnownContextTagKeys.AiOperationId] = readableSpan.spanContext().traceId;
        expectedTags[KnownContextTagKeys.AiOperationParentId] =
          readableSpan.parentSpanContext?.spanId || "";
        const expectedProperties = {
          "extra.attribute": "foo",
        };

        const expectedBaseData: Partial<RemoteDependencyData> = {
          id: readableSpan.spanContext().spanId,
          success: true,
          resultCode: "0",
          type: "Queue Message",
          name: "child span",
          version: 2,
          properties: expectedProperties,
          measurements: {},
        };

        const envelope = readableSpanToEnvelope(readableSpan, "ikey");
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
        const spanOptions: SpanOptions = {
          kind: SpanKind.INTERNAL,
        };
        const span = tracer.startSpan("span", spanOptions, ROOT_CONTEXT);
        span.setAttributes({
          "extra.attribute": "foo",
        });
        span.end();
        const expectedTags: Tags = {};
        expectedTags[KnownContextTagKeys.AiOperationId] = span.spanContext().traceId;
        const expectedProperties = {
          "extra.attribute": "foo",
        };

        const expectedBaseData: Partial<RemoteDependencyData> = {
          id: span.spanContext().spanId,
          success: true,
          resultCode: "0",
          type: "InProc",
          name: "span",
          version: 2,
          properties: expectedProperties,
          measurements: {},
        };

        const envelope = readableSpanToEnvelope(spanToReadableSpan(span), "ikey");
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
        const spanOptions: SpanOptions = {
          kind: SpanKind.INTERNAL,
        };
        const span = tracer.startSpan("span", spanOptions, ROOT_CONTEXT);
        span.setAttributes({
          [SEMATTRS_HTTP_METHOD]: "GET",
          [SEMATTRS_HTTP_HOST]: "http://test:80",
          "extra.attribute": "foo",
        });
        span.end();
        const expectedTags: Tags = {};
        expectedTags[KnownContextTagKeys.AiOperationId] = span.spanContext().traceId;
        const expectedProperties = {
          "extra.attribute": "foo",
        };

        const expectedBaseData: Partial<RemoteDependencyData> = {
          id: `${span.spanContext().spanId}`,
          success: true,
          resultCode: "0",
          type: "Http",
          name: "span",
          version: 2,
          properties: expectedProperties,
          measurements: {},
          target: "http://test",
          data: "",
        };

        const envelope = readableSpanToEnvelope(spanToReadableSpan(span), "ikey");
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
        const spanOptions: SpanOptions = {
          kind: SpanKind.CLIENT,
        };
        const span = tracer.startSpan("span", spanOptions, ROOT_CONTEXT);
        span.setAttributes({
          [SEMATTRS_DB_SYSTEM]: DBSYSTEMVALUES_MYSQL,
          [SEMATTRS_DB_STATEMENT]: "SELECT * FROM Test",
          "extra.attribute": "foo",
        });
        span.setStatus({
          code: SpanStatusCode.OK,
        });
        span.end();
        const readableSpan = spanToReadableSpan(span);
        const expectedTags: Tags = {};
        expectedTags[KnownContextTagKeys.AiOperationId] = span.spanContext().traceId;
        const expectedProperties = {
          "extra.attribute": "foo",
        };

        const expectedBaseData: Partial<RemoteDependencyData> = {
          id: `${span.spanContext().spanId}`,
          success: true,
          resultCode: "0",
          type: "mysql",
          target: "mysql",
          data: "SELECT * FROM Test",
          name: readableSpan.name,
          version: 2,
          properties: expectedProperties,
          measurements: {},
        };

        const envelope = readableSpanToEnvelope(spanToReadableSpan(span), "ikey");
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
        const spanOptions: SpanOptions = {
          kind: SpanKind.CLIENT,
        };
        const span = tracer.startSpan("span", spanOptions, ROOT_CONTEXT);
        span.setAttributes({
          [SEMATTRS_DB_SYSTEM]: DBSYSTEMVALUES_POSTGRESQL,
          [SEMATTRS_DB_STATEMENT]: "SELECT * FROM Test",
          "extra.attribute": "foo",
        });
        span.setStatus({
          code: SpanStatusCode.OK,
        });
        span.end();
        const readableSpan = spanToReadableSpan(span);
        const expectedTags: Tags = {};
        expectedTags[KnownContextTagKeys.AiOperationId] = span.spanContext().traceId;
        const expectedProperties = {
          "extra.attribute": "foo",
        };

        const expectedBaseData: Partial<RemoteDependencyData> = {
          id: `${span.spanContext().spanId}`,
          success: true,
          resultCode: "0",
          type: "postgresql",
          target: "postgresql",
          data: "SELECT * FROM Test",
          name: readableSpan.name,
          version: 2,
          properties: expectedProperties,
          measurements: {},
        };

        const envelope = readableSpanToEnvelope(spanToReadableSpan(span), "ikey");
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
        const spanOptions: SpanOptions = {
          kind: SpanKind.CLIENT,
        };
        const span = tracer.startSpan("span", spanOptions, ROOT_CONTEXT);
        span.setAttributes({
          [SEMATTRS_DB_SYSTEM]: DBSYSTEMVALUES_MONGODB,
          [SEMATTRS_DB_STATEMENT]: "SELECT * FROM Test",
          "extra.attribute": "foo",
        });
        span.setStatus({
          code: SpanStatusCode.OK,
        });
        span.end();
        const readableSpan = spanToReadableSpan(span);
        const expectedTags: Tags = {};
        expectedTags[KnownContextTagKeys.AiOperationId] = span.spanContext().traceId;
        const expectedProperties = {
          "extra.attribute": "foo",
        };

        const expectedBaseData: Partial<RemoteDependencyData> = {
          id: `${span.spanContext().spanId}`,
          success: true,
          resultCode: "0",
          type: "mongodb",
          target: "mongodb",
          data: "SELECT * FROM Test",
          name: `${readableSpan.name}`,
          version: 2,
          properties: expectedProperties,
          measurements: {},
        };

        const envelope = readableSpanToEnvelope(spanToReadableSpan(span), "ikey");
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
        const spanOptions: SpanOptions = {
          kind: SpanKind.CLIENT,
        };
        const span = tracer.startSpan("span", spanOptions, ROOT_CONTEXT);
        span.setAttributes({
          [SEMATTRS_DB_SYSTEM]: DBSYSTEMVALUES_REDIS,
          [SEMATTRS_DB_STATEMENT]: "SELECT * FROM Test",
          "extra.attribute": "foo",
        });
        span.setStatus({
          code: SpanStatusCode.OK,
        });
        span.end();
        const readableSpan = spanToReadableSpan(span);
        const expectedTags: Tags = {};
        expectedTags[KnownContextTagKeys.AiOperationId] = span.spanContext().traceId;
        const expectedProperties = {
          "extra.attribute": "foo",
        };

        const expectedBaseData: Partial<RemoteDependencyData> = {
          id: `${span.spanContext().spanId}`,
          success: true,
          resultCode: "0",
          type: "redis",
          target: "redis",
          data: "SELECT * FROM Test",
          name: `${readableSpan.name}`,
          version: 2,
          properties: expectedProperties,
          measurements: {},
        };

        const envelope = readableSpanToEnvelope(spanToReadableSpan(span), "ikey");
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
        const spanOptions: SpanOptions = {
          kind: SpanKind.CLIENT,
        };
        const span = tracer.startSpan("span", spanOptions, ROOT_CONTEXT);
        span.setAttributes({
          [SEMATTRS_DB_SYSTEM]: DBSYSTEMVALUES_SQLITE,
          [SEMATTRS_DB_STATEMENT]: "SELECT * FROM Test",
          "extra.attribute": "foo",
        });
        span.setStatus({
          code: SpanStatusCode.OK,
        });
        span.end();
        const readableSpan = spanToReadableSpan(span);
        const expectedTags: Tags = {};
        expectedTags[KnownContextTagKeys.AiOperationId] = span.spanContext().traceId;
        const expectedProperties = {
          "extra.attribute": "foo",
        };

        const expectedBaseData: Partial<RemoteDependencyData> = {
          id: `${span.spanContext().spanId}`,
          success: true,
          resultCode: "0",
          type: "SQL",
          target: "sqlite",
          data: "SELECT * FROM Test",
          name: `${readableSpan.name}`,
          version: 2,
          properties: expectedProperties,
          measurements: {},
        };

        const envelope = readableSpanToEnvelope(spanToReadableSpan(span), "ikey");
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
        const spanOptions: SpanOptions = {
          kind: SpanKind.CLIENT,
        };
        const span = tracer.startSpan("span", spanOptions, ROOT_CONTEXT);
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
        const readableSpan = spanToReadableSpan(span);
        const expectedTags: Tags = {};
        expectedTags[KnownContextTagKeys.AiOperationId] = span.spanContext().traceId;
        const expectedProperties = {
          "extra.attribute": "foo",
        };

        const expectedBaseData: Partial<RemoteDependencyData> = {
          id: `${span.spanContext().spanId}`,
          success: true,
          resultCode: "0",
          type: "hive",
          target: "test|test2",
          data: "SELECT * FROM Test",
          name: `${readableSpan.name}`,
          version: 2,
          properties: expectedProperties,
          measurements: {},
        };

        const envelope = readableSpanToEnvelope(spanToReadableSpan(span), "ikey");
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
    it("should create exception envelope for remote exception events", () => {
      const testError = new Error("test error");
      const span = tracer.startSpan("parent span", {}, ROOT_CONTEXT);
      span.recordException(testError);
      span.end();
      const envelopes = spanEventsToEnvelopes(spanToReadableSpan(span), "ikey");

      const expectedTags: Tags = {};
      expectedTags[KnownContextTagKeys.AiOperationId] = span.spanContext().traceId;
      expectedTags[KnownContextTagKeys.AiOperationParentId] = span.spanContext().spanId;
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
  });
  it("should create an envelope for internal exception span events", () => {
    const testError = new Error("test error");
    const spanOptions: SpanOptions = {
      kind: SpanKind.INTERNAL,
    };
    const span = tracer.startSpan("span", spanOptions, ROOT_CONTEXT);
    span.recordException(testError);
    span.end();
    const envelopes = spanEventsToEnvelopes(spanToReadableSpan(span), "ikey");

    const expectedTags: Tags = {};
    expectedTags[KnownContextTagKeys.AiOperationId] = span.spanContext().traceId;
    assert.ok(envelopes.length === 1);
  });
  it("should create message envelope for span events", () => {
    const spanOptions: SpanOptions = {
      kind: SpanKind.SERVER,
    };
    const span = tracer.startSpan("span", spanOptions, ROOT_CONTEXT);
    span.addEvent("test event");
    span.end();
    const envelopes = spanEventsToEnvelopes(spanToReadableSpan(span), "ikey");

    const expectedTags: Tags = {};
    expectedTags[KnownContextTagKeys.AiOperationId] = span.spanContext().traceId;
    expectedTags[KnownContextTagKeys.AiOperationParentId] = span.spanContext().spanId;
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
    const spanOptions: SpanOptions = {
      kind: SpanKind.SERVER,
    };
    const span = tracer.startSpan("span", spanOptions, ROOT_CONTEXT);
    span.addEvent(message);
    span.end();
    const envelopes = spanEventsToEnvelopes(spanToReadableSpan(span), "ikey");

    const expectedTags: Tags = {};
    expectedTags[KnownContextTagKeys.AiOperationId] = span.spanContext().traceId;
    expectedTags[KnownContextTagKeys.AiOperationParentId] = span.spanContext().spanId;
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
  it("should ensure ATTR_ENDUSER_ID is not included in properties", () => {
    const spanOptions: SpanOptions = {
      kind: SpanKind.SERVER,
    };
    const span = tracer.startSpan("span", spanOptions, ROOT_CONTEXT);
    span.setAttributes({
      [experimentalOpenTelemetryValues.ATTR_ENDUSER_ID]: "test-user-id",
      "extra.attribute": "foo",
    });
    span.setStatus({
      code: SpanStatusCode.OK,
    });
    span.end();
    const readableSpan = spanToReadableSpan(span);
    const expectedTags: Tags = {};
    expectedTags[KnownContextTagKeys.AiOperationId] = span.spanContext().traceId;
    expectedTags[KnownContextTagKeys.AiUserAuthUserId] = "test-user-id";
    expectedTags[KnownContextTagKeys.AiOperationName] = "span";

    const expectedProperties = {
      "extra.attribute": "foo",
    };

    const expectedBaseData: Partial<RequestData> = {
      id: `${span.spanContext().spanId}`,
      success: true,
      responseCode: "0",
      name: `span`,
      version: 2,
      source: undefined,
      properties: expectedProperties,
      measurements: {},
    };

    const envelope = readableSpanToEnvelope(readableSpan, "ikey");
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

    // Specifically verify that ATTR_ENDUSER_ID is not in properties
    assert.ok(
      !envelope.data?.baseData?.properties?.[experimentalOpenTelemetryValues.ATTR_ENDUSER_ID],
      "ATTR_ENDUSER_ID should not be included in properties",
    );
  });

  it("should ensure ATTR_ENDUSER_PSEUDO_ID is mapped to ai.user.id and not included in properties", () => {
    const spanOptions: SpanOptions = {
      kind: SpanKind.SERVER,
    };
    const span = tracer.startSpan("span", spanOptions, ROOT_CONTEXT);
    span.setAttributes({
      [experimentalOpenTelemetryValues.ATTR_ENDUSER_PSEUDO_ID]: "test-pseudo-user-id",
      "extra.attribute": "foo",
    });
    span.setStatus({
      code: SpanStatusCode.OK,
    });
    span.end();
    const readableSpan = spanToReadableSpan(span);
    const expectedTags: Tags = {};
    expectedTags[KnownContextTagKeys.AiOperationId] = span.spanContext().traceId;
    expectedTags[KnownContextTagKeys.AiUserId] = "test-pseudo-user-id";
    expectedTags[KnownContextTagKeys.AiOperationName] = "span";

    const expectedProperties = {
      "extra.attribute": "foo",
    };

    const expectedBaseData: Partial<RequestData> = {
      id: `${span.spanContext().spanId}`,
      success: true,
      responseCode: "0",
      name: `span`,
      version: 2,
      source: undefined,
      properties: expectedProperties,
      measurements: {},
    };

    const envelope = readableSpanToEnvelope(readableSpan, "ikey");
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

    // Specifically verify that ATTR_ENDUSER_PSEUDO_ID is not in properties
    assert.ok(
      !envelope.data?.baseData?.properties?.[
        experimentalOpenTelemetryValues.ATTR_ENDUSER_PSEUDO_ID
      ],
      "ATTR_ENDUSER_PSEUDO_ID should not be included in properties",
    );
  });
});
