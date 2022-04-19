// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ConfidentialLedgerRestClient, GetLedgerEntries200Response, LedgerEntry } from "../../src";
import { Recorder } from "@azure-tools/test-recorder";

import { assert } from "chai";
import { createClient, createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";

describe("List Document Formats", () => {
  let recorder: Recorder;
  let client: ConfidentialLedgerRestClient;

  beforeEach(async function (this: Context) {
    recorder = createRecorder(this);
    client = await createClient();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  // TODO: add subLedgerIds test

  it("should obtain constitution from ledger", async function () {
    const result = await client.path("/app/transactions").get();

    if (result.status !== "200") {
      assert.fail(`GET "/app/transactions" failed with ${result.status}`);
    }

    let constResponse = result as GetLedgerEntries200Response;

    do {
      constResponse.body.entries.forEach((entry : LedgerEntry) => {
        assert.typeOf('string', entry.contents);
      })
    } while (constResponse.body.nextLink);
  });

  // TODO: get subset of entries randomly
});
