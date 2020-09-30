// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getMessageIterator, wrapProcessErrorHandler } from "../../src/receivers/shared";
import chai from "chai";
import { ServiceBusReceiver } from "../../src/receivers/receiver";
const assert = chai.assert;

describe("shared", () => {
  it("error handler wrapper", () => {
    const loggedMessages: string[] = [];

    const wrappedProcessError = wrapProcessErrorHandler(
      {
        processError: () => {
          throw new Error("Whoops!");
        }
      },
      (msg) => {
        loggedMessages.push(msg);
      }
    );

    wrappedProcessError(
      new Error(
        "Doesn't matter, testing internal behavior when the user's process error handler throws"
      )
    );

    assert.deepEqual(loggedMessages, [
      `An error was thrown from the user's processError handler: Error: Whoops!`
    ]);
  });

  it("getMessageIterator doesn't yield empty responses", async () => {
    const messages = [
      [],
      [
        {
          id: "hello"
        }
      ]
    ];

    const receiver: Pick<ServiceBusReceiver<any>, "receiveMessages"> = {
      receiveMessages: async (maxMessageCount, _options) => {
        assert.equal(maxMessageCount, 1);

        const m = messages.shift();

        if (m != null) {
          return m;
        }

        throw new Error("We're okay to end it now");
      }
    };

    const allReceivedMessages = [];

    try {
      for await (const m of getMessageIterator(receiver)) {
        allReceivedMessages.push(m);
      }
      assert.fail("Should throw");
    } catch (err) {
      assert.equal("We're okay to end it now", err.message);
      assert.deepEqual(
        [{ id: "hello" }],
        allReceivedMessages,
        "We should only get one message. We don't return anything when the receive returns nothing."
      );
    }
  });
});
