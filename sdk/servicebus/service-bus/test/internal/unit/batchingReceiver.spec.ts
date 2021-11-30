// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
const assert = chai.assert;

import * as sinon from "sinon";
import { EventEmitter } from "events";

import {
  BatchingReceiver,
  getRemainingWaitTimeInMsFn,
  BatchingReceiverLite
} from "../../../src/core/batchingReceiver";
import { defer, createConnectionContextForTests } from "./unittestUtils";
import { createAbortSignalForTest } from "../../public/utils/abortSignalTestUtils";
import { AbortController } from "@azure/abort-controller";
import { ServiceBusMessageImpl } from "../../../src/serviceBusMessage";
import {
  Receiver as RheaPromiseReceiver,
  ReceiverEvents,
  SessionEvents,
  EventContext,
  Message as RheaMessage
} from "rhea-promise";
import { ConnectionContext } from "../../../src/connectionContext";
import { ServiceBusReceiverImpl } from "../../../src/receivers/receiver";
import { OperationOptionsBase } from "../../../src/modelsToBeSharedWithEventHubs";
import { ReceiveMode } from "../../../src/models";
import { Constants, StandardAbortMessage } from "@azure/core-amqp";

describe("BatchingReceiver unit tests", () => {
  let closeables: { close(): Promise<void> }[];

  beforeEach(() => {
    closeables = [];
  });

  afterEach(async () => {
    for (const closeable of closeables) {
      await closeable.close();
    }
  });

  describe("AbortSignal", () => {
    // establish that the abortSignal does get properly sent down. Now the rest of the tests
    // will test at the BatchingReceiver level.
    it("is plumbed into BatchingReceiver from ServiceBusReceiverImpl", async () => {
      const origAbortSignal = createAbortSignalForTest();
      const receiver = new ServiceBusReceiverImpl(
        createConnectionContextForTests(),
        "fakeEntityPath",
        "peekLock",
        1
      );
      let wasCalled = false;

      receiver["_createBatchingReceiver"] = () => {
        return {
          async receive(
            _maxMessageCount: number,
            _maxWaitTimeInMs: number,
            _maxTimeAfterFirstMessageMs: number,
            options?: OperationOptionsBase
          ): Promise<ServiceBusMessageImpl[]> {
            assert.equal(options?.abortSignal, origAbortSignal);
            wasCalled = true;
            return [];
          }
        } as BatchingReceiver;
      };

      await receiver.receiveMessages(1000, {
        maxWaitTimeInMs: 60 * 1000,
        abortSignal: origAbortSignal
      });

      assert.isTrue(wasCalled, "Expected a call to BatchingReceiver.receive()");
    });

    it("abortSignal is already signalled", async () => {
      const abortController = new AbortController();
      abortController.abort();

      const receiver = new BatchingReceiver(createConnectionContextForTests(), "fakeEntityPath", {
        receiveMode: "peekLock",
        lockRenewer: undefined
      });

      try {
        await receiver.receive(1, 60 * 1000, 60 * 1000, {
          abortSignal: abortController.signal
        });
        assert.fail("Should have thrown");
      } catch (err) {
        assert.equal(err.message, StandardAbortMessage);
        assert.equal(err.name, "AbortError");
      }
    }).timeout(1000);

    it("abortSignal while receive is in process", async () => {
      const abortController = new AbortController();

      const receiver = new BatchingReceiver(createConnectionContextForTests(), "fakeEntityPath", {
        receiveMode: "peekLock",
        lockRenewer: undefined
      });
      closeables.push(receiver);

      const listeners = new Set<string>();
      const callsDoneAfterAbort: string[] = [];

      receiver["_init"] = async () => {
        // just enough of a Receiver to validate that cleanup actions
        // are being run on abort.
        receiver["_link"] = ({
          connection: {
            id: "connection id"
          },
          removeListener: (eventType: ReceiverEvents) => {
            listeners.add(eventType.toString());
          },
          once: (eventType: ReceiverEvents) => {
            // we definitely shouldn't be registering any new handlers if we've aborted.
            callsDoneAfterAbort.push(eventType);
            listeners.add(eventType);
          },
          on: (eventType: ReceiverEvents) => {
            // we definitely shouldn't be registering any new handlers if we've aborted.
            callsDoneAfterAbort.push(eventType);
            listeners.add(eventType);
          },
          addCredit: () => {
            // we definitely shouldn't be adding credits if we know we've aborted.
            callsDoneAfterAbort.push("addCredit");
          },
          session: {
            removeListener: (eventType: SessionEvents) => {
              listeners.add(eventType.toString());
            },
            once: (eventType: SessionEvents) => {
              // we definitely shouldn't be registering any new handlers if we've aborted.
              callsDoneAfterAbort.push(eventType);
              listeners.add(eventType);
            }
          }
        } as any) as RheaPromiseReceiver;

        abortController.abort();
      };

      try {
        await receiver.receive(1, 60 * 1000, 60 * 1000, { abortSignal: abortController.signal });
        assert.fail("Should have thrown");
      } catch (err) {
        assert.equal(err.message, StandardAbortMessage);
        assert.equal(err.name, "AbortError");
      }

      // order here isn't important, it just happens to be the order we call in `cleanupBeforeReject`
      assert.isEmpty(listeners);
      assert.isEmpty(callsDoneAfterAbort);
    });
  });

  /**
   * receive(max messages, max wait time, max wait time past first message) has 3 exit paths:
   * 1. We received 'max messages'
   * 2. We've waited 'max wait time'
   * 3. We've received 1 message and _now_ have exceeded 'max wait time past first message'
   */
  const receiveModes: ReceiveMode[] = ["peekLock", "receiveAndDelete"];

  receiveModes.forEach((lockMode) => {
    describe(`${lockMode} receive, exit paths`, () => {
      const bigTimeout = 60 * 1000;
      const littleTimeout = 30 * 1000;
      let clock: ReturnType<typeof sinon.useFakeTimers>;

      beforeEach(() => {
        clock = sinon.useFakeTimers();
      });

      afterEach(() => {
        clock.restore();
      });

      it("1. We received 'max messages'", async () => {
        const batchingReceiver = new BatchingReceiver(
          createConnectionContextForTests(),
          "dummyEntityPath",
          {
            receiveMode: lockMode,
            lockRenewer: undefined
          }
        );
        closeables.push(batchingReceiver);

        const { receiveIsReady, rheaReceiver } = setupBatchingReceiver(batchingReceiver);

        const receivePromise = batchingReceiver.receive(1, bigTimeout, bigTimeout, {});
        await receiveIsReady;

        // batch fulfillment is checked when we receive a message...
        rheaReceiver.emit(ReceiverEvents.message, {
          message: { body: "the message" } as RheaMessage
        } as EventContext);

        const messages = await receivePromise;
        assert.deepEqual(
          messages.map((m) => m.body),
          ["the message"]
        );

        assertListenersRemoved(rheaReceiver);
      }).timeout(5 * 1000);

      // in the new world the overall timeout firing means we've received _no_ messages
      // because otherwise it'd be one of the others.
      it("2. We've waited 'max wait time'", async () => {
        const receiver = new BatchingReceiver(
          createConnectionContextForTests(),
          "dummyEntityPath",
          {
            receiveMode: lockMode,
            lockRenewer: undefined
          }
        );
        closeables.push(receiver);

        const { receiveIsReady, rheaReceiver } = setupBatchingReceiver(receiver);

        const receivePromise = receiver.receive(1, littleTimeout, bigTimeout, {});

        await receiveIsReady;

        // force the overall timeout to fire
        clock.tick(littleTimeout + 1);

        const messages = await receivePromise;
        assert.isEmpty(messages);

        assertListenersRemoved(rheaReceiver);
      }).timeout(5 * 1000);

      // TODO: there's a bug that needs some more investigation where receiveAndDelete loses messages if we're
      // too aggressive about returning early. In that case we just revert to using the older behavior of waiting for
      // the duration of time given (or max messages) with no idle timer.
      // When we eliminate that bug we can remove this check.
      (lockMode === "peekLock" ? it : it.skip)(
        `3a. (with idle timeout) We've received 1 message and _now_ have exceeded 'max wait time past first message'`,
        async () => {
          const batchingReceiver = new BatchingReceiver(
            createConnectionContextForTests(),
            "dummyEntityPath",
            {
              receiveMode: lockMode,
              lockRenewer: undefined
            }
          );
          closeables.push(batchingReceiver);

          const { receiveIsReady, rheaReceiver } = setupBatchingReceiver(batchingReceiver, clock);

          const receivePromise = batchingReceiver.receive(3, bigTimeout, littleTimeout, {});
          await receiveIsReady;

          // batch fulfillment is checked when we receive a message...
          rheaReceiver.emit(ReceiverEvents.message, {
            message: { body: "the first message" } as RheaMessage
          } as EventContext);

          // advance the timeout to _just_ before the expiration of the first one (which must have been set
          // since we just received a message). This'll make it more obvious if I scheduled it a second time.
          clock.tick(littleTimeout - 1);

          // now emit a second message - this second message should _not_ change any existing timers
          // or start new ones.
          rheaReceiver.emit(ReceiverEvents.message, {
            message: { body: "the second message" } as RheaMessage
          } as EventContext);

          // now we'll advance the clock to 'littleTimeout' which should now fire off our timer.
          clock.tick(1); // make the "no new message arrived within time limit" timer fire.

          const messages = await receivePromise;
          assert.deepEqual(
            messages.map((m) => m.body),
            ["the first message", "the second message"]
          );

          assertListenersRemoved(rheaReceiver);
        }
      ).timeout(5 * 1000);

      // TODO: there's a bug that needs some more investigation where receiveAndDelete loses messages if we're
      // too aggressive about returning early. In that case we just revert to using the older behavior of waiting for
      // the duration of time given (or max messages) with no idle timer.
      // When we eliminate that bug we can remove this test in favor of the idle timeout test above.
      (lockMode === "receiveAndDelete" ? it : it.skip)(`3b. (without idle timeout)`, async () => {
        const batchingReceiver = new BatchingReceiver(
          createConnectionContextForTests(),
          "dummyEntityPath",
          {
            receiveMode: lockMode,
            lockRenewer: undefined
          }
        );
        closeables.push(batchingReceiver);

        const { receiveIsReady, rheaReceiver } = setupBatchingReceiver(batchingReceiver);

        const receivePromise = batchingReceiver.receive(3, bigTimeout, littleTimeout, {});
        await receiveIsReady;

        // batch fulfillment is checked when we receive a message...
        rheaReceiver.emit(ReceiverEvents.message, {
          message: {
            body: "the first message"
          } as RheaMessage
        } as EventContext);

        // In the peekLock algorithm we would've resolved the promise here but_ we disable
        // that in receiveAndDelete. So we'll advance here....
        clock.tick(littleTimeout);

        // ...and emit another message _after_ the idle timer would have fired. Now when we advance
        // the time all the way....
        rheaReceiver.emit(ReceiverEvents.message, {
          message: {
            body: "the second message"
          } as RheaMessage
        } as EventContext);

        clock.tick(bigTimeout);

        // ...we can see that we didn't resolve earlier - we only resolved after the `maxWaitTimeInMs`
        // timer fired.
        const messages = await receivePromise;
        assert.deepEqual(
          messages.map((m) => m.body),
          ["the first message", "the second message"]
        );

        assertListenersRemoved(rheaReceiver);
      }).timeout(5 * 1000);

      // TODO: there's a bug that needs some more investigation where receiveAndDelete loses messages if we're
      // too aggressive about returning early. In that case we just revert to using the older behavior of waiting for
      // the duration of time given (or max messages) with no idle timer.
      // When we eliminate that bug we can enable this test for all modes.
      (lockMode === "peekLock" ? it : it.skip)(
        "4. sanity check that we're using getRemainingWaitTimeInMs",
        async () => {
          const batchingReceiver = new BatchingReceiver(
            createConnectionContextForTests(),
            "dummyEntityPath",
            {
              receiveMode: lockMode,
              lockRenewer: undefined
            }
          );
          closeables.push(batchingReceiver);

          const { receiveIsReady, rheaReceiver: emitter } = setupBatchingReceiver(
            batchingReceiver,
            clock
          );

          let wasCalled = false;

          const arbitraryAmountOfTimeInMs = 40;

          batchingReceiver["_batchingReceiverLite"]["_getRemainingWaitTimeInMsFn"] = (
            maxWaitTimeInMs: number,
            maxTimeAfterFirstMessageMs: number
          ) => {
            // sanity check that the timeouts are passed in correctly....
            assert.equal(maxWaitTimeInMs, bigTimeout + 1);
            assert.equal(maxTimeAfterFirstMessageMs, bigTimeout + 2);

            return () => {
              // and we'll make sure that we did ask the callback from the amount
              // of time to wait...
              wasCalled = true;
              return arbitraryAmountOfTimeInMs;
            };
          };

          const receivePromise = batchingReceiver.receive(3, bigTimeout + 1, bigTimeout + 2, {});
          await receiveIsReady;

          emitter.emit(ReceiverEvents.message, {
            message: {
              body: "the second message"
            } as RheaMessage
          } as EventContext);

          // and just to be _really_ sure we'll only tick the `arbitraryAmountOfTimeInMs`.
          // if we resolve() then we know that we ignored the passed in timeouts in favor
          // of what our getRemainingWaitTimeInMs function calculated.
          clock.tick(arbitraryAmountOfTimeInMs);

          const messages = await receivePromise;
          assert.equal(messages.length, 1);

          assert.isTrue(wasCalled);

          assertListenersRemoved(emitter);
        }
      );

      function setupBatchingReceiver(
        batchingReceiver: BatchingReceiver,
        clockParam?: ReturnType<typeof sinon.useFakeTimers>
      ): {
        receiveIsReady: Promise<void>;
        rheaReceiver: RheaPromiseReceiver;
      } {
        const rheaReceiver = createFakeReceiver(clockParam);

        batchingReceiver["_link"] = rheaReceiver;

        batchingReceiver["_batchingReceiverLite"]["_createServiceBusMessage"] = (eventContext) => {
          return {
            body: eventContext.message?.body
          } as ServiceBusMessageImpl;
        };

        const receiveIsReady = getReceiveIsReadyPromise(batchingReceiver["_batchingReceiverLite"]);

        return {
          receiveIsReady,
          rheaReceiver
        };
      }
    });
  });

  function createFakeReceiver(clock?: ReturnType<typeof sinon.useFakeTimers>): RheaPromiseReceiver {
    const fakeRheaReceiver = new EventEmitter() as RheaPromiseReceiver;
    fakeRheaReceiver.drain = false;

    let credit = 0;

    fakeRheaReceiver.on(ReceiverEvents.message, function creditRemoverForTests() {
      --credit;
    });
    (fakeRheaReceiver as any).session = new EventEmitter();

    fakeRheaReceiver["isOpen"] = () => true;
    fakeRheaReceiver["addCredit"] = (_credit: number) => {
      credit += _credit;
    };

    fakeRheaReceiver["drainCredit"] = () => {
      fakeRheaReceiver.drain = true;
      fakeRheaReceiver.emit(ReceiverEvents.receiverDrained, undefined);
      clock?.runAll();
    };

    Object.defineProperty(fakeRheaReceiver, "credit", {
      get: () => credit
    });

    (fakeRheaReceiver as any)["connection"] = {
      id: "connection-id"
    };

    return fakeRheaReceiver;
  }

  describe("getRemainingWaitTimeInMs", () => {
    let clock: ReturnType<typeof sinon.useFakeTimers>;

    beforeEach(() => {
      clock = sinon.useFakeTimers();
    });

    afterEach(() => {
      clock.restore();
    });

    it("tests", () => {
      let fn = getRemainingWaitTimeInMsFn(10, 2);
      // 1ms has elapsed so we're comparing 9ms vs 2ms
      clock.tick(1);
      assert.equal(2, fn());

      fn = getRemainingWaitTimeInMsFn(10, 2);
      // 9ms has elapsed so we're comparing 1ms vs 2ms
      clock.tick(9);
      assert.equal(1, fn());

      fn = getRemainingWaitTimeInMsFn(10, 2);
      // 8ms has elapsed so we're comparing 2ms vs 2ms
      clock.tick(8);
      assert.equal(2, fn());

      fn = getRemainingWaitTimeInMsFn(10, 2);
      // 11ms has elapsed so we're comparing -1ms vs 2ms (we'll just treat that as "don't wait, just return what you have")
      clock.tick(11);
      assert.equal(0, fn());
    });
  });

  describe("BatchingReceiverLite", () => {
    let clock: ReturnType<typeof sinon.useFakeTimers>;

    beforeEach(() => {
      clock = sinon.useFakeTimers();
    });

    afterEach(() => {
      clock.restore();
    });

    it("isReceivingMessages is properly set and unset when receiving operations run", async () => {
      const fakeRheaReceiver = createFakeReceiver();

      const batchingReceiver = new BatchingReceiverLite(
        createConnectionContextForTests(),
        "fakeEntityPath",
        async () => {
          return fakeRheaReceiver;
        },
        "peekLock"
      );

      assert.isFalse(batchingReceiver.isReceivingMessages);
      const receiveIsReady = getReceiveIsReadyPromise(batchingReceiver);

      const prm = batchingReceiver.receiveMessages({
        maxMessageCount: 1,
        maxTimeAfterFirstMessageInMs: 20,
        maxWaitTimeInMs: 10
      });

      assert.isTrue(batchingReceiver.isReceivingMessages);

      await receiveIsReady;
      await clock.tick(10 + 1);

      await prm;
      assert.isFalse(batchingReceiver.isReceivingMessages);
    });

    it("batchingReceiverLite.close(actual-error) - throws the error from the current receiverMessages() call", async () => {
      const fakeRheaReceiver = createFakeReceiver();

      const batchingReceiver = new BatchingReceiverLite(
        {} as ConnectionContext,
        "fakeEntityPath",
        async () => {
          return fakeRheaReceiver;
        },
        "peekLock"
      );

      assert.notExists(batchingReceiver["_closeHandler"]);

      const receiveIsReady = getReceiveIsReadyPromise(batchingReceiver);

      const receiveMessagesPromise = batchingReceiver.receiveMessages({
        maxMessageCount: 1,
        maxTimeAfterFirstMessageInMs: 1,
        maxWaitTimeInMs: 1
      });

      await receiveIsReady;
      assert.exists(batchingReceiver["_closeHandler"]);

      await batchingReceiver.terminate(new Error("actual error"));

      try {
        await receiveMessagesPromise;
        assert.fail("Test should have thrown");
      } catch (err) {
        assert.equal(err.message, "actual error");
      }
    });

    it("batchingReceiverLite.close() (ie, no error) just shuts down the current operation with no error", async () => {
      const fakeRheaReceiver = createFakeReceiver();

      const batchingReceiver = new BatchingReceiverLite(
        createConnectionContextForTests(),
        "fakeEntityPath",
        async () => {
          return fakeRheaReceiver;
        },
        "peekLock"
      );

      assert.notExists(batchingReceiver["_closeHandler"]);

      let resolveWasCalled = false;
      let rejectWasCalled = false;

      batchingReceiver["_receiveMessagesImpl"](
        (await batchingReceiver["_getCurrentReceiver"]())!,
        {
          maxMessageCount: 1,
          maxTimeAfterFirstMessageInMs: 1,
          maxWaitTimeInMs: 1
        },
        () => {
          resolveWasCalled = true;
        },
        () => {
          rejectWasCalled = true;
        }
      );

      assert.exists(batchingReceiver["_closeHandler"]);
      assert.isFalse(resolveWasCalled);
      assert.isFalse(rejectWasCalled);

      batchingReceiver.terminate();

      // these are still false because we used setTimeout() (and we're using sinon)
      // so the clock is "frozen"
      assert.isFalse(resolveWasCalled);
      assert.isFalse(rejectWasCalled);

      // now unfreeze it (without ticking time forward, just running whatever is eligible _now_)
      clock.tick(0);

      assert.isTrue(resolveWasCalled);
      assert.isFalse(rejectWasCalled);
    });

    it("finalAction prevents multiple concurrent drain calls", async () => {
      // there are unintended side effects if multiple drains are requested (ie - you start to get
      // mismatches between responses, resulting in this error message ("Received transfer
      // when credit was 0") bring printed by rhea.
      const fakeRheaReceiver = createFakeReceiver();

      const batchingReceiverLite = new BatchingReceiverLite(
        createConnectionContextForTests(),
        "fakeEntityPath",
        async () => {
          return fakeRheaReceiver;
        },
        "peekLock"
      );

      batchingReceiverLite["_receiveMessagesImpl"](
        fakeRheaReceiver,
        {
          maxMessageCount: 2,
          maxTimeAfterFirstMessageInMs: 1,
          maxWaitTimeInMs: 1
        },
        () => {
          /* empty body */
        },
        () => {
          /* empty body */
        }
      );

      assert.equal(
        fakeRheaReceiver.credit,
        2,
        "No messages received, nothing drained, should have all the credits from the start."
      );

      const finalAction = batchingReceiverLite["_finalAction"];

      if (!finalAction) {
        throw new Error("No finalAction defined!");
      }

      fakeRheaReceiver.removeAllListeners(ReceiverEvents.receiverDrained);

      // the first call (when there are no received messages) will initiate a drain
      assert.isFalse(fakeRheaReceiver.drain);

      const drainCreditSpy = sinon.spy(fakeRheaReceiver, "drainCredit");

      finalAction();

      assert.isTrue(drainCreditSpy.calledOnceWith());

      // also our fix should leave our # of credits untouched (ie, no +1 effect)
      assert.equal(fakeRheaReceiver.credit, 2);

      drainCreditSpy.resetHistory();

      // subsequent calls will not initiate drains.
      finalAction();
      assert.isTrue(drainCreditSpy.notCalled);
    });
  });

  it("drain doesn't resolve before message callbacks have completed", async () => {
    const fakeRheaReceiver = createFakeReceiver();

    const batchingReceiverLite = new BatchingReceiverLite(
      createConnectionContextForTests(),
      "fakeEntityPath",
      async () => {
        return fakeRheaReceiver;
      },
      "peekLock"
    );

    const receiveIsReady = getReceiveIsReadyPromise(batchingReceiverLite);

    const receiveMessagesPromise = batchingReceiverLite
      .receiveMessages({
        maxMessageCount: 3,
        maxTimeAfterFirstMessageInMs: 5000,
        maxWaitTimeInMs: 5000
      })
      .then((messages) => {
        return [...messages];
      });

    await receiveIsReady;

    // We've had an issue in the past where it seemed that drain was
    // causing us to potentially not return messages that should have
    // existed. In our tests this is very hard to reproduce because it
    // requires us to control more of how the stream of events are
    // returned in Service Bus.

    // Our suspicion has been that it's possible we're receiving messages _after_ a
    // drain has occurred but we've never seen it in the wild or in any of our testing.

    // However, in rhea-promise there is an odd mismatch of dispatching that can cause this
    // sequence of events to occur:
    // 1. rhea-promise: receive message A
    //    rhea-promise then calls: setTimeout(emit(messageA))
    // 2. us: decide to drain (timeout expired)
    // 3. rhea-promise: sends drain
    // 4. rhea-promise: receives message B (Service Bus has not yet processed the drain request)
    //    rhea-promise then calls: setTimeout(emit(messageB))
    //
    // Now at this point we have the setTimeout(emit(messageB)) in the task queue. It'll be
    // executed at the next turn of the event loop.
    //
    // The problem then comes in when rhea-promise receives the receiver_drained event:
    // 4. rhea-promise: receives receiver_drain event
    //    emit(drain)     // note it does _not_ use setTimeout()
    //
    // This causes the drain event to fire immediately. When it resolves the underlying promise
    // it resolves it prior to emit(messageB) firing, resulting in lost messages.
    //
    // To fix this when we get receive_drained we setTimeout(resolve) instead of just immediately resolving. This allows
    // us to enter into the same task queue as all the message callbacks, and makes it so everything occurs in the
    // right order.
    setTimeout(() => {
      fakeRheaReceiver.emit(ReceiverEvents.message, {
        message: {
          body: "the first message",
          message_annotations: {
            [Constants.enqueuedTime]: 0
          }
        } as RheaMessage
      } as EventContext);
    });

    fakeRheaReceiver.emit(ReceiverEvents.receiverDrained, {} as EventContext);

    const results = await receiveMessagesPromise;

    assert.equal(1, results.length);
  });
});

function getReceiveIsReadyPromise(batchingReceiverLite: BatchingReceiverLite): Promise<void> {
  // receiveMessagesImpl is the 'non-async' method that sets up the receiver and adds credits. So it's a
  // perfect method to hook into to test the internals of the BatchingReceiver(Lite)
  const orig = batchingReceiverLite["_receiveMessagesImpl"];
  const { resolve, promise } = defer<void>();

  batchingReceiverLite["_receiveMessagesImpl"] = (...args) => {
    orig.call(batchingReceiverLite, ...args);
    resolve();
  };

  return promise;
}

function assertListenersRemoved(rheaReceiver: RheaPromiseReceiver): void {
  const shouldBeEmpty = [
    ReceiverEvents.receiverClose,
    ReceiverEvents.receiverDrained,
    ReceiverEvents.receiverError,
    ReceiverEvents.receiverFlow,
    ReceiverEvents.receiverOpen,
    ReceiverEvents.settled,
    SessionEvents.sessionClose,
    SessionEvents.sessionError,
    SessionEvents.sessionOpen,
    SessionEvents.settled
  ];

  // we add a little credit remover for our tests. Ignore it.
  assert.isEmpty(
    rheaReceiver
      .listeners(ReceiverEvents.message)
      .filter((f) => f.name !== "creditRemoverForTests"),
    `No listeners (aside from the test credit remover) should be registered for ${ReceiverEvents.message}`
  );

  for (const eventName of shouldBeEmpty) {
    assert.isEmpty(
      rheaReceiver.listeners(eventName),
      `No listeners should be registered for ${eventName} on the receiver`
    );
    assert.isEmpty(
      rheaReceiver.session.listeners(eventName),
      `No listeners should be registered for ${eventName} on the receiver.session`
    );
  }
}
