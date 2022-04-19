// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ConfidentialLedgerRestClient } from "../../src";
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

  it("should obtain ledger entries from ledger", async function () {

    const result = await client.path("/app/transactions").get();

    if (result.status !== "200") {
      assert.fail(`GET "/app/transactions" failed with ${result.status}`);
    }

    // let constResponse = result as GetLedgerEntries200Response;

    // let pagedEntries : PagedLedgerEntries = constResponse.body;

    
    // TODO: how do we make this pageable?
  });

  // TODO: get subset of entries randomly
});
