# Azure OpenAI client library for JavaScript

The Azure OpenAI client library for JavaScript is an adaptation of OpenAI's REST APIs that provides an idiomatic interface
and rich integration with the rest of the Azure SDK ecosystem. It can connect to Azure OpenAI resources *or* to the
non-Azure OpenAI inference endpoint, making it a great choice for even non-Azure OpenAI development.

Use the client library for Azure OpenAI to:

* [Create a completion for text][msdocs_openai_completion]
* [Create a chat completion with ChatGPT][msdocs_openai_chat_completion]
* [Create a text embedding for comparisons][msdocs_openai_embedding]

Azure OpenAI is a managed service that allows developers to deploy, tune, and generate content from OpenAI models on Azure resources.

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/openai/openai)
- [Package (NPM)](https://www.npmjs.com/package/@azure/openai)
- [API reference documentation](https://aka.ms/openai-js-api)
- [Product documentation](https://learn.microsoft.com/azure/cognitive-services/openai)
- [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/openai/openai/samples/v1-beta)

## Getting started

```javascript
const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");

const client = new OpenAIClient(
  "https://<resource name>.openai.azure.com/", 
  new AzureKeyCredential("<Azure API key>")
);
const { id, created, choices, usage } = await client.getCompletions("<deployment ID>", ["YOUR PROMPT HERE"]);
```

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- Latest versions of Safari, Chrome, Edge, and Firefox.

### Prerequisites

If you'd like to use an Azure OpenAI resource, you must have an [Azure subscription](https://azure.microsoft.com/free/dotnet/)
and [Azure OpenAI access](https://learn.microsoft.com/azure/cognitive-services/openai/overview#how-do-i-get-access-to-azure-openai).
This will allow you to create an Azure OpenAI resource and get both a connection URL as well as API keys. For more
information, see [Quickstart: Get started generating text using Azure OpenAI Service](https://learn.microsoft.com/azure/cognitive-services/openai/quickstart).

If you'd like to use the Azure OpenAI JS client library to connect to non-Azure OpenAI, you'll need an API key
from a developer account at https://platform.openai.com/.

### Install the `@azure/openai` package

Install the Azure OpenAI client client library for JavaScript with `npm`:

```bash
npm install @azure/openai
```

### Create and authenticate a `OpenAIClient`

To configure a client for use with Azure OpenAI, provide a valid endpoint URI to an Azure OpenAI resource
along with a corresponding key credential, token credential, or Azure identity credential that's authorized to use the
Azure OpenAI resource. To instead configure the client to connect to OpenAI's service, provide an API key from OpenAI's
developer portal.

#### Using an API Key from Azure

Use the [Azure Portal][azure_portal] to browse to your OpenAI resource and retrieve an API key, or use the [Azure CLI][azure_cli] snippet below:

**Note:** Sometimes the API key is referred to as a "subscription key" or "subscription API key."

```PowerShell
az cognitiveservices account keys list --resource-group <your-resource-group-name> --name <your-resource-name>
```

Once you have an API key and endpoint, you can use the `AzureKeyCredential` class to authenticate the client as follows:

```javascript
const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");

const client = new OpenAIClient("<endpoint>", new AzureKeyCredential("<API key>"));
```

#### Using an Azure Active Directory Credential

Client API key authentication is used in most of the examples, but you can also authenticate with Azure Active Directory using the [Azure Identity library][azure_identity]. To use the [DefaultAzureCredential][defaultazurecredential] provider shown below,
or other credential providers provided with the Azure SDK, please install the `@azure/identity` package:

```bash
npm install @azure/identity
```

You will also need to [register a new AAD application][register_aad_app] and grant access to OpenAI by assigning the `"Cognitive Services User"` role to your service principal (note: other roles such as `"Owner"` will not grant the necessary permissions, only `"Cognitive Services User"` will suffice to run the examples and the sample code).

Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_CLIENT_SECRET`.

```javascript
const { OpenAIClient } = require("@azure/openai");
const { DefaultAzureCredential } = require("@azure/identity");

const client = new OpenAIClient("<endpoint>", new DefaultAzureCredential());
```

#### Using an API Key from OpenAI

To instead configure the client to connect to OpenAI's service, provide an API key from OpenAI's
developer portal. Once you have an API key, you can use the `OpenAIKeyCredential` class to authenticate the client as follows:

```javascript
const { OpenAIClient, OpenAIKeyCredential } = require("@azure/openai");

const client = new OpenAIClient(new OpenAIKeyCredential("<API key>"));
```

## Key concepts

The main concept to understand is [Completions][azure_openai_completions_docs]. Briefly explained, completions provides its functionality in the form of a text prompt, which by using a specific [model](https://learn.microsoft.com/azure/cognitive-services/openai/concepts/models), will then attempt to match the context and patterns, providing an output text. The following code snippet provides a rough overview:

```javascript
const client = new OpenAIClient(
  "https://your-azure-openai-resource.com/",
  new AzureKeyCredential("your-azure-openai-resource-api-key"));

const { choices } = await client.getCompletions(
  "text-davinci-003", // assumes a matching model deployment or model name
  ["Hello, world!"]);

for (const choice of choices) {
  console.log(choice.text);
}
```

## Examples

You can familiarize yourself with different APIs using [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/openai/openai/samples/v1-beta).

### Generate Chatbot Response

This example authenticates using a DefaultAzureCredential, then generates text responses to input prompts.

```javascript
const endpoint = "https://myaccount.openai.azure.com/";
const client = new OpenAIClient(endpoint, new DefaultAzureCredential());

const deploymentName = "text-davinci-003";
const prompt = ["What is Azure OpenAI?"];
console.log(`Input: ${prompt}`);

const { choices } = await client.getCompletions(deploymentName, prompt);
const completion = choices[0].text;
console.log(`Chatbot: ${completion}`);
```

### Generate Multiple Chatbot Responses With Subscription Key

This example generates text responses to input prompts using an Azure subscription key

```javascript
// Replace with your Azure OpenAI key
const key = "YOUR_AZURE_OPENAI_KEY";
const endpoint = "https://myaccount.openai.azure.com/";
const client = new OpenAIClient(endpoint, new AzureKeyCredential(key));

const examplePrompts = [
  "How are you today?",
  "What is Azure OpenAI?",
  "Why do children love dinosaurs?",
  "Generate a proof of Euler's identity",
  "Describe in single words only the good things that come into your mind about your mother.",
];

const deploymentName = "text-davinci-003";

let promptIndex = 0;
const { choices } = await client.getCompletions(deploymentName, examplePrompts);
for (const choice of choices) {
  const completion = choice.text;
  console.log(`Input: ${examplePrompts[promptIndex++]}`);
  console.log(`Chatbot: ${completion}`);
}
```

### Summarize Text with Completion

This example generates a summarization of the given input prompt.

```javascript
const endpoint = "https://myaccount.openai.azure.com/";
const client = new OpenAIClient(endpoint, new DefaultAzureCredential());

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

const deploymentName = "text-davinci-003";

const { choices } = await client.getCompletions(deploymentName, summarizationPrompt);
const completion = choices[0].text;
console.log(`Summarization: ${completion}`);
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
[msdocs_openai_completion]: https://learn.microsoft.com/azure/cognitive-services/openai/how-to/completions
[msdocs_openai_chat_completion]: https://learn.microsoft.com/azure/cognitive-services/openai/how-to/chatgpt
[msdocs_openai_embedding]: https://learn.microsoft.com/azure/cognitive-services/openai/concepts/understand-embeddings
[azure_openai_completions_docs]: https://learn.microsoft.com/azure/cognitive-services/openai/how-to/completions
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity
[register_aad_app]: https://docs.microsoft.com/azure/cognitive-services/authentication#assign-a-role-to-a-service-principal
[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_portal]: https://portal.azure.com
