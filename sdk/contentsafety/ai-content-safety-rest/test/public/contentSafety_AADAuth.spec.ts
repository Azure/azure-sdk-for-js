// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { createAADRecorder, createAADClient } from "./utils/recordedAADClient.js";
import type { ContentSafetyClient } from "../../src/index.js";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { isBrowser } from "@azure/core-util";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("Content Safety AAD Client Test", () => {
  let recorder: Recorder;
  let client: ContentSafetyClient;

  beforeEach(async (ctx) => {
    recorder = await createAADRecorder(ctx);
    client = createAADClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("analyze text with aad auth", async () => {
    const result = await client.analyzeText({
      text: "This is a sample text",
      categories: ["Hate"],
      outputType: "FourSeverityLevels",
    });
    assert.equal(result.categoriesAnalysis[0]?.category, "Hate");
    assert.notExists(result.categoriesAnalysis[1]);
  });

  it("analyze image with aad auth", async () => {
    let imageContent: Uint8Array;
    if (isBrowser) {
      const imagePath = "../../../samples-dev/example-data/image.png";
      const response = await globalThis.fetch(imagePath);
      imageContent = new Uint8Array(await response.arrayBuffer());
    } else {
      const imagePath = join("samples-dev", "example-data", "image.png");
      imageContent = readFileSync(imagePath);
    }
    const result = await client.analyzeImage({
      image: {
        content: imageContent,
      },
      categories: ["Sexual"],
      outputType: "FourSeverityLevels",
    });
    assert.equal(result.categoriesAnalysis[0]?.category, "Sexual");
    assert.notExists(result.categoriesAnalysis[1]);
  });
});
