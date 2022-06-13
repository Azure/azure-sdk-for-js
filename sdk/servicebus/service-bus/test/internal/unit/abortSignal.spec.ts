// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
const assert = chai.assert;

import { MessageSender } from "../../../src/core/messageSender";
import { OperationOptionsBase } from "../../../src/modelsToBeSharedWithEventHubs";
import { AwaitableSender, delay, ReceiverOptions } from "rhea-promise";
import { ServiceBusMessageBatchImpl } from "../../../src/serviceBusMessageBatch";
import { StreamingReceiver } from "../../../src/core/streamingReceiver";
import {
  createAbortSignalForTest,
  createCountdownAbortSignal,
} from "../../public/utils/abortSignalTestUtils";
import {
  createConnectionContextForTests,
  createConnectionContextForTestsWithSessionId,
} from "./unittestUtils";
import { StandardAbortMessage } from "@azure/core-amqp";
import { ServiceBusSessionReceiverImpl } from "../../../src/receivers/sessionReceiver";
import { ServiceBusReceiverImpl } from "../../../src/receivers/receiver";
import { MessageSession } from "../../../src/session/messageSession";
import { ProcessErrorArgs } from "../../../src";
import { ReceiveMode } from "../../../src/models";

describe("AbortSignal", () => {
  const defaultOptions = {
    lockRenewer: undefined,
    receiveMode: <ReceiveMode>"peekLock",
    skipParsingBodyAsJson: false,
  };

  const testMessageThatDoesntMatter = {
    body: "doesn't matter",
  };

  let closeables: { close(): Promise<void> }[];

  beforeEach(() => {
    closeables = [];
  });

  afterEach(async () => {
    for (const closeable of closeables) {
      await closeable.close();
    }
  });

  describe("sender", () => {
    let connectionContext: ReturnType<typeof createConnectionContextForTests>;

    beforeEach(() => {
      connectionContext = createConnectionContextForTests();
    });

    it("AbortSignal is plumbed through all send operations", async () => {
      const sender = new MessageSender(connectionContext, "fakeEntityPath", {});
      closeables.push(sender);

      let passedInOptions: OperationOptionsBase | undefined;

      sender["_trySend"] = async (_buffer, _sendBatch, options) => {
        passedInOptions = options;
      };

      let abortSignal = createAbortSignalForTest(false);

      await sender.send(testMessageThatDoesntMatter, {
        abortSignal,
      });

      assert.equal(passedInOptions?.abortSignal, abortSignal);

      abortSignal = createAbortSignalForTest(false);

      const batchMessage = new ServiceBusMessageBatchImpl(connectionContext, 1000);
      await sender.sendBatch(batchMessage, {
        abortSignal,
      });

      assert.equal(passedInOptions?.abortSignal, abortSignal);
    });

    it("_trySend with an already aborted AbortSignal", async () => {
      const sender = new MessageSender(connectionContext, "fakeEntityPath", { timeoutInMs: 1 });
      closeables.push(sender);

      sender["open"] = async () => {
        throw new Error("INIT SHOULD NEVER HAVE BEEN CALLED");
      };

      const abortSignal = createAbortSignalForTest(true);

      try {
        await sender["_trySend"]({} as Buffer, true, {
          abortSignal,
        });
        assert.fail("AbortError should be thrown when the signal is already in an aborted state");
      } catch (err: any) {
        assert.equal(err.message, StandardAbortMessage);

        // we aborted in the sync part of the abort check so these event listeners are never set up
        assert.isFalse(abortSignal.addWasCalled);
        assert.isFalse(abortSignal.removeWasCalled);

        // init() doesn't get called - we abort early on this one.
        assert.isFalse(connectionContext.initWasCalled);
      }
    });

    it("_trySend when the timer expires", async () => {
      const sender = new MessageSender(connectionContext, "fakeEntityPath", {
        timeoutInMs: 1,
      });
      closeables.push(sender);

      sender["_retryOptions"].timeoutInMs = 1;
      sender["_retryOptions"].maxRetries = 1;
      sender["_retryOptions"].retryDelayInMs = 1;

      sender["_link"] = {
        credit: 999,
        isOpen: () => false,
        session: {
          outgoing: {
            available: () => true,
          },
        },
      } as AwaitableSender;

      let initWasCalled = true;

      sender["open"] = async () => {
        initWasCalled = true;
        // long enough to let the init timeout expiration code to run.
        await delay(1000);
      };

      try {
        await sender["_trySend"]({} as Buffer, true, {
          abortSignal: createAbortSignalForTest(false),
        });
        assert.fail("Sender should have thrown in the async portion of the abort handling");
      } catch (err: any) {
        // in this case init() does get called - we abort through a timer.
        assert.isTrue(initWasCalled);

        assert.match(
          err.message,
          /.*was not able to send the message right now, due to operation timeout.*/
        );

        assert.isTrue((err as any).retryable);
      }
    });

    it("_trySend passes abortSignal to awaitable sender", async () => {
      const sender = new MessageSender(connectionContext, "fakeEntityPath", {
        timeoutInMs: 1,
      });
      closeables.push(sender);

      let wasAbortSignalPassed = false;
      sender["_link"] = {
        credit: 999,
        isOpen: () => true,
        session: {
          outgoing: {
            available: () => true,
          },
        },
        sendable() {
          return true;
        },
        send(_msg, options) {
          if (options?.abortSignal) {
            wasAbortSignalPassed = true;
          }
          return Promise.resolve({});
        },
      } as AwaitableSender;

      await sender["_trySend"]({} as Buffer, true, {
        abortSignal: createAbortSignalForTest(false),
      });
      assert.isTrue(wasAbortSignalPassed, "abortSignal should have been passed to AwaitableSender");
    });
  });

  describe("MessageSender.open() aborts after...", () => {
    it("...beforeLock", async () => {
      const sender = new MessageSender(createConnectionContextForTests(), "fakeEntityPath", {});
      closeables.push(sender);

      const abortSignal = createCountdownAbortSignal(1);

      try {
        await sender.open(undefined, abortSignal);
        assert.fail("Should have thrown an AbortError");
      } catch (err: any) {
        assert.equal(err.message, StandardAbortMessage);
        assert.equal(err.name, "AbortError");
      }
    });

    it("...afterLock", async () => {
      const sender = new MessageSender(createConnectionContextForTests(), "fakeEntityPath", {});
      closeables.push(sender);

      const abortSignal = createCountdownAbortSignal(2);

      try {
        await sender.open(undefined, abortSignal);
        assert.fail("Should have thrown an AbortError");
      } catch (err: any) {
        assert.equal(err.message, StandardAbortMessage);
        assert.equal(err.name, "AbortError");
      }
    });

    it("...negotiateClaim", async () => {
      let isAborted = false;
      const taggedAbortSignal = createAbortSignalForTest(() => isAborted);

      const sender = new MessageSender(
        createConnectionContextForTests({
          onCreateAwaitableSenderCalled: () => {
            /** Nothing to do here */
          },
        }),
        "fakeEntityPath",
        {}
      );
      closeables.push(sender);

      sender["_negotiateClaim"] = async () => {
        isAborted = true;
      };

      try {
        await sender.createBatch({ abortSignal: taggedAbortSignal });
        assert.fail("Should have thrown an AbortError");
      } catch (err: any) {
        assert.equal(err.message, StandardAbortMessage);
        assert.equal(err.name, "AbortError");
      }
    });

    it("...createAwaitableSender", async () => {
      let isAborted = false;
      const taggedAbortSignal = createAbortSignalForTest(() => isAborted);

      const sender = new MessageSender(
        createConnectionContextForTests({
          onCreateAwaitableSenderCalled: () => {
            isAborted = true;
          },
        }),
        "fakeEntityPath",
        {}
      );
      closeables.push(sender);

      sender["_negotiateClaim"] = async () => {
        /** Nothing to do here */
      };

      try {
        await sender.createBatch({ abortSignal: taggedAbortSignal });
        assert.fail("Should have thrown an AbortError");
      } catch (err: any) {
        assert.equal(err.message, StandardAbortMessage);
        assert.equal(err.name, "AbortError");
      }
    });
  });

  describe("MessageReceiver.open() aborts after...", () => {
    it("...before first async call", async () => {
      const messageReceiver = new StreamingReceiver(
        createConnectionContextForTests(),
        "fakeEntityPath",
        defaultOptions
      );
      closeables.push(messageReceiver);

      const abortSignal = createCountdownAbortSignal(1);

      try {
        await messageReceiver["_init"]({} as ReceiverOptions, abortSignal);
        assert.fail("Should have thrown an AbortError");
      } catch (err: any) {
        assert.equal(err.message, StandardAbortMessage);
        assert.equal(err.name, "AbortError");
      }
    });

    it("...after negotiateClaim", async () => {
      const messageReceiver = new StreamingReceiver(
        createConnectionContextForTests(),
        "fakeEntityPath",
        defaultOptions
      );
      closeables.push(messageReceiver);

      let isAborted = false;
      const abortSignal = createAbortSignalForTest(() => isAborted);

      messageReceiver["_negotiateClaim"] = async () => {
        isAborted = true;
      };

      try {
        await messageReceiver["_init"]({} as ReceiverOptions, abortSignal);
        assert.fail("Should have thrown an AbortError");
      } catch (err: any) {
        assert.equal(err.message, StandardAbortMessage);
        assert.equal(err.name, "AbortError");
      }
    });

    it("...after createReceiver", async () => {
      let isAborted = false;
      const abortSignal = createAbortSignalForTest(() => isAborted);

      const fakeContext = createConnectionContextForTests({
        onCreateReceiverCalled: () => {
          isAborted = true;
        },
      });
      const messageReceiver = new StreamingReceiver(fakeContext, "fakeEntityPath", defaultOptions);
      closeables.push(messageReceiver);

      messageReceiver["_negotiateClaim"] = async () => {
        /** Nothing to do here */
      };

      try {
        await messageReceiver["_init"]({} as ReceiverOptions, abortSignal);
        assert.fail("Should have thrown an AbortError");
      } catch (err: any) {
        assert.equal(err.message, StandardAbortMessage);
        assert.equal(err.name, "AbortError");
      }
    });
  });

  describe("subscribe", () => {
    /**
     * SessionReceiver is a bit of an odd duck because it doesn't do initialization
     * in its subscribe() call (like non-session receiver) so our normal abortSignal
     * code isn't running there. So we have to check this separately from Receiver.
     */
    it("SessionReceiver.subscribe", async () => {
      const connectionContext = createConnectionContextForTestsWithSessionId();

      const messageSession = await MessageSession.create(connectionContext, "entityPath", "hello", {
        retryOptions: undefined,
        skipParsingBodyAsJson: false,
      });

      const session = new ServiceBusSessionReceiverImpl(
        messageSession,
        connectionContext,
        "entityPath",
        "peekLock"
      );

      try {
        const abortSignal = createAbortSignalForTest(true);
        const receivedErrors: Error[] = [];

        session.subscribe(
          {
            processMessage: async (_msg) => {
              /** Nothing to do here */
            },
            processError: async (args) => {
              receivedErrors.push(args.error);
            },
          },
          {
            abortSignal,
          }
        );

        assert.equal(receivedErrors[0].message, "The operation was aborted.");
        assert.equal(receivedErrors[0].name, "AbortError");
      } finally {
        await session.close();
      }
    });

    it("Receiver.subscribe", async () => {
      const receiver = new ServiceBusReceiverImpl(
        createConnectionContextForTests(),
        "entityPath",
        "peekLock",
        1,
        false
      );

      try {
        const abortSignal = createAbortSignalForTest(true);
        const receivedErrors: Error[] = [];

        await new Promise<void>((resolve) => {
          receiver.subscribe(
            {
              processMessage: async (_msg: any) => {
                /** Nothing to do here */
              },
              processError: async (args: ProcessErrorArgs) => {
                resolve();
                receivedErrors.push(args.error);
              },
            },
            {
              abortSignal,
            }
          );
        });

        assert.equal(receivedErrors[0].message, "The operation was aborted.");
        assert.equal(receivedErrors[0].name, "AbortError");
      } finally {
        await receiver.close();
      }
    });
  });
});
