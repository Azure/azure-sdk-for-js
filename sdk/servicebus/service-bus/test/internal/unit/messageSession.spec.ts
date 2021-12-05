// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { MessageSession } from "../../../src/session/messageSession";
import {
  addCloseablesCleanup,
  createConnectionContextForTests,
  createConnectionContextForTestsWithSessionId,
  defer
} from "./unittestUtils";
import sinon, { SinonSpy } from "sinon";
import { EventEmitter } from "events";
import {
  ReceiverEvents,
  EventContext,
  Message as RheaMessage,
  SessionEvents,
  Receiver as RheaPromiseReceiver
} from "rhea-promise";
import { OnAmqpEventAsPromise } from "../../../src/core/messageReceiver";
import { ServiceBusMessageImpl } from "../../../src/serviceBusMessage";
import { ProcessErrorArgs, ServiceBusError } from "../../../src";
import { ReceiveMode } from "../../../src/models";
import { Constants } from "@azure/core-amqp";
import { AbortError } from "@azure/abort-controller";

chai.use(chaiAsPromised);
const assert = chai.assert;

describe("Message session unit tests", () => {
  describe("receiveMessages", () => {
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
          const receiver = new MessageSession(
            createConnectionContextForTests(),
            "dummyEntityPath",
            undefined,
            {
              receiveMode: lockMode,
              retryOptions: undefined
            }
          );

          const { receiveIsReady, emitter } = setupFakeReceiver(receiver as any);

          const receivePromise = receiver.receiveMessages(1, bigTimeout, bigTimeout, {});
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
          const receiver = new MessageSession(
            createConnectionContextForTests(),
            "dummyEntityPath",
            undefined,
            {
              receiveMode: lockMode,
              retryOptions: undefined
            }
          );

          const { receiveIsReady } = setupFakeReceiver(receiver);

          const receivePromise = receiver.receiveMessages(1, littleTimeout, bigTimeout, {});

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
        (lockMode === "peekLock" ? it : it.skip)(
          `3a. (with idle timeout) We've received 1 message and _now_ have exceeded 'max wait time past first message'`,
          async () => {
            const receiver = new MessageSession(
              createConnectionContextForTests(),
              "dummyEntityPath",
              undefined,
              {
                receiveMode: lockMode,
                retryOptions: undefined
              }
            );

            const { receiveIsReady, emitter } = setupFakeReceiver(receiver, clock);

            const receivePromise = receiver.receiveMessages(3, bigTimeout, littleTimeout, {});
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
        (lockMode === "receiveAndDelete" ? it : it.skip)(`3b. (without idle timeout)`, async () => {
          const receiver = new MessageSession(
            createConnectionContextForTests(),
            "dummyEntityPath",
            undefined,
            {
              receiveMode: lockMode,
              retryOptions: undefined
            }
          );

          const { receiveIsReady, emitter } = setupFakeReceiver(receiver);

          const receivePromise = receiver.receiveMessages(3, bigTimeout, littleTimeout, {});
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
        }).timeout(5 * 1000);

        // TODO: there's a bug that needs some more investigation where receiveAndDelete loses messages if we're
        // too aggressive about returning early. In that case we just revert to using the older behavior of waiting for
        // the duration of time given (or max messages) with no idle timer.
        // When we eliminate that bug we can enable this test for all modes.
        (lockMode === "peekLock" ? it : it.skip)(
          "4. sanity check that we're using getRemainingWaitTimeInMs",
          async () => {
            const receiver = new MessageSession(
              createConnectionContextForTests(),
              "dummyEntityPath",
              undefined,
              {
                receiveMode: lockMode,
                retryOptions: undefined
              }
            );

            const { receiveIsReady, emitter } = setupFakeReceiver(receiver, clock);

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

            const receivePromise = receiver.receiveMessages(3, bigTimeout + 1, bigTimeout + 2, {});
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
      batchingReceiver: MessageSession,
      clockParam?: ReturnType<typeof sinon.useFakeTimers>
    ): {
      receiveIsReady: Promise<void>;
      emitter: EventEmitter;
      remainingRegisteredListeners: Set<string>;
    } {
      const emitter = new EventEmitter();
      const { promise: receiveIsReady, resolve: resolvePromiseIsReady } = defer<void>();

      const remainingRegisteredListeners = new Set<string>();
      let credit = 0;

      const fakeRheaReceiver = {
        on(evt: ReceiverEvents, handler: OnAmqpEventAsPromise) {
          emitter.on(evt, handler);

          if (evt === ReceiverEvents.message) {
            --credit;
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
        addCredit: (_credit: number) => {
          credit += _credit;
        },
        drainCredit: () => {
          emitter.emit(ReceiverEvents.receiverDrained, undefined);
          clockParam?.runAll();
        },
        get credit() {
          return credit;
        },
        connection: {
          id: "connection-id"
        }
      } as RheaPromiseReceiver;

      batchingReceiver["_link"] = fakeRheaReceiver;

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

  describe("errors", () => {
    const closeables = addCloseablesCleanup();
    let messageSession: MessageSession;
    const eventContextWithMessage: EventContext = ({
      delivery: {},
      message: {
        message_annotations: {
          [Constants.enqueuedTime]: new Date()
        }
      }
    } as any) as EventContext;
    let processCreditErrorSpy: SinonSpy;

    beforeEach(async () => {
      messageSession = await MessageSession.create(
        createConnectionContextForTestsWithSessionId("session id"),
        "entity path",
        "session id",
        {
          receiveMode: "receiveAndDelete",
          retryOptions: undefined
        }
      );

      closeables.push(messageSession);

      processCreditErrorSpy = sinon.spy(
        (messageSession as any) as { processCreditError: (err: any) => void },
        "processCreditError"
      );
    });

    it("errors thrown from the user's callback are marked as 'processMessageCallback' errors", async () => {
      let errorArgs: ProcessErrorArgs | undefined;

      const subscribePromise = new Promise<void>((resolve) => {
        messageSession.subscribe(
          async (_message) => {
            throw new Error("Error thrown from the user's processMessage callback");
          },
          async (args) => {
            errorArgs = args;
            resolve();
          },
          {}
        );
      });

      messageSession["_link"]?.emit(ReceiverEvents.message, eventContextWithMessage);

      // once we emit the event we need to wait for it to be processed (and then in turn
      // generate an error)
      await subscribePromise;
      assert.exists(errorArgs, "We should have triggered processError.");

      assert.deepEqual(
        {
          message: errorArgs!.error.message,
          errorSource: errorArgs!.errorSource,
          entityPath: errorArgs!.entityPath,
          fullyQualifiedNamespace: errorArgs!.fullyQualifiedNamespace
        },
        {
          message: "Error thrown from the user's processMessage callback",
          errorSource: "processMessageCallback",
          entityPath: "entity path",
          fullyQualifiedNamespace: "fakeHost"
        }
      );
    });

    it("errors thrown in the post-message-processing addCredit are sent to the user", async () => {
      let errorArgs: ProcessErrorArgs | undefined;
      let addCreditWasCalled = false;

      const subscribePromise = new Promise<void>((resolve) => {
        messageSession.subscribe(
          async (_message) => {
            // the next addCredit call should trigger an exception now
            messageSession["_receiverHelper"]["addCredit"] = (_credits) => {
              addCreditWasCalled = true;
              throw new Error("Purposeful failure in addCredit()");
            };
          },
          async (args) => {
            errorArgs = args;
            resolve();
          },
          {}
        );
      });

      messageSession["_link"]?.emit(ReceiverEvents.message, eventContextWithMessage);

      // once we emit the event we need to wait for it to be processed (and then in turn
      // generate an error)
      await subscribePromise;

      assert.exists(errorArgs, "We should have triggered processError.");

      assert.deepEqual(
        {
          message: errorArgs!.error.message,
          errorSource: errorArgs!.errorSource,
          entityPath: errorArgs!.entityPath,
          fullyQualifiedNamespace: errorArgs!.fullyQualifiedNamespace
        },
        {
          message: "Cannot request messages on the receiver",
          errorSource: "processMessageCallback",
          entityPath: "entity path",
          fullyQualifiedNamespace: "fakeHost"
        }
      );

      assert.isTrue(
        addCreditWasCalled,
        "Error thrown should have come from the call to addCredit()"
      );

      assert.isTrue(processCreditErrorSpy.called);
    });

    it("failing to add credits results in a SessionLockLost error", async () => {
      // we fabricate this error (there is no actual link activity here) but it's a more
      // sensible error type for sessions since it'll indicate that the link itself is bad.
      const errors: { message: string; code: string }[] = [];

      messageSession["_receiverHelper"]["addCredit"] = () => {
        throw new Error("addCredit had an error!");
      };

      messageSession.subscribe(
        async (_message) => {
          /* empty body */
        },
        (errorArgs) => {
          errors.push({
            message: errorArgs.error.message,
            code: (errorArgs.error as ServiceBusError).code
          });
        },
        {}
      );

      assert.deepEqual(errors, [
        {
          message: "Cannot request messages on the receiver",
          code: "SessionLockLost"
        }
      ]);

      assert.isTrue(processCreditErrorSpy.called);
    });

    it("processCreditError doesn't log or forward AbortError's", () => {
      let onErrorCalled = false;
      messageSession["_onError"] = (_err) => {
        onErrorCalled = true;
      };

      // We allow AbortError to no-op since the user is already aware they
      // are suspending the connection (and thus credit errors will occur)
      messageSession["processCreditError"](new AbortError());
      assert.isFalse(onErrorCalled);
    });

    it("processCreditError forwards non-retryable errors", () => {
      let err: ServiceBusError | Error | undefined;
      messageSession["_onError"] = (errArgs) => {
        err = errArgs.error;
      };

      // We allow AbortError to no-op since the user is already aware they
      // are suspending the connection (and thus credit errors will occur)
      messageSession["processCreditError"](new Error("Somewthing"));

      if (!err) {
        throw new Error("Expected an error to be passed to _onError");
      }

      assert.deepEqual(
        {
          name: err.name,
          code: (err as ServiceBusError).code,
          retryable: (err as ServiceBusError).retryable
        },
        {
          name: "ServiceBusError",
          code: "SessionLockLost",
          retryable: false
        }
      );
    });
  });
});
