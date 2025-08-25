// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { createAADRecorder, createAADClient } from "./utils/recordedAADClient.js";
import type { ContentSafetyClient } from "@azure-rest/ai-content-safety";
import { isUnexpected } from "@azure-rest/ai-content-safety";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { isBrowser } from "@azure/core-util";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("Content Safety AAD Client Test", () => {
  let recorder: Recorder;
  let client: ContentSafetyClient;

  function uint8ArrayToBase64(binary: Uint8Array): string {
    let binaryString = "";
    binary.forEach((byte) => {
      binaryString += String.fromCharCode(byte);
    });
    return globalThis.btoa(binaryString);
  }

  beforeEach(async (ctx) => {
    recorder = await createAADRecorder(ctx);
    client = createAADClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("analyze text with aad auth", async () => {
    const response = await client.path("/text:analyze").post({
      body: {
        text: "This is a sample text",
        categories: ["Hate"],
        outputType: "FourSeverityLevels",
      },
    });
    if (isUnexpected(response)) {
      throw new Error(response.body?.error.message);
    }
    assert.strictEqual(response.status, "200");
    assert.equal(response.body.categoriesAnalysis[0]?.category, "Hate");
    assert.notExists(response.body.categoriesAnalysis[1]);
  });

  it("analyze image with aad auth", async () => {
    let base64Image: string;
    if (isBrowser) {
      const imagePath = "../../../samples-dev/example-data/image.png";
      const response = await globalThis.fetch(imagePath);
      const buffer = await response.arrayBuffer();
      const binary = new Uint8Array(buffer);
      base64Image = uint8ArrayToBase64(binary);
    } else {
      const imagePath = join("samples-dev", "example-data", "image.png");
      const buffer = readFileSync(imagePath);
      base64Image = buffer.toString("base64");
    }
    const response = await client.path("/image:analyze").post({
      body: {
        image: {
          content: base64Image,
        },
        categories: ["Sexual"],
        outputType: "FourSeverityLevels",
      },
    });
    if (isUnexpected(response)) {
      throw new Error(response.body?.error.message);
    }
    assert.strictEqual(response.status, "200");
    assert.equal(response.body.categoriesAnalysis[0]?.category, "Sexual");
    assert.notExists(response.body.categoriesAnalysis[1]);
  });
});
