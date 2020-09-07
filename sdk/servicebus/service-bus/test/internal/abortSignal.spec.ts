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
import { StreamingReceiver } from "../../src/core/streamingReceiver";
import {
  createAbortSignalForTest,
  createCountdownAbortSignal
} from "../utils/abortSignalTestUtils";
import { createConnectionContextForTests } from "./unittestUtils";
import { StandardAbortMessage } from "../../src/util/utils";
import { isLinkLocked } from "../utils/misc";

describe("AbortSignal", () => {
  const testMessageThatDoesntMatter = {
    body: "doesn't matter"
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
        abortSignal
      });

      assert.equal(passedInOptions?.abortSignal, abortSignal);

      abortSignal = createAbortSignalForTest(false);

      const batchMessage = new ServiceBusMessageBatchImpl(connectionContext, 1000);
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
      const sender = new MessageSender(connectionContext, "fakeEntityPath", { timeoutInMs: 1 });
      closeables.push(sender);

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
        assert.isFalse(connectionContext.initWasCalled);
      }
    });

    it("_trySend when the timer expires", async () => {
      const sender = new MessageSender(connectionContext, "fakeEntityPath", {
        timeoutInMs: 1
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
      const sender = new MessageSender(createConnectionContextForTests(), "fakeEntityPath", {});
      closeables.push(sender);

      const abortSignal = createCountdownAbortSignal(1);

      try {
        await sender.open(undefined, abortSignal);
        assert.fail("Should have thrown an AbortError");
      } catch (err) {
        assert.equal(err.message, StandardAbortMessage);
        assert.equal(err.name, "AbortError");
      }

      assert.isFalse(isLinkLocked(sender));
    });

    it("...afterLock", async () => {
      const sender = new MessageSender(createConnectionContextForTests(), "fakeEntityPath", {});
      closeables.push(sender);

      const abortSignal = createCountdownAbortSignal(2);

      try {
        await sender.open(undefined, abortSignal);
        assert.fail("Should have thrown an AbortError");
      } catch (err) {
        assert.equal(err.message, StandardAbortMessage);
        assert.equal(err.name, "AbortError");
      }

      assert.isFalse(isLinkLocked(sender));
    });

    it("...negotiateClaim", async () => {
      let isAborted = false;
      const taggedAbortSignal = createAbortSignalForTest(() => isAborted);

      const sender = new MessageSender(
        createConnectionContextForTests({
          onCreateAwaitableSenderCalled: () => {}
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
      } catch (err) {
        assert.equal(err.message, StandardAbortMessage);
        assert.equal(err.name, "AbortError");
      }

      assert.isFalse(isLinkLocked(sender));
    });

    it("...createAwaitableSender", async () => {
      let isAborted = false;
      const taggedAbortSignal = createAbortSignalForTest(() => isAborted);

      const sender = new MessageSender(
        createConnectionContextForTests({
          onCreateAwaitableSenderCalled: () => {
            isAborted = true;
          }
        }),
        "fakeEntityPath",
        {}
      );
      closeables.push(sender);

      sender["_negotiateClaim"] = async () => {};

      try {
        await sender.createBatch({ abortSignal: taggedAbortSignal });
        assert.fail("Should have thrown an AbortError");
      } catch (err) {
        assert.equal(err.message, StandardAbortMessage);
        assert.equal(err.name, "AbortError");
      }

      assert.isFalse(isLinkLocked(sender));
    });
  });

  describe("MessageReceiver.open() aborts after...", () => {
    it("...before first async call", async () => {
      const messageReceiver = new StreamingReceiver(
        createConnectionContextForTests(),
        "fakeEntityPath"
      );
      closeables.push(messageReceiver);

      const abortSignal = createCountdownAbortSignal(1);

      try {
        await messageReceiver["_init"]({} as ReceiverOptions, abortSignal);
        assert.fail("Should have thrown an AbortError");
      } catch (err) {
        assert.equal(err.message, StandardAbortMessage);
        assert.equal(err.name, "AbortError");
      }

      assert.isFalse(isLinkLocked(messageReceiver));
    });

    it("...after negotiateClaim", async () => {
      const messageReceiver = new StreamingReceiver(
        createConnectionContextForTests(),
        "fakeEntityPath"
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
      } catch (err) {
        assert.equal(err.message, StandardAbortMessage);
        assert.equal(err.name, "AbortError");
      }

      assert.isFalse(isLinkLocked(messageReceiver));
    });

    it("...after createReceiver", async () => {
      let isAborted = false;
      const abortSignal = createAbortSignalForTest(() => isAborted);

      const fakeContext = createConnectionContextForTests({
        onCreateReceiverCalled: () => {
          isAborted = true;
        }
      });
      const messageReceiver = new StreamingReceiver(fakeContext, "fakeEntityPath");
      closeables.push(messageReceiver);

      messageReceiver["_negotiateClaim"] = async () => {};

      try {
        await messageReceiver["_init"]({} as ReceiverOptions, abortSignal);
        assert.fail("Should have thrown an AbortError");
      } catch (err) {
        assert.equal(err.message, StandardAbortMessage);
        assert.equal(err.name, "AbortError");
      }

      assert.isFalse(isLinkLocked(messageReceiver));
    });
  });
});
