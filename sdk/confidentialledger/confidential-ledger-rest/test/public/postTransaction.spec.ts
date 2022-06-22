// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import {
  ConfidentialLedgerClient,
  GetTransactionStatus200Response,
  LedgerEntry,
  PostLedgerEntry200Response,
  PostLedgerEntryParameters,
} from "../../src";
import { createClient, createRecorder } from "./utils/recordedClient";

import { Context } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";

describe("Post transaction", () => {
  let recorder: Recorder;
  let client: ConfidentialLedgerClient;
  let contentBody: string;

  beforeEach(async function (this: Context) {
    contentBody = "typescript post test";
    recorder = createRecorder(this);
    client = await createClient();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should post to default ledger", async function () {
    const entry: LedgerEntry = {
      contents: contentBody,
    };
    const ledgerEntry: PostLedgerEntryParameters = {
      contentType: "application/json",
      body: entry,
    };
    const result = (await client
      .path("/app/transactions")
      .post(ledgerEntry)) as PostLedgerEntry200Response;

    assert.equal(result.status, "200");

    const transactionId = result.headers["x-ms-ccf-transaction-id"] ?? "";

    // red level client which gives users full control of transactions
    const status = await client
      .path("/app/transactions/{transactionId}/status", transactionId)
      .get();

    assert.equal(result.status, "200");
    const statusResponse = status as GetTransactionStatus200Response;

    assert(statusResponse.body.state === "Pending" || statusResponse.body.state === "Committed");
    assert.equal(statusResponse.body.transactionId, transactionId);

    const transactionResponse = await client
      .path("/app/transactions/{transactionId}/receipt", transactionId)
      .get();
    console.log(transactionResponse);
    if (transactionResponse.status !== "200") {
      assert.fail(`GET "/app/transactions" failed with ${result.status}`);
    }
  });
});
