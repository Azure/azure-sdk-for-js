// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import {
  ConfidentialLedgerClient,
  CreateLedgerEntryParameters,
  LedgerEntry,
  isUnexpected,
} from "../../src";
import { createClient, createRecorder } from "./utils/recordedClient";

import { Context } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";

describe("Post transaction", function () {
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
    const ledgerEntry: CreateLedgerEntryParameters = {
      contentType: "application/json",
      body: entry,
    };
    const result = await client.path("/app/transactions").post(ledgerEntry);

    if (isUnexpected(result)) {
      throw result.body;
    }

    assert.equal(result.status, "200");

    const transactionId = result.headers["x-ms-ccf-transaction-id"] ?? "";

    // red level client which gives users full control of transactions
    const status = await client
      .path("/app/transactions/{transactionId}/status", transactionId)
      .get();

    assert.equal(result.status, "200");

    if (isUnexpected(status)) {
      throw result.body;
    }

    assert(status.body.state === "Pending" || status.body.state === "Committed");
    assert.equal(status.body.transactionId, transactionId);

    const transactionResponse = await client
      .path("/app/transactions/{transactionId}/receipt", transactionId)
      .get();
    assert(
      transactionResponse.status === "200" ||
        (transactionResponse.status === "406" && status.body.state === "Pending")
    );
  });

  it("should post to collection", async function () {
    const entry: LedgerEntry = {
      contents: "post ledger entry test",
    };

    const collectionIdVar = "collectionPost:0";

    const ledgerEntry: CreateLedgerEntryParameters = {
      contentType: "application/json",
      body: entry,
      queryParameters: { collectionId: collectionIdVar },
    };

    const result = await client.path("/app/transactions").post(ledgerEntry);

    if (isUnexpected(result)) {
      throw result.body;
    }

    assert(result.status === "200");
    assert.equal(result.body.collectionId, collectionIdVar);

    const transactionId = result.headers["x-ms-ccf-transaction-id"] ?? "";

    const status = await client
      .path("/app/transactions/{transactionId}/status", transactionId)
      .get();

    assert.equal(result.status, "200");
    if (isUnexpected(status)) {
      throw result.body;
    }

    assert(status.body.state === "Pending" || status.body.state === "Committed");
    assert.equal(status.body.transactionId, transactionId);

    const transactionResponse = await client
      .path("/app/transactions/{transactionId}/receipt", transactionId)
      .get();
    assert(
      transactionResponse.status === "200" ||
        (transactionResponse.status === "406" && status.body.state === "Pending")
    );
  });
});
