// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { Receiver, ReceiverEvents, ReceiverOptions } from "rhea-promise";
chai.use(chaiAsPromised);
const assert = chai.assert;

import { BatchingReceiver } from "../../../src/core/batchingReceiver";
import { StreamingReceiver } from "../../../src/core/streamingReceiver";
import { ServiceBusReceiverImpl } from "../../../src/receivers/receiver";
import {
  createConnectionContextForTests,
  createConnectionContextForTestsWithSessionId
} from "./unittestUtils";
import { InternalMessageHandlers } from "../../../src/models";
import { createAbortSignalForTest } from "../../public/utils/abortSignalTestUtils";
import { AbortSignalLike } from "@azure/abort-controller";
import { ServiceBusSessionReceiverImpl } from "../../../src/receivers/sessionReceiver";
import { MessageSession } from "../../../src/session/messageSession";

describe("Receiver unit tests", () => {
  describe("init() and close() interactions", () => {
    it("close() called just after init() but before the next step", async () => {
      const batchingReceiver = new BatchingReceiver(
        createConnectionContextForTests(),
        "fakeEntityPath",
        {
          lockRenewer: undefined,
          receiveMode: "peekLock"
        }
      );

      let initWasCalled = false;
      batchingReceiver["_init"] = async () => {
        initWasCalled = true;
        // ie, pretend that somebody called close() and the
        // call happened between .init().then()
        batchingReceiver["_link"] = undefined;
      };

      // make an init() happen internally.
      const emptyArrayOfMessages = await batchingReceiver.receive(1, 1, 1, {});

      assert.isEmpty(emptyArrayOfMessages);
      assert.isTrue(initWasCalled);
    });

    it("message receiver init() bails out early if object is closed()", async () => {
      const messageReceiver2 = new StreamingReceiver(
        createConnectionContextForTests(),
        "fakeEntityPath",
        {
          lockRenewer: undefined,
          receiveMode: "peekLock"
        }
      );

      await messageReceiver2.close();

      // close() the object. Closed objects should not be able to be reopened.
      await messageReceiver2.close();

      let negotiateClaimWasCalled = false;

      messageReceiver2["_negotiateClaim"] = async () => {
        negotiateClaimWasCalled = true;
        throw new Error(
          "Negotiate claim was called - we should have early exited and never tried to init a close()'d instance."
        );
      };

      try {
        await messageReceiver2["_init"]({} as ReceiverOptions);
        assert.fail("Should throw");
      } catch (err) {
        assert.equal("Link has been permanently closed. Not reopening.", err.message);
        assert.equal(err.name, "AbortError");
        assert.isFalse(negotiateClaimWasCalled);
      }
    });
  });

  describe("subscribe()", () => {
    let receiverImpl: ServiceBusReceiverImpl;

    afterEach(async () => {
      await receiverImpl.close();
    });

    it("subscribe and subscription.close()", async () => {
      let receiverWasDrained = false;

      let createdRheaReceiver: Receiver | undefined;

      receiverImpl = new ServiceBusReceiverImpl(
        createConnectionContextForTests({
          onCreateReceiverCalled: (receiver) => {
            createdRheaReceiver = receiver;
            receiver.addListener(ReceiverEvents.receiverDrained, () => {
              receiverWasDrained = true;
            });
          }
        }),
        "fakeEntityPath",
        "peekLock",
        0
      );

      const subscription = await subscribeAndWaitForInitialize(receiverImpl);
      assert.isFalse(receiverWasDrained, "receiver hasn't drained yet (but will when we close)");

      await subscription.close();

      // closing a subscription doesn't close out the receiver created for it.
      // this allows the user a chance to resolve any outstanding messages.
      assert.isFalse(
        createdRheaReceiver?.isClosed(),
        "sanity check, subscription.close() does not close the receiver"
      );
      assert.isTrue(
        receiverWasDrained,
        "receiver should drain when subscription.close() is called"
      );

      await receiverImpl.close();
      // rhea receiver is finally closed when the overall Receiver class is closed.
      assert.isTrue(createdRheaReceiver?.isClosed(), "receiver should note that we closed");
    });

    it("can't subscribe while another subscribe is active", async () => {
      receiverImpl = new ServiceBusReceiverImpl(
        createConnectionContextForTests(),
        "fakeEntityPath",
        "peekLock",
        1
      );

      const subscription = await subscribeAndWaitForInitialize(receiverImpl);

      try {
        await subscribeAndWaitForInitialize(receiverImpl);
        assert.fail("Should throw since we have an active subscriber");
      } catch (err) {
        assert.deepEqual(
          {
            name: err.name,
            message: err.message
          },
          {
            name: "Error",
            message: `The receiver for "${receiverImpl.entityPath}" is already receiving messages.`
          }
        );
      }

      await subscription.close();
      await receiverImpl.close();
    });

    it("can re-subscribe after previous subscription is closed", async () => {
      let closeWasCalled = false;

      receiverImpl = new ServiceBusReceiverImpl(
        createConnectionContextForTests({
          onCreateReceiverCalled: (receiver) => {
            (receiver as any).close = () => {
              closeWasCalled = true;
            };
          }
        }),
        "fakeEntityPath",
        "peekLock",
        1
      );

      const subscription = await subscribeAndWaitForInitialize(receiverImpl);
      const originalStreamingReceiver = receiverImpl["_streamingReceiver"];

      await subscription.close();

      assert.isFalse(
        closeWasCalled,
        "closing a subscription does NOT close the receiver (it should be re-usable)"
      );

      const subscription2 = await subscribeAndWaitForInitialize(receiverImpl);

      assert.equal(
        originalStreamingReceiver?.name,
        receiverImpl["_streamingReceiver"]?.name,
        "StreamingReceiver is closed but not replaced - this allows us to just stop and start at will without losing anything."
      );

      await subscription2.close();

      await receiverImpl.close();
    });

    it("can re-subscribe after previous subscription is aborted", async () => {
      receiverImpl = new ServiceBusReceiverImpl(
        createConnectionContextForTests(),
        "fakeEntityPath",
        "peekLock",
        1
      );

      const abortSignal = {
        aborted: true
      } as AbortSignalLike;

      const subscription = receiverImpl.subscribe(
        {
          processError: async (_err) => {
            /** Nothing to do here */
          },
          processMessage: async (_msg) => {
            /** Nothing to do here */
          }
        },
        {
          abortSignal
        }
      );

      // subscription should just be auto-closed already
      const subscription2 = receiverImpl.subscribe({
        processError: async (_err) => {
          /** Nothing to do here */
        },
        processMessage: async (_msg) => {
          /** Nothing to do here */
        }
      });

      await subscription.close(); // and closing it "out of order" shouldn't be an issue either.
      await subscription2.close();
      await receiverImpl.close();
    });

    async function subscribeAndWaitForInitialize(
      receiver: ServiceBusReceiverImpl
    ): Promise<ReturnType<typeof receiver["subscribe"]>> {
      const sub = await new Promise<{
        close(): Promise<void>;
      }>((resolve, reject) => {
        const subscription = receiver.subscribe({
          processInitialize: async () => {
            resolve(subscription);
          },
          processError: async (err) => {
            reject(err);
          },
          processMessage: async (_msg) => {
            /** Nothing to do here */
          }
        } as InternalMessageHandlers);
      });

      assert.exists(
        receiver["_streamingReceiver"],
        "streaming receiver has been initialized in the context"
      );

      assert.isTrue(
        receiver["_streamingReceiver"]?.isReceivingMessages,
        "streaming receiver should indicate it's receiving messages"
      );

      return sub;
    }
  });

  describe("getMessageIterator", () => {
    it("abortSignal is passed through (receiver)", async () => {
      const impl = new ServiceBusReceiverImpl(
        createConnectionContextForTests(),
        "entity path",
        "peekLock",
        1
      );

      const abortSignal = createAbortSignalForTest(true);

      try {
        const iter = impl.getMessageIterator({
          abortSignal
        });

        await iter.next();
        assert.fail("Should have thrown");
      } catch (err) {
        assert.equal(err.name, "AbortError");
      }

      await impl.close();
    });

    it("abortSignal is passed through (session receiver)", async () => {
      const connectionContext = createConnectionContextForTestsWithSessionId();
      const messageSession = await MessageSession.create(
        connectionContext,
        "entity path",
        undefined,
        {
          retryOptions: undefined
        }
      );

      const impl = new ServiceBusSessionReceiverImpl(
        messageSession,
        connectionContext,
        "entity path",
        "peekLock",
        undefined
      );

      const abortSignal = createAbortSignalForTest(true);

      try {
        const iter = impl.getMessageIterator({
          abortSignal
        });

        await iter.next();
        assert.fail("Should have thrown");
      } catch (err) {
        assert.equal("AbortError", err.name);
      }

      await impl.close();
    });
  });

  describe("createStreamingReceiver", () => {
    let impl: ServiceBusReceiverImpl | undefined;

    afterEach(async () => {
      await impl?.close();
    });

    it("create() with an existing _streamingReceiver", async () => {
      const context = createConnectionContextForTests();
      impl = new ServiceBusReceiverImpl(context, "entity path", "peekLock", 1);

      let initWasCalled = false;
      const expectedAbortSignal = createAbortSignalForTest();

      const existingReceiver = {
        initWithRetries: async (_args) => {
          assert.equal(
            _args.abortSignal,
            expectedAbortSignal,
            "abortSignal should be properly passed through."
          );

          assert.equal(
            "my pre-existing receiver",
            context.messageReceivers["my pre-existing receiver"].name,
            "Before init() is called we should have registered our receiver in the context's map so it can get cleaned up later."
          );

          initWasCalled = true;
          return;
        },
        close: async () => {
          /** Nothing to do here */
        },
        name: "my pre-existing receiver"
      } as Pick<StreamingReceiver, "init" | "close" | "name">;

      impl["_streamingReceiver"] = (existingReceiver as any) as StreamingReceiver;

      // we're going to stub this out and make sure that prior to calling init() on our
      // internal receiver we have registered it into the connection context so (if the user
      // closes the ServiceBusClient) it will be able to find and close this instance (thus
      // terminating it's streaming forever loop for initialization).
      context.messageReceivers["my pre-existing receiver"] = {} as StreamingReceiver;

      await impl["_createStreamingReceiver"]({
        lockRenewer: undefined,
        receiveMode: "peekLock",
        abortSignal: expectedAbortSignal,
        onError: (_args) => {
          /** Nothing to do here */
        }
      });

      assert.isTrue(initWasCalled, "initialize should be called on the original receiver");
      assert.equal(
        impl["_streamingReceiver"],
        existingReceiver,
        "original receiver should be intact - we should not create a new one.."
      );
    });

    it("create() with an existing receiver and that receiver is NOT open()", async () => {
      const context = createConnectionContextForTests();

      impl = new ServiceBusReceiverImpl(context, "entity path", "peekLock", 1);

      await impl["_createStreamingReceiver"]({
        lockRenewer: undefined,
        receiveMode: "peekLock",
        onError: (_args) => {
          /** Nothing to do here */
        }
      });

      assert.exists(impl["_streamingReceiver"], "new streaming receiver should be called");
      assert.exists(context.messageReceivers[impl["_streamingReceiver"]!.name]);
    });
  });
});
