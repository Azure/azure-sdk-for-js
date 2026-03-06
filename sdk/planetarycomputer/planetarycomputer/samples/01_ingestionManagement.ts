// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates comprehensive ingestion management operations including:
 * - Creating and managing ingestion sources (managed identity-based)
 * - Creating or replacing sources with replaceSource (idempotent)
 * - Retrieving specific sources with getSource
 * - Creating and updating ingestion definitions
 * - Retrieving specific ingestions with get
 * - Running ingestion jobs from public catalogs
 * - Listing ingestion runs with listRuns
 * - Monitoring ingestion status
 * - Managing ingestion operations
 *
 * @description
 * NOTE: Ingestion operations can take a significant amount of time to complete,
 * especially when ingesting collections with many items. Plan accordingly.
 *
 * USAGE:
 *   npx ts-node 01_ingestionManagement.ts
 *
 *   Set the environment variable PLANETARYCOMPUTER_ENDPOINT with your endpoint URL.
 *   Set the environment variable PLANETARYCOMPUTER_COLLECTION_ID with your collection ID.
 *
 *   Optional (for managed identity examples):
 *   Set the environment variable PLANETARYCOMPUTER_INGESTION_CONTAINER_URI with your container URI.
 *   Set the environment variable PLANETARYCOMPUTER_INGESTION_CATALOG_URL with your source catalog URL.
 *   Set the environment variable PLANETARYCOMPUTER_MANAGED_IDENTITY_OBJECT_ID with your managed identity object ID.
 *
 *   Optional (for SAS token examples):
 *   Set the environment variable PLANETARYCOMPUTER_INGESTION_SAS_CONTAINER_URI with your SAS container URI.
 *   Set the environment variable PLANETARYCOMPUTER_INGESTION_SAS_TOKEN with your SAS token.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { PlanetaryComputerProClient, KnownIngestionType } from "@azure/planetarycomputer";
import type {
  IngestionDefinition,
  ManagedIdentityIngestionSource,
  SharedAccessSignatureTokenIngestionSource,
} from "@azure/planetarycomputer";
import { randomUUID } from "crypto";

// Environment variables
const endpoint = process.env.PLANETARYCOMPUTER_ENDPOINT;
const collectionId = process.env.PLANETARYCOMPUTER_COLLECTION_ID;
const containerUri = process.env.PLANETARYCOMPUTER_INGESTION_CONTAINER_URI;
const sourceCatalogUrl = process.env.PLANETARYCOMPUTER_INGESTION_CATALOG_URL;
const managedIdentityObjectId = process.env.PLANETARYCOMPUTER_MANAGED_IDENTITY_OBJECT_ID;
const sasContainerUri = process.env.PLANETARYCOMPUTER_INGESTION_SAS_CONTAINER_URI;
const sasToken = process.env.PLANETARYCOMPUTER_INGESTION_SAS_TOKEN;

if (!endpoint) {
  throw new Error("PLANETARYCOMPUTER_ENDPOINT environment variable must be set");
}

if (!collectionId) {
  throw new Error("PLANETARYCOMPUTER_COLLECTION_ID environment variable must be set");
}

/**
 * Create managed identity-based ingestion source and return the source_id.
 */
async function createManagedIdentityIngestionSources(
  client: PlanetaryComputerProClient,
  targetContainerUri: string,
  targetManagedIdentityObjectId: string,
): Promise<string> {
  // Clean up existing sources
  const existingSources: Array<{ id: string }> = [];
  for await (const source of client.ingestion.listSources()) {
    existingSources.push(source);
  }

  for (const source of existingSources) {
    await client.ingestion.deleteSource(source.id);
    console.log(`Deleted existing source: ${source.id}`);
  }

  // Create ingestion source with unique ID
  const sourceId = randomUUID();
  const ingestionSource: ManagedIdentityIngestionSource = {
    id: sourceId,
    kind: "BlobManagedIdentity",
    connectionInfo: {
      containerUri: targetContainerUri,
      objectId: targetManagedIdentityObjectId,
    },
  };

  const createdSource = await client.ingestion.createSource(ingestionSource);
  console.log(`Created managed identity ingestion source: ${createdSource.id}`);

  // List managed identities
  console.log("Listing available managed identities:");
  for await (const identity of client.ingestion.listManagedIdentities()) {
    console.log(`  - Object ID: ${identity.objectId}`);
    console.log(`    Resource ID: ${identity.resourceId}`);
  }

  return sourceId;
}

/**
 * Create a SAS token ingestion source with example values.
 */
async function createSasTokenIngestionSource(
  client: PlanetaryComputerProClient,
  targetSasContainerUri: string,
  targetSasToken: string,
): Promise<string> {
  console.log("Creating SAS token ingestion source...");

  const sasSourceId = randomUUID();
  const sasIngestionSource: SharedAccessSignatureTokenIngestionSource = {
    id: sasSourceId,
    kind: "SasToken",
    connectionInfo: {
      containerUri: targetSasContainerUri,
      sharedAccessSignatureToken: targetSasToken,
    },
  };

  const createdSasSource = await client.ingestion.createSource(sasIngestionSource);
  console.log(`Created SAS token ingestion source: ${createdSasSource.id}`);
  return createdSasSource.id;
}

/**
 * Demonstrate replaceSource idempotent operation.
 */
async function createOrReplaceSource(
  client: PlanetaryComputerProClient,
  targetSasContainerUri: string,
  targetSasToken: string,
  sourceId: string,
): Promise<string> {
  const ingestionSource: SharedAccessSignatureTokenIngestionSource = {
    id: sourceId,
    kind: "SasToken",
    connectionInfo: {
      containerUri: targetSasContainerUri,
      sharedAccessSignatureToken: targetSasToken,
    },
  };

  // First call - replaces the existing source with original token
  console.log(`First call to replaceSource with existing source ID: ${sourceId}`);
  const firstResult = await client.ingestion.replaceSource(sourceId, ingestionSource);
  console.log(`First call result: ${firstResult.id}`);

  // Second call - replaces again with modified token (demonstrates update capability)
  const updatedToken =
    "sp=rl&st=2025-01-01T00:00:00Z&se=2099-12-31T23:59:59Z&sv=2023-01-03&sr=c&sig=UpdatedRandomSignature123456";

  const updatedIngestionSource: SharedAccessSignatureTokenIngestionSource = {
    id: sourceId,
    kind: "SasToken",
    connectionInfo: {
      containerUri: targetSasContainerUri,
      sharedAccessSignatureToken: updatedToken,
    },
  };

  console.log("Second call to replaceSource with updated SAS token");
  const secondResult = await client.ingestion.replaceSource(sourceId, updatedIngestionSource);
  console.log(`Second call result: ${secondResult.id}`);

  return secondResult.id;
}

/**
 * Retrieve a specific ingestion source by ID.
 */
async function getSourceById(client: PlanetaryComputerProClient, sourceId: string): Promise<void> {
  console.log(`Retrieving ingestion source: ${sourceId}`);

  try {
    const source = await client.ingestion.getSource(sourceId);
    console.log(`Successfully retrieved source: ${source.id}`);
  } catch (e) {
    console.error(`Failed to retrieve source ${sourceId}: ${e}`);
  }
}

/**
 * Create, update, and run ingestion from sample public catalog on GitHub.
 * NOTE: This operation can take significant time to complete.
 */
async function createGitHubPublicIngestion(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
  targetSourceCatalogUrl: string,
): Promise<string> {
  // Delete all existing ingestions
  console.log("Deleting all existing ingestions...");
  const existingIngestions: Array<{ id: string }> = [];
  for await (const ingestion of client.ingestion.list(targetCollectionId)) {
    existingIngestions.push(ingestion);
  }

  for (const ingestion of existingIngestions) {
    const deletePoller = client.ingestion.delete(targetCollectionId, ingestion.id);
    await deletePoller.pollUntilDone();
    console.log(`Deleted existing ingestion: ${ingestion.id}`);
  }

  // Create ingestion definition
  const ingestionDefinition: IngestionDefinition = {
    importType: KnownIngestionType.StaticCatalog,
    displayName: "Sample Ingestion",
    sourceCatalogUrl: targetSourceCatalogUrl,
    keepOriginalAssets: true,
    skipExistingItems: true,
  };

  // Create the ingestion
  console.log("Creating ingestion for sample catalog...");
  const ingestionResponse = await client.ingestion.create(targetCollectionId, ingestionDefinition);
  const ingestionId = ingestionResponse.id;
  console.log(`Created ingestion: ${ingestionId}`);

  // Update the ingestion display name
  const updatedDefinition: IngestionDefinition = {
    importType: KnownIngestionType.StaticCatalog,
    displayName: "Sample Dataset Ingestion",
  };

  const ingestion = await client.ingestion.update(
    targetCollectionId,
    ingestionId!,
    updatedDefinition,
  );
  console.log(`Updated ingestion display name to: ${ingestion.displayName}`);

  return ingestionId!;
}

/**
 * Retrieve a specific ingestion by ID.
 */
async function getIngestionById(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
  ingestionId: string,
): Promise<void> {
  console.log(`Retrieving ingestion: ${ingestionId} from collection: ${targetCollectionId}`);

  try {
    const ingestion = await client.ingestion.get(targetCollectionId, ingestionId);

    console.log(`Successfully retrieved ingestion: ${ingestion.id}`);
    console.log(`  Display name: ${ingestion.displayName}`);
    console.log(`  Import type: ${ingestion.importType}`);
    if (ingestion.sourceCatalogUrl) {
      console.log(`  Source catalog: ${ingestion.sourceCatalogUrl}`);
    }
  } catch (e) {
    console.error(`Failed to retrieve ingestion ${ingestionId}: ${e}`);
  }
}

/**
 * Create an ingestion run.
 * NOTE: This triggers the actual ingestion process which can take significant time.
 */
async function createIngestionRun(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
  ingestionId: string,
): Promise<string> {
  console.log("Creating ingestion run...");
  console.log("NOTE: This may take a significant amount of time to complete.");

  const runResponse = await client.ingestion.createRun(targetCollectionId, ingestionId);
  console.log(`Created ingestion run: ${runResponse.id}`);
  return runResponse.id!;
}

/**
 * List all runs for a specific ingestion.
 */
async function listIngestionRuns(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
  ingestionId: string,
): Promise<void> {
  console.log(`Listing runs for ingestion: ${ingestionId}`);

  try {
    const runs: Array<{ id?: string; operation?: Record<string, unknown> }> = [];
    for await (const run of client.ingestion.listRuns(targetCollectionId, ingestionId)) {
      runs.push(run);
    }

    console.log(`Found ${runs.length} run(s) for ingestion ${ingestionId}`);

    for (const run of runs) {
      const operation = run.operation;
      console.log(`  Run ID: ${run.id}`);
      if (operation) {
        console.log(`    Status: ${operation.status}`);
        console.log(
          `    Items - Total: ${operation.totalItems}, ` +
            `Successful: ${operation.totalSuccessfulItems}, ` +
            `Failed: ${operation.totalFailedItems}, ` +
            `Pending: ${operation.totalPendingItems}`,
        );
      }
    }
  } catch (e) {
    console.error(`Failed to list runs for ingestion ${ingestionId}: ${e}`);
  }
}

/**
 * List, get, and cancel ingestion operations.
 * Note: This demonstrates the cancel API but skips cancellation to allow ingestion to complete.
 */
async function manageOperations(client: PlanetaryComputerProClient): Promise<void> {
  console.log("Listing operations...");

  const operations: Array<{ id: string }> = [];
  for await (const operation of client.ingestion.listOperations()) {
    operations.push(operation);
  }

  console.log(`Found ${operations.length} operations`);

  if (operations.length > 0) {
    // Get a specific operation
    const operationId = operations[0].id;
    const operation = await client.ingestion.getOperation(operationId);
    console.log(`Retrieved operation: ${operation.id}`);

    // Note: We're NOT cancelling the operation here to allow ingestion to complete.
    // To cancel an operation, you would use:
    // await client.ingestion.cancelOperation(operation.id!);
    console.log(`Skipping cancel to allow ingestion to complete`);
  }
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

  // Check if all required environment variables are set
  if (!containerUri || !sourceCatalogUrl || !managedIdentityObjectId) {
    console.log("Skipping managed identity source creation - environment variables not set");
  } else {
    await createManagedIdentityIngestionSources(client, containerUri, managedIdentityObjectId);
  }

  if (!sasContainerUri || !sasToken) {
    console.log("Skipping SAS token source creation - environment variables not set");
  } else {
    const sasSourceId = await createSasTokenIngestionSource(client, sasContainerUri, sasToken);

    // Demonstrate advanced source operations (idempotent)
    const updatedSourceId = await createOrReplaceSource(
      client,
      sasContainerUri,
      sasToken,
      sasSourceId,
    );
    await getSourceById(client, updatedSourceId);
  }

  if (!sourceCatalogUrl) {
    console.log("Skipping public ingestion - PLANETARYCOMPUTER_INGESTION_CATALOG_URL not set");
  } else {
    // Run actual ingestion hosted on GitHub
    const publicIngestionId = await createGitHubPublicIngestion(
      client,
      collectionId,
      sourceCatalogUrl,
    );

    // Demonstrate advanced ingestion operations
    await getIngestionById(client, collectionId, publicIngestionId);

    // Create an ingestion run (this triggers actual data ingestion)
    await createIngestionRun(client, collectionId, publicIngestionId);

    // List all runs for the ingestion
    await listIngestionRuns(client, collectionId, publicIngestionId);
  }

  // Manage operations
  await manageOperations(client);

  console.log("\nIngestion Management Complete");
}

main().catch(console.error);
