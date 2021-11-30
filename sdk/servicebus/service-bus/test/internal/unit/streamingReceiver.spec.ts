// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { addTestStreamingReceiver } from "./unittestUtils";
import { ProcessErrorArgs, ServiceBusReceivedMessage } from "../../../src";
import { StreamingReceiver } from "../../../src/core/streamingReceiver";
import sinon from "sinon";
import { EventContext } from "rhea-promise";
import { Constants } from "@azure/core-amqp";
import { AbortError } from "@azure/abort-controller";
import { assertThrows } from "../../public/utils/testUtils";

chai.use(chaiAsPromised);
const assert = chai.assert;

describe("StreamingReceiver unit tests", () => {
  const createTestStreamingReceiver = addTestStreamingReceiver();

  describe("receive(), close() and stopReceivingMessages() interactions", () => {
    it("off by default, set when subscribe() is called", async () => {
      const streamingReceiver = createTestStreamingReceiver("fakeEntityPath");
      assert.isFalse(streamingReceiver.isSubscribeActive);

      await streamingReceiver.subscribe({} as any, {});

      assert.isTrue(streamingReceiver.isSubscribeActive);
    });

    it("isReceivingMessages set to false by close()'ing", async () => {
      const streamingReceiver = createTestStreamingReceiver("fakeEntityPath");

      await streamingReceiver.subscribe({} as any, {});
      assert.isTrue(streamingReceiver.isSubscribeActive);

      await streamingReceiver.close();
      assert.isFalse(streamingReceiver.isSubscribeActive);
    });

    it("isReceivingMessages set to false by calling stopReceivingMessages()", async () => {
      const streamingReceiver = createTestStreamingReceiver("fakeEntityPath");

      await streamingReceiver.subscribe({} as any, {});
      assert.isTrue(streamingReceiver.isSubscribeActive);

      await streamingReceiver.stopReceivingMessages();
      assert.isFalse(streamingReceiver.isSubscribeActive);
    });

    it("if subscribe() fails we are no longer say we're receiving messages", async () => {
      const streamingReceiver = createTestStreamingReceiver("fakeEntityPath");

      const isReceivingMessages: (boolean | undefined)[] = [];

      streamingReceiver["_retryForeverFn"] = async () => {
        isReceivingMessages.push(streamingReceiver.isSubscribeActive);
        throw new AbortError("Purposefully aborting function");
      };

      await assertThrows(() => streamingReceiver.subscribe({} as any, {}), {
        name: "AbortError",
        message: "Purposefully aborting function"
      });

      // we are no longer receiving messages if an exception escaped from subscribe()
      assert.isFalse(streamingReceiver.isSubscribeActive);
      assert.deepEqual(isReceivingMessages, [true]); // _but_ we were temporarily as we were trying to bootstrap our connection
    });
  });

  describe("errorSource", () => {
    it("errors thrown from the user's callback are marked as 'processMessageCallback' errors", async () => {
      const streamingReceiver = createTestStreamingReceiver("entity path", {
        lockRenewer: undefined,
        receiveMode: "receiveAndDelete"
      });

      try {
        let args: ProcessErrorArgs | undefined;

        const eventContext = {
          delivery: {},
          message: {
            message_annotations: {
              [Constants.enqueuedTime]: new Date()
            }
          }
        };

        await streamingReceiver.subscribe(
          {
            processMessage: async (_message) => {
              throw new Error("Error thrown from the user's processMessage callback");
            },
            processError: async (_args) => {
              args = _args;
            }
          },
          undefined
        );

        await streamingReceiver["_onAmqpMessage"]((eventContext as any) as EventContext);

        assert.deepEqual(
          {
            message: args?.error.message,
            errorSource: args?.errorSource,
            entityPath: args?.entityPath,
            fullyQualifiedNamespace: args?.fullyQualifiedNamespace
          },
          {
            message: "Error thrown from the user's processMessage callback",
            errorSource: "processMessageCallback",
            entityPath: "entity path",
            fullyQualifiedNamespace: "fakeHost"
          }
        );
      } finally {
        await streamingReceiver.close();
      }
    });
  });

  describe("forever loop", () => {
    let streamingReceiver: StreamingReceiver | undefined;

    afterEach(() => {
      return streamingReceiver?.close();
    });
  });

  it("onDetach calls through to init", async () => {
    const streamingReceiver = createTestStreamingReceiver("fakeEntityPath");

    const subscribeImplMock = sinon.mock();

    streamingReceiver["_subscribeImpl"] = subscribeImplMock;
    await streamingReceiver.onDetached(new Error("let's detach"));
    assert.isTrue(subscribeImplMock.calledOnce);

    // simulate simultaneous detaches
    streamingReceiver["_isDetaching"] = true;
    subscribeImplMock.resetHistory();

    await streamingReceiver.onDetached(
      new Error("let's detach but it won't because there's already a onDetached running.")
    );
    assert.isFalse(subscribeImplMock.called); // we don't do parallel detaches - subsequent ones are just stopped
    streamingReceiver["_isDetaching"] = false;
  });

  describe("subscribe + subscription.stop() in different phases", () => {
    it("subscription.stop() happens after init() should cause addCredit() to fail", async () => {
      const streamingReceiver = createTestStreamingReceiver("testEntity");
      assert.isFalse(streamingReceiver.isSubscribeActive);

      const errors = [];

      const subscribePromise = streamingReceiver.subscribe(
        {
          postInitialize: async () => {
            // this functions as if the user called subscription.stop() immediately and it got
            // sequenced _after_ init() completed.
            await streamingReceiver["_receiverHelper"].suspend();
          },
          processError: async (pae) => {
            errors.push({ message: pae.error.message, errorSource: pae.errorSource });
          },
          processMessage: async () => {
            /* empty body */
          },
          forwardInternalErrors: true
        },
        {}
      );

      const closeLinkSpy = sinon.spy(
        (streamingReceiver as any) as { closeLink(): Promise<void> },
        "closeLink"
      );

      await assertThrows(() => subscribePromise, {
        name: "AbortError",
        message: "Cannot request messages on the receiver since it is suspended."
      });

      // closeLink is called on cleanup when we fail to add credits (which we would because our receiver
      // was suspended, which will cause us to fail to add credits)
      assert.isTrue(closeLinkSpy.called);
    });

    it("subscription.stop() happens after pre-init() should trigger an AbortError since the receiver is suspended", async () => {
      const streamingReceiver = createTestStreamingReceiver("testEntity");
      assert.isFalse(streamingReceiver.isSubscribeActive);

      const errors: { message: string; errorSource: string }[] = [];

      const subscribePromise = streamingReceiver.subscribe(
        {
          preInitialize: async () => {
            // this functions as if the user called subscription.stop() immediately and it got
            // sequenced _after_ init() completed.
            await streamingReceiver["_receiverHelper"].suspend();
          },
          processError: async (pae) => {
            errors.push({ message: pae.error.message, errorSource: pae.errorSource });
          },
          processMessage: async () => {
            /* empty body */
          },
          forwardInternalErrors: true
        },
        {}
      );

      const closeLinkSpy = sinon.spy(
        (streamingReceiver as any) as { closeLink(): Promise<void> },
        "closeLink"
      );

      await assertThrows(() => subscribePromise, {
        name: "AbortError",
        message: "Receiver was suspended during initialization."
      });

      assert.isTrue(!closeLinkSpy.called, "closeLink should not be called if no link was created");

      assert.deepEqual(errors, [
        {
          message: "Receiver was suspended during initialization.",
          errorSource: "receive"
        }
      ]);
    });
  });

  /**
   * _setMessageHandlers wraps the individual message handler methods so they properly
   * funnel errors to processError and so (for instance with processInitialize) that all
   * functions are defined.
   */
  it("_setMessageHandlers", async () => {
    const streamingReceiver = createTestStreamingReceiver("entitypath", {
      lockRenewer: undefined,
      receiveMode: "peekLock"
    });

    let processErrorMessages: string[] = [];
    const processMessages = [];

    streamingReceiver["_setMessageHandlers"](
      {
        processError: async (args) => {
          processErrorMessages.push(args.error.message);
          // these errors are logged and there's no programatic way to detect them.
          // this reduces the possiblity of a user ending up in an infinite set of `processError` calls.
          throw new Error("processError");
        },
        processMessage: async (msg) => {
          processMessages.push(msg);
          throw new Error("processMessage");
        },
        postInitialize: async () => {
          throw new Error("processInitialize");
        }
      },
      {}
    );

    const wrappedMessageHandlers = streamingReceiver["_messageHandlers"]();

    if (wrappedMessageHandlers == null) {
      throw new Error("No message handlers were set!");
    }

    await wrappedMessageHandlers.postInitialize();

    assert.deepEqual(processErrorMessages, ["processInitialize"]);

    processErrorMessages = [];
    await assertThrows(
      () => wrappedMessageHandlers.processMessage({} as ServiceBusReceivedMessage),
      {
        message: "processMessage"
      }
    );

    assert.deepEqual(processErrorMessages, ["processMessage"]);

    processErrorMessages = [];
    await wrappedMessageHandlers.processError({
      entityPath: "hello",
      error: new Error("hello"),
      errorSource: "receive",
      fullyQualifiedNamespace: "fqns"
    });

    assert.deepEqual(processErrorMessages, ["hello"]);
  });
});
