// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ConfidentialLedgerRestClient, GetTransactionStatus200Response, LedgerEntry, PostLedgerEntry200Response, PostLedgerEntryParameters } from "../../src";
import { Recorder } from "@azure-tools/test-recorder";

import { assert } from "chai";
import { createClient, createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";

describe("List Document Formats", () => {
  let recorder: Recorder;
  let client: ConfidentialLedgerRestClient;
  let contentBody : string;

  beforeEach(async function (this: Context) {
    contentBody = (Math.random() + 1).toString(36).substring(7);
    recorder = createRecorder(this);
    client = await createClient();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  // TODO: add subLedgerIds test

  it("should post to default ledger", async function () {

    var entry : LedgerEntry = {
      contents: contentBody
    }
    var ledgerEntry : PostLedgerEntryParameters = {
      contentType: 'application/json',
      body: entry
    }
    const result = await client.path("/app/transactions").post(ledgerEntry) as PostLedgerEntry200Response;

    if (result.status !== "200") {
      assert.fail(`GET "/app/transactions" failed with ${result.status}`);
    }

    const transactionId = result.headers["x-ms-ccf-transaction-id"] ?? "";

    // red level client which gives users full control of transactions
    const status = await client.path("/app/transactions/{transactionId}/status", transactionId).get();
    if (result.status !== "200") {
      assert.fail(`GET "/app/transactions/{transactionId}/status" failed with ${result.status}`);
    }
    const statusResponse = status as GetTransactionStatus200Response;
    assert(statusResponse.body.state == 'Pending' || statusResponse.body.state == 'Committed');
    assert.equal(statusResponse.body.transactionId, transactionId);

    const transactionResponse = await client.path("/app/transactions/{transactionId}/receipt", transactionId).get();
    if (transactionResponse.status !== "200") {
      assert.fail(`GET "/app/transactions" failed with ${result.status}`);
    }
  });
});
