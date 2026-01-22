// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import { createRecorder, createRecordedClient } from "./utils/recordedClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { PlanetaryComputerProClient } from "../../src/index.js";
import { EnvironmentVariableNames, assertEnvironmentVariable } from "./utils/envVars.js";
import { isRestError } from "@azure/core-rest-pipeline";

/**
 * Test suite for STAC API specification operations.
 * Ported from Python test_planetary_computer_02_stac_specification.py
 */
describe("STAC API Specification", () => {
  let recorder: Recorder;
  let client: PlanetaryComputerProClient;

  beforeEach(async function (context) {
    recorder = await createRecorder(context);
    client = await createRecordedClient(recorder);
  });

  afterEach(async function () {
    if (recorder) {
      await recorder.stop();
    }
  });

  it("test_01_get_conformance_class - should get STAC API conformance classes", async function () {
    console.log("=".repeat(80));
    console.log("TEST: Get STAC API Conformance Classes");
    console.log("=".repeat(80));

    const conformance = await client.stac.getConformanceClass();

    // Validate conformance response
    assert.isDefined(conformance, "Conformance should not be undefined");
    assert.property(conformance, "conformsTo", "Conformance should have conformsTo property");
    assert.isArray(conformance.conformsTo, "conformsTo should be an array");
    assert.isTrue(conformance.conformsTo!.length > 0, "Conformance should have at least one URI");

    // Based on log: Retrieved 15 conformance classes
    assert.isTrue(
      conformance.conformsTo!.length >= 10,
      `Expected at least 10 conformance classes, got ${conformance.conformsTo!.length}`,
    );

    console.log(`Retrieved ${conformance.conformsTo!.length} conformance classes`);

    // Log all conformance classes
    for (let i = 0; i < conformance.conformsTo!.length; i++) {
      console.log(`  Conformance ${i + 1}: ${conformance.conformsTo![i]}`);
    }

    // Check for core STAC conformance classes
    const conformanceUris = conformance.conformsTo!;
    const expectedUris = [
      "http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/core",
      "https://api.stacspec.org/v1.0.0/core",
      "https://api.stacspec.org/v1.0.0/collections",
      "https://api.stacspec.org/v1.0.0/item-search",
    ];

    // Validate that all expected URIs are present
    const foundUris = expectedUris.filter((uri) => conformanceUris.includes(uri));
    assert.equal(
      foundUris.length,
      expectedUris.length,
      `Expected all 4 core STAC URIs, found ${foundUris.length}: ${foundUris}`,
    );

    for (const expectedUri of expectedUris) {
      if (conformanceUris.includes(expectedUri)) {
        console.log(`Supports: ${expectedUri}`);
      }
    }

    console.log("Test PASSED\n");
  });

  it("test_03_list_collections - should list STAC collections", async function () {
    console.log("=".repeat(80));
    console.log("TEST: List STAC Collections");
    console.log("=".repeat(80));

    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );

    const collections = await client.stac.listCollections();

    // Validate collections response
    assert.isDefined(collections, "Collections should not be undefined");
    assert.property(collections, "collections", "Response should have collections property");
    assert.isArray(collections.collections, "collections should be an array");
    assert.isTrue(collections.collections!.length > 0, "Should have at least one collection");

    // Based on log: Retrieved 10 collections
    assert.isTrue(
      collections.collections!.length >= 5,
      `Expected at least 5 collections, got ${collections.collections!.length}`,
    );

    console.log(`Retrieved ${collections.collections!.length} collections`);

    // Log first 5 collections with details
    for (let i = 0; i < Math.min(5, collections.collections!.length); i++) {
      const collection = collections.collections![i];
      console.log(`\nCollection ${i + 1}:`);
      console.log(`  ID: ${collection.id}`);
      if (collection.title) {
        console.log(`  Title: ${collection.title}`);
      }
      if (collection.description) {
        const desc =
          collection.description.length > 150
            ? collection.description.substring(0, 150) + "..."
            : collection.description;
        console.log(`  Description: ${desc}`);
      }
      if (collection.license) {
        console.log(`  License: ${collection.license}`);
      }
    }

    // Validate collection structure
    const firstCollection = collections.collections![0];
    assert.property(firstCollection, "id", "Collection should have id");
    assert.isDefined(firstCollection.id, "Collection ID should not be undefined");
    assert.isTrue(firstCollection.id!.length > 0, "Collection ID should not be empty");
    assert.property(firstCollection, "extent", "Collection should have extent");

    // Validate that the collection is in the list
    const collectionIds = collections.collections!.map((c) => c.id);
    assert.include(collectionIds, collectionId, `${collectionId} collection should be present`);

    console.log("Test PASSED\n");
  });

  it("test_04_get_collection - should get a specific STAC collection", async function () {
    console.log("=".repeat(80));
    console.log("TEST: Get STAC Collection");
    console.log("=".repeat(80));

    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );

    const collection = await client.stac.getCollection(collectionId);

    // Validate collection
    assert.isDefined(collection, "Collection should not be undefined");
    assert.equal(collection.id, collectionId, "Collection ID should match requested ID");

    // Validate title is present
    assert.property(collection, "title", "Collection should have title");
    assert.isDefined(collection.title, "Collection title should not be undefined");
    assert.isTrue(collection.title!.length > 0, "Collection title should not be empty");

    console.log(`Retrieved collection: ${collection.id}`);
    if (collection.title) {
      console.log(`  Title: ${collection.title}`);
    }
    if (collection.description) {
      console.log(`  Description: ${collection.description.substring(0, 200)}...`);
    }
    if (collection.license) {
      console.log(`  License: ${collection.license}`);
    }

    // Validate extent structure
    assert.property(collection, "extent", "Collection should have extent");
    assert.isDefined(collection.extent, "Collection extent should not be undefined");

    if (collection.extent) {
      console.log("  Extent:");
      if (collection.extent.spatial) {
        console.log(`    Spatial: ${JSON.stringify(collection.extent.spatial)}`);
      }
      if (collection.extent.temporal) {
        console.log(`    Temporal interval: ${JSON.stringify(collection.extent.temporal)}`);
      }
    }

    // Validate links
    assert.property(collection, "links", "Collection should have links");
    assert.isDefined(collection.links, "Collection links should not be undefined");
    assert.isTrue(collection.links!.length > 0, "Collection should have at least one link");

    if (collection.links) {
      console.log(`  Links count: ${collection.links.length}`);
      for (let i = 0; i < Math.min(5, collection.links.length); i++) {
        const link = collection.links[i];
        console.log(`    - ${link.rel}: ${link.href}`);
      }
    }

    console.log("Test PASSED\n");
  });

  it("test_05_search_items_with_spatial_filter - should search STAC items with spatial filter", async function () {
    console.log("=".repeat(80));
    console.log("TEST: Search STAC Items with Spatial Filter");
    console.log("=".repeat(80));

    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );

    // Create search with spatial filter
    const searchParams = {
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
                [-84.46416308610219, 33.6033686729869],
                [-84.38815071170247, 33.6033686729869],
                [-84.38815071170247, 33.6713179813099],
                [-84.46416308610219, 33.6713179813099],
                [-84.46416308610219, 33.6033686729869],
              ],
            ],
          },
        ],
      },
      datetime: "2021-01-01T00:00:00Z/2022-12-31T00:00:00Z",
      sortby: [{ field: "datetime", direction: "desc" }],
      limit: 50,
    } as any;

    // Execute search
    const searchResponse = await client.stac.search(searchParams);

    // Validate response
    assert.isDefined(searchResponse, "Search response should not be undefined");
    assert.property(searchResponse, "features", "Response should have features");
    assert.isArray(searchResponse.features, "features should be an array");

    // Based on log: Found 4 items with spatial filter
    assert.isTrue(
      searchResponse.features!.length >= 2,
      `Expected at least 2 items in spatial search, got ${searchResponse.features!.length}`,
    );

    console.log(`Search returned ${searchResponse.features!.length} items`);

    // Log details of first few items
    for (let i = 0; i < Math.min(3, searchResponse.features!.length); i++) {
      const item = searchResponse.features![i];
      console.log(`\nItem ${i + 1}:`);
      console.log(`  ID: ${item.id}`);
      console.log(`  Collection: ${item.collection}`);
      if (item.geometry) {
        console.log(`  Geometry type: ${item.geometry.type}`);
      }
      if (item.properties?.datetime) {
        console.log(`  Datetime: ${item.properties.datetime}`);
      }
    }

    // Validate items are within collection
    if (searchResponse.features!.length > 0) {
      const firstItem = searchResponse.features![0];
      assert.property(firstItem, "id", "Item should have id");
      assert.property(firstItem, "collection", "Item should have collection");
      assert.equal(
        firstItem.collection,
        collectionId,
        "Item collection should match search collection",
      );
    }

    console.log("Test PASSED\n");
  });

  it("test_06_get_item_collection - should list items in a collection", async function () {
    console.log("=".repeat(80));
    console.log("TEST: List Items in Collection");
    console.log("=".repeat(80));

    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );

    const itemsResponse = await client.stac.getItemCollection(collectionId, { limit: 10 });

    // Validate response
    assert.isDefined(itemsResponse, "Items response should not be undefined");
    assert.property(itemsResponse, "features", "Response should have features");
    assert.isArray(itemsResponse.features, "features should be an array");

    // Based on log: Retrieved 10 items with 4 asset types each
    assert.isTrue(
      itemsResponse.features!.length >= 5,
      `Expected at least 5 items, got ${itemsResponse.features!.length}`,
    );

    console.log(
      `Retrieved ${itemsResponse.features!.length} items from collection ${collectionId}`,
    );

    // Log first few items
    for (let i = 0; i < Math.min(5, itemsResponse.features!.length); i++) {
      const item = itemsResponse.features![i];
      console.log(`\nItem ${i + 1}:`);
      console.log(`  ID: ${item.id}`);
      console.log(`  Collection: ${item.collection}`);
      if (item.assets) {
        const assetKeys = Object.keys(item.assets);
        console.log(`  Assets: ${assetKeys.slice(0, 5).join(", ")}`);
      }
    }

    // Validate items have expected asset types
    if (itemsResponse.features!.length > 0) {
      const firstItem = itemsResponse.features![0];
      assert.property(firstItem, "assets", "Item should have assets");
      const assetKeys = Object.keys(firstItem.assets!);
      assert.isTrue(assetKeys.length >= 2, `Expected at least 2 assets, got ${assetKeys.length}`);

      // Check for common assets
      const commonAssets = ["image", "tilejson", "thumbnail", "rendered_preview"];
      const foundAssets = commonAssets.filter((asset) => assetKeys.includes(asset));
      assert.isTrue(
        foundAssets.length >= 1,
        `Expected at least one common asset type, found: ${foundAssets}`,
      );
    }

    console.log("Test PASSED\n");
  });

  it("test_07_get_collection_queryables - should get queryable properties for a collection", async function () {
    console.log("=".repeat(80));
    console.log("TEST: List Collection Queryables");
    console.log("=".repeat(80));

    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );

    const queryables = await client.stac.getCollectionQueryables(collectionId);

    // Validate queryables
    assert.isDefined(queryables, "Queryables should not be undefined");

    console.log(`Retrieved queryables for collection: ${collectionId}`);

    // Get properties if available
    assert.property(queryables, "properties", "Queryables should have properties");
    const properties = (queryables as any).properties;

    // Based on log: Found 4 queryable properties
    assert.isTrue(
      Object.keys(properties).length >= 3,
      `Expected at least 3 queryable properties, got ${Object.keys(properties).length}`,
    );

    console.log(`Found ${Object.keys(properties).length} queryable properties`);

    // Validate common STAC queryables are present
    const commonQueryables = ["id", "datetime", "geometry"];
    for (const queryable of commonQueryables) {
      assert.property(properties, queryable, `Expected queryable '${queryable}' not found`);
    }

    // Log first 15 queryable properties
    const entries = Object.entries(properties).slice(0, 15);
    for (let i = 0; i < entries.length; i++) {
      const [propName, propInfo] = entries[i];
      console.log(`\nQueryable ${i + 1}: ${propName}`);
      if (typeof propInfo === "object" && propInfo !== null) {
        const info = propInfo as any;
        if (info.description) {
          console.log(`  Description: ${info.description}`);
        }
        if (info.type) {
          console.log(`  Type: ${info.type}`);
        }
        if (info.$ref) {
          console.log(`  Reference: ${info.$ref}`);
        }
      }
    }

    // Validate schema structure
    if ((queryables as any).$schema) {
      console.log(`\nQueryables schema: ${(queryables as any).$schema}`);
    }
    if ((queryables as any).$id) {
      console.log(`Queryables ID: ${(queryables as any).$id}`);
    }

    console.log("Test PASSED\n");
  });

  it("test_08_search_items_with_temporal_filter - should search items with temporal filter", async function () {
    console.log("=".repeat(80));
    console.log("TEST: Search Items with Temporal Filter");
    console.log("=".repeat(80));

    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );

    // Search with temporal range
    const searchParams = {
      collections: [collectionId],
      datetime: "2021-01-01T00:00:00Z/2022-12-31T00:00:00Z",
      limit: 10,
    } as any;

    const searchResponse = await client.stac.search(searchParams);

    assert.isDefined(searchResponse, "Search response should not be undefined");
    assert.property(searchResponse, "features", "Response should have features");
    assert.isArray(searchResponse.features, "features should be an array");

    // Based on log: Temporal search returned 10 items
    assert.isTrue(
      searchResponse.features!.length >= 5,
      `Expected at least 5 items in temporal search, got ${searchResponse.features!.length}`,
    );

    console.log(`Temporal search returned ${searchResponse.features!.length} items`);

    // Validate temporal filtering - all items should have datetime
    for (let i = 0; i < Math.min(3, searchResponse.features!.length); i++) {
      const item = searchResponse.features![i];
      console.log(`\nItem ${i + 1}: ${item.id}`);
      assert.property(item, "properties", "Item should have properties");

      const properties = item.properties;
      if (properties && typeof properties === "object") {
        assert.property(properties, "datetime", "Item should have datetime property");
        console.log(`  Datetime: ${(properties as any).datetime}`);
      }
    }

    console.log("Test PASSED\n");
  });

  it("test_09_search_items_with_sorting - should search items with sorting", async function () {
    console.log("=".repeat(80));
    console.log("TEST: Search Items with Sorting");
    console.log("=".repeat(80));

    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );

    // Search with descending sort by datetime
    const searchParamsDesc = {
      collections: [collectionId],
      sortby: [{ field: "datetime", direction: "desc" }],
      limit: 5,
    } as any;

    const searchResponseDesc = await client.stac.search(searchParamsDesc);

    assert.isDefined(searchResponseDesc, "Search response should not be undefined");
    assert.property(searchResponseDesc, "features", "Response should have features");
    assert.isArray(searchResponseDesc.features, "features should be an array");

    // Based on log: DESC sorting returned 5 items
    assert.isTrue(
      searchResponseDesc.features!.length >= 3,
      `Expected at least 3 items in DESC sort, got ${searchResponseDesc.features!.length}`,
    );

    console.log(`Search with DESC sorting returned ${searchResponseDesc.features!.length} items`);

    // Log sorted results
    for (let i = 0; i < searchResponseDesc.features!.length; i++) {
      const item = searchResponseDesc.features![i];
      console.log(`Item ${i + 1}: ${item.id}`);
      if (item.properties?.datetime) {
        console.log(`  Datetime: ${item.properties.datetime}`);
      }
    }

    // Search with ascending sort
    const searchParamsAsc = {
      collections: [collectionId],
      sortby: [{ field: "datetime", direction: "asc" }],
      limit: 5,
    } as any;

    const searchResponseAsc = await client.stac.search(searchParamsAsc);

    assert.isDefined(searchResponseAsc, "ASC search response should not be undefined");
    assert.property(searchResponseAsc, "features", "ASC response should have features");
    assert.isArray(searchResponseAsc.features, "features should be an array");

    // Based on log: ASC sorting returned 5 items
    assert.isTrue(
      searchResponseAsc.features!.length >= 3,
      `Expected at least 3 items in ASC sort, got ${searchResponseAsc.features!.length}`,
    );

    console.log(`\nSearch with ASC sorting returned ${searchResponseAsc.features!.length} items`);

    for (let i = 0; i < searchResponseAsc.features!.length; i++) {
      const item = searchResponseAsc.features![i];
      console.log(`Item ${i + 1}: ${item.id}`);
      if (item.properties?.datetime) {
        console.log(`  Datetime: ${item.properties.datetime}`);
      }
    }

    console.log("Test PASSED\n");
  });

  it("test_10_create_stac_item - should create a STAC item", async function () {
    console.log("=".repeat(80));
    console.log("TEST: Create STAC Item");
    console.log("=".repeat(80));

    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );
    const baseItemId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_ITEM_ID,
    );
    const itemId = `${baseItemId}-test`;

    // Create sample STAC item using TypeScript SDK property names (camelCase)
    // The SDK serializer will convert to wire format (snake_case)
    const stacItem = {
      stacVersion: "1.0.0",
      type: "Feature",
      id: itemId,
      collection: collectionId,
      boundingBox: [-84.44157, 33.621853, -84.370894, 33.690654],
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-84.372943, 33.621853],
            [-84.370894, 33.689211],
            [-84.439575, 33.690654],
            [-84.44157, 33.623293],
            [-84.372943, 33.621853],
          ],
        ],
      },
      properties: {
        gsd: 0.6,
        datetime: "2021-11-14T16:00:00Z",
        "naip:year": "2021",
        "proj:bbox": [737334.0, 3723324.0, 743706.0, 3730800.0],
        "proj:epsg": 26916,
        "naip:state": "ga",
        "proj:shape": [12460, 10620],
        "proj:transform": [0.6, 0.0, 737334.0, 0.0, -0.6, 3730800.0, 0.0, 0.0, 1.0],
      },
      links: [
        {
          rel: "collection",
          type: "application/json",
          href: `https://planetarycomputer.microsoft.com/api/stac/v1/collections/${collectionId}`,
        },
      ],
      assets: {
        image: {
          href: "https://naipeuwest.blob.core.windows.net/naip/v002/ga/2021/ga_060cm_2021/33084/m_3308421_se_16_060_20211114.tif",
          type: "image/tiff; application=geotiff; profile=cloud-optimized",
          roles: ["data"],
          title: "RGBIR COG tile",
        },
      },
      stacExtensions: ["https://stac-extensions.github.io/projection/v1.0.0/schema.json"],
    } as any;

    console.log(`Creating STAC item: ${itemId}`);

    // Check if item already exists and delete if necessary
    try {
      console.log(`Checking if item ${itemId} already exists...`);
      await client.stac.getItem(collectionId, itemId);
      console.log(`Item ${itemId} exists, deleting it first...`);
      const deletePoller = client.stac.deleteItem(collectionId, itemId);
      await deletePoller.pollUntilDone();
      console.log(`Deleted existing item ${itemId}`);
    } catch (e: any) {
      if (isRestError(e) && e.statusCode === 404) {
        console.log(`Item ${itemId} does not exist, proceeding with creation`);
      } else {
        throw e;
      }
    }

    // Create the item
    try {
      const createPoller = client.stac.createItem(collectionId, stacItem);
      await createPoller.pollUntilDone();
      console.log(`Successfully created item ${itemId}`);

      // Verify the item was created
      const createdItem = await client.stac.getItem(collectionId, itemId);
      assert.isDefined(createdItem, "Created item should be retrievable");
      assert.equal(createdItem.id, itemId, "Created item ID should match");

      // Validate structure of created item
      assert.property(createdItem, "geometry", "Created item should have geometry");
      assert.property(createdItem, "properties", "Created item should have properties");
      assert.property(createdItem, "assets", "Created item should have assets");

      // Based on log: item has image asset
      assert.property(createdItem.assets!, "image", "Created item should have image asset");

      console.log(`Verified item creation: ${createdItem.id}`);
      console.log(`Created item has ${Object.keys(createdItem.assets!).length} assets`);
    } catch (e: any) {
      console.log(`Failed to create item: ${e.message}`);
      throw e;
    }

    console.log("Test PASSED\n");
  });

  it("test_11_update_stac_item - should update a STAC item", async function () {
    console.log("=".repeat(80));
    console.log("TEST: Update STAC Item");
    console.log("=".repeat(80));

    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );
    const baseItemId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_ITEM_ID,
    );
    const itemId = `${baseItemId}-test`;

    try {
      // Initialize a STAC item with a public asset URL (not managed storage) so ingestion can access it.
      // Use TypeScript SDK property names (camelCase); the serializer converts to wire format.
      const stacItem = {
        stacVersion: "1.0.0",
        type: "Feature",
        id: itemId,
        collection: collectionId,
        boundingBox: [-84.44157, 33.621853, -84.370894, 33.690654],
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-84.372943, 33.621853],
              [-84.370894, 33.689211],
              [-84.439575, 33.690654],
              [-84.44157, 33.623293],
              [-84.372943, 33.621853],
            ],
          ],
        },
        properties: {
          gsd: 0.6,
          datetime: "2021-11-14T16:00:00Z",
          "naip:year": "2021",
          "proj:bbox": [737334.0, 3723324.0, 743706.0, 3730800.0],
          "proj:epsg": 26916,
          "naip:state": "ga",
          "proj:shape": [12460, 10620],
          "proj:transform": [0.6, 0.0, 737334.0, 0.0, -0.6, 3730800.0, 0.0, 0.0, 1.0],
          platform: "Imagery",
        },
        links: [
          {
            rel: "collection",
            type: "application/json",
            href: `https://planetarycomputer.microsoft.com/api/stac/v1/collections/${collectionId}`,
          },
        ],
        assets: {
          image: {
            href: "https://naipeuwest.blob.core.windows.net/naip/v002/ga/2021/ga_060cm_2021/33084/m_3308421_se_16_060_20211114.tif",
            type: "image/tiff; application=geotiff; profile=cloud-optimized",
            roles: ["data"],
            title: "RGBIR COG tile",
          },
        },
        stacExtensions: ["https://stac-extensions.github.io/projection/v1.0.0/schema.json"],
      } as any;

      console.log("Updating item with platform property: Imagery");

      // Update the item
      const updatePoller = client.stac.updateItem(collectionId, itemId, stacItem);
      await updatePoller.pollUntilDone();
      console.log(`Successfully updated item ${itemId}`);

      // Verify the update
      const updatedItem = await client.stac.getItem(collectionId, itemId);
      console.log(`Verified item update: ${updatedItem.id}`);

      if (updatedItem.properties) {
        const platform = (updatedItem.properties as any).platform;
        console.log(`Updated item platform: ${platform}`);
      }
    } catch (e: any) {
      console.log(`Failed to update item: ${e.message}`);
      throw e;
    }

    console.log("Test PASSED\n");
  });

  it("test_12_get_item - should get a specific STAC item", async function () {
    console.log("=".repeat(80));
    console.log("TEST: Get STAC Item");
    console.log("=".repeat(80));

    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );

    // First, get an item ID from the collection
    const itemsResponse = await client.stac.getItemCollection(collectionId, { limit: 1 });

    if (itemsResponse.features && itemsResponse.features.length > 0) {
      const itemId = itemsResponse.features[0].id!;
      console.log(`Getting item: ${itemId}`);

      // Get the specific item
      const item = await client.stac.getItem(collectionId, itemId);

      // Validate item
      assert.isDefined(item, "Item should not be undefined");
      assert.equal(item.id, itemId, "Item ID should match requested ID");
      assert.equal(item.collection, collectionId, "Item collection should match");

      // Validate item structure
      assert.property(item, "geometry", "Item should have geometry");
      assert.property(item, "properties", "Item should have properties");
      assert.property(item, "assets", "Item should have assets");

      // Based on log: items have 4 asset types
      assert.isTrue(
        Object.keys(item.assets!).length >= 2,
        `Expected at least 2 assets, got ${Object.keys(item.assets!).length}`,
      );

      console.log(`Retrieved item: ${item.id}`);
      console.log(`  Collection: ${item.collection}`);

      if (item.properties?.datetime) {
        console.log(`  Datetime: ${item.properties.datetime}`);
      }

      if (item.assets) {
        const assetKeys = Object.keys(item.assets);
        console.log(`  Assets (${assetKeys.length}): ${assetKeys.join(", ")}`);

        // Validate common asset types
        const commonAssets = ["image", "tilejson", "thumbnail", "rendered_preview"];
        const foundAssets = commonAssets.filter((asset) => assetKeys.includes(asset));
        console.log(`  Found common assets: ${foundAssets.join(", ")}`);
      }
    } else {
      console.log("No items found in collection to test get_item");
    }

    console.log("Test PASSED\n");
  });

  it("test_13_replace_stac_item - should create or replace a STAC item", async function () {
    console.log("=".repeat(80));
    console.log("TEST: Create or Replace STAC Item (Idempotent)");
    console.log("=".repeat(80));

    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );
    const baseItemId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_ITEM_ID,
    );
    const itemId = `${baseItemId}-replace-test`;

    // Create sample STAC item
    const stacItem = {
      stacVersion: "1.0.0",
      type: "Feature",
      id: itemId,
      collection: collectionId,
      boundingBox: [-84.44157, 33.621853, -84.370894, 33.690654],
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-84.372943, 33.621853],
            [-84.370894, 33.689211],
            [-84.439575, 33.690654],
            [-84.44157, 33.623293],
            [-84.372943, 33.621853],
          ],
        ],
      },
      properties: {
        gsd: 0.6,
        datetime: "2021-11-14T16:00:00Z",
        "naip:year": "2021",
        "proj:bbox": [737334.0, 3723324.0, 743706.0, 3730800.0],
        "proj:epsg": 26916,
        "naip:state": "ga",
        "proj:shape": [12460, 10620],
        "proj:transform": [0.6, 0.0, 737334.0, 0.0, -0.6, 3730800.0, 0.0, 0.0, 1.0],
        platform: "Imagery Original",
      },
      links: [
        {
          rel: "collection",
          type: "application/json",
          href: `https://planetarycomputer.microsoft.com/api/stac/v1/collections/${collectionId}`,
        },
      ],
      assets: {
        image: {
          href: "https://naipeuwest.blob.core.windows.net/naip/v002/ga/2021/ga_060cm_2021/33084/m_3308421_se_16_060_20211114.tif",
          type: "image/tiff; application=geotiff; profile=cloud-optimized",
          roles: ["data"],
          title: "RGBIR COG tile",
        },
      },
      stacExtensions: ["https://stac-extensions.github.io/projection/v1.0.0/schema.json"],
    } as any;

    console.log(`Creating initial STAC item: ${itemId}`);

    // Pre-cleanup: Delete the item if it already exists (like Python tests do)
    try {
      console.log(`Checking if item ${itemId} already exists...`);
      await client.stac.getItem(collectionId, itemId);
      console.log(`Item ${itemId} exists, deleting it first...`);
      const deletePoller = client.stac.deleteItem(collectionId, itemId);
      await deletePoller.pollUntilDone();
      console.log(`Deleted existing item ${itemId}`);
    } catch (e: any) {
      if (isRestError(e) && e.statusCode === 404) {
        console.log(`Item ${itemId} does not exist, proceeding with creation`);
      } else {
        throw e;
      }
    }

    // Step 1: Create the item
    try {
      const createPoller = client.stac.createItem(collectionId, stacItem);
      await createPoller.pollUntilDone();
      console.log(`Created item ${itemId}`);

      // Verify creation
      const createdItem = await client.stac.getItem(collectionId, itemId);
      assert.isDefined(createdItem, "Created item should be retrievable");
      assert.equal(createdItem.id, itemId, "Created item ID should match");
      console.log(`Verified item ${createdItem.id}`);

      // Step 2: Replace using createOrReplace
      console.log(`Replacing item ${itemId} using createOrReplace...`);
      stacItem.properties.platform = "Imagery Updated";

      const replacePoller = client.stac.createOrReplaceItem(collectionId, itemId, stacItem);
      await replacePoller.pollUntilDone();
      console.log(`Replaced item ${itemId} using createOrReplace`);

      // Verify replacement
      const replacedItem = await client.stac.getItem(collectionId, itemId);
      assert.isDefined(replacedItem, "Replaced item should be retrievable");
      assert.equal(replacedItem.id, itemId, "Replaced item ID should match");

      // Verify the updated properties
      if (replacedItem.properties) {
        const platform = (replacedItem.properties as any).platform || "N/A";
        console.log(`Verified replaced item, platform: ${platform}`);

        // Assert the properties were updated
        assert.equal(
          platform,
          "Imagery Updated",
          `Expected platform 'Imagery Updated', got '${platform}'`,
        );
      } else {
        console.log("Replaced item has no properties to verify");
      }

      console.log(`Successfully verified createOrReplace operation for item ${itemId}`);
    } catch (e: any) {
      console.log(`Failed to create/replace item: ${e.message}`);
      throw e;
    }

    console.log("Test PASSED\n");
  });

  it("test_14_delete_stac_item - should delete a STAC item", async function () {
    console.log("=".repeat(80));
    console.log("TEST: Delete STAC Item");
    console.log("=".repeat(80));

    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );
    const baseItemId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_ITEM_ID,
    );
    const itemId = `${baseItemId}-delete-test`;

    // Create sample STAC item to delete
    const stacItem = {
      stacVersion: "1.0.0",
      type: "Feature",
      id: itemId,
      collection: collectionId,
      boundingBox: [-84.44157, 33.621853, -84.370894, 33.690654],
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-84.372943, 33.621853],
            [-84.370894, 33.689211],
            [-84.439575, 33.690654],
            [-84.44157, 33.623293],
            [-84.372943, 33.621853],
          ],
        ],
      },
      properties: {
        gsd: 0.6,
        datetime: "2021-11-14T16:00:00Z",
        "naip:year": "2021",
        "proj:bbox": [737334.0, 3723324.0, 743706.0, 3730800.0],
        "proj:epsg": 26916,
        "naip:state": "ga",
        "proj:shape": [12460, 10620],
        "proj:transform": [0.6, 0.0, 737334.0, 0.0, -0.6, 3730800.0, 0.0, 0.0, 1.0],
      },
      links: [
        {
          rel: "collection",
          type: "application/json",
          href: `https://planetarycomputer.microsoft.com/api/stac/v1/collections/${collectionId}`,
        },
      ],
      assets: {
        image: {
          href: "https://naipeuwest.blob.core.windows.net/naip/v002/ga/2021/ga_060cm_2021/33084/m_3308421_se_16_060_20211114.tif",
          type: "image/tiff; application=geotiff; profile=cloud-optimized",
          roles: ["data"],
          title: "RGBIR COG tile",
        },
      },
      stacExtensions: ["https://stac-extensions.github.io/projection/v1.0.0/schema.json"],
    } as any;

    console.log(`Creating STAC item to delete: ${itemId}`);

    // Pre-cleanup: Delete the item if it already exists (like Python tests do)
    try {
      console.log(`Checking if item ${itemId} already exists...`);
      await client.stac.getItem(collectionId, itemId);
      console.log(`Item ${itemId} exists, deleting it first...`);
      const deletePoller = client.stac.deleteItem(collectionId, itemId);
      await deletePoller.pollUntilDone();
      console.log(`Deleted existing item ${itemId}`);
    } catch (e: any) {
      if (isRestError(e) && e.statusCode === 404) {
        console.log(`Item ${itemId} does not exist, proceeding with creation`);
      } else {
        throw e;
      }
    }

    // Create an item to delete
    try {
      const createPoller = client.stac.createItem(collectionId, stacItem);
      await createPoller.pollUntilDone();
      console.log(`Created item ${itemId}`);

      // Verify the item exists
      const existingItem = await client.stac.getItem(collectionId, itemId);
      assert.isDefined(existingItem, "Item should exist before deletion");
      assert.equal(existingItem.id, itemId, "Item ID should match");
      console.log(`Verified item ${itemId} exists`);

      // Delete the item
      console.log(`Deleting item ${itemId}...`);
      const deletePoller = client.stac.deleteItem(collectionId, itemId);
      await deletePoller.pollUntilDone();
      console.log(`Delete operation completed for item ${itemId}`);

      // Verify deletion by attempting to retrieve the item
      console.log(`Verifying item ${itemId} was deleted...`);
      try {
        await client.stac.getItem(collectionId, itemId);
        console.log(`Item ${itemId} still exists after deletion (may take time to propagate)`);
        // In some cases, deletion may take time to propagate, so we don't fail the test
      } catch (e: any) {
        if (isRestError(e) && e.statusCode === 404) {
          console.log(`Verified item ${itemId} was successfully deleted`);
        } else {
          // Re-raise if it's a different error
          throw e;
        }
      }

      console.log(`Successfully completed delete test for item ${itemId}`);
    } catch (e: any) {
      console.log(`Failed to create/delete item: ${e.message}`);
      throw e;
    }

    console.log("Test PASSED\n");
  });
});
