// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates STAC API conformance, catalog operations, and item management:
 * - Checking API conformance
 * - Getting the landing page
 * - Searching collections
 * - Searching and querying items with filters, bounding boxes, temporal ranges
 * - Working with queryables
 * - Creating, updating, and deleting STAC items
 * - Creating or replacing STAC items (idempotent operations)
 *
 * @description
 * NOTE: Some operations like creating/deleting items are long-running operations
 * and can take significant time to complete.
 *
 * USAGE:
 *   npx ts-node 02_stacSpecification.ts
 *
 *   Set the environment variable PLANETARYCOMPUTER_ENDPOINT with your endpoint URL.
 *   Set the environment variable PLANETARYCOMPUTER_COLLECTION_ID with your collection ID.
 *   Set the environment variable PLANETARYCOMPUTER_ITEM_ID with your item ID (for create/update operations).
 */

import { DefaultAzureCredential } from "@azure/identity";
import {
  PlanetaryComputerProClient,
  KnownFilterLanguage,
  KnownStacSearchSortingDirection,
} from "@azure/planetarycomputer";
import type { StacItem, StacSearchParameters, StacSortExtension } from "@azure/planetarycomputer";
import { isRestError } from "@azure/core-rest-pipeline";

// Environment variables
const endpoint = process.env.PLANETARYCOMPUTER_ENDPOINT;
const collectionId = process.env.PLANETARYCOMPUTER_COLLECTION_ID;
const itemId = process.env.PLANETARYCOMPUTER_ITEM_ID ?? "sample-item";

if (!endpoint) {
  throw new Error("PLANETARYCOMPUTER_ENDPOINT environment variable must be set");
}

if (!collectionId) {
  throw new Error("PLANETARYCOMPUTER_COLLECTION_ID environment variable must be set");
}

/**
 * Get the STAC landing page.
 */
async function getLandingPage(client: PlanetaryComputerProClient): Promise<void> {
  const landingPage = await client.stac.getLandingPage();

  console.log("Landing page links:");
  for (const link of landingPage.links?.slice(0, 5) ?? []) {
    console.log(`  - ${link.rel}: ${link.href}`);
  }
}

/**
 * Search and list STAC collections.
 */
async function searchCollections(client: PlanetaryComputerProClient): Promise<void> {
  const collections = await client.stac.getCollections();

  console.log(`Found ${collections.collections?.length ?? 0} collections`);

  // Show first few collections
  for (const collection of collections.collections?.slice(0, 3) ?? []) {
    if (collection.description) {
      const desc =
        collection.description.length > 100
          ? collection.description.substring(0, 100) + "..."
          : collection.description;
      console.log(`  - ${collection.id}: ${desc}`);
    }
  }
}

/**
 * Search STAC items with filters and sorting.
 */
async function searchItems(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
): Promise<void> {
  // Create Search using StacSearchParameters
  const searchPostRequest: StacSearchParameters = {
    collections: [targetCollectionId],
    filterLang: KnownFilterLanguage.Cql2Json,
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
    dateTime: "2021-01-01T00:00:00Z/2022-12-31T00:00:00Z",
    sortBy: [
      {
        field: "datetime",
        direction: KnownStacSearchSortingDirection.Desc,
      } as StacSortExtension,
    ],
    limit: 50,
  };

  // Execute Search
  const searchResponse = await client.stac.search(searchPostRequest);
  console.log(`Search returned ${searchResponse.features?.length ?? 0} items`);

  // Show first few results
  for (const item of searchResponse.features?.slice(0, 3) ?? []) {
    console.log(`  - ${item.id}: ${item.properties?.dateTime}`);
  }
}

/**
 * Create a sample STAC item.
 */
function getSampleStacItem(targetCollectionId: string, targetItemId: string): StacItem {
  // Use simplified item structure matching the test patterns
  return {
    stacVersion: "1.0.0",
    type: "Feature",
    id: targetItemId,
    collection: targetCollectionId,
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
        href: `https://planetarycomputer.microsoft.com/api/stac/v1/collections/${targetCollectionId}`,
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
  } as any; // Use 'as any' since extra properties may be needed
}

/**
 * Create a STAC item.
 * NOTE: This is a long-running operation.
 */
async function createStacItem(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
  targetItemId: string,
): Promise<void> {
  const stacItem = getSampleStacItem(targetCollectionId, targetItemId);

  // Check if item already exists
  const items = await client.stac.getItemCollection(targetCollectionId);
  if (items.features?.some((item) => item.id === stacItem.id)) {
    console.log(`Item ${stacItem.id} already exists. Deleting it before creating a new one.`);
    const deletePoller = client.stac.deleteItem(targetCollectionId, stacItem.id!);
    await deletePoller.pollUntilDone();
    console.log(`Deleted item ${stacItem.id}. Proceeding to create a new one.`);
  }

  stacItem.collection = targetCollectionId;

  try {
    console.log(`Creating item ${targetItemId}...`);
    console.log("NOTE: This operation may take significant time to complete.");
    const createPoller = client.stac.createItem(targetCollectionId, stacItem);
    await createPoller.pollUntilDone();
    console.log(`Created item ${targetItemId}`);
  } catch (e) {
    if (isRestError(e)) {
      console.error(`Failed to create item ${stacItem.id}: ${e.message}`);
    }
    throw e;
  }
}

/**
 * Update a STAC item.
 * NOTE: This is a long-running operation.
 */
async function updateStacItem(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
  targetItemId: string,
): Promise<void> {
  const stacItem = getSampleStacItem(targetCollectionId, targetItemId);
  stacItem.properties!.platform = "Imagery";

  console.log(`Updating item ${targetItemId}...`);
  console.log("NOTE: This operation may take significant time to complete.");
  const updatePoller = client.stac.updateItem(targetCollectionId, stacItem.id!, stacItem);
  await updatePoller.pollUntilDone();
  console.log(`Updated item ${stacItem.id}, platform: ${stacItem.properties!.platform}`);
}

/**
 * Create or replace a STAC item (idempotent operation).
 * NOTE: This is a long-running operation.
 */
async function createOrReplaceStacItem(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
  targetItemId: string,
): Promise<void> {
  const stacItem = getSampleStacItem(targetCollectionId, targetItemId);

  try {
    console.log(`Creating item ${targetItemId}...`);
    console.log("NOTE: This operation may take significant time to complete.");
    const createPoller = client.stac.createItem(targetCollectionId, stacItem);
    await createPoller.pollUntilDone();
    console.log(`Created item ${targetItemId}`);
  } catch (e) {
    if (isRestError(e) && e.statusCode === 409) {
      console.log(`Item ${targetItemId} already exists, continuing...`);
    } else {
      throw e;
    }
  }

  // Verify creation
  const createdItem = await client.stac.getItem(targetCollectionId, targetItemId);
  console.log(`Verified item ${createdItem.id}`);

  // Now demonstrate create_or_replace (replace since item exists)
  stacItem.properties!.platform = "Imagery Updated";
  stacItem.properties!.processingLevel = "L2";

  console.log(`Replacing item ${targetItemId} using createOrReplaceItem...`);
  const replacePoller = client.stac.createOrReplaceItem(targetCollectionId, targetItemId, stacItem);
  await replacePoller.pollUntilDone();
  console.log(`Replaced item ${targetItemId}`);

  // Verify replacement
  const replacedItem = await client.stac.getItem(targetCollectionId, targetItemId);
  console.log(`Verified replaced item, platform: ${replacedItem.properties?.platform ?? "N/A"}`);
}

/**
 * Delete a STAC item.
 * NOTE: This is a long-running operation.
 */
async function deleteStacItem(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
  targetItemId: string,
): Promise<void> {
  try {
    // Check if item exists before attempting deletion
    const existingItem = await client.stac.getItem(targetCollectionId, targetItemId);
    console.log(`Found item ${existingItem.id} to delete`);

    // Delete the item
    console.log(`Deleting item ${targetItemId}...`);
    console.log("NOTE: This operation may take significant time to complete.");
    const deletePoller = client.stac.deleteItem(targetCollectionId, targetItemId);
    await deletePoller.pollUntilDone();
    console.log(`Successfully deleted item ${targetItemId}`);

    // Verify deletion
    try {
      await client.stac.getItem(targetCollectionId, targetItemId);
      console.warn(`Item ${targetItemId} still exists after deletion (may take time to propagate)`);
    } catch (e) {
      if (isRestError(e) && e.statusCode === 404) {
        console.log(`Verified item ${targetItemId} was successfully deleted`);
      }
    }
  } catch (e) {
    if (isRestError(e) && e.statusCode === 404) {
      console.log(`Item ${targetItemId} does not exist, nothing to delete`);
    } else {
      throw e;
    }
  }
}

/**
 * Get a STAC collection.
 */
async function getCollection(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
): Promise<void> {
  const collection = await client.stac.getCollection(targetCollectionId);
  console.log(`Retrieved collection: ${collection.id}`);
}

/**
 * Query items using CQL2 filters.
 */
async function queryItems(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
): Promise<void> {
  // Query with filter
  const queryOptions: StacSearchParameters = {
    collections: [targetCollectionId],
    filterLang: KnownFilterLanguage.Cql2Json,
    filter: { op: "<", args: [{ property: "eo:cloud_cover" }, 10] },
    limit: 5,
  };

  const queryResults = await client.stac.search(queryOptions);
  console.log(`Query returned ${queryResults.features?.length ?? 0} items`);

  if (queryResults.features) {
    for (const item of queryResults.features) {
      if (item.properties?.dateTime) {
        console.log(`  - ${item.id}: ${item.properties.dateTime}`);
      }
    }
  }

  // Sorted query
  const sortedOptions: StacSearchParameters = {
    collections: [targetCollectionId],
    sortBy: [
      {
        field: "eo:cloud_cover",
        direction: KnownStacSearchSortingDirection.Asc,
      } as StacSortExtension,
    ],
    limit: 3,
  };

  const sortedResults = await client.stac.search(sortedOptions);
  console.log(`Sorted query returned ${sortedResults.features?.length ?? 0} items`);

  if (sortedResults.features) {
    for (const item of sortedResults.features) {
      if (item.properties?.dateTime) {
        console.log(`  - ${item.id}: ${item.properties.dateTime}`);
      }
    }
  }
}

/**
 * Get queryable properties for a collection.
 */
async function getQueryables(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
): Promise<void> {
  const queryables = await client.stac.getCollectionQueryables(targetCollectionId);
  const properties = (queryables as Record<string, unknown>).properties as
    | Record<string, unknown>
    | undefined;

  if (properties) {
    const propNames = Object.keys(properties).slice(0, 10);
    console.log(`Queryable properties (showing first ${propNames.length}):`);
    for (const propName of propNames) {
      const propValue = properties[propName] as Record<string, unknown>;
      console.log(`  - ${propName}: ${propValue.description ?? ""}`);
    }
  }
}

/**
 * Main execution function.
 */
async function main(): Promise<void> {
  console.log(`Connected to: ${endpoint}`);
  console.log(`Collection ID: ${collectionId}`);
  console.log(`Item ID: ${itemId}\n`);

  // Create client
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(endpoint, credential);

  // Execute STAC specification operations
  await searchCollections(client);
  await searchItems(client, collectionId);
  await queryItems(client, collectionId);
  await getQueryables(client, collectionId);

  // Execute STAC item operations (long-running)
  // These operations require a properly configured collection with ingested items
  try {
    await createStacItem(client, collectionId, itemId);
    await updateStacItem(client, collectionId, itemId);

    const replaceItemId = `${itemId}_replace_demo`;
    await createOrReplaceStacItem(client, collectionId, replaceItemId);
    await deleteStacItem(client, collectionId, replaceItemId); // Clean up
  } catch (e) {
    console.log(`Note: Item operations may fail if collection is not properly configured: ${e}`);
  }

  await getCollection(client, collectionId);

  // Get landing page at the end (may have auth differences)
  try {
    await getLandingPage(client);
  } catch (e) {
    console.log("Note: getLandingPage may require different auth configuration");
  }

  console.log("\nSTAC Specification Operations Complete");
}

main().catch(console.error);
