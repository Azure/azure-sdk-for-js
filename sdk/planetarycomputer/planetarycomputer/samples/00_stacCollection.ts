// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates STAC collection operations including:
 * - Creating and deleting STAC collections
 * - Updating collection metadata
 * - Getting and managing collection partition types
 * - Creating and managing render options
 * - Creating and managing collection mosaics
 * - Managing tile settings and queryables
 *
 * @description
 * USAGE:
 *   npx ts-node 00_stacCollection.ts
 *
 *   Set the environment variable PLANETARYCOMPUTER_ENDPOINT with your endpoint URL.
 *   Set the environment variable PLANETARYCOMPUTER_COLLECTION_ID with your collection ID.
 */

import { DefaultAzureCredential } from "@azure/identity";
import {
  PlanetaryComputerProClient,
  KnownPartitionTypeScheme,
  KnownRenderOptionType,
  KnownStacQueryableDefinitionDataType,
} from "@azure/planetarycomputer";
import type {
  StacCollection,
  StacExtensionExtent,
  StacExtensionSpatialExtent,
  StacCollectionTemporalExtent,
  RenderOption,
  StacMosaic,
  StacQueryable,
  TileSettings,
} from "@azure/planetarycomputer";

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
 * Create a new STAC collection with item assets.
 */
async function createCollection(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
): Promise<StacCollection> {
  console.log(`Checking if collection '${targetCollectionId}' exists...`);

  const collectionsResponse = await client.stac.getCollections();
  const collections = collectionsResponse.collections ?? [];

  if (collections.some((c) => c.id === targetCollectionId)) {
    console.log(`Collection '${targetCollectionId}' already exists, deleting it...`);
    const deletePoller = client.stac.deleteCollection(targetCollectionId);
    await deletePoller.pollUntilDone();
    console.log(`Deleted collection '${targetCollectionId}'`);
  }

  // Define collection spatial and temporal extents (Georgia state bounds)
  const spatialExtent: StacExtensionSpatialExtent = {
    boundingBox: [[-85.605165, 30.357851, -80.839729, 35.000659]],
  };

  const temporalExtent: StacCollectionTemporalExtent = {
    interval: [[new Date("2020-01-01T00:00:00Z"), new Date("2099-12-31T23:59:59Z")]],
  };

  const extent: StacExtensionExtent = {
    spatial: spatialExtent,
    temporal: temporalExtent,
  };

  // Create StacCollection object
  const collectionPayload: StacCollection = {
    id: targetCollectionId,
    description: "A Subset of imagery for sample MPC Pro GeoCatalog deployments.",
    extent,
    license: "proprietary",
    links: [],
    stacVersion: "1.0.0",
    title: "MPC Pro Sample Datasets",
    type: "Collection",
  };

  // Add additional properties
  const collectionData = {
    ...collectionPayload,
    providers: [
      {
        url: "https://www.fsa.usda.gov/programs-and-services/aerial-photography/imagery-programs/naip-imagery/",
        name: "USDA Farm Service Agency",
        roles: ["producer", "licensor"],
      },
      { url: "https://www.esri.com/", name: "Esri", roles: ["processor"] },
      {
        url: "https://planetarycomputer.microsoft.com",
        name: "Microsoft",
        roles: ["host", "processor"],
      },
    ],
    summaries: {
      gsd: [0.3, 0.6, 1],
      "eo:bands": [
        { name: "Red", common_name: "red", description: "visible red" },
        { name: "Green", common_name: "green", description: "visible green" },
        { name: "Blue", common_name: "blue", description: "visible blue" },
        { name: "NIR", common_name: "nir", description: "near-infrared" },
      ],
    },
    item_assets: {
      image: {
        type: "image/tiff; application=geotiff; profile=cloud-optimized",
        roles: ["data"],
        title: "RGBIR COG tile",
        "eo:bands": [
          { name: "Red", common_name: "red" },
          { name: "Green", common_name: "green" },
          { name: "Blue", common_name: "blue" },
          { name: "NIR", common_name: "nir", description: "near-infrared" },
        ],
      },
      metadata: {
        type: "text/plain",
        roles: ["metadata"],
        title: "FGDC Metdata",
      },
      thumbnail: {
        type: "image/jpeg",
        roles: ["thumbnail"],
        title: "Thumbnail",
      },
    },
    stac_extensions: [
      "https://stac-extensions.github.io/item-assets/v1.0.0/schema.json",
      "https://stac-extensions.github.io/table/v1.2.0/schema.json",
    ],
  };

  // Create the collection (this is a long-running operation)
  console.log(`Creating collection '${targetCollectionId}'...`);
  const createPoller = client.stac.createCollection(collectionData);
  await createPoller.pollUntilDone();
  console.log(`Collection '${targetCollectionId}' created successfully`);

  // Get the created collection to verify
  console.log(`Retrieving collection '${targetCollectionId}'...`);
  const collection = await client.stac.getCollection(targetCollectionId);
  console.log(`Retrieved collection: ${collection.title}`);
  console.log(`Description: ${collection.description}`);

  return collection;
}

/**
 * Update an existing collection's metadata.
 */
async function updateCollection(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
): Promise<void> {
  console.log(`Getting collection '${targetCollectionId}'...`);
  const collection = await client.stac.getCollection(targetCollectionId);

  const originalDescription = collection.description;
  collection.description = collection.description + " - Updated for testing";

  console.log("Updating collection...");
  await client.stac.createOrReplaceCollection(targetCollectionId, collection);

  const updatedCollection = await client.stac.getCollection(targetCollectionId);
  console.log(`Original description: ${originalDescription}`);
  console.log(`Updated description: ${updatedCollection.description}`);
}

/**
 * Get and update collection partition type.
 */
async function managePartitionType(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
): Promise<void> {
  console.log(`Getting partition type for collection '${targetCollectionId}'...`);
  const partitionType = await client.stac.getPartitionType(targetCollectionId);
  console.log(`Current partition scheme: ${partitionType.scheme}`);

  // Check if collection is empty before updating
  const items = await client.stac.getItemCollection(targetCollectionId);
  if (items.features && items.features.length > 0) {
    console.log("Collection is not empty, skipping partition type update");
  } else {
    console.log("Updating partition type to YEAR scheme...");
    await client.stac.replacePartitionType(targetCollectionId, {
      scheme: KnownPartitionTypeScheme.Year,
    });
    console.log("Partition type updated successfully");
  }
}

/**
 * Create and manage render options for a collection.
 */
async function manageRenderOptions(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
): Promise<void> {
  const renderOptionId = "natural-color";

  // Check if render option already exists
  const existingOptions = await client.stac.listRenderOptions(targetCollectionId);

  if (existingOptions.some((ro) => ro.id === renderOptionId)) {
    console.log(`Render option '${renderOptionId}' already exists.`);
    await client.stac.deleteRenderOption(targetCollectionId, renderOptionId);
    console.log(`Deleted existing render option '${renderOptionId}'.`);
  }

  // Create render option without description initially
  const renderOption: RenderOption = {
    id: renderOptionId,
    name: "Natural color",
    type: KnownRenderOptionType.RasterTile,
    options: "assets=image&asset_bidx=image|1,2,3",
    minZoom: 6,
  };

  console.log(`Creating render option '${renderOption.id}'...`);
  await client.stac.createRenderOption(targetCollectionId, renderOption);

  // List render options
  await client.stac.listRenderOptions(targetCollectionId);

  // Update with description
  renderOption.description = "RGB from visual assets";

  await client.stac.replaceRenderOption(targetCollectionId, renderOption.id, renderOption);

  // Get the created render option
  const retrievedOption = await client.stac.getRenderOption(targetCollectionId, renderOption.id);
  console.log(`Retrieved: ${retrievedOption.name}`);
}

/**
 * Create and manage collection mosaics.
 */
async function manageMosaics(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
): Promise<void> {
  const mosaic: StacMosaic = {
    id: "mos1",
    name: "Most recent available",
    cql: [],
  };

  // Check existing mosaics
  const existingMosaics = await client.stac.listMosaics(targetCollectionId);

  if (existingMosaics.some((m) => m.id === mosaic.id)) {
    console.log(`Mosaic ${mosaic.id} already exists. Deleting it before creating a new one.`);
    await client.stac.deleteMosaic(targetCollectionId, mosaic.id);
  }

  // Create Mosaic
  const createdMosaic = await client.stac.addMosaic(targetCollectionId, mosaic);
  console.log(`Created mosaic: ${createdMosaic.id}`);

  // Update with description
  mosaic.description = "Most recent available imagery in this collection";
  const updatedMosaic = await client.stac.replaceMosaic(targetCollectionId, mosaic.id, mosaic);
  console.log(`Updated mosaic: ${updatedMosaic.id}`);

  // Get the mosaic
  const retrievedMosaic = await client.stac.getMosaic(targetCollectionId, mosaic.id);
  console.log(`Retrieved mosaic: ${retrievedMosaic.name}`);
}

/**
 * Get and update tile settings for a collection.
 */
async function manageTileSettings(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
): Promise<void> {
  console.log(`Getting tile settings for collection '${targetCollectionId}'...`);
  const tileSettings = await client.stac.getTileSettings(targetCollectionId);
  console.log(`Current tile settings: ${JSON.stringify(tileSettings)}`);

  console.log("Updating tile settings...");
  const newSettings: TileSettings = {
    defaultLocation: undefined,
    maxItemsPerTile: 35,
    minZoom: 6,
  };
  const updatedSettings = await client.stac.replaceTileSettings(targetCollectionId, newSettings);
  console.log(`Updated tile settings: ${JSON.stringify(updatedSettings)}`);
}

/**
 * Get STAC conformance classes.
 */
async function getConformanceClass(client: PlanetaryComputerProClient): Promise<void> {
  const result = await client.stac.getConformanceClass();
  console.log(`Conformance classes (${result.conformsTo?.length ?? 0}):`);
  for (const uri of result.conformsTo?.slice(0, 5) ?? []) {
    console.log(`  - ${uri}`);
  }
}

/**
 * Get STAC landing page.
 */
async function getLandingPage(client: PlanetaryComputerProClient): Promise<void> {
  const result = await client.stac.getLandingPage();
  console.log("Landing page links:");
  for (const link of result.links?.slice(0, 5) ?? []) {
    console.log(`  - ${link.rel}: ${link.href}`);
  }
}

/**
 * Create and manage queryables for a collection.
 */
async function manageQueryables(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
): Promise<void> {
  const queryablesResponse = await client.stac.getCollectionQueryables(targetCollectionId);

  const queryable: StacQueryable = {
    name: "eo:cloud_cover",
    dataType: KnownStacQueryableDefinitionDataType.Number,
    createIndex: false,
    definition: {
      dataType: KnownStacQueryableDefinitionDataType.Number,
    },
  };

  const properties = (queryablesResponse as Record<string, unknown>).properties as
    | Record<string, unknown>
    | undefined;
  if (properties && queryable.name in properties) {
    await client.stac.deleteQueryable(targetCollectionId, queryable.name);
    console.log(`Deleted existing '${queryable.name}' queryable.`);
  }

  const createdQueryables = await client.stac.createQueryables(targetCollectionId, [queryable]);
  console.log(`Created queryables: ${JSON.stringify(createdQueryables)}`);

  queryable.definition = {
    ...queryable.definition,
    description: "Cloud cover percentage",
  };

  const replacedQueryable = await client.stac.replaceQueryable(
    targetCollectionId,
    queryable.name,
    queryable,
  );
  console.log(`Replaced queryable: ${replacedQueryable.name}`);

  await client.stac.listQueryables();
}

/**
 * Get collection configuration.
 */
async function getCollectionConfiguration(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
): Promise<void> {
  const result = await client.stac.getCollectionConfiguration(targetCollectionId);
  console.log(`Collection configuration: ${JSON.stringify(result)}`);
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

  // List all collections
  const collectionsResponse = await client.stac.getCollections();
  console.log(`Found ${collectionsResponse.collections?.length ?? 0} collections`);

  // Create and configure collection
  await createCollection(client, collectionId);
  await updateCollection(client, collectionId);
  await managePartitionType(client, collectionId);
  await manageRenderOptions(client, collectionId);
  await getConformanceClass(client);
  await getLandingPage(client);
  await manageQueryables(client, collectionId);
  await manageTileSettings(client, collectionId);
  await manageMosaics(client, collectionId);
  await getCollectionConfiguration(client, collectionId);

  console.log("\nCollection Configuration Complete");
}

main().catch(console.error);
