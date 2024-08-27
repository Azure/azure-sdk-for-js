// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  ConfidentialLedgerClient,
  CreateLedgerEntryParameters,
  isUnexpected,
  LedgerEntry,
} from "../../src";
import { createClient, createRecorder, getRecorderUniqueVariable } from "./utils/recordedClient";

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";

describe("Get Collections", function () {
  let recorder: Recorder;
  let client: ConfidentialLedgerClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = await createClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should list collections created by entries", async function () {
    const knownCollections: string[] = [];
    for (let i = 0; i < 5; i++) {
      const collectionId = getRecorderUniqueVariable(recorder, `collection${i}`);
      knownCollections.push(collectionId);
      const entry: LedgerEntry = {
        contents: `entry for collection ${i}`,
      };

      const ledgerEntry: CreateLedgerEntryParameters = {
        contentType: "application/json",
        body: entry,
        queryParameters: { collectionId },
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

    const collections = result.body.collections.map((item) => item.collectionId);

    assert.includeMembers(collections, knownCollections);
  });
});
