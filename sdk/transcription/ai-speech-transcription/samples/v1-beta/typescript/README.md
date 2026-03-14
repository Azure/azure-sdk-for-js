---
page_type: sample
languages:
  - typescript
products:
  - azure
urlFragment: ai-speech-transcription-typescript-beta
---

# Azure AI Speech Transcription client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for Azure AI Speech Transcription in some common scenarios.

| **File Name**                                             | **Description**                                                 |
| --------------------------------------------------------- | --------------------------------------------------------------- |
| [basicTranscription.ts][basictranscription]               | transcribe a local audio file                                   |
| [transcriptionOptions.ts][transcriptionoptions]           | combine multiple transcription options                          |
| [transcriptionFromUrl.ts][transcriptionfromurl]           | transcribe audio from a URL                                     |
| [enhancedMode.ts][enhancedmode]                           | use Enhanced Mode for LLM-powered transcription and translation |
| [speakerDiarization.ts][speakerdiarization]               | identify and separate different speakers in audio               |
| [phraseList.ts][phraselist]                               | use phrase lists to improve transcription accuracy              |
| [profanityFiltering.ts][profanityfiltering]               | control profanity handling in transcription results             |
| [transcriptionWithLocale.ts][transcriptionwithlocale]     | transcribe audio with specific locale options                   |
| [multilingualTranscription.ts][multilingualtranscription] | transcribe multilingual audio content (preview)                 |

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
node dist/basicTranscription.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env TRANSCRIPTION_ENDPOINT="<transcription endpoint>" TRANSCRIPTION_API_KEY="<transcription api key>" AUDIO_FILE_PATH="<audio file path>" node dist/basicTranscription.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[basictranscription]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/transcription/ai-speech-transcription/samples/v1-beta/typescript/src/basicTranscription.ts
[transcriptionoptions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/transcription/ai-speech-transcription/samples/v1-beta/typescript/src/transcriptionOptions.ts
[transcriptionfromurl]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/transcription/ai-speech-transcription/samples/v1-beta/typescript/src/transcriptionFromUrl.ts
[enhancedmode]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/transcription/ai-speech-transcription/samples/v1-beta/typescript/src/enhancedMode.ts
[speakerdiarization]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/transcription/ai-speech-transcription/samples/v1-beta/typescript/src/speakerDiarization.ts
[phraselist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/transcription/ai-speech-transcription/samples/v1-beta/typescript/src/phraseList.ts
[profanityfiltering]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/transcription/ai-speech-transcription/samples/v1-beta/typescript/src/profanityFiltering.ts
[transcriptionwithlocale]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/transcription/ai-speech-transcription/samples/v1-beta/typescript/src/transcriptionWithLocale.ts
[multilingualtranscription]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/transcription/ai-speech-transcription/samples/v1-beta/typescript/src/multilingualTranscription.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/ai-speech-transcription
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/transcription/ai-speech-transcription/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
