// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createProjectsClient, createRecorder } from "../utils/createClient.js";
import { afterEach, assert, beforeEach, it, describe } from "vitest";
import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import type OpenAI from "openai";
import type { AIProjectClient } from "../../../src/index.js";

describe("responses - stream manager", () => {
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

  it("should stream response using responses.stream()", async function () {
    const responseStreamManager = openAIClient.responses.stream({
      model: "gpt-5.2",
      input: [{ role: "user", content: "Tell me about the capital city of France" }],
    });

    let responseCreated = false;
    let responseCompleted = false;
    let responseText = "";

    for await (const event of responseStreamManager) {
      if (event.type === "response.created") {
        responseCreated = true;
        console.log(`Stream response created with ID: ${event.response.id}`);
      } else if (event.type === "response.output_text.delta") {
        responseText += event.delta;
      } else if (event.type === "response.completed") {
        responseCompleted = true;
        console.log(`Response completed with full message: ${event.response.output_text}`);
      }
    }

    assert.isTrue(responseCreated, "Expected response.created event");
    assert.isTrue(responseCompleted, "Expected response.completed event");
    assert.isNotEmpty(responseText, "Expected response text from streaming");
    console.log(`Streaming response text: ${responseText}`);
  }, 60000);
});
