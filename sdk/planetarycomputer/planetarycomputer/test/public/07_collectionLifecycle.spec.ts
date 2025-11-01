// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import { createRecorder, createRecordedClient } from "./utils/recordedClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { PlanetaryComputerProClient } from "../../src/index.js";

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
        await client.stac.deleteCollection(testCollectionId);
        console.log(`Deleted existing collection '${testCollectionId}'`);
        // Wait for deletion to complete in live mode
        if (!isPlaybackMode()) {
          await new Promise((resolve) => setTimeout(resolve, 30000));
        }
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
    const result = await client.stac.createCollection(collectionData as any);

    console.log(`Collection created: ${JSON.stringify(result)}`);

    // Verify creation
    if (!isPlaybackMode()) {
      await new Promise((resolve) => setTimeout(resolve, 15000)); // Wait for collection to be available
    }
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

    console.log(`Calling: deleteCollection(collection_id='${testCollectionId}')`);
    await client.stac.deleteCollection(testCollectionId);

    console.log("Delete operation completed");

    // Verify deletion
    if (!isPlaybackMode()) {
      await new Promise((resolve) => setTimeout(resolve, 30000));
    }

    try {
      await client.stac.getCollection(testCollectionId);
      assert.fail("Collection should have been deleted");
    } catch (error: any) {
      console.log(`Collection successfully deleted (404 expected): ${error.message}`);
      const errorMsg = error.message || error.toString();
      assert.isTrue(
        errorMsg.includes("404") ||
          errorMsg.includes("Not Found") ||
          errorMsg.includes("ResourceNotFound"),
        "Should get 404/Not Found error",
      );
    }

    console.log("Test PASSED\n");
  });

  it("test_04: Create a collection asset", async () => {
    console.log("=" + "=".repeat(79));
    console.log("TEST: test_04_create_collection_asset");
    console.log("=" + "=".repeat(79));

    const collectionId = "naip-atl"; // Use existing test collection

    // Delete the asset if it already exists
    try {
      console.log("Checking if asset 'test-asset' already exists and deleting if found...");
      await client.stac.deleteCollectionAsset(collectionId, "test-asset");
      console.log("Deleted existing 'test-asset'");
      if (!isPlaybackMode()) {
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for deletion to complete
      }
    } catch (error: any) {
      const errorMsg = error.message || error.toString();
      if (errorMsg.includes("404") || errorMsg.toLowerCase().includes("not found")) {
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
    };

    const fileContent = Buffer.from("Test asset content");

    console.log(`Calling: createCollectionAsset(collection_id='${collectionId}', body={{...}})`);
    const response = await client.stac.createCollectionAsset(collectionId, {
      data: assetData,
      file: fileContent,
    } as any);

    console.log(`Response: ${JSON.stringify(response)}`);
    assert.isDefined(response, "Response should not be undefined");

    console.log("Test PASSED\n");
  });

  it("test_05: Replace a collection asset", async () => {
    console.log("=" + "=".repeat(79));
    console.log("TEST: test_05_replace_collection_asset");
    console.log("=" + "=".repeat(79));

    const collectionId = "naip-atl"; // Use existing test collection

    const assetData = {
      key: "test-asset",
      href: "https://example.com/test-asset-updated.txt",
      type: "text/plain",
      roles: ["metadata"],
      title: "Test Asset - Updated",
    };

    const fileContent = Buffer.from("Test asset content - updated");

    console.log(
      `Calling: replaceCollectionAsset(collection_id='${collectionId}', asset_id='test-asset', body={{...}})`,
    );
    const response = await client.stac.replaceCollectionAsset(collectionId, "test-asset", {
      data: assetData,
      file: fileContent,
    } as any);

    console.log(`Response: ${JSON.stringify(response)}`);
    assert.isDefined(response, "Response should not be undefined");

    console.log("Test PASSED\n");
  });

  it("test_06: Delete a collection asset", async () => {
    console.log("=" + "=".repeat(79));
    console.log("TEST: test_06_delete_collection_asset");
    console.log("=" + "=".repeat(79));

    const collectionId = "naip-atl"; // Use existing test collection

    // First create the asset to be deleted
    console.log("Creating asset for deletion: test-asset-to-be-deleted");

    const assetData = {
      key: "test-asset-to-be-deleted",
      href: "https://example.com/test-asset-to-delete.txt",
      type: "text/plain",
      roles: ["metadata"],
      title: "Test Asset To Be Deleted",
    };

    const fileContent = Buffer.from("Test asset content for deletion");

    await client.stac.createCollectionAsset(collectionId, {
      data: assetData,
      file: fileContent,
    } as any);
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
