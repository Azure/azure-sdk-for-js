// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { MockTracingSpan } from "@azure-tools/test-utils-vitest";
import { MockInstrumenter, createMockTracingContext } from "@azure-tools/test-utils-vitest";
import {
  TRACEPARENT_PROPERTY,
  instrumentMessage,
  toProcessingSpanOptions,
} from "../../../src/diagnostics/instrumentServiceBusMessage.js";
import { toSpanOptions, tracingClient } from "../../../src/diagnostics/tracing.js";
import type { TracingContext } from "@azure/core-tracing";
import Long from "long";
import type { ServiceBusReceivedMessage } from "../../../src/serviceBusMessage.js";
import { describe, it, vi, afterEach } from "vitest";
import { assert, expect } from "../../public/utils/chai.js";

describe("tracing", () => {
  describe("#getAdditionalSpanOptions", () => {
    it("returns the initial set of attributes", () => {
      assert.deepEqual(toSpanOptions({ entityPath: "testPath", host: "testHost" }, "receive"), {
        spanAttributes: {
          "messaging.operation": "receive",
          "messaging.source.name": "testPath",
          "messaging.system": "servicebus",
          "net.peer.name": "testHost",
        },
      });
    });

    it("sets the spanKind if provided", () => {
      const expectedSpanKind = "client";
      assert.equal(
        toSpanOptions({ entityPath: "", host: "" }, "receive", expectedSpanKind).spanKind,
        expectedSpanKind,
      );
    });
  });

  describe("#instrumentMessage", () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("is idempotent", () => {
      const tracingClientSpy = vi.spyOn(tracingClient, "startSpan");
      const instrumentedMessage = {
        body: "test",
        applicationProperties: {
          [TRACEPARENT_PROPERTY]: "exists",
        },
      };
      const { message, spanContext } = instrumentMessage(
        instrumentedMessage,
        {},
        "testPath",
        "testHost",
        "receive",
      );
      assert.notExists(spanContext);
      assert.equal(message.applicationProperties?.[TRACEPARENT_PROPERTY], "exists");
      expect(tracingClientSpy).not.toHaveBeenCalled();
    });

    it("returns early if the span is not recording", () => {
      const instrumenter = new MockInstrumenter();
      const { span: nonRecordingSpan } = instrumenter.startSpan("test");
      (nonRecordingSpan as MockTracingSpan).setIsRecording(false);
      // Setup our tracingClient to ensure we reach the happy path.
      vi.spyOn(tracingClient, "startSpan").mockReturnValue({
        span: nonRecordingSpan,
        updatedOptions: { tracingOptions: { tracingContext: createMockTracingContext() } },
      });
      const { message, spanContext } = instrumentMessage(
        { body: "", applicationProperties: undefined },
        {},
        "testPath",
        "testHost",
        "receive",
      );
      assert.notExists(spanContext); // was not instrumented
      assert.notExists(message.applicationProperties?.[TRACEPARENT_PROPERTY]);
    });

    describe("when the span is valid", () => {
      it("sets the traceparent on message", () => {
        const instrumenter = new MockInstrumenter();
        const { span: recordingSpan } = instrumenter.startSpan("test");
        (recordingSpan as MockTracingSpan).setIsRecording(true);

        // Setup our tracingClient to ensure we reach the happy path.
        vi.spyOn(tracingClient, "startSpan").mockReturnValue({
          span: recordingSpan,
          updatedOptions: { tracingOptions: { tracingContext: createMockTracingContext() } },
        });
        vi.spyOn(tracingClient, "createRequestHeaders").mockReturnValue({
          traceparent: "fake-traceparent-header",
        });

        const { message } = instrumentMessage(
          { body: "test", applicationProperties: undefined },
          {},
          "testPath",
          "testHost",
          "receive",
        );

        assert.equal(
          message.applicationProperties?.[TRACEPARENT_PROPERTY],
          "fake-traceparent-header",
        );
      });
    });

    describe("#getProcessingSpanOptions", () => {
      it("returns basic span properties", () => {
        const processingSpanOptions = toProcessingSpanOptions(
          [],
          {
            entityPath: "testPath",
          },
          {
            host: "testHost",
          },
          "receive",
        );
        assert.equal(processingSpanOptions.spanKind, "consumer");
        assert.deepEqual(processingSpanOptions.spanAttributes, {
          "messaging.operation": "receive",
          "messaging.source.name": "testPath",
          "messaging.system": "servicebus",
          "net.peer.name": "testHost",
        });
      });

      it("creates spanLinks correctly", () => {
        const enqueuedTimeUtc = new Date();
        const requiredMessageProperties: ServiceBusReceivedMessage = {
          body: "",
          enqueuedTimeUtc,
          partitionKey: undefined,
          sequenceNumber: Long.fromNumber(0),
          applicationProperties: {
            [TRACEPARENT_PROPERTY]: "test",
          },
          state: "active",
          _rawAmqpMessage: {
            body: "",
          },
        };
        const fakeContext = {} as TracingContext;
        vi.spyOn(tracingClient, "parseTraceparentHeader").mockReturnValue(fakeContext);

        const processingSpanOptions = toProcessingSpanOptions(
          [requiredMessageProperties],
          {
            entityPath: "testPath",
          },
          {
            host: "testHost",
          },
          "receive",
        );

        assert.lengthOf(processingSpanOptions.spanLinks!, 1);
        const spanLink = processingSpanOptions.spanLinks![0];
        assert.equal(spanLink.attributes!["enqueuedTime"], enqueuedTimeUtc.getTime());
        assert.equal(spanLink!.tracingContext, fakeContext);
      });
    });

    it("already instrumented messages are skipped", () => {
      const alreadyInstrumentedMessage = {
        body: "hello",
        enqueuedTimeUtc: new Date(),
        applicationProperties: {
          "Diagnostic-Id": "alreadyhasdiagnosticsid",
        },
      };

      const { message, spanContext } = instrumentMessage(
        alreadyInstrumentedMessage,
        {},
        "",
        "",
        "receive",
      );

      assert.equal(
        message,
        alreadyInstrumentedMessage,
        "Messages that are already instrumented do not get copied",
      );
      assert.isUndefined(
        spanContext,
        "Messages that are already instrumented do not get a new Span (or SpanContext)",
      );
    });
  });
});
