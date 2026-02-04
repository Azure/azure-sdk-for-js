// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates mosaic tiling and static image operations including:
 * - Registering mosaics searches
 * - Getting mosaics search info
 * - Getting mosaics tiles
 * - Getting WMTS capabilities
 * - Creating and retrieving static images
 *
 * @description
 * This sample uses datasets and demonstrates how to save tiles and images locally.
 *
 * USAGE:
 *   npx ts-node 05_mosaicsTiler.ts
 *
 *   Set the environment variable PLANETARYCOMPUTER_ENDPOINT with your endpoint URL.
 *   Set the environment variable PLANETARYCOMPUTER_COLLECTION_ID with your collection ID.
 */

import { DefaultAzureCredential } from "@azure/identity";
import {
  PlanetaryComputerProClient,
  KnownFilterLanguage,
  KnownStacSearchSortingDirection,
  KnownTilerImageFormat,
} from "@azure/planetarycomputer";
import type {
  StacSearchParameters,
  StacSortExtension,
  ImageParameters,
  Polygon,
  TilerStacSearchRegistration,
} from "@azure/planetarycomputer";
import * as fs from "fs";

// Environment variables
const endpoint = process.env.PLANETARYCOMPUTER_ENDPOINT;
const collectionId = process.env.PLANETARYCOMPUTER_COLLECTION_ID;

if (!endpoint) {
  throw new Error("PLANETARYCOMPUTER_ENDPOINT environment variable must be set");
}

if (!collectionId) {
  throw new Error("PLANETARYCOMPUTER_COLLECTION_ID environment variable must be set");
}

/**
 * Helper to save image response data locally.
 * Handles both direct Uint8Array/Buffer responses and AsyncIterable<Uint8Array> streams.
 */
async function saveImage(
  response: Uint8Array | AsyncIterable<Uint8Array>,
  filename: string,
): Promise<void> {
  let imageBytes: Uint8Array;

  if (response instanceof Uint8Array) {
    // Direct Buffer/Uint8Array response
    imageBytes = response;
  } else if (typeof (response as any)[Symbol.asyncIterator] === "function") {
    // AsyncIterable stream response
    const chunks: Uint8Array[] = [];
    for await (const chunk of response as AsyncIterable<Uint8Array>) {
      chunks.push(chunk);
    }
    const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
    imageBytes = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
      imageBytes.set(chunk, offset);
      offset += chunk.length;
    }
  } else {
    throw new Error(`Unexpected response type: ${typeof response}`);
  }

  fs.writeFileSync(filename, imageBytes);
  console.log(`Image saved as: ${filename} (${imageBytes.length} bytes)`);
}

/**
 * Register a search for mosaics filtered to 2021-2022.
 */
async function registerMosaicsSearch(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
): Promise<TilerStacSearchRegistration> {
  console.log("Registering mosaics search...");

  const registerSearchRequest: StacSearchParameters = {
    filter: {
      op: "and",
      args: [
        { op: "=", args: [{ property: "collection" }, targetCollectionId] },
        { op: ">=", args: [{ property: "datetime" }, "2021-01-01T00:00:00Z"] },
        { op: "<=", args: [{ property: "datetime" }, "2022-12-31T23:59:59Z"] },
      ],
    },
    filterLang: KnownFilterLanguage.Cql2Json,
    sortBy: [
      {
        direction: KnownStacSearchSortingDirection.Desc,
        field: "datetime",
      } as StacSortExtension,
    ],
  };

  const response = await client.data.registerMosaicsSearch(registerSearchRequest);
  console.log(`  Registered search ID: ${response.searchId}`);

  return response;
}

/**
 * Get mosaics search info.
 */
async function getMosaicsSearchInfo(
  client: PlanetaryComputerProClient,
  searchId: string,
): Promise<Record<string, unknown>> {
  console.log(`Getting mosaics search info for ${searchId}...`);

  const response = await client.data.getMosaicsSearchInfo(searchId);
  const search = response.search;

  console.log(`  Search hash: ${search?.hash}`);

  return search as Record<string, unknown>;
}

/**
 * Get mosaics tile JSON.
 */
async function getMosaicsTileJson(
  client: PlanetaryComputerProClient,
  searchId: string,
  targetCollectionId: string,
): Promise<void> {
  console.log(`Getting mosaics tile JSON for ${searchId}...`);

  const response = await client.data.getMosaicsTileJson(searchId, "WebMercatorQuad", {
    assets: ["image"],
    assetBandIndices: "image|1,2,3",
    tileScale: 1,
    minZoom: 9,
    collection: targetCollectionId,
    tileFormat: "png",
  });

  console.log(`  TileJSON tiles URL: ${response.tiles?.[0]?.substring(0, 80)}...`);
}

/**
 * Get a mosaic tile and save it locally.
 */
async function getMosaicsTile(
  client: PlanetaryComputerProClient,
  searchId: string,
  targetCollectionId: string,
): Promise<void> {
  console.log(`Getting mosaic tile for ${searchId}...`);

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
      collection: targetCollectionId,
    },
  );

  await saveImage(response, `mosaic_tile_${searchId}_z13_x2174_y3282.png`);
}

/**
 * Get WMTS capabilities for mosaics and save it locally.
 */
async function getMosaicsWmtsCapabilities(
  client: PlanetaryComputerProClient,
  searchId: string,
): Promise<void> {
  console.log(`Getting WMTS capabilities for ${searchId}...`);

  const response = await client.data.getMosaicsWmtsCapabilities(searchId, "WebMercatorQuad", {
    tileFormat: KnownTilerImageFormat.Png,
    tileScale: 1,
    minZoom: 7,
    maxZoom: 13,
    assets: ["image"],
    assetBandIndices: "image|1,2,3",
  });

  // Handle both direct Uint8Array/Buffer and AsyncIterable responses
  let xmlBytes: Uint8Array;

  if (response instanceof Uint8Array) {
    xmlBytes = response;
  } else if (typeof (response as any)[Symbol.asyncIterator] === "function") {
    const chunks: Uint8Array[] = [];
    for await (const chunk of response as AsyncIterable<Uint8Array>) {
      chunks.push(chunk);
    }
    const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
    xmlBytes = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
      xmlBytes.set(chunk, offset);
      offset += chunk.length;
    }
  } else {
    throw new Error(`Unexpected response type: ${typeof response}`);
  }

  const xmlString = new TextDecoder().decode(xmlBytes);
  const filename = `wmts_capabilities_${searchId}.xml`;
  fs.writeFileSync(filename, xmlString, "utf-8");
  console.log(`  WMTS capabilities saved as: ${filename} (${xmlBytes.length} bytes)`);
}

/**
 * Get mosaic assets for a specific point.
 */
async function getMosaicsAssetsForPoint(
  client: PlanetaryComputerProClient,
  searchId: string,
): Promise<void> {
  // Using center point from the coordinate bbox
  const longitude = -84.43202751899601;
  const latitude = 33.639647639722273;

  console.log(`Getting mosaic assets for point (${longitude}, ${latitude})...`);

  const response = await client.data.getMosaicsAssetsForPoint(searchId, longitude, latitude, {
    coordinateReferenceSystem: "EPSG:4326",
    itemsLimit: 100,
    exitWhenFull: true,
    scanLimit: 100,
    skipCovered: true,
    timeLimit: 30,
  });

  if (Array.isArray(response) && response.length > 0) {
    const firstAsset = response[0] as Record<string, unknown>;
    console.log(`  Assets for point: ${firstAsset.id}`);
  } else {
    console.log(`  No assets found for point`);
  }
}

/**
 * Get mosaic assets for a specific tile.
 */
async function getMosaicsAssetsForTile(
  client: PlanetaryComputerProClient,
  searchId: string,
  targetCollectionId: string,
): Promise<void> {
  console.log(`Getting mosaic assets for tile (z=13, x=2174, y=3282)...`);

  const response = await client.data.getMosaicsAssetsForTile(
    searchId,
    "WebMercatorQuad",
    targetCollectionId,
    13,
    2174,
    3282,
  );

  console.log(`  Assets for tile: ${JSON.stringify(response).substring(0, 100)}...`);
}

/**
 * Create a static image from a STAC item.
 * NOTE: This operation creates an image asynchronously.
 */
async function createStaticImage(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
): Promise<string> {
  console.log("Creating static image...");

  // Define CQL filter with date range
  const cqlFilter = {
    op: "and",
    args: [
      { op: "=", args: [{ property: "collection" }, targetCollectionId] },
      {
        op: "anyinteracts",
        args: [
          { property: "datetime" },
          { interval: ["2023-01-01T00:00:00Z", "2023-12-31T00:00:00Z"] },
        ],
      },
    ],
  };

  // Define geometry for the image (within dataset bounds)
  const geometry: Polygon = {
    type: "Polygon",
    coordinates: [
      [
        [-84.45378097481053, 33.6567321707079],
        [-84.39805886744838, 33.6567321707079],
        [-84.39805886744838, 33.61945681366625],
        [-84.45378097481053, 33.61945681366625],
        [-84.45378097481053, 33.6567321707079],
      ],
    ],
  };

  // Create image request with rendering parameters
  const imageRequest: ImageParameters = {
    cql: cqlFilter,
    zoom: 13,
    geometry,
    renderParameters: `assets=image&asset_bidx=image|1,2,3&collection=${targetCollectionId}`,
    columns: 1080,
    rows: 1080,
    imageSize: "1080x1080",
    showBranding: false,
  };

  // Create static image
  const imageResponse = await client.data.createStaticImage(targetCollectionId, imageRequest);

  // Extract image ID from the response URL
  const imageId = imageResponse.url?.split("?")[0].split("/").pop() ?? "unknown";
  console.log(`  Created static image with ID: ${imageId}`);
  console.log(`  Image URL: ${imageResponse.url}`);

  return imageId;
}

/**
 * Retrieve a static image by its ID.
 */
async function getStaticImage(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
  imageId: string,
): Promise<void> {
  console.log(`Getting static image ${imageId}...`);

  const response = await client.data.getStaticImage(targetCollectionId, imageId);

  await saveImage(response, `static_image_${imageId}`);
}

/**
 * Main execution function.
 */
async function main(): Promise<void> {
  console.log(`Connected to: ${endpoint}`);
  console.log(`Collection ID: ${collectionId}\n`);

  // Create client
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(endpoint, credential);

  // Execute mosaic tiler operations
  const registerResponse = await registerMosaicsSearch(client, collectionId);
  const searchId = registerResponse.searchId;

  await getMosaicsSearchInfo(client, searchId);
  await getMosaicsTileJson(client, searchId, collectionId);
  await getMosaicsTile(client, searchId, collectionId);
  await getMosaicsWmtsCapabilities(client, searchId);
  await getMosaicsAssetsForPoint(client, searchId);
  await getMosaicsAssetsForTile(client, searchId, collectionId);

  // Execute static image operations
  const imageId = await createStaticImage(client, collectionId);
  await getStaticImage(client, collectionId, imageId);

  console.log("\nMosaics Tiler Operations Complete");
}

main().catch(console.error);
