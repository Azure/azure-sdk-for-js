// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates STAC item tiling operations including:
 * - Asset information retrieval
 * - Statistics
 * - Tiling
 * - Cropping
 * - Preview operations
 *
 * @description
 * This sample uses datasets and demonstrates how to save tiles and images locally.
 *
 * USAGE:
 *   npx ts-node 04_stacItemTiler.ts
 *
 *   Set the environment variable PLANETARYCOMPUTER_ENDPOINT with your endpoint URL.
 *   Set the environment variable PLANETARYCOMPUTER_COLLECTION_ID with your collection ID.
 *   Set the environment variable PLANETARYCOMPUTER_ITEM_ID with your item ID.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { PlanetaryComputerProClient, KnownTilerImageFormat } from "@azure/planetarycomputer";
import type { Feature, Polygon } from "@azure/planetarycomputer";
import * as fs from "fs";

// Environment variables
const endpoint = process.env.PLANETARYCOMPUTER_ENDPOINT;
const collectionId = process.env.PLANETARYCOMPUTER_COLLECTION_ID;
let itemId = process.env.PLANETARYCOMPUTER_ITEM_ID ?? "ga_m_3308421_se_16_060_20211114";

if (!endpoint) {
  throw new Error("PLANETARYCOMPUTER_ENDPOINT environment variable must be set");
}

if (!collectionId) {
  throw new Error("PLANETARYCOMPUTER_COLLECTION_ID environment variable must be set");
}

/**
 * Get a valid item ID from the collection.
 */
async function getValidItemId(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
): Promise<string> {
  const searchResult = await client.stac.search({
    collections: [targetCollectionId],
    limit: 1,
  });

  const items = searchResult.features || [];
  if (items.length === 0) {
    throw new Error(`No items found in collection '${targetCollectionId}'.`);
  }

  return items[0].id!;
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
 * Get tile matrix definitions for WebMercatorQuad.
 */
async function getTileMatrixDefinitions(client: PlanetaryComputerProClient): Promise<void> {
  console.log("Getting tile matrix definitions for WebMercatorQuad...");
  const result = await client.data.getTileMatrixDefinitions("WebMercatorQuad");
  console.log(`  ID: ${result.id}`);
  console.log(`  Number of tile matrices: ${result.tileMatrices?.length ?? 0}`);
}

/**
 * List all available tile matrices.
 */
async function listTileMatrices(client: PlanetaryComputerProClient): Promise<void> {
  console.log("Listing all tile matrices...");
  const result = await client.data.listTileMatrices();
  console.log(`  Available tile matrices: ${result.join(", ")}`);
}

/**
 * Get asset statistics for an item.
 */
async function getAssetStatistics(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
  targetItemId: string,
): Promise<void> {
  console.log(`Getting asset statistics for ${targetItemId}...`);
  const result = await client.data.getAssetStatistics(targetCollectionId, targetItemId, {
    assets: ["image"],
  });
  console.log(`  Statistics: ${JSON.stringify(result).substring(0, 200)}...`);
}

/**
 * List available assets for an item.
 */
async function listAvailableAssets(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
  targetItemId: string,
): Promise<void> {
  console.log(`Listing available assets for ${targetItemId}...`);
  const result = await client.data.listAvailableAssets(targetCollectionId, targetItemId);
  console.log(`  Available assets: ${result.join(", ")}`);
}

/**
 * Get basic info for dataset's assets.
 */
async function getItemAssetDetails(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
  targetItemId: string,
): Promise<void> {
  console.log(`Getting asset details for ${targetItemId}...`);
  const result = await client.data.getItemAssetDetails(targetCollectionId, targetItemId, {
    assets: ["image"],
  });
  console.log(`  Asset details: ${JSON.stringify(result).substring(0, 200)}...`);
}

/**
 * Get bounds for an item.
 */
async function getBounds(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
  targetItemId: string,
): Promise<number[]> {
  console.log(`Getting bounds for ${targetItemId}...`);
  const result = await client.data.getBounds(targetCollectionId, targetItemId);
  console.log(`  Bounds: ${JSON.stringify(result.bounds)}`);
  return result.bounds as number[];
}

/**
 * Crop an item using GeoJSON geometry.
 */
async function cropGeoJson(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
  targetItemId: string,
  geojson: Feature,
): Promise<void> {
  console.log(`Cropping with GeoJSON for ${targetItemId}...`);
  const response = await client.data.cropGeoJson(
    targetCollectionId,
    targetItemId,
    KnownTilerImageFormat.Png,
    geojson,
    {
      assets: ["image"],
      assetBandIndices: "image|1,2,3",
    },
  );
  await saveImage(response, `crop_geojson_${targetItemId}.png`);
}

/**
 * Crop an item using GeoJSON geometry with specific dimensions.
 */
async function cropGeoJsonWithDimensions(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
  targetItemId: string,
  geojson: Feature,
): Promise<void> {
  console.log(`Cropping with GeoJSON and dimensions for ${targetItemId}...`);
  const response = await client.data.cropGeoJsonWithDimensions(
    targetCollectionId,
    targetItemId,
    512,
    512,
    KnownTilerImageFormat.Png,
    geojson,
    {
      assets: ["image"],
      assetBandIndices: "image|1,2,3",
    },
  );
  await saveImage(response, `crop_geojson_dims_${targetItemId}.png`);
}

/**
 * Get statistics for a GeoJSON area.
 */
async function getGeoJsonStatistics(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
  targetItemId: string,
  geojson: Feature,
): Promise<void> {
  console.log(`Getting GeoJSON statistics for ${targetItemId}...`);
  const result = await client.data.getGeoJsonStatistics(targetCollectionId, targetItemId, geojson, {
    assets: ["image"],
  });
  console.log(`  GeoJSON statistics: ${JSON.stringify(result).substring(0, 200)}...`);
}

/**
 * Get info for GeoJSON.
 */
async function getInfoGeoJson(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
  targetItemId: string,
): Promise<void> {
  console.log(`Getting info GeoJSON for ${targetItemId}...`);
  const result = await client.data.getInfoGeoJson(targetCollectionId, targetItemId, {
    assets: ["image"],
  });
  console.log(`  Info GeoJSON: ${JSON.stringify(result).substring(0, 200)}...`);
}

/**
 * Get a part of an item with specific bounds.
 */
async function getPart(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
  targetItemId: string,
  bounds: number[],
): Promise<void> {
  console.log(`Getting part of ${targetItemId}...`);
  const response = await client.data.getPart(
    targetCollectionId,
    targetItemId,
    bounds[0],
    bounds[1],
    bounds[2],
    bounds[3],
    KnownTilerImageFormat.Png,
    {
      width: 512,
      height: 512,
      assets: ["image"],
      assetBandIndices: "image|1,2,3",
    },
  );
  await saveImage(response, `part_${targetItemId}.png`);
}

/**
 * Get a part of an item with specific bounds and dimensions.
 */
async function getPartWithDimensions(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
  targetItemId: string,
  bounds: number[],
): Promise<void> {
  console.log(`Getting part with dimensions of ${targetItemId}...`);
  const response = await client.data.getPartWithDimensions(
    targetCollectionId,
    targetItemId,
    bounds[0],
    bounds[1],
    bounds[2],
    bounds[3],
    512,
    512,
    KnownTilerImageFormat.Png,
    {
      assets: ["image"],
      assetBandIndices: "image|1,2,3",
    },
  );
  await saveImage(response, `part_dims_${targetItemId}.png`);
}

/**
 * Get point value at a specific location.
 */
async function getPoint(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
  targetItemId: string,
  point: number[],
): Promise<void> {
  console.log(`Getting point value at (${point[0]}, ${point[1]})...`);
  const result = await client.data.getPoint(targetCollectionId, targetItemId, point[0], point[1], {
    assets: ["image"],
    noData: 0,
  });
  console.log(`  Point values: ${JSON.stringify(result)}`);
}

/**
 * Get a preview of an item.
 */
async function getPreview(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
  targetItemId: string,
): Promise<void> {
  console.log(`Getting preview of ${targetItemId}...`);
  const response = await client.data.getPreview(targetCollectionId, targetItemId, {
    format: KnownTilerImageFormat.Png,
    width: 512,
    height: 512,
    assets: ["image"],
    assetBandIndices: "image|1,2,3",
  });
  await saveImage(response, `preview_${targetItemId}.png`);
}

/**
 * Get a preview of an item with specific format.
 */
async function getPreviewWithFormat(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
  targetItemId: string,
): Promise<void> {
  console.log(`Getting preview with format of ${targetItemId}...`);
  const response = await client.data.getPreviewWithFormat(
    targetCollectionId,
    targetItemId,
    KnownTilerImageFormat.Png,
    {
      width: 512,
      height: 512,
      assets: ["image"],
      assetBandIndices: "image|1,2,3",
    },
  );
  await saveImage(response, `preview_format_${targetItemId}.png`);
}

/**
 * List statistics for an item.
 */
async function listStatistics(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
  targetItemId: string,
): Promise<void> {
  console.log(`Listing statistics for ${targetItemId}...`);
  const result = await client.data.listStatistics(targetCollectionId, targetItemId, {
    assets: ["image"],
  });
  console.log(`  Statistics: ${JSON.stringify(result).substring(0, 200)}...`);
}

/**
 * Get TileJSON for an item.
 */
async function getTileJson(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
  targetItemId: string,
): Promise<void> {
  console.log(`Getting TileJSON for ${targetItemId}...`);
  const result = await client.data.getTileJson(
    targetCollectionId,
    targetItemId,
    "WebMercatorQuad",
    {
      tileFormat: KnownTilerImageFormat.Png,
      tileScale: 1,
      minZoom: 7,
      maxZoom: 14,
      assets: ["image"],
      assetBandIndices: "image|1,2,3",
    },
  );
  console.log(`  TileJSON: ${JSON.stringify(result).substring(0, 200)}...`);
}

/**
 * Calculate tile coordinates from lat/lon at a given zoom level.
 */
function latLonToTile(lat: number, lon: number, zoom: number): { x: number; y: number } {
  const n = Math.pow(2, zoom);
  const x = Math.floor(((lon + 180) / 360) * n);
  const latRad = (lat * Math.PI) / 180;
  const y = Math.floor(((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n);
  return { x, y };
}

/**
 * Get a specific tile and save it locally.
 */
async function getTile(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
  targetItemId: string,
  bounds: number[],
): Promise<void> {
  // Calculate tile coordinates from item's center point
  const centerLon = (bounds[0] + bounds[2]) / 2;
  const centerLat = (bounds[1] + bounds[3]) / 2;
  const zoom = 14;
  const { x, y } = latLonToTile(centerLat, centerLon, zoom);

  console.log(`Getting tile for ${targetItemId} at z=${zoom}, x=${x}, y=${y}...`);
  const response = await client.data.getTile(
    targetCollectionId,
    targetItemId,
    "WebMercatorQuad",
    zoom,
    x,
    y,
    1,
    "png",
    {
      assets: ["image"],
      assetBandIndices: "image|1,2,3",
    },
  );
  await saveImage(response, `tile_${targetItemId}_z${zoom}_x${x}_y${y}.png`);
}

/**
 * Get WMTS capabilities and save it locally.
 */
async function getWmtsCapabilities(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
  targetItemId: string,
): Promise<void> {
  console.log(`Getting WMTS capabilities for ${targetItemId}...`);
  const response = await client.data.getWmtsCapabilities(
    targetCollectionId,
    targetItemId,
    "WebMercatorQuad",
    {
      tileFormat: KnownTilerImageFormat.Png,
      tileScale: 1,
      minZoom: 7,
      maxZoom: 14,
      assets: ["image"],
      assetBandIndices: "image|1,2,3",
    },
  );

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
  const filename = `wmts_capabilities_${targetItemId}.xml`;
  fs.writeFileSync(filename, xmlString, "utf-8");
  console.log(`WMTS capabilities saved as: ${filename} (${xmlBytes.length} bytes)`);
}

/**
 * Main execution function.
 */
async function main(): Promise<void> {
  console.log(`Connected to: ${endpoint}`);
  console.log(`Collection ID: ${collectionId}`);

  // Create client
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(endpoint, credential);

  // Get a valid item ID from the collection
  console.log("Finding a valid item in the collection...");
  itemId = await getValidItemId(client, collectionId);
  console.log(`Using Item ID: ${itemId}\n`);

  // Get item's actual bounds first
  const actualBounds = await getBounds(client, collectionId, itemId);

  // Calculate center point within the item's actual bounds
  const centerLon = (actualBounds[0] + actualBounds[2]) / 2;
  const centerLat = (actualBounds[1] + actualBounds[3]) / 2;
  const point = [centerLon, centerLat];

  // Use bounds within the item's actual bounds (shrink by 10%)
  const boundsWidth = actualBounds[2] - actualBounds[0];
  const boundsHeight = actualBounds[3] - actualBounds[1];
  const margin = 0.1;
  const bounds = [
    actualBounds[0] + boundsWidth * margin,
    actualBounds[1] + boundsHeight * margin,
    actualBounds[2] - boundsWidth * margin,
    actualBounds[3] - boundsHeight * margin,
  ];

  // Create a SMALL GeoJSON geometry for crop operations (large areas cause 502 server errors)
  // Use ~0.02 degree square area centered in the item (similar to test sizes)
  const cropSize = 0.01; // ~1km at this latitude
  const cropGeometry: Polygon = {
    type: "Polygon",
    coordinates: [
      [
        [centerLon - cropSize, centerLat - cropSize], // bottom-left
        [centerLon + cropSize, centerLat - cropSize], // bottom-right
        [centerLon + cropSize, centerLat + cropSize], // top-right
        [centerLon - cropSize, centerLat + cropSize], // top-left
        [centerLon - cropSize, centerLat - cropSize], // close ring
      ],
    ],
  };

  const cropGeojson: Feature = {
    type: "Feature",
    geometry: cropGeometry,
    properties: {},
  };

  // Create larger GeoJSON for non-crop operations (statistics, info)
  const geometry: Polygon = {
    type: "Polygon",
    coordinates: [
      [
        [bounds[0], bounds[1]], // bottom-left
        [bounds[2], bounds[1]], // bottom-right
        [bounds[2], bounds[3]], // top-right
        [bounds[0], bounds[3]], // top-left
        [bounds[0], bounds[1]], // close ring
      ],
    ],
  };

  const geojson: Feature = {
    type: "Feature",
    geometry,
    properties: {},
  };

  // Helper function to run operations with error handling
  async function tryOperation(name: string, operation: () => Promise<void>): Promise<void> {
    try {
      await operation();
    } catch (error: any) {
      console.log(`  [${name}] Failed: ${error.message || error}`);
    }
  }

  // Execute tiler operations with error handling
  await getTileMatrixDefinitions(client);
  await listTileMatrices(client);
  await tryOperation("getAssetStatistics", () => getAssetStatistics(client, collectionId, itemId));
  await tryOperation("listAvailableAssets", () =>
    listAvailableAssets(client, collectionId, itemId),
  );
  await tryOperation("getItemAssetDetails", () =>
    getItemAssetDetails(client, collectionId, itemId),
  );
  // getBounds already called above
  // Use smaller cropGeojson for crop operations (large areas cause 502 server timeout)
  await tryOperation("cropGeoJson", () => cropGeoJson(client, collectionId, itemId, cropGeojson));
  await tryOperation("cropGeoJsonWithDimensions", () =>
    cropGeoJsonWithDimensions(client, collectionId, itemId, cropGeojson),
  );
  await tryOperation("getGeoJsonStatistics", () =>
    getGeoJsonStatistics(client, collectionId, itemId, geojson),
  );
  await tryOperation("getInfoGeoJson", () => getInfoGeoJson(client, collectionId, itemId));
  await tryOperation("getPart", () => getPart(client, collectionId, itemId, bounds));
  await tryOperation("getPartWithDimensions", () =>
    getPartWithDimensions(client, collectionId, itemId, bounds),
  );
  await tryOperation("getPoint", () => getPoint(client, collectionId, itemId, point));
  await tryOperation("getPreview", () => getPreview(client, collectionId, itemId));
  await tryOperation("getPreviewWithFormat", () =>
    getPreviewWithFormat(client, collectionId, itemId),
  );
  await tryOperation("listStatistics", () => listStatistics(client, collectionId, itemId));
  await tryOperation("getTileJson", () => getTileJson(client, collectionId, itemId));
  await tryOperation("getTile", () => getTile(client, collectionId, itemId, actualBounds));
  await tryOperation("getWmtsCapabilities", () =>
    getWmtsCapabilities(client, collectionId, itemId),
  );

  console.log("\nSTAC Item Tiler Operations Complete");
}

main().catch(console.error);
