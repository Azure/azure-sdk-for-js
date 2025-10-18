---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-cognitive-services
  - azure-speech
urlFragment: azure-ai-speech-batchtranscription-javascript-beta
---

# Azure AI Speech Batch Transcription client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for Azure AI Speech Batch Transcription in some common scenarios.

| **File Name**                                                             | **Description**                                                           |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| [basicBatchTranscription.js][basicbatchtranscription]                     | Demonstrates how to create and monitor a basic batch transcription job    |
| [batchTranscriptionWithCustomModel.js][batchtranscriptionwithcustommodel] | Demonstrates how to transcribe audio using a custom trained speech model  |
| [monitorBatchJob.js][monitorbatchjob]                                     | Demonstrates how to monitor a batch transcription job status in real-time |
| [listBatchTranscriptions.js][listbatchtranscriptions]                     | Demonstrates how to list all batch transcription jobs                     |
| [batchTranscriptionWithSas.js][batchtranscriptionwithsas]                 | Demonstrates how to transcribe audio files using SAS URLs                 |

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
node basicBatchTranscription.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env SPEECH_ENDPOINT="<speech endpoint>" SPEECH_API_KEY="<speech api key>" node basicBatchTranscription.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[basicbatchtranscription]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitiveservices/azure-ai-speech-batchtranscription/samples/v1-beta/javascript/basicBatchTranscription.js
[batchtranscriptionwithcustommodel]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitiveservices/azure-ai-speech-batchtranscription/samples/v1-beta/javascript/batchTranscriptionWithCustomModel.js
[monitorbatchjob]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitiveservices/azure-ai-speech-batchtranscription/samples/v1-beta/javascript/monitorBatchJob.js
[listbatchtranscriptions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitiveservices/azure-ai-speech-batchtranscription/samples/v1-beta/javascript/listBatchTranscriptions.js
[batchtranscriptionwithsas]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitiveservices/azure-ai-speech-batchtranscription/samples/v1-beta/javascript/batchTranscriptionWithSas.js
[freesub]: https://azure.microsoft.com/free/
[createinstance_azureaispeechresource]: https://learn.microsoft.com/azure/ai-services/speech-service/overview#find-a-resource
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cognitiveservices/azure-ai-speech-batchtranscription/README.md
