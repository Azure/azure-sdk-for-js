// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { createRecorder, createRecordedClient } from "./utils/recordedClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { PlanetaryComputerProClient } from "../../src/index.js";
import { EnvironmentVariableNames, assertEnvironmentVariable } from "./utils/envVars.js";
import { isRestError } from "@azure/core-rest-pipeline";
import {
  KnownPartitionTypeScheme,
  KnownRenderOptionType,
  KnownStacQueryableDefinitionDataType,
} from "../../src/index.js";
import type {
  RenderOption,
  StacMosaic,
  StacQueryable,
  PartitionType,
  TileSettings,
  StacExtensionSpatialExtent,
  StacCollectionTemporalExtent,
  StacExtensionExtent,
  StacCollection,
} from "../../src/index.js";

/**
 * Test suite for STAC Collection operations.
 * Ported from Python test_planetary_computer_00_stac_collection.py
 */
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

  it("test_02_get_conformance_class - should get STAC conformance classes", async function () {
    const endpoint = assertEnvironmentVariable(EnvironmentVariableNames.PLANETARYCOMPUTER_ENDPOINT);

    console.log("=".repeat(80));
    console.log("TEST: test_02_get_conformance_class");
    console.log("=".repeat(80));
    console.log(`Input - endpoint: ${endpoint}`);

    console.log("Calling: getConformanceClass()");
    const response = await client.stac.getConformanceClass();

    console.log(`Response type: ${typeof response}`);

    // Validate response structure
    assert.isDefined(response, "Response should not be None");
    assert.property(response, "conformsTo", "Response should have 'conformsTo' attribute");

    const conformsTo = response.conformsTo;
    assert.isArray(conformsTo, `conformsTo should be a list, got ${typeof conformsTo}`);
    assert.isTrue(conformsTo.length > 0, "Should have at least one conformance class");

    console.log(`Number of conformance classes: ${conformsTo.length}`);
    for (let i = 0; i < Math.min(5, conformsTo.length); i++) {
      console.log(`  ${i + 1}. ${conformsTo[i]}`);
    }

    console.log("Test PASSED\n");
  });

  it("test_03_get_collection - should get a specific STAC collection", async function () {
    const endpoint = assertEnvironmentVariable(EnvironmentVariableNames.PLANETARYCOMPUTER_ENDPOINT);
    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );

    console.log("=".repeat(80));
    console.log("TEST: test_03_get_collection");
    console.log("=".repeat(80));
    console.log(`Input - endpoint: ${endpoint}`);
    console.log(`Input - collection_id: ${collectionId}`);

    console.log(`Calling: getCollection(collectionId='${collectionId}')`);
    const response = await client.stac.getCollection(collectionId);

    console.log(`Response type: ${typeof response}`);
    console.log(`Collection ID: ${response.id}`);
    console.log(`Collection Title: ${response.title}`);
    console.log(`Collection Description: ${response.description?.substring(0, 100)}...`);

    // Validate response structure
    assert.isDefined(response, "Response should not be None");
    assert.equal(response.id, collectionId, "Collection ID should match requested ID");
    assert.isDefined(response.title, "Collection should have a title");
    assert.isTrue(response.title!.length > 0, "Collection title should not be empty");
    assert.isDefined(response.description, "Collection should have a description");
    assert.isDefined(response.extent, "Collection should have extent");
    assert.isDefined(response.license, "Collection should have license");

    console.log("Test PASSED\n");
  });

  it("test_04_get_partition_type - should get partition type for a collection", async function () {
    const endpoint = assertEnvironmentVariable(EnvironmentVariableNames.PLANETARYCOMPUTER_ENDPOINT);
    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );

    console.log("=".repeat(80));
    console.log("TEST: test_04_get_partition_type");
    console.log("=".repeat(80));
    console.log(`Input - endpoint: ${endpoint}`);
    console.log(`Input - collection_id: ${collectionId}`);

    console.log(`Calling: getPartitionType(collectionId='${collectionId}')`);
    const response = await client.stac.getPartitionType(collectionId);

    console.log(`Response type: ${typeof response}`);
    console.log(`Partition scheme: ${response.scheme}`);

    // Validate response structure
    assert.isDefined(response, "Response should not be None");
    assert.property(response, "scheme", "Response should have 'scheme' attribute");
    assert.isDefined(response.scheme, "Partition scheme should not be None");

    // Validate scheme is a valid PartitionTypeScheme
    const validSchemes = Object.values(KnownPartitionTypeScheme);
    assert.include(
      validSchemes,
      response.scheme,
      `Partition scheme should be one of ${validSchemes}`,
    );

    console.log("Test PASSED\n");
  });

  it("test_05_list_render_options - should list render options for a collection", async function () {
    const endpoint = assertEnvironmentVariable(EnvironmentVariableNames.PLANETARYCOMPUTER_ENDPOINT);
    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );

    console.log("=".repeat(80));
    console.log("TEST: test_05_list_render_options");
    console.log("=".repeat(80));
    console.log(`Input - endpoint: ${endpoint}`);
    console.log(`Input - collection_id: ${collectionId}`);

    console.log(`Calling: listRenderOptions(collectionId='${collectionId}')`);
    const response = await client.stac.listRenderOptions(collectionId);

    console.log(`Response type: ${typeof response}`);
    console.log(`Number of render options: ${response.length}`);

    // Validate response structure
    assert.isArray(response, `Response should be a list, got ${typeof response}`);

    if (response.length > 0) {
      const firstOption = response[0];
      console.log(`First render option ID: ${firstOption.id}`);
      console.log(`First render option name: ${firstOption.name}`);
      console.log(`First render option type: ${firstOption.type}`);

      assert.property(firstOption, "id", "Render option should have 'id'");
      assert.property(firstOption, "name", "Render option should have 'name'");
      assert.property(firstOption, "type", "Render option should have 'type'");
    }

    console.log("Test PASSED\n");
  });

  it("test_06_get_tile_settings - should get tile settings for a collection", async function () {
    const endpoint = assertEnvironmentVariable(EnvironmentVariableNames.PLANETARYCOMPUTER_ENDPOINT);
    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );

    console.log("=".repeat(80));
    console.log("TEST: test_06_get_tile_settings");
    console.log("=".repeat(80));
    console.log(`Input - endpoint: ${endpoint}`);
    console.log(`Input - collection_id: ${collectionId}`);

    console.log(`Calling: getTileSettings(collectionId='${collectionId}')`);
    const response = await client.stac.getTileSettings(collectionId);

    console.log(`Response type: ${typeof response}`);

    // Validate response structure
    assert.isDefined(response, "Response should not be None");

    // Log available attributes
    if ("maxItemsPerTile" in response) {
      console.log(`Max items per tile: ${response.maxItemsPerTile}`);
    }
    if ("minZoom" in response) {
      console.log(`Min zoom: ${response.minZoom}`);
    }
    if ("defaultLocation" in response) {
      console.log(`Default location: ${response.defaultLocation}`);
    }

    console.log("Test PASSED\n");
  });

  it("test_07_list_mosaics - should list mosaics for a collection", async function () {
    const endpoint = assertEnvironmentVariable(EnvironmentVariableNames.PLANETARYCOMPUTER_ENDPOINT);
    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );

    console.log("=".repeat(80));
    console.log("TEST: test_07_list_mosaics");
    console.log("=".repeat(80));
    console.log(`Input - endpoint: ${endpoint}`);
    console.log(`Input - collection_id: ${collectionId}`);

    console.log(`Calling: listMosaics(collectionId='${collectionId}')`);
    const response = await client.stac.listMosaics(collectionId);

    console.log(`Response type: ${typeof response}`);
    console.log(`Number of mosaics: ${response.length}`);

    // Validate response structure
    assert.isArray(response, `Response should be a list, got ${typeof response}`);

    if (response.length > 0) {
      const firstMosaic = response[0];
      console.log(`First mosaic ID: ${firstMosaic.id}`);
      console.log(`First mosaic name: ${firstMosaic.name}`);

      assert.property(firstMosaic, "id", "Mosaic should have 'id'");
      assert.property(firstMosaic, "name", "Mosaic should have 'name'");
    }

    console.log("Test PASSED\n");
  });

  it("test_08_get_collection_queryables - should get queryables for a collection", async function () {
    const endpoint = assertEnvironmentVariable(EnvironmentVariableNames.PLANETARYCOMPUTER_ENDPOINT);
    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );

    console.log("=".repeat(80));
    console.log("TEST: test_08_get_collection_queryables");
    console.log("=".repeat(80));
    console.log(`Input - endpoint: ${endpoint}`);
    console.log(`Input - collection_id: ${collectionId}`);

    console.log(`Calling: getCollectionQueryables(collectionId='${collectionId}')`);
    const response = await client.stac.getCollectionQueryables(collectionId);

    console.log(`Response type: ${typeof response}`);
    console.log(
      `Response keys: ${typeof response === "object" && response !== null ? Object.keys(response).join(", ") : "N/A"}`,
    );

    // Validate response structure
    assert.isObject(response, `Response should be a dict, got ${typeof response}`);
    assert.property(response, "properties", "Response should have 'properties' key");

    const properties = (response as Record<string, unknown>).properties as Record<string, unknown>;
    console.log(`Number of queryables: ${Object.keys(properties).length}`);

    if (Object.keys(properties).length > 0) {
      // Log first few queryables
      const entries = Object.entries(properties).slice(0, 5);
      entries.forEach(([key], i) => {
        console.log(`  Queryable ${i + 1}: ${key}`);
      });
    }

    console.log("Test PASSED\n");
  });

  it("test_09_list_queryables - should list all queryables (global)", async function () {
    const endpoint = assertEnvironmentVariable(EnvironmentVariableNames.PLANETARYCOMPUTER_ENDPOINT);

    console.log("=".repeat(80));
    console.log("TEST: test_09_list_queryables");
    console.log("=".repeat(80));
    console.log(`Input - endpoint: ${endpoint}`);

    console.log("Calling: listQueryables()");
    const response = await client.stac.listQueryables();

    console.log(`Response type: ${typeof response}`);
    console.log(
      `Response keys: ${typeof response === "object" && response !== null ? Object.keys(response).join(", ") : "N/A"}`,
    );

    // Validate response structure
    assert.isObject(response, `Response should be a dict, got ${typeof response}`);
    assert.property(response, "properties", "Response should have 'properties' key");

    const properties = (response as Record<string, unknown>).properties as Record<string, unknown>;
    console.log(`Number of global queryables: ${Object.keys(properties).length}`);

    console.log("Test PASSED\n");
  });

  it("test_10_get_collection_configuration - should get collection configuration", async function () {
    const endpoint = assertEnvironmentVariable(EnvironmentVariableNames.PLANETARYCOMPUTER_ENDPOINT);
    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );

    console.log("=".repeat(80));
    console.log("TEST: test_10_get_collection_configuration");
    console.log("=".repeat(80));
    console.log(`Input - endpoint: ${endpoint}`);
    console.log(`Input - collection_id: ${collectionId}`);

    console.log(`Calling: getCollectionConfiguration(collectionId='${collectionId}')`);
    const response = await client.stac.getCollectionConfiguration(collectionId);

    console.log(`Response type: ${typeof response}`);
    if (typeof response === "object" && response !== null) {
      console.log(`Response keys: ${Object.keys(response).join(", ")}`);
    }

    // Validate response structure
    assert.isDefined(response, "Response should not be None");

    console.log("Test PASSED\n");
  });

  it("test_11_get_collection_thumbnail - should get collection thumbnail", async function () {
    const endpoint = assertEnvironmentVariable(EnvironmentVariableNames.PLANETARYCOMPUTER_ENDPOINT);
    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );

    console.log("=".repeat(80));
    console.log("TEST: test_11_get_collection_thumbnail");
    console.log("=".repeat(80));
    console.log(`Input - endpoint: ${endpoint}`);
    console.log(`Input - collection_id: ${collectionId}`);

    // First check if collection has thumbnail asset
    const collection = await client.stac.getCollection(collectionId);

    if (!collection.assets || !("thumbnail" in collection.assets)) {
      console.log("Collection does not have a thumbnail asset - skipping test");
      return;
    }

    console.log(`Calling: getCollectionThumbnail(collectionId='${collectionId}')`);
    const response = await client.stac.getCollectionThumbnail(collectionId);

    console.log(`Response type: ${typeof response}`);

    // Collect the streaming response
    const chunks: Buffer[] = [];
    for await (const chunk of response) {
      if (typeof chunk === "string") {
        // Convert string to Buffer
        chunks.push(Buffer.from(chunk, "binary"));
      } else if (typeof chunk === "number") {
        chunks.push(Buffer.from([chunk]));
      } else {
        chunks.push(Buffer.from(chunk as Uint8Array));
      }
    }

    const thumbnailBytes = Buffer.concat(chunks);
    console.log(`Thumbnail size: ${thumbnailBytes.length} bytes`);
    console.log(`First 16 bytes (hex): ${thumbnailBytes.subarray(0, 16).toString("hex")}`);

    // Validate image data
    assert.isTrue(thumbnailBytes.length > 0, "Thumbnail bytes should not be empty");
    assert.isTrue(
      thumbnailBytes.length > 100,
      `Thumbnail should be substantial, got only ${thumbnailBytes.length} bytes`,
    );

    // Check for common image format magic bytes
    const isPng = thumbnailBytes.subarray(0, 8).toString("hex") === "89504e470d0a1a0a"; // PNG signature
    const isJpeg = thumbnailBytes.subarray(0, 3).toString("hex") === "ffd8ff"; // JPEG signature
    const isWebp =
      thumbnailBytes.subarray(0, 4).toString("hex") === "52494646" && // RIFF
      thumbnailBytes.subarray(8, 12).toString("hex") === "57454250"; // WEBP

    if (isPng) {
      console.log("Thumbnail format: PNG");
    } else if (isJpeg) {
      console.log("Thumbnail format: JPEG");
    } else if (isWebp) {
      console.log("Thumbnail format: WebP");
    } else {
      console.log(
        `Unknown format - First 32 bytes: ${thumbnailBytes.subarray(0, Math.min(32, thumbnailBytes.length)).toString("hex")}`,
      );
    }

    // Accept PNG, JPEG, or WebP, or just verify we got substantial binary data
    assert.isTrue(
      isPng || isJpeg || isWebp || thumbnailBytes.length > 100,
      "Thumbnail should be a valid image format or substantial binary data",
    );

    console.log("Test PASSED\n");
  });

  it("test_12_create_render_option - should create a render option", async function () {
    assertEnvironmentVariable(EnvironmentVariableNames.PLANETARYCOMPUTER_ENDPOINT);
    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );

    console.log("=".repeat(80));
    console.log("TEST: test_12_create_render_option");
    console.log("=".repeat(80));

    // Check if render option already exists and delete it
    try {
      await client.stac.getRenderOption(collectionId, "test-natural-color");
      console.log("Render option 'test-natural-color' already exists, deleting it first");
      await client.stac.deleteRenderOption(collectionId, "test-natural-color");
      console.log("Existing render option deleted");
    } catch (e) {
      console.log(`Render option does not exist (expected): ${e}`);
    }

    const renderOption: RenderOption = {
      id: "test-natural-color",
      name: "Test Natural color",
      type: KnownRenderOptionType.RasterTile,
      options: "assets=image&asset_bidx=image|1,2,3",
      minZoom: 6,
    };

    console.log(
      `Calling: createRenderOption(collectionId='${collectionId}', body=${JSON.stringify(renderOption)})`,
    );
    const response = await client.stac.createRenderOption(collectionId, renderOption);

    console.log(`Response: ${JSON.stringify(response)}`);
    assert.isDefined(response);
    assert.equal(response.id, "test-natural-color");
    assert.equal(response.name, "Test Natural color");

    console.log("Test PASSED\n");
  });

  it("test_13_get_render_option - should get a specific render option", async function () {
    assertEnvironmentVariable(EnvironmentVariableNames.PLANETARYCOMPUTER_ENDPOINT);
    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );

    console.log("=".repeat(80));
    console.log("TEST: test_13_get_render_option");
    console.log("=".repeat(80));

    console.log(
      `Calling: getRenderOption(collectionId='${collectionId}', renderOptionId='test-natural-color')`,
    );
    const response = await client.stac.getRenderOption(collectionId, "test-natural-color");

    console.log(`Response: ${JSON.stringify(response)}`);
    assert.isDefined(response);
    assert.equal(response.id, "test-natural-color");
    assert.isDefined(response.name);

    console.log("Test PASSED\n");
  });

  it("test_14_replace_render_option - should replace a render option", async function () {
    assertEnvironmentVariable(EnvironmentVariableNames.PLANETARYCOMPUTER_ENDPOINT);
    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );

    console.log("=".repeat(80));
    console.log("TEST: test_14_replace_render_option");
    console.log("=".repeat(80));

    const renderOption: RenderOption = {
      id: "test-natural-color",
      name: "Test Natural color updated",
      description: "RGB from visual assets - updated",
      type: KnownRenderOptionType.RasterTile,
      options: "assets=image&asset_bidx=image|1,2,3",
      minZoom: 6,
    };

    console.log(
      `Calling: replaceRenderOption(collectionId='${collectionId}', renderOptionId='test-natural-color', body=${JSON.stringify(renderOption)})`,
    );
    const response = await client.stac.replaceRenderOption(
      collectionId,
      "test-natural-color",
      renderOption,
    );

    console.log(`Response: ${JSON.stringify(response)}`);
    assert.isDefined(response);
    assert.equal(response.id, "test-natural-color");
    assert.equal(response.description, "RGB from visual assets - updated");

    console.log("Test PASSED\n");
  });

  it("test_14a_delete_render_option - should delete a render option", async function () {
    assertEnvironmentVariable(EnvironmentVariableNames.PLANETARYCOMPUTER_ENDPOINT);
    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );

    console.log("=".repeat(80));
    console.log("TEST: test_14a_delete_render_option");
    console.log("=".repeat(80));

    // Create a render option to be deleted
    const renderOption: RenderOption = {
      id: "test-render-opt-delete",
      name: "Test Render Option To Be Deleted",
      type: KnownRenderOptionType.RasterTile,
      options: "assets=image&asset_bidx=image|1,2,3",
      minZoom: 6,
    };

    console.log(`Creating render option for deletion: ${renderOption.id}`);
    await client.stac.createRenderOption(collectionId, renderOption);

    // Verify it exists
    const retrieved = await client.stac.getRenderOption(collectionId, "test-render-opt-delete");
    assert.isDefined(retrieved);
    console.log("Render option created successfully");

    // Now delete it
    console.log(
      `Calling: deleteRenderOption(collectionId='${collectionId}', renderOptionId='test-render-opt-delete')`,
    );
    await client.stac.deleteRenderOption(collectionId, "test-render-opt-delete");

    console.log("Render option deleted successfully");

    // Verify deletion
    try {
      await client.stac.getRenderOption(collectionId, "test-render-opt-delete");
      assert.fail("Render option should have been deleted");
    } catch (e: unknown) {
      console.log(`Confirmed deletion (404 expected): ${e}`);
      assert.isTrue(isRestError(e) && e.statusCode === 404, "Should get 404 Not Found error");
    }

    console.log("Test PASSED\n");
  });

  it("test_15_add_mosaic - should add a mosaic to a collection", async function () {
    assertEnvironmentVariable(EnvironmentVariableNames.PLANETARYCOMPUTER_ENDPOINT);
    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );

    console.log("=".repeat(80));
    console.log("TEST: test_15_add_mosaic");
    console.log("=".repeat(80));

    // Check if mosaic already exists and delete it
    try {
      await client.stac.getMosaic(collectionId, "test-mosaic-1");
      console.log("Mosaic 'test-mosaic-1' already exists, deleting it first");
      await client.stac.deleteMosaic(collectionId, "test-mosaic-1");
      console.log("Existing mosaic deleted");
    } catch (e) {
      console.log(`Mosaic does not exist (expected): ${e}`);
    }

    const mosaic: StacMosaic = {
      id: "test-mosaic-1",
      name: "Test Most recent available",
      cql: [],
    };

    console.log(
      `Calling: addMosaic(collectionId='${collectionId}', body=${JSON.stringify(mosaic)})`,
    );
    const response = await client.stac.addMosaic(collectionId, mosaic);

    console.log(`Response: ${JSON.stringify(response)}`);
    assert.isDefined(response);
    assert.equal(response.id, "test-mosaic-1");
    assert.equal(response.name, "Test Most recent available");

    console.log("Test PASSED\n");
  });

  it("test_16_get_mosaic - should get a specific mosaic", async function () {
    assertEnvironmentVariable(EnvironmentVariableNames.PLANETARYCOMPUTER_ENDPOINT);
    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );

    console.log("=".repeat(80));
    console.log("TEST: test_16_get_mosaic");
    console.log("=".repeat(80));

    console.log(`Calling: getMosaic(collectionId='${collectionId}', mosaicId='test-mosaic-1')`);
    const response = await client.stac.getMosaic(collectionId, "test-mosaic-1");

    console.log(`Response: ${JSON.stringify(response)}`);
    assert.isDefined(response);
    assert.equal(response.id, "test-mosaic-1");
    assert.isDefined(response.name);

    console.log("Test PASSED\n");
  });

  it("test_17_replace_mosaic - should replace a mosaic", async function () {
    assertEnvironmentVariable(EnvironmentVariableNames.PLANETARYCOMPUTER_ENDPOINT);
    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );

    console.log("=".repeat(80));
    console.log("TEST: test_17_replace_mosaic");
    console.log("=".repeat(80));

    const mosaic: StacMosaic = {
      id: "test-mosaic-1",
      name: "Test Most recent available",
      description: "Most recent available imagery in this collection - updated",
      cql: [],
    };

    console.log(
      `Calling: replaceMosaic(collectionId='${collectionId}', mosaicId='test-mosaic-1', body=${JSON.stringify(mosaic)})`,
    );
    const response = await client.stac.replaceMosaic(collectionId, "test-mosaic-1", mosaic);

    console.log(`Response: ${JSON.stringify(response)}`);
    assert.isDefined(response);
    assert.equal(response.id, "test-mosaic-1");
    assert.isDefined(response.description);

    console.log("Test PASSED\n");
  });

  it("test_17a_delete_mosaic - should delete a mosaic", async function () {
    assertEnvironmentVariable(EnvironmentVariableNames.PLANETARYCOMPUTER_ENDPOINT);
    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );

    console.log("=".repeat(80));
    console.log("TEST: test_17a_delete_mosaic");
    console.log("=".repeat(80));

    // Create a mosaic to be deleted
    const mosaic: StacMosaic = {
      id: "test-mosaic-to-be-deleted",
      name: "Test Mosaic To Be Deleted",
      cql: [],
    };

    console.log(`Creating mosaic for deletion: ${mosaic.id}`);
    await client.stac.addMosaic(collectionId, mosaic);

    // Verify it exists
    const retrieved = await client.stac.getMosaic(collectionId, "test-mosaic-to-be-deleted");
    assert.isDefined(retrieved);
    console.log("Mosaic created successfully");

    // Now delete it
    console.log(
      `Calling: deleteMosaic(collectionId='${collectionId}', mosaicId='test-mosaic-to-be-deleted')`,
    );
    await client.stac.deleteMosaic(collectionId, "test-mosaic-to-be-deleted");

    console.log("Mosaic deleted successfully");

    // Verify deletion
    try {
      await client.stac.getMosaic(collectionId, "test-mosaic-to-be-deleted");
      assert.fail("Mosaic should have been deleted");
    } catch (e: unknown) {
      console.log(`Confirmed deletion (404 expected): ${e}`);
      assert.isTrue(isRestError(e) && e.statusCode === 404, "Should get 404 Not Found error");
    }

    console.log("Test PASSED\n");
  });

  it("test_18_replace_partition_type - should replace partition type by creating a temporary collection", async function () {
    assertEnvironmentVariable(EnvironmentVariableNames.PLANETARYCOMPUTER_ENDPOINT);

    console.log("=".repeat(80));
    console.log("TEST: test_18_replace_partition_type");
    console.log("=".repeat(80));

    const testCollectionId = "test-partition-type-collection";
    console.log(`Creating temporary collection: ${testCollectionId}`);

    // Check if collection exists and delete it first
    try {
      await client.stac.getCollection(testCollectionId);
      console.log(`Collection '${testCollectionId}' already exists, deleting first...`);
      const deletePoller = client.stac.deleteCollection(testCollectionId);
      await deletePoller.pollUntilDone();
      console.log(`Deleted existing collection '${testCollectionId}'`);
    } catch {
      console.log(`Collection '${testCollectionId}' does not exist, proceeding with creation`);
    }

    // Define collection extents
    const spatialExtent: StacExtensionSpatialExtent = {
      boundingBox: [[-180, -90, 180, 90]],
    };

    const temporalExtent: StacCollectionTemporalExtent = {
      interval: [[new Date("2020-01-01T00:00:00Z"), new Date("2099-12-31T23:59:59Z")]],
    };

    const extent: StacExtensionExtent = {
      spatial: spatialExtent,
      temporal: temporalExtent,
    };

    // Create collection payload
    const collectionData: StacCollection = {
      id: testCollectionId,
      description: "Temporary collection for partition type testing",
      extent,
      license: "proprietary",
      links: [],
      stacVersion: "1.0.0",
      title: "Test Partition Type Collection",
      type: "Collection",
      additionalProperties: {}, // Required to avoid serializer error
    };

    // Create the collection (LRO)
    console.log("Creating collection using createCollection (LRO)");
    const createPoller = client.stac.createCollection(collectionData);
    await createPoller.pollUntilDone();
    console.log("Temporary collection created");

    try {
      // Set partition type
      const partitionType: PartitionType = {
        scheme: KnownPartitionTypeScheme.Year,
      };

      console.log(
        `Calling: replacePartitionType(collectionId='${testCollectionId}', body=${JSON.stringify(partitionType)})`,
      );
      await client.stac.replacePartitionType(testCollectionId, partitionType);

      // Verify the change
      const updatedPartition = await client.stac.getPartitionType(testCollectionId);
      assert.equal(updatedPartition.scheme, KnownPartitionTypeScheme.Year);

      console.log("Partition type set successfully");
    } finally {
      // Clean up: delete the temporary collection
      console.log(`Deleting temporary collection: ${testCollectionId}`);
      try {
        const deletePoller = client.stac.deleteCollection(testCollectionId);
        await deletePoller.pollUntilDone();
        console.log("Temporary collection deleted");
      } catch (e) {
        console.log(`Failed to delete temporary collection: ${e}`);
      }
    }

    console.log("Test PASSED\n");
  });

  it("test_19_replace_tile_settings - should replace tile settings for a collection", async function () {
    assertEnvironmentVariable(EnvironmentVariableNames.PLANETARYCOMPUTER_ENDPOINT);
    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );

    console.log("=".repeat(80));
    console.log("TEST: test_19_replace_tile_settings");
    console.log("=".repeat(80));

    const tileSettings: TileSettings = {
      defaultLocation: undefined,
      maxItemsPerTile: 35,
      minZoom: 6,
    };

    console.log(
      `Calling: replaceTileSettings(collectionId='${collectionId}', body=${JSON.stringify(tileSettings)})`,
    );
    const response = await client.stac.replaceTileSettings(collectionId, tileSettings);

    console.log(`Response: ${JSON.stringify(response)}`);
    assert.isDefined(response);
    assert.equal(response.maxItemsPerTile, 35);
    assert.equal(response.minZoom, 6);

    console.log("Test PASSED\n");
  });

  it("test_20_create_queryables - should create queryables for a collection", async function () {
    assertEnvironmentVariable(EnvironmentVariableNames.PLANETARYCOMPUTER_ENDPOINT);
    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );

    console.log("=".repeat(80));
    console.log("TEST: test_20_create_queryables");
    console.log("=".repeat(80));

    // Check if queryable already exists and delete it
    try {
      const queryables = await client.stac.getCollectionQueryables(collectionId);
      const props = (queryables as Record<string, unknown>).properties as Record<string, unknown>;
      if ("test:property" in props) {
        console.log("Queryable 'test:property' already exists, deleting it first");
        await client.stac.deleteQueryable(collectionId, "test:property");
        console.log("Existing queryable deleted");
      } else {
        console.log("Queryable does not exist (expected)");
      }
    } catch (e) {
      console.log(`Error checking queryable existence: ${e}`);
    }

    const queryable: StacQueryable = {
      name: "test:property",
      dataType: KnownStacQueryableDefinitionDataType.Number,
      createIndex: false,
      definition: {
        dataType: KnownStacQueryableDefinitionDataType.Number,
      },
    };

    console.log(`Calling: createQueryables(collectionId='${collectionId}', body=[queryable])`);
    const response = await client.stac.createQueryables(collectionId, [queryable]);

    console.log(`Response: ${JSON.stringify(response)}`);
    assert.isDefined(response);

    // Response is a list of queryables
    assert.isArray(response, `Response should be a list, got ${typeof response}`);
    assert.isTrue(response.length > 0, "Response should contain at least one queryable");

    // Verify our queryable was created
    const queryableNames = response.map((q: unknown) =>
      typeof q === "object" && q !== null && "name" in q ? (q as { name: string }).name : "",
    );
    assert.include(
      queryableNames,
      "test:property",
      "Created queryable 'test:property' should be in response",
    );

    console.log("Test PASSED\n");
  });

  it("test_21_replace_queryable - should replace a queryable", async function () {
    assertEnvironmentVariable(EnvironmentVariableNames.PLANETARYCOMPUTER_ENDPOINT);
    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );

    console.log("=".repeat(80));
    console.log("TEST: test_21_replace_queryable");
    console.log("=".repeat(80));

    const queryable: StacQueryable = {
      name: "test:property",
      dataType: KnownStacQueryableDefinitionDataType.Number,
      createIndex: false,
      definition: {
        description: "Test property - updated",
      },
    };

    console.log(
      `Calling: replaceQueryable(collectionId='${collectionId}', queryableName='test:property', body=queryable)`,
    );
    const response = await client.stac.replaceQueryable(collectionId, "test:property", queryable);

    console.log(`Response: ${JSON.stringify(response)}`);
    assert.isDefined(response);

    console.log("Test PASSED\n");
  });

  it("test_21a_delete_queryable - should delete a queryable", async function () {
    assertEnvironmentVariable(EnvironmentVariableNames.PLANETARYCOMPUTER_ENDPOINT);
    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );

    console.log("=".repeat(80));
    console.log("TEST: test_21a_delete_queryable");
    console.log("=".repeat(80));

    // Create a queryable to be deleted
    const queryable: StacQueryable = {
      name: "test:property_to_be_deleted",
      dataType: KnownStacQueryableDefinitionDataType.Number,
      createIndex: false,
      definition: {
        description: "Test property for deletion",
      },
    };

    console.log(`Creating queryable for deletion: ${queryable.name}`);
    await client.stac.createQueryables(collectionId, [queryable]);

    // Verify it exists
    const queryables = await client.stac.getCollectionQueryables(collectionId);
    const props = (queryables as Record<string, unknown>).properties as Record<string, unknown>;
    assert.property(props, "test:property_to_be_deleted");
    console.log("Queryable created successfully");

    // Now delete it
    console.log(
      `Calling: deleteQueryable(collectionId='${collectionId}', queryableName='test:property_to_be_deleted')`,
    );
    await client.stac.deleteQueryable(collectionId, "test:property_to_be_deleted");

    console.log("Queryable deleted successfully");

    // Verify deletion
    const queryablesAfter = await client.stac.getCollectionQueryables(collectionId);
    const propsAfter = (queryablesAfter as Record<string, unknown>).properties as Record<
      string,
      unknown
    >;
    assert.notProperty(
      propsAfter,
      "test:property_to_be_deleted",
      "Queryable should have been deleted",
    );

    console.log("Test PASSED\n");
  });
});
