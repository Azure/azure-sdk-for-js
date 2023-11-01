// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";
import {
  ImageAnalysisClient,
  SegmentationMode
} from "../../src/index.js";
import * as fs from "fs";

import { createClient, createRecorder } from "./utils/recordedClient.js";
import { Recorder } from "@azure-tools/test-recorder";

describe("Segment Tests", () => {
  let recorder: Recorder;
  let client: ImageAnalysisClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = await createClient(recorder);
  });

  afterEach(async function () {
    await recorder?.stop();
  });

  it("Segment from URL", async function () {
    const segmentationModes: SegmentationMode[] = [
      "ForegroundMatting",
      "BackgroundRemoval",
    ];

    for (const mode of segmentationModes) {
      const result = await client.segmentFromUrl(mode, {
        url: "https://aka.ms/azai/vision/image-analysis-sample.jpg",
      });

      assert.isNotNull(result);
      const newImage = result;
      assert.isNotNull(newImage);

      validateResponse(newImage, mode);
    }
  });

  it("Segment from Stream", async function () {
    const segmentationModes: SegmentationMode[] = [
      "ForegroundMatting",
      "BackgroundRemoval",
    ];

    const fileLocation = process.env.TEST_IMAGE_INPUT_PATH ? process.env.TEST_IMAGE_INPUT_PATH : "./test/image-analysis-sample.jpg";

    for (const mode of segmentationModes) {
      const fileStream = fs.readFileSync(fileLocation);
      const result = await client.segmentFromStream(
        mode,
        new Uint8Array(fileStream)
      );

      assert.isNotNull(result);
      const newImage = result;
      assert.isNotNull(newImage);

      validateResponse(newImage, mode);
    }
  });

  function validateResponse(data: Uint8Array, mode: SegmentationMode) {
    const dataArray = data;

    // Validate size of output image  
    if (mode === "BackgroundRemoval") {
      assert.isAbove(dataArray.length, 400000);
    } else {
      // segmentationMode == "ForegroundMatting"  
      assert.isAbove(dataArray.length, 7000);
    }

    const pngHeader = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

    for (let i = 0; i < pngHeader.length; i++) {
      assert.strictEqual(pngHeader[i], dataArray[i]);
    }
  }
});  
