// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createProjectsClient,
  createPublishedEndpointClient,
  createRecorder,
} from "../utils/createClient.js";
import { afterEach, assert, beforeEach, it, describe } from "vitest";
import { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import type OpenAI from "openai";
import type { AIProjectClient } from "../../../src/index.js";

describe("responses - basic", () => {
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

  it("should create and list responses", async function () {
    const response = await openAIClient.responses.create({
      model: "gpt-4o",
      input: "Tell me a three sentence bedtime story about a unicorn.",
    });

    assert.isNotNull(response);
    assert.isNotNull(response.output_text);
    console.log(
      `Created response, response ID: ${response.id}, output text: ${response.output_text}`,
    );
  }, 50000);

  it.skip("should create and list responses with published endpoint", async function () {
    const publishedEndpointClient = createPublishedEndpointClient(recorder);
    const publishedOpenAIClient = await publishedEndpointClient.getOpenAIClient();

    const response = await publishedOpenAIClient.responses.create({
      model: "gpt-4o",
      input: "Tell me a three sentence bedtime story about a unicorn.",
    });

    assert.isNotNull(response);
    assert.isNotNull(response.output_text);
    console.log(
      `Created response with published endpoint, response ID: ${response.id}, output text: ${response.output_text}`,
    );
  }, 50000);

  it.skip("should create and list responses with an azure specific tool definition", async function () {
    const tool: any = {
      type: "azure_search",
      parameters: {
        endpoint: "https://fake-search-endpoint.search.windows.net",
        index_name: "fake-index-name",
        max_documents: 3,
      },
    };
    const response = await openAIClient.responses.create({
      model: "gpt-5-mini",
      input: "Tell me a three sentence bedtime story about a unicorn.",
      tools: [tool],
    });

    assert.isNotNull(response);
    assert.isNotNull(response.output_text);
    console.log(
      `Created response, response ID: ${response.id}, output text: ${response.output_text}`,
    );

    const retrievedResponse = await openAIClient.responses.retrieve(response.id);
    assert.isNotNull(retrievedResponse);
    assert.isNotNull(retrievedResponse.id);
    assert.isNotNull(retrievedResponse.output_text);
  }, 50000);
});
