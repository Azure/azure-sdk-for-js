// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CbsClient, TokenType, defaultCancellableLock } from "../src";
import { AbortController } from "@azure/abort-controller";
import { Connection } from "rhea-promise";
import { assert } from "chai";
import { createConnectionStub } from "./utils/createConnectionStub";
import { isError } from "@azure/core-util";
import { stub } from "sinon";

describe("CbsClient", function () {
  const TEST_FAILURE = "Test failure";

  describe("init", function () {
    it("honors already aborted abortSignal", async function () {
      const cbsClient = new CbsClient(new Connection(), "lock");

      // Create an abort signal that is already aborted.
      const controller = new AbortController();
      controller.abort();
      const signal = controller.signal;

      try {
        await cbsClient.init({ abortSignal: signal });
        throw new Error(TEST_FAILURE);
      } catch (err) {
        assert.ok(isError(err));
        assert.equal((err as Error).name, "AbortError");
      }
    });

    it("honors abortSignal inside locking code", async function () {
      const lock = "lock";
      const cbsClient = new CbsClient(new Connection(), "lock");

      // Create an abort signal that will be aborted on a future tick of the event loop.
      const controller = new AbortController();
      const signal = controller.signal;

      // Make the existing `init` invocation wait until the abortSignal
      // is aborted before acquiring it's lock.
      await defaultCancellableLock.acquire(
        lock,
        () => {
          return new Promise<void>((resolve) => {
            setTimeout(() => {
              controller.abort();
              resolve();
            }, 0);
          });
        },
        { abortSignal: undefined, timeoutInMs: undefined }
      );

      try {
        await cbsClient.init({ abortSignal: signal });
        throw new Error(TEST_FAILURE);
      } catch (err) {
        assert.ok(isError(err));
        assert.equal((err as Error).name, "AbortError");
      }
    });

    it("honors abortSignal", async function () {
      const connectionStub = new Connection();
      // Stub 'open' because creating a real connection will fail.
      stub(connectionStub, "open").resolves({} as any);

      const cbsClient = new CbsClient(connectionStub, "lock");

      // Create an abort signal that will be aborted on a future tick of the event loop.
      const controller = new AbortController();
      const signal = controller.signal;
      setTimeout(() => controller.abort(), 0);

      try {
        await cbsClient.init({ abortSignal: signal });
        throw new Error(TEST_FAILURE);
      } catch (err) {
        assert.ok(isError(err));
        assert.equal((err as Error).name, "AbortError");
      }
    });
  });

  describe("negotiateClaim", function () {
    it("throws an error if the cbs link doesn't exist.", async function () {
      const connectionStub = createConnectionStub();
      const cbsClient = new CbsClient(connectionStub, "lock");

      try {
        await cbsClient.negotiateClaim("audience", "token", TokenType.CbsTokenTypeSas);
        throw new Error(TEST_FAILURE);
      } catch (err) {
        assert.ok(isError(err));
        assert.equal(
          (err as Error).message,
          "Attempted to negotiate a claim but the CBS link does not exist."
        );
      }
    });

    describe("cancellation", function () {
      it("honors already aborted abortSignal", async function () {
        const connectionStub = createConnectionStub();
        const cbsClient = new CbsClient(connectionStub, "lock");

        // Create an abort signal that is already aborted.
        const controller = new AbortController();
        controller.abort();
        const signal = controller.signal;

        try {
          // Pass the already aborted abortSignal to make sure negotiateClaim will exit quickly.
          await cbsClient.negotiateClaim("audience", "token", TokenType.CbsTokenTypeSas, {
            abortSignal: signal,
          });
          throw new Error(TEST_FAILURE);
        } catch (err) {
          assert.ok(isError(err));
          assert.equal((err as Error).name, "AbortError");
        }
      });

      it("honors abortSignal", async function () {
        const connectionStub = createConnectionStub();
        const cbsClient = new CbsClient(connectionStub, "lock");

        // Call `init()` to ensure the CbsClient has a RequestResponseLink.
        await cbsClient.init();

        // Create an abort signal that will be aborted on a future tick of the event loop.
        const controller = new AbortController();
        const signal = controller.signal;
        setTimeout(() => controller.abort(), 0);

        try {
          await cbsClient.negotiateClaim("audience", "token", TokenType.CbsTokenTypeSas, {
            abortSignal: signal,
          });
          throw new Error(TEST_FAILURE);
        } catch (err) {
          assert.ok(isError(err));
          assert.equal((err as Error).name, "AbortError");
        }
      });
    });
  });
});
