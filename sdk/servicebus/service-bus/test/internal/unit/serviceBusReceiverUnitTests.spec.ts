// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BatchingReceiver } from "$internal/core/batchingReceiver.js";
import { ServiceBusReceiverImpl } from "$internal/receivers/receiver.js";
import { assertThrows } from "../../public/utils/testUtils.js";
import { createConnectionContextForTests, getPromiseResolverForTest } from "./unittestUtils.js";
import type { InternalMessageHandlers } from "$internal/models.js";
import { afterEach, beforeEach, describe, it } from "vitest";
import { assert } from "../../public/utils/chai.js";

describe("ServiceBusReceiver unit tests", () => {
  let receiver: ServiceBusReceiverImpl;

  beforeEach(() => {
    receiver = new ServiceBusReceiverImpl(
      createConnectionContextForTests(),
      "entityPath",
      "peekLock",
      0,
      false,
    );
  });

  afterEach(() => receiver.close());

  const expectedError: Record<string, any> = {
    name: "Error",
    message: 'The receiver for "entityPath" is already receiving messages.',
  };

  it("isAlreadyReceiving (batching first, then streaming)", async () => {
    assert.isFalse(receiver["_isReceivingMessages"](), "Nothing should be receiving messages");

    receiver["_batchingReceiver"] = {
      isOpen: () => true,
      isReceivingMessages: true,
      close: async () => {
        /* empty body */
      },
    } as BatchingReceiver;

    assert.isTrue(receiver["_isReceivingMessages"](), "Batching receiver is receiving messages");

    const subscribeFn = async (): Promise<void> => {
      receiver.subscribe({
        processError: async (_errArgs) => {
          /* empty body */
        },
        processMessage: async (_msg) => {
          /* empty body */
        },
      });
    };

    await assertThrows(
      subscribeFn,
      expectedError as { name: string; message: string },
      "Trying to receive a separate way, in parallel, should throw",
    );
  });

  it("isAlreadyReceiving (streaming first, then batching)", async () => {
    assert.isFalse(receiver["_isReceivingMessages"](), "Nothing should be receiving messages");

    const { promise: subscriberInitializedPromise, resolve } = getPromiseResolverForTest();

    receiver.subscribe({
      postInitialize: async () => {
        resolve();
      },
      processError: async (_errArgs) => {
        /* empty body */
      },
      processMessage: async (_msg) => {
        /* empty body */
      },
    } as InternalMessageHandlers);

    await subscriberInitializedPromise;

    assert.isTrue(receiver["_isReceivingMessages"](), "Streaming receiver is receiving messages");

    await assertThrows(
      () => receiver.receiveMessages(1),
      expectedError as { name: string; message: string },
      "Trying to receive a separate way, in parallel, should throw",
    );
  });
});
