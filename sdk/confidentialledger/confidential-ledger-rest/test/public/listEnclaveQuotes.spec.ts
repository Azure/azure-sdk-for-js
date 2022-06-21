// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ConfidentialLedgerRestClient, GetEnclaveQuotes200Response } from "../../src";
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

  it("should list all available document formats", async function () {
    var result = await client.path("/app/enclaveQuotes").get();

    assert.equal(result.status, "200");

    result = result as GetEnclaveQuotes200Response;

    assert.typeOf(result.body.currentNodeId, "string");
    assert.equal(Object.keys(result.body.enclaveQuotes).length, 3);
  });
});
