// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
const assert = chai.assert;

import { ClientEntityContext } from "../src/clientEntityContext";
import { MessageSender } from "../src/core/messageSender";
import { OperationOptions } from "../src/modelsToBeSharedWithEventHubs";
import { DefaultDataTransformer } from "@azure/core-amqp";
import { AbortSignalLike } from "@azure/abort-controller";
import { ServiceBusMessageBatch } from "../src/serviceBusMessageBatch";
import { delay, AwaitableSender } from "rhea-promise";

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

      let passedInOptions: OperationOptions | undefined;

      sender["_trySend"] = async (buffer, sendBatch, options) => {
        passedInOptions = options;
      };

      await sender.send(testMessageThatDoesntMatter, {
        abortSignal: createTaggedAbortSignal("passed with send", false)
      });

      assert.equal((passedInOptions?.abortSignal as any).tag, "passed with send");

      await sender.sendBatch({} as ServiceBusMessageBatch, {
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

    it("_trySend with a signal aborted while init() is still running", async () => {
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
      }
    });
  });
});

function createClientEntityContextForTests(): ClientEntityContext & { initWasCalled: boolean } {
  let initWasCalled = false;

  const fakeClientEntityContext = {
    entityPath: "queue",
    sender: {
      credit: 999
    },
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
