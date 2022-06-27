// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import {
  ConfidentialLedgerClient,
    LedgerEntry,
    ListLedgerEntries200Response,
    paginate,
    PostLedgerEntry200Response,
    PostLedgerEntryParameters,
  } from "../../src";

import { createClient, createRecorder } from "./utils/recordedClient";

import { Context } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";

describe("Range query should be successful", () => {
  let recorder: Recorder;
  let client: ConfidentialLedgerClient;

  beforeEach(async function (this: Context) {
    recorder = createRecorder(this);
    client = await createClient();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  /*
  it("should post 2000 entries", async function () {
    const modulus = 5;
    // Should result in 2 pages.
    const numMessagesSent = 2001;

    // we want to send 2001 messages total
    for (let i = 0; i < numMessagesSent; i++) {
      const entry: LedgerEntry = {
        contents: "" + i,
      };

      const ledgerEntry: PostLedgerEntryParameters = {
        contentType: "application/json",
        body: entry,
        queryParameters: {collectionId: "" + (i % modulus)}
      };
      
      let result = (await client
        .path("/app/transactions")
        .post(ledgerEntry)) as PostLedgerEntry200Response;

      console.log(result);

      assert.equal(result.status, "200");
    }
  });
  */
 
  it ("should audit 2000 entries", async function () {

    const modulus = 5;
    const numMessagesSent = 2001;

    var correctEntries: string[] = [];

    for (let i = 0; i < modulus; i += 1) {
      const getLedgerEntriesParams = {queryParameters: {collectionId: "" + i}};
    // get ledger entries for each collection
      const ledgerEntries = await client.path("/app/transactions").get(getLedgerEntriesParams) as ListLedgerEntries200Response;

      var items = paginate(client, ledgerEntries).byPage();

      var index: number = 0;

      for await (var page of items) {
        const rangedArr = Array.from(Array(page.length).keys()).map(x => x + 1);
        for (index of rangedArr) {
          var entry = page[index] as LedgerEntry;
          if (entry != undefined && entry.collectionId == "" + i && parseInt(entry.collectionId) % modulus == parseInt(entry.contents)) {
            //console.log("HERE = " + entry.contents);
            correctEntries.push(entry.contents);
          }
        }
      }
    }

    console.log("HERE!!");
    console.log(correctEntries);
    correctEntries = correctEntries.filter((value, index) => correctEntries.indexOf(value) === index);
    console.log(correctEntries);
    console.log(correctEntries.length);
    assert(correctEntries.length >= 0.9 * numMessagesSent);

      //for await (var page of items) {
        // console.log(page);
        // assert that there are at least ~350 of each collection
        // contents mod 5 should be equal to the col id
        // col 0 - 0, 5, 10
        // col 1 - 1, 6, 11
        // col 2 - 2, 7, 12
        // 
      //}

        // Due to replication delay, it's possible not all messages are matched.
        // self.assertGreaterEqual(num_matched, 0.9 * num_messages_sent)
  });
});
