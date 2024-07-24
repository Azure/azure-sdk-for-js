// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createRecorder, createModelClient } from "./utils/recordedClient.js";
import { Recorder } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import {
  ChatCompletionsOutput,
  ModelClient,
  ChatCompletionsFunctionToolCallOutput,
  ChatMessageContentItem,
  ChatMessageImageContentItem,
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
    const url = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg";
    const headers = { "extra-parameters": "allow" };
    const body = {
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "How many feet are in a mile?" },
        { role: "user", content: [{ type: "image_url", image_url: { url, detail: "auto" } } ]},
      ],
      frequency_penalty: 1,
      stream: false,
      presence_penalty: 1,
      temperature: 1,
      top_p: 1,
      max_tokens: 1,
      stop: ["<stop>"],
      seed: 1,
      model: "foo",
      response_format: "foo",
      tool_choice: "auto",
      tools: [ { type: "function", function: { name: "foo", description: "bar" } } ]
    }
    const response = await client.path("/chat/completions").post({
      headers,
      body
    });
    const responseHeaders = response.request.headers.toJSON();
    assert.isDefined(responseHeaders);
    assert.isDefined(responseHeaders["extra-parameters"]);
    assert.isTrue(responseHeaders["extra-parameters"] == headers["extra-parameters"]);

    const request = response.request;
    assert.isDefined(request);

    const reqBody = request.body as string;
    assert.isDefined(reqBody);
    const json = JSON.parse(reqBody);

    assert.isDefined(json["messages"]);
    if (json["messages"]) {
      assert.isNotEmpty(json["messages"]);
      assert.isDefined(json["messages"][0]);
      assert.isTrue(json["messages"][0]["role"] == body.messages[0].role);
      assert.isTrue(json["messages"][0]["content"] == body.messages[0].content);
      assert.isTrue(json["messages"][1]["role"] == body.messages[1].role);
      assert.isTrue(json["messages"][1]["content"] == body.messages[1].content);
      assert.isTrue(json["messages"][2]["role"] == body.messages[2].role);

      const contentArray = json["messages"][2]["content"];
      assert.isDefined(contentArray);
      assert.isNotEmpty(contentArray);
      if (contentArray) {
        const sourceArray = body.messages[2].content as Array<ChatMessageContentItem>;
        assert.isTrue(contentArray[0].type == sourceArray[0].type);
        const imageUrlItem = sourceArray[0] as ChatMessageImageContentItem;
        assert.isTrue(contentArray[0].image_url.url == imageUrlItem.image_url.url);
        assert.isTrue(contentArray[0].image_url.detail == imageUrlItem.image_url.detail);
      }
    }
    assert.isTrue(json["frequency_penalty"] == body.frequency_penalty);
    assert.isTrue(json["stream"] == body.stream);
    assert.isTrue(json["presence_penalty"] == body.presence_penalty);
    assert.isTrue(json["temperature"] == body.temperature);
    assert.isTrue(json["top_p"] == body.top_p);
    assert.isTrue(json["max_tokens"] == body.max_tokens);
    assert.isDefined(json["stop"]);
    assert.isArray(json["stop"]);
    assert.isNotEmpty(json["stop"]);

    if (json["stop"]) {
      assert.isDefined(json["stop"][0]);
      assert.isTrue(json["stop"][0] == body.stop[0]);
    }
    assert.isTrue(json["seed"] == body.seed);
    assert.isTrue(json["model"] == body.model);
    assert.isTrue(json["response_format"] == body.response_format);
    assert.isTrue(json["tool_choice"] == body.tool_choice);
    assert.isDefined(json["tools"]);
    assert.isArray(json["tools"]);
    assert.isNotEmpty(json["tools"]);
    if (json["tools"]) {
      assert.isDefined(json["tools"][0]);
      assert.isTrue(json["tools"][0].type == body.tools[0].type);
      assert.isTrue(json["tools"][0].function.name == body.tools[0].function.name);
      assert.isTrue(json["tools"][0].function.description == body.tools[0].function.description);
    }
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

  it("multi-turn chat test", async function () {
    const messages = [
      { role: "system", content: "You are a helpful assistant" },
      { role: "user", content: "How many feet are in a mile?" },
    ];
    let response = await client.path("/chat/completions").post({
      body: { messages }
    });

    assert.isFalse(isUnexpected(response));

    const completion = response.body as ChatCompletionsOutput;
    assert.isDefined(completion);
    assert.isNotEmpty(completion.choices);
    assert.isDefined(completion.choices[0].message);
    assert.isDefined(completion.choices[0].message.content);
    
    const assistantMessage = completion.choices[0].message.content as string;
    assert.isTrue(assistantMessage.includes("280"));
    messages.push({ role: "assistant", content: assistantMessage});
    messages.push({ role: "user", content: "and how many yards?"});

    response = await client.path("/chat/completions").post({
      body: { messages }
    });

    assert.isFalse(isUnexpected(response));

    const secondCompletion = response.body as ChatCompletionsOutput;
    assert.isDefined(secondCompletion);
    assert.isNotEmpty(secondCompletion.choices);
    assert.isDefined(secondCompletion.choices[0].message);
    assert.isDefined(secondCompletion.choices[0].message.content);

    const yardsMessage = completion.choices[0].message.content as string;
    assert.isTrue(yardsMessage.includes("760"));
  },
    {
      timeout: 80000
    });

  it("chat auth error test", async function () {
    client = await createModelClient("dummy", recorder);
    const response = await client.path("/chat/completions").post({
      body: {
        messages: [
          { role: "user", content: "How many feet are in a mile?" },
        ]
      }
    });

    assert.isTrue(isUnexpected(response));
  },
    {
      timeout: 50000
    });

});
