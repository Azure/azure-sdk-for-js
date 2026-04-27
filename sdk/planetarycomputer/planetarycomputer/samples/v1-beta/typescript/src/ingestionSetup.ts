// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Creates and manages ingestion definitions and runs for test data.
 *
 * This sample demonstrates ingestion operations including:
 * - Creating ingestion sources with Managed Identity
 * - Creating ingestion sources with SAS tokens
 * - Creating ingestion definitions from public GitHub sources
 * - Creating and monitoring ingestion runs
 * - Listing and managing operations
 */

import {
  PlanetaryComputerProClient,
  KnownIngestionType,
} from "@azure/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";
import type {
  IngestionDefinition,
  IngestionRun,
  ManagedIdentityIngestionSource,
  SharedAccessSignatureTokenIngestionSource,
} from "@azure/planetarycomputer";
import { config } from "dotenv";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { randomUUID } from "crypto";

// Load the .env file from the package root
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: resolve(__dirname, "..", ".env") });

// Get configuration from environment
const endpoint = process.env.PLANETARYCOMPUTER_ENDPOINT || "";
const collectionId = process.env.PLANETARYCOMPUTER_COLLECTION_ID || "naip-atl";

// Ingestion configuration from .env
const ingestionCatalogUrl = process.env.PLANETARYCOMPUTER_INGESTION_CATALOG_URL;
const managedIdentityObjectId = process.env.PLANETARYCOMPUTER_MANAGED_IDENTITY_OBJECT_ID;

// SAS Token configuration from .env
const sasContainerUri = process.env.PLANETARYCOMPUTER_INGESTION_SAS_CONTAINER_URI;
const sasToken = process.env.PLANETARYCOMPUTER_INGESTION_SAS_TOKEN;

/**
 * Helper to check if a source exists by trying to get it.
 */
async function sourceExists(client: PlanetaryComputerProClient, sourceId: string): Promise<boolean> {
  try {
    await client.ingestion.getSource(sourceId);
    return true;
  } catch {
    return false;
  }
}

/**
 * Helper to check if an ingestion exists by trying to get it.
 */
async function ingestionExists(
  client: PlanetaryComputerProClient,
  collectionId: string,
  ingestionId: string,
): Promise<boolean> {
  try {
    await client.ingestion.get(collectionId, ingestionId);
    return true;
  } catch {
    return false;
  }
}

/**
 * Creates an ingestion source using Managed Identity authentication.
 */
async function createManagedIdentityIngestionSource(
  client: PlanetaryComputerProClient,
  sourceId: string,
): Promise<void> {
  console.log(`\nCreating Managed Identity ingestion source '${sourceId}'...`);

  // Create source with Managed Identity using env vars
  // Container URI should be like: https://datazoo.blob.core.windows.net/sentinel2static
  const containerUri = process.env.PLANETARYCOMPUTER_INGESTION_CONTAINER_URI || "";

  if (!containerUri || !managedIdentityObjectId) {
    console.log("Skipping MI source creation - PLANETARYCOMPUTER_INGESTION_CONTAINER_URI and/or PLANETARYCOMPUTER_MANAGED_IDENTITY_OBJECT_ID not set");
    return;
  }

  // Check if source already exists
  if (await sourceExists(client, sourceId)) {
    console.log(`Source '${sourceId}' already exists, deleting...`);
    await client.ingestion.deleteSource(sourceId);
  }

  const source: ManagedIdentityIngestionSource = {
    kind: "BlobManagedIdentity",
    id: sourceId,
    connectionInfo: {
      containerUri: containerUri,
      objectId: managedIdentityObjectId || "",
    },
  };

  try {
    await client.ingestion.createSource(source);
    console.log(`Created Managed Identity source '${sourceId}'`);
  } catch (error: unknown) {
    // May fail if container already has a source
    console.log(`Warning: Could not create MI source: ${(error as Error).message}`);
    return;
  }

  // Retrieve to verify (separate try-catch to continue even if get fails)
  try {
    const retrieved = await client.ingestion.getSource(sourceId);
    console.log(`Retrieved source: ${retrieved.id}, kind: ${retrieved.kind}`);
  } catch {
    console.log(`Warning: Source created but could not be retrieved`);
  }
}

/**
 * Creates an ingestion source using SAS token authentication.
 */
async function createSasTokenIngestionSource(
  client: PlanetaryComputerProClient,
  sourceId: string,
): Promise<void> {
  console.log(`\nCreating SAS Token ingestion source '${sourceId}'...`);

  if (!sasToken || !sasContainerUri) {
    console.log("Skipping SAS token source creation - SAS env vars not set");
    return;
  }

  // Check if source already exists
  if (await sourceExists(client, sourceId)) {
    console.log(`Source '${sourceId}' already exists, deleting...`);
    await client.ingestion.deleteSource(sourceId);
  }

  // Create source with SAS token from env vars
  const source: SharedAccessSignatureTokenIngestionSource = {
    kind: "SasToken",
    id: sourceId,
    connectionInfo: {
      containerUri: sasContainerUri,
      sharedAccessSignatureToken: sasToken,
    },
  };

  try {
    await client.ingestion.createSource(source);
    console.log(`Created SAS Token source '${sourceId}'`);
  } catch (error: unknown) {
    // May fail if container already has a source
    console.log(`Warning: Could not create SAS source: ${(error as Error).message}`);
    return;
  }

  // Retrieve to verify (separate try-catch to continue even if get fails)
  try {
    const retrieved = await client.ingestion.getSource(sourceId);
    console.log(`Retrieved source: ${retrieved.id}, kind: ${retrieved.kind}`);
  } catch {
    console.log(`Warning: Source created but could not be retrieved`);
  }
}

/**
 * Creates or replaces an ingestion source (idempotent operation).
 */
async function createOrReplaceSource(
  client: PlanetaryComputerProClient,
  sourceId: string,
): Promise<void> {
  console.log(`\nCreating or replacing source '${sourceId}'...`);

  const containerUri = process.env.PLANETARYCOMPUTER_INGESTION_CONTAINER_URI || "";

  if (!containerUri || !managedIdentityObjectId) {
    console.log("Skipping createOrReplace - PLANETARYCOMPUTER_INGESTION_CONTAINER_URI and/or PLANETARYCOMPUTER_MANAGED_IDENTITY_OBJECT_ID not set");
    return;
  }

  // Create or replace source (idempotent)
  const source: ManagedIdentityIngestionSource = {
    kind: "BlobManagedIdentity",
    id: sourceId,
    connectionInfo: {
      containerUri: containerUri,
      objectId: managedIdentityObjectId,
    },
  };

  try {
    await client.ingestion.replaceSource(sourceId, source);
    console.log(`Created or replaced source '${sourceId}'`);
  } catch (error: unknown) {
    // May fail if container already has a source
    console.log(`Warning: Could not create/replace source: ${(error as Error).message}`);
  }
}

/**
 * Creates an ingestion definition from a public GitHub catalog.
 * This is a common pattern for importing public STAC catalogs.
 */
async function createGithubPublicIngestion(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
): Promise<string | null> {
  console.log(`\nCreating GitHub public ingestion...`);

  // Create ingestion definition from public GitHub STAC catalog
  // Using the catalog URL from environment variables
  const catalogUrl =
    ingestionCatalogUrl ||
    "https://raw.githubusercontent.com/microsoft/planetary-computer-tasks/refs/heads/main/datasets/naip/data-files/naip-al_2019-2023/collection.json";

  // Note: id is auto-generated by the server, don't specify it
  const ingestionPayload = {
    importType: KnownIngestionType.StaticCatalog,
    displayName: "NAIP Sample Data from GitHub",
    sourceCatalogUrl: catalogUrl,
    skipExistingItems: true,
    keepOriginalAssets: true,
  };

  let createdIngestion;
  try {
    createdIngestion = await client.ingestion.create(targetCollectionId, ingestionPayload as IngestionDefinition);
    console.log(`Created ingestion with ID: ${createdIngestion.id}`);
    console.log(`  Display name: ${createdIngestion.displayName}`);
    console.log(`  Source URL: ${createdIngestion.sourceCatalogUrl}`);
    return createdIngestion.id;
  } catch (error: unknown) {
    console.log(`Warning: Could not create ingestion: ${(error as Error).message}`);
    return null;
  }
}

/**
 * Creates and monitors an ingestion run.
 */
async function createIngestionRun(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
  ingestionId: string,
): Promise<IngestionRun | null> {
  console.log(`\nCreating ingestion run for '${ingestionId}'...`);

  // Check if ingestion exists
  if (!(await ingestionExists(client, targetCollectionId, ingestionId))) {
    console.log(`Ingestion '${ingestionId}' does not exist, cannot create run`);
    return null;
  }

  // Create ingestion run
  const run: IngestionRun = {};
  const createdRun = await client.ingestion.createRun(targetCollectionId, ingestionId, run);
  console.log(`Created ingestion run: ${createdRun.id}`);
  console.log(`Status: ${createdRun.status}`);

  return createdRun;
}

/**
 * Lists all ingestion runs for an ingestion definition.
 */
async function listIngestionRuns(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
  ingestionId: string,
): Promise<void> {
  console.log(`\nListing ingestion runs for '${ingestionId}'...`);

  // Check if ingestion exists
  if (!(await ingestionExists(client, targetCollectionId, ingestionId))) {
    console.log(`Ingestion '${ingestionId}' does not exist`);
    return;
  }

  const runs: IngestionRun[] = [];
  for await (const run of client.ingestion.listRuns(targetCollectionId, ingestionId)) {
    runs.push(run);
  }
  console.log(`Found ${runs.length} ingestion runs:`);

  for (const run of runs) {
    console.log(`  - Run ID: ${run.id}, Status: ${run.status}`);
  }
}

/**
 * Lists and optionally cancels pending operations.
 */
async function manageOperations(client: PlanetaryComputerProClient): Promise<void> {
  console.log("\nListing pending operations...");

  const operations: { id?: string; status?: string }[] = [];
  for await (const op of client.ingestion.listOperations()) {
    operations.push(op);
    if (operations.length >= 5) break; // Only get first 5
  }
  console.log(`Found ${operations.length} operations:`);

  for (const op of operations) {
    console.log(`  - Operation ID: ${op.id}, Status: ${op.status}`);
  }
}

/**
 * Lists all ingestion sources.
 */
async function listAllSources(client: PlanetaryComputerProClient): Promise<void> {
  console.log("\nListing all ingestion sources...");
  const sources: { id?: string; kind?: string }[] = [];
  for await (const source of client.ingestion.listSources()) {
    sources.push(source);
  }
  console.log(`Found ${sources.length} sources:`);

  for (const source of sources) {
    console.log(`  - Source ID: ${source.id}, Kind: ${source.kind}`);
  }
}

/**
 * Lists all ingestions for a collection.
 */
async function listAllIngestions(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
): Promise<void> {
  console.log(`\nListing all ingestions for collection '${targetCollectionId}'...`);
  const ingestions: IngestionDefinition[] = [];
  for await (const ingestion of client.ingestion.list(targetCollectionId)) {
    ingestions.push(ingestion);
  }
  console.log(`Found ${ingestions.length} ingestions:`);

  for (const ingestion of ingestions) {
    console.log(`  - Ingestion ID: ${ingestion.id}, Display Name: ${ingestion.displayName}`);
  }
}

/**
 * Waits for an ingestion run to complete.
 */
async function waitForIngestionRunCompletion(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
  ingestionId: string,
  runId: string,
  maxWaitSeconds: number = 300,
): Promise<void> {
  console.log(`\nWaiting for ingestion run '${runId}' to complete (max ${maxWaitSeconds}s)...`);

  const startTime = Date.now();
  let lastStatus = "";

  while ((Date.now() - startTime) / 1000 < maxWaitSeconds) {
    const run = await client.ingestion.getRun(targetCollectionId, ingestionId, runId);

    if (run.status !== lastStatus) {
      console.log(`  Status: ${run.status}`);
      lastStatus = run.status || "";
    }

    if (run.status === "Completed" || run.status === "Failed" || run.status === "Cancelled") {
      console.log(`Ingestion run completed with status: ${run.status}`);
      return;
    }

    // Wait 5 seconds before checking again
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  console.log(`Timed out waiting for ingestion run to complete`);
}

async function main(): Promise<void> {
  if (!endpoint) {
    throw new Error("PLANETARYCOMPUTER_ENDPOINT environment variable must be set");
  }

  console.log("=".repeat(80));
  console.log("Ingestion Management Sample");
  console.log("=".repeat(80));
  console.log(`Endpoint: ${endpoint}`);
  console.log(`Collection ID: ${collectionId}`);

  // Create client
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(endpoint, credential);

  // List existing sources and ingestions
  await listAllSources(client);
  await listAllIngestions(client, collectionId);
  await manageOperations(client);

  // Create ingestion sources (skip if no credentials configured)
  // Note: Source IDs must be UUIDs according to the API
  if (managedIdentityObjectId) {
    await createManagedIdentityIngestionSource(client, randomUUID());
  } else {
    console.log("\nSkipping MI source creation - PLANETARYCOMPUTER_MANAGED_IDENTITY_OBJECT_ID not set");
  }

  await createSasTokenIngestionSource(client, randomUUID());

  // Create idempotent source
  await createOrReplaceSource(client, randomUUID());

  // Create GitHub public ingestion (using catalog URL from .env)
  const ingestionId = await createGithubPublicIngestion(client, collectionId);

  if (ingestionId) {
    // Create ingestion run
    const run = await createIngestionRun(client, collectionId, ingestionId);

    // List ingestion runs
    await listIngestionRuns(client, collectionId, ingestionId);

    // Optionally wait for completion
    if (run?.id) {
      const waitForCompletion = process.env.WAIT_FOR_INGESTION_COMPLETION === "true";
      if (waitForCompletion) {
        await waitForIngestionRunCompletion(client, collectionId, ingestionId, run.id);
      } else {
        console.log("\nSkipping wait for ingestion completion - set WAIT_FOR_INGESTION_COMPLETION=true to wait");
      }
    }
  } else {
    console.log("\nSkipping ingestion run creation - ingestion was not created");
  }

  console.log("\n" + "=".repeat(80));
  console.log("Ingestion Management Complete!");
  console.log("=".repeat(80));
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
