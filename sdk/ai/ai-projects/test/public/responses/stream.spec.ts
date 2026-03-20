// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createProjectsClient, createRecorder } from "../utils/createClient.js";
import { afterEach, assert, beforeEach, it, describe } from "vitest";
import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import type OpenAI from "openai";
import type { AIProjectClient } from "../../../src/index.js";

describe("responses - streaming with conversation context", () => {
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

  it("should create non-streaming response then stream follow-up with conversation context", async function () {
    // First create a non-streaming response
    const response = await openAIClient.responses.create({
      model: "gpt-5.2",
      input: "What is the size of France in square miles?",
      stream: false,
    });

    assert.isNotNull(response);
    assert.isNotNull(response.id);
    assert.isNotNull(response.output_text);
    console.log(`Initial response ID: ${response.id}`);
    console.log(`Initial response: ${response.output_text}`);

    // Now create a streaming response using previous_response_id to continue the conversation
    const stream = openAIClient.responses.stream({
      model: "gpt-5.2",
      input: "Now tell me about the capital city of France.",
      previous_response_id: response.id,
    });

    let responseCreated = false;
    let responseCompleted = false;
    let responseText = "";

    for await (const event of stream) {
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
