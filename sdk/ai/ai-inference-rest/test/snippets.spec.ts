// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { createSseStream } from "@azure/core-sse";
import { describe, it } from "vitest";
import { IncomingMessage } from "node:http";
import { readFileSync } from "node:fs";
import {
  ConsoleSpanExporter,
  NodeTracerProvider,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-node";
import { AzureMonitorTraceExporter } from "@azure/monitor-opentelemetry-exporter";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { createAzureSdkInstrumentation } from "@azure/opentelemetry-instrumentation-azure-sdk";
import { context, trace } from "@opentelemetry/api";

describe("snippets", () => {
  it("ReadmeSample_Node", async () => {
    const client = ModelClient(
      "https://<Azure Model endpoint>",
      new AzureKeyCredential("<Azure API key>"),
    );
    // @ts-preserve-whitespace
    const response = await client.path("/chat/completions").post({
      body: {
        messages: [{ role: "user", content: "How many feet are in a mile?" }],
      },
    });
    // @ts-preserve-whitespace
    if (isUnexpected(response)) {
      throw response.body.error;
    }
    console.log(response.body.choices[0].message.content);
  });

  it("ReadmeSample_KeyCredential", async () => {
    const client = ModelClient("<endpoint>", new AzureKeyCredential("<API key>"));
  });

  it("ReadmeSample_TokenCredential", async () => {
    const client = ModelClient("<endpoint>", new DefaultAzureCredential());
  });

  it("ReadmeSample_Completions", async () => {
    const client = ModelClient(
      "https://your-model-endpoint/",
      new AzureKeyCredential("your-model-api-key"),
    );
    // @ts-preserve-whitespace
    const response = await client.path("/chat/completions").post({
      body: {
        messages: [{ role: "user", content: "Hello, world!" }],
      },
    });
    // @ts-preserve-whitespace
    if (isUnexpected(response)) {
      throw response.body.error;
    }
    // @ts-preserve-whitespace
    console.log(response.body.choices[0].message.content);
  });

  it("ReadmeSample_ChatbotResponse", async () => {
    const endpoint = "https://myaccount.openai.azure.com/";
    const client = ModelClient(endpoint, new DefaultAzureCredential());
    // @ts-preserve-whitespace
    const messages = [
      // NOTE: "system" role is not supported on all Azure Models
      { role: "system", content: "You are a helpful assistant. You will talk like a pirate." },
      { role: "user", content: "Can you help me?" },
      { role: "assistant", content: "Arrrr! Of course, me hearty! What can I do for ye?" },
      { role: "user", content: "What's the best way to train a parrot?" },
    ];
    // @ts-preserve-whitespace
    console.log(`Messages: ${messages.map((m) => m.content).join("\n")}`);
    // @ts-preserve-whitespace
    const response = await client
      .path("/chat/completions")
      .post({
        body: {
          messages,
          stream: true,
          max_tokens: 128,
        },
      })
      .asNodeStream();
    // @ts-preserve-whitespace
    const stream = response.body;
    if (!stream) {
      throw new Error("The response stream is undefined");
    }
    // @ts-preserve-whitespace
    if (response.status !== "200") {
      throw new Error("Failed to get chat completions");
    }
    // @ts-preserve-whitespace
    const sses = createSseStream(stream as IncomingMessage);
    // @ts-preserve-whitespace
    for await (const event of sses) {
      if (event.data === "[DONE]") {
        return;
      }
      for (const choice of JSON.parse(event.data).choices) {
        console.log(choice.delta?.content ?? "");
      }
    }
  });

  it("ReadmeSample_MultipleCompletions", async () => {
    // Replace with your Model API key
    const key = "YOUR_MODEL_API_KEY";
    const endpoint = "https://your-model-endpoint/";
    const client = ModelClient(endpoint, new AzureKeyCredential(key));
    // @ts-preserve-whitespace
    const messages = [
      { role: "user", content: "How are you today?" },
      { role: "user", content: "What is inference in the context of AI?" },
      { role: "user", content: "Why do children love dinosaurs?" },
      { role: "user", content: "Generate a proof of Euler's identity" },
      {
        role: "user",
        content:
          "Describe in single words only the good things that come into your mind about your mother.",
      },
    ];
    // @ts-preserve-whitespace
    let promptIndex = 0;
    const response = await client.path("/chat/completions").post({
      body: {
        messages,
      },
    });
    // @ts-preserve-whitespace
    if (isUnexpected(response)) {
      throw response.body.error;
    }
    for (const choice of response.body.choices) {
      const completion = choice.message.content;
      console.log(`Input: ${messages[promptIndex++].content}`);
      console.log(`Chatbot: ${completion}`);
    }
  });

  it("ReadmeSample_SummarizeText", async () => {
    const endpoint = "https://myaccount.openai.azure.com/";
    const client = ModelClient(endpoint, new DefaultAzureCredential());
    // @ts-preserve-whitespace
    const textToSummarize = `
    Two independent experiments reported their results this morning at CERN, Europe's high-energy physics laboratory near Geneva in Switzerland. Both show convincing evidence of a new boson particle weighing around 125 gigaelectronvolts, which so far fits predictions of the Higgs previously made by theoretical physicists.

    ""As a layman I would say: 'I think we have it'. Would you agree?"" Rolf-Dieter Heuer, CERN's director-general, asked the packed auditorium. The physicists assembled there burst into applause.
  :`;
    // @ts-preserve-whitespace
    const summarizationPrompt = `
    Summarize the following text.

    Text:
    """"""
    ${textToSummarize}
    """"""

    Summary:
  `;
    // @ts-preserve-whitespace
    console.log(`Input: ${summarizationPrompt}`);
    // @ts-preserve-whitespace
    const response = await client.path("/chat/completions").post({
      body: {
        messages: [{ role: "user", content: summarizationPrompt }],
        max_tokens: 64,
      },
    });
    // @ts-preserve-whitespace
    if (isUnexpected(response)) {
      throw response.body.error;
    }
    const completion = response.body.choices[0].message.content;
    console.log(`Summarization: ${completion}`);
  });

  it("ReadmeSample_ChatTools", async () => {
    const endpoint = "https://myaccount.openai.azure.com/";
    const client = ModelClient(endpoint, new DefaultAzureCredential());
    // @ts-preserve-whitespace
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
    // @ts-preserve-whitespace
    const messages = [{ role: "user", content: "What is the weather like in Boston?" }];
    const result = await client.path("/chat/completions").post({
      body: {
        messages,
        tools: [
          {
            type: "function",
            function: getCurrentWeather,
          },
        ],
      },
    });
  });

  it("ReadmeSample_ChatToolsResponse", async () => {
    // Purely for convenience and clarity, this function handles tool call responses.
    function applyToolCall({ function: call, id }) {
      if (call.name === "get_current_weather") {
        const { location, unit } = JSON.parse(call.arguments);
        // In a real application, this would be a call to a weather API with location and unit parameters
        return {
          role: "tool",
          content: `The weather in ${location} is 72 degrees ${unit} and sunny.`,
          toolCallId: id,
        };
      }
      throw new Error(`Unknown tool call: ${call.name}`);
    }
  });

  it("ReadmeSample_ChatToolsResolution", async () => {
    const endpoint = "https://myaccount.openai.azure.com/";
    const client = ModelClient(endpoint, new DefaultAzureCredential());
    // @ts-preserve-whitespace
    // From previous snippets
    const messages = [{ role: "user", content: "What is the weather like in Boston?" }];
    // @ts-preserve-whitespace
    function applyToolCall({ function: call, id }) {
      // from previous snippet
    }
    // @ts-preserve-whitespace
    // Handle result from previous snippet
    async function handleResponse(result) {
      const choice = result.body.choices[0];
      const responseMessage = choice.message;
      if (responseMessage?.role === "assistant") {
        const requestedToolCalls = responseMessage?.toolCalls;
        if (requestedToolCalls?.length) {
          const toolCallResolutionMessages = [
            ...messages,
            responseMessage,
            ...requestedToolCalls.map(applyToolCall),
          ];
          const toolCallResolutionResult = await client.path("/chat/completions").post({
            body: {
              messages: toolCallResolutionMessages,
            },
          });
          // continue handling the response as normal
        }
      }
    }
  });

  it("ReadmeSample_ChatWithImages", async () => {
    const endpoint = "https://myaccount.openai.azure.com/";
    const client = ModelClient(endpoint, new DefaultAzureCredential());
    // @ts-preserve-whitespace
    const url =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg";
    const messages = [
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: {
              url,
              detail: "auto",
            },
          },
        ],
      },
      { role: "user", content: "describe the image" },
    ];
    // @ts-preserve-whitespace
    const response = await client.path("/chat/completions").post({
      body: {
        messages,
      },
    });
    // @ts-preserve-whitespace
    if (isUnexpected(response)) {
      throw response.body.error;
    }
    console.log(`Chatbot: ${response.body.choices[0].message?.content}`);
  });

  it("ReadmeSample_TextEmbeddings", async () => {
    const endpoint = "https://myaccount.openai.azure.com/";
    const client = ModelClient(endpoint, new DefaultAzureCredential());
    // @ts-preserve-whitespace
    const response = await client.path("/embeddings").post({
      body: {
        input: ["first phrase", "second phrase", "third phrase"],
      },
    });
    // @ts-preserve-whitespace
    if (isUnexpected(response)) {
      throw response.body.error;
    }
    for (const data of response.body.data) {
      console.log(
        `data length: ${data.embedding.length}, [${data[0]}, ${data[1]}, ..., ${data[data.embedding.length - 2]}, ${data[data.embedding.length - 1]}]`,
      );
    }
  });

  it("ReadmeSample_ImageEmbeddings", async () => {
    const endpoint = "https://myaccount.openai.azure.com/";
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    function getImageDataUrl(imageFile, imageFormat) {
      try {
        const imageBuffer = readFileSync(imageFile);
        const imageBase64 = imageBuffer.toString("base64");
        return `data:image/${imageFormat};base64,${imageBase64}`;
      } catch (error) {
        console.error(`Could not read '${imageFile}'.`);
        console.error("Set the correct path to the image file before running this sample.");
        process.exit(1);
      }
    }
    // @ts-preserve-whitespace
    const client = ModelClient(endpoint, credential);
    const image = getImageDataUrl("<image_file>", "<image_format>");
    const response = await client.path("/images/embeddings").post({
      body: {
        input: [{ image }],
      },
    });
    // @ts-preserve-whitespace
    if (isUnexpected(response)) {
      throw response.body.error;
    }
    for (const data of response.body.data) {
      console.log(
        `data length: ${data.embedding.length}, [${data[0]}, ${data[1]}, ..., ${data[data.embedding.length - 2]}, ${data[data.embedding.length - 1]}]`,
      );
    }
  });

  it("ReadmeSample_Instrumentation", async () => {
    const provider = new NodeTracerProvider();
    provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
    provider.register();
  });

  it("ReadmeSample_InstrumentationAppInsights", async () => {
    // provide a connection string
    const connectionString = "<connection string>";
    // @ts-preserve-whitespace
    const provider = new NodeTracerProvider();
    if (connectionString) {
      const exporter = new AzureMonitorTraceExporter({ connectionString });
      provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
    }
    provider.register();
  });

  it("ReadmeSample_InstrumentationImport", async () => {
    registerInstrumentations({
      instrumentations: [createAzureSdkInstrumentation()],
    });
    // @ts-preserve-whitespace
    // Import your client after registering the instrumentation
    // import ModelClient from "@azure-rest/ai-inference";
  });

  it("ReadmeSample_InstrumentationRequest", async () => {
    const endpoint = "https://myaccount.openai.azure.com/";
    const credential = new DefaultAzureCredential();
    const client = ModelClient(endpoint, credential);
    // @ts-preserve-whitespace
    const messages = [
      // NOTE: "system" role is not supported on all Azure Models
      { role: "system", content: "You are a helpful assistant. You will talk like a pirate." },
      { role: "user", content: "Can you help me?" },
      { role: "assistant", content: "Arrrr! Of course, me hearty! What can I do for ye?" },
      { role: "user", content: "What's the best way to train a parrot?" },
    ];
    // @ts-preserve-whitespace
    client.path("/chat/completions").post({
      body: {
        messages,
      },
      tracingOptions: { tracingContext: context.active() },
    });
  });

  it("ReadmeSample_TracingOwnFunction", async () => {
    const tracer = trace.getTracer("sample", "0.1.0");
    // @ts-preserve-whitespace
    const getWeatherFunc = (location: string, unit: string): string => {
      return tracer.startActiveSpan("getWeatherFunc", (span) => {
        if (unit !== "celsius") {
          unit = "fahrenheit";
        }
        const result = `The temperature in ${location} is 72 degrees ${unit}`;
        span.setAttribute("result", result);
        span.end();
        return result;
      });
    };
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
