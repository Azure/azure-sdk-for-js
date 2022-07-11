// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ConfidentialLedgerClient, isUnexpected } from "../../src";
import { createClient, createRecorder } from "./utils/recordedClient";

import { Context } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";

describe("Get Collections", () => {
  let recorder: Recorder;
  let client: ConfidentialLedgerClient;

  beforeEach(async function (this: Context) {
    recorder = createRecorder(this);
    client = await createClient();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should list all available document formats", async function () {
    const result = await client.path("/app/collections").get();

    console.log(result);

    assert.equal(result.status, "200");

    if (isUnexpected(result)) {
      throw result.body;
    }

    let collections = result.body.collections;

    // the range query adds collections [0..4]
    const collectionVals = ["0", "1", "2", "3", "4"];

    collections = collections.filter((col: any) => collectionVals.includes(col.collectionId));

    assert.equal(collections.length, 5);
  });
});
