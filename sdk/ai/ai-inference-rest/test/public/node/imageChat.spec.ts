// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createRecorder, createModelClient } from "../utils/recordedClient.js";
import { Recorder } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { ModelClient, isUnexpected, ChatCompletionsOutput } from "../../../src/index.js";
import fs from 'fs';
import path from 'path';

function getImageDataUrl(imageFile: string, imageFormat: string): string {
  try {
    const imagePath = path.join("samples-dev", "example-data", imageFile);
    const buffer = fs.readFileSync(imagePath);
    const base64Image = buffer.toString("base64");
    return `data:image/${imageFormat};base64,${base64Image}`;
  } catch (error) {
    console.error(`Could not read '${imageFile}'.`);
    console.error('Set the correct path to the image file before running this sample.');
    process.exit(1);
  }
}

describe("image file test suite", () => {
  let recorder: Recorder;
  let client: ModelClient;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = await createModelClient("completions", recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("chat with image file test", async function () {

    const response = await client.path("/chat/completions").post({
      body: {
        messages: [{
          role: "user", content: [{
            type: "image_url",
            image_url: {
              url: getImageDataUrl("sample.png", "png"),
            }
          }]
        }, { role: "user", content: "describe the image" }],
      }
    });

    assert.isFalse(isUnexpected(response));

    const completion = response.body as ChatCompletionsOutput;
    assert.isDefined(completion);
    assert.isNotEmpty(completion.choices);
    assert.isDefined(completion.choices[0].message);
    assert.isDefined(completion.choices[0].message.content);
  },
    {
      timeout: 50000
    });
});
