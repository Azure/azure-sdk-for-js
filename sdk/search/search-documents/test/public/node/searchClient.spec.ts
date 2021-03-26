// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";
import { Suite } from "mocha";

import { Recorder, record, isPlaybackMode, isLiveMode } from "@azure/test-utils-recorder";

import { createClients, environmentSetup } from "../utils/recordedClient";
import {
  SearchClient,
  SearchIndexClient,
  AutocompleteResult,
  IndexDocumentsBatch
} from "../../../src";
import { Hotel } from "../utils/interfaces";
import { createIndex, populateIndex, WAIT_TIME, createRandomIndexName } from "../utils/setup";
import { delay } from "@azure/core-http";

const TEST_INDEX_NAME = isLiveMode() ? createRandomIndexName() : "hotel-live-test1";

describe("SearchClient", function(this: Suite) {
  let recorder: Recorder;
  let searchClient: SearchClient<Hotel>;
  let indexClient: SearchIndexClient;

  this.timeout(99999);

  beforeEach(async function(this: Context) {
    ({ searchClient, indexClient } = createClients<Hotel>(TEST_INDEX_NAME));
    if (!isPlaybackMode()) {
      await createIndex(indexClient, TEST_INDEX_NAME);
      await delay(WAIT_TIME);
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
      await delay(WAIT_TIME);
    }
  });

  it("count returns the correct document count", async function() {
    const documentCount = await searchClient.getDocumentsCount();
    assert.equal(documentCount, 10);
  });

  it("autocomplete returns the correct autocomplete result", async function() {
    const autoCompleteResult: AutocompleteResult = await searchClient.autocomplete("sec", "sg");
    assert.equal(autoCompleteResult.results.length, 1);
    assert.equal(autoCompleteResult.results[0].text, "secret");
  });

  it("autocomplete returns zero results for invalid query", async function() {
    const autoCompleteResult: AutocompleteResult = await searchClient.autocomplete("garbxyz", "sg");
    assert.isTrue(autoCompleteResult.results.length === 0);
  });

  it("search returns the correct search result", async function() {
    const searchResults = await searchClient.search("budget", {
      skip: 0,
      top: 5,
      includeTotalCount: true
    });
    assert.equal(searchResults.count, 6);
  });

  it("search returns zero results for invalid query", async function() {
    const searchResults = await searchClient.search("garbxyz", {
      skip: 0,
      top: 5,
      includeTotalCount: true
    });
    assert.equal(searchResults.count, 0);
  });

  it("suggest returns the correct suggestions", async function() {
    const suggestResult = await searchClient.suggest("WiFi", "sg");
    assert.equal(suggestResult.results.length, 1);
    assert.isTrue(
      suggestResult.results[0].text.startsWith("Save up to 50% off traditional hotels")
    );
  });

  it("suggest returns zero suggestions for invalid input", async function() {
    const suggestResult = await searchClient.suggest("garbxyz", "sg");
    assert.equal(suggestResult.results.length, 0);
  });

  it("getDocument returns the correct document result", async function() {
    const getDocumentResult = await searchClient.getDocument("8");
    assert.equal(
      getDocumentResult.description,
      "Has some road noise and is next to the very police station. Bathrooms had morel coverings."
    );
    assert.equal(
      getDocumentResult.descriptionFr,
      "Il y a du bruit de la route et se trouve à côté de la station de police. Les salles de bain avaient des revêtements de morilles."
    );
    assert.equal(getDocumentResult.hotelId, "8");
  });

  it("getDocument throws error for invalid getDocument Value", async function() {
    let errorThrown = false;
    try {
      await searchClient.getDocument("garbxyz");
    } catch (ex) {
      errorThrown = true;
    }
    assert.isTrue(errorThrown, "Expected getDocument to fail with an exception");
  });

  it("deleteDocuments delete a document by documents", async function() {
    const getDocumentResult = await searchClient.getDocument("8");
    await searchClient.deleteDocuments([getDocumentResult]);
    await delay(WAIT_TIME);
    const documentCount = await searchClient.getDocumentsCount();
    assert.equal(documentCount, 9);
  });

  it("deleteDocuments delete a document by key/keyNames", async function() {
    await searchClient.deleteDocuments("hotelId", ["9", "10"]);
    await delay(WAIT_TIME);
    const documentCount = await searchClient.getDocumentsCount();
    assert.equal(documentCount, 8);
  });

  it("mergeOrUploadDocuments modify & merge an existing document", async function() {
    let getDocumentResult = await searchClient.getDocument("6");
    getDocumentResult.description = "Modified Description";
    await searchClient.mergeOrUploadDocuments([getDocumentResult]);
    await delay(WAIT_TIME);
    getDocumentResult = await searchClient.getDocument("6");
    assert.equal(getDocumentResult.description, "Modified Description");
  });

  it("mergeOrUploadDocuments merge a new document", async function() {
    const document = {
      hotelId: "11",
      description: "New Hotel Description",
      lastRenovationDate: null
    };
    await searchClient.mergeOrUploadDocuments([document]);
    await delay(WAIT_TIME);
    const documentCount = await searchClient.getDocumentsCount();
    assert.equal(documentCount, 11);
  });

  it("mergeDocuments modify & merge an existing document", async function() {
    let getDocumentResult = await searchClient.getDocument("6");
    getDocumentResult.description = "Modified Description";
    await searchClient.mergeDocuments([getDocumentResult]);
    await delay(WAIT_TIME);
    getDocumentResult = await searchClient.getDocument("6");
    assert.equal(getDocumentResult.description, "Modified Description");
  });

  it("uploadDocuments upload a set of documents", async function() {
    const documents = [
      {
        hotelId: "11",
        description: "New Hotel Description",
        lastRenovationDate: null
      },
      {
        hotelId: "12",
        description: "New Hotel II Description",
        lastRenovationDate: null
      }
    ];
    await searchClient.uploadDocuments(documents);
    await delay(WAIT_TIME);
    const documentCount = await searchClient.getDocumentsCount();
    assert.equal(documentCount, 12);
  });

  it("indexDocuments upload a new document", async function() {
    const batch: IndexDocumentsBatch<Hotel> = new IndexDocumentsBatch<Hotel>();
    batch.upload([
      {
        hotelId: "11",
        description: "New Hotel Description",
        lastRenovationDate: null
      }
    ]);
    await searchClient.indexDocuments(batch);
    await delay(WAIT_TIME);
    const documentCount = await searchClient.getDocumentsCount();
    assert.equal(documentCount, 11);
  });

  it("indexDocuments deletes existing documents", async function() {
    const batch: IndexDocumentsBatch<Hotel> = new IndexDocumentsBatch<Hotel>();
    batch.delete([
      {
        hotelId: "9"
      },
      {
        hotelId: "10"
      }
    ]);

    await searchClient.indexDocuments(batch);
    await delay(WAIT_TIME);
    const documentCount = await searchClient.getDocumentsCount();
    assert.equal(documentCount, 8);
  });

  it("indexDocuments merges an existing document", async function() {
    const batch: IndexDocumentsBatch<Hotel> = new IndexDocumentsBatch<Hotel>();
    batch.merge([
      {
        hotelId: "8",
        description: "Modified Description"
      }
    ]);

    await searchClient.indexDocuments(batch);
    await delay(WAIT_TIME);
    const getDocumentResult = await searchClient.getDocument("8");
    assert.equal(getDocumentResult.description, "Modified Description");
  });

  it("indexDocuments merge/upload documents", async function() {
    const batch: IndexDocumentsBatch<Hotel> = new IndexDocumentsBatch<Hotel>();
    batch.mergeOrUpload([
      {
        hotelId: "8",
        description: "Modified Description"
      },
      {
        hotelId: "11",
        description: "New Hotel Description",
        lastRenovationDate: null
      }
    ]);

    await searchClient.indexDocuments(batch);
    await delay(WAIT_TIME);
    const getDocumentResult = await searchClient.getDocument("8");
    assert.equal(getDocumentResult.description, "Modified Description");
    const documentCount = await searchClient.getDocumentsCount();
    assert.equal(documentCount, 11);
  });
});
