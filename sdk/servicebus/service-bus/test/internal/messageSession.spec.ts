// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { MessageSession } from "../../src/session/messageSession";
import { createClientEntityContextForTests, defer } from "./unittestUtils";
import sinon from "sinon";
import { EventEmitter } from "events";
import {
  ReceiverEvents,
  Receiver as RheaReceiver,
  EventContext,
  Message as RheaMessage,
  SessionEvents
} from "rhea-promise";
import { OnAmqpEventAsPromise } from "../../src/core/messageReceiver";
import { ServiceBusMessageImpl, InternalReceiveMode } from "../../src/serviceBusMessage";

chai.use(chaiAsPromised);
const assert = chai.assert;

describe("Message session unit tests", () => {
  describe("receiveMessages", () => {
    let clock: ReturnType<typeof sinon.useFakeTimers>;

    beforeEach(() => {
      clock = sinon.useFakeTimers();
    });

    afterEach(() => {
      clock.restore();
    });

    [InternalReceiveMode.peekLock, InternalReceiveMode.receiveAndDelete].forEach((lockMode) => {
      describe(`${InternalReceiveMode[lockMode]} receive, exit paths`, () => {
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
          const receiver = new MessageSession(createClientEntityContextForTests(), {
            receiveMode: lockMode
          });

          const { receiveIsReady, emitter } = setupFakeReceiver(receiver as any);

          const receivePromise = receiver.receiveMessages(1, bigTimeout, bigTimeout);
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
          const receiver = new MessageSession(createClientEntityContextForTests(), {
            receiveMode: lockMode
          });

          const { receiveIsReady } = setupFakeReceiver(receiver);

          const receivePromise = receiver.receiveMessages(1, littleTimeout, bigTimeout);

          await receiveIsReady;

          // force the overall timeout to fire
          clock.tick(littleTimeout);

          const messages = await receivePromise;
          assert.isEmpty(messages);
        }).timeout(5 * 1000);

        // TODO: there's a bug that needs some more investigation where receiveAndDelete loses messages if we're
        // too aggressive about returning early. In that case we just revert to using the older behavior of waiting for
        // the duration of time given (or max messages) with no idle timer.
        // When we eliminate that bug we can remove this check.
        (lockMode === InternalReceiveMode.peekLock ? it : it.skip)(
          `3a. (with idle timeout) We've received 1 message and _now_ have exceeded 'max wait time past first message'`,
          async () => {
            const receiver = new MessageSession(createClientEntityContextForTests(), {
              receiveMode: lockMode
            });

            const { receiveIsReady, emitter } = setupFakeReceiver(receiver);

            const receivePromise = receiver.receiveMessages(3, bigTimeout, littleTimeout);
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
        (lockMode === InternalReceiveMode.receiveAndDelete ? it : it.skip)(
          `3b. (without idle timeout)`,
          async () => {
            const receiver = new MessageSession(createClientEntityContextForTests(), {
              receiveMode: lockMode
            });

            const { receiveIsReady, emitter } = setupFakeReceiver(receiver);

            const receivePromise = receiver.receiveMessages(3, bigTimeout, littleTimeout);
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

        // TODO: there's a bug that needs some more investigation where receiveAndDelete loses messages if we're
        // too aggressive about returning early. In that case we just revert to using the older behavior of waiting for
        // the duration of time given (or max messages) with no idle timer.
        // When we eliminate that bug we can enable this test for all modes.
        (lockMode === InternalReceiveMode.peekLock ? it : it.skip)(
          "4. sanity check that we're using getRemainingWaitTimeInMs",
          async () => {
            const receiver = new MessageSession(createClientEntityContextForTests(), {
              receiveMode: lockMode
            });

            const { receiveIsReady, emitter } = setupFakeReceiver(receiver);

            let wasCalled = false;

            const arbitraryAmountOfTimeInMs = 40;

            receiver["_batchingReceiverLite"]["_getRemainingWaitTimeInMsFn"] = (
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

            const receivePromise = receiver.receiveMessages(3, bigTimeout + 1, bigTimeout + 2);
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
          }
        ).timeout(5 * 1000);
      });
    });

    function setupFakeReceiver(
      batchingReceiver: MessageSession
    ): {
      receiveIsReady: Promise<void>;
      emitter: EventEmitter;
      remainingRegisteredListeners: Set<string>;
    } {
      const emitter = new EventEmitter();
      const { promise: receiveIsReady, resolve: resolvePromiseIsReady } = defer<void>();
      let credits = 0;

      const remainingRegisteredListeners = new Set<string>();

      const fakeRheaReceiver = {
        on(evt: ReceiverEvents, handler: OnAmqpEventAsPromise) {
          emitter.on(evt, handler);

          if (evt === ReceiverEvents.message) {
            --credits;
          }

          assert.isFalse(remainingRegisteredListeners.has(evt.toString()));
          remainingRegisteredListeners.add(evt.toString());
        },
        removeListener(evt: ReceiverEvents, handler: OnAmqpEventAsPromise) {
          remainingRegisteredListeners.delete(evt.toString());
          emitter.removeListener(evt, handler);
        },
        session: {
          on(evt: SessionEvents, handler: OnAmqpEventAsPromise) {
            emitter.on(evt, handler);

            if (evt === SessionEvents.sessionClose) {
              // this also happens to be the final thing the Promise does
              // as part of it's initialization.
              resolvePromiseIsReady();
            }

            assert.isFalse(remainingRegisteredListeners.has(evt.toString()));
            remainingRegisteredListeners.add(evt.toString());
          },
          removeListener(evt: SessionEvents, handler: OnAmqpEventAsPromise) {
            remainingRegisteredListeners.delete(evt.toString());
            emitter.removeListener(evt, handler);
          }
        },
        isOpen: () => true,
        addCredit: (_credits: number) => {
          if (_credits === 1 && fakeRheaReceiver.drain === true) {
            // special case - if we're draining we should initiate a drain
            emitter.emit(ReceiverEvents.receiverDrained, undefined);
          } else {
            credits += _credits;
          }
        },
        get credit() {
          return credits;
        },
        connection: {
          id: "connection-id"
        }
      } as RheaReceiver;

      batchingReceiver["_receiver"] = fakeRheaReceiver;

      batchingReceiver["_batchingReceiverLite"]["_createServiceBusMessage"] = (eventContext) => {
        return {
          body: eventContext.message?.body
        } as ServiceBusMessageImpl;
      };

      return {
        receiveIsReady,
        emitter,
        remainingRegisteredListeners
      };
    }
  });
});
