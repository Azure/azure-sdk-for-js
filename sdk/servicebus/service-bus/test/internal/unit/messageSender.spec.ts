// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MessageSender } from "../../../src/core/messageSender";
import { assertThrows } from "../../public/utils/testUtils";
import { createConnectionContextForTests } from "./unittestUtils";
import { assert } from "chai";

describe("MessageSender unit tests", () => {
  it("getMaxMessageSize should retry (exhaust retries)", async () => {
    const retryOptions = {
      maxRetries: 3,
      retryDelayInMs: 0,
      timeoutInMs: 1000,
    };

    const messageSender = new MessageSender(
      "serviceBusClientId",
      createConnectionContextForTests(),
      "entityPath",
      retryOptions,
    );

    let openCalled = 0;

    messageSender["open"] = () => {
      ++openCalled;

      // Simulating this result:
      // getMaxMessageSize() starts.
      //   open() called.
      //   open() finishes, control not yet returned to getMaxMessagesSize()
      //   onDetach() happens, link detaches and sets this._link to undefined.
      //   control returned back to getMaxMessagesSize()
      // code assumes link is initialized from open() (it was, but was closed) and then tries
      //   to get maxMessageSize, throwing an exception.
      return new Promise((resolve) => {
        messageSender["_link"] = undefined;
        resolve();
      });
    };

    await assertThrows(
      () =>
        messageSender.getMaxMessageSize({
          abortSignal: undefined,
          retryOptions,
        }),
      {
        name: "ServiceBusError",
        code: "GeneralError",
        message: `Error 0: ServiceBusError: Link failed to initialize, cannot get max message size.

Error 1: ServiceBusError: Link failed to initialize, cannot get max message size.

Error 2: ServiceBusError: Link failed to initialize, cannot get max message size.

Error 3: ServiceBusError: Link failed to initialize, cannot get max message size.`,
      },
    );

    assert.equal(openCalled, retryOptions.maxRetries + 1);
  });

  it("getMaxMessageSize should retry (success)", async () => {
    const retryOptions = {
      maxRetries: 3,
      retryDelayInMs: 0,
      timeoutInMs: 1000,
    };

    const messageSender = new MessageSender(
      "serviceBusClientId",
      createConnectionContextForTests(),
      "entityPath",
      retryOptions,
    );

    let openCalled = 0;

    messageSender["open"] = async () => {
      ++openCalled;

      messageSender["_link"] = {
        maxMessageSize: 101,
      } as any;
    };

    const maxMessageSize = await messageSender.getMaxMessageSize({
      abortSignal: undefined,
      retryOptions,
    });

    assert.equal(maxMessageSize, 101);
    assert.equal(openCalled, 1);
  });

  it("send should retry on detached link after open", async function () {
    const retryOptions = {
      maxRetries: 3,
      retryDelayInMs: 0,
      timeoutInMs: 1000,
    };

    const messageSender = new MessageSender(
      "serviceBusClientId",
      createConnectionContextForTests(),
      "entityPath",
      retryOptions,
    );
    messageSender["_logPrefix"] = "fakeSenderForSendRetry"; // prevent uuid in error message

    let openCalled = 0;

    messageSender["open"] = async () => {
      ++openCalled;

      messageSender["_link"] = {
        send: () => {
          /* no op */
        },
        isOpen: () => true,
        sendable: () => {
          // Simulating this result:
          // _trySend() starts.
          //   open() called and finished.
          //   waitForSendable(), which calls link.sendable(), finishes, control not returned to _trySend() yet.
          //   onDetach() happens, link detaches and sets this._link to undefined.
          //   control returned back to _trySend()
          // code assumes link was initialized from open() (but was closed) and then tries
          //   to send, throwing an exception.
          messageSender["_link"] = undefined;
          return true;
        },
      } as any;
    };

    await assertThrows(() => messageSender.send({ body: "message" }), {
      name: "ServiceBusError",
      code: "GeneralError",
      message: `Error 0: ServiceBusError: SenderNotReadyError: [fakeSenderForSendRetry] Cannot send the message. Link is not ready.

Error 1: ServiceBusError: SenderNotReadyError: [fakeSenderForSendRetry] Cannot send the message. Link is not ready.

Error 2: ServiceBusError: SenderNotReadyError: [fakeSenderForSendRetry] Cannot send the message. Link is not ready.

Error 3: ServiceBusError: SenderNotReadyError: [fakeSenderForSendRetry] Cannot send the message. Link is not ready.`,
    });

    assert.equal(openCalled, retryOptions.maxRetries + 1);
  });
});
