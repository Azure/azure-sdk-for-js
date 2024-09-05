// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  ConfidentialLedgerClient,
  CreateLedgerEntryParameters,
  LedgerEntry,
  isUnexpected,
} from "../../src";
import { createClient, createRecorder, getRecorderUniqueVariable } from "./utils/recordedClient";

import { Context } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";

describe("Post transaction", function () {
  let recorder: Recorder;
  let client: ConfidentialLedgerClient;
  let contentBody: string;

  beforeEach(async function (this: Context) {
    contentBody = "typescript post test";
    recorder = await createRecorder(this);
    client = await createClient(recorder);
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

    const status = await client
      .path("/app/transactions/{transactionId}/status", transactionId)
      .get();

    assert.equal(result.status, "200");

    if (isUnexpected(status)) {
      throw result.body;
    }

    assert.oneOf(status.body.state, ["Pending", "Committed"]);
    assert.equal(status.body.transactionId, transactionId);

    const transactionResponse = await client
      .path("/app/transactions/{transactionId}/receipt", transactionId)
      .get();
    assert(
      transactionResponse.status === "200" ||
        (transactionResponse.status === "406" && status.body.state === "Pending"),
    );
  });

  it("should post to collection", async function () {
    const entry: LedgerEntry = {
      contents: "post ledger entry test",
    };

    const collectionId = getRecorderUniqueVariable(recorder, "collectionPost:0");

    const ledgerEntry: CreateLedgerEntryParameters = {
      contentType: "application/json",
      body: entry,
      queryParameters: { collectionId },
    };

    const result = await client.path("/app/transactions").post(ledgerEntry);

    if (isUnexpected(result)) {
      throw result.body;
    }

    assert.equal(result.status, "200");
    assert.equal(result.body.collectionId, collectionId);

    const transactionId = result.headers["x-ms-ccf-transaction-id"] ?? "";

    const status = await client
      .path("/app/transactions/{transactionId}/status", transactionId)
      .get();

    assert.equal(result.status, "200");
    if (isUnexpected(status)) {
      throw result.body;
    }

    assert.oneOf(status.body.state, ["Pending", "Committed"]);
    assert.equal(status.body.transactionId, transactionId);

    const transactionResponse = await client
      .path("/app/transactions/{transactionId}/receipt", transactionId)
      .get();
    assert(
      transactionResponse.status === "200" ||
        (transactionResponse.status === "406" && status.body.state === "Pending"),
    );
  });
});
