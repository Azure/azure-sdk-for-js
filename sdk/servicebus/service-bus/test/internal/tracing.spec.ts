// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SpanGraph, TestSpan } from "@azure/test-utils";
import { setSpan, Span, context } from "@azure/core-tracing";
import { ServiceBusSender, ServiceBusMessage, OperationOptions, TryAddOptions } from "../../src";
import { TRACEPARENT_PROPERTY } from "../public/sendAndSchedule.spec";
import { setTracerForTest } from "../public/utils/misc";
import { TestClientType } from "../public/utils/testUtils";
import {
  ServiceBusClientForTests,
  EntityName,
  createServiceBusClientForTests
} from "../public/utils/testutils2";

function legacyOptionsUsingSpanContext(rootSpan: TestSpan): Pick<TryAddOptions, "parentSpan"> {
  return {
    parentSpan: rootSpan.spanContext()
  };
}

function legacyOptionsUsingSpan(rootSpan: TestSpan): Pick<TryAddOptions, "parentSpan"> {
  return {
    parentSpan: rootSpan
  };
}

function modernOptions(rootSpan: TestSpan): OperationOptions {
  return {
    tracingOptions: {
      tracingContext: setSpan(context.active(), rootSpan)
    }
  };
}

function modernOptionsWithAccidentalParentSpanSet(rootSpan: TestSpan): TryAddOptions {
  return {
    tracingOptions: {
      tracingContext: setSpan(context.active(), rootSpan)
    },
    parentSpan: ({
      context: () => {
        throw new Error("Nobody should call this.");
      }
    } as any) as Span
  };
}

[
  legacyOptionsUsingSpan,
  legacyOptionsUsingSpanContext,
  modernOptions,
  modernOptionsWithAccidentalParentSpanSet
].forEach((optionFn) => {
  describe(`Tracing for send (${optionFn.name})`, function(): void {
    let sbClient: ServiceBusClientForTests;
    let sender: ServiceBusSender;
    let entityName: EntityName;

    before(() => {
      sbClient = createServiceBusClientForTests();
    });

    after(() => {
      return sbClient.test.after();
    });

    beforeEach(async () => {
      entityName = await sbClient.test.createTestEntities(TestClientType.UnpartitionedQueue);

      sender = sbClient.test.addToCleanup(
        sbClient.createSender(entityName.queue ?? entityName.topic!)
      );
    });

    it("add messages with tryAdd - can be manually traced", async function(): Promise<void> {
      const { tracer, resetTracer } = setTracerForTest();

      const rootSpan = tracer.startSpan("root");

      const list = [{ name: "Albert" }, { name: "Marie" }];

      const batch = await sender.createMessageBatch();

      for (let i = 0; i < 2; i++) {
        batch.tryAddMessage({ body: `${list[i].name}` }, optionFn(rootSpan));
      }
      await sender.sendMessages(batch);
      rootSpan.end();

      const rootSpans = tracer.getRootSpans();
      rootSpans.length.should.equal(2, "Should only have two root spans.");
      rootSpans[0].should.equal(rootSpan, "The root span should match what was passed in.");

      const expectedGraph: SpanGraph = {
        roots: [
          {
            name: rootSpan.name,
            children: [
              {
                name: "Azure.ServiceBus.message",
                children: []
              },
              {
                name: "Azure.ServiceBus.message",
                children: []
              }
            ]
          }
        ]
      };

      tracer.getSpanGraph(rootSpan.spanContext().traceId).should.eql(expectedGraph);
      tracer.getActiveSpans().length.should.equal(0, "All spans should have had end called.");
      resetTracer();
    });

    it("add messages with tryAdd - will not instrument already instrumented messages", async function(): Promise<
      void
    > {
      const { tracer, resetTracer } = setTracerForTest();

      const rootSpan = tracer.startSpan("test");

      const list = [
        { name: "Albert" },
        {
          name: "Marie",
          applicationProperties: {
            [TRACEPARENT_PROPERTY]: "foo"
          }
        }
      ];

      const batch = await sender.createMessageBatch();

      for (let i = 0; i < 2; i++) {
        batch.tryAddMessage(
          { body: `${list[i].name}`, applicationProperties: list[i].applicationProperties },
          optionFn(rootSpan)
        );
      }
      await sender.sendMessages(batch);
      rootSpan.end();

      const rootSpans = tracer.getRootSpans();
      rootSpans.length.should.equal(2, "Should only have two root spans.");
      rootSpans[0].should.equal(rootSpan, "The root span should match what was passed in.");

      const expectedGraph: SpanGraph = {
        roots: [
          {
            name: rootSpan.name,
            children: [
              {
                name: "Azure.ServiceBus.message",
                children: []
              }
            ]
          }
        ]
      };

      tracer.getSpanGraph(rootSpan.spanContext().traceId).should.eql(expectedGraph);
      tracer.getActiveSpans().length.should.equal(0, "All spans should have had end called.");
      resetTracer();
    });

    it("will support tracing batch and send", async function(): Promise<void> {
      const { tracer, resetTracer } = setTracerForTest();

      const rootSpan = tracer.startSpan("root");

      const list = [{ name: "Albert" }, { name: "Marie" }];

      const batch = await sender.createMessageBatch();
      for (let i = 0; i < 2; i++) {
        batch.tryAddMessage({ body: `${list[i].name}` }, optionFn(rootSpan));
      }
      await sender.sendMessages(batch, {
        tracingOptions: {
          tracingContext: setSpan(context.active(), rootSpan)
        }
      });
      rootSpan.end();

      const rootSpans = tracer.getRootSpans();
      rootSpans.length.should.equal(1, "Should only have one root span.");
      rootSpans[0].should.equal(rootSpan, "The root span should match what was passed in.");

      const expectedGraph: SpanGraph = {
        roots: [
          {
            name: rootSpan.name,
            children: [
              {
                name: "Azure.ServiceBus.message",
                children: []
              },
              {
                name: "Azure.ServiceBus.message",
                children: []
              },
              {
                name: "Azure.ServiceBus.send",
                children: []
              }
            ]
          }
        ]
      };

      tracer.getSpanGraph(rootSpan.spanContext().traceId).should.eql(expectedGraph);
      tracer.getActiveSpans().length.should.equal(0, "All spans should have had end called.");
      resetTracer();
    });

    it("array of messages - can be manually traced", async function(): Promise<void> {
      const { tracer, resetTracer } = setTracerForTest();

      const rootSpan = tracer.startSpan("root");

      const messages = [];
      for (let i = 0; i < 5; i++) {
        messages.push({ body: `multiple messages - manual trace propagation: ${i}` });
      }
      await sender.sendMessages(messages, {
        tracingOptions: {
          tracingContext: setSpan(context.active(), rootSpan)
        }
      });
      rootSpan.end();

      const rootSpans = tracer.getRootSpans();
      rootSpans.length.should.equal(1, "Should only have one root spans.");
      rootSpans[0].should.equal(rootSpan, "The root span should match what was passed in.");

      const expectedGraph: SpanGraph = {
        roots: [
          {
            name: rootSpan.name,
            children: [
              {
                name: "Azure.ServiceBus.message",
                children: []
              },
              {
                name: "Azure.ServiceBus.message",
                children: []
              },
              {
                name: "Azure.ServiceBus.message",
                children: []
              },
              {
                name: "Azure.ServiceBus.message",
                children: []
              },
              {
                name: "Azure.ServiceBus.message",
                children: []
              },
              {
                name: "Azure.ServiceBus.send",
                children: []
              }
            ]
          }
        ]
      };

      tracer.getSpanGraph(rootSpan.spanContext().traceId).should.eql(expectedGraph);
      tracer.getActiveSpans().length.should.equal(0, "All spans should have had end called.");

      const knownSendSpans = tracer
        .getKnownSpans()
        .filter((span: TestSpan) => span.name === "Azure.ServiceBus.send");
      knownSendSpans.length.should.equal(1, "There should have been one send span.");
      knownSendSpans[0].attributes.should.deep.equal({
        "az.namespace": "Microsoft.ServiceBus",
        "message_bus.destination": sender.entityPath,
        "peer.address": sbClient.fullyQualifiedNamespace
      });
      resetTracer();
    });

    it("array of messages - skips already instrumented messages when manually traced", async function(): Promise<
      void
    > {
      const { tracer, resetTracer } = setTracerForTest();

      const rootSpan = tracer.startSpan("root");

      const messages: ServiceBusMessage[] = [];
      for (let i = 0; i < 5; i++) {
        messages.push({ body: `multiple messages - manual trace propgation: ${i}` });
      }
      messages[0].applicationProperties = { [TRACEPARENT_PROPERTY]: "foo" };
      await sender.sendMessages(messages, {
        tracingOptions: {
          tracingContext: setSpan(context.active(), rootSpan)
        }
      });
      rootSpan.end();

      const rootSpans = tracer.getRootSpans();
      rootSpans.length.should.equal(1, "Should only have one root spans.");
      rootSpans[0].should.equal(rootSpan, "The root span should match what was passed in.");

      const expectedGraph: SpanGraph = {
        roots: [
          {
            name: rootSpan.name,
            children: [
              {
                name: "Azure.ServiceBus.message",
                children: []
              },
              {
                name: "Azure.ServiceBus.message",
                children: []
              },
              {
                name: "Azure.ServiceBus.message",
                children: []
              },
              {
                name: "Azure.ServiceBus.message",
                children: []
              },
              {
                name: "Azure.ServiceBus.send",
                children: []
              }
            ]
          }
        ]
      };

      tracer.getSpanGraph(rootSpan.spanContext().traceId).should.eql(expectedGraph);
      tracer.getActiveSpans().length.should.equal(0, "All spans should have had end called.");
      resetTracer();
    });
  });
});
