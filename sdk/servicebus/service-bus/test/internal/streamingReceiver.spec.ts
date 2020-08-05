// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { ReceiverImpl } from "../../src/receivers/receiver";
import { createClientEntityContextForTests, getPromiseResolverForTest } from "./unittestUtils";
import { ClientEntityContext } from "../../src/clientEntityContext";
import { ReceiveOptions } from "../../src/core/messageReceiver";
import { OperationOptions } from "../../src";
import { StreamingReceiver } from "../../src/core/streamingReceiver";
import { AbortController, AbortSignalLike } from "@azure/abort-controller";
chai.use(chaiAsPromised);
const assert = chai.assert;

describe("StreamingReceiver unit tests", () => {
  describe("receive(), close() and stopReceivingMessages() interactions", () => {
    it("off by default", async () => {
      const streamingReceiver = new StreamingReceiver(createClientEntityContextForTests());
      assert.isFalse(streamingReceiver.isReceivingMessages);

      // init() is considered the start of the receive operation (from StreamingReceiver's point of
      // view)
      await streamingReceiver.init(true);
      assert.isTrue(streamingReceiver.isReceivingMessages);
    });

    it("isReceivingMessages set to true if subscribe() is called", async () => {
      const streamingReceiver = new StreamingReceiver(createClientEntityContextForTests(), {
        maxConcurrentCalls: 101
      });

      await streamingReceiver.init(true);

      // 'init' is always the predecessor to calling receive so we consider that to be the
      // start of the receive call.
      assert.isTrue(
        streamingReceiver.isReceivingMessages,
        "receive() sets the isReceivingMessages flag immediately to avoid race conditions"
      );

      streamingReceiver.receive(
        async (_msg) => {},
        async (_err) => {}
      );

      assert.equal(
        streamingReceiver["_receiver"]!.credit,
        101,
        "Credits are added when receive() is called"
      );

      assert.isTrue(
        streamingReceiver.isReceivingMessages,
        "receive() sets the isReceivingMessages flag immediately to avoid race conditions"
      );

      assert.equal(streamingReceiver["_receiver"]?.credit, 101);

      // now we'll stop the streaming receiver and then start it back up again.
      await streamingReceiver.stopReceivingMessages();
      assert.isFalse(
        streamingReceiver.isReceivingMessages,
        "We've stopped receiving messages explicitly"
      );

      assert.equal(
        streamingReceiver["_receiver"]?.credit,
        0,
        "All receiver credits have been drained"
      ); // ie, receiver drained

      await streamingReceiver.init(false);
      assert.isTrue(
        streamingReceiver.isReceivingMessages,
        "we've initialized the streaming receiver again so we're ready to receive again"
      );

      streamingReceiver.receive(
        async (_msg) => {},
        async (_err) => {}
      );

      assert.equal(
        streamingReceiver["_receiver"]?.credit,
        101,
        "subscribe has started again, and is revitalized with 101 credits."
      );
    });

    it("isReceivingMessages set to false by close()'ing", async () => {
      const streamingReceiver = new StreamingReceiver(createClientEntityContextForTests());
      await streamingReceiver.init(true);

      streamingReceiver.receive(
        async (_msg) => {},
        async (_err) => {}
      );

      assert.isTrue(streamingReceiver.isReceivingMessages);

      await streamingReceiver.close();
      assert.isFalse(streamingReceiver.isReceivingMessages);
    });

    it("isReceivingMessages set to false by calling stopReceivingMessages()", async () => {
      const streamingReceiver = new StreamingReceiver(createClientEntityContextForTests());
      await streamingReceiver.init(true);

      streamingReceiver.receive(
        async (_msg) => {},
        async (_err) => {}
      );

      assert.isTrue(streamingReceiver.isReceivingMessages);

      await streamingReceiver.stopReceivingMessages();
      assert.isFalse(streamingReceiver.isReceivingMessages);
    });

    it("isReceivingMessages set to false by calling detach and init fails", async () => {
      const streamingReceiver = new StreamingReceiver(createClientEntityContextForTests());
      await streamingReceiver.init(true);

      streamingReceiver.receive(
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

    it("isReceivingMessages is set to true if detach succeeds", async () => {
      const streamingReceiver = new StreamingReceiver(createClientEntityContextForTests());
      await streamingReceiver.init(true);

      streamingReceiver.receive(
        async (_msg) => {},
        async (_err) => {}
      );

      assert.isTrue(streamingReceiver.isReceivingMessages);

      await streamingReceiver.onDetached(new Error("let's detach"));
      assert.isTrue(streamingReceiver.isReceivingMessages);
    });
  });

  describe("AbortSignal", () => {
    it("sanity check - abortSignal is propagated", async () => {
      const receiverImpl = new ReceiverImpl(createClientEntityContextForTests(), "peekLock");

      const abortController = new AbortController();
      const abortSignal = abortController.signal;

      const { resolve, promise } = getPromiseResolverForTest();

      receiverImpl["_createStreamingReceiver"] = async (
        _context: ClientEntityContext,
        options?: ReceiveOptions &
          Pick<OperationOptions, "abortSignal"> & {
            createStreamingReceiver?: (
              context: ClientEntityContext,
              options?: ReceiveOptions
            ) => StreamingReceiver;
          }
      ) => {
        assert.equal(abortSignal, options?.abortSignal, "abortSignal is properly passed through");
        resolve();
        return {} as StreamingReceiver;
      };

      const errors: string[] = [];

      receiverImpl.subscribe(
        {
          processMessage: async () => {},
          processError: async (err) => {
            errors.push(err.message);
          }
        },
        {
          abortSignal
        }
      );

      await promise;
      assert.isEmpty(errors);
    }).timeout(2000); // just for safety

    it("sanity check - abortSignal is propagated to _init()", async () => {
      let wasCalled = false;
      const abortController = new AbortController();

      await StreamingReceiver.create(createClientEntityContextForTests(), {
        _createStreamingReceiver: (_context, _options) => {
          wasCalled = true;
          return ({
            init: (_useNewName: boolean, abortSignal?: AbortSignalLike) => {
              wasCalled = true;
              assert.equal(
                abortSignal,
                abortController.signal,
                "abortSignal passed in when created should propagate to _init()"
              );
              return;
            }
          } as any) as StreamingReceiver;
        },
        abortSignal: abortController.signal
      });

      assert.isTrue(wasCalled);
    });
  });
});
