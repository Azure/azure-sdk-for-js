// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createOpenAI } from "../utils/createClient.js";
import { assert, beforeEach, it, describe } from "vitest";
import type OpenAI from "openai";

const testMode = (process.env.TEST_MODE ?? "playback").toLowerCase();
const isLiveOrRecord = testMode === "live" || testMode === "record";

// OpenAI SDK tests don't work with test recorder
// Skip in playback mode (only run in live/record mode)
describe.skipIf(!isLiveOrRecord)("My test", () => {
  let openAIClient: OpenAI;

  beforeEach(async function () {
    openAIClient = await createOpenAI();
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
