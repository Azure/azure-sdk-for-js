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
| [batch.js][batch]                                                                   | create and retrieve batch content.                                           |
| [chatCompletions.js][chatcompletions]                                               | get chat completions.                                                        |
| [chatCompletionsWithStructuredOutput.js][chatcompletionswithstructuredoutput]       | get chat completions with structured output.                                 |
| [codeInterpreter.js][codeinterpreter]                                               | interpreting code.                                                           |
| [completions.js][completions]                                                       | get completions.                                                             |
| [embeddings.js][embeddings]                                                         | generates embedding vectors from a prompt using Azure OpenAI Get Embeddings. |
| [images.js][images]                                                                 | generates images from prompts using Azure OpenAI Batch Image Generation.     |
| [onYourData.js][onyourdata]                                                         | chat completions with your own data.                                         |
| [responsesStream.js][responsesstream]                                               | streams text completions from Azure OpenAI.                                  |
| [responsesStreamingTools.js][responsesstreamingtools]                               | streams function calls for database queries using Azure OpenAI.              |
| [streamChatCompletions.js][streamchatcompletions]                                   | list chat completions.                                                       |
| [streamChatCompletionsWithContentFilter.js][streamchatcompletionswithcontentfilter] | get completions.                                                             |
| [streamCompletions.js][streamcompletions]                                           | list completions.                                                            |
| [textToSpeech.js][texttospeech]                                                     | text to speech.                                                              |
| [toolCall.js][toolcall]                                                             | get chat completions with functions.                                         |
| [websocket.js][websocket]                                                           | converse with Realtime API.                                                  |
| [ws.js][ws]                                                                         | converse with Realtime API.                                                  |

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
cross-env AUDIO_FILE_PATH="<audio file path>" node audioTranscription.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[audiotranscription]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v2-beta/javascript/audioTranscription.js
[audiotranslation]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v2-beta/javascript/audioTranslation.js
[batch]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v2-beta/javascript/batch.js
[chatcompletions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v2-beta/javascript/chatCompletions.js
[chatcompletionswithstructuredoutput]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v2-beta/javascript/chatCompletionsWithStructuredOutput.js
[codeinterpreter]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v2-beta/javascript/codeInterpreter.js
[completions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v2-beta/javascript/completions.js
[embeddings]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v2-beta/javascript/embeddings.js
[images]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v2-beta/javascript/images.js
[onyourdata]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v2-beta/javascript/onYourData.js
[responsesstream]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v2-beta/javascript/responsesStream.js
[responsesstreamingtools]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v2-beta/javascript/responsesStreamingTools.js
[streamchatcompletions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v2-beta/javascript/streamChatCompletions.js
[streamchatcompletionswithcontentfilter]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v2-beta/javascript/streamChatCompletionsWithContentFilter.js
[streamcompletions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v2-beta/javascript/streamCompletions.js
[texttospeech]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v2-beta/javascript/textToSpeech.js
[toolcall]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v2-beta/javascript/toolCall.js
[websocket]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v2-beta/javascript/websocket.js
[ws]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v2-beta/javascript/ws.js
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurecognitiveservicesinstance]: https://learn.microsoft.com/azure/cognitive-services/openai/how-to/create-resource
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/openai/openai/README.md
