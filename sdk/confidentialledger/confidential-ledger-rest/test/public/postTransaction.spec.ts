// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import {
  ConfidentialLedgerClient,
  GetTransactionStatus200Response,
  LedgerEntry,
  PostLedgerEntry200Response,
  PostLedgerEntryParameters,
  PostLedgerEntryQueryParamProperties,
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

    console.log(result)

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
    assert(transactionResponse.status == "200" || (transactionResponse.status == "406" && statusResponse.body.state === "Pending"));
  });

  it("should post to collection", async function () {
    const entry: LedgerEntry = {
      contents: "post ledger entry test"
    };

    const queryParams: PostLedgerEntryQueryParamProperties = {
      collectionId: "collectionPost:0"
    }

    const ledgerEntry: PostLedgerEntryParameters = {
      contentType: "application/json",
      body: entry,
      queryParameters: queryParams as any
    };

    let result = (await client
      .path("/app/transactions")
      .post(ledgerEntry)) as PostLedgerEntry200Response;

    assert(result.status == "200");

    let transactionId = result.headers["x-ms-ccf-transaction-id"] ?? "";
    
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
    assert(transactionResponse.status == "200" || (transactionResponse.status == "406" && statusResponse.body.state === "Pending"));

    console.log(transactionId);
    console.log(transactionResponse);

    transactionId = "2.381";

    const transactionItself = await client
    .path("/app/transactions/{transactionId}", transactionId)
    .get();

    console.log("transaction:")
    console.log(transactionItself);
  });
});
