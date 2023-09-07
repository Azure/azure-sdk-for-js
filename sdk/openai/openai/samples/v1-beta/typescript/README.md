---
page_type: sample
languages:
  - typescript
products:
  - azure
  - azure-cognitive-services
  - azure-openai
urlFragment: openai-typescript-beta
---

# Azure OpenAI client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for Azure OpenAI in some common scenarios.

| **File Name**                                 | **Description**                                                          |
| --------------------------------------------- | ------------------------------------------------------------------------ |
| [bringYourOwnData.ts][bringyourowndata]       | chat completions with your own data.                                     |
| [chatCompletions.ts][chatcompletions]         | get chat completions.                                                    |
| [completions.ts][completions]                 | get completions.                                                         |
| [functions.ts][functions]                     | get chat completions with functions.                                     |
| [getImages.ts][getimages]                     | generates images from prompts using Azure OpenAI Batch Image Generation. |
| [listChatCompletions.ts][listchatcompletions] | list chat completions.                                                   |
| [listCompletions.ts][listcompletions]         | list completions.                                                        |
| [readableStream.ts][readablestream]           | stream chat completions.                                                 |
| [openAi.ts][openai]                           | get completions using the OpenAI API.                                    |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure Cognitive Services instance][createinstance_azurecognitiveservicesinstance]

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Compile the samples:

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/bringYourOwnData.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env ENDPOINT="<endpoint>" AZURE_API_KEY="<azure api key>" AZURE_SEARCH_ENDPOINT="<azure search endpoint>" AZURE_SEARCH_KEY="<azure search key>" AZURE_SEARCH_INDEX="<azure search index>" node dist/bringYourOwnData.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[bringyourowndata]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v1-beta/typescript/src/bringYourOwnData.ts
[chatcompletions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v1-beta/typescript/src/chatCompletions.ts
[completions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v1-beta/typescript/src/completions.ts
[functions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v1-beta/typescript/src/functions.ts
[getimages]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v1-beta/typescript/src/getImages.ts
[listchatcompletions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v1-beta/typescript/src/listChatCompletions.ts
[listcompletions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v1-beta/typescript/src/listCompletions.ts
[readablestream]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v1-beta/typescript/src/readableStream.ts
[openai]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v1-beta/typescript/src/openAi.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/openai
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurecognitiveservicesinstance]: https://learn.microsoft.com/azure/cognitive-services/openai/how-to/create-resource
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/openai/openai/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
