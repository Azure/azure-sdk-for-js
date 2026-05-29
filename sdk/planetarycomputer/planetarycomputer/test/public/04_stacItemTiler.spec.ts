// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { PlanetaryComputerProClient } from "../../src/index.js";
import { createRecorder, createClient } from "./utils/recordedClient.js";
import { getCollectionId, getItemId } from "./utils/envVars.js";
import { isPng, toUint8Array, decompressIfGzip } from "./utils/byteHelpers.js";
import { describe, it, beforeEach, afterEach, expect } from "vitest";

describe("STAC Item Tiler operations", () => {
  let recorder: Recorder;
  let client: PlanetaryComputerProClient;
  let collectionId: string;
  let itemId: string;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = createClient(recorder);
    collectionId = getCollectionId();
    itemId = getItemId();
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should get tile matrix definitions for WebMercatorQuad", async () => {
    const response = await client.data.getTileMatrixDefinitions("WebMercatorQuad");
    expect(response.id).toBeTruthy();
    expect(response.tileMatrices).toBeDefined();
    expect(response.tileMatrices.length).toBeGreaterThanOrEqual(1);
    expect(response.tileMatrices[0].tileWidth).toBe(256);
    expect(response.tileMatrices[0].tileHeight).toBe(256);
  });

  it("should list tile matrices", async () => {
    const response = await client.data.getTileMatrices();
    expect(response).toBeDefined();
    // Response may be an object with tileMatrixSets or an array
    const matrices = Array.isArray(response)
      ? response
      : ((response as any).tileMatrixSets ?? Object.keys(response));
    expect(matrices.length).toBeGreaterThanOrEqual(1);
  });

  it("should list available assets for an item", async () => {
    const response = await client.data.getItemAvailableAssets(collectionId, itemId);
    expect(response).toBeDefined();
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });

  it("should get item bounds", async () => {
    const response = await client.data.getItemBounds(collectionId, itemId);
    expect(response.bounds).toBeDefined();
    expect(response.bounds.length).toBe(4);
    const [minx, miny, maxx, maxy] = response.bounds;
    expect(minx).toBeLessThan(maxx);
    expect(miny).toBeLessThan(maxy);
  });

  it("should get item preview as PNG", async () => {
    const response = await client.data.getItemPreview(collectionId, itemId, {
      assets: ["image"],
      assetBandIndices: ["image|1,2,3"],
      format: "png",
      height: 512,
      width: 512,
    });
    const bytes = await toUint8Array(response);
    expect(bytes.length).toBeGreaterThan(100);
    expect(isPng(bytes)).toBe(true);
  });

  it("should get item info as GeoJSON", async () => {
    const response = await client.data.getItemInfoGeoJson(collectionId, itemId, {
      assets: ["image"],
    });
    expect(response).toBeDefined();
  });

  it("should list item statistics", async () => {
    const response = await client.data.getItemStatistics(collectionId, itemId, {
      assets: ["image"],
    });
    expect(response).toBeDefined();
  });

  it("should get WMTS capabilities as XML", async () => {
    const response = await client.data.getItemWmtsCapabilitiesByTms(
      collectionId,
      itemId,
      "WebMercatorQuad",
      {
        tileFormat: "png",
        tileScale: 1,
        minZoom: 7,
        maxZoom: 14,
        assets: ["image"],
        assetBandIndices: ["image|1,2,3"],
      },
    );
    // WMTS returns { body: Uint8Array } with XML content
    // The body may be gzip-compressed or already decompressed
    const rawBody = (response as any).body as Uint8Array;
    expect(rawBody).toBeDefined();
    expect(rawBody.length).toBeGreaterThan(0);
  });

  it("should get per-asset statistics", async () => {
    const response = await client.data.getItemAssetStatistics(collectionId, itemId, {
      assets: ["image"],
    });
    expect(response).toBeDefined();
    expect(response.additionalProperties?.["image"]).toBeDefined();
  });

  it("should crop feature from GeoJSON polygon", async () => {
    const response = await client.data.cropFeature(
      collectionId,
      itemId,
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-84.3906, 33.6714],
              [-84.3814, 33.6714],
              [-84.3814, 33.6806],
              [-84.3906, 33.6806],
              [-84.3906, 33.6714],
            ],
          ],
        },
        properties: {},
      } as any,
      {
        assets: ["image"],
        assetBandIndices: ["image|1,2,3"],
        format: "png",
      },
    );
    const bytes = await toUint8Array(response);
    expect(isPng(bytes)).toBe(true);
  });

  it("should crop feature with dimensions", async () => {
    const response = await client.data.cropFeatureWidthByHeight(
      collectionId,
      itemId,
      256,
      256,
      "png",
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-84.3906, 33.6714],
              [-84.3814, 33.6714],
              [-84.3814, 33.6806],
              [-84.3906, 33.6806],
              [-84.3906, 33.6714],
            ],
          ],
        },
        properties: {},
      } as any,
      {
        assets: ["image"],
        assetBandIndices: ["image|1,2,3"],
      },
    );
    const bytes = await toUint8Array(response);
    expect(isPng(bytes)).toBe(true);
  });

  it("should get bbox crop as PNG", async () => {
    const response = await client.data.getItemBboxCrop(
      collectionId,
      itemId,
      -84.393,
      33.6798,
      -84.367,
      33.7058,
      "png",
      {
        assets: ["image"],
        assetBandIndices: ["image|1,2,3"],
      },
    );
    const bytes = await toUint8Array(response);
    expect(isPng(bytes)).toBe(true);
  });

  it("should get bbox crop with dimensions as PNG", async () => {
    const response = await client.data.getItemBboxCropWithDimensions(
      collectionId,
      itemId,
      -84.393,
      33.6798,
      -84.367,
      33.7058,
      256,
      256,
      "png",
      {
        assets: ["image"],
        assetBandIndices: ["image|1,2,3"],
      },
    );
    const bytes = await toUint8Array(response);
    expect(isPng(bytes)).toBe(true);
  });
});
