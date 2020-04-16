// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-invalid-this */

import { assert } from "chai";

import { Recorder, record, isPlaybackMode } from "@azure/test-utils-recorder";

import { createClients, environmentSetup } from "../utils/recordedClient";
import { SearchIndexClient, SearchServiceClient } from "../../src/index";
import { Hotel } from "../utils/interfaces";
import { createIndex, populateIndex } from "../utils/setupIndex";

const TEST_INDEX_NAME = "hotel-live-test";

describe("SearchIndexClient", function() {
  let recorder: Recorder;
  let indexClient: SearchIndexClient<Hotel>;
  let serviceClient: SearchServiceClient;

  this.timeout(30000);

  beforeEach(async function() {
    ({ indexClient, serviceClient } = createClients<Hotel>(TEST_INDEX_NAME));
    if (!isPlaybackMode()) {
      await createIndex(serviceClient, TEST_INDEX_NAME);
      await populateIndex(indexClient);
    }
    recorder = record(this, environmentSetup);
    // create the clients again, but hooked up to the recorder
    ({ indexClient, serviceClient } = createClients<Hotel>(TEST_INDEX_NAME));
  });

  afterEach(async function() {
    if (recorder) {
      recorder.stop();
    }
    if (!isPlaybackMode()) {
      await serviceClient.deleteIndex(TEST_INDEX_NAME);
    }
  });

  describe("#count", function() {
    it("returns the correct document count", async function() {
      const documentCount = await indexClient.countDocuments();
      assert.equal(documentCount, 10);
    });
  });
});
