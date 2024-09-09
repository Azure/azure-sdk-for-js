// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { ConfidentialLedgerClient, isUnexpected } from "../../src";
import { createClient, createRecorder } from "./utils/recordedClient";

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";

describe("List Enclaves", function () {
  let recorder: Recorder;
  let client: ConfidentialLedgerClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = await createClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should list all available document formats", async function () {
    const result = await client.path("/app/enclaveQuotes").get();

    assert.equal(result.status, "200");

    if (isUnexpected(result)) {
      throw result.body;
    }

    assert.typeOf(result.body.currentNodeId, "string");
    assert.equal(Object.keys(result.body.enclaveQuotes).length, 3);
  });
});
