// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";
import { Suite } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";

import { createClients } from "../utils/recordedClient";
import {
  SearchClient,
  SearchIndexClient,
  AutocompleteResult,
  IndexDocumentsBatch,
  KnownSpeller,
  KnownQueryLanguage,
  AzureKeyCredential,
} from "../../../src";
import { Hotel } from "../utils/interfaces";
import { createIndex, createRandomIndexName, populateIndex, WAIT_TIME } from "../utils/setup";
import { delay, serviceVersions } from "../../../src/serviceUtils";
import { versionsToTest } from "@azure/test-utils";

versionsToTest(serviceVersions, {}, (serviceVersion, onVersions) => {
  onVersions({ minVer: "2020-06-30" }).describe("SearchClient tests", function (this: Suite) {
    let recorder: Recorder;
    let searchClient: SearchClient<Hotel>;
    let indexClient: SearchIndexClient;
    let TEST_INDEX_NAME: string;

    this.timeout(99999);

    beforeEach(async function (this: Context) {
      recorder = new Recorder(this.currentTest);
      TEST_INDEX_NAME = createRandomIndexName();
      ({
        searchClient,
        indexClient,
        indexName: TEST_INDEX_NAME,
      } = await createClients<Hotel>(serviceVersion, recorder, TEST_INDEX_NAME));
      await createIndex(indexClient, TEST_INDEX_NAME);
      await delay(WAIT_TIME);
      await populateIndex(searchClient);
    });

    afterEach(async function () {
      await indexClient.deleteIndex(TEST_INDEX_NAME);
      await delay(WAIT_TIME);
      if (recorder) {
        await recorder.stop();
      }
    });

    it("count returns the correct document count", async function () {
      const documentCount = await searchClient.getDocumentsCount();
      assert.equal(documentCount, 10);
    });

    it("autocomplete returns the correct autocomplete result", async function () {
      const autoCompleteResult: AutocompleteResult = await searchClient.autocomplete("sec", "sg");
      assert.equal(autoCompleteResult.results.length, 1);
      assert.equal(autoCompleteResult.results[0].text, "secret");
    });

    it("autocomplete returns zero results for invalid query", async function () {
      const autoCompleteResult: AutocompleteResult = await searchClient.autocomplete(
        "garbxyz",
        "sg"
      );
      assert.isTrue(autoCompleteResult.results.length === 0);
    });

    it("search returns the correct search result", async function () {
      const searchResults = await searchClient.search("budget", {
        skip: 0,
        top: 5,
        includeTotalCount: true,
      });
      assert.equal(searchResults.count, 6);
    });

    it("search returns zero results for invalid query", async function () {
      const searchResults = await searchClient.search("garbxyz", {
        skip: 0,
        top: 5,
        includeTotalCount: true,
      });
      assert.equal(searchResults.count, 0);
    });

    it("suggest returns the correct suggestions", async function () {
      const suggestResult = await searchClient.suggest("WiFi", "sg");
      assert.equal(suggestResult.results.length, 1);
      assert.isTrue(
        suggestResult.results[0].text.startsWith("Save up to 50% off traditional hotels")
      );
    });

    it("suggest returns zero suggestions for invalid input", async function () {
      const suggestResult = await searchClient.suggest("garbxyz", "sg");
      assert.equal(suggestResult.results.length, 0);
    });

    it("getDocument returns the correct document result", async function () {
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

    it("getDocument throws error for invalid getDocument Value", async function () {
      let errorThrown = false;
      try {
        await searchClient.getDocument("garbxyz");
      } catch (ex: any) {
        errorThrown = true;
      }
      assert.isTrue(errorThrown, "Expected getDocument to fail with an exception");
    });

    it("deleteDocuments delete a document by documents", async function () {
      const getDocumentResult = await searchClient.getDocument("8");
      await searchClient.deleteDocuments([getDocumentResult]);
      await delay(WAIT_TIME);
      const documentCount = await searchClient.getDocumentsCount();
      assert.equal(documentCount, 9);
    });

    it("deleteDocuments delete a document by key/keyNames", async function () {
      await searchClient.deleteDocuments("hotelId", ["9", "10"]);
      await delay(WAIT_TIME);
      const documentCount = await searchClient.getDocumentsCount();
      assert.equal(documentCount, 8);
    });

    it("mergeOrUploadDocuments modify & merge an existing document", async function () {
      let getDocumentResult = await searchClient.getDocument("6");
      getDocumentResult.description = "Modified Description";
      await searchClient.mergeOrUploadDocuments([getDocumentResult]);
      await delay(WAIT_TIME);
      getDocumentResult = await searchClient.getDocument("6");
      assert.equal(getDocumentResult.description, "Modified Description");
    });

    it("mergeOrUploadDocuments merge a new document", async function () {
      const document = {
        hotelId: "11",
        description: "New Hotel Description",
        lastRenovationDate: null,
      };
      await searchClient.mergeOrUploadDocuments([document]);
      await delay(WAIT_TIME);
      const documentCount = await searchClient.getDocumentsCount();
      assert.equal(documentCount, 11);
    });

    it("mergeDocuments modify & merge an existing document", async function () {
      let getDocumentResult = await searchClient.getDocument("6");
      getDocumentResult.description = "Modified Description";
      await searchClient.mergeDocuments([getDocumentResult]);
      await delay(WAIT_TIME);
      getDocumentResult = await searchClient.getDocument("6");
      assert.equal(getDocumentResult.description, "Modified Description");
    });

    it("uploadDocuments upload a set of documents", async function () {
      const documents = [
        {
          hotelId: "11",
          description: "New Hotel Description",
          lastRenovationDate: null,
        },
        {
          hotelId: "12",
          description: "New Hotel II Description",
          lastRenovationDate: null,
        },
      ];
      await searchClient.uploadDocuments(documents);
      await delay(WAIT_TIME);
      const documentCount = await searchClient.getDocumentsCount();
      assert.equal(documentCount, 12);
    });

    it("indexDocuments upload a new document", async function () {
      const batch: IndexDocumentsBatch<Hotel> = new IndexDocumentsBatch<Hotel>();
      batch.upload([
        {
          hotelId: "11",
          description: "New Hotel Description",
          lastRenovationDate: null,
        },
      ]);
      await searchClient.indexDocuments(batch);
      await delay(WAIT_TIME);
      const documentCount = await searchClient.getDocumentsCount();
      assert.equal(documentCount, 11);
    });

    it("indexDocuments deletes existing documents", async function () {
      const batch: IndexDocumentsBatch<Hotel> = new IndexDocumentsBatch<Hotel>();
      batch.delete([
        {
          hotelId: "9",
        },
        {
          hotelId: "10",
        },
      ]);

      await searchClient.indexDocuments(batch);
      await delay(WAIT_TIME);
      const documentCount = await searchClient.getDocumentsCount();
      assert.equal(documentCount, 8);
    });

    it("indexDocuments merges an existing document", async function () {
      const batch: IndexDocumentsBatch<Hotel> = new IndexDocumentsBatch<Hotel>();
      batch.merge([
        {
          hotelId: "8",
          description: "Modified Description",
        },
      ]);

      await searchClient.indexDocuments(batch);
      await delay(WAIT_TIME);
      const getDocumentResult = await searchClient.getDocument("8");
      assert.equal(getDocumentResult.description, "Modified Description");
    });

    it("indexDocuments merge/upload documents", async function () {
      const batch: IndexDocumentsBatch<Hotel> = new IndexDocumentsBatch<Hotel>();
      batch.mergeOrUpload([
        {
          hotelId: "8",
          description: "Modified Description",
        },
        {
          hotelId: "11",
          description: "New Hotel Description",
          lastRenovationDate: null,
        },
      ]);

      await searchClient.indexDocuments(batch);
      await delay(WAIT_TIME);
      const getDocumentResult = await searchClient.getDocument("8");
      assert.equal(getDocumentResult.description, "Modified Description");
      const documentCount = await searchClient.getDocumentsCount();
      assert.equal(documentCount, 11);
    });

    // Fails in CI because the CI search service was created on or before 2019
    // which does not have search 'speller' feature. Will resolve the
    // resource issue and then add this test back.
    it.skip("search with speller", async function () {
      const searchResults = await searchClient.search("budjet", {
        skip: 0,
        top: 5,
        includeTotalCount: true,
        queryLanguage: KnownQueryLanguage.EnUs,
        speller: KnownSpeller.Lexicon,
      });
      assert.equal(searchResults.count, 6);
    });

    // Currently semantic search is available only with
    // certain subscriptions and could not be tested in CI.
    // So, skipping this test for now.
    it.skip("search with semantic ranking", async function () {
      const searchResults = await searchClient.search("luxury", {
        skip: 0,
        top: 5,
        includeTotalCount: true,
        queryLanguage: KnownQueryLanguage.EnUs,
        queryType: "semantic",
      });
      assert.equal(searchResults.count, 1);
    });
  });
});

versionsToTest(serviceVersions, {}, (serviceVersion, onVersions) => {
  onVersions({ minVer: "2020-06-30" }).describe("SearchClient tests", function (this: Suite) {
    const credential = new AzureKeyCredential("key");

    describe("Passing serviceVersion", () => {
      it("supports passing serviceVersion", () => {
        const client = new SearchClient<Hotel>("", "", credential, {
          serviceVersion,
        });
        assert.equal(serviceVersion, client.serviceVersion);
        assert.equal(serviceVersion, client.apiVersion);
      });

      it("passing invalid apiVersion type and valid serviceVersion", () => {
        let errorThrown = false;
        try {
          new SearchClient<Hotel>("", "", credential, {
            serviceVersion,
            apiVersion: "foo",
          });
        } catch (ex: any) {
          errorThrown = true;
        }
        assert.isTrue(errorThrown, "Invalid apiVersion");
      });

      it("passing invalid serviceVersion type and valid apiVersion", () => {
        let errorThrown = false;
        try {
          new SearchClient<Hotel>("", "", credential, {
            apiVersion: serviceVersion,
            serviceVersion: "foo",
          });
        } catch (ex: any) {
          errorThrown = true;
        }
        assert.isTrue(errorThrown, "Invalid serviceVersion");
      });

      it("supports passing the deprecated apiVersion", () => {
        const client = new SearchClient<Hotel>("", "", credential, {
          apiVersion: serviceVersion,
        });
        assert.equal(serviceVersion, client.serviceVersion);
        assert.equal(serviceVersion, client.apiVersion);
      });

      it("defaults to the current apiVersion", () => {
        const client = new SearchClient<Hotel>("", "", credential);
        assert.equal("2021-04-30-Preview", client.serviceVersion);
        assert.equal("2021-04-30-Preview", client.apiVersion);
      });
    });
  });
});
