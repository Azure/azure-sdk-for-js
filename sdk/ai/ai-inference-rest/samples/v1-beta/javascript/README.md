---
page_type: sample
languages:
  - javascript
products:
  - azure
urlFragment: ai-inference-javascript-beta
---

# Azure AI Inference client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for Azure AI Inference in some common scenarios.

| **File Name**                                                                 | **Description**                                               |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------- |
| [audioDataChatCompletion.js][audiodatachatcompletion]                         | Get chat completions using Audio data.                        |
| [audioUrlChatCompletion.js][audiourlchatcompletion]                           | Get chat completions using Audio URL.                         |
| [chatCompletions.js][chatcompletions]                                         | Get chat completions.                                         |
| [chatCompletionsWithStructuredOutput.js][chatcompletionswithstructuredoutput] | Get chat completions with structured output.                  |
| [embeddings.js][embeddings]                                                   | Get embeddings.                                               |
| [getModelInfo.js][getmodelinfo]                                               | Get model info.                                               |
| [imageEmbeddings.js][imageembeddings]                                         | Get image embeddings.                                         |
| [imageFileCompletions.js][imagefilecompletions]                               | Get chat completions with image file.                         |
| [streamChatCompletions.js][streamchatcompletions]                             | List chat completions.                                        |
| [streamingToolCall.js][streamingtoolcall]                                     | Get chat completions with streaming and function call.        |
| [telemetry.js][telemetry]                                                     | get instrumentation by open telemetry.                        |
| [telemetryWithToolCall.js][telemetrywithtoolcall]                             | Get chat completions with function call with instrumentation. |
| [toolCall.js][toolcall]                                                       | Get chat completions with function call.                      |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

You need [an Azure subscription][freesub] to run these sample programs.

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

3. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node audioDataChatCompletion.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env ENDPOINT="<endpoint>" KEY="<key>" MODEL_NAME="<model name>" node audioDataChatCompletion.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[audiodatachatcompletion]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-inference-rest/samples/v1-beta/javascript/audioDataChatCompletion.js
[audiourlchatcompletion]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-inference-rest/samples/v1-beta/javascript/audioUrlChatCompletion.js
[chatcompletions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-inference-rest/samples/v1-beta/javascript/chatCompletions.js
[chatcompletionswithstructuredoutput]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-inference-rest/samples/v1-beta/javascript/chatCompletionsWithStructuredOutput.js
[embeddings]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-inference-rest/samples/v1-beta/javascript/embeddings.js
[getmodelinfo]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-inference-rest/samples/v1-beta/javascript/getModelInfo.js
[imageembeddings]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-inference-rest/samples/v1-beta/javascript/imageEmbeddings.js
[imagefilecompletions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-inference-rest/samples/v1-beta/javascript/imageFileCompletions.js
[streamchatcompletions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-inference-rest/samples/v1-beta/javascript/streamChatCompletions.js
[streamingtoolcall]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-inference-rest/samples/v1-beta/javascript/streamingToolCall.js
[telemetry]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-inference-rest/samples/v1-beta/javascript/telemetry.js
[telemetrywithtoolcall]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-inference-rest/samples/v1-beta/javascript/telemetryWithToolCall.js
[toolcall]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-inference-rest/samples/v1-beta/javascript/toolCall.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure-rest/ai-inference
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/ai/ai-inference-rest/README.md
