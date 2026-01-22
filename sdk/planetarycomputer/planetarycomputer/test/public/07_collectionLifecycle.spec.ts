// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import { createRecorder, createRecordedClient } from "./utils/recordedClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { PlanetaryComputerProClient } from "../../src/index.js";
import { isRestError } from "@azure/core-rest-pipeline";
import { EnvironmentVariableNames, assertEnvironmentVariable } from "./utils/envVars.js";

/**
 * Test suite for STAC Collection lifecycle operations (create, update, delete).
 * Ported from Python test_planetary_computer_07_collection_lifecycle.py
 *
 * Note: These tests modify collections and should be run with caution in live mode.
 */
describe("Collection Lifecycle Operations", () => {
  let recorder: Recorder;
  let client: PlanetaryComputerProClient;
  const testCollectionId = "test-collection-lifecycle";

  beforeEach(async function (ctx) {
    recorder = await createRecorder(ctx);
    client = await createRecordedClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("test_01: Create a new STAC collection", async () => {
    console.log("=" + "=".repeat(79));
    console.log("TEST: test_01_begin_create_collection");
    console.log("=" + "=".repeat(79));

    // Check if collection exists and delete it first
    try {
      const existingCollection = await client.stac.getCollection(testCollectionId);
      if (existingCollection) {
        console.log(`Collection '${testCollectionId}' already exists, deleting first...`);
        const poller = client.stac.deleteCollection(testCollectionId);
        await poller.pollUntilDone();
        console.log(`Deleted existing collection '${testCollectionId}'`);
      }
    } catch (error: any) {
      console.log(`Collection '${testCollectionId}' does not exist, proceeding with creation`);
    }

    // Create collection payload
    const collectionData = {
      id: testCollectionId,
      description: "Test collection for lifecycle operations",
      extent: {
        spatial: { boundingBox: [[-180, -90, 180, 90]] },
        temporal: {
          interval: [[new Date("2020-01-01T00:00:00Z"), new Date("2024-12-31T23:59:59Z")]],
        },
      },
      license: "proprietary",
      links: [],
      stacVersion: "1.0.0",
      title: "Test Collection Lifecycle",
      type: "Collection" as const,
    };

    console.log("Calling: createCollection(body=collection_data)");
    const poller = client.stac.createCollection(collectionData as any);
    await poller.pollUntilDone();

    console.log("Collection created successfully");

    // Verify creation
    const createdCollection = await client.stac.getCollection(testCollectionId);
    assert.isDefined(createdCollection, "Created collection should not be undefined");
    assert.strictEqual(createdCollection.id, testCollectionId);
    assert.strictEqual(createdCollection.title, "Test Collection Lifecycle");

    console.log("Test PASSED\n");
  });

  it("test_02: Update a collection using create or replace", async () => {
    console.log("=" + "=".repeat(79));
    console.log("TEST: test_02_create_or_replace_collection");
    console.log("=" + "=".repeat(79));

    // Get existing collection
    const collection = await client.stac.getCollection(testCollectionId);

    // Update description
    const updatedCollection = {
      ...collection,
      description: "Test collection for lifecycle operations - UPDATED",
    };

    console.log(
      `Calling: createOrReplaceCollection(collection_id='${testCollectionId}', body=collection)`,
    );
    const result = await client.stac.createOrReplaceCollection(
      testCollectionId,
      updatedCollection as any,
    );

    console.log(`Collection updated: ${JSON.stringify(result)}`);

    // Verify update
    if (!isPlaybackMode()) {
      await new Promise((resolve) => setTimeout(resolve, 10000));
    }
    const retrievedCollection = await client.stac.getCollection(testCollectionId);
    assert.strictEqual(
      retrievedCollection.description,
      "Test collection for lifecycle operations - UPDATED",
    );

    console.log("Test PASSED\n");
  });

  it("test_03: Delete a STAC collection", async () => {
    console.log("=" + "=".repeat(79));
    console.log("TEST: test_03_begin_delete_collection");
    console.log("=" + "=".repeat(79));

    const deletionTestCollectionId = "test-collection-deletion";

    // First, create a collection to delete
    const collectionData = {
      id: deletionTestCollectionId,
      description: "Test collection for deletion",
      extent: {
        spatial: { boundingBox: [[-180, -90, 180, 90]] },
        temporal: {
          interval: [[new Date("2020-01-01T00:00:00Z"), new Date("2024-12-31T23:59:59Z")]],
        },
      },
      license: "proprietary",
      links: [],
      stacVersion: "1.0.0",
      title: "Test Collection to Delete",
      type: "Collection" as const,
    };

    console.log("Creating collection to be deleted...");
    const createPoller = client.stac.createCollection(collectionData as any);
    await createPoller.pollUntilDone();
    console.log("Collection created");

    // Now delete it
    console.log(`Calling: deleteCollection(collection_id='${deletionTestCollectionId}')`);
    const deletePoller = client.stac.deleteCollection(deletionTestCollectionId);
    await deletePoller.pollUntilDone();

    console.log("Delete operation completed");

    // Verify deletion - no need to wait with manual timeout since pollUntilDone() already waited
    try {
      await client.stac.getCollection(deletionTestCollectionId);
      assert.fail("Collection should have been deleted");
    } catch (error: any) {
      console.log(`Collection successfully deleted (404 expected): ${error.message}`);
      assert.isTrue(
        isRestError(error) && error.statusCode === 404,
        "Should get 404 Not Found error",
      );
    }

    console.log("Test PASSED\n");
  });

  it("test_04: Create a collection asset", async () => {
    console.log("=" + "=".repeat(79));
    console.log("TEST: test_04_create_collection_asset");
    console.log("=" + "=".repeat(79));

    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    ); // Use existing test collection

    // Delete the asset if it already exists
    try {
      console.log("Checking if asset 'test-asset' already exists and deleting if found...");
      await client.stac.deleteCollectionAsset(collectionId, "test-asset");
      console.log("Deleted existing 'test-asset'");
      if (!isPlaybackMode()) {
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for deletion to complete
      }
    } catch (error: any) {
      if (isRestError(error) && error.statusCode === 404) {
        console.log("Asset 'test-asset' does not exist, proceeding with creation");
      } else {
        console.log(`Error checking/deleting asset: ${error}`);
      }
    }

    // Create asset data
    const assetData = {
      key: "test-asset",
      href: "https://example.com/test-asset.txt",
      type: "text/plain",
      roles: ["metadata"],
      title: "Test Asset",
      description: "A test asset for collection lifecycle testing",
    };

    const fileContent = Buffer.from("Test asset content");

    console.log(`Calling: createCollectionAsset(collection_id='${collectionId}', body={{...}})`);
    const response = await client.stac.createCollectionAsset(collectionId, {
      data: assetData,
      file: {
        contents: fileContent,
        filename: "test-asset.txt",
        contentType: "text/plain",
      },
    });

    console.log(`Response: ${JSON.stringify(response)}`);
    assert.isDefined(response, "Response should not be undefined");

    console.log("Test PASSED\n");
  });

  it("test_05: Replace a collection asset", async () => {
    console.log("=" + "=".repeat(79));
    console.log("TEST: test_05_replace_collection_asset");
    console.log("=" + "=".repeat(79));

    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    ); // Use existing test collection

    const assetData = {
      key: "test-asset",
      href: "https://example.com/test-asset-updated.txt",
      type: "text/plain",
      roles: ["metadata"],
      title: "Test Asset - Updated",
      description: "An updated test asset for collection lifecycle testing",
    };

    const fileContent = Buffer.from("Test asset content - updated");

    console.log(
      `Calling: replaceCollectionAsset(collection_id='${collectionId}', asset_id='test-asset', body={{...}})`,
    );
    const response = await client.stac.replaceCollectionAsset(collectionId, "test-asset", {
      data: assetData,
      file: {
        contents: fileContent,
        filename: "test-asset-updated.txt",
        contentType: "text/plain",
      },
    });

    console.log(`Response: ${JSON.stringify(response)}`);
    assert.isDefined(response, "Response should not be undefined");

    console.log("Test PASSED\n");
  });

  it("test_06: Delete a collection asset", async () => {
    console.log("=" + "=".repeat(79));
    console.log("TEST: test_06_delete_collection_asset");
    console.log("=" + "=".repeat(79));

    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    ); // Use existing test collection

    // First create the asset to be deleted
    console.log("Creating asset for deletion: test-asset-to-be-deleted");

    const assetData = {
      key: "test-asset-to-be-deleted",
      href: "https://example.com/test-asset-to-delete.txt",
      type: "text/plain",
      roles: ["metadata"],
      title: "Test Asset To Be Deleted",
      description: "A test asset that will be deleted",
    };

    const fileContent = Buffer.from("Test asset content for deletion");

    await client.stac.createCollectionAsset(collectionId, {
      data: assetData,
      file: {
        contents: fileContent,
        filename: "test-asset-to-delete.txt",
        contentType: "text/plain",
      },
    });
    console.log("Asset created successfully");

    // Now delete it
    console.log(
      `Calling: deleteCollectionAsset(collection_id='${collectionId}', asset_id='test-asset-to-be-deleted')`,
    );
    await client.stac.deleteCollectionAsset(collectionId, "test-asset-to-be-deleted");

    console.log("Asset deleted successfully");

    // Verify deletion by checking collection assets
    const collection = await client.stac.getCollection(collectionId);
    if (collection.assets) {
      assert.notProperty(
        collection.assets,
        "test-asset-to-be-deleted",
        "Asset should have been deleted",
      );
    }

    console.log("Test PASSED\n");
  });
});
