// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
const assert = chai.assert;

import { ClientEntityContext } from "../../src/clientEntityContext";
import { MessageSender } from "../../src/core/messageSender";
import { OperationOptions } from "../../src/modelsToBeSharedWithEventHubs";
import { DefaultDataTransformer, AccessToken } from "@azure/core-amqp";
import { AbortSignalLike, AbortError } from "@azure/abort-controller";
import { AwaitableSender, delay } from "rhea-promise";
import { ServiceBusMessageBatchImpl } from "../../src/serviceBusMessageBatch";
import { SenderImpl } from "../../src/sender";
import { ServiceBusClient } from "../../src";

describe("AbortSignal", () => {
  const testMessageThatDoesntMatter = {
    body: "doesn't matter"
  };

  describe("ServiceBusClient", () => {
    it("createSender", async () => {
      const serviceBusClient = new ServiceBusClient(
        "Endpoint=sb://host.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=A"
      );

      try {
        await serviceBusClient.createSender("fakequeue", {
          abortSignal: createTaggedAbortSignal("already aborted", true)
        });
        assert.fail("Should have thrown");
      } catch (err) {
        assert.equal(err.message, "The createSender operation has been cancelled by the user.");
        assert.equal(err.name, "AbortError");
      }
    });
  });

  describe("sender", () => {
    let clientEntityContext: ReturnType<typeof createClientEntityContextForTests>;

    beforeEach(() => {
      clientEntityContext = createClientEntityContextForTests();
    });

    it("AbortSignal is plumbed through all send operations", async () => {
      const sender = new MessageSender(clientEntityContext, {});

      let passedInOptions: OperationOptions | undefined;

      sender["_trySend"] = async (_buffer, _sendBatch, options) => {
        passedInOptions = options;
      };

      await sender.send(testMessageThatDoesntMatter, {
        abortSignal: createTaggedAbortSignal("passed with send", false)
      });

      assert.equal((passedInOptions?.abortSignal as any).tag, "passed with send");

      const batchMessage = new ServiceBusMessageBatchImpl(clientEntityContext, 1000);
      await sender.sendBatch(batchMessage, {
        abortSignal: createTaggedAbortSignal("passed with sendBatch", false)
      });

      assert.equal((passedInOptions?.abortSignal as any).tag, "passed with sendBatch");

      await sender.sendMessages([testMessageThatDoesntMatter], {
        abortSignal: createTaggedAbortSignal("passed with sendMessages", false)
      });

      assert.equal((passedInOptions?.abortSignal as any).tag, "passed with sendMessages");
    });

    it("_trySend with an already aborted AbortSignal", async () => {
      const sender = new MessageSender(clientEntityContext, { timeoutInMs: 1 });

      sender["open"] = async () => {
        throw new Error("INIT SHOULD NEVER HAVE BEEN CALLED");
      };

      const abortSignal = createTaggedAbortSignal("_trySend test", true);

      try {
        await sender["_trySend"]({} as Buffer, true, {
          abortSignal
        });
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

    it("createBatch()", async () => {
      const sender = new SenderImpl(createClientEntityContextForTests());

      sender["_sender"] = ({
        createBatch: async () => {
          throw new AbortError(
            "The error matters but this message will be ignored and made specific to the actual operation."
          );
        }
      } as any) as MessageSender;

      try {
        await sender.createBatch();
        assert.fail("AbortError should have been thrown");
      } catch (err) {
        assert.equal(err.message, "The createBatch operation has been cancelled by the user.");
        assert.equal(err.name, "AbortError");
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
          abortSignal: createTaggedAbortSignal("not used for this test", false)
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
      const abortSignal = createTaggedAbortSignal("countdown", createCountdown(1));

      try {
        await sender.open(undefined, abortSignal);
        assert.fail("Should have thrown an AbortError");
      } catch (err) {
        assert.equal(err.message, "Sender creation was cancelled by the user.");
        assert.equal(err.name, "AbortError");
      }

      assert.isFalse(sender.isConnecting);
    });

    it("...afterLock", async () => {
      const sender = new MessageSender(createClientEntityContextForTests(), {});
      const abortSignal = createTaggedAbortSignal("countdown", createCountdown(2));

      try {
        await sender.open(undefined, abortSignal);
        assert.fail("Should have thrown an AbortError");
      } catch (err) {
        assert.equal(err.message, "Sender creation was cancelled by the user.");
        assert.equal(err.name, "AbortError");
      }

      assert.isFalse(sender.isConnecting);
    });

    it("...negotiateClaim", async () => {
      let isAborted = false;
      const taggedAbortSignal = createTaggedAbortSignal("a", () => isAborted);

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
        assert.equal(err.message, "Sender creation was cancelled by the user.");
        assert.equal(err.name, "AbortError");
      }

      assert.isFalse(sender.isConnecting);
    });

    it("...createAwaitableSender", async () => {
      let isAborted = false;
      const taggedAbortSignal = createTaggedAbortSignal("a", () => isAborted);

      const createdSenders: AwaitableSender[] = [];

      const sender = new MessageSender(
        createClientEntityContextForTests({
          onCreateAwaitableSenderCalled: (sender) => {
            isAborted = true;
            createdSenders.push(sender);
          }
        }),
        {}
      );

      sender["_negotiateClaim"] = async () => {};

      try {
        await sender.createBatch({ abortSignal: taggedAbortSignal });
        assert.fail("Should have thrown an AbortError");
      } catch (err) {
        assert.equal(err.message, "Sender creation was cancelled by the user.");
        assert.equal(err.name, "AbortError");
      }

      assert.isFalse(sender.isConnecting);
      assert.deepEqual(
        createdSenders.map((sender) => sender.isOpen()),
        [true]
      );
      assert.notExists(sender["_tokenRenewalTimer"]);
    });
  });
});

function createClientEntityContextForTests(options?: {
  onCreateAwaitableSenderCalled: (createdSender: AwaitableSender) => void;
}): ClientEntityContext & { initWasCalled: boolean } {
  let initWasCalled = false;

  const fakeClientEntityContext = {
    entityPath: "queue",
    sender: {
      credit: 999
    },
    namespace: {
      config: { endpoint: "my.service.bus" },
      connectionId: "connection-id",
      connection: {
        createAwaitableSender: async (): Promise<AwaitableSender> => {
          let isClosed = false;

          const testAwaitableSender = ({
            setMaxListeners: () => testAwaitableSender,
            isOpen: () => isClosed,
            close: async () => {
              isClosed = true;
            }
          } as any) as AwaitableSender;

          options?.onCreateAwaitableSenderCalled(testAwaitableSender);
          return testAwaitableSender;
        }
      },
      dataTransformer: new DefaultDataTransformer(),
      tokenCredential: {
        getToken() {
          return {} as AccessToken;
        }
      },
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

function createCountdown(numTimesTillAborted: number): () => boolean {
  return () => {
    --numTimesTillAborted;

    if (numTimesTillAborted < 0) {
      throw new Error(
        "We're checking abortSignal more than we thought. Our count is probably incorrect."
      );
    }

    return numTimesTillAborted === 0;
  };
}

function createTaggedAbortSignal(
  tag: string,
  isAborted: boolean | (() => boolean) = false
): AbortSignalLike & {
  tag: string;
  removeWasCalled: boolean;
  addWasCalled: boolean;
} {
  const removeWasCalled = false;
  let addWasCalled = false;

  const signal = {
    addEventListener(): void {
      addWasCalled = true;
    },
    removeEventListener(): void {
      this.removeWasCalled = true;
    },
    tag,
    removeWasCalled,
    addWasCalled,
    get aborted(): boolean {
      if (typeof isAborted === "function") {
        return isAborted();
      }
      return isAborted;
    }
  };

  return signal;
}
