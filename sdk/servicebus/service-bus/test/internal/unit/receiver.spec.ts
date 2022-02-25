// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { ReceiverOptions } from "rhea-promise";
chai.use(chaiAsPromised);
const assert = chai.assert;

import { BatchingReceiver } from "../../../src/core/batchingReceiver";
import { StreamingReceiver } from "../../../src/core/streamingReceiver";
import { ServiceBusReceiverImpl } from "../../../src/receivers/receiver";
import {
  addTestStreamingReceiver,
  createConnectionContextForTests,
  createConnectionContextForTestsWithSessionId,
} from "./unittestUtils";
import { InternalMessageHandlers } from "../../../src/models";
import { createAbortSignalForTest } from "../../public/utils/abortSignalTestUtils";
import { AbortSignalLike } from "@azure/abort-controller";
import { ServiceBusSessionReceiverImpl } from "../../../src/receivers/sessionReceiver";
import { MessageSession } from "../../../src/session/messageSession";
import sinon from "sinon";
import { assertThrows } from "../../public/utils/testUtils";

describe("Receiver unit tests", () => {
  describe("init() and close() interactions", () => {
    it("close() called just after init() but before the next step", async () => {
      const batchingReceiver = new BatchingReceiver(
        createConnectionContextForTests(),
        "fakeEntityPath",
        {
          lockRenewer: undefined,
          receiveMode: "peekLock",
          skipParsingBodyAsJson: false,
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
      await assertThrows(() => batchingReceiver.receive(1, 1, 1, {}), {
        name: "ServiceBusError",
        code: "GeneralError",
        message: "Link closed before receiving messages.",
      });
      assert.isTrue(initWasCalled);
    });

    it("message receiver init() bails out early if object is closed()", async () => {
      const messageReceiver2 = new StreamingReceiver(
        createConnectionContextForTests(),
        "fakeEntityPath",
        {
          lockRenewer: undefined,
          receiveMode: "peekLock",
          skipParsingBodyAsJson: false,
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

    it("can't subscribe while another subscribe is active", async () => {
      receiverImpl = new ServiceBusReceiverImpl(
        createConnectionContextForTests(),
        "fakeEntityPath",
        "peekLock",
        1,
        false
      );

      const subscription = await subscribeAndWaitForInitialize(receiverImpl);

      try {
        await subscribeAndWaitForInitialize(receiverImpl);
        assert.fail("Should throw since we have an active subscriber");
      } catch (err) {
        assert.deepEqual(
          {
            name: err.name,
            message: err.message,
          },
          {
            name: "Error",
            message: `The receiver for "${receiverImpl.entityPath}" is already receiving messages.`,
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
          },
        }),
        "fakeEntityPath",
        "peekLock",
        1,
        false
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
        1,
        false
      );

      const abortSignal = {
        aborted: true,
      } as AbortSignalLike;

      const subscription = receiverImpl.subscribe(
        {
          processError: async (_err) => {
            /** Nothing to do here */
          },
          processMessage: async (_msg) => {
            /** Nothing to do here */
          },
        },
        {
          abortSignal,
        }
      );

      // subscription should just be auto-closed already
      const subscription2 = receiverImpl.subscribe({
        processError: async (_err) => {
          /** Nothing to do here */
        },
        processMessage: async (_msg) => {
          /** Nothing to do here */
        },
      });

      await subscription.close(); // and closing it "out of order" shouldn't be an issue either.
      await subscription2.close();
      await receiverImpl.close();
    });
  });

  describe("getMessageIterator", () => {
    it("abortSignal is passed through (receiver)", async () => {
      const impl = new ServiceBusReceiverImpl(
        createConnectionContextForTests(),
        "entity path",
        "peekLock",
        1,
        false
      );

      const abortSignal = createAbortSignalForTest(true);

      try {
        const iter = impl.getMessageIterator({
          abortSignal,
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
          retryOptions: undefined,
          skipParsingBodyAsJson: false,
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
          abortSignal,
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
    const createStreamingReceiver = addTestStreamingReceiver();

    afterEach(async () => {
      await impl?.close();
    });

    it("create() with an existing _streamingReceiver", async () => {
      const context = createConnectionContextForTests();
      impl = new ServiceBusReceiverImpl(context, "entity path", "peekLock", 1, false);

      const existingStreamingReceiver = createStreamingReceiver("entityPath");
      const subscribeStub = sinon.spy(existingStreamingReceiver, "subscribe");

      impl["_streamingReceiver"] = existingStreamingReceiver;

      // we're going to stub this out and make sure that prior to calling init() on our
      // internal receiver we have registered it into the connection context so (if the user
      // closes the ServiceBusClient) it will be able to find and close this instance (thus
      // terminating it's streaming forever loop for initialization).
      context.messageReceivers["my pre-existing receiver"] = {} as StreamingReceiver;

      await subscribeAndWaitForInitialize(impl);

      assert.equal(
        impl["_streamingReceiver"],
        existingStreamingReceiver,
        "original receiver should be intact - we should not create a new one.."
      );

      assert.isTrue(subscribeStub.calledOnce);
    });

    it("create() with an existing receiver and that receiver is NOT open()", async () => {
      const context = createConnectionContextForTests();

      impl = new ServiceBusReceiverImpl(context, "entity path", "peekLock", 1, false);

      await subscribeAndWaitForInitialize(impl);

      assert.exists(impl["_streamingReceiver"], "new streaming receiver should be called");
      assert.exists(context.messageReceivers[impl["_streamingReceiver"]!.name]);
    });
  });
});

async function subscribeAndWaitForInitialize(
  receiver: ServiceBusReceiverImpl
): Promise<ReturnType<typeof receiver["subscribe"]>> {
  const sub = await new Promise<{
    close(): Promise<void>;
  }>((resolve, reject) => {
    const subscription = receiver.subscribe({
      postInitialize: async () => {
        resolve(subscription);
      },
      processError: async (err) => {
        reject(err);
      },
      processMessage: async (_msg) => {
        /** Nothing to do here */
      },
    } as InternalMessageHandlers);
  });

  assert.exists(
    receiver["_streamingReceiver"],
    "streaming receiver has been initialized in the context"
  );

  assert.isTrue(
    receiver["_streamingReceiver"]?.isSubscribeActive,
    "streaming receiver should indicate it's receiving messages"
  );

  return sub;
}
