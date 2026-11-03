// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { createRecorder, createProjectsClient } from "../../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { AIProjectClient } from "../../../../src/index.js";
import type OpenAI from "openai";
import * as fs from "node:fs/promises";
import * as path from "path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function imageToBase64(imagePath: string): Promise<string> {
  const fileData = await fs.readFile(imagePath);
  return fileData.toString("base64");
}

describe("responses - image input", () => {
  let projectsClient: AIProjectClient;
  let openAIClient: OpenAI;
  let recorder: Recorder;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
    openAIClient = projectsClient.getOpenAIClient();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should create response with image input from file", async function () {
    const imageFilePath = path.resolve(__dirname, "data", "image_input.png");
    const imageBase64 = await imageToBase64(imageFilePath);

    const response = await openAIClient.responses.create({
      model: "gpt-5.2",
      input: [
        {
          type: "message",
          role: "user",
          content: [
            { type: "input_text", text: "what's in this image?" },
            {
              type: "input_image",
              detail: "auto",
              image_url: `data:image/png;base64,${imageBase64}`,
            },
          ],
        },
      ],
    });

    assert.isNotNull(response);
    assert.isNotNull(response.output_text);
    console.log(`Response output: ${response.output_text}`);
  }, 60000);
});
