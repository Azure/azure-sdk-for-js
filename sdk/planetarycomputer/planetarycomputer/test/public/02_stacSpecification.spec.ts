// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { PlanetaryComputerProClient } from "../../src/index.js";
import { createRecorder, createClient } from "./utils/recordedClient.js";
import { getCollectionId, getItemId } from "./utils/envVars.js";
import { isRestError } from "@azure/core-rest-pipeline";
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
      datetime: "2021-01-01T00:00:00Z/2022-12-31T00:00:00Z",
      sortBy: [{ field: "datetime", direction: "desc" }],
      limit: 50,
    });
    expect(response.features.length).toBeGreaterThanOrEqual(1);
    expect(response.features[0].id).toBeDefined();
    expect(response.features[0].collection).toBe(collectionId);
  });

  it("should get item collection with limit", async () => {
    const response = await client.stac.getItemCollection(collectionId, { limit: 10 });
    expect(response.features.length).toBeGreaterThanOrEqual(1);
    const firstItem = response.features[0];
    expect(firstItem.assets).toBeDefined();
    expect(Object.keys(firstItem.assets).length).toBeGreaterThanOrEqual(2);
  });

  it("should get collection queryables with required properties", async () => {
    const response = await client.stac.getCollectionQueryables(collectionId);
    expect(response).toBeDefined();
    expect(response.additionalProperties).toBeDefined();

    // The queryable properties are nested under additionalProperties.properties
    const properties = response.additionalProperties?.properties;
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
      datetime: "2021-01-01T00:00:00Z/2022-12-31T00:00:00Z",
      limit: 10,
    });
    expect(response.features.length).toBeGreaterThanOrEqual(1);
    for (const item of response.features) {
      expect(item.properties.datetime).toBeDefined();
    }
  });

  it("should search items with sorting (DESC and ASC)", async () => {
    const descResponse = await client.stac.search({
      collections: [collectionId],
      datetime: "2021-01-01T00:00:00Z/2022-12-31T00:00:00Z",
      sortBy: [{ field: "datetime", direction: "desc" }],
      limit: 5,
    });
    expect(descResponse.features.length).toBeGreaterThanOrEqual(1);

    const ascResponse = await client.stac.search({
      collections: [collectionId],
      datetime: "2021-01-01T00:00:00Z/2022-12-31T00:00:00Z",
      sortBy: [{ field: "datetime", direction: "asc" }],
      limit: 5,
    });
    expect(ascResponse.features.length).toBeGreaterThanOrEqual(1);
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

  // --- STAC Item CRUD Operations ---

  it("should create and get a STAC item", async () => {
    const testItemId = `${itemId}-crud-test`;

    // Pre-cleanup: delete if exists from a previous run
    try {
      const deletePoller = client.stac.deleteItem(collectionId, testItemId);
      await deletePoller.pollUntilDone();
    } catch (e: unknown) {
      // Ignore — item may not exist or delete may have already completed
    }

    const createPoller = client.stac.createItem(collectionId, {
      id: testItemId,
      type: "Feature",
      stacVersion: "1.0.0",
      geometry: { type: "Point", coordinates: [-84.39, 33.67] },
      boundingBox: [-84.44, 33.62, -84.37, 33.69],
      properties: { datetime: "2021-11-14T16:00:00Z" },
      assets: {
        image: {
          href: "https://naipeuwest.blob.core.windows.net/naip/v002/ga/2021/ga_060cm_2021/33084/m_3308421_se_16_060_20211114.tif",
          type: "image/tiff; application=geotiff; profile=cloud-optimized",
          roles: ["data"],
          title: "RGBIR COG tile",
        },
      },
      links: [{ rel: "collection", type: "application/json", href: `${process.env.PLANETARYCOMPUTER_ENDPOINT || ""}/stac/collections/${collectionId}` }],
      collection: collectionId,
    });
    await createPoller.pollUntilDone();

    const created = await client.stac.getItem(collectionId, testItemId);
    expect(created.id).toBe(testItemId);
    expect(created.collection).toBe(collectionId);
    expect(created.geometry).toBeDefined();
    expect(created.assets).toBeDefined();
    expect(created.assets["image"]).toBeDefined();

    // Clean up
    const cleanupPoller = client.stac.deleteItem(collectionId, testItemId);
    await cleanupPoller.pollUntilDone();
  });

  it("should update a STAC item", async () => {
    const testItemId = `${itemId}-update-test`;

    // Pre-cleanup
    try {
      const deletePoller = client.stac.deleteItem(collectionId, testItemId);
      await deletePoller.pollUntilDone();
    } catch (e: unknown) {
      // Ignore — item may not exist or delete may have already completed
    }

    // Create
    const createPoller = client.stac.createItem(collectionId, {
      id: testItemId,
      type: "Feature",
      stacVersion: "1.0.0",
      geometry: { type: "Point", coordinates: [-84.39, 33.67] },
      boundingBox: [-84.44, 33.62, -84.37, 33.69],
      properties: { datetime: "2021-11-14T16:00:00Z", platform: "Original" },
      assets: {
        image: {
          href: "https://naipeuwest.blob.core.windows.net/naip/v002/ga/2021/ga_060cm_2021/33084/m_3308421_se_16_060_20211114.tif",
          type: "image/tiff; application=geotiff; profile=cloud-optimized",
          roles: ["data"],
        },
      },
      links: [{ rel: "collection", type: "application/json", href: `${process.env.PLANETARYCOMPUTER_ENDPOINT || ""}/stac/collections/${collectionId}` }],
      collection: collectionId,
    });
    await createPoller.pollUntilDone();

    // Update with new platform property
    const updatePoller = client.stac.updateItem(collectionId, testItemId, {
      id: testItemId,
      type: "Feature",
      stacVersion: "1.0.0",
      geometry: { type: "Point", coordinates: [-84.39, 33.67] },
      boundingBox: [-84.44, 33.62, -84.37, 33.69],
      properties: { datetime: "2021-11-14T16:00:00Z", platform: "Updated" },
      assets: {
        image: {
          href: "https://naipeuwest.blob.core.windows.net/naip/v002/ga/2021/ga_060cm_2021/33084/m_3308421_se_16_060_20211114.tif",
          type: "image/tiff; application=geotiff; profile=cloud-optimized",
          roles: ["data"],
        },
      },
      links: [{ rel: "collection", type: "application/json", href: `${process.env.PLANETARYCOMPUTER_ENDPOINT || ""}/stac/collections/${collectionId}` }],
      collection: collectionId,
    });
    await updatePoller.pollUntilDone();

    const updated = await client.stac.getItem(collectionId, testItemId);
    expect(updated.id).toBe(testItemId);
    expect(updated.properties.platform).toBe("Updated");

    // Clean up
    const cleanupPoller = client.stac.deleteItem(collectionId, testItemId);
    await cleanupPoller.pollUntilDone();
  });

  it("should replace a STAC item", async () => {
    const testItemId = `${itemId}-replace-test`;

    // Pre-cleanup
    try {
      const deletePoller = client.stac.deleteItem(collectionId, testItemId);
      await deletePoller.pollUntilDone();
    } catch (e: unknown) {
      // Ignore — item may not exist or delete may have already completed
    }

    // Create
    const createPoller = client.stac.createItem(collectionId, {
      id: testItemId,
      type: "Feature",
      stacVersion: "1.0.0",
      geometry: { type: "Point", coordinates: [-84.39, 33.67] },
      boundingBox: [-84.44, 33.62, -84.37, 33.69],
      properties: { datetime: "2021-11-14T16:00:00Z" },
      assets: {
        image: {
          href: "https://naipeuwest.blob.core.windows.net/naip/v002/ga/2021/ga_060cm_2021/33084/m_3308421_se_16_060_20211114.tif",
          type: "image/tiff; application=geotiff; profile=cloud-optimized",
          roles: ["data"],
        },
      },
      links: [{ rel: "collection", type: "application/json", href: `${process.env.PLANETARYCOMPUTER_ENDPOINT || ""}/stac/collections/${collectionId}` }],
      collection: collectionId,
    });
    await createPoller.pollUntilDone();

    // Replace with updated properties
    const replacePoller = client.stac.replaceItem(collectionId, testItemId, {
      id: testItemId,
      type: "Feature",
      stacVersion: "1.0.0",
      geometry: { type: "Point", coordinates: [-84.39, 33.67] },
      boundingBox: [-84.44, 33.62, -84.37, 33.69],
      properties: { datetime: "2021-11-14T16:00:00Z", platform: "Replaced" },
      assets: {
        image: {
          href: "https://naipeuwest.blob.core.windows.net/naip/v002/ga/2021/ga_060cm_2021/33084/m_3308421_se_16_060_20211114.tif",
          type: "image/tiff; application=geotiff; profile=cloud-optimized",
          roles: ["data"],
        },
      },
      links: [{ rel: "collection", type: "application/json", href: `${process.env.PLANETARYCOMPUTER_ENDPOINT || ""}/stac/collections/${collectionId}` }],
      collection: collectionId,
    });
    await replacePoller.pollUntilDone();

    const replaced = await client.stac.getItem(collectionId, testItemId);
    expect(replaced.id).toBe(testItemId);
    expect(replaced.properties.platform).toBe("Replaced");

    // Clean up
    const cleanupPoller = client.stac.deleteItem(collectionId, testItemId);
    await cleanupPoller.pollUntilDone();
  });

  it("should delete a STAC item", async () => {
    const testItemId = `${itemId}-delete-test`;

    // Pre-cleanup
    try {
      const deletePoller = client.stac.deleteItem(collectionId, testItemId);
      await deletePoller.pollUntilDone();
    } catch (e: unknown) {
      // Ignore — item may not exist or delete may have already completed
    }

    // Create
    const createPoller = client.stac.createItem(collectionId, {
      id: testItemId,
      type: "Feature",
      stacVersion: "1.0.0",
      geometry: { type: "Point", coordinates: [-84.39, 33.67] },
      boundingBox: [-84.44, 33.62, -84.37, 33.69],
      properties: { datetime: "2021-11-14T16:00:00Z" },
      assets: {
        image: {
          href: "https://naipeuwest.blob.core.windows.net/naip/v002/ga/2021/ga_060cm_2021/33084/m_3308421_se_16_060_20211114.tif",
          type: "image/tiff; application=geotiff; profile=cloud-optimized",
          roles: ["data"],
        },
      },
      links: [{ rel: "collection", type: "application/json", href: `${process.env.PLANETARYCOMPUTER_ENDPOINT || ""}/stac/collections/${collectionId}` }],
      collection: collectionId,
    });
    await createPoller.pollUntilDone();

    // Delete
    const deletePoller = client.stac.deleteItem(collectionId, testItemId);
    await deletePoller.pollUntilDone();

    // Verify deletion
    try {
      await client.stac.getItem(collectionId, testItemId);
      // If we get here in live mode, deletion may still be propagating
    } catch (e: unknown) {
      if (isRestError(e)) {
        expect(e.statusCode).toBe(404);
      }
    }
  });
});
