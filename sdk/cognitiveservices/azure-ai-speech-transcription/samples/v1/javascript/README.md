---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-cognitive-services
urlFragment: azure-ai-speech-transcription-javascript
---

# Azure AI Speech Transcription client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure AI Speech Transcription in some common scenarios.

| **File Name**                                           | **Description**                                               |
| ------------------------------------------------------- | ------------------------------------------------------------- |
| [basicTranscription.js][basictranscription]             | transcribe an audio file with automatic language detection    |
| [transcriptionWithLocale.js][transcriptionwithlocale]   | transcribe audio with specific locale options                 |
| [transcriptionFromUrl.js][transcriptionfromurl]         | transcribe audio from a URL with automatic language detection |
| [speakerDiarization.js][speakerdiarization]             | identify and separate different speakers in audio             |
| [phraseList.js][phraselist]                             | use phrase lists to improve transcription accuracy            |
| [profanityFiltering.js][profanityfiltering]             | control profanity handling in transcription results           |
| [setLogLevel.js][setloglevel]                           | enable logging to troubleshoot issues                         |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure AI Speech resource][createinstance_azureaispeechresource]

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
node basicTranscription.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env ENDPOINT="<endpoint>" API_KEY="<api key>" AUDIO_FILE_PATH="<audio file path>" node basicTranscription.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[basictranscription]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitiveservices/azure-ai-speech-transcription/samples/v1/javascript/basicTranscription.js
[transcriptionwithlocale]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitiveservices/azure-ai-speech-transcription/samples/v1/javascript/transcriptionWithLocale.js
[transcriptionfromurl]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitiveservices/azure-ai-speech-transcription/samples/v1/javascript/transcriptionFromUrl.js
[speakerdiarization]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitiveservices/azure-ai-speech-transcription/samples/v1/javascript/speakerDiarization.js
[phraselist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitiveservices/azure-ai-speech-transcription/samples/v1/javascript/phraseList.js
[profanityfiltering]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitiveservices/azure-ai-speech-transcription/samples/v1/javascript/profanityFiltering.js
[setloglevel]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitiveservices/azure-ai-speech-transcription/samples/v1/javascript/setLogLevel.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/azure-ai-speech-transcription?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[createinstance_azureaispeechresource]: https://learn.microsoft.com/azure/ai-services/speech-service/overview
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cognitiveservices/azure-ai-speech-transcription/README.md
