// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createProcessingSpan, trace } from "../../src/partitionPump";
import {
  SpanStatusCode,
  SpanKind,
  SpanOptions,
  Context,
  setSpanContext,
  context
} from "@azure/core-tracing";
import { TestSpan, TestTracer } from "@azure/test-utils";
import chai from "chai";
import { ReceivedEventData } from "../../src/eventData";
import { instrumentEventData } from "../../src/diagnostics/instrumentEventData";
import { setTracerForTest } from "../public/utils/testUtils";

const should = chai.should();

describe("PartitionPump", () => {
  describe("telemetry", () => {
    const eventHubProperties = {
      host: "thehost",
      entityPath: "theeventhubname"
    };

    class TestTracer2 extends TestTracer {
      public spanOptions: SpanOptions | undefined;
      public spanName: string | undefined;
      public context: Context | undefined;

      startSpan(nameArg: string, optionsArg?: SpanOptions, contextArg?: Context): TestSpan {
        this.spanName = nameArg;
        this.spanOptions = optionsArg;
        this.context = contextArg;
        return super.startSpan(nameArg, optionsArg, this.context);
      }
    }

    it("basic span properties are set", async () => {
      const { tracer, resetTracer } = setTracerForTest(new TestTracer2());
      const fakeParentSpanContext = setSpanContext(
        context.active(),
        tracer.startSpan("test").spanContext()
      );

      await createProcessingSpan([], eventHubProperties, {
        tracingOptions: {
          tracingContext: fakeParentSpanContext
        }
      });

      should.equal(tracer.spanName, "Azure.EventHubs.process");

      should.exist(tracer.spanOptions);
      tracer.spanOptions!.kind!.should.equal(SpanKind.CONSUMER);
      tracer.context!.should.equal(fakeParentSpanContext);

      const attributes = tracer.getActiveSpans().find((s) => s.name === "Azure.EventHubs.process")
        ?.attributes;

      attributes!.should.deep.equal({
        "az.namespace": "Microsoft.EventHub",
        "message_bus.destination": eventHubProperties.entityPath,
        "peer.address": eventHubProperties.host
      });

      resetTracer();
    });

    it("received events are linked to this span using Diagnostic-Id", async () => {
      const requiredEventProperties = {
        body: "",
        enqueuedTimeUtc: new Date(),
        offset: 0,
        partitionKey: null,
        sequenceNumber: 0,
        getRawAmqpMessage() {
          return {} as any;
        }
      };

      const { tracer, resetTracer } = setTracerForTest(new TestTracer2());

      const firstEvent = tracer.startSpan("a");
      const thirdEvent = tracer.startSpan("c");

      const receivedEvents: ReceivedEventData[] = [
        instrumentEventData(
          { ...requiredEventProperties },
          {
            tracingOptions: {
              tracingContext: setSpanContext(context.active(), firstEvent.spanContext())
            }
          },
          "entityPath",
          "host"
        ).event as ReceivedEventData,
        { properties: {}, ...requiredEventProperties }, // no diagnostic ID means it gets skipped
        instrumentEventData(
          { ...requiredEventProperties },
          {
            tracingOptions: {
              tracingContext: setSpanContext(context.active(), thirdEvent.spanContext())
            }
          },
          "entityPath",
          "host"
        ).event as ReceivedEventData
      ];

      await createProcessingSpan(receivedEvents, eventHubProperties, {});

      // middle event, since it has no trace information, doesn't get included
      // in the telemetry
      tracer.spanOptions!.links!.length.should.equal(3 - 1);
      // the test tracer just hands out a string integer that just gets
      // incremented
      tracer.spanOptions!.links![0]!.context.traceId.should.equal(firstEvent.spanContext().traceId);
      (tracer.spanOptions!.links![0]!.attributes!.enqueuedTime as number).should.equal(
        requiredEventProperties.enqueuedTimeUtc.getTime()
      );
      tracer.spanOptions!.links![1]!.context.traceId.should.equal(thirdEvent.spanContext().traceId);
      (tracer.spanOptions!.links![1]!.attributes!.enqueuedTime as number).should.equal(
        requiredEventProperties.enqueuedTimeUtc.getTime()
      );

      resetTracer();
    });

    it("trace - normal", async () => {
      const tracer = new TestTracer();
      const span = tracer.startSpan("whatever");

      await trace(async () => {
        /* no-op */
      }, span);

      span.status!.code.should.equal(SpanStatusCode.OK);
      should.equal(span.endCalled, true);
    });

    it("trace - throws", async () => {
      const tracer = new TestTracer();
      const span = tracer.startSpan("whatever");

      await trace(async () => {
        throw new Error("error thrown from fn");
      }, span).should.be.rejectedWith(/error thrown from fn/);

      span.status!.code.should.equal(SpanStatusCode.ERROR);
      span.status!.message!.should.equal("error thrown from fn");
      should.equal(span.endCalled, true);
    });
  });
});
