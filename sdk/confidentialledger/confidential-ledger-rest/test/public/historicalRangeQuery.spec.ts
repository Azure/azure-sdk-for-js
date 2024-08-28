// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  ConfidentialLedgerClient,
  CreateLedgerEntryParameters,
  isUnexpected,
  LedgerEntry,
  paginate,
} from "../../src";

import { createClient, createRecorder, getRecorderUniqueVariable } from "./utils/recordedClient";

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";

describe("Range query should be successful", function () {
  let recorder: Recorder;
  let client: ConfidentialLedgerClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = await createClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should paginate queries", async function () {
    async function getTransactionStatus(transactionId: string) {
      const status = await client
        .path("/app/transactions/{transactionId}/status", transactionId)
        .get();

      if (isUnexpected(status)) {
        throw new Error("Unexpected status for transaction");
      }

      return status.body;
    }

    async function waitForTransactionToCommit(transactionId: string) {
      let status = await getTransactionStatus(transactionId);
      while (status.state !== "Committed") {
        status = await getTransactionStatus(transactionId);
      }
    }

    const messagesToSend = 20;

    const collectionId = getRecorderUniqueVariable(recorder, `pagedCollection`);

    for (let i = 0; i < messagesToSend; i++) {
      const entry: LedgerEntry = {
        contents: String(i),
      };

      const ledgerEntry: CreateLedgerEntryParameters = {
        contentType: "application/json",
        body: entry,
        queryParameters: { collectionId },
      };

      const result = await client.path("/app/transactions").post(ledgerEntry);

      if (isUnexpected(result)) {
        throw result.body;
      }

      const transactionId = result.headers["x-ms-ccf-transaction-id"] ?? "";

      await waitForTransactionToCommit(transactionId);
    }

    const ledgerEntries = await client
      .path("/app/transactions")
      .get({ queryParameters: { collectionId } });

    if (isUnexpected(ledgerEntries)) {
      throw ledgerEntries.body;
    }

    const items = paginate(client, ledgerEntries).byPage();
    let pageCount = 0;
    let itemCount = 0;

    for await (const page of items) {
      pageCount++;
      itemCount += page.length;
    }

    // ledger will send some amount of empty collection pages before sending the entries themselves
    assert.isAbove(pageCount, 1);
    assert.equal(itemCount, messagesToSend);
  });
});
