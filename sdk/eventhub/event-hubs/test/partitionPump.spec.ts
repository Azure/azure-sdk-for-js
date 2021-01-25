// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createProcessingSpan, trace } from "../src/partitionPump";
import { NoOpSpan, TestSpan, TestTracer } from "@azure/core-tracing";
import { CanonicalCode, SpanKind, SpanOptions } from "@opentelemetry/api";
import chai from "chai";
import { ReceivedEventData } from "../src/eventData";
import { instrumentEventData } from "../src/diagnostics/instrumentEventData";
import { setTracerForTest } from "./utils/testUtils";

const should = chai.should();

describe("PartitionPump", () => {
  describe("telemetry", () => {
    const eventHubProperties = {
      host: "thehost",
      eventHubName: "theeventhubname"
    };

    class TestTracer2 extends TestTracer {
      public spanOptions: SpanOptions | undefined;
      public spanName: string | undefined;

      constructor() {
        super();
      }

      startSpan(nameArg: string, optionsArg?: SpanOptions): TestSpan {
        this.spanName = nameArg;
        this.spanOptions = optionsArg;
        return super.startSpan(nameArg, optionsArg);
      }
    }

    it("basic span properties are set", async () => {
      const fakeParentSpanContext = new NoOpSpan().context();
      const { tracer, resetTracer } = setTracerForTest(new TestTracer2());

      await createProcessingSpan([], eventHubProperties, {
        tracingOptions: {
          spanOptions: {
            parent: fakeParentSpanContext
          }
        }
      });

      should.equal(tracer.spanName, "Azure.EventHubs.process");

      should.exist(tracer.spanOptions);
      tracer.spanOptions!.kind!.should.equal(SpanKind.CONSUMER);
      tracer.spanOptions!.parent!.should.equal(fakeParentSpanContext);

      const attributes = tracer.getRootSpans()[0].attributes;

      attributes!.should.deep.equal({
        "az.namespace": "Microsoft.EventHub",
        "message_bus.destination": eventHubProperties.eventHubName,
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
        sequenceNumber: 0
      };

      const { tracer, resetTracer } = setTracerForTest(new TestTracer2());

      const firstEvent = tracer.startSpan("a");
      const thirdEvent = tracer.startSpan("c");

      const receivedEvents: ReceivedEventData[] = [
        instrumentEventData({ ...requiredEventProperties }, firstEvent) as ReceivedEventData,
        { properties: {}, ...requiredEventProperties }, // no diagnostic ID means it gets skipped
        instrumentEventData({ ...requiredEventProperties }, thirdEvent) as ReceivedEventData
      ];

      await createProcessingSpan(receivedEvents, eventHubProperties, {});

      // middle event, since it has no trace information, doesn't get included
      // in the telemetry
      tracer.spanOptions!.links!.length.should.equal(3 - 1);
      // the test tracer just hands out a string integer that just gets
      // incremented
      tracer.spanOptions!.links![0]!.context.traceId.should.equal(firstEvent.context().traceId);
      (tracer.spanOptions!.links![0]!.attributes!.enqueuedTime as number).should.equal(
        requiredEventProperties.enqueuedTimeUtc.getTime()
      );
      tracer.spanOptions!.links![1]!.context.traceId.should.equal(thirdEvent.context().traceId);
      (tracer.spanOptions!.links![1]!.attributes!.enqueuedTime as number).should.equal(
        requiredEventProperties.enqueuedTimeUtc.getTime()
      );

      resetTracer();
    });

    it("trace - normal", async () => {
      const tracer = new TestTracer();
      const span = tracer.startSpan("whatever");

      await trace(async () => {}, span);

      span.status!.code.should.equal(CanonicalCode.OK);
      span.endCalled.should.be.ok;
    });

    it("trace - throws", async () => {
      const tracer = new TestTracer();
      const span = tracer.startSpan("whatever");

      await trace(async () => {
        throw new Error("error thrown from fn");
      }, span).should.be.rejectedWith(/error thrown from fn/);

      span.status!.code.should.equal(CanonicalCode.UNKNOWN);
      span.status!.message!.should.equal("error thrown from fn");
      span.endCalled.should.be.ok;
    });
  });
});
