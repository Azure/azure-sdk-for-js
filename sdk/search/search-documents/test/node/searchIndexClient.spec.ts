// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-invalid-this */

import { assert } from "chai";

import { Recorder, record, isPlaybackMode } from "@azure/test-utils-recorder";

import { createClients, environmentSetup } from "../utils/recordedClient";
import { SearchClient, SearchIndexClient } from "../../src/index";
import { Hotel } from "../utils/interfaces";
import { createIndex, populateIndex } from "../utils/setupIndex";

const TEST_INDEX_NAME = "hotel-live-test";

describe("SearchClient", function() {
  let recorder: Recorder;
  let searchClient: SearchClient<Hotel>;
  let indexClient: SearchIndexClient;

  this.timeout(30000);

  beforeEach(async function() {
    ({ searchClient, indexClient } = createClients<Hotel>(TEST_INDEX_NAME));
    if (!isPlaybackMode()) {
      await createIndex(indexClient, TEST_INDEX_NAME);
      await populateIndex(searchClient);
    }
    recorder = record(this, environmentSetup);
    // create the clients again, but hooked up to the recorder
    ({ searchClient, indexClient } = createClients<Hotel>(TEST_INDEX_NAME));
  });

  afterEach(async function() {
    if (recorder) {
      await recorder.stop();
    }
    if (!isPlaybackMode()) {
      await indexClient.deleteIndex(TEST_INDEX_NAME);
    }
  });

  describe("#count", function() {
    it("returns the correct document count", async function() {
      const documentCount = await searchClient.getDocumentsCount();
      assert.equal(documentCount, 10);
    });
  });
});
