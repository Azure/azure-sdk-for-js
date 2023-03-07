// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import {
  ConfidentialLedgerClient,
  CreateLedgerEntryParameters,
  isUnexpected,
  LedgerEntry,
} from "../../src";
import { createClient, createRecorder } from "./utils/recordedClient";

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";

describe("Get Collections", function () {
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
    const modulus = 5;

    // we want to send 2001 messages total
    for (let i = 0; i < modulus; i++) {
      const entry: LedgerEntry = {
        contents: "add collection number " + i,
      };

      const ledgerEntry: CreateLedgerEntryParameters = {
        contentType: "application/json",
        body: entry,
        queryParameters: { collectionId: "" + i },
      };

      const postResult = await client.path("/app/transactions").post(ledgerEntry);

      if (isUnexpected(postResult)) {
        throw postResult.body;
      }
    }

    const result = await client.path("/app/collections").get();

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
