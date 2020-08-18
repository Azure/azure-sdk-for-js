// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { ReceiverEvents, ReceiverOptions } from "rhea-promise";
import { AbortSignalLike } from "../../../../core/abort-controller/types/src/aborter";
import { ReceivedMessage, ReceivedMessageWithLock } from "../../src";
chai.use(chaiAsPromised);
const assert = chai.assert;

import { ConnectionContext } from "../../src/connectionContext";
import { BatchingReceiver } from "../../src/core/batchingReceiver";
import { StreamingReceiver } from "../../src/core/streamingReceiver";
import { ServiceBusReceiverImpl } from "../../src/receivers/receiver";
import { createConnectionContextForTests } from "./unittestUtils";
import { InternalMessageHandlers } from "../../src/models";

describe("Receiver unit tests", () => {
  describe("init() and close() interactions", () => {
    function fakeContext(): ConnectionContext {
      return ({
        config: {},
        connection: {
          id: "connection-id"
        },
        messageReceivers: {}
      } as unknown) as ConnectionContext;
    }

    it("close() called just after init() but before the next step", async () => {
      const batchingReceiver = new BatchingReceiver(fakeContext(), "fakeEntityPath");

      let initWasCalled = false;
      batchingReceiver["_init"] = async () => {
        initWasCalled = true;
        // ie, pretend that somebody called close() and the
        // call happened between .init().then()
        batchingReceiver["_link"] = undefined;
      };

      // make an init() happen internally.
      const emptyArrayOfMessages = await batchingReceiver.receive(1, 1, 1);

      assert.isEmpty(emptyArrayOfMessages);
      assert.isTrue(initWasCalled);
    });

    it("message receiver init() bails out early if object is closed()", async () => {
      const messageReceiver2 = new StreamingReceiver(fakeContext(), "fakeEntityPath");

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

      await messageReceiver2["_init"]({} as ReceiverOptions);

      assert.isFalse(negotiateClaimWasCalled);
    });
  });

  describe("subscribe()", () => {
    it("subscribe and subscription.close()", async () => {
      let receiverWasDrained = false;
      let closeWasCalled = false;

      const receiverImpl = new ServiceBusReceiverImpl<any>(
        createConnectionContextForTests({
          onCreateReceiverCalled: (receiver) => {
            receiver.addListener(ReceiverEvents.receiverDrained, () => {
              receiverWasDrained = true;
            });

            (receiver as any).close = () => {
              closeWasCalled = true;
            };
          }
        }),
        "fakeEntityPath",
        "peekLock"
      );

      const subscription = await subscribeAndWaitForInitialize(receiverImpl);
      assert.isFalse(receiverWasDrained, "receiver hasn't drained yet (but will when we close)");

      await subscription.close();

      // closing a subscription doesn't close out the receiver created for it.
      // this allows the user a chance to resolve any outstanding messages.
      assert.isFalse(
        closeWasCalled,
        "sanity check, subscription.close() does not close the receiver"
      );
      assert.isTrue(
        receiverWasDrained,
        "receiver should drain when subscription.close() is called"
      );

      await receiverImpl.close();
      // rhea receiver is finally closed when the overall Receiver class is closed.
      assert.isTrue(closeWasCalled, "receiver should note that we closed");
    });

    it("can't subscribe while another subscribe is active", async () => {
      const receiverImpl = new ServiceBusReceiverImpl(
        createConnectionContextForTests(),
        "fakeEntityPath",
        "peekLock"
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

      const receiverImpl = new ServiceBusReceiverImpl(
        createConnectionContextForTests({
          onCreateReceiverCalled: (receiver) => {
            (receiver as any).close = () => {
              closeWasCalled = true;
            };
          }
        }),
        "fakeEntityPath",
        "peekLock"
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
      const receiverImpl = new ServiceBusReceiverImpl(
        createConnectionContextForTests(),
        "fakeEntityPath",
        "peekLock"
      );

      const abortSignal = {
        aborted: true
      } as AbortSignalLike;

      const subscription = receiverImpl.subscribe(
        {
          processError: async (_err) => {},
          processMessage: async (_msg) => {}
        },
        {
          abortSignal
        }
      );

      // subscription should just be auto-closed already
      const subscription2 = receiverImpl.subscribe({
        processError: async (_err) => {},
        processMessage: async (_msg) => {}
      });

      await subscription.close(); // and closing it "out of order" shouldn't be an issue either.
      await subscription2.close();
      await receiverImpl.close();
    });

    async function subscribeAndWaitForInitialize<
      T extends ReceivedMessage | ReceivedMessageWithLock
    >(receiver: ServiceBusReceiverImpl<T>): Promise<ReturnType<typeof receiver["subscribe"]>> {
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
          processMessage: async (_msg) => {}
        } as InternalMessageHandlers<any>);
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
});
