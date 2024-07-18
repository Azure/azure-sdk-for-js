// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createRecorder, createModelClient } from "./utils/recordedClient.js";
import { Recorder } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { ChatCompletionsOutput, ModelClient, ChatCompletionsFunctionToolCallOutput, isUnexpected } from "../../src/index.js";

describe("chat test suite", () => {
  let recorder: Recorder;
  let client: ModelClient;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = await createModelClient("completions", recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("client test", async function () {
    assert.isNotNull(client);
    assert.isNotNull(client.path);
    assert.isNotNull(client.pipeline);
  });

  it("simple chat test", async function () {
    const response = await client.path("/chat/completions").post({
      body: {
        messages: [
          { role: "user", content: "How many feet are in a mile?" },
        ]
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

  it("function calling test", async function () {
    const getCurrentWeather = {
      name: "get_current_weather",
      description: "Get the current weather in a given location",
      parameters: {
        type: "object",
        properties: {
          location: {
            type: "string",
            description: "The city and state, e.g. San Francisco, CA",
          },
          unit: {
            type: "string",
            enum: ["celsius", "fahrenheit"],
          },
        },
        required: ["location"],
      },
    };

    const response = await client.path("/chat/completions").post({
      body: {
        messages: [{ role: "user", content: "What's the weather like in Boston?" }],
        tools: [
          {
            type: "function",
            function: getCurrentWeather,
          },
        ],
      }
    });
    assert.isFalse(isUnexpected(response));

    const completion = response.body as ChatCompletionsOutput;
    assert.isDefined(completion);
    assert.isDefined(completion.choices[0].message);
    assert.isDefined(completion.choices[0].finish_reason);
    assert.isTrue(completion.choices[0].finish_reason === "tool_calls");
    assert.isDefined(completion.choices[0].message.tool_calls);
    assert.isDefined(completion.choices[0].message.tool_calls[0]);
    assert.isTrue(completion.choices[0].message.tool_calls[0].type === "function");

    const toolCall = completion.choices[0].message.tool_calls[0] as ChatCompletionsFunctionToolCallOutput;
    assert.isDefined(toolCall);
    assert.isDefined(toolCall.function);
    assert.isNotEmpty(toolCall.function.name);
    assert.isTrue(toolCall.function.arguments.includes("location"));
  },
    {
      timeout: 50000
    });

  it("image url test", async function () {
    const url = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg";

    const response = await client.path("/chat/completions").post({
      body: {
        messages: [{
          role: "user", content: [{
            type: "image_url",
            image_url: {
              url,
              detail: "auto"
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
