// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to use tool calls with streaming chat completions.
 *
 * @summary Get chat completions with streaming and function call.
 */

const ModelClient = require("@azure-rest/ai-inference").default;
const { AzureKeyCredential } = require("@azure/core-auth");
const { createSseStream } = require("@azure/core-sse");
const { createRestError } = require("@azure-rest/core-client");
const { DefaultAzureCredential } = require("@azure/identity");

// Load the .env file if it exists
require("dotenv/config");
// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<endpoint>";
const key = process.env["KEY"];
const modelName = process.env["MODEL_NAME"];

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

const getWeatherFunc = (location, unit) => {
  if (unit !== "celsius") {
    unit = "fahrenheit";
  }
  return `The temperature in ${location} is 72 degrees ${unit}`;
};

const updateToolCalls = (toolCallArray, functionArray) => {
  const dummyFunction = { name: "", arguments: "", id: "" };
  while (functionArray.length < toolCallArray.length) {
    functionArray.push(dummyFunction);
  }

  let index = 0;
  for (const toolCall of toolCallArray) {
    if (toolCall.function.name) {
      functionArray[index].name = toolCall.function.name;
    }
    if (toolCall.id) {
      functionArray[index].id = toolCall.id;
    }
    if (toolCall.function.arguments) {
      functionArray[index].arguments += toolCall.function.arguments;
    }
    index++;
  }
};

const handleToolCalls = (functionArray) => {
  const messageArray = [];
  for (const func of functionArray) {
    const funcArgs = JSON.parse(func.arguments);
    let content = "";

    switch (func.name) {
      case "get_current_weather":
        content = getWeatherFunc(funcArgs.location, funcArgs.unit ?? "fahrenheit");
        messageArray.push({
          role: "tool",
          content,
          tool_call_id: func.id,
          name: func.name,
        });
        break;

      default:
        console.log(`unknown function ${func.name}`);
        break;
    }
  }
  return messageArray;
};

const streamToString = async (stream) => {
  // lets have a ReadableStream as a stream variable
  const chunks = [];

  for await (const chunk of stream) {
    chunks.push(Buffer.from(chunk));
  }

  return Buffer.concat(chunks).toString("utf-8");
};

async function main() {
  const client = createModelClient();

  const messages = [{ role: "user", content: "What's the weather like in Boston?" }];

  let toolCallAnswer = "";
  let awaitingToolCallAnswer = true;
  while (awaitingToolCallAnswer) {
    const response = await client
      .path("/chat/completions")
      .post({
        body: {
          messages,
          tools: [
            {
              type: "function",
              function: getCurrentWeather,
            },
          ],
          model: modelName,
          stream: true,
        },
      })
      .asNodeStream();

    const stream = response.body;
    if (!stream) {
      throw new Error("The response stream is undefined");
    }

    if (response.status !== "200") {
      throw createRestError(response);
    }

    const sses = createSseStream(stream);
    const functionArray = [];

    for await (const event of sses) {
      if (event.data === "[DONE]") {
        continue;
      }
      const eventData = JSON.parse(event.data);

      for (const choice of eventData.choices) {
        const toolCallArray = choice.delta?.tool_calls;

        if (toolCallArray) {
          if (toolCallArray[0].function?.name) {
            // Include original response from assistant requesting tool call in chat history
            choice.delta.role = "assistant";
            messages.push(choice.delta);
          }
          updateToolCalls(toolCallArray, functionArray);
        }
        if (choice.finish_reason === "tool_calls") {
          const messageArray = handleToolCalls(functionArray);
          messages.push(...messageArray);
        } else {
          if (choice.delta?.content && choice.delta.content !== "") {
            toolCallAnswer += choice.delta?.content;
            awaitingToolCallAnswer = false;
          }
        }
      }
    }
  }

  console.log("Model response after tool call:");
  console.log(toolCallAnswer);
}

/*
 * This function creates a model client.
 */
function createModelClient() {
  // auth scope for AOAI resources is currently https://cognitiveservices.azure.com/.default
  // auth scope for MaaS and MaaP is currently https://ml.azure.com
  // (Do not use for Serverless API or Managed Computer Endpoints)
  if (key) {
    return ModelClient(endpoint, new AzureKeyCredential(key));
  } else {
    const scopes = [];
    if (endpoint.includes(".models.ai.azure.com")) {
      scopes.push("https://ml.azure.com");
    } else if (endpoint.includes(".openai.azure.com/openai/deployments/")) {
      scopes.push("https://cognitiveservices.azure.com");
    }

    const clientOptions = { credentials: { scopes } };
    return ModelClient(endpoint, new DefaultAzureCredential(), clientOptions);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
