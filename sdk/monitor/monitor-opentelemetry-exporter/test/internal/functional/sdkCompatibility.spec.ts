// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { context, logs, SeverityNumber, SpanKind, trace } from "@opentelemetry/api";
import { AsyncLocalStorageContextManager } from "@opentelemetry/context-async-hooks";
import type { ExportResult } from "@opentelemetry/core";
import { ExportResultCode } from "@opentelemetry/core";
import { LoggerProvider, SimpleLogRecordProcessor } from "@opentelemetry/sdk-logs";
import { BatchSpanProcessor, SimpleSpanProcessor, TracerProvider } from "@opentelemetry/sdk-trace";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  ApplicationInsightsSampler,
  AzureMonitorLogExporter,
  AzureMonitorTraceExporter,
  RateLimitedSampler,
} from "../../../src/index.js";
import { ConfigurationManager } from "../../../src/_configuration/configurationManager.js";
import type { TelemetryItem as Envelope } from "../../../src/generated/index.js";
import { KnownContextTagKeys } from "../../../src/generated/index.js";

const { send } = vi.hoisted(() => ({
  send: vi.fn<(envelopes: Envelope[]) => Promise<ExportResult>>(),
}));

vi.mock("../../../src/platform/nodejs/httpSender.js", () => ({
  HttpSender: class {
    exportEnvelopes = send;
    shutdown(): Promise<void> {
      return Promise.resolve();
    }
  },
}));

describe("OpenTelemetry SDK compatibility", () => {
  beforeEach(() => {
    vi.spyOn(ConfigurationManager.prototype, "initialize").mockImplementation(() => {});
    send.mockResolvedValue({ code: ExportResultCode.SUCCESS });
  });

  afterEach(() => {
    logs.disable();
    trace.disable();
    context.disable();
    vi.restoreAllMocks();
    send.mockReset();
  });

  it.each([new ApplicationInsightsSampler(0.5), new RateLimitedSampler(0)])(
    "preserves caller attribute types with %s",
    (sampler) => {
      const attributes: Record<string, string | number | boolean> = {
        name: "request",
        count: 1,
        success: true,
      };
      const result = sampler.shouldSample(
        context.active(),
        "1234567890abcdef1234567890abcdef",
        "sample",
        SpanKind.INTERNAL,
        attributes,
        [],
      );
      const returnedAttributes: typeof attributes = result.attributes;
      expect(returnedAttributes).toBe(attributes);
      expect(returnedAttributes).toMatchObject({ name: "request", count: 1, success: true });

      const structuredAttributes = { request: { count: 1 } };
      const structuredResult = sampler.shouldSample(
        context.active(),
        "1234567890abcdef1234567890abcdef",
        "sample",
        SpanKind.INTERNAL,
        structuredAttributes,
        [],
      );
      const returnedStructuredAttributes: typeof structuredAttributes = structuredResult.attributes;
      expect(returnedStructuredAttributes).toBe(structuredAttributes);
      expect(returnedStructuredAttributes.request.count).toBe(1);
    },
  );

  it.each(["simple", "batch"])(
    "exports correlated spans and logs with the %s span processor",
    async (processorType) => {
      const options = {
        connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
        disableOfflineStorage: true,
      };
      const exporter = new AzureMonitorTraceExporter(options);
      const tracerProvider = new TracerProvider({
        spanProcessors: [
          processorType === "simple"
            ? new SimpleSpanProcessor({ exporter })
            : new BatchSpanProcessor({ exporter }),
        ],
      });
      const loggerProvider = new LoggerProvider({
        processors: [
          new SimpleLogRecordProcessor({ exporter: new AzureMonitorLogExporter(options) }),
        ],
      });

      try {
        expect(trace.setGlobalTracerProvider(tracerProvider)).toBe(true);
        expect(logs.setGlobalLoggerProvider(loggerProvider)).toBe(true);
        context.setGlobalContextManager(new AsyncLocalStorageContextManager().enable());

        const tracer = trace.getTracer("sdk-compatibility");
        const parentContext = await tracer.startActiveSpan(
          "parent",
          { kind: SpanKind.SERVER },
          async (parent) => {
            await Promise.resolve();
            logs.getLogger("sdk-compatibility").emit({
              body: "correlated log",
              severityNumber: SeverityNumber.INFO,
            });
            tracer.startSpan("child", { kind: SpanKind.CLIENT }).end();
            parent.end();
            return parent.spanContext();
          },
        );
        await Promise.all([tracerProvider.forceFlush(), loggerProvider.forceFlush()]);

        const envelopes = send.mock.calls.flatMap(([batch]) => batch);
        expect(
          envelopes.filter((envelope) => envelope.data?.baseType !== "MetricData"),
        ).toHaveLength(3);
        expect(envelopes).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              data: expect.objectContaining({ baseType: "RequestData" }),
              tags: expect.objectContaining({
                [KnownContextTagKeys.AiOperationId]: parentContext.traceId,
              }),
            }),
            ...["RemoteDependencyData", "MessageData"].map((baseType) =>
              expect.objectContaining({
                data: expect.objectContaining({ baseType }),
                tags: expect.objectContaining({
                  [KnownContextTagKeys.AiOperationId]: parentContext.traceId,
                  [KnownContextTagKeys.AiOperationParentId]: parentContext.spanId,
                }),
              }),
            ),
          ]),
        );
      } finally {
        await Promise.all([tracerProvider.shutdown(), loggerProvider.shutdown()]);
      }
    },
  );
});
