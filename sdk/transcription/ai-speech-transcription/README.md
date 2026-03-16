# Azure AI Speech Transcription client library for JavaScript

The Azure AI Speech Transcription client library provides easy access to Azure's speech-to-text transcription service, enabling you to convert audio to text with high accuracy.

Use the client library to:

- Transcribe audio files to text
- Support multiple languages and locales
- Enable speaker diarization to identify different speakers
- Apply profanity filtering
- Use custom speech models
- Process both local files and remote URLs
- Use Enhanced Mode for LLM-powered transcription and translation

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/transcription/ai-speech-transcription/src)
- [Package (NPM)](https://www.npmjs.com/package/@azure/ai-speech-transcription)
- [API reference documentation](https://learn.microsoft.com/javascript/api/@azure/ai-speech-transcription?view=azure-node-preview)
- [Product documentation](https://learn.microsoft.com/azure/ai-services/speech-service/overview)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- Latest versions of Safari, Chrome, Edge and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure subscription][azure_sub].
- An [Azure AI Speech resource](https://learn.microsoft.com/azure/ai-services/speech-service/overview#try-the-speech-service-for-free) or an [Azure AI Foundry resource](https://learn.microsoft.com/azure/ai-foundry/).

### Install the `@azure/ai-speech-transcription` package

Install the Azure AI Speech Transcription client library for JavaScript with `npm`:

```bash
npm install @azure/ai-speech-transcription
```

### Create and authenticate a `TranscriptionClient`

To create a client object to access the Azure Transcription API, you will need the `endpoint` of your Azure Transcription resource and a `credential`.
You can find the endpoint for your Azure Transcription resource in the [Azure Portal][azure_portal].

#### Option 1: API Key Authentication

You can find your Speech resource's API key in the [Azure Portal][azure_portal].

```ts snippet:ApiKeyAuthentication
import { TranscriptionClient } from "@azure/ai-speech-transcription";
import { AzureKeyCredential } from "@azure/core-auth";

const client = new TranscriptionClient("<endpoint>", new AzureKeyCredential("<api-key>"));
```

#### Option 2: Entra ID Authentication (Recommended for Production)

For production scenarios, it is recommended to use Entra ID authentication with managed identities or service principals. Install the `@azure/identity` package:

```bash
npm install @azure/identity
```

You will also need to assign the appropriate role (e.g., "Cognitive Services User") to your managed identity or service principal. For more information, see [Azure AI Services authentication](https://learn.microsoft.com/azure/ai-services/authentication).

Using Node.js and Node-like environments, you can use the `DefaultAzureCredential` class to authenticate the client.

```ts snippet:AzureADAuthentication
import { TranscriptionClient } from "@azure/ai-speech-transcription";
import { DefaultAzureCredential } from "@azure/identity";

const client = new TranscriptionClient("<endpoint>", new DefaultAzureCredential());
```

For browser environments, use the `InteractiveBrowserCredential` from the `@azure/identity` package to authenticate.

```ts snippet:BrowserAuthentication
import { InteractiveBrowserCredential } from "@azure/identity";
import { TranscriptionClient } from "@azure/ai-speech-transcription";

const credential = new InteractiveBrowserCredential({
  tenantId: "<YOUR_TENANT_ID>",
  clientId: "<YOUR_CLIENT_ID>",
});
const client = new TranscriptionClient("<endpoint>", credential);
```

### Service API versions

The client library targets the latest service API version by default. You can select a specific supported API version when instantiating the client:

```ts snippet:SelectApiVersion
import { TranscriptionClient, KnownServiceApiVersions } from "@azure/ai-speech-transcription";
import { AzureKeyCredential } from "@azure/core-auth";

const client = new TranscriptionClient("<endpoint>", new AzureKeyCredential("<api-key>"), {
  serviceVersion: KnownServiceApiVersions.V20251015,
});
```

### JavaScript Bundle
To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

## Key concepts

### TranscriptionClient

`TranscriptionClient` is the primary interface for developers using the Azure AI Speech Transcription client library. It provides two overloaded `transcribe` methods — one for audio binary data and one for audio URLs.

### Audio Formats

The service supports various audio formats including WAV, MP3, OGG, FLAC, and more. Audio must be:

- Shorter than 2 hours in duration
- Smaller than 250 MB in size

### Transcription Options

You can customize transcription with options like:

- **Profanity filtering**: Control how profanity is handled in transcriptions (`"None"`, `"Masked"`, `"Removed"`, `"Tags"`)
- **Speaker diarization**: Identify different speakers in multi-speaker audio (up to 36 speakers)
- **Phrase lists**: Provide domain-specific phrases to improve accuracy
- **Language detection**: Automatically detect the spoken language, or specify known locales
- **Enhanced mode**: Improve transcription quality with LLM-powered processing, translation, and prompt-based customization

## Examples

- [Transcribe a local audio file](#transcribe-a-local-audio-file)
- [Transcribe audio from a URL](#transcribe-audio-from-a-url)
- [Access individual transcribed words](#access-individual-transcribed-words)
- [Identify speakers with diarization](#identify-speakers-with-diarization)
- [Filter profanity](#filter-profanity)
- [Improve accuracy with custom phrases](#improve-accuracy-with-custom-phrases)
- [Transcribe with a known language](#transcribe-with-a-known-language)
- [Use Enhanced Mode for highest accuracy](#use-enhanced-mode-for-highest-accuracy)
- [Translate with Enhanced Mode](#translate-with-enhanced-mode)
- [Combine multiple options](#combine-multiple-options)

### Transcribe a local audio file

The most basic operation is to transcribe an audio file from your local filesystem:

```ts snippet:TranscribeLocalFile
import { TranscriptionClient } from "@azure/ai-speech-transcription";
import { AzureKeyCredential } from "@azure/core-auth";
import { readFileSync } from "node:fs";

const client = new TranscriptionClient("<endpoint>", new AzureKeyCredential("<api-key>"));
const audioFile = readFileSync("path/to/audio.wav");
const result = await client.transcribe(audioFile);
console.log(`Duration: ${result.durationInMs}ms`);
console.log("Transcription:", result.combinedPhrases[0]?.text);
```

### Transcribe audio from a URL

You can transcribe audio directly from a publicly accessible URL without downloading the file first:

```ts snippet:TranscribeFromUrl
import { TranscriptionClient } from "@azure/ai-speech-transcription";
import { AzureKeyCredential } from "@azure/core-auth";

const client = new TranscriptionClient("<endpoint>", new AzureKeyCredential("<api-key>"));
const result = await client.transcribe("https://example.com/audio/sample.wav", {
  locales: ["en-US"],
});
console.log("Transcription:", result.combinedPhrases[0]?.text);
```

### Access individual transcribed words

To access word-level details including timestamps, confidence scores, and individual words:

```ts snippet:AccessTranscribedWords
import { TranscriptionClient } from "@azure/ai-speech-transcription";
import { AzureKeyCredential } from "@azure/core-auth";
import { readFileSync } from "node:fs";

const client = new TranscriptionClient("<endpoint>", new AzureKeyCredential("<api-key>"));
const audioFile = readFileSync("path/to/audio.wav");
const result = await client.transcribe(audioFile);
for (const phrase of result.phrases) {
  console.log(`Phrase: ${phrase.text}`);
  console.log(
    `  Offset: ${phrase.offsetMilliseconds}ms | Duration: ${phrase.durationMilliseconds}ms`,
  );
  console.log(`  Confidence: ${phrase.confidence.toFixed(2)}`);
  // Access individual words in the phrase
  for (const word of phrase.words ?? []) {
    console.log(`    Word: '${word.text}' | Offset: ${word.offsetMilliseconds}ms`);
  }
}
```

### Identify speakers with diarization

Speaker diarization identifies who spoke when in multi-speaker conversations:

```ts snippet:TranscribeWithDiarization
import { TranscriptionClient } from "@azure/ai-speech-transcription";
import { AzureKeyCredential } from "@azure/core-auth";
import { readFileSync } from "node:fs";

const client = new TranscriptionClient("<endpoint>", new AzureKeyCredential("<api-key>"));
const audioFile = readFileSync("path/to/conversation.wav");
const result = await client.transcribe(audioFile, {
  diarizationOptions: {
    maxSpeakers: 4, // Expect up to 4 speakers in the conversation
  },
});
for (const phrase of result.phrases) {
  console.log(`Speaker ${phrase.speaker}: ${phrase.text}`);
}
```

> **Note**: The total number of identified speakers will never exceed `maxSpeakers`. If the actual audio contains more speakers than specified, the service will consolidate them. Set a reasonable upper bound if you are unsure of the exact count.

### Filter profanity

Control how profanity appears in your transcriptions using different filter modes:

```ts snippet:TranscribeWithProfanityFilter
import { TranscriptionClient, KnownProfanityFilterModes } from "@azure/ai-speech-transcription";
import { AzureKeyCredential } from "@azure/core-auth";
import { readFileSync } from "node:fs";

const client = new TranscriptionClient("<endpoint>", new AzureKeyCredential("<api-key>"));
const audioFile = readFileSync("path/to/audio.wav");
const result = await client.transcribe(audioFile, {
  profanityFilterMode: KnownProfanityFilterModes.Masked, // Default - profanity replaced with asterisks
});
console.log("Transcription:", result.combinedPhrases[0]?.text);
```

Available modes:
- `"None"`: No filtering — profanity appears as spoken
- `"Masked"`: Profanity replaced with asterisks (e.g., `f***`)
- `"Removed"`: Profanity completely removed from text
- `"Tags"`: Profanity wrapped in XML tags (e.g., `<profanity>word</profanity>`)

### Improve accuracy with custom phrases

Add custom phrases to help the service correctly recognize domain-specific terms, names, and acronyms:

```ts snippet:TranscribeWithPhraseList
import { TranscriptionClient } from "@azure/ai-speech-transcription";
import { AzureKeyCredential } from "@azure/core-auth";
import { readFileSync } from "node:fs";

const client = new TranscriptionClient("<endpoint>", new AzureKeyCredential("<api-key>"));
const audioFile = readFileSync("path/to/audio.wav");
const result = await client.transcribe(audioFile, {
  phraseList: {
    phrases: ["Contoso", "Jessie", "Rehaan"],
  },
});
console.log("Transcription:", result.combinedPhrases[0]?.text);
```

### Transcribe with a known language

When you know the language of the audio, specifying a single locale improves accuracy and reduces latency:

```ts snippet:TranscribeWithKnownLocale
import { TranscriptionClient } from "@azure/ai-speech-transcription";
import { AzureKeyCredential } from "@azure/core-auth";
import { readFileSync } from "node:fs";

const client = new TranscriptionClient("<endpoint>", new AzureKeyCredential("<api-key>"));
const audioFile = readFileSync("path/to/english-audio.mp3");
const result = await client.transcribe(audioFile, {
  locales: ["en-US"],
});
console.log("Transcription:", result.combinedPhrases[0]?.text);
```

For language identification when you are unsure of the language, specify multiple candidate locales and the service will automatically detect the language:

```ts snippet:TranscribeWithLanguageIdentification
import { TranscriptionClient } from "@azure/ai-speech-transcription";
import { AzureKeyCredential } from "@azure/core-auth";
import { readFileSync } from "node:fs";

const client = new TranscriptionClient("<endpoint>", new AzureKeyCredential("<api-key>"));
const audioFile = readFileSync("path/to/audio.mp3");
const result = await client.transcribe(audioFile, {
  locales: ["en-US", "es-ES"],
});
for (const phrase of result.phrases) {
  console.log(`[${phrase.locale}] ${phrase.text}`);
}
```

### Use Enhanced Mode for highest accuracy

Enhanced Mode uses LLM-powered processing for the highest accuracy transcription:

```ts snippet:TranscribeWithEnhancedMode
import { TranscriptionClient, KnownProfanityFilterModes } from "@azure/ai-speech-transcription";
import { AzureKeyCredential } from "@azure/core-auth";
import { readFileSync } from "node:fs";

const client = new TranscriptionClient("<endpoint>", new AzureKeyCredential("<api-key>"));
const audioFile = readFileSync("path/to/audio.wav");
const result = await client.transcribe(audioFile, {
  // Enhanced mode: LLM-powered speech recognition with prompt customization
  enhancedMode: {
    task: "transcribe",
    prompt: ["Output must be in lexical format."],
  },
  // Existing Fast Transcription options work alongside enhanced mode
  diarizationOptions: {
    maxSpeakers: 2,
  },
  profanityFilterMode: KnownProfanityFilterModes.Masked,
  activeChannels: [0, 1],
});
for (const phrase of result.phrases) {
  console.log(`[Speaker ${phrase.speaker}] ${phrase.text}`);
}
```

### Translate with Enhanced Mode

Enhanced Mode also supports translating speech to a target language:

```ts snippet:TranslateWithEnhancedMode
import { TranscriptionClient, KnownProfanityFilterModes } from "@azure/ai-speech-transcription";
import { AzureKeyCredential } from "@azure/core-auth";
import { readFileSync } from "node:fs";

const client = new TranscriptionClient("<endpoint>", new AzureKeyCredential("<api-key>"));
const audioFile = readFileSync("path/to/chinese-audio.wav");
const result = await client.transcribe(audioFile, {
  enhancedMode: {
    task: "translate",
    targetLanguage: "ko", // Translate to Korean
  },
  profanityFilterMode: KnownProfanityFilterModes.Masked,
});
console.log("Translated to Korean:", result.combinedPhrases[0]?.text);
```

### Combine multiple options

You can combine multiple transcription features for complex scenarios:

```ts snippet:TranscribeWithMultipleOptions
import { TranscriptionClient, KnownProfanityFilterModes } from "@azure/ai-speech-transcription";
import { AzureKeyCredential } from "@azure/core-auth";
import { readFileSync } from "node:fs";

const client = new TranscriptionClient("<endpoint>", new AzureKeyCredential("<api-key>"));
const audioFile = readFileSync("path/to/meeting.wav");
const result = await client.transcribe(audioFile, {
  // Enable speaker diarization
  diarizationOptions: {
    maxSpeakers: 5,
  },
  // Mask profanity
  profanityFilterMode: KnownProfanityFilterModes.Masked,
  // Add custom phrases
  phraseList: {
    phrases: ["action items", "Q4", "KPIs"],
  },
});
console.log("Full Transcript:");
console.log(result.combinedPhrases[0]?.text);
for (const phrase of result.phrases) {
  console.log(`Speaker ${phrase.speaker}: ${phrase.text}`);
}
```

## Troubleshooting

### Common issues

- **Authentication failures**: Verify your API key or Entra ID credentials are correct and that your Speech resource is active.
- **Unsupported audio format**: Ensure your audio is in a supported format (WAV, MP3, OGG, FLAC, etc.). The service automatically handles format detection.
- **Slow transcription**: For large files, ensure your network connection is stable.
- **Poor accuracy**: Try specifying the correct locale, adding custom phrases for domain-specific terms, or using Enhanced Mode.

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:EnableLogging
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Next steps

Explore additional samples to learn more about advanced features:

- [Basic Transcription](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/transcription/ai-speech-transcription/samples-dev/basicTranscription.ts) - Create clients and basic transcription
- [Transcription Options](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/transcription/ai-speech-transcription/samples-dev/transcriptionOptions.ts) - Combine multiple transcription features
- [Transcription from URL](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/transcription/ai-speech-transcription/samples-dev/transcriptionFromUrl.ts) - Transcribe from remote URLs
- [Enhanced Mode](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/transcription/ai-speech-transcription/samples-dev/enhancedMode.ts) - LLM-powered transcription and translation
- [Profanity Filtering](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/transcription/ai-speech-transcription/samples-dev/profanityFiltering.ts) - All profanity filtering modes
- [Speaker Diarization](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/transcription/ai-speech-transcription/samples-dev/speakerDiarization.ts) - Speaker identification
- [Phrase List](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/transcription/ai-speech-transcription/samples-dev/phraseList.ts) - Custom vocabulary
- [Transcription with Locale](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/transcription/ai-speech-transcription/samples-dev/transcriptionWithLocale.ts) - Language specification and detection
- [Multilingual Transcription](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/transcription/ai-speech-transcription/samples-dev/multilingualTranscription.ts) - Multilingual content (preview)

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
