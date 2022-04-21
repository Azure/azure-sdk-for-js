// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import {
  context as otContext,
  Context as OTContext,
  getSpanContext,
  getTracer,
  setSpanContext,
  SpanOptions,
  SpanStatusCode,
} from "@azure/core-tracing";
import { TestSpan, TestTracer } from "@azure/test-utils";
import { ServiceBusMessageImpl, ServiceBusReceivedMessage } from "../../../src/serviceBusMessage";
import {
  createAndEndProcessingSpan,
  createProcessingSpan,
  TRACEPARENT_PROPERTY,
} from "../../../src/diagnostics/instrumentServiceBusMessage";
import { OperationOptionsBase, trace } from "../../../src/modelsToBeSharedWithEventHubs";
import { setTracerForTest } from "../../public/utils/misc";
import { SpanKind } from "@azure/core-tracing";
import { BatchingReceiverLite } from "../../../src/core/batchingReceiver";
import { Receiver } from "rhea-promise";
import { addTestStreamingReceiver, createConnectionContextForTests } from "./unittestUtils";
import sinon from "sinon";
import { ServiceBusReceiverImpl } from "../../../src/receivers/receiver";
import { OnMessage } from "../../../src/core/messageReceiver";
import { ServiceBusSessionReceiverImpl } from "../../../src/receivers/sessionReceiver";
import { MessageSession } from "../../../src/session/messageSession";
import { instrumentMessage } from "../../../src/diagnostics/tracing";
import { MessageHandlers } from "../../../src";
const should = chai.should();
const assert = chai.assert;

describe("Tracing tests", () => {
  let tracer: TestTracer2;
  let resetTracer: () => void;
  const tracingOptions: OperationOptionsBase["tracingOptions"] = {
    tracingContext: setSpanContext(otContext.active(), {
      spanId: "my parent span id",
      traceId: "my trace id",
      traceFlags: 0,
    }),
  };

  beforeEach(() => {
    ({ tracer, resetTracer } = setTracerForTest(new TestTracer2()));
  });

  afterEach(() => {
    resetTracer();
  });

  it("batching", async () => {
    const createSpanStub = sinon.spy(createAndEndProcessingSpan);

    // both session and non-session receivers use the batching receiver lite
    const br = new BatchingReceiverLite(
      createConnectionContextForTests(),
      "my entity path",
      async () => ({} as any as Receiver),
      "peekLock",
      false
    );

    br["_createAndEndProcessingSpan"] = createSpanStub;

    br["_receiveMessagesImpl"] = (_receiver, _args, resolve, _reject) => {
      resolve([
        {
          applicationProperties: {
            "Diagnostic-Id": "diagnostic id 1",
          },
        },
        {
          applicationProperties: {
            "Diagnostic-Id": "diagnostic id 2",
          },
        },
      ] as any as ServiceBusMessageImpl[]);
    };

    await br.receiveMessages({
      maxMessageCount: 1,
      maxTimeAfterFirstMessageInMs: 1,
      maxWaitTimeInMs: 1,
      tracingOptions,
    });

    assert.isTrue(createSpanStub.calledOnce, "create span was called");

    const [messages, , , options] = createSpanStub.args[0];
    assert.isTrue(
      Array.isArray(messages),
      "only expect one call to the create a span (it can handle multiple messages)"
    );

    assert.deepEqual(
      (messages as ServiceBusReceivedMessage[]).map(
        (m) => m.applicationProperties!["Diagnostic-Id"]
      ),
      ["diagnostic id 1", "diagnostic id 2"]
    );

    if (!options?.tracingOptions?.tracingContext) {
      throw new Error("TestError: options.tracingOptions.tracingContext should have been set");
    }

    assert.equal(
      getSpanContext(options?.tracingOptions?.tracingContext)?.spanId,
      "my parent span id",
      "Parent span should be properly passed in."
    );
  });

  describe("streamingReceiver", () => {
    const createStreamingReceiver = addTestStreamingReceiver();

    it("streaming (no sessions)", async () => {
      const streamingReceiver = createStreamingReceiver("entityPath");

      let messageHandlers: MessageHandlers | undefined;

      streamingReceiver["_subscribeImpl"] = async () => {
        // at this point the message handlers have been fully wrapped.
        messageHandlers = streamingReceiver["_messageHandlers"]();
      };

      await streamingReceiver.subscribe(
        {
          processMessage: async (msg) => {
            if (msg.applicationProperties!["Diagnostic-Id"] === "should throw") {
              throw new Error("This message failed when we tried to process it");
            }
          },
          processError: async (_err) => {
            /** Nothing to do here */
          },
        },
        {
          tracingOptions,
        }
      );

      if (messageHandlers == null) {
        throw new Error("subscribe call should have wrapped and set message handlers");
      }

      try {
        await messageHandlers.processMessage({
          applicationProperties: {
            [TRACEPARENT_PROPERTY]: "should throw",
          },
        } as any as ServiceBusMessageImpl);
        assert.fail("Error should propagate after being traced");
      } catch (err: any) {
        assert.equal(err.message, "This message failed when we tried to process it");
        const [span] = tracer.getKnownSpans();

        assert.deepEqual(span?.status, {
          code: SpanStatusCode.ERROR,
          message: "This message failed when we tried to process it",
        });
      }

      await messageHandlers.processMessage!({
        applicationProperties: {
          [TRACEPARENT_PROPERTY]: "should NOT throw",
        },
      } as any as ServiceBusMessageImpl);

      const [, span] = tracer.getKnownSpans();
      assert.equal(span!.status.code, SpanStatusCode.OK);
    });
  });

  it("streaming (sessions)", async () => {
    const receiver = new ServiceBusSessionReceiverImpl(
      {} as any,
      createConnectionContextForTests(),
      "entity path",
      "peekLock"
    );

    const testData = stubCreateProcessingSpan(receiver);

    let processMessage: OnMessage | undefined;

    receiver["_registerMessageHandler"] = (pm, _pe) => {
      processMessage = pm;
    };

    receiver.subscribe(
      {
        processMessage: async (msg) => {
          if (msg.applicationProperties!["Diagnostic-Id"] === "should throw") {
            throw new Error("This message failed when we tried to process it");
          }
        },
        processError: async (_err) => {
          /** Nothing to do here */
        },
      },
      {
        tracingOptions,
      }
    );

    assert.exists(processMessage, "subscribe call should have called _registerMessageHandler");

    try {
      await processMessage!({
        applicationProperties: {
          [TRACEPARENT_PROPERTY]: "should throw",
        },
      } as any as ServiceBusMessageImpl);
      assert.fail("Error should propagate after being traced");
    } catch (err: any) {
      assert.equal(err.message, "This message failed when we tried to process it");
      assert.deepEqual(testData.span!.status, {
        code: SpanStatusCode.ERROR,
        message: "This message failed when we tried to process it",
      });
    }

    await processMessage!({
      applicationProperties: {
        [TRACEPARENT_PROPERTY]: "should NOT throw",
      },
    } as any as ServiceBusMessageImpl);

    assert.equal(testData.span!.status.code, SpanStatusCode.OK);
  });

  /**
   * Iterators are simple since they just pass their tracing data to receiveMessages. So
   * we just make sure we've done that much and just rely on receiveMessages tests
   * to validate tracing.
   */
  [
    new ServiceBusReceiverImpl(
      createConnectionContextForTests(),
      "entity path",
      "peekLock",
      1,
      false
    ),
    new ServiceBusSessionReceiverImpl(
      {} as MessageSession,
      createConnectionContextForTests(),
      "entity path",
      "peekLock"
    ),
  ].forEach((receiver) => {
    it(`iterator (${receiver.constructor.name})`, async () => {
      receiver["receiveMessages"] = async (_count, options) => {
        assert.deepEqual(tracingOptions, options?.tracingOptions);
        throw new Error(
          "We are passing tracing options so it'll be up to receiveMessages to trace properly"
        );
      };

      const iterator = receiver.getMessageIterator({
        tracingOptions,
      });

      try {
        await iterator.next();
        assert.fail("Should throw my error");
      } catch (err: any) {
        assert.equal(
          err.message,
          "We are passing tracing options so it'll be up to receiveMessages to trace properly"
        );
      }
    });
  });

  function stubCreateProcessingSpan(receiverToStub: any): {
    span?: TestSpan;
  } {
    const data: {
      span?: TestSpan;
    } = {};

    const fakeCreateProcessingSpan: typeof createProcessingSpan = (
      messages,
      receiver,
      config,
      options
    ) => {
      assert.equal(receiver.entityPath, "entity path");
      assert.equal(config.host, "fakeHost");
      assert.isFalse(Array.isArray(messages));

      if (!options?.tracingOptions?.tracingContext) {
        throw new Error("TestError: options.tracingOptions.tracingContext should have been set");
      }

      const context = getSpanContext(options?.tracingOptions?.tracingContext);
      assert.ok(context);
      assert.equal(context?.spanId, "my parent span id");

      data.span = getTracer().startSpan("some span") as TestSpan;
      return data.span;
    };

    receiverToStub["_createProcessingSpan"] = fakeCreateProcessingSpan;
    return data;
  }

  describe("telemetry", () => {
    const receiverProperties = {
      entityPath: "entityPath",
    };

    const connectionConfig = {
      host: "thehost",
    };

    it("basic span properties are set", async () => {
      const fakeParentSpanContext = tracer.startSpan("test").spanContext();

      createProcessingSpan([], receiverProperties, connectionConfig, {
        tracingOptions: {
          tracingContext: setSpanContext(otContext.active(), fakeParentSpanContext),
        },
      });

      should.equal(tracer.spanName, "Azure.ServiceBus.process");
      should.exist(tracer.spanOptions);
      tracer.spanOptions!.kind!.should.equal(SpanKind.CONSUMER);
      getSpanContext(tracer.context!)!.should.equal(fakeParentSpanContext);

      const attributes = tracer
        .getActiveSpans()
        .find((s) => s.name === "Azure.ServiceBus.process")?.attributes;

      attributes!.should.deep.equal({
        "az.namespace": "Microsoft.ServiceBus",
        "message_bus.destination": receiverProperties.entityPath,
        "peer.address": connectionConfig.host,
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
      assert.isUndefined(
        tracer.spanOptions,
        "No spans should be created for already instrumented messages"
      );
    });

    it("Round trip test - instrument message as it would be for sending and then receive and process them", async () => {
      // the sender side...
      const requiredMessageProperties = {
        body: "hello",
        enqueuedTimeUtc: new Date(),
        applicationProperties: undefined,
      };

      const originalMessage = { ...requiredMessageProperties };

      const { message, spanContext } = instrumentMessage(originalMessage, {}, "", "");
      assert.ok(
        spanContext,
        "A span context should be created when we instrument a message for the first time"
      );
      assert.notEqual(message, originalMessage, "Instrumenting a message should copy it");

      assert.ok(tracer.spanOptions, "A span should be created when we instrumented the messsage");
      const spanContextFromSender = tracer.span?.spanContext();
      assert.ok(spanContextFromSender);

      tracer.clearTracingData();

      // the receiver side...

      // messages have been received. Now we'll create a span and link the received spans to it.
      const processingSpan = createProcessingSpan(
        [message] as any as ServiceBusReceivedMessage[],
        receiverProperties,
        connectionConfig,
        {}
      );

      assert.ok(processingSpan);

      const processingSpanOptions = tracer.spanOptions;
      assert.ok(processingSpanOptions);

      tracer.spanOptions!.links![0]!.context.traceId.should.equal(spanContextFromSender?.traceId);
      (tracer.spanOptions!.links![0]!.attributes!.enqueuedTime as number).should.equal(
        requiredMessageProperties.enqueuedTimeUtc.getTime()
      );
    });

    it("trace - normal", async () => {
      const span = tracer.startSpan("whatever");

      await trace(async () => {
        /** Nothing to do here */
      }, span);

      span.status!.code.should.equal(SpanStatusCode.OK);
      span.endCalled.should.equal(true);
    });

    it("trace - throws", async () => {
      const span = tracer.startSpan("whatever");

      await trace(async () => {
        throw new Error("error thrown from fn");
      }, span).should.be.rejectedWith(/error thrown from fn/);

      span.status!.code.should.equal(SpanStatusCode.ERROR);
      span.status!.message!.should.equal("error thrown from fn");
      span.endCalled.should.equal(true);
    });
  });
});

class TestTracer2 extends TestTracer {
  spanName: string | undefined;
  spanOptions: SpanOptions | undefined;
  span: TestSpan | undefined;
  context: OTContext | undefined;

  clearTracingData(): void {
    this.spanName = undefined;
    this.spanOptions = undefined;
    this.span = undefined;
    this.context = undefined;
  }

  startSpan(nameArg: string, optionsArg?: SpanOptions, contextArg?: OTContext): TestSpan {
    this.spanName = nameArg;
    this.spanOptions = optionsArg;
    this.context = contextArg;
    this.span = super.startSpan(nameArg, optionsArg, contextArg);
    return this.span;
  }
}
