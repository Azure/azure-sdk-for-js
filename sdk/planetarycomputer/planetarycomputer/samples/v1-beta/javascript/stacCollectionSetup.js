// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Creates and configures a STAC collection with all necessary settings for testing.
 *
 * This sample demonstrates STAC collection operations including:
 * - Creating and deleting STAC collections
 * - Updating collection metadata
 * - Getting and managing collection partition types
 * - Creating and managing render options
 * - Creating and managing collection mosaics
 * - Managing tile settings
 * - Creating and managing queryables
 * - Uploading collection assets (thumbnail)
 */

const {
  PlanetaryComputerProClient,
  KnownPartitionTypeScheme,
} = require("@azure/planetarycomputer");
const { DefaultAzureCredential } = require("@azure/identity");
const { config } = require("dotenv");
const { dirname, resolve } = require("path");
const { fileURLToPath } = require("url");

// Load the .env file from the package root
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: resolve(__dirname, "..", ".env") });

// Get configuration from environment
const endpoint = process.env.PLANETARYCOMPUTER_ENDPOINT || "";
const collectionId = process.env.PLANETARYCOMPUTER_COLLECTION_ID || "naip-atl";

/**
 * Creates a new STAC collection with item assets.
 * Uses Georgia state bounds and NAIP-style configuration.
 */
async function createCollection(client, targetCollectionId) {
  console.log(`\nChecking if collection '${targetCollectionId}' exists...`);

  // Check if collection already exists by trying to get it directly
  let collectionExists = false;
  try {
    await client.stac.getCollection(targetCollectionId);
    collectionExists = true;
  } catch (error) {
    if (error.statusCode === 404) {
      console.log(`Collection '${targetCollectionId}' does not exist`);
    } else {
      throw error;
    }
  }

  if (collectionExists) {
    console.log(`Collection '${targetCollectionId}' already exists, skipping creation...`);
    return await client.stac.getCollection(targetCollectionId);
  }

  // Create collection payload matching Python SDK structure
  // Using Georgia state bounds
  const collectionData = {
    id: targetCollectionId,
    description: "A Subset of imagery for sample MPC Pro GeoCatalog deployments.",
    extent: {
      spatial: {
        boundingBox: [[-85.605165, 30.357851, -80.839729, 35.000659]], // Georgia state bounds
      },
      temporal: {
        interval: [[new Date("2020-01-01T00:00:00Z"), new Date("2099-12-31T23:59:59Z")]],
      },
    },
    license: "proprietary",
    links: [],
    stacVersion: "1.0.0",
    title: "MPC Pro Sample Datasets",
    type: "Collection",
    providers: [
      {
        url: "https://www.fsa.usda.gov/programs-and-services/aerial-photography/imagery-programs/naip-imagery/",
        name: "USDA Farm Service Agency",
        roles: ["producer", "licensor"],
      },
      {
        url: "https://www.esri.com/",
        name: "Esri",
        roles: ["processor"],
      },
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
    itemAssets: {
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
    stacExtensions: [
      "https://stac-extensions.github.io/item-assets/v1.0.0/schema.json",
      "https://stac-extensions.github.io/table/v1.2.0/schema.json",
    ],
  };

  // Create the collection (LRO) with retry for deletion conflicts
  console.log(`Creating collection '${targetCollectionId}'...`);
  let retryCount = 0;
  const maxRetries = 6;
  while (retryCount < maxRetries) {
    try {
      const createPoller = client.stac.createCollection(collectionData);
      await createPoller.pollUntilDone();
      console.log(`Collection '${targetCollectionId}' created successfully`);
      break;
    } catch (error) {
      if (error.code === "CollectionBeingDeleted" && retryCount < maxRetries - 1) {
        retryCount++;
        console.log(
          `Collection still being deleted, waiting 10s... (attempt ${retryCount}/${maxRetries})`,
        );
        await new Promise((resolve) => setTimeout(resolve, 10000));
      } else {
        throw error;
      }
    }
  }

  // Get the created collection to verify
  console.log(`Retrieving collection '${targetCollectionId}'...`);
  const collection = await client.stac.getCollection(targetCollectionId);
  console.log(`Retrieved collection: ${collection.title}`);
  console.log(`Description: ${collection.description}`);

  return collection;
}

/**
 * Updates an existing collection's metadata.
 */
async function updateCollection(client, targetCollectionId) {
  console.log(`\nSkipping collection update - itemAssets field restrictions prevent safe updates`);
  console.log(`(The API does not allow sending itemAssets even if unchanged)`);
}

/**
 * Gets and updates collection partition type.
 */
async function managePartitionType(client, targetCollectionId) {
  console.log(`\nGetting partition type for collection '${targetCollectionId}'...`);
  const partitionType = await client.stac.getPartitionType(targetCollectionId);
  console.log(`Current partition scheme: ${partitionType.scheme}`);

  // Check if collection is empty before updating
  const items = await client.stac.getItemCollection(targetCollectionId);
  if (items.features && items.features.length > 0) {
    console.log("Collection is not empty, skipping partition type update");
  } else {
    console.log("Updating partition type to YEAR scheme...");
    const newPartitionType = { scheme: KnownPartitionTypeScheme.Year };
    await client.stac.replacePartitionType(targetCollectionId, newPartitionType);
    console.log("Partition type updated successfully");
  }
}

/**
 * Creates and manages render options for a collection.
 */
async function manageRenderOptions(client, targetCollectionId) {
  console.log(`\nManaging render options for collection '${targetCollectionId}'...`);

  const renderOptionId = "natural-color";

  // Check if render option already exists
  const existingOptions = await client.stac.listRenderOptions(targetCollectionId);
  if (existingOptions.some((ro) => ro.id === renderOptionId)) {
    console.log(`Render option '${renderOptionId}' already exists, deleting it...`);
    await client.stac.deleteRenderOption(targetCollectionId, renderOptionId);
  }

  // Create render option
  const renderOption = {
    id: renderOptionId,
    name: "Natural color",
    type: "raster-tile",
    options: "assets=image&asset_bidx=image|1,2,3",
    minZoom: 6,
  };

  console.log(`Creating render option '${renderOptionId}'...`);
  await client.stac.createRenderOption(targetCollectionId, renderOption);

  // Update with description
  renderOption.description = "RGB from visual assets";
  await client.stac.replaceRenderOption(targetCollectionId, renderOptionId, renderOption);

  // Get the created render option
  const retrievedOption = await client.stac.getRenderOption(targetCollectionId, renderOptionId);
  console.log(`Retrieved render option: ${retrievedOption.name}`);
}

/**
 * Creates and manages collection mosaics.
 */
async function manageMosaics(client, targetCollectionId) {
  console.log(`\nManaging mosaics for collection '${targetCollectionId}'...`);

  const mosaicId = "mos1";

  // Check existing mosaics
  const existingMosaics = await client.stac.listMosaics(targetCollectionId);
  if (existingMosaics.some((m) => m.id === mosaicId)) {
    console.log(`Mosaic '${mosaicId}' already exists, deleting it...`);
    await client.stac.deleteMosaic(targetCollectionId, mosaicId);
  }

  // Create mosaic
  const mosaic = {
    id: mosaicId,
    name: "Most recent available",
    cql: [],
  };

  console.log(`Creating mosaic '${mosaicId}'...`);
  await client.stac.addMosaic(targetCollectionId, mosaic);

  // Update with description
  mosaic.description = "Most recent available imagery in this collection";
  await client.stac.replaceMosaic(targetCollectionId, mosaicId, mosaic);

  // Get the mosaic
  const retrievedMosaic = await client.stac.getMosaic(targetCollectionId, mosaicId);
  console.log(`Retrieved mosaic: ${retrievedMosaic.name}`);
}

/**
 * Gets and updates tile settings for a collection.
 */
async function manageTileSettings(client, targetCollectionId) {
  console.log(`\nGetting tile settings for collection '${targetCollectionId}'...`);
  const currentSettings = await client.stac.getTileSettings(targetCollectionId);
  console.log(`Current settings: maxItemsPerTile=${currentSettings.maxItemsPerTile}`);

  // Update tile settings
  console.log("Updating tile settings...");
  const newSettings = {
    defaultLocation: null,
    maxItemsPerTile: 35,
    minZoom: 6,
  };
  const updatedSettings = await client.stac.replaceTileSettings(targetCollectionId, newSettings);
  console.log(`Updated settings: maxItemsPerTile=${updatedSettings.maxItemsPerTile}`);
}

/**
 * Creates and manages queryables for a collection.
 */
async function manageQueryables(client, targetCollectionId) {
  console.log(`\nManaging queryables for collection '${targetCollectionId}'...`);

  const queryableName = "eo:cloud_cover";

  // Check existing queryables
  const existingQueryables = await client.stac.getCollectionQueryables(targetCollectionId);
  if (existingQueryables.properties && queryableName in existingQueryables.properties) {
    console.log(`Queryable '${queryableName}' already exists, deleting it...`);
    await client.stac.deleteQueryable(targetCollectionId, queryableName);
  }

  // Create queryable
  const queryable = {
    name: queryableName,
    dataType: "number",
    createIndex: false,
    definition: {
      dataType: "number",
    },
  };

  console.log(`Creating queryable '${queryableName}'...`);
  await client.stac.createQueryables(targetCollectionId, [queryable]);

  // Update with description
  queryable.definition = { description: "Cloud cover percentage" };
  await client.stac.replaceQueryable(targetCollectionId, queryableName, queryable);

  console.log(`Queryable '${queryableName}' created and updated`);
}

/**
 * Creates and manages collection assets like thumbnails.
 */
async function manageCollectionAssets(client, targetCollectionId) {
  console.log(`\nManaging collection assets for '${targetCollectionId}'...`);

  const thumbnailUrl =
    "https://ai4edatasetspublicassets.blob.core.windows.net/assets/pc_thumbnails/naip.png";

  // Download thumbnail
  console.log("Downloading thumbnail from public URL...");
  const response = await fetch(thumbnailUrl);
  const thumbnailBuffer = Buffer.from(await response.arrayBuffer());
  console.log(`Downloaded ${thumbnailBuffer.length} bytes`);

  // Define thumbnail asset metadata
  const assetData = {
    key: "thumbnail",
    href: thumbnailUrl,
    type: "image/png",
    roles: ["thumbnail"],
    title: "Thumbnail",
  };

  // Delete existing thumbnail if present
  try {
    await client.stac.deleteCollectionAsset(targetCollectionId, "thumbnail");
    console.log("Deleted existing thumbnail asset");
  } catch {
    console.log("No existing thumbnail asset to delete");
  }

  // Create Collection Asset
  console.log("Creating collection thumbnail asset...");
  await client.stac.createCollectionAsset(targetCollectionId, {
    data: assetData,
    file: {
      contents: thumbnailBuffer,
      filename: "thumbnail.png",
      contentType: "image/png",
    },
  });

  console.log("Collection thumbnail asset created successfully");

  // Get the thumbnail to verify
  const thumbnailData = await client.stac.getCollectionThumbnail(targetCollectionId);
  console.log(`Verified thumbnail retrieval: ${thumbnailData.length} bytes`);
}

/**
 * Gets STAC conformance classes.
 */
async function getConformanceClass(client) {
  console.log("\nGetting STAC conformance classes...");
  const conformance = await client.stac.getConformanceClass();
  console.log(`Found ${conformance.conformsTo?.length || 0} conformance classes`);
}

/**
 * Gets STAC landing page.
 */
async function getLandingPage(client) {
  console.log("\nGetting STAC landing page...");
  try {
    const landingPage = await client.stac.getLandingPage();
    console.log(`Landing page title: ${landingPage.title}`);
  } catch (error) {
    // Note: This endpoint may require different authentication or may not be supported
    console.log(`Warning: Could not retrieve landing page: ${error.message}`);
  }
}

/**
 * Gets collection configuration.
 */
async function getCollectionConfiguration(client, targetCollectionId) {
  console.log(`\nGetting collection configuration for '${targetCollectionId}'...`);
  try {
    const config = await client.stac.getCollectionConfiguration(targetCollectionId);
    console.log(`Configuration retrieved: ${JSON.stringify(config).substring(0, 100)}...`);
  } catch (error) {
    console.log(`Warning: Could not retrieve collection configuration: ${error.message}`);
  }
}

async function main() {
  if (!endpoint) {
    throw new Error("PLANETARYCOMPUTER_ENDPOINT environment variable must be set");
  }

  console.log("=".repeat(80));
  console.log("STAC Collection Setup Sample");
  console.log("=".repeat(80));
  console.log(`Endpoint: ${endpoint}`);
  console.log(`Collection ID: ${collectionId}`);

  // Create client
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(endpoint, credential);

  // Execute collection setup workflow
  await createCollection(client, collectionId);
  await updateCollection(client, collectionId);
  await managePartitionType(client, collectionId);
  await manageRenderOptions(client, collectionId);
  await manageMosaics(client, collectionId);
  await manageTileSettings(client, collectionId);
  await manageQueryables(client, collectionId);
  await getConformanceClass(client);
  await getLandingPage(client);
  await getCollectionConfiguration(client, collectionId);
  await manageCollectionAssets(client, collectionId);

  console.log("\n" + "=".repeat(80));
  console.log("Collection Setup Complete!");
  console.log("=".repeat(80));
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
