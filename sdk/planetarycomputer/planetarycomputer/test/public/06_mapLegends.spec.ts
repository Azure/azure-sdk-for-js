// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { PlanetaryComputerProClient } from "../../src/index.js";
import { createRecorder, createClient } from "./utils/recordedClient.js";
import { isPng, toUint8Array } from "./utils/byteHelpers.js";
import { describe, it, beforeEach, afterEach, expect } from "vitest";

describe("Map Legends operations", () => {
  let recorder: Recorder;
  let client: PlanetaryComputerProClient;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = createClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should get class map legend for mtbs-severity", async () => {
    const response = await client.data.getClassMapLegend("mtbs-severity");
    expect(response).toBeDefined();
    // Response is a map of class values to RGBA color arrays
    // The SDK may wrap it in additionalProperties
    const legend = response.additionalProperties ?? response;
    const keys = Object.keys(legend);
    expect(keys.length).toBeGreaterThan(0);
  });

  it("should get interval legend for modis-64A1", async () => {
    const response = await client.data.getIntervalLegend("modis-64A1");
    expect(response).toBeDefined();
  });

  it("should get legend as PNG image (rdylgn colormap)", async () => {
    const response = await client.data.getLegend("rdylgn");
    const bytes = await toUint8Array(response);
    expect(bytes.length).toBeGreaterThan(100);
    expect(isPng(bytes)).toBe(true);
  });

  it("should get legend as PNG image (viridis colormap)", async () => {
    const response = await client.data.getLegend("viridis");
    const bytes = await toUint8Array(response);
    expect(bytes.length).toBeGreaterThan(100);
    expect(isPng(bytes)).toBe(true);
  });
});
