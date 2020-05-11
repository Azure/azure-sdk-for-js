// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
const assert = chai.assert;

import { ClientEntityContext } from "../src/clientEntityContext";
import { MessageSender } from "../src/core/messageSender";
import { DefaultDataTransformer, Constants as CoreAmqpConstants } from "@azure/core-amqp";
import { AbortSignalLike, AbortController } from "@azure/abort-controller";
import {
  delay,
  AwaitableSender,
  Receiver as RheaReceiver,
  EventContext,
  ReceiverEvents
} from "rhea-promise";
import { ServiceBusMessageBatchImpl } from "../src/serviceBusMessageBatch";
import { SenderImpl } from "../src/sender";
import { ReceiverImpl } from "../src/receivers/receiver";
import { EventEmitter } from "events";

describe("AbortSignal", () => {
  const testMessageThatDoesntMatter = {
    body: "doesn't matter"
  };

  describe("sender", () => {
    let clientEntityContext: ReturnType<typeof createClientEntityContextForTests>;
    let sender: SenderImpl;

    beforeEach(() => {
      clientEntityContext = createClientEntityContextForTests();

      sender = new SenderImpl(clientEntityContext, {}, async (openArgs) => {
        if (openArgs.abortSignal != null) {
          throw new Error("abortSignal was properly passed to open()!");
        } else {
          throw new Error("No abortSignal was passed to open()!");
        }
      });
    });

    it("send(message) | send(messages) | send(batch)", async () => {
      try {
        await sender.send(testMessageThatDoesntMatter, {
          abortSignal: new AbortController().signal
        });
        assert.fail("Should have thrown");
      } catch (err) {
        assert.equal(err.message, "abortSignal was properly passed to open()!");
      }

      try {
        const batchMessage = new ServiceBusMessageBatchImpl(clientEntityContext, 1000);
        await sender.send(batchMessage, {
          abortSignal: new AbortController().signal
        });
        assert.fail("Should have thrown the right error");
      } catch (err) {
        assert.equal(err.message, "abortSignal was properly passed to open()!");
      }

      try {
        await sender.send([testMessageThatDoesntMatter], {
          abortSignal: new AbortController().signal
        });
        assert.fail("Should have thrown the right error");
      } catch (err) {
        assert.equal(err.message, "abortSignal was properly passed to open()!");
      }
    });

    it("createBatch", async () => {
      const sender = new SenderImpl(clientEntityContext, {}, async (openArgs) => {
        if (openArgs.abortSignal != null) {
          throw new Error("abortSignal was properly passed to open()!");
        } else {
          throw new Error("No abortSignal was passed to open()!");
        }
      });

      try {
        await sender.createBatch({
          abortSignal: createTaggedAbortSignal("tag", false)
        });
        assert.fail("Should have thrown the right error");
      } catch (err) {
        assert.equal(err.message, "abortSignal was properly passed to open()!");
      }
    });

    // sanity check
    it("send with an already aborted AbortSignal", async () => {
      const sender = new SenderImpl(clientEntityContext, {}, async () => {
        throw new Error("INIT SHOULD NEVER HAVE BEEN CALLED");
      });

      const abortSignal = createTaggedAbortSignal("_trySend test", true);
      try {
        await sender.send(
          { body: "hello" },
          {
            abortSignal
          }
        );
        assert.fail("AbortError should be thrown when the signal is already in an aborted state");
      } catch (err) {
        assert.equal(err.message, "The send operation has been cancelled by the user.");

        // we aborted in the sync part of the abort check so these event listeners are never set up
        assert.isFalse(abortSignal.addWasCalled);
        assert.isFalse(abortSignal.removeWasCalled);

        // init() doesn't get called - we abort early on this one.
        assert.isFalse(clientEntityContext.initWasCalled);
      }
    });

    it("_trySend, open() timeout fires", async () => {
      const sender = new MessageSender(
        clientEntityContext,
        {
          timeoutInMs: 1
        },
        NOTUSEDFORTEST
      );
      sender["_retryOptions"].timeoutInMs = 1;
      sender["_retryOptions"].maxRetries = 1;
      sender["_retryOptions"].retryDelayInMs = 1;

      sender["_sender"] = {
        credit: 999,
        isOpen: () => false,
        session: {
          outgoing: {
            available: () => true
          }
        }
      } as AwaitableSender;

      let openWasCalled = true;

      sender["open"] = async () => {
        openWasCalled = true;
        // long enough to let the init timeout expiration code to run.
        await delay(1000);
      };

      try {
        await sender["_trySend"]({} as Buffer, true, {
          abortSignal: createTaggedAbortSignal("not used for this test", false)
        });
        assert.fail("Sender should have thrown in the async portion of the abort handling");
      } catch (err) {
        // in this case init() does get called - we abort through a timer.
        assert.isTrue(openWasCalled);

        assert.match(
          err.message,
          /.*was not able to send the message right now, due to operation timeout.*/
        );
      }
    });
  });

  describe("receiver", () => {
    const lockModes: ("peekLock" | "receiveAndDelete")[] = ["peekLock", "receiveAndDelete"];
    let abortController: AbortController;

    beforeEach(() => {
      abortController = new AbortController();
    });

    // this particular code path is the same since it precedes any special logic
    // handling receiveAndDelete vs peekLock with regards to error behavior.
    lockModes.forEach((receiveMode) => {
      it(`receiveBatch(${receiveMode}) that is not yet opened`, async () => {
        const receiver = new ReceiverImpl(
          createClientEntityContextForTests(),
          receiveMode,
          {},
          (openArgs) => {
            if (openArgs.abortSignal != null) {
              throw new Error("abortSignal was properly passed to open()!");
            } else {
              throw new Error("No abortSignal was passed to open()!");
            }
          }
        );

        try {
          await receiver.receiveBatch(100, {
            maxWaitTimeInMs: 20 * 1000,
            abortSignal: abortController.signal
          });
          assert.fail("Should have thrown");
        } catch (err) {
          assert.equal(err.message, "abortSignal was properly passed to open()!");
        }
      });
    });

    lockModes.forEach((receiveMode) => {
      it(`receiveBatch(${receiveMode}), abort while receiving messages`, async () => {
        let abortSignalPassedToOpenLink: AbortSignalLike | undefined;

        let receiverWasCreatedResolve: (receiver: RheaReceiver) => void;
        const receiverWasCreatedPromise = new Promise<RheaReceiver>((resolve, reject) => {
          receiverWasCreatedResolve = resolve;
        });

        // when the connection is already open we obviously will not call open() again....although we could....
        const receiver = new ReceiverImpl(
          createClientEntityContextForTests(),
          receiveMode,
          {},
          async (openArgs) => {
            abortSignalPassedToOpenLink = openArgs.abortSignal;
            const fakeRheaReceiver = createFakeRheaReceiver();
            receiverWasCreatedResolve(fakeRheaReceiver);
            return fakeRheaReceiver as any;
          }
        );

        // make sure the connection gets created and is open (all fake)
        await receiver.receiveBatch(1, {
          maxWaitTimeInMs: 1,
          abortSignal: abortController.signal
        });

        // call again so message handlers get registered.
        // TODO: the original code could use a slight refactoring to make this
        // simpler to do in a single receiveBatch call.
        const receiveBatchPromise = receiver.receiveBatch(2, {
          // this timeout is not intended to expire - we'll abort
          // and make the receive call early exit.
          maxWaitTimeInMs: 60 * 1000,
          abortSignal: abortController.signal
        });

        // wait until after the link has been created.
        const fakeRheaReceiver = await receiverWasCreatedPromise;

        assert.exists(
          abortSignalPassedToOpenLink,
          "Abort signal should be plumbed all the way to openLink"
        );

        // we'll send one message, abort, and we should just receive the one message
        fakeRheaReceiver.emit(ReceiverEvents.message, {
          message: {
            body: "hello",
            message_annotations: {
              [CoreAmqpConstants.enqueuedTime]: 0
            }
          } as any,
          delivery: {} as any
        } as EventContext);

        // now we want to trigger the abort signal handling that we set up
        // earlier. This will cause the promise to resolve immediately.
        abortController.abort();

        const messages = await receiveBatchPromise;

        assert.equal(1, messages.length);
        assert.equal("hello", messages[0].body);
      });
    });
  });
});

function createClientEntityContextForTests(): ClientEntityContext & { initWasCalled: boolean } {
  let initWasCalled = false;

  const fakeClientEntityContext = {
    entityPath: "queue",
    // TODO: we can stub out openLink now so I don't need to do this?
    // sender: {
    //   credit: 999
    // },
    namespace: {
      config: { endpoint: "my.service.bus" },
      connectionId: "connection-id",
      dataTransformer: new DefaultDataTransformer(),
      cbsSession: {
        cbsLock: "cbs-lock",
        async init() {
          initWasCalled = true;
        }
      }
    },
    initWasCalled
  };

  return (fakeClientEntityContext as any) as ReturnType<typeof createClientEntityContextForTests>;
}

function createTaggedAbortSignal(
  tag: string,
  aborted: boolean
): AbortSignalLike & { tag: string; removeWasCalled: boolean; addWasCalled: boolean } {
  const removeWasCalled = false;
  let addWasCalled = false;

  const signal = {
    aborted,
    addEventListener(): void {
      addWasCalled = true;
    },
    removeEventListener(): void {
      this.removeWasCalled = true;
    },
    tag,
    removeWasCalled,
    addWasCalled
  };

  return signal;
}

function NOTUSEDFORTEST<T>(): T {
  throw new Error("Won't get called");
}

function createFakeRheaReceiver(): RheaReceiver {
  const rheaReceiver = new EventEmitter() as RheaReceiver;

  rheaReceiver.addCredit = () => {
    // for now we'll just ignore this (it's not used for our test)
    return;
  };

  rheaReceiver.isOpen = () => true;
  (rheaReceiver as any)["session"] = new EventEmitter() as any;

  return rheaReceiver;
}
