// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import {
  MockInstrumenter,
  MockTracingSpan,
  createMockTracingContext,
} from "@azure-tools/test-utils";
import {
  TRACEPARENT_PROPERTY,
  instrumentEventData,
} from "../../../src/diagnostics/instrumentEventData.js";
import { toSpanOptions, tracingClient } from "../../../src/diagnostics/tracing.js";
import { assert, expect } from "../../utils/chai.js";
import { describe, it, afterEach, vi } from "vitest";

describe("tracing", function () {
  describe("#getAdditionalSpanOptions", function () {
    it("returns the initial set of attributes", async function () {
      assert.deepEqual(toSpanOptions({ entityPath: "testPath", host: "testHost" }, "receive"), {
        spanAttributes: {
          "messaging.operation": "receive",
          "messaging.source.name": "testPath",
          "messaging.system": "eventhubs",
          "net.peer.name": "testHost",
        },
      });
    });

    it("sets the spanKind if provided", async function () {
      const expectedSpanKind = "client";
      assert.equal(
        toSpanOptions({ entityPath: "", host: "" }, "receive", expectedSpanKind).spanKind,
        expectedSpanKind,
      );
    });
  });

  describe("#instrumentEventData", function () {
    afterEach(async function () {
      vi.restoreAllMocks();
    });

    it("is idempotent", async function () {
      const tracingClientSpy = vi.spyOn(tracingClient, "startSpan");
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
      expect(tracingClientSpy).toBeCalledTimes(0);
    });

    it("returns early if the span is not recording", async function () {
      const instrumenter = new MockInstrumenter();
      const { span: nonRecordingSpan } = instrumenter.startSpan("test");
      (nonRecordingSpan as MockTracingSpan).setIsRecording(false);
      // Setup our tracingClient to ensure we reach the happy path.
      vi.spyOn(tracingClient, "startSpan").mockReturnValue({
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

    describe("when the span is valid", function () {
      it("sets the traceparent on eventData", async function () {
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
