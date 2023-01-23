// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ConfidentialLedgerClient, isUnexpected } from "../../src";
import { createClient, createRecorder } from "./utils/recordedClient";

import { Context } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { env } from "process";

describe("Get ledger history", () => {
  let recorder: Recorder;
  let client: ConfidentialLedgerClient;

  beforeEach(async function (this: Context) {
    recorder = createRecorder(this);
    client = await createClient();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should obtain ledger entries from ledger", async function () {
    if (isLiveMode()) {
      this.skip();
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

export function isLiveMode(): boolean {
  return env.TEST_MODE?.toLowerCase() === "live";
}
