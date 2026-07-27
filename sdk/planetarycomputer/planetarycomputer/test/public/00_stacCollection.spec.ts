// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type {
  PlanetaryComputerProClient,
  RenderOption,
  StacMosaic,
  StacQueryable,
  TileSettings,
} from "../../src/index.js";
import { KnownRenderOptionType, KnownStacQueryableDefinitionDataType } from "../../src/index.js";
import { createRecorder, createClient } from "./utils/recordedClient.js";
import { getCollectionId } from "./utils/envVars.js";
import { isRestError } from "@azure/core-rest-pipeline";
import { isPng, toUint8Array } from "./utils/byteHelpers.js";
import { describe, it, beforeEach, afterEach, expect } from "vitest";

describe("STAC Collection operations", () => {
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

  it("should list collections", async () => {
    const response = await client.stac.getCollections();
    expect(response).toBeDefined();
    expect(response.collections).toBeDefined();
    expect(Array.isArray(response.collections)).toBe(true);
  });

  it("should get conformance classes", async () => {
    const response = await client.stac.getConformanceClasses();
    expect(response.conformsTo).toBeDefined();
    expect(Array.isArray(response.conformsTo)).toBe(true);
    expect(response.conformsTo.length).toBeGreaterThan(0);
  });

  it("should get a collection by ID", async () => {
    const response = await client.stac.getCollection(collectionId);
    expect(response.id).toBe(collectionId);
    expect(response.title).toBeDefined();
    expect(response.description).toBeDefined();
    expect(response.extent).toBeDefined();
    expect(response.license).toBeDefined();
  });

  it("should get partition type", async () => {
    const response = await client.stac.getPartitionType(collectionId);
    expect(response).toBeDefined();
    expect(response.scheme).toBeDefined();
  });

  it("should get render options", async () => {
    const response = await client.stac.getRenderOptions(collectionId);
    expect(Array.isArray(response)).toBe(true);
    for (const option of response) {
      expect(option.id).toBeDefined();
      expect(option.name).toBeDefined();
      expect(option.type).toBeDefined();
    }
  });

  it("should get tile settings", async () => {
    const response = await client.stac.getTileSettings(collectionId);
    expect(response).toBeDefined();
  });

  it("should get mosaics", async () => {
    const response = await client.stac.getMosaics(collectionId);
    expect(Array.isArray(response)).toBe(true);
    for (const mosaic of response) {
      expect(mosaic.id).toBeDefined();
      expect(mosaic.name).toBeDefined();
    }
  });

  it("should get collection queryables", async () => {
    const response = await client.stac.getCollectionQueryables(collectionId);
    expect(response).toBeDefined();
    expect(response.additionalProperties).toBeDefined();
  });

  it("should get global queryables", async () => {
    const response = await client.stac.getQueryables();
    expect(response).toBeDefined();
    expect(response.additionalProperties).toBeDefined();
  });

  it("should get collection configuration", async () => {
    const response = await client.stac.getCollectionConfiguration(collectionId);
    expect(response).toBeDefined();
  });

  // --- Collection Thumbnail ---

  it("should get collection thumbnail", async () => {
    const collection = await client.stac.getCollection(collectionId);
    if (!collection.assets || !("thumbnail" in collection.assets)) {
      // Collection has no thumbnail — skip gracefully
      return;
    }
    const response = await client.stac.getCollectionThumbnail(collectionId);
    const bytes = await toUint8Array(response);
    expect(bytes.length).toBeGreaterThan(100);
    expect(isPng(bytes)).toBe(true);
  });

  // --- Render Option CRUD ---

  it("should create, get, replace, and delete a render option", async () => {
    const renderOptionId = "test-natural-color-js";

    // Pre-cleanup
    try {
      await client.stac.deleteRenderOption(collectionId, renderOptionId);
    } catch {
      // May not exist
    }

    // Create
    const renderOption: RenderOption = {
      id: renderOptionId,
      name: "Test Natural Color",
      type: KnownRenderOptionType.RasterTile,
      options: "assets=image&asset_bidx=image|1,2,3",
      minZoom: 6,
    };
    const created = await client.stac.createRenderOption(collectionId, renderOption);
    expect(created.id).toBe(renderOptionId);
    expect(created.name).toBe("Test Natural Color");

    // Get
    const retrieved = await client.stac.getRenderOption(collectionId, renderOptionId);
    expect(retrieved.id).toBe(renderOptionId);

    // Replace
    const updated: RenderOption = {
      ...renderOption,
      name: "Test Natural Color Updated",
      description: "Updated description",
    };
    const replaced = await client.stac.replaceRenderOption(collectionId, renderOptionId, updated);
    expect(replaced.id).toBe(renderOptionId);
    expect(replaced.description).toBe("Updated description");

    // Delete
    await client.stac.deleteRenderOption(collectionId, renderOptionId);

    // Verify deletion
    try {
      await client.stac.getRenderOption(collectionId, renderOptionId);
      expect.unreachable("Should have thrown 404");
    } catch (e: unknown) {
      expect(isRestError(e) && e.statusCode === 404).toBe(true);
    }
  });

  // --- Mosaic CRUD ---

  it("should add, get, replace, and delete a mosaic", async () => {
    const mosaicId = "test-mosaic-js";

    // Pre-cleanup
    try {
      await client.stac.deleteMosaic(collectionId, mosaicId);
    } catch {
      // May not exist
    }

    // Add
    const mosaic: StacMosaic = {
      id: mosaicId,
      name: "Test Most Recent",
      cql: [],
    };
    const created = await client.stac.addMosaic(collectionId, mosaic);
    expect(created.id).toBe(mosaicId);
    expect(created.name).toBe("Test Most Recent");

    // Get
    const retrieved = await client.stac.getMosaic(collectionId, mosaicId);
    expect(retrieved.id).toBe(mosaicId);

    // Replace
    const updated: StacMosaic = {
      ...mosaic,
      description: "Updated mosaic description",
    };
    const replaced = await client.stac.replaceMosaic(collectionId, mosaicId, updated);
    expect(replaced.id).toBe(mosaicId);
    expect(replaced.description).toBe("Updated mosaic description");

    // Delete
    await client.stac.deleteMosaic(collectionId, mosaicId);

    // Verify deletion
    try {
      await client.stac.getMosaic(collectionId, mosaicId);
      expect.unreachable("Should have thrown 404");
    } catch (e: unknown) {
      expect(isRestError(e) && e.statusCode === 404).toBe(true);
    }
  });

  // --- Queryable CRUD ---

  it("should create, replace, and delete a queryable", async () => {
    const queryableName = "test:property_js";

    // Pre-cleanup
    try {
      await client.stac.deleteQueryable(collectionId, queryableName);
    } catch {
      // May not exist
    }

    // Create
    const queryable: StacQueryable = {
      name: queryableName,
      dataType: KnownStacQueryableDefinitionDataType.Number,
      createIndex: false,
      definition: { dataType: KnownStacQueryableDefinitionDataType.Number },
    };
    const created = await client.stac.createQueryables(collectionId, [queryable]);
    expect(Array.isArray(created)).toBe(true);
    expect(created.length).toBeGreaterThan(0);

    // Replace
    const updatedQueryable: StacQueryable = {
      name: queryableName,
      dataType: KnownStacQueryableDefinitionDataType.Number,
      createIndex: false,
      definition: { description: "Updated test property" },
    };
    const replaced = await client.stac.replaceQueryable(
      collectionId,
      queryableName,
      updatedQueryable,
    );
    expect(replaced).toBeDefined();

    // Delete
    await client.stac.deleteQueryable(collectionId, queryableName);

    // Verify deletion
    const queryables = await client.stac.getCollectionQueryables(collectionId);
    const properties = queryables.additionalProperties?.properties;
    if (properties) {
      expect(Object.keys(properties)).not.toContain(queryableName);
    }
  });

  // --- Tile Settings ---

  it("should replace tile settings", async () => {
    const tileSettings: TileSettings = {
      maxItemsPerTile: 35,
      minZoom: 6,
    };
    const response = await client.stac.replaceTileSettings(collectionId, tileSettings);
    expect(response).toBeDefined();
    expect(response.maxItemsPerTile).toBe(35);
    expect(response.minZoom).toBe(6);
  });
});
