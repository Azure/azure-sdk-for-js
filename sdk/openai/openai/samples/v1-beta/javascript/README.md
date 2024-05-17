---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-cognitive-services
  - azure-openai
urlFragment: openai-javascript-beta
---

# Azure OpenAI client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for Azure OpenAI in some common scenarios.

| **File Name**                                                                       | **Description**                                                              |
| ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [audioTranscription.js][audiotranscription]                                         | audio transcription.                                                         |
| [audioTranslation.js][audiotranslation]                                             | audio translation.                                                           |
| [bringYourOwnData.js][bringyourowndata]                                             | chat completions with your own data.                                         |
| [chatCompletions.js][chatcompletions]                                               | get chat completions.                                                        |
| [codeInterpreter.js][codeinterpreter]                                               | interpreting code.                                                           |
| [completions.js][completions]                                                       | get completions.                                                             |
| [getEmbeddings.js][getembeddings]                                                   | generates embedding vectors from a prompt using Azure OpenAI Get Embeddings. |
| [getImages.js][getimages]                                                           | generates images from prompts using Azure OpenAI Batch Image Generation.     |
| [streamChatCompletions.js][streamchatcompletions]                                   | list chat completions.                                                       |
| [streamChatCompletionsWithContentFilter.js][streamchatcompletionswithcontentfilter] | get completions.                                                             |
| [streamCompletions.js][streamcompletions]                                           | list completions.                                                            |
| [toolCall.js][toolcall]                                                             | get chat completions with functions.                                         |
| [parseOpenAIError.js][parseopenaierror]                                             | parse OpenAI error.                                                          |
| [openAi.js][openai]                                                                 | get completions using the OpenAI API.                                        |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

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

2. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

3. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node audioTranscription.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env ENDPOINT="<endpoint>" AZURE_API_KEY="<azure api key>" AUDIO_FILE_PATH="<audio file path>" node audioTranscription.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[audiotranscription]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v1-beta/javascript/audioTranscription.js
[audiotranslation]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v1-beta/javascript/audioTranslation.js
[bringyourowndata]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v1-beta/javascript/bringYourOwnData.js
[chatcompletions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v1-beta/javascript/chatCompletions.js
[codeinterpreter]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v1-beta/javascript/codeInterpreter.js
[completions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v1-beta/javascript/completions.js
[getembeddings]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v1-beta/javascript/getEmbeddings.js
[getimages]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v1-beta/javascript/getImages.js
[streamchatcompletions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v1-beta/javascript/streamChatCompletions.js
[streamchatcompletionswithcontentfilter]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v1-beta/javascript/streamChatCompletionsWithContentFilter.js
[streamcompletions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v1-beta/javascript/streamCompletions.js
[toolcall]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v1-beta/javascript/toolCall.js
[parseopenaierror]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v1-beta/javascript/parseOpenAIError.js
[openai]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v1-beta/javascript/openAi.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/openai
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurecognitiveservicesinstance]: https://learn.microsoft.com/azure/cognitive-services/openai/how-to/create-resource
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/openai/openai/README.md
