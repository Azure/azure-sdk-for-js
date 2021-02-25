// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import { getTracer, NoOpSpan, TestSpan, TestTracer } from "@azure/core-tracing";
import { CanonicalCode, SpanOptions } from "@opentelemetry/api";
import {
  ServiceBusMessage,
  ServiceBusMessageImpl,
  ServiceBusReceivedMessage
} from "../../../src/serviceBusMessage";
import {
  createAndEndProcessingSpan,
  createProcessingSpan,
  instrumentServiceBusMessage,
  TRACEPARENT_PROPERTY
} from "../../../src/diagnostics/instrumentServiceBusMessage";
import { OperationOptionsBase, trace } from "../../../src/modelsToBeSharedWithEventHubs";
import { setTracerForTest } from "../../public/utils/misc";
import { SpanKind } from "@opentelemetry/api";
import { BatchingReceiverLite } from "../../../src/core/batchingReceiver";
import { Receiver } from "rhea-promise";
import { createConnectionContextForTests } from "./unittestUtils";
import sinon from "sinon";
import { ServiceBusReceiverImpl } from "../../../src/receivers/receiver";
import { OnMessage } from "../../../src/core/messageReceiver";
import { ServiceBusSessionReceiverImpl } from "../../../src/receivers/sessionReceiver";
import { MessageSession } from "../../../src/session/messageSession";
const should = chai.should();
const assert = chai.assert;

describe("Tracing tests", () => {
  let tracer: TestTracer2;
  let resetTracer: () => void;
  const tracingOptions: OperationOptionsBase["tracingOptions"] = {
    spanOptions: {
      parent: {
        spanId: "my parent span id",
        traceId: "my trace id",
        traceFlags: 0
      }
    }
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
      async () => (({} as any) as Receiver),
      "peekLock"
    );

    br["_createAndEndProcessingSpan"] = createSpanStub;

    br["_receiveMessagesImpl"] = (_receiver, _args, resolve, _reject) => {
      resolve(([
        {
          applicationProperties: {
            "Diagnostic-Id": "diagnostic id 1"
          }
        },
        {
          applicationProperties: {
            "Diagnostic-Id": "diagnostic id 2"
          }
        }
      ] as any) as ServiceBusMessageImpl[]);
    };

    await br.receiveMessages({
      maxMessageCount: 1,
      maxTimeAfterFirstMessageInMs: 1,
      maxWaitTimeInMs: 1,
      tracingOptions
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

    assert.equal(
      options?.tracingOptions?.spanOptions?.parent?.spanId,
      "my parent span id",
      "Parent span should be properly passed in."
    );
  });

  it("streaming (no sessions)", async () => {
    const receiver = new ServiceBusReceiverImpl(
      createConnectionContextForTests(),
      "entity path",
      "peekLock",
      1
    );

    const testData = stubCreateProcessingSpan(receiver);

    let processMessage: OnMessage | undefined;

    receiver["_registerMessageHandler"] = (_pi, pm, _pe) => {
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
        }
      },
      {
        tracingOptions
      }
    );

    assert.exists(processMessage, "subscribe call should have called _registerMessageHandler");

    try {
      await processMessage!(({
        applicationProperties: {
          [TRACEPARENT_PROPERTY]: "should throw"
        }
      } as any) as ServiceBusMessageImpl);
      assert.fail("Error should propagate after being traced");
    } catch (err) {
      assert.equal(err.message, "This message failed when we tried to process it");

      assert.deepEqual(testData.span?.status, {
        code: CanonicalCode.UNKNOWN,
        message: "This message failed when we tried to process it"
      });
    }

    await processMessage!(({
      applicationProperties: {
        [TRACEPARENT_PROPERTY]: "should NOT throw"
      }
    } as any) as ServiceBusMessageImpl);

    assert.equal(testData.span!.status.code, CanonicalCode.OK);
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
        }
      },
      {
        tracingOptions
      }
    );

    assert.exists(processMessage, "subscribe call should have called _registerMessageHandler");

    try {
      await processMessage!(({
        applicationProperties: {
          [TRACEPARENT_PROPERTY]: "should throw"
        }
      } as any) as ServiceBusMessageImpl);
      assert.fail("Error should propagate after being traced");
    } catch (err) {
      assert.equal(err.message, "This message failed when we tried to process it");
      assert.deepEqual(testData.span!.status, {
        code: CanonicalCode.UNKNOWN,
        message: "This message failed when we tried to process it"
      });
    }

    await processMessage!(({
      applicationProperties: {
        [TRACEPARENT_PROPERTY]: "should NOT throw"
      }
    } as any) as ServiceBusMessageImpl);

    assert.equal(testData.span!.status.code, CanonicalCode.OK);
  });

  /**
   * Iterators are simple since they just pass their tracing data to receiveMessages. So
   * we just make sure we've done that much and just rely on receiveMessages tests
   * to validate tracing.
   */
  [
    new ServiceBusReceiverImpl(createConnectionContextForTests(), "entity path", "peekLock", 1),
    new ServiceBusSessionReceiverImpl(
      {} as MessageSession,
      createConnectionContextForTests(),
      "entity path",
      "peekLock"
    )
  ].forEach((receiver) => {
    it(`iterator (${receiver.constructor.name})`, async () => {
      receiver["receiveMessages"] = async (_count, options) => {
        assert.deepEqual(tracingOptions, options?.tracingOptions);
        throw new Error(
          "We are passing tracing options so it'll be up to receiveMessages to trace properly"
        );
      };

      const iterator = receiver.getMessageIterator({
        tracingOptions
      });

      try {
        await iterator.next();
        assert.fail("Should throw my error");
      } catch (err) {
        assert.equal(
          err.message,
          "We are passing tracing options so it'll be up to receiveMessages to trace properly"
        );
      }
    });
  });

  function stubCreateProcessingSpan(
    receiverToStub: any
  ): {
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
      assert.equal(options?.tracingOptions?.spanOptions?.parent?.spanId, "my parent span id");

      data.span = getTracer().startSpan("some span") as TestSpan;
      return data.span;
    };

    receiverToStub["_createProcessingSpan"] = fakeCreateProcessingSpan;
    return data;
  }

  describe("telemetry", () => {
    const otherProperties = {
      entityPath: "entityPath"
    };

    const connectionConfig = {
      host: "thehost"
    };

    it("basic span properties are set", async () => {
      const fakeParentSpanContext = new NoOpSpan().context();

      createProcessingSpan([], otherProperties, connectionConfig, {
        tracingOptions: {
          spanOptions: {
            parent: fakeParentSpanContext
          }
        }
      });

      should.equal(tracer.spanName, "Azure.ServiceBus.process");

      should.exist(tracer.spanOptions);
      tracer.spanOptions!.kind!.should.equal(SpanKind.CONSUMER);
      tracer.spanOptions!.parent!.should.equal(fakeParentSpanContext);

      const attributes = tracer.getRootSpans()[0].attributes;

      attributes!.should.deep.equal({
        "az.namespace": "Microsoft.ServiceBus",
        "message_bus.destination": otherProperties.entityPath,
        "peer.address": connectionConfig.host
      });
    });

    it("received events are linked to this span using Diagnostic-Id", async () => {
      const requiredMessageProperties = {
        body: "hello",
        enqueuedTimeUtc: new Date()
      };

      const firstEvent = tracer.startSpan("a");
      const thirdEvent = tracer.startSpan("c");

      const receivedMessages: ServiceBusMessage[] = [
        instrumentServiceBusMessage({ ...requiredMessageProperties }, firstEvent),
        { applicationProperties: {}, ...requiredMessageProperties }, // no diagnostic ID means it gets skipped
        instrumentServiceBusMessage({ ...requiredMessageProperties }, thirdEvent)
      ];

      createProcessingSpan(
        (receivedMessages as any) as ServiceBusReceivedMessage[],
        otherProperties,
        connectionConfig,
        {}
      );

      // middle event, since it has no trace information, doesn't get included
      // in the telemetry
      tracer.spanOptions!.links!.length.should.equal(3 - 1);
      // the test tracer just hands out a string integer that just gets
      // incremented
      tracer.spanOptions!.links![0]!.context.traceId.should.equal(firstEvent.context().traceId);
      (tracer.spanOptions!.links![0]!.attributes!.enqueuedTime as number).should.equal(
        requiredMessageProperties.enqueuedTimeUtc.getTime()
      );
      tracer.spanOptions!.links![1]!.context.traceId.should.equal(thirdEvent.context().traceId);
      (tracer.spanOptions!.links![1]!.attributes!.enqueuedTime as number).should.equal(
        requiredMessageProperties.enqueuedTimeUtc.getTime()
      );
    });

    it("trace - normal", async () => {
      const span = tracer.startSpan("whatever");

      await trace(async () => {
        /** Nothing to do here */
      }, span);

      span.status!.code.should.equal(CanonicalCode.OK);
      span.endCalled.should.be.ok;
    });

    it("trace - throws", async () => {
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

class TestTracer2 extends TestTracer {
  public spanOptions: SpanOptions | undefined;
  public spanName: string | undefined;

  startSpan(nameArg: string, optionsArg?: SpanOptions): TestSpan {
    this.spanName = nameArg;
    this.spanOptions = optionsArg;
    return super.startSpan(nameArg, optionsArg);
  }
}
