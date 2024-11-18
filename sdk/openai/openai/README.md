# Azure OpenAI library for TypeScript

The [Azure OpenAI Service][service_overview] provides access to advanced AI models for conversational, content creation, and data grounding use cases. The Azure OpenAI library for TypeScript is a companion to the official [OpenAI client library for JavaScript][openai_pkg]. The Azure OpenAI library provides additional strongly typed support for request and response models specific to Azure OpenAI scenarios.

#### **_Migrating from @azure/openai version 1 advisory_ ⚠️**

Checkout the [Migration Guide](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/MIGRATION.md) for detailed instructions on how to update your application code from version 1.x of the Azure OpenAI client library to the `openai` library.

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/)
- [Package (NPM)](https://www.npmjs.com/package/@azure/openai)
- [API reference documentation](https://learn.microsoft.com/javascript/api/overview/azure/openai-readme)
- [Product documentation][service_overview]
- [Samples][samples_folder]

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- Latest versions of Safari, Chrome, Edge, and Firefox.

### Prerequisites

If you'd like to use an Azure OpenAI resource, you must have an [Azure subscription](https://azure.microsoft.com/free/dotnet/)
and [Azure OpenAI access](https://learn.microsoft.com/azure/cognitive-services/openai/overview#how-do-i-get-access-to-azure-openai). For more information, see [Quickstart: Get started generating text using Azure OpenAI Service](https://learn.microsoft.com/azure/cognitive-services/openai/quickstart).

### Install both `openai` and `@azure/openai`

Install the Azure OpenAI client library and the OpenAI library for JavaScript with `npm`:

```bash
npm install openai @azure/openai
```

### Create and authenticate a `AzureOpenAI`

There are several ways to authenticate with the Azure OpenAI service and the recommended way is to use Microsoft Entra ID for secure, keyless authentication via the [Azure Identity library][azure_identity]. To get started:

1. Install the [Azure Identity package](https://www.npmjs.com/package/@azure/identity):

    ```bash
    npm install @azure/identity
    ```

2. Create a token provider by calling the `getBearerTokenProvider` with the desired credential type. For example, [DefaultAzureCredential][azure_identity_dac]:

    ```js
    import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";

    const credential = new DefaultAzureCredential();
    const scope = "https://cognitiveservices.azure.com/.default";
    const azureADTokenProvider = getBearerTokenProvider(credential, scope);
    ```

3. Create the client by passing in the token provider:

    ```js
    import { AzureOpenAI } from "openai";

    const deployment = "Your deployment name";
    const apiVersion = "2024-10-21";
    const client = new AzureOpenAI({ azureADTokenProvider, deployment, apiVersion });
    ```

Grant access to your Azure OpenAI resource to your trusted entities by following instructions in [How to configure Azure OpenAI Service with Microsoft Entra ID authentication](https://learn.microsoft.com/azure/ai-services/openai/how-to/managed-identity).

## Key concepts

### Assistants

See [OpenAI's Assistants API overview](https://platform.openai.com/docs/assistants/overview).

### Audio transcription/translation and text-to-speech generation

See [OpenAI Capabilities: Speech to text](https://platform.openai.com/docs/guides/speech-to-text/speech-to-text).

### Batch

See [OpenAI's Batch API guide](https://platform.openai.com/docs/guides/batch).

### Chat completion

Chat models take a list of messages as input and return a model-generated message as output. Although the chat format is
designed to make multi-turn conversations easy, it's also useful for single-turn tasks without any conversation.

See [OpenAI Capabilities: Chat completion](https://platform.openai.com/docs/guides/text-generation/chat-completions-api).

### Image generation

See [OpenAI Capabilities: Image generation](https://platform.openai.com/docs/guides/images/introduction).

### Files

See [OpenAI's Files API reference](https://platform.openai.com/docs/api-reference/files).

### Text embeddings

See [OpenAI Capabilities: Embeddings](https://platform.openai.com/docs/guides/embeddings/embeddings).

## Examples

This section provides examples of using the features of the Azure OpenAI Service. For additional examples, checkout the [samples folder][samples_folder].

### Analyze Business Data

This TypeScript example generates chat responses to input chat questions about your business data. The business data is provided through an Azure Cognitive Search index. To learn more about how to setup an Azure Cognitive Search index as a data source, see Quickstart: [Chat with Azure OpenAI models using your own data][oyd].

```ts
import { AzureOpenAI } from "openai";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
import "@azure/openai/types";

// Set AZURE_OPENAI_ENDPOINT to the endpoint of your
// Azure OpenAI resource. You can find this in the Azure portal.
import "dotenv/config";

// Your Azure Cognitive Search endpoint, and index name
const azureSearchEndpoint = process.env["AZURE_SEARCH_ENDPOINT"] || "<search endpoint>";
const azureSearchIndexName = process.env["AZURE_SEARCH_INDEX"] || "<search index>";

export async function main() {
  console.log("== Azure On Your Data Sample ==");

  const scope = "https://cognitiveservices.azure.com/.default";
  const azureADTokenProvider = getBearerTokenProvider(new DefaultAzureCredential(), scope);
  const deployment = "gpt-4-1106-preview";
  const apiVersion = "2024-10-21";
  const client = new AzureOpenAI({ azureADTokenProvider, deployment, apiVersion });
  const events = await client.chat.completions.create({
    stream: true,
    messages: [
      {
        role: "user",
        content:
          "What's the most common feedback we received from our customers about the product?",
      },
    ],
    max_tokens: 128,
    model: "",
    data_sources: [
      {
        type: "azure_search",
        parameters: {
          endpoint: azureSearchEndpoint,
          index_name: azureSearchIndexName,
          authentication: {
            type: "system_assigned_managed_identity",
          },
        },
      },
    ],
  });

  for await (const event of events) {
    for (const choice of event.choices) {
      console.log(choice.delta?.content);
    }
  }
}

main();
```

### Content-filtered Chat Completions

Azure OpenAI Service includes a content filtering system that works alongside core models. This system detects and takes action on specific categories of potentially harmful content in both input prompts and output completions. This example shows how to access those content filtering results.

```ts
import { AzureOpenAI } from "openai";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
import "@azure/openai/types";

// Set AZURE_OPENAI_ENDPOINT to the endpoint of your
// OpenAI resource. You can find this in the Azure portal.
import "dotenv/config";

async function main() {
  console.log("== Streaming Chat Completions Sample ==");

  const scope = "https://cognitiveservices.azure.com/.default";
  const azureADTokenProvider = getBearerTokenProvider(new DefaultAzureCredential(), scope);
  const deployment = "gpt-35-turbo";
  const apiVersion = "2024-10-21";
  const client = new AzureOpenAI({ azureADTokenProvider, deployment, apiVersion });
  const events = await client.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant. You will talk like a pirate." },
      { role: "user", content: "Can you help me?" },
      { role: "assistant", content: "Arrrr! Of course, me hearty! What can I do for ye?" },
      { role: "user", content: "What's the best way to train a parrot?" },
    ],
    model: "",
    max_tokens: 128,
    stream: true,
  });

  for await (const event of events) {
    for (const choice of event.choices) {
      console.log(`Chunk: ${choice.delta?.content}`);
      const filterResults = choice.content_filter_results;
      if (!filterResults) {
        continue;
      }
      if (filterResults.error) {
        console.log(
          `\tContent filter ran into an error ${filterResults.error.code}: ${filterResults.error.message}`,
        );
      } else {
        const { hate, sexual, selfHarm, violence } = filterResults;
        console.log(
          `\tHate category is filtered: ${hate?.filtered}, with ${hate?.severity} severity`,
        );
        console.log(
          `\tSexual category is filtered: ${sexual?.filtered}, with ${sexual?.severity} severity`,
        );
        console.log(
          `\tSelf-harm category is filtered: ${selfHarm?.filtered}, with ${selfHarm?.severity} severity`,
        );
        console.log(
          `\tViolence category is filtered: ${violence?.filtered}, with ${violence?.severity} severity`,
        );
      }
    }
  }
}

main();
```

## Next steps

## Troubleshooting

Refer to the official [OpenAI client library for JavaScript][openai_pkg_readme].

## Contributing

See the [OpenAI CONTRIBUTING.md][openai_contrib] for details on building, testing, and contributing to this library.

This project welcomes contributions and suggestions. Most contributions require you to agree to a Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us the rights to use your contribution. For details, visit [cla.microsoft.com][cla].

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct][code_of_conduct]. For more information, see the [Code of Conduct FAQ][code_of_conduct_faq] or contact [opencode@microsoft.com][email_opencode] with any additional questions or comments.

<!-- LINKS -->
[openai_pkg]: https://www.npmjs.com/package/openai
[service_overview]: https://azure.microsoft.com/products/ai-services/openai-service
[azure_identity]: https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest
[azure_identity_dac]: https://learn.microsoft.com/javascript/api/@azure/identity/defaultazurecredential?view=azure-node-latest
[oyd]: https://learn.microsoft.com/azure/ai-services/openai/use-your-data-quickstart
[samples_folder]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples
[openai_pkg_readme]: https://github.com/openai/openai-node/blob/master/README.md
[cla]: https://cla.microsoft.com
[openai_contrib]: https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md
[code_of_conduct]: https://opensource.microsoft.com/codeofconduct/
[code_of_conduct_faq]: https://opensource.microsoft.com/codeofconduct/faq/
[email_opencode]: mailto:opencode@microsoft.com
