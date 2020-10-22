// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { createConnectionContextForTests } from "./unittestUtils";
import { ProcessErrorArgs, ReceiveMode, ServiceBusMessagingError } from "../../src";
import { StreamingReceiver } from "../../src/core/streamingReceiver";
import sinon from "sinon";
import { EventContext } from "rhea-promise";
import { Constants, RetryConfig, RetryMode } from "@azure/core-amqp";
import { createAndInitStreamingReceiverForTest } from "../utils/testUtils";
import { AbortError } from "@azure/abort-controller";

chai.use(chaiAsPromised);
const assert = chai.assert;

describe("StreamingReceiver unit tests", () => {
  const defaultConstructorOptions = {
    lockRenewer: undefined,
    receiveMode: <ReceiveMode>"peekLock"
  };

  let closeables: { close(): Promise<void> }[];

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
      const streamingReceiver = new StreamingReceiver(
        createConnectionContextForTests(),
        "fakeEntityPath",
        defaultConstructorOptions
      );
      closeables.push(streamingReceiver);
      assert.isFalse(streamingReceiver.isReceivingMessages);

      // init() is considered the start of the receive operation (from StreamingReceiver's point of
      // view)
      await streamingReceiver.init({
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
          maxConcurrentCalls: 101,
          ...defaultConstructorOptions
        }
      );
      closeables.push(streamingReceiver);

      await streamingReceiver.init({
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
        async (_msg) => {},
        async (_err) => {}
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

      await streamingReceiver.init({
        useNewName: false,
        ...defaultInitArgs
      });

      defaultInitArgs.assert();

      assert.isTrue(
        streamingReceiver.isReceivingMessages,
        "we've initialized the streaming receiver again so we're ready to receive again"
      );

      streamingReceiver.subscribe(
        async (_msg) => {},
        async (_err) => {}
      );

      assert.equal(
        streamingReceiver["link"]?.credit,
        101,
        "subscribe has started again, and is revitalized with 101 credits."
      );
    });

    it("isReceivingMessages set to false by close()'ing", async () => {
      const streamingReceiver = new StreamingReceiver(
        createConnectionContextForTests(),
        "fakeEntityPath",
        defaultConstructorOptions
      );
      closeables.push(streamingReceiver);

      await streamingReceiver.init({
        useNewName: true,
        ...defaultInitArgs
      });

      defaultInitArgs.assert();

      streamingReceiver.subscribe(
        async (_msg) => {},
        async (_err) => {}
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

      await streamingReceiver.init({
        useNewName: true,
        ...defaultInitArgs
      });

      defaultInitArgs.assert();

      streamingReceiver.subscribe(
        async (_msg) => {},
        async (_err) => {}
      );

      assert.isTrue(streamingReceiver.isReceivingMessages);

      await streamingReceiver.stopReceivingMessages();
      assert.isFalse(streamingReceiver.isReceivingMessages);
    });

    it("isReceivingMessages set to false by calling onDetach and init fails", async () => {
      const streamingReceiver = new StreamingReceiver(
        createConnectionContextForTests(),
        "fakeEntityPath",
        defaultConstructorOptions
      );
      closeables.push(streamingReceiver);

      await streamingReceiver.init({
        useNewName: true,
        ...defaultInitArgs
      });

      defaultInitArgs.assert();

      streamingReceiver.subscribe(
        async (_msg) => {},
        async (_err) => {}
      );

      assert.isTrue(streamingReceiver.isReceivingMessages);

      streamingReceiver["_init"] = () => {
        throw new Error("Will never succeed");
      };

      await streamingReceiver.onDetached(new Error("let's detach"));
      assert.isFalse(streamingReceiver.isReceivingMessages);
    });

    it("isReceivingMessages is set to true if onDetach succeeds in reconnecting", async () => {
      const streamingReceiver = new StreamingReceiver(
        createConnectionContextForTests(),
        "fakeEntityPath",
        defaultConstructorOptions
      );
      closeables.push(streamingReceiver);

      await streamingReceiver.init({
        useNewName: true,
        ...defaultInitArgs
      });

      defaultInitArgs.assert();

      streamingReceiver.subscribe(
        async (_msg) => {},
        async (_err) => {}
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

        let eventContext = {
          delivery: {},
          message: {
            message_annotations: {
              [Constants.enqueuedTime]: new Date()
            }
          }
        };

        streamingReceiver.subscribe(
          async (_message) => {
            throw new Error("Error thrown from the user's processMessage callback");
          },
          async (_args) => {
            args = _args;
          }
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

    beforeEach(() => {});

    afterEach(() => {
      return streamingReceiver?.close();
    });

    it("forever if initial connection fails to establish", async () => {
      streamingReceiver = new StreamingReceiver(createConnectionContextForTests(), "entity path", {
        receiveMode: "peekLock",
        lockRenewer: undefined,
        retryOptions: {
          maxRetries: 1, // this will get overridden when calling retry<>
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
            maxRetries: 1, // this will get overridden when calling retry<>
            maxRetryDelayInMs: 101, // this is used
            mode: RetryMode.Exponential,
            retryDelayInMs: 201,
            timeoutInMs: 301 // AFAICT this is not hooked up.)
          },
          "Should inherit the retry options set at the receiver level"
        );

        ++numTimesRetryFnCalled;
        if (numTimesRetryFnCalled === 1) {
          throw new Error("Purposeful failure, will cause another iteration of the loop.");
        } else {
          // go ahead and let the retry loop succeed (and it should properly terminate!)
          return {} as T;
        }
      };

      let errorThatShouldNotHappen: Error | ServiceBusMessagingError | undefined;

      await streamingReceiver.init({
        useNewName: false,
        connectionId: "connection-id",
        onError: (args) => {
          // all calls to onError only happen within the operation itself
          errorThatShouldNotHappen = args.error;
        }
      });

      assert.equal(
        numTimesRetryFnCalled,
        2,
        "Should call it twice - the first call through the loop fails, so we enter another retry round."
      );

      assert.notExists(
        errorThatShouldNotHappen,
        "onError should never have been called. Only the operation should do that and we've purposefully stubbed that out."
      );
    });

    it("forever loop immediately propagates AbortError", async () => {
      streamingReceiver = new StreamingReceiver(createConnectionContextForTests(), "entity path", {
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

      let errorThatShouldNotHappen: Error | ServiceBusMessagingError | undefined;

      try {
        await streamingReceiver.init({
          useNewName: false,
          connectionId: "connection-id",
          onError: (args) => {
            // all calls to onError only happen within the operation itself
            errorThatShouldNotHappen = args.error;
          }
        });
        assert.fail("Should have thrown because AbortError's are immediately propagated.");
      } catch (err) {
        assert.deepEqual(
          {
            name: err.name,
            message: err.message
          },
          {
            message: "Aborting immediately - user's abortSignal takes precedence.",
            name: "AbortError"
          }
        );
      }

      assert.notExists(
        errorThatShouldNotHappen,
        "onError should never have been called. Only the operation should do that and we've purposefully stubbed that out."
      );
    });

    it("forever aborts if abortSignal is signalled.", async () => {
      assert.fail("Not yet implemented");
    });

    it("forever if detaching", async () => {
      streamingReceiver = await createAndInitStreamingReceiverForTest(
        createConnectionContextForTests(),
        "entity path"
      );
      assert.notExists(streamingReceiver);
    });

    it("NOT forever if the user closes the streaming receiver", async () => {
      streamingReceiver = await createAndInitStreamingReceiverForTest(
        createConnectionContextForTests(),
        "entity path"
      );
      assert.notExists(streamingReceiver);
    });
  });
});
