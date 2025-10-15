---
page_type: sample
languages:
  - typescript
products:
  - azure
urlFragment: ai-inference-typescript-beta
---

# Azure AI Inference client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for Azure AI Inference in some common scenarios.

| **File Name**                                                                 | **Description**                                               |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------- |
| [audioDataChatCompletion.ts][audiodatachatcompletion]                         | Get chat completions using Audio data.                        |
| [audioUrlChatCompletion.ts][audiourlchatcompletion]                           | Get chat completions using Audio URL.                         |
| [chatCompletions.ts][chatcompletions]                                         | Get chat completions.                                         |
| [chatCompletionsWithStructuredOutput.ts][chatcompletionswithstructuredoutput] | Get chat completions with structured output.                  |
| [embeddings.ts][embeddings]                                                   | Get embeddings.                                               |
| [getModelInfo.ts][getmodelinfo]                                               | Get model info.                                               |
| [imageEmbeddings.ts][imageembeddings]                                         | Get image embeddings.                                         |
| [imageFileCompletions.ts][imagefilecompletions]                               | Get chat completions with image file.                         |
| [streamChatCompletions.ts][streamchatcompletions]                             | List chat completions.                                        |
| [streamingToolCall.ts][streamingtoolcall]                                     | Get chat completions with streaming and function call.        |
| [telemetry.ts][telemetry]                                                     | get instrumentation by open telemetry.                        |
| [telemetryWithToolCall.ts][telemetrywithtoolcall]                             | Get chat completions with function call with instrumentation. |
| [toolCall.ts][toolcall]                                                       | Get chat completions with function call.                      |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] to run these sample programs.

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
node dist/audioDataChatCompletion.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env ENDPOINT="<endpoint>" KEY="<key>" MODEL_NAME="<model name>" node dist/audioDataChatCompletion.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[audiodatachatcompletion]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-inference-rest/samples/v1-beta/typescript/src/audioDataChatCompletion.ts
[audiourlchatcompletion]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-inference-rest/samples/v1-beta/typescript/src/audioUrlChatCompletion.ts
[chatcompletions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-inference-rest/samples/v1-beta/typescript/src/chatCompletions.ts
[chatcompletionswithstructuredoutput]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-inference-rest/samples/v1-beta/typescript/src/chatCompletionsWithStructuredOutput.ts
[embeddings]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-inference-rest/samples/v1-beta/typescript/src/embeddings.ts
[getmodelinfo]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-inference-rest/samples/v1-beta/typescript/src/getModelInfo.ts
[imageembeddings]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-inference-rest/samples/v1-beta/typescript/src/imageEmbeddings.ts
[imagefilecompletions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-inference-rest/samples/v1-beta/typescript/src/imageFileCompletions.ts
[streamchatcompletions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-inference-rest/samples/v1-beta/typescript/src/streamChatCompletions.ts
[streamingtoolcall]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-inference-rest/samples/v1-beta/typescript/src/streamingToolCall.ts
[telemetry]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-inference-rest/samples/v1-beta/typescript/src/telemetry.ts
[telemetrywithtoolcall]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-inference-rest/samples/v1-beta/typescript/src/telemetryWithToolCall.ts
[toolcall]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-inference-rest/samples/v1-beta/typescript/src/toolCall.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure-rest/ai-inference
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/ai/ai-inference-rest/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
