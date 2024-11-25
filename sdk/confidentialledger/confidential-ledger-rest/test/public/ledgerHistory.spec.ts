// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ConfidentialLedgerClient } from "../../src/index.js";
import { isUnexpected } from "../../src/index.js";
import { createClient, createRecorder } from "./utils/recordedClient.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { isLiveMode } from "@azure-tools/test-recorder";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";

describe("Get ledger history", function () {
  let recorder: Recorder;
  let client: ConfidentialLedgerClient;

  beforeEach(async function (ctx) {
    recorder = await createRecorder(this);
    client = await createClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should obtain ledger entries from ledger", async function () {
    if (isLiveMode()) {
      ctx.skip();
    }

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
