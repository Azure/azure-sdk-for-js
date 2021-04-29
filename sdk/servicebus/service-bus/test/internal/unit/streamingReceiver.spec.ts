// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { createConnectionContextForTests } from "./unittestUtils";
import { ProcessErrorArgs, ServiceBusReceivedMessage } from "../../../src";
import { ReceiveMode } from "../../../src/models";
import { StreamingReceiver } from "../../../src/core/streamingReceiver";
import sinon from "sinon";
import { EventContext } from "rhea-promise";
import { Constants, MessagingError, RetryConfig, RetryMode } from "@azure/core-amqp";
import { AbortError } from "@azure/abort-controller";
import { ReceiveOptions } from "../../../src/core/messageReceiver";

chai.use(chaiAsPromised);
const assert = chai.assert;

describe("StreamingReceiver unit tests", () => {
  const defaultConstructorOptions = {
    lockRenewer: undefined,
    receiveMode: <ReceiveMode>"peekLock",
    maxConcurrentCalls: 101
  };

  let closeables: { close(): Promise<void> }[];

  function createTestStreamingReceiver(
    entityPath: string,
    options: ReceiveOptions
  ): StreamingReceiver {
    const connectionContext = createConnectionContextForTests();
    const streamingReceiver = new StreamingReceiver(connectionContext, entityPath, options);
    closeables.push(streamingReceiver);
    return streamingReceiver;
  }

  const defaultInitArgs = {
    connectionId: "connection-id",
    onError: sinon.fake(),
    reset: () => {
      defaultInitArgs.onError.resetHistory();
    },
    assert: () => {
      assert.isFalse(
        defaultInitArgs.onError.called,
        `Expected not to have errors, but got ${defaultInitArgs.onError.args}`
      );
      defaultInitArgs.reset();
    }
  };

  beforeEach(() => {
    closeables = [];
    defaultInitArgs.reset();
  });

  afterEach(async () => {
    for (const closeable of closeables) {
      await closeable.close();
    }
  });

  describe("receive(), close() and stopReceivingMessages() interactions", () => {
    it("off by default", async () => {
      const streamingReceiver = createTestStreamingReceiver(
        "fakeEntityPath",
        defaultConstructorOptions
      );
      closeables.push(streamingReceiver);
      assert.isFalse(streamingReceiver.isReceivingMessages);

      // init() is considered the start of the receive operation (from StreamingReceiver's point of
      // view)
      await streamingReceiver.initWithRetries({
        useNewName: true,
        ...defaultInitArgs
      });
      assert.isTrue(streamingReceiver.isReceivingMessages);
      defaultInitArgs.assert();
    });

    it("isReceivingMessages set to true if subscribe() is called", async () => {
      const streamingReceiver = new StreamingReceiver(
        createConnectionContextForTests(),
        "fakeEntityPath",
        {
          ...defaultConstructorOptions
        }
      );
      closeables.push(streamingReceiver);

      await streamingReceiver.initWithRetries({
        useNewName: true,
        ...defaultInitArgs
      });

      defaultInitArgs.assert();

      // 'init' is always the predecessor to calling receive so we consider that to be the
      // start of the receive call.
      assert.isTrue(
        streamingReceiver.isReceivingMessages,
        "receive() sets the isReceivingMessages flag immediately to avoid race conditions"
      );

      streamingReceiver.subscribe(
        async (_msg) => {
          /** Nothing to do here */
        },
        async (_err) => {
          /** Nothing to do here */
        }
      );

      assert.equal(
        streamingReceiver["link"]!.credit,
        101,
        "Credits are added when receive() is called"
      );

      assert.isTrue(
        streamingReceiver.isReceivingMessages,
        "receive() sets the isReceivingMessages flag immediately to avoid race conditions"
      );

      // now we'll stop the streaming receiver and then start it back up again.
      await streamingReceiver.stopReceivingMessages();
      assert.isFalse(
        streamingReceiver.isReceivingMessages,
        "We've stopped receiving messages explicitly"
      );

      assert.equal(streamingReceiver["link"]?.credit, 0, "All receiver credits have been drained"); // ie, receiver drained

      await streamingReceiver.initWithRetries({
        useNewName: false,
        ...defaultInitArgs
      });

      defaultInitArgs.assert();

      assert.isTrue(
        streamingReceiver.isReceivingMessages,
        "we've initialized the streaming receiver again so we're ready to receive again"
      );

      streamingReceiver.subscribe(
        async (_msg) => {
          /** Nothing to do here */
        },
        async (_err) => {
          /** Nothing to do here */
        }
      );

      assert.equal(
        streamingReceiver["link"]?.credit,
        101,
        "subscribe has started again, and is revitalized with 101 credits."
      );
    });

    it("isReceivingMessages set to false by close()'ing", async () => {
      const streamingReceiver = createTestStreamingReceiver(
        "fakeEntityPath",
        defaultConstructorOptions
      );
      closeables.push(streamingReceiver);

      await streamingReceiver.initWithRetries({
        useNewName: true,
        ...defaultInitArgs
      });

      defaultInitArgs.assert();

      streamingReceiver.subscribe(
        async (_msg) => {
          /** Nothing to do here */
        },
        async (_err) => {
          /** Nothing to do here */
        }
      );

      assert.isTrue(streamingReceiver.isReceivingMessages);

      await streamingReceiver.close();
      assert.isFalse(streamingReceiver.isReceivingMessages);
    });

    it("isReceivingMessages set to false by calling stopReceivingMessages()", async () => {
      const streamingReceiver = new StreamingReceiver(
        createConnectionContextForTests(),
        "fakeEntityPath",
        defaultConstructorOptions
      );
      closeables.push(streamingReceiver);

      await streamingReceiver.initWithRetries({
        useNewName: true,
        ...defaultInitArgs
      });

      defaultInitArgs.assert();

      streamingReceiver.subscribe(
        async (_msg) => {
          /** Nothing to do here */
        },
        async (_err) => {
          /** Nothing to do here */
        }
      );

      assert.isTrue(streamingReceiver.isReceivingMessages);

      await streamingReceiver.stopReceivingMessages();
      assert.isFalse(streamingReceiver.isReceivingMessages);
    });

    it("isReceivingMessages is set to true if onDetach succeeds in reconnecting", async () => {
      const streamingReceiver = createTestStreamingReceiver(
        "fakeEntityPath",
        defaultConstructorOptions
      );
      closeables.push(streamingReceiver);

      await streamingReceiver.initWithRetries({
        useNewName: true,
        ...defaultInitArgs
      });

      defaultInitArgs.assert();

      streamingReceiver.subscribe(
        async (_msg) => {
          /** Nothing to do here */
        },
        async (_err) => {
          /** Nothing to do here */
        }
      );

      assert.isTrue(
        streamingReceiver.isReceivingMessages,
        "A receiver that has successfully opened the link and is subscribing should be receiving messages"
      );

      await streamingReceiver.onDetached(new Error("let's detach"));

      assert.isTrue(
        streamingReceiver.isReceivingMessages,
        "After a successful reconnect (within detach) we should be able to receive messages"
      );
    });
  });

  describe("errorSource", () => {
    it("errors thrown from the user's callback are marked as 'processMessageCallback' errors", async () => {
      const streamingReceiver = await createAndInitStreamingReceiverForTest(
        createConnectionContextForTests(),
        "entity path",
        {
          lockRenewer: undefined,
          receiveMode: "receiveAndDelete"
        }
      );

      try {
        let args: ProcessErrorArgs | undefined;

        const eventContext = {
          delivery: {},
          message: {
            message_annotations: {
              [Constants.enqueuedTime]: new Date()
            }
          }
        };

        streamingReceiver.subscribe(
          {
            processMessage: async (_message) => {
              throw new Error("Error thrown from the user's processMessage callback");
            },
            processError: async (_args) => {
              args = _args;
            }
          },
          undefined
        );

        await streamingReceiver["_onAmqpMessage"]((eventContext as any) as EventContext);

        assert.deepEqual(
          {
            message: args?.error.message,
            errorSource: args?.errorSource,
            entityPath: args?.entityPath,
            fullyQualifiedNamespace: args?.fullyQualifiedNamespace
          },
          {
            message: "Error thrown from the user's processMessage callback",
            errorSource: "processMessageCallback",
            entityPath: "entity path",
            fullyQualifiedNamespace: "fakeHost"
          }
        );
      } finally {
        await streamingReceiver.close();
      }
    });
  });

  describe("forever loop", () => {
    let streamingReceiver: StreamingReceiver | undefined;

    afterEach(() => {
      return streamingReceiver?.close();
    });

    it("forever if initial connection fails to establish", async () => {
      streamingReceiver = createTestStreamingReceiver("entity path", {
        receiveMode: "peekLock",
        lockRenewer: undefined,
        retryOptions: {
          maxRetries: 5,
          maxRetryDelayInMs: 101, // this is used
          mode: RetryMode.Exponential,
          retryDelayInMs: 201,
          timeoutInMs: 301 // AFAICT this is not hooked up.
        }
      });

      let numTimesRetryFnCalled = 0;

      streamingReceiver["_retry"] = async function retryStub<T>(
        retryConfig: RetryConfig<T>
      ): Promise<T> {
        assert.deepEqual(
          retryConfig.retryOptions,
          {
            maxRetries: 5,
            maxRetryDelayInMs: 101, // this is used
            mode: RetryMode.Exponential,
            retryDelayInMs: 201,
            timeoutInMs: 301 // AFAICT this is not hooked up.)
          },
          "Should inherit the retry options set at the receiver level"
        );

        ++numTimesRetryFnCalled;
        if (numTimesRetryFnCalled < 4) {
          throw new Error(`Error in retry cycle ${numTimesRetryFnCalled}`);
        } else {
          // go ahead and let the retry loop succeed (and it should properly terminate!)
          return {} as T;
        }
      };

      const errorsAfterRetryCycle: (Error | MessagingError | undefined)[] = [];

      await streamingReceiver.initWithRetries({
        useNewName: false,
        connectionId: "connection-id",
        onError: (args) => {
          // all calls to onError only happen within the operation itself
          errorsAfterRetryCycle.push(args.error);
        }
      });

      assert.equal(
        numTimesRetryFnCalled,
        3 + 1,
        "Should call it four times - the first three calls through the loop fail, so we enter another retry round."
      );

      assertErrors(
        errorsAfterRetryCycle,
        [
          {
            name: "Error",
            message: "Error in retry cycle 1",
            retryable: undefined // we're rethrowing the original error and purposefully haven't set this flag.
          },
          {
            name: "Error",
            message: "Error in retry cycle 2",
            retryable: undefined // we're rethrowing the original error and purposefully haven't set this flag.
          },
          {
            name: "Error",
            message: "Error in retry cycle 3",
            retryable: undefined // we're rethrowing the original error and purposefully haven't set this flag.
          }
          // after all of these failures we let a retry<> call succeed.
        ],
        "onError should be called after each failed cycle (ie, retry<> call)"
      );
    });

    it("forever loop immediately propagates AbortError", async () => {
      streamingReceiver = createTestStreamingReceiver("entity path", {
        receiveMode: "peekLock",
        lockRenewer: undefined,
        retryOptions: {
          maxRetries: 1,
          maxRetryDelayInMs: 101,
          mode: RetryMode.Exponential,
          retryDelayInMs: 201,
          timeoutInMs: 301
        }
      });

      streamingReceiver["_retry"] = async function retryStub<T>(
        _retryConfig: RetryConfig<T>
      ): Promise<T> {
        throw new AbortError("Aborting immediately - user's abortSignal takes precedence.");
      };

      let errorPassedToProcessError: Error | MessagingError | undefined;

      try {
        await streamingReceiver.initWithRetries({
          useNewName: false,
          connectionId: "connection-id",
          onError: (args) => {
            // all calls to onError only happen within the operation itself
            errorPassedToProcessError = args.error;
          }
        });
        assert.fail("Should have thrown because AbortError's are immediately propagated.");
      } catch (err) {
        assertError(err, {
          name: "AbortError",
          message: "Aborting immediately - user's abortSignal takes precedence.",
          retryable: undefined
        });
      }

      assertError(errorPassedToProcessError, {
        name: "AbortError",
        message: "Aborting immediately - user's abortSignal takes precedence.",
        retryable: undefined
      });
    });
  });

  it("onDetach calls through to init", async () => {
    const streamingReceiver = createTestStreamingReceiver(
      "fakeEntityPath",
      defaultConstructorOptions
    );
    closeables.push(streamingReceiver);

    const initMock = sinon.mock();
    const onErrorMock = sinon.mock();
    const addCreditMock = sinon.mock();

    streamingReceiver["initWithRetries"] = initMock;
    streamingReceiver["_onError"] = onErrorMock;
    streamingReceiver["_receiverHelper"]["addCredit"] = addCreditMock;

    await streamingReceiver.onDetached(new Error("let's detach"));
    assert.isTrue(
      addCreditMock.calledWith(101),
      "Credits need to be re-added to the link since it's been recreated."
    );

    assert.isTrue(initMock.calledOnce);

    // we log the error but we don't report it to the user. We save calling 'onError' for when
    // we fail to do something (in this case, only when the re-initialization is failing for some reason)
    assert.isFalse(
      onErrorMock.calledOnce,
      "The user's processError method should not be invoked unless we fail in init() (which isn't be called for this test)"
    );

    // simulate simultaneous detaches
    streamingReceiver["_isDetaching"] = true;
    initMock.resetHistory();

    await streamingReceiver.onDetached(
      new Error("let's detach but it won't because there's already a onDetached running.")
    );
    assert.isFalse(initMock.called); // we don't do parallel detaches - subsequent ones are just stopped
    streamingReceiver["_isDetaching"] = false;
  });

  /**
   * _setMessageHandlers wraps the individual message handler methods so they properly
   * funnel errors to processError and so (for instance with processInitialize) that all
   * functions are defined.
   */
  it("_setMessageHandlers", async () => {
    const streamingReceiver = createTestStreamingReceiver("entitypath", {
      lockRenewer: undefined,
      receiveMode: "peekLock"
    });

    let processErrorArgs: ProcessErrorArgs[] = [];
    const processMessages = [];

    streamingReceiver["_setMessageHandlers"](
      {
        processError: async (args) => {
          processErrorArgs.push(args);
          // these errors are logged and there's no programatic way to detect them.
          // this reduces the possiblity of a user ending up in an infinite set of `processError` calls.
          throw new Error("processError");
        },
        processMessage: async (msg) => {
          processMessages.push(msg);
          throw new Error("processMessage");
        },
        processInitialize: async () => {
          throw new Error("processInitialize");
        }
      },
      {}
    );

    const wrappedMessageHandlers = streamingReceiver["_messageHandlers"];

    if (wrappedMessageHandlers == null) {
      throw new Error("No message handlers were set!");
    }

    await wrappedMessageHandlers.processInitialize();

    assert.deepEqual(processErrorArgs, [
      {
        entityPath: "entitypath",
        error: new Error("processInitialize"),
        errorSource: "receive",
        fullyQualifiedNamespace: "fakehost"
      }
    ]);

    processErrorArgs = [];
    await wrappedMessageHandlers.processMessage({} as ServiceBusReceivedMessage);

    assert.deepEqual(processErrorArgs, [
      {
        entityPath: "entitypath",
        error: new Error("processMessage"),
        errorSource: "receive",
        fullyQualifiedNamespace: "fakehost"
      }
    ]);

    processErrorArgs = [];
    await wrappedMessageHandlers.processError({
      entityPath: "hello",
      error: new Error(),
      errorSource: "receive",
      fullyQualifiedNamespace: "fqns"
    });

    assert.deepEqual(processErrorArgs, [
      {
        entityPath: "hello",
        error: new Error(),
        errorSource: "receive",
        fullyQualifiedNamespace: "fqns"
      }
    ]);
  });
});

function assertError(
  err: any,
  expected: { name: string; message: string; retryable: boolean | undefined },
  assertMessage?: string
): void {
  assert.deepEqual(
    {
      name: err.name,
      message: err.message,
      retryable: err.retryable
    },
    expected,
    assertMessage ?? "Exception didn't match what we expected to be thrown."
  );
}

function assertErrors(
  actualErrors: any[],
  expectedErrors: { name: string; message: string; retryable: boolean | undefined }[],
  assertMessage?: string
): void {
  const simpleActualErrors = actualErrors.map((err) => ({
    name: err.name,
    message: err.message,
    retryable: err.retryable
  }));

  assert.deepEqual(
    simpleActualErrors,
    expectedErrors,
    assertMessage ?? "Exception didn't match what we expected."
  );
}
