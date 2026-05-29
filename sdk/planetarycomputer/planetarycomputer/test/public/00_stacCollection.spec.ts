// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { PlanetaryComputerProClient } from "../../src/index.js";
import { createRecorder, createClient } from "./utils/recordedClient.js";
import { getCollectionId } from "./utils/envVars.js";
import { describe, it, beforeEach, afterEach, expect } from "vitest";

describe("STAC Collection operations", () => {
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

  it("should list collections", async () => {
    const response = await client.stac.getCollections();
    expect(response).toBeDefined();
    expect(response.collections).toBeDefined();
    expect(Array.isArray(response.collections)).toBe(true);
  });

  it("should get conformance classes", async () => {
    const response = await client.stac.getConformanceClasses();
    expect(response.conformsTo).toBeDefined();
    expect(Array.isArray(response.conformsTo)).toBe(true);
    expect(response.conformsTo.length).toBeGreaterThan(0);
  });

  it("should get a collection by ID", async () => {
    const response = await client.stac.getCollection(collectionId);
    expect(response.id).toBe(collectionId);
    expect(response.title).toBeDefined();
    expect(response.description).toBeDefined();
    expect(response.extent).toBeDefined();
    expect(response.license).toBeDefined();
  });

  it("should get partition type", async () => {
    const response = await client.stac.getPartitionType(collectionId);
    expect(response).toBeDefined();
    expect(response.scheme).toBeDefined();
  });

  it("should get render options", async () => {
    const response = await client.stac.getRenderOptions(collectionId);
    expect(Array.isArray(response)).toBe(true);
    for (const option of response) {
      expect(option.id).toBeDefined();
      expect(option.name).toBeDefined();
      expect(option.type).toBeDefined();
    }
  });

  it("should get tile settings", async () => {
    const response = await client.stac.getTileSettings(collectionId);
    expect(response).toBeDefined();
  });

  it("should get mosaics", async () => {
    const response = await client.stac.getMosaics(collectionId);
    expect(Array.isArray(response)).toBe(true);
    for (const mosaic of response) {
      expect(mosaic.id).toBeDefined();
      expect(mosaic.name).toBeDefined();
    }
  });

  it("should get collection queryables", async () => {
    const response = await client.stac.getCollectionQueryables(collectionId);
    expect(response).toBeDefined();
    expect(response.additionalProperties).toBeDefined();
  });

  it("should get global queryables", async () => {
    const response = await client.stac.getQueryables();
    expect(response).toBeDefined();
    expect(response.additionalProperties).toBeDefined();
  });

  it("should get collection configuration", async () => {
    const response = await client.stac.getCollectionConfiguration(collectionId);
    expect(response).toBeDefined();
  });
});
