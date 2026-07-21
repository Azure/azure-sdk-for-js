// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { PlanetaryComputerProClient } from "../../src/index.js";
import { createRecorder, createClient } from "./utils/recordedClient.js";
import { getCollectionId, getItemId } from "./utils/envVars.js";
import { describe, it, beforeEach, afterEach, expect } from "vitest";

describe("Shared Access Signature operations", () => {
  let recorder: Recorder;
  let client: PlanetaryComputerProClient;
  let collectionId: string;
  let itemId: string;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = createClient(recorder);
    collectionId = getCollectionId();
    itemId = getItemId();
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should get token with default duration", async () => {
    const response = await client.sharedAccessSignature.getToken(collectionId);
    expect(response).toBeDefined();
    expect(response.token).toBeDefined();
    expect(typeof response.token).toBe("string");
    expect(response.token.length).toBeGreaterThan(0);
    expect(response.expiresOn).toBeDefined();
  });

  it("should get token with custom duration (60 minutes)", async () => {
    const response = await client.sharedAccessSignature.getToken(collectionId, {
      durationInMinutes: 60,
    });
    expect(response).toBeDefined();
    expect(response.token).toBeDefined();
    expect(typeof response.token).toBe("string");
    expect(response.token.length).toBeGreaterThan(0);
    expect(response.expiresOn).toBeDefined();
  });

  it("should sign a URL with SAS", async () => {
    // Get an item to find an asset href to sign
    const item = await client.stac.getItem(collectionId, itemId);
    const imageAsset = item.assets?.["image"];
    expect(imageAsset).toBeDefined();
    const originalHref = imageAsset!.href;

    const response = await client.sharedAccessSignature.getUrl(originalHref);
    expect(response).toBeDefined();
    expect(response.href).toBeDefined();
    // Signed URL should differ from original
    expect(response.href).not.toBe(originalHref);
    // Should contain SAS parameters
    expect(response.href).toContain("?");
    expect(response.href).toContain("sig=");
  });

  it("should revoke token without error", async () => {
    // First generate a token
    await client.sharedAccessSignature.getToken(collectionId);
    // Then revoke — should not throw
    await client.sharedAccessSignature.revokeToken();
  });
});
