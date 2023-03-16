// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import {
  ConfidentialLedgerClient,
  CreateLedgerEntryParameters,
  isUnexpected,
  LedgerEntry,
  paginate,
} from "../../src";

import { createClient, createRecorder } from "./utils/recordedClient";

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";

describe("Range query should be successful", function () {
  let recorder: Recorder;
  let client: ConfidentialLedgerClient;

  beforeEach(async function (this: Context) {
    recorder = createRecorder(this);
    client = await createClient();
  });

  afterEach(async function () {
    await recorder.stop();
  });
  it("should post 2000 entries", async function () {
    const modulus = 5;
    // Should result in 2 pages.
    const numMessagesSent = 2001;

    // we want to send 2001 messages total
    for (let i = 0; i < numMessagesSent; i++) {
      const entry: LedgerEntry = {
        contents: "" + i,
      };

      const ledgerEntry: CreateLedgerEntryParameters = {
        contentType: "application/json",
        body: entry,
        queryParameters: { collectionId: "" + (i % modulus) },
      };

      const result = await client.path("/app/transactions").post(ledgerEntry);

      if (isUnexpected(result)) {
        throw result.body;
      }
    }
  });

  it("should audit 2000 entries", async function () {
    const modulus = 5;
    const numMessagesSent = 2001;

    let correctEntries: string[] = [];

    for (let i = 0; i < modulus; i += 1) {
      const getLedgerEntriesParams = { queryParameters: { collectionId: "" + i } };
      // get ledger entries for each collection
      const ledgerEntries = await client.path("/app/transactions").get(getLedgerEntriesParams);

      if (isUnexpected(ledgerEntries)) {
        throw ledgerEntries.body;
      }

      const items = paginate(client, ledgerEntries).byPage();

      let index: number = 0;

      for await (const page of items) {
        const rangedArr = Array.from(Array(page.length).keys()).map((x) => x + 1);
        for (index of rangedArr) {
          const entry = page[index] as LedgerEntry;
          if (
            entry !== undefined &&
            entry.collectionId === "" + i &&
            parseInt(entry.contents) % modulus === parseInt(entry.collectionId)
          ) {
            correctEntries.push(entry.contents);
          }
        }
      }
    }

    correctEntries = correctEntries.filter(
      (value, index) => correctEntries.indexOf(value) === index
    );

    // Due to replication delay, it's possible not all messages are matched.
    assert(correctEntries.length >= 0.9 * numMessagesSent);
  });
});
