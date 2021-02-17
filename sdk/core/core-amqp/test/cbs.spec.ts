// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { AbortController } from "@azure/abort-controller";
import { CbsClient, TokenType } from "../src";
import { createConnectionStub } from "./utils/createConnectionStub";

describe("CbsClient", function() {
  const TEST_FAILURE = "Test failure";

  describe("negotiateClaim", function() {
    it("throws an error if the cbs link doesn't exist.", async function() {
      const connectionStub = createConnectionStub();
      const cbsClient = new CbsClient(connectionStub, "lock");

      try {
        await cbsClient.negotiateClaim("audience", "token", TokenType.CbsTokenTypeSas);
        throw new Error(TEST_FAILURE);
      } catch (err) {
        assert.equal(
          err.message,
          "Attempted to negotiate a claim but the CBS link does not exist."
        );
      }
    });

    describe("cancellation", function() {
      it("honors already aborted abortSignal", async function() {
        const connectionStub = createConnectionStub();
        const cbsClient = new CbsClient(connectionStub, "lock");

        // Create an abort signal that is already aborted.
        const controller = new AbortController();
        controller.abort();
        const signal = controller.signal;

        try {
          // Pass the already aborted abortSignal to make sure negotiateClaim will exit quickly.
          await cbsClient.negotiateClaim("audience", "token", TokenType.CbsTokenTypeSas, {
            abortSignal: signal
          });
          throw new Error(TEST_FAILURE);
        } catch (err) {
          assert.equal(err.name, "AbortError");
        }
      });

      it("honors abortSignal", async function() {
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
            abortSignal: signal
          });
          throw new Error(TEST_FAILURE);
        } catch (err) {
          assert.equal(err.name, "AbortError");
        }
      });
    });
  });
});
