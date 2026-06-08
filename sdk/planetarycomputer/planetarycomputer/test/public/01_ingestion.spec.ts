// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import type {
  PlanetaryComputerProClient,
  ManagedIdentityMetadata,
  IngestionSourceSummary,
  IngestionDefinition,
  IngestionRun,
  Operation,
} from "../../src/index.js";
import { createRecorder, createClient } from "./utils/recordedClient.js";
import {
  getCollectionId,
  getIngestionContainerUri,
  getIngestionCatalogUrl,
} from "./utils/envVars.js";
import { describe, it, beforeEach, afterEach, expect } from "vitest";

describe("Ingestion Management operations", () => {
  let recorder: Recorder;
  let client: PlanetaryComputerProClient;
  let collectionId: string;
  let containerUri: string;
  let catalogUrl: string;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = createClient(recorder);
    collectionId = getCollectionId();
    containerUri = getIngestionContainerUri();
    catalogUrl = getIngestionCatalogUrl();
  });

  afterEach(async () => {
    await recorder.stop();
  });

  // --- Managed Identities ---

  it("should list managed identities", async () => {
    const items: ManagedIdentityMetadata[] = [];
    for await (const item of client.ingestion.listManagedIdentities()) {
      items.push(item);
    }
    expect(Array.isArray(items)).toBe(true);
  });

  // --- Ingestion Sources ---

  it("should create an ingestion source (managed identity)", async () => {
    const managedIdentities: ManagedIdentityMetadata[] = [];
    for await (const identity of client.ingestion.listManagedIdentities()) {
      managedIdentities.push(identity);
    }
    expect(managedIdentities.length).toBeGreaterThan(
      0,
      "GeoCatalog must have at least one managed identity configured for this test",
    );

    const sourceId = isPlaybackMode()
      ? "00000000-0000-0000-0000-000000000000"
      : crypto.randomUUID();

    const source = await client.ingestion.createSource({
      id: sourceId,
      kind: "BlobManagedIdentity",
      connectionInfo: {
        containerUri,
        objectId: managedIdentities[0].objectId,
      },
    });
    expect(source).toBeDefined();
    expect(source.id).toBeTruthy();

    // Clean up
    await client.ingestion.deleteSource(source.id);
  });

  it("should list ingestion sources", async () => {
    const items: IngestionSourceSummary[] = [];
    for await (const item of client.ingestion.listSources()) {
      items.push(item);
    }
    expect(Array.isArray(items)).toBe(true);
  });

  it("should get an ingestion source by ID", async () => {
    const managedIdentities: ManagedIdentityMetadata[] = [];
    for await (const identity of client.ingestion.listManagedIdentities()) {
      managedIdentities.push(identity);
    }
    expect(managedIdentities.length).toBeGreaterThan(0);

    const sourceId = isPlaybackMode()
      ? "00000000-0000-0000-0000-000000000000"
      : crypto.randomUUID();

    const created = await client.ingestion.createSource({
      id: sourceId,
      kind: "BlobManagedIdentity",
      connectionInfo: {
        containerUri,
        objectId: managedIdentities[0].objectId,
      },
    });

    const retrieved = await client.ingestion.getSource(created.id);
    expect(retrieved).toBeDefined();
    expect(retrieved.id).toBe(created.id);

    // Clean up
    await client.ingestion.deleteSource(created.id);
  });

  it("should replace an ingestion source", async () => {
    const managedIdentities: ManagedIdentityMetadata[] = [];
    for await (const identity of client.ingestion.listManagedIdentities()) {
      managedIdentities.push(identity);
    }
    expect(managedIdentities.length).toBeGreaterThan(0);

    const sourceId = isPlaybackMode()
      ? "00000000-0000-0000-0000-000000000000"
      : crypto.randomUUID();

    const created = await client.ingestion.createSource({
      id: sourceId,
      kind: "BlobManagedIdentity",
      connectionInfo: {
        containerUri,
        objectId: managedIdentities[0].objectId,
      },
    });

    const replaced = await client.ingestion.replaceSource(created.id, {
      id: created.id,
      kind: "BlobManagedIdentity",
      connectionInfo: {
        containerUri,
        objectId: managedIdentities[0].objectId,
      },
    });
    expect(replaced).toBeDefined();
    expect(replaced.id).toBe(created.id);

    // Clean up
    await client.ingestion.deleteSource(created.id);
  });

  it("should delete an ingestion source", async () => {
    const managedIdentities: ManagedIdentityMetadata[] = [];
    for await (const identity of client.ingestion.listManagedIdentities()) {
      managedIdentities.push(identity);
    }
    expect(managedIdentities.length).toBeGreaterThan(0);

    const sourceId = isPlaybackMode()
      ? "00000000-0000-0000-0000-000000000000"
      : crypto.randomUUID();

    const created = await client.ingestion.createSource({
      id: sourceId,
      kind: "BlobManagedIdentity",
      connectionInfo: {
        containerUri,
        objectId: managedIdentities[0].objectId,
      },
    });

    await client.ingestion.deleteSource(created.id);

    // Verify deletion
    const sources: IngestionSourceSummary[] = [];
    for await (const source of client.ingestion.listSources()) {
      sources.push(source);
    }
    if (!isPlaybackMode()) {
      const sourceIds = sources.map((s) => s.id);
      expect(sourceIds).not.toContain(created.id);
    }
  });

  // --- Ingestion Definitions ---

  it("should create an ingestion definition", async () => {
    const response = await client.ingestion.create(collectionId, {
      importType: "StaticCatalog",
      displayName: "JS SDK Test Ingestion",
      sourceCatalogUrl: catalogUrl,
      keepOriginalAssets: true,
      skipExistingItems: true,
    });
    expect(response).toBeDefined();
    expect(response.id).toBeTruthy();
  });

  it("should list ingestions for a collection", async () => {
    const ingestions: IngestionDefinition[] = [];
    for await (const ingestion of client.ingestion.list(collectionId)) {
      ingestions.push(ingestion);
    }
    expect(Array.isArray(ingestions)).toBe(true);
  });

  it("should get an ingestion by ID", async () => {
    const created = await client.ingestion.create(collectionId, {
      importType: "StaticCatalog",
      displayName: "Ingestion for Get Test",
      sourceCatalogUrl: catalogUrl,
      keepOriginalAssets: true,
      skipExistingItems: true,
    });

    const retrieved = await client.ingestion.get(collectionId, created.id);
    expect(retrieved).toBeDefined();
    expect(retrieved.id).toBe(created.id);
    expect(retrieved.displayName).toBe("Ingestion for Get Test");
  });

  it("should update an ingestion definition", async () => {
    const created = await client.ingestion.create(collectionId, {
      importType: "StaticCatalog",
      displayName: "Original Name",
      sourceCatalogUrl: catalogUrl,
      keepOriginalAssets: true,
      skipExistingItems: true,
    });

    const response = await client.ingestion.update(collectionId, created.id, {
      importType: "StaticCatalog",
      displayName: "Updated Ingestion Name",
      sourceCatalogUrl: catalogUrl,
      keepOriginalAssets: true,
      skipExistingItems: true,
    });
    expect(response.id).toBe(created.id);
    expect(response.displayName).toBe("Updated Ingestion Name");
  });

  // --- Ingestion Runs ---

  it("should create an ingestion run", async () => {
    const created = await client.ingestion.create(collectionId, {
      importType: "StaticCatalog",
      displayName: "Ingestion for Run",
      sourceCatalogUrl: catalogUrl,
      keepOriginalAssets: true,
      skipExistingItems: true,
    });

    const response = await client.ingestion.createRun(collectionId, created.id);
    expect(response).toBeDefined();
    expect(response.id).toBeTruthy();
    expect(response.operation).toBeDefined();
  });

  it("should list runs for an ingestion", async () => {
    const created = await client.ingestion.create(collectionId, {
      importType: "StaticCatalog",
      displayName: "Ingestion for List Runs",
      sourceCatalogUrl: catalogUrl,
      keepOriginalAssets: true,
      skipExistingItems: true,
    });

    await client.ingestion.createRun(collectionId, created.id);

    const runs: IngestionRun[] = [];
    for await (const run of client.ingestion.listRuns(collectionId, created.id)) {
      runs.push(run);
    }
    expect(runs.length).toBeGreaterThan(0);
    expect(runs[0].id).toBeDefined();
  });

  it("should get an ingestion run by ID", async () => {
    const created = await client.ingestion.create(collectionId, {
      importType: "StaticCatalog",
      displayName: "Ingestion for Get Run",
      sourceCatalogUrl: catalogUrl,
      keepOriginalAssets: true,
      skipExistingItems: true,
    });

    const runResponse = await client.ingestion.createRun(collectionId, created.id);
    const run = await client.ingestion.getRun(collectionId, created.id, runResponse.id);
    expect(run).toBeDefined();
    expect(run.id).toBe(runResponse.id);
    expect(run.operation).toBeDefined();
  });

  // --- Operations ---

  it("should list operations", async () => {
    const items: Operation[] = [];
    for await (const item of client.ingestion.listOperations()) {
      items.push(item);
    }
    expect(Array.isArray(items)).toBe(true);
    if (items.length > 0) {
      expect(items[0].id).toBeDefined();
      expect(items[0].status).toBeDefined();
    }
  });

  it("should get an operation by ID", async () => {
    // Create an ingestion and run to guarantee an operation exists
    const created = await client.ingestion.create(collectionId, {
      importType: "StaticCatalog",
      displayName: "Ingestion for Operation",
      sourceCatalogUrl: catalogUrl,
      keepOriginalAssets: true,
      skipExistingItems: true,
    });
    const runResponse = await client.ingestion.createRun(collectionId, created.id);
    const operationId = runResponse.operation!.id!;

    const operation = await client.ingestion.getOperation(operationId);
    expect(operation).toBeDefined();
    expect(operation.id).toBe(operationId);
    expect(operation.status).toBeDefined();
  });

  it("should cancel an operation", async () => {
    const created = await client.ingestion.create(collectionId, {
      importType: "StaticCatalog",
      displayName: "Ingestion for Cancel",
      sourceCatalogUrl: catalogUrl,
      keepOriginalAssets: true,
      skipExistingItems: true,
    });
    const runResponse = await client.ingestion.createRun(collectionId, created.id);
    const operationId = runResponse.operation!.id!;

    // Cancellation may fail if operation completed too quickly — that's acceptable
    try {
      await client.ingestion.cancelOperation(operationId);
    } catch {
      // Operation may have already completed
    }
  });

  it("should cancel all operations without error", async () => {
    await client.ingestion.cancelAllOperations();
  });
});
