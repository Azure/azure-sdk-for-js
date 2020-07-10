// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
const assert = chai.assert;

import { BatchingReceiver } from "../../src/core/batchingReceiver";
import { createClientEntityContextForTests } from "./unittestUtils";
import { ReceiverImpl } from "../../src/receivers/receiver";
import { createAbortSignalForTest } from "../utils/abortSignalTestUtils";
import { AbortController, AbortSignalLike } from "@azure/abort-controller";
import { ServiceBusMessageImpl, ReceiveMode } from "../../src/serviceBusMessage";
import { Receiver as RheaReceiver, ReceiverEvents, SessionEvents } from "rhea-promise";
import { StandardAbortMessage } from "../../src/util/utils";

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
            _maxWaitTimeInMs?: number,
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
        await receiver.receive(1, 60 * 1000, abortController.signal);
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
        await receiver.receive(1, 60 * 1000, abortController.signal);
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
});
