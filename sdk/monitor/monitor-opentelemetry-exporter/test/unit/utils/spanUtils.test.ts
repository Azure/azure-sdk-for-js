// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Span, BasicTracerProvider, TracerConfig } from "@opentelemetry/tracing";
import { SpanKind, SpanStatusCode, ROOT_CONTEXT } from "@opentelemetry/api";
import * as assert from "assert";
import { hrTimeToMilliseconds } from "@opentelemetry/core";
import { Resource, SERVICE_RESOURCE } from "@opentelemetry/resources";

import { Tags, Properties, Measurements } from "../../../src/types";
import {
  AI_CLOUD_ROLE,
  AI_CLOUD_ROLE_INSTACE
} from "../../../src/utils/constants/applicationinsights";
import * as http from "../../../src/utils/constants/span/httpAttributes";
import * as grpc from "../../../src/utils/constants/span/grpcAttributes";
import * as ai from "../../../src/utils/constants/applicationinsights";
import { Context, getInstance } from "../../../src/platform";
import { msToTimeSpan } from "../../../src/utils/breezeUtils";
import { readableSpanToEnvelope } from "../../../src/utils/spanUtils";
import { RemoteDependencyData, RequestData } from "../../../src/generated";
import { TelemetryItem as Envelope } from "../../../src/generated";

const context = getInstance(undefined, "./");

const tracerProviderConfig: TracerConfig = {
  resource: new Resource({
    [SERVICE_RESOURCE.INSTANCE_ID]: "testServiceInstanceID",
    [SERVICE_RESOURCE.NAME]: "testServiceName",
    [SERVICE_RESOURCE.NAMESPACE]: "testServiceNamespace"
  })
};

const tracer = new BasicTracerProvider(tracerProviderConfig).getTracer("default");

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
  assert.strictEqual(Context.sdkVersion, ai.packageVersion);
  assert.strictEqual(Object.keys(Context.appVersion).length, 1);
  assert.notDeepStrictEqual(Context.appVersion, "unknown");

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
    [AI_CLOUD_ROLE]: "testServiceNamespace.testServiceName",
    [AI_CLOUD_ROLE_INSTACE]: "testServiceInstanceID"
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
          [grpc.GRPC_STATUS_CODE]: SpanStatusCode.OK,
          [grpc.GRPC_KIND]: SpanKind.SERVER,
          [grpc.GRPC_METHOD]: "/foo.Example/Foo",
          [grpc.GRPC_ERROR_MESSAGE]: "some error message",
          [grpc.GRPC_ERROR_NAME]: "some error name"
        });
        span.setStatus({
          code: SpanStatusCode.OK
        });
        span.end();
        const expectedTags: Tags = {
          [ai.AI_OPERATION_ID]: "traceid",
          [ai.AI_OPERATION_PARENT_ID]: "parentSpanId",
          [ai.AI_OPERATION_NAME]: "/foo.Example/Foo"
        };
        const expectedProperties = {
          "extra.attribute": "foo",
          [grpc.GRPC_ERROR_MESSAGE]: "some error message",
          [grpc.GRPC_ERROR_NAME]: "some error name"
        };

        const expectedBaseData: Partial<RequestData> = {
          source: undefined,
          duration: msToTimeSpan(hrTimeToMilliseconds(span.duration)),
          id: `|${span.spanContext.traceId}.${span.spanContext.spanId}.`,
          success: true,
          responseCode: "1",
          url: "/foo.Example/Foo",
          name: `parent span`,
          version: 1,
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
          [grpc.GRPC_STATUS_CODE]: SpanStatusCode.OK,
          [grpc.GRPC_KIND]: SpanKind.CLIENT,
          [grpc.GRPC_METHOD]: "/foo.Example/Foo",
          [grpc.GRPC_ERROR_MESSAGE]: "some error message",
          [grpc.GRPC_ERROR_NAME]: "some error name"
        });
        span.setStatus({
          code: SpanStatusCode.OK
        });
        span.end();
        const expectedTags: Tags = {
          [ai.AI_OPERATION_ID]: "traceid",
          [ai.AI_OPERATION_PARENT_ID]: "parentSpanId"
        };
        const expectedProperties = {
          "extra.attribute": "foo",
          [grpc.GRPC_ERROR_MESSAGE]: "some error message",
          [grpc.GRPC_ERROR_NAME]: "some error name"
        };

        const expectedBaseData: Partial<RemoteDependencyData> = {
          duration: msToTimeSpan(hrTimeToMilliseconds(span.duration)),
          id: `|${span.spanContext.traceId}.${span.spanContext.spanId}.`,
          success: true,
          resultCode: "1",
          target: "/foo.Example/Foo",
          data: "/foo.Example/Foo",
          type: "GRPC",
          name: `parent span`,
          version: 1,
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
          [ai.AI_OPERATION_ID]: "traceid",
          [ai.AI_OPERATION_PARENT_ID]: "parentSpanId"
        };
        const expectedProperties = {
          "extra.attribute": "foo"
        };

        const expectedBaseData: Partial<RequestData> = {
          duration: msToTimeSpan(hrTimeToMilliseconds(span.duration)),
          id: `|${span.spanContext.traceId}.${span.spanContext.spanId}.`,
          success: true,
          responseCode: "1",
          name: `parent span`,
          version: 1,
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
          [ai.AI_OPERATION_ID]: "traceid",
          [ai.AI_OPERATION_PARENT_ID]: "parentSpanId"
        };
        const expectedProperties = {
          "extra.attribute": "foo"
        };

        const expectedBaseData: Partial<RemoteDependencyData> = {
          duration: msToTimeSpan(hrTimeToMilliseconds(span.duration)),
          id: `|${span.spanContext.traceId}.${span.spanContext.spanId}.`,
          success: true,
          resultCode: "1",
          target: undefined,
          type: "Dependency",
          name: `parent span`,
          version: 1,
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
          [http.HTTP_METHOD]: "GET",
          [http.HTTP_ROUTE]: "/api/example",
          [http.HTTP_URL]: "https://example.com/api/example",
          [http.HTTP_STATUS_CODE]: 200,
          "extra.attribute": "foo"
        });
        span.setStatus({
          code: SpanStatusCode.OK
        });
        span.end();
        const expectedTags: Tags = {
          [ai.AI_OPERATION_ID]: "traceid",
          [ai.AI_OPERATION_PARENT_ID]: "parentSpanId",
          [ai.AI_OPERATION_NAME]: `${span.attributes[http.HTTP_METHOD] as string} ${span.attributes[
            http.HTTP_ROUTE
          ] as string}`
        };
        const expectedProperties = {
          "extra.attribute": "foo"
        };

        const expectedBaseData: RequestData = {
          duration: msToTimeSpan(hrTimeToMilliseconds(span.duration)),
          id: `|${span.spanContext.traceId}.${span.spanContext.spanId}.`,
          success: true,
          responseCode: "200",
          url: "https://example.com/api/example",
          name: `GET /api/example`,
          version: 1,
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
          [http.HTTP_METHOD]: "GET",
          [http.HTTP_URL]: "https://example.com/api/example",
          [http.HTTP_STATUS_CODE]: 200,
          "extra.attribute": "foo"
        });
        span.setStatus({
          code: SpanStatusCode.OK
        });
        span.end();
        const expectedTags: Tags = {
          [ai.AI_OPERATION_ID]: span.spanContext.traceId,
          [ai.AI_OPERATION_PARENT_ID]: "parentSpanId"
        };
        const expectedProperties = {
          "extra.attribute": "foo"
        };

        const expectedBaseData: RemoteDependencyData = {
          duration: msToTimeSpan(hrTimeToMilliseconds(span.duration)),
          id: `|traceid.spanId.`,
          success: true,
          resultCode: "200",
          type: "HTTP",
          target: "example.com",
          data: "https://example.com/api/example",
          name: `GET /api/example`,
          version: 1,
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
