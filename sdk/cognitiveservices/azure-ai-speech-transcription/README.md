# Azure AI Speech Transcription client library for JavaScript

The [Azure AI Speech Service][speech_service] provides advanced speech-to-text capabilities for converting audio to text. The Azure AI Speech Transcription client library enables real-time and batch transcription with features including speaker diarization, profanity filtering, enhanced modes, and phrase list support.

This package contains an isomorphic SDK (runs both in Node.js and in browsers) for the Azure AI Speech Transcription service.

**Key links:**

- [Source code](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitiveservices/azure-ai-speech-transcription/)
- [Package (NPM)](https://www.npmjs.com/package/@azure/azure-ai-speech-transcription)
- [API reference documentation](https://learn.microsoft.com/javascript/api/@azure/azure-ai-speech-transcription?view=azure-node-preview)
- [Product documentation](https://learn.microsoft.com/azure/ai-services/speech-service/)
- [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cognitiveservices/azure-ai-speech-transcription/samples)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- Latest versions of Safari, Chrome, Edge and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure subscription][azure_sub]
- An [Azure AI Speech resource](https://learn.microsoft.com/azure/ai-services/speech-service/overview#try-the-speech-service-for-free)

### Install the `@azure/azure-ai-speech-transcription` package

Install the Azure Transcription client library for JavaScript with `npm`:

```bash
npm install @azure/azure-ai-speech-transcription
```

### Configure TypeScript

This library is written in TypeScript and provides type definitions. To use this library in a TypeScript project, we recommend the following configuration:

1. **Install TypeScript and Node.js types:**

```bash
npm install -g typescript
npm install --save-dev @types/node
```

2. **TypeScript configuration:** Ensure your `tsconfig.json` includes the following settings:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "strict": true
  }
}
```

**Note:** The `@types/node` package version should match your Node.js runtime version (>=20.0.0).

### Create and authenticate a `TranscriptionClient`

To create a client object to access the Azure AI Speech Transcription API, you will need the `endpoint` of your Azure AI Speech resource and an API key (`subscription key`).

You can find the endpoint and keys for your Azure AI Speech resource in the [Azure Portal][azure_portal] or by using the [Azure CLI](https://learn.microsoft.com/cli/azure):

```bash
# Get the endpoint for the Speech resource
az cognitiveservices account show --name "resource-name" --resource-group "resource-group-name" --query "properties.endpoint"

# Get the API key
az cognitiveservices account keys list --name "resource-name" --resource-group "resource-group-name" --query "key1"
```

#### Using API Key

Create a `TranscriptionClient` using an API key from your Azure AI Speech resource with `AzureKeyCredential`:

```ts snippet:ReadmeSampleCreateClient_ApiKey
import { TranscriptionClient } from "@azure/azure-ai-speech-transcription";
import { AzureKeyCredential } from "@azure/core-auth";

const endpoint = process.env.ENDPOINT ?? "<endpoint>";
const apiKey = process.env.API_KEY ?? "<api-key>";
const client = new TranscriptionClient(endpoint, new AzureKeyCredential(apiKey));
```

### JavaScript Bundle

To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

## Key concepts

### TranscriptionClient

`TranscriptionClient` is the primary interface for developers using the Azure AI Speech Transcription client library. It provides methods to transcribe audio files or streams into text with various configuration options.

### Audio Transcription

The main operation provided by this SDK is audio transcription, which converts spoken language in audio files into written text. The transcription service supports:

- **Multiple Locales**: Automatically detect or specify the language of the audio
- **Custom Models**: Use custom speech models for improved accuracy
- **Speaker Diarization**: Identify and separate different speakers in the audio
- **Profanity Filtering**: Control how profanity is handled in transcriptions
- **Channel Separation**: Transcribe multi-channel audio separately
- **Enhanced Mode**: Advanced transcription features including translation and task-specific processing
- **Phrase Lists**: Improve recognition accuracy for specific terms and phrases

## Examples

This section provides examples of using the features of the Azure AI Speech Transcription Service. For additional examples, see the [samples folder][samples_folder].

### Basic Transcription

Transcribe an audio file with automatic language detection:

```ts snippet:ReadmeSampleBasicTranscription
import { TranscriptionClient } from "@azure/azure-ai-speech-transcription";
import { AzureKeyCredential } from "@azure/core-auth";

const endpoint = process.env.ENDPOINT ?? "<endpoint>";
const apiKey = process.env.API_KEY ?? "<api-key>";
const client = new TranscriptionClient(endpoint, new AzureKeyCredential(apiKey));
const audioFilePath = process.env.AUDIO_FILE_PATH ?? "path/to/audio.wav";
// For testing purposes, we'll create a mock audio file buffer
// In real usage, you would read an actual audio file
const audioFile = fs.existsSync(audioFilePath) ? fs.readFileSync(audioFilePath) : Buffer.from([]);
const result = await client.transcribe({
  audio: audioFile,
});
console.log("Transcription:", result.combinedPhrases[0]?.text);
```

### Transcription with Locale Specification

Specify one or more possible locales for the transcription:

```ts snippet:ReadmeSampleTranscriptionWithLocale
import { TranscriptionClient } from "@azure/azure-ai-speech-transcription";
import { AzureKeyCredential } from "@azure/core-auth";

const endpoint = process.env.ENDPOINT ?? "<endpoint>";
const apiKey = process.env.API_KEY ?? "<api-key>";
const client = new TranscriptionClient(endpoint, new AzureKeyCredential(apiKey));
const audioFilePath = process.env.AUDIO_FILE_PATH ?? "path/to/audio.wav";
const audioFile = fs.existsSync(audioFilePath) ? fs.readFileSync(audioFilePath) : Buffer.from([]);
const result = await client.transcribe({
  audio: audioFile,
  options: {
    locales: ["en-US", "es-ES"],
  },
});
console.log("Transcription:", result.combinedPhrases[0]?.text);
```

### Transcription with Speaker Diarization

Enable speaker identification to distinguish between different speakers:

```ts snippet:ReadmeSampleSpeakerDiarization
import { TranscriptionClient } from "@azure/azure-ai-speech-transcription";
import { AzureKeyCredential } from "@azure/core-auth";

const endpoint = process.env.ENDPOINT ?? "<endpoint>";
const apiKey = process.env.API_KEY ?? "<api-key>";
const client = new TranscriptionClient(endpoint, new AzureKeyCredential(apiKey));
const audioFilePath = process.env.AUDIO_FILE_PATH ?? "path/to/audio.wav";
const audioFile = fs.existsSync(audioFilePath) ? fs.readFileSync(audioFilePath) : Buffer.from([]);
const result = await client.transcribe({
  audio: audioFile,
  options: {
    locales: ["en-US"],
    diarization: {
      enabled: true,
      maxSpeakers: 4,
    },
  },
});
// Access speaker information from the results
for (const phrase of result.phrases || []) {
  console.log(`Speaker ${phrase.speaker}: ${phrase.text}`);
}
```

### Transcription with Profanity Filtering

Control how profanity is handled in the transcription results:

```ts snippet:ReadmeSampleProfanityFiltering
import { TranscriptionClient } from "@azure/azure-ai-speech-transcription";
import { AzureKeyCredential } from "@azure/core-auth";

const endpoint = process.env.ENDPOINT ?? "<endpoint>";
const apiKey = process.env.API_KEY ?? "<api-key>";
const client = new TranscriptionClient(endpoint, new AzureKeyCredential(apiKey));
const audioFilePath = process.env.AUDIO_FILE_PATH ?? "path/to/audio.wav";
const audioFile = fs.existsSync(audioFilePath) ? fs.readFileSync(audioFilePath) : Buffer.from([]);
const result = await client.transcribe({
  audio: audioFile,
  options: {
    locales: ["en-US"],
    profanityFilterMode: "Masked", // Options: "None", "Removed", "Tags", "Masked"
  },
});
console.log("Transcription:", result.combinedPhrases[0]?.text);
```

### Transcription with Phrase List

Improve recognition accuracy for specific terminology:

```ts snippet:ReadmeSamplePhraseList
import { TranscriptionClient } from "@azure/azure-ai-speech-transcription";
import { AzureKeyCredential } from "@azure/core-auth";

const endpoint = process.env.ENDPOINT ?? "<endpoint>";
const apiKey = process.env.API_KEY ?? "<api-key>";
const client = new TranscriptionClient(endpoint, new AzureKeyCredential(apiKey));
const audioFilePath = process.env.AUDIO_FILE_PATH ?? "path/to/audio.wav";
const audioFile = fs.existsSync(audioFilePath) ? fs.readFileSync(audioFilePath) : Buffer.from([]);
const result = await client.transcribe({
  audio: audioFile,
  options: {
    locales: ["en-US"],
    phraseList: {
      phrases: ["Azure", "Cognitive Services", "Speech API"],
      biasingWeight: 5.0, // Weight from 1.0 to 20.0
    },
  },
});
console.log("Transcription:", result.combinedPhrases[0]?.text);
```

### Transcription from URL

Transcribe audio from a publicly accessible URL:

```ts snippet:ReadmeSampleTranscriptionFromUrl
import { TranscriptionClient } from "@azure/azure-ai-speech-transcription";
import { AzureKeyCredential } from "@azure/core-auth";

const endpoint = process.env.ENDPOINT ?? "<endpoint>";
const apiKey = process.env.API_KEY ?? "<api-key>";
const client = new TranscriptionClient(endpoint, new AzureKeyCredential(apiKey));
const audioUrl = process.env.AUDIO_URL ?? "https://example.com/audio.wav";
const result = await client.transcribe({
  options: {
    audioUrl: audioUrl,
    locales: ["en-US"],
  },
});
console.log("Transcription:", result.combinedPhrases[0]?.text);
```

For more detailed examples, see the [samples folder][samples_folder].

## Next steps

### Additional documentation

For more extensive documentation on Azure AI Speech Service, see the [Speech Service documentation][speech_service] on learn.microsoft.com.

### Provide Feedback

If you encounter bugs or have suggestions, please [open an issue](https://github.com/Azure/azure-sdk-for-js/issues).

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:SetLogLevel
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Contributing

If you'd like to contribute to this library, please read the [contributing guide][contributing] to learn more about how to build and test the code.

This project welcomes contributions and suggestions. Most contributions require you to agree to a Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us the rights to use your contribution. For details, visit [cla.microsoft.com][cla].

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct][code_of_conduct]. For more information, see the [Code of Conduct FAQ][code_of_conduct_faq] or contact [opencode@microsoft.com][email_opencode] with any additional questions or comments.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcognitiveservices%2Fazure-ai-speech-transcription%2FREADME.png)

<!-- LINKS -->

[speech_service]: https://learn.microsoft.com/azure/ai-services/speech-service/
[samples_folder]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cognitiveservices/azure-ai-speech-transcription/samples
[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[contributing]: https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md
[cla]: https://cla.microsoft.com
[code_of_conduct]: https://opensource.microsoft.com/codeofconduct/
[code_of_conduct_faq]: https://opensource.microsoft.com/codeofconduct/faq/
[email_opencode]: mailto:opencode@microsoft.com
