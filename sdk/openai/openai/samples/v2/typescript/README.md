---
page_type: sample
languages:
  - typescript
products:
  - azure
  - azure-cognitive-services
  - azure-openai
urlFragment: openai-typescript
---

# Azure OpenAI client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for Azure OpenAI in some common scenarios.

| **File Name**                                                                       | **Description**                                                              |
| ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [audioTranscription.ts][audiotranscription]                                         | audio transcription.                                                         |
| [audioTranslation.ts][audiotranslation]                                             | audio translation.                                                           |
| [batch.ts][batch]                                                                   | create and retrieve batch content.                                           |
| [chatCompletions.ts][chatcompletions]                                               | get chat completions.                                                        |
| [codeInterpreter.ts][codeinterpreter]                                               | interpreting code.                                                           |
| [completions.ts][completions]                                                       | get completions.                                                             |
| [embeddings.ts][embeddings]                                                         | generates embedding vectors from a prompt using Azure OpenAI Get Embeddings. |
| [images.ts][images]                                                                 | generates images from prompts using Azure OpenAI Batch Image Generation.     |
| [onYourData.ts][onyourdata]                                                         | chat completions with your own data.                                         |
| [streamChatCompletions.ts][streamchatcompletions]                                   | list chat completions.                                                       |
| [streamChatCompletionsWithContentFilter.ts][streamchatcompletionswithcontentfilter] | get completions.                                                             |
| [streamCompletions.ts][streamcompletions]                                           | list completions.                                                            |
| [textToSpeech.ts][texttospeech]                                                     | text to speech.                                                              |
| [toolCall.ts][toolcall]                                                             | get chat completions with functions.                                         |

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
node dist/audioTranscription.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env AUDIO_FILE_PATH="<audio file path>" node dist/audioTranscription.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[audiotranscription]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v2/typescript/src/audioTranscription.ts
[audiotranslation]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v2/typescript/src/audioTranslation.ts
[batch]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v2/typescript/src/batch.ts
[chatcompletions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v2/typescript/src/chatCompletions.ts
[codeinterpreter]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v2/typescript/src/codeInterpreter.ts
[completions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v2/typescript/src/completions.ts
[embeddings]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v2/typescript/src/embeddings.ts
[images]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v2/typescript/src/images.ts
[onyourdata]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v2/typescript/src/onYourData.ts
[streamchatcompletions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v2/typescript/src/streamChatCompletions.ts
[streamchatcompletionswithcontentfilter]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v2/typescript/src/streamChatCompletionsWithContentFilter.ts
[streamcompletions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v2/typescript/src/streamCompletions.ts
[texttospeech]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v2/typescript/src/textToSpeech.ts
[toolcall]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/v2/typescript/src/toolCall.ts
[apiref]: https://learn.microsoft.com/javascript/api/overview/azure/openai
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurecognitiveservicesinstance]: https://learn.microsoft.com/azure/cognitive-services/openai/how-to/create-resource
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/openai/openai/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
