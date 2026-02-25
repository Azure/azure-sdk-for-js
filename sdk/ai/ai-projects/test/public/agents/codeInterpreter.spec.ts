// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { isLiveMode } from "@azure-tools/test-recorder";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { AIProjectClient } from "../../../src/index.js";
import type OpenAI from "openai";

describe("agents - code interpreter", () => {
  let recorder: Recorder;
  let projectsClient: AIProjectClient;
  let openAIClient: OpenAI;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
    openAIClient = projectsClient.getOpenAIClient();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it.skipIf(!isLiveMode())("should create response with code interpreter tool", async function () {
    // Create response with code interpreter tool
    const response = await openAIClient.responses.create({
      model: "gpt-4o",
      input: "I need to solve the equation 3x + 11 = 14. Can you help me?",
      tools: [{ type: "code_interpreter", container: { type: "auto" } }],
    });

    assert.isNotNull(response);
    assert.isNotNull(response.output_text);
    console.log(`Response output: ${response.output_text}`);
  });
});
