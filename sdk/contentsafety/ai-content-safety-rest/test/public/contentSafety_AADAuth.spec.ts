// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createAADRecorder, createAADClient } from "./utils/recordedAADClient";
import { Context } from "mocha";
import { ContentSafetyClient, isUnexpected } from "../../src";
import fs from "fs";
import path from "path";
import { isBrowser } from "@azure/core-util";

describe("Content Safety AAD Client Test", () => {
  let recorder: Recorder;
  let client: ContentSafetyClient;

  function uint8ArrayToBase64(binary: Uint8Array) {
    let binaryString = "";
    binary.forEach((byte) => {
      binaryString += String.fromCharCode(byte);
    });
    return self.btoa(binaryString);
  }

  beforeEach(async function (this: Context) {
    recorder = await createAADRecorder(this);
    client = await createAADClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("analyze text with aad auth", async function () {
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

  it("analyze image with aad auth", async function () {
    let base64Image: string;
    if (isBrowser) {
      const imagePath = "/base/samples-dev/example-data/image.png";
      const response = await fetch(imagePath);
      const buffer = await response.arrayBuffer();
      const binary = new Uint8Array(buffer);
      base64Image = uint8ArrayToBase64(binary);
    } else {
      const imagePath = path.join("samples-dev", "example-data", "image.png");
      const buffer = fs.readFileSync(imagePath);
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
