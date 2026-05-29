// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { PlanetaryComputerProClient } from "../../src/index.js";
import { createRecorder, createClient } from "./utils/recordedClient.js";
import { getCollectionId, getItemId } from "./utils/envVars.js";
import { describe, it, beforeEach, afterEach, expect } from "vitest";

describe("STAC Specification compliance", () => {
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

  it("should have at least 10 conformance classes with core STAC URIs", async () => {
    const response = await client.stac.getConformanceClasses();
    expect(response.conformsTo.length).toBeGreaterThanOrEqual(10);
    const conformsTo = response.conformsTo;
    expect(conformsTo).toContain("https://api.stacspec.org/v1.0.0/core");
    expect(conformsTo).toContain("https://api.stacspec.org/v1.0.0/collections");
    expect(conformsTo).toContain("https://api.stacspec.org/v1.0.0/item-search");
  });

  it("should list at least 5 collections", async () => {
    const response = await client.stac.getCollections();
    expect(response.collections.length).toBeGreaterThanOrEqual(5);
    const first = response.collections[0];
    expect(first.id).toBeDefined();
    expect(first.extent).toBeDefined();
    const ids = response.collections.map((c: { id: string }) => c.id);
    expect(ids).toContain(collectionId);
  });

  it("should get a collection with full metadata", async () => {
    const response = await client.stac.getCollection(collectionId);
    expect(response.id).toBe(collectionId);
    expect(response.title).toBeTruthy();
    expect(response.extent).toBeDefined();
    expect(response.links.length).toBeGreaterThanOrEqual(1);
  });

  it("should search items with spatial filter (CQL2-JSON)", async () => {
    const response = await client.stac.search({
      collections: [collectionId],
      filterLang: "cql2-json",
      filter: {
        op: "s_intersects",
        args: [
          { property: "geometry" },
          {
            type: "Polygon",
            coordinates: [
              [
                [-84.464, 33.603],
                [-84.388, 33.603],
                [-84.388, 33.671],
                [-84.464, 33.671],
                [-84.464, 33.603],
              ],
            ],
          },
        ],
      },
      dateTime: "2021-01-01T00:00:00Z/2022-12-31T00:00:00Z",
      sortby: [{ field: "datetime", direction: "desc" }],
      limit: 50,
    } as any);
    expect(response.features.length).toBeGreaterThanOrEqual(2);
    expect(response.features[0].id).toBeDefined();
    expect(response.features[0].collection).toBe(collectionId);
  });

  it("should get item collection with limit", async () => {
    const response = await client.stac.getItemCollection(collectionId, { limit: 10 });
    expect(response.features.length).toBeGreaterThanOrEqual(5);
    const firstItem = response.features[0];
    expect(firstItem.assets).toBeDefined();
    expect(Object.keys(firstItem.assets).length).toBeGreaterThanOrEqual(2);
  });

  it("should get collection queryables with required properties", async () => {
    const response = await client.stac.getCollectionQueryables(collectionId);
    expect(response).toBeDefined();
    expect(response.additionalProperties).toBeDefined();

    // The queryable properties are nested under additionalProperties.properties
    const properties = (response.additionalProperties as any).properties;
    expect(properties).toBeDefined();
    const propNames = Object.keys(properties);
    expect(propNames.length).toBeGreaterThanOrEqual(3);

    // Validate common STAC queryables are present (matching Python test pattern)
    const commonQueryables = ["id", "datetime", "geometry"];
    for (const queryable of commonQueryables) {
      expect(propNames).toContain(queryable);
    }
  });

  it("should search items with temporal filter", async () => {
    const response = await client.stac.search({
      collections: [collectionId],
      dateTime: "2021-01-01T00:00:00Z/2022-12-31T00:00:00Z",
      limit: 10,
    } as any);
    expect(response.features.length).toBeGreaterThanOrEqual(5);
    for (const item of response.features) {
      expect(item.properties.datetime).toBeDefined();
    }
  });

  it("should search items with sorting (DESC and ASC)", async () => {
    const descResponse = await client.stac.search({
      collections: [collectionId],
      dateTime: "2021-01-01T00:00:00Z/2022-12-31T00:00:00Z",
      sortby: [{ field: "datetime", direction: "desc" }],
      limit: 5,
    } as any);
    expect(descResponse.features.length).toBeGreaterThanOrEqual(3);

    const ascResponse = await client.stac.search({
      collections: [collectionId],
      dateTime: "2021-01-01T00:00:00Z/2022-12-31T00:00:00Z",
      sortby: [{ field: "datetime", direction: "asc" }],
      limit: 5,
    } as any);
    expect(ascResponse.features.length).toBeGreaterThanOrEqual(3);
  });

  it("should get a specific item by ID", async () => {
    const response = await client.stac.getItem(collectionId, itemId);
    expect(response.id).toBe(itemId);
    expect(response.collection).toBe(collectionId);
    expect(response.geometry).toBeDefined();
    expect(response.properties).toBeDefined();
    expect(response.assets).toBeDefined();
    expect(Object.keys(response.assets).length).toBeGreaterThanOrEqual(2);
  });
});
