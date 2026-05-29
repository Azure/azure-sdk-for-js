// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { PlanetaryComputerProClient } from "../../src/index.js";
import { createRecorder, createClient } from "./utils/recordedClient.js";
import { getCollectionId } from "./utils/envVars.js";
import { isPng, toUint8Array } from "./utils/byteHelpers.js";
import { describe, it, beforeEach, afterEach, expect } from "vitest";

describe("Collection Tiler operations", () => {
  let recorder: Recorder;
  let client: PlanetaryComputerProClient;
  let collectionId: string;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = createClient(recorder);
    collectionId = getCollectionId();
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should get collection info", async () => {
    const response = await client.data.getCollectionInfo(collectionId);
    expect(response).toBeDefined();
  });

  // TODO: Add getCollectionPoint test when TypeSpec bug is fixed.
  // Same TilerCoreModelsResponsesPoint band_names mismatch as in 05_mosaicsTiler.

  it("should get collection point assets", async () => {
    const response = await client.data.getCollectionPointAssets(collectionId, -84.386, 33.676);
    expect(response).toBeDefined();
  });

  it("should get collection tile as PNG", async () => {
    const response = await client.data.getCollectionTileByScaleAndFormat(
      collectionId,
      "WebMercatorQuad",
      14,
      4349,
      6564,
      1,
      "png",
      {
        assets: ["image"],
        assetBandIndices: ["image|1,2,3"],
      },
    );
    const bytes = await toUint8Array(response);
    expect(bytes.length).toBeGreaterThan(0);
    expect(isPng(bytes)).toBe(true);
  });

  it("should get collection tile JSON", async () => {
    const response = await client.data.getCollectionTileJson(collectionId, {
      assets: ["image"],
      assetBandIndices: ["image|1,2,3"],
    });
    expect(response).toBeDefined();
  });

  it("should get collection bbox crop", async () => {
    const response = await client.data.getCollectionBboxCrop(
      collectionId,
      -84.39,
      33.68,
      -84.385,
      33.685,
      "png",
      {
        assets: ["image"],
        assetBandIndices: ["image|1,2,3"],
      },
    );
    const bytes = await toUint8Array(response);
    expect(bytes.length).toBeGreaterThan(0);
  });

  it("should get collection WMTS capabilities", async () => {
    const response = await client.data.getCollectionWmtsCapabilities(collectionId, {
      assets: ["image"],
    });
    const rawBody = (response as any).body as Uint8Array;
    expect(rawBody).toBeDefined();
    expect(rawBody.length).toBeGreaterThan(0);
  });

  it("should crop collection feature from GeoJSON", async () => {
    const response = await client.data.cropCollectionFeature(
      collectionId,
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-84.39, 33.68],
              [-84.385, 33.68],
              [-84.385, 33.685],
              [-84.39, 33.685],
              [-84.39, 33.68],
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
    expect(bytes.length).toBeGreaterThan(0);
  });
});
