// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import type { PlanetaryComputerProClient, StacCollection } from "../../src/index.js";
import { createRecorder, createClient } from "./utils/recordedClient.js";
import { isRestError } from "@azure/core-rest-pipeline";
import { describe, it, beforeEach, afterEach, expect } from "vitest";

const TEST_COLLECTION_ID = "test-collection-lifecycle-js";

describe("Collection Lifecycle operations", () => {
  let recorder: Recorder;
  let client: PlanetaryComputerProClient;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = createClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  async function createCollectionWithRetry(
    collectionData: StacCollection,
    maxRetries = 5,
  ): Promise<void> {
    let lastError: Error | undefined;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const poller = client.stac.createCollection(collectionData);
        await poller.pollUntilDone();
        return;
      } catch (error: any) {
        lastError = error;
        if (
          isRestError(error) &&
          error.message?.includes("is being deleted") &&
          attempt < maxRetries
        ) {
          if (!isPlaybackMode()) {
            const waitTime = attempt * 15000;
            console.log(
              `Collection still being deleted, waiting ${waitTime / 1000}s (attempt ${attempt}/${maxRetries})...`,
            );
            await new Promise((resolve) => setTimeout(resolve, waitTime));
          }
        } else {
          throw error;
        }
      }
    }
    if (lastError) throw lastError;
  }

  it("should create, replace, and delete a collection", async () => {
    // Step 1: Clean up if exists from a previous failed run
    try {
      const cleanupPoller = client.stac.deleteCollection(TEST_COLLECTION_ID);
      await cleanupPoller.pollUntilDone();
      if (!isPlaybackMode()) {
        console.log("Waiting for service to complete cleanup...");
        await new Promise((resolve) => setTimeout(resolve, 30000));
      }
    } catch {
      // Ignore — collection may not exist
    }

    // Step 2: Create collection (LRO) with retry for "is being deleted" race
    await createCollectionWithRetry({
      id: TEST_COLLECTION_ID,
      type: "Collection",
      stacVersion: "1.0.0",
      description: "Test collection for JS SDK lifecycle tests",
      title: "JS SDK Test Collection",
      license: "proprietary",
      extent: {
        spatial: {
          boundingBox: [[-180, -90, 180, 90]],
        },
        temporal: {
          interval: [[new Date("2020-01-01T00:00:00Z"), new Date("2024-12-31T23:59:59Z")]],
        },
      },
      links: [],
    });

    // Step 3: Verify creation
    const collection = await client.stac.getCollection(TEST_COLLECTION_ID);
    expect(collection.id).toBe(TEST_COLLECTION_ID);
    expect(collection.title).toBe("JS SDK Test Collection");

    // Step 4: Replace (update) the collection
    const updated = {
      ...collection,
      description: "UPDATED — Test collection for JS SDK lifecycle tests",
    };
    const replaceResponse = await client.stac.replaceCollection(TEST_COLLECTION_ID, updated);
    expect(replaceResponse.description).toContain("UPDATED");

    // Step 5: Delete collection (LRO)
    const deletePoller = client.stac.deleteCollection(TEST_COLLECTION_ID);
    await deletePoller.pollUntilDone();
  });
});
