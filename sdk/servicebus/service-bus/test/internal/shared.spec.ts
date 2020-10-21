// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getMessageIterator, wrapProcessErrorHandler } from "../../src/receivers/shared";
import chai from "chai";
import { ServiceBusReceiver } from "../../src/receivers/receiver";
import { ServiceBusLogger } from "../../src/log";
const assert = chai.assert;

describe("shared", () => {
  it("error handler wrapper", () => {
    let logErrorCalled = false;

    const wrappedProcessError = wrapProcessErrorHandler(
      {
        processError: (err) => {
          assert.equal(err.message, "Actual error that was passed in from service bus to the user");
          throw new Error("Whoops!");
        }
      },
      {
        logError: (err: Error, msg) => {
          // we only call this if the user's callback throws an error - we don't funnel this back
          // into their processError because that could cause an infinite set of failures.
          assert.equal(msg, `An error was thrown from the user's processError handler`);
          assert.equal(err.toString(), "Error: Whoops!");
          logErrorCalled = true;
        }
      } as ServiceBusLogger
    );

    wrappedProcessError(new Error("Actual error that was passed in from service bus to the user"));

    assert.isTrue(logErrorCalled, "log error should have been called");
  });

  it("getMessageIterator doesn't yield empty responses", async () => {
    const messages = [
      [],
      [
        {
          body: "hello",
          _amqpAnnotatedMessage: { body: "hello" }
        }
      ]
    ];

    const receiver: Pick<ServiceBusReceiver, "receiveMessages"> = {
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
        [
          {
            body: "hello",
            _amqpAnnotatedMessage: { body: "hello" }
          }
        ],
        allReceivedMessages,
        "We should only get one message. We don't return anything when the receive returns nothing."
      );
    }
  });
});
