// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-invalid-this */

import { assert } from "chai";

import { Recorder, record, isPlaybackMode } from "@azure/test-utils-recorder";

import { createClients, environmentSetup } from "../utils/recordedClient";
import {
  SearchClient,
  SearchIndexClient,
  AutocompleteResult,
  IndexDocumentsBatch
} from "../../src/index";
import { Hotel } from "../utils/interfaces";
import { createIndex, populateIndex } from "../utils/setupIndex";
import { delay } from "@azure/core-http";

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

  describe("#autocomplete", function() {
    it("returns the correct autocomplete result", async function() {
      const autoCompleteResult: AutocompleteResult = await searchClient.autocomplete("sec", "sg");
      assert.equal(autoCompleteResult.results.length, 1);
      assert.equal(autoCompleteResult.results[0].text, "secret");
    });

    it("returns zero results for invalid query", async function() {
      const autoCompleteResult: AutocompleteResult = await searchClient.autocomplete(
        "garbxyz",
        "sg"
      );
      assert.equal(autoCompleteResult.results.length == 0, true);
    });
  });

  describe("#search", function() {
    it("returns the correct search result", async function() {
      const options: any = {
        skip: 0,
        top: 5,
        includeTotalCount: true
      };
      const searchResults = await searchClient.search("budget", options);
      assert.equal(searchResults.count, 6);
    });

    it("returns zero results for invalid query", async function() {
      const options: any = {
        skip: 0,
        top: 5,
        includeTotalCount: true
      };
      const searchResults = await searchClient.search("garbxyz", options);
      assert.equal(searchResults.count, 0);
    });
  });

  describe("#suggest", function() {
    it("returns the correct suggestions", async function() {
      const suggestResult = await searchClient.suggest("wifi", "sg");
      assert.equal(suggestResult.results.length, 1);
      assert.equal(
        suggestResult.results[0].text.startsWith("Save up to 50% off traditional hotels"),
        true
      );
    });

    it("returns zero suggestions for invalid input", async function() {
      const suggestResult = await searchClient.suggest("garbxyz", "sg");
      assert.equal(suggestResult.results.length, 0);
    });
  });

  describe("#getDocument", function() {
    it("returns the correct document result", async function() {
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

    it("throws error for invalid getDocument Value", async function() {
      let errorThrown = false;
      try {
         await searchClient.getDocument("garbxyz");
      } catch (ex) {
        errorThrown = true;
      }
      assert.equal(errorThrown, true, "Expected getDocument to fail with an exception");
    });
  });

  describe("#deleteDocuments", function() {
    it("delete a document by documents", async function() {
      const getDocumentResult = await searchClient.getDocument("8");
      await searchClient.deleteDocuments([getDocumentResult]);
      await delay(2000);
      const documentCount = await searchClient.getDocumentsCount();
      assert.equal(documentCount, 9);
    });

    it("delete a document by key/keyNames", async function() {
      await searchClient.deleteDocuments("hotelId", ["9", "10"]);
      await delay(2000);
      const documentCount = await searchClient.getDocumentsCount();
      assert.equal(documentCount, 8);
    });
  });

  describe("#mergeOrUploadDocuments", function() {
    it("modify & merge an existing document", async function() {
      let getDocumentResult = await searchClient.getDocument("6");
      getDocumentResult.description = "Modified Description";
      await searchClient.mergeOrUploadDocuments([getDocumentResult]);
      await delay(2000);
      getDocumentResult = await searchClient.getDocument("6");
      assert.equal(getDocumentResult.description, "Modified Description");
    });

    it("merge a new document", async function() {
      const document = {
        hotelId: "11",
        description: "New Hotel Description",
        lastRenovationDate: null
      };
      await searchClient.mergeOrUploadDocuments([document]);
      await delay(2000);
      const documentCount = await searchClient.getDocumentsCount();
      assert.equal(documentCount, 11);
    });
  });

  describe("#mergeDocuments", function() {
    it("modify & merge an existing document", async function() {
      let getDocumentResult = await searchClient.getDocument("6");
      getDocumentResult.description = "Modified Description";
      await searchClient.mergeDocuments([getDocumentResult]);
      await delay(2000);
      getDocumentResult = await searchClient.getDocument("6");
      assert.equal(getDocumentResult.description, "Modified Description");
    });
  });

  describe("#uploadDocuments", function() {
    it("upload a set of documents", async function() {
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
      await delay(2000);
      const documentCount = await searchClient.getDocumentsCount();
      assert.equal(documentCount, 12);
    });
  });

  describe("#indexDocuments", function() {
    it("upload a new document", async function() {
      const batch: IndexDocumentsBatch<Hotel> = new IndexDocumentsBatch<Hotel>([
        {
          __actionType: "upload",
          hotelId: "11",
          description: "New Hotel Description",
          lastRenovationDate: null
        }
      ]);
      await searchClient.indexDocuments(batch);
      await delay(2000);
      const documentCount = await searchClient.getDocumentsCount();
      assert.equal(documentCount, 11);
    });

    it("deletes existing documents", async function() {
      const batch: IndexDocumentsBatch<Hotel> = new IndexDocumentsBatch<Hotel>([
        {
          __actionType: "delete",
          hotelId: "9"
        },
        {
          __actionType: "delete",
          hotelId: "10"
        }
      ]);

      await searchClient.indexDocuments(batch);
      await delay(2000);
      const documentCount = await searchClient.getDocumentsCount();
      assert.equal(documentCount, 8);
    });

    it("merges an existing document", async function() {
      const batch: IndexDocumentsBatch<Hotel> = new IndexDocumentsBatch<Hotel>([
        {
          __actionType: "merge",
          hotelId: "8",
          description: "Modified Description"
        }
      ]);

      await searchClient.indexDocuments(batch);
      await delay(2000);
      const getDocumentResult = await searchClient.getDocument("8");
      assert.equal(getDocumentResult.description, "Modified Description");
    });

    it("merge/upload documents", async function() {
      const batch: IndexDocumentsBatch<Hotel> = new IndexDocumentsBatch<Hotel>([
        {
          __actionType: "mergeOrUpload",
          hotelId: "8",
          description: "Modified Description"
        },
        {
          __actionType: "mergeOrUpload",
          hotelId: "11",
          description: "New Hotel Description",
          lastRenovationDate: null
        }
      ]);

      await searchClient.indexDocuments(batch);
      await delay(2000);
      const getDocumentResult = await searchClient.getDocument("8");
      assert.equal(getDocumentResult.description, "Modified Description");
      const documentCount = await searchClient.getDocumentsCount();
      assert.equal(documentCount, 11);
    });
  });
});
