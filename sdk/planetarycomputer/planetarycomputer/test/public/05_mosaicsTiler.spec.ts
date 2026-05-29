// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { PlanetaryComputerProClient } from "../../src/index.js";
import { createRecorder, createClient } from "./utils/recordedClient.js";
import { getCollectionId } from "./utils/envVars.js";
import { isPng, toUint8Array } from "./utils/byteHelpers.js";
import { describe, it, beforeEach, afterEach, expect } from "vitest";

describe("Mosaics Tiler operations", () => {
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

  async function registerSearch(): Promise<string> {
    const response = await client.data.registerMosaicsSearch({
      collections: [collectionId],
      filterLang: "cql2-json",
      filter: {
        op: "and",
        args: [
          { op: "=", args: [{ property: "collection" }, collectionId] },
          {
            op: "anyinteracts",
            args: [
              { property: "datetime" },
              { interval: ["2021-01-01T00:00:00Z", "2022-12-31T00:00:00Z"] },
            ],
          },
        ],
      },
      sortby: [{ field: "datetime", direction: "desc" }],
    } as any);
    expect(response.searchId).toBeTruthy();
    return response.searchId;
  }

  it("should register a mosaics search", async () => {
    const searchId = await registerSearch();
    expect(typeof searchId).toBe("string");
    expect(searchId.length).toBeGreaterThan(0);
  });

  it("should get mosaics search info", async () => {
    const searchId = await registerSearch();
    const response = await client.data.getSearchInfo(searchId);
    expect(response.search).toBeDefined();
    expect(response.search.hash).toBeTruthy();
  });

  it("should get mosaics tile JSON", async () => {
    const searchId = await registerSearch();
    const response = await client.data.getSearchTileJsonByTms(searchId, "WebMercatorQuad", {
      assets: ["image"],
      assetBandIndices: ["image|1,2,3"],
      tileScale: 1,
      minZoom: 9,
      collection: collectionId,
      tileFormat: "png",
    });
    expect(response.tileJson).toBeDefined();
    expect(response.tiles).toBeDefined();
    expect(response.tiles.length).toBeGreaterThanOrEqual(1);
  });

  it("should get a mosaics tile as PNG", async () => {
    const searchId = await registerSearch();
    const response = await client.data.getSearchTileByScaleAndFormat(
      searchId,
      "WebMercatorQuad",
      13,
      2174,
      3282,
      1,
      "png",
      {
        assets: ["image"],
        assetBandIndices: ["image|1,2,3"],
        collection: collectionId,
      },
    );
    const bytes = await toUint8Array(response);
    expect(bytes.length).toBeGreaterThan(100);
    expect(isPng(bytes)).toBe(true);
  });

  it("should get mosaics WMTS capabilities as XML", async () => {
    const searchId = await registerSearch();
    const response = await client.data.getSearchWmtsCapabilitiesByTms(searchId, "WebMercatorQuad", {
      tileFormat: "png",
      tileScale: 1,
      minZoom: 7,
      maxZoom: 13,
      assets: ["image"],
      assetBandIndices: ["image|1,2,3"],
    });
    const rawBody = (response as any).body as Uint8Array;
    expect(rawBody).toBeDefined();
    expect(rawBody.length).toBeGreaterThan(0);
  });

  it("should get mosaics assets for point", async () => {
    const searchId = await registerSearch();
    const response = await client.data.getSearchPointWithAssets(searchId, -84.432, 33.6396, {
      coordinateReferenceSystem: "EPSG:4326",
      itemsLimit: 100,
      exitWhenFull: true,
      scanLimit: 100,
      skipCovered: true,
      timeLimit: 30,
    });
    expect(Array.isArray(response)).toBe(true);
  });

  it("should get mosaics assets for tile", async () => {
    const searchId = await registerSearch();
    const response = await client.data.getSearchAssetsForTile(
      searchId,
      "WebMercatorQuad",
      collectionId,
      13,
      2174,
      3282,
    );
    expect(response).toBeDefined();
  });

  // TODO: Add getSearchPoint test when TypeSpec bug is fixed.
  // See: TilerCoreModelsResponsesPoint model mismatch — server does not return
  // band_names as a top-level field, causing JS SDK deserializer crash.

  it("should get search bbox crop", async () => {
    const searchId = await registerSearch();
    const response = await client.data.getSearchBboxCrop(
      searchId,
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

  it("should crop search feature from GeoJSON", async () => {
    const searchId = await registerSearch();
    const response = await client.data.cropSearchFeature(
      searchId,
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
