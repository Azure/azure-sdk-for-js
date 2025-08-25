// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConfidentialLedgerClient } from "@azure-rest/confidential-ledger";
import { isUnexpected } from "@azure-rest/confidential-ledger";
import { createClient, createRecorder } from "./utils/recordedClient.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { isLiveMode } from "@azure-tools/test-recorder";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("Get ledger history", () => {
  let recorder: Recorder;
  let client: ConfidentialLedgerClient;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = await createClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should obtain ledger entries from ledger", { skip: isLiveMode() }, async () => {
    const result = await client.path("/app/transactions").get();

    assert.equal(result.status, "200");

    const currentTransactionsResult = await client.path("/app/transactions/current").get();

    assert.equal(result.status, "200");

    if (isUnexpected(currentTransactionsResult)) {
      throw result.body;
    }

    assert.typeOf(currentTransactionsResult.body.contents, "string");
    assert.typeOf(currentTransactionsResult.body.collectionId, "string");
    assert.typeOf(currentTransactionsResult.body.transactionId, "string");
  });
});
