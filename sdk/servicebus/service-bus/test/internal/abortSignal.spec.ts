// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
const assert = chai.assert;

import { MessageSender } from "../../src/core/messageSender";
import { OperationOptionsBase } from "../../src/modelsToBeSharedWithEventHubs";
import { AwaitableSender, delay, ReceiverOptions } from "rhea-promise";
import { ServiceBusMessageBatchImpl } from "../../src/serviceBusMessageBatch";
import { MessageReceiver, ReceiverType } from "../../src/core/messageReceiver";
import {
  createAbortSignalForTest,
  createCountdownAbortSignal
} from "../utils/abortSignalTestUtils";
import { createClientEntityContextForTests } from "./unittestUtils";
import { StandardAbortMessage } from "../../src/util/utils";

describe("AbortSignal", () => {
  const testMessageThatDoesntMatter = {
    body: "doesn't matter"
  };

  describe("sender", () => {
    let clientEntityContext: ReturnType<typeof createClientEntityContextForTests>;

    beforeEach(() => {
      clientEntityContext = createClientEntityContextForTests();
    });

    it("AbortSignal is plumbed through all send operations", async () => {
      const sender = new MessageSender(clientEntityContext, {});

      let passedInOptions: OperationOptionsBase | undefined;

      sender["_trySend"] = async (_buffer, _sendBatch, options) => {
        passedInOptions = options;
      };

      let abortSignal = createAbortSignalForTest(false);

      await sender.send(testMessageThatDoesntMatter, {
        abortSignal
      });

      assert.equal(passedInOptions?.abortSignal, abortSignal);

      abortSignal = createAbortSignalForTest(false);

      const batchMessage = new ServiceBusMessageBatchImpl(clientEntityContext, 1000);
      await sender.sendBatch(batchMessage, {
        abortSignal
      });

      assert.equal(passedInOptions?.abortSignal, abortSignal);

      await sender.sendMessages([testMessageThatDoesntMatter], {
        abortSignal
      });

      assert.equal(passedInOptions?.abortSignal, abortSignal);
    });

    it("_trySend with an already aborted AbortSignal", async () => {
      const sender = new MessageSender(clientEntityContext, { timeoutInMs: 1 });

      sender["open"] = async () => {
        throw new Error("INIT SHOULD NEVER HAVE BEEN CALLED");
      };

      const abortSignal = createAbortSignalForTest(true);

      try {
        await sender["_trySend"]({} as Buffer, true, {
          abortSignal
        });
        assert.fail("AbortError should be thrown when the signal is already in an aborted state");
      } catch (err) {
        assert.equal(err.message, StandardAbortMessage);

        // we aborted in the sync part of the abort check so these event listeners are never set up
        assert.isFalse(abortSignal.addWasCalled);
        assert.isFalse(abortSignal.removeWasCalled);

        // init() doesn't get called - we abort early on this one.
        assert.isFalse(clientEntityContext.initWasCalled);
      }
    });

    it("_trySend when the timer expires", async () => {
      const sender = new MessageSender(clientEntityContext, {
        timeoutInMs: 1
      });
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

      let initWasCalled = true;

      sender["open"] = async () => {
        initWasCalled = true;
        // long enough to let the init timeout expiration code to run.
        await delay(1000);
      };

      try {
        await sender["_trySend"]({} as Buffer, true, {
          abortSignal: createAbortSignalForTest(false)
        });
        assert.fail("Sender should have thrown in the async portion of the abort handling");
      } catch (err) {
        // in this case init() does get called - we abort through a timer.
        assert.isTrue(initWasCalled);

        assert.match(
          err.message,
          /.*was not able to send the message right now, due to operation timeout.*/
        );

        assert.isTrue((err as any).retryable);
      }
    });
  });

  describe("MessageSender.open() aborts after...", () => {
    it("...beforeLock", async () => {
      const sender = new MessageSender(createClientEntityContextForTests(), {});
      const abortSignal = createCountdownAbortSignal(1);

      try {
        await sender.open(undefined, abortSignal);
        assert.fail("Should have thrown an AbortError");
      } catch (err) {
        assert.equal(err.message, StandardAbortMessage);
        assert.equal(err.name, "AbortError");
      }

      assert.isFalse(sender.isConnecting);
    });

    it("...afterLock", async () => {
      const sender = new MessageSender(createClientEntityContextForTests(), {});
      const abortSignal = createCountdownAbortSignal(2);

      try {
        await sender.open(undefined, abortSignal);
        assert.fail("Should have thrown an AbortError");
      } catch (err) {
        assert.equal(err.message, StandardAbortMessage);
        assert.equal(err.name, "AbortError");
      }

      assert.isFalse(sender.isConnecting);
    });

    it("...negotiateClaim", async () => {
      let isAborted = false;
      const taggedAbortSignal = createAbortSignalForTest(() => isAborted);

      const sender = new MessageSender(
        createClientEntityContextForTests({
          onCreateAwaitableSenderCalled: () => {}
        }),
        {}
      );

      sender["_negotiateClaim"] = async () => {
        isAborted = true;
      };

      try {
        await sender.createBatch({ abortSignal: taggedAbortSignal });
        assert.fail("Should have thrown an AbortError");
      } catch (err) {
        assert.equal(err.message, StandardAbortMessage);
        assert.equal(err.name, "AbortError");
      }

      assert.isFalse(sender.isConnecting);
    });

    it("...createAwaitableSender", async () => {
      let isAborted = false;
      const taggedAbortSignal = createAbortSignalForTest(() => isAborted);

      const sender = new MessageSender(
        createClientEntityContextForTests({
          onCreateAwaitableSenderCalled: () => {
            isAborted = true;
          }
        }),
        {}
      );

      sender["_negotiateClaim"] = async () => {};

      try {
        await sender.createBatch({ abortSignal: taggedAbortSignal });
        assert.fail("Should have thrown an AbortError");
      } catch (err) {
        assert.equal(err.message, StandardAbortMessage);
        assert.equal(err.name, "AbortError");
      }

      assert.isFalse(sender.isConnecting);
    });
  });

  describe("MessageReceiver.open() aborts after...", () => {
    it("...before first async call", async () => {
      const messageReceiver = new MessageReceiver(
        createClientEntityContextForTests(),
        ReceiverType.streaming
      );

      const abortSignal = createCountdownAbortSignal(1);

      try {
        await messageReceiver["_init"]({} as ReceiverOptions, abortSignal);
        assert.fail("Should have thrown an AbortError");
      } catch (err) {
        assert.equal(err.message, StandardAbortMessage);
        assert.equal(err.name, "AbortError");
      }

      assert.isFalse(messageReceiver.isConnecting);
    });

    it("...after negotiateClaim", async () => {
      const messageReceiver = new MessageReceiver(
        createClientEntityContextForTests(),
        ReceiverType.streaming
      );

      let isAborted = false;
      const abortSignal = createAbortSignalForTest(() => isAborted);

      messageReceiver["_negotiateClaim"] = async () => {
        isAborted = true;
      };

      try {
        await messageReceiver["_init"]({} as ReceiverOptions, abortSignal);
        assert.fail("Should have thrown an AbortError");
      } catch (err) {
        assert.equal(err.message, StandardAbortMessage);
        assert.equal(err.name, "AbortError");
      }

      assert.isFalse(messageReceiver.isConnecting);
    });

    it("...after createReceiver", async () => {
      let isAborted = false;
      const abortSignal = createAbortSignalForTest(() => isAborted);

      const fakeContext = createClientEntityContextForTests({
        onCreateReceiverCalled: () => {
          isAborted = true;
        }
      });
      const messageReceiver = new MessageReceiver(fakeContext, ReceiverType.streaming);

      messageReceiver["_negotiateClaim"] = async () => {};

      try {
        await messageReceiver["_init"]({} as ReceiverOptions, abortSignal);
        assert.fail("Should have thrown an AbortError");
      } catch (err) {
        assert.equal(err.message, StandardAbortMessage);
        assert.equal(err.name, "AbortError");
      }

      assert.isFalse(messageReceiver.isConnecting);
    });
  });
});
