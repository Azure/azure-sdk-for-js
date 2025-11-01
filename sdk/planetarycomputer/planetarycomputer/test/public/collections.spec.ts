// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { createRecorder, createRecordedClient } from "./utils/recordedClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { PlanetaryComputerProClient } from "../../src/index.js";
import { EnvironmentVariableNames, assertEnvironmentVariable } from "./utils/envVars.js";

describe("STAC Collections", () => {
  let recorder: Recorder;
  let client: PlanetaryComputerProClient;

  beforeEach(async function (ctx) {
    recorder = await createRecorder(ctx);
    client = createRecordedClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("test_01_list_collections - should list all STAC collections", async function () {
    const endpoint = assertEnvironmentVariable(EnvironmentVariableNames.PLANETARYCOMPUTER_ENDPOINT);

    console.log("=".repeat(80));
    console.log("TEST: test_01_list_collections");
    console.log("=".repeat(80));
    console.log(`Input - endpoint: ${endpoint}`);

    console.log("Calling: listCollections()");
    const response = await client.stac.listCollections();

    console.log(`Response type: ${typeof response}`);

    // Validate response structure
    assert.isDefined(response, "Response should not be None");
    assert.property(response, "collections", "Response should have 'collections' attribute");

    const collections = response.collections;
    assert.isArray(collections, `Collections should be a list, got ${typeof collections}`);

    console.log(`Number of collections: ${collections.length}`);

    if (collections.length > 0) {
      const firstCollection = collections[0];
      console.log(`First collection ID: ${firstCollection.id}`);
      console.log(`First collection title: ${firstCollection.title || "N/A"}`);
    }

    console.log("Test PASSED\n");
  });

  it("should get a specific collection", async function () {
    // First, list collections to get a valid collection ID
    const listResult = await client.stac.listCollections();
    assert.isTrue(
      listResult.collections.length > 0,
      "There should be at least one collection for this test",
    );

    const collectionId = listResult.collections[0].id;

    // Get the specific collection
    const collection = await client.stac.getCollection(collectionId);

    // Verify the response
    assert.isDefined(collection, "Collection should be defined");
    assert.equal(collection.id, collectionId, "Collection ID should match");
    assert.equal(collection.type, "Collection", "Type should be 'Collection'");
    assert.isDefined(collection.stacVersion, "Collection should have stacVersion");
    assert.isDefined(collection.description, "Collection should have a description");
    assert.isDefined(collection.extent, "Collection should have an extent");
    assert.isDefined(collection.extent.spatial, "Collection should have spatial extent");
    assert.isDefined(collection.extent.temporal, "Collection should have temporal extent");
  });
});
