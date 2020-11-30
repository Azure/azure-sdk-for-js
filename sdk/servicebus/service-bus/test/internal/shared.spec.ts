// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getMessageIterator, wrapProcessErrorHandler } from "../../src/receivers/shared";
import chai from "chai";
import { ServiceBusReceiver } from "../../src/receivers/receiver";
import { ServiceBusLogger } from "../../src/log";
import { ProcessErrorArgs } from "../../src/models";
import { ServiceBusError, translateServiceBusError } from "../../src/serviceBusError";
import { MessagingError } from "@azure/core-amqp";
const assert = chai.assert;

describe("shared", () => {
  describe("translateServiceBusError", () => {
    [
      new Error("Plain error"),
      new TypeError("Type errors"),
      new ServiceBusError(new MessagingError("is a ServiceBusError"))
    ].forEach((expectedError) => {
      it(`translateServiceBusError - some errors are returned verbatim: ${expectedError.message}`, () => {
        const translatedError = translateServiceBusError(expectedError);
        assert.equal(
          translatedError,
          expectedError,
          "The returned error should be exactly the same as the passed in error."
        );
      });
    });

    it(`basic translation`, () => {
      let messagingError = new MessagingError("hello");
      messagingError.code = "MessagingEntityNotFoundError";
      let translatedError = translateServiceBusError(messagingError) as ServiceBusError;

      assert.deepEqual(
        {
          name: translatedError.name,
          code: translatedError.code,
          message: translatedError.message,
          retryable: translatedError.retryable
        },
        {
          name: "ServiceBusError",
          code: "MessagingEntityNotFound",
          message: messagingError.message,
          retryable: messagingError.retryable
        } as ServiceBusError,
        "The code should be intact and the reason code, since it matches our blessed list, should match."
      );
    });
  });

  [
    undefined,
    "StoreLockLostError",
    "some random code we've never heard of",
    "GeneralError"
  ].forEach((unknownCode) => {
    it(`any unknown codes are marked with reason 'GeneralError': ${unknownCode}`, () => {
      let messagingError = new MessagingError("hello");
      messagingError.code = unknownCode;
      let translatedError = translateServiceBusError(messagingError) as ServiceBusError;
      const expectedMessage = unknownCode ? `${unknownCode}: hello` : "hello";

      assert.deepEqual(
        {
          name: translatedError.name,
          code: translatedError.code,
          message: translatedError.message,
          retryable: translatedError.retryable
        },
        {
          name: "ServiceBusError",
          code: "GeneralError",
          message: expectedMessage,
          retryable: messagingError.retryable
        } as ServiceBusError,
        "The code should be intact and the reason code, since it matches our blessed list, should match."
      );
    });
  });
});

it("error handler wrapper", () => {
  let logErrorCalled = false;

  const wrappedProcessError = wrapProcessErrorHandler(
    {
      processError: (args: ProcessErrorArgs) => {
        const sbe = args.error as ServiceBusError;
        assert.deepEqual(
          {
            name: sbe.name,
            message: args.error.message,
            fullyQualifiedNamespace: args.fullyQualifiedNamespace,
            entityPath: args.entityPath,
            errorSource: args.errorSource,
            code: sbe.code
          },
          {
            name: "ServiceBusError",
            message: "Actual error that was passed in from service bus to the user",
            fullyQualifiedNamespace: "fully qualified namespace",
            entityPath: "entity path",
            errorSource: "renewLock",
            code: "ServiceCommunicationProblem"
          }
        );

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

  const err = new MessagingError("Actual error that was passed in from service bus to the user");
  err.code = "ServiceCommunicationError";

  wrappedProcessError({
    error: err,
    entityPath: "entity path",
    errorSource: "renewLock",
    fullyQualifiedNamespace: "fully qualified namespace"
  });

  assert.isTrue(logErrorCalled, "log error should have been called");
});

it("getMessageIterator doesn't yield empty responses", async () => {
  const messages = [
    [],
    [
      {
        body: "hello",
        _rawAmqpMessage: { body: "hello" }
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
          _rawAmqpMessage: { body: "hello" }
        }
      ],
      allReceivedMessages,
      "We should only get one message. We don't return anything when the receive returns nothing."
    );
  }
});
