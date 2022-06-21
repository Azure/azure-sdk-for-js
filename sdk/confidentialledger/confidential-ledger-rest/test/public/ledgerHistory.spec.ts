// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ConfidentialLedgerRestClient, GetCurrentLedgerEntry200Response } from "../../src";
import { Recorder } from "@azure-tools/test-recorder";

import { assert } from "chai";
import { createClient, createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";

describe("Get ledger history", () => {
  let recorder: Recorder;
  let client: ConfidentialLedgerRestClient;

  beforeEach(async function (this: Context) {
    recorder = createRecorder(this);
    client = await createClient();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should obtain ledger entries from ledger", async function () {
    const result = await client.path("/app/transactions").get();

    assert.equal(result.status, "200");

    const currentTransactionsResult = await client.path("/app/transactions/current").get();

    assert.equal(result.status, "200");

    const currentTransaction: GetCurrentLedgerEntry200Response =
      currentTransactionsResult as GetCurrentLedgerEntry200Response;
    assert.typeOf(currentTransaction.body.contents, "string");
    assert.typeOf(currentTransaction.body.collectionId, "string");
    assert.typeOf(currentTransaction.body.transactionId, "string");
  });
});
