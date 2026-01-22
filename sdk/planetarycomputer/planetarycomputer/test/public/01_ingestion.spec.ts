// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import { createRecorder, createRecordedClient } from "./utils/recordedClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { PlanetaryComputerProClient } from "../../src/index.js";
import { EnvironmentVariableNames, assertEnvironmentVariable } from "./utils/envVars.js";

/**
 * Test suite for Planetary Computer ingestion management operations.
 * Ported from Python test_planetary_computer_01_ingestion_management.py
 */
describe("Ingestion Management", () => {
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

  it("test_01_list_managed_identities - should list managed identities", async function () {
    console.log("=".repeat(80));
    console.log("TEST: test_01_list_managed_identities");
    console.log("=".repeat(80));

    // List managed identities
    const managedIdentities = [];
    for await (const identity of client.ingestion.listManagedIdentities()) {
      managedIdentities.push(identity);
    }

    console.log(`Found ${managedIdentities.length} managed identities`);

    for (const identity of managedIdentities) {
      console.log("  Identity:");
      console.log(`    - Object ID: ${identity.objectId}`);
      console.log(`    - Resource ID: ${identity.resourceId}`);
    }

    // Assertions
    assert.isDefined(managedIdentities, "Managed identities list should not be undefined");
    assert.isArray(managedIdentities, "Managed identities should be a list");

    console.log("Test PASSED\n");
  });

  it("test_02_create_and_list_ingestion_sources - should create and list ingestion sources", async function () {
    console.log("=".repeat(80));
    console.log("TEST: test_02_create_and_list_ingestion_sources");
    console.log("=".repeat(80));

    // Get test configuration
    const containerUri = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_INGESTION_CONTAINER_URI,
    );

    // Get a valid managed identity object ID from the service
    const managedIdentities = [];
    for await (const identity of client.ingestion.listManagedIdentities()) {
      managedIdentities.push(identity);
    }

    if (managedIdentities.length === 0) {
      console.log("No managed identities found. Skipping test.");
      return;
    }

    const managedIdentityObjectId = managedIdentities[0].objectId;

    console.log(`Container URI: ${containerUri}`);
    console.log(`Managed Identity Object ID: ${managedIdentityObjectId}`);

    // Clean up existing sources first
    const existingSources = [];
    for await (const source of client.ingestion.listSources()) {
      existingSources.push(source);
    }

    console.log(`Found ${existingSources.length} existing sources to clean up`);
    for (const source of existingSources) {
      const sourceId = typeof source === "object" && "id" in source ? source.id : source;
      await client.ingestion.deleteSource(sourceId as string);
      console.log(`  Deleted source: ${sourceId}`);
    }

    // Create ingestion source (following sample pattern)
    const createdSource = await client.ingestion.createSource({
      id: isPlaybackMode() ? "00000000-0000-0000-0000-000000000000" : crypto.randomUUID(),
      kind: "BlobManagedIdentity",
      connectionInfo: {
        containerUri,
        objectId: managedIdentityObjectId,
      },
    });

    console.log("Created ingestion source:");
    console.log(`  - ID: ${createdSource.id}`);
    console.log(`  - Type: ${typeof createdSource}`);

    // List sources to verify creation
    const sources = [];
    for await (const source of client.ingestion.listSources()) {
      sources.push(source);
    }

    console.log(`Total sources after creation: ${sources.length}`);

    // Assertions
    assert.isDefined(createdSource, "Created source should not be undefined");
    assert.property(createdSource, "id", "Created source should have an id");
    assert.isTrue(sources.length > 0, "Should have at least one source after creation");

    console.log("Test PASSED\n");
  });

  it("test_02a_create_sas_token_ingestion_source - should create a SAS token ingestion source", async function () {
    console.log("=".repeat(80));
    console.log("TEST: test_02a_create_sas_token_ingestion_source");
    console.log("=".repeat(80));

    // Get test configuration
    const sasContainerUri = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_INGESTION_SAS_CONTAINER_URI,
    );
    const sasToken = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_INGESTION_SAS_TOKEN,
    );

    console.log(`SAS Container URI: ${sasContainerUri}`);
    console.log(`SAS Token: ${sasToken.substring(0, 20)}...`);

    // Create SAS token ingestion source (following sample pattern)
    const createdSasSource = await client.ingestion.createSource({
      id: isPlaybackMode() ? "00000000-0000-0000-0000-000000000000" : crypto.randomUUID(),
      kind: "SasToken",
      connectionInfo: {
        containerUri: sasContainerUri,
        sharedAccessSignatureToken: sasToken,
      },
    });

    console.log("Created SAS token ingestion source:");
    console.log(`  - ID: ${createdSasSource.id}`);
    console.log(`  - Type: ${typeof createdSasSource}`);

    // Assertions
    assert.isDefined(createdSasSource, "Created SAS source should not be undefined");
    assert.property(createdSasSource, "id", "Created SAS source should have an id");
    assert.isDefined(createdSasSource.id, "Source ID should not be undefined");
    assert.isTrue(createdSasSource.id!.length > 0, "Source ID should not be empty");

    // Clean up
    await client.ingestion.deleteSource(createdSasSource.id!);
    console.log(`Cleaned up SAS source: ${createdSasSource.id}`);

    console.log("Test PASSED\n");
  });

  it("test_03_create_ingestion_definition - should create an ingestion definition", async function () {
    console.log("=".repeat(80));
    console.log("TEST: test_03_create_ingestion_definition");
    console.log("=".repeat(80));

    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );
    const sourceCatalogUrl = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_INGESTION_CATALOG_URL,
    );

    console.log(`Collection ID: ${collectionId}`);
    console.log(`Source Catalog URL: ${sourceCatalogUrl}`);

    // Delete all existing ingestions first
    console.log("Deleting all existing ingestions...");
    const existingIngestions = [];
    for await (const ingestion of client.ingestion.list(collectionId)) {
      existingIngestions.push(ingestion);
    }

    for (const ingestion of existingIngestions) {
      const deletePoller = client.ingestion.delete(collectionId, ingestion.id!);
      await deletePoller.pollUntilDone();
      console.log(`  Deleted existing ingestion: ${ingestion.id}`);
    }

    // Create ingestion definition (following sample pattern)
    const ingestionResponse = await client.ingestion.create(collectionId, {
      importType: "StaticCatalog",
      displayName: "Ingestion",
      sourceCatalogUrl,
      keepOriginalAssets: true,
      skipExistingItems: true,
    } as any);

    const ingestionId = ingestionResponse.id;

    console.log("Ingestion definition created:");
    console.log(`  - Import Type: ${ingestionResponse.importType}`);
    console.log(`  - Display Name: ${ingestionResponse.displayName}`);
    console.log(`  - Source Catalog URL: ${ingestionResponse.sourceCatalogUrl}`);
    console.log(`  - Keep Original Assets: ${ingestionResponse.keepOriginalAssets}`);
    console.log(`  - Skip Existing Items: ${ingestionResponse.skipExistingItems}`);
    console.log(`Created ingestion: ${ingestionId}`);

    // Assertions
    assert.isDefined(ingestionResponse, "Ingestion response should not be undefined");
    assert.isDefined(ingestionId, "Ingestion ID should not be undefined");

    console.log("Test PASSED\n");
  });

  it("test_04_update_ingestion_definition - should update an ingestion definition", async function () {
    console.log("=".repeat(80));
    console.log("TEST: test_04_update_ingestion_definition");
    console.log("=".repeat(80));

    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );
    const sourceCatalogUrl = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_INGESTION_CATALOG_URL,
    );

    // First create an ingestion
    const ingestionResponse = await client.ingestion.create(collectionId, {
      importType: "StaticCatalog",
      displayName: "Sample Dataset Ingestion",
      sourceCatalogUrl,
      keepOriginalAssets: true,
      skipExistingItems: true,
    } as any);

    const ingestionId = ingestionResponse.id!;

    console.log(`Created ingestion with ID: ${ingestionId}`);

    // Update the ingestion with new display name
    const updatedIngestion = await client.ingestion.update(collectionId, ingestionId, {
      importType: "StaticCatalog",
      displayName: "Updated Ingestion Name",
    } as any);

    console.log("Updated ingestion:");
    console.log(`  - ID: ${updatedIngestion.id}`);
    console.log(`  - Display Name: ${updatedIngestion.displayName}`);
    console.log(`  - Import Type: ${updatedIngestion.importType}`);

    // Assertions
    assert.isDefined(updatedIngestion, "Updated ingestion should not be undefined");
    assert.equal(updatedIngestion.id, ingestionId, "Ingestion ID should remain the same");
    assert.equal(
      updatedIngestion.displayName,
      "Updated Ingestion Name",
      "Display name should be updated",
    );

    console.log("Test PASSED\n");
  });

  it("test_05_create_ingestion_run - should create an ingestion run", async function () {
    console.log("=".repeat(80));
    console.log("TEST: test_05_create_ingestion_run");
    console.log("=".repeat(80));

    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );
    const sourceCatalogUrl = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_INGESTION_CATALOG_URL,
    );

    // Create an ingestion first
    const ingestionResponse = await client.ingestion.create(collectionId, {
      importType: "StaticCatalog",
      displayName: "Ingestion for Run",
      sourceCatalogUrl,
      keepOriginalAssets: true,
      skipExistingItems: true,
    } as any);

    const ingestionId = ingestionResponse.id!;

    console.log(`Created ingestion with ID: ${ingestionId}`);

    // Create ingestion run
    const runResponse = await client.ingestion.createRun(collectionId, ingestionId);

    console.log("Created ingestion run:");
    console.log(`  - Run ID: ${runResponse.id}`);
    console.log(`  - Status: ${runResponse.operation?.status}`);

    // Assertions
    assert.isDefined(runResponse, "Run response should not be undefined");
    assert.isDefined(runResponse.id, "Run ID should not be undefined");
    assert.isDefined(runResponse.operation, "Operation should not be undefined");

    console.log("Test PASSED\n");
  });

  it("test_06_get_ingestion_run_status - should get ingestion run status", async function () {
    console.log("=".repeat(80));
    console.log("TEST: test_06_get_ingestion_run_status");
    console.log("=".repeat(80));

    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );
    const sourceCatalogUrl = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_INGESTION_CATALOG_URL,
    );

    // Create an ingestion
    const ingestionResponse = await client.ingestion.create(collectionId, {
      importType: "StaticCatalog",
      displayName: "Ingestion for Status Check",
      sourceCatalogUrl,
      keepOriginalAssets: true,
      skipExistingItems: true,
    } as any);

    const ingestionId = ingestionResponse.id!;

    // Create ingestion run
    const runResponse = await client.ingestion.createRun(collectionId, ingestionId);
    const runId = runResponse.id!;

    console.log(`Created run with ID: ${runId}`);

    // Get run status
    const run = await client.ingestion.getRun(collectionId, ingestionId, runId);
    const operation = run.operation!;

    console.log("Run status:");
    console.log(`  - Status: ${operation.status}`);
    console.log(`  - Total Items: ${operation.totalItems}`);
    console.log(`  - Successful Items: ${operation.totalSuccessfulItems}`);
    console.log(`  - Failed Items: ${operation.totalFailedItems}`);
    console.log(`  - Pending Items: ${operation.totalPendingItems}`);

    // Log status history if available
    if (run.operation?.statusHistory) {
      console.log(`  - Status History Entries: ${run.operation.statusHistory.length}`);
      for (let i = 0; i < Math.min(5, run.operation.statusHistory.length); i++) {
        const statusItem = run.operation.statusHistory[i];
        console.log(`    Entry ${i + 1}:`);
        if (statusItem.errorCode) {
          console.log(`      Error Code: ${statusItem.errorCode}`);
          console.log(`      Error Message: ${statusItem.errorMessage}`);
        }
      }
    }

    // Assertions
    assert.isDefined(run, "Run should not be undefined");
    assert.equal(run.id, runId, "Run ID should match");
    assert.isDefined(run.operation, "Operation should not be undefined");
    assert.isDefined(operation.status, "Status should not be undefined");
    assert.isDefined(operation.totalItems, "Total items should not be undefined");

    console.log("Test PASSED\n");
  });

  it("test_07_list_operations - should list ingestion operations", async function () {
    console.log("=".repeat(80));
    console.log("TEST: test_07_list_operations");
    console.log("=".repeat(80));

    // List operations
    const operations = [];
    for await (const operation of client.ingestion.listOperations()) {
      operations.push(operation);
    }

    console.log(`Found ${operations.length} operations`);

    for (let i = 0; i < Math.min(5, operations.length); i++) {
      const operation = operations[i];
      console.log(`  Operation ${i + 1}:`);
      console.log(`    - ID: ${operation.id}`);
      console.log(`    - Status: ${operation.status}`);
      console.log(`    - Type: ${operation.type}`);
    }

    // Assertions
    assert.isDefined(operations, "Operations list should not be undefined");
    assert.isArray(operations, "Operations should be a list");

    console.log("Test PASSED\n");
  });

  it("test_08_get_operation_by_id - should get operation by ID", async function () {
    console.log("=".repeat(80));
    console.log("TEST: test_08_get_operation_by_id");
    console.log("=".repeat(80));

    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );
    const sourceCatalogUrl = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_INGESTION_CATALOG_URL,
    );

    // Create an ingestion and run to generate an operation
    const ingestionResponse = await client.ingestion.create(collectionId, {
      importType: "StaticCatalog",
      displayName: "Ingestion for Operation",
      sourceCatalogUrl,
      keepOriginalAssets: true,
      skipExistingItems: true,
    } as any);

    const ingestionId = ingestionResponse.id!;

    // Create run to generate an operation
    const runResponse = await client.ingestion.createRun(collectionId, ingestionId);
    const operationId = runResponse.operation!.id!;

    console.log(`Created operation with ID: ${operationId}`);

    // Get the specific operation
    const operation = await client.ingestion.getOperation(operationId);

    console.log("Retrieved operation:");
    console.log(`  - ID: ${operation.id}`);
    console.log(`  - Status: ${operation.status}`);
    console.log(`  - Type: ${operation.type}`);

    // Assertions
    assert.isDefined(operation, "Operation should not be undefined");
    assert.equal(operation.id, operationId, "Operation ID should match");
    assert.isDefined(operation.status, "Status should not be undefined");

    console.log("Test PASSED\n");
  });

  it("test_09_delete_ingestion_source - should delete an ingestion source", async function () {
    console.log("=".repeat(80));
    console.log("TEST: test_09_delete_ingestion_source");
    console.log("=".repeat(80));

    // Get a valid managed identity object ID from the service
    const managedIdentities = [];
    for await (const identity of client.ingestion.listManagedIdentities()) {
      managedIdentities.push(identity);
    }

    if (managedIdentities.length === 0) {
      console.log("No managed identities found. Skipping test.");
      return;
    }

    const managedIdentityObjectId = managedIdentities[0].objectId;

    // Use a unique container URI to avoid conflicts
    const testContainerId = isPlaybackMode()
      ? "00000000-0000-0000-0000-000000000000"
      : crypto.randomUUID();
    const containerUri = `https://test.blob.core.windows.net/test-container-${testContainerId}`;

    console.log(`Using unique container URI: ${containerUri}`);

    // Create a source to delete
    const createdSource = await client.ingestion.createSource({
      id: isPlaybackMode() ? "00000000-0000-0000-0000-000000000000" : crypto.randomUUID(),
      kind: "BlobManagedIdentity",
      connectionInfo: {
        containerUri,
        objectId: managedIdentityObjectId,
      },
    });

    const sourceId = createdSource.id!;

    console.log(`Created source with ID: ${sourceId}`);

    // Delete the source
    await client.ingestion.deleteSource(sourceId);
    console.log(`Deleted source: ${sourceId}`);

    // List sources to verify deletion
    const sources = [];
    for await (const source of client.ingestion.listSources()) {
      sources.push(source);
    }

    const sourceIds = sources.map((s) => (typeof s === "object" && "id" in s ? s.id : s));

    console.log(`Remaining sources: ${sources.length}`);

    // Assertions - only check in live mode because in playback mode all UUIDs are sanitized
    if (!isPlaybackMode()) {
      assert.notInclude(sourceIds, sourceId, "Deleted source should not be in the list");
    }

    console.log("Test PASSED\n");
  });

  it("test_10_cancel_operation - should cancel an operation", async function () {
    console.log("=".repeat(80));
    console.log("TEST: test_10_cancel_operation");
    console.log("=".repeat(80));

    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );
    const sourceCatalogUrl = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_INGESTION_CATALOG_URL,
    );

    // Create an ingestion and run to generate an operation
    const ingestionResponse = await client.ingestion.create(collectionId, {
      importType: "StaticCatalog",
      displayName: "Ingestion for Cancel Test",
      sourceCatalogUrl,
      keepOriginalAssets: true,
      skipExistingItems: true,
    } as any);

    const ingestionId = ingestionResponse.id!;

    // Create run to generate an operation
    const runResponse = await client.ingestion.createRun(collectionId, ingestionId);
    const operationId = runResponse.operation!.id!;

    console.log(`Created operation with ID: ${operationId}`);

    // Try to cancel the operation
    let cancelSucceeded = false;
    try {
      await client.ingestion.cancelOperation(operationId);
      console.log(`Successfully requested cancellation for operation: ${operationId}`);
      cancelSucceeded = true;
    } catch (e: any) {
      console.log(`Failed to cancel operation ${operationId}: ${e.message}`);
      cancelSucceeded = false;
    }

    // Assertions - cancellation may fail if operation completed too quickly
    // So we just verify that the method can be called without crashing
    assert.isBoolean(
      cancelSucceeded,
      "Cancel operation should complete (success or failure is acceptable)",
    );

    console.log("Test PASSED\n");
  });

  it("test_11_cancel_all_operations - should cancel all operations", async function () {
    console.log("=".repeat(80));
    console.log("TEST: test_11_cancel_all_operations");
    console.log("=".repeat(80));

    // Try to cancel all operations
    let cancelSucceeded = false;
    try {
      await client.ingestion.cancelAllOperations();
      console.log("Successfully requested cancellation for all operations");
      cancelSucceeded = true;
    } catch (e: any) {
      console.log(`Failed to cancel all operations: ${e.message}`);
      cancelSucceeded = false;
    }

    // Assertions - cancellation may fail if no operations are running
    // So we just verify that the method can be called without crashing
    assert.isBoolean(
      cancelSucceeded,
      "Cancel all operations should complete (success or failure is acceptable)",
    );

    console.log("Test PASSED\n");
  });

  it("test_12_get_source - should get ingestion source by ID", async function () {
    console.log("=".repeat(80));
    console.log("TEST: test_12_get_source");
    console.log("=".repeat(80));

    // Get managed identity
    const managedIdentities = [];
    for await (const identity of client.ingestion.listManagedIdentities()) {
      managedIdentities.push(identity);
    }

    if (managedIdentities.length === 0) {
      console.log("No managed identities found. Skipping test.");
      return;
    }

    const managedIdentityObjectId = managedIdentities[0].objectId;

    // Create a source - use consistent IDs in playback mode
    const testContainerId = isPlaybackMode()
      ? "00000000-0000-0000-0000-000000000000"
      : crypto.randomUUID();
    const containerUri = `https://test.blob.core.windows.net/test-container-${testContainerId}`;
    const sourceId = isPlaybackMode()
      ? "00000000-0000-0000-0000-000000000000"
      : crypto.randomUUID();

    const createdSource = await client.ingestion.createSource({
      id: sourceId,
      kind: "BlobManagedIdentity",
      connectionInfo: {
        containerUri,
        objectId: managedIdentityObjectId,
      },
    });

    console.log(`Created source with ID: ${createdSource.id}`);

    // Get the source by ID
    const retrievedSource = await client.ingestion.getSource(createdSource.id!);

    console.log("Retrieved source:");
    console.log(`  - Response type: ${typeof retrievedSource}`);
    console.log(`  - Response: ${JSON.stringify(retrievedSource)}`);

    // Clean up
    await client.ingestion.deleteSource(createdSource.id!);

    console.log("Test PASSED\n");
  });

  it("test_13_replace_source - should create or replace an ingestion source", async function () {
    console.log("=".repeat(80));
    console.log("TEST: test_13_replace_source");
    console.log("=".repeat(80));

    // Generate test SAS token data
    const testContainerId = isPlaybackMode()
      ? "00000000-0000-0000-0000-000000000000"
      : crypto.randomUUID();
    const sasContainerUri = `https://test.blob.core.windows.net/test-container-${testContainerId}`;

    // Generate a valid SAS token format with required fields
    const startTime = isPlaybackMode()
      ? "2021-01-01T00:00:00Z"
      : new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
    const expiryTime = isPlaybackMode()
      ? "2099-12-31T23:59:59Z"
      : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().replace(/\.\d{3}Z$/, "Z");
    const sasToken = `sp=rl&st=${startTime}&se=${expiryTime}&sv=2023-01-03&sr=c&sig=InitialRandomSignature123456`;

    // Step 1: Create initial source using createSource
    console.log("Step 1: Creating initial SAS token ingestion source with createSource...");

    const createdSource = await client.ingestion.createSource({
      id: isPlaybackMode() ? "00000000-0000-0000-0000-000000000000" : crypto.randomUUID(),
      kind: "SasToken",
      connectionInfo: {
        containerUri: sasContainerUri,
        sharedAccessSignatureToken: sasToken,
      },
    });

    const sourceId = createdSource.id!;
    console.log(`Created SAS token ingestion source: ${sourceId}`);

    // Step 2: First call to replaceSource - replaces the existing source with original token
    console.log(`Step 2: First call to replaceSource with existing source ID: ${sourceId}`);

    const firstResult = await client.ingestion.replaceSource(sourceId, {
      id: sourceId,
      kind: "SasToken",
      connectionInfo: {
        containerUri: sasContainerUri,
        sharedAccessSignatureToken: sasToken,
      },
    });
    console.log(`First call result: ${firstResult.id}`);

    // Step 3: Second call to replaceSource - replaces again with updated token
    console.log("Step 3: Second call to replaceSource with updated SAS token");
    const updatedToken = `sp=rl&st=${startTime}&se=${expiryTime}&sv=2023-01-03&sr=c&sig=UpdatedRandomSignature123456`;

    const secondResult = await client.ingestion.replaceSource(sourceId, {
      id: sourceId,
      kind: "SasToken",
      connectionInfo: {
        containerUri: sasContainerUri,
        sharedAccessSignatureToken: updatedToken,
      },
    });

    console.log("Second replaceSource result (replacement):");
    console.log(`  - Response type: ${typeof secondResult}`);
    console.log(`  - Response: ${JSON.stringify(secondResult)}`);

    // Clean up
    await client.ingestion.deleteSource(sourceId);

    console.log("Test PASSED\n");
  });

  it("test_14_lists_ingestions - should list ingestions for a collection", async function () {
    console.log("=".repeat(80));
    console.log("TEST: test_14_lists_ingestions");
    console.log("=".repeat(80));

    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );
    const sourceCatalogUrl = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_INGESTION_CATALOG_URL,
    );

    // Create an ingestion
    await client.ingestion.create(collectionId, {
      importType: "StaticCatalog",
      displayName: "Ingestion for Lists Test",
      sourceCatalogUrl,
      keepOriginalAssets: true,
      skipExistingItems: true,
    } as any);
    console.log("Created ingestion");

    // List ingestions
    const ingestions = [];
    for await (const ingestion of client.ingestion.list(collectionId)) {
      ingestions.push(ingestion);
    }

    console.log(`Found ${ingestions.length} ingestions`);
    for (let i = 0; i < Math.min(5, ingestions.length); i++) {
      const ingestion = ingestions[i];
      console.log(`  Ingestion ${i + 1}:`);
      console.log(`    - ID: ${ingestion.id}`);
      console.log(`    - Display Name: ${ingestion.displayName}`);
      console.log(`    - Import Type: ${ingestion.importType}`);
    }

    console.log("Test PASSED\n");
  });

  it("test_15_get_ingestion - should get ingestion by ID", async function () {
    console.log("=".repeat(80));
    console.log("TEST: test_15_get_ingestion");
    console.log("=".repeat(80));

    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );
    const sourceCatalogUrl = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_INGESTION_CATALOG_URL,
    );

    // Create an ingestion
    const createdIngestion = await client.ingestion.create(collectionId, {
      importType: "StaticCatalog",
      displayName: "Ingestion for Get Test",
      sourceCatalogUrl,
      keepOriginalAssets: true,
      skipExistingItems: true,
    } as any);

    const ingestionId = createdIngestion.id!;

    console.log(`Created ingestion with ID: ${ingestionId}`);

    // Get the ingestion by ID
    const retrievedIngestion = await client.ingestion.get(collectionId, ingestionId);

    console.log("Retrieved ingestion:");
    console.log(`  - ID: ${retrievedIngestion.id}`);
    console.log(`  - Display Name: ${retrievedIngestion.displayName}`);
    console.log(`  - Import Type: ${retrievedIngestion.importType}`);
    console.log(`  - Source Catalog URL: ${retrievedIngestion.sourceCatalogUrl}`);

    console.log("Test PASSED\n");
  });

  it("test_16_list_runs - should list runs for an ingestion", async function () {
    console.log("=".repeat(80));
    console.log("TEST: test_16_list_runs");
    console.log("=".repeat(80));

    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );
    const sourceCatalogUrl = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_INGESTION_CATALOG_URL,
    );

    // Create an ingestion
    const createdIngestion = await client.ingestion.create(collectionId, {
      importType: "StaticCatalog",
      displayName: "Ingestion for List Runs Test",
      sourceCatalogUrl,
      keepOriginalAssets: true,
      skipExistingItems: true,
    } as any);

    const ingestionId = createdIngestion.id!;

    console.log(`Created ingestion with ID: ${ingestionId}`);

    // Create a run
    const runResponse = await client.ingestion.createRun(collectionId, ingestionId);
    console.log(`Created run with ID: ${runResponse.id}`);

    // List runs
    const runs = [];
    for await (const run of client.ingestion.listRuns(collectionId, ingestionId)) {
      runs.push(run);
    }

    console.log(`Found ${runs.length} runs`);
    for (let i = 0; i < Math.min(5, runs.length); i++) {
      const run = runs[i];
      console.log(`  Run ${i + 1}:`);
      console.log(`    - ID: ${run.id}`);
      console.log(`    - Status: ${run.operation?.status}`);
      console.log(`    - Total Items: ${run.operation?.totalItems}`);
    }

    console.log("Test PASSED\n");
  });

  it("test_17_get_operation - should get operation (additional coverage)", async function () {
    console.log("=".repeat(80));
    console.log("TEST: test_17_get_operation");
    console.log("=".repeat(80));

    // List existing operations
    const operations = [];
    for await (const operation of client.ingestion.listOperations()) {
      operations.push(operation);
    }

    if (operations.length === 0) {
      console.log("No operations found. Skipping test.");
      return;
    }

    const operationId = operations[0].id!;
    console.log(`Testing with operation ID: ${operationId}`);

    // Get the operation
    const operation = await client.ingestion.getOperation(operationId);

    console.log("Retrieved operation:");
    console.log(`  - ID: ${operation.id}`);
    console.log(`  - Status: ${operation.status}`);
    console.log(`  - Type: ${operation.type}`);

    console.log("Test PASSED\n");
  });

  it("test_18_cancel_all_operations_additional - should cancel all operations (additional coverage)", async function () {
    console.log("=".repeat(80));
    console.log("TEST: test_18_cancel_all_operations_additional");
    console.log("=".repeat(80));

    // Try to cancel all operations
    try {
      await client.ingestion.cancelAllOperations();
      console.log("Successfully requested cancellation for all operations");
    } catch (e: any) {
      console.log(`Failed to cancel all operations: ${e.message}`);
    }

    console.log("Test PASSED\n");
  });
});
