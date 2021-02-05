// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Connection } from "rhea-promise";
import { stub } from "sinon";
import { CbsClient, TokenType } from "../src";

describe("CbsClient", function() {
  const TEST_FAILURE = "Test failure";
  describe("negotiateClaim", function() {
    it("throws an error if the cbs link doesn't exist.", async function() {
      const connectionStub = stub(new Connection()) as any;

      const cbsClient = new CbsClient(connectionStub, "lock");
      try {
        await cbsClient.negotiateClaim("audience", "token", TokenType.CbsTokenTypeSas);
        throw new Error(TEST_FAILURE);
      } catch (err) {
        assert.equal(err.message, "Attempted to negotiate a claim but the CBS link does not exist.");
      }
    });
  });
});
