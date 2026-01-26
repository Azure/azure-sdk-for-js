// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { createRecorder, createRecordedClient } from "./utils/recordedClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { PlanetaryComputerProClient } from "../../src/index.js";
import { assertEnvironmentVariable, EnvironmentVariableNames } from "./utils/envVars.js";
import {
  toUint8Array,
  toHexString,
  uint8ArrayEquals,
  PNG_MAGIC,
  JPEG_MAGIC,
  decompressIfGzip,
} from "./utils/byteHelpers.js";

/**
 * Test suite for STAC Item Tiler operations.
 * Ported from Python test_planetary_computer_04_stac_item_tiler.py
 */
describe("STAC Item Tiler Operations", () => {
  let recorder: Recorder;
  let client: PlanetaryComputerProClient;
  let collectionId: string;
  let itemId: string;

  beforeEach(async function (ctx) {
    recorder = await createRecorder(ctx);
    client = await createRecordedClient(recorder);
    collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );
    itemId = assertEnvironmentVariable(EnvironmentVariableNames.PLANETARYCOMPUTER_ITEM_ID);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("test_01: Get tile matrix definitions for WebMercatorQuad", async () => {
    console.log("=" + "=".repeat(79));
    console.log("TEST: test_01_get_tile_matrix_definitions");
    console.log("=" + "=".repeat(79));
    console.log(`Input - tile_matrix_set_id: WebMercatorQuad`);

    console.log("Calling: getTileMatrixDefinitions(tile_matrix_set_id='WebMercatorQuad')");
    const response = await client.data.getTileMatrixDefinitions("WebMercatorQuad");

    console.log(`Response type: ${typeof response}`);
    console.log(`Number of tile matrices: ${response.tileMatrices?.length || 0}`);

    // Assert basic structure
    assert.isDefined(response, "Response should not be None");
    assert.isDefined(response.id, "Response should have id");
    assert.isTrue(response.id.length > 0, "ID should not be empty");
    assert.isDefined(response.tileMatrices, "Response should have tileMatrices");
    assert.isTrue(response.tileMatrices.length > 0, "Should have at least one tile matrix");

    // Validate tile matrix structure
    const firstMatrix = response.tileMatrices[0];
    assert.isDefined(firstMatrix.id, "Tile matrix should have id");
    assert.isDefined(firstMatrix.scaleDenominator, "Tile matrix should have scaleDenominator");
    assert.isDefined(firstMatrix.tileWidth, "Tile matrix should have tileWidth");
    assert.isDefined(firstMatrix.tileHeight, "Tile matrix should have tileHeight");
    assert.equal(firstMatrix.tileWidth, 256, "Standard tile width should be 256");
    assert.equal(firstMatrix.tileHeight, 256, "Standard tile height should be 256");

    console.log("Test PASSED\n");
  });

  it("test_02: List all available tile matrices", async () => {
    console.log("=" + "=".repeat(79));
    console.log("TEST: test_02_list_tile_matrices");
    console.log("=" + "=".repeat(79));

    console.log("Calling: listTileMatrices()");
    const response = await client.data.listTileMatrices();

    console.log(`Response type: ${typeof response}`);
    console.log(`Response: ${JSON.stringify(response)}`);
    console.log(`Number of tile matrices: ${response.length}`);

    // Assert response is an array
    assert.isArray(response, "Response should be an array");
    assert.isTrue(response.length > 0, "Should have at least one tile matrix");

    // Check for expected tile matrix sets
    assert.include(response, "WebMercatorQuad", "Should include WebMercatorQuad");
    assert.include(response, "WorldCRS84Quad", "Should include WorldCRS84Quad");

    // All items should be strings
    for (const item of response) {
      assert.isString(item, "Each item should be a string");
    }

    console.log("Test PASSED\n");
  });

  it("test_03: List available assets for a STAC item", async () => {
    console.log("=" + "=".repeat(79));
    console.log("TEST: test_03_list_available_assets");
    console.log("=" + "=".repeat(79));
    console.log(`Input - collection_id: ${collectionId}`);
    console.log(`Input - item_id: ${itemId}`);

    console.log(
      `Calling: listAvailableAssets(collection_id='${collectionId}', item_id='${itemId}')`,
    );
    const response = await client.data.listAvailableAssets(collectionId, itemId);

    console.log(`Response type: ${typeof response}`);
    console.log(`Response: ${JSON.stringify(response)}`);
    console.log(`Number of assets: ${response.length}`);

    // Assert response is an array
    assert.isArray(response, "Response should be an array");
    assert.isTrue(response.length > 0, "Should have at least one asset");

    // All items should be strings
    for (const asset of response) {
      assert.isString(asset, "Each asset should be a string");
      assert.isTrue(asset.length > 0, "Asset name should not be empty");
    }

    console.log("Test PASSED\n");
  });

  it("test_04: Get bounds for a STAC item", async () => {
    console.log("=" + "=".repeat(79));
    console.log("TEST: test_04_get_bounds");
    console.log("=" + "=".repeat(79));
    console.log(`Input - collection_id: ${collectionId}`);
    console.log(`Input - item_id: ${itemId}`);

    console.log(`Calling: getBounds(collection_id='${collectionId}', item_id='${itemId}')`);
    const response = await client.data.getBounds(collectionId, itemId);

    console.log(`Response type: ${typeof response}`);
    console.log(`Response: ${JSON.stringify(response)}`);

    // Response should have bounds attribute
    assert.isDefined(response, "Response should not be None");
    assert.property(response, "bounds", "Response should have bounds attribute");

    const bounds = response.bounds;
    console.log(`Bounds: ${JSON.stringify(bounds)}`);

    // Assert bounds is an array with 4 coordinates
    assert.isArray(bounds, "Bounds should be an array");
    assert.equal(bounds.length, 4, "Bounds should have 4 coordinates [minx, miny, maxx, maxy]");

    // Validate coordinate structure: [minx, miny, maxx, maxy]
    const [minx, miny, maxx, maxy] = bounds;
    for (const coord of bounds) {
      assert.isNumber(coord, "Each coordinate should be numeric");
    }

    // Validate bounds logic
    assert.isTrue(minx < maxx, `minx (${minx}) should be less than maxx (${maxx})`);
    assert.isTrue(miny < maxy, `miny (${miny}) should be less than maxy (${maxy})`);

    console.log("Test PASSED\n");
  });

  it("test_05: Get preview image of a STAC item", async () => {
    console.log("=" + "=".repeat(79));
    console.log("TEST: test_05_get_preview");
    console.log("=" + "=".repeat(79));
    console.log(`Input - collection_id: ${collectionId}`);
    console.log(`Input - item_id: ${itemId}`);
    console.log("Input - dimensions: 512x512");

    console.log("Calling: getPreview(...)");
    const response = await client.data.getPreview(collectionId, itemId, {
      format: "png",
      width: 512,
      height: 512,
      assets: ["image"],
      assetBandIndices: "image|1,2,3",
    });

    console.log(`Response type: ${typeof response}`);
    console.log(`Response constructor: ${response?.constructor?.name}`);
    console.log(`Response is Uint8Array: ${response instanceof Uint8Array}`);
    console.log(
      `Response has Symbol.asyncIterator: ${(response as any)?.[Symbol.asyncIterator] !== undefined}`,
    );

    // Convert response to Uint8Array (browser-compatible)
    const imageBytes = toUint8Array(response);
    console.log(`Image size: ${imageBytes.length} bytes`);
    console.log(`First 16 bytes (hex): ${toHexString(imageBytes.subarray(0, 16))}`);

    // Verify PNG magic bytes
    assert.isTrue(imageBytes.length > 0, "Image bytes should not be empty");
    assert.isTrue(imageBytes.length > 100, "Image should be substantial");
    assert.isTrue(
      uint8ArrayEquals(imageBytes.subarray(0, 8), PNG_MAGIC),
      "Response should be a valid PNG image (magic bytes mismatch)",
    );

    console.log("Test PASSED\n");
  });

  it("test_06: Get info/metadata for a STAC item", async () => {
    console.log("=" + "=".repeat(79));
    console.log("TEST: test_06_get_info_geo_json");
    console.log("=" + "=".repeat(79));
    console.log(`Input - collection_id: ${collectionId}`);
    console.log(`Input - item_id: ${itemId}`);

    console.log("Calling: getInfoGeoJson(...)");
    const response = await client.data.getInfoGeoJson(collectionId, itemId, {
      assets: ["image"],
    });

    console.log(`Response type: ${typeof response}`);

    assert.isDefined(response, "Response should not be None");

    console.log("Test PASSED\n");
  });

  it("test_07: List statistics for a STAC item's assets", async () => {
    console.log("=" + "=".repeat(79));
    console.log("TEST: test_07_list_statistics");
    console.log("=" + "=".repeat(79));
    console.log(`Input - collection_id: ${collectionId}`);
    console.log(`Input - item_id: ${itemId}`);

    console.log("Calling: listStatistics(...)");
    const response = await client.data.listStatistics(collectionId, itemId, {
      assets: ["image"],
    });

    console.log(`Response type: ${typeof response}`);

    assert.isDefined(response, "Response should not be None");

    console.log("Test PASSED\n");
  });

  // TODO: Skip until SDK deserialization bug is fixed - SDK incorrectly decodes XML as base64
  // See: https://github.com/Azure/azure-sdk-for-js/issues/XXXXX
  it.skip("test_08: Get WMTS capabilities XML for a STAC item", async () => {
    console.log("=" + "=".repeat(79));
    console.log("TEST: test_08_get_wmts_capabilities");
    console.log("=" + "=".repeat(79));
    console.log(`Input - collection_id: ${collectionId}`);
    console.log(`Input - item_id: ${itemId}`);

    console.log("Calling: getWmtsCapabilities(...)");
    const response = await client.data.getWmtsCapabilities(
      collectionId,
      itemId,
      "WebMercatorQuad",
      {
        assets: ["image"],
        assetBandIndices: "image|1,2,3",
        tileFormat: "png",
        tileScale: 1,
        minZoom: 7,
        maxZoom: 14,
      },
    );

    console.log(`Response type: ${typeof response}`);

    // Convert response to Uint8Array and decompress if gzip (browser-compatible)
    const rawBytes = toUint8Array(response);
    console.log(`Raw response size: ${rawBytes.length} bytes`);
    console.log(`Raw bytes hex: ${toHexString(rawBytes.subarray(0, 20))}`);
    const xmlBytes = await decompressIfGzip(rawBytes);
    console.log(`Decompressed XML size: ${xmlBytes.length} bytes`);

    // Decode to string using TextDecoder (browser-compatible)
    const xmlString = new TextDecoder("utf-8").decode(xmlBytes);
    console.log(`XML first 200 chars: ${xmlString.substring(0, 200)}`);

    // Validate XML structure
    assert.isTrue(xmlBytes.length > 0, "XML bytes should not be empty");
    assert.include(xmlString, "Capabilities", "Response should contain Capabilities element");
    assert.include(xmlString.toLowerCase(), "wmts", "Response should reference WMTS");
    assert.include(xmlString, "TileMatrix", "Response should contain TileMatrix information");

    console.log("Test PASSED\n");
  });

  it("test_09: Get asset statistics for a STAC item", async () => {
    console.log("=" + "=".repeat(79));
    console.log("TEST: test_09_get_asset_statistics");
    console.log("=" + "=".repeat(79));

    console.log(
      `Calling: getAssetStatistics(collection_id='${collectionId}', item_id='${itemId}', assets=['image'])`,
    );
    const response = await client.data.getAssetStatistics(collectionId, itemId, {
      assets: ["image"],
    });

    console.log(`Response: ${JSON.stringify(response)}`);
    assert.isDefined(response, "Response should not be None");
    assert.property(response, "image", "Response should have 'image' property");

    console.log("Test PASSED\n");
  });

  it("test_10: Crop image by GeoJSON geometry", async () => {
    console.log("=" + "=".repeat(79));
    console.log("TEST: test_10_crop_geo_json");
    console.log("=" + "=".repeat(79));

    // API requires a GeoJSON Feature, not just a Polygon
    const geojsonFeature = {
      type: "Feature" as const,
      geometry: {
        coordinates: [
          [
            [-84.3906, 33.6714], // bottom-left
            [-84.3814, 33.6714], // bottom-right
            [-84.3814, 33.6806], // top-right
            [-84.3906, 33.6806], // top-left
            [-84.3906, 33.6714], // close the ring
          ],
        ],
        type: "Polygon" as const,
      },
      properties: {},
    };

    console.log("Calling: cropGeoJson(...)");
    const response = await client.data.cropGeoJson(collectionId, itemId, "png", geojsonFeature, {
      assets: ["image"],
      assetBandIndices: "image|1,2,3",
    });

    const imageBytes = toUint8Array(response);
    console.log(`Image size: ${imageBytes.length} bytes`);

    assert.isTrue(imageBytes.length > 0, "Image bytes should not be empty");
    assert.isTrue(uint8ArrayEquals(imageBytes.subarray(0, 8), PNG_MAGIC), "Should be PNG format");

    console.log("Test PASSED\n");
  });

  it("test_11: Crop image by GeoJSON with custom dimensions", async () => {
    console.log("=" + "=".repeat(79));
    console.log("TEST: test_11_crop_geo_json_with_dimensions");
    console.log("=" + "=".repeat(79));

    const geojsonFeature = {
      type: "Feature" as const,
      geometry: {
        coordinates: [
          [
            [-84.3906, 33.6714], // bottom-left
            [-84.3814, 33.6714], // bottom-right
            [-84.3814, 33.6806], // top-right
            [-84.3906, 33.6806], // top-left
            [-84.3906, 33.6714], // close the ring
          ],
        ],
        type: "Polygon" as const,
      },
      properties: {},
    };

    console.log("Calling: cropGeoJsonWithDimensions(...)");
    const response = await client.data.cropGeoJsonWithDimensions(
      collectionId,
      itemId,
      256,
      256,
      "png",
      geojsonFeature,
      {
        assets: ["image"],
        assetBandIndices: "image|1,2,3",
      },
    );

    const imageBytes = toUint8Array(response);
    console.log(`Image size: ${imageBytes.length} bytes`);

    assert.isTrue(imageBytes.length > 0, "Image bytes should not be empty");
    assert.isTrue(uint8ArrayEquals(imageBytes.subarray(0, 8), PNG_MAGIC), "Should be PNG format");

    console.log("Test PASSED\n");
  });

  it("test_12: Get statistics for a GeoJSON area", async () => {
    console.log("=" + "=".repeat(79));
    console.log("TEST: test_12_get_geo_json_statistics");
    console.log("=" + "=".repeat(79));

    const geojsonFeature = {
      type: "Feature" as const,
      geometry: {
        coordinates: [
          [
            [-84.3906, 33.6714], // bottom-left
            [-84.3814, 33.6714], // bottom-right
            [-84.3814, 33.6806], // top-right
            [-84.3906, 33.6806], // top-left
            [-84.3906, 33.6714], // close the ring
          ],
        ],
        type: "Polygon" as const,
      },
      properties: {},
    };

    console.log("Calling: getGeoJsonStatistics(...)");
    const response = await client.data.getGeoJsonStatistics(collectionId, itemId, geojsonFeature, {
      assets: ["image"],
    });

    console.log(`Response: ${JSON.stringify(response)}`);
    assert.isDefined(response, "Response should not be None");

    console.log("Test PASSED\n");
  });

  it("test_13: Get part of an image by bounding box", async () => {
    const bounds = [-84.393, 33.6798, -84.367, 33.7058];

    console.log("=" + "=".repeat(79));
    console.log("TEST: test_13_get_part");
    console.log("=" + "=".repeat(79));

    console.log("Calling: getPart(...)");
    const response = await client.data.getPart(
      collectionId,
      itemId,
      bounds[0],
      bounds[1],
      bounds[2],
      bounds[3],
      "png",
      {
        assets: ["image"],
        assetBandIndices: "image|1,2,3",
      },
    );

    const imageBytes = toUint8Array(response);
    console.log(`Image size: ${imageBytes.length} bytes`);

    assert.isTrue(imageBytes.length > 0, "Image bytes should not be empty");
    assert.isTrue(uint8ArrayEquals(imageBytes.subarray(0, 8), PNG_MAGIC), "Should be PNG format");

    console.log("Test PASSED\n");
  });

  it("test_14: Get part of an image with custom dimensions", async () => {
    const bounds = [-84.393, 33.6798, -84.367, 33.7058];

    console.log("=" + "=".repeat(79));
    console.log("TEST: test_14_get_part_with_dimensions");
    console.log("=" + "=".repeat(79));

    console.log("Calling: getPartWithDimensions(...)");
    const response = await client.data.getPartWithDimensions(
      collectionId,
      itemId,
      bounds[0],
      bounds[1],
      bounds[2],
      bounds[3],
      256,
      256,
      "png",
      {
        assets: ["image"],
        assetBandIndices: "image|1,2,3",
      },
    );

    const imageBytes = toUint8Array(response);
    console.log(`Image size: ${imageBytes.length} bytes`);

    assert.isTrue(imageBytes.length > 0, "Image bytes should not be empty");
    assert.isTrue(uint8ArrayEquals(imageBytes.subarray(0, 8), PNG_MAGIC), "Should be PNG format");

    console.log("Test PASSED\n");
  });

  it("test_15: Get data for a specific point", async () => {
    const point = [-84.386, 33.676];

    console.log("=" + "=".repeat(79));
    console.log("TEST: test_15_get_point");
    console.log("=" + "=".repeat(79));

    console.log("Calling: getPoint(...)");
    const response = await client.data.getPoint(collectionId, itemId, point[0], point[1], {
      assets: ["image"],
    });

    console.log(`Response: ${JSON.stringify(response)}`);
    assert.isDefined(response, "Response should not be None");

    console.log("Test PASSED\n");
  });

  it("test_16: Get preview with specific format (JPEG)", async () => {
    console.log("=" + "=".repeat(79));
    console.log("TEST: test_16_get_preview_with_format");
    console.log("=" + "=".repeat(79));

    console.log("Calling: getPreviewWithFormat(...)");
    const response = await client.data.getPreviewWithFormat(collectionId, itemId, "jpeg", {
      assets: ["image"],
      assetBandIndices: "image|1,2,3",
    });

    const imageBytes = toUint8Array(response);
    console.log(`Image size: ${imageBytes.length} bytes`);

    assert.isTrue(imageBytes.length > 0, "Image bytes should not be empty");
    // JPEG magic bytes
    assert.isTrue(uint8ArrayEquals(imageBytes.subarray(0, 3), JPEG_MAGIC), "Should be JPEG format");

    console.log("Test PASSED\n");
  });

  it("test_17: Get TileJSON metadata", async () => {
    console.log("=" + "=".repeat(79));
    console.log("TEST: test_17_get_tile_json");
    console.log("=" + "=".repeat(79));

    console.log("Calling: getTileJson(...)");
    const response = await client.data.getTileJson(collectionId, itemId, "WebMercatorQuad", {
      assets: ["image"],
      assetBandIndices: "image|1,2,3",
      tileFormat: "png",
      tileScale: 1,
      minZoom: 7,
      maxZoom: 14,
    });

    console.log(`Response: ${JSON.stringify(response)}`);
    assert.isDefined(response, "Response should not be None");
    assert.isTrue(
      response.tileJson !== undefined || response.tiles !== undefined,
      "Response should have tileJson or tiles property",
    );

    console.log("Test PASSED\n");
  });

  it("test_18: Get a specific tile", async () => {
    console.log("=" + "=".repeat(79));
    console.log("TEST: test_18_get_tile");
    console.log("=" + "=".repeat(79));

    console.log("Calling: getTile(...)");
    const response = await client.data.getTile(
      collectionId,
      itemId,
      "WebMercatorQuad",
      14,
      4349,
      6564,
      1,
      "png",
      {
        assets: ["image"],
        assetBandIndices: "image|1,2,3",
      },
    );

    const imageBytes = toUint8Array(response);
    console.log(`Tile size: ${imageBytes.length} bytes`);

    assert.isTrue(imageBytes.length > 0, "Tile bytes should not be empty");
    assert.isTrue(uint8ArrayEquals(imageBytes.subarray(0, 8), PNG_MAGIC), "Should be PNG format");

    console.log("Test PASSED\n");
  });

  it("test_19: Get detailed information about specific assets", async () => {
    console.log("=" + "=".repeat(79));
    console.log("TEST: test_19_get_item_asset_details");
    console.log("=" + "=".repeat(79));
    console.log(`Input - collection_id: ${collectionId}`);
    console.log(`Input - item_id: ${itemId}`);

    console.log("Calling: getItemAssetDetails(...)");
    const response = await client.data.getItemAssetDetails(collectionId, itemId, {
      assets: ["image"],
    });

    console.log(`Response type: ${typeof response}`);
    console.log(`Response: ${JSON.stringify(response)}`);

    assert.isDefined(response, "Response should not be None");

    console.log("Test PASSED\n");
  });
});
