// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { createRecorder, createRecordedClient } from "./utils/recordedClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { PlanetaryComputerProClient } from "../../src/index.js";
import { assertEnvironmentVariable, EnvironmentVariableNames } from "./utils/envVars.js";

/**
 * Test suite for Mosaics Tiler operations.
 * Ported from Python test_planetary_computer_05_mosaics_tiler.py
 */
describe("Mosaics Tiler Operations", () => {
  let recorder: Recorder;
  let client: PlanetaryComputerProClient;
  let collectionId: string;

  beforeEach(async function (ctx) {
    recorder = await createRecorder(ctx);
    client = await createRecordedClient(recorder);
    collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("test_01: Register a mosaics search", async () => {
    console.log("=" + "=".repeat(79));
    console.log("TEST: test_01_register_mosaics_search");
    console.log("=" + "=".repeat(79));
    console.log(`Input - collection_id: ${collectionId}`);

    // Create search parameters - filter to 2021-2022 date range
    const registerSearchRequest = {
      filter: {
        op: "and" as const,
        args: [
          { op: "=" as const, args: [{ property: "collection" }, collectionId] },
          { op: ">=" as const, args: [{ property: "datetime" }, "2021-01-01T00:00:00Z"] },
          { op: "<=" as const, args: [{ property: "datetime" }, "2022-12-31T23:59:59Z"] },
        ],
      },
      filterLang: "cql2-json" as const,
      sortBy: [{ direction: "desc" as const, field: "datetime" }],
    };
    console.log(`Search request: ${JSON.stringify(registerSearchRequest)}`);

    console.log("Calling: registerMosaicsSearch(...)");
    const response = await client.data.registerMosaicsSearch(registerSearchRequest as any);

    console.log(`Response type: ${typeof response}`);
    console.log(`Response: ${JSON.stringify(response)}`);

    // Validate response structure
    assert.isDefined(response, "Response should not be None");
    assert.property(response, "searchId", "Response should have 'searchId' attribute");

    const searchId = response.searchId;
    assert.isString(searchId, "Search ID should be a string");
    assert.isTrue(searchId.length > 0, "Search ID should not be empty");

    console.log(`Search ID: ${searchId}`);
    console.log("Test PASSED\n");
  });

  it("test_02: Get mosaics search info", async () => {
    console.log("=" + "=".repeat(79));
    console.log("TEST: test_02_get_mosaics_search_info");
    console.log("=" + "=".repeat(79));
    console.log(`Input - collection_id: ${collectionId}`);

    // First register a search
    const registerSearchRequest = {
      filter: {
        op: "and" as const,
        args: [
          { op: "=" as const, args: [{ property: "collection" }, collectionId] },
          { op: ">=" as const, args: [{ property: "datetime" }, "2021-01-01T00:00:00Z"] },
          { op: "<=" as const, args: [{ property: "datetime" }, "2022-12-31T23:59:59Z"] },
        ],
      },
      filterLang: "cql2-json" as const,
      sortBy: [{ direction: "desc" as const, field: "datetime" }],
    };
    const registerResponse = await client.data.registerMosaicsSearch(registerSearchRequest as any);
    const searchId = registerResponse.searchId;
    console.log(`Registered search ID: ${searchId}`);

    console.log(`Calling: getMosaicsSearchInfo(searchId='${searchId}')`);
    const response = await client.data.getMosaicsSearchInfo(searchId);

    console.log(`Response type: ${typeof response}`);

    // Validate response structure
    assert.isDefined(response, "Response should not be None");
    assert.property(response, "search", "Response should have 'search' attribute");

    const search = response.search;
    console.log(`Search type: ${typeof search}`);
    assert.isDefined(search, "Search should not be None");
    assert.property(search, "hash", "Search should have 'hash' attribute");

    const searchHash = search.hash;
    assert.isString(searchHash, "Search hash should be a string");
    assert.isTrue(searchHash.length > 0, "Search hash should not be empty");

    console.log(`Search hash: ${searchHash}`);
    console.log("Test PASSED\n");
  });

  it("test_03: Get mosaics tile JSON", async () => {
    console.log("=" + "=".repeat(79));
    console.log("TEST: test_03_get_mosaics_tile_json");
    console.log("=" + "=".repeat(79));
    console.log(`Input - collection_id: ${collectionId}`);

    // Register search and get hash
    const registerSearchRequest = {
      filter: {
        op: "and" as const,
        args: [
          { op: "=" as const, args: [{ property: "collection" }, collectionId] },
          { op: ">=" as const, args: [{ property: "datetime" }, "2021-01-01T00:00:00Z"] },
          { op: "<=" as const, args: [{ property: "datetime" }, "2022-12-31T23:59:59Z"] },
        ],
      },
      filterLang: "cql2-json" as const,
      sortBy: [{ direction: "desc" as const, field: "datetime" }],
    };
    const registerResponse = await client.data.registerMosaicsSearch(registerSearchRequest as any);
    const searchId = registerResponse.searchId;
    console.log(`Using search ID: ${searchId}`);

    console.log("Calling: getMosaicsTileJson(...)");
    const response = await client.data.getMosaicsTileJson(searchId, "WebMercatorQuad", {
      assets: ["image"],
      assetBandIndices: "image|1,2,3",
      tileScale: 1,
      minZoom: 9,
      collection: collectionId,
      tileFormat: "png",
    });

    console.log(`Response type: ${typeof response}`);

    // Validate TileJSON structure
    assert.isDefined(response, "Response should not be None");
    assert.property(response, "tileJson", "Response should have 'tileJson' property");
    assert.property(response, "tiles", "Response should have 'tiles' property");

    // Validate tiles array
    const tiles = response.tiles;
    assert.isArray(tiles, "Tiles should be an array");
    assert.isTrue(tiles.length > 0, "Should have at least one tile URL pattern");

    console.log("Test PASSED\n");
  });

  it("test_04: Get a specific mosaic tile", async () => {
    console.log("=" + "=".repeat(79));
    console.log("TEST: test_04_get_mosaics_tile");
    console.log("=" + "=".repeat(79));
    console.log(`Input - collection_id: ${collectionId}`);
    console.log("Input - tile coordinates: z=13, x=2174, y=3282");

    // Register search
    const registerSearchRequest = {
      filter: {
        op: "and" as const,
        args: [
          { op: "=" as const, args: [{ property: "collection" }, collectionId] },
          { op: ">=" as const, args: [{ property: "datetime" }, "2021-01-01T00:00:00Z"] },
          { op: "<=" as const, args: [{ property: "datetime" }, "2022-12-31T23:59:59Z"] },
        ],
      },
      filterLang: "cql2-json" as const,
      sortBy: [{ direction: "desc" as const, field: "datetime" }],
    };
    const registerResponse = await client.data.registerMosaicsSearch(registerSearchRequest as any);
    const searchId = registerResponse.searchId;
    console.log(`Using search ID: ${searchId}`);

    console.log("Calling: getMosaicsTile(...)");
    const response = await client.data.getMosaicsTile(
      searchId,
      "WebMercatorQuad",
      13,
      2174,
      3282,
      1,
      "png",
      {
        assets: ["image"],
        assetBandIndices: "image|1,2,3",
        collection: collectionId,
      },
    );

    console.log(`Response type: ${typeof response}`);
    console.log(`Response constructor: ${response?.constructor?.name}`);
    console.log(`Response is Uint8Array: ${response instanceof Uint8Array}`);
    console.log(`Response is Array: ${Array.isArray(response)}`);
    console.log(
      `Response has Symbol.asyncIterator: ${(response as any)?.[Symbol.asyncIterator] !== undefined}`,
    );

    // Try to check if it's iterable
    try {
      const isIterable = typeof (response as any)?.[Symbol.iterator] === "function";
      console.log(`Response has Symbol.iterator: ${isIterable}`);
    } catch (e) {
      console.log(`Error checking Symbol.iterator: ${e}`);
    }

    // Response comes as a string (binary data encoded as string), convert to Buffer
    const imageBytes = Buffer.from(response as any, "binary");
    console.log(`Image size: ${imageBytes.length} bytes`);
    console.log(`First 16 bytes (hex): ${imageBytes.subarray(0, 16).toString("hex")}`);

    // Verify PNG magic bytes
    const pngMagic = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    assert.isTrue(imageBytes.length > 0, "Image bytes should not be empty");
    assert.isTrue(imageBytes.length > 100, "Image should be substantial");
    assert.isTrue(
      imageBytes.subarray(0, 8).equals(pngMagic),
      "Response should be a valid PNG image (magic bytes mismatch)",
    );

    console.log("Test PASSED\n");
  });

  it("test_05: Get WMTS capabilities XML for mosaics", async () => {
    console.log("=" + "=".repeat(79));
    console.log("TEST: test_05_get_mosaics_wmts_capabilities");
    console.log("=" + "=".repeat(79));
    console.log(`Input - collection_id: ${collectionId}`);

    // Register search
    const registerSearchRequest = {
      filter: {
        op: "and" as const,
        args: [
          { op: "=" as const, args: [{ property: "collection" }, collectionId] },
          { op: ">=" as const, args: [{ property: "datetime" }, "2021-01-01T00:00:00Z"] },
          { op: "<=" as const, args: [{ property: "datetime" }, "2022-12-31T23:59:59Z"] },
        ],
      },
      filterLang: "cql2-json" as const,
      sortBy: [{ direction: "desc" as const, field: "datetime" }],
    };
    const registerResponse = await client.data.registerMosaicsSearch(registerSearchRequest as any);
    const searchId = registerResponse.searchId;
    console.log(`Using search ID: ${searchId}`);

    console.log("Calling: getMosaicsWmtsCapabilities(...)");
    const response = await client.data.getMosaicsWmtsCapabilities(searchId, "WebMercatorQuad", {
      tileFormat: "png",
      tileScale: 1,
      minZoom: 7,
      maxZoom: 13,
      assets: ["image"],
      assetBandIndices: "image|1,2,3",
    });

    console.log(`Response type: ${typeof response}`);

    // Response comes as a string (binary data encoded as string), convert to Buffer
    const xmlBytes = Buffer.from(response as any, "binary");
    console.log(`XML size: ${xmlBytes.length} bytes`);

    // Decode to string
    const xmlString = xmlBytes.toString("utf-8");
    console.log(`XML first 200 chars: ${xmlString.substring(0, 200)}`);

    // Validate XML structure
    assert.isTrue(xmlBytes.length > 0, "XML bytes should not be empty");
    assert.include(xmlString, "Capabilities", "Response should contain Capabilities element");
    assert.include(xmlString.toLowerCase(), "wmts", "Response should reference WMTS");
    assert.include(xmlString, "TileMatrix", "Response should contain TileMatrix information");

    console.log("Test PASSED\n");
  });

  it("test_06: Get mosaic assets for a specific point", async () => {
    console.log("=" + "=".repeat(79));
    console.log("TEST: test_06_get_mosaics_assets_for_point");
    console.log("=" + "=".repeat(79));
    console.log(`Input - collection_id: ${collectionId}`);
    const longitude = -84.432027519;
    const latitude = 33.63964764;
    console.log(`Input - point: longitude=${longitude}, latitude=${latitude}`);

    // Register search
    const registerSearchRequest = {
      filter: {
        op: "and" as const,
        args: [
          { op: "=" as const, args: [{ property: "collection" }, collectionId] },
          { op: ">=" as const, args: [{ property: "datetime" }, "2021-01-01T00:00:00Z"] },
          { op: "<=" as const, args: [{ property: "datetime" }, "2022-12-31T23:59:59Z"] },
        ],
      },
      filterLang: "cql2-json" as const,
      sortBy: [{ direction: "desc" as const, field: "datetime" }],
    };
    const registerResponse = await client.data.registerMosaicsSearch(registerSearchRequest as any);
    const searchId = registerResponse.searchId;
    console.log(`Using search ID: ${searchId}`);

    console.log("Calling: getMosaicsAssetsForPoint(...)");
    const response = await client.data.getMosaicsAssetsForPoint(searchId, longitude, latitude, {
      coordinateReferenceSystem: "EPSG:4326",
      itemsLimit: 100,
      exitWhenFull: true,
      scanLimit: 100,
      skipCovered: true,
      timeLimit: 30,
    });

    console.log(`Response type: ${typeof response}`);
    console.log(`Number of assets: ${Array.isArray(response) ? response.length : "N/A"}`);

    // Validate response structure
    assert.isArray(response, "Response should be an array");

    // If we have assets, validate structure
    if (response.length > 0) {
      const firstAsset = response[0];
      console.log(`First asset type: ${typeof firstAsset}`);

      assert.isDefined(firstAsset, "First asset should not be None");
      assert.property(firstAsset, "id", "Asset should have 'id' property");

      const assetId = firstAsset.id;
      console.log(`First asset ID: ${assetId}`);
      assert.isString(assetId, "Asset ID should be a string");
      assert.isTrue(assetId.length > 0, "Asset ID should not be empty");
    } else {
      console.log("No assets returned for this point");
    }

    console.log("Test PASSED\n");
  });

  it("test_07: Get mosaic assets for a specific tile", async () => {
    console.log("=" + "=".repeat(79));
    console.log("TEST: test_07_get_mosaics_assets_for_tile");
    console.log("=" + "=".repeat(79));
    console.log(`Input - collection_id: ${collectionId}`);
    console.log("Input - tile coordinates: z=13, x=2174, y=3282");

    // Register search
    const registerSearchRequest = {
      filter: {
        op: "and" as const,
        args: [
          { op: "=" as const, args: [{ property: "collection" }, collectionId] },
          { op: ">=" as const, args: [{ property: "datetime" }, "2021-01-01T00:00:00Z"] },
          { op: "<=" as const, args: [{ property: "datetime" }, "2022-12-31T23:59:59Z"] },
        ],
      },
      filterLang: "cql2-json" as const,
      sortBy: [{ direction: "desc" as const, field: "datetime" }],
    };
    const registerResponse = await client.data.registerMosaicsSearch(registerSearchRequest as any);
    const searchId = registerResponse.searchId;
    console.log(`Using search ID: ${searchId}`);

    console.log("Calling: getMosaicsAssetsForTile(...)");
    const response = await client.data.getMosaicsAssetsForTile(
      searchId,
      "WebMercatorQuad",
      collectionId,
      13,
      2174,
      3282,
    );

    console.log(`Response type: ${typeof response}`);
    console.log(`Response: ${JSON.stringify(response)}`);

    // Validate response is not None
    assert.isDefined(response, "Response should not be None");

    console.log("Test PASSED\n");
  });

  it("test_08: Create a static image", async () => {
    console.log("=" + "=".repeat(79));
    console.log("TEST: test_08_create_static_image");
    console.log("=" + "=".repeat(79));
    console.log(`Input - collection_id: ${collectionId}`);

    // Define geometry for the static image
    const geometry = {
      coordinates: [
        [
          [-84.45378097481053, 33.6567321707079],
          [-84.39805886744838, 33.6567321707079],
          [-84.39805886744838, 33.61945681366625],
          [-84.45378097481053, 33.61945681366625],
          [-84.45378097481053, 33.6567321707079],
        ],
      ],
      type: "Polygon" as const,
    };

    console.log(`Geometry: ${JSON.stringify(geometry)}`);

    // Create CQL2-JSON filter
    const cqlFilter = {
      op: "and" as const,
      args: [
        { op: "=" as const, args: [{ property: "collection" }, collectionId] },
        {
          op: "anyinteracts" as const,
          args: [
            { property: "datetime" },
            { interval: ["2023-01-01T00:00:00Z", "2023-12-31T00:00:00Z"] },
          ],
        },
      ],
    };

    // Create image request
    const imageRequest = {
      cql: cqlFilter,
      zoom: 13,
      geometry: geometry,
      renderParameters: `assets=image&asset_bidx=image|1,2,3&collection=${collectionId}`,
      columns: 1080,
      rows: 1080,
      imageSize: "1080x1080",
      showBranding: false,
    };

    console.log(
      `Image request: columns=${imageRequest.columns}, rows=${imageRequest.rows}, zoom=${imageRequest.zoom}`,
    );

    console.log("Calling: createStaticImage(...)");
    const response = await client.data.createStaticImage(collectionId, imageRequest as any);

    console.log(`Response type: ${typeof response}`);
    console.log(`Response: ${JSON.stringify(response)}`);

    assert.isDefined(response, "Response should not be None");

    console.log("Test PASSED\n");
  });

  it("test_09: Get a static image by ID", async () => {
    console.log("=" + "=".repeat(79));
    console.log("TEST: test_09_get_static_image");
    console.log("=" + "=".repeat(79));
    console.log(`Input - collection_id: ${collectionId}`);

    // First create a static image to get an ID
    const geometry = {
      coordinates: [
        [
          [-84.45378097481053, 33.6567321707079],
          [-84.39805886744838, 33.6567321707079],
          [-84.39805886744838, 33.61945681366625],
          [-84.45378097481053, 33.61945681366625],
          [-84.45378097481053, 33.6567321707079],
        ],
      ],
      type: "Polygon" as const,
    };

    const cqlFilter = {
      op: "and" as const,
      args: [
        { op: "=" as const, args: [{ property: "collection" }, collectionId] },
        {
          op: "anyinteracts" as const,
          args: [
            { property: "datetime" },
            { interval: ["2023-01-01T00:00:00Z", "2023-12-31T00:00:00Z"] },
          ],
        },
      ],
    };

    const imageRequest = {
      cql: cqlFilter,
      zoom: 13,
      geometry: geometry,
      renderParameters: `assets=image&asset_bidx=image|1,2,3&collection=${collectionId}`,
      columns: 1080,
      rows: 1080,
      imageSize: "1080x1080",
      showBranding: false,
    };

    const createResponse = await client.data.createStaticImage(collectionId, imageRequest as any);

    const url = createResponse.url;

    // Extract image ID from URL - split by '?' to remove query params, then get last path segment
    const imageId = url!.split("?")[0].split("/").pop()!;

    console.log(`Created image with ID: ${imageId}`);
    console.log(`Image URL: ${url}`);

    // Assert that we got a valid image ID
    assert.isDefined(imageId, "Image ID should be defined");
    assert.isTrue(imageId.length > 0, "Image ID should not be empty");

    console.log(`Calling: getStaticImage(collection_id='${collectionId}', id='${imageId}')`);
    const imageData = await client.data.getStaticImage(collectionId, imageId);

    console.log(`Image data type: ${typeof imageData}`);

    // Collect the streaming response
    const chunks: Buffer[] = [];
    for await (const chunk of imageData) {
      if (typeof chunk === "string") {
        chunks.push(Buffer.from(chunk, "binary"));
      } else if (typeof chunk === "number") {
        chunks.push(Buffer.from([chunk]));
      } else {
        chunks.push(Buffer.from(chunk as Uint8Array));
      }
    }
    const imageBytes = Buffer.concat(chunks);
    console.log(`Image size: ${imageBytes.length} bytes`);
    console.log(`First 16 bytes (hex): ${imageBytes.subarray(0, 16).toString("hex")}`);

    assert.isTrue(imageBytes.length > 0, "Image bytes should not be empty");

    console.log("Test PASSED\n");
  });
});
