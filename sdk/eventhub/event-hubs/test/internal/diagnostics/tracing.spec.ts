// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import {
  MockInstrumenter,
  MockTracingSpan,
  assert,
  createMockTracingContext,
} from "@azure-tools/test-utils";
import {
  TRACEPARENT_PROPERTY,
  instrumentEventData,
} from "../../../src/diagnostics/instrumentEventData";
import { toSpanOptions, tracingClient } from "../../../src/diagnostics/tracing";

import Sinon from "sinon";

describe("tracing", () => {
  describe("#getAdditionalSpanOptions", () => {
    it("returns the initial set of attributes", () => {
      assert.deepEqual(toSpanOptions({ entityPath: "testPath", host: "testHost" }, "receive"), {
        spanAttributes: {
          "messaging.operation": "receive",
          "messaging.source.name": "testPath",
          "messaging.system": "eventhubs",
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

  describe("#instrumentEventData", () => {
    afterEach(() => {
      Sinon.restore();
    });

    it("is idempotent", () => {
      const tracingClientSpy = Sinon.spy(tracingClient, "startSpan");
      const instrumentedEventData = {
        body: "test",
        properties: {
          [TRACEPARENT_PROPERTY]: "exists",
        },
      };
      const { event, spanContext } = instrumentEventData(
        instrumentedEventData,
        {},
        "testPath",
        "testHost",
        "receive",
      );
      assert.notExists(spanContext);
      assert.equal(event.properties?.[TRACEPARENT_PROPERTY], "exists");
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
      const { event, spanContext } = instrumentEventData(
        { body: "" },
        {},
        "testPath",
        "testHost",
        "receive",
      );
      assert.notExists(spanContext); // was not instrumented
      assert.notExists(event.properties?.[TRACEPARENT_PROPERTY]);
    });

    describe("when the span is valid", () => {
      it("sets the traceparent on eventData", () => {
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

        const { event } = instrumentEventData(
          { body: "test" },
          {},
          "testPath",
          "testHost",
          "receive",
        );

        assert.equal(event.properties?.[TRACEPARENT_PROPERTY], "fake-traceparent-header");
      });
    });
  });
});
