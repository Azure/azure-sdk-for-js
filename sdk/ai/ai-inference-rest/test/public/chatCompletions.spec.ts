// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createRecorder, createModelClient } from "./utils/recordedClient.js";
import { Recorder } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import {
  ChatCompletionsOutput,
  ModelClient,
  ChatCompletionsFunctionToolCallOutput,
  GetChatCompletionsBodyParam,
  GetChatCompletionsHeaders,
  isUnexpected
} from "../../src/index.js";

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

  it("chat regression test", async function () {
    const headers = { "extra-parameters": "allow" }; 
    const body = {
        messages: [
          { role: "user", content: "How many feet are in a mile?" },
        ],
        frequency_penalty: 1,
        stream: false, 
        presence_penalty: 1,
        temperature: 1,
        top_p: 1,
        max_tokens: 1,
        stop: ["<stop>"],
        seed: 1,
        model: "foo"
        /*
        response_format?: ChatCompletionsResponseFormat;
        tools: Array<ChatCompletionsToolDefinition>;
        tool_choice:
        | ChatCompletionsToolSelectionPreset
        | ChatCompletionsNamedToolSelection;
        */
    }
    const response = await client.path("/chat/completions").post({
      headers,
      body
    });
    const responseHeaders = response.headers as GetChatCompletionsHeaders;
    assert.isDefined(responseHeaders);
    assert.isDefined(responseHeaders["extra-parameters"]);
    assert.isTrue(responseHeaders["extra-parameters"] == headers["extra-parameters"]);

    const request = response.request as GetChatCompletionsBodyParam;
    assert.isDefined(request);

    const reqBody = request.body;
    assert.isDefined(reqBody);

    assert.isDefined(reqBody?.messages);
    assert.isNotEmpty(reqBody?.messages);
    assert.isTrue(reqBody?.frequency_penalty == body.frequency_penalty);
    assert.isTrue(reqBody?.stream == body.stream);
    assert.isTrue(reqBody?.presence_penalty == body.presence_penalty);
    assert.isTrue(reqBody?.temperature == body.temperature);
    assert.isTrue(reqBody?.top_p == body.top_p);
    assert.isTrue(reqBody?.max_tokens == body.max_tokens);
    assert.isDefined(reqBody?.stop);
    assert.isArray(reqBody?.stop);
    assert.isNotEmpty(reqBody?.stop);

    if (reqBody?.stop) {
      assert.isDefined(reqBody?.stop[0]);
      assert.isTrue(reqBody?.stop[0] == body.stop[0]);
    }
    assert.isTrue(reqBody?.seed == body.seed);
    assert.isTrue(reqBody?.model == body.model);
  },
    {
      timeout: 50000
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
