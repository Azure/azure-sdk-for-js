// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
const assert = chai.assert;

import * as sinon from "sinon";
import { EventEmitter } from "events";

import { BatchingReceiver } from "../../src/core/batchingReceiver";
import { createClientEntityContextForTests, defer } from "./unittestUtils";
import { ReceiverImpl } from "../../src/receivers/receiver";
import { createAbortSignalForTest } from "../utils/abortSignalTestUtils";
import { AbortController, AbortSignalLike } from "@azure/abort-controller";
import { ServiceBusMessageImpl, ReceiveMode } from "../../src/serviceBusMessage";
import {
  Receiver as RheaReceiver,
  ReceiverEvents,
  SessionEvents,
  EventContext,
  Message as RheaMessage
} from "rhea-promise";
import { StandardAbortMessage } from "../../src/util/utils";
import { OnAmqpEventAsPromise } from "../../src/core/messageReceiver";

describe("BatchingReceiver unit tests", () => {
  describe("AbortSignal", () => {
    // establish that the abortSignal does get properly sent down. Now the rest of the tests
    // will test at the BatchingReceiver level.
    it("is plumbed into BatchingReceiver from ReceiverImpl", async () => {
      const origAbortSignal = createAbortSignalForTest();
      const receiver = new ReceiverImpl(createClientEntityContextForTests(), "peekLock");
      let wasCalled = false;

      receiver["_createBatchingReceiver"] = () => {
        return {
          async receive(
            _maxMessageCount: number,
            _maxWaitTimeInMs: number,
            _maxTimeAfterFirstMessageMs: number,
            abortSignal?: AbortSignalLike
          ): Promise<ServiceBusMessageImpl[]> {
            assert.equal(abortSignal, origAbortSignal);
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

      const receiver = new BatchingReceiver(createClientEntityContextForTests(), {
        receiveMode: ReceiveMode.peekLock
      });

      try {
        await receiver.receive(1, 60 * 1000, 60 * 1000, abortController.signal);
        assert.fail("Should have thrown");
      } catch (err) {
        assert.equal(err.message, StandardAbortMessage);
        assert.equal(err.name, "AbortError");
      }
    }).timeout(1000);

    it("abortSignal while receive is in process", async () => {
      const abortController = new AbortController();

      const receiver = new BatchingReceiver(createClientEntityContextForTests(), {
        receiveMode: ReceiveMode.peekLock
      });

      const listenersBeingRemoved: string[] = [];
      const callsDoneAfterAbort: string[] = [];

      receiver["_init"] = async () => {
        // just enough of a Receiver to validate that cleanup actions
        // are being run on abort.
        receiver["_receiver"] = ({
          removeListener: (eventType: ReceiverEvents) => {
            listenersBeingRemoved.push(eventType.toString());
          },
          on: (eventType: ReceiverEvents) => {
            // we definitely shouldn't be registering any new handlers if we've aborted.
            callsDoneAfterAbort.push(eventType);
          },
          addCredit: () => {
            // we definitely shouldn't be adding credits if we know we've aborted.
            callsDoneAfterAbort.push("addCredit");
          },
          session: {
            removeListener: (eventType: SessionEvents) => {
              listenersBeingRemoved.push(eventType.toString());
            }
          }
        } as any) as RheaReceiver;

        abortController.abort();
      };

      try {
        await receiver.receive(1, 60 * 1000, 60 * 1000, abortController.signal);
        assert.fail("Should have thrown");
      } catch (err) {
        assert.equal(err.message, StandardAbortMessage);
        assert.equal(err.name, "AbortError");
      }

      // order here isn't important, it just happens to be the order we call in `cleanupBeforeReject`
      assert.deepEqual(listenersBeingRemoved, [
        "receiver_error",
        "message",
        "session_error",
        "receiver_drained"
      ]);
      assert.isEmpty(callsDoneAfterAbort);
    });
  });

  /**
   * receive(max messages, max wait time, max wait time past first message) has 3 exit paths:
   * 1. We received 'max messages'
   * 2. We've waited 'max wait time'
   * 3. We've received 1 message and _now_ have exceeded 'max wait time past first message'
   */
  [ReceiveMode.peekLock, ReceiveMode.receiveAndDelete].forEach((lockMode) => {
    describe(`${ReceiveMode[lockMode]} receive, exit paths`, () => {
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
        const receiver = new BatchingReceiver(createClientEntityContextForTests(), {
          receiveMode: lockMode
        });

        receiver["_getServiceBusMessage"] = (eventContext) => {
          return {
            body: eventContext.message?.body
          } as ServiceBusMessageImpl;
        };

        const { receiveIsReady, emitter } = setupFakeReceiver(receiver);

        const receivePromise = receiver.receive(1, bigTimeout, bigTimeout);
        await receiveIsReady;

        // batch fulfillment is checked when we receive a message...
        emitter.emit(ReceiverEvents.message, {
          message: { body: "the message" } as RheaMessage
        } as EventContext);

        const messages = await receivePromise;
        assert.deepEqual(
          messages.map((m) => m.body),
          ["the message"]
        );
      }).timeout(5 * 1000);

      // in the new world the overall timeout firing means we've received _no_ messages
      // because otherwise it'd be one of the others.
      it("2. We've waited 'max wait time'", async () => {
        const receiver = new BatchingReceiver(createClientEntityContextForTests(), {
          receiveMode: lockMode
        });

        const { receiveIsReady } = setupFakeReceiver(receiver);

        const receivePromise = receiver.receive(1, littleTimeout, bigTimeout);

        // force the overall timeout to fire
        clock.tick(littleTimeout);

        await receiveIsReady;
        const messages = await receivePromise;
        assert.isEmpty(messages);
      }).timeout(5 * 1000);

      // TODO: there's a bug that needs some more investigation where receiveAndDelete loses messages if we're
      // too aggressive about returning early. In that case we just revert to using the older behavior of waiting for
      // the duration of time given (or max messages) with no idle timer.
      // When we eliminate that bug we can remove this check.
      (lockMode === ReceiveMode.peekLock ? it : it.skip)(
        `3a. (with idle timeout) We've received 1 message and _now_ have exceeded 'max wait time past first message`,
        async () => {
          const receiver = new BatchingReceiver(createClientEntityContextForTests(), {
            receiveMode: lockMode
          });

          receiver["_getServiceBusMessage"] = (eventContext) => {
            return {
              body: eventContext.message?.body
            } as ServiceBusMessageImpl;
          };

          const { receiveIsReady, emitter } = setupFakeReceiver(receiver);

          const receivePromise = receiver.receive(3, bigTimeout, littleTimeout);
          await receiveIsReady;

          // batch fulfillment is checked when we receive a message...
          emitter.emit(ReceiverEvents.message, {
            message: { body: "the first message" } as RheaMessage
          } as EventContext);

          // advance the timeout to _just_ before the expiration of the first one (which must have been set
          // since we just received a message). This'll make it more obvious if I scheduled it a second time.
          clock.tick(littleTimeout - 1);

          // now emit a second message - this second message should _not_ change any existing timers
          // or start new ones.
          emitter.emit(ReceiverEvents.message, {
            message: { body: "the second message" } as RheaMessage
          } as EventContext);

          // now we'll advance the clock to 'littleTimeout' which should now fire off our timer.
          clock.tick(1); // make the "no new message arrived within time limit" timer fire.

          const messages = await receivePromise;
          assert.deepEqual(
            messages.map((m) => m.body),
            ["the first message", "the second message"]
          );
        }
      ).timeout(5 * 1000);

      // TODO: there's a bug that needs some more investigation where receiveAndDelete loses messages if we're
      // too aggressive about returning early. In that case we just revert to using the older behavior of waiting for
      // the duration of time given (or max messages) with no idle timer.
      // When we eliminate that bug we can remove this test in favor of the idle timeout test above.
      (lockMode === ReceiveMode.receiveAndDelete ? it : it.skip)(
        `3b. (without idle timeout) We've received 1 message and _now_ have exceeded 'max wait time past first message`,
        async () => {
          const receiver = new BatchingReceiver(createClientEntityContextForTests(), {
            receiveMode: lockMode
          });

          receiver["_getServiceBusMessage"] = (eventContext) => {
            return {
              body: eventContext.message?.body
            } as ServiceBusMessageImpl;
          };

          const { receiveIsReady, emitter } = setupFakeReceiver(receiver);

          const receivePromise = receiver.receive(3, bigTimeout, littleTimeout);
          await receiveIsReady;

          // batch fulfillment is checked when we receive a message...
          emitter.emit(ReceiverEvents.message, {
            message: {
              body: "the first message"
            } as RheaMessage
          } as EventContext);

          // In the peekLock algorithm we would've resolved the promise here but_ we disable
          // that in receiveAndDelete. So we'll advance here....
          clock.tick(littleTimeout);

          // ...and emit another message _after_ the idle timer would have fired. Now when we advance
          // the time all the way....
          emitter.emit(ReceiverEvents.message, {
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
        }
      ).timeout(5 * 1000);

      function setupFakeReceiver(
        batchingReceiver: BatchingReceiver
      ): {
        receiveIsReady: Promise<void>;
        emitter: EventEmitter;
      } {
        const emitter = new EventEmitter();
        const { promise: receiveIsReady, resolve: resolvePromiseIsReady } = defer<void>();
        const fakeRheaReceiver = {
          on(evt: ReceiverEvents, handler: OnAmqpEventAsPromise) {
            emitter.on(evt, handler);
          },
          removeListener(evt: ReceiverEvents, handler: OnAmqpEventAsPromise) {
            emitter.removeListener(evt, handler);
          },
          session: {
            on(evt: SessionEvents, handler: OnAmqpEventAsPromise) {
              emitter.on(evt, handler);

              // this also happens to be the final thing the Promise does
              // as part of it's initialization.
              resolvePromiseIsReady();
            },
            removeListener(evt: SessionEvents, handler: OnAmqpEventAsPromise) {
              emitter.removeListener(evt, handler);
            }
          },
          isOpen: () => true,
          addCredit: (_credits) => {}
        } as RheaReceiver;

        batchingReceiver["_receiver"] = fakeRheaReceiver;

        return {
          receiveIsReady,
          emitter
        };
      }
    });
  });
});
