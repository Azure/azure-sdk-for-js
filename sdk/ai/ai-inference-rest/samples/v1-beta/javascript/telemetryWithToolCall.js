// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to use tool calls with chat completions with telemetry.
 *
 * @summary Get chat completions with function call.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { AzureMonitorTraceExporter } = require("@azure/monitor-opentelemetry-exporter");
const { context, trace } = require("@opentelemetry/api");
const { registerInstrumentations } = require("@opentelemetry/instrumentation");
const {
  ConsoleSpanExporter,
  NodeTracerProvider,
  SimpleSpanProcessor,
} = require("@opentelemetry/sdk-trace-node");
const { createAzureSdkInstrumentation } = require("@azure/opentelemetry-instrumentation-azure-sdk");

// Load the .env file if it exists
require("dotenv").config();

// You will need to set these environment variables or edit the following values
const modelEndpoint = process.env["MODEL_ENDPOINT"] || "<endpoint>";
const connectionString = process.env["APPLICATIONINSIGHTS_CONNECTION_STRING"];

const provider = new NodeTracerProvider();
if (connectionString) {
  const exporter = new AzureMonitorTraceExporter({ connectionString });
  provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
}
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
provider.register();

registerInstrumentations({
  instrumentations: [createAzureSdkInstrumentation()],
});

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
  if (unit != "celsius") {
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

// any import such as ai-inference has core-tracing as dependency must be imported after the instrumentation is registered
const ModelClient = require("@azure-rest/ai-inference").default,
  { isUnexpected } = require("@azure-rest/ai-inference");

async function main() {
  const credential = new DefaultAzureCredential();
  // auth scope for AOAI resources is currently https://cognitiveservices.azure.com/.default
  // (only needed when targetting AOAI, do not use for Serverless API or Managed Computer Endpoints)
  const scopes = ["https://cognitiveservices.azure.com/.default"];
  const clientOptions = { credentials: { scopes } };
  const client = ModelClient(modelEndpoint, credential, clientOptions);

  const messages = [{ role: "user", content: "What's the weather like in Boston?" }];

  let toolCallAnswer = "";
  let awaitingToolCallAnswer = true;

  const tracer = trace.getTracer("sample", "0.1.0");

  await tracer.startActiveSpan("main", async (span) => {
    while (awaitingToolCallAnswer) {
      const response = await client.path("/chat/completions").post({
        body: {
          messages,
          tools: [
            {
              type: "function",
              function: getCurrentWeather,
            },
          ],
        },
        tracingOptions: { tracingContext: context.active() },
      });

      if (isUnexpected(response)) {
        throw response.body.error;
      }

      const stream = response.body;
      if (!stream) {
        throw new Error("The response stream is undefined");
      }

      if (response.status !== "200") {
        throw new Error(`Failed to get chat completions.`);
      }

      const functionArray = [];

      for (const choice of response.body.choices) {
        const toolCallArray = choice.message?.tool_calls;

        if (toolCallArray) {
          if (toolCallArray[0].function?.name) {
            // Include original response from assistant requesting tool call in chat history
            choice.message.role = "assistant";
            messages.push(choice.message);
          }
          updateToolCalls(toolCallArray, functionArray);
        }
        if (choice.finish_reason == "tool_calls") {
          const messageArray = handleToolCalls(functionArray);
          messages.push(...messageArray);
        } else {
          if (choice.message?.content && choice.message.content != "") {
            toolCallAnswer += choice.message?.content;
            awaitingToolCallAnswer = false;
          }
        }
      }
    }

    span.end();
  });

  console.log("Model response after tool call:");
  console.log(toolCallAnswer);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
