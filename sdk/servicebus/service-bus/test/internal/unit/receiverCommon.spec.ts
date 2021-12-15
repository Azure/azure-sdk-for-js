// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  getMessageIterator,
  retryForever,
  settleMessage,
  settleMessageOperation,
  wrapProcessErrorHandler
} from "../../../src/receivers/receiverCommon";
import chai from "chai";
import { ServiceBusReceiver } from "../../../src/receivers/receiver";
import { createServiceBusLogger, ServiceBusLogger } from "../../../src/log";
import { ProcessErrorArgs } from "../../../src/models";
import { ServiceBusError, translateServiceBusError } from "../../../src/serviceBusError";
import { MessagingError, RetryOperationType } from "@azure/core-amqp";
import {
  DispositionType,
  ServiceBusMessageImpl,
  ServiceBusReceivedMessage
} from "../../../src/serviceBusMessage";
import { ConnectionContext } from "../../../src/connectionContext";
import { DispositionStatusOptions } from "../../../src/core/managementClient";
import { Delivery } from "rhea-promise";
import { MessageAlreadySettled } from "../../../src/util/errors";
import { assertThrows } from "../../public/utils/testUtils";
import { AbortError } from "@azure/abort-controller";
const assert = chai.assert;

describe("shared receiver code", () => {
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
      const messagingError = new MessagingError("hello");
      messagingError.code = "MessagingEntityNotFoundError";
      const translatedError = translateServiceBusError(messagingError) as ServiceBusError;

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
      const messagingError = new MessagingError("hello");
      messagingError.code = unknownCode;
      const translatedError = translateServiceBusError(messagingError) as ServiceBusError;
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

  describe("settleMessage", () => {
    it("retry options are used and arguments plumbed through", async () => {
      const expectedFakeMessage = ({} as any) as ServiceBusMessageImpl;
      const expectedFakeContext = ({
        connectionId: "hello"
      } as any) as ConnectionContext;

      let numTimesCalled = 0;

      await settleMessage(
        expectedFakeMessage,
        DispositionType.deadletter,
        expectedFakeContext,
        "entityPath",
        {
          retryOptions: {
            maxRetries: 1,
            retryDelayInMs: 0
          },
          sessionId: "here just to prove that we're propagating options"
        },
        async (
          message: ServiceBusMessageImpl,
          operation: DispositionType,
          context: ConnectionContext,
          entityPath: string,
          options: DispositionStatusOptions
        ) => {
          ++numTimesCalled;

          assert.deepEqual(message, expectedFakeMessage);
          assert.deepEqual(context, expectedFakeContext);
          assert.deepEqual(operation, DispositionType.deadletter);
          assert.deepEqual(entityPath, "entityPath");
          assert.deepEqual(options.sessionId, "here just to prove that we're propagating options");

          if (numTimesCalled < 2) {
            const err = new Error("Force retries until the last iteration");
            (err as any).retryable = true;
            throw err;
          }
        }
      );

      assert.equal(numTimesCalled, 2);
    });

    it("already settled message throws message indicating lock was lost (non-session)", async () => {
      const fakeMessage = ({
        delivery: {
          remote_settled: true
        } as Delivery
      } as any) as ServiceBusMessageImpl;

      await assertThrows(
        () =>
          settleMessageOperation(
            fakeMessage,
            DispositionType.defer,
            {} as ConnectionContext,
            "entityPath",
            {
              retryOptions: undefined
            }
          ),
        {
          message: MessageAlreadySettled
        }
      );
    });

    it("already settled message throws message indicating lock was lost (session)", async () => {
      const fakeMessage = ({
        sessionId: "any session id",
        delivery: {
          remote_settled: true
        } as Delivery
      } as any) as ServiceBusMessageImpl;

      await assertThrows(
        () =>
          settleMessageOperation(
            fakeMessage,
            DispositionType.defer,
            {} as ConnectionContext,
            "entityPath",
            {
              retryOptions: undefined
            }
          ),
        {
          message: MessageAlreadySettled
        }
      );
    });
  });

  describe("retryForever", () => {
    const logger = createServiceBusLogger("fake");

    // retryForever retries forever on all exceptions _except_ AbortError
    it("respects AbortError", async () => {
      let onErrorError: Error | undefined;

      const retryForeverPromise = retryForever({
        logPrefix: "logPrefix",
        logger: logger,
        onError: (err) => {
          onErrorError = err;
        },
        retryConfig: {
          operation: () => {
            throw new AbortError("Purposefully abort");
          },
          connectionId: "id",
          operationType: RetryOperationType.connection
        }
      });

      await assertThrows(() => retryForeverPromise, {
        name: "AbortError",
        message: "Purposefully abort"
      });

      assert.notOk(onErrorError?.message);
    });

    it("exits if operation is successful", async () => {
      const errorMessages: string[] = [];
      let numOperationCalls = 0;

      await retryForever({
        logPrefix: "logPrefix",
        logger: logger,
        onError: (err) => {
          errorMessages.push(err.message);
        },
        retryConfig: {
          operation: async () => {
            ++numOperationCalls;
          },
          connectionId: "id",
          operationType: RetryOperationType.connection
        }
      });

      assert.isEmpty(errorMessages);
      assert.equal(numOperationCalls, 1);
    });

    it("retries after each retry<> call exhausts _its_ retries", async () => {
      const errorMessages: string[] = [];
      let numRetryCalls = 0;

      const fakeRetry = async <T>(): Promise<T> => {
        ++numRetryCalls;

        if (numRetryCalls < 3) {
          // force retry<> to get called three times (2x because
          // we "failed" and threw exceptions and 1 more time where
          // we succeed.
          throw new Error(`Attempt ${numRetryCalls}: Force another call of retry<>`);
        }

        return Promise.resolve({} as T);
      };

      await retryForever(
        {
          logPrefix: "logPrefix",
          logger: logger,
          onError: (err) => {
            errorMessages.push(err.message);
          },
          retryConfig: {
            operation: async () => {
              ++numRetryCalls;
              return 1;
            },
            connectionId: "id",
            operationType: RetryOperationType.connection
          }
        },
        fakeRetry
      );

      assert.deepEqual(errorMessages, [
        "Attempt 1: Force another call of retry<>",
        "Attempt 2: Force another call of retry<>"
      ]);

      assert.equal(numRetryCalls, 2 + 1);
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
  const messages: ServiceBusReceivedMessage[][] = [
    [],
    [
      {
        body: "hello",
        _rawAmqpMessage: { body: "hello" },
        state: "active"
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
          _rawAmqpMessage: { body: "hello" },
          state: "active"
        }
      ],
      allReceivedMessages,
      "We should only get one message. We don't return anything when the receive returns nothing."
    );
  }
});
