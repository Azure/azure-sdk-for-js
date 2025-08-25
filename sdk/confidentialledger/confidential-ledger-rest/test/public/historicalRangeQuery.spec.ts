// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ConfidentialLedgerClient,
  CreateLedgerEntryParameters,
  LedgerEntry,
  TransactionStatusOutput,
} from "@azure-rest/confidential-ledger";
import { isUnexpected, paginate } from "@azure-rest/confidential-ledger";
import { createClient, createRecorder, getRecorderUniqueVariable } from "./utils/recordedClient.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("Range query should be successful", () => {
  let recorder: Recorder;
  let client: ConfidentialLedgerClient;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = await createClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should paginate queries", async () => {
    async function getTransactionStatus(transactionId: string): Promise<TransactionStatusOutput> {
      const status = await client
        .path("/app/transactions/{transactionId}/status", transactionId)
        .get();

      if (isUnexpected(status)) {
        throw new Error("Unexpected status for transaction");
      }

      return status.body;
    }

    async function waitForTransactionToCommit(transactionId: string): Promise<void> {
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
