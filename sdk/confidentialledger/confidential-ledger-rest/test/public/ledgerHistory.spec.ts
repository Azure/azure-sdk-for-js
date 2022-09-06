// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { 
  ConfidentialLedgerClient, 
  LedgerEntry,
  CreateLedgerEntryParameters,
  isUnexpected } from "../../src";
import { createClient, createRecorder } from "./utils/recordedClient";

import { Context } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";

describe("Get ledger history", () => {
  let recorder: Recorder;
  let client: ConfidentialLedgerClient;

  beforeEach(async function (this: Context) {
    recorder = createRecorder(this);
    client = await createClient();

    const entry: LedgerEntry = {
      contents: "ledger history test",
    };
    const ledgerEntry: CreateLedgerEntryParameters = {
      contentType: "application/json",
      body: entry,
    };
    const result = await client.path("/app/transactions").post(ledgerEntry);

    if (isUnexpected(result)) {
      throw result.body;
    }

    assert.equal(result.status, "200");
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should obtain ledger entries from ledger", async function () {
    const result = await client.path("/app/transactions").get();
    console.log("result from /app/transactions: " + result.status);

    assert.equal(result.status, "200");

    const currentTransactionsResult = await client.path("/app/transactions/current").get();
    console.log("result from /app/transactions/current: " + currentTransactionsResult.status);

    assert.equal(result.status, "200");

    if (isUnexpected(currentTransactionsResult)) {
      throw result.body;
    }

    assert.typeOf(currentTransactionsResult.body.contents, "string");
    assert.typeOf(currentTransactionsResult.body.collectionId, "string");
    assert.typeOf(currentTransactionsResult.body.transactionId, "string");
  });
});
