// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { PlanetaryComputerProClient } from "../../src/index.js";
import { createRecorder, createClient } from "./utils/recordedClient.js";
import { getCollectionId } from "./utils/envVars.js";
import { describe, it, beforeEach, afterEach, expect } from "vitest";

// Defaults following the Python test pattern — no env vars required
const DEFAULT_CONTAINER_URI = "https://test.blob.core.windows.net/container";
const DEFAULT_CATALOG_URL =
  "https://raw.githubusercontent.com/aloverro/mpcpro-sample-datasets/main/datasets/planetary_computer/naip/catalog.json";

describe("Ingestion Management operations", () => {
  let recorder: Recorder;
  let client: PlanetaryComputerProClient;
  let collectionId: string;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = createClient(recorder);
    collectionId = getCollectionId();
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should list managed identities", async () => {
    const items: any[] = [];
    for await (const item of client.ingestion.listManagedIdentities()) {
      items.push(item);
    }
    expect(Array.isArray(items)).toBe(true);
  });

  it("should create an ingestion source (managed identity)", async () => {
    // Get managed identity from the service (Python pattern)
    const managedIdentities: any[] = [];
    for await (const identity of client.ingestion.listManagedIdentities()) {
      managedIdentities.push(identity);
    }
    if (managedIdentities.length === 0) {
      console.log("No managed identities found. Skipping test.");
      return;
    }
    const objectId = managedIdentities[0].objectId;

    const source = await client.ingestion.createSource({
      id: "00000000-0000-0000-0000-000000000001",
      kind: "BlobManagedIdentity",
      connectionInfo: {
        containerUri: DEFAULT_CONTAINER_URI,
        objectId,
      },
    } as any);
    expect(source).toBeDefined();
    expect(source.id).toBeTruthy();
  });

  it("should list ingestion sources", async () => {
    const items: any[] = [];
    for await (const item of client.ingestion.listSources()) {
      items.push(item);
    }
    expect(Array.isArray(items)).toBe(true);
  });

  it("should create an ingestion definition", async () => {
    const response = await client.ingestion.create(collectionId, {
      importType: "StaticCatalog",
      displayName: "JS SDK Test Ingestion",
      sourceCatalogUrl: DEFAULT_CATALOG_URL,
      keepOriginalAssets: true,
      skipExistingItems: true,
    } as any);
    expect(response).toBeDefined();
    expect(response.id).toBeTruthy();
  });

  it("should update an ingestion definition", async () => {
    // Create an ingestion first, then update it (self-contained)
    const created = await client.ingestion.create(collectionId, {
      importType: "StaticCatalog",
      displayName: "Original Name",
      sourceCatalogUrl: DEFAULT_CATALOG_URL,
      keepOriginalAssets: true,
      skipExistingItems: true,
    } as any);
    const ingestionId = created.id!;

    const response = await client.ingestion.update(collectionId, ingestionId, {
      importType: "StaticCatalog",
      displayName: "Updated Ingestion Name",
      sourceCatalogUrl: DEFAULT_CATALOG_URL,
      keepOriginalAssets: true,
      skipExistingItems: true,
    } as any);
    expect(response.id).toBe(ingestionId);
    expect(response.displayName).toBe("Updated Ingestion Name");
  });

  it("should create an ingestion run", async () => {
    // Create an ingestion first, then create a run (self-contained)
    const created = await client.ingestion.create(collectionId, {
      importType: "StaticCatalog",
      displayName: "Ingestion for Run",
      sourceCatalogUrl: DEFAULT_CATALOG_URL,
      keepOriginalAssets: true,
      skipExistingItems: true,
    } as any);
    const ingestionId = created.id!;

    const response = await client.ingestion.createRun(collectionId, ingestionId);
    expect(response).toBeDefined();
    expect(response.id).toBeTruthy();
    expect(response.operation).toBeDefined();
  });

  it("should list operations", async () => {
    const items: any[] = [];
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
    // Get the first operation from the list
    const items: any[] = [];
    for await (const item of client.ingestion.listOperations()) {
      items.push(item);
      break; // just need one
    }
    if (items.length === 0) {
      console.log("Skipping: no operations found");
      return;
    }
    const response = await client.ingestion.getOperation(items[0].id);
    expect(response.id).toBe(items[0].id);
    expect(response.status).toBeDefined();
  });

  it("should cancel all operations without error", async () => {
    await client.ingestion.cancelAllOperations();
  });
});
