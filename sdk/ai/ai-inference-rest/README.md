# Azure Inference REST client library for JavaScript

Inference API for Azure-supported AI models

**Please rely heavily on our [REST client docs](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/rest-clients.md) to use this library**

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/ai/ai-inference-rest)
- [Package (NPM)](https://aka.ms/npm-azure-rest-ai-inference)
- [API reference documentation](https://learn.microsoft.com/javascript/api/@azure-rest/ai-inference/)
- [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/ai/ai-inference-rest/samples)

## Getting started

```javascript
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
const client = new ModelClient(
  "https://<Azure Model endpoint>",
  new AzureKeyCredential("<Azure API key>"),
);

const response = await client.path("/chat/completions").post({
  body: {
    messages: [{ role: "user", content: "How many feet are in a mile?" }],
  },
});

if (isUnexpected(response)) {
  throw response.body.error;
}
console.log(response.body.choices[0].message.content);
```

### Currently supported environments

- LTS versions of Node.js

### Prerequisites

- You must have an [Azure subscription](https://azure.microsoft.com/free/) to use this package.

### Install the `@azure-rest/ai-inference` package

Install the Azure ModelClient REST client REST client library for JavaScript with `npm`:

```bash
npm install @azure-rest/ai-inference
```

### Create and authenticate a `ModelClient`

#### Using an API Key from Azure

You can authenticate with an Azure API key using the [Azure Core Auth library][azure_core_auth]. To use the AzureKeyCredential provider shown below, please install the `@azure/core-auth` package:

```bash
npm install @azure/core-auth
```

Use the [Azure Portal][azure_portal] to browse to your Model deployment and retrieve an API key.

**Note:** Sometimes the API key is referred to as a "subscription key" or "subscription API key."

Once you have an API key and endpoint, you can use the `AzureKeyCredential` class to authenticate the client as follows:

```javascript
import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

const client = new ModelClient("<endpoint>", new AzureKeyCredential("<API key>"));
```

#### Using an Azure Active Directory Credential

You can also authenticate with Azure Active Directory using the [Azure Identity library][azure_identity]. To use the [DefaultAzureCredential][defaultazurecredential] provider shown below,
or other credential providers provided with the Azure SDK, please install the `@azure/identity` package:

```bash
npm install @azure/identity
```

Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_CLIENT_SECRET`.

```javascript
import ModelClient from "@azure-rest/ai-inference";
import { DefaultAzureCredential } from "@azure/identity";

const client = new ModelClient("<endpoint>", new DefaultAzureCredential());
```

## Key concepts

The main concept to understand is [Completions][azure_openai_completions_docs]. Briefly explained, completions provides its functionality in the form of a text prompt, which by using a specific [model](https://learn.microsoft.com/azure/cognitive-services/openai/concepts/models), will then attempt to match the context and patterns, providing an output text. The following code snippet provides a rough overview:

```javascript
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

async function main() {
  const client = new ModelClient(
    "https://your-model-endpoint/",
    new AzureKeyCredential("your-model-api-key"),
  );

  const response = await client.path("/chat/completions").post({
    body: {
      messages: [{ role: "user", content: "Hello, world!" }],
    },
  });

  if (isUnexpected(response)) {
    throw response.body.error;
  }

  console.log(response.body.choices[0].message.content);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```

## Examples

### Generate Chatbot Response

Streaming chat with the Inference SDK requires core streaming support; to enable this support, please install the `@azure/core-sse` package:

```bash
npm install @azure/core-sse
```

This example authenticates using a DefaultAzureCredential, then generates chat responses to input chat question and messages.

```javascript
import ModelClient from "@azure-rest/ai-inference";
import { DefaultAzureCredential } from "@azure/identity";
import { createSseStream } from "@azure/core-sse";

async function main() {
  const endpoint = "https://myaccount.openai.azure.com/";
  const client = new ModelClient(endpoint, new DefaultAzureCredential());

  const messages = [
    // NOTE: "system" role is not supported on all Azure Models
    { role: "system", content: "You are a helpful assistant. You will talk like a pirate." },
    { role: "user", content: "Can you help me?" },
    { role: "assistant", content: "Arrrr! Of course, me hearty! What can I do for ye?" },
    { role: "user", content: "What's the best way to train a parrot?" },
  ];

  console.log(`Messages: ${messages.map((m) => m.content).join("\n")}`);

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

  const stream = response.body;
  if (!stream) {
    throw new Error("The response stream is undefined");
  }

  if (response.status !== "200") {
    throw new Error(`Failed to get chat completions: ${response.body.error}`);
  }

  const sses = createSseStream(stream);

  for await (const event of sses) {
    if (event.data === "[DONE]") {
      return;
    }
    for (const choice of JSON.parse(event.data).choices) {
      console.log(choice.delta?.content ?? "");
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```

### Generate Multiple Completions With Subscription Key

This example generates text responses to input prompts using an Azure subscription key

```javascript
import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

async function main() {
  // Replace with your Model API key
  const key = "YOUR_MODEL_API_KEY";
  const endpoint = "https://your-model-endpoint/";
  const client = new ModelClient(endpoint, new AzureKeyCredential(key));

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

  let promptIndex = 0;
  const response = await client.path("/chat/completions").post({
    body: {
      messages,
    },
  });

  if (response.status !== "200") {
    throw response.body.error;
  }
  for (const choice of response.body.choices) {
    const completion = choice.message.content;
    console.log(`Input: ${messages[promptIndex++].content}`);
    console.log(`Chatbot: ${completion}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```

### Summarize Text with Completion

This example generates a summarization of the given input prompt.

```javascript
import ModelClient from "@azure-rest/ai-inference";
import { DefaultAzureCredential } from "@azure/identity";

async function main() {
  const endpoint = "https://your-model-endpoint/";
  const client = new ModelClient(endpoint, new DefaultAzureCredential());

  const textToSummarize = `
    Two independent experiments reported their results this morning at CERN, Europe's high-energy physics laboratory near Geneva in Switzerland. Both show convincing evidence of a new boson particle weighing around 125 gigaelectronvolts, which so far fits predictions of the Higgs previously made by theoretical physicists.

    ""As a layman I would say: 'I think we have it'. Would you agree?"" Rolf-Dieter Heuer, CERN's director-general, asked the packed auditorium. The physicists assembled there burst into applause.
  :`;

  const summarizationPrompt = `
    Summarize the following text.

    Text:
    """"""
    ${textToSummarize}
    """"""

    Summary:
  `;

  console.log(`Input: ${summarizationPrompt}`);

  const response = await client.path("/chat/completions").post({
    body: {
      messages: [{ role: "user", content: summarizationPrompt }],
      max_tokens: 64,
    },
  });

  if (response.status !== "200") {
    throw response.body.error;
  }
  const completion = response.body.choices[0].message.content;
  console.log(`Summarization: ${completion}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```

### Use chat tools

**Tools** extend chat completions by allowing an assistant to invoke defined functions and other capabilities in the
process of fulfilling a chat completions request. To use chat tools, start by defining a function tool:

```js
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
```

With the tool defined, include that new definition in the options for a chat completions request:

```js
const messages = [{ role: "user", content: "What is the weather like in Boston?" }];
const tools = [
  {
    type: "function",
    function: getCurrentWeather,
  },
];
const result = await client.path("/chat/completions").post({
  body: {
    messages,
    tools,
  },
});
```

When the assistant decides that one or more tools should be used, the response message includes one or more "tool
calls" that must all be resolved via "tool messages" on the subsequent request. This resolution of tool calls into
new request messages can be thought of as a sort of "callback" for chat completions.

```js
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
```

To provide tool call resolutions to the assistant to allow the request to continue, provide all prior historical
context -- including the original system and user messages, the response from the assistant that included the tool
calls, and the tool messages that resolved each of those tools -- when making a subsequent request.

```js
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
```

### Chat with images (using models supporting image chat, such as gpt-4o)

Some Azure models allow you to use images as input components into chat completions.

To do this, provide distinct content items on the user message(s) for the chat completions request:

```js
const url = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
const messages = [{
    role: "user", content: [{
    type: "image_url",
    image_url: {
      url,
      detail: "auto"
    }
  }]},
  {role: "user", content: "describe the image"}];
```

Chat Completions will then proceed as usual, though the model may report the more informative `finish_details` in lieu
of `finish_reason`:

```js
const response = await client.path("/chat/completions").post({
  body: {
    messages
});
console.log(`Chatbot: ${response.choices[0].message?.content}`);
```

### Text Embeddings example

This example demonstrates how to get text embeddings with Entra ID authentication.

```javascript
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { DefaultAzureCredential } from "@azure/identity";

const endpoint = "<your_model_endpoint>";
const credential = new DefaultAzureCredential();

async function main() {
  const client = ModelClient(endpoint, credential);
  const response = await client.path("/embeddings").post({
    body: {
      input: ["first phrase", "second phrase", "third phrase"],
    },
  });

  if (isUnexpected(response)) {
    throw response.body.error;
  }
  for (const data of response.body.data) {
    console.log(
      `data length: ${data.length}, [${data[0]}, ${data[1]}, ..., ${data[data.length - 2]}, ${data[data.length - 1]}]`,
    );
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```

The length of the embedding vector depends on the model, but you should see something like this:

```text
data: length=1024, [0.0013399124, -0.01576233, ..., 0.007843018, 0.000238657]
data: length=1024, [0.036590576, -0.0059547424, ..., 0.011405945, 0.004863739]
data: length=1024, [0.04196167, 0.029083252, ..., -0.0027484894, 0.0073127747]
```

To generate embeddings for additional phrases, simply call `client.path("/embeddings").post` multiple times using the same `client`.

### Image Embeddings example

This example demonstrates how to get image embeddings with Entra ID authentication.

```javascript
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { DefaultAzureCredential } from "@azure/identity";
import fs from "fs";

const endpoint = "<your_model_endpoint>";
const credential = new DefaultAzureCredential();

function getImageDataUrl(imageFile, imageFormat) {
  try {
    const imageBuffer = fs.readFileSync(imageFile);
    const imageBase64 = imageBuffer.toString("base64");
    return `data:image/${imageFormat};base64,${imageBase64}`;
  } catch (error) {
    console.error(`Could not read '${imageFile}'.`);
    console.error("Set the correct path to the image file before running this sample.");
    process.exit(1);
  }
}

async function main() {
  const client = ModelClient(endpoint, credential);
  const image = getImageDataUrl("<image_file>", "<image_format>");
  const response = await client.path("/images/embeddings").post({
    body: {
      input: [{image}],
    },
  });

  if (isUnexpected(response)) {
    throw response.body.error;
  }
  for (const data of response.body.data) {
    console.log(
      `data length: ${data.length}, [${data[0]}, ${data[1]}, ..., ${data[data.length - 2]}, ${data[data.length - 1]}]`,
    );
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```

The length of the embedding vector depends on the model, but you should see something like this:

```text
data: length=1024, [0.0013399124, -0.01576233, ..., 0.007843018, 0.000238657]
data: length=1024, [0.036590576, -0.0059547424, ..., 0.011405945, 0.004863739]
data: length=1024, [0.04196167, 0.029083252, ..., -0.0027484894, 0.0073127747]
```

### Instrumentation

Currently instrumentation is only supported for `Chat Completion without streaming`.
To enable instrumentation, it is required to register exporter(s).

Here is an example to add console as a exporter:

```js
import {
  ConsoleSpanExporter,
  NodeTracerProvider,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-node";

const provider = new NodeTracerProvider();
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
provider.register();
```

Here is an example to add application insight to be a exporter:

```js
import { NodeTracerProvider, SimpleSpanProcessor } from "@opentelemetry/sdk-trace-node";
import { AzureMonitorTraceExporter } from "@azure/monitor-opentelemetry-exporter";

// provide a connection string
const connectionString = "<connection string>";

const provider = new NodeTracerProvider();
if (connectionString) {
  const exporter = new AzureMonitorTraceExporter({ connectionString });
  provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
}
provider.register();
```

To use instrumentation for Azure SDK, you need to register it before importing any dependencies from `@azure/core-tracing`, such as `@azure-rest/ai-inference`.

```js
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { createAzureSdkInstrumentation } from "@azure/opentelemetry-instrumentation-azure-sdk";

registerInstrumentations({
  instrumentations: [createAzureSdkInstrumentation()],
});

import ModelClient from "@azure-rest/ai-inference";
```

Finally when you are making a call for chat completion, you need to include

```js
tracingOptions: {
  tracingContext: context.active();
}
```

Here is an example:

```js
import { context } from "@opentelemetry/api";
client.path("/chat/completions").post({
      body: {...},
      tracingOptions: { tracingContext: context.active() }
});
```

### Tracing Your Own Functions

Open Telemetry provides `startActiveSpan` to instrument you own code. Here is an example:

```js
import { trace } from "@opentelemetry/api";
const tracer = trace.getTracer("sample", "0.1.0");

const getWeatherFunc = (location: string, unit: string): string => {
  return tracer.startActiveSpan("getWeatherFunc", span => {
    if (unit !== "celsius") {
      unit = "fahrenheit";
    }
    const result = `The temperature in ${location} is 72 degrees ${unit}`;
    span.setAttribute("result", result);
    span.end();
    return result;
  });
}
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
const { setLogLevel } = require("@azure/logger");

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

<!-- LINKS -->

[stream_chat_completion_sample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-inference-rest/samples/v1-beta/typescript/streamChatCompletions.ts
[azure_openai_completions_docs]: https://learn.microsoft.com/azure/cognitive-services/openai/how-to/completions
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity
[azure_core_auth]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/core-auth
[register_aad_app]: https://learn.microsoft.com/azure/cognitive-services/authentication#assign-a-role-to-a-service-principal
[azure_cli]: https://learn.microsoft.com/cli/azure
[azure_portal]: https://portal.azure.com
