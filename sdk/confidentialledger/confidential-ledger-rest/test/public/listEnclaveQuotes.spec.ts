// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createClient, createRecorder } from "./utils/recordedClient";
import { ConfidentialLedgerRestClient } from "../../src";
import { Context } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";

describe("List Document Formats", () => {
  let recorder: Recorder;
  let client: ConfidentialLedgerRestClient;

  beforeEach(async function (this: Context) {
    recorder = createRecorder(this);
    client = createClient();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should list all available document formats", async function () {
    const result = await client.path("/app/enclaveQuotes").get();

    if (result.status !== "200") {
      assert.fail(`GET "/app/enclaveQuotes" failed with ${result.status}`);
    }

    assert.equal(Object.keys(result.body.enclaveQuotes).length, 3);
  });
});
