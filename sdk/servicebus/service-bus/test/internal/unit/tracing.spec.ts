// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import {
  MockInstrumenter,
  MockTracingSpan,
  assert,
  createMockTracingContext,
} from "@azure/test-utils";
import {
  TRACEPARENT_PROPERTY,
  instrumentMessage,
  toProcessingSpanOptions,
} from "../../../src/diagnostics/instrumentServiceBusMessage";
import { toSpanOptions, tracingClient } from "../../../src/diagnostics/tracing";

import Sinon from "sinon";
import { TracingContext } from "@azure/core-tracing";
import Long from "long";
import { ServiceBusReceivedMessage } from "../../../src/serviceBusMessage";

describe("tracing", () => {
  describe("#getAdditionalSpanOptions", () => {
    it("returns the initial set of attributes", () => {
      assert.deepEqual(toSpanOptions({ entityPath: "testPath", host: "testHost" }), {
        spanAttributes: {
          "message_bus.destination": "testPath",
          "peer.address": "testHost",
        },
      });
    });

    it("sets the spanKind if provided", () => {
      const expectedSpanKind = "client";
      assert.equal(
        toSpanOptions({ entityPath: "", host: "" }, expectedSpanKind).spanKind,
        expectedSpanKind
      );
    });
  });

  describe("#instrumentMessage", () => {
    afterEach(() => {
      Sinon.restore();
    });

    it("is idempotent", () => {
      const tracingClientSpy = Sinon.spy(tracingClient, "startSpan");
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
        "testHost"
      );
      assert.notExists(spanContext);
      assert.equal(message.applicationProperties?.[TRACEPARENT_PROPERTY], "exists");
      assert.equal(tracingClientSpy.callCount, 0);
    });

    it("returns early if the span is not recording", () => {
      const instrumenter = new MockInstrumenter();
      const { span: nonRecordingSpan } = instrumenter.startSpan("test");
      (nonRecordingSpan as MockTracingSpan).setIsRecording(false);
      // Setup our tracingClient to ensure we reach the happy path.
      Sinon.stub(tracingClient, "startSpan").returns({
        span: nonRecordingSpan,
        updatedOptions: { tracingOptions: { tracingContext: createMockTracingContext() } },
      });
      const { message, spanContext } = instrumentMessage(
        { body: "", applicationProperties: undefined },
        {},
        "testPath",
        "testHost"
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
        Sinon.stub(tracingClient, "startSpan").returns({
          span: recordingSpan,
          updatedOptions: { tracingOptions: { tracingContext: createMockTracingContext() } },
        });
        Sinon.stub(tracingClient, "createRequestHeaders").returns({
          traceparent: "fake-traceparent-header",
        });

        const { message } = instrumentMessage(
          { body: "test", applicationProperties: undefined },
          {},
          "testPath",
          "testHost"
        );

        assert.equal(
          message.applicationProperties?.[TRACEPARENT_PROPERTY],
          "fake-traceparent-header"
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
          }
        );
        assert.equal(processingSpanOptions.spanKind, "consumer");
        assert.deepEqual(processingSpanOptions.spanAttributes, {
          "message_bus.destination": "testPath",
          "peer.address": "testHost",
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
        Sinon.stub(tracingClient, "parseTraceparentHeader").returns(fakeContext);

        const processingSpanOptions = toProcessingSpanOptions(
          [requiredMessageProperties],
          {
            entityPath: "testPath",
          },
          {
            host: "testHost",
          }
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

      const { message, spanContext } = instrumentMessage(alreadyInstrumentedMessage, {}, "", "");

      assert.equal(
        message,
        alreadyInstrumentedMessage,
        "Messages that are already instrumented do not get copied"
      );
      assert.isUndefined(
        spanContext,
        "Messages that are already instrumented do not get a new Span (or SpanContext)"
      );
    });
  });
});
