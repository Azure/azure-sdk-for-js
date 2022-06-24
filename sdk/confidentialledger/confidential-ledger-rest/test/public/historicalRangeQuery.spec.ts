// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import {
  ConfidentialLedgerClient,
    LedgerEntry,
    ListLedgerEntries200Response,
    paginate,
    PostLedgerEntry200Response,
    //PostLedgerEntry200Response,
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

  it("should list entries", async function () {
    const modulus = 5;
    // Should result in 2 pages.
    // const numMessagesSent = 2001;
    const numMessagesSent = 3;

    // we want to send 2001 messages total
    for (let i = 0; i < numMessagesSent; i++) {
      let message = "" + i;

      const entry: LedgerEntry = {
        contents: message,
        collectionId: "" + (i % modulus),
      };

      const ledgerEntry: PostLedgerEntryParameters = {
        contentType: "application/json",
        body: entry,
      };
      
      let result = (await client
        .path("/app/transactions")
        .post(ledgerEntry)) as PostLedgerEntry200Response;

      result = result;
    }

    // get ledger entries for each collection
    const ledgerEntries = await client.path("/app/transactions").get() as ListLedgerEntries200Response;

    //console.log(ledgerEntries);

    var items = paginate(client, ledgerEntries).byPage();

    var pages: LedgerEntry[] = [];

    var index: number = 0;

    const rangedArr = Array.from(Array(5).keys()).map(x => x + 1);

    for await (var page of items) {
      console.log(page[0]);
      for (index of rangedArr) {
        pages.push(page[index]);
      }
    }

    pages = pages.filter((entry): entry is LedgerEntry => Boolean(entry));
    console.log(pages);
    
    var totalCorrectItems = 0;
  
    for (var i = 0; i < modulus; i++) {
      var firstTest = Object.values(items).filter((col: any) => col.collectionId == "subledger" + i);
      console.log("First test:");
      console.log(firstTest);

      var correctMembers = Object.values(items).filter((col: any) => col.collectionId == "" + i && typeof(parseInt(col.contents)) == typeof(3) && parseInt(col.contents) % 5 == i);
      console.log(correctMembers);
      totalCorrectItems += correctMembers.length;
      console.log(totalCorrectItems);
    }
    
    assert(totalCorrectItems >= 0.9 * numMessagesSent);

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
