// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import {
  ConfidentialLedgerClient,
    //LedgerEntry,
    ListLedgerEntries200Response,
    paginate,
    //PostLedgerEntry200Response,
    //PostLedgerEntryParameters,
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
    const numMessagesSent = 2001;

    // we want to send 2001 messages total
    /*
    for (let i = 0; i < numMessagesSent; i++) {
      let message = "" + i;
      let collection = { collectionId: "" + (i % modulus) };

      const entry: LedgerEntry = {
        contents: message,
        collectionId: collection,
      };
      const ledgerEntry: PostLedgerEntryParameters = {
        contentType: "application/json",
        body: entry,
      };
      let result = (await client
        .path("/app/transactions")
        .post(ledgerEntry)) as PostLedgerEntry200Response;
    }
    */
    // get ledger entries for each collection
    const ledgerEntries = await client.path("/app/transactions").get() as ListLedgerEntries200Response;

    var items = paginate(client, ledgerEntries).byPage();

    for await (var page of items) {
      console.log(page);
    }
      
    var totalCorrectItems = 0;

    for (var i = 0; i < modulus; i++) {
      var correctMembers = Object.values(items).filter((col: any) => col.collectionId == i && typeof(col.collectionId) == typeof(3) && parseInt(col.contents) % 5 == i);
      //console.log(correctMembers);
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




    // make sure they contain the majority of correct entries

    /*
    pass 0.1-preview to test

    def range_query_actions(self, client):
        modulus = 5
        num_messages_sent = 2001  # Should result in 2 pages.

        You get a page at a time. This way, we test the fact that the pages loop.

        messages = {m: [] for m in range(modulus)}
        for i in range(num_messages_sent):
            message = "message-{0}".format(i)
            This is a random, unique message

            picks the collection it writes to
            kwargs = (
                {} if modulus == 0 else {"collection_id": "{0}".format(i % modulus)}
            )


            append_result = client.post_ledger_entry(
                {"contents": message}, **kwargs
            )

            this is what we check it against
            messages[i % modulus].append(
                (append_result["transactionId"], message, kwargs)
            )

        num_matched = 0
        for i in range(modulus):

              look at each collection, and do a query for each collection 
            query_result = client.list_ledger_entries(
                from_transaction_id=messages[i][0][0], **messages[i][0][2]
            )

            make sure each message written to the collection is what we expect
            for index, historical_entry in enumerate(query_result):
                self.assertEqual(
                    historical_entry["transactionId"], messages[i][index][0]
                )
                self.assertEqual(historical_entry["contents"], messages[i][index][1])
                collection_id = messages[i][index][2].get("collection_id", None)
                if collection_id is not None:
                    self.assertEqual(historical_entry["collectionId"], collection_id)

                num_matched += 1
                */
