# Azure Inference REST client library for JavaScript

Inference API for Azure-supported AI models

**Please rely heavily on our [REST client docs](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/rest-clients.md) to use this library**

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/openai/openai-rest)
- [Package (NPM)](https://aka.ms/npm-azure-rest-ai-inference)
- [API reference documentation](https://aka.ms/AAp1kxa)
- [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/openai/openai/samples)

## Getting started

```javascript
import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
const client = new ModelClient(
  "https://<Azure Model endpoint>",
  new AzureKeyCredential("<Azure API key>")
);

const response = await client.path("/chat/completions").post({
  body: {
    messages: [
      {role: "user", content: "How many feet are in a mile?"},
    ],
  }
});

if(response.status !== "200") {
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
import { DefaultAzureCredential }  from "@azure/identity";

const client = new ModelClient("<endpoint>", new DefaultAzureCredential());
```

## Key concepts

The main concept to understand is [Completions][azure_openai_completions_docs]. Briefly explained, completions provides its functionality in the form of a text prompt, which by using a specific [model](https://learn.microsoft.com/azure/cognitive-services/openai/concepts/models), will then attempt to match the context and patterns, providing an output text. The following code snippet provides a rough overview:

```javascript
import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

async function main(){
  const client = new ModelClient(
  "https://your-model-endpoint/",
  new AzureKeyCredential("your-model-api-key"));

  const response = await client.path("/chat/completions").post({
    body: {
      messages: [
        {role: "user", content: "Hello, world!"},
      ],
    }
  });

  if(response.status !== "200") {
    throw response.body.error;
  }

  for (const choice of response.body.choices) {
    console.log(choice.message.content);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```

## Examples

### Generate Multiple Completions With Subscription Key

This example generates text responses to input prompts using an Azure subscription key

```javascript
import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

async function main(){
  // Replace with your Azure OpenAI key
  const key = "YOUR_MODEL_API_KEY";
  const endpoint = "https://your-model-endpoint/";
  const client = new ModelClient(endpoint, new AzureKeyCredential(key));

  const messages = [
    { role: "user", content: "How are you today?" },
    { role: "user", content: "What is Azure OpenAI?" },
    { role: "user", content: "Why do children love dinosaurs?" },
    { role: "user", content: "Generate a proof of Euler's identity" },
    { role: "user", content: "Describe in single words only the good things that come into your mind about your mother." },
  ];

  let promptIndex = 0;
  const response = await client.path("/chat/completions").post({
    body: {
      messages
    }
  });

  if(response.status !== "200") {
    throw response.body.error;
  }
  for (const choice of response.body.choices) {
    const completion = choice.message.content;
    console.log(`Input: ${examplePrompts[promptIndex++]}`);
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

async function main(){
  const endpoint = "https://your-model-endpoint/";
  const client = new ModelClient(endpoint, new DefaultAzureCredential());

  const textToSummarize = `
    Two independent experiments reported their results this morning at CERN, Europe's high-energy physics laboratory near Geneva in Switzerland. Both show convincing evidence of a new boson particle weighing around 125 gigaelectronvolts, which so far fits predictions of the Higgs previously made by theoretical physicists.

    ""As a layman I would say: 'I think we have it'. Would you agree?"" Rolf-Dieter Heuer, CERN's director-general, asked the packed auditorium. The physicists assembled there burst into applause.
  :`;

  const summarizationPrompt = [`
    Summarize the following text.

    Text:
    """"""
    ${textToSummarize}
    """"""

    Summary:
  `];

  console.log(`Input: ${summarizationPrompt}`);

  const response = await client.path("/chat/completions").post({
    body: {
      messages: [
        { role: "user", content: summarizationPrompt }
      ],
      max_tokens: 64
    }
  });

  if(response.status !== "200") {
    throw response.body.error;
  }
  const completion = response.body.choices[0].message.content;
  console.log(`Summarization: ${completion}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
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
[get_completions_sample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v1-beta/javascript/completions.js
[stream_chat_completion_sample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v1-beta/javascript/streamChatCompletions.js
[azure_openai_completions_docs]: https://learn.microsoft.com/azure/cognitive-services/openai/how-to/completions
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity
[azure_core_auth]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/core-auth
[register_aad_app]: https://docs.microsoft.com/azure/cognitive-services/authentication#assign-a-role-to-a-service-principal
[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_portal]: https://portal.azure.com
[msdocs_quickstart_byod]: https://learn.microsoft.com/azure/ai-services/openai/use-your-data-quickstart
